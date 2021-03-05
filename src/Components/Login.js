import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import * as yup from "yup";
import axios from "axios";

//ptierie-africanmarketplace.herokuapp.com/

const initialFormValues = {
  username: "",
  password: "",
};
const intitialErrors = {
  username: "",
  password: "",
};
export default function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(intitialErrors);
  const [disabled, setDisabled] = useState(true);
  const { push } = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required("must have a username"),
    password: yup.string().required("must have a password"),
  });
  const changeHandler = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
    setFormValues({ ...formValues, [name]: value });
  };
  const onChange = (evt) => {
    const { name, value } = evt.target;
    changeHandler(name, value);
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    setFormValues(initialFormValues);

    axios
      .post(
        "https://ptierie-africanmarketplace.herokuapp.com/login",
        `grant_type=password&username=${formValues.username}&password=${formValues.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.table(res.data, "data from post of login");
        window.localStorage.setItem("token", res.data.access_token);
        setFormValues(initialFormValues);
        push("/list");
      })
      .catch((err) => {
        console.log(err, "error submitting in signup");
        setFormValues(initialFormValues);
      });
  };
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [schema, formValues]);
  return (
    <FormContianer>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <InputContianer>
          <ErrorsContainer>{errors.username}</ErrorsContainer>
          <Input
            type="text"
            name="username"
            placeholder="username"
            value={formValues.username}
            onChange={onChange}
          />
          <ErrorsContainer>{errors.password}</ErrorsContainer>
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={formValues.password}
            onChange={onChange}
          />
        </InputContianer>
        <ButtonContaitner>
          <Button disabled={disabled}>Next</Button>
          <Link
            to="./signup"
            style={{ color: "white", textDecoration: "none" }}
          >
            Create an Account
          </Link>
        </ButtonContaitner>
      </form>
    </FormContianer>
  );
}
// Media breakpoints
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
// Media queries
const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
// Stylization start here using styled-component
const FormContianer = styled.div`
  border: 1px solid darkgrey;
  border-radius: 5px;
  box-shadow: 1px 1px 1px darkgray;
  color: #0e2923;
  margin: 2rem auto 0 auto;
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  @media ${device.mobileS} {
    width: 70%;
  }
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.laptop} {
    width: 40%;
  }
  @media ${device.desktopL} {
    width: 30%;
  }
`;
const InputContianer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 1rem;
`;
const Input = styled.input`
  border: 2px solid darkgrey;
  border-radius: 3px;
  font-size: 1em;
  margin: 1rem 0;
  padding: 14px;
`;
const ButtonContaitner = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Button = styled.button`
  background-color: #ed4933;
  border: 0;
  border-radius: 5px;
  color: white;
  height: 3rem;
  letter-spacing: 0.175em;
  line-height: 3rem;
  margin: 1rem auto;
  padding: 0 2rem;
  text-decoration: none;
  text-transform: uppercase;
  width: 30%;
  &:disabled {
    color: black;
    background-color: white;
    border: 2px solid black;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.5;
    transition: all 0.5s ease-out;
  }
`;
const ErrorsContainer = styled.div`
  color: red;
  text-align: left;
`;
