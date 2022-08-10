
function hookResearchTable()
{
    var param = $.parseParams(window.location.href.split('?')[1] || '');
    console.log(param);
    if (param.tabName === "SOLD")
    {
        //给表格添加操作按钮
        $('th.research-table-header__date-last-sold').after("<th>Control</th>");
        $('.research-table-row').append($("<td><button class='showChart'>显示</button></td>"));
        $('.showChart').click(function(){
            var tr = $(this).closest('tr');
            var itemid = tr.find(".research-table-row__product-info-name span").attr('data-item-id');

            if($("#a"+itemid+"-seller").length == 0) //是否存在节点
            {
            
                tr.after("<tr class='research-table-row'>"+

                        "<td class='research-table-row__item'><div id='a" + itemid + "-seller'><span id='a" + itemid + "-score'></span></div><div id='a" + itemid + "-location'></div><div id='a" + itemid + "-since'></div><div id='a" + itemid + "-feedback'></div><div id='a" + itemid + "-itemofseller'></div></td>"+
                        "<td class='research-table-row__item'></td>"+
                        "<td class='research-table-row__item'><div class='research-table-row__item-with-subtitle'><div id='a" + itemid + "-listingPrice'></div><div id='a" + itemid + "-listingShipping'></div><div id='a" + itemid + "-topRatedSeller'></div></td>"+
                        "<td class='research-table-row__item'><div id='a" + itemid + "-promoted'></div></td>"+
                        "<td class='research-table-row__item'><div id='a" + itemid + "-watchers'></div></td>"+
                        "<td class='research-table-row__item'><div class=''><div id='a" + itemid + "-rest'></div></div></td>"+
                        "<td class='research-table-row__item'></td>"+
                        "<td class='research-table-row__item'><div class='research-table-row__inner-item'><span>上架：</span><span id='a" + itemid + "-startdate'></span></div><div id='a" + itemid + "-listingdays'></div></td>"+
                        "<td class='research-table-row__item'></td>"+
                        "</tr>"); // 创建挂载点 卖家信息

                // 查询卖家信息 https://www.ebay.com/usr/myre_link?_trksid=p2047675.m3561.l2559
                var US = window.location.href.indexOf('ebay.com');
                var listing = "";
                var active_info_url="";
                var endDate = new Date();
                var startDate = new Date();
                startDate.setDate(startDate.getDate()-365);

                if (US > 0)
                {
                    listing = "https://www.ebay.com/itm/"+itemid;
                    active_info_url = "https://www.ebay.com/sh/research/api/search?marketplace=EBAY-US&keywords="+itemid+"&dayRange=365&endDate="+endDate.getTime()+"&startDate="+startDate.getTime()+"&tabName=ACTIVE&tz=Asia%2FShanghai&modules=aggregates&modules=searchResults&modules=resultsHeader";
                }
                else
                {
                    listing = "https://www.ebay.co.uk/itm/"+itemid;
                    active_info_url = "https://www.ebay.co.uk/sh/research/api/search?marketplace=EBAY-UK&keywords="+itemid+"&dayRange=365&endDate="+endDate.getTime()+"&startDate="+startDate.getTime()+"&tabName=ACTIVE&tz=Asia%2FShanghai&modules=aggregates&modules=searchResults&modules=resultsHeader";
                }

                $.ajax({
                    url: active_info_url,
                    type: "GET",
                    success: function(data){
                        //假设返回的json数据里有status及info2个属性
                        //有时候可以直接ajaxobj.status或者ajaxobj["status"]去访问
                        //但有时候，却要通过eval()或者 $.parsejson();才可以通过ajaxobj.status访问，而且这种情况下，需要是complete而不是success
                        json=eval("("+data+")");
                        //或者$.parsejson()
                        //var ajaxobj = $.parsejson(data);

                            console.log(json);
                        return true;
                    },
                    error:function(error)
                    {
                        if(error.responseText!='')
                        {
                            var text = error.responseText;
                            //console.log(error.responseText);
                            var matchStr = `{"__type":"ActiveSearchResultsModule"`;
                            var start = text.indexOf(matchStr);
                            if (start>0)
                            {
                                //var resTxt = text.substring(start);
                                //console.log(resTxt);

                                //var json = $.parseJSON(resTxt);
                            var a = text.split("\n");
                            var foundStr="";
                            for(var i =0; i<a.length; i++)
                            {
                                if (a[i].startWith(matchStr))
                                {
                                    foundStr = a[i];
                                    break;
                                }
                            }

                                var json = $.parseJSON(foundStr);
                                //console.log(json);

                                var data = json.results[0];
                                console.log(data);
                                var startDate = data.startDate.textSpans[0].text;
                                $("#a"+itemid+"-startdate").append(startDate);

                                var end = new Date(tr.find(".research-table-row__dateLastSold").text());
                                var begin = new Date(startDate);
                                console.log(begin);
                                console.log(end);
                                var diffdays = ((end.getTime()-begin.getTime())/(24*60*60*1000))+1;
                                $("#a"+itemid+"-listingdays").append("("+diffdays+"天)");

                                var listingPrice = data.listingPrice.listingPrice.textSpans[0].text;
                                var listingShipping = data.listingPrice.listingShipping.textSpans[0].text;

                                var topRatedSeller="";
                                if (data.listingPrice.topRatedSeller)
                                {
                                    topRatedSeller =data.listingPrice.topRatedSeller.textSpans[0].text;
                                }

                                var promoted="";
                                if(data.promoted.icon)
                                {
                                    promoted=data.promoted.icon.name === "tick"?"√":"-";
                                }
                                else
                                {
                                    promoted=data.promoted.text.textSpans[0].text;
                                }
                                var watchers=data.watchers.textSpans[0].text;

                                $("#a"+itemid+"-listingPrice").append(listingPrice);
                                $("#a"+itemid+"-listingShipping").append(listingShipping);
                                $("#a"+itemid+"-topRatedSeller").append(topRatedSeller);
                                $("#a"+itemid+"-promoted").append("promoted: "+promoted);
                                $("#a"+itemid+"-watchers").append("watchers: "+watchers);

                            }

                        }



                    }
                });

                $.get(listing, function(html){
                    //console.log(html);
                    var sellerContent = $(html).find(".ux-seller-section__content");
                    var sellerNameA = $(sellerContent).find(".ux-seller-section__item--seller a");
                    if (sellerNameA.length == 0)
                    {
                        sellerNameA = $(sellerContent).find(".ux-seller-section__item--directFromBrand a");
                    }
                    $("#a"+itemid+"-seller").prepend(sellerNameA.prop("outerHTML")); // 挂载卖家名字
                    //var sellerNameText = sellerNameA.text();
                    var sellerHref = sellerNameA.attr("href");

                    console.log(sellerHref);
                    $("#a"+itemid+"-score").append("(★"+sellerContent.find('.ux-seller-section__item--seller a').eq(1).text()+")");
                    $("#a"+itemid+"-feedback").append($(html).find('.x-about-this-seller:eq(0) .ux-seller-section__item:eq(1)').text());


                    $.get(sellerHref, function(html){
                        if (US>0)
                        {
                            var info = $(html).find('#member_info').text();
                            var sinceAt = info.indexOf('since:');
                            $("#a"+itemid+"-location").append('<font color="#FF0000">'+ info.substring(sinceAt+'since:'.length)+'</font>');
                            $("#a"+itemid+"-itemofseller").append($(html).find('.soi_lk').parent());
                        }
                        else
                        {
                            var sellerInfo = $(html).find(".str-about-description__seller-info .str-text-span.BOLD");
                            //$("#a"+itemid+"-seller").append(sellerInfo);

                            $("#a"+itemid+"-since").append($(html).find(".str-about-description__seller-info .str-text-span.BOLD").eq(1).text());
                            $("#a"+itemid+"-location").append($(html).find(".str-about-description__seller-info .str-text-span.BOLD").eq(0).text());
                        }
                    });


                });

                if($("#a"+itemid+"-chart").length == 0) // 是否存在节点
                {
                    var url = "";
                    if (window.location.href.indexOf("co.uk") > 0)
                    {
                        url = "https://www.ebay.co.uk/bin/purchaseHistory?item="+itemid;
                    } else {
                        url = "https://www.ebay.com/bin/purchaseHistory?item="+itemid;
                    }
                    $.get(url, function(html){
                        //$('#container').remove();
                        //mountTo(html, $('.carouselWrapper'));
                        $("#a"+itemid+"-seller").closest('tr').after($("<tr class='research-table-row'><td colspan='9'><div id='a" + itemid + "-chart'></div></td></tr>")); // 创建挂载点 图表
                        console.log(itemid);
                        var $html = $(html);
                        purchaseTrendsMountTo($html, $('#a' + itemid+"-chart"),itemid);
                    });
                }
                else
                {
                    $("#a"+itemid+"-chart").closest('tr').toggle();
                }
            }
            else
            {
                $("#a"+itemid+"-seller").closest('tr').toggle();
                if($("#a"+itemid+"-seller").length > 0)
                {
                    $("#a"+itemid+"-chart").closest('tr').toggle();
                }
            } });

    }
    else if (param.tabName === "ACTIVE")
    {
        console.log(param.tabName);
        //给表格添加操作按钮
        $('th.active-listing-table-header__startedDate').after("<th>Control</th>");
        $('.active-listing-row').append($("<td><button class='showChart'>显示</button></td>"));
        $('.showChart').click(function(){
            var tr = $(this).closest('tr');
            var itemid = tr.find(".active-listing-row__item .active-listing-row__link-row-anchor span").attr('data-item-id');

            if($("#a"+itemid+"-seller").length == 0) //是否存在节点
            {
                tr.after($("<tr class='active-listing-row'>"+
                        "<td><div id='a" + itemid + "-seller'></div></td>"+
                        "<td><div id='a" + itemid + "-location'></div></td>"+
                        "<td><div id='a" + itemid + "-since'></div></td>"+
                        "<td><div id='a" + itemid + "-score'></div></td>"+
                        "<td><div id='a" + itemid + "-feedback'></div></td>"+
                        "<td colspan='2'><div id='a" + itemid + "-rest'></div></td>"+
                        "</tr>")); // 创建挂载点 卖家信息
                // 查询卖家信息 https://www.ebay.com/usr/myre_link?_trksid=p2047675.m3561.l2559
                var US = window.location.href.indexOf('ebay.com');
                var listing = "";
                if (US > 0)
                {
                    listing = "https://www.ebay.com/itm/"+itemid;
                }
                else
                {
                    listing = "https://www.ebay.co.uk/itm/"+itemid;
                }

                // 根据itemid获取卖家名字
                $.get(listing, function(html){
                    //console.log(html);
                    var sellerContent = $(html).find(".ux-seller-section__content");
                    var sellerNameA = $(sellerContent).find(".ux-seller-section__item--seller a");
                    if (sellerNameA.length == 0)
                    {
                        sellerNameA = $(sellerContent).find(".ux-seller-section__item--directFromBrand a");
                    }
                    $("#a"+itemid+"-seller").append(sellerNameA.prop("outerHTML")); // 挂载卖家名字
                    //var sellerNameText = sellerNameA.text();
                    var sellerHref = sellerNameA.attr("href");

                    console.log(sellerHref);
                    $("#a"+itemid+"-score").append("("+sellerContent.find('.ux-seller-section__item--seller a').eq(1).text()+"★)");
                    $("#a"+itemid+"-feedback").append($(html).find('.x-about-this-seller:eq(0) .ux-seller-section__item:eq(1)').text());


                    // 获取卖家开店日期和地址 https://www.ebay.co.uk/str/sellerName#tab1
                    $.get(sellerHref, function(html){
                        var sellerInfo = $(html).find(".str-about-description__seller-info .str-text-span.BOLD");
                        //$("#a"+itemid+"-seller").append(sellerInfo);

                        $("#a"+itemid+"-since").append($(html).find(".str-about-description__seller-info .str-text-span.BOLD").eq(1).text());
                        $("#a"+itemid+"-location").append($(html).find(".str-about-description__seller-info .str-text-span.BOLD").eq(0).text());
                    });

                });

                if($("#a"+itemid+"-chart").length == 0) // 是否存在节点
                {
                    var url = "";
                    if (window.location.href.indexOf("co.uk") > 0)
                    {
                        url = "https://www.ebay.co.uk/bin/purchaseHistory?item="+itemid;
                    } else {
                        url = "https://www.ebay.com/bin/purchaseHistory?item="+itemid;
                    }
                    $.get(url, function(html){
                        //$('#container').remove();
                        //mountTo(html, $('.carouselWrapper'));
                        $("#a"+itemid+"-seller").closest('tr').after($("<tr class='active-listing-row'><td colspan='9'><div id='a" + itemid + "-chart'></div></td></tr>")); // 创建挂载点 图表
                        console.log(itemid);
                        var $html = $(html);
                        purchaseTrendsMountTo($html, $('#a' + itemid+"-chart"),itemid);
                    });



                }
                else
                {
                    $("#a"+itemid+"-chart").closest('tr').toggle();
                }
            }
            else
            {
                $("#a"+itemid+"-seller").closest('tr').toggle();
                if($("#a"+itemid+"-seller").length > 0)
                {
                    $("#a"+itemid+"-chart").closest('tr').toggle();
                }
            } });


    }

}


