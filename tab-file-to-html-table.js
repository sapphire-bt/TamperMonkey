// ==UserScript==
// @name         CSV to HTML Table
// @version      2019-01-17
// @description  Parse a CSV/tab file and create a HTML table from the results, using Papa Parse.
// @include      /https?://.*\.(csv|tab)/
// @require      https://fastcdn.org/Papa-Parse/4.1.2/papaparse.min.js
// @grant        none
// ==/UserScript==

(function() {
	// Ensure Papa Parse is loaded.
	if (typeof Papa === "object") {

		// The CSV file should be shown in a <pre> element.
		var csvEl = document.querySelector("pre");

		// If not, exit.
		if (csvEl === null) {
			log("unable to find <pre> element.");
			return;
		}

		// Get the text content and trim whitespace.
		var csvString = csvEl.textContent.trim();

		// Parse into an array using Papa Parse.
		var csvArray = Papa.parse(csvString);

		// Check for errors in the Papa Parse result.
		if (csvArray["errors"].length) {
			log("exiting due to errors detected in CSV:");
			console.log(csvArray["errors"]);
		}

		// If there are no errors, continue.
		else if (csvArray["data"].length) {
			// Begin constructing the output <table> element as a string.
			var tableStr = `<table id="output" border="1"><thead><tr>`;

			// The rows of the CSV file.
			var allRows = csvArray["data"];

			// The first row contains the column headers.
			var headers = allRows[0];

			// Append the headers to the table as <th> elements.
			for (var i = 0; i < headers.length; i++) {
				tableStr += `<th>${headers[i]}</th>`;
			}

			// Close the <thead> and begin populating the <tbody> with the CSV rows.
			tableStr += `</tr></thead><tbody>`;

			// Begin from [1] as [0] is the header row.
			for (var i = 1; i <= allRows.length; i++) {
				var row = allRows[i];

				// Check against empty rows.
				if (row !== undefined) {
					// Open the <tr>.
					tableStr += `<tr>`;

					// Iterate through this row's values and add to the <tr>.
					for (var x = 0; x < row.length; x++) {
						tableStr += `<td>${row[x]}</td>`;
					}

					// Close the <tr>.
					tableStr += `</tr>`;
				}
			}

			// Close the <table>.
			tableStr += `</tbody></table>`;

			// Write the contents to the document and include some basic CSS.
			document.write(`
				<style>
					#output {
						font: 14px "Segoe UI", sans-serif;
					}
					#output th {
						font-size: 16px;
						padding: 10px;
					}
				</style>
				${tableStr}
			`);
		}

		// No errors or data found.
		else {
			log("no CSV data detected.");
		}
	} else {
		log("unable to load Papa Parse.");
	}

	// Simple function to output messages prefixed with the script name.
	function log(message) {
		console.log(`[CSV to HTML Table] ${message}`);
	}
})();