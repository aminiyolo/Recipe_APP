import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import dayjs from "dayjs";
import { withRouter } from "react-router-dom";
import { RegisterContainer } from "./style";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { Loading } from "../LoginPage/style";
import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterPage = (props) => {
  const { data: DATA } = useSWR("/api/users/user", fetcher);

  if (DATA === undefined) {
    return <Loading>Loading...</Loading>;
  }

  if (DATA?.token) {
    props.history.push("/");
  }

  return (
    <RegisterContainer>
      <Formik
        initialValues={{
          email: "",
          lastName: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={(values) => {
          let data = {
            email: values.email,
            password: values.password,
            name: values.name,
            image: `http://gravatar.com/avatar/${dayjs(
              new Date()
            ).unix()}?d=identicon`,
          };

          const register = async () => {
            try {
              const res = await axios.post("/api/users/register", data);
              if (!res.data.success) {
                alert(res.data.msg);
              } else {
                alert("Congratulations! Register was successful");
                props.history.push("/login");
              }
            } catch (err) {
              alert(err);
            }
          };

          register();
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
              <h2>Sign up</h2>
              <Form
                style={{ minWidth: "375px" }}
                {...formItemLayout}
                onSubmit={handleSubmit}
              >
                <Form.Item required label="Name">
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                </Form.Item>

                <Form.Item
                  required
                  label="Email"
                  hasFeedback
                  validateStatus={
                    errors.email && touched.email ? "error" : "success"
                  }
                >
                  <Input
                    id="email"
                    placeholder="Enter your Email"
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

                <Form.Item
                  required
                  label="Password"
                  hasFeedback
                  validateStatus={
                    errors.password && touched.password ? "error" : "success"
                  }
                >
                  <Input
                    id="password"
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

                <Form.Item required label="Confirm" hasFeedback>
                  <Input
                    id="confirmPassword"
                    placeholder="Enter your confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button onClick={handleSubmit} type="primary">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Formik>
    </RegisterContainer>
  );
};

export default withRouter(RegisterPage);
