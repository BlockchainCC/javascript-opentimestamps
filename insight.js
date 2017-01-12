'use strict';
/**
 * Insight module.
 * @module Insight
 * @author EternityWall
 * @license LPGL3
 */

const requestPromise = require('request-promise');
const Promise = require('promise');

/** Class representing Remote Calendar server interface */
class Insight {

  /**
   * Create a RemoteCalendar.
   */
  constructor(url) {
    this.urlBlockindex = url + '/block-index';
    this.urlBlock = url + '/block';

    // this.urlBlockindex = 'https://search.bitaccess.co/insight-api/block-index';
    // this.urlBlock = 'https://search.bitaccess.co/insight-api/block';
    // this.urlBlock = "https://insight.bitpay.com/api/block-index/447669";
  }

  /**
   * This callback is called when the result is loaded.
   *
   * @callback resolve
   * @param {Timestamp} timestamp - The timestamp of the Calendar response.
   */

  /**
   * This callback is called when the result fails to load.
   *
   * @callback reject
   * @param {Error} error - The error that occurred while loading the result.
   */

  /**
   * Retrieve the block hash from the block height.
   * @param {string} height - Height of the block.
   * @returns {Promise} A promise that returns {@link resolve} if resolved
   * and {@link reject} if rejected.
   */
  blockindex(height) {
    const options = {
      url: this.urlBlockindex + '/' + height,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'javascript-opentimestamps',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    return new Promise((resolve, reject) => {
      requestPromise(options)
          .then(body => {
            console.log('body ', body);
            if (body.size === 0) {
              console.log('Insight response error body ');
              reject();
              return;
            }

            resolve(body.blockHash);
          })
          .catch(err => {
            console.log('Insight response error: ' + err);
            reject();
          });
    });
  }

  /**
   * Retrieve the block information from the block hash.
   * @param {string} height - Height of the block.
   * @returns {Promise} A promise that returns {@link resolve} if resolved
   * and {@link reject} if rejected.
   */
  block(hash) {
    const options = {
      url: this.urlBlock + '/' + hash,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'javascript-opentimestamps',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    return new Promise((resolve, reject) => {
      requestPromise(options)
          .then(body => {
            console.log('body ', body);
            if (body.size === 0) {
              console.log('Insight response error body ');
              reject();
              return;
            }
            resolve(body.merkleroot);
          })
          .catch(err => {
            console.log('Insight response error: ' + err);
            reject();
          });
    });
  }

}

module.exports = {
  Insight
};