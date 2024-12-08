import { db } from "../constants/firebase-config.js"; // Adjust the path as needed

const testFirestore = async () => {
  try {
    console.log("Testing Firestore connection...");

    // Reference the 'rooms' collection
    const snapshot = await db.collection("rooms").get();

    // Print each document in the collection
    snapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id}`);
      console.log("Data:", doc.data());
    });

    console.log("Firestore test successful!");
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
  }
};

testFirestore();
