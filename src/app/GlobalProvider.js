"use client";

AuthProvider
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { AuthProvider } from "../../context/AuthContext";


export function GlobalProvider({ children }) {
  return (
    <>
   
      <AuthProvider>
      <Toaster />
    <SessionProvider> {children}</SessionProvider>
     
      </AuthProvider>
    </>
  );
}