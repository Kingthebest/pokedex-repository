const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMorebutton')

const maxRecords= 151
const limit = 8
let offset = 0;

//
//
//


function loadPokemon (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHtml =pokemons.map((pokemon)=> `
            
        <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

            pokemonList.innerHTML += newHtml
    })
}

loadPokemon(offset, limit) 

loadMoreButton.addEventListener('click', () => {
    offset += limit
   
    const qtdnetxpage = offset + limit


    if (qtdnetxpage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
            loadPokemon(offset, limit)
    }
})