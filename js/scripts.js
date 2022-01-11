//The variable pokemonRepository holds what the IIFE returns.
let pokemonRepository = (function () {
    /*
    Array which stores the pokemon objects and it's attributes.
    Attributes: Number in Pokedex, name, type, category, height, weight, gender, abilities & more.
    */
    pokemonList = [];

    //url to the pokemon api
    let apiURL ='https://pokeapi.co/api/v2/pokemon/?limit=150';

    //try GET the data via fetch
    function loadList() {
        return fetch(apiURL).then(function (response)
        {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    deatilsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        //load detailed information of the pokemon
        let url = item.deatilsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }


    //returns all pokemon (items of pokemonList).
    function getAll() {
        return pokemonList;
    }

    //add new pokemon to pokemonList.
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        }
        else {
            console.log('Not allowed - only a fools wants to add something differnt than an object');
        }
    }

    //adds pokemon to the unorderd pokemon-list.
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //shows detailed information for the passed pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function() {
    //Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});