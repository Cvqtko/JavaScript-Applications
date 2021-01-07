function attachEvents() {
	const addButton = document.querySelector("button.add");
	const loadButton = document.querySelector("button.load");
	const updateButton = document.querySelector("button.update");
	const deleteButton = document.querySelector("button.delete");
	const baseUrl = "https://fisher-game.firebaseio.com/catches.json";
	const deleteBaseUrl = "https://fisher-game.firebaseio.com/catches/";
	const catchesDiv = document.getElementById("catches");

	addButton.addEventListener('click', () => {
		let angler = document.querySelector("fieldset > input.angler");
		let weight = document.querySelector("fieldset > input.weight");
		let species = document.querySelector("fieldset > input.species");
		let location = document.querySelector("fieldset > input.location");
		let bait = document.querySelector("fieldset > input.bait");
		let captureTime = document.querySelector("fieldset > input.captureTime");

		let obj = JSON.stringify({
			angler: angler.value,
			weight: weight.value,
			species: species.value,
			location: location.value,
			bait: bait.value,
			captureTime: captureTime.value,
		})
		fetch(baseUrl, {
			method: "POST",
			body: obj
		}).then(res => res.json())
			.then(data => console.log(data));
	})

	loadButton.addEventListener('click', () => {
		catchesDiv.innerHTML='';
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				Object.keys(data).forEach(key => appendCatch(key, data))
			});
	})

	function appendCatch(key, data) {
		let { angler, weight, species, location, bait, captureTime } = data[key];
		let catchDiv = createElement('div', 'catch', '', '');
		catchDiv.setAttribute("data-id", key);

		let anglerLabel = createElement('label', '', 'Angler', '');
		let anglerInput = createElement('input', 'angler', angler, 'text');

		let weightLabel = createElement('label', '', 'Weight', '');
		let weightInput = createElement('input', 'weight', weight, "number");

		let speciesLabel = createElement('label', '', 'Species', '');
		let speciesInput = createElement('input', 'species', species, "text");

		let locationLabel = createElement('label', '', 'Location', '');
		let locationInput = createElement('input', 'location', location, "text");

		let baitLabel = createElement('label', '', 'Bait', '');
		let baitInput = createElement('input', 'bait', bait, "text");

		let captureTimeLabel = createElement('label', '', 'Capture Time', '');
		let captureTimeInput = createElement('input', 'captureTime', captureTime, "number");

		let updateButton = createElement('button', 'update', 'Update');
		let deleteButton = createElement('button', 'delete', 'Delete');

		deleteButton.addEventListener('click', () => {
			deleteUrl = deleteBaseUrl + key + ".json";
			fetch(deleteUrl, { method: "DELETE" });
		})

		updateButton.addEventListener('click', () => {
			
			let obj = JSON.stringify({
				angler: anglerInput.value,
				weight: weightInput.value,
				species: speciesInput.value,
				location: locationInput.value,
				bait: baitInput.value,
				captureTime: captureTimeInput.value,
			})
			updateUrl = deleteBaseUrl + key + ".json";
			fetch(updateUrl, { method: "PUT", body: obj })
		})

		catchDiv.appendChild(anglerLabel);
		catchDiv.appendChild(anglerInput);
		catchDiv.appendChild(document.createElement("hr"));
		catchDiv.appendChild(weightLabel);
		catchDiv.appendChild(weightInput);
		catchDiv.appendChild(document.createElement("hr"));
		catchDiv.appendChild(speciesLabel);
		catchDiv.appendChild(speciesInput);
		catchDiv.appendChild(document.createElement("hr"));
		catchDiv.appendChild(locationLabel);
		catchDiv.appendChild(locationInput);
		catchDiv.appendChild(document.createElement("hr"));
		catchDiv.appendChild(baitLabel);
		catchDiv.appendChild(baitInput);
		catchDiv.appendChild(document.createElement("hr"));
		catchDiv.appendChild(captureTimeLabel);
		catchDiv.appendChild(captureTimeInput);
		catchDiv.appendChild(document.createElement("hr"));

		catchDiv.appendChild(updateButton);
		catchDiv.appendChild(deleteButton);

		catchesDiv.appendChild(catchDiv);

	}

	function createElement(el, classes, content, type) {
		let element = document.createElement(el);

		if (el === "input") {
			element.type = type;
			element.value = content;
		} else {
			element.innerHTML = content;
		}
		element.className = classes;


		return element;
	}
}

attachEvents();

