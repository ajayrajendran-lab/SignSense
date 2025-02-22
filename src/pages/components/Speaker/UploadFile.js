import React from "react";

function UploadFile(){

  const [ uploadedVideo , setUploadedVideo ] = React.useState( null );
  const[ isUploaded , setIsUploaded ] = React.useState( false );
  const [ fileName , setFileName ] = React.useState( '' );
  function uploadVideo( event ){
    setFileName(event.target.files[0]["name"]);
    const video = event.target.files[0];
    if( video ){
      const videoURL = URL.createObjectURL( video ) ;
      setUploadedVideo( videoURL );
      setIsUploaded( prev => !prev );
    }
  }

  return(
    <div className="flex items-center flex-col md:flex-row text-lg">
      <div className="w-1/2 h-full p-4 select-none">
      <span>Select Video:</span>
        <div className="border-2 border-blue-400 rounded-lg flex flex-col sm:flex-row items-center gap-2 h-16 pl-5 pr-5 text-white bg-blue-400 font-normal ">
          <img className="opacity-30 w-10 mr-5" src="/img/upload.svg" alt="Upload-Icon" />
          <p className="text-base md:text-inherit w-2/4">Select Video for Translation</p>
          <label className="w-1/4 text-center ml-auto border-2 border-white rounded-md transition duration-200 active:scale-95 hover:bg-blue-300 hover:cursor-pointer" htmlFor="file">
            Browse
          </label> 
          <input id="file" className="w-0 opacity-0" type="file" accept="video/*" onChange={ uploadVideo }/>
        </div> 
        { isUploaded && (<>
          <div className="flex mb-2">
            <p className="mt-5">{ fileName }</p>
            <img className=" ml-auto hover:cursor-pointer mt-5" src="/img/close.svg" alt="close" 
            onClick={ () => {setUploadedVideo( null); setIsUploaded( prev => !prev )} } />
          </div>
          <video controls className="mb-5 w-full h-1/2">
            <source src={ uploadedVideo } type="video/mp4" />
            Your browser does not support the video tag.
          </video></>
        )}
      </div>
      <div className="w-1/2 h-full p-4 mb-auto">
        <h1 className="text-center">Transcription:</h1>
          { !isUploaded ? 
          <h1 className="text-center text-red-600">No Video Loaded</h1> : 
          <h1 className="text-center text-green-500">Video Loaded, Transcription will start</h1> }
      </div>
    </div>
      
  );
}

export default UploadFile;