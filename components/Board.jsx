"use client"
import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import { taskContext } from './TaskContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'

const Board = () => {
    const [ready,setReady]=useState(false);
    const {todos,setTodos,taskIds,setTaskIds}=useContext(taskContext);
    const [user]=useAuthState(auth)
    useEffect(()=>{
        setReady(true)
    },[todos])

    const dragEnd=async(e)=>{
        
        const {draggableId,source,destination}=e
        if(!destination)
            return

        if(destination.index===source.index && source.droppableId===destination.droppableId)
        return
        let obj=todos.columns[source.droppableId].tasks[source.index]
        obj.column=destination.droppableId
        let newTaskIds=taskIds

        let souCol=todos.columns[source.droppableId]
        souCol.tasks.splice(source.index,1);
        let id=newTaskIds[source.droppableId][source.index]
        newTaskIds[source.droppableId].splice(source.index,1);

        let destCol=todos.columns[destination.droppableId]
        destCol.tasks.splice(destination.index,0,obj)
        newTaskIds[destination.droppableId].splice(destination.index,0,id)


        let dup=todos
        dup.columns[source.droppableId]=souCol
        dup.columns[destination.droppableId]=destCol
       
        setTodos(dup)
        setTaskIds(newTaskIds)
        let res=await fetch("/api/usertask",{
            method:"POST",body:JSON.stringify({userID:user.uid,data:{
                [destination.droppableId]:newTaskIds[destination.droppableId],
                [source.droppableId]:newTaskIds[source.droppableId]
            }})
        })

        let docUpdate=await fetch("/api/docs",{
            method:"PUT",
            body:JSON.stringify({
                    id,column:{column:destination.droppableId}
            })
        })
    }

  return (
    <div>
        <DragDropContext onDragEnd={dragEnd}>
            <div className='grid md:grid-cols-3 gap-5 w-full'>
                
                {ready && todos.columnsOrder.map((column,index)=>(
                    <Column col={todos.columns[column]}  key={index}/>
                    ))}
            </div>
        </DragDropContext>
    </div>
  )
}

export default Board