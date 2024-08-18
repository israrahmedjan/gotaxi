import { UserLocationContext } from '../context/UserLocationContext'
import React, { useContext } from 'react'

function TestDemo() {
    const mydata = useContext(UserLocationContext);
  return (
    <div>
      <h1>Test Demo {JSON.stringify(mydata,null,2)}</h1>
    </div>
  )
}

export default TestDemo
