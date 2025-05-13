import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import { useLoading } from "./LoadingContext"; // make sure this is correct path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null); // <-- store user object here
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setUser(user); // <-- store user data
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setIsLoading]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
