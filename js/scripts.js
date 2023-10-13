let pokemonRepository = (function () {
    let pokemonList = [];
  
    // Pokedex API database Link
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // Function to get all Pokémon
    function getAll() {
      return pokemonList;
    }
  
    // Function to add a Pokémon to the list
    function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
      }
    }
  
    // Function to add a Pokémon to the list and create a button item
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
  
      // Button will show details when clicked
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }
  
    // Function to show Pokémon details
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function (data) {
        // Create the modal element
        let modal = document.createElement("div");
        modal.classList.add("modal");
  
        // Create the content of the modal
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
  
        // Create a close button for the modal
        let closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", function () {
          modal.style.display = "none";
        });
  
        // Create elements to display Pokémon details
        let nameElement = document.createElement("h2");
        nameElement.innerText = "Name: " + data.name;
  
        let heightElement = document.createElement("p");
        heightElement.innerText = "Height: " + data.height + " cm";
  
        let imageElement = document.createElement("img");
        imageElement.src = data.imageUrl;
        imageElement.alt = data.name;
        imageElement.classList.add("pokemon-image");
  
        // Append elements to the modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(nameElement);
        modalContent.appendChild(heightElement);
        modalContent.appendChild(imageElement);
  
        // Append the modal content to the modal
        modal.appendChild(modalContent);
  
        // Append the modal to the document body
        document.body.appendChild(modal);
  
        // Display the modal
        modal.style.display = "block";
  
        // Close the modal if the user clicks outside of it
        window.addEventListener("click", function (event) {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
  
        // Close the modal if the user presses the Escape key
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            modal.style.display = "none";
          }
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
  
  // Load the list of Pokémon and add list items with details
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  