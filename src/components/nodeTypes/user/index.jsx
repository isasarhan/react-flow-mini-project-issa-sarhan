import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  username: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name cannot exceed 20 characters'),
})

function UserNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values, e) => {
    e.preventDefault()
    console.log(values);
  }
  return (

    <>
      <h2 className='text-center text-xl font-bold pb-4'>{data.label}</h2>
      <div className="text-updater-node border border-slate-900 p-2 rounded">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            <label htmlFor="username" className='text-lg'>User Name:</label>
            <input id="username" name="username" onChange={onChange} className="nodrag p-1 border border-neutral-700 rounded" {...register('username')} />
            <span className='text-red-900'>{errors?.name?.message}</span>
            <button className='bg-slate-400 rounded text-white'>submit</button>
          </div>
        </form>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default UserNode;