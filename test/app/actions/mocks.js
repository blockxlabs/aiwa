import BigNumber from 'bignumber.js';

export const currentTouVersion = {
  touVersion: '2',
};

export const newTokenData = {
  address: '0xa02210f678afce1cc5ce2eb57b5c6c12186742f71094761d7fbeea38dd3b0495',
  decimals: '18',
  granularity: '1',
  id: 'aiwa3',
  name: 'AIWA3',
  symbol: 'AIWA',
};

export const addTokenSuccessfulPayload = {
  '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802': {
    mastery: [
      {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 0,
          usd: 0,
        },
      },
      {
        address: '0xa02210f678afce1cc5ce2eb57b5c6c12186742f71094761d7fbeea38dd3b0495',
        decimals: '18',
        granularity: '1',
        id: 'aiwa3',
        name: 'AIWA3',
        symbol: 'AIWA',
        balance: {
          amount: 0,
        },
      },
    ],
    mainnet: [],
    localhost: [],
    custom: [],
  },
};

export const removeTokenSuccessfulPayload = {
  '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802': {
    mastery: [
      {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 0,
          usd: 0,
        },
      },
    ],
    mainnet: [],
    localhost: [],
    custom: [],
  },
};

export const defaultTokensState = {
  tokens: {
    tokenList: {
      '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802': {
        mainnet: [],
        mastery: [
          {
            id: 'aion',
            name: 'Aion',
            symbol: 'AION',
            decimals: 18,
            address: 'none',
            balance: {
              amount: 0,
              usd: 0,
            },
          },
        ],
        localhost: [],
        custom: [],
      },
    },
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 0,
        usd: 0,
      },
    },
  },
};

export const defaultNetworksState = {
  networks: {
    currentNetwork: {
      text: 'Mastery',
      value: 'mastery',
      networkURL:
        'https://amity-node.theoan.com/rpc',
      networkPort: '',
      networkFullUrl:
        'https://amity-node.theoan.com/rpc',
    },
  },
};

export const defaultWalletsState = {
  wallets: {
    wallets: [
      {
        privateKey:
          '0xf9dbdf38291b9985c601dc40e8d72cb5504e0cf29a50bebf4ccf1b0716dbb0217f871101a76ef30ce382f1f7f00c409d24149451d4793440bd23a9b025d7f3b8',
        address: '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802',
        alias: 'Wallet 1',
      },
    ],
    currentWallet: {
      privateKey:
        '0xf9dbdf38291b9985c601dc40e8d72cb5504e0cf29a50bebf4ccf1b0716dbb0217f871101a76ef30ce382f1f7f00c409d24149451d4793440bd23a9b025d7f3b8',
      address: '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802',
      alias: 'Wallet 1',
    },
  },
};

export const defaultAppState = {
  appState: {
    isUpdatedTouVersion: false,
    marketData: {
      circulatingSupply: '244,625,431.00',
      currentPrice: '0.41',
      marketCap: '99,209,055.91',
      priceChangePercentage24h: '2.32',
      totalVolume: '1,821,444.23',
      aion: {
        marketData: {
          currentPrice: '0.40',
          marketCap: '96,671,709.26',
          priceChangePercentage24h: '0.20',
          totalVolume: '1,898,375.22',
          circulatingSupply: '244,625,431.00',
        },
      },
    },
  },
};

export const defaultState = {
  ...defaultTokensState,
  ...defaultNetworksState,
  ...defaultWalletsState,
  ...defaultAppState,
};

export const marketDataSuccessfulResponse = {
  status: 200,
  data: {
    market_data: {
      current_price: {
        usd: 0.4063814894115557,
      },
      roi: {
        times: -0.5936185105884443,
        currency: 'usd',
        percentage: -59.36185105884443,
      },
      market_cap: {
        usd: 99209055.91158615,
      },
      market_cap_rank: 68,
      total_volume: {
        usd: 1821444.2296635949,
      },
      price_change_24h: '0.009204105444557',
      price_change_percentage_24h: '2.31737903921583',
      price_change_percentage_7d: '-0.551504315252928',
      price_change_percentage_14d: '-4.00671139484329',
      price_change_percentage_30d: '7.3773126460047',
      price_change_percentage_60d: '1.66246324987287',
      price_change_percentage_200d: '-89.9958921659441',
      price_change_percentage_1y: '0.0',
      market_cap_change_24h: '2047614.8407767',
      market_cap_change_percentage_24h: '2.10743564340965',
      total_supply: 465934587,
      circulating_supply: '244625431.00275922',
      last_updated: '2018-11-11T00:05:17.328Z',
    },
  },
};

