import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/app/hooks'
import { type Post, postAdded } from './postsSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postUser: HTMLInputElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const PostForm = () => {
  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const body = elements.postContent.value
    const userId = elements.postUser.value

    // Create the post object and dispatch the `postAdded` action
    const newPost: Post = {
      id: nanoid(),
      title,
      body,
      userId,
    }
    dispatch(postAdded(newPost))

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postUser">User:</label>
        <input type="text" id="postUser" name="postUser" defaultValue="" required />
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
