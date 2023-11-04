import React, { useContext } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Draggable } from 'react-beautiful-dnd';
import { taskContext } from './TaskContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

const Card = ({ task ,id,index}) => {

  const {taskIds,setTaskIds,setTodos,todos}=useContext(taskContext)
  const [user]=useAuthState(auth)

  const handleDelete=async()=>{
    
    let newTodos=todos
    newTodos.columns[task.column].tasks.splice(index,1);
    setTodos(newTodos)
    let newTaskIds=taskIds[task.column]
    newTaskIds.splice(index,1);
    setTaskIds({...taskIds,[task.column]:newTaskIds})
    let res=await fetch("/api/docs",{
      method:"DELETE",
      body:JSON.stringify({id})
    });
    let taskRes=await fetch("/api/usertask",{
      method:"POST",
      body:JSON.stringify({userID:user.uid,data:{[task.column]:newTaskIds}})
    })

  }

  return (
    <div
      className='bg-white rounded-md w-full mb-3 p-3  shadow-md '>
      <div className='flex items-center justify-between gap-4 '>
        <div>
          {task.content}
        </div>
        <button onClick={handleDelete}>
          <XCircleIcon className='w-6 h-6 text-red-500' />
        </button>
      </div>
      {task.image && <div className='shadow-sm'>
        <img className='w-full mt-3 h-40 rounded-sm' src={task.image} />
        </div>}
    </div>
  );
};

export default Card;
