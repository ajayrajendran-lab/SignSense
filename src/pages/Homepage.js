import { Link } from "react-router-dom";
import React from "react";

// import "./components/Homepage/css/homepage.css"

import Logo from "./components/Homepage/Logo";
import Introduction from "./components/Homepage/Introduction";
import SelectRole from "./components/Homepage/SelectRole";
import TnC from "./components/Homepage/TnC";

function HomePage(){
    
  const [TnCCheck , setTnCCheck] = React.useState( false );
  function acceptTnC(){
      setTnCCheck( prevState => !prevState )
  }

  const [roleSelected , setRoleSelection ] = React.useState( false );
  function openRoleDialogue(){
    setRoleSelection( prevState => !prevState )
  }

  const [showTnC , setShowTnC ] = React.useState( false );
  function openTnC(){
    setShowTnC( prevState => !prevState );
  }

  return(
    <main className="m-auto flex flex-row w-4/6 h-3/4 rounded-3xl shadow-2xl p-2 bg-white">
      { roleSelected && <SelectRole exitRoleDialogue={openRoleDialogue} />}
      { showTnC && <TnC exitTnCDialogue={ openTnC } /> }
      <section className=" w-7/12 px-8 overflow-y-scroll">
        <Logo />
        <Introduction />
        <label className="chck-box-container text-xl mb-5">
          I  Accept to <Link onClick={ openTnC } >Terms and Conditions</Link>
          <input 
            type="checkbox" 
            checked={TnCCheck}
            onChange={acceptTnC}
          />
          <span className="checkmark"></span>
        </label>
        { TnCCheck ? <button 
          // { TnCCheck ?  "enabled-btn" : "disabled-btn" }
          className="text-white bg-blue-400 h-16 w-auto px-8 font-semibold text-lg mb-8 rounded-xl border-2 border-blue-400 transition duration-250 hover:bg-white hover:text-blue-400 active:scale-95"
          onClick={ TnCCheck && openRoleDialogue }
        >
          Enter into <span>SignSense</span>
        </button> : <button 
          className="text-white bg-blue-400 h-16 w-auto px-8 font-semibold text-lg mb-8 rounded-xl border-2 border-blue-400 transition duration-250 hover:cursor-not-allowed opacity-60 scale-90"
        >
          Enter into <span>SignSense</span>
        </button>}

      </section>
      <section className="flex justify-center items-center w-5/12">
        <img className="object-contain hue-rotate-60 " src="/img/8773748.jpg" alt="SignSense-Intro" />
      </section>
    </main>
  )
}

export default HomePage;