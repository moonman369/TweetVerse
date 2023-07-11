import { useEffect, useState, useRef, MutableRefObject } from "react";

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
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useLocation } from "react-router-dom";
import { profile } from "console";

const clientId = APP_CONSTANTS.CLIENT_ID; // get from https://dashboard.web3auth.io

function App() {
  const location = useLocation();

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [account, setAccount] = useState<string | "">("");
  const [tweets, setTweets] = useState<Array<any> | null>(null);
  const [comment, setComment] = useState<string | "">("");
  const [userName, setUserName] = useState<string | "">("");
  const [profileImage, setProfileImage] = useState<string | "">("");
  const [newTweetName, setNewTweetName] = useState<string | "">("");
  const [loadingText, setLoadingText] = useState<string | "">("loading...");
  const [loading, setLoading] = useState<boolean | null>(false);
  const [enableInfo, setEnableInfo] = useState<boolean | null>(false);
  const [newTweetDescription, setNewTweetDescription] = useState<string | "">(
    ""
  );
  const refreshTime = APP_CONSTANTS.REACT_APP_REFRESH_TIMER * 1000;
  const [torusPlugin, setTorusPlugin] =
    useState<TorusWalletConnectorPlugin | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);

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

        console.log(web3auth);

        // const metamaskAdapter = new MetamaskAdapter({
        //   clientId,
        //   sessionTime: 3600, // 1 hour in seconds
        //   web3AuthNetwork: "cyan",
        //   chainConfig: {
        //     chainNamespace: CHAIN_NAMESPACES.EIP155,
        //     chainId: "0x13881",
        //     rpcTarget: "https://rpc.ankr.com/polygon_mumbai", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        //   },
        // });
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
        // web3auth.configureAdapter(metamaskAdapter);

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

        // await fetchAllTweets();
        setWeb3auth(web3auth);
        await web3auth.initModal();
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    console.log(location?.state?.fromProfile);
    if (location?.state?.fromProfile) {
      if (web3auth) {
        const getAndSetProvider = async () => {
          const provider = await web3auth.connect();
          setProvider(provider);
        };
        getAndSetProvider();
      }
      if (localStorage.getItem("user")) {
        const { name, profileImage } = JSON.parse(
          localStorage.getItem("user") || ""
        );
        setUserName(name);
        setProfileImage(profileImage);
      }
      if (localStorage.getItem("account")) {
        setAccount(localStorage.getItem("account") || "");
      }
      // fetchAllTweets();
    }
  }, [web3auth]);

  // useEffect(() => {
  //   if (provider) {
  //     fetchAllTweets();
  //   }
  // }, [provider]);

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    location.state.fromProfile = null;
    setProvider(null);
    localStorage.clear();
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
      console.log(web3authProvider);
      setProvider(web3authProvider);

      // localStorage.clear();
      const user = await web3auth.getUserInfo();

      localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.setItem("account", accounts);
      setAccount(accounts);

      console.log(accounts, await rpc.getChainId());

      // const alchemyKey = APP_CONSTANTS.ALCHEMY_KEY;
      // const web3 = createAlchemyWeb3(alchemyKey, {
      //   writeProvider: web3authProvider,
      // });

      //Assuming user is already logged in.
      const getPrivateKey = async () => {
        const privateKey = await web3authProvider.request({
          method: "eth_private_key",
        });
        console.log(privateKey);
        localStorage.setItem("privateKey", privateKey as string);
        // console.log(web3.eth.accounts.privateKeyToAccount(`${privateKey}`));
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
      setLoadingText("Loading tweets...");
      setLoading(true);
      let fetchedTweets = await rpc.getAllTweets();
      setLoading(false);
      let tweets = [...fetchedTweets];
      console.log(tweets);
      setTweets([...tweets.reverse()]);
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
      setLoadingText("Processing Transaction. Please Wait...");
      setLoading(true);
      const rpc = new RPC(provider);
      const res = await rpc.sendUpVoteTransaction(tweetIndex);
      console.log(res);
      setLoading(false);
      if (res === "success") {
        toast.success("Upvote added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchAllTweets();
      } else {
        toast.error(res.replace("execution reverted: ", ""), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
      setLoadingText("Processing Transaction. Please Wait...");
      setLoading(true);
      console.log(provider);
      const res = await rpc.sendWriteTweetTransaction(
        newTweetName,
        newTweetDescription
      );
      console.log(res);
      // setTimeout(function () {
      //   fetchAllTweets();
      // }, refreshTime);

      if (titleRef.current) {
        titleRef.current.value = "";
      }

      if (descRef.current) {
        descRef.current.value = "";
      }
      setLoading(false);
      if (res === "success") {
        fetchAllTweets();
        toast.success("Tweet added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.replace("execution reverted: ", ""), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
      // console.log(comment, tweetIndex);
      setLoadingText("Processing Transaction. Please Wait...");
      setLoading(true);
      const res = await rpc.sendAddCommentTransaction(tweetIndex, comment);
      setLoading(false);
      if (commentRef.current) {
        commentRef.current.value = "";
      }
      if (res === "success") {
        toast.success("Comment added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchAllTweets();
      } else {
        toast.error(res.replace("execution reverted: ", ""), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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

            <input
              // as="input"
              type="reset"
              // ref={titleRef}
              onChange={handleNewTweetNameChange}
              placeholder="Tweet Name"
            />
            <br></br>
            <br></br>
            <textarea
              // as="textarea"
              // type="reset"
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
                  <p>Tweeted by: {tweet.author}</p>
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
    <div className={enableInfo || loading ? "grid-no-scroll" : "grid"}>
      {provider || location?.state?.fromProfile ? (
        <>
          <div className={loading ? "overlay" : "hidden"}>
            <img
              src="https://usagif.com/wp-content/uploads/loading-102.gif"
              alt=""
            />
            <p>{loadingText}</p>
          </div>
          <div className={enableInfo ? "info-overlay" : "hidden"}>
            <h1>Welcome to Tweetverse!!</h1>
            <ul>
              <li className="info-list">
                <p>
                  Tweetverse is a fully decentralized Twitter clone that allows
                  Web2.0 authentication using your actual Twitter or Google
                  Accounts. Each and every post on this app is a tradeable NFT
                  of it's own.
                </p>
              </li>
              <li className="info-list">
                <p>
                  You have been provided a particular Ethereum Public Address on
                  sign in. Please visit the "Profile" Page to check it out
                </p>
              </li>
              <li className="info-list">
                <p>
                  Please notw that the Ethereum Address keeps changing with the
                  Login Method. So Try to stick to a single login method for
                  maintaining a single account.
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
                  Users can also access their respective account "Private Key"
                  if they wish to add it to their Web3 Wallets.
                </p>
              </li>
            </ul>
            <button
              className="info-close"
              onClick={() => {
                setEnableInfo(false);
              }}
            >
              Close
            </button>
          </div>
          <Twitter
            logoutButton={logout}
            account={account}
            handleNewTweetDescriptionChange={handleNewTweetDescriptionChange}
            handleNewTweetNameChange={handleNewTweetNameChange}
            addNewTweet={addNewTweet}
            fetchAllTweets={fetchAllTweets}
            tweets={tweets}
            upVote={upVote}
            handleCommentChange={handleCommentChange}
            provider={provider}
            addComment={addComment}
            refresh={refresh}
            username={userName}
            profileimage={profileImage}
            titleRef={titleRef}
            descRef={descRef}
            loading={loading}
            setLoading={setLoading}
            setEnableInfo={setEnableInfo}
            commentRef={commentRef}
          />
        </>
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
