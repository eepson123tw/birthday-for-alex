import { Physics } from "@react-three/rapier";
import useGame from "./stores/useGame.jsx";
import Lights from "./Lights.jsx";
import { Board } from "./Board.jsx";
import Player from "./Player.jsx";
import { OrbitControls } from "@react-three/drei";
export default function App() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#000"]} attach="background" />
      <Physics debug={false}>
        <Lights />
        <Board />
        <Player />
      </Physics>
    </>
  );
}
