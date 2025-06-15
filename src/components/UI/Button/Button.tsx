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
  [key: string]: any;
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
  ...rest
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
          {...rest}
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
          aria-label={label}
          role="button"
          type="submit"
          {...rest}
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
          aria-label={label}
          role="button"
          {...rest}
        >
          <div className="btn__content"> {children}</div>
          <div className="btn__overlay"></div>
        </button>
      )}
    </>
  );
}
