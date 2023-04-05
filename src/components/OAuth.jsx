import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const OAuth = () => {
  const navigate = useNavigate();

  const clickHandler = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user was existing
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could Not Authorize With Google");

      console.log(error);
    }
  };

  return (
    <button
      onClick={clickHandler}
      type="button"
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium rounded shadow-md hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition "
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      Google
    </button>
  );
};

export default OAuth;
