import "./Terms.css";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import ChatApp from "./Chat"
const TermsPage = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
    
    useEffect(() => {
      const el1 = document.querySelector(".container");
      console.log(el1);
    
      return () => {
        captureStatus();
      }
    }, [])
    
    

    const checkstatus = {
       validatory: null
    }
    const checkbox1 = () => {
        const checkbox = document.querySelector("#terms1");
        if (checkbox.checked) {
            checkstatus.validatory = "accepted";
            localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }else{
            checkstatus.validatory = "not-accepted";
            localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }
    }
    const checkbox2 = () => {
        const checkbox = document.querySelector("#terms2");
        if (checkbox.checked) {
            checkstatus.validatory = "accepted";
            localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }else{
          checkstatus.validatory = "not-accepted";
          localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }
    }
    const checkbox3 = () => {
        const checkbox = document.querySelector("#terms3");
        if (checkbox.checked) {
            checkstatus.validatory = "accepted";
            localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }else{
          checkstatus.validatory = "not-accepted";
          localStorage.setItem("checkStatus", JSON.stringify(checkstatus))
        }
    }
    const captureStatus = () => {
      localStorage.getItem('checkStatus');
      if(localStorage.getItem('checkStatus') === JSON.stringify({validatory: "accepted"})){
        const el = document.querySelector(".container");
        if(el !== null){ // if the element is not null i.e if container is present in the DOM
          el.style.display = "none";
        }
        if(el === null){ // if the element is null i.e if container is not present in the DOM
          return output(); // return the output
        }
        function output(e = 'This is the default value') { // if the element is null
          console.log(e); // print the output to the console
        }
      }
    }
    const continueButton = () => {
      const container = document.querySelector(".container");
      const options = document.querySelector(".options");
      if(localStorage.getItem('checkStatus') === JSON.stringify({validatory: "accepted"})){
          alert("Thanks for accepting the terms and conditions! :)")
          container.classList.replace("container__show", "container__hide");
          options.classList.add("options__show");
      }else{
          alert("Please consider accepting the terms and conditions! X﹏X");

      }
    }
    const handleChatFuntion = () => {
      let promptName = prompt("Confirm your name");
      const options = document.querySelector(".options");
      localStorage.setItem('ChatUser', `${promptName}`);
      localStorage.setItem('active', 'active');
      options.classList.remove("options__show");
    }
  return (
    <>
    <ChatApp appName={localStorage.getItem("ChatUser")} personal="Personal Chat" group="Group Chat" custom="This is a custom message from the app"/>
    <div className="container">
      <div className="content">
        <div className="agreemnt">
          <h1>Welocome To Tripe</h1>
          <p>
            Before continuing to use our services you must agree to the following
            terms
          </p>
          <div className="agreement_box">
            <div className="ag">
              <h3>Terms of Service</h3>
              <p id="small">
                  Tick this box to indicate that you have read and agree to the Terms of Service.
              </p>
              <div className="tick">
                <input type="checkbox" name="terms" id="terms1" onClick={checkbox1}/>
                <label htmlFor="terms1">
                  You agree to the Terms of Service that states you must be 18
                  years of age or older to use our services.
                </label>
              </div>
              <div className="tick">
                <input type="checkbox" name="terms" id="terms2" onClick={checkbox2}/>
                <label htmlFor="terms2">
                  You agree to the Terms of Service that states you should not use our services for any illegal activities.
                </label>
              </div>
              <div className="tick">
                <input type="checkbox" name="terms" id="terms3" onClick={checkbox3}/>
                <label htmlFor="terms3">
                  You must not use our API to send any spam, or any other message that is not related to the services.
                </label>
              </div>
            </div>
            <div className="continue_btn">
                <button id="button" onClick={continueButton}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="options">
      <div className="options_box">
        <div className="options_headers">
          <h2>Tripe</h2>
        </div>
        <div className="option">
          <div className="option_header">
            <h3>
              Choose your prefered chatting option
            </h3>
          </div>
          <div className="option_body">
            <div className="optionA" id="optionA" onClick={handleChatFuntion}>Login</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default TermsPage;
