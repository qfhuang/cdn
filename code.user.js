// ==UserScript==
// @name         eBayTrends
// @namespace    http://tampermonkey.net/
// @version      20230514
// @downloadURL  https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/code.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/code.user.js
// @description  try to take over the world!
// @author       You    
// @match        https://www.ebay.co.uk/itm/*
// @match        https://www.ebay.co.uk/bin/purchaseHistory?item=*
// @match        https://www.ebay.co.uk/sh/research*
// @match        https://www.ebay.com/itm/*
// @match        https://www.ebay.com/bin/purchaseHistory?item=*
// @match        https://www.ebay.com/sh/research*
// @match        https://www.ebay.de/itm/*
// @match        https://www.ebay.de/bin/purchaseHistory?item=*
// @match        https://www.ebay.de/sh/research*
// @match        https://www.geo-ship.com/*
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/jquery-3.5.1.min.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/highcharts.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/1.0.11/jsrender.min.js
//
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/lib.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/purchase.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/listing.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/terapeak.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/geo.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230514/main.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @connect      *
// ==/UserScript==



(function() {
    'use strict';
    console.log("user script");

    // 主程序
    //const dataTableCSS = GM_getResourceText("dataTableCSS");
    //GM_addStyle(dataTableCSS);


    //const log4jsCSS = GM_getResourceText("log4jsCSS");
    //GM_addStyle(log4jsCSS);

        Main();


})();
