import { createContext, useState } from "react";
import { set } from "react-hook-form";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? localStorage.getItem("currentUserEmail")
      : null
  );

  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState("")

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userAlreadyExist = users.find((user) => user.email === email);

    if (userAlreadyExist) {
      setError("User Already exist, sign in pls")
      setPopUp(true)
      return { success: false, error: error }
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email })

    return { success: true }
  };

  const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const userFound = users.find((user) => user.email === email && user.password === password);

    if (!userFound) {
      setError("Unexisting user, sign up pls");
      setPopUp(true);

      return { success: false, error: error }
    } else {
      setPopUp(true)
      setUser({ email })
      localStorage.setItem("currentUserEmail", email)
      return { success: true, error: error }
    }
  };

  const logOut = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, setUser, setPopUp, error, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
