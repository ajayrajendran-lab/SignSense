// /* eslint-disable react/prop-types */
import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import SignGeneration from "./SignGeneration"

export const TranscriptContext = React.createContext();

function LiveVideo( props ){
  
  // Web Camera Enabling
  const [stream, setStream] = React.useState(null);
  const videoRef = React.useRef();

  React.useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  function enableCapture() {
    props.setCamStatus( prev => !prev );
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    }).then( stream => {
      setStream( stream );
    })
    .catch(error => {
      console.error('Error accessing webcam:', error);
    });
    setIsLive( prev => !prev );
    listenContinuously();
  }
  function stopCapture() {
    props.setCamStatus( prev => !prev );
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
    setIsLive( prev => !prev );
    SpeechRecognition.stopListening();
  }

  // Speech Recognition
  const [isLive, setIsLive] = React.useState( false );
  const [ transcriptText, setTranscriptText ] = React.useState( "" );
  const {
    transcript,
    finalTranscript,
    interimTranscript,
    resetTranscript,
  } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Your Current Browser Does Not Suport Speech Recognition!");
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    }); 
  };

  const [ interimText , setInterimText ] = React.useState( "" );
  React.useEffect( () =>{
    if( interimTranscript.length !== 0 ){
      setInterimText( `${ interimTranscript }.` )
    }else{
      console.log( "Temp : " + interimText );
      setTranscriptText( prev => prev + interimText + " " );
    }
  } , [ interimText, interimTranscript ] );
  
  return (
    <div className="text-lg font-semibold flex-col sm:flex-row flex gap-2">
      <div className=" w-1/2 flex flex-col justify-start p-4 ">
        { stream ? <>
          <h1 className="mb-5"><span className="text-orange-400">Say Something</span> , Capturing Live Feedback:</h1>
          <video ref={ videoRef } className="w-8/12 mx-auto border-4 border-solid rounded-lg border-red-600" autoPlay playsInline />
          </>
         : 
          <button onClick={ enableCapture } className="bg-green-400 text-white p-4 w-1/2 m-auto rounded-xl border-2 transition duration-200 hover:shadow-xl border-green-400 hover:bg-white hover:text-green-400 " >Start Webcam</button>
        }
        { stream && 
          <button onClick={ stopCapture } className="bg-red-400 text-white p-4 w-1/2 m-auto rounded-xl border-2 transition duration-200 hover:shadow-xl border-red-400 hover:bg-white hover:text-red-400 my-5"> 
            Stop Webcam
          </button>
        }
        { stream && 
          <div className="flex flex-col">
            <h1 >Transcribed Text : </h1>
            <p className="border border-solid border-black w-11/12 min-h-12 m-auto my-5 rounded-2xl shadow-lg shadow-gray-300 py-2 px-4"> {transcriptText} </p>
            <button className="border-2 border-orange-400 bg-orange-400 text-white w-1/4 text-center mx-auto h-12 rounded-md transition duration-200 hover:shadow-orange-300 hover:shadow-2xl hover:cursor-pointer active:scale-95 hover:text-orange-400 hover:bg-white" onClick={ () => { setTranscriptText( "" ) } }> Reset </button> 
          </div>
        }
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h1 className="text-center">Interpreted Actions : </h1>
        { !stream ? 
          <h1 className="text-red-500 mx-auto">Input Not available</h1>
          : 
          <>
            <h1 className="text-green-500 mx-auto mb-2">Input available, Generating sign Language</h1>
              <TranscriptContext.Provider value={interimText} >
                <SignGeneration />
              </TranscriptContext.Provider>
          </>
          
        }
      </div>
    </div>
  );
}

export default LiveVideo;


