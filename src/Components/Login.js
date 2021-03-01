import React, { useState } from 'react';

const initialFormValues = {
    username: '',
    password: '',
}
export default function Login(props){
    const [ formValues, setFormValues ] = useState(initialFormValues);

    const changeHandler = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }
    const submitHandler = () => {
        setFormValues(initialFormValues)
    }
    const onChange = (evt) => {
        const { name, value } = evt.target;
        changeHandler(name, value);
    }
    const onSubmit = (evt) => {
        evt.preventDefault()
        submitHandler()
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    name='username' 
                    placeholder='username' 
                    value ={formValues.username} 
                    onChange={onChange}/>
                <input 
                    type='text' 
                    name='password' 
                    placeholder='password'
                    value ={formValues.password} 
                    onChange={onChange}/>
                <button>Submit</button>
            </form>
        </div>
    )
}