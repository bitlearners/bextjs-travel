"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const registerUser = async ({ name, email, password,avatar }) => {
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
          avatar,
        }
      );

      if (data?.user) {
        router.push("/admin/users");
        toast.success("Registration successful");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      toast.error("Registration failed. Try again.");
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await axios.post(
        `/api/address`,
        address
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
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
        addNewAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;