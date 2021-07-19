import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { CategoryBox, Image, ImageP } from "./style";

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
