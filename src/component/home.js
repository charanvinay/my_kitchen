import React from 'react'

const Home = () => {

  console.log(`${process.env.REACT_APP_API_KEY}`)
  return (
    <div>Home {process.env.REACT_APP_API_KEY}</div>
  )
}

export default Home