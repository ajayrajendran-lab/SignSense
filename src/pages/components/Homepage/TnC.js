/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";

function TnC( props ){

    function handleOverlayClick( event ){
        if( event.target === event.currentTarget ){
            props.exitTnCDialogue();
        }
    }

    return(
        <div 
            className="overlay flex"
            onClick={ handleOverlayClick }
        >
            <section className="bg-white m-auto overflow-y-scroll h-5/6 w-4/6 p-4 rounded-3xl select-none">
                <div className='pt-1 sticky top-0 hover:cursor-pointer' onClick={ props.exitTnCDialogue }> 
                  <img className='ml-auto' src="img/close.svg" alt="Close-Dialogue" />
                </div>
                <h1 className='text-center text-2xl font-semibold mb-6 text-blue-400'>Terms and Conditions</h1>
                <div className=" pl-20 pr-20 text-black ">
                  <ol>
                    <li className="mt-4">
                      <strong >Introduction</strong>:
                      <p>
                        These Terms and Conditions ("Terms") govern your access and use of the SignSense platform ("Platform"), which provides real-time sign language interpretation services through speech recognition, computer vision, and machine learning. By accessing or using the Platform, you agree to be bound by these Terms.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Eligibility</strong>:
                      <p>
                        The Platform is intended for use by individuals who are 18 years of age or older and have the legal capacity to enter into binding contracts.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>User Accounts</strong>:
                      <p>
                        You may create a user account on the Platform by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur under your account.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Acceptable Use</strong>:
                      <p>
                        You agree to use the Platform only for lawful purposes and in accordance with these Terms. You may not:
                        <ul>
                          <li>Use the Platform in a way that violates the privacy or intellectual property rights of others.</li>
                          <li>Use the Platform to transmit any harmful or offensive content.</li>
                          <li>Interfere with or disrupt the Platform or its servers.</li>
                          <li>Attempt to gain unauthorized access to the Platform.</li>
                        </ul>
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Interpreter Services</strong>:
                      <p>
                        SignSense provides access to professional sign language interpreters through video calls. The interpreters are independent contractors and are not employees of SignSense. You are responsible for your own interactions with the interpreters and understand that SignSense is not responsible for any disputes arising from such interactions.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Fees and Payment</strong>:
                      <p>
                        SignSense charges a fee for using its services. The fees are subject to change, and we will provide you with reasonable notice of any changes. Payment is due at the time of service and can be made through the approved payment methods offered on the Platform.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Disclaimer of Warranties</strong>:
                      <p>
                        SignSense provides the Platform "as is" and makes no warranties, express or implied, about its accuracy, reliability, completeness, or suitability for any particular purpose. We do not guarantee that the Platform will be available at all times or that it will be free from errors or interruptions.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Limitation of Liability</strong>:
                      <p>
                        SignSense is not liable for any damages arising out of or in connection with your use of the Platform, including, but not limited to, direct, indirect, incidental, consequential, or punitive damages.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Termination</strong>:
                      <p>
                        SignSense may terminate your access to the Platform at any time and for any reason, with or without notice. You may also terminate your account at any time.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Governing Law</strong>:
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction].
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Entire Agreement</strong>:
                      <p>
                        These Terms constitute the entire agreement between you and SignSense regarding your use of the Platform.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Amendments</strong>:
                      <p>
                        SignSense may amend these Terms at any time by posting the amended Terms on the Platform.
                      </p>
                    </li>
                    <li className="mt-8">
                      <strong>Contact</strong>:
                      <p className="mb-8">
                        If you have any questions about these Terms, please contact us at [Email Address].
                      </p>
                    </li>
                  </ol>
                </div>
            </section>
        </div> 
    );
 }

 export default TnC;