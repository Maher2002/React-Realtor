import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogoutHandler = () => {
    auth.signOut();
    toast.success("Sign Out Was Successfully...");
    navigate("/");
  };

  const onEditHandler = async () => {
    setChangeDetail((prevState) => !prevState);

    if (changeDetail && auth.currentUser.displayName !== name) {
      try {
        // Update Name In Firebase Auth
        updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update Name In Fire Store
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });

        toast.success("Profile Details Updated..");
      } catch (error) {
        toast.error("Could Not Update The Profile Detail...");
      }
    }
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");

      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      // console.log(querySnap);

      let listings = [];
      querySnap.forEach((ele) => {
        listings.push({
          id: ele.id,
          data: ele.data(),
        });
      });
      // console.log(listings);
      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const deleteHandler = async (id) => {
    // console.log(id);
    // console.log("Delete");
    if (window.confirm("Are Youu Sure You Want Delete ?")) {
      await deleteDoc(doc(db, "listings", id));

      const updatedListings = listings.filter((listing) => listing.id !== id);
      setListings(updatedListings);

      toast.success("Delted Was Successfully ...");
    }
  };

  const EditHandler = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChangeHandler}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out  ${
                changeDetail && "bg-red-400 border-2 border-red-600"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do You Want To Change Your Name?
                <span
                  onClick={onEditHandler}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Applay Change" : "Edit"}
                </span>
              </p>

              <p
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
                onClick={onLogoutHandler}
              >
                Sign Out
              </p>
            </div>
          </form>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-500 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to={"/create-listing"}
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell Or Rent Your Home
            </Link>
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6 mt-6">
              My Listings
            </h2>

            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={{
                    ...listing.data,
                  }}
                  onDelete={() => deleteHandler(listing.id)}
                  onEdit={() => EditHandler(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
