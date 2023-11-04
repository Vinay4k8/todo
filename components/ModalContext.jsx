"use client";
import React, { createContext, useState } from 'react'


export const modalContext=createContext({})

const ModalContext = ({children}) => {

    const [open,setOpen]=useState(false);
    const [taskType,setTaskType]=useState("")

  return (
        <modalContext.Provider value={{open,setOpen,taskType,setTaskType}}>
            {children}
        </modalContext.Provider>
    )
}

export default ModalContext