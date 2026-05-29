import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }) {
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 15 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i3] = 0
        colors[i3 + 1] = 1
        colors[i3 + 2] = 1
      } else if (colorChoice < 0.66) {
        colors[i3] = 1
        colors[i3 + 1] = 0
        colors[i3 + 2] = 1
      } else {
        colors[i3] = 0.5
        colors[i3 + 1] = 0.8
        colors[i3 + 2] = 1
      }
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShapes() {
  const group = useRef()
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05
      group.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.5
        child.rotation.x = state.clock.getElapsedTime() * 0.2 + i
        child.rotation.z = state.clock.getElapsedTime() * 0.1 + i
      })
    }
  })

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * (8 + Math.random() * 4),
          Math.sin(i * Math.PI / 4) * 2 - 2,
          Math.sin(i * Math.PI / 4) * (8 + Math.random() * 4)
        ]}>
          <icosahedronGeometry args={[0.3 + Math.random() * 0.3, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function Nebula() {
  const mesh = useRef()
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.getElapsedTime() * 0.02
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.01
    }
  })

  return (
    <mesh ref={mesh} scale={30}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#1a0a2e"
        side={THREE.BackSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function GridFloor() {
  const mesh = useRef()
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.opacity = 0.1 + Math.sin(state.clock.getElapsedTime()) * 0.05
    }
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial
        color="#00ffff"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

function AmbientGlow() {
  return (
    <>
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff00ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
    </>
  )
}

function Scanlines() {
  return null
}

export default function Scene3D() {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 20, 60]} />
      <AmbientGlow />
      <Nebula />
      <Particles />
      <FloatingShapes />
      <GridFloor />
    </>
  )
}