"use client";
import Board from "@/components/Board";
import { Modal } from "@/components/Modal";
import ModalContext from "@/components/ModalContext";



export default function Home() {
  return (
    <main className="max-w-7xl mx-auto mt-10 mb-10">
      <div className="flex justify-center items-center">
        
        <ModalContext>
        
            <Modal/>
            <Board/>
        </ModalContext>
        
      </div>
    </main>
  )
}
