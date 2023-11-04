"use client"
import { auth } from '@/firebase/firebase'
import React, { createContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'


export const taskContext=createContext({})

const TaskContext = ({children}) => {

    const [taskIds,setTaskIds]=useState({todo:[],inprogress:[],done:[]})
    const [todos,setTodos]=useState({
        columnsOrder:["todo","inprogress","done"],
        columns:{
            todo:{title:"todo",tasks:[]},
            inprogress:{title:"inprogress",tasks:[]},
            done:{title:"done",tasks:[]},
        }
        })
        const [user]=useAuthState(auth)

        useEffect(()=>{
            if(user){
                getTasks();
            }else{
                setTodos({
                    columnsOrder:["todo","inprogress","done"],
                    columns:{
                        todo:{title:"todo",tasks:[]},
                        inprogress:{title:"inprogress",tasks:[]},
                        done:{title:"done",tasks:[]},
                    }
                    })
            }
            
        },[user])

    const getTasks=async()=>{
        let res=await fetch("/api/usertask/getusertask",{
            method:"POST",body:JSON.stringify({userID:user.uid})
        })
        let newobj=await res.json();
        let updateData=todos
        
        let iterativetodo=["todo","inprogress","done"]
        for(let i=0;i<iterativetodo.length;i++){
            let newArr=newobj[iterativetodo[i]].arrayValue.values.map(({stringValue})=>{return stringValue})
            if(newobj[iterativetodo[i]].arrayValue.values.length>0){
                let data=await fetch("/api/docs/getDocs",{method:"POST"
                ,body:JSON.stringify({data:newArr})})
                updateData.columns[iterativetodo[i]].tasks=await data.json()
            }
            setTaskIds(prv=>({...prv,[iterativetodo[i]]:newArr}))
        }
        setTodos(updateData)

    }

    const fetchDocs=async(taskarr)=>{
        let data=await fetch("/api/docs/getDocs",{method:"POST"
        ,body:JSON.stringify({data:taskarr})})
        return await data.json()
    }

    
    const addTask=async(document)=>{
        let newarTask=taskIds[document.documentData.column]
        newarTask.push(document.documentId)

        setTaskIds(prv=>({...prv,[document.documentData.column]:newarTask}))
        let res=await fetch("/api/usertask",{
            method:"POST",body:JSON.stringify({userID:user.uid,data:{[document.documentData.column]:newarTask}})
        })

        
       
    }
    const deleteTask=()=>{}

  return (
        <taskContext.Provider value={{addTask,deleteTask,taskIds,setTaskIds,todos,setTodos,getTasks}}>
            {children}
        </taskContext.Provider>

    )
}

export default TaskContext