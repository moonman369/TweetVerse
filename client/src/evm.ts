import type { SafeEventEmitterProvider } from "@web3auth/base";
// import Web3 from "web3";
import { ethers } from "ethers";

import { APP_CONSTANTS } from "./constants";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }
  async getAccounts(): Promise<string> {
    try {
      const provider = new ethers.providers.Web3Provider(this.provider);
      const signer = provider.getSigner();
      return await signer.getAddress();
    } catch (error: unknown) {
      return error as string;
    }
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async sendUpVoteTransaction(tweetIndex: any): Promise<string> {
    try {
      const alchemyKey = APP_CONSTANTS.ALCHEMY_KEY;
      const web3 = createAlchemyWeb3(alchemyKey);

      const contractABI = require("./contract-abi.json");
      const contractAddress = APP_CONSTANTS.CONTRACT_ADDRESS;

      const helloWorldContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      let accounts = await this.getAccounts();

      await helloWorldContract.methods
        .upvote(tweetIndex)
        .send({ from: accounts[0] });

      return "success";
    } catch (error) {
      return error as string;
    }
  }

  async sendAddCommentTransaction(
    tweetIndex: any,
    comment: any
  ): Promise<string> {
    try {
      const alchemyKey = APP_CONSTANTS.ALCHEMY_KEY;
      const web3 = createAlchemyWeb3(alchemyKey, {
        writeProvider: this.provider,
      });

      const contractABI = require("./contract-abi.json");
      const contractAddress = APP_CONSTANTS.CONTRACT_ADDRESS;

      const helloWorldContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      let accounts = await this.getAccounts();

      await helloWorldContract.methods
        .addComment(tweetIndex, comment)
        .send({ from: accounts[0] });

      return "success";
    } catch (error) {
      return error as string;
    }
  }

  async sendWriteTweetTransaction(
    tweetName: any,
    tweetDescription: any
  ): Promise<string> {
    try {
      // const alchemyKey = APP_CONSTANTS.ALCHEMY_KEY;
      // const web3 = createAlchemyWeb3(alchemyKey, {
      //   writeProvider: this.provider,
      // });

      const contractABI = require("./contract-abi.json");
      const contractAddress = APP_CONSTANTS.CONTRACT_ADDRESS;

      // const helloWorldContract = new web3.eth.Contract(
      //   contractABI,
      //   contractAddress
      // );

      const provider = new ethers.providers.Web3Provider(this.provider);

      let account = await this.getAccounts();
      const signer = provider.getSigner();
      console.log(signer);

      // await helloWorldContract.methods
      //   .writeTweet(tweetName, tweetDescription)
      //   .send({ from: accounts[0] });

      const tweetVerse = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const tx = await tweetVerse
        .connect(signer)
        .writeTweet(tweetName, tweetDescription);

      const res = await tx.wait();
      console.log(res);

      return "success";
    } catch (error) {
      return error as string;
    }
  }

  async getAllTweets(): Promise<any[]> {
    try {
      const alchemyKey = APP_CONSTANTS.ALCHEMY_KEY;
      const web3 = createAlchemyWeb3(alchemyKey, {
        writeProvider: this.provider,
      });

      const contractABI = require("./contract-abi.json");
      const contractAddress = APP_CONSTANTS.CONTRACT_ADDRESS;

      const helloWorldContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      return await helloWorldContract.methods.getAllTweets().call();
    } catch (error) {
      return [];
    }
  }
}
