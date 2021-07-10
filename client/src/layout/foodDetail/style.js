import styled from "styled-components";

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
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
    margin-top: 20px;
    margin-left: 12px;
    display: inline-block;
    width: 650px;
    height: 580px;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    /* background-color: #00bffe; */
    background-color: whitesmoke;
    border-radius: 6px;
    user-select: none;
    max-width: 900px;
    max-height: 1000px;
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
`;
