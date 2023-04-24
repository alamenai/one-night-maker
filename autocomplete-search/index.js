const searchInput = document.querySelector('.app-search-input');
const autoCompleteContainer = document.querySelector(
	'.app-autocomplete-items-container'
);

searchInput.onkeyup = (event) => {
	const { value } = event.target;
	let suggestedStartups = [];
	if (value) {
		suggestedStartups = germanStartups.filter((country) => {
			return country.toLowerCase().includes(value.toLowerCase());
		});
	}
	displaySuggestions(suggestedStartups);
};

const displaySuggestions = (suggestedStartups) => {
	autoCompleteContainer.innerHTML = '';
	const suggestedElements = suggestedStartups.map((startup) => {
		return createElement(startup);
	});

	suggestedElements.forEach((e) => {
		autoCompleteContainer.appendChild(e);
	});
};

const createElement = (text) => {
	const element = document.createElement('li');
	element.textContent = text;
	element.classList.add('app-autocomplete-item');
	element.onclick = (event) => {
		searchInput.value = event.target.textContent;
	};
	return element;
};
