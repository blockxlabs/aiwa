export const CHANGE_CURRENT_NETWORK = 'CHANGE_CURRENT_NETWORK';
export const UPDATE_NETWORK_LIST = 'UPDATE_NETWORK_LIST';
export const SHOW_NETWORK_LIST = 'SHOW_NETWORK_LIST';

export function updateNetworkList(_networks) {
  return {
    type: UPDATE_NETWORK_LIST,
    payload: _networks,
  };
}

export function changeCurrentNetwork(_network) {
  return {
    type: CHANGE_CURRENT_NETWORK,
    payload: _network,
  };
}

export function showNetworks(_flag) {
  return {
    type: SHOW_NETWORK_LIST,
    payload: _flag,
  };
}

export const AION_NETWORK_LIST = [
  {
    text: 'Mainnet',
    value: 'mainnet',
    networkURL:
      'https://mainnet-node.theoan.com/rpc',
    networkPort: '',
    networkFullUrl:
      'https://mainnet-node.theoan.com/rpc',
    transactionUrl: 'https://mainnet.theoan.com/#/transaction/',
  },
  {
    text: 'Mastery',
    value: 'mastery',
    networkURL:
      'https://amity-node.theoan.com/rpc',
    networkPort: '',
    networkFullUrl:
      'https://amity-node.theoan.com/rpc',
    transactionUrl: 'https://amity.theoan.com/#/transaction/',
  },
  {
    text: 'Localhost',
    value: 'localhost',
    networkURL: 'http://127.0.0.1',
    networkPort: '8545',
    networkFullUrl: 'http://127.0.0.1:8545',
  },
  {
    text: 'Custom',
    value: 'custom',
    networkURL: 'http://localhost',
    networkPort: '8545',
    networkFullUrl: 'http://localhost:8545',
  },
];
export const ETH_NETWORK_LIST = [
  {
    text: 'Main Network',
    value: 'mainnet',
    networkURL: '',
    networkPort: '',
    networkFullUrl: '',
  },
  {
    text: 'Kovan Test Network',
    value: 'kovan',
    networkURL: '',
    networkPort: '',
    networkFullUrl: '',
  },
  {
    text: 'Ropsten Test Network',
    value: 'ropsten',
    networkURL: '',
    networkPort: '',
    networkFullUrl: '',
  },
  {
    text: 'RinkeBy Test Network',
    value: 'rinkeby',
    networkURL: '',
    networkPort: '',
    networkFullUrl: '',
  },
  {
    text: 'Custom',
    value: 'custom',
    url: 'http://localhost',
    networkPort: '8545',
    networkFullUrl: 'http://localhost:8545',
  },
];
