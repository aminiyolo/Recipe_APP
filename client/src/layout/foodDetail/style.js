import styled from "styled-components";

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background: rgba(0, 0, 0, 0.5);
  & > div > .detailBox {
    margin: auto;
    width: 80%;
    & > div > .foodName {
      color: black;
      font-weight: 800;
    }
  }

  & > div {
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #00bffd;
      border-radius: 6px;
    }
    margin-top: 35px;
    margin-left: 12px;
    display: inline-block;
    width: 80%;
    height: 90%;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: whitesmoke;
    border-radius: 6px;
    user-select: none;
    max-width: 800px;
    max-height: 800px;
    padding: 20px 10px 40px;
    z-index: 1012;
    position: relative;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 0px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  & > span {
    color: #00bffd;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Img = styled.img`
  width: 200px;
  height: 175px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const IngredientsTitle = styled.span`
  color: black;
  font-size: 20px;
  font-weight: 650;
`;

export const IngredientsP = styled.p`
  color: black;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 20px;
`;

export const Detail = styled.p`
  color: black;
  font-size: 16px;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

export const normal = {
  backgroundColor: "#00bffe",
  padding: "2px 4px",
  border: "none",
  borderRadius: "3px",
  outline: "none",
  color: "whitesmoke",
  fontWeight: "550",
  cursor: "pointer",
  marginTop: "10px",
};

export const added = {
  backgroundColor: "#1890FF",
  padding: "2px 4px",
  border: "none",
  borderRadius: "3px",
  outline: "none",
  color: "whitesmoke",
  fontWeight: "550",
  cursor: "pointer",
  marginTop: "10px",
};
