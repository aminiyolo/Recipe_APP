import React, { useCallback, useEffect, useState } from "react";
import useInput from "../../components/hook";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Quote from "../../components/Quotes/quotes";
import SearchResults from "../../components/SearchResults";
import axios from "axios";
import { Row } from "antd";
import SearchCategory from "../../components/SearchCategory";
import FoodDetail from "../foodDetail";
import { LandingContainer, BtnBox, formStyle, btnStyle  } from "./style";

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
    try {
      const res = await axios.get(BASE_URL);
      setRecipes(res.data.meals);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  const getAllData = async () => {
    try {
      const res = await axios.get(BASE_ALL_URL);
      setCategories(res.data.categories);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) {
        return;
      }
      getData();
      setSearchValue(query);
      setToggle(true);
      setQuery("");
    },
    [query, setQuery]
  );

  const onOpenModal = useCallback((recipe) => {
    setShowModal(true);
    setFoodDetail(recipe);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <LandingContainer>
      <div className="Landing">
        <h1>Find Meals For Your Ingredients</h1>
        <div className="quote">
          <Quote />
        </div>
        <div className="formBox">
          <Form
            type="submit"
            onSubmit={onSubmit}
            autoComplete="off"
            style={formStyle}
          >
            <Input
              className="input"
              type="text"
              value={query}
              onChange={changeHandler}
              placeholder="Enter an ingredient.  ex) egg "
            />
            <BtnBox onClick={onSubmit}>
              <SearchOutlined style={btnStyle} />
            </BtnBox>
          </Form>
        </div>
        <div className="results">
          <h2>
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
    </LandingContainer>
  );
};

export default LandingPage;
