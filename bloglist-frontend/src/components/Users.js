import React from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserList = props => {
  return (
    <Container>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user => (
            <Table.Row key={user.info.id}>
              <Table.Cell>
                <Link to={`/users/${user.info.id}`}>{user.info.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

const Users = props => {
  return (
    <div>
      <h2>Users</h2>
      <UserList users={props.users} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Users)
