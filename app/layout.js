
import Header from '@/components/Header'
import './globals.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { Toaster } from 'react-hot-toast'
import TaskContext from '@/components/TaskContext'

export const metadata = {
  title: 'TODO',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Toaster/>
        <TaskContext>
        <Header/>
          <div>
           {children}
          </div>
        </TaskContext>
        </body>
    </html>
  )
}