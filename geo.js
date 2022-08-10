

function hookGEOSHIP()
{
    console.log("hookGEOSHIP\n");

    if($(".chartViewBtn").length == 0)
    {
        $(".app-card-controls").append("<button class='chartViewBtn'>显示</button>");
        $(document).on("click", ".chartViewBtn", function(e){
            var href = $(e.target).closest('.app-card').find(".title-link[gaevent='title-click']").attr("href");
            console.log(href);
            
            var start = href.indexOf('itm/');
            if (start > 0)
            {
                var itemid = href.substring(start+4, start+4+12);
                console.log(itemid);
                if($("#a"+itemid+"-chart").length == 0) //如果没有节点
                {
                    
                    var $chart = $("<div id='a" + itemid + "-chart'></div>");
                    $(e.target).closest('.ng-star-inserted').append($chart);
                    var ebaySite = getEbaySiteString(href);
                    console.log(ebaySite, itemid);
                    
                    purchaseTrendsMountToByItemIdCROS(ebaySite, itemid, $chart)
                }
                else
                {
                    $("#a"+itemid+"-chart").toggle(); //折叠
                }



            }

        });
    }


}


function geoMain(location, params)
{
    $(document).ready(function(){
        setTimeout(hookGEOSHIP, 5000);
        //选择一个需要观察的节点
        var targetNode = document.querySelector(".search-results");

        // 设置observer的配置选项
        var config = { childList: true};

        // 当节点发生变化时的需要执行的函数
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    if (mutation.addedNodes.length > 0)
                    {
                        hookGEOSHIP();
                        observer.takeRecords();
                        break;
                    }
                }
            }
        };

        // 创建一个observer示例与回调函数相关联
        var observer = new MutationObserver(callback);

        //$.each(targetNodes, function(index, targetNode){
            //使用配置文件对目标节点进行观测
            observer.observe(targetNode, config);
        //});


        // 停止观测
        //observer.disconnect();

    });
}
        
