'use client'
import { useEffect, useState } from "react"


export default function Home() {
  const [turn,setTurn] = useState<"X"|"O">("X")
  const [board,setBoard] = useState<string[]>([" "," "," "," "," "," "," "," "," "])
  const [winner,setWinner] = useState<string>(" ")
  //combinaciones ganadoras

  const WINNER_COMBS = [
    [0,1,2],
    [3,4,5,],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  
  
  const checkWinner = (board:Array<string>)=>{
    for(let i = 0; i< WINNER_COMBS.length; i++){
    const [x,y,z] = WINNER_COMBS[i]
        if(board[x] == board[y] && board[y] ===board[z]){
          setWinner(board[x]) 
          return board[x]
    }
  }
  }

  const handleClick = (index:number) =>{
    if(board[index]!= " "){
        return
    }else{
      
      //creamos una copia del array
      const newBoard = [...board]
      //llenamos en el indice que clickeamos con X o O 
        newBoard[index] = turn
      //le pasamos el array actualizado al board
        setBoard(newBoard)
      //Cambiamos el turno segun corresponda
        setTurn(turn => turn == "X" ? "O" : "X")

        checkWinner(newBoard)   
      }    
  }

  
  return (
  
    <main className="w-full">

   
    <div className= "flex flex-col items-center justify-center w-full">
      <h1 className="my-10 text-6xl font-bold">TA TE TI</h1>
          <section className="grid  w-[210px] h-[210px] justify-items-center grid-rows-3 gap-6 grid-cols-3">
              {board.map((cells,index)=>(
              <div className="w-[70px] h-[70px] flex justify-center rounded-xl items-center border shadow-md hover:cursor-pointer " onClick={()=>handleClick(index)}>
                  <p className={cells== "O" ? "text-5xl font-bold text-blue-500" : "text-5xl text-red-500 font-bold" }>
                    {cells}
                  </p>
              </div>
              ))
              }
              
          </section>               
          
        </div> 
        {winner != " " && 
                <div className="w-full text-center mt-11">
                    <p className="text-xl">
                        The <span className="text-green-500">winner</span> is {winner}
                    </p>
                    <button>New Game</button>  
                </div>
          }
        </main>
    
  )
}
