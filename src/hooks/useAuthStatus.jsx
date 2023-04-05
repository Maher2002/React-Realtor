import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); //Loading

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
