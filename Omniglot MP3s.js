// ==UserScript==
// @name         Omniglot MP3s
// @version      2019-08-15
// @description  Plays audio files inline on omniglot.com
// @include      *www.omniglot.com*
// @grant        none
// ==/UserScript==

document.querySelectorAll("a[href$='.mp3']").forEach(link => {
	link.addEventListener("click", function(e) {
		e.preventDefault();
		(new Audio(this.href)).play();
	})
})