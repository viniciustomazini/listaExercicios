        const pokemonList = document.getElementById('pokemonList');
        const loadMoreButton = document.getElementById('loadMore');
        const detailModal = document.getElementById('detail-modal');

        const maxRecords = 151;
        const limit = 10;
        let offset = 0;
        let allLoadedPokemons = [];

        function convertPokemonToLi(pokemon) {
            return `
                <li class="pokemon-card bg-${pokemon.type}" onclick="showDetail(${pokemon.id})">
                    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="types">
                        ${pokemon.types.map((type) => `<span class="type">${type}</span>`).join('')}
                    </div>
                    <img class="image" src="${pokemon.photo}" alt="${pokemon.name}">
                </li>
            `;
        }

        function loadPokemonItens(offset, limit) {
            pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
                allLoadedPokemons = [...allLoadedPokemons, ...pokemons];
                const newHtml = pokemons.map(convertPokemonToLi).join('');
                pokemonList.innerHTML += newHtml;
            });
        }

        loadPokemonItens(offset, limit);

        loadMoreButton.addEventListener('click', () => {
            offset += limit;
            const qtdRecordsWithNexPage = offset + limit;

            if (qtdRecordsWithNexPage >= maxRecords) {
                const newLimit = maxRecords - offset;
                loadPokemonItens(offset, newLimit);
                loadMoreButton.parentElement.removeChild(loadMoreButton);
            } else {
                loadPokemonItens(offset, limit);
            }
        });

        // Detail View Logic
        function showDetail(id) {
            const pokemon = allLoadedPokemons.find(p => p.id === id);
            if (!pokemon) return;

            document.getElementById('modal-head').className = `detail-header bg-${pokemon.type}`;
            document.getElementById('modal-name').innerText = pokemon.name;
            document.getElementById('modal-id').innerText = `#${pokemon.id.toString().padStart(3, '0')}`;
            document.getElementById('modal-img').src = pokemon.photo;
            
            const typesContainer = document.getElementById('modal-types');
            typesContainer.innerHTML = pokemon.types.map(t => `<span class="type">${t}</span>`).join('');

            const statsContainer = document.getElementById('modal-stats');
            statsContainer.innerHTML = pokemon.stats.map(s => {
                // Map API stat names to shorter UI labels
                const labelMap = {
                    'hp': 'HP',
                    'attack': 'Attack',
                    'defense': 'Defense',
                    'special-attack': 'Sp. Atk',
                    'special-defense': 'Sp. Def',
                    'speed': 'Speed'
                };
                const label = labelMap[s.name] || s.name;
                const percentage = Math.min(s.value, 100); // For visual bar

                return `
                    <li class="stat-item">
                        <span class="stat-label">${label}</span>
                        <span class="stat-value">${s.value}</span>
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: ${percentage}%"></div>
                        </div>
                    </li>
                `;
            }).join('');

            // Total Stat
            const total = pokemon.stats.reduce((acc, curr) => acc + curr.value, 0);
            statsContainer.innerHTML += `
                <li class="stat-item" style="margin-top: 10px; border-top: 1px solid #f0f0f0; padding-top: 10px;">
                    <span class="stat-label">Total</span>
                    <span class="stat-value">${total}</span>
                    <div class="stat-bar-container" style="background:none;"></div>
                </li>
            `;

            detailModal.style.display = 'flex';
            
            // Trigger bar animation
            setTimeout(() => {
                const bars = document.querySelectorAll('.stat-bar');
                bars.forEach((bar, index) => {
                    const val = pokemon.stats[index] ? pokemon.stats[index].value : 0;
                    bar.style.width = `${Math.min((val/150)*100, 100)}%`;
                    bar.style.backgroundColor = val > 50 ? '#48d0b0' : '#fb6c6c';
                });
            }, 100);
        }

        function closeDetail() {
            detailModal.style.display = 'none';
        }