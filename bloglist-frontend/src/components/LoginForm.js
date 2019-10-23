import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ onSubmit, username, password }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field inline>
          <label>username</label>
          <Input className='usernameInput' {...username} />
        </Form.Field>
        <Form.Field inline>
          <label>password</label>
          <Input className='passwordInput' {...password} />
        </Form.Field>
        <Button primary type='submit'>
          submit
        </Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
