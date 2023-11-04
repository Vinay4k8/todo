import { db } from "@/firebase/firebase";
import {  addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


export const POST=async(req)=>{
  // console.log("gusertask route")
    const {userID}=await req.json();
    
    const userTask=collection(db,"usertask");
    let q=query(userTask,where("userID","==",userID))
    let document=await getDocs(q);
    
    if (document.empty) {
      let res=  await addDoc(userTask, {userID:userID,inprogress:[],todo:[],done:[]})
      
      // let que=query(userTask,res._key.path.segments[1])
      let que = doc(db,"usertask", res._key.path.segments[1]);
      let userDoc = await getDoc(que);
      return new Response(JSON.stringify(userDoc._document.data.value.mapValue.fields));
      // return new Response(JSON.stringify(userDoc))
    }
    const [userDoc]=document.docs
    return new Response(JSON.stringify(userDoc._document.data.value.mapValue.fields))
}