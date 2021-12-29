import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { Popover } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Detail, Button, Loading } from "./style";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/store";

interface IMeal {
  mealId: string;
  mealTitle: string;
  mealImage: string;
}

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState<IMeal[] | null>(null);
  const { currentUser } = useSelector((state: RootState) => state);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const userFrom = currentUser?._id;
        try {
          const res = await axiosInstance.post("/api/favorite/FavoritedMeal", {
            userFrom,
          });
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

  const RenderList = favoriteList?.map((favoriteMeal, index: number) => {
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
      const removeData = {
        userFrom: currentUser?._id,
        mealId: favoriteMeal.mealId,
      };

      try {
        await axiosInstance.post(
          "/api/favorite/removeFromFavorite",
          removeData,
        );
        toast.success("Deletion was successful", { autoClose: 2000 });
        setFavoriteList(
          favoriteList.filter((f) => f.mealId !== removeData.mealId),
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

  if (!currentUser) {
    const res = window.confirm("You need to login, Would you like to login?");
    res ? history.push("/login") : history.push("/");
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
      <ToastContainer />
    </Detail>
  );
};

export default FavoritePage;
