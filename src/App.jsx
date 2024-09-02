import { onAuthStateChanged } from "firebase/auth";
import Chat from "./components/chat/Chat";
import Detial from "./components/detail/Detial";
import List from "./components/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebas";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const [showDetial, setShowDetial] = useState(false);
  // the state we created in userStore
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const { chatId } = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=> {
      fetchUserInfo(user?.uid)
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo]);

  if (isLoading) return <h3 className="loading">Loading...</h3> 

  return (
    <main className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat setShowDetial={setShowDetial} />}
          {chatId && showDetial && <Detial />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </main>
  );
};

export default App;
