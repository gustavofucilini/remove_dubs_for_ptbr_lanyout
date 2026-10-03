// Each release links to IDs ending in the audio locale, e.g. ".../GS00378136THTH".
// Crunchyroll no longer writes "Dub" in titles, so the locale is the reliable signal.
// Japanese (JAJP) and unknown locales are kept; everything listed here is a dub.
const DUB_LOCALES = [
	"ENUS", "PTBR", "S419", "ESES", "FRFR", "DEDE", "ITIT", "RURU", "ARSA",
	"HIIN", "TAIN", "TEIN", "THTH", "IDID", "MSMY", "VIVN", "PLPL", "TLPH", "KOKR",
	"CAES",
];

// Older calendar titles marked dubs in the name itself.
const DUB_MARKERS = [" Dub)", "(Dub)", "(Dublagem "];

function audioLocale(release) {
	const url = release.dataset.popoverUrl || "";
	const match = url.match(/([A-Z0-9]{4})$/);
	return match ? match[1] : null;
}

function isDub(release) {
	if (DUB_LOCALES.includes(audioLocale(release))) {
		return true;
	}
	const cite = release.querySelector("cite");
	return !!cite && DUB_MARKERS.some((marker) => cite.textContent.includes(marker));
}

function removeDubs(root) {
	root.querySelectorAll("article.release").forEach((release) => {
		if (isDub(release)) {
			(release.closest(".releases > li") || release).remove();
		}
	});
}

removeDubs(document);

// The calendar can add releases after load (filters, week navigation).
new MutationObserver(() => removeDubs(document)).observe(document.body, {
	childList: true,
	subtree: true,
});
