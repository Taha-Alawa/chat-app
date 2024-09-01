import { onAuthStateChanged } from "firebase/auth";
import Chat from "./components/chat/Chat";
import Detial from "./components/detail/Detial";
import List from "./components/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { auth } from "./lib/firebas";

const App = () => {
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=> {
      console.log(user)
    })

    return () => {
      unSub()
    }
  }, []);

  return (
    <main className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detial />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </main>
  );
};

export default App;
