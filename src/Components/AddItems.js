import React, { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";

/* initial values for item form */
const initialValues = {
  itemName: "",
  location: "",
  price: "",
  description: "",
};

const initialErrors = {
  itemName: "",
  location: "",
  price: "",
  description: "",
};
function AddItem() {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(true);
  const formSchema = yup.object().shape({
    itemName: yup.string().required("add a name"),
    location: yup.string().required("select a location"),
    price: yup.string().required("needs to be in integers"),
    description: yup.string().required("add a description"),
  });
  // handlers for onSubmit and onChange
  const changeHandler = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const postItem = (newItem) => {};
  const submitHandler = () => {
    const newItem = {
      itemName: formValues.itemName,
      location: formValues.location,
      price: formValues.price,
      description: formValues.description,
    };
    postItem(newItem);
    setFormValues(initialValues);
  };
  // event handler
  const change = (event) => {
    const { name, value } = event.target;
    changeHandler(name, value);
  };
  const submit = (event) => {
    event.preventDefault();
    submitHandler();
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formSchema, formValues]);

  return (
    <FormContainer>
      <form onSubmit={submit}>
        <h1>Add an Item</h1>
        <InputContainer>
          <div>{errors.itemName}</div>
          <Input
            type="text"
            name="itemName"
            onChange={change}
            placeholder="name"
            value={formValues.itemName}
          />

          <div>{errors.location}</div>
          <Select name="location" onChange={change} value={formValues.location}>
            <option value="">select location</option>
            <option value="Busia">Busia</option>
            <option value="Malaba">Malaba</option>
            <option value="Taveta">Taveta</option>
            <option value="Katuna">Katuna</option>
            <option value="Loitokitok">Loitokitok</option>
            <option value="Mutukula">select</option>
            <option value="Namanga">Namanga</option>
            <option value="Sirare/Isebania">Sirare/Isebania</option>
          </Select>

          <div>{errors.price}</div>
          <Input
            type="text"
            name="price"
            onChange={change}
            placeholder="price"
            value={formValues.price}
          />

          <div>{errors.description}</div>
          <Input
            type="text"
            name="description"
            onChange={change}
            placeholder="description"
            value={formValues.description}
          />
        </InputContainer>
        <Button disabled={disabled}>Add Item</Button>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  border: 1px solid darkgrey;
  border-radius: 5px;
  color: #0e2923;
  margin: 3rem 16rem;
  padding: 2rem;
  text-align: center;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4rem;
`;
const Input = styled.input`
  border: 2px solid darkgrey;
  border-radius: 3px;
  font-size: 1em;
  margin: 1rem 4rem;
  padding: 14px;
`;

const Select = styled.select`
  border: 2px solid darkgrey;
  border-radius: 3px;
  font-size: 1em;
  margin: 1rem 4rem;
  padding: 14px;
`;
const Button = styled.button`
  background-color: #0e2923;
  border: 0;
  border-radius: 5px;
  color: white;
  height: 3rem;
  letter-spacing: 0.175em;
  line-height: 3rem;
  margin: 1rem auto;
  padding: 0 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`;

export default AddItem;
