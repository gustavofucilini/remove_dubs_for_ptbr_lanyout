const DUB_MARKERS = [" Dub)", "(Dub)", "(Dublagem "];

function isDub(cite) {
	return DUB_MARKERS.some((marker) => cite.textContent.includes(marker));
}

function findRelease(cite) {
	const release = cite.closest(".releases > li");
	if (release) {
		return release;
	}
	// Fallback to the original fixed-depth lookup in case the list markup changes.
	let node = cite;
	for (let i = 0; i < 5 && node; i++) {
		node = node.parentNode;
	}
	return node;
}

function removeDubs(root) {
	root.querySelectorAll("cite").forEach((cite) => {
		if (isDub(cite)) {
			const release = findRelease(cite);
			if (release && release !== document.body && release !== document.documentElement) {
				release.remove();
			}
		}
	});
}

removeDubs(document);

// The calendar can add releases after load (filters, week navigation).
new MutationObserver(() => removeDubs(document)).observe(document.body, {
	childList: true,
	subtree: true,
});
