import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, values, status }) => {

    const [user, setUser] = useState([]);


    useEffect(() => {
        status && setUser(users => [...users, status]);
    }, [status]);

  return (
    <div className="Form">
        <h1 className="Form-Header">User On-Boarding</h1>
        <Form>
            <div className="Input-Boxes">
                <Field type="text" name="username" placeholder="Name" value={values.username}/>
                <Field type="text" name="email" placeholder="Email" value={values.email}/>
                <Field type="text" name="password" placeholder="Password" value={values.password}/>
            </div>
            <div className="Check-Box">
                <label className="Checkbox-Label">
                    Terms of Service
                    <Field className="Checkbox" type="checkbox" name="TermsOfService" value={values.TermsOfService} />
                </label>
            </div>
            <div>
                <button className="button" type="submit">Submit</button>
            </div>
            {touched.username && errors.username && <p>{errors.username}</p>}
            {touched.email && errors.email && <p>{errors.email}</p>}
            {touched.password && errors.password && <p>{errors.password}</p>}
        </Form>
        {user.map(user => (
            <div className="note">
                <h1>Username: {user.username} </h1>
                <h1>Email: {user.email} </h1>
            </div>
        ))}
    </div>
  );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ user }) {
        return {
            username: user || "",
            email: "",
            password: "",
            TermsOfService: false,
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required("Please fill the username box in!"),
        email: Yup.string().required("Please fill the email box in!"),
        password: Yup.string().required("Please fill the password box in!"),
        TermsOfService: Yup.bool()
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitting form:", values);

        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("Success:", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log("Error:", err.response);
        });
    }
})(UserForm);

export default FormikUserForm;