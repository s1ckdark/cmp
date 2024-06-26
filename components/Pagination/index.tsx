import React from "react";
import styled from "styled-components";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiOutlineEllipsis } from "react-icons/ai";
import usePagination from "@/hooks/usePagination";

interface Props {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
}

const Navigation = styled.nav`
  justify-content: center;
  align-items: center;
  display:flex;
  margin: 10px auto;
`;

const Button = styled.button<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 0;
  margin: 0;
  padding: 0 12px;
  font-size: 14px;
  font-weight: normal;
  background-color: ${({ selected }) => (selected ? "#43B69A" : "#fff")};
  cursor: pointer;
  border-radius: 100%;
  width: 30px;
  height: 30px;

  &:hover {
    background-color: #ccc;
    color: #fff;
  }
  &:active {
    opacity: 0.8;
  }
`;

const Item = styled.li``;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;

  ${Item} + ${Item} {
    margin-left: 8px;
  }
`;

const Pagination: React.FC<Props> = ({ count, page, onPageChange, disabled, siblingCount, boundaryCount }) => {

  const getLabel = (item: number | string) => {
    if (typeof item === "number") return item;
    else if (item.indexOf("ellipsis") > -1) return <AiOutlineEllipsis />;
    else if (item.indexOf("prev") > -1) return <GrFormPrevious />;
    else if (item.indexOf("next") > -1) return <GrFormNext />;
  };

  const { items } = usePagination({
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount,
  });

  return (
    <Navigation>
      <ItemList>
        {items.map(({ key, disabled, selected, onClick, item }) => (
          <Item key={key}>
            <Button disabled={disabled} selected={selected} onClick={onClick}>
              {getLabel(item)}
            </Button>
          </Item>
        ))}
      </ItemList>
    </Navigation>
  );
};

export default Pagination;