export const marketDataFailedResponse = {
  status: '400',
  statusText: 'Error',
};

export const marketDataSuccessfulPayload = {
  ...defaultAppState.appState.marketData,
  aion: {
    marketData: {
      currentPrice: '0.41',
      marketCap: '99,209,055.91',
      priceChangePercentage24h: '2.32',
      totalVolume: '1,821,444.23',
      circulatingSupply: '244,625,431.00',
    },
  },
};

export const marketDataFailedPayload = {
  ...defaultAppState.appState.marketData,
  aion: {
    marketData: {
      error: 'Could not find coin with the given id',
    },
  },
};

export const tokenUndefinedPayload = {
  error: 'Token id must be defined.',
};

export const tokenDetailsSuccessfulPayload = {
  '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802': {
    mainnet: [],
    mastery: [
      {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 0,
          usd: 0,
        },
      },
    ],
    localhost: [],
    custom: [],
  },
};

export const vaultImportSuccessfulResponse = {
  wallets: [
    {
      privateKey:
        '0x74ea6458c08b2323e73dc0b9d87c8b3cb3cc16f3a6dbda5bad5d17589f31ec730c4497ac29ee7b9ed02a9d8822d26346cdcd0a1c35cdf2808886ca8e221db6c1',
      address: '0xa04ea99b72114fb9f74e7c2eab2f5a4d29d64ff3033316d90cb58583094f5a72',
      alias: 'Wallet 1',
    },
    {
      privateKey:
        '0x6e0bb59f1efe577f54a2a8b2d456870963b0c72b79c80c18856b1a6f3312d3d54e060d8c6fcd9304a63960f04d617d4461c0152c097e11096f58a54a72ab9532',
      address: '0xa031d349800d6e198703baa5c253f5ed8613e24fb071128f85ebe9d8602d2d85',
      alias: 'Wallet 1-2',
      imported: true,
    },
  ],
  currentWallet: {
    privateKey:
      '0x66ded3795d145bdbb97bab039b92ef776aed108c1735f4eb9b3f404798a1f01504f0da9703d8b15143d9ceb68abb12d96e45300ccbdb826a42e931306fdef125',
    address: '0xa03ca53f55ff4a37543f241717ca6674fa3b919cd327b0781d4dbc4272f37237',
    publicKey: '0x04f0da9703d8b15143d9ceb68abb12d96e45300ccbdb826a42e931306fdef125',
    alias: 'Wallet 1',
  },
  hashKey: 'this-is-a-really-cool-hash-key',
};

export const vaultImportWithoutCurrentWalletSuccessfulResponse = {
  wallets: [
    {
      privateKey:
        '0x74ea6458c08b2323e73dc0b9d87c8b3cb3cc16f3a6dbda5bad5d17589f31ec730c4497ac29ee7b9ed02a9d8822d26346cdcd0a1c35cdf2808886ca8e221db6c1',
      address: '0xa04ea99b72114fb9f74e7c2eab2f5a4d29d64ff3033316d90cb58583094f5a72',
      alias: 'Wallet 1',
    },
    {
      privateKey:
        '0x6e0bb59f1efe577f54a2a8b2d456870963b0c72b79c80c18856b1a6f3312d3d54e060d8c6fcd9304a63960f04d617d4461c0152c097e11096f58a54a72ab9532',
      address: '0xa031d349800d6e198703baa5c253f5ed8613e24fb071128f85ebe9d8602d2d85',
      alias: 'Wallet 1-2',
      imported: true,
    },
  ],
  hashKey: 'this-is-a-really-cool-hash-key',
};

