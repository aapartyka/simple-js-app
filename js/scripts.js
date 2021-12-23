let pokemonList = [];


/*
Array which stores the pokemon objects and it's attributes.
Attributes: Number in Pokedex, name, type, category, height, weight, gender, abilities
*/
pokemonList = [
    {
        pokedexNumber: 4,
        name: 'Charmander',
        type: ['Fire'],
        height: 2.0,
        weight: 18.7,
    },
    {
        pokedexNumber: 5,
        name: 'Charmeleon',
        type: ['Fire'],
        height: 3.07,
        weight: 41.9,
    },
    {
        pokedexNumber: 6,
        name: 'Charizard',
        type: ['Fire', 'Flying'],
        height: 5.07,
        weight: 199.5,
    },
    {
        pokedexNumber: 65,
        name: 'Alakazam',
        type: ['Psychic'],
        height: 4.11,
        weight: 105.08,
    },
    {
        pokedexNumber: 10,
        name: 'Caterpie',
        type: ['Bug'],
        height: 1.00,
        weight: 105.08,
    }
]
// for loop that displays attributes for every pokemon in pokemonList[n]
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<br>' + pokemonList[i].name + " " + '(height: ' + pokemonList[i].height + ')');
    //All pokemon greater than 5 feet
    if (pokemonList[i].height >= 5.0) {
        document.write(' - Wow, that\'s really big');
    }
    // All pokemon smaller than 1.1 feet
    else if (pokemonList[i].height < 1.1){
        document.write(' - Cute, that\'s a really small');
    }
}