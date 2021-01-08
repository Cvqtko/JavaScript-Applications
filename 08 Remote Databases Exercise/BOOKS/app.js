const htmlSelectors = {
	'loadBooks': () => document.getElementById('loadBooks'),
	'createBtn': () => document.querySelector('#create-form > button'),
	'createTitleInput': () => document.getElementById('create-title'),
	'createAuthorInput': () => document.getElementById('create-author'),
	'createIsbnInput': () => document.getElementById('create-isbn'),
	'booksContainer': () => document.querySelector('table > tbody'),
	'errorContainer': () => document.getElementById('error-notification'),
}

htmlSelectors['loadBooks']().addEventListener('click', fetchAllBooks);

function fetchAllBooks() {
	fetch('https://books-exercise-96e8e-default-rtdb.firebaseio.com/Books/.json')
		.then(res => res.json)
		.then(renderBooks)
		.catch(handleError)
}

function renderBooks(booksData) {
	const booksContainer = htmlSelectors['booksContainer']();
	booksContainer.innerHTML = '';
	Object.keys(booksData).forEach(bookId => {
		const { title, author, isbn } = booksData[bookId];

		const tableRow =
			createDOMElement('tr', '', {}, {},
				createDOMElement('td', title, {}, {}),
				createDOMElement('td', author, {}, {}),
				createDOMElement('td', isbn, {}, {}),
				createDOMElement('td', '', {}, {},
					createDOMElement('button', 'Edit', {}, {}),
					createDOMElement('button', 'Delete', {}, {})));

		booksContainer.appendChild(tableRow);
	})
}

function handleError(error) {
	const errorContainer = htmlSelectors['errorContainer']();
	errorContainer.style.display = 'block';
	errorContainer.textContent = error.message;
	setTimeout(() => {
		errorContainer.style.display = 'none';
	}, 5000)
}

function createDOMElement(type, text, attributes, events, ...children) {
	const domElement = document.createElement(type);
	if (text !== '') {
		domElement.textContent = text;
	};

	Object.entries(attributes).forEach(([attrKey, attrValue]) => {
		domElement.setAttribute(attrKey, attrValue);
	});

	Object.entries(events).forEach(([eventName, eventHandler]) => {
		domElement.addEventListener(eventName, eventHandler);
	});

	children.forEach((child) => {
		domElement.appendChild(child);
	})
	// another way to append children
	// domElement.appendChild(...children);
	return domElement;
}