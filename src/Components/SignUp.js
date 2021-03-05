import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import schema from "./validation/signupSchema";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const initialFormValues = {
    // city: "",
    // country: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    primaryemail: "",
    // primaryLanguage: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const { push } = useHistory();

  //   const { push } = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://ptierie-africanmarketplace.herokuapp.com/createnewuser",
        formValues
      )
      .then((res) => {
        console.log(res.data, "data from post of sign up");
        setFormValues(initialFormValues);
        push("/login");
      })
      .catch((err) => {
        console.log(err, "error submitting in signup");
        setFormValues(initialFormValues);
      });

    // axios.post(
    //   "https://ptierie-africanmarketplace.herokuapp.com/createnewuser",
    //   `grant_type=password&username=${formValues.username}&password=${formValues.password}`,
    //   {
    //     headers: {
    //       // btoa is converting our client id/client secret into base64
    //       Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="signup-form">
      <h2>Sign up</h2>
      <h3>Create a African Marketplace account</h3>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              value={formValues.username}
              onChange={onChange}
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              value={formValues.password}
              onChange={onChange}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div>
            <input
              value={formValues.firstName}
              onChange={onChange}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              value={formValues.lastName}
              onChange={onChange}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              value={formValues.primaryemail}
              onChange={onChange}
              name="primaryemail"
              type="text"
              placeholder="primaryemail"
            />
          </div>

          <button disabled={disabled}>Submit</button>
          <div>
            {formErrors.userName}
            {formErrors.password}
            {formErrors.firstName}
            {formErrors.lastName}
            {formErrors.primaryemail}
          </div>
        </form>
      </div>
    </div>
  );
}
