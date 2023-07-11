import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Leftbar from "./partials/leftbar";
import { RxExternalLink, RxCopy } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
// import { LuCopy, LuCopyCheck } from "react-icons/lu";

const MyProfile = () => {
  const navigate = useNavigate();
  const { account } = useParams();
  const location = useLocation();

  const [image, setImage] = useState<string | "">("");
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [showEmail, setShowEmail] = useState<boolean | null>(false);
  const [privateKey, setPrivateKey] = useState<string | "">("");
  const [showKey, setShowKey] = useState<boolean | null>(false);
  const [copied, setCopied] = useState<boolean | null>(false);

  useEffect(() => {
    const { profileImage, name, email } = JSON.parse(
      localStorage.getItem("user") || ""
    );
    setImage(profileImage);
    setName(name);
    setEmail(email);
    setPrivateKey(localStorage.getItem("privateKey") as string);
  }, []);

  const copy = () => {
    if (!copied) {
      setCopied(true);
      navigator.clipboard.writeText(account || "");
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="profile-main">
      <Leftbar account={account}></Leftbar>
      <div className="profile-center">
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
              {` @${account}`}
              <RxExternalLink />
            </a>
          </span>
        </div>
        <div className="profile-info-container">
          <span className="profile-info-block">
            <p className="profile-info-field">User Email</p>
            <div className="profile-info">
              {showEmail ? email : new Array(email.length).join("* ")}
            </div>
            <button
              className="show-hide-btn"
              onClick={() => {
                setShowEmail(!showEmail);
              }}
            >
              {showEmail ? <FiEyeOff /> : <FiEye />}
            </button>
          </span>
          <span className="profile-info-block">
            <p className="profile-info-field">Public Address</p>
            <div className="profile-info">{account}</div>
            <button className="show-hide-btn" onClick={copy}>
              {copied ? <MdDoneAll className="green" /> : <RxCopy />}
            </button>

            <div className="fund-a">
              <a href={`https://mumbaifaucet.com/`} target="_blank">
                <button className="fund-btn">Fund Account</button>
              </a>
            </div>
          </span>
          <span className="profile-info-block">
            <p className="profile-info-field">Private Key</p>
            <div className="profile-info">
              {showKey
                ? `${privateKey}`
                : new Array(privateKey.length).join("*")}
            </div>
            <button
              className="show-hide-btn"
              onClick={() => {
                setShowKey(!showKey);
              }}
            >
              {showKey ? <FiEyeOff /> : <FiEye />}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
