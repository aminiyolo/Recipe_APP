import React from "react";
import useInput from "../../components/hook";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

const LandingPage = () => {
  const [searchValue, searchHandler] = useInput("");

  return (
    <div
      style={{
        width: "80%",
        height: "100vh",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "70px" }}>
        <h2 style={{ marginBottom: "30px" }}>
          Find Meals For Your Ingredients
        </h2>
        <div style={{ marginBottom: "30px" }}>
          <p>
            A crust eaten in peace is better than a banquet partaken in anxiety.
          </p>
          <p>- Aesop</p>
        </div>
        <Form
          type="submit"
          style={{
            display: "flex",
            border: "1px solid black",
          }}
        >
          <Input
            value={searchValue}
            onChange={searchHandler}
            placeholder="Enter an meal"
            style={{ width: "95%", border: "none" }}
          />
          <div
            style={{
              backgroundColor: "#FDFDFD",
              padding: "6px",
              width: "10%",
              margin: 0,
              cursor: "pointer",
            }}
          >
            <SearchOutlined style={{ width: "100%" }} />
          </div>
        </Form>
        <div style={{ marginTop: "15px" }}>
          <h2>Your Search Results:</h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
