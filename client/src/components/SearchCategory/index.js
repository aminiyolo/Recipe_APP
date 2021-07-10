import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";

const SearchCategory = ({ category }) => {
  return (
    <Col
      lg={8}
      md={12}
      xs={24}
      style={{
        cursor: "pointer",
        borderRadius: "16px",
      }}
    >
      <Link to={`/category/${category.strCategory}`}>
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
            src={category.strCategoryThumb}
            alt={`${category.strCategory} img`}
          />
          <p
            style={{
              fontSize: "18px",
              fontWeight: "730",
              color: "black",
              padding: "14px 0",
            }}
          >
            {category.strCategory}
          </p>
        </div>
      </Link>
    </Col>
  );
};

export default SearchCategory;
