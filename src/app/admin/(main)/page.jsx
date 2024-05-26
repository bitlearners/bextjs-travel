
"use client"
import React, { useState, useEffect } from "react";


import { GoBriefcase } from "react-icons/go";
import { FaRegChartBar } from "react-icons/fa";

import { LuUsers } from "react-icons/lu";
import { MdPublishedWithChanges } from "react-icons/md";

import { RiDraftLine } from "react-icons/ri";

import { GiConsoleController } from "react-icons/gi";


const AdminPage = () => {

  const [users, setUsers] = useState([]);
  // Effect to fetch users data when component mounts
  useEffect(() => {
    // Assuming you have an API endpoint to fetch users data
    fetchUsersData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render
  const fetchUsersData = async () => {
    try {
      // Fetch users data from your API
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        // Update users state with fetched data
        setUsers(data);
      } else {
        console.error("Failed to fetch users data");
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };


  const totalUsers = users.length;


  return (
    <div className="flex items-center justify-center">
      <div className="flex-col items-center justify-center">
        <div className="flex">
          <div className="flex lg:flex-row flex-col p-4 space-x-4 space-y-4 max-w-7xl justify-around w-full h-auto lg:h-60 items-center">
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl md:mt-4">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <div className="text-lg font-medium text-violet-500"><LuUsers/></div>
                    <div className="text-sm font-medium text-gray-500">Total Users</div>
                  </div>
                  
                </div>
                <div className="text-3xl font-bold">{totalUsers}</div>
               
              </div>
            </div>
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1 ">
                    <div className="text-lg font-medium text-violet-500"><RiDraftLine   /></div>
                    <div className="text-sm font-medium text-gray-500">Draft Pages</div>
                  </div>
                  
                </div>
                <div className="text-3xl font-bold">127</div>
                
              </div>
            </div>
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1 ">
                    <div className="text-lg font-medium text-violet-500"><FaRegChartBar/></div>
                    <div className="text-sm font-medium text-gray-500">Published Pages
</div>
                  </div>
                  
                </div>
                <div className="text-3xl font-bold">456</div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
