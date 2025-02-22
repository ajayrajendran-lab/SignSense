// /* eslint-disable react/prop-types */
import React from "react";

import HandsContainer from "./HandsConatiner";

function LiveVideo( props ){
  
  // Web Camera Enabling
  const [isLive, setIsLive] = React.useState(false);

  const webCamSection = React.useRef();
  const scrollToBottom =  () => {
    if ( webCamSection.current ) {
      webCamSection.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  };
  
  return (
    <div  ref={webCamSection} className="text-lg font-semibold flex-col sm:flex-row flex gap-2">
      <div className=" w-1/2 flex flex-col justify-start p-4 ">
        { isLive ? <>
          <h1 className="mb-5"><span className="text-violet-400">Perform Something</span> , Capturing Live Feedback:</h1>
            <HandsContainer scrollToBottom={scrollToBottom} setIsLive={setIsLive} />
          </>
         : 
          <button onClick={ () => setIsLive( prev => !prev) } className="bg-green-400 text-white p-4 w-1/2 m-auto rounded-xl border-2 transition duration-200 hover:shadow-xl border-green-400 hover:bg-white hover:text-green-400 " >Start Webcam</button>
        }
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h1 className="text-center">Interpreted Words : </h1>
        { !isLive ? 
          <h1 className="text-red-500 mx-auto">Input Not available</h1>
          : 
          <>
            <h1 className="text-green-500 mx-auto mb-2">Input available, Generating Speech</h1>
          </>
          
        }
      </div>
    </div>
  );
}

export default LiveVideo;


