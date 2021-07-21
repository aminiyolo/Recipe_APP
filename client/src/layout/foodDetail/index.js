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
} from "./style";
import useSWR from "swr";
import fetcher from "../../components/fetcher";
import { withRouter } from "react-router";

const FoodDetail = ({ onCloseModal, foodDetail, history }) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetail.idMeal}`;
  const { data } = useSWR("/api/users/user", fetcher);
  const [detail, setDatail] = useState("");
  const [video, setVideo] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState("");

  let meal;

  const btnStyle = {
    backgroundColor: "#00bffe",
    padding: "2px 4px",
    border: "none",
    borderRadius: "3px",
    outline: "none",
    color: "whitesmoke",
    fontWeight: "550",
    cursor: "pointer",
    marginTop: "10px",
  };

  const addedStyle = {
    backgroundColor: "#1890FF",
    padding: "2px 4px",
    border: "none",
    borderRadius: "3px",
    outline: "none",
    color: "whitesmoke",
    fontWeight: "550",
    cursor: "pointer",
    marginTop: "10px",
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

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
    setDatail(result.data.meals[0].strInstructions);
    setVideo(result.data.meals[0].strYoutube);
    meal = result.data.meals[0];
    addIngredients(meal);
  };

  const onClickVideo = useCallback(() => {
    window.open(`${video}`);
  }, [video]);
  let dataToSubmit = {
    mealId: foodDetail.idMeal,
    mealTitle: foodDetail.strMeal,
    userFrom: data._id,
    mealImage: foodDetail.strMealThumb,
  };
  const onFavorite = useCallback(() => {
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
                    onClick={onFavorite}
                    style={favorite ? addedStyle : btnStyle}
                  >
                    {favorite ? "Already Added" : "Add to Favorite"}
                  </button>
                  <button style={btnStyle} onClick={onClickVideo}>
                    See the Video
                  </button>
                </ButtonContainer>
                <Img src={foodDetail.strMealThumb} alt={foodDetail.strMeal} />
                <Ul>
                  <IngredientsTitle>Ingredients:</IngredientsTitle>
                  <div>
                    {ingredients &&
                      ingredients.map((ingredient, index) => (
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
