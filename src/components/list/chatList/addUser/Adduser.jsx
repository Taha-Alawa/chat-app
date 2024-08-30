import "./adduser.css";

const Adduser = () => {
  return (
    <section className="addUser">
      <form action="">
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <section className="user">
        <div className="detial">
          <img src="./avatar.png" alt="" />
          <span>Taha Dev</span>
        </div>
        <button>Add User</button>
      </section>
    </section>
  );
};

export default Adduser;
