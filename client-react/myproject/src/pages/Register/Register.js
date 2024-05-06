import { useState } from "react";
import styles from "./Register.module.css";
import { registerService } from "../../services";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    console.log(useNavigate)
     var t=await registerService({ name, email, phone, userName, password })
         console.log(t)
          if(t!=null)navigate("/")
          
    }; 

  return (
    <div className={styles.registerWrapper}>
      <img src="gg.jpg" style={{ heignt: "180px", width: "180px", fontFamily: "initial" }}></img>
      <br></br>
      <input
        placeholder="Name"
        onBlur={(e) => setName(e.target.value)}
      />
      <input placeholder="Email" onBlur={(e) => setEmail(e.target.value)} />
     
      <input placeholder="Phone" type="number"  onBlur={(e) => setPhone(e.target.value)} />
      <input
        placeholder="User name"
        onBlur={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Password"
        onBlur={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
