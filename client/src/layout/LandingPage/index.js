import React, { useEffect, useState } from "react";
import useInput from "../../components/hook";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Quote from "../../components/Quotes/quotes";
// import useSWR from "swr";
// import fetcher from "../../components/fetcher";
import SearchResults from "../../components/SearchResults";
import axios from "axios";
import { Row } from "antd";
import SearchCategory from "../../components/SearchCategory";
import FoodDetail from "../foodDetail";

const LandingPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [query, changeHandler, setQuery] = useInput("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [foodDetail, setFoodDetail] = useState([]);

  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  const BASE_ALL_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const getData = async () => {
    const result = await axios.get(BASE_URL);
    setRecipes(result.data.meals);
  };

  const getAllData = async () => {
    const result = await axios.get(BASE_ALL_URL);
    setCategories(result.data.categories);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    getData();
    setSearchValue(query);
    setToggle(true);
    setQuery("");
  };

  const onOpenModal = (recipe) => {
    setShowModal(true);
    setFoodDetail(recipe);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

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
        <h1
          style={{ marginBottom: "30px", fontWeight: "800", fontSize: "38px" }}
        >
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
              border: "2px solid #40AAFF",
              borderRadius: "4px",
              width: "480px",
            }}
          >
            <Input
              className="input"
              type="text"
              value={query}
              onChange={changeHandler}
              placeholder="Enter an ingredient.  ex) egg "
              style={{ border: "none" }}
            />
            <div
              style={{
                backgroundColor: "#40AAFF",
                padding: "6px",
                width: "9%",
                margin: 0,
                cursor: "pointer",
              }}
            >
              <SearchOutlined
                style={{
                  width: "100%",
                  height: "100%",
                  color: "white",
                  fontSize: "16px",
                }}
              />
            </div>
          </Form>
        </div>
        <div style={{ marginTop: "15px" }}>
          <h2 style={{ fontWeight: "800", marginBottom: "35px" }}>
            Your Search Results: &nbsp;{searchValue ? `'${searchValue}'` : ""}
          </h2>
        </div>
        <Row gutter={[32, 32]}>
          {recipes !== [] &&
            Array.isArray(recipes) &&
            recipes.map((recipe, index) => (
              <React.Fragment key={index}>
                <SearchResults recipe={recipe} onOpenModal={onOpenModal} />
              </React.Fragment>
            ))}
        </Row>
        <Row gutter={[24, 32]}>
          {!toggle &&
            categories !== [] &&
            categories.map((category, index) => (
              <React.Fragment key={index}>
                <SearchCategory category={category} />
              </React.Fragment>
            ))}
        </Row>
      </div>
      {showModal && (
        <FoodDetail
          show={showModal}
          onCloseModal={onCloseModal}
          foodDetail={foodDetail}
        />
      )}
    </div>
  );
};

export default LandingPage;
