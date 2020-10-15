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

const useMoneda = (label, estadoInicial, opciones) => {
  const [moneda, actualizarMoneda] = useState(estadoInicial);

  const SeleccionarMoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarMoneda(e.target.value)} value={moneda}>
        <option value="">-- Seleccione --</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  return [moneda, SeleccionarMoneda];
};

useMoneda.propTypes = {
  label: PropTypes.string.isRequired,
  estadoInicial: PropTypes.string.isRequired,
  opciones: PropTypes.object.isRequired,
};

export default useMoneda;
