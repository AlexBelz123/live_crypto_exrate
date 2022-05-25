import React from 'react';
import styled from 'styled-components';
import { IExrate, TExrateStatus } from '../types';

const rateColor: any = {
  idle: '#000',
  up: 'green',
  down: 'red',
};

const StyledSpan = styled.span<{ status: TExrateStatus }>`
  padding: 1rem 2rem;
  font-size: 2rem;
  color: ${({ status }) => rateColor[status]};
  margin: 0 auto;
  border: ${({ status }) => '1px solid ' + rateColor[status]};
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

interface ExRateProps {
  exrate: IExrate;
  status?: TExrateStatus;
}

const ExRate: React.FC<ExRateProps> = ({ exrate, status = 'idle' }) => {
  return (
    <StyledDiv>
      <StyledSpan status={status}>
        {exrate.rate} {exrate.asset_id_base}/${exrate.asset_id_quote}
      </StyledSpan>
    </StyledDiv>
  );
};

export default ExRate;
