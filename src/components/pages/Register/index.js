import React, { useState, useEffect } from "react";
import CustomButton from "../../atom/Button";
import InputText from "../../atom/InputText";
import NavBar from "../../molecules/NavigationBar";
import firebase from "../../../config/Firebase";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");

  let history = useHistory();

  const handleSubmit = () => {
    const data = {
      email: email,
      fullName: fullName,
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);

        const userId = userCredential.user.uid;
        //Save to realtime database
        firebase
          .database()
          .ref("users/" + userId)
          .set({ data });

        setFullname("");
        setPassword("");
        setEmail("");

        //Redirect to Login
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="container-center">

      <h3>Register User Baru</h3>

      <p>Nama Lengkap</p>
      <InputText
        class="form-control"
        placeholder="Masukkan Nama Lengkap Anda"
        value={fullName}
        onChange={(event) => setFullname(event.target.value)}
      />
      <br />

      <p>Email</p>
      <InputText
        class="form-control"
        placeholder="Masukkan Email Anda"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />

      <p>Password</p>
      <InputText
        class="form-control"
        placeholder="Masukkan Kata Sandi Anda"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />

      <CustomButton onClick={handleSubmit} labelButton="Register" className="btn btn-primary" />
    </div>
  );
};

export default RegisterPage;
