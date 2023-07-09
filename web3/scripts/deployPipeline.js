const { ethers } = require("hardhat");
require("dotenv").config();
const { deployTwitterVerse } = require("./deployFunctions");

const main = async () => {
  const [deployer] = await ethers.getSigners();

  // Stack3Badges
  const TWEETVERSE_BASE_URI =
    "https://black-greasy-seahorse-154.mypinata.cloud/ipfs/";

  await deployTwitterVerse(deployer.address, TWEETVERSE_BASE_URI);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => console.error(error));

//  Deploys.Mumbai: {
//   1: 0xb2038c9ce0D6D0ccB817e2550fB365CEfF652a52
//   2: 0xd4B0B85BD777D2057f075f3727993fe9B65bEe39
//   3: 0x27e5F9FF172383e65B253c708f3B28E1Bb4C8B31
// }
