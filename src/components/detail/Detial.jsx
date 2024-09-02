import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebas";
import { useUserStore } from "../../lib/userStore";
import "./detial.css";

const Detial = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore()
  const {currentUser} = useUserStore()

  const handleblock = async() => {
    if(!user) return

    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="detial">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username || "User"}</h2>
      </div>
      <div className="info">
        {/* <section className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </section>
        <section className="option">
          <div className="title">
            <span>Preivacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </section>
        <section className="option">
          <div className="title">
            <span>Shered Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <section className="photos">
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetial">
                <img src="./random.png" alt="" />
                <span>random.png</span>
              </div>
              <img src="./download.png" className="icon" alt="" />
            </div>
          </section>
        </section>
        <section className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </section> */}
        <button onClick={handleblock}>{
          isCurrentUserBlocked 
          ? "You Are Blocked" 
          : isReceiverBlocked
          ? "Un Block" 
          : "Block User"
          }</button>
        <button className="logout" onClick={() => auth.signOut()}>Logout</button>
      </div>
    </section>
  );
};

export default Detial;
