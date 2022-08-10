

function listingMain(location, params)
{

    //$('#placement_html_101195').append("<div class='shareChart'></div>");
    $(document).ready(function(){

        var itemid = location.pathname.substring(5);
        console.log(itemid);

        // 获取国家显示到seller名字下面
        //$('.ux-seller-section__item--seller a').attr("href")
        //$('.mem_loc').text()
        // 获取国家信息
        var $sellerContainer = $(".x-about-this-seller .ux-seller-section__content:first");
        var ebaySite = getEbaySiteString(location.host);
        if (ebaySite == "EBAY-US")
        {
            var urlSeller = $('.ux-seller-section__item--seller a').attr("href");
            console.log(urlSeller);
            SellerInfoMountToByUrl(urlSeller, sellerContainer);
        } else if (ebaySite == "EBAY-UK") { 
            var country = $(".d-business-seller .ux-section--nameAndAddress .ux-section__item:last").text();
            $sellerContainer.append('<font color="#FF0000">'+country+'</font>');

            // 价格换算
            if (country == "China")
            {
                var $price = $("#prcIsum");
                var priceWithVat = $price.html().replace("£","");
                var priceWithVat1 = parseFloat(priceWithVat);
                var priceWithoutVat = priceWithVat1 * 100 * 5/6 /100;
                $price.after("<div id='prcIsum-withoutvat'>(实收: <font color='#FF0000'>£ "+priceWithoutVat.toFixed(2)+"</font>)</div>");

            }
        }


        // SOLD 销售曲线
        //var url = $('.vi-qtyS-hot-red a').attr('href');
        purchaseTrendsMountToByItemId(ebaySite, itemid, $("#CenterPanel"), itemid);


        $(".card").append("<button class='chartViewBtn'>显示</button>");
        $(document).on('click','.chartViewBtn',function(e){
            var ahref = $(e.target).prev().children("a").attr("href");
            $(".card").css("border-color","white");
            $(e.target).closest(".card").css("border","2px solid red");
            console.log(ahref);

            $(".shareChart").remove();
            var start = ahref.indexOf('itm/');
            if (start > 0)
            {
                var relatedItemId = ahref.substring(start+4, start+4+12);
                if (relatedItemId == itemid) //关联板块
                {
                    $(e.target).text("本链接↑");
                }
                else
                {
                    var $container_wrapper = $(e.target).closest(".container_wrapper");
                    var $placement = $container_wrapper.parent().parent();
                    var $mountDiv = $("<div class='shareChart'></div>");
                    $placement.find(".merch-main-header").after($mountDiv);
                    purchaseTrendsMountToByItemId(ebaySite, relatedItemId, $mountDiv);
                    
                }
            }
        });




        //选择一个需要观察的节点
        //var targetNode = $('.merch-tile-container');

        // 设置observer的配置选项
        var config = { childList: true,
                        attributes:true, // 将旧数据传递给回调函数};
                        //subtree:true
                        attributeOldValue: true
                        };


        // 当节点发生变化时的需要执行的函数
        var callback = function(mutationsList, observer) {
            console.log("callback被调用");
            for(var mutation of mutationsList) {
                console.log(mutation);
                if (mutation.type == 'childList' &&
                    mutation.addedNodes &&
                    mutation.addedNodes.length > 0)
                {
                    console.log("增加节点");
                    $(mutation.target).find(".card").append("<button class='chartViewBtn'>显示</button>");
                    observer.takeRecords();
                    break;
                }
            }
        };

       
        // 创建一个observer示例与回调函数相关联
        var placements = {placement_html_101195: "Similar sponsored items",
                            placement_html_101196: "Sponsored items from this seller",

                            placement_html_101112:  "Sponsored items based on your recent views",
                            placement_html_101110:  "Explore more sponsored options: Custom Bundle",
                            placement_html_101111:  "Related sponsored items",

                            placement_html_101113:  "People who viewed this item also viewed",
                            placement_html_101506:  "Find more sponsored items"};

        Object.keys(placements).forEach(function(key){
            var tagName = document.querySelector("#"+key);
            //$.each(itemTiles, function(index, item){
            var observer = new MutationObserver(callback);
            //使用配置文件对目标节点进行观测
            observer.observe(tagName, config);
        });

        var config_price = { childList: true,
            attributes:true, // 将旧数据传递给回调函数};
            CharacterData: true,
            //subtree:true
            attributeOldValue: true
            };


         // 当节点发生变化时的需要执行的函数
         var callback_price = function(mutationsList, observer) {
            console.log("callback被调用");
            for(var mutation of mutationsList) {
                console.log(mutation);
                if (mutation.type == 'attributes' &&
                    mutation.attributeName == 'content')
                {
                    console.log("修改价格");
                    var $price = $("#prcIsum");
                    var priceWithVat = $price.html().replace("£","");
                    var priceWithVat1 = parseFloat(priceWithVat);
                    var priceWithoutVat = priceWithVat1 * 100 * 5/6 /100;
                    
                   // $price.after("<div id='#prcIsum-withoutvat'>(实收: <font color='#FF0000'>£ "+priceWithoutVat.toFixed(2)+"</font>)</div>");
                   $("#prcIsum-withoutvat").empty();
                   $("#prcIsum-withoutvat").append("(实收: <font color='#FF0000'>£ "+priceWithoutVat.toFixed(2)+"</font>)");
                   observer.takeRecords();
                   break;
                }
            }
        };

        var tagNamePrice = document.querySelector("#prcIsum");
        var observer = new MutationObserver(callback_price);
        //使用配置文件对目标节点进行观测
        observer.observe(tagNamePrice, config_price);



        // 监测动态添加的元素的属性变化
        var tagNames = $(".card");

        // 当节点发生变化时的需要执行的函数
        var callback1 = function(mutationsList, observer) {
            //console.log("callback111被调用");
            for(var mutation of mutationsList) {
                //console.log(mutation);
                if (mutation.type == 'childList' &&
                    mutation.removedNodes &&
                    mutation.removedNodes.length > 0)
                {
                    //console.log("被删除，重新添加11111111");
                    if($(mutation.target).find(".chartViewBtn").length == 0)
                    {
                        $(mutation.target).append("<button class='chartViewBtn'>显示</button>");
                    }
                }
                if (mutation.type == 'attributes' &&
                    mutation.attributeName == 'aria-hidden' &&
                    mutation.oldValue == 'true')
                {
                    //console.log(".card节点属性aria-hidden变化");
                    if($(mutation.target).find(".chartViewBtn").length == 0)
                    {
                        $(mutation.target).append("<button class='chartViewBtn'>显示</button>");
                    }

                    //observer.takeRecords();
                    //break;
                }
            }
        };

        $.each(tagNames, function(index, item){
            var observer = new MutationObserver(callback1);
            //使用配置文件对目标节点进行观测
            observer.observe(item, config);
        });







});











} 
