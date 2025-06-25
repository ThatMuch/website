import "./Breadcrumb.scss";

import { Link } from "gatsby";
import React from "react";

export type Crumb = {
  pathname: string;
  label: string;
};

type BreadcrumbProps = {
  crumbs?: Crumb[];
  currentPage: string;
};

const Breadcrumb = ({ crumbs = [], currentPage }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb" className="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            <Link to={crumb.pathname}>{crumb.label}</Link>
          </li>
        ))}
        {currentPage && <li aria-current="page">{currentPage}</li>}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
