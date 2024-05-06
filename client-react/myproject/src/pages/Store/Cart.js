import { useEffect, useState } from "react";
import "./Cart.css"
const Cart = () => {
  const obj = JSON.parse(sessionStorage.getItem("userToken"));
  const token = obj.accesstoken;
  console.log("1234567890-08765234" + token);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7002/api/carts", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsedResult = JSON.parse(result);
        setCartItems(parsedResult);
        console.table(parsedResult);
      })
      .catch(error => console.log('error', error));
  }, []);
  const deleteFromCart = (b) => {
    const obj = JSON.parse(sessionStorage.getItem("userToken"));
    const token = obj.accesstoken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": b._id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7002/api/carts", requestOptions)
      .then(response => response.text())
      .then(result => {
        alert(result)
        setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== b._id));
      })
      .catch(error => console.log('error', error));
  }
  const amount = (e, b) => {
    const obj = JSON.parse(sessionStorage.getItem("userToken"));
    const token = obj.accesstoken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": b._id,
      "book": b.book,
      "quantity": e
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7002/api/carts", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setCartItems(prevCartItems => prevCartItems.map(item => {
          if (item._id === b._id) {
            return {
              ...item,
              quantity: e
            };
          }
          return item;
        }));
      })

      .catch(error => console.log('error', error));
  }
  return (
    <>
      <div className="containercart" >
        <img src="w.jpg" style={{ heignt: "90px", width: "340px", fontFamily: "initial" }}></img>
        <br></br>
    
        {cartItems.map(b => (
              <div className="divdiv">
          <div key={b._id} className="button-wrappercart">
            {b.book && b.book.image && (
            <img  src={b.book.image} style={{ height: "150px", width: "200px", fontFamily: "initial" }} alt="Book Image"/>)}
            <br />
            {b.book && b.book.name && b.book.price && `${b.book.name} ${b.book.price}₪`}
            <br />
            {"amount: " + b.quantity}
            <input type="number" placeholder={b.quantity} onBlur={(e) => amount(e.target.value, b)} />
            
            <button className="mycart-buttoncart" onClick={() => deleteFromCart(b)}>Delete From Cart</button>
          </div>
            </div>
        ))}
      
      </div>
    </>
  );
};

export default Cart;