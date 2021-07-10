import React, { useEffect } from "react";
import { Col } from "antd";

const SearchResults = ({ recipe, onOpenModal }) => {
  return (
    <Col
      lg={8}
      md={12}
      xs={24}
      onClick={() => onOpenModal(recipe)}
      style={{
        cursor: "pointer",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 21px -12px rgba(0, 0, 0, 0.79",
        }}
      >
        <img
          style={{
            height: "230px",
            width: "100%",
            borderRadius: "16px 16px 0 0",
          }}
          src={recipe.strMealThumb}
          alt={`${recipe.strMeal} img`}
        />
        <p
          style={{
            font: "message-box",
            fontSize: "18px",
            color: "#202020",
            padding: "14px 0",
          }}
        >
          {recipe.strMeal}
        </p>
      </div>
    </Col>
  );
};

export default SearchResults;
