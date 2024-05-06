import { useEffect, useState } from "react";
import { loginService } from "../../services";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    if (userToken) {
      setUser({ userToken }); 
    }
  }, []);

  const userLogin = (user) => {
    return new Promise((resolve, reject) => {
      loginService(user).then((response) => {
        if (response.loginStatus === "ok") {
          sessionStorage.setItem("userToken", response.data.userToken);
         
          setUser(response.data);
          resolve(response.data);
        }
        if (response.loginStatus === "unknown") {
          reject(new Error("unknown user"));
        }
      });
    });
  };

  return (
    <UserContext.Provider value={{ user, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
