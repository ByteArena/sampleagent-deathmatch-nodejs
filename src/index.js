import {vector, comm} from 'bytearena-sdk';

const Vector2 = vector.Vector2;
const agent = comm.connect();

agent.on('perception', perception => {
  const actions = [];

  const force = new Vector2(0, 1);

  actions.push({ method: 'steer', arguments: force.toArray(5) });

  // Pushing batch of mutations
  agent.takeActions(actions);
});
