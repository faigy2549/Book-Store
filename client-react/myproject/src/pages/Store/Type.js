import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import "./Cstore.css";

const Type = ()=>{
  const data=useLocation()
  const watch =data.state;
  const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    async function showBook() {
      try {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        const response = await fetch(`http://localhost:7002/api/books/${watch}`)
        const data = await response.json();
        setBooks(data)
        console.log(books);
      }
      catch (error) {
        console.log("failed to fetch");
      }
    }
    useEffect(() => { showBook() }, [])
  
    const addToCart=(b)=>{

        var myHeaders = new Headers();
        const obj = JSON.parse(sessionStorage.getItem("userToken"))
       const token = obj.accesstoken;
        console.log(token)
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "book":b._id
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        var res
        fetch("http://localhost:7002/api/carts", requestOptions)
          .then(response => response.text())
          .then(result => {
            res=result
            console.log(result)})
          .catch(error => console.log('error', error));
    }
    const myCart=async()=>{
      navigate("/Cart")

    }
var a=sessionStorage.getItem("user")
    return(
       <>
       <div className="container">
             <div className="image-wrapper1">
             <img src="w.jpg" style={{ height: "180px", width: "180px", fontFamily: "initial" }}></img>
           </div>
           <div className="button-wrapper">
            <br></br>
          <h3>{"Hello " + a}</h3>
             <button className="mycart-button" onClick={() => myCart()}>🛒</button>
           </div>
        </div>
        <br></br>
        <div className="container">
        {books.map((b)=>
          <div key={b._id}>
          <img src={b.image} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img>
          <br></br>
          {b.name + b.price+"₪"}
  
          <button onClick={() => addToCart(b)}>Add🛒</button>
          </div>  
          
       )} 
       </div>
       </>
     
    );

}
export default Type;
