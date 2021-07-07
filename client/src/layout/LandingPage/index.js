import React, { useState } from "react";
import useInput from "../../components/hook";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Quote from "../../components/Quotes/quotes";
// import useSWR from "swr";
// import fetcher from "../../components/fetcher";
import SearchResults from "../../components/SearchResults";
import axios from "axios";
import { Row } from "antd";

const LandingPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [query, changeHandler, setQuery] = useInput("");
  const [recipes, setRecipes] = useState([]);
  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;

  const getData = async () => {
    const result = await axios.get(BASE_URL);
    setRecipes(result.data.meals);
    console.log(result.data.meals);
    setQuery("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    setSearchValue(query);
  };

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
        <h1 style={{ marginBottom: "30px", fontWeight: "800" }}>
          Find Meals For Your Ingredients
        </h1>
        <div style={{ marginBottom: "30px", fontWeight: "500" }}>
          <Quote />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            type="submit"
            onSubmit={onSubmit}
            autoComplete="off"
            style={{
              display: "flex",
              border: "1px solid black",
              width: "480px",
            }}
          >
            <Input
              type="text"
              value={query}
              onChange={changeHandler}
              placeholder="Enter an meal"
              style={{ border: "none" }}
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
        </div>
        <div style={{ marginTop: "15px" }}>
          <h2 style={{ fontWeight: "700", marginBottom: "35px" }}>
            Your Search Results: &nbsp;{searchValue}
          </h2>
        </div>
        <Row gutter={[24, 24]}>
          {recipes !== [] &&
            Array.isArray(recipes) &&
            recipes.map((recipe, index) => (
              <React.Fragment key={index}>
                <SearchResults recipe={recipe} image={recipe.strMealThumb} />
              </React.Fragment>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
