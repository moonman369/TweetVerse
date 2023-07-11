//for trends.tsx
import React from "react";

function Trends() {
  return (
    <>
      <div className="trendings">
        <h3>Trends for you</h3>
        <a href="http://web3auth.io/" title="" target="_blank">
          <strong>#Web3Auth</strong>
          <span>125k tweets</span>
        </a>
        <a href="https://mumbaifaucet.com/" title="" target="_blank">
          <strong>#MumbaiFaucet</strong>
          <span>98k tweets</span>
        </a>
        <a
          href="http://twitter.com/hashtag/EthereumMerge"
          title=""
          target="_blank"
        >
          <strong>#EthereumMerge</strong>
          <span>53k tweets</span>
        </a>
        <a href="https://metaschool.so/" title="" target="_blank">
          <strong>#Metaschool</strong>
          <span>42k tweets</span>
        </a>
        <a
          href="https://devfoliomoonman369.netlify.app/"
          title=""
          target="_blank"
        >
          <strong>#AboutDev</strong>
          <span>39k tweets</span>
        </a>
      </div>
    </>
  );
}

export default Trends;
