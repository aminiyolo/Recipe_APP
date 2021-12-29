import { Col } from "antd";
import { useCallback } from "react";
import { CategoryBox, Image, ImageP, colStyle } from "./style";

interface IProps {
  category: {
    strCategory: string;
    strCategoryThumb: string;
  };
  onClickCategory: (category: string) => void;
}

const SearchCategory: React.VFC<IProps> = ({ category, onClickCategory }) => {
  const onClick = useCallback((value: string) => {
    onClickCategory(value);
  }, []);

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
