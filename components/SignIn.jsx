"use client"

import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {FcGoogle} from "react-icons/fc"
import app from "@/firebase/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

const SignIn = () => {
    const auth=getAuth(app)
    const [user]=useAuthState(auth)

    
    const handleSignIn=async()=>{
      try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        // Sign-in successful, you can add any additional logic here
      } catch (error) {
        console.error('Error signing in with Google', error);
      }
    }

    const handleSignOut=async()=>{
      await signOut(auth);
      
    }

  return (
    <div>
       {!user && <button onClick={handleSignIn} 
        className='bg-white gap-3 rounded-md p-2 text-lg font-medium flex items-center justify-center tracking-[1px] shadow-md'> 
          <FcGoogle size={20} />
          SignIn
        </button>}
        {user && <div>
          <div className='rounded-full flex gap-4'>
            <Image width={30} height={30} className='w-10 h-10 rounded-full' src={user.photoURL}
            alt={user.displayName}
            /> 
            <div>
              <button onClick={handleSignOut} className='shadow-md rounded-md p-2 bg-red-400'>
                <ArrowLeftOnRectangleIcon className='w-7 h-7 text-white'/>
              </button>
            </div>
          </div>
          </div>}
    </div>
  );
};

export default SignIn;

    // {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> */}