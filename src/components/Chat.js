import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
// Your web app's Firebase configuration

const Chat = (props) => {
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

  const [isReactify, setIsReactify] = useState();
  const [message, setMessage] = useState([""]);
  const getFirstValue = useRef();
  useEffect(() => {
    const personal = document.querySelector(".personal");
    const group = document.querySelector(".group");
    return () => {
      checkNewValidation(); //return a function
    };
  });
  const checkNewValidation = () => { //check if the user is logged in
    if (localStorage.getItem("active") === "active") {
      const chat = document.querySelector(".chat");
      const personal = document.querySelector(".personal");
      setIsReactify(!isReactify + personal.classList.add("active"));
      chat.classList.add("chat__show");
    }
  };
  const personalButton = () => { // send a message to the user
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = Months[month];
    const dateTime = `${day} ${monthName} ${year} ${hour}:${minute}:${second}`;

    const personal__body = document.querySelector(".personal__body");
    let inputRef = getFirstValue.current.value;
    setMessage([...message, ...inputRef]);
    console.log(message);
    let lastitem = message[message.length - 1];
    console.log(lastitem);

    const commentsRef = ref(database, "messages");
    const postListRef = ref(database, "messages");
    const newPostRef = push(postListRef);
    const postElement = newPostRef;

    set(newPostRef, {
      // ...
      user: `${localStorage.getItem("ChatUser")}`,
      message: `${inputRef}`,
      date: `${dateTime}`,
    });
    onChildAdded(commentsRef, (data) => {
      addCommentElement(postElement, {
        ...data.val(),
        key: data.key,
        text: data.val().message,
        user: data.val().user,
        date: data.val().date,
      });
      let newDiv = document.createElement("div");
      newDiv.id = "newDiv";
      personal__body.appendChild(newDiv);
      newDiv.innerHTML = `<div class="personal__body__chat">
        <div class="personal__body__chat__message">
          <div class="personal__body__chat__message__user">
            <h4>${data.val().user}</h4>
          </div>
          <div class="personal__body__chat__message__text">
            <p id="personal_user_message">${data.val().message}</p>
          </div>
          <div class="personal__body__chat__message__time">
            <p>${data.val().date}</p>
          </div>
        </div>
      </div>`;
      const scrollToBottom = () => {
        const element = document.querySelector(".personal__body");
        element.scrollTop = element.scrollHeight; //scroll to the bottom of the div
      };
      scrollToBottom();
    });
    function addCommentElement() {
      console.log("Done");
    }
    setTimeout(() => {
      // clear the input
      getFirstValue.current.value = "";
    }, 1000);
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h2 id="header-name">{props.appName}</h2>
      </div>
      <div className="personal">
        <div className="personal__header">
          <h3>
            <span className="material-symbols-outlined">security</span>{" "}
            {props.personal}
          </h3>
        </div>
        <div className="personal__body">
          <div className="personal__body__chat">
            <div className="personal__body__chat__message">
              <div className="personal__body__chat__message__user">
                <h4>{""}</h4>
              </div>
              <div className="personal__body__chat__message__text">
                <p id="personal_user_message">{props.custom}</p>
              </div>
              <div className="personal__body__chat__message__time">
                <p>{""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="personal__footer">
          <div className="personal__footer__input">
            <input
              type="text"
              placeholder="Type your message..."
              ref={getFirstValue}
            />
          </div>
          <div className="personal__footer__send">
            <button onClick={personalButton}>Send</button>
          </div>
        </div>
      </div>
      <div className="group" style={{ display: "none" }}>
        <div className="group__header">
          <h3>
            <i className="fa-duotone fa-user-group"></i> {props.group}
          </h3>
        </div>
        <div className="group__body">
          <div className="group__body__chat">
            <div className="group__body__chat__message">
              <div className="group__body__chat__message__user">
                <h4>{""}</h4>
              </div>
              <div className="group__body__chat__message__text">
                <p>{""}</p>
              </div>
              <div className="group__body__chat__message__time">
                <p>{""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="group__footer">
          <div className="group__footer__input">
            <input type="text" placeholder="Type your message..." />
          </div>
          <div className="group__footer__send">
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
