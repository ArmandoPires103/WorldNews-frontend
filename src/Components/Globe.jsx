// src/Components/Globe.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three';

const Globe = () => {
  const globeRef = useRef();

  // Rotate the globe
  useFrame(() => {
    globeRef.current.rotation.y += 0.002;
  });

  // Use a relative path to the texture file
  const texture = new TextureLoader().load('/earth_texture.jpg');

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const GlobeCanvas = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <Globe />
      <OrbitControls />
    </Canvas>
  );
};

export default GlobeCanvas;


