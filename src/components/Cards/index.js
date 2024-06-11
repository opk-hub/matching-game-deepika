import { useState, useEffect } from "react";
import Card from "../Card";

function Cards({ userName }) {
  const [items, setItems] = useState(
    [
      { id: 1, img: "/img/html.png", stat: "" },
      { id: 1, img: "/img/html.png", stat: "" },
      { id: 2, img: "/img/css.png", stat: "" },
      { id: 2, img: "/img/css.png", stat: "" },
      { id: 3, img: "/img/js.png", stat: "" },
      { id: 3, img: "/img/js.png", stat: "" },
      { id: 4, img: "/img/scss.png", stat: "" },
      { id: 4, img: "/img/scss.png", stat: "" },
      { id: 5, img: "/img/react.png", stat: "" },
      { id: 5, img: "/img/react.png", stat: "" },
      { id: 6, img: "/img/vue.png", stat: "" },
      { id: 6, img: "/img/vue.png", stat: "" },
      { id: 7, img: "/img/angular.png", stat: "" },
      { id: 7, img: "/img/angular.png", stat: "" },
      { id: 8, img: "/img/nodejs.png", stat: "" },
      { id: 8, img: "/img/nodejs.png", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(120);
  const [gameFinished, setGameFinished] = useState(false);
  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0 && score < 8) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setGameFinished(true);
          return prevTime;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [score]);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setScore((prevScore) => prevScore + 1);
      if (score === 7) {
        clearInterval(timer);
      }
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (!gameFinished) {
      if (prev === -1) {
        items[id].stat = "active";
        setItems([...items]);
        setPrev(id);
      } else {
        check(id);
      }
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div>
      {time > 0 && score < 8 && (
        <div>
          <h1 className="game">Mahajong Game</h1>
          <div className="score">
            <p>Score: {score}</p>
            <p>Time: {formatTime(time)}</p>
          </div>

          <div className="card-container">
            <div className="user-name">Welcome {userName}!</div>
            <div className="container">
              {items.map((item, index) => (
                <Card
                  key={index}
                  item={item}
                  id={index}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {(time === 0 || score === 8) && (
        <div className="game-status">
          <div className="user-name">Welcome {userName}!</div>

          {score === 8 ? (
            <div>
              <div>
                <h2 className="game-res">Game Finished!</h2>
                <p className="result">Score: {score}</p>
                <p className="result"> Time Taken: {formatTime(120 - time)}</p>
              </div>
              <p>Congratulations! You've won the game!</p>
            </div>
          ) : (
            <div className="score-1">
              <p>Your final score: {score}</p>
              <p>Time's up! You lost the game! </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cards;
