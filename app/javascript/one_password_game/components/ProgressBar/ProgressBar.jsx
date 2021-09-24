import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "styled-components";
import { Typography } from "@mui/material";

const Container = styled.div``;

const StyledLinearProgress = styled(LinearProgress)`
  background-color: #b9bdc2;
  height: 2rem;
  span {
    background-color: #50b347;
  }
`;

const ProgressBar = ({ completed }) => {
  return (
    <Container>
      {completed < 50 && <Typography variant="h5"> </Typography>}
      {completed === 50 && (
        <Typography variant="h5">Half way there!</Typography>
      )}
      {completed > 50 && completed !== 100 && (
        <Typography variant="h5">Almost there...</Typography>
      )}
      {completed === 100 && <Typography variant="h5">You're there!</Typography>}

      <Box>
        <StyledLinearProgress variant="determinate" value={completed} />
      </Box>
    </Container>
  );
};

export { ProgressBar };
