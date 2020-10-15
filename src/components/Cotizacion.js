import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Contenedor = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  text-align: left;
`;

const Info = styled.h1`
  font-size: 1rem;

  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 1.5rem;

  span {
    font-weight: bold;
  }
`;

const Cotizacion = ({ cotizacion }) => {
  console.log(cotizacion);
  const { PRICE, HIGHDAY, LOWDAY, LASTUPDATE, CHANGE24HOUR } = cotizacion;
  if (Object.keys(cotizacion).length === 0) {
    return null;
  }
  return (
    <Contenedor>
      <Precio>
        El precio es: <span>{PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span> {HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span> {LOWDAY}</span>
      </Info>
      <Info>
        Cambio ultimas 24 horas: <span> {CHANGE24HOUR}</span>
      </Info>
      <Info>
        Ultima actualizacion: <span> {LASTUPDATE}</span>
      </Info>
    </Contenedor>
  );
};

Cotizacion.propTypes = {
  cotizacion: PropTypes.object.isRequired,
};

export default Cotizacion;
