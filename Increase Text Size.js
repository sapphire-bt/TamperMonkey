// ==UserScript==
// @name         Increase Text Size
// @version      2019-04-20
// @description  Increase the font size of specified elements on Wikipedia.
// @include      *wikipedia.org*
// @grant        none
// ==/UserScript==

(function() {
    const elements = [
        ".mw-parser-output .script-hebrew",
        ".mw-parser-output .script-Hebr",
        ".mw-parser-output .script-arabic",
        ".mw-parser-output .script-Arab",
        `[lang="he"]`,
        `[lang="ar"]`,
        `[lang="arz"]`,
        `[lang="bs-Arab"]`,
        `[lang="fa"]`,
        `[lang="hi"]`,
        `[lang="ps"]`,
        `[lang="ur"]`,
        `[lang="uz-Arab"]`
    ];

    const targetEls = document.querySelectorAll(elements.join(","));
    const newSize   = 40;

    for (let i = 0; i < targetEls.length; i++) {
        const textEl   = targetEls[i];
        const fontSize = parseFloat(window.getComputedStyle(textEl, null).getPropertyValue("font-size"));

        if (fontSize < newSize) {
            const currentStyle = textEl.getAttribute("style");
            const inlineStyle  = `font-size: ${newSize}px !important;`;

            if (currentStyle === null) {
                textEl.setAttribute("style", inlineStyle);
            } else {
                textEl.setAttribute("style", `${currentStyle}; ${inlineStyle}`);
            }
        }
    }
})();
