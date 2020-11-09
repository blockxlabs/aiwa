/* eslint-disable no-loop-func */
const Web3 = require('aion-web3');
const _ = require('underscore'); //DP : Remove this import once aion-web3 1.0 will be used
const {
  ETH,
  ETH_SENDTRANSACTION,
  ETH_ACCOUNTS,
  ETH_GETACCOUNTS,
  ETH_SIGNTRANSACTION,
  ETH_SIGN,
} = require('./constants');

let result;
let web3;
let handler;
let currentAddress;
const error = new Error('Invalid address');
const commonInfo = {
  type: 'FROM_PAGE',
  info: {
    origin: window.location.origin,
    url: window.location.host,
  },
};

function isValidAIONAddress(address) {
  //DP : Remove this function once aion-web3 1.0 will be used
  if (address && !/^(0x|0X)?[0-9a-f]{64}$/i.test(address)) {
    throw error;
  }
}

function isValidFromAddress(address) {
  //DP : Remove this function once aion-web3 1.0 will be used
  if (address && address !== currentAddress[0]) {
    throw error;
  }
}

function isHexStrict(hex) {
  //DP : Remove this function once aion-web3 1.0 will be used
  if (hex && !((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex))) {
    throw new Error('Invalid data');
  }
}

function activateStream(data) {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    window.postMessage(data, window.location.href);
    window.addEventListener('message', event => {
      // We only accept messages from ourselves
      if (event.source !== window) return;
      if (event.data.type && event.data.type === 'FROM_EXTENSION') {
        if (event.data.initial_state) {
          // eslint-disable-next-line
          initializeWeb3(event.data.initial_state.data.network);
          currentAddress = event.data.initial_state.data.address;
          resolve({ currentAddress });
        } else if (event.data.current_network) {
          // eslint-disable-next-line
          initializeWeb3(event.data.current_network.data);
        } else if (event.data.current_wallet) {
          currentAddress = event.data.current_wallet.data;
          resolve({ currentAddress });
        } else {
          result = event.data;

          resolve({ result });
        }
      }
    });
  });
}

const signTransactionFn = async txInfo => {
  if (currentAddress[0]) {
    isValidFromAddress(txInfo.from);
    isValidAIONAddress(txInfo.to);
    const data = {
      ...commonInfo,
      func: 'eth_signTransaction',
      args: txInfo,
    };
    const { result } = await activateStream(data);
    if (result.cancel) throw new Error(result.message);
    return result;
  }
  throw error;
};

const sendTransactionFn = async txInfo => {
  if (currentAddress[0]) {
    isValidFromAddress(txInfo.from);
    isValidAIONAddress(txInfo.to);
    isHexStrict(txInfo.data);
    const data = {
      ...commonInfo,
      func: 'eth_sendTransaction',
      args: txInfo,
    };
    const { result } = await activateStream(data);
    if (result.cancel) throw new Error(result.message);
    return result.data;
  }
  throw error;
};

const signFn = async (signer, message) => {
  if (currentAddress[0]) {
    isValidFromAddress(signer);
    const data = {
      ...commonInfo,
      func: 'eth_sign',
      args: { signer, message },
    };
    const { result } = await activateStream(data);
    if (result.cancel) throw new Error(result.message);
    return result;
  }
  throw error;
};

const getCurrentAddressFn = () => new Promise(resolve => {
  resolve(currentAddress);
});

function initializeWeb3(url) {
  web3 = new Web3(new Web3.providers.HttpProvider(`${url}`));
  handler = {
    get: (_aionweb3, key) => {
      switch (key) {
        case ETH:
          return new Proxy(_aionweb3[key], handler);
        case ETH_SENDTRANSACTION:
          return sendTransactionFn;
        case ETH_GETACCOUNTS:
          return getCurrentAddressFn;
        case ETH_ACCOUNTS:
          return currentAddress;
        case ETH_SIGNTRANSACTION:
          return signTransactionFn;
        case ETH_SIGN:
          return signFn;
        default:
      }
      return _aionweb3[key];
    },
    set: (_aionweb3, key, value) => {
      _aionweb3[key] = value;
    },
  };
  global.aionweb3 = new Proxy(web3, handler);
}

const enableFn = async () => {
  const data = {
    ...commonInfo,
    func: 'privacy',
  };
  const { result } = await activateStream(data);
  if (result.cancel) throw new Error(result.message);

  const address = result.connect_privacy.data;
  currentAddress = [address];
  return currentAddress;
};

const getInitialState = async () => {
  // initial url must be same as that's in extension pop up. If you change here change in popup as well
  initializeWeb3(
    'https://amity-node.theoan.com/rpc',
  );
  const data = {};
  data.type = 'FROM_PAGE';
  data.func = 'initial_state';
  await activateStream(data);
  return true;
};

getInitialState();

global.aiwa = {
  enable: enableFn,
};
