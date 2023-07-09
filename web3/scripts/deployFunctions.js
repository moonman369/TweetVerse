const { ethers } = require("hardhat");
require("dotenv").config();
// const { requestMerkleSecret } = require("../merkle/setMerkleTree");

const deployTwitterVerse = async (deployerAddress, baseUri) => {
  const deployer = await ethers.getSigner(deployerAddress);

  const TwitterVerse = await ethers.getContractFactory("TweetVerse");

  const twitterVerse = await TwitterVerse.connect(deployer).deploy(baseUri);

  await twitterVerse.deployed();

  console.log(
    `TwitterVerse contract has been deployed at address: ${twitterVerse.address}\n`
  );

  return twitterVerse;
};

module.exports = {
  deployTwitterVerse,
};
