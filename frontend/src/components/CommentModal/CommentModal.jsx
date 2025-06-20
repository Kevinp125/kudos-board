import './commentmodal.css'

export default function CommentModal({handleModalClose, card}) {

  console.log(card);
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
          <p>Overview</p>
      
        </div>
    </div>

  )
}
