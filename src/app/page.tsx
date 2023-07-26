'use client'
import { useState } from "react"
type Player = "X" | "O" | "BOTH" | null;


export default function Home() {
  const [turn,setTurn] = useState<"X"|"O">("X")
  const [board,setBoard] = useState<Player[]>(Array(9).fill(null));
  const [hasWinner,setHasWinner] = useState(false);
  const [counterClicks,setCounterClicks]= useState(1)
  const[hasBoth,setHasBoth] = useState(false)
  //Checkeamos si tenemos ganador compando el array con las combinaciones ganadores
  function calculateWinner(board: Player[]) {
    const WINNER_COMBS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < WINNER_COMBS.length; i++) {
        const [a, b, c] = WINNER_COMBS[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
        }     
    }
    return null;
  }

  const handleClick  = (index:number) =>{
      //Si clickeamos en una celda que ya esta ocupada hacxemos un early return para que no se siga ejecutabndo el codigo
      if(board[index]!== null){
      return
    }
    //Contamos cuantos clicks estamos haciendo en las celdas, si llegamos a 9 sabemos que ya clickeamos todas las celdas.
      setCounterClicks(counterClicks+1)
      const newBoard =[...board] 
      newBoard[index] = turn
      setBoard(newBoard);
      calculateWinner(newBoard)
      const winner = calculateWinner(newBoard)
      if(winner){
          setHasWinner(true)
          setBoard(Array(9).fill(null))
          setCounterClicks(1) 
          return
      }
      //Si no tenemos ganamos y llegamos a los 9 clicks en el board declaramos un empate
      if(counterClicks===9 && !winner){
          setHasBoth(true)
          setCounterClicks(1)
          setBoard(Array(9).fill(null))
          return
      } 
      //cambiamos el turno 
      setTurn(turn === "X" ? "O" : "X");    
  }
  //Funcion para salir del modal, dejamos el array vacio y seteamos el el conterClikcs en 1
  const handleExit =  () =>{
    setBoard(Array(9).fill(null))
    setCounterClicks(1)
  }
  
  return (
  
    <main className="w-full">  
    <div className= "flex flex-col items-center justify-center w-full my-10">
      <h1 className="text-4xl font-bold text-blue-500 md:text-7xl">TIC TAC TOE</h1>
      <div>
          <p className="my-2 text-4xl text-center text-white md:my-5 ">Turn:</p>
          <div className="flex items-center justify-center gap-4 text-5xl">
              <div className={turn==="X" ? "flex w-[60px] md:w-[80px] md:h-[80px] h-[60px]  bg-red-500 shadow-lg text-white border rounded-2xl items-center justify-center" : "flex w-[60px] md:w-[80px] md:h-[80px] h-[60px]  bg-transparent shadow-lg text-white  rounded-2xl items-center justify-center" }>
                  <p className="mt-2">X</p>
              </div>
              <div className={turn==="O" ? "flex w-[60px] md:w-[80px] md:h-[80px] h-[60px]  bg-blue-500 shadow-lg text-white border rounded-2xl items-center justify-center" : "flex w-[60px] md:w-[80px] md:h-[80px] h-[60px]  bg-transparent shadow-lg text-white  rounded-2xl items-center justify-center" }>
                  <p className="mt-2">O</p>
              </div>
        </div>
        
      </div>
          <section className="grid w-[240px] h-[240px]  md:w-[300px] md:h-[300px] justify-items-center grid-rows-3 my-6 md:my-10 gap-8 grid-cols-3 mx-2">
              {board.map((cells,index)=>(
              <div key={Math.random()} className=" md:w-[100px] md:h-[100px] w-[80px] h-[80px] text-7xl text-center flex justify-center rounded-xl items-center border shadow-md hover:cursor-pointer " onClick={()=>handleClick(index)}>
                  <p className={cells== "O" ? " font-bold  text-blue-500 mt-3" : " text-red-500 mt-3 font-bold" }>
                    {cells}
                  </p>
              </div>
              ))
              }
              
          </section>               
          <button onClick={handleExit} className="p-4 my-4 text-xl text-white bg-green-400 rounded-full">RESET</button>
        </div> 
        {hasWinner === true &&
            <div className='fixed top-0 left-0 flex items-start justify-center w-screen h-screen bg-black bg-opacity-30'>      
                <div className='w-[400px] h-[400px] gap-5 flex mt-28 flex-col rounded-2xl mx-2 justify-center items-center relative z-20 bg-white shadow-xl'>
                    <p className='text-6xl text-center '>{turn} Won!</p>
                    <p className='my-10 text-7xl'>🏆</p>
                    <button onClick={()=>setHasWinner(false)}  className='p-4 text-xl text-white bg-green-400 rounded-full '>Back to the Game</button>
              </div>    
            </div>
                
        }
        {hasBoth  &&
            <div className='fixed top-0 left-0 flex items-start justify-center w-screen h-screen bg-black bg-opacity-30'>      
                <div className='w-[400px] h-[400px] gap-5 flex mt-28 flex-col mx-2 rounded-2xl justify-center items-center relative z-20 bg-white shadow-xl'>
                    <p className='text-6xl text-center'>BOTH!</p>
                    <p className='my-8 text-7xl'>🏆🏆</p>
                    <button onClick={()=>setHasBoth(false)}  className='p-4 text-xl text-white bg-green-400 rounded-full '>Back to the game</button>
                </div>        
            </div>              
        }  
    </main>
    
  )
}
