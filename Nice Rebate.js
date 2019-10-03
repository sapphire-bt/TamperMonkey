// ==UserScript==
// @name         Nice Rebate
// @version      2019-10-03
// @include      https://www.nicerebate.com/home/view_product/*
// @include      https://www.nicerebate.com/home/orderList*
// @grant        none
// ==/UserScript==

if (typeof jQuery === "function") {
    $(function() {
        $("[onclick^='openhref']").each(function() {
            const
                onclickStr  = $(this).attr("onclick"),
                amazonUrl   = "https://www." + onclickStr.substring(onclickStr.indexOf("amazon"), onclickStr.indexOf("?m=")),
                buttonClass = document.location.href.indexOf("/view_product/") > -1 ? "btn btn-default btn-lg btn-block" : "btn btn-sm btn-info",
                newButton   = $("<a>", {
                    class  : buttonClass,
                    href   : amazonUrl,
                    target : "_blank"
                }).text($(this).text());

            $(this).parent().html(newButton);
        })
    })
}