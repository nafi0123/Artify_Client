import React, { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const AddArtwork = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth(); // Firebase user info

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    category: "",
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    likes: 0,
    date: new Date().toISOString().split("T")[0],
    artistInfo: {
      name: user?.displayName || "",
      photo: user?.photoURL || "",
      totalArtworks: "",
    },
  });

  // Centralized change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "totalArtworks") {
      setFormData((prev) => ({
        ...prev,
        artistInfo: {
          ...prev.artistInfo,
          totalArtworks: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.post("/artwork", formData);
      console.log("Artwork added:", res.data);
      toast.success("Artwork added successfully!");

    
      setFormData((prev) => ({
        ...prev,
        imageUrl: "",
        title: "",
        category: "",
        medium: "",
        description: "",
        dimensions: "",
        price: "",
        visibility: "Public",
        likes: 0,
        date: new Date().toISOString().split("T")[0],
        artistInfo: {
          ...prev.artistInfo,
          totalArtworks: "",
        },
      }));
    } catch (err) {
      console.error("Failed to add artwork:", err);
      toast.error("Error adding artwork!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-4xl md:text-5xl font-extrabold text-[#137A63] mb-6 text-center" >
        Add New Artwork
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="medium"
          placeholder="Medium"
          value={formData.medium}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="dimensions"
          placeholder="Dimensions"
          value={formData.dimensions}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        {/* Artist Info (read-only) */}
        <input
          type="text"
          name="artistName"
          placeholder="Artist Name"
          value={formData.artistInfo.name}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        />
        <input
          type="text"
          name="artistPhoto"
          placeholder="Artist Photo URL"
          value={formData.artistInfo.photo}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        />

        {/* Total artworks input (editable) */}
        <input
          type="number"
          required
          name="totalArtworks"
          placeholder="Total Artworks"
          value={formData.artistInfo.totalArtworks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#137A63] text-white font-semibold py-2 px-4 rounded hover:bg-[#0f5d4c] transition"
        >
          Add Artwork
        </button>
      </form>
    </div>
  );
};

export default AddArtwork;
