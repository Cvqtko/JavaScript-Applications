function makeCard(face, suit) {
    const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const validSuits = ['S', 'H', 'D', 'C'];
 
    if (!validFaces.includes(face)) {
        throw new Error("Invalid Face");
    }
 
    if (!validSuits.includes(suit)) {
        throw new Error("Invalid Suit");
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
 
console.log(makeCard('A', 'S').toString());
console.log(makeCard('10', 'H').toString());
console.log(makeCard('1', 'C').toString());