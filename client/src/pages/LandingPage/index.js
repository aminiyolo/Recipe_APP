import React, { useCallback, useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Quote from "../../components/Quotes/quotes";
import SearchResults from "../../components/SearchResults";
import axios from "axios";
import { Row } from "antd";
import SearchCategory from "../../components/SearchCategory";
import FoodDetail from "../foodDetail";
import { LandingContainer, BtnBox, formStyle, btnStyle } from "./style";
import { axiosInstance } from "../../config";

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
      // 선택된 재료의 레시피 가져오기
      const res = await axiosInstance.get(BASE_URL);
      if (res.data.meals) setRecipes(null);
      setRecipes(res.data.meals);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) return;

      getData();
      setSearchValue(query);
      setToggle(true);
      setQuery("");
    },
    [query],
  );

  const onClickCategory = useCallback((category) => {
    // 특정 카테고리 목록 선택 시
    const getDataByCategory = async () => {
      try {
        const res = await axiosInstance.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        );
        setRecipes(res.data.meals);
        setSearchValue(category);
        setToggle(true); // 카테고리 목록 가리기
      } catch (err) {
        alert("정보를 가져오지 못했습니다.");
      }
    };

    getDataByCategory();
  }, []);

  const onOpenModal = useCallback((recipe) => {
    setShowModal(true);
    setFoodDetail(recipe);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickCategoryAll = useCallback(() => {
    // 버튼을 눌러 카테고리 목록 전부 가져오기
    setRecipes([]);
    setToggle(false); // 카테고리 목록 보이게 하기
    setSearchValue("");
    getAllData();
  }, [recipes]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAllData = async () => {
      try {
        // 모든 카테고리 목록 가져오기
        const res = await axiosInstance.get(BASE_ALL_URL);
        setCategories(res.data.categories);
      } catch (err) {
        alert("정보를 가져오지 못했습니다.");
      }
    };

    getAllData();
    return () => {
      source.cancel();
    };
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
              placeholder="Enter an ingredient.  ex) egg, pork, beef ... "
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
          <button onClick={onClickCategoryAll}>See all categories</button>
          {recipes === null && <h2>None result</h2>}
        </div>

        {/* 재료로 만들 수 있는 요리 목록 렌더링 */}
        <Row gutter={[32, 32]}>
          {recipes !== [] &&
            Array.isArray(recipes) &&
            recipes.map((recipe, index) => (
              <React.Fragment key={index}>
                <SearchResults recipe={recipe} onOpenModal={onOpenModal} />
              </React.Fragment>
            ))}
        </Row>

        {/*  모든 카테고리 목록 렌더링 */}
        <Row gutter={[24, 32]}>
          {!toggle &&
            categories !== [] &&
            categories.map((category, index) => (
              <React.Fragment key={index}>
                <SearchCategory
                  category={category}
                  onClickCategory={onClickCategory}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      {/* 레시피 모달 창 렌더링 */}
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
