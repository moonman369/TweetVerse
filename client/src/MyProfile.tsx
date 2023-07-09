import React from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/");
      }}
    >
      MyProfile
    </div>
  );
};

export default MyProfile;
