function loadRepos() {
	console.log("asd");
	const userElement = document.getElementById('username');

	let url = `https://api.github.com/users/${userElement.value}/repos`;

	const httpRequest = new XMLHttpRequest();
	const reposElement = document.getElementById("repos");

	httpRequest.addEventListener('readystatechange', function() {

		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	
			let repos = JSON.parse(httpRequest.responseText);
			reposElement.innerHTML = repos.map(x=>`<li><a href="${x.html_url}" target="_blank">${x.name}</a></li>`).join(' ');

		}

	});

	httpRequest.open("GET", url);

	httpRequest.send();

};