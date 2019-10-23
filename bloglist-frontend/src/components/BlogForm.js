import React from 'react'
import Input from './Input'
import { Button, Form } from 'semantic-ui-react'

const BlogForm = props => {
  const { onSubmit, titleField, authorField, urlField } = props

  return (
    <div>
      <Form onSubmit={e => onSubmit(e)}>
        <div>
          <Form.Field inline>
            <label>title</label>
            <Input name='title' {...titleField} />
          </Form.Field>
          <Form.Field inline>
            <label>author</label>
            <Input name='author' {...authorField} />
          </Form.Field>
          <Form.Field inline>
            <label>url</label>
            <Input name='url' {...urlField} />
          </Form.Field>
          <Button primary type='submit'>
            create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm
