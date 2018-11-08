// ==UserScript==
// @name         TripAdvisor TRASH
// @version      2018-11-08
// @description  Removes onclick/tracking elements from "things to do" page and turns them into *actual* clickable links.
// @match        https://www.tripadvisor.co.uk/*
// ==/UserScript==

(function() {

	// Add mutation observer to main results wrapper.
	var linkWrapper = document.getElementById("MAIN_PAGE_FRAGMENT");
	var observer    = new MutationObserver(removeTrash);

	observer.observe(linkWrapper, {
		attributes : true,
		childList  : true,
		subtree    : true
	})

	// Run function.
	removeTrash();

	// Main function.
	function removeTrash(mutationsList, observer) {
		// Get all attraction links with onclick attributes.
		var trashLinks = document.querySelectorAll(".attraction_list [onclick]");

		if (trashLinks) {

			console.log("[TripAdvisor TRASH] Removing trash onclick elements.");

			for (var i = 0; i < trashLinks.length; i++) {
				var el = trashLinks[i];

				// Remove quotes from onclick attribute and separate into an array.
				var clickData = el.getAttribute("onclick").replace(/'/g, "").split(",");

				for (var x = 0; x < clickData.length; x++) {
					var param = clickData[x].trim();

					// Check if it's a URL.
					if (/^\/.*?\.html$/.test(param)) {

						// Element is an anchor, so just add a href.
						if (el.tagName === "A") {
							el.setAttribute("href", param);
							el.setAttribute("target", "_blank");
						}

						// Not an anchor - wrap the inner HTML in an anchor and append to element.
						else {
							var link       = document.createElement("a");
							link.href      = param;
							link.target    = "_blank";
							link.innerHTML = el.innerHTML;
							el.innerHTML   = "";

							el.append(link);
						}

						// Always remove the trash onclick attribute.
						el.removeAttribute("onclick");

						break;
					}
				}
			}
		} else {
			console.log("[TripAdvisor TRASH] No trash onclick elements detected.");
		}
	}

})();
