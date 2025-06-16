import { useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import Header from './components/Header/Header'
import BoardList from './components/BoardList/BoardList'

export default function HomePage() {

  return (

    <div>
      <Header/>
      <BoardList/>


    </div>

  )
}
