import React from 'react'

const Input = ({ name, value, type, onChange, reset }) => {
  return (
    <>
      <input name={name} value={value} type={type} onChange={onChange} />
    </>
  )
}

export default Input
