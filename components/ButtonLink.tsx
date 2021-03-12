import styled from "styled-components";
import Link from "next/link";

const ButtonLink = styled(Link)`
  font-family: inherit;
  font-size: 1rem;
  line-height: 1;
  padding: 0.75rem 1rem;
  display: block;
  cursor: pointer;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-weight: 700;
  color: #000;
`;

export default ButtonLink;
