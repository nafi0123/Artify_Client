import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const MyFavorites = () => {
  const publicAxios = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    publicAxios.get("favorites").then((res) => {
      setData(res.data);
      console.log(res, 2222222356);
    });
  }, [publicAxios]);

  
  return <div></div>;
};

export default MyFavorites;
