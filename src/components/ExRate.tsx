import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  padding: 1rem 2rem;
  font-size: 2rem;
  color: #fff;
  background-color: #000;
  margin: 0 auto;
`;

interface ExRateProps {
  rate: number;
}

const ExRate: React.FC<ExRateProps> = ({ rate }) => {
  return <StyledSpan>{rate}</StyledSpan>;
};

export default ExRate;
