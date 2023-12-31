import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Leftbar from "../components/partials/leftbar";
import { RxExternalLink, RxCopy } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
import GetStarted from "../components/partials/getstarted";
// import { LuCopy, LuCopyCheck } from "react-icons/lu";

const MyProfile = () => {
  const navigate = useNavigate();
  const { account } = useParams();

  const [image, setImage] = useState<string | "">("");
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [showEmail, setShowEmail] = useState<boolean | null>(false);
  const [privateKey, setPrivateKey] = useState<string | "">("");
  const [balance, setBalance] = useState<string | "">("");
  const [showKey, setShowKey] = useState<boolean | null>(false);
  const [copied, setCopied] = useState<boolean | null>(false);
  const [copiedPvt, setCopiedPvt] = useState<boolean | null>(false);
  const [enableInfo, setEnableInfo] = useState<boolean | null>(false);

  useEffect(() => {
    const { profileImage, name, email } = JSON.parse(
      localStorage.getItem("user") || ""
    );
    setImage(profileImage);
    setName(name);
    setEmail(email);
    setPrivateKey(localStorage.getItem("privateKey") as string);
    setBalance(localStorage.getItem("balance") as string);
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

  const copyPvt = () => {
    if (!copiedPvt) {
      setCopiedPvt(true);
      navigator.clipboard.writeText(privateKey || "");
      setTimeout(() => {
        setCopiedPvt(false);
      }, 3000);
    }
  };

  return (
    <div className="profile-main">
      <GetStarted enableInfo={enableInfo} setEnableInfo={setEnableInfo} />
      <Leftbar account={account} setEnableInfo={setEnableInfo}></Leftbar>
      <div className="profile-center">
        {/* <p
          onClick={() => {
            navigate("/", { state: { fromProfile: 1 } });
          }}
        >
          MyProfile
        </p> */}
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
            <p className="profile-info-field">User Balance</p>
            <div className="profile-info bal">{balance} MATIC</div>
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
            {showKey ? (
              <button className="copy-btn" onClick={copyPvt}>
                {copiedPvt ? <MdDoneAll className="green" /> : <RxCopy />}
              </button>
            ) : (
              <div></div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
