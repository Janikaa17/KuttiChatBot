import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyALy8u0UGA2VvsPwbJRTgqc7lxE625Zqbk",
  authDomain: "ai-chatbot-ff0b9.firebaseapp.com",
  projectId: "ai-chatbot-ff0b9",
  storageBucket: "ai-chatbot-ff0b9.firebasestorage.app",
  messagingSenderId: "905729733946",
  appId: "1:905729733946:web:6eabb1feb89ef799d40c03"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveMessage = async (message) => {
  try {
    await addDoc(collection(db, "messages"), message);
  } catch (error) {
    console.error("Error saving message: ", error);
  }
};

export const getMessages = (callback) => {
  const q = query(collection(db, "messages"), orderBy("timestamp"));
  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

export { db };