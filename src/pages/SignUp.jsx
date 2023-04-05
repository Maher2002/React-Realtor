import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { db } from "../firebase";
import { toast } from "react-toastify";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const inputChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const changeIconHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add The Name To a Current User That Was Signup
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredential.user;

      const formDataCopy = { ...formData };
      delete formDataCopy.password;

      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy); // Save The User Inside Database

      toast.success("Sign Up Was Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>

      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl  mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={inputChangeHandler}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              placeholder="Full Name"
            />

            <input
              type="email"
              id="email"
              value={email}
              onChange={inputChangeHandler}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
              placeholder="Email Address"
            />

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={inputChangeHandler}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={changeIconHandler}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={changeIconHandler}
                />
              )}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have a account? &nbsp;
                <Link
                  to={"/sign-in"}
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-out"
                >
                  Sign in
                </Link>
              </p>

              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition hover:shadow-lg active:bg-blue-800"
            >
              Sign up
            </button>

            <div className="my-4 flex items-center before:border-t  before:flex-1  before:border-gray-300 after:border-t  after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
