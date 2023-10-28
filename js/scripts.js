let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=386';
  let modal = document.getElementById("pokemonModal");

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
    button.classList.add("pokemon-button");

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
      // Select the modal elements by class name
      let modalBody = document.querySelector('.modal-body');
      let modalTitle = document.querySelector('.modal-title');
  
      // Clear existing modal content
      modalTitle.innerHTML = '';
      modalBody.innerHTML = '';
  
      // Create elements for the modal content
      let titleElement = document.createElement('h2');
      titleElement.innerText = data.name;
  
      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.setAttribute('src', data.imageUrl);
      imageElement.classList.add('float-right');
  
      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + data.height;
  
      let typeElement = document.createElement('p');
      typeElement.innerText = 'Type: ' + (data.types.length === 2 ? data.types[0].type.name + ', ' + data.types[1].type.name : data.types[0].type.name);
  
      // Append elements to the modal content
      modalTitle.appendChild(titleElement);
      modalBody.appendChild(imageElement);
      modalBody.appendChild(heightElement);
      modalBody.appendChild(typeElement);
  
      // Show the Bootstrap modal
      $('#modal').modal('show');
      // Hide the Bootstrap modal
      document.getElementById('closeModalButton').addEventListener('click', function() {
        $('#modal').modal('hide');
      });
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

// Loads the list of Pokémon and adds list items with details
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Define a function to handle the search
function searchFunction() {
  let input, filter, ul, li, button, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("pokemon-list");
  li = ul.getElementsByClassName("list-group-item");

  for (i = 0; i < li.length; i++) {
    button = li[i].getElementsByClassName("pokemon-button")[0];
    txtValue = button.textContent || button.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Event listener for the search input field
document.getElementById("searchInput").addEventListener("keyup", searchFunction);

