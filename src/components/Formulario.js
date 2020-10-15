import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import axios from "axios";
import Error from "../components/Error";
import useMoneda from "../custom-hooks/useMoneda";
import useCriptomoneda from "../custom-hooks/useCriptomoneda";

const Button = styled.button`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: opacity 0.3s ease;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);
  const OPCIONES = [
    { codigo: "USD", nombre: "Dolar Americano" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "COP", nombre: "Peso Colombiano" },
  ];

  const [moneda, SeleccionarMoneda] = useMoneda(
    "Elige tu Moneda",
    "",
    OPCIONES
  );

  const [criptomoneda, SeleccionarCriptomoneda] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    criptomonedas
  );

  useEffect(() => {
    const consultaApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultaApi();
  }, []);

  const cotizaMoneda = (evento) => {
    evento.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizaMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SeleccionarMoneda />
      <SeleccionarCriptomoneda />
      <Button type="submit">Cotiza Ahora</Button>
    </form>
  );
};

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
