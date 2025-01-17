import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useSnackbar } from 'notistack';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(20, 'Name cannot exceed 20 characters'),
    type: z.string()
})

function Sidebar() {
    const { selectedNode, setCurrentType, currentType, editNode, addNode, setSelectedNode } = useAppStore()
    const { enqueueSnackbar } = useSnackbar()
    const {
        control,
        handleSubmit,
        reset,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (value, e) => {
        e.preventDefault()
        if (selectedNode) {
            const newValue = { ...selectedNode, data: { label: value.name } }
            editNode(newValue)
            enqueueSnackbar({message:"node editted successfully!", variant:'success'})
        } else {
            const { type, name } = value
            addNode(type, name)
            enqueueSnackbar({message:"node added successfully!", variant:'success'})
        }
        reset()
        setSelectedNode(null)
    }

    useEffect(() => {
        setValue('name', selectedNode?.data.label)
    }, [selectedNode])

    return (
        <div className='absolute top-8 right-4 bg-slate-200 w-80 p-4 rounded-lg h-3/4 ' >
            <div className='flex flex-col justify-start gap-4'>
                <h3 className='text-lg font-bold text-center uppercase font-bold' >{selectedNode ? 'Edit Node' : 'Add Node'}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-start gap-4'>
                    <label htmlFor="name" className='text-lg'>Name:</label>
                    <input id="name" name="name" className="nodrag p-1 border border-neutral-700 rounded" {...register('name')} />
                    {errors?.name && <span className='text-red-900'>{errors?.name?.message}</span>}
                    <label htmlFor="type" className='text-lg'>Type:</label>
                    <select className='p-1 rounded pe-2'  {...register('type')} >
                        <option value="user">User Node</option>
                        <option value="habit">Habit Node</option>
                    </select>
                    <button className='bg-white rounded p-1 border-none'>{selectedNode ? 'Edit' : 'Add'}</button>
                </form>
            </div>

        </div>
    )
}

export default Sidebar 