let indicePokemon = 0;
var i = 0;
pokelist = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard','squirtle','wartortle','blastoise','caterpie','metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey','pidgeotto','pidgeot','rattata','raticate','spearow','fearow','ekans','arbok','pikachu','raichu','sandshrew','sandslash','nidoran-f','nidorina','nidoqueen','nidoran-m','nidorino','nidoking','clefairy','clefable','vulpix','ninetales', 'jigglypuff','wigglytuff','zubat','golbat','oddish','gloom','vileplume','paras','parasect','venonat','venomoth','diglett','dugtrio']

const iconspokemon = document.querySelectorAll('.miniIcon img')
iconspokemon.forEach(img =>{
    img.addEventListener('click', () =>{
        const urlImagem = img.src;
        const idFinal = pegarUrl(urlImagem);
        procurarPokemon(idFinal);
    })
})

function procurarPokemon(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(infoPoke =>{
        console.log(infoPoke);
        const pokeNome = infoPoke.name.charAt(0).toUpperCase() + infoPoke.name.slice(1);
        const pokeImagem = infoPoke.sprites.other.showdown.front_default;
        const pokePeso = infoPoke.weight;
        const pokeTipo1 = infoPoke.types[0].type.name.charAt(0).toUpperCase() + infoPoke.types[0].type.name.slice(1);
        var pokeTipo2 = infoPoke.types[1] ? infoPoke.types[1].type.name.charAt(0).toUpperCase() + infoPoke.types[1].type.name.slice(1) : null;
        
        const containerinfo = document.querySelector('.infosPokemons');
        containerinfo.innerHTML=`
            <h2>Nome : ${pokeNome}</h2>
            <h2>Peso : ${pokePeso/10} Kg</h2>
            <h2>Tipo 1: ${pokeTipo1}</h2>
            ${pokeTipo2 ? `<h2>Tipo 2: ${pokeTipo2}</h2>` : ' '}
            `;

        const containerimg = document.querySelector('.containerPokemons');
        containerimg.innerHTML=`
        <img src="${pokeImagem}" alt="${pokeNome}">
        `
    })
}

function trocarPokemon(){
    const setaEsquerda = document.querySelector('.setaEsquerda');
    setaEsquerda.addEventListener('click', ()=>{
        i = (i - 1) % pokelist.length;
        procurarPokemon(pokelist[i]);
       
    })

    const setaDireita = document.querySelector('.setaDireita');
    setaDireita.addEventListener('click', ()=>{
        i = (i + 1) % pokelist.length;
        procurarPokemon(pokelist[i])
    })
}




function pegarUrl(urlImagem){
    const começoLink = urlImagem.indexOf("0");
    const finalLink = urlImagem.indexOf("/Normal.png");
    const idFinal = urlImagem.substring(começoLink, finalLink);
    return parseInt(idFinal, 10);

}

procurarPokemon(pokelist[i])
trocarPokemon();

