import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Leftbar from "./partials/leftbar";
import { RxExternalLink } from "react-icons/rx";

const MyProfile = () => {
  const navigate = useNavigate();
  const { account } = useParams();
  const location = useLocation();

  const [image, setImage] = useState<string | "">("");
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [showEmail, setShowEmail] = useState<boolean | null>(false);

  useEffect(() => {
    const { profileImage, name, email } = JSON.parse(
      localStorage.getItem("user") || ""
    );
    setImage(profileImage);
    setName(name);
    setEmail(email);
  }, []);

  return (
    <div className="profile-main">
      <Leftbar account={account}></Leftbar>
      <div className="center">
        <p
          onClick={() => {
            navigate("/", { state: { fromProfile: 1 } });
          }}
        >
          MyProfile
        </p>
        <div className="profile">
          <img src={image} alt="" />
          <span className="profile-name">
            <h2>{name}</h2>
            <a
              href={`https://mumbai.polygonscan.com/address/${account}`}
              target="_blank"
            >
              {` @${account?.replace(/(.{15})..+/, "$1...")}`}
              <RxExternalLink />
            </a>
          </span>
        </div>
        <div className="profile-info">
          <div>{showEmail ? email : new Array(email.length).join("*")}</div>
          <button
            onClick={() => {
              setShowEmail(!showEmail);
            }}
          >
            {showEmail ? "hide" : "show"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
