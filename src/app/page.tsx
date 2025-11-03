"use client";

import React, { FC, SVGProps, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Stars, OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Extend THREE.Color for use in JSX
extend({ Color: THREE.Color });

// --- 1. SVG Icon Definitions (Used in the 2D Overlay) ---
const Briefcase: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <path d="M10 12h4" />
  </svg>
);
const Code: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const Terminal: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const ArrowRight: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
// --- End SVG Definitions ---

// --- 2. Planet Component (Procedural Logic) ---
interface PlanetProps {
  name: string;
  size: number;
  distance: number;
  rotationSpeed: number;
  orbitalSpeed: number;
  hasRings?: boolean;
}

// Helper to determine color based on name (Procedural simulation)
const ProceduralColor: FC<{ planetName: string }> = ({ planetName }) => {
    const color = useMemo(() => {
        switch (planetName) {
            case 'Mercury': return new THREE.Color(0xAAAAAA);
            case 'Venus': return new THREE.Color(0xFFE0B2); 
            case 'Earth': return new THREE.Color(0x00AAFF);
            case 'Mars': return new THREE.Color(0xD94A3D);
            case 'Jupiter': return new THREE.Color(0xFF8844);
            case 'Saturn': return new THREE.Color(0xCCBBAA);
            case 'Uranus':
            case 'Neptune': return new THREE.Color(0x66CCFF);
            default: return new THREE.Color(0xCCCCCC);
        }
    }, [planetName]);

    return (
        <meshPhysicalMaterial 
            color={color}
            // Realism parameters to simulate varying surface/atmospheric properties
            roughness={planetName === 'Earth' ? 0.3 : 0.9} 
            metalness={0.05}
            clearcoat={planetName === 'Earth' ? 0.8 : 0.0}
        />
    );
};

// Saturn's Rings Component (Solid Color)
const SaturnRings = () => {
    const ringRotation = [Math.PI / 2, 0, 0] as [number, number, number];

    return (
        <mesh rotation={ringRotation}>
            <ringGeometry args={[1.5, 3.5, 64, 1]} /> 
            <meshStandardMaterial 
                color={new THREE.Color(0xCCBBAA)} 
                side={THREE.DoubleSide} 
                transparent={true} 
                opacity={0.6}
            />
        </mesh>
    );
};

const Planet: FC<PlanetProps> = ({ 
    name, size, distance, rotationSpeed, orbitalSpeed, hasRings 
}) => {
    const meshRef = useRef<THREE.Mesh>(null!);

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

    // Orbital Path Line
    const orbitPoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            points.push(new THREE.Vector3(distance * Math.sin(angle), 0, distance * Math.cos(angle)));
        }
        return points;
    }, [distance]);

    return (
        <group>
            {/* Render Orbit Line only for planets, not for the sun */}
            {distance > 0 && (
                <Line 
                    points={orbitPoints}
                    color="gray" lineWidth={0.1} transparent opacity={0.3} 
                />
            )}
            {/* Planet Sphere */}
            <Sphere ref={meshRef} args={[size, 64, 64]}>
                <ProceduralColor planetName={name} />
            </Sphere>
            {/* Rings for Saturn */}
            {hasRings && <SaturnRings />}
        </group>
    );
};


// --- 3. Solar System Scene Component (Including Travel Animation) ---
const PLANET_DATA = [
    { name: 'Sun', size: 2.5, distance: 0, rotationSpeed: 0.005, orbitalSpeed: 0 },
    { name: 'Mercury', size: 0.1, distance: 4, rotationSpeed: 0.01, orbitalSpeed: 0.04 },
    { name: 'Venus', size: 0.25, distance: 7, rotationSpeed: 0.005, orbitalSpeed: 0.06 },
    { name: 'Earth', size: 0.3, distance: 10, rotationSpeed: 0.02, orbitalSpeed: 0.015 },
    { name: 'Mars', size: 0.3, distance: 15, rotationSpeed: 0.03, orbitalSpeed: 0.009 },
    { name: 'Jupiter', size: 1.2, distance: 25, rotationSpeed: 0.008, orbitalSpeed: 0.004 },
    { name: 'Saturn', size: 1.0, distance: 35, hasRings: true, rotationSpeed: 0.007, orbitalSpeed: 0.003 },
    { name: 'Uranus', size: 0.7, distance: 45, rotationSpeed: 0.015, orbitalSpeed: 0.002 },
    { name: 'Neptune', size: 0.7, distance: 55, rotationSpeed: 0.016, orbitalSpeed: 0.001 },
];

