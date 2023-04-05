import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>

        <Route path="/edit-listing" element={<PrivateRoute />}>
          <Route path="/edit-listing/:id" element={<EditListing />} />
        </Route>

        <Route path="/category/:type" element={<Category />} />
        <Route path="/category/:type/:id" element={<Listing />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;

/* <Route path="/profile" element={<Profile />} /> */
