import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { CategoryBox, Image, ImageP } from "./style";

const SearchCategory = ({ category }) => {
  const style = {
    cursor: "pointer",
    borderRadius: "16px",
  };
  return (
    <Col lg={8} md={12} xs={24} style={style}>
      <Link to={`/category/${category.strCategory}`}>
        <CategoryBox>
          <Image
            src={category.strCategoryThumb}
            alt={`${category.strCategory} img`}
          />
          <ImageP>{category.strCategory}</ImageP>
        </CategoryBox>
      </Link>
    </Col>
  );
};

export default SearchCategory;
