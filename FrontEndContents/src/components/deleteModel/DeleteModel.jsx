import React from 'react'
import "./deleteModel.scss"
import { auth, db } from '../../context/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DeleteModel({id,setData,setDeleteModal,data}) {
    async function handleDeleteClick(){
        try{
            await deleteDoc(doc(db, "residents", id));
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE'
          })
          if (response.ok) {
            console.log('User deleted successfully');
            setDeleteModal(false)
            toast.success('Deleted the user', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
          }
          else{
            console.error('Failed to delete user');
          }
        }
          catch(error){
            console.log("Error deleting user",error)
          }
          setData(data.filter(item=>item.id!==id))
    }
  return (
    <div className='modalBackground'>
        <div className="modalContent">
            <div className="titleCloseBtn" onClick={()=>setDeleteModal(false)}>
            <button  className='crossButton'>X</button>
            </div>
            <div className="title">
                <h1>Do you want to delete the user?</h1>
            </div>
            <div className="footer">
                <button onClick={handleDeleteClick} id='deleteBtn'>Delete</button>
                <button onClick={()=>setDeleteModal(false)} >Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModel
