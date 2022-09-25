import { useFormik } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createServiceRequest } from "../services/ServiceRequestUtiility";
import "./css/addlead.css";

function AddServiceRequest() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { email } = useParams();

  const [loading, setLoading] = useState(false);
  const formvalidation = yup.object({
    description: yup.string().required().min(10),
    priority: yup.string().required("please select priority"),
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
      description: "",
      priority: "",
    },
    validationSchema: formvalidation,
    onSubmit: async (values) => {
      setLoading(true);
      values.email = email;
      values.createdBy = user.email;

      const response = await createServiceRequest(values);
      setLoading(false);
      if (!response.success) {
        setFieldError("firstname", response.message);
      } else {
        resetForm();
        toast.success("Serviec Request Added Successful");
      }
    },
  });

  return (
    <div className="AddLead">
      <Form className="AddLeadForm" onSubmit={handleSubmit}>
        <h3>Add New Service Request</h3>

        <Row className="mb-3">
          <Form.Group controlId="formGridPassword">
            <Form.Label>Customer Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
            />
          </Form.Group>
          {touched.description && errors.description ? (
            <span className="error">{errors.description}</span>
          ) : (
            ""
          )}
          <Form.Group controlId="formGridPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Enter description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.priority && errors.priority ? (
            <span className="error">{errors.priority}</span>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formpriority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select one priority</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridPassword">
            <Form.Label>Created By</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Agent Name"
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
            Generate Request
          </Button>
          <Button variant="warning" type="reset" className="resetBtn">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddServiceRequest;
