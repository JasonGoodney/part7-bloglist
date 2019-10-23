import blogReducer from '../../reducers/blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'It is Skyrim with guns.',
        author: 'Adam Kovic',
        url: 'fun.haus',
        likes: 0,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns error for NEW_BLOG action when information is missing', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        url: 'fun.haus',
        likes: 0,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    // expect(newState.length).toBe(0)
    expect(newState).not.toContainEqual(action.data)
  })
})
