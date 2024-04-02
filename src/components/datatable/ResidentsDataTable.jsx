import React, { useEffect, useState } from 'react'
import "./dataTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../dataTableSrc';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../../context/firebase';
import { doc, deleteDoc } from "firebase/firestore";
function DataTable() {
  const [data,setData]=useState([])
  const {currentUser}=useAuth()

  useEffect(()=>{
    async function fetchData(){
      let list=[]
      try{
        const querySnapshot = await getDocs(collection(db, "residents"));
        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,...doc.data()})
        });
        setData(list)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  async function handleDeleteClick(id){
    try{
      await deleteDoc(doc(db, "residents", id));
    }
    catch(error){
      console.log(error)
    }
    setData(data.filter(item=>item.id!==id))
  }
  console.log(data)
  const actionColumn=[
    {field:"action",headerName:"Action",width:200,renderCell:(params)=>{
      return(
        <div className='cellAction'>
          <Link to="/users/test" style={{textDecoration:"none"}}>
          <div className='viewButton'>Update</div>
          </Link>
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
      <div className="dataTableTitle">
        Residents
        {currentUser.email=="admin@gmail.com" && <Link to="/new" style={{textDecoration:"none"}} className='link'>Add New</Link>}
      </div>
      <DataGrid className='dataGrid'
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowHeight={getRowHeight}
      />
    </div>
  )
}

export default DataTable