function terapeakMain(location, params)
{


    var start = window.location.href.indexOf('sh/research');
    if (start >0)
    {
        // 在Terapeak页面
        //hookResearchTable();
        //setTimeout(hookResearchTable, 2000);

        //选择一个需要观察的节点
        var targetNode = document.querySelector('.research-container');

        // 设置observer的配置选项
        var config = { childList: true, subtree:true,attributes:true};

        // 当节点发生变化时的需要执行的函数
        var callback = function(mutationsList, observer) {

            for(var mutation of mutationsList) {

                if (mutation.type == 'childList') {
                    //console.log(mutation);
                    if ($(mutation.target).attr("role") == 'tablist' && mutation.addedNodes.length>0)
                    {
                        hookResearchTable(); // 重新调用 foo （准确地说是将 foo 加入任务队列）
                        observer.takeRecords();
                        break;
                    }
                }
                else if (mutation.type == 'attributes')
                {
                    if ($(mutation.target).attr("role") == 'tabpanel' && mutation.attributeName== "hidden")
                    {
                        hookResearchTable();
                        observer.takeRecords();
                        break;
                    }
                }
            }
        };

        // 创建一个observer示例与回调函数相关联
        var observer = new MutationObserver(callback);

        //使用配置文件对目标节点进行观测
        observer.observe(targetNode, config);
    }
}