const SunComponent: FC = () => {
    const sunData = PLANET_DATA.find(p => p.name === 'Sun');
    if (!sunData) return null;

    return (
        <mesh>
            <sphereGeometry args={[sunData.size, 64, 64]} />
            <meshPhysicalMaterial 
                color={new THREE.Color(0xFFCC00)} 
                emissive={new THREE.Color(0xFF8800)} 
                emissiveIntensity={10} 
                roughness={0} 
                metalness={1} 
            />
        </mesh>
    );
};

// Component to wrap the scene and apply the travel animation
const TravelingScene: FC = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const planets = useMemo(() => PLANET_DATA.filter(p => p.name !== 'Sun'), []);

    // 🌟 NEW: Apply a small, constant movement along the Z-axis (forward/backward)
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Move the entire system slowly backward (-Z direction) to simulate camera moving forward
            groupRef.current.position.z -= delta * 0.5; 
            
            // To maintain the illusion indefinitely, we reset the position 
            // once it moves far enough (e.g., beyond -100 units).
            if (groupRef.current.position.z < -100) {
                groupRef.current.position.z = 0; 
            }
        }
    });

    return (
        // The main group contains the sun and all planets
        <group ref={groupRef}>
            <SunComponent />
            {planets.map((data) => (
                <Planet key={data.name} {...data} />
            ))}
        </group>
    );
};


const SolarSystemScene: FC = () => {
  return (
    <Canvas camera={{ position: [0, 50, 80], fov: 45 }} className="bg-black">
        <Suspense fallback={null}> 
            <ambientLight intensity={0.05} /> 
            <pointLight position={[0, 0, 0]} intensity={100} distance={150} decay={0.5} /> 

            {/* Stars remain static or move independently of the main group for depth effect */}
            <Stars radius={100} depth={50} count={10000} factor={4} saturation={1} fade speed={1.5} />

            {/* The traveling group contains the entire solar system */}
            <TravelingScene /> 

            <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                minDistance={5} 
                maxDistance={120} 
            />
        </Suspense>
    </Canvas>
  );
};


// --- 4. Overlay Component (2D UI and Links) ---
const Overlay: FC = () => (
  <>
    {/* Main Title/Instruction (Top-Left) */}
    <div className="absolute top-0 left-0 p-8 text-white z-10 w-full pointer-events-none">
        <h1 className="text-6xl font-extralight tracking-widest mb-2">SHUBHAM'S COSMIC WORKSPACE</h1>
        <p className="text-lg text-indigo-400">
            Interactive 3D Solar System. Scroll to zoom, click-and-drag to orbit.
        </p>
    </div>
    
    {/* Links Panel (Bottom-Right) */}
    <div className="absolute bottom-8 right-8 z-10 p-6 rounded-xl bg-gray-900/70 backdrop-blur-md pointer-events-auto shadow-2xl border border-indigo-700/50 transition-all duration-500 hover:bg-gray-800/80">
        <div className="max-w-md">
            {/* Navigational Links */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <a
                    href="/mywork"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
                >
                    VIEW MY WORK <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a
                    href="/portfolio"
                    className="border border-gray-500 text-white hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md flex items-center justify-center transition duration-300"
                >
                    PORTFOLIO
                </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 border-t pt-6 border-gray-700">
                <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                    aria-label="LinkedIn"
                >
                    <Briefcase className="w-6 h-6" />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                    aria-label="GitHub"
                >
                    <Code className="w-6 h-6" />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition"
                    aria-label="Twitter"
                >
                    <Terminal className="w-6 h-6" />
                </a>
            </div>
        </div>
    </div>
  </>
);


// --- 5. Main HomePage Component ---
const HomePage: FC = () => {
    return (
        <main className="h-screen w-screen relative bg-black">
            {/* The 3D component takes up the full screen */}
            <div className="h-full w-full">
                <SolarSystemScene />
            </div>
            
            {/* Render the 2D overlay on top */}
            <Overlay />
        </main>
    );
};

export default HomePage;