import React, { useState, useRef } from "react";
import { login } from "../api/models/karyawan";
import Alert from "../components/Alert";
import { useKaryawanContext } from "../context/karyawanContext";
import Spinner from "../components/Spinner";

const Login = () => {
  //second : init variable
  //first: target variable
  //setfirst: function that can change the variable
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [hideBox, setHideBox] = useState(true);
  let formData = {
    username: "",
    password: "",
  };

  const [inputData, setInputData] = useState(formData);

  const username = useRef();
  const password = useRef();

  const { loggedIn } = useKaryawanContext();

  const hideBoxOnClick = () => {
    setHideBox(!hideBox);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(username.current.value);
    formData = {
      username: username.current.value,
      password: password.current.value,
    };
    setIsLoading(true);
    try {
      const response = await login(formData);
      loggedIn(response.data.data.token);
    } catch (error) {
      setErrMsg(error.response?.data?.message);
    }

    setIsLoading(false);
  };
  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <span className="app-brand-logo demo"></span>
                  <span className="app-brand-text demo text-body fw-bolder">
                    Renew Store
                  </span>
                </div>
                {isLoading && <Spinner />}
                {errMsg !== null && <Alert msg={errMsg} color="danger" />}
                <h4 className="mb-2">Selamat datang di Renew Store!</h4>
                <p className="mb-4">Silahkan login terlebih dahulu</p>

                <form
                  id="formAuthentication"
                  className="mb-3"
                  onSubmit={formSubmitHandler}
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email-username"
                      placeholder="Masukkan username anda"
                      autoFocus
                      ref={username}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a message in the textarea.
                    </div>
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type={hideBox ? "password" : "text"}
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        required
                        ref={password}
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i
                          className={"bx bx-" + (hideBox ? "hide" : "show")}
                          onClick={hideBoxOnClick}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
