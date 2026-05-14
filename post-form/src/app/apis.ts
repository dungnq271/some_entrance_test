import axios from 'axios'
import { postsListURL } from './constants'
import { Post } from '@/features/posts/postsSlice'

export async function fetchPostsApi() {
  const response = await axios.get(postsListURL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data as Post[]
}
