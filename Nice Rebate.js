// ==UserScript==
// @name         Nice Rebate
// @version      2019-10-05
// @include      https://www.nicerebate.com/home/view_product/*
// @include      https://www.nicerebate.com/home/orderList*
// @grant        none
// ==/UserScript==

if (typeof jQuery === "function") {
    $(function() {
        $("[onclick^='openhref']").each(function() {
            const
                onclickStr = $(this).attr("onclick"),
                newButton  = $("<a>", {
                    class  : this.className,
                    target : "_blank"
                }).text($(this).text());

            let amazonUrl;

            if (
                   onclickStr.toLowerCase().indexOf("review")   > -1
                || onclickStr.toLowerCase().indexOf("feedback") > -1
            ) {
                amazonUrl = onclickStr.split("'")[3];
            } else {
                amazonUrl = onclickStr.substring(onclickStr.indexOf("amazon"), onclickStr.indexOf("?m="));
            }

            newButton.attr("href", "https://www." + amazonUrl);

            $(this).parent().html(newButton);
        })
    })
}
