import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';


function HabitNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div className="text-updater-node border border-slate-900 p-2 rounded">
      <h2 className='text-center text-xl font-bold pb-4'>{data.label}</h2>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className='flex flex-col'>
          <select className='p-2'>
            <option value="">Select a habit</option>
            <option value="Reading">Reading</option>
            <option value="Exercise">Exercise</option>
            <option value="Meditation">Meditation</option>
          </select>
        </div>
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

export default HabitNode;