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
// }
