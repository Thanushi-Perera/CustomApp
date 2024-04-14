import React, { useState, useContext } from "react";
import Swal from "sweetalert2";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log(result);
      if (!res.ok) throw new Error(result.message);

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      Swal.fire({
        title: "Please Wait",
        html: "We are logging you in.",
        allowOutsideClick: false,
      });
      console.log(result.role);
      const user = result.role;
      if (user === "user") {
        navigate("/");
      } else if (user === "admin") {
        navigate("/register");
      } else {
        navigate(`/upload/${user}`);
      }
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      // alert(err.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col md="8" className="m-auto">
            <div className="login__container d-flex justify-content=between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="email"
                      required
                      id="email"
                      name="email"
                      onChange={handleChange}
                      label="email"
                      aria-labelledby="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="password"
                      required
                      id="password"
                      name="password"
                      onChange={handleChange}
                      label="password"
                      aria-labelledby="password"
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    onClick={handleClick}
                    name="submit"
                    label="submit"
                  >
                    {" "}
                    Login
                  </Button>
                </Form>
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Login;
