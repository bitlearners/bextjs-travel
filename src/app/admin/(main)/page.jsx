"use client";
import React, { useState, useEffect } from "react";
import { LuUsers } from "react-icons/lu";
import { RiDraftLine } from "react-icons/ri";
import { FaRegChartBar } from "react-icons/fa";

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    publishedPagesCount: 0,
    draftPagesCount: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats", { cache: "no-cache" });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched stats data:", data); // Debugging log
        setStats(data);
      } else {
        console.error("Failed to fetch stats data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex-col items-center justify-center">
        <div className="flex">
          <div className="flex lg:flex-row flex-col p-4 space-x-4 space-y-4 max-w-7xl justify-around w-full h-auto lg:h-60 items-center">
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl md:mt-4">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1">
                    <div className="text-lg font-medium text-violet-500"><LuUsers /></div>
                    <div className="text-sm font-medium text-gray-500">Total Users</div>
                  </div>
                </div>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
              </div>
            </div>
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1 ">
                    <div className="text-lg font-medium text-violet-500"><RiDraftLine /></div>
                    <div className="text-sm font-medium text-gray-500">Draft Pages</div>
                  </div>
                </div>
                <div className="text-3xl font-bold">{stats.draftPagesCount}</div>
              </div>
            </div>
            <div className="border rounded h-40 w-[100%] md:w-72 flex items-center justify-center ml-4 lg:px-0 px-6 bg-white shadow-xl">
              <div className="flex-col space-y-2 items-center px-0 md:px-6">
                <div className="flex items-center justify-between space-x-6">
                  <div className="flex items-center space-x-1 ">
                    <div className="text-lg font-medium text-violet-500"><FaRegChartBar /></div>
                    <div className="text-sm font-medium text-gray-500">Published Pages</div>
                  </div>
                </div>
                <div className="text-3xl font-bold">{stats.publishedPagesCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
