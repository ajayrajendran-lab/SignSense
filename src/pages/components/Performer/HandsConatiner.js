import { useContext, useEffect, useRef, useState } from 'react';
import { Results, Hands, HAND_CONNECTIONS, VERSION } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks, Data, lerp } from '@mediapipe/drawing_utils';

const HandsContainer = ( props ) => {

  const [ stream, setStream ] = useState( null );
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const inputVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }

    if (inputVideoRef.current && canvasRef.current) {
      console.log('rendering');
      contextRef.current = canvasRef.current.getContext('2d');

      const constraints = {
        video: {
          width: { min: 1280 },
          height: { min: 720 }
        }
      };

      navigator.mediaDevices.getUserMedia( constraints ).then((stream) => {
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
          setStream( stream );
        }
        sendToMediaPipe();
      });

      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      hands.onResults(onResults);

      const sendToMediaPipe = async () => {
        if (inputVideoRef.current) {
          if (!inputVideoRef.current.videoWidth) {
            console.log(inputVideoRef.current.videoWidth);
            requestAnimationFrame(sendToMediaPipe);
          } else {
            await hands.send({ image: inputVideoRef.current });
            requestAnimationFrame(sendToMediaPipe);
          }
        }
      };
    }
  }, [inputVideoReady]);

  const onResults = (results) => {
    if (canvasRef.current && contextRef.current) {
      setLoaded(true);
      contextRef.current.save();
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      contextRef.current.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.multiHandLandmarks && results.multiHandedness) {
        for (let index = 0; index < results.multiHandLandmarks.length; index++) {
          const classification = results.multiHandedness[index];
          const isRightHand = classification.label === 'Right';
          const landmarks = results.multiHandLandmarks[index];

          drawConnectors(contextRef.current, landmarks, HAND_CONNECTIONS, {
            color: isRightHand ? '#00FF00' : '#FF0000'
          });

          drawLandmarks(contextRef.current, landmarks, {
            color: isRightHand ? '#00FF00' : '#FF0000',
            fillColor: isRightHand ? '#FF0000' : '#00FF00',
            radius: (data) => {
              return lerp(data.from.z, -0.15, 0.1, 6, 1);
            }
          });
        }
      }
      contextRef.current.restore();
    }
  };

  function stopLive(){
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      inputVideoRef.current.srcObject = null;
      setStream(null);
    }
    props.setIsLive( prev => !prev);
  }

  return (
    <div className="flex flex-col">
      <div className='flex relative'>
        <video
          style={ {display:"none"} }
          autoPlay
          ref={(el) => {
            inputVideoRef.current = el;
            setInputVideoReady(!!el);
          }}
        />
        <canvas className='w-11/12 h-8/12 m-auto' ref={canvasRef} width={1280} height={720} />
        { !loaded && (
          <div className="loader m-auto">
          </div>
      )}
      </div>
      <button onClick={ stopLive } className="bg-red-400 text-white p-4 w-1/2 m-auto rounded-xl border-2 transition duration-200 hover:shadow-xl border-red-400 hover:bg-white hover:text-red-400 my-5"> 
        Stop Webcam
      </button>
    </div>
  );
};

export default HandsContainer;