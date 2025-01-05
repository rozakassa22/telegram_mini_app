import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Page, Block } from "konsta/react";
import { FaBirthdayCake } from "react-icons/fa";

const BakeryAdminsPage = ({ navigateToProducts }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const adminData = [];
        querySnapshot.forEach((doc) => {
          const user = { id: doc.id, ...doc.data() };
          if (user.role === "bakeryAdmin" && user.status === "active") {
            adminData.push(user);
          }
        });
        setAdmins(adminData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admins: ", error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <Page className="bg-[#F4F6FF]">
        <Block className="text-center mt-20">
          <p className="text-[#FFC1C1] font-semibold">Loading Bakery Admins...</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page className="bg-[#F4F6FF]">
      <Block className="rounded-lg shadow-lg mx-4 p-6">
        <h1 className="text-2xl font-bold text-[#FFB8D2] text-center mb-8">
          Active Bakery Admins
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => navigateToProducts(admin.id)} // Navigate to products when clicked
              >
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-[#FFD1D1] rounded-full flex items-center justify-center shadow-md mb-4">
                    <FaBirthdayCake className="text-white text-2xl" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#FFB8D2]">
                    {admin.bakeryName}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[#FFDDEB] col-span-full">
              No active Bakery Admins Found
            </p>
          )}
        </div>
      </Block>
    </Page>
  );
};

export default BakeryAdminsPage;
