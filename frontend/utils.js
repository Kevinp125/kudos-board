

//function hits our get boards api and returns an array of board objects
export async function getBoards(){
  try{
    
    const res = await fetch(`${import.meta.env.VITE_FETCH_URL}/api/boards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!res.ok){
      throw new Error('fetching all boards failed');
    }

    const boardList = await res.json();
    return boardList;
  }catch(err){
    console.error("Error fetching boards");
    console.error(err);
  }
}
