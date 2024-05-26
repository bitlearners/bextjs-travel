"use client";

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import AuthContext from "../../../../../../context/AuthContext";

const AddPage = () => {
  const initialState = {
    photo: null,
  };


  const router = useRouter();

  const { error, clearErrors } = useContext(AuthContext);

  const [state, setState] = useState(initialState);
  const [pageName, setPageName] = useState("");
  const [slug, setSlug] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const CLOUD_NAME = "dq8l4bdkl";
  const UPLOAD_PRESET = "next-js";

  const handlePageNameChange = (e) => {
    const name = e.target.value;
    setPageName(name);
    setSlug(generateSlug(name));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setState({ ...state, photo: files[0] });
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const validateInputs = () => {
    let errors = {};
    if (!pageName.trim()) {
      errors.pageName = "Page name is required";
      toast.error("Page name is required");
    }
    if (!slug.trim()) {
      errors.slug = "Slug is required";
      toast.error("Slug is required");
    }
    if (!state.photo) {
      errors.photo = "Please select an image";
      toast.error("Please select an image");
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const image = await uploadImage();
      if (!image) {
        toast.error("Image upload failed");
        return;
      }
      const avatar = image.secure_url;

      const pageData = {
        pageName,
        slug,
        imageUrl: avatar,
      };

      try {
        const res = await fetch("/api/pages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pageData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }

        const data = await res.json();
        toast.success("Page created successfully!");

        router.push("/admin/web-builder/"+slug);
        

      } catch (error) {
        toast.error(`${error.message}`);
 
      }
    }
  };

  const uploadImage = async () => {
    if (!state.photo) return;
    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(`Image upload failed: ${error.message}`);
      console.error("Image upload failed:", error);
      return null;
    }
  };

  return (
    <div className="p-6 m-4 rounded-lg bg-white shadow-lg">
      <form onSubmit={submitHandler} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <h2 className="mb-5 text-2xl font-semibold col-span-full">Add New Page</h2>

        <div className="mb-4">
          <label className="block mb-1">Page Name</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Type your Page Name"
            value={pageName}
            onChange={handlePageNameChange}
            required
          />
          <div className="block my-2">
            <span className="font-semibold">Slug</span> {slug}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
            required
          />
          {state.photo && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(state.photo)}
                alt="Sample image"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-outline btn-primary w-32 justify-self-center">
          Register
        </button>
      </form>

      {Object.keys(errorMessages).length > 0 && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 rounded">
          {Object.values(errorMessages).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddPage;
