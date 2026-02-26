import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import "./src/style/style.scss";

export const wrapRootElement = ({ element }) => {
  return (
    <HelmetProvider>
      {element}
    </HelmetProvider>
  );
};
