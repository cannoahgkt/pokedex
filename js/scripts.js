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

    return {
        getAll: getAll,
        add: addEventListener
    };
})();

    pokemonRepository.getAll().forEach(function(pokemon) {
        let pokemonName = pokemon.name;
        let pokemonHeight = pokemon.height;
        // If the height is higher than 2, the message will appear, otherwise not
        if (pokemonHeight > 2) {
            document.write(pokemonName + " (height: " + pokemonHeight + ") -Wow, that's big!<br>");
        }
        else {
            document.write(pokemonName + " (height: " + pokemonHeight + ")<br>");
        }
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