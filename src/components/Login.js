import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { socket } from "../context/socket";
import { setUser } from "../features/auth/authSlice.js";
import { requestLogin } from "../services/authService.js";
import "./css/login.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    const response = await requestLogin(values);
    if (!response.success) {
      setFieldError("username", response.message);
    } else {
      dispatch(setUser(response.user));
      socket.emit("new user", {
        username: response.user.email,
        userType: response.user.userType,
      });
      navigate("/dashboard");
    }
  };
  const loginvalidationschema = yup.object({
    username: yup.string().email().required("Please enter valid email address"),
    password: yup.string().required("please enter your password"),
  });

  const {
    formik,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
  } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginvalidationschema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <div className="login">
      <h3>Login</h3>
      {touched.username && errors.username ? (
        <div className="error">{errors.username}</div>
      ) : (
        ""
      )}
      <Form className="loginForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Form.Group>
        {touched.password && errors.password ? (
          <div className="error">{errors.password}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="loginbtn">
          Login
        </Button>
        <Form.Group className="mb-3 loginhelper" controlId="formBasicCheckbox">
          <p>
            <a href="" onClick={() => navigate("/forgotpassword")}>
              Forgot Password
            </a>
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
