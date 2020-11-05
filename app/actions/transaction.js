import React from 'react';
import moment from 'moment';
import BigNumber from 'bignumber.js';

// Import Constants and Actions
import config from '../app.config';
import {
  updateTransactionList,
  updatePendingTransactions,
  updateNrgPrice,
  updateNrgLimit,
} from '../constants/transactions';
import NRG_MULTIPLIER from '../constants/nrg';
import { changePageStatus, updateLoading } from '../constants/common';
import { HOME_PAGE } from '../constants/navigation';
import { getCurrentWalletBalance, getVaultBalance } from './wallet';
import { createToast } from '../constants/toast';
// Import Services
import {
  convertBNToAion,
  convertBNToString,
  convertNanoAmpToAmp,
  convertNRGPriceToAion,
  convertValueToUSD,
} from '../services/numberFormatter';
import Transaction from '../apis/transaction/transaction';
import AddAddressToast from '../components/AddAddressToast';

import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  sendMessage,
  createOSNotification,
} from '../services/browserService';
import { setHashKey, getStore, getStoreBackgroundJS } from '../utils/storage';
import { sendToken, getNrgLimit, getNrgPrice } from '../services/tokenService';
import { checkVault } from '../services/vaultService';
import { fetchTokenListBalance } from './tokens';
// eslint-disable-next-line import/no-cycle
import { fetchMarketData } from './home';

export default class ActionTransaction {
  transaction;

  constructor(_privateKey) {
    this.transaction = new Transaction(_privateKey);
  }

  async sendTransaction(_transaction) {
    const response = await this.transaction.sendTransaction(_transaction);
    return response;
  }

  async signTransaction(_transaction) {
    const response = await this.transaction.signTransaction(_transaction);
    return response;
  }

