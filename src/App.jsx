import Chat from "./components/chat/Chat"
import Detial from "./components/detail/Detial"
import List from "./components/list/List"

const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detial />
    </div>
  )
}

export default App