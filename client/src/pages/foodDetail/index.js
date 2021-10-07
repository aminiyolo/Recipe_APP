import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
import fetcher from "../../hooks/useInput";
import { useHistory } from "react-router";
import VideoPlayer from "../../components/VideoPlayer";

const FoodDetail = ({ onCloseModal, foodDetail }) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetail.idMeal}`;
  const history = useHistory();
  const { data } = useSWR("/api/users/user", fetcher);
  const [detail, setDatail] = useState(null);
  const [video, setVideo] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

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

  const onClickVideo = useCallback(() => {
    setPlayVideo(true);
  }, [video]);

  const onCloseVideo = () => {
    setPlayVideo(false);
  };

  const favoriteHandler = useCallback(() => {
    if (data.isAuth === false) {
      // 비로그인 유저일 시
      let value = window.confirm("You need to login. Would you like to login?");
      if (value) history.push("/login");
      return;
    }

    if (!favorite) {
      const addFavorite = async () => {
        try {
          await axios.post("/api/favorite/addToFavorite", dataToSubmit);
          setFavorite(true);
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };

      addFavorite();
    } else if (favorite) {
      const remove = async () => {
        try {
          await axios.post("/api/favorite/removeFromFavorite", dataToSubmit);
          setFavorite(false);
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };
      remove();
    }
  }, [favorite]);

  let dataToSubmit = {
    mealId: foodDetail.idMeal,
    mealTitle: foodDetail.strMeal,
    userFrom: data?._id,
    mealImage: foodDetail.strMealThumb,
  };

  useEffect(() => {
    getData();
    const checkIfFavorited = async () => {
      try {
        const res = await axios.post("/api/favorite/favorited", dataToSubmit);
        setFavorite(res.data);
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
      }
    };

    checkIfFavorited();
  }, []);

  if (detail) {
    return (
      <CreateModal onClick={onCloseModal}>
        {playVideo && ( // when a video button clicked
          <VideoPlayer
            onCloseVideo={onCloseVideo}
            url={video.slice(video.indexOf("=") + 1)}
          />
        )}
        {!playVideo && (
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
        )}
      </CreateModal>
    );
  } else {
    return <div></div>;
  }
};
export default FoodDetail;
