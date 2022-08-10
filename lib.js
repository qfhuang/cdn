   
    //===========================================================================================库函数 开始=============================================================================== //
    String.prototype.endWith=function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substring(this.length-s.length)==s)
            return true;
        else
            return false;
        return true;
    }

    String.prototype.startWith=function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substr(0,s.length)==s)
            return true;
        else
            return false;
        return true;
    }

    // 解析 url 参数
    $.parseParams = function(query) {
        var re = /([^&=]+)=?([^&]*)/g,
            decodeRE = /\+/g,
            decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };
        let params = {}, e;

        while ( e = re.exec(query) ) params[ decode(e[1]) ] = decode( e[2] );
        return params;
    }

    //JavaScript取得216种WEB安全色值
    function getColorTable(){
        var colorTable = ['maroon','purple','olive','navy','blue','teal','orange','blueviolet','brown','burlywood','cadetblue','coral','cornflowerblue','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];
        return colorTable;
    }

    function $tableToArray($table, titleArray)
    {
        var arr = [];
        $table.children().each(function(){
            var obj = {};
            $(this).children().each(function(index, value){
                obj[titleArray[index]] = $(value).text();
            });
            arr.push(obj);
        });
        return arr;
    };

    function clearData(array)
    {
        $.each(array, function(index, item){
            //console.log(item);
            var t = Date.parse(item.date.substring(0, 11));
            var local = new Date(t);
            item.date = Date.UTC(local.getFullYear(), local.getMonth(), local.getDate()); // 创建为UTC时间戳
            item.price = item.price.match(/\d+(.\d+)?/g) * 100;
        });
    }

    function sumOrdersByDate(a)
    {
        var newArr = new Array();
        var lastItem = {};
        lastItem["date"] = new Date(0);
        lastItem["orders"] = 0;
        lastItem["lowPrice"] = 0;
        $.each(a, function(index, item){
            if (item.date - lastItem["date"] == 0)
            {
                lastItem["orders"] +=1;
                if (item.price != 0)
                {
                    if (item.price < lastItem["lowPrice"] || lastItem["lowPrice"]==0)
                    {
                        lastItem["lowPrice"] = item.price;
                    }
                }
            }
            else
            {
                if(item.price == 0)
                {
                    item.price = lastItem["lowPrice"];
                }

                if(lastItem["lowPrice"] == 0)
                {
                    lastItem["lowPrice"] = item.price;
                }
                var newItem = {};
                newItem.date = item.date;
                newItem.orders = 1;
                newItem.lowPrice = item.price;
                newArr.push(newItem);
                lastItem = newItem;
            }

        });
        //console.log(newArr);
        return newArr;
    }


    function convertPurchaseTable($html)
    {
        var tTable = {};
        tTable.variation = false;

        var body = $html.find(".fixed-price table tbody");
        var col = $html.find(".fixed-price .app-table__header-row").children("th").length;

        var tArray = {};
        if (col == 5)
        {
            tTable.variation = true;
            tArray = $tableToArray(body, ["userid","variation","price","quantity","date"]);
        }
        else if (col == 4)
        {
            tTable.variation = false;
            tArray = $tableToArray(body, ["userid","price","quantity","date"]);
        }
        tTable.table = tArray;
        return tTable;
    }


    // 数据列展示/隐藏的逻辑函数
    function getVisibleMode(series, serieName) {
        var allVisible = true
        var allHidden = true
        for (let i = 0; i < series.length; i++) {
            if (series[i].name === serieName)
                continue
            // &= 按位运算用法：a &= b 等价于 a = a & b (值为 0 / 1)
            allVisible &= series[i].visible
            allHidden &= (!series[i].visible)
        }
        if (allVisible && !allHidden)
            return 'all-visible'
        if (allHidden && !allVisible)
            return 'all-hidden'
        return 'other-cases'
    }

    function emitLegendItemClick1(that)
    {
        //console.log(that);
        var series = that.chart.series;
        //console.log("aaas"+that.name);
        //console.log(series);
        var mode = getVisibleMode(series, that.name);
        var enableDefault = false
        if (!that.visible) {
            enableDefault = true
        } else if (mode === 'all-visible') {
            series.forEach((serie, k) => {
                serie.hide();
            })
            that.show();
        } else if (mode === 'all-hidden') {
            series.forEach((serie, k) => {
                serie.show();
            })
        } else {
            enableDefault = true
        }
        return enableDefault

    }


    function createDefaultChartJson(mainTitle)
    {
        var chart = {
            zoomType: 'xy',
            height: "350px",
            //marginLeft: 100,
            marginRight: 250
        };
        var title = {
            text: mainTitle
        };
        var subtitle = {
            text: ''
        };
        var xAxis = {
            id: 'xAxis',
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e.%b',
                year: '%b'
            },
            title: {
                text: '日期'
            },
            crosshair: true
        };
        var yAxis = [
            {
                id: 'axis1',
                min:0,
                tickInterval:1,
                //tickPixelInterval: ,
                title: {
                    text: '订单数'
                },
                opposite: true,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color:'orange'
                    }
                }
            },
            {
                id: 'axis2',
                min:0,
                tickInterval: 1,
                title: {
                    text: '价格'
                }
            }
        ]
        var tooltip = {
            //headerFormat: '<b>{series.name}</b><br>',
            //pointFormat: '{point.x:%e-%b}: {point.y:.2f}',
            //headerFormat: '<span style="font-size:10px">{point.key}</span><table><tr><td style="color:{series[0].color};padding:0">{series[0].name}: </td>' +
            //  '<td style="padding:0"><b>{point[0].y:.2f}</b></td></tr><tr><td style="color:{series[1].color};padding:0">{series[1].name}: </td><td style="padding:0"><b>{point[1].y:.2f}</b></td></tr>',
            //pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            //  '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
            //footerFormat: '</table>',

            shared: true,
            useHTML: true,
            xDateFormat: '%m-%d',
            //      crosshairs: [{
            //				width: 3,
            //				color: 'green'
            //			}, {
            //				width: 3,
            //				color: 'green'}]
        };
        //数据点选项
        var plotOptions = {
            spline: {
                marker: {
                    symbol: 'circle',
                    radius: 2,
                    enabled: true
                },
                dataLabels: {enabled: true, style: { color: '#D7DEE9' }},
                events : {
                    // 图例点击事件
                    legendItemClick : function (e) {
                        return emitLegendItemClick1(this);


                    }
                }
            },
            column: {
                //stacking: 'percent',//可用的参数值包括 null（不进行堆叠）、"normal"（普通堆叠） 和 "percent"（百分比堆叠）。
                //groupPadding: 0.08,//不同组柱子之间的间隙
                maxPointWidth: 10,//柱状最大宽度
                dataLabels: {enabled: true, style: { color: '#64BCEC' },verticalAlign: 'top'},
                events : {
                    // 图例点击事件
                    legendItemClick : function (e) {
                        return emitLegendItemClick1(this);


                    }
                }

            }
        };

        var legend = {
            layout: 'vertical',
            align: 'right',
            x: 20,
            verticalAlign: 'top',
            y: 0,
            //floating: true
            backgroundColor: '#FCFFC5',
            borderColor: '#C98657',
            borderWidth: 1,
            width: 200,
            itemWidth: 200,
            itemDistance: 200,
            itemStyle: {
                width: 250,
                'word-break': 'break-all'
            },
            // 图例点击后颜色
            itemHiddenStyle : {
                color : 'red'
            },
            // 鼠标放上样式
            itemHoverStyle : {
                color : 'red'
            },
            //symbolPadding : 5, // 图标跟文字的间距
            //symbolPadding: 5 ,// 图标后距
            //symbolRadius: 5, // 图标圆角
            //symbolWidth: 5,// 图标宽度
        };

        var json = {};
        json.chart = chart;
        json.title = title;
        json.subtitle = subtitle;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.legend = legend;
        //json.series = series;
        json.plotOptions = plotOptions;

        return json;

    }

    function uniq1(array) {
        // return [...new Set(array)];  // new Set(array)  =>  数组    [...数组]   Array.from(set)
        return [...new Set(array)];//Set数据结构转换成数组
    }

    function uniq2(array) {
        //Set数据结构转换成数组    ES6数组的新增方法  Array.from()   Array.of()
        return Array.from(new Set(array));
    }

    function sumDataByDateRange(newArr)
    {
        var summary = {};
        var endDate;
        if (newArr.length>1) //日期汇总记录必须大于1条
        {
            endDate = getTodayUTCDate();
            var startDate = newArr[newArr.length-1].date;
            var diffDayMS = endDate-startDate;
            if (diffDayMS>=0)
            {
                var diffDay1 = (diffDayMS/(1000 * 60 * 60 * 24));
                //startDate.setDate(startDate.getDate() - 30);S

                var ordersTotal = newArr.reduce(function(pre, current){
                    if(current.date >= startDate && current.date < endDate) // 小于表示当天不计算
                    {
                        return pre + Number(current.orders);
                    }
                    else
                    {
                        return pre;
                    }
                }, 0);
                var avgOrders = ordersTotal/diffDay1;

                summary.endDate = endDate;
                summary.startDate = startDate;
                summary.diffDaysTotal = diffDay1;
                summary.avgOrders = avgOrders;
                summary.ordersTotal = ordersTotal;
                console.log("[总单量"+ordersTotal+"/"+diffDay1+"天]="+(Math.floor(avgOrders * 100) / 100)+"/天");


                var endDate1 = getTodayUTCDate();
                var startDate1 = endDate1 - (7*24*60*60*1000);
                console.log("startDate:"+startDate1+", endDate:"+endDate1);
                var ordersLast7Days = newArr.reduce(function(pre, current){
                    if(current.date >= startDate1 && current.date < endDate1) // 小于表示当天不计算
                    {
                        return pre + Number(current.orders);
                    }
                    else
                    {
                        return pre;
                    }
                }, 0);

                summary.ordersLast7Days = ordersLast7Days;

                var lastDate = newArr[newArr.length-1].date;
                console.log("lastDate: "+lastDate);
                if (lastDate > startDate1)
                {
                    var diffDays = ((endDate1-lastDate)/(24*60*60*1000));
                    summary.avgOrders7days = ordersLast7Days/diffDays;
                    summary.diffDays = diffDays;
                }
                else
                {
                    summary.avgOrders7days = ordersLast7Days/7;
                    summary.diffDays = 7;
                }
            }



        }

        return summary;
    }


    function getLocalTime(i){
        var d = new Date();
        var len = d.getTime();
        //本地时间与UTC时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到现在的UTC时间，各时区UTC时间相同
        var utcTime = len + offset;
        //得到时区标准时间
        return new Date(utcTime + 3600000 * i);

        //得到UTC时间戳
        //return new Date(utcTime).getTime();
        //得到时区时间戳
        // return new Date(utcTime + 3600000 * i).getTime();

        //   console.log("东八区-北京时间：" + getLocalTime(8)); //东八区-北京时间：Wed May 25 2022 10:10:32 GMT+0800 (中国标准时间)
        //console.log("西八区-太平洋时间（美国和加拿大）：" + getLocalTime(-8)); //西八区-太平洋时间（美国和加拿大）：Tue May 24 2022 18:10:32 GMT+0800 (中国标准时间)
        // i：要得到那个时区的时间就传几，东区为正数，西区为负数
    }


    function getSiteLocalDate()
    {
        var date = new Date();
        if (window.location.href.indexOf("ebay.co.uk")>= 0 ||
                window.location.href.indexOf("EBAY-GB") >=0)
        {
            date =getLocalTime(1);
        }
        else
        {
            date =getLocalTime(-8);
        }
        return date;

    }

    function getTodayUTCDate()
    {
        var d = new Date();
        return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

    }


    function displaySummary(summary, $container)
    {
        var ds="";
          if(window.location.href.indexOf("ebay.com") >= 0 ||
          window.location.href.indexOf("EBAY-US") >=0 )
        {
            ds= new Date().toLocaleString("en-US", {timeZone:"America/Los_Angeles"});
        }
        else if (window.location.href.indexOf("ebay.co.uk")>= 0 ||
                window.location.href.indexOf("EBAY-GB") >=0)
        {
            ds =new Date().toLocaleString("en-GB", {timeZone:"Europe/London",timeZoneName:"short"});
        }
         else
        {
             ds= new Date().toLocaleString("en-US", {timeZone:"America/Los_Angeles"});
        }

        var s = "<span>站点时间："+ds+"</span><span style='float:right;margin-right:220px'><b>["+summary.ordersTotal+"单/"+summary.diffDaysTotal+"天]=<font color='#FF0000'>"+(Math.floor(summary.avgOrders * 100) / 100)+"</font>单/天  |  </b>"+
                          "<b>["+summary.ordersLast7Days+"单/"+summary.diffDays+"天]=<font color='#FF0000'>"+(Math.floor(summary.avgOrders7days * 100) / 100)+"</font>单/天</b></span>";
        $container.append(s);
    }

    function creatChartData($purchaseHtml){
        var chartData ={};
        var jsons = [];
        var tTable = convertPurchaseTable($purchaseHtml);

        var tArray = tTable.table;
        clearData(tArray);

        // 主图表
        var newArr = sumOrdersByDate(tArray);
        // var last30day = newArr.filter(function(item, index){
        //     var today = new Date();
        //     var endDate = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
		// 	var startDate = endDate - (30*24*60*60*1000);
        //     return item.date >= startDate && item.date <= endDate;
        // });


        var summarys = [];
        var summary = sumDataByDateRange(newArr);
        summarys.push(summary);

        var orders = newArr.map((item, index)=>{
            return [index] = [item.date, item.orders]
        })
        var lowPrice = newArr.map((item, index)=>{
            return [index] = [item.date, item.lowPrice/100]
        })

        var series= [];
        var json = createDefaultChartJson('汇总↓');
        if (tTable.variation == false)
        {
            var orderAll = {
                type: 'column',//'spline',
                name: '订单量',
                data: orders,
                color: 'green'
            };

            var lowPriceAll = {
                type: 'spline',
                name: '价格',
                yAxis:1,
                data: lowPrice,
                color: 'red'
            };

            series.push(orderAll);
            series.push(lowPriceAll);
        }

        json.series = series;
        json.yAxis[0].plotLines= [{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
            color: '#000',
            dashStyle: 'Dash', //Dash,Dot,Solid,默认Solid
            width: 0.5,
            value: (Math.floor(summary.ordersLast7Days/7 * 100) / 100),  //y轴显示位置
            zIndex: 5
        },{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
            color: '#000',
            dashStyle: 'Dot', //Dash,Dot,Solid,默认Solid
            width: 0.5,
            value: (Math.floor(summary.avgOrders * 100) / 100),  //y轴显示位置
            zIndex: 5
        }];
        jsons.push(json);

        // 增加变体曲线 //https://www.ebay.co.uk/itm/112203119031
        var colorTable = getColorTable();
        if (tTable.variation == true)
        {
            // 提取变体列 去重
            var varColArray = uniq2(tArray.map(v => {return v.variation}));
            //console.log(varColArray);

            $.each(varColArray, function(i, v){
                //console.log(v);

                var tVarArray = tArray.filter(function(a){ return (a.variation === v) });
                //console.log(tVarArray);

                var newArr1 = sumOrdersByDate(tVarArray);

                var summary1 = sumDataByDateRange(newArr1);
                summarys.push(summary1);


                var orders1 = newArr1.map((item, index)=>{
                    return [index] = [item.date, item.orders]
                })
                var lowPrice1 = newArr1.map((item, index)=>{
                    return [index] = [item.date, item.lowPrice/100]
                })

                // 主图堆叠
                json.series.push({type: 'column', stacking: 'normal', name: "["+v+"]：订单量", data:orders1, color: Highcharts.getOptions().colors[i]});//colorTable[i*2]});
                json.series.push({type: 'spline', name:"["+v+"]：价格", data:lowPrice1,yAxis:1, color: Highcharts.getOptions().colors[i]});
                //json.chart.marginRight = "["+v+"]：订单量".length;

                var series1 = [];
                series1.push({type: 'column', stacking: 'normal', name: "["+v+"]：订单量", data:orders1, color: Highcharts.getOptions().colors[i]});//colorTable[i*2]});
                series1.push({type: 'spline', name:"["+v+"]：价格", data:lowPrice1,yAxis:1, color: Highcharts.getOptions().colors[i]});


                var json1 = createDefaultChartJson('变体：'+v+'↓');
                //json1.chart.marginRight = "["+v+"]：订单量".length;
                json1.series = series1;
                json1.yAxis[0].tickPositioner = function(){
                    //return $('#chart0').highcharts().get('axis1').tickPositions.slice();
                    return Highcharts.charts[0].get('axis1').tickPositions.slice();
                };
                json1.xAxis.tickPositioner = function(){
                    //return $('#chart0').highcharts().get('xAxis').tickPositions.slice();
                    return Highcharts.charts[0].get('xAxis').tickPositions.slice();
                };
                json1.yAxis[0].plotLines= [{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
                    color: '#000',
                    dashStyle: 'Dash', //Dash,Dot,Solid,默认Solid
                    width: 0.5,
                    value: (Math.floor(summary1.ordersLast7Days/7 * 100) / 100),  //y轴显示位置
                    zIndex: 5
                },{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
                    color: '#000',
                    dashStyle: 'Dot', //Dash,Dot,Solid,默认Solid
                    width: 0.5,
                    value: (Math.floor(summary1.avgOrders * 100) / 100),  //y轴显示位置
                    zIndex: 5
                }];
                jsons.push(json1);
            });

        }

        chartData.jsons = jsons;
        chartData.summarys = summarys;


        return chartData;
    }

    // parseHtml 数据源
    // $elmMount 挂载节点
    // chartMainId 命名空间
    function purchaseTrendsMountTo($html, $container, itemid){
        var chartData = creatChartData($html);
        var jsons = chartData.jsons;
        //console.dir(JSON.stringify(jsons[0]));

        var chartHideAllBtn = 'chartHideAll'+itemid;
        var chartShowAllBtn = 'chartShowAll'+itemid;
        var chartAllWrap = 'chartAllWrap'+itemid;

        // 控制按钮栏位 全部显示/隐藏按钮
        $container.append("<button id='"+chartHideAllBtn+"' style='padding:5px 10px;margin: 10px;'>全隐</button>");
        $('#'+chartHideAllBtn).click(function(){
            $('#'+chartAllWrap).children("div").hide();
        });
        $container.append("<button id='"+chartShowAllBtn+"' style='padding:5px 10px;margin: 10px;'>全显</button>");
        $('#'+chartShowAllBtn).click(function(){
            $('#'+chartAllWrap).children("div").show();
        });

        // 控制按钮栏位 变体按钮
        $.each(jsons, function(index, item) {
            //console.dir(JSON.stringify(item));
            var chartToggleBtn = 'chartShowBtn'+itemid+index;
            $container.append("<button id='"+chartToggleBtn + "' style='padding:5px;margin: 10px;'>"+item.title.text+"</button>");
            $('#'+chartToggleBtn).click({chartDivId: '#chart'+itemid+index},function(e){
                $(e.data.chartDivId).toggle();
            });
        });

        // 创建容器，挂载图表
        $container.append("<div id='"+chartAllWrap+"'></div>");
        $.each(jsons, function(index, item) {
            var $chartDiv;
            if (index == 0) //第一个表显示
            {
                $chartDiv = $("<div id='chart" +itemid+ index + "'></div>");
            }
            else // 其他隐藏
            {
                $chartDiv = $("<div id='chart" + itemid + index + "'  style='display:none'></div>");
            }

            $('#'+chartAllWrap).append($chartDiv);
            $chartDiv.highcharts(item);
            displaySummary(chartData.summarys[index], $chartDiv);
        });

    }


    function buildPurchaseHistoryUrl(ebaySite, itemid)
    {
        var url = "";
        if (ebaySite == "EBAY-US")
        {
            url = "https://www.ebay.com/bin/purchaseHistory?item="+itemid;
        }
        else if (ebaySite == "EBAY-UK")
        {
            url = "https://www.ebay.co.uk/bin/purchaseHistory?item="+itemid;
        }
        else
        {
            debugger
        }



        return url;


    }


    function purchaseTrendsMountToByItemId(ebaySite, itemid, $container)
    {
        var url = buildPurchaseHistoryUrl(ebaySite, itemid);

        $.get(url, function(html){
            var $html = $(html);
            purchaseTrendsMountTo($html, $container, itemid);
        });
    }

    function purchaseTrendsMountToByItemIdCROS(ebaySite, itemid, $container)
    {
        var url = buildPurchaseHistoryUrl(ebaySite, itemid);
        
        GM_xmlhttpRequest({
            url: url,
            responseType: "document",
            headers:{'overrideMimeType': 'text/html;'},
            onload: function(res){
                //console.log(res.responseText);
                var $html = $(res.responseText);
                purchaseTrendsMountTo($html, $container,itemid);
            },
        });

    }


    function SellerInfoMountToByUrl(url, $container)
    {
        $.get(url, function(html){
            //console.log($(html).find('.mem_loc').text());
            var info = $(html).find('#member_info').text();
            var sinceAt = info.indexOf('since:');
            $container.append('<font color="#FF0000">'+ info.substring(sinceAt+'since:'.length)+'</font>');
        });
    }


    function getEbaySiteString(url)
    {
        return url.indexOf('ebay.com') >= 0 ? "EBAY-US":"EBAY-UK";
    }
   



    


    //===========================================================================================库函数 结束=============================================================================== //