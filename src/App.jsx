import { Physics } from '@react-three/rapier'
import useGame from './stores/useGame.jsx'
import Lights from './Lights.jsx'
import { Board } from './Board.jsx'
import Player from './Player.jsx'
import { OrbitControls, Effects } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })
export default function App() {
  const blocksCount = useGame((state) => state.blocksCount)
  const blocksSeed = useGame((state) => state.blocksSeed)

  return (
    <>
      <OrbitControls makeDefault />
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects>
      <color args={['#000']} attach='background' />
      <fog attach='fog' args={['red', 10, 25]} />
      <Physics debug={false}>
        <Lights />
        <Board />
        <Player />
      </Physics>
    </>
  )
}
