
import { useEffect, useState } from 'react'

import Note from '../components/Note'
import { ThreeCircles } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1);

  const getNotes = async(pageNum)=>{
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API}/notes?page=${pageNum}`)
      const {notes,totlaNotes,totalPages} = await response.json()
      setTotalPage(totalPages)
      setNotes(notes)
      setLoading(false)
  };
  useEffect(_=>{
    getNotes(currentPage)
  },[currentPage]);

  const handlePrev = () =>{
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNext = () =>{
    if(currentPage < totalPage){
      setCurrentPage(currentPage + 1)
    }
  }
  const customAlert = (message,error = false) =>{
    if(error){
      toast.error(message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }else{
       toast.success(message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }
  }
   
  return (
    <section className='flex gap-6 px-10 mt-10 flex-wrap mx-auto w-full justify-center'>
      {
        !loading && notes?.length > 0 ? (<>
          {
          notes?.map(note =>(
          <Note key={note._id} note={note} getNotes={getNotes} customAlert={customAlert}/>))
          }
          <div className='w-full flex items-center justify-center gap-3'>
            {
            currentPage > 1 && (<button type="button" className='text-white font-medium bg-teal-600 px-3 py-1'
            onClick={handlePrev}>Prev Page</button>)
            }
            {
            currentPage < totalPage && (<button type="button" className='text-white font-medium bg-teal-600 px-3 py-1'
            onClick={handleNext}>Next Page</button>)
            }
          </div>
      </>) : (
      <div className='flex justify-center items-center w-full'>
        <ThreeCircles
      visible={loading}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      {
        !loading && notes.length === 0 && <p>Notes are not created yet!</p>
      }
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