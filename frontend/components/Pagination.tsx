import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { styled } from "styled-components";

interface PaginationProps {
  pageNumber: number;
  page: number;
  onChange?: (page: number) => any;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: end;
  margin: 2rem 0;
`;

const Button = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? "transparent" : props.theme.dark_grey};
  color: ${(props) => (props.$active ? props.theme.orange : props.theme.text)};
  height: 2rem;
  width: 2rem;
  ${(props) =>
    props.$active ? `border: 1px solid ${props.theme.orange}` : "border: none"};
  outline: none;
  transition: all 200ms;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const PreviousIcon = styled(ChevronLeftIcon)`
  width: 1rem;
  height: 1rem;
`;

const NextIcon = styled(ChevronRightIcon)`
  width: 1rem;
  height: 1rem;
`;

export default function Pagination({
  pageNumber,
  page,
  onChange,
}: PaginationProps) {
  const Buttons = () => {
    const buttons = [];
    for (let i = 1; i <= pageNumber; i++) {
      buttons.push(
        <Button
          $active={page == i}
          onClick={() => onChange && onChange(i)}
          key={i}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const handleNext = () => {
    if (page < pageNumber) {
      if (onChange) onChange(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      if (onChange) onChange(page - 1);
    }
  };

  return (
    <Container>
      {Buttons()}
      <Button onClick={handlePrev} disabled={pageNumber == 0}>
        <PreviousIcon />
      </Button>
      <Button onClick={handleNext} disabled={pageNumber == 0}>
        <NextIcon />
      </Button>
    </Container>
  );
}