const txns1 = '{"0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802":[{"hash":"0x339defca8286ef7ceb1d482503a54b59414bcd11f8f1db575693ee97bb12cf8f","value":"0.1","to":"0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403","confirmTimeStamp":"2018-12-07T14:33:06+05:30","networkURL":"https://amity-node.theoan.com/rpc","selectedToken":{"id":"aion","name":"Aion","symbol":"AION","decimals":18,"address":"none","balance":{"amount":0.3,"usd":0.042}}},{"txReceipt":{"blockHash":"0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899","nrgPrice":"0x02ad741300","logsBloom":"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","nrgUsed":21000,"contractAddress":null,"transactionIndex":0,"transactionHash":"0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3","gasLimit":"0x5208","cumulativeNrgUsed":21000,"gasUsed":"0x5208","blockNumber":1163300,"root":"13d71a2053f0d50993938bdd3bc99992bcfffa0a375bb2c617284f5befbc18f6","cumulativeGasUsed":"0x5208","from":"0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a","to":"0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403","logs":[],"gasPrice":"0x02ad741300","status":"0x1"},"tx":{"nrgPrice":"11500000000","blockHash":"0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899","nrg":21000,"transactionIndex":0,"nonce":4,"input":"0x","blockNumber":1163300,"gas":21000,"from":"0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a","to":"0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403","value":"0.1","hash":"0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3","gasPrice":"0x2ad741300","timestamp":1544172978,"confirmTimeStamp":"2018-12-07T14:26:13+05:30","selectedToken":{"id":"aion","name":"Aion","symbol":"AION","decimals":18,"address":"none","balance":{"amount":0.3,"usd":0.042}}},"networkURL":"https://amity-node.theoan.com/rpc"}],"0xa09309b9a625bcb780e735ac9fce3b87bd3c172760bed4a3bf4a8b6fb5b00b20":[],"0xa0069eb11405e21e5ca40b737559aff78bad1f22611aad23f8cfbfb2c63bd3d0":[],"0xa0bae282de261d56b47198128197be6882d3bc6bf3289b0172e0b77dd77e0a26":[],"0xa09e3e8079a65d87060c5be7272922aaa21b9b545536dce43ded63c190898c96":[],"0xa09b947a76d21af738ccf5463425336026befe20d1b9ce1f423b15847bb49f1e":[]}';
export const transactionsLocalStorageObj1 = { transactions: txns1 };

export const txReceiept = {
  blockHash: '0xc47d25d8e251688fd9e253dd20cacb913faac3d62544328cb4c57bdd0cf362bb',
  nrgPrice: '0x02ad741300',
  logsBloom:
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nrgUsed: 21000,
  contractAddress: null,
  transactionIndex: 0,
  transactionHash: '0x8343763a70c6c47251fc5517fc70a7d28a2dae747cd7afef78b2434624de26b3',
  gasLimit: '0x5208',
  cumulativeNrgUsed: 21000,
  gasUsed: '0x5208',
  blockNumber: 1147032,
  root: 'bc35514a92616ca7abd811807f2b112c64257002657aa3fc872c29ca974aa6ea',
  cumulativeGasUsed: '0x5208',
  from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
  to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
  logs: [],
  gasPrice: '0x02ad741300',
  status: '0x1',
  tx: {
    nrgPrice: '11500000000',
    blockHash: '0x5aebfc1d6e841c858d255d823faa45dfff33a9d6e2ca73d91268c250a89e2208',
    nrg: 21000,
    transactionIndex: 1,
    nonce: 5,
    input: '0x',
    blockNumber: 1163338,
    gas: 21000,
    from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
    to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
    value: new BigNumber('0'),
    hash: '0x339defca8286ef7ceb1d482503a54b59414bcd11f8f1db575693ee97bb12cf8f',
    gasPrice: '0x2ad741300',
    timestamp: 1544173404,
    confirmTimeStamp: '2018-12-07T14:33:06+05:30',
    networkURL:
      'https://amity-node.theoan.com/rpc',
  },
};

