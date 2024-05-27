"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const registerUser = async ({ name, email, password, avatar }) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        avatar,
      });

      if (data?.user) {
        setUser(data.user);
        router.push("/admin/users");
        toast.success("Registration successful");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Registration failed. Try again.";
      setError(errorMessage);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await axios.post("/api/address", address);

      if (data) {
        router.push("/me");
        toast.success("Address added successfully");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Failed to add address. Try again.";
      setError(errorMessage);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        clearErrors,
        addNewAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
