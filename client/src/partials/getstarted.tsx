import React from "react";

const GetStarted = (props: any) => {
  return (
    <div className={props.enableInfo ? "info-overlay" : "hidden"}>
      <h1>Welcome to Tweetverse!!</h1>
      <ul>
        <li className="info-list">
          <p>
            Tweetverse is a fully decentralized Twitter clone that allows Web2.0
            authentication using your actual Twitter or Google Accounts. Each
            and every post on this app is a tradeable NFT of it's own.
          </p>
        </li>
        <li className="info-list">
          <p>
            You have been provided a particular Ethereum Public Address on sign
            in. Please visit the "Profile" Page to check it out
          </p>
        </li>
        <li className="info-list">
          <p>
            Please notw that the Ethereum Address keeps changing with the Login
            Method. So Try to stick to a single login method for maintaining a
            single account.
          </p>
        </li>
        <li className="info-list">
          <p>
            Head over to the profile page to "Fund" your account using the
            "Mumbai Matic Faucet". This step is essential for using the
            application
          </p>
        </li>
        <li className="info-list">
          <p>
            Users can also access their respective account "Private Key" if they
            wish to add it to their Web3 Wallets.
          </p>
        </li>
      </ul>
      <button
        className="info-close"
        onClick={() => {
          props.setEnableInfo(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default GetStarted;
