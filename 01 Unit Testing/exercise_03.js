function printDeckOfCards(cards) {
	function createCard(face, suit) {
		const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		const validSuits = ['S', 'H', 'D', 'C'];

		if (!validFaces.includes(face)) {
			throw new Error("Invalid card: " + face + suit);
		}

		if (!validSuits.includes(suit)) {
			throw new Error("Invalid card: " + face + suit);
		}

		let card = {
			face: face,
			suit: suit,
			toString: () => {
				let suitSymbols = {
					'S': '\u2660',
					'H': '\u2665',
					'D': '\u2666',
					'C': '\u2663'
				};
				return card.face + suitSymbols[card.suit];
			}
		};
		return card;
	}
	cards.forEach(c => {
		let face = c.substring(0, c.length - 1);
		let suit = c.charAt(c.length - 1);
		let card = createCard(face,suit);
		console.log(card.toString());

	});
}

printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);