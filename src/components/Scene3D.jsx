import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Scene3D() {
  const meshRef = useRef()
  const particlesRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.2
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#00ffff" transparent opacity={0.6} />
      </points>
    </>
  )
}

export default Scene3D