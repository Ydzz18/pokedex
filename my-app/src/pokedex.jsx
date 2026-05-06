import { useState, useEffect } from 'react';
import './Pokedex.css';

export default function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  const fetchPokemon = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (pokemonId < 1025) {
      setPokemonId(pokemonId + 1);
    }
  };

  const handlePrev = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  if (loading || !pokemon) {
    return <div className="pokedex-container">Loading...</div>;
  }

  const stats = pokemon.stats;
  const types = pokemon.types;
  const pokemonNumber = String(pokemon.id).padStart(4, '0');

  return (
    <div className="pokedex-wrapper">
      <div className="pokedex-header">
        <h1>POKEDEX</h1>
      </div>

      <div className="pokedex-container">
        <div className={`pokemon-card type-${types[0].type.name}`}>
          {/* Left Side - Image */}
          <div className="pokemon-image-section">
            <div className="image-container">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="pokemon-details-section">
            <div className="pokemon-number">#{pokemonNumber}</div>

            {/* Type Badges */}
            <div className="type-badges">
              {types.map((typeInfo) => (
                <span 
                  key={typeInfo.type.name}
                  className={`type-badge type-${typeInfo.type.name}`}
                >
                  {typeInfo.type.name.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Pokemon Name */}
            <h2 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

            {/* Stats */}
            <div className="stats-container">
              {stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <span className="stat-label">{stat.stat.name.toUpperCase().replace('-', ' ')}</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill"
                      style={{
                        width: `${(stat.base_stat / 150) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>

            {/* Navigation and Scanner */}
            <div className="footer-section">
              <div className="nav-buttons">
                <button 
                  className="nav-btn prev-btn"
                  onClick={handlePrev}
                  disabled={pokemonId === 1}
                >
                  PREV
                </button>
                <button 
                  className="nav-btn next-btn"
                  onClick={handleNext}
                  disabled={pokemonId === 1025}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
