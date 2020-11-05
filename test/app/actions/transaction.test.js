import sinon from 'sinon';
// eslint-disable-next-line import/no-duplicates
import ActionTransaction from '../../../app/actions/transaction';
// eslint-disable-next-line import/no-duplicates
import * as actions from '../../../app/actions/transaction';
import * as homeactions from '../../../app/actions/home';
import * as walletactions from '../../../app/actions/wallet';
import * as tokensactions from '../../../app/actions/tokens';
import * as mocks from './mocks';
import * as servicemocks from '../services/services.mocks';
import * as browserService from '../../../app/services/browserService';
import * as vaultService from '../../../app/services/vaultService';
import * as transactionConstants from '../../../app/constants/transactions';
import * as storage from '../../../app/utils/storage';
import * as commonConstants from '../../../app/constants/common';
import * as walletConstants from '../../../app/constants/wallets';
import * as tokenConstants from '../../../app/constants/tokens';
import AionWallet from '../../../app/apis/wallet/aionwallet';
import { HOME_PAGE } from '../../../app/constants/navigation';

const chrome = require('sinon-chrome/extensions');
const assert = require('assert');

describe('Transaction Actions', () => {
  describe('poolingTransactions', () => {
    it('should dispatch UPDATE_TRANSACTION_LIST on successful addition', async () => {
      const transStub = sinon.stub(browserService, 'getLocalStorage');
      transStub.withArgs('transactions').returns(mocks.transactionsLocalStorageObj1);

      const expectedActions = [
        {
          type: transactionConstants.UPDATE_TRANSACTION_LIST,
          payload: mocks.updateTxnListSuccessPayload,
        },
      ];
      const store = global.mockStore({
        ...mocks.defaultState,
        ...{
          wallets: mocks.defaultWalletsState.wallets,
          networks: mocks.defaultNetworksState.networks,
          transactions: servicemocks.store.transactions,
        },
      });
      const txnReceiptStub = sinon
        .stub(ActionTransaction.prototype, 'getTransactionReceiptWithNetwork')
        .returns(mocks.txReceiept);
      const setLocalStorageStub = sinon.stub(browserService, 'setLocalStorage');
      setLocalStorageStub.withArgs('transactions').returns({});
      await actions.poolingTransactions(store, true);
      assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));

      transStub.restore();
      txnReceiptStub.restore();
      setLocalStorageStub.restore();
    });
  });
  describe('updateTransactionsAndCount', () => {
    before(() => {
      global.chrome = chrome;
    });
    it('should dispatch UPDATE_TRANSACTION_LIST on successful addition', async () => {
      const transStub = sinon.stub(browserService, 'getLocalStorage');
      transStub.withArgs('transactions').returns(mocks.transactionsLocalStorageObj1);
      const mockRetrunValue = { vault: 'this is vault' };
      const vaultStub = sinon.stub(vaultService, 'checkVault').returns(mockRetrunValue);

      const expectedActions = [
        {
          type: transactionConstants.UPDATE_PENDING_TRANSACTION,
          payload: mocks.updatePendingTxnPayload,
        },
        {
          type: commonConstants.MARKET_DATA,
          payload: mocks.marketDataSuccessfulPayload,
        },
        {
          type: walletConstants.FETCH_VAULT_BALANCE,
          payload: mocks.fetchVaultBalanceSuccessPayload,
        },
        {
          type: walletConstants.FETCH_WALLET_BALANCE,
          payload: mocks.fetchWalletBalance,
        },
      ];
      const store = global.mockStore({
        ...mocks.defaultState,
        ...{
          wallets: mocks.defaultWalletsState.wallets,
          networks: mocks.defaultNetworksState.networks,
          transactions: servicemocks.store.transactions,
        },
      });

      const setHashKeyStub = sinon.stub(storage, 'getStoreBackgroundJS').returns(store);
      const setLocalStorageStub = sinon.stub(browserService, 'setLocalStorage');
      setLocalStorageStub.withArgs('notification').returns({});
      const createOSNotificationStub = sinon.stub(browserService, 'createOSNotification');
      createOSNotificationStub.withArgs('trxalert').returns({});

      const poolingTxnStub = sinon
        .stub(actions, 'poolingTransactions')
        .returns(mocks.updateTxnListSuccessPayload);

      const fetchMarketDataStub = sinon.stub(homeactions, 'fetchMarketData').returns({
        type: commonConstants.MARKET_DATA,
        payload: mocks.marketDataSuccessfulPayload,
      });
      const getVaultBalanceStub = sinon.stub(walletactions, 'getVaultBalance').returns({
        type: walletConstants.FETCH_VAULT_BALANCE,
        payload: mocks.fetchVaultBalanceSuccessPayload,
      });
      const getCurrentWalletBalanceStub = sinon
        .stub(walletactions, 'getCurrentWalletBalance')
        .returns({
          type: walletConstants.FETCH_WALLET_BALANCE,
          payload: mocks.fetchWalletBalance,
        });
      await actions.updateTransactionsAndCount(
        '0xaff2a4b9d0b93dd8429eb5a38adffe754e4452002c1e00b56523a13a078e3db1',
      );
      chrome.flush();
      assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));
      transStub.restore();
      poolingTxnStub.restore();
      fetchMarketDataStub.restore();
      getVaultBalanceStub.restore();
      getCurrentWalletBalanceStub.restore();
      setHashKeyStub.restore();
      vaultStub.restore();
      setLocalStorageStub.restore();
      createOSNotificationStub.restore();
    }).timeout(6200);
  });
  describe('viewTransaction', () => {
    it('should dispatch UPDATE_TRANSACTION_LIST on successful addition', async () => {
      const txHash = '0x7b383c87291fb326a9bd0c0dce3abd1be2faa07bedda105933ee0f90ab5a08b3';
      const setLocalStorageStub = sinon.stub(browserService, 'getLocalStorage');
      setLocalStorageStub.withArgs('notification').returns({ notification: txHash });
      const store = global.mockStore({
        ...mocks.defaultState,
        ...{
          networks: mocks.defaultNetworksState.networks,
        },
      });
      const stubStore = sinon.stub(storage, 'getStore').returns(store);
      const tempviewAccountURL = await actions.viewTransaction();
      assert.equal(tempviewAccountURL, `https://amity.theoan.com/#/transaction/${txHash}`);
      setLocalStorageStub.restore();
      stubStore.restore();
    });
  });
  describe('sendTransaction', () => {
    before(() => {
      global.chrome = chrome;
    });
    it('should dispatch UPDATE_TRANSACTION_LIST on successful addition', async () => {
      const transStub = sinon.stub(browserService, 'getLocalStorage');
      transStub.withArgs('transactions').returns(mocks.transactionsLocalStorageObj1);
      const aionStub = sinon
        .stub(AionWallet.prototype, 'sendTransaction')
        .returns('0xfb2db525cdd1305d9020090e6d36d2dc0fb4b13f4c8602194a9e16a2a3549e93');

      const expectedActions = [
        {
          type: transactionConstants.UPDATE_TRANSACTION_LIST,
          payload: mocks.updateTxnListSuccessPayload,
        },
        {
          type: transactionConstants.UPDATE_PENDING_TRANSACTION,
          payload: mocks.updatePendingTxnPayload,
        },
        {
          type: commonConstants.CHANGE_PAGE_STATUS,
          payload: HOME_PAGE,
        },
        {
          type: transactionConstants.UPDATE_TRANSACTION_LIST,
          payload: mocks.updateTxnListSuccessPayload,
        },
        {
          type: tokenConstants.UPDATE_TOKEN_LIST,
          payload: mocks.tokenDetailsSuccessfulPayload,
        },
        {
          type: walletConstants.FETCH_WALLET_BALANCE,
          payload: mocks.fetchWalletBalance,
        },
        {
          type: walletConstants.FETCH_VAULT_BALANCE,
          payload: mocks.fetchVaultBalanceSuccessPayload,
        },
      ];
      const store = global.mockStore({
        ...mocks.defaultState,
        ...{
          wallets: mocks.defaultWalletsState.wallets,
          networks: mocks.defaultNetworksState.networks,
          transactions: servicemocks.store.transactions,
        },
      });

      const stubStore = sinon.stub(storage, 'getStore').returns(store);
      const setLocalStorageStub = sinon.stub(browserService, 'setLocalStorage');
      setLocalStorageStub.withArgs('transactions').returns({});
      const removeLocalStorageStub = sinon.stub(browserService, 'removeLocalStorage');
      removeLocalStorageStub.withArgs('popupContent').returns({});

      const updateTxnListStub = sinon.stub(transactionConstants, 'updateTransactionList').returns({
        type: transactionConstants.UPDATE_TRANSACTION_LIST,
        payload: mocks.updateTxnListSuccessPayload,
      });
      const updatePendingTxnListStub = sinon
        .stub(transactionConstants, 'updatePendingTransactions')
        .returns({
          type: transactionConstants.UPDATE_PENDING_TRANSACTION,
          payload: mocks.updatePendingTxnPayload,
        });
      const getVaultBalanceStub = sinon.stub(walletactions, 'getVaultBalance').returns({
        type: walletConstants.FETCH_VAULT_BALANCE,
        payload: mocks.fetchVaultBalanceSuccessPayload,
      });
      const getCurrentWalletBalanceStub = sinon
        .stub(walletactions, 'getCurrentWalletBalance')
        .returns({
          type: walletConstants.FETCH_WALLET_BALANCE,
          payload: mocks.fetchWalletBalance,
        });
      const txnReceiptStub = sinon
        .stub(ActionTransaction.prototype, 'getTransactionReceipt')
        .returns(mocks.txReceiept);
      const changePageStatusStub = sinon.stub(commonConstants, 'changePageStatus').returns({
        type: commonConstants.CHANGE_PAGE_STATUS,
        payload: HOME_PAGE,
      });
      const fetchTokenListBalanceStub = sinon.stub(tokensactions, 'fetchTokenListBalance').returns({
        type: tokenConstants.UPDATE_TOKEN_LIST,
        payload: mocks.tokenDetailsSuccessfulPayload,
      });
      await store.dispatch(
        actions.sendTransaction(servicemocks.store.transactions.transactionDetails),
      );

      // console.log(JSON.stringify(store.getActions()));
      assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));
      chrome.flush();
      transStub.restore();
      getVaultBalanceStub.restore();
      getCurrentWalletBalanceStub.restore();
      updateTxnListStub.restore();
      updatePendingTxnListStub.restore();
      stubStore.restore();
      txnReceiptStub.restore();
      aionStub.restore();
      changePageStatusStub.restore();
      setLocalStorageStub.restore();
      removeLocalStorageStub.restore();
      fetchTokenListBalanceStub.restore();
    }).timeout(6200);
  });
  describe('fetchTransactionList', () => {
    it('should dispatch UPDATE_TRANSACTION_LIST on successful addition', async () => {
      const transStub = sinon.stub(browserService, 'getLocalStorage');
      transStub.withArgs('transactions').returns(mocks.transactionsLocalStorageObj1);

      const expectedActions = [
        {
          type: transactionConstants.UPDATE_TRANSACTION_LIST,
          payload: mocks.fetchTransactionPayload,
        },
      ];
      const store = global.mockStore({
        ...mocks.defaultState,
        ...{
          wallets: mocks.defaultWalletsState.wallets,
        },
      });
      await store.dispatch(actions.fetchTransactionList());
      assert.equal(JSON.stringify(store.getActions()), JSON.stringify(expectedActions));

      transStub.restore();
    });
  });
});
