import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

export default function HomePage() {

  return (
      <Link to = {'/board/12'}>
        <p>To Board details</p>
      </Link>
    
  )
}
