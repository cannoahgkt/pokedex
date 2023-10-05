let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: "Charizard",
            height: 1.7,
            types: ["fire", "flying"]
        },
        {
            name: "Lucario",
            height:1.2,
            types: ["steel", "fighting"]
        },
        {
            name: "Tyranitar",
            height: 6,
            types: ["dark", "rock"]
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "height" in pokemon) {
        pokemonList.push(pokemon);
        }
    }
    // Add Pokémon to the list and create an item
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Button will show details when clicked
        button.addEventListener("click", function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon.name + " (height: " + pokemon.height + ", " + "types: " + pokemon.types + ")");
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });



/* for (let i =0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    let pokemonName = pokemon.name;
    let pokemonHeight = pokemon.height;
// If the height is higher than 2, the message will appear, otherwise not
    if (pokemonHeight > 2) {
        document.write(pokemonName + " (height: " + pokemonHeight + ") -Wow, that's big!<br>");
    }
    else {
        document.write(pokemonName + " (height: " + pokemonHeight + ")<br>");
    }

} */