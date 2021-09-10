import { Col } from "antd";
import { CategoryBox, Image } from "../SearchCategory/style";
import { ImageP } from "./style";

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
      <CategoryBox>
        <Image src={recipe.strMealThumb} alt={`${recipe.strMeal} img`} />
        <ImageP>{recipe.strMeal}</ImageP>
      </CategoryBox>
    </Col>
  );
};

export default SearchResults;
