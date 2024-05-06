import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
//import Button from '@mui/material/Button';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = useContext(UserContext);

  const navigate = useNavigate();

  const login = () => {
    //debugger
    if (!userName || !password) {
      alert("required")
      return;
    }
    userLogin({ userName, password })
      .then(() => {
        if( userName=="h"&& password=="hh")
        navigate("/store");
        else
        navigate("/cstore")
      })
      .catch((error) => {
        alert(error.message)
        if (error.message === "unknown user") {
          navigate("/register");
        }
      });
  };

  return (
  
    <div className={styles.loginWrapper}>
  <img src="gg.jpg" style={{ heignt: "180px", width: "180px", fontFamily: "initial" }}></img>
 
  <h4>"The place for anyone who DREAMS books"</h4>
      <input
        placeholder="User name"
        onBlur={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onBlur={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button id="login" e onClick={() => login()}>Login</button> 
      {/* <button {...() => Event.key?"Enter":()=>login()} ></button> */}
      <h5>not registered?</h5>
      <div  className={styles.registerWrapper}>
      <button id="register" onClick={()=>{navigate('/register')}}>register</button>
      </div>
    </div>
  );
};

export default Login;