export const updateTxnListSuccessPayload = [
  {
    blockHash: '0xc47d25d8e251688fd9e253dd20cacb913faac3d62544328cb4c57bdd0cf362bb',
    nrgPrice: '0x02ad741300',
    logsBloom:
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nrgUsed: 21000,
    contractAddress: null,
    transactionIndex: 0,
    transactionHash: '0x8343763a70c6c47251fc5517fc70a7d28a2dae747cd7afef78b2434624de26b3',
    gasLimit: '0x5208',
    cumulativeNrgUsed: 21000,
    gasUsed: '0x5208',
    blockNumber: 1147032,
    root: 'bc35514a92616ca7abd811807f2b112c64257002657aa3fc872c29ca974aa6ea',
    cumulativeGasUsed: '0x5208',
    from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
    to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
    logs: [],
    gasPrice: '0x02ad741300',
    status: '0x1',
    tx: {
      nrgPrice: '11500000000',
      blockHash: '0x5aebfc1d6e841c858d255d823faa45dfff33a9d6e2ca73d91268c250a89e2208',
      nrg: 21000,
      transactionIndex: 1,
      nonce: 5,
      input: '0x',
      blockNumber: 1163338,
      gas: 21000,
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      value: '0',
      hash: '0x339defca8286ef7ceb1d482503a54b59414bcd11f8f1db575693ee97bb12cf8f',
      gasPrice: '0x2ad741300',
      timestamp: 1544173404,
      confirmTimeStamp: '2018-12-07T14:33:06+05:30',
      networkURL:
        'https://amity-node.theoan.com/rpc',
      selectedToken: {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 0.3,
          usd: 0.042,
        },
      },
    },
    networkURL:
      'https://amity-node.theoan.com/rpc',
  },
  {
    txReceipt: {
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrgPrice: '0x02ad741300',
      logsBloom:
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      nrgUsed: 21000,
      contractAddress: null,
      transactionIndex: 0,
      transactionHash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasLimit: '0x5208',
      cumulativeNrgUsed: 21000,
      gasUsed: '0x5208',
      blockNumber: 1163300,
      root: '13d71a2053f0d50993938bdd3bc99992bcfffa0a375bb2c617284f5befbc18f6',
      cumulativeGasUsed: '0x5208',
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      logs: [],
      gasPrice: '0x02ad741300',
      status: '0x1',
    },
    tx: {
      nrgPrice: '11500000000',
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrg: 21000,
      transactionIndex: 0,
      nonce: 4,
      input: '0x',
      blockNumber: 1163300,
      gas: 21000,
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      value: '0.1',
      hash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasPrice: '0x2ad741300',
      timestamp: 1544172978,
      confirmTimeStamp: '2018-12-07T14:26:13+05:30',
      selectedToken: {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: {
          amount: 0.3,
          usd: 0.042,
        },
      },
    },
    networkURL:
      'https://amity-node.theoan.com/rpc',
  },
];

export const updatePendingTxnPayload = [
  {
    walletType: 'aionWallet',
    address: '0xa003086828b535c4b8e2b28782f39087ec810777af4d2d65ae488bd76c30221f',
    hash: '0xe6f7e8a46ad5980c9409a64653858e5c289ab584104b9307f4b65f316af665ba',
  },
];
export const getVaultBalancePayload = [
  {
    wallet: {
      privateKey:
        '0xf9dbdf38291b9985c601dc40e8d72cb5504e0cf29a50bebf4ccf1b0716dbb0217f871101a76ef30ce382f1f7f00c409d24149451d4793440bd23a9b025d7f3b8',
      address: '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802',
      alias: 'Wallet 1',
    },
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 0,
        usd: 0,
      },
    },
    aionToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 0,
        usd: 0,
      },
    },
  },
];

