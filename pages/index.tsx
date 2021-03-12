import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Container } from "../components";

const Home: React.FC = () => {
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }, []);

  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

export default Home;
