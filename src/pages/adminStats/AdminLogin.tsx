import React, { useState } from "react";
import { useFetchFirebase } from "../../hooks/use-firebase";
import Title from "../../components/AdminLogin/Title/Title";
import Form from "../../components/AdminLogin/Form/Form";

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const AdminLogin = ({ onLoginSuccess }) => {
  const [pseudo, setPseudo] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: admins, isLoading: isFetching } = useFetchFirebase("admin");

  const handleLogin = async () => {
    if (!admins) return;

    setLoading(true);
    setError("");

    const hashedPass = await hashPassword(pass);
    //console.log(hashedPass);
    const match = admins.find(
      (admin) => admin.pseudo === pseudo && admin.pass === hashedPass
    );

    if (match) {
      sessionStorage.setItem("isAdmin", "true");
      onLoginSuccess();
    } else {
      setError("Identifiants incorrects");
    }

    setLoading(false);
  };

  return (
    <div className="bg-form">
      <div className="container-fluid z-2 position-relative">
        <Title />
        <Form
          pseudo={pseudo}
          setPseudo={setPseudo}
          pass={pass}
          setPass={setPass}
          onSubmit={handleLogin}
          loading={loading}
          isFetching={isFetching}
          error={error}
        />
      </div>
      <div className="d-flex justify-content-center p-2 bg-dark mt-5">
        <span className="uppercase">thatmuch</span>
      </div>
    </div>
  );
};

export default AdminLogin;