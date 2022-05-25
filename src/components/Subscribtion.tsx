import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid #000;
  width: 600px;
  margin-bottom: 2rem;
`;

interface SubscribtionProps {
  label: string;
  onClick: () => void;
}

const Subscribtion: React.FC<SubscribtionProps> = ({ label, onClick }) => {
  return (
    <StyledDiv>
      <span>{label}</span>
      <button onClick={onClick}>Subscribe</button>
    </StyledDiv>
  );
};

export default Subscribtion;
