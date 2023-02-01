import React from 'react'

const Home = () => {

  console.log(`${process.env.REACT_APP_API_KEY}`)
  return (
    <div>Home {process.env.REACT_APP_API_KEY} <br/>REACT_APP_AUTH_DOMAIN = {process.env.REACT_APP_AUTH_DOMAIN}</div>
  )
}

export default Home