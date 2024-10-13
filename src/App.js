import React, { useState } from 'react'
import './App.css';
import pokedexImg from './images/Pokédex_logo.png'

function App() {
  const [data, setData] = useState(null)
  const [input, setInput] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (input) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${input}/`
    
    try {
      const response = await fetch(url)
      if(!response.ok) {
        throw new Error(`No se encontraron datos del pokemon ${input}`)
      }
      const result = await response.json()
      setData(result)
      setHasSearched(true)
      setError(null)
    } catch (error) {
      console.error('Error al obtener datos del pokemon', error)
      setData(null);
      setError(error.message)
      setHasSearched(true)
    }
    
  }

  const inputHandler = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      fetchData(input.toLowerCase())
  }

  return (
    <div className="App">
      <img alt='pokedex-image' src={pokedexImg} className='pokedex-img'></img>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={inputHandler} type='text' required></input>
      <button type='submit'>Buscar</button>
      </form>
      {data ? (
        <>
          <div className='main-container'>
            <h1 className='pokemon-name'>{data.name}</h1>
            <div className='pokemon-container'>
            {data.sprites && data.sprites.front_default ? <img alt='pokemon-image' src={data.sprites.front_default} className='pokemon-image'></img>
               : <p>No disponible</p> }
            <h2 className='info'>Info</h2>
            <div className='stats-container'>
                  <p><span>Id:</span> {data.id}</p>
                  <p><span>Height:</span> {data.height*10} cm</p>
                  <p><span>Weight:</span> {((data.weight)/2.205).toFixed(0)} kg</p>
                  <div>
                    <span>Type:</span>
                    {
                      data.types ? (data.types.map((type, index) => 
                        <p key={index} className='pokemon-type'>{type.type.name}</p>
                      )) : <p>No disponible</p>
                    }
                  </div> 
                  <div>
                    <span>Habilities: </span>
                    {
                      data.abilities ? (data.abilities.map((ability, index)  => 
                        <p key={index} className='pokemon-ability'>{ability.ability.name}</p>
                      )) : <p>No disponible</p>
                    }
                  </div>
            </div>
            </div>
          </div>
        </>
          
      ) : hasSearched && error ? (
        <pre>No se encontraron datos del pokemon {input}</pre>)
      : (<p>Ingresa los datos de un pokemon</p>)
      }
      
      
    </div>
  );
}

export default App;
