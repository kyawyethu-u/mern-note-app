
import { useEffect, useState } from 'react'

import Note from '../components/Note'
import { ThreeCircles } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [notes,setNotes] = useState();
  const [loading,setLoading] = useState(false);

  const getNotes = async()=>{
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API}/notes`)
      const notes = await response.json()
      setNotes(notes)
      setLoading(false)
  };
  useEffect(_=>{
    getNotes()
  },[])

  const customAlert = (message) =>{
    toast.success(message,{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
  }
  return (
    <section className='flex gap-6 px-10 mt-10 flex-wrap mx-auto w-full justify-center'>
      {
        !loading && notes?.length > 0 ? (<>
        {
        notes?.map(note =>(
        <Note key={note._id} note={note} getNotes={getNotes} customAlert={customAlert}/>))
        }
      </>) : (
      <div className='flex justify-center items-center w-full'>
        <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </div>)
      }
       <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
    </section>
  )
}

export default Index