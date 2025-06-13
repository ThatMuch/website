import React from "react";

type Props = {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "link";
  children?: React.ReactNode;
  url?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

export default function Button({
  label,
  onClick,
  className,
  disabled,
  type,
  children,
  url,
  target,
  rel,
}: Props) {
  return (
    <>
      {type === "link" && (
        <a
          onClick={onClick}
          className={`btn ${className}`}
          aria-label={label}
          href={url}
          target={target}
          rel={rel}
          role="button"
        >
          <div className="btn__content"> {children}</div>
          <div className="btn__overlay"></div>
        </a>
      )}
      {type === "submit" && (
        <button
          onClick={onClick}
          className={`btn ${className}`}
          disabled={disabled}
          type="submit"
        >
          <div className="btn__content"> {children}</div>
          <div className="btn__overlay"></div>
        </button>
      )}
      {type === "button" && (
        <button
          onClick={onClick}
          className={`btn ${className}`}
          disabled={disabled}
          type="button"
        >
          <div className="btn__content"> {children}</div>
          <div className="btn__overlay"></div>
        </button>
      )}
    </>
  );
}
