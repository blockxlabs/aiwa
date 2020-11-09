import sinon from 'sinon';
import axios from 'axios';
import * as networkConstants from '../../../app/constants/networks';
import * as commonConstants from '../../../app/constants/common';
import * as walletConstants from '../../../app/constants/wallets';
import * as transConstants from '../../../app/constants/transactions';
import * as watcherService from '../../../app/services/watcherService';
import changeNetworkSettings from '../../../app/actions/network';
import * as tokenService from '../../../app/services/tokenService';
import * as browserService from '../../../app/services/browserService';
import * as mocks from './mocks';

const assert = require('assert');

describe('Network Action', () => {
  describe('changeNetworkSettings', () => {
    it('should dispatch ISLOADING, SHOW_NETWORK_LIST, CHANGE_CURRENT_NETWORK, NETWORK_CONNECTION_UPDATE, MARKET_DATA, UPDATE_TOKEN_LIST, ISLOADING, CHANGE_SELECTED_TOKEN, UPDATE_TOKEN_LIST, FETCH_WALLET_BALANCE, UPDATE_TRANSACTION_LIST, FETCH_VAULT_BALANCE, ISLOADING on successful call', async () => {
      const tokenStub = sinon.stub(tokenService, 'fetchTokenBalance').returns(0);
      const axiosStub = sinon.stub(axios, 'get');
      const transStub = sinon.stub(browserService, 'getLocalStorage');
      transStub.withArgs('transactions').returns(mocks.transactionsLocalStorageObj1);

      const verifyConnectionStub = sinon.stub(watcherService, 'verifyConnection').returns({
        statusCode: 200,
        flag: true,
      });
      const url = 'https://api.coingecko.com/api/v3/coins/aion';
      axiosStub.withArgs(url).returns(mocks.marketDataSuccessfulResponse);

      const expectedActions = [
        {
          type: commonConstants.ISLOADING,
          payload: true,
        },
        {
          type: networkConstants.SHOW_NETWORK_LIST,
          payload: false,
        },
        {
          type: networkConstants.CHANGE_CURRENT_NETWORK,
          payload: {
            text: 'Mainnet',
            value: 'mainnet',
            networkURL:
              'https://mainnet-node.theoan.com/rpc',
            networkPort: '',
            networkFullUrl:
              'https://mainnet-node.theoan.com/rpc',
          },
        },
        {
          type: commonConstants.NETWORK_CONNECTION_UPDATE,
          payload: {
            statusCode: 200,
            flag: true,
          },
        },
        {
          type: walletConstants.FETCH_WALLET_BALANCE,
          payload: {
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
          },
        },
        {
          type: transConstants.UPDATE_TRANSACTION_LIST,
          payload: mocks.updateTxnListPayload,
        },
        {
          type: walletConstants.FETCH_VAULT_BALANCE,
          payload: [
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
          ],
        },
        {
          type: commonConstants.ISLOADING,
          payload: false,
        },
      ];

      const store = global.mockStore(mocks.defaultState);
      await store.dispatch(
        changeNetworkSettings(
          {
            text: 'Mainnet',
            value: 'mainnet',
            networkURL:
              'https://mainnet-node.theoan.com/rpc',
            networkPort: '',
            networkFullUrl:
              'https://mainnet-node.theoan.com/rpc',
          },
          '0xa03ca53f55ff4a37543f241717ca6674fa3b919cd327b0781d4dbc4272f37237',
        ),
      );

      assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));
      transStub.restore();
      tokenStub.restore();
      axiosStub.restore();
      verifyConnectionStub.restore();
    });
  });
});
