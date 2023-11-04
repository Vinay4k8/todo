import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";




export const POST=async(req)=>{
  // console.log("getdocs route")
 const {data}=await req.json();
const tasksCollection = collection(db, 'task');


const taskQuery = query(tasksCollection, where('__name__', 'in', data));


const querySnapshot = await getDocs(taskQuery);


const populatedData = [];
querySnapshot.forEach((doc) => {
  const data = doc.data();
  
  populatedData.push(data);})
  return new Response(JSON.stringify(populatedData))
}