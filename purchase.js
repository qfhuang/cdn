function purchaseMain(location, params)
{
    var itemid = params.item;
    //console.log(itemid);
    purchaseTrendsMountTo($(document), $(".app-item-card"), itemid);
}
