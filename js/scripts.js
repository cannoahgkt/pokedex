let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.getElementById("pokemonModal"); // Declare modal here

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    }
  }

  // Function to add a Pokémon to the list and create a button item
  function addListItem(pokemon) {
    let pokemonList = document.getElementById("pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // Attach the click event listener to the button to show details
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Function to show Pokémon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (data) {
      // Populate the Bootstrap modal with Pokémon details
      $('#modalLabel').text('Name: ' + data.name);
      $('#pokemonHeight').text('Height: ' + data.height);
      $('#pokemonImage').attr('src', data.imageUrl);

      // Show the Bootstrap modal
      $('#modal').modal('show');
    });
  }

  // Function to load the list of Pokémon from the API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  // Function to load Pokémon details from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      return item;
    }).catch(function (error) {
      console.error(error);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Load the list of Pokémon and add list items with details
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
