import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const MyGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null); // ✅ currently editing artwork
  const publicAxios = useAxios();
  const { user } = useAuth();


  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    publicAxios
      .get(`/artwork?email=${user.email}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch artworks:", err))
      .finally(() => setLoading(false));
  }, [publicAxios, user]);

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        publicAxios
          .delete(`/artwork/${id}`)
          .then(() => {
            setData((prev) => prev.filter((item) => item._id !== id)); // ✅ only remove deleted item
            Swal.fire({
              title: "Deleted!",
              text: "Your artwork has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => console.error("Delete failed:", err));
      }
    });
  };


  const openEditModal = (art) => {
    setSelectedArt(art);
    document.getElementById("editModal").showModal();
  };

 
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedArt = {
      imageUrl: form.imageUrl.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
    };

    publicAxios
      .patch(`/artwork/${selectedArt._id}`, updatedArt)
      .then((res) => {
        document.getElementById("editModal").close();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Artwork updated successfully.",
        });
    
        setData((prev) =>
          prev.map((item) =>
            item._id === selectedArt._id ? { ...item, ...updatedArt } : item
          )
        );
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" />

      {/* ✅ Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#137A63] mb-2">
          My Gallery
        </h1>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-[#d4f1eb] to-[#e6f4f1] dark:from-[#0f3f35] dark:to-[#113832]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Visibility
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                >
                  {<Loading></Loading>}
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((art) => (
                <tr
                  key={art._id}
                  className="hover:bg-[#e6f4f1] dark:hover:bg-[#113832] transition-colors duration-300"
                >
                  <td className="px-4 py-3">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">
                    {art.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {art.category}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                    {art.visibility}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => openEditModal(art)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-600 hover:border-blue-800 transition"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(art._id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded-md border border-red-600 hover:border-red-800 transition"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                >
                  No artworks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      <dialog id="editModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 shadow-2xl rounded-2xl py-6 px-6">
          <h3 className="font-bold text-2xl text-center text-[#137A63] mb-4">
            Edit Artwork
          </h3>

          {selectedArt && (
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <fieldset className="fieldset">
                <label className="label font-medium">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={selectedArt.imageUrl}
                  className="input input-bordered w-full"
                  required
                />

                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedArt.title}
                  className="input input-bordered w-full"
                  required
                />

                <label className="label font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedArt.category}
                  className="input input-bordered w-full"
                  required
                />

                <label className="label font-medium">Medium</label>
                <input
                  type="text"
                  name="medium"
                  defaultValue={selectedArt.medium}
                  className="input input-bordered w-full"
                />

                <label className="label font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedArt.description}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                ></textarea>

                <label className="label font-medium">Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  defaultValue={selectedArt.dimensions}
                  className="input input-bordered w-full"
                />

                <label className="label font-medium">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedArt.price}
                  className="input input-bordered w-full"
                />

                <label className="label font-medium">Visibility</label>
                <select
                  name="visibility"
                  defaultValue={selectedArt.visibility}
                  className="select select-bordered w-full"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>

                <button
                  type="submit"
                  className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white mt-5 border-none shadow-md hover:shadow-lg transition-all duration-300 w-full"
                >
                  Update Artwork
                </button>
              </fieldset>
            </form>
          )}

          <div className="modal-action">
            <button
              type="button"
              onClick={() => document.getElementById("editModal").close()}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyGallery;
