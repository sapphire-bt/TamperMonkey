// ==UserScript==
// @name         Auto Trader Paginate Links
// @description  Makes pagination links actually link to the correct page rather than 404ing when opened in a new tab
// @version      2020-10-10
// @include      https://www.autotrader.co.uk*
// @grant        none
// ==/UserScript==

(function grease() {
	if (typeof jQuery === "function") {
		const url = new URL(location.href);

		$(".pagination a").each(function(i, el) {
			const $this = $(this);
			const page  = $this.attr("data-paginate");

			url.searchParams.set("page", page);

			$this.attr("href", url.href);
		})
	} else {
		setTimeout(grease, 100);
	}
})();