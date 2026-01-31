const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById('pokemonDetailModal')
const modalContainer = document.getElementById('modalContainer')

const maxRecords = 151
const limit = 10
let offset = 0;
let allPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openDetail(${pokemon.number})">
            <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function openDetail(id) {
    const pokemon = allPokemons.find(p => p.number === id);
    if (!pokemon) return;

    modalContainer.innerHTML = `
        <div class="modal-header ${pokemon.type}">
            <button onclick="closeDetail()" style="color:white; font-size:1.5rem">←</button>
            <div style="display:flex; justify-content:space-between; align-items: baseline; margin-top:20px">
                <h2 style="text-transform:capitalize; font-size:2rem">${pokemon.name}</h2>
                <span style="font-weight:700">#${pokemon.number.toString().padStart(3, '0')}</span>
            </div>
            <div style="display:flex; gap:10px; margin-top:10px">
                ${pokemon.types.map(t => `<span class="type">${t}</span>`).join('')}
            </div>
        </div>
        <div class="modal-img-container">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="modal-body">
            <div style="display:flex; gap:20px; border-bottom:1px solid #eee; margin-bottom:20px; padding-bottom:10px">
                <span style="color:#999; font-weight:700">Sobre</span>
                <span style="color:#303943; font-weight:700; border-bottom: 2px solid #6c79db">Status Base</span>
            </div>
            ${renderStat('HP', pokemon.hp)}
            ${renderStat('Attack', pokemon.atk)}
            ${renderStat('Defense', pokemon.def)}
            ${renderStat('Sp. Atk', pokemon.spAtk)}
            ${renderStat('Sp. Def', pokemon.spDef)}
            ${renderStat('Speed', pokemon.speed)}
        </div>
    `;
    modal.style.display = 'flex';
}

function renderStat(label, value) {
    const color = value > 50 ? '#48d0b0' : '#fb6c6c';
    return `
        <div class="stat-row">
            <span class="stat-label">${label}</span>
            <span class="stat-value">${value}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${Math.min(value, 100)}%; background: ${color}"></div>
            </div>
        </div>
    `;
}

function closeDetail() {
    modal.style.display = 'none';
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        allPokemons = [...allPokemons, ...pokemons];
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})