// ==UserScript==
// @name         Steam YouTube URLs
// @version      2020-10-13
// @include      https://steamcommunity.com*
// @grant        none
// ==/UserScript==

(function() {
	// YouTube
	for (const linkBox of document.querySelectorAll(`[onclick^='DynamicLink_PlayYouTubeVideoInline']`)) {
		const attr = linkBox.getAttribute("onclick");
		const id   = attr.substring(attr.indexOf('"') + 1, attr.lastIndexOf('"'));
		const url  = "https://www.youtube.com/watch?v=" + id;

		const fakeLink = linkBox.querySelector(".dynamiclink_name");

		const link = document.createElement("a");

		link.target = "_blank";
		link.href   = url;

		link.innerHTML = fakeLink.outerHTML;

		fakeLink.remove();

		linkBox.querySelector(".dynamiclink_content").prepend(link);
	}

	// Normal links
	for (const link of document.querySelectorAll(`[href*="steamcommunity.com/linkfilter"]`)) {
		const url    = new URL(link.href);
		const actual = url.searchParams.get("url");

		if (actual) link.href = actual;
	}
})();