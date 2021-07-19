import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import {
  Favorite,
  FoodDetail,
  FoodTitle,
  FoodImg,
  Ul,
  Instruction,
  InstructionP,
} from "./style";

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
    <Favorite>
      {foodDetail !== [] && (
        <FoodDetail>
          <div>
            <FoodTitle>{foodDetail.strMeal}</FoodTitle>
            <FoodImg src={foodDetail.strMealThumb} alt={foodDetail.strMeal} />
            <Ul>
              <span>Ingredients:</span>
              <div>
                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </div>
            </Ul>
            <Instruction>Instructions:</Instruction>
            {instruction && <InstructionP>{instruction}</InstructionP>}
          </div>
        </FoodDetail>
      )}
    </Favorite>
  );
};

export default Detail;
