import React from "react";
import SignIn from "./SignIn";
import Container from "./Container";
import Box from "./Box";

const NeedToLogin: React.FC = () => (
  <Container>
    <Box>
      <h1>You Need To Login To See This Page</h1>
      <SignIn />
    </Box>
  </Container>
);

export default NeedToLogin;
