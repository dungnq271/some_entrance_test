import { PostsMainPage } from './features/posts/PostsMainPage'
import { ToastContainer } from 'react-tiny-toast'

function App() {
  return (
    <div className="App">
      <PostsMainPage />
      <ToastContainer />
    </div>
  )
}

export default App
