import "./chatlist.css";
import { useState } from "react";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);

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
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Taha Dev</span>
          <p>Hello World</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Taha Dev</span>
          <p>Hello World</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Taha Dev</span>
          <p>Hello World</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Taha Dev</span>
          <p>Hello World</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Taha Dev</span>
          <p>Hello World</p>
        </div>
      </div>
    </section>
  );
};

export default Chatlist;
