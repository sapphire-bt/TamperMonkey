// ==UserScript==
// @name         Three.js documentation link fixer
// @version      2020-07-05
// @description  Allows opening links in new tabs by giving <a> elements actual href attributes rather than shitty onclick functions
// @include      https://threejs.org/docs/*
// @grant        none
// ==/UserScript==

;(function fixLinks() {
	const fakeLinks = document.querySelectorAll(`a[onclick^="window.parent.setUrlFragment"]`);

	if (fakeLinks.length > 0) {
		if (typeof window.list !== "undefined") {
			const baseUrl = "https://threejs.org/docs/#";
			const pageProperties = getPageProperties();

			for (const link of fakeLinks) {
				const onclickAttr = link.getAttribute("onclick");

				const pageName = onclickAttr.substring(onclickAttr.indexOf("'") + 1, onclickAttr.lastIndexOf("'"));

				const splitPageName = decomposePageName(pageName, ".", ".");

				const fragment = pageProperties[splitPageName[0]];

				if (fragment) {
					const url = baseUrl + fragment + splitPageName[1];

					link.removeAttribute("onclick");
					link.href = url;
				}
			}
		} else {
			setTimeout(fixLinks, 100);
		}
	}

	// Reconstructed/reduced from docs page
	function getPageProperties() {
		const pageProperties = {};
		const localList = list["en"];

		for (const section in localList) {
			const categories = localList[section];

			for (const category in categories) {
				const pages = categories[category];

				for (const pageName in pages) {
					const pageURL = pages[pageName];
					pageProperties[pageName] = pageURL;
				}
			}
		}

		return pageProperties
	}

	// Copied from docs page
	function decomposePageName( pageName, oldDelimiter, newDelimiter ) {
		// Helper function for separating the member (if existing) from the pageName
		// For example: 'Geometry.morphTarget' can be converted to
		// ['Geometry', '.morphTarget'] or ['Geometry', '#morphTarget']
		// Note: According RFC 3986 no '#' allowed inside of an URL fragment!

		var parts = [];

		var dotIndex = pageName.indexOf( oldDelimiter );

		if ( dotIndex !== - 1 ) {

			parts = pageName.split( oldDelimiter );
			parts[ 1 ] = newDelimiter + parts[ 1 ];

		} else {

			parts[ 0 ] = pageName;
			parts[ 1 ] = '';

		}

		return parts;

	}
})();