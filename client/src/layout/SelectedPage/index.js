import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Row } from "antd";
import SearchResults from "../../components/SearchResults";
import FoodDetail from "../foodDetail";
import { SelectedContainer, Selected } from "./style";

const SelectedPage = () => {
  const { category } = useParams();
  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [foodDetail, setFoodDetail] = useState([]);

  const getData = async () => {
    try {
      const result = await axios.get(BASE_URL);
      setRecipes(result.data.meals);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onOpenModal = useCallback((recipe) => {
    setShowModal(true);
    setFoodDetail(recipe);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Selected>
      <h1>{`${category} Category Page`}</h1>
      <hr />
      <SelectedContainer>
        <Row gutter={[24, 32]}>
          {recipes !== [] &&
            Array.isArray(recipes) &&
            recipes.map((meal, index) => (
              <React.Fragment key={index}>
                <SearchResults recipe={meal} onOpenModal={onOpenModal} />
              </React.Fragment>
            ))}
        </Row>
      </SelectedContainer>
      {showModal && (
        <FoodDetail
          show={showModal}
          onCloseModal={onCloseModal}
          foodDetail={foodDetail}
        />
      )}
    </Selected>
  );
};

export default SelectedPage;
