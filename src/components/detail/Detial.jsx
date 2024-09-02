import { auth } from "../../lib/firebas";
import "./detial.css";

const Detial = () => {
  return (
    <section className="detial">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Taha Dev</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <section className="option">
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
        </section>
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>Logout</button>
      </div>
    </section>
  );
};

export default Detial;
