import { db } from '@/firebase/firebase';
import { collection, addDoc, query, getDoc, getDocs, doc } from 'firebase/firestore';


export const POST=async(req)=>{
    // console.log("add route")
    const collectionRef = collection(db, "task");
    const obj= await req.json();
    const docRef = await addDoc(collectionRef, obj);
    const documentId = docRef._key.path.segments[1];
    const taskRef = doc(db, "task",documentId);
    
    const documentSnapshot = await getDoc(taskRef);


  const documentData = documentSnapshot.data();
 
  
 return new Response(JSON.stringify({documentId,documentData}))
}