// ==UserScript==
// @name         eBayTrends发布版
// @namespace    http://tampermonkey.net/
// @version      1.6.4
// @downloadURL  https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.5/code.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.5/code.user.js
// @description  try to take over the world!
// @author       You
// @match        https://www.ebay.co.uk/itm/*
// @match        https://www.ebay.co.uk/bin/purchaseHistory?item=*
// @match        https://www.ebay.com/itm/*
// @match        https://www.ebay.com/bin/purchaseHistory?item=*
// @match        https://www.ebay.com/sh/research*
// @match        https://www.ebay.co.uk/sh/research*
// @match        https://www.geo-ship.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ebay.co.uk
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://code.highcharts.com/highcharts.js
// @require      https://cdn.bootcdn.net/ajax/libs/jsrender/1.0.11/jsrender.min.js
//
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/lib.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/purchase.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/listing.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/terapeak.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/geo.js
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.6.4/main.js
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