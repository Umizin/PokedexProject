let indicePokemon = 1;

const inputField = document.getElementById('pokemonInput');
const containerInfo = document.querySelector('.infosPokemons');
const containerImg = document.querySelector('.containerPokemons');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const pokemonList = document.getElementById('pokemonList');

inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const pokemon = inputField.value.trim().toLowerCase();
        if (pokemon) {
            procurarPokemon(pokemon);
            indicePokemon = 0; 
        }
    }
});

document.getElementById('setaDireita').addEventListener('click', () => {
    indicePokemon++;
    procurarPokemon(indicePokemon);
});

document.getElementById('setaEsquerda').addEventListener('click', () => {
    if (indicePokemon > 1) {
        indicePokemon--;
    }
    procurarPokemon(indicePokemon);
});


function listarPokemons() {
    const promises = [];
    for (let i = 1; i <= 151; i++) { 
        promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json())
        );
    }
    
    Promise.all(promises)
        .then(pokemons => {
            pokemons.forEach(pokemon => {
                const li = document.createElement('li');
                const pokeNome = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
                li.textContent = pokeNome;
                li.addEventListener('click', () => {
                    procurarPokemon(pokemon.id);
                    sidebar.style.left = '-250px'; 
                });
                pokemonList.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar a lista de Pokémon.');
        });
}


menuButton.addEventListener('click', () => {
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
});

function procurarPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon não encontrado');
            return response.json();
        })
        .then(infoPoke => {
            const pokeNome = infoPoke.name.charAt(0).toUpperCase() + infoPoke.name.slice(1);
            const pokeImagem = infoPoke.sprites.front_default;
            const pokePeso = infoPoke.weight;
            const pokeTipo1 = infoPoke.types[0].type.name;
            const pokeTipo2 = infoPoke.types[1] ? infoPoke.types[1].type.name : null;

            
            const tipoCor = getTipoCor(pokeTipo1);
            containerInfo.style.backgroundColor = tipoCor;
            containerInfo.style.display = 'flex';
            containerInfo.innerHTML = `
                <img src="${pokeImagem}" alt="${pokeNome}">
                <h2>Nome: ${pokeNome}</h2>
                <h2>Peso: ${pokePeso / 10} Kg</h2>
                <h2>Tipo 1: ${capitalizeFirstLetter(pokeTipo1)}</h2>
                ${pokeTipo2 ? `<h2>Tipo 2: ${capitalizeFirstLetter(pokeTipo2)}</h2>` : ''}
            `;
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
            containerInfo.style.display = 'none';
            containerImg.innerHTML = ''; 
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTipoCor(tipo) {
    const cores = {
        grass: '#78C850',
        fire: '#F08030',
        water: '#6890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        poison: '#A040A0',
        electric: '#F8D030',
        ground: '#E0C68D',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0'
    };
    return cores[tipo] || '#D0D0D0'; 
}


listarPokemons();


procurarPokemon(indicePokemon);
