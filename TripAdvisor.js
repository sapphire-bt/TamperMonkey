// ==UserScript==
// @name         TripAdvisor TRASH
// @version      2019-04-06
// @description  Removes onclick/tracking elements from "things to do" page and turns them into *actual* clickable links.
// @match        https://www.tripadvisor.co.uk/*
// ==/UserScript==

(function() {
	// Add mutation observer to main results wrapper.
	var linkWrapper = document.getElementById("MAIN_PAGE_FRAGMENT");

	if (linkWrapper) {
		var observer = new MutationObserver(removeTrash);

		observer.observe(linkWrapper, {
			attributes : true,
			childList  : true,
			subtree    : true
		})
	}

	// Bind arrow keys to photo carousel.
	bindArrowKeys();

	// Run function.
	removeTrash();

	function bindArrowKeys() {
		document.addEventListener("keydown", function(e) {
			let carouselLeft  = document.querySelectorAll(".heroNav.left")[0];
			let carouselRight = document.querySelectorAll(".heroNav.right")[0];

			switch (e.code) {
				case "ArrowLeft":
					if (carouselLeft !== undefined) carouselLeft.click();
				break;

				case "ArrowRight":
					if (carouselRight !== undefined) carouselRight.click();
				break;

				default:
				break;
			}
		})
	}

	// Main function.
	function removeTrash(mutationsList, observer) {

		// Handle any "data-encoded-url" elements as well.
		decodeTrashLinks();

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
					if (param.endsWith(".html")) {

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

	/**
	 * Wrap data-encoded-url elements inside an <a> and convert attribute to href.
	 */
	function decodeTrashLinks() {
		const encodedUrls = document.querySelectorAll("[data-encoded-url]");

		if (encodedUrls.length > 0) {
			for (let i = 0; i < encodedUrls.length; i++) {
				// Current data-encoded-url element.
				let el = encodedUrls[i];

				// Decoded URL - still contains tracking prefix/suffix.
				let attr = atob(el.getAttribute("data-encoded-url"));

				// Remove extra crap.
				let url = attr.slice(attr.indexOf("/") + "/".length, attr.indexOf(".html") + ".html".length);

				// The parent <div> which has click event listeners.
				let parent = el.parentNode;

				// New <a> element to wrap contents in the encoded URL.
				let a = document.createElement("a");

				// Remove trash attribute just in case.
				el.removeAttribute("data-encoded-url");

				// Set the new href and append a cloned version of the contents.
				a.href = url;
				a.append(el.cloneNode(true));

				// Wrap everything in the new <a> element.
				parent.replaceChild(a, el);

				// Clone the parent <div> to remove the click event listeners.
				cloneElement(parent);
			}
		}
	}

	// A simple function which clones and replaces a given element to remove event listeners.
	function cloneElement(el) {
		el.parentNode.replaceChild(el.cloneNode(true), el);
	}
})();
