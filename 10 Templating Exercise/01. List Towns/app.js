const elements = {
	input: () => document.getElementById('towns'),
	button: () => document.getElementById('btnLoadTowns'),
	root: () => document.getElementById('root'),
}

elements.button().addEventListener('click', getInputInformation);

function getInputInformation(e) {
	e.preventDefault();
	const towns  = elements.input().value;
	appendTowns(towns);
}

function appendTowns(towns){
	
	 
	
}