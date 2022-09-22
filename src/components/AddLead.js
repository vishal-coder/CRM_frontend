import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { string } from "yup";
import { createLead } from "../services/LeadService";
import "./css/addlead.css";

function AddLead() {
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const formvalidation = yup.object({
    firstname: string().required().min(2),
    lastname: string().required().min(2),
    phone: string().required().min(10).max(10),
    email: string().email().required(),
    source: string().required().min(2),
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
      email: "",
      source: "",
    },
    validationSchema: formvalidation,
    onSubmit: async (values) => {
      console.log(user);
      setLoading(true);
      values.createdBy = user.email;
      values.category = "Lead";

      const response = await createLead(values);
      setLoading(false);
      if (!response.success) {
        setFieldError("firstname", response.message);
      } else {
        resetForm();
        toast.success("Lead Added Successful");
      }
    },
  });

  return (
    <div className="AddLead">
      <Form className="AddLeadForm" onSubmit={handleSubmit}>
        <h3>Add New Lead</h3>
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
          {touched.email && errors.email ? (
            <span className="error">{errors.email}</span>
          ) : (
            ""
          )}
          <Form.Group controlId="formGridPassword">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.source && errors.source ? (
            <span className="error">{errors.source}</span>
          ) : (
            ""
          )}
          <Form.Group controlId="formGridPassword">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Source"
              name="source"
              value={values.source}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Form.Group controlId="formGridPassword">
            <Form.Label>Created By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Source"
              name="CreatedBY"
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
            />
          </Form.Group>
        </Row>

        <div className="AddLeadbtngrp">
          <Button
            variant="primary"
            type="submit"
            className="AddLeadBtn"
            disabled={loading}
          >
            Create Lead
          </Button>
          <Button variant="warning" type="submit" className="resetBtn">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddLead;
