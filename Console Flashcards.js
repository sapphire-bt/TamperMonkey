// ==UserScript==
// @name         Console Flashcards
// @version      2019-07-18
// @include      *
// @grant        none
// ==/UserScript==

(function() {
	// Simple flashcards with foreign word/translation.
	// Number/index is used if translation is omitted, e.g. ٢ -> 2.
	const flashcards = [
		{
			name: "getArNumber",
			data: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
		},
		{
			name: "getTrDay",
			data: [
				{ q: "Pazar",     a: "Sunday"    },
				{ q: "Pazartesi", a: "Monday"    },
				{ q: "Salı",      a: "Tuesday"   },
				{ q: "Çarşamba",  a: "Wednesday" },
				{ q: "Perşembe",  a: "Thursday"  },
				{ q: "Cuma",      a: "Friday"    },
				{ q: "Cumartesi", a: "Saturday"  }
			]
		},
		{
			name: "getTrMonth",
			data: [
				{ q: "Ocak",    a: "January"   },
				{ q: "Şubat",   a: "February"  },
				{ q: "Mart",    a: "March"     },
				{ q: "Nisan",   a: "April"     },
				{ q: "Mayıs",   a: "May"       },
				{ q: "Haziran", a: "June"      },
				{ q: "Temmuz",  a: "July"      },
				{ q: "Ağustos", a: "August"    },
				{ q: "Eylül",   a: "September" },
				{ q: "Ekim",    a: "October"   },
				{ q: "Kasım",   a: "November"  },
				{ q: "Aralık",  a: "December"  }
			]
		},
		{
			name: "getTrColour",
			data: [
				{ q: "siyah",      a: "black"  },
				{ q: "beyaz",      a: "white"  },
				{ q: "kırmızı",    a: "red"    },
				{ q: "mavi",       a: "blue"   },
				{ q: "turuncu",    a: "orange" },
				{ q: "yeşil",      a: "green"  },
				{ q: "mor",        a: "purple" },
				{ q: "pembe",      a: "pink"   },
				{ q: "kahverengi", a: "brown"  },
				{ q: "sarı",       a: "yellow" },
				{ q: "gri",        a: "grey"   },
				{ q: "renk",       a: "color"  },
				{ q: "açık",       a: "light"  },
				{ q: "koyu",       a: "dark"   }
			]
		},
	];

	// Add flashcards as window functions according to the name value.
	flashcards.forEach(el => {
		window[el.name] = function(delay) {
			delay = delay || 1;

			const rand  = Math.floor(Math.random() * el.data.length);
			const tName = `current_${el.name}`;

			// Clear setTimeout to allow "skipping" flashcards.
			if (window[tName] !== undefined) {
				clearTimeout(window[tName]);
			}

			window[tName] = setTimeout(function() {
				console.log(el.data[rand].a || rand);
			}, delay * 1000);

			return el.data[rand].q || el.data[rand];
		}
	})

	// Random Turkish number names from 0-99.
	window.getTrNumber = function(delay, min) {
		delay = delay || 2;

		const rand = (min ? (min + Math.floor(Math.random() * (100 - min))) : Math.floor(Math.random() * 100));

		if (window.currentTrNumber !== undefined) {
			clearTimeout(window.currentTrNumber);
		}

		window.currentTrNumber = setTimeout(function() {
			console.log(rand);
		}, delay * 1000);

		return getTrNumberName(rand);
	}

	// Random Turkish times.
	window.getTrTime = function(delay) {
		delay = delay || 5;

		let
			h      = Math.ceil(Math.random() * 12),
			m      = Math.floor(Math.random() * 60),
			hStr   = h.toString(),
			mStr   = m.toString(),
			hName  = getTrNumberName(h),
			mName  = getTrNumberName(m),
			output = "Saat ";

		// Pad 0-9 with 0.
		if (m < 10) mStr = `0${m}`;

		// Get name of next hour if more than 30 minutes past (e.g. 4:45 -> quarter to five).
		if (m > 30) {
			if (h === 12) h = 0; // Reset hour if 12.

			hName = getTrNumberName(h + 1);
		}

		// The hour only has an additional vowel if it's NOT on the hour/half past.
		if (m !== 0 && m !== 30) {

			// Apply consonant mutation if necessary (e.g. dört -> dördü).
			if (hName.endsWith("t")) hName = hName.slice(0, -1) + "d";

			hName += getHourVowel(m, hName);

		}

		// e.g. "Saat bir[i/e]"
		output += `${hName}`;

		// Output may be finished at this point, if on the hour.
		// Otherwise, finish creating output string.
		if (m !== 0) {

			// If half past, just add "buçuk" (half).
			if (m === 30) {
				output += " buçuk";
			}

			else {
				// Add "çeyrek" (quarter) if necessary.
				if (m === 15 || m === 45) {
					output += " çeyrek";
				}

				// Add minutes (unless it's 15) followed by "geçiyor" (passing).
				if (m < 30) {
					if (m !== 15) output += ` ${mName}`;
					output += " geçiyor";
				}

				// Add minutes (unless it's 45) followed by "var" (to).
				// Also recalculate minutes ("twenty to" instead of "forty past").
				else {
					if (m !== 45) output += ` ${getTrNumberName(60 - m)}`;
					output += " var";
				}
			}
		}

		if (window.currentTrTime !== undefined) {
			clearTimeout(window.currentTrTime);
		}

		window.currentTrTime = setTimeout(function() {
			console.log(output);
		}, delay * 1000);

		return `${hStr}:${mStr}`;
	}

	/**
	 * Helper functions
	 */
	// 0 -> sıfır, 15 -> on beş, etc.
	function getTrNumberName(num) {
		const units = [
			"sıfır",
			"bir",
			"iki",
			"üç",
			"dört",
			"beş",
			"altı",
			"yedi",
			"sekiz",
			"dokuz",
		];

		const tens = [
			"on",
			"yirmi",
			"otuz",
			"kırk",
			"elli",
			"altmış",
			"yetmiş",
			"seksen",
			"doksan",
		];

		num = num.toString();

		if (num.length === 1) {
			return units[num];
		} else {
			if (num.endsWith("0")) {
				return tens[num[0] - 1];
			} else {
				return tens[num[0] - 1] + " " + units[num[1]];
			}
		}
	}

	// Attach ı/i/u/ü before half past; a/e after half past.
	// dört -> dördü, bir -> bire, etc.
	function getHourVowel(minutes, hourName) {
		let vowels;

		if (minutes < 30) {
			vowels = {
				"a": "ı",
				"e": "i",
				"ı": "ı",
				"i": "i",
				"o": "u",
				"ö": "ü",
				"u": "u",
				"ü": "ü"
			}
		} else {
			vowels = {
				"a": "a",
				"e": "e",
				"ı": "a",
				"i": "e",
				"o": "a",
				"ö": "e",
				"u": "a",
				"ü": "e"
			}
		}

		// Find the last vowel in the given hour name.
		for (let i = hourName.length - 1; i >= 0; i--) {
			if (vowels[hourName[i]]) {
				let vowel = vowels[hourName[i]];

				// If the last letter is a vowel, add buffer consonant.
				if (i === hourName.length - 1) {
					vowel = "y" + vowel;
				}

				return vowel;
			}
		}
	}
})();