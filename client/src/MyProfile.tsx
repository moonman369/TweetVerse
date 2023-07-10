import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Leftbar from "./partials/leftbar";

const MyProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [image, setImage] = useState<string | "">("");
  const [name, setName] = useState<string | "">("");

  useEffect(() => {
    const { profileImage, name } = JSON.parse(
      localStorage.getItem("user") || ""
    );
    setImage(profileImage);
    setName(name);
  }, []);

  return (
    <div>
      <Leftbar />
      <p
        onClick={() => {
          navigate("/", { state: { fromProfile: 1 } });
        }}
      >
        MyProfile
      </p>
      <div className="profile">
        <img src={image} alt="" />
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default MyProfile;
