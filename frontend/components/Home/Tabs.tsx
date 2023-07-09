import { ProductCategory } from "@/types/Product";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 1rem 0;
  gap: 2rem;
`;

const Tab = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  color: ${(props) =>
    props.$active ? props.theme.text_dark : props.theme.text};
  font-weight: ${(props) => (props.$active ? "bold" : "regular")};
  text-transform: uppercase;
  transition: color 200ms;
  border-bottom: ${(props) => props.theme.orange} 0.25rem
    ${(props) => (props.$active ? "solid" : "none")};
`;

export type HomeTabs = ProductCategory | "all";

interface HomeTabsProps {
  onChange?: (activeTab: HomeTabs) => any;
  activeTab: HomeTabs;
}

const renderCategory = (category: ProductCategory) => {
  switch (category) {
    case ProductCategory.MUGS:
      return "Canecas";
    case ProductCategory.T_SHIRTS:
      return "Camisetas";
    default:
      return "";
  }
};

export default function Tabs({ onChange, activeTab = "all" }: HomeTabsProps) {
  return (
    <Container>
      <Tab
        $active={activeTab == "all"}
        onClick={() => onChange && onChange("all")}
      >
        Todos os produtos
      </Tab>
      {Object.values(ProductCategory).map((category, i) => (
        <Tab
          key={i}
          $active={category == activeTab}
          onClick={() => onChange && onChange(category)}
        >
          <p>{renderCategory(category)}</p>
        </Tab>
      ))}
    </Container>
  );
}
