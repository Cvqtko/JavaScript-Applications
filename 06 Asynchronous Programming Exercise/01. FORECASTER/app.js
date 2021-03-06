function attachEvents() {
	let weatherButton = document.getElementById('submit');
	let locationName = document.getElementById('location');
	let currentDiv = document.getElementById('current');
	let forecastParentDiv = document.getElementById('forecast');
	let upcomingDiv = document.getElementById('upcoming');
	const locationUrl = 'https://judgetests.firebaseio.com/locations.json';
	const baseUrl = 'https://judgetests.firebaseio.com/forecast/';
	const symbols = {
		"Sunny": "&#x2600",
		"Partly sunny": "&#x26C5",
		"Overcast": "&#x2601",
		"Rain": "&#x2614",
		"degrees": "&#176"

	};

	weatherButton.addEventListener('click', () => {
		fetch(locationUrl)
			.then(response => response.json())
			.then(data => {
				let { name, code } = data.find(city => city.name === locationName.value);

				//fetch for today
				let current = fetch(baseUrl + `today/${code}.json`)
					.then(res => res.json());

				//fetch for upcoming whether
				let upcoming = fetch(baseUrl + `upcoming/${code}.json`)
					.then(res => res.json());
				//waiting all promises to finish	
				Promise.all([current, upcoming])
					.then(([currentData, upcomingData]) => showForecast(currentData, upcomingData))
					.catch(e => console.log(e));

			});
	})

	function createElement(el, classes, content) {
		let element = document.createElement(el);
		element.className = classes;
		element.innerHTML = content;
		return element;
	}
	function showForecast(currentData, upcomingData) {
		forecastParentDiv.style.display = 'block';
		showCurrent(currentData);
		showUpcoming(upcomingData);
	}
	function showCurrent(currentData) {
		let forecastDiv = createElement('div', 'forecasts', '');
		let currentSymbol = symbols[currentData.forecast.condition];
		let conditionSymbolSpan = createElement('span', 'condition symbol', currentSymbol);
		let conditionInfoSpan = createElement('span', 'condition', '');

		let forecastCitySpan = createElement('span', 'forecast-data', currentData.name);
		let highLow = `${currentData.forecast.low}${symbols.degrees}/${currentData.forecast.high}${symbols.degrees}`;
		let forecastInfoSpan = createElement('span', 'forecast-data', highLow);

		let forecastConditionSpan = createElement('span', 'forecast-data', currentData.forecast.condition);

		forecastDiv.appendChild(conditionSymbolSpan);
		currentDiv.appendChild(forecastDiv);
		forecastDiv.appendChild(conditionInfoSpan);

		conditionInfoSpan.appendChild(forecastCitySpan);
		conditionInfoSpan.appendChild(forecastInfoSpan);
		conditionInfoSpan.appendChild(forecastConditionSpan);
	}
	function showUpcoming(upcomingData) {
		let forecastInfo = createElement('div', 'forecast-info', '');

		upcomingData.forecast.forEach(obj => {
			let upcomingSpan = createElement('span', 'upcoming', '');
			let conditionSymbolSpan = createElement('span', 'symbol', symbols[obj.condition]);

			let highLow = `${obj.low}${symbols.degrees}/${obj.high}${symbols.degrees}`;
			let forecastInfoSpan = createElement('span', 'forecast-data', highLow);

			let forecastConditionSpan = createElement('span', 'forecast-data', obj.condition);
			upcomingSpan.appendChild(conditionSymbolSpan);
			upcomingSpan.appendChild(forecastInfoSpan);
			upcomingSpan.appendChild(forecastConditionSpan);
			forecastInfo.appendChild(upcomingSpan);
		})
		upcomingDiv.appendChild(forecastInfo);
	}
}

attachEvents();