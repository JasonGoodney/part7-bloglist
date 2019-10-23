import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const NavigationBar = ({ user, handleLogout }) => {
  const [activeItem, setActiveItem] = useState(null)
  const padding = { padding: 5 }

  const handleItemClick = (e, { name }) => {
    // setActiveItem(name)
    // console.log(activeItem, name)
  }

  return (
    <div>
      <Menu>
        <Menu.Item
          link
          name='blogs'
          active={activeItem === 'blogs'}
          onClick={handleItemClick}>
          <Link stype={padding} to='/'>
            blogs
          </Link>
        </Menu.Item>
        <Menu.Item
          link
          name='users'
          active={activeItem === 'users'}
          onClick={handleItemClick}>
          <Link stype={padding} to='/users'>
            users
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          {user ? (
            <>
              <Menu.Item>{user.name}</Menu.Item>
              <Menu.Item
                link
                name='logout'
                active={activeItem === 'logout'}
                onClick={handleLogout}>
                <Button> logout</Button>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              link
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}>
              <Link to='/login'>login</Link>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default NavigationBar
