import { ProductSort } from "@/types/Product";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { styled } from "styled-components";

interface HomeFiltersProps {
  onChange?: (filter: ProductSort | undefined) => any;
  activeSort?: ProductSort;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  font-size: 0.875rem;
`;

const Paragraph = styled.p``;

const Icon = styled(ChevronDownIcon)`
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
`;

const SelectBox = styled.div<{ $open: boolean }>`
  background-color: ${(props) => props.theme.bg};
  position: absolute;
  width: 12rem;
  padding: 1rem;
  visibility: ${(props) => (props.$open ? "visible" : "hidden")};
  border-radius: 0.5rem;
  top: 100%;
  right: 0;
  transform: translateY(5%);
  z-index: 10;

  @media screen and (max-width: ${(props) => props.theme.mobile_size}) {
    right: 50%;
    transform: translate(50%, 5%);
  }
`;

const Option = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const renderFilter = (filter: ProductSort) => {
  switch (filter) {
    case ProductSort.PRICE_ASC:
      return "Preço: Menor - maior";
    case ProductSort.PRICE_DESC:
      return "Preço: Maior - menor";
    case ProductSort.NEWS:
      return "Novidades";
    case ProductSort.MOST_SALES:
      return "Mais vendidos";
    default:
      return "";
  }
};

export default function Filter({ onChange, activeSort }: HomeFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Container onClick={() => setOpen(!open)}>
      <Paragraph>
        {activeSort ? renderFilter(activeSort) : "Organizar por"}
      </Paragraph>
      <Icon />
      <SelectBox $open={open}>
        {Object.values(ProductSort).map((filter, i) => (
          <Option onClick={() => onChange && onChange(filter)} key={i}>
            {renderFilter(filter)}
          </Option>
        ))}
      </SelectBox>
    </Container>
  );
}
