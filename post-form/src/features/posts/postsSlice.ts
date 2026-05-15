import type { RootState } from '@/app/store'
import { createSlice, PayloadAction, createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '@/app/withTypes'
import { AppStartListening } from '@/app/listenerMiddleware'
import { fetchPostsApi } from '@/app/apis'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  body: string
  userId: string
  date: string
}

export type NewPost = Pick<Post, 'title' | 'body' | 'userId'>

interface PostsState extends EntityState<Post, string> {
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  error: string | null
}

const postsAdapter = createEntityAdapter<Post>({
  // Sort in descending date order
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState: PostsState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const data = await fetchPostsApi()
    return data.map((post) => ({ ...post, date: new Date().toISOString() }))
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false
      }
    },
  },
)

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      // "Mutate" the existing state array, which is
      // safe to do here because `createSlice` uses Immer inside.
      postsAdapter.addOne(state, { ...action.payload, date: new Date().toISOString() })
    },
  },
  extraReducers: (builder) => {
    // Pass the action creator to `builder.addCase()`
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Save the fetched posts into state
        postsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
})

// Export the generated reducer function
export default postsSlice.reducer

// Export the auto-generated action creator with the same name
export const { postAdded } = postsSlice.actions

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
  // Pass in one or more "input selectors"
  [
    // we can pass in an existing selector function that
    // reads something from the root `state` and returns it
    selectAllPosts,
    // and another function that extracts one of the arguments
    // and passes that onward
    (state: RootState, userId: string) => userId,
  ],
  // the output function gets those values as its arguments,
  // and will run when either input value changes
  (posts, userId) => posts.filter((post) => post.userId === userId),
)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    type: 'posts/postAdded',
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true,
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    },
  })
}
