import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signIn = (email, password) => {
    const userFound = localStorage.getItem("users", )
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
