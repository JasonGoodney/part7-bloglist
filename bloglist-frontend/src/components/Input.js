import React from 'react'

const Input = ({ className, name, value, type, onChange, reset }) => {
  return (
    <>
      <input
        className={className}
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
      />
    </>
  )
}

export default Input
