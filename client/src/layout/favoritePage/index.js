import React, { useEffect, useState } from "react";
import "./index.css";
import fetcher from "../../components/fetcher";
import axios from "axios";
import useSWR from "swr";
import { Popover } from "antd";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const { data } = useSWR("/api/users/user", fetcher);

  let userFrom;
  let dataToSubmit;

  if (data) {
    userFrom = data._id;
  }

  dataToSubmit = {
    userFrom,
  };

  const RenderList =
    favoriteList &&
    favoriteList.map((favoriteMeal, index) => {
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

      const onRemove = () => {
        let removeData = {
          userFrom,
          mealId: favoriteMeal.mealId,
        };

        axios
          .post("/api/favorite/removeFromFavorite", removeData)
          .then((response) => {
            if (response.data.success) {
              axios
                .post("/api/favorite/FavoritedMeal", removeData)
                .then((response) => {
                  if (response.data.success) {
                    setFavoriteList(response.data.list);
                  }
                });
            }
          });
      };

      return (
        <React.Fragment key={index}>
          <tr>
            <Popover content={content} title={favoriteMeal.mealTitle}>
              <th>{favoriteMeal.mealTitle}</th>
            </Popover>
            <th>
              <Link to={`/favorite/${favoriteMeal.mealId}`}>
                See the Detail
              </Link>
            </th>
            <th>
              <button onClick={onRemove}>Remove</button>
            </th>
          </tr>
        </React.Fragment>
      );
    });

  useEffect(() => {
    if (data) {
      axios
        .post("/api/favorite/FavoritedMeal", dataToSubmit)
        .then((response) => {
          if (response.data.success) {
            setFavoriteList(response.data.list);
          }
        });
    }
  }, [data]);

  return (
    <div style={{ width: "85%", margin: "80px auto" }}>
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
    </div>
  );
};

export default FavoritePage;
