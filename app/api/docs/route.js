import { db } from "@/firebase/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";



export const PUT=async(req)=>{
    const {column,id}=await req.json();
    // console.log(column,"IN DOCS",id)
    let taskRef=doc(db,"task",id)
    try {
    
            await updateDoc(taskRef,column)
        return new Response(JSON.stringify({success:true}))
        
    } catch (error) {
        return new Response(JSON.stringify({success:false}))
    }
   
}


export const DELETE=async(req)=>{
    try {
        const {id}=await req.json();
        const taskRef=doc(db,"task",id)
        await deleteDoc(taskRef); 
        return new Response(JSON.stringify({success:true}))
    } catch (error) {
        return new Response(JSON.stringify({success:false}))
    }
   
}