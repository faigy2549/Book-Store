
const loginService = async (user) => {

  // TODO: here call server by fetch
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  var res;
 
  await fetch("http://localhost:7002/api/auths/login", requestOptions)
    .then(response => response.text())
    .then(result=>{res=result
       console.log(result)})
    .catch(error => {
      console.log('error', error)
      throw error("login error")
    });
   
  var a=JSON.parse(res).message
    //alert(a)
    sessionStorage.setItem("user", user.userName);
  return new Promise((resolve, reject) => {
    resolve({
      loginStatus :a === undefined ? "ok": "unknown",
      data: { id: user.password, name: user.userName, userToken: res },
   
    });
  });
};



const registerService = async  ({ name, email, phone, userName, password })   => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": name,
  "email":email,
  "phone":phone,
  "userName":userName,
  "password":password

});
if(userName===""||password===""||name===""){
  alert("name and password are require!")
  return null
  
}  
else{
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
var res
 await fetch("http://localhost:7002/api/auths/register", requestOptions)
  .then(response =>response.text())
  .then(result => {res=result})
  .catch(error => alert('error', error));
  var a=JSON.parse(res).message
  alert(a)
  if(a=="duplicate username")
  {
  return null
 }
 else{
  console.log(a);
  return "registered!"
 }
}}
const addToCartService=async (b)=>{
  console.log("b",b)
  var myHeaders = new Headers();
    const obj = JSON.parse(sessionStorage.getItem("userToken"))
   const token = obj.accesstoken;
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
    return res
};



export { loginService, registerService ,addToCartService};
