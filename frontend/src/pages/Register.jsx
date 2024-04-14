import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";


import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    fullname: undefined,
    email: undefined,
    designation: undefined,
    role: undefined,
    id: undefined,
    contact: undefined,
    username: undefined,
    password: undefined,
    retypePassword: undefined,
    
  });

  // console.log(credentials)

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !credentials.fullname ||
      !credentials.email ||
      !credentials.designation ||
      !credentials.role ||
      !credentials.id ||
      !credentials.contact ||
      !credentials.username ||
      !credentials.password ||
      !credentials.retypePassword
      
    ){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
  }else if(!credentials.email.includes("@")){
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid email!",
    });
  }

    try {
      const res = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");

      if (!res.ok) alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col md="20" className="m-auto">
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    {/* <label for="userType">Select User Type :</label> */}
                    <select
                      name="role"
                      id="role"
                      onChange={handleChange}
                      required
                      className="select"
                    >
                      <option value="" disabled selected>
                        Select User Type
                      </option>
                      <option value="admin">Admin</option>
                      <option value="directorgeneral">Director General</option>
                      <option value="portauthority">Port Authority</option>
                      <option value="shippinglineagent">
                        Shipping Line Agent{" "}
                      </option>
                      <option value="customsofficer">Customs Officer</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      id="fullname"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Designation"
                      required
                      id="designation"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Role"
                      required
                      id="role"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="ID"
                      required
                      id="id"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Contact"
                      required
                      id="contact"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="User Name"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Re-Type Password"
                      required
                      id="retypePassword"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    onClick={handleClick}
                  >
                    Create Account
                  </Button>
                </Form>
                
              </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Register;
