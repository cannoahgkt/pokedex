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

for (let i =0; i < pokemonList.length; i++) {
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

}