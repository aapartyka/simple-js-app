//The variable pokemonRepository holds what the IIFE returns.
let pokemonRepository = (function () {
    /*
    Array which stores the pokemon objects and it's attributes.
    Attributes: Number in Pokedex, name, type, category, height, weight, gender, abilities & more.
    */
    // eslint-disable-next-line no-undef
    pokemonList = [];
    //url to the pokemon api
    let apiURL ='https://pokeapi.co/api/v2/pokemon/?limit=150';
    //initialize container for modal

    //add pokemon to pokemonList.
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        }
        else {
            console.log('Not allowed - only a fools wants to add something differnt than an object');
        }
    }

    //returns all pokemon (items of pokemonList).
    function getAll() {
        return pokemonList;
    }

    function removeAllChildNotes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    //Get input element.
    let filterInput = document.getElementById('search-pokemon');
    //Add event listener.
    filterInput.addEventListener('keyup', filterPokemon);

    function filterPokemon() {
        //Get value of input.
        let filterValue = document.getElementById('search-pokemon').value.toLowerCase();

        //Get PokemonList(Element).
        let removePokemon = document.querySelector('.pokemon-list');
        //remove all children of PokemonList.
        removeAllChildNotes(removePokemon);

        pokemonList.forEach((pokemon) => {
            //Filter foreach Pokemon
            if(pokemon.name.toLowerCase().includes(filterValue.toLowerCase())){
                //Add each pokemon to the pokemon list which name includes the same letters like the filterValue.
                addListItem(pokemon);
            }
        })
    }

    //adds pokemon to the unorderd pokemon-list.
    function addListItem(pokemon) {

        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('listItem-class');
        button.innerText = pokemon.name;
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute("data-target","#modal-container");
        button.setAttribute("data-toggle", "modal");

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //load details to get the image of the pokemon
        loadDetails(pokemon).then (function() {
            let divImage = document.createElement('div');
            let pknImage = document.createElement('img');
            pknImage.src = pokemon.imageUrl;
            pknImage.classList.add('pokemon-image');

            divImage.appendChild(pknImage);
            button.appendChild(divImage);
        })

        //click event for show details through modal.
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //try GET the data via fetch
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        //load detailed information of the pokemon
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //add the details to the item
            pokemon.imageUrl = details.sprites.front_default;
           // pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
           // pokemon.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //shows detailed information for the passed pokemon.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        //create modal object
        // eslint-disable-next-line no-undef
        let pknModal = new bootstrap.Modal(document.getElementById('modal'), {
            keyboard: true
        });
        
        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');

        //delete previous displayed details.
        modalBody.innerHTML = '';

        modalTitle.textContent = pokemon.name;

        let pknImage = document.createElement('img');
        pknImage.src = pokemon.imageUrl;
        pknImage.classList.add('pokemon-image');

        let pknHeight = document.createElement('p');
        pknHeight.innerText = 'Height: ' + pokemon.height;

        let pknWeight = document.createElement('p');
        pknWeight.innerText = 'Weight: ' + pokemon.weight;
        //add abilities, type and gender later.

        modalBody.append(pknImage);
        modalBody.append(pknHeight);
        modalBody.append(pknWeight);
        
        pknModal.show();

  }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };

})();

pokemonRepository.loadList().then(function() {
    //add pokemon search here
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});