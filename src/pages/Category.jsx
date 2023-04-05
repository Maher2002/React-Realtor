import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const { type } = params;
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", type),
          orderBy("timestamp", "desc"),
          limit(2)
        );

        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]; // Get A Last List
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could Not Fetch Listing ...");
        console.log(error);
      }
    };

    fetchListings();
  }, [type]);

  const onFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", type),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(2)
      );

      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]; // Get A Last List
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could Not Fetch Listing ...");
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        Places For {type}
      </h1>

      {listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </main>

          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
                onClick={onFetchMoreListings}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current Places For {type}</p>
      )}
    </div>
  );
};

export default Category;
