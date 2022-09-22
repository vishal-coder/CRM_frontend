import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { string } from "yup";
import { submitRegistration } from "../services/authService";
import "./css/register.css";

function AddUserPage() {
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const formvalidation = yup.object({
    firstname: string().required().min(2),
    lastname: string().required().min(2),
    phone: string().required().min(10).max(10),
    username: string().email().required(),
  });

  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      username: "",
    },
    validationSchema: formvalidation,
    onSubmit: async (values) => {
      setLoading(true);
      values.userType = "Employee";
      values.parent = user.email;
      if (user.userType === "Admin") {
        values.userType = "Manager";
      }
      const response = await submitRegistration(values);
      setLoading(false);
      if (!response.success) {
        setFieldError("firstname", response.message);
      } else {
        resetForm();
        toast.success("User Added Successful");
      }
    },
  });

  return (
    <div className="register">
      <Form className="registerForm" onSubmit={handleSubmit}>
        <h3>Add New user</h3>
        {touched.firstname && errors.firstname ? (
          <div className="error">{errors.firstname}</div>
        ) : (
          ""
        )}

        <Row className="mb-3">
          <Form.Group controlId="formGridEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.lastname && errors.lastname ? (
            <div className="error">{errors.lastname}</div>
          ) : (
            ""
          )}
          <Form.Group controlId="formGridLastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          {touched.phone && errors.phone ? (
            <span className="error">{errors.phone}</span>
          ) : (
            ""
          )}

          <Form.Group controlId="formGridEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.username && errors.username ? (
            <span className="error">{errors.username}</span>
          ) : (
            ""
          )}
          <Form.Group controlId="formGridPassword">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </Row>

        <div className="registerbtngrp">
          <Button
            variant="primary"
            type="submit"
            className="registerBtn"
            disabled={loading}
          >
            Create User
          </Button>
          <Button variant="warning" type="submit" className="resetBtn">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddUserPage;
