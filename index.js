const {vector: {Vector2}, comm} = require('bytearena-sdk');

function move({sendMoves}) {
  const moves = [];

  const force = new Vector2(0, 1);

  moves.push({ Method: 'steer', Arguments: force.toArray(5) });

  sendMoves(moves)
    .catch(err => {
      throw new Error("Something went wrong: " + err)
    });
}

comm
  .connect(
    process.env.PORT,
    process.env.HOST,
    process.env.AGENTID
  )
  .then((client) => {
    client.onTick(move)
  })
  .catch((err) => {
    throw new Error("Something went wrong: " + err)
  });

