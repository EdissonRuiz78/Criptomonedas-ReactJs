import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Header = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 145px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [monedas, guardarMoneda] = useState("");
  const [criptomonedas, guardarCriptomoneda] = useState("");
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (monedas === "" || criptomonedas === "") {
        return;
      }
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${monedas}`;
      const resultado = await axios.get(url);
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarCotizacion(resultado.data.DISPLAY[criptomonedas][monedas]);
      }, 3000);
    };
    cotizarCriptomoneda();
  }, [monedas, criptomonedas]);

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen criptomonedas" />
      </div>
      <div>
        <Header>Cotiza Criptomonedas al Instante</Header>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {cargando ? <Spinner /> : <Cotizacion cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  );
}

export default App;
