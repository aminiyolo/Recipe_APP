import React from "react";
import { Col } from "antd";

const SearchResults = ({ recipe, image }) => {
  return (
    <Col
      lg={8}
      md={16}
      xs={24}
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
          src={image}
          alt={`${recipe.strMeal} img`}
        />
        <p
          style={{
            fontSize: "16px",
            fontWeight: "730",
            color: "black",
            padding: "12px 0",
          }}
        >
          {recipe.strMeal}
        </p>
      </div>
    </Col>
  );
};

export default SearchResults;
