import './App.css';
import logo from './logo/Main TripeLogo.png';
import { useState, useRef } from 'react';
import TermsPage from './components/Terms';


function App() {
  const [isValid, setIsValid] = useState();
  const InputUsername = useRef();
  const InputPassword = useRef();
  const InputPhone = useRef();
  const loadApp = () => {
    localStorage.getItem("ChatValidation");
    if (localStorage.getItem("ChatValidation") === "true") {
      const wrapper = document.querySelector('.wrapper');
      const container = document.querySelector('.container');
      wrapper.classList.add('wrapper__hide');
      container.classList.add('container__show');
    }else{
      const wrapper = document.querySelector('.wrapper');
      const container = document.querySelector('.container');
      wrapper.classList.remove('wrapper__hide');
      container.classList.remove('container__show');
    }
    fetch(`https://testapi.io/api/jogn120/Test?toek${process.env.REACT_APP_API_TOEKN}`)
      .then(response => response.json())
      .then(data => {
        if(!process.env.REACT_APP_CUSTOM_API_KEY) {
          console.error("No API key provided");
        }else{
          console.log(data);
        }
      })
      .catch(error => console.log(error));
  }
  const Next = () => {
    const firstPage = document.querySelector('.firstPage');
    const secondPage = document.querySelector('.secondPage');
    const username = InputUsername.current.value;
    const password = InputPassword.current.value;
    if(!username || !password){
      setIsValid(false);
      alert('Please fill in all fields');
    }else{
      return ValidateFirstAction();
    }
    function ValidateFirstAction(){
      setIsValid(true);
      console.log(isValid);
      if(isValid === true){
        alert('Success');
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';
        return passData();
      }
      function passData() { 
        const data = {
          username: username,
          password: password
        }
        console.log(data);
        localStorage.setItem("ChatValidation", true);
        return data;        
      }
    }
  }
  const Submit = () => {
    const phone = InputPhone.current.value;
    if(!phone){
      setIsValid(false);
    }else{
      return ValidateSecondAction();
    }
    function ValidateSecondAction(){
      setIsValid(true);
      console.log(isValid);
      if(isValid === true){
        alert('Success');
        return passData();
      }
      function passData() { 
          const data = {
          phone: phone
        }
        console.log(data);
        validationSucess();
        localStorage.setItem("ChatValidation", true);
        return data;
      }
    }
  }
  const validationSucess = () => {
    const container = document.querySelector('.container');
    const wrapper = document.querySelector('.wrapper');
    setTimeout(() => {
      alert('Success Validation');
      container.classList.add('container__show');
      wrapper.classList.add('wrapper__hide');
    }, 3000);
  }
  return (
    <div className="App" onLoad={loadApp}>
      <TermsPage />
      <div className="wrapper">
        <div className="content">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="firstPage">
              <div className="text">Sign up to use Tripe</div>
              <div className="input">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' placeholder='Username' autoComplete='off' ref={InputUsername} />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='Password' ref={InputPassword} />
                <i className="fa-solid fa-eye"></i>
              </div>
              <div className="submit">
                <button onClick={Next}>Next</button>
              </div>
            </div>
            <div className="secondPage">
              <div className="text">Sign up to use Tripe</div>
              <div className="input">
                <label htmlFor="phone">Phone</label>
                <input type="text" id='phone' placeholder='Phone' autoComplete='off' ref={InputPhone} />
              </div>
              <div className="submit">
                <button onClick={Submit}>Submit</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
