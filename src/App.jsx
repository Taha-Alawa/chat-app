import Chat from "./components/chat/Chat";
import Detial from "./components/detail/Detial";
import List from "./components/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = false;

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
