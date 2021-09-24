import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "styled-components";

const StyledLinearProgress = styled(LinearProgress)`
  background-color: #b9bdc2;
  height: 2rem;
  span {
    background-color: #50b347;
  }
`;
const ProgressBar = ({ completed }) => {
  return (
    <Box>
      <StyledLinearProgress variant="determinate" value={completed} />
    </Box>
  );
};

export { ProgressBar };
