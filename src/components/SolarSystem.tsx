// src/components/SolarSystem.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Planet from './Planet'; // Import the Planet component
import * as THREE from 'three';

const Sun: React.FC = () => {
    // A high-emission sphere for the Sun
    return (
        <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            
            {/* 💡 CORRECTED: Use meshStandardMaterial to support the emissive property */}
            <meshStandardMaterial 
                color="yellow" 
                emissive="orange" 
                emissiveIntensity={5} 
            />
        </mesh>
    );
};

const SolarSystem: React.FC = () => {
    // Define planet data: size, distance, texture, speeds (simplified for example)
    const planetData = [
      { name: 'Mercury', size: 0.1, distance: 4, rotationSpeed: 0.01, orbitalSpeed: 0.8, texturePath: '/textures/mercury.jpg' },
      { name: 'Venus', size: 0.25, distance: 7, rotationSpeed: 0.005, orbitalSpeed: 0.6, texturePath: '/textures/venus.jpg' },
      { name: 'Earth', size: 0.3, distance: 10, rotationSpeed: 0.02, orbitalSpeed: 0.4, texturePath: '/textures/earth.jpg' },
      // ... add Mars, Jupiter, Saturn, Uranus, Neptune
    ];

    return (
      // Canvas acts as the WebGL container
      <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
          {/* Suspense is needed while textures are loading */}
          <Suspense fallback={null}> 
              {/* Ambient light for general scene visibility */}
              <ambientLight intensity={0.5} /> 
              
              {/* The sun itself acts as a light source (PointLight) */}
              <pointLight position={[0, 0, 0]} intensity={20} distance={100} /> 

              {/* Background stars */}
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

              {/* The Sun at the center of the scene */}
              <Sun />

              {/* Map over the planet data to render each one */}
              {planetData.map((data) => (
                  <Planet 
                      key={data.name} 
                      size={data.size} 
                      distance={data.distance} 
                      rotationSpeed={data.rotationSpeed}
                      orbitalSpeed={data.orbitalSpeed}
                      texturePath={data.texturePath}
                  />
              ))}

              {/* OrbitControls enables free camera movement, zoom, and panning */}
              <OrbitControls 
                  enableZoom={true} 
                  enablePan={true} 
                  minDistance={5} // Minimum zoom distance
                  maxDistance={100} // Maximum zoom distance
              />
          </Suspense>
      </Canvas>
    );
};

export default SolarSystem;