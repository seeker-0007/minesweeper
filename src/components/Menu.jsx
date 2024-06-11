import { INITIAL_SETUP_DATA } from "../utils/constants.js";

const { timeCount, gameBombCount, initBombCount, width, height } =
  INITIAL_SETUP_DATA;

const BombCounter = ({ bombCount }) => (
  <div>
    <p>Bombs Left</p>
    <p>{gameBombCount}</p>
  </div>
);

const RestartController = () => <button>Restart</button>;

const TimeController = () => (
  <div>
    <p>Time Left</p>
    <p>{timeCount}</p>
  </div>
);

const Menu = ({ bombCount }) => (
  <div>
    <BombCounter bombCount={bombCount} />
    <RestartController />
    <TimeController />
  </div>
);

export default Menu;
