import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Row } from "antd";
import SearchResults from "../../components/SearchResults";
import FoodDetail from "../foodDetail";

const SelectedPage = () => {
  const { category } = useParams();
  const BASE_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [foodDetail, setFoodDetail] = useState([]);

  const getData = async () => {
    const result = await axios.get(BASE_URL);
    setRecipes(result.data.meals);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = (recipe) => {
    setShowModal(true);
    setFoodDetail(recipe);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ marginTop: "70px" }}>
      <h1
        style={{ textAlign: "center", color: "#40AAFF" }}
      >{`${category} Category Page`}</h1>
      <hr />
      <div
        style={{
          width: "80%",
          height: "100vh",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        <Row gutter={[24, 32]}>
          {recipes !== [] &&
            Array.isArray(recipes) &&
            recipes.map((meal, index) => (
              <React.Fragment key={index}>
                <SearchResults recipe={meal} onOpenModal={onOpenModal} />
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

export default SelectedPage;
