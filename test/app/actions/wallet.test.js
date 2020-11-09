import sinon from 'sinon';
import * as walletConstants from '../../../app/constants/wallets';
import * as tokenService from '../../../app/services/tokenService';
import * as walletActions from '../../../app/actions/wallet';

const assert = require('assert');

describe('getVaultBalance', () => {
  it('should dispatch FETCH_VAULT_BALANCE', async () => {
    const stub = sinon.stub(tokenService, 'fetchTokenBalance').returns(0);

    const walletBalanceObjArr = [
      {
        wallet: {
          address: '0xa0a369d4ef9ad0fddc862f7123f6dbfac2b0005afe5e374882c9ff7b4b84bef5',
          alias: 'Wallet 1',
          privateKey:
            '0x2e855a43b12aa5268a1b17c763a77cd471ace039d5dadb0ed1488cd60de1e52ae877bad0b31f0d9ec6b8ce791b2b77d76b3225307a1583ec4e243168dedad26b',
        },
        selectedToken: {
          address: 'none',
          balance: { amount: 0, usd: 0 },
          decimals: 18,
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
        },
        aionToken: {
          address: 'none',
          balance: { amount: 0, usd: 0 },
          decimals: 18,
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
        },
      },
    ];

    const expectedActions = [
      {
        type: walletConstants.FETCH_VAULT_BALANCE,
        payload: walletBalanceObjArr,
      },
    ];

    const store = global.mockStore({
      wallets: {
        wallets: [
          {
            address: '0xa0a369d4ef9ad0fddc862f7123f6dbfac2b0005afe5e374882c9ff7b4b84bef5',
            alias: 'Wallet 1',
            privateKey:
              '0x2e855a43b12aa5268a1b17c763a77cd471ace039d5dadb0ed1488cd60de1e52ae877bad0b31f0d9ec6b8ce791b2b77d76b3225307a1583ec4e243168dedad26b',
          },
        ],
      },
      tokens: {
        selectedToken: {
          address: 'none',
          balance: { amount: 0, usd: 0 },
          decimals: 18,
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
        },
        tokenList: {
          '0xa0a369d4ef9ad0fddc862f7123f6dbfac2b0005afe5e374882c9ff7b4b84bef5': {
            custom: [],
            localhost: [],
            mainnet: [],
            mastery: [
              {
                address: 'none',
                balance: { amount: 0, usd: 0 },
                decimals: 18,
                id: 'aion',
                name: 'Aion',
                symbol: 'AION',
              },
            ],
          },
        },
      },
      appState: {
        marketData: {
          aion: {
            marketData: {
              circulatingSupply: '244,625,431.00',
              currentPrice: '0.40',
              marketCap: '96,936,379.59',
              priceChangePercentage24h: '-2.52',
              totalVolume: '1,759,008.55',
            },
          },
        },
      },
      networks: {
        currentNetwork: {
          networkFullUrl:
            'https://amity-node.theoan.com/rpc',
          networkPort: '',
          networkURL:
            'https://amity-node.theoan.com/rpc',
          text: 'Mastery',
          value: 'mastery',
        },
      },
    });

    await store.dispatch(walletActions.getVaultBalance());
    assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));
    stub.restore();
  });
});

describe('getCurrentWalletBalance', () => {
  it('should dispatch FETCH_WALLET_BALANCE', async () => {
    const stub = sinon.stub(tokenService, 'fetchTokenBalance').returns(0);

    const walletBalanceObj = {
      wallet: {
        address: '0xa0a369d4ef9ad0fddc862f7123f6dbfac2b0005afe5e374882c9ff7b4b84bef5',
        alias: 'Wallet 1',
        privateKey:
          '0x2e855a43b12aa5268a1b17c763a77cd471ace039d5dadb0ed1488cd60de1e52ae877bad0b31f0d9ec6b8ce791b2b77d76b3225307a1583ec4e243168dedad26b',
      },
      selectedToken: {
        address: 'none',
        balance: { amount: 0, usd: 0 },
        decimals: 18,
        id: 'aion',
        name: 'Aion',
        symbol: 'AION',
      },
    };

    const expectedActions = [
      {
        type: walletConstants.FETCH_WALLET_BALANCE,
        payload: walletBalanceObj,
      },
    ];

    const store = global.mockStore({
      wallets: {
        currentWallet: {
          address: '0xa0a369d4ef9ad0fddc862f7123f6dbfac2b0005afe5e374882c9ff7b4b84bef5',
          alias: 'Wallet 1',
          privateKey:
            '0x2e855a43b12aa5268a1b17c763a77cd471ace039d5dadb0ed1488cd60de1e52ae877bad0b31f0d9ec6b8ce791b2b77d76b3225307a1583ec4e243168dedad26b',
        },
      },
      tokens: {
        selectedToken: {
          address: 'none',
          balance: { amount: 0, usd: 0 },
          decimals: 18,
          id: 'aion',
          name: 'Aion',
          symbol: 'AION',
        },
      },
      appState: {
        marketData: {
          aion: {
            marketData: {
              circulatingSupply: '244,625,431.00',
              currentPrice: '0.40',
              marketCap: '96,936,379.59',
              priceChangePercentage24h: '-2.52',
              totalVolume: '1,759,008.55',
            },
          },
        },
      },
      networks: {
        currentNetwork: {
          networkFullUrl:
            'https://amity-node.theoan.com/rpc',
          networkPort: '',
          networkURL:
            'https://amity-node.theoan.com/rpc',
          text: 'Mastery',
          value: 'mastery',
        },
      },
    });

    await store.dispatch(walletActions.getCurrentWalletBalance());
    assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));
    stub.restore();
  });
});
