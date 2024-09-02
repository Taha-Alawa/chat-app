import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";
import Adduser from "./addUser/Adduser";
import "./chatlist.css";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebas";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  // how to get the chats from firebase
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const chatsitems = res.data().chats;

        // how to get user id inside the chat
        const promises = chatsitems.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        // This is the way to get the chat
        // I'm using the sort method to get the last message
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map(item => {
      const {user, ...rest} = item;
      return rest
    })

    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true

    const userChatsRef = doc(db, "userchats", currentUser.id)

    try {
      
    } catch (error) {
      console.log(error)
    }
    
    changeChat(chat.chatId, chat.user);
  };

  return (
    <section className="chatlist">
      <div className="search">
        <label className="searchBar">
          <img src="./search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </label>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#111928ce"
          }}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <Adduser />}
    </section>
  );
};

export default Chatlist;
