import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const changeIconHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credential..");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>

      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl  mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-12">
          <form onSubmit={submitHandler}>
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
                Don't have a account? &nbsp;
                <Link
                  to={"/sign-up"}
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-out"
                >
                  Register
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
              Sign in
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

export default SignIn;
