"use client";
import React, { useContext } from 'react'
import {UserCircleIcon} from "@heroicons/react/24/solid"
import SignIn from './SignIn'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { taskContext } from './TaskContext';

const Header = () => {
  const [user]=useAuthState(auth)
  const {todos}=useContext(taskContext);


  
  return (
    <div>
        <div className='w-full h-96 bg-gradient-to-br from-pink-400 to-blue-400 opacity-70 -z-20 absolute blur-3xl' />
        <div>
            <nav className='p-5 bg-gray-500/30 rounded-md flex justify-between items-center'>
                <div className='fontplay text-blue-800 font-bold text-4xl'>Quests</div>
                <div><SignIn/></div>
            </nav>
        </div>
        <div className='bg-white mt-16 flex-col flex tet-xs md:text-base md:flex-row gap-3 justify-center items-center rounded-md p-2 w-[80%] md:w-[60%] mx-auto text-blue-800 text-base fontubuntu shadow-md '>
            <UserCircleIcon className=' text-blue-800 w-8 h-8' />
            {!user && <div>
              Please login to continue...
              </div>}
            {user && todos && <div className='gap-2'>
            Hello {user.displayName} welcome to Quests app you currently have  {todos.columns.todo.tasks.length}-todos , {todos.columns.inprogress.tasks.length}-inprogress and  {todos.columns.done.tasks.length}  completed tasks. Have a productive day
            </div>}
            
        </div>
    </div>
  )
}

export default Header