// src/components/Planet.tsx
import React, { useRef } from 'react';
// 💡 CORRECTED: Import useFrame and useLoader from '@react-three/fiber'
import { useFrame, useLoader } from '@react-three/fiber'; 
// Note: OrbitControls is not used directly in this component, but is fine to keep if you move it up
import { Sphere } from '@react-three/drei'; 
import * as THREE from 'three';

// Props to make the planet dynamic
interface PlanetProps {
  size: number; // Radius of the planet
  distance: number; // Distance from the Sun (orbital radius)
  texturePath: string; // Path to the planet's surface texture
  rotationSpeed: number; // Speed of the planet's self-rotation
  orbitalSpeed: number; // Speed of the planet's orbit around the Sun
}

const Planet: React.FC<PlanetProps> = ({ size, distance, texturePath, rotationSpeed, orbitalSpeed }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // 💡 CORRECTED LINE: Access useLoader directly (no longer using THREE.useLoader)
  // useLoader takes the THREE loader class and an array of paths/arguments
  const texture = useLoader(THREE.TextureLoader, texturePath);

  // Use useFrame to animate the planet's rotation and orbit
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // 1. Self-Rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }

    // 2. Orbit (Circular path around the origin [0,0,0])
    const x = distance * Math.sin(time * orbitalSpeed);
    const z = distance * Math.cos(time * orbitalSpeed);
    if (meshRef.current) {
        meshRef.current.position.x = x;
        meshRef.current.position.z = z;
    }
  });

  return (
    <>
      {/* 3D Sphere for the Planet */}
      <Sphere ref={meshRef} args={[size, 64, 64]}>
        <meshStandardMaterial map={texture} />
      </Sphere>

      {/* Optional: Add an invisible line for the orbit path (Requires a separate component/logic) */}
    </>
  );
};

export default Planet;