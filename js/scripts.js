//The variable pokemonRepository holds what the IIFE returns.
let pokemonRepository = (function () {
    /*
    Array which stores the pokemon objects and it's attributes.
    Attributes: Number in Pokedex, name, type, category, height, weight, gender, abilities & more.
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
    ];
    
    //returns all pokemon (items of pokemonList).
    function getAll() {
        return pokemonList;
    }

    //add new pokemon to pokemonList.
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        }
        else {
            console.log('Not allowed - only a fools wants to add something differnt than an object');
        }
    }

    return {
        getAll: getAll,
        add: add
    };

})();

pokemonRepository.add({
    pokedexNumber: 150,
    name: 'Mewtwo',
    type: ['Psychic'],
    height: 2.0,
    weight: 122.0
});

//pokemonRepository.add('fooltest');

//Displays all all pokemon with it's attributs in pokemonList[n]
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<br>' + pokemon.name + ": " + '(height: ' + pokemon.height + ')');
    if (pokemon.height >= 5.0) {
        document.write(' - Wow, that\'s really big');
    }
    // All pokemon smaller than 1.1 feet
    else if (pokemon.height < 1.1){
        document.write(' - Cute, that\'s a really small');
    }
});