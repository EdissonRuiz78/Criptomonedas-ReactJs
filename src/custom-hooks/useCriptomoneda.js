import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  font-size: 1.2rem;
  border: none;
`;

const useCriptomoneda = (label, estadoInicial, opciones) => {
  const [criptomoneda, actualizarCriptomoneda] = useState(estadoInicial);

  const SeleccionarCriptomoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={(e) => actualizarCriptomoneda(e.target.value)}
        value={criptomoneda}
      >
        <option value="">-- Seleccione --</option>
        {opciones.map((opcion) => (
          <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
            {opcion.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  return [criptomoneda, SeleccionarCriptomoneda];
};

useCriptomoneda.propTypes = {
  label: PropTypes.string.isRequired,
  estadoInicial: PropTypes.string.isRequired,
  opciones: PropTypes.object.isRequired,
};

export default useCriptomoneda;
