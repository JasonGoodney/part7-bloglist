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
            <Input className='titleInput' name='title' {...titleField} />
          </Form.Field>
          <Form.Field inline>
            <label>author</label>
            <Input className='authorInput' name='author' {...authorField} />
          </Form.Field>
          <Form.Field inline>
            <label>url</label>
            <Input className='urlInput' name='url' {...urlField} />
          </Form.Field>
          <Button primary type='submit'>
            save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm
