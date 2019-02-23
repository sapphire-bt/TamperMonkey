// ==UserScript==
// @name         BBC Weather Fix
// @version      2019-02-23
// @description  Restores old behaviour on BBC weather pages (forecast text description tooltip/title attribute).
// @match        *www.bbc.co.uk/weather*
// @grant        none
// ==/UserScript==

(function() {

	// Wrapper containing all forecasts.
	const forecastWrapper = document.querySelectorAll(".wr-time-slot-list__time-slots")[0];

	// Mutation observer for switching between days.
	const observer = new MutationObserver(function(mutations) {
		setWeatherText();
	})

	// Set observer options.
	observer.observe(forecastWrapper, {
		attributes    : true,
		childList     : true,
		characterData : true
	})

	// Function to restore old behaviour of showing forecast description as title attribute.
	function setWeatherText() {

		// The elements containing an hourly segment of the forecast.
		let weatherText = document.querySelectorAll(".wr-time-slot-secondary__weather-type-text");

		// Iterate through each and find the description.
		for (let i = 0; i < weatherText.length; i++) {
			let el   = weatherText[i];
			let text = el.innerText.trim();

			// Traverse upwards to find the wrapper <li> element.
			while (el.parentElement && el.tagName !== "LI") {
				el = el.parentElement;
			}

			// Set the title attribute.
			el.title = text;
		}
	}

	// Run function on page load.
	setWeatherText();
})();