import "./chat.css";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebas";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  // this state for the chats
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const { currentUser } = useUserStore()
  const { chatId, user } = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    // console.log(e)
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  // this useEffect for listen to the real time data
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // send message fun
  const handleSend = async() => {
    if (text === "") return 

    // update the chat
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        })
      });

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
  
        if(userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
  
          const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)
  
          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id = currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()
  
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
  
          })
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Taha Dev</span>
            <p>Lorem ipsum consectetur.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <section className="center">
        {chat?.messages?.map((message) => (
          <div className="message own" key={message?.createAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="message img" />}
              <p>
                {message.text}
              </p>
              {/* <span>{message.createAt}</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </section>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Type a message..."
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </section>
  );
};

export default Chat;
