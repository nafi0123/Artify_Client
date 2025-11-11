import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const MyGallery = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const publicAxios = useAxios();
  const { user } = useAuth();

  // http://localhost:5000/artwork?email=nafi.cse0123@gmail.com

  useEffect(() => {
    publicAxios
      .get(`artwork?email=${user.email}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch favorites:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [publicAxios, user]);

  const handleDelete = (id) => {
    setLoading(true);
    publicAxios
      .delete(`my-favorites/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to delete:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit=(id)=>{
    
  }

  return <div></div>;
};

export default MyGallery;
