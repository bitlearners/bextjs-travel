"use client";
import React, { useState, useContext, useEffect } from "react";


import Image from "next/image";
import AuthContext from "../../../../../../context/AuthContext";

const initialState = {
  photo: null,
};

const RegisterPage = (props) => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [state, setState] = useState(initialState);

  const CLOUD_NAME = "dq8l4bdkl";
  const UPLOAD_PRESET = "next-js";

  useEffect(() => {
    if (error) {
      console.log(error);
      clearErrors();
    }
  }, [error]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, photo: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const validateInputs = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!state.photo) {
      errors.photo = "Please select an image";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const image = await uploadImage();

      if (!image) {
        console.error("Image upload failed");
        return;
      }
      const avatar = image.secure_url;

      registerUser({ name, email, password, avatar });
    }
  };

  const getUserDetails = async () => {
    let userId = props.params.edituser;
    let userData = await fetch(`/api/auth/register/${userId}`);
    userData = await userData.json();

    if (userData.success) {
      let result = userData.result;
      setName(result.name);
      setEmail(result.email);
      setPassword(result.password);
    }
  };

  const uploadImage = async () => {
    if (!state.photo) return;

    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  return (
    <div className="p-6 m-4 rounded-lg bg-white shadow-lg">
      <form onSubmit={submitHandler} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <h2 className="mb-5 text-2xl font-semibold col-span-full">Update User</h2>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errorMessages.name && <p className="text-red-500">{errorMessages.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorMessages.email && <p className="text-red-500">{errorMessages.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            className="input input-bordered w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessages.password && <p className="text-red-500">{errorMessages.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Profile Image</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="file-input file-input-bordered w-full"
            onChange={handleChange}
            required
          />
          {errorMessages.photo && <p className="text-red-500">{errorMessages.photo}</p>}
          {state.photo && (
            <div>
              <Image
                src={URL.createObjectURL(state.photo)}
                priority
                alt="Sample image"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-outline btn-primary w-32 justify-self-center"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
