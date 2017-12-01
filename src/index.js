import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent to the game using the BA JS SDK
const agent = comm.connect();

// The JS SDK exposes an event-emitter API
// We subscribe to the perception of the world
agent.on("perception", perception => {
  const actions = [];

  // We can move by steering the agent.
  // The steering is a force represented
  // by a vector describing the desired
  // movement on the x and y axes.

  // In the following diagram,
  // the agent is represented by ▲
  // (nose pointing upwards)

  /*
                  +y
        Forward    |     Forward
          left    |     right
                  |
  -x ------------ ▲ ------------ +x
                  |
        Backward   |     Backward
            left   |     right
                  -y
*/

  // As you can see:
  // To move forward, we have to give a y > 0.
  // To turn right, an x > 0,
  // To turn left, an x < 0>

  // In this scaffolding code we're moving
  // randomly without avoiding obstacles.
  // We received a data structure containing
  // our current perception of the world.
  // You probably want to handle this
  // perception to react accordingly instead.

  const direction = Math.random() < 0.5 ? -1 : 1; // -1: left, 1: right
  const x = direction * Math.random();
  const y = 3; // move forward 3 meters

  // x, y coords mean "I want to move x meters lateraly and y meters forward"
  const steering = new Vector2(x, y);
  actions.push({ method: "steer", arguments: steering.toArray() });

  // Submitting our actions for this turn
  agent.takeActions(actions);
});
