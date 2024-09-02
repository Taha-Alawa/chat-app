import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./adduser.css";
import { db } from "../../../../lib/firebas";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const Adduser = () => {
  const [user, setUser] = useState(null);
  const {currentUser} = useUserStore()

  // this fun search for the username to add it
  const handleSearch = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")

    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("username", "==", username))

      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data())
      }
    } catch (error) {
      console.log(error)
    }
  }

  // this fun add the user and make wtih him an new chat
  const handleAdd = async() => {
    const chatRef = collection(db, "chats")
    const userChatsRef = collection(db, "userchats")

    try {
      // this for reach the chat id
      const newChatRef = doc(chatRef)

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      })

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      })

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && <section className="user">
        <div className="detial">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </section>}
    </section>
  );
};

export default Adduser;
