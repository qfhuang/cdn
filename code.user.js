// ==UserScript==
// @name         eBayTrends
// @namespace    http://tampermonkey.net/
// @version      0.3.5
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
//
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/lib.js?nocache=fasdfasf77777777fffffffffffffffff77777fffffff
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/purchase.js?nocache=fasdfasf7777777fffffffffff777777fffffffffffffff
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/listing.js?nocache=fasdfasf777777777fffffffffffffff7777fffffffff
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/terapeak.js?nocache=fasdfasf77777fffffffffffff77777777fffffffffffffff
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/geo.js?nocache=fasdfasf777777777fffffffffffff7777fffffffffff
// @require      https://cdn.jsdelivr.net/gh/qfhuang/cdn@1.5/main.js?nocache=fasdfasf77777777fffffffff77777ffffffffff
//
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @connect      *
// ==/UserScript==

// @require      http://192.168.1.88/lib.js?nocache=fasdfasf7777777777777
// @require      http://192.168.1.88/purchase.js?nocache=fasdfasf7777777777777
// @require      http://192.168.1.88/listing.js?nocache=fasdfasf7777777777777aaa
// @require      http://192.168.1.88/terapeak.js?nocache=fasdfasf7777777777777
// @require      http://192.168.1.88/geo.js?nocache=fasdfasf7777777777777
// @require      http://192.168.1.88/main.js?nocache=fasdfasf7777777777777

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