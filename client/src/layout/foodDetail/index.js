import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  CreateModal,
  CloseModalButton,
  ButtonContainer,
  Img,
  IngredientsTitle,
  IngredientsP,
  Detail,
  Ul,
  normal,
  added,
} from "./style";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { withRouter } from "react-router";

const FoodDetail = ({ onCloseModal, foodDetail, history }) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetail.idMeal}`;
  const { data } = useSWR("/api/users/user", fetcher);
  const [detail, setDatail] = useState(null);
  const [video, setVideo] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState(null);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  let meal;
  const getData = async () => {
    try {
      const res = await axios.get(URL);
      setDatail(res.data.meals[0].strInstructions);
      setVideo(res.data.meals[0].strYoutube);
      meal = res.data.meals[0];
      addIngredients(meal);
    } catch (err) {
      alert("정보를 가져오지 못했습니다.");
    }
  };

  const addIngredients = useCallback((meal) => {
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
  }, []);

  const onClickVideo = useCallback(() => {
    window.open(`${video}`);
  }, [video]);

  let dataToSubmit = {
    mealId: foodDetail.idMeal,
    mealTitle: foodDetail.strMeal,
    userFrom: data._id,
    mealImage: foodDetail.strMealThumb,
  };

  const favoriteHandler = useCallback(() => {
    if (data.isAuth === false) {
      let value = window.confirm("You need to login. Would you like to login?");
      if (value) {
        history.push("/login");
      }
      return;
    }
    if (!favorite) {
      axios
        .post("/api/favorite/addToFavorite", dataToSubmit)
        .then((response) => {
          if (response.data.success) setFavorite(true);
        });
    } else if (favorite) {
      axios
        .post("/api/favorite/removeFromFavorite", dataToSubmit)
        .then((response) => {
          if (response.data.success) setFavorite(false);
        });
    }
  }, [favorite]);

  useEffect(() => {
    getData();
    axios.post("/api/favorite/favorited", dataToSubmit).then((response) => {
      if (response.data.success) setFavorite(response.data.favorited);
    });
  }, []);

  if (detail) {
    return (
      <CreateModal onClick={onCloseModal}>
        <div onClick={stopPropagation}>
          <CloseModalButton onClick={onCloseModal}>
            <span>&times;</span>
          </CloseModalButton>
          <div className="detailBox">
            {foodDetail !== [] && (
              <div>
                <h1 className="foodName">{foodDetail.strMeal}</h1>
                <ButtonContainer>
                  <button
                    onClick={favoriteHandler}
                    style={favorite ? added : normal}
                  >
                    {favorite ? "Already Added" : "Add to Favorite"}
                  </button>
                  <button style={normal} onClick={onClickVideo}>
                    See the Video
                  </button>
                </ButtonContainer>
                <Img src={foodDetail.strMealThumb} alt={foodDetail.strMeal} />
                <Ul>
                  <IngredientsTitle>Ingredients:</IngredientsTitle>
                  <div>
                    {ingredients?.map((ingredient, index) => (
                      <li style={{ fontSize: "14px" }} key={index}>
                        {ingredient}
                      </li>
                    ))}
                  </div>
                </Ul>
                <IngredientsP>Instructions:</IngredientsP>
                {detail && <Detail>{detail}</Detail>}
              </div>
            )}
          </div>
        </div>
      </CreateModal>
    );
  } else {
    return <div></div>;
  }
};

export default withRouter(FoodDetail);
