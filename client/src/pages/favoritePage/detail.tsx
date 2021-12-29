import { axiosInstance } from "../../config";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Favorite,
  FoodDetail,
  FoodTitle,
  FoodImg,
  Ul,
  Instruction,
  InstructionP,
} from "./style";

interface IDetail {
  strMeal: string;
  strMealThumb: string;
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [foodDetail, setFoodDetail] = useState<IDetail | null>(null);
  const [instruction, setInstruction] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[] | null>(null);

  const addIngredients = useCallback((meal) => {
    const ingredientsContainer = [];
    for (let i = 1; i < 21; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredientsContainer.push(`
        ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}
        `);
      } else break;
    }

    setIngredients(ingredientsContainer);
  }, []);

  const getData = async () => {
    try {
      const res = await axiosInstance.get(URL);
      setInstruction(res.data.meals[0].strInstructions);
      setFoodDetail(res.data.meals[0]);
      addIngredients(res.data.meals[0]);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Favorite>
      {foodDetail && (
        <FoodDetail>
          <div>
            <FoodTitle>{foodDetail.strMeal}</FoodTitle>
            <FoodImg src={foodDetail.strMealThumb} alt={foodDetail.strMeal} />
            <Ul>
              <span>Ingredients:</span>
              <div>
                {ingredients?.map((ingredient, index) => (
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
