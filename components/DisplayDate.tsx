import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";

type DisplayDateProps = {
  dateToDisplay: Date | string | firebase.firestore.Timestamp | unknown;
};

const DisplayDate: React.FC<DisplayDateProps> = ({ dateToDisplay }) => {
  let dateObject: Date | undefined = undefined;
  if (dateToDisplay instanceof Date) {
    dateObject = dateToDisplay;
  } else if (dateToDisplay instanceof firebase.firestore.Timestamp) {
    dateObject = dateToDisplay.toDate();
  } else if (typeof dateToDisplay === "string") {
    dateObject = new Date(dateToDisplay);
  }

  return (
    <span>
      {dateObject?.toLocaleDateString()} @ {dateObject?.toLocaleTimeString()}
    </span>
  );
};

export default DisplayDate;
