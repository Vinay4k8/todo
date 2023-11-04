import { storage } from "@/firebase/firebase"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"

export const imageUpload=async(image)=>{
    if(!image) return null
    let imageRef=ref(storage,`images/${image.name+v4()}`)
    await uploadBytes(imageRef,image)
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}