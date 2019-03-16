// ==UserScript==
// @name         Increase Text Size
// @version      2019-03-09
// @description  Increase the font size of Arabic/Hebrew text on Wikipedia articles.
// @include      *wikipedia.org*
// @grant        none
// ==/UserScript==

(function() {
	const elements = [
		".mw-parser-output .script-hebrew",
		".mw-parser-output .script-Hebr",
		`span[lang="he"]`,
		`span[lang="ar"]`
	];

	const targetEls = document.querySelectorAll(elements.join(","));
	const newSize   = 30;

	for (let i = 0; i < targetEls.length; i++) {
		let textEl   = targetEls[i];
		let fontSize = parseFloat(window.getComputedStyle(textEl, null).getPropertyValue("font-size"));

		if (fontSize < newSize) {
			let currentStyle = textEl.getAttribute("style");
			let inlineStyle  = `font-size: ${newSize}px !important;`;

			if (currentStyle === null) {
				textEl.setAttribute("style", inlineStyle);
			} else {
				textEl.setAttribute("style", `${currentStyle}; ${inlineStyle}`);
			}
		}
	}
})();