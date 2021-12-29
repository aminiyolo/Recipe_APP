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
import { useHistory } from "react-router";
import VideoPlayer from "../../components/VideoPlayer";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";

export type DetailType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface IProps {
  onCloseModal: () => void;
  foodDetail: DetailType;
}

const FoodDetail: React.VFC<IProps> = ({ onCloseModal, foodDetail }) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetail.idMeal}`;
  const history = useHistory();
  const { currentUser } = useSelector((state: RootState) => state);
  const [detail, setDatail] = useState(null);
  const [video, setVideo] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState<string[] | null>(null);
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
      } else break;
    }
    setIngredients(ingredientsContainer);
  }, []);

  const onClickVideo = useCallback(() => {
    setPlayVideo(true);
  }, []);

  const onCloseVideo = useCallback(() => {
    setPlayVideo(false);
  }, []);

  const setData = useCallback(
    () => ({
      mealId: foodDetail.idMeal,
      mealTitle: foodDetail.strMeal,
      userFrom: currentUser?._id,
      mealImage: foodDetail.strMealThumb,
    }),
    [],
  );

  const favoriteHandler = useCallback(() => {
    if (!currentUser) {
      // 비로그인 유저일 시
      const res = window.confirm("You need to login. Would you like to login?");
      res && history.push("/login");
      return;
    }

    const addFavorite = async () => {
      try {
        await axiosInstance.post("/api/favorite/addToFavorite", setData());
        setFavorite(true);
      } catch (err) {
        alert("Try again a few seconds later");
      }
    };

    const remove = async () => {
      try {
        await axiosInstance.post("/api/favorite/removeFromFavorite", setData());
        setFavorite(false);
      } catch (err) {
        alert("Try again a few seconds later");
      }
    };

    favorite ? remove() : addFavorite();
  }, [favorite]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(URL);
        setDatail(res.data.meals[0].strInstructions);
        setVideo(res.data.meals[0].strYoutube);
        addIngredients(res.data.meals[0]);
      } catch (err) {
        alert("Failed to get a data, plz try again");
      }
    };

    const checkIfFavorited = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/favorite/favorited",
          setData(),
        );
        setFavorite(res.data);
      } catch (err) {
        alert("Try again a few seconds later");
      }
    };

    getData();
    checkIfFavorited();
  }, []);

  if (detail) {
    return (
      <CreateModal onClick={onCloseModal}>
        {playVideo && ( // when a video button clicked
          <VideoPlayer
            onCloseVideo={onCloseVideo}
            url={video?.slice(video.indexOf("=") + 1)}
          />
        )}
        {!playVideo && (
          <div onClick={stopPropagation}>
            <CloseModalButton onClick={onCloseModal}>
              <span>&times;</span>
            </CloseModalButton>
            <div className="detailBox">
              {
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
              }
            </div>
          </div>
        )}
      </CreateModal>
    );
  } else {
    return <div />;
  }
};
export default FoodDetail;
