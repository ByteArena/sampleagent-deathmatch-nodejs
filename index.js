const {vector: {Vector2}, comm} = require('bytearena-sdk');

const agent = comm.connect();

agent.on('perception', perception => {
  const actions = [];

  const force = new Vector2(0, 1);

  actions.push({ Method: 'steer', Arguments: force.toArray(5) });

  // Pushing batch of mutations
  agent.takeActions(actions);
});
