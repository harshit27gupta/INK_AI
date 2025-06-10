import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/Footer'
  const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'>
      <Navbar/>
      <Header/>
      <BlogList/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home