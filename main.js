
function Main()
{
    var params = $.parseParams(window.location.href.split('?')[1] || '');
    var host = window.location.host;
    var pathname = window.location.pathname;

    if (host.startsWith("www.ebay.")  &&
        pathname.startsWith("/bin/purchaseHistory") )
    {
        purchaseMain(location, params);
    }
    else if (host.startsWith("www.ebay.")  &&
        pathname.startWith("/itm/") )
    {
        console.log("listingMain-START");
        listingMain(location, params);
        console.log("listingMain-END");
    }
    else if (host.startsWith("www.ebay.")  &&
    pathname.startsWith("/sh/research") )
    {
        terapeakMain(location, params);
    }
    else if (host.startsWith("www.geo-ship.com"))
    {

        geoMain(location, params);
    }
    







}
