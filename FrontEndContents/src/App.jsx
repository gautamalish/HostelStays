import "./App.scss";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Signin from "./pages/login/Signin";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/home/Home";
import Menu from "./pages/meals/Meals";
import Rooms from "./pages/Rooms/Rooms";
import Staffs from "./pages/staffs/Staffs";
import Tenants from "./pages/tenants/Tenants";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth } from "./context/AuthContext";
import Logout from "./pages/Logout/Logout";
import React from "react";
import New from "./pages/AddNew/AddNewResident";
import NewStaff from "./pages/AddNew/AddNewStaff";
import { userInputs } from "./formSource";
import Tablefunc from "./components/table/Table"; // Import Tablefunc component
import { useNewAuth } from "./context/AnotherContext";
import Settings from "./pages/Settings/Settings";
function App() {
const [showHamSidebar,setShowHamSidebar]=useState(false)
const [showHamIcon,setShowHamIcon]=useState(false)
const [isWideScreen,setIsWideScreen]=useState(window.innerWidth>700)



useEffect(()=>{
  function handleResize(){
    setIsWideScreen(window.innerWidth>700)
    if(window.innerWidth<700){
      setShowHamIcon(true)
    }
    else{
      setShowHamIcon(false)
    }
  }
  window.addEventListener("resize",handleResize)
  handleResize()

  return ()=>window.removeEventListener("resize",handleResize)
},[])



  const { logoutDisplay, setLogoutDisplay } = useNewAuth();
  // taking the currentUser from useAuth function
  const { currentUser } = useAuth();
  // require auth to check if the user is logged in and can only navigate to pages when logged in
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <div className="mainContainer">
      {logoutDisplay && <Logout />}
      <Routes>
        <Route path="/">
          <Route index element={<Signin />} />
          <Route
            path="home"
            element={
              <RequireAuth>
                <Home isWideScreen={isWideScreen} showHamIcon={showHamIcon} setShowHamIcon={setShowHamIcon} setShowHamSidebar={setShowHamSidebar} showHamSidebar={showHamSidebar}/>
              </RequireAuth>
            }
          />
          <Route
            path="rooms"
            element={
              <RequireAuth>
                <Rooms />
              </RequireAuth>
            }
          />
          <Route
            path="settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="menu"
            element={
              <RequireAuth>
                <Menu />
              </RequireAuth>
            }
          />
          <Route
            path="staffs"
            element={
              <RequireAuth>
                <Staffs />
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <New inputs={userInputs} title="Add New Resident" />
              </RequireAuth>
            }
          />
          <Route
            path="newstaff"
            element={
              <RequireAuth>
                <NewStaff inputs={userInputs} title="Add New Staff" />
              </RequireAuth>
            }
          />
          <Route
            path="tenants"
            element={
              <RequireAuth>
                <Tenants />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="table" // Define path for Tablefunc component
            element={
              <RequireAuth>
                <Tablefunc />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
