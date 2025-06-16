import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from './HomePage.jsx'
import BoardDetailPage from './BoardDetailPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/board/:id" element = {<BoardDetailPage />}/> {/*This is a dynamic route. Whenever a board card is clicked we will assign it a link to the board/(itsid) route. Then boarddetail component will appear but get the id from params and render the right information */}
    </Routes>    
  </BrowserRouter>

  ,
)
