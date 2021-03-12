import styled from "styled-components";

type LabelProps = {
  htmlFor: string;
};

const Label = styled.div<LabelProps>`
  font-size: 1rem;
  display: block;
`;

export default Label;
