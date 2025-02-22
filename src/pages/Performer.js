import React from "react";

import Header from "./components/Performer/Header";
import UploadFile from "./components/Performer/UploadFile";
import LiveVideo from "./components/Performer/LiveVedio";
// import HandsContainer from "./components/Performer/HandsConatiner";

function Performer(){

  const [ isLive , setIsLive ] = React.useState( false );
  const [ camStatus , setCamStatus ] = React.useState( false );
  function startLive(){
    if( isRecorded ){
      setIsRecorded( prev => !prev );
      setIsLive( prev => !prev );
    }else{
      setIsLive( prev => !prev );
    }
  }

  const [ isRecorded , setIsRecorded ] = React.useState( false );
  function recordedVideo(){
    if( isLive ){
      setIsRecorded( prev => !prev );
      setIsLive( prev => !prev );
    }else{
      setIsRecorded( prev => !prev );
    }
  }

  return(
    <>
      <Header />
      <main className=" text-black align-middle font-bold text-2xl p-10 h-auto">
        <h1 className="text-center text-3xl">Hello <span className="text-violet-400">Performer</span>,
        Welcome to <span className="text-blue-500">SignSense</span><br/>
        Choose your Action to Perform</h1>
        <section className="mt-5">
          <h1 className="text-2xl text-center mt-4 mb-4">Translate:</h1>
          <div className="flex flex-row items-center justify-center gap-10 ">
            <button className="text-white bg-blue-400 h-16 w-52 px-8 font-semibold text-lg mb-8 rounded-xl border-2 border-blue-400 transition duration-250 hover:bg-white hover:text-blue-400 active:scale-95 "
              onClick={ camStatus ? 
                () => alert("Close WebCam to change Functions") 
                : recordedVideo 
              }>
              Recorded Video
            </button>
            <button className=" text-white bg-blue-400 h-16 w-52 px-8 font-semibold text-lg mb-8 rounded-xl border-2 border-blue-400 transition duration-250 hover:bg-white hover:text-blue-400 active:scale-95 "
              onClick={ camStatus ? 
                () => alert("Close WebCam to change Functions") 
                : startLive }>
              Live Actions
            </button>
          </div>
          { isRecorded && <UploadFile /> }
          {/* { isLive && <LiveVideo camStat={camStatus} setCamStatus={setCamStatus} /> } */}
          { isLive && <LiveVideo />}
        </section>
      </main>
    </>
  );
}

export default Performer;