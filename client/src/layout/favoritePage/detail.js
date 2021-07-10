import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";

const Detail = () => {
  const { id } = useParams();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [foodDetail, setFoodDetail] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");

  let meal;

  function addIngredients(meal) {
    const ingredientsContainer = [];
    for (let i = 1; i < 21; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredientsContainer.push(`
        ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}
        `);
      } else {
        break;
      }
    }
    setIngredients(ingredientsContainer);
  }

  const getData = async () => {
    const result = await axios.get(URL);
    setInstruction(result.data.meals[0].strInstructions);
    setFoodDetail(result.data.meals[0]);
    meal = result.data.meals[0];
    addIngredients(meal);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: "80px auto", width: "80%" }}>
      {foodDetail !== [] && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <h1 style={{ color: "black", fontWeight: "800" }}>
              {foodDetail.strMeal}
            </h1>
            <img
              style={{
                width: "650px",
                height: "450px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              src={foodDetail.strMealThumb}
              alt={foodDetail.strMeal}
            />
            <ul
              style={{
                listStyle: "none",
                padding: "0",
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "650",
                }}
              >
                Ingredients:
              </span>
              <div>
                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <li style={{ fontSize: "14px" }} key={index}>
                      {ingredient}
                    </li>
                  ))}
              </div>
            </ul>
            <p
              style={{
                color: "black",
                marginBottom: "3px",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Instructions:
            </p>
            {instruction && (
              <p
                style={{
                  color: "black",
                  fontSize: "16px",
                }}
              >
                {instruction}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
