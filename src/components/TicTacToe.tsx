import React, { useState } from 'react'

const TicTacToe = () => {
  const [square, setSquare] = useState<string[] | null[]>([null, null, null, null, null, null, null, null, null]);
  const [playerTurn, setPlayerTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [winnerIs, setWinnerIs] = useState<string | null>(null);
  const PLAYER_1 = 'O';
  const PLAYER_2 = 'X';
  const winingPathern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
  const [playerOneScore, setPlayerOneScore] = useState<number>(0);
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);
  let turn = 0;

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSquare([null, null, null, null, null, null, null, null, null])
    setWinner(false)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    e.preventDefault()
    if (!winner) {
      square[i] !== null ?
        console.log("The square you try to press is already taken") :
        setSquare((prevValue) => {
          playerTurn ? prevValue[i] = PLAYER_2 : prevValue[i] = PLAYER_1;
          setPlayerTurn(!playerTurn)
          return prevValue;
        })
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Check for winner
    for (let i = 0; i < winingPathern.length; i++) {
      const winPath = winingPathern[i];
      if (square[winPath[0]] === PLAYER_1 && square[winPath[1]] === PLAYER_1 && square[winPath[2]] === PLAYER_1) {
        setWinner(true);
        setWinnerIs(PLAYER_1);
        !winner && setPlayerOneScore(playerOneScore + 1);
      }
      if (square[winPath[0]] === PLAYER_2 && square[winPath[1]] === PLAYER_2 && square[winPath[2]] === PLAYER_2) {
        setWinner(true);
        setWinnerIs(PLAYER_2);
        !winner && setPlayerTwoScore(playerTwoScore + 1);
      }
    }
    turn += 1;
  }
  return (
    <>
      <div className='font-bold p-4 text-center'>TicTacToe</div>
      <div className='text-center'>
        {`Score ${playerOneScore} - ${playerTwoScore}`}
      </div>
      <div className='flex flex-col h-full pt-2'>
        <div className='grid grid-cols-3 gap-0 m-auto'>
          {square.map((sqr, index) => (
            <button
              key={index}
              type='button'
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseUp={handleMouseUp}
              className='flex justify-center items-center border-2 border-solid border-gray-700 w-16 h-16'
            >
              {sqr}
            </button>
          ))}
        </div>

        <div className='p-4 self-center'>
          <button type='button' onClick={handleReset}>Restart</button>
        </div>
      </div>
      <div className='w-full h-10'>
        {winner && (
          <div className='text-center text-lg'>
            The winner is:
            <span className='w-full h-full text-indigo-300'> {winnerIs}</span>
          </div>
        )}
      </div >

    </>
  )
}

export default TicTacToe