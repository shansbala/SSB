/** This file is part of a bigger project that was being worked on by Shan S. Bala. It demonstrates the fundamental
use of API calls to an external service that returns JSON objects (KVP) and stores them in a tabular manner that can
then be used for relational data queries.

One can console.log the results or alternatively call fetchOptions() as a function in order to get, transform 
(from epoch time to human readable time) and store the data locally (WebSql local storage). You must also customize
local ports, database name and other optional parameters.

NOTE: I do not explicitly define the primary key here and I am aware there are probably more efficient / alternative 
ways to write code to achieve what this code ultimately does.
**/

import * as openDatabase from 'websql/lib/browser'
import axios from 'axios'

let db = openDatabase('SHANBALA', 1, 'description', 1)
let ticker = 'SPY'
let optionsurl = 'http://localhost:8889/https://query2.finance.yahoo.com/v7/finance/options/' + ticker + '?corsDomain=finance.yahoo.com'

export const fetchOptions = () => {
  axios.get(optionsurl).then((response) => {
    db.transaction(function (tx) {
      tx.executeSql('DROP TABLE' + ticker + '_CALLS')
      tx.executeSql('DROP TABLE' + ticker + '_PUTS')
      tx.executeSql('DROP TABLE' + ticker + '_STRIKES')
      tx.executeSql('DROP TABLE' + ticker + '_EXPIRYDATES')
    })

    let expiryDates = response.data.optionChain.result['0']['expirationDates']

    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + ticker + '_EXPIRYDATES (expiration)')
    })

    Object.values(expiryDates).forEach((date) => {
      let modURL = 'http://localhost:8889/https://query2.finance.yahoo.com/v7/finance/options/' + ticker + '?date=' + date
      let modDate = new Date(date * 1000).getMonth() + 1 + '/' + new Date(date * 1000).getDate() + '/' + new Date(date * 1000).getFullYear()
      axios.get(modURL).then((response) => {
        let calls = response.data.optionChain.result['0']['options']['0']['calls']
        let puts = response.data.optionChain.result['0']['options']['0']['puts']
        let strikes = response.data.optionChain.result['0']['strikes']

        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS ' + ticker + '_STRIKES (strike, expirationDate)')
          tx.executeSql('INSERT INTO ' + ticker + '_EXPIRYDATES (expiration) VALUES (?)', [(modDate)])
        })

        Object.values(strikes).forEach((strike) => {
          db.transaction(function (tx) {
            tx.executeSql('INSERT INTO ' + ticker + '_STRIKES (strike, expirationDate) VALUES (?, ?)', [(strike), (modDate)])
          })
        })

        for (var x = 0; x < Object.keys(calls).length; ++x) {
          let ctype = 'call'
          let ccontractSymbol = calls[x].contractSymbol
          let cstrike = parseFloat(calls[x].strike)
          let ccurrency = calls[x].currency
          let clastPrice = parseFloat(calls[x].lastPrice)
          let cchange = parseFloat(calls[x].change)
          let cpercentChange = parseFloat(calls[x].percentChange)
          let cvolume = parseFloat(calls[x].volume)
          let copenInterest = parseFloat(calls[x].openInterest)
          let cbid = parseFloat(calls[x].bid)
          let cask = parseFloat(calls[x].ask)
          let ccontractSize = calls[x].contractSize
          let cexpiration = new Date(calls[x].expiration * 1000).getMonth() + 1 + '/' + new Date(calls[x].expiration * 1000).getDate() + '/' + new Date(calls[x].expiration * 1000).getFullYear()
          let clastTradeDate = new Date(calls[x].lastTradeDate * 1000).getMonth() + 1 + '/' + new Date(calls[x].lastTradeDate * 1000).getDate() + '/' + new Date(calls[x].lastTradeDate * 1000).getFullYear()
          let cimpliedVolatility = parseFloat(calls[x].impliedVolatility)
          let cinTheMoney = calls[x].inTheMoney

          db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + ticker + '_CALLS (ctype, ccontractSymbol, cstrike, ccurrency, clastPrice, cchange, cpercentChange, cvolume, copenInterest, cbid, cask, ccontractSize, cexpiration, clastTradeDate, cimpliedVolatility, cinTheMoney)')
            tx.executeSql('INSERT INTO ' + ticker + '_CALLS (ctype, ccontractSymbol, cstrike, ccurrency, clastPrice, cchange, cpercentChange, cvolume, copenInterest, cbid, cask, ccontractSize, cexpiration, clastTradeDate, cimpliedVolatility, cinTheMoney) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [(ctype), (ccontractSymbol), (cstrike), (ccurrency), (clastPrice), (cchange), (cpercentChange), (cvolume), (copenInterest), (cbid), (cask), (ccontractSize), (cexpiration), (clastTradeDate), (cimpliedVolatility), (cinTheMoney)])
          })
        }
        for (var y = 0; y < Object.keys(puts).length; ++y) {
          let ptype = 'put'
          let pcontractSymbol = puts[y].contractSymbol
          let pstrike = parseFloat(puts[y].strike)
          let pcurrency = puts[y].currency
          let plastPrice = parseFloat(puts[y].lastPrice)
          let pchange = parseFloat(puts[y].change)
          let ppercentChange = parseFloat(puts[y].percentChange)
          let pvolume = parseFloat(puts[y].volume)
          let popenInterest = parseFloat(puts[y].openInterest)
          let pbid = parseFloat(puts[y].bid)
          let pask = parseFloat(puts[y].ask)
          let pcontractSize = puts[y].contractSize
          let pexpiration = new Date(puts[y].expiration * 1000).getMonth() + 1 + '/' + new Date(puts[y].expiration * 1000).getDate() + '/' + new Date(puts[y].expiration * 1000).getFullYear()
          let plastTradeDate = new Date(puts[y].lastTradeDate * 1000).getMonth() + 1 + '/' + new Date(puts[y].lastTradeDate * 1000).getDate() + '/' + new Date(puts[y].lastTradeDate * 1000).getFullYear()
          let pimpliedVolatility = parseFloat(puts[y].impliedVolatility)
          let pinTheMoney = puts[y].inTheMoney

          db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + ticker + '_PUTS (ptype, pcontractSymbol, contractSymbol, pstrike, pcurrency, plastPrice, pchange, ppercentChange, pvolume, popenInterest, pbid, pask, pcontractSize, pexpiration, plastTradeDate, pimpliedVolatility, pinTheMoney)')
            tx.executeSql('INSERT INTO ' + ticker + '_PUTS (ptype, pcontractSymbol, contractSymbol, pstrike, pcurrency, plastPrice, pchange, ppercentChange, pvolume, popenInterest, pbid, pask, pcontractSize, pexpiration, plastTradeDate, pimpliedVolatility, pinTheMoney) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [(ptype), (pcontractSymbol), (pstrike), (pcurrency), (plastPrice), (pchange), (ppercentChange), (pvolume), (popenInterest), (pbid), (pask), (pcontractSize), (pexpiration), (plastTradeDate), (pimpliedVolatility), (pinTheMoney)])
          })
        }
      })
    })
  })
}
