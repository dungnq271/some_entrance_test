import React, { useEffect } from 'react'
import { useGetPostsQuery, Post } from '@/features/api/apiSlice'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { fetchPosts, selectAllPosts, selectPostsStatus } from './postsSlice'
import classnames from 'classnames'

import { PostAuthor } from './PostAuthor'
import { Spinner } from '@/components/Spinner'

interface PostExcerptProps {
  post: Post
}

let PostExcerpt = ({ post }: PostExcerptProps) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <div>
        <PostAuthor userId={post.userId} />
      </div>
      <p className="post-content">{post.body}</p>
    </article>
  )
}

// TODO: add fetching state with spinner
export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  const renderedPosts = posts.map((post) => <PostExcerpt key={post.id} post={post} />)
  content = <div className="posts-container">{renderedPosts}</div>

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button>Refetch Posts</button>
      {content}
    </section>
  )
}