export const fetchVaultBalanceSuccessPayload = [
  {
    wallet: {
      privateKey:
        '0xf9dbdf38291b9985c601dc40e8d72cb5504e0cf29a50bebf4ccf1b0716dbb0217f871101a76ef30ce382f1f7f00c409d24149451d4793440bd23a9b025d7f3b8',
      address: '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802',
      alias: 'Wallet 1',
    },
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 0,
        usd: 0,
      },
    },
    aionToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: {
        amount: 0,
        usd: 0,
      },
    },
  },
];
export const fetchWalletBalance = {
  wallet: {
    privateKey:
      '0xf9dbdf38291b9985c601dc40e8d72cb5504e0cf29a50bebf4ccf1b0716dbb0217f871101a76ef30ce382f1f7f00c409d24149451d4793440bd23a9b025d7f3b8',
    address: '0xa00fd17c0c67825e0c2499eae0d5820b3a69fb5b54159d7328b8a74982537802',
    alias: 'Wallet 1',
  },
  selectedToken: {
    id: 'aion',
    name: 'Aion',
    symbol: 'AION',
    decimals: 18,
    address: 'none',
    balance: {
      amount: 0,
      usd: 0,
    },
  },
};
export const fetchTransactionPayload = [
  {
    hash: '0x339defca8286ef7ceb1d482503a54b59414bcd11f8f1db575693ee97bb12cf8f',
    value: '0.1',
    to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
    confirmTimeStamp: '2018-12-07T14:33:06+05:30',
    networkURL:
      'https://amity-node.theoan.com/rpc',
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: { amount: 0.3, usd: 0.042 },
    },
  },
  {
    txReceipt: {
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrgPrice: '0x02ad741300',
      logsBloom:
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      nrgUsed: 21000,
      contractAddress: null,
      transactionIndex: 0,
      transactionHash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasLimit: '0x5208',
      cumulativeNrgUsed: 21000,
      gasUsed: '0x5208',
      blockNumber: 1163300,
      root: '13d71a2053f0d50993938bdd3bc99992bcfffa0a375bb2c617284f5befbc18f6',
      cumulativeGasUsed: '0x5208',
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      logs: [],
      gasPrice: '0x02ad741300',
      status: '0x1',
    },
    tx: {
      nrgPrice: '11500000000',
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrg: 21000,
      transactionIndex: 0,
      nonce: 4,
      input: '0x',
      blockNumber: 1163300,
      gas: 21000,
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      value: '0.1',
      hash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasPrice: '0x2ad741300',
      timestamp: 1544172978,
      confirmTimeStamp: '2018-12-07T14:26:13+05:30',
      selectedToken: {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: { amount: 0.3, usd: 0.042 },
      },
    },
    networkURL:
      'https://amity-node.theoan.com/rpc',
  },
];

export const updateTxnListPayload = [
  {
    hash: '0x339defca8286ef7ceb1d482503a54b59414bcd11f8f1db575693ee97bb12cf8f',
    value: '0.1',
    to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
    confirmTimeStamp: '2018-12-07T14:33:06+05:30',
    networkURL:
      'https://amity-node.theoan.com/rpc',
    selectedToken: {
      id: 'aion',
      name: 'Aion',
      symbol: 'AION',
      decimals: 18,
      address: 'none',
      balance: { amount: 0.3, usd: 0.042 },
    },
  },
  {
    txReceipt: {
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrgPrice: '0x02ad741300',
      logsBloom:
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      nrgUsed: 21000,
      contractAddress: null,
      transactionIndex: 0,
      transactionHash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasLimit: '0x5208',
      cumulativeNrgUsed: 21000,
      gasUsed: '0x5208',
      blockNumber: 1163300,
      root: '13d71a2053f0d50993938bdd3bc99992bcfffa0a375bb2c617284f5befbc18f6',
      cumulativeGasUsed: '0x5208',
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      logs: [],
      gasPrice: '0x02ad741300',
      status: '0x1',
    },
    tx: {
      nrgPrice: '11500000000',
      blockHash: '0xc23ec0120e9b30a50bbe64e0e36fa053089c5061eaddcf9e94cb4db997867899',
      nrg: 21000,
      transactionIndex: 0,
      nonce: 4,
      input: '0x',
      blockNumber: 1163300,
      gas: 21000,
      from: '0xa0334cfaba37bac3479c7f12d0098c02b22a5a43d99b2136ae0e70faa55b8b3a',
      to: '0xa0e4c8213a0cc0a6edb33341dec44328a1f6dea823dd1aa77193562428b81403',
      value: '0.1',
      hash: '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3',
      gasPrice: '0x2ad741300',
      timestamp: 1544172978,
      confirmTimeStamp: '2018-12-07T14:26:13+05:30',
      selectedToken: {
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
        decimals: 18,
        address: 'none',
        balance: { amount: 0.3, usd: 0.042 },
      },
    },
    networkURL:
      'https://amity-node.theoan.com/rpc',
  },
];
