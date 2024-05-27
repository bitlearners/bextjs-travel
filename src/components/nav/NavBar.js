"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React,{useState} from "react";

export default function NavBar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const {data} = useSession();
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

 
  return (
    <>
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#1C1678] ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          
         
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/admin"
                    >
                      <span>Welcome: Admin</span>
                    </Link>
                  </li>
                )}
               
                <li className="nav-item">
                  <span
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-pointer"
                    onClick={logoutHandler}
                  >
                    Logout
                  </span>
                </li>
                
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/register"
                  >
                    <span>Register</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/login"
                  >
                    <span>Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
);
}