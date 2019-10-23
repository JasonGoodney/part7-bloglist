import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification.text === null) {
    return null
  }

  const successStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div>
      {notification.text ? (
        <div
          className='notifiction'
          id='notifiction'
          style={notification.isError ? errorStyle : successStyle}>
          {notification.text}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
