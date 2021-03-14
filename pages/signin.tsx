import React from "react";
import { Box, Container, SignIn } from "../components";
import { useAuth } from "../hooks";

const SignUpPage: React.FC = () => {
  const { signedIn, currentUser } = useAuth();

  if (signedIn && currentUser) {
    return (
      <Container>
        <Box>Signed in as {currentUser.displayName}</Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <SignIn />
      </Box>
    </Container>
  );
};

export default SignUpPage;
