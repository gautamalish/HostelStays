import React, { useEffect, useState } from 'react'
import "./staffsDataTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../dataTableSrc';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs,onSnapshot, snapshotEqual } from "firebase/firestore";
import { auth, db } from '../../context/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { Unsubscribe } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModel from '../deleteModel/DeleteStaffsModel';
function DataTable() {
  const [data,setData]=useState([])
  const {currentUser}=useAuth()
  const [deleteModal,setDeleteModal]=useState(false)
  const [idToDelete,setIdToDelete]=useState(null)
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "staffs"), (snapShot) => {
      let list=[]
      snapShot.docs.forEach((doc)=>{
        list.push({id:doc.id,...doc.data()})
      });
      setData(list)
    },(error)=>{
      console.log(error)
    });
    return()=>{
      unsub()
    }
  },[])
  async function handleDeleteClick(id){
  setDeleteModal(true);
  setIdToDelete(id);
  }
    const actionColumn=[
    {field:"action",headerName:"Action",width:200,renderCell:(params)=>{
      return(
        <div className='cellAction'>
          <div className='deleteButton' onClick={()=>handleDeleteClick(params.row.id)}>Delete</div>
        </div>
      )
    }}
  ]
  const getRowHeight = () => {
    return 80; // Set the row height to 100 pixels
  };
  return (
    <div className='dataTable'>
      {deleteModal && <DeleteModel id={idToDelete} setData={setData} setDeleteModal={setDeleteModal} data={data}/>}
      <div className="dataTableTitle">
        Staffs
        {currentUser.email=="np03cs4a220120@heraldcollege.edu.np" && <Link to="/newstaff" style={{textDecoration:"none"}} className='link'>Add New</Link>}
      </div>
      <DataGrid className='dataGrid'
        rows={data}
        columns={currentUser.email=="np03cs4a220120@heraldcollege.edu.np"?userColumns.concat(actionColumn):userColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowHeight={getRowHeight}
      />
      <ToastContainer/>
    </div>
  )
}

export default DataTable