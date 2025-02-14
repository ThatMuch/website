import "./PageHeader.scss";

import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="PageHeader mb-4">
      <h1 className="display--1 mb-4">{title}</h1>
      <p className="PageHeader__desc">{description}</p>
    </div>
  );
}
