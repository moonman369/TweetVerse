import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

const clientId =
  "BNsuQid8SaxMdN3QS1lxXhVgD9M3JG-jRUDdejWuUS9Att9g-BVo9Zrdw23w0FA8tc57CMDVZm4T_hTX36QDUoU";

const web3auth = new Web3AuthCore({
  clientId,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
    chainId: "0x13881",
    rpcTarget:
      "https://virulent-red-tent.matic-testnet.discover.quiknode.pro/4e1afeddceb33ecded6e34b04d18bf4539ab6df8/",
  },
});
web3auth.init();

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    clientId,
    network: "testnet",
    uxMode: "popup",
    whiteLabel: {
      name: "Twitter DApp",
      logoLight: "<hosted-logo-image-link>",
      logoDark: "<hosted-logo-image-link>",
      defaultLanguage: "en",
      dark: true, // whether to enable dark mode.
      //   defaultValue: false,
    },
    loginConfig: {
      // Add login configs corresponding to the providers on modal
      // Twitter login
      jwt: {
        name: "Custom Auth Login",
        verifier: "moonman-twitter-verse-1", // Please create a verifier on the developer dashboard and pass the name here
        typeOfLogin: "twitter", // Pass on the login provider of the verifier you've created
        clientId: "UMpo2OHmDXHmgnsyKt75VWxtpiyBxCSc", // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
      },
    },
  },
});
web3auth.configureAdapter(openloginAdapter);

const torusPlugin = new TorusWalletConnectorPlugin({
  torusWalletOpts: {},
  walletInitOptions: {
    whiteLabel: {
      theme: { isDark: true, colors: { primary: "#00a8ff" } },
      logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    useWalletConnect: true,
    enableLogging: true,
  },
});
await web3auth.addPlugin(torusPlugin);
web3auth.init();
