function solve() {
	const baseUrl = 'https://judgetests.firebaseio.com/schedule/';
	let stopId = 'depot';
	const info = document.getElementById('info');
	let stopName;
	const departBtn = document.getElementById('depart');
	const arriveBtn = document.getElementById('arrive');
	function changeButton() {
		if (departBtn.disabled) {
			departBtn.disabled = false;
			arriveBtn.disabled = true;
		} else {
			departBtn.disabled = true;
			arriveBtn.disabled = false;
		}
	}

	function depart() {
		let url = baseUrl + stopId + '.json';
		fetch(url).then((response) => response.json())
			.then(data => {
				info.textContent = `Next stop ${data.name}`;
				stopId = data.next;
				stopName = data.name;
			})
			.catch(() => {
				info.textContent = `Error`;
				departBtn.disabled = true;
				arriveBtn.disabled = true;
				return;
			});

		changeButton();
	}

	function arrive() {
		info.textContent = `Arriving at ${stopName}`;
		changeButton();
	}

	return {
		depart,
		arrive
	};
}

let result = solve();