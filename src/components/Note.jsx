import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'

import { useContext } from 'react';

import { Link } from 'react-router-dom'
import { formatISO9075 } from "date-fns";

import {UserContext}  from "../contexts/UserContext"

const Note = ({note,getNotes,customAlert}) => {
  const {token} = useContext(UserContext);
  const {_id,title,content,createdAt} = note;
  
  const deleteNote = async() =>{
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`,{
      method: "delete",
      headers: {
        Authorization:  `Bearer ${token.token}`
      }
    });
    if(response.status === 204){
      customAlert("Post deleted!")
      getNotes()
        }else{
      customAlert("Auth failed",true)
        }
  }
  return (
  <>
    <div className='w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3'>
            <h3 className='text-xl font-medium'>{title}</h3>
            <p className='text-sm'>{content.slice(0,120)}</p>
            <div className='flex items-center justify-between mt-2 border-t pt-2 h-fit'>
              <p className='text-sm font-medium'>{formatISO9075(new Date(createdAt),{representation: "date"})}</p>
              <div className='flex items-center justify-end gap-2'>
                {
                  token && (<>
                    {
                      note.creator.toString() === token.userId && (<>
                      <TrashIcon width={20} className='text-red-600 cursor-pointer' onClick={deleteNote}/>
                      <Link to={"/edit/"+ _id}><PencilSquareIcon width={20} className='text-teal-600'/></Link>
                      </>)
                    }
                  </>)
                }
                <Link to={"/notes/"+ _id}><EyeIcon width={20} className='text-gray-600'/></Link>
              </div>
            </div>
        </div>
  </>
  )
}

export default Note