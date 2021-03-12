import React from "react";
import { Container, PageTitle } from "../components";
import { useAuth } from "../hooks";

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <Container>
      <PageTitle>Settings</PageTitle>
      <pre>
        <code>{JSON.stringify(currentUser, null, 2)}</code>
      </pre>
    </Container>
  );
};

export default Settings;
