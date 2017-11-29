import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent to the game using the BA JS SDK
const agent = comm.connect();

// The JS SDK exposes an event-emitter API
// We subscribe to the perception of the world
agent.on("perception", perception => {
  const actions = [];

  // In this scaffolding code we're blindly moving forward
  // The game gave us a data structure containing our current perception of the world
  // You probably want to handle this perception to react accordingly instead

  const steering = new Vector2(0, 1); // x: 0, y: 1 means "I want to move 0 meters lateraly and 1 meter forward"
  actions.push({ method: "steer", arguments: steering.toArray() });

  // Submitting our actions for this turn
  agent.takeActions(actions);
});
