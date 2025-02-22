/* eslint-disable react/prop-types */

import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectRole( props ){

    const navigateTo = useNavigate();
    function goToSpeaker() {
        navigateTo('/Speaker');
    }
    function goToPerformer() {
        navigateTo('/Performer');
    }

    function handleOverlayClick( event ){
        if( event.target === event.currentTarget ){
            props.exitRoleDialogue();
        }
    }

    return(
        <div 
            className="overlay flex items-center justify-center"
            onClick={ handleOverlayClick }
        >
            <section className="bg-white w-2/4 p-4 pb-16 rounded-3xl select-none">
                <div className='pt-1 hover:cursor-pointer' onClick={props.exitRoleDialogue }> 
                    <img className='ml-auto' src="img/close.svg" alt="Close-Dialogue" />
                </div>
                <h1 className='text-center text-2xl font-semibold mb-6 text-blue-400'>Select Your Role</h1>
                <div className="flex flex-col sm:flex-row justify-center text-center text-gray-500 gap-16">
                    {/* <Link to='/Speaker'> */}
                    <div className='p-4 transition duration-450 rounded-3xl border-2 border-orange-100  hover:shadow-xl hover:shadow-orange-200 hover:cursor-pointer ' onClick={goToSpeaker}>
                        <h2 className='font-bold text-2xl mb-2'>Speaker</h2>
                        <img className="m-auto h-12 opacity-55" src="img/speaker.svg" alt="Person_speaking" />
                        <p className=' mt-2'>Convert Spoken Words into <br /> Sign Language</p>
                    </div>
                    {/* </Link> */}
                    {/* <Link to='/Performer' > */}
                    <div className="p-4 transition duration-450 rounded-3xl border-2 border-violet-100 hover:shadow-xl hover:shadow-violet-200 hover:cursor-pointer" onClick={goToPerformer}>
                        <h2 className='font-bold text-2xl mb-2'>Performer</h2>
                        <img className="m-auto h-12 opacity-55" src="img/sl-icon.svg" alt="" />
                        <p className='mt-2'>Convert Sign Language into <br /> Corresponding Speech</p>
                    </div>
                    {/* </Link> */}
                </div>
            </section>
        </div>  
    )
}
export default SelectRole;