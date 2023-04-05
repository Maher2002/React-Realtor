import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);

  // Offers
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const docSnap = await getDocs(q);

        let listings = [];

        docSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOfferListings(listings);
        // console.log(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  //  Places For Rent
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const docSnap = await getDocs(q);

        let listings = [];

        docSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRentListings(listings);
        // console.log(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  //  Places For Sale
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const docSnap = await getDocs(q);

        let listings = [];

        docSnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setSaleListings(listings);
        // console.log(listings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Slider />

      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to={"/offers"}>
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show More Offers
              </p>
            </Link>

            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places For Rent
            </h2>
            <Link to={"/category/rent"}>
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show More Places For Rent
              </p>
            </Link>

            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places For Sale
            </h2>
            <Link to={"/category/sale"}>
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show More Places For Sale
              </p>
            </Link>

            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
