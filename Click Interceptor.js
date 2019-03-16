// ==UserScript==
// @name         Click Interceptor
// @version      2019-03-04
// @author       jingyu9575 (slightly modified)
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
	const desc = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, "href");

	Object.defineProperty(HTMLAnchorElement.prototype, "href", Object.assign({}, desc, {
		set: function(value) {
			if (window.event && window.event.constructor.name === "MouseEvent") {

				const { type } = window.event;

				if (type === "mousedown" || type === "mouseup" || type === "click") {
					console.log(`[${(new Date()).toTimeString().split(" ")[0]}] blocked ${type} event on element:`);
					console.log(window.event.target);
					return;
				}
			}

			return desc.set.call(this, value);
		}
	}))
})();