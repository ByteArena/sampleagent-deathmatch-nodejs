import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent to the game using the BA JS SDK
const agent = comm.connect();

// The JS SDK exposes an event-emitter API
// We subscribe to the perception of the world
agent.on("perception", perception => {
  const actions = [];

  // We can move by steering the agent
  // The steering is a force represented by a vector
  // Describing the desired movement of the agent on the x and y axes

  /*
                   +y
         Forward    |     Forward
            left    |     right
                    |
    -x -------------O------------- +x
                    |
         Backward   |     Backward
             left   |     right
                   -y
  */

  // In this scaffolding code we're randomly moving without avoiding obstacles
  // The game gave us a data structure containing our current perception of the world
  // You probably want to handle this perception to react accordingly instead

  const direction = Math.random() < 0.5 ? -1 : 1; // -1: left, 1: right
  const x = direction * Math.random()
  const y = 3; // move forward 3 meters

  const steering = new Vector2(x, y); // x, y coords; means "I want to move x meters lateraly and y meters forward"
  actions.push({ method: "steer", arguments: steering.toArray() });

  // Submitting our actions for this turn
  agent.takeActions(actions);
});
