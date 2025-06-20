import { useState } from 'react'
import './commentmodal.css'

export default function CommentModal({handleModalClose, card}) {

  const [commentInput, setCommentInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');



  return(
  
    <div id = "modal" className="modal-overlay">
        <div className="modal-content">

          <div className = "close-container">
            <span onClick = {handleModalClose} className="close">&times;</span>
          </div>
          
          <h2>{card.title}</h2>
          <p>{card.message}</p>
          <img className = "modal-img" src= {card.gif} alt={`${card.title}'s gid`} />
          <p>{card.author}</p>

          <input onChange = {(event) => setCommentInput(event.target.value)} type="text" placeholder='Comment' value = {commentInput} required />
          <input onChange = {(event) => setAuthorInput(event.target.value)} type="text" placeholder='Author (optional)' value = {authorInput} />
          <button>Add Comment!</button>
      
        </div>
    </div>

  )
}
