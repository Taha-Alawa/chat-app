import "./chat.css";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebas";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = ({ setShowDetial }) => {
  // this state for the chats
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const { currentUser } = useUserStore()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  // this state used to send images from galary
  const [img, setImg] = useState({
    file: null,
    url: ""
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    // console.log(e)
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

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

    let imgUrl = null
    // update the chat
    try {
      if (img.file) {
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
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

    // after send the message
    setImg({
      file: null,
      url: ""
    })

    setText("")
  }

  return (
    <section className="chat">
      <div className="top">
        <div className="user" onClick={() => setShowDetial(prev=> !prev)}>
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username || "User"}</span>
          </div>
        </div>
        <div className="icons">
          {/* <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" /> */}
          <img src="./info.png" alt="info" onClick={() =>setShowDetial(prev=> !prev)} />
        </div>
      </div>
      <section className="center">
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message?.createAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="message img" />}
              <p>
                {message.text}
              </p>
              {/* <span>{message.createAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (<div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>)}
        <div ref={endRef}></div>
      </section>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="img" />
          </label>
          <input type="file" onChange={handleImg} id="file" style={{display: "none"}} />
          {/* <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" /> */}
        </div>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder={(isCurrentUserBlocked || isReceiverBlocked)  ? "You Can't send a message": "Type a message..."}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
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
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </section>
  );
};

export default Chat;
