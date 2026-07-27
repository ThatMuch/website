/* @ds-bundle: {"format":3,"namespace":"THATMUCHDesignSystem_3082a3","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Planet","sourcePath":"components/brand/Planet.jsx"},{"name":"RainbowDivider","sourcePath":"components/brand/RainbowDivider.jsx"},{"name":"Star","sourcePath":"components/brand/Star.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"CardBody","sourcePath":"components/data-display/Card.jsx"},{"name":"CardFooter","sourcePath":"components/data-display/Card.jsx"},{"name":"StatCard","sourcePath":"components/data-display/StatCard.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"7309962f75b6","components/brand/Planet.jsx":"312b49222d68","components/brand/RainbowDivider.jsx":"9d9729454ecb","components/brand/Star.jsx":"5a78c0ee836a","components/buttons/Button.jsx":"357bd8a5bdb3","components/data-display/Avatar.jsx":"45823927370e","components/data-display/Badge.jsx":"7a515e20f8c5","components/data-display/Card.jsx":"441065315051","components/data-display/StatCard.jsx":"2630e4e39030","components/data-display/Tag.jsx":"894d7d61d7c2","components/feedback/Tooltip.jsx":"b3af2f0497e9","components/forms/Checkbox.jsx":"34dab2fe6c09","components/forms/Input.jsx":"e1be8d8254bf","components/forms/Radio.jsx":"90bf04783d93","components/forms/Switch.jsx":"89a23730e4e6","components/forms/Textarea.jsx":"63d705d335d5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.THATMUCHDesignSystem_3082a3 = window.THATMUCHDesignSystem_3082a3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Logo — THATMUCH lockup. Pass the resolved image src (relative to your page).
 * Two finishes: "color" (rainbow visor) for light backgrounds, "dark" for the
 * monochrome indigo mark. Use `light` for the white knockout on dark space.
 */
