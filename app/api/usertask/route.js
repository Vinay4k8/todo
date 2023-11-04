import { query, where, getDocs,  setDoc ,collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';


export const POST=async(req)=>{
    // console.log("usertask route")
    const { userID ,data} = await req.json();
    
    const userTask = collection(db, "usertask");
  
    // Create a query to find a document with a matching userID
    const q = query(userTask, where("userID", "==", userID));
  
        let doc=await getDocs(q)
        
        // Update the existing document
        const [existingDoc] = doc.docs;
        await updateDoc(existingDoc.ref, data);
  
        return new Response(JSON.stringify(existingDoc._document.data.value.mapValue.fields))
      
}


