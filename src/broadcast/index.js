import Promise from 'bluebird';
import newDebug from 'debug';

import broadcastHelpers from './helpers';
import formatterFactory from '../formatter';
import operations from './operations';
import smokeApi from '../api';
import smokeAuth from '../auth';
import { camelCase } from '../utils';

const debug = newDebug('smoke:broadcast');
const noop = function() {}
const formatter = formatterFactory(smokeApi);

const smokeBroadcast = {};

// Base transaction logic -----------------------------------------------------

/**
 * Sign and broadcast transactions on the smoke network
 */

smokeBroadcast.send = function smokeBroadcast$send(tx, privKeys, callback) {
  const resultP = smokeBroadcast._prepareTransaction(tx)
    .then((transaction) => {
      debug(
        'Signing transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      return Promise.join(
        transaction,
        smokeAuth.signTransaction(transaction, privKeys)
      );
    })
    .spread((transaction, signedTransaction) => {
      debug(
        'Broadcasting transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      return smokeApi.broadcastTransactionSynchronousAsync(
        signedTransaction
      ).then((result) => {
        return Object.assign({}, result, signedTransaction);
      });
    });

  resultP.nodeify(callback || noop);
};

smokeBroadcast._prepareTransaction = function smokeBroadcast$_prepareTransaction(tx) {
  const propertiesP = smokeApi.getDynamicGlobalPropertiesAsync();
  return propertiesP
    .then((properties) => {
      // Set defaults on the transaction
      const chainDate = new Date(properties.time + 'Z');
      const refBlockNum = (properties.last_irreversible_block_num - 1) & 0xFFFF;
      return smokeApi.getBlockHeaderAsync(properties.last_irreversible_block_num).then((block) => {
        const headBlockId = block.previous;
        return Object.assign({
          ref_block_num: refBlockNum,
          ref_block_prefix: new Buffer(headBlockId, 'hex').readUInt32LE(4),
          expiration: new Date(
            chainDate.getTime() +
            600 * 1000
          ),
        }, tx);
      });
    });
};

// Generated wrapper ----------------------------------------------------------

// Generate operations from operations.json
operations.forEach((operation) => {
  const operationName = camelCase(operation.operation);
  const operationParams = operation.params || [];

  const useCommentPermlink =
    operationParams.indexOf('parent_author') !== -1 &&
    operationParams.indexOf('parent_permlink') !== -1;

  smokeBroadcast[`${operationName}With`] =
    function smokeBroadcast$specializedSendWith(wif, options, callback) {
      debug(`Sending operation "${operationName}" with`, {options, callback});
      const keys = {};
      if (operation.roles && operation.roles.length) {
        keys[operation.roles[0]] = wif; // TODO - Automatically pick a role? Send all?
      }
      return smokeBroadcast.send({
        extensions: [],
        operations: [[operation.operation, Object.assign(
          {},
          options,
          options.json_metadata != null ? {
            json_metadata: toString(options.json_metadata),
          } : {},
          useCommentPermlink && options.permlink == null ? {
            permlink: formatter.commentPermlink(options.parent_author, options.parent_permlink),
          } : {}
        )]],
      }, keys, callback);
    };

  smokeBroadcast[operationName] =
    function smokeBroadcast$specializedSend(wif, ...args) {
      debug(`Parsing operation "${operationName}" with`, {args});
      const options = operationParams.reduce((memo, param, i) => {
        memo[param] = args[i]; // eslint-disable-line no-param-reassign
        return memo;
      }, {});
      const callback = args[operationParams.length];
      return smokeBroadcast[`${operationName}With`](wif, options, callback);
    };
});

const toString = obj => typeof obj === 'object' ? JSON.stringify(obj) : obj;
broadcastHelpers(smokeBroadcast);

Promise.promisifyAll(smokeBroadcast);

exports = module.exports = smokeBroadcast;