function Logo({
  src,
  variant = "color",
  width = 200,
  alt = "THATMUCH",
  className = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    width: width,
    className: `tm-logo tm-logo--${variant} ${className}`,
    style: {
      display: "block",
      height: "auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Planet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Planet — drops one of THATMUCH's cosmos illustrations (planets, characters,
 * comets) as a floating decorative element. Pass the resolved image src.
 * Optional `float` adds a gentle hover loop (disabled for reduced motion).
 */
function Planet({
  src,
  size = 120,
  float = false,
  alt = "",
  className = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    "aria-hidden": alt ? undefined : true,
    className: `tm-planet ${float ? "tm-planet--float" : ""} ${className}`,
    style: {
      width: size,
      height: "auto",
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Planet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Planet.jsx", error: String((e && e.message) || e) }); }

// components/brand/RainbowDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RainbowDivider — the four-service gradient rule (cyan · green · yellow · magenta).
 * Hard-stop bands by default; pass smooth for a blended ramp.
 */
function RainbowDivider({
  smooth = false,
  height = 4,
  className = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("hr", _extends({
    className: `tm-divider tm-divider--rainbow ${className}`,
    style: {
      height,
      background: smooth ? "var(--gradient-rainbow-smooth)" : "var(--gradient-rainbow)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { RainbowDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/RainbowDivider.jsx", error: String((e && e.message) || e) }); }

// components/brand/Star.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Star — THATMUCH's signature four-point sparkle (the glyph beside the logo,
 * used as a decorative accent across the cosmos brand). Pure geometric SVG.
 */
function Star({
  size = 24,
  color = "var(--design-500)",
  className = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `tm-star ${className}`,
    style: {
      width: size,
      height: size,
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M50 0 C53 28 72 47 100 50 C72 53 53 72 50 100 C47 72 28 53 0 50 C28 47 47 28 50 0 Z",
    fill: "currentColor"
  })));
}
Object.assign(__ds_scope, { Star });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Star.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * THATMUCH Button — pill-shaped action with the signature radial "overlay"
 * bloom on hover. Renders as <button> or <a> (pass href).
 */
function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  icon,
  trailingIcon,
  iconOnly = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = ["tm-btn", `tm-btn--${variant}`, size === "sm" ? "tm-btn--sm" : size === "lg" ? "tm-btn--lg" : "", iconOnly ? "tm-btn--icon-only" : "", className].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "tm-btn__content"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "tm-btn__icon"
  }, icon), !iconOnly && children, trailingIcon && /*#__PURE__*/React.createElement("span", {
    className: "tm-btn__icon tm-btn__icon--trailing"
  }, trailingIcon)), /*#__PURE__*/React.createElement("span", {
    className: "tm-btn__overlay",
    "aria-hidden": "true"
  }));
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: classes
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: classes,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Avatar — circular user image or initials. */
function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  ring = false,
  className = "",
  style,
  ...rest
}) {
  const classes = ["tm-avatar", `tm-avatar--${size}`, ring ? "tm-avatar--ring" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes,
    style: style
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("span", null, initials));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Badge — uppercase status pill, optionally with a leading status dot. */
function Badge({
  variant = "solid",
  dot = false,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `tm-badge tm-badge--${variant} ${className}`
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "tm-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — content container. Light by default; `dark` gives the frosted
 * translucent panel used on cosmic backgrounds. Compose freely, or use the
 * convenience props (media / title / text / footer).
 */
function Card({
  dark = false,
  flat = false,
  media,
  mediaAlt = "",
  title,
  text,
  footer,
  className = "",
  children,
  ...rest
}) {
  const classes = ["tm-card", dark ? "tm-card--dark" : "", flat ? "tm-card--flat" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, rest), media && /*#__PURE__*/React.createElement("img", {
    className: "tm-card__media",
    src: media,
    alt: mediaAlt
  }), children ? children : /*#__PURE__*/React.createElement(React.Fragment, null, (title || text) && /*#__PURE__*/React.createElement("div", {
    className: "tm-card__body"
  }, title && /*#__PURE__*/React.createElement("h3", {
    className: "tm-card__title"
  }, title), text && /*#__PURE__*/React.createElement("p", {
    className: "tm-card__text"
  }, text)), footer && /*#__PURE__*/React.createElement("div", {
    className: "tm-card__footer"
  }, footer)));
}
function CardBody({
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `tm-card__body ${className}`
  }, rest), children);
}
function CardFooter({
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `tm-card__footer ${className}`
  }, rest), children);
}
Object.assign(__ds_scope, { Card, CardBody, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — the key-figure block from the marketing "Chiffres clés" section.
 * Big display number tinted by service scope, over a translucent panel.
 */
function StatCard({
  value,
  label,
  scope = "dev",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `tm-stat tm-stat--${scope} ${className}`
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "tm-stat__value"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "tm-stat__label"
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — small service-scoped label. The four scopes mirror THATMUCH's
 * service families: dev (cyan), design (yellow), com (magenta), proj (green).
 */
function Tag({
  scope,
  className = "",
  children,
  ...rest
}) {
  const classes = ["tm-tag", scope ? `tm-tag--${scope}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tooltip — wraps a trigger and shows a dark bubble above on hover/focus. */
function Tooltip({
  label,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `tm-tooltip ${className}`,
    tabIndex: 0
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "tm-tooltip__bubble",
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Check = () => /*#__PURE__*/React.createElement("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 8.5L6.5 12L13 4.5",
  stroke: "#fff",
  strokeWidth: "2.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/** Checkbox — labelled, with the brand indigo check fill. */
function Checkbox({
  label,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `tm-check ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "tm-check__box"
  }, /*#__PURE__*/React.createElement(Check, null)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — labelled text field. `dark` for cosmic backgrounds. */
function Input({
  label,
  hint,
  error = false,
  dark = false,
  id,
  className = "",
  ...rest
}) {
  const fieldId = id || (label ? `tm-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const classes = ["tm-field", dark ? "tm-field--dark" : "", error ? "tm-field--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: classes,
    htmlFor: fieldId
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "tm-field__label"
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "tm-input"
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    className: "tm-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio — labelled single-choice control. */
function Radio({
  label,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `tm-check ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "tm-check__box tm-check__box--radio"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Switch — labelled on/off toggle (cyan when on). */
function Switch({
  label,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `tm-switch ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "tm-switch__track"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Textarea — multiline labelled field. */
function Textarea({
  label,
  hint,
  error = false,
  dark = false,
  id,
  className = "",
  ...rest
}) {
  const fieldId = id || (label ? `tm-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const classes = ["tm-field", dark ? "tm-field--dark" : "", error ? "tm-field--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: classes,
    htmlFor: fieldId
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "tm-field__label"
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: "tm-textarea"
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    className: "tm-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Planet = __ds_scope.Planet;

__ds_ns.RainbowDivider = __ds_scope.RainbowDivider;

__ds_ns.Star = __ds_scope.Star;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardBody = __ds_scope.CardBody;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
