import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Typography } from "antd";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { Loading, LoginContainer, Message } from "./style";

const { Title } = Typography;

const LoginPage = (props) => {
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const { data: DATA } = useSWR("/api/users/user", fetcher);

  if (DATA === undefined) {
    return <Loading>Loading...</Loading>;
  }

  if (DATA?.token) {
    props.history.push("/");
  }

  return (
    <LoginContainer>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          let data = {
            email: values.email,
            password: values.password,
          };
          axios.post("/api/users/login", data).then((response) => {
            if (response.data.success) {
              props.history.push("/");
            } else {
              alert(response.data.msg);
              // window.location.reload();
            }
          });
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div className="app">
              <Title level={2}>Log In</Title>
              <form onSubmit={handleSubmit} style={{ width: "350px" }}>
                <Form.Item required>
                  <Input
                    id="email"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter your email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id="password"
                    prefix={
                      <Icon
                        type="lock"
                        style={{ color: "rgba(0,0,0, 0.25)" }}
                      />
                    }
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label>
                    <Message>{formErrorMessage}</Message>
                  </label>
                )}

                <Form.Item>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ minWidth: "100%" }}
                      onSubmit={handleSubmit}
                    >
                      Log in
                    </Button>
                  </div>
                  Or <Link to="/register">register now!</Link>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
    </LoginContainer>
  );
};
export default withRouter(LoginPage);
