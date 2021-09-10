import { Col } from "antd";
import { CategoryBox, Image, ImageP, colStyle } from "./style";

const SearchCategory = ({ category, onClickCategory }) => {
  const onClick = (value) => {
    onClickCategory(value);
  };

  return (
    <Col lg={8} md={12} xs={24} style={colStyle}>
      <div onClick={() => onClick(category.strCategory)}>
        <CategoryBox>
          <Image
            src={category.strCategoryThumb}
            alt={`${category.strCategory} img`}
          />
          <ImageP>{category.strCategory}</ImageP>
        </CategoryBox>
      </div>
    </Col>
  );
};

export default SearchCategory;
