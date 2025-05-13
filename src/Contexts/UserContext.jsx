import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, doc, db } from '../Firebase/Firebase';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDocRef, setUserDocRef] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    image: "", 
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const { uid, displayName, email } = user;

      const updatedUserData = {
        uid,
        displayName: displayName || "",
        email: email || ""
      };

      setUserData(updatedUserData);
      const userRef = doc(db, 'users', uid);
      setUserDocRef(userRef);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userDocRef, setUserDocRef, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);