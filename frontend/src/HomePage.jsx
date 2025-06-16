import { useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

export default function HomePage() {

  return (
      <Link to = {'/board/12'}>
        <p>To Board details</p>
      </Link>
    
  )
}
