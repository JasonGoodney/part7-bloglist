import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { addComment } from '../reducers/blogReducer'

const Comments = props => {
  const [comment, setComment] = useState('')

  const handleChange = (e, { value }) => setComment(value)

  const handleSubmit = event => {
    if (!comment) {
      return
    }
    event.preventDefault()
    props.addComment(props.blog, comment)
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            id='commentInput'
            name='comment'
            value={comment}
            placeholder='Type a comment...'
            onChange={handleChange}
          />
          <Form.Button disabled={comment === ''} type='submit'>
            Add comment
          </Form.Button>
        </Form.Group>
      </Form>
      <ul>
        {props.blog.comments ? (
          props.blog.comments.map(
            comment => comment.text && <li key={comment._id}>{comment.text}</li>
          )
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default connect(
  null,
  { addComment }
)(Comments)