  listTransaction(_address) {
    return new Promise((resolve, reject) => {
      try {
        this.transaction.listTransaction(_address).then(response => {
          getLocalStorage('transactions').then(value => {
            const oldTrx = value.transactions;
            const newTrx = [];
            if (response) {
              const count = response.length;
              let i = 0;
              if (count > 0) {
                response.forEach(obj => {
                  const trx = oldTrx.filter(x => x.hash === obj.hash)[0];
                  i += 1;
                  if (trx === undefined) {
                    this.getTransactionReceipt(obj.hash).then(result => {
                      if (result !== undefined) {
                        if (result.status !== undefined && result.status !== null) {
                          if (result.status === 1) {
                            obj.status = 'confirmed';
                          } else if (result.status === 0) {
                            obj.status = 'failed';
                          } else {
                            obj.status = 'rejected';
                          }
                        } else {
                          obj.status = 'pending';
                        }
                      }
                      newTrx.push(obj);
                      if (i === count) {
                        resolve(newTrx);
                      }
                    });
                  } else {
                    obj.status = trx.status;
                    newTrx.push(obj);
                    if (i === count) {
                      resolve(newTrx);
                    }
                  }
                });
              }
            }
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async getTransactionReceipt(_trxHash) {
    const txnReceipt = await this.transaction.getTransactionReceipt(_trxHash);
    return txnReceipt;
  }

  async getTransactionReceiptWithNetwork(_trxHash, network) {
    const txnReceipt = await this.transaction.getTransactionReceiptWithNetwork(_trxHash, network);
    return txnReceipt;
  }

  getTransactionCount(_address) {
    return new Promise(resolve => {
      this.transaction.getTransactionCount(_address).then(response => {
        resolve(response);
      });
    });
  }
}

export async function poolingTransactions(store, isPopupcalling) {
  const cWallet = store.getState().wallets.currentWallet;
  const value = await getLocalStorage('transactions');
  const txns = JSON.parse(value.transactions);
  const currentTxns = txns[cWallet.address];
  const unpooledTxns = currentTxns.filter(x => x.txReceipt === undefined);

  unpooledTxns.forEach(async t => {
    const txHash = t.hash;
    const transaction = new ActionTransaction(cWallet.privateKey);
    const networkUrl = store.getState().networks.currentNetwork.networkFullUrl;
    const txReceipt = await transaction.getTransactionReceiptWithNetwork(txHash, networkUrl);

    if (txReceipt === undefined) return;

    const txn = txReceipt;

    const tx = {
      ...txReceipt.tx,
      USD: t.USD,
      confirmTimeStamp: t.confirmTimeStamp,
      value: t.selectedToken.address === 'none' ? convertBNToAion(txReceipt.tx.value) : t.value,
      selectedToken: t.selectedToken,
    };

    txn.networkURL = networkUrl;

    txn.tx = tx;

    const txIndex = currentTxns.findIndex(x => x.hash === t.hash);
    if (txIndex > -1) {
      txns[cWallet.address][txIndex] = txn;
      if (isPopupcalling) {
        const updateCurrentTxns = txns[cWallet.address];
        const txList = updateCurrentTxns.map(element => element);

        const allPendingTrxnsObj = store.getState().transactions.pendingTrxns === undefined
          ? undefined
          : store.getState().transactions.pendingTrxns;

        const pendingIdx = allPendingTrxnsObj.findIndex(ptx => ptx.hash === t.hash);

        if (pendingIdx !== -1) {
          allPendingTrxnsObj.splice(pendingIdx, 1);
          store.dispatch(updatePendingTransactions(allPendingTrxnsObj));
        }

        store.dispatch(updateTransactionList(txList));

        setLocalStorage('transactions', JSON.stringify(txns));
      } else {
        // communicate vis local storage
        setLocalStorage('transactions', JSON.stringify(txns));
      }
    }
  });
}

export async function updateTransactionsAndCount(hashKey) {
  const isVault = await checkVault();
  if (isVault) {
    const isPopupCalling = hashKey === undefined;
    let store;
    if (!isPopupCalling) {
      // background js has to set hash key, popup doesn't.
      await setHashKey(hashKey);
      store = await getStoreBackgroundJS();
    } else {
      store = await getStore();
    }
    await poolingTransactions(store, isPopupCalling);
    const value = await getLocalStorage('transactions');
    const txns = JSON.parse(value.transactions);
    const currentTxns = txns[store.getState().wallets.currentWallet.address];
    const confirmTrxns = currentTxns.filter(x => x.txReceipt !== undefined);
    const allPendingTrxnsObj = store.getState().transactions.pendingTrxns === undefined
      ? undefined
      : store.getState().transactions.pendingTrxns;
    if (allPendingTrxnsObj.length > 0) {
      const pendingTrxnsObj = allPendingTrxnsObj.filter(
        x => x.walletType === config.currentWalletType,
      );
      if (pendingTrxnsObj !== undefined && pendingTrxnsObj.length > 0) {
        const trx = confirmTrxns.filter(
          item => pendingTrxnsObj.findIndex(x => x.hash === item.tx.hash) !== -1,
        );
        if (trx !== null && trx.length > 0) {
          //notification for confirm
          const status = trx[0].txReceipt.status === '0x1' ? 'confirmed' : 'failed';
          const msg = `Transaction (${trx[0].txReceipt.transactionHash.substring(
            0,
            8,
          )}...) has ${status}. View on AION explorer.`;
          await setLocalStorage('notification', trx[0].txReceipt.transactionHash);
          await createOSNotification('trxalert', msg);

          const index = allPendingTrxnsObj.findIndex(
            x => x.hash === trx[0].txReceipt.transactionHash,
          );
          allPendingTrxnsObj.splice(index, 1);

          const { selectedToken } = store.getState().tokens;
          store.dispatch(updatePendingTransactions(allPendingTrxnsObj));

          store.dispatch(fetchMarketData('aion'));
          if (selectedToken.id !== 'aion') {
            store.dispatch(fetchMarketData(selectedToken.id));
          }
          store.dispatch(getVaultBalance());
          store.dispatch(getCurrentWalletBalance());
        }
      }
    }
  }
}

export async function viewTransaction() {
  const obj = await getLocalStorage('notification');
  if (obj.notification !== undefined) {
    const txHash = obj.notification;
    let tempviewAccountURL = null;
    const store = await getStore();
    const currentNetwork = store.getState().networks.currentNetwork.value;
    switch (currentNetwork) {
      case 'mastery':
        tempviewAccountURL = `https://amity.theoan.com/#/transaction/${txHash}`;
        break;
      case 'mainnet':
        tempviewAccountURL = `https://mainnet.theoan.com/#/transaction/${txHash}`;
        break;
      default:
        tempviewAccountURL = `https://amity.theoan.com/#/transaction/${txHash}`;
    }

    return tempviewAccountURL;
  }
}

export function sendTransaction(transactionDetails) {
  return async (dispatch, getState) => {
    // Get Variables from reducer state
    const { currentWallet } = getState().wallets;
    const { currentNetwork } = getState().networks;
    const { pendingTrxns } = getState().transactions;
    const { wallets } = getState().wallets;
    const { vaults } = getState();

    // Declare Transaction Timestamp
    const timestamp = moment().format();

    const usdAmount = transactionDetails.amount.ccyValue;

    // Initialize Transaction Object
    const transaction = {
      to: transactionDetails.to.address,
      amount: transactionDetails.amount.value,
      gasLimit: transactionDetails.nrg.gasLimit,
      gasPrice: transactionDetails.nrg.gasPrice,
      data: transactionDetails.hexData,
    };

    // Initialize Account
    const account = new ActionTransaction(currentWallet.privateKey);
    // Send Token/AION
    let transactionHash;
    if (transactionDetails.selectedToken.address === 'none') {
      transactionHash = await account.sendTransaction(transaction);
    } else {
      // Declare Transaction
      const sendTokenTransaction = {
        from: transactionDetails.from.address,
        to: transaction.to,
        amount: transaction.amount.toString(),
        hexData: transaction.data,
        gasPrice: new BigNumber(transaction.gasPrice),
        gas: new BigNumber(transaction.gasLimit),
      };

      transactionHash = await sendToken(
        sendTokenTransaction,
        transactionDetails.selectedToken.address,
        currentWallet.privateKey,
        currentNetwork.networkFullUrl,
      );
    }

    // Get Transaction from Local Storage
    const transactionsLocalStorageObj = await getLocalStorage('transactions');
    const transactionsLocalStorage = JSON.parse(transactionsLocalStorageObj.transactions);

    // Create Transaction Obj
    const lastTransaction = {
      hash: transactionHash,
      value: transaction.amount,
      USD: usdAmount,
      to: transaction.to,
      confirmTimeStamp: timestamp,
      networkURL: currentNetwork.networkFullUrl,
      selectedToken: transactionDetails.selectedToken,
    };

    // avoid duplicate address
    let indexOfAddress;
    if (vaults !== undefined) {
      if (vaults.addressBook !== undefined) {
        indexOfAddress = vaults.addressBook.map(x => x.address).indexOf(lastTransaction.to);
      }
    }
    if (indexOfAddress < 0) {
      indexOfAddress = wallets.map(x => x.address).indexOf(lastTransaction.to);
    }
    //Add address to Address book
    if (indexOfAddress < 0) {
      const component = <AddAddressToast address={lastTransaction.to} />;
      dispatch(
        createToast({
          message: component,
          type: 'info',
          autoClose: false,
          isCustom: true,
        }),
      );
    }

    // Add Last Transaction
    const tempTransactionListObj = {
      ...transactionsLocalStorage,
      [currentWallet.address]: [
        lastTransaction,
        ...transactionsLocalStorage[currentWallet.address],
      ],
    };

    // Create Pending Transaction Obj
    const currentPendingTransaction = {
      walletType: config.currentWalletType,
      address: currentWallet.address,
      hash: transactionHash,
    };

    // Append Current Transaction to Pending Transaction array
    const tempPendingTransactions = pendingTrxns !== undefined ? pendingTrxns : [];
    tempPendingTransactions.unshift(currentPendingTransaction);

    // Store Transactions Array back in Local Storage
    await setLocalStorage('transactions', JSON.stringify(tempTransactionListObj));

    // Dispatch Transaction Array
    dispatch(updateTransactionList(tempTransactionListObj[currentWallet.address]));

    // Dispatch Pending Transactions
    dispatch(updatePendingTransactions(tempPendingTransactions));
    await removeLocalStorage(['popupContent']);
    // Change Page
    dispatch(changePageStatus(HOME_PAGE));
    // Check if AIWA was opened through DApp
    if (transactionDetails.dApp) {
      await sendMessage({
        result: 'send',
        data: transactionHash,
      });
    }

    // Get Transaction Reciept
    const transactionReceipt = await account.getTransactionReceipt(transactionHash);

    // Get Transaction Object from Local Storage
    const transactionListObjLocalStorage = await getLocalStorage('transactions');
    const updatedTransactionsLocalStorage = JSON.parse(transactionListObjLocalStorage.transactions);

    // Loop Through Current Wallet Transactions
    updatedTransactionsLocalStorage[currentWallet.address].forEach((transaction, index) => {
      if (transactionReceipt !== undefined && transaction.hash === transactionReceipt.tx.hash) {
        const transactionObj = {
          ...transactionReceipt,
          networkURL: currentNetwork.networkFullUrl,
          tx: {
            ...transactionReceipt.tx,
            USD: transaction.USD,
            confirmTimeStamp: transaction.confirmTimeStamp,
            value:
              transaction.selectedToken.address === 'none'
                ? convertBNToAion(transactionReceipt.tx.value)
                : transaction.value,
            selectedToken: transaction.selectedToken,
          },
        };

        // Replace Transaction
        updatedTransactionsLocalStorage[currentWallet.address][index] = transactionObj;
      }
    });

    // Store Transactions Array back in Local Storage After Pending Transactin is complete
    setLocalStorage('transactions', JSON.stringify(updatedTransactionsLocalStorage));

    // Dispatch Transaction Array
    const tempTransactionListObjPostPending = [
      ...updatedTransactionsLocalStorage[currentWallet.address],
    ];
    dispatch(updateTransactionList(tempTransactionListObjPostPending));

    // Fetch Balances
    await dispatch(fetchTokenListBalance());
    await dispatch(getCurrentWalletBalance());
    await dispatch(getVaultBalance());
  };
}

export function fetchTransactionList() {
  return async (dispatch, getState) => {
    // Declare Variables
    const { currentWallet } = getState().wallets;

    const transactionListObjLocalStorage = await getLocalStorage('transactions');
    const transactionList = JSON.parse(transactionListObjLocalStorage.transactions);
    const currentWalletTransactions = transactionList[currentWallet.address];

    if (currentWalletTransactions.length > 0) {
      dispatch(updateTransactionList(currentWalletTransactions));
    } else {
      dispatch(updateTransactionList(undefined));
    }
  };
}

export function fetchNrgPrice() {
  return async (dispatch, getState) => {
    dispatch(updateLoading(true));
    const { currentWallet } = getState().wallets;
    const { marketData } = getState().appState;

    // get Aion USD Price
    const aionPrice = marketData.aion.marketData.currentPrice;

    // Get Gas Price
    const gasPrice = await getNrgPrice(currentWallet.privateKey);

    if (gasPrice !== undefined) {
      const nrgPrice = {
        value: gasPrice,
        nrgInUsd: {
          slow: convertValueToUSD(convertNRGPriceToAion(gasPrice), aionPrice),
          normal: convertValueToUSD(
            convertNRGPriceToAion(gasPrice) * NRG_MULTIPLIER.NORMAL,
            aionPrice,
          ),
          fast: convertValueToUSD(convertNRGPriceToAion(gasPrice) * NRG_MULTIPLIER.FAST, aionPrice),
        },
        nrgInAmp: {
          slow: convertBNToString(convertNanoAmpToAmp(gasPrice), 0),
          normal: convertBNToString(convertNanoAmpToAmp(gasPrice) * NRG_MULTIPLIER.NORMAL, 0),
          fast: convertBNToString(convertNanoAmpToAmp(gasPrice) * NRG_MULTIPLIER.FAST, 0),
        },
      };
      dispatch(updateNrgPrice(nrgPrice));
      dispatch(updateLoading(false));
    }
  };
}

export function fetchNrgLimit(to, amount, validatedHexData) {
  return async (dispatch, getState) => {
    dispatch(updateLoading(true));
    const { currentWallet } = getState().wallets;
    const { currentNetwork } = getState().networks;
    const { selectedToken } = getState().tokens;

    if (to === undefined) to = currentWallet.address;

    if (amount === undefined) amount = '0';

    if (validatedHexData === undefined) validatedHexData = '';

    // Get NRG Limit
    const nrgLimit = await getNrgLimit(
      to,
      amount,
      validatedHexData,
      selectedToken,
      currentWallet.privateKey,
      currentNetwork.networkFullUrl,
    );
    if (nrgLimit !== 0) {
      dispatch(updateNrgLimit(nrgLimit));
    }
    dispatch(updateLoading(false));
  };
}

export function signTransaction(transactionDetails) {
  return async (dispatch, getState) => {
    // Get Variables from reducer state
    const { currentWallet } = getState().wallets;
    const { currentNetwork } = getState().networks;
    // Initialize Account
    const account = new ActionTransaction(currentWallet.privateKey);
    // Initialize Transaction Object
    const transaction = {
      to: transactionDetails.to.address,
      amount: transactionDetails.amount.value,
      gasLimit: transactionDetails.nrg.gasLimit,
      gasPrice: transactionDetails.nrg.gasPrice,
      data: transactionDetails.hexData,
    };
    let signedTx;

    if (transactionDetails.selectedToken.address === 'none') {
      signedTx = await account.signTransaction(transaction);
    } else {
      // Declare Transaction
      const sendTokenTransaction = {
        from: transactionDetails.from.address,
        to: transaction.to,
        amount: transaction.amount.toString(),
        hexData: transaction.data,
        gasPrice: new BigNumber(transaction.gasPrice),
        gas: transaction.gasLimit,
      };

      signedTx = await sendToken(
        sendTokenTransaction,
        transactionDetails.selectedToken.address,
        currentWallet.privateKey,
        currentNetwork.networkFullUrl,
        false,
      );
    }
    // Change Page
    await removeLocalStorage(['popupContent']);
    dispatch(changePageStatus(HOME_PAGE));
    await sendMessage({
      result: 'signed',
      data: signedTx,
    });
  };
}
