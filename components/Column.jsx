"use client";
import React, { useContext, useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Card from './Card'
import { modalContext } from './ModalContext';
import { taskContext } from './TaskContext';

const Column = ({ col }) => {
    const {setTaskType,setOpen}=useContext(modalContext)
    const {todos,taskIds}=useContext(taskContext)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        setReady(true)
    },[todos])


    const handleOpen=()=>{
        setTaskType(col.title);
        setOpen(true);
    }

    return (ready &&
        <Droppable droppableId={col.title} >
            {(provided,snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className=''
                >
                    <div className={`bg-white/50 rounded-md p-3 ${snapshot.isDraggingOver?"bg-green-400/50":""}`}>
                        <div className='m-2 flex justify-between items-center gap-10'>
                            <div className='capitalize text-xl fontubuntu font-bold'>{col.title}</div>
                            <div className='flex items-center justify-center h-7 w-7 rounded-full bg-white/40 text-gray-500'>{col.tasks.length}
                            </div>
                        </div>
                        <div className='m-2'>
                            {col.tasks.map((task, index) => (
                                <Draggable draggableId={`${task.content}${index}`} index={index} key={`${task.content}${index}`}>
                                    {provi => (
                                        <div ref={provi.innerRef} {...provi.dragHandleProps} {...provi.draggableProps}>
                                            <Card task={task} id={taskIds[col.title][index]} index={index}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        <button onClick={handleOpen}>
                            <PlusCircleIcon className='ml-auto text-green-500 w-8 h-8 m-2' />
                        </button>
                    </div>
                </div>

            )}
        </Droppable>
    )
}

export default Column