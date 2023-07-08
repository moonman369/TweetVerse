import { useEffect, useState, useRef } from "react";

import { Card, Form } from "react-bootstrap";
import { FaComment, FaRecycle, FaRetweet, FaThumbsUp } from "react-icons/fa";

import { Web3Auth } from "@web3auth/modal";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import Twitter from "./twitter";

import RPC from "./evm";
import { APP_CONSTANTS } from "./constants";

import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientId = APP_CONSTANTS.CLIENT_ID; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [tweets, setTweets] = useState<Array<any> | null>(null);
  const [comment, setComment] = useState<string | "">("");
  const [userName, setUserName] = useState<string | "">("");
  const [profileImage, setProfileImage] = useState<string | "">("");
  const [newTweetName, setNewTweetName] = useState<string | "">("");
  const [newTweetDescription, setNewTweetDescription] = useState<string | "">(
    ""
  );
  const refreshTime = APP_CONSTANTS.REACT_APP_REFRESH_TIMER * 1000;
  const [torusPlugin, setTorusPlugin] =
    useState<TorusWalletConnectorPlugin | null>(null);
  // const titleRef = useRef(null);
  // const descRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        // const web3auth = new Web3Auth({
        //   clientId,
        //   chainConfig: {
        //     chainNamespace: CHAIN_NAMESPACES.EIP155,
        //     chainId: "0x13881",
        //     rpcTarget: APP_CONSTANTS.RPC_TARGET, // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
        //   },
        // });

        const web3auth = new Web3Auth({
          clientId, // get it from Web3Auth Dashboard
          // web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x13881", // hex of 80001, polygon testnet
            rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
          },
          uiConfig: {
            // version: "",
            // appName: "W3A",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
            theme: "light",
            loginMethodsOrder: ["apple", "google", "twitter"],
            // defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            // loginGridCol: 3,
            // primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
          web3AuthNetwork: "cyan",
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc.ankr.com/polygon_mumbai", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // we can change the above settings using this function

        // OPENLOGIN + TORUS PLUGIN
        // const openloginAdapter = new OpenloginAdapter({
        //   loginSettings: {
        //     mfaLevel: "optional",
        //   },
        //   adapterSettings: {
        //     whiteLabel: {
        //       name: "Your app Name",
        //       logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        //       logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
        //       defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
        //       dark: false, // whether to enable dark mode. defaultValue: false
        //     },
        //     mfaSettings: {
        //       deviceShareFactor: {
        //         enable: true,
        //         priority: 1,
        //         mandatory: true,
        //       },
        //       backUpShareFactor: {
        //         enable: true,
        //         priority: 2,
        //         mandatory: false,
        //       },
        //       socialBackupFactor: {
        //         enable: true,
        //         priority: 3,
        //         mandatory: false,
        //       },
        //       passwordFactor: {
        //         enable: true,
        //         priority: 4,
        //         mandatory: false,
        //       },
        //     },
        //   },
        // });
        // web3auth.configureAdapter(openloginAdapter);
        web3auth.configureAdapter(metamaskAdapter);

        // const torusPlugin = new TorusWalletConnectorPlugin({
        //   torusWalletOpts: {},
        //   walletInitOptions: {
        //     whiteLabel: {
        //       theme: { isDark: true, colors: { primary: "#00a8ff" } },
        //       logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        //       logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
        //     },
        //     useWalletConnect: true,
        //     enableLogging: true,
        //   },
        // });
        // await web3auth.addPlugin(torusPlugin);
        // setTorusPlugin(torusPlugin);

        //   await web3auth.configureAdapter(openloginAdapter);
        //   setWeb3auth(web3auth);

        //   await web3auth.init();
        //   if (web3auth.provider) {
        //     await setProvider(web3auth.provider);

        //     let user = await web3auth.getUserInfo();
        //     console.log("user ", user);
        //     if (
        //       user.name &&
        //       user.name !== null &&
        //       user.name !== " " &&
        //       user.name !== ""
        //     )
        //       setUserName(user.name);

        //     if (
        //       user.profileImage &&
        //       user.profileImage !== null &&
        //       user.profileImage !== " " &&
        //       user.profileImage !== ""
        //     )
        //       setProfileImage(user.profileImage);
        //   }

        //   await fetchAllTweets();
        setWeb3auth(web3auth);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }

    // const web3authProvider = await web3auth.connectTo(
    //   WALLET_ADAPTERS.OPENLOGIN,
    //   {
    //     loginProvider: "jwt",
    //     extraLoginOptions: {
    //       domain: APP_CONSTANTS.AUTH0_DOMAIN, // Please append "https://" before your domain
    //       verifierIdField: "sub",
    //     },
    //   }
    // );

    const web3authProvider = await web3auth.connect();
    // await web3auth.authenticateUser();

    setProvider(web3authProvider);

    // const idToken = await web3auth.authenticateUser();

    if (web3authProvider) {
      const user = await web3auth.getUserInfo();
      console.log(user);

      if (
        user?.name &&
        user?.name !== null &&
        user?.name !== " " &&
        user?.name !== ""
      )
        setUserName(user.name);

      if (
        user?.profileImage &&
        user?.profileImage !== null &&
        user?.profileImage !== " " &&
        user?.profileImage !== ""
      )
        setProfileImage(user.profileImage);

      const rpc = new RPC(web3authProvider);
      const accounts = await rpc.getAccounts();
      console.log(accounts, await rpc.getChainId());

      //Assuming user is already logged in.
      const getPrivateKey = async () => {
        const privateKey = await web3authProvider.request({
          method: "eth_private_key",
        });
        // console.log(privateKey);
        //Do something with privateKey
      };

      getPrivateKey();
    }
  };
  /*
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    return userAccount;
  };
  */
  const refresh = (e: any) => {
    e.preventDefault();
    fetchAllTweets();
  };

  const fetchAllTweets = async () => {
    console.log("fetchalltweetsrunning");

    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    try {
      let fetchedTweets = await rpc.getAllTweets();
      let tweets = [...fetchedTweets];
      // console.log(tweets);
      setTweets(tweets.reverse());
    } catch (error) {
      console.log("error in fetching tweets", error);
    }
  };

  const upVote = async (tweetIndex: any) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    try {
      const rpc = new RPC(provider);
      const res = await rpc.sendUpVoteTransaction(tweetIndex);
      console.log(res);

      fetchAllTweets();
    } catch (error) {
      console.log("failed to execute upvote transaction", error);
    }
  };

  const addNewTweet = async (e: any) => {
    e.preventDefault();
    // e;
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    try {
      const rpc = new RPC(provider);
      console.log(provider);
      const res = await rpc.sendWriteTweetTransaction(
        newTweetName,
        newTweetDescription
      );
      console.log(res);
      // setTimeout(function () {
      //   fetchAllTweets();
      // }, refreshTime);

      fetchAllTweets();
      // titleRef.current.value = "";
      // descRef.current.value = "";

      toast.success("Tweet added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_LEFT,
      });
      console.log("failed to execute new tweet transaction", error);
    }
  };

  const addComment = async (event: any, tweetIndex: any) => {
    event.preventDefault();
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    try {
      const rpc = new RPC(provider);

      toast.success("Comment added successfully - refresh after 30 sec", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(comment, tweetIndex);
      await rpc.sendAddCommentTransaction(tweetIndex, comment);
      fetchAllTweets();
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_LEFT,
      });
      console.log("failed to execute add comment transaction", error);
    }
  };

  // Event handlers
  const handleCommentChange = async (event: any) => {
    setComment(event.target.value);
  };

  const handleNewTweetNameChange = async (event: any) => {
    setNewTweetName(event.target.value);
  };

  const handleNewTweetDescriptionChange = async (event: any) => {
    setNewTweetDescription(event.target.value);
  };

  const loggedInView = (
    <>
      <button className="button" onClick={logout}>
        Logout
      </button>
      <div>
        <h1>New Tweet</h1>
        <Card>
          <Card.Body>
            <Card.Title>What are you thinking? Tweet it out!</Card.Title>
            <Card.Text></Card.Text>

            <Form.Control
              as="input"
              type="reset"
              // ref={titleRef}
              onChange={handleNewTweetNameChange}
              placeholder="Tweet Name"
            />
            <br></br>
            <br></br>
            <Form.Control
              as="textarea"
              type="reset"
              // ref={descRef}
              onChange={handleNewTweetDescriptionChange}
              placeholder="Description"
            />
            <br></br>

            <FaRetweet onClick={addNewTweet} />
          </Card.Body>
        </Card>
      </div>

      <div>
        <h1>
          All Tweets <FaRecycle onClick={fetchAllTweets} />
        </h1>
        {(tweets || []).map((tweet: any, i) => (
          <div key={i}>
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <FaThumbsUp onClick={(event) => upVote(i)} /> {tweet.name}
                  </Card.Title>
                  <p>Total Upvotes: {tweet.upvotes}</p>
                  <p>Tweeted by: {tweet.fromAddress}</p>
                  <Card.Text>{tweet.description}</Card.Text>

                  <div>
                    <h3>All Comments</h3>
                    {tweet.comments.map((comment: any, j: any) => (
                      <div key={j}>
                        Comment {j + 1}: {comment}
                      </div>
                    ))}
                    <h3>New Comment</h3>
                    <span>
                      <Form.Control
                        as="input"
                        onChange={handleCommentChange}
                        placeholder="Your comment..."
                      />
                    </span>
                    &nbsp;
                    <span>
                      <FaComment onClick={(event) => addComment(event, i)} />
                    </span>
                  </div>
                </Card.Body>
                <a
                  href={
                    APP_CONSTANTS.OPENSEA_ASSETS_URL +
                    "/" +
                    APP_CONSTANTS.CONTRACT_ADDRESS +
                    "/" +
                    i
                  }
                  target="_blank"
                >
                  Buy Now
                </a>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div></div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <>
      <div className="login-account">
        <button className="twitter-bg btn" onClick={login}>
          <img src="images/twitter-white.png" alt=""></img>
          Login to your Twitter account
        </button>
      </div>
    </>
  );

  return (
    <div className="grid">
      {provider ? (
        <Twitter
          logoutButton={logout}
          handleNewTweetDescriptionChange={handleNewTweetDescriptionChange}
          handleNewTweetNameChange={handleNewTweetNameChange}
          addNewTweet={addNewTweet}
          fetchAllTweets={fetchAllTweets}
          tweets={tweets}
          upVote={upVote}
          handleCommentChange={handleCommentChange}
          addComment={addComment}
          refresh={refresh}
          username={userName}
          profileimage={profileImage}
        />
      ) : (
        unloggedInView
      )}{" "}
      <ToastContainer />
    </div>

    // <div className="grid">{provider
    //   ? loggedInView
    //   : unloggedInView}</div>

    // {/* <div className="grid">{loggedInView}</div> */}
  );
}

export default App;
