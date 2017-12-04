// import SDK and vector facilities to ease development
import { vector, comm } from "bytearena-sdk";
const Vector2 = vector.Vector2;

// Connecting our agent
const agent = comm.connect();

// Watching perception stream
agent.on("perception", perception => {
  const actions = [];

  // Get a steering vector based on perception
  let steering = navigate(perception);
  const shooting = shoot(perception);

  // Submitting our actions for this turn
  actions.push({ method: "steer", arguments: steering.toArray() });
  if (shooting) actions.push({ method: "shoot", arguments: shooting.toArray() });

  agent.takeActions(actions);
});

// shoot() returns either null or a vector
// targeting the closest agent in sight
const shoot = perception => {

  let shooting = null;

  // for everything that stands in our field of view
  for (const perceived of perception.vision) {
    if (perceived.tag != "agent") continue;

    const otherAgentPosition = Vector2.fromArray(perceived.center);

    if (!shooting || otherAgentPosition.mag() < shooting.mag()) {
      shooting = otherAgentPosition;
    }
  }

  return shooting;
};

// Returns a steering vector exploring the world,
// or dodging an obstacle if there's any
const navigate = perception => {

  // Obtain a vector steering away from obstacles
  // if there's any on our path, or null if not
  // This func is defined below
  let steering = avoidObstables(perception);

  if (!steering) {
    // no obstacle has to be avoided
    // we can just stroll around randomly
    const direction = Math.random() < 0.5 ? -1 : 1; // -1: left, 1: right
    const x = direction * Math.random();
    const y = 3; // move forward 3 meters

    steering = new Vector2(x, y);
  }

  return steering;
};

// Returns a vector steering away from
// an obstacle if there's any in front of us
const avoidObstables = perception => {

  // this is the resulting vector (null if no vector)
  let steering = null;

  // this remembers the distance to the obstacle we're currently
  // steering away in the algorithm below
  let curdistance = null;

  // for everything that stands in our field of view
  for (const perceived of perception.vision) {

    // build a vector to the closest point of the obstacle
    const point = Vector2.fromArray(perceived.nearedge);

    // determine the angle of this point relative to us
    // angle increases clockwise, and 0 is at 12:00 on the clock
    // so 0° => straight ahead, 90° => 90° to our right, 270° => 90° to our left
    const angle = point.angle();  // in radians

    // The magnitude of a vector is its length
    // This is the distance between us and the obstacle
    const distance = point.mag(); // in meters

    // If obstacle is 15m away or less, and our current steering
    // is not yet avoiding any closer obstacle,
    // we steer away from this one
    if (distance < 15 && (!curdistance || curdistance > distance)) {

      if (angle < degreesToRadians(180)) {
        // obstacle is on our right, moving left
        steering = new Vector2(-10, 0);

      } else {
        // obstacle is on our left, moving right
        steering = new Vector2(10, 0);
      }

      // updating distance to obstacle currently steered away
      curdistance = distance;
    }
  }

  // Done ! returning either a vector, or null
  return steering;
}

// In Byte Arena, angles are expressed in radians
// This converts from radians to degrees
const degreesToRadians = deg => deg * (2 * Math.PI) / 360.0;