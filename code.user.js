// ==UserScript==
// @name         eBayTrends
// @namespace    http://tampermonkey.net/
// @version      20230403
// @downloadURL  https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/code.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/code.user.js
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
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/jquery-3.5.1.min.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/highcharts.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/1.0.11/jsrender.min.js
//
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/lib.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/purchase.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/listing.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/terapeak.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/geo.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@20230403/main.js
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
