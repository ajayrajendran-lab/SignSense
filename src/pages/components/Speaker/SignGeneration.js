
import React, { useState, useEffect, useRef } from "react";

import Avatar from './Models/Avatar.glb'
import * as words from './Animations/words';
import * as alphabets from './Animations/alphabets';
import { defaultPose } from './Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { TranscriptContext } from "./LiveVedio";

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState( Avatar );
  const [speed, setSpeed] = useState(0.2);
  const [pause, setPause] = useState(400);
  const globalText = React.useContext( TranscriptContext )

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  // let textFromAudio = React.createRef();

  const {
    transcript,
    interimTranscript,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect( () => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xe6f8fe);

    const spotLight = new THREE.SpotLight(0xabcdef, 2);
    spotLight.position.set(0, 1, 5);
    ref.scene.add(spotLight); 
    ref.renderer = new THREE.WebGLRenderer({ antialias: true });

    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth * 0.57 / (window.innerHeight - 70),
        0.1,
        1000
    )
    ref.renderer.setSize(window.innerWidth * 0.29, window.innerHeight - 400);

    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.5;
    ref.camera.position.y = 1.45;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
    });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
      }
    );

  }, [ref, bot]);

  ref.animate = () => {
    if(ref.animations.length === 0){
        ref.pending = false;
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          if(ref.animations[0][0]==='add-text'){
            setText(text + ref.animations[0][1]);
            ref.animations.shift();
          }
          else{
            for(let i=0;i<ref.animations[0].length;){
              let [boneName, action, axis, limit, sign] = ref.animations[0][i]
              if(sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit){
                  ref.avatar.getObjectByName(boneName)[action][axis] += speed;
                  ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                  i++;
              }
              else if(sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit){
                  ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
                  ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                  i++;
              }
              else{
                  ref.animations[0].splice(i, 1);
              }
            }
          }
        }
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  }
  
  const sign = ( input ) => {
    
    var str = input.toUpperCase();
    console.log( "Ref Val = " + str );
    var strWords = str.split(' ');
    setText('')

    for(let word of strWords){
      if(words[word]){
        ref.animations.push(['add-text', word+' ']);
        words[word](ref);
        
      }
      else{
        for(const [index, ch] of word.split('').entries()){
          if(index === word.length-1)
            ref.animations.push(['add-text', ch+' ']);
          else 
            ref.animations.push(['add-text', ch]);
          alphabets[ch](ref);
          
        }
      }
    }
  }

  const [interimText , setInterimText ] = useState( '' );
  useEffect( () => {
    if( interimTranscript.length !== 0 ){
      setInterimText( `${ interimTranscript }.` )
    }else{
      console.log( "Temp : " + interimText );
      sign( transcript );
      resetTranscript();
    }
  } , [ interimTranscript , interimText ] );

  return (
    <div className='flex flex-col items-center'>
      <div className="border border-solid border-black w-8/12 min-h-12 m-auto my-5 rounded-2xl shadow-lg shadow-gray-300 py-2 px-4">{globalText}</div>
      {/* <div className='rounded-3xl' > */}
      <div id='canvas'/>
      {/* </div> */}
      <div className="flex flex-col w-8/12">
        <label className='mr-auto my-2'>Processed Text : </label>
        <div className="border border-solid border-black w-8/12 min-h-12 m-auto mb-4 rounded-2xl shadow-lg shadow-gray-300 py-2 px-4">{ text }</div>
      </div>
        
    </div>
  )
}

export default Convert;