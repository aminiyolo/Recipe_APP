import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { Popover } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Detail, Button, Loading } from "./style";
import { useSelector } from "react-redux";

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState(null);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  let userFrom;
  let dataToSubmit;

  if (user) {
    userFrom = user._id;
  }

  dataToSubmit = {
    userFrom,
  };

  useEffect(() => {
    if (user) {
      const getData = async () => {
        try {
          const res = await axios.post(
            "/api/favorite/FavoritedMeal",
            dataToSubmit
          );
          setFavoriteList(res.data);
        } catch (err) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };

      getData();
    } else {
      alert("You need to login");
      history.push("/");
    }
  }, []);

  const RenderList = favoriteList?.map((favoriteMeal, index) => {
    const content = (
      <div>
        {favoriteMeal.mealImage ? (
          <img
            style={{ width: "250px" }}
            alt="Meal_Image"
            src={favoriteMeal.mealImage}
          />
        ) : (
          `${favoriteMeal.mealTitle}`
        )}
      </div>
    );

    const onRemove = async () => {
      let removeData = {
        userFrom,
        mealId: favoriteMeal.mealId,
      };

      try {
        await axios.post("/api/favorite/removeFromFavorite", removeData);
        alert("deletion was successful");
        setFavoriteList(
          favoriteList.filter((f) => f.mealId !== removeData.mealId)
        );
      } catch (err) {
        alert("Please try again");
      }
    };

    return (
      <React.Fragment key={index}>
        <tr>
          <Popover content={content} title={favoriteMeal.mealTitle}>
            <th style={{ cursor: "pointer" }}>{favoriteMeal.mealTitle}</th>
          </Popover>
          <th>
            <Link to={`/favorite/${favoriteMeal.mealId}`}>See the Detail</Link>
          </th>
          <th>
            <Button onClick={onRemove}>Remove</Button>
          </th>
        </tr>
      </React.Fragment>
    );
  });

  if (favoriteList === null) {
    return <Loading>Loading...</Loading>;
  }

  if (!user) {
    let res = window.confirm("You need to login, Would you like to login?");
    if (res) {
      history.push("/login");
    } else history.push("/");
  }

  return (
    <Detail>
      <h2>Favorite Recipes List</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Recipe Title</th>
            <th>Recipe Detail</th>
            <th>Remove from List</th>
          </tr>
        </thead>
        <tbody>{RenderList}</tbody>
      </table>
    </Detail>
  );
};

export default FavoritePage;
