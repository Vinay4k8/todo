
import { useContext, useEffect, useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import {PhotoIcon, XCircleIcon} from "@heroicons/react/24/solid"
import { modalContext } from './ModalContext'
import { auth } from '@/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { imageUpload } from '@/lib/imageUpload'
import { taskContext } from './TaskContext'
import { toast } from 'react-hot-toast'


const plans = {
  todo:{
    name: "todo",
    color:"bg-red-500/75 text-white"
  },
  inprogress:{
    name: 'inprogress',
    color:"bg-yellow-500/75 text-white"
  },
  done:{
    name: 'done',
    color:"bg-green-500/75 text-white"
  },
}
 const tasks=["todo","inprogress","done"]
export const Modal=()=> {

  const ref=useRef()
  const [image,setImage]=useState(null)
  const [user]=useAuthState(auth)
    const {open,setOpen,taskType,setTaskType}=useContext(modalContext);
    const {addTask,todos,setTodos}=useContext(taskContext);
  const [task,setTask]=useState("")


    const handleOnClick=async()=>{
      if(!user){
        toast.error("Please login to continue")
        return
      }
      if(task.length<=0)
      {toast.error("Please fill task field")
        return
      }
      let imageurl=await imageUpload(image)
      
      let obj={
        column:taskType,content:task,image:imageurl
      }
      setOpen(false);
      let res=await fetch("/api/docs/add",{method:"POST",
    body:JSON.stringify(obj)});
    let document=await res.json()
    let newarDoc=todos
    newarDoc.columns[document.documentData.column].tasks.push({...document.documentData})
    
    setTodos(newarDoc)
    toast.success("Task Added Successfully")
    setTask("")
    setImage(null)
    addTask(document);
  
    }


    const handleCancel=()=>{
      setOpen(false);
    }

  return (open && 
    <div className="w-full px-4 py-16 absolute mx-auto z-30 ">
      <div className="mx-auto  max-w-md bg-white px-5 py-2 rounded-md shadow-md h-auto">

        <button className='w-full' onClick={handleCancel}>
          <XCircleIcon className='text-red-500 w-7 h-7 ml-auto'/>
          </button>
      <div className='space-y-2 mb-3'>
            <label className='text-lg text-gray-500 tracking-[3px]'>Task :</label>
            <input
            value={task} onChange={(e)=>setTask(e.target.value)}
            className='p-4 mb-2 outline-none  w-full rounded-md shadow-md text-gray-500 '
            placeholder='Enter task...'
            />
            </div>
        <RadioGroup value={taskType} onChange={setTaskType}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            
            {tasks.map((todo,index) => (
              <RadioGroup.Option
                key={index}
                value={todo}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${checked ? plans[todo].color : 'bg-white'} 
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none `
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`capitalize fontubuntu text-lg font-bold ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {todo}
                          </RadioGroup.Label>
                          
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <input ref={ref} type='file' className='hidden' onChange={(e)=>setImage(e.target.files[0])} />
        {image===null && <button onClick={(e)=>{ref.current.click()}} 
        className='my-4 flex gap-4 py-4 shadow-md justify-center items-center w-full p-2 rounded-md text-gray-500  border-gray-400 border-[0.5px] fontubuntu'>
                   <PhotoIcon className='w-10 h-10'/>       Upload Image
        </button>}
        { image && <div onClick={()=>setImage(null)} className='mt-4 hover:grayscale transition-all duration-150 ease-in-out cursor-not-allowed'>
          <img src={URL.createObjectURL(image)} className='w-full h-52'/></div>
        }
        <button onClick={handleOnClick} 
        
        className='bg-blue-400/50 hover:bg-blue-400/80 p-2 rounded-md text-gray-700 mt-4'>Add Task</button>
        
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
