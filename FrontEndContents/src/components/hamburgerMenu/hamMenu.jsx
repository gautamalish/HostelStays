import React from 'react'
import "./hamMenu.scss"
import { RxHamburgerMenu } from "react-icons/rx";
function HamMenu({setShowHamSidebar}) {
    function handleClick(){
        setShowHamSidebar(prev=>!prev)
    }
  return (
      <div className="hamMenuDiv" onClick={handleClick}>
        <RxHamburgerMenu style={{fontSize:"30px"}}/>
      </div>
  )
}

export default HamMenu
