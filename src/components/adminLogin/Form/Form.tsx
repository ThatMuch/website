import React from "react";
import "./style.scss";

const Form = ({
  pseudo,
  setPseudo,
  pass,
  setPass,
  onSubmit,
  loading,
  isFetching,
  error,
}) => {
  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        disabled={loading}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={onSubmit} disabled={loading || isFetching}>
        {loading ? "Connexion..." : "Se connecter de suite"}
      </button>
    </div>
  );
};

export default Form;