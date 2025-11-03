"use client";

import React, { FC, SVGProps, useRef, useMemo, Suspense, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Line, Sphere, Text, useTexture, useGLTF, PerspectiveCamera, Environment, Sky, Cloud, Sparkles, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, GodRays, LensFlare, ChromaticAberration, Scanline, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';

// Extend THREE for use in JSX
extend({ 
  Color: THREE.Color,
  Vector3: THREE.Vector3,
  Group: THREE.Group
});

// ----------------------------------------------------
// TYPES AND INTERFACES
// ----------------------------------------------------

interface PlanetProps {
  name: string;
  size: number;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
  rotationSpeed: number;
  inclination: number;
  axialTilt: number;
  hasRings?: boolean;
  atmosphereDensity?: number;
  moons?: MoonProps[];
  textureUrl?: string;
  bumpMapUrl?: string;
  specularMapUrl?: string;
  cloudMapUrl?: string;
  terrainIntensity?: number;
  isGasGiant?: boolean;
  mass?: number;
  temperature?: number;
  discoveryYear?: number;
  description?: string;
}

interface MoonProps {
  name: string;
  size: number;
  distance: number;
  orbitalPeriod: number;
  rotationSpeed: number;
}

interface SpacecraftProps {
  position: [number, number, number];
  targetPlanet?: string;
  speed: number;
  missionType: 'orbiter' | 'lander' | 'flyby';
}

interface CameraState {
  mode: 'free' | 'planet_focus' | 'surface_view' | 'spacecraft_chase';
  target: string | null;
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

// ----------------------------------------------------
// CONSTANTS AND CONFIGURATION
// ----------------------------------------------------

// Realistic planetary data with enhanced parameters
const PLANET_DATA: PlanetProps[] = [
  {
    name: 'Sun',
    size: 6.96,
    semiMajorAxis: 0,
    eccentricity: 0,
    orbitalPeriod: 0,
    rotationSpeed: 0.002,
    inclination: 0,
    axialTilt: 0,
    mass: 1.989e30,
    temperature: 5778,
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma.'
  },
  {
    name: 'Mercury',
    size: 0.24,
    semiMajorAxis: 5.79,
    eccentricity: 0.206,
    orbitalPeriod: 0.24,
    rotationSpeed: 0.005,
    inclination: 7.0,
    axialTilt: 0.034,
    textureUrl: '/textures/mercury/mercury_map.jpg',
    bumpMapUrl: '/textures/mercury/mercury_bump.jpg',
    terrainIntensity: 2.0,
    mass: 3.301e23,
    temperature: 440,
    discoveryYear: -3000,
    description: 'Mercury is the smallest and innermost planet in the Solar System.'
  },
  {
    name: 'Venus',
    size: 0.61,
    semiMajorAxis: 10.82,
    eccentricity: 0.007,
    orbitalPeriod: 0.62,
    rotationSpeed: -0.001, // Retrograde rotation
    inclination: 3.4,
    axialTilt: 177.4,
    textureUrl: '/textures/venus/venus_map.jpg',
    cloudMapUrl: '/textures/venus/venus_clouds.jpg',
    atmosphereDensity: 0.9,
    mass: 4.867e24,
    temperature: 737,
    discoveryYear: -3000,
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor.'
  },
  {
    name: 'Earth',
    size: 0.64,
    semiMajorAxis: 15.0,
    eccentricity: 0.017,
    orbitalPeriod: 1.0,
    rotationSpeed: 0.01,
    inclination: 0.0,
    axialTilt: 23.44,
    textureUrl: '/textures/earth/earth_map.jpg',
    bumpMapUrl: '/textures/earth/earth_bump.jpg',
    specularMapUrl: '/textures/earth/earth_specular.jpg',
    cloudMapUrl: '/textures/earth/earth_clouds.jpg',
    atmosphereDensity: 0.7,
    terrainIntensity: 1.5,
    moons: [
      {
        name: 'Moon',
        size: 0.17,
        distance: 1.5,
        orbitalPeriod: 0.074,
        rotationSpeed: 0.004
      }
    ],
    mass: 5.972e24,
    temperature: 288,
    discoveryYear: -3000,
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life.'
  },
  {
    name: 'Mars',
    size: 0.34,
    semiMajorAxis: 22.79,
    eccentricity: 0.093,
    orbitalPeriod: 1.88,
    rotationSpeed: 0.009,
    inclination: 1.85,
    axialTilt: 25.19,
    textureUrl: '/textures/mars/mars_map.jpg',
    bumpMapUrl: '/textures/mars/mars_bump.jpg',
    terrainIntensity: 3.0,
    atmosphereDensity: 0.1,
    moons: [
      {
        name: 'Phobos',
        size: 0.05,
        distance: 0.7,
        orbitalPeriod: 0.003,
        rotationSpeed: 0.02
      },
      {
        name: 'Deimos',
        size: 0.03,
        distance: 1.0,
        orbitalPeriod: 0.008,
        rotationSpeed: 0.015
      }
    ],
    mass: 6.39e23,
    temperature: 210,
    discoveryYear: -3000,
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.'
  },
  {
    name: 'Jupiter',
    size: 7.0,
    semiMajorAxis: 77.8,
    eccentricity: 0.048,
    orbitalPeriod: 11.86,
    rotationSpeed: 0.02,
    inclination: 1.31,
    axialTilt: 3.13,
    textureUrl: '/textures/jupiter/jupiter_map.jpg',
    atmosphereDensity: 0.8,
    isGasGiant: true,
    mass: 1.898e27,
    temperature: 165,
    discoveryYear: -3000,
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System.'
  },
  {
    name: 'Saturn',
    size: 5.8,
    semiMajorAxis: 143.4,
    eccentricity: 0.056,
    orbitalPeriod: 29.46,
    rotationSpeed: 0.018,
    inclination: 2.49,
    axialTilt: 26.73,
    textureUrl: '/textures/saturn/saturn_map.jpg',
    atmosphereDensity: 0.7,
    hasRings: true,
    isGasGiant: true,
    mass: 5.683e26,
    temperature: 134,
    discoveryYear: -3000,
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System.'
  },
  {
    name: 'Uranus',
    size: 2.5,
    semiMajorAxis: 287.1,
    eccentricity: 0.046,
    orbitalPeriod: 84.01,
    rotationSpeed: -0.012, // Retrograde rotation
    inclination: 0.77,
    axialTilt: 97.77,
    textureUrl: '/textures/uranus/uranus_map.jpg',
    atmosphereDensity: 0.6,
    isGasGiant: true,
    mass: 8.681e25,
    temperature: 76,
    discoveryYear: 1781,
    description: 'Uranus is the seventh planet from the Sun and has the third-largest planetary radius.'
  },
  {
    name: 'Neptune',
    size: 2.4,
    semiMajorAxis: 449.5,
    eccentricity: 0.010,
    orbitalPeriod: 164.8,
    rotationSpeed: 0.015,
    inclination: 1.77,
    axialTilt: 28.32,
    textureUrl: '/textures/neptune/neptune_map.jpg',
    atmosphereDensity: 0.7,
    isGasGiant: true,
    mass: 1.024e26,
    temperature: 72,
    discoveryYear: 1846,
    description: 'Neptune is the eighth and farthest-known Solar planet from the Sun.'
  }
];

// ----------------------------------------------------
// ADVANCED SHADERS AND MATERIALS
// ----------------------------------------------------

// Advanced noise functions for procedural generation
const advancedNoiseFunctions = `
  // Advanced 3D Noise Functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractional Brownian Motion
  float fbm(vec3 p, int octaves, float lacunarity, float gain) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < octaves; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return value;
  }

  // Ridged multi-fractal noise
  float ridgedMF(vec3 p, int octaves, float lacunarity, float gain, float offset) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float prev = 1.0;
    
    for (int i = 0; i < octaves; i++) {
      float n = abs(snoise(p * frequency));
      n = offset - n;
      n *= n;
      n *= prev;
      value += n * amplitude;
      prev = n;
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return value;
  }
`;

// Advanced terrain shader
const advancedTerrainVertexShader = `
  uniform float time;
  uniform float terrainIntensity;
  uniform float planetRadius;
  
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vElevation;

  ${advancedNoiseFunctions}

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    
    // Calculate world position for spherical coordinates
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    // Convert to spherical coordinates for terrain generation
    float latitude = asin(position.y / planetRadius);
    float longitude = atan(position.z, position.x);
    
    // Generate terrain using multiple noise layers
    vec3 terrainPos = position * 2.0;
    
    // Base continent shape
    float continent = fbm(terrainPos, 4, 2.0, 0.5);
    continent = smoothstep(0.2, 0.8, continent);
    
    // Mountain ranges
    float mountains = ridgedMF(terrainPos * 4.0 + time * 0.01, 6, 2.0, 0.5, 1.0);
    
    // Fine detail
    float detail = snoise(terrainPos * 16.0) * 0.1;
    
    // Combine terrain layers
    float elevation = continent * 0.3 + mountains * 0.15 + detail * 0.05;
    elevation *= terrainIntensity;
    vElevation = elevation;
    
    // Displace vertex along normal
    vec3 displacedPosition = position + normal * elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const advancedTerrainFragmentShader = `
  uniform sampler2D diffuseMap;
  uniform sampler2D bumpMap;
  uniform sampler2D specularMap;
  uniform vec3 lightDirection;
  uniform float time;
  uniform vec3 atmosphereColor;
  uniform float atmosphereDensity;
  
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vElevation;

  ${advancedNoiseFunctions}

  void main() {
    // Sample textures
    vec4 diffuseColor = texture2D(diffuseMap, vUv);
    vec3 bumpNormal = texture2D(bumpMap, vUv).rgb * 2.0 - 1.0;
    float specularIntensity = texture2D(specularMap, vUv).r;
    
    // Enhanced normal with bump mapping
    vec3 normal = normalize(vNormal + bumpNormal * 0.3);
    
    // Dynamic lighting based on elevation
    float NdotL = max(dot(normal, normalize(lightDirection)), 0.0);
    
    // Elevation-based coloring
    vec3 terrainColor = diffuseColor.rgb;
    
    // Snow caps on high elevations
    if (vElevation > 0.25) {
      float snow = smoothstep(0.25, 0.3, vElevation);
      terrainColor = mix(terrainColor, vec3(1.0), snow);
    }
    
    // Water in low elevations
    if (vElevation < 0.05) {
      float water = smoothstep(0.05, 0.02, vElevation);
      terrainColor = mix(terrainColor, vec3(0.1, 0.2, 0.8), water);
      specularIntensity = mix(specularIntensity, 0.8, water);
    }
    
    // Advanced lighting model
    vec3 ambient = terrainColor * 0.1;
    vec3 diffuse = terrainColor * NdotL;
    
    // Specular highlights
    vec3 viewDir = normalize(-vWorldPosition);
    vec3 reflectDir = reflect(-normalize(lightDirection), normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = vec3(0.5) * spec * specularIntensity;
    
    // Atmospheric scattering
    float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
    vec3 atmosphere = atmosphereColor * fresnel * atmosphereDensity;
    
    // Final color composition
    vec3 finalColor = ambient + diffuse + specular + atmosphere;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Advanced atmosphere shader
const advancedAtmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const advancedAtmosphereFragmentShader = `
  uniform vec3 atmosphereColor;
  uniform float atmosphereIntensity;
  uniform vec3 lightDirection;
  uniform float time;
  
  varying vec3 vNormal;
  varying vec3 vViewDirection;
  
  ${advancedNoiseFunctions}

  void main() {
    // Enhanced atmospheric scattering
    float fresnel = pow(1.0 - max(dot(vViewDirection, vNormal), 0.0), 2.0);
    
    // Light scattering effect
    float scatter = max(dot(vNormal, normalize(lightDirection)), 0.0);
    scatter = pow(scatter, 0.8);
    
    // Animated atmospheric glow
    float pulse = sin(time * 0.5) * 0.1 + 0.9;
    
    // Cloud-like noise in atmosphere
    vec3 noisePos = vNormal * 5.0 + time * 0.01;
    float cloudNoise = snoise(noisePos) * 0.3 + 0.7;
    
    // Final atmosphere calculation
    float atmosphere = fresnel * scatter * pulse * cloudNoise * atmosphereIntensity;
    
    // Color with depth variation
    vec3 color = atmosphereColor * atmosphere;
    
    gl_FragColor = vec4(color, atmosphere * 0.8);
  }
`;

// ----------------------------------------------------
// CUSTOM HOOKS
// ----------------------------------------------------

const useCameraController = () => {
  const { camera, gl } = useThree();
  const [cameraState, setCameraState] = useState<CameraState>({
    mode: 'free',
    target: null,
    position: new THREE.Vector3(0, 50, 80),
    lookAt: new THREE.Vector3(0, 0, 0)
  });

  const focusOnPlanet = useCallback((planetName: string, planetPosition: THREE.Vector3, planetSize: number) => {
    const offset = new THREE.Vector3(planetSize * 3, planetSize * 1.5, planetSize * 3);
    const targetPosition = planetPosition.clone().add(offset);
    
    setCameraState({
      mode: 'planet_focus',
      target: planetName,
      position: targetPosition,
      lookAt: planetPosition
    });
  }, []);

  const enterSurfaceView = useCallback((planetName: string, planetPosition: THREE.Vector3, planetSize: number) => {
    const surfacePosition = planetPosition.clone().add(new THREE.Vector3(0, planetSize * 1.1, 0));
    
    setCameraState({
      mode: 'surface_view',
      target: planetName,
      position: surfacePosition,
      lookAt: planetPosition.clone().add(new THREE.Vector3(planetSize * 2, 0, 0))
    });
  }, []);

  const resetCamera = useCallback(() => {
    setCameraState({
      mode: 'free',
      target: null,
      position: new THREE.Vector3(0, 50, 80),
      lookAt: new THREE.Vector3(0, 0, 0)
    });
  }, []);

  // Smooth camera transitions
  useFrame(() => {
    const transitionSpeed = 0.05;
    camera.position.lerp(cameraState.position, transitionSpeed);
    
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const targetLookAt = cameraState.lookAt.clone().sub(camera.position).normalize();
    
    const newLookAt = currentLookAt.lerp(targetLookAt, transitionSpeed);
    camera.lookAt(camera.position.clone().add(newLookAt));
  });

  return {
    cameraState,
    focusOnPlanet,
    enterSurfaceView,
    resetCamera
  };
};

const usePlanetaryPhysics = (semiMajorAxis: number, eccentricity: number, orbitalPeriod: number, inclination: number) => {
  const orbitRef = useRef<THREE.Group>(null!);
  const TIME_SCALE = 0.00001;
  const G = 6.67430e-11; // Gravitational constant

  const meanMotion = useMemo(() => (2 * Math.PI) / orbitalPeriod, [orbitalPeriod]);

  useFrame(({ clock }) => {
    if (!orbitRef.current) return;

    const time = clock.getElapsedTime() * TIME_SCALE;
    const M = meanMotion * time;

    // Solve Kepler's Equation for Eccentric Anomaly
    let E = M;
    for (let i = 0; i < 10; i++) {
      E = M + eccentricity * Math.sin(E);
    }

    // Calculate True Anomaly and distance
    const r = semiMajorAxis * (1 - eccentricity * Math.cos(E));
    const v = 2 * Math.atan2(
      Math.sqrt(1 + eccentricity) * Math.sin(E / 2),
      Math.sqrt(1 - eccentricity) * Math.cos(E / 2)
    );

    // Convert to Cartesian coordinates with inclination
    const x = r * Math.cos(v);
    const z = r * Math.sin(v);
    const y = Math.sin(inclination * Math.PI / 180) * z;

    orbitRef.current.position.set(x, y, z);
  });

  return orbitRef;
};

// ----------------------------------------------------
// ADVANCED COMPONENTS
// ----------------------------------------------------

// Enhanced Planet Material with multiple texture support
const AdvancedPlanetMaterial: FC<{ planetData: PlanetProps }> = ({ planetData }) => {
  const [diffuseMap, bumpMap, specularMap] = useTexture([
    planetData.textureUrl || '/textures/fallback/fallback_diffuse.jpg',
    planetData.bumpMapUrl || '/textures/fallback/fallback_bump.jpg',
    planetData.specularMapUrl || '/textures/fallback/fallback_specular.jpg'
  ]);

  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const lightDirection = useMemo(() => new THREE.Vector3(1, 1, 1).normalize(), []);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      vertexShader={advancedTerrainVertexShader}
      fragmentShader={advancedTerrainFragmentShader}
      uniforms={{
        time: { value: 0 },
        terrainIntensity: { value: planetData.terrainIntensity || 1.0 },
        planetRadius: { value: planetData.size },
        diffuseMap: { value: diffuseMap },
        bumpMap: { value: bumpMap },
        specularMap: { value: specularMap },
        lightDirection: { value: lightDirection },
        atmosphereColor: { value: new THREE.Color(0.4, 0.6, 1.0) },
        atmosphereDensity: { value: planetData.atmosphereDensity || 0.0 }
      }}
    />
  );
};

// Advanced Atmosphere Component
const AdvancedAtmosphere: FC<{ planetData: PlanetProps }> = ({ planetData }) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  
  const atmosphereColor = useMemo(() => {
    switch (planetData.name) {
      case 'Earth': return new THREE.Color(0.2, 0.4, 1.0);
      case 'Venus': return new THREE.Color(1.0, 0.8, 0.6);
      case 'Mars': return new THREE.Color(1.0, 0.4, 0.2);
      default: return new THREE.Color(0.4, 0.6, 1.0);
    }
  }, [planetData.name]);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={1.1}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={advancedAtmosphereVertexShader}
        fragmentShader={advancedAtmosphereFragmentShader}
        uniforms={{
          atmosphereColor: { value: atmosphereColor },
          atmosphereIntensity: { value: planetData.atmosphereDensity || 0.5 },
          lightDirection: { value: new THREE.Vector3(1, 1, 1).normalize() },
          time: { value: 0 }
        }}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
      />
    </mesh>
  );
};

// Cloud Layer Component
const CloudLayer: FC<{ planetData: PlanetProps }> = ({ planetData }) => {
  const cloudMap = useTexture(planetData.cloudMapUrl || '/textures/fallback/fallback_clouds.jpg');
  
  return (
    <mesh scale={1.05}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        map={cloudMap}
        transparent={true}
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Enhanced Ring System for Saturn
const AdvancedRingSystem: FC<{ planetData: PlanetProps }> = ({ planetData }) => {
  const ringTexture = useTexture('/textures/saturn/saturn_rings.png');
  
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.2, 3.5, 128]} />
        <meshBasicMaterial
          map={ringTexture}
          transparent={true}
          side={THREE.DoubleSide}
          opacity={0.8}
        />
      </mesh>
      {/* Inner detailed rings */}
      <mesh rotation={[0, 0, 0.1]}>
        <ringGeometry args={[1.5, 2.8, 256]} />
        <meshBasicMaterial
          map={ringTexture}
          transparent={true}
          side={THREE.DoubleSide}
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

// Moon System Component
const MoonSystem: FC<{ moons: MoonProps[], planetSize: number }> = ({ moons, planetSize }) => {
  return (
    <group>
      {moons.map((moon, index) => (
        <MoonComponent key={moon.name} moon={moon} planetSize={planetSize} index={index} />
      ))}
    </group>
  );
};

const MoonComponent: FC<{ moon: MoonProps, planetSize: number, index: number }> = ({ moon, planetSize, index }) => {
  const orbitRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (orbitRef.current) {
      const time = clock.getElapsedTime() * 0.1;
      const angle = (time / moon.orbitalPeriod) * Math.PI * 2;
      const distance = planetSize + moon.distance;
      
      orbitRef.current.position.x = Math.cos(angle) * distance;
      orbitRef.current.position.z = Math.sin(angle) * distance;
      orbitRef.current.rotation.y += moon.rotationSpeed;
    }
  });

  return (
    <group ref={orbitRef}>
      <Sphere args={[moon.size, 32, 32]}>
        <meshStandardMaterial color="gray" roughness={0.8} />
      </Sphere>
      {/* Moon orbit line */}
      <Line
        points={Array.from({ length: 64 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2;
          const x = Math.cos(angle) * (planetSize + moon.distance);
          const z = Math.sin(angle) * (planetSize + moon.distance);
          return new THREE.Vector3(x, 0, z);
        })}
        color="gray"
        transparent
        opacity={0.2}
        lineWidth={1}
      />
    </group>
  );
};

// Spacecraft Component
const Spacecraft: FC<SpacecraftProps> = ({ position, targetPlanet, speed, missionType }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Animate spacecraft movement
      const time = clock.getElapsedTime();
      meshRef.current.position.x = position[0] + Math.sin(time * speed) * 10;
      meshRef.current.position.y = position[1] + Math.cos(time * speed) * 5;
      meshRef.current.position.z = position[2] + Math.sin(time * speed * 0.5) * 8;
      
      // Rotate towards movement direction
      meshRef.current.rotation.x = Math.sin(time) * 0.1;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={trailRef}>
      <Trail
        width={2}
        length={10}
        color={new THREE.Color(0.2, 0.8, 1.0)}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef} position={position}>
          <coneGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#4FC3F7" emissive="#0066CC" emissiveIntensity={0.5} />
        </mesh>
      </Trail>
      
      {/* Engine glow */}
      <pointLight
        position={[position[0], position[1] - 1, position[2]]}
        color="#0066FF"
        intensity={2}
        distance={5}
      />
    </group>
  );
};

// Enhanced Planet Component
const EnhancedPlanet: FC<{ planetData: PlanetProps }> = ({ planetData }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const orbitRef = usePlanetaryPhysics(
    planetData.semiMajorAxis,
    planetData.eccentricity,
    planetData.orbitalPeriod,
    planetData.inclination
  );

  const { focusOnPlanet, enterSurfaceView } = useCameraController();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planetData.rotationSpeed;
      // Apply axial tilt
      meshRef.current.rotation.x = planetData.axialTilt * (Math.PI / 180);
    }
  });

  const handlePlanetClick = useCallback(() => {
    if (orbitRef.current) {
      focusOnPlanet(planetData.name, orbitRef.current.position, planetData.size);
    }
  }, [planetData.name, planetData.size, focusOnPlanet]);

  const handleSurfaceView = useCallback(() => {
    if (orbitRef.current) {
      enterSurfaceView(planetData.name, orbitRef.current.position, planetData.size);
    }
  }, [planetData.name, planetData.size, enterSurfaceView]);

  // Generate orbital path
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 360; i++) {
      const angle = i * (Math.PI / 180);
      const r = planetData.semiMajorAxis * (1 - planetData.eccentricity * planetData.eccentricity) / 
                (1 + planetData.eccentricity * Math.cos(angle));
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = Math.sin(planetData.inclination * Math.PI / 180) * z;
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, [planetData.semiMajorAxis, planetData.eccentricity, planetData.inclination]);

  return (
    <group ref={orbitRef}>
      {/* Orbital path */}
      {planetData.name !== 'Sun' && (
        <Line
          points={orbitPoints}
          color="gray"
          transparent
          opacity={0.1}
          lineWidth={1}
        />
      )}
      
      <group ref={groupRef}>
        {/* Planet sphere */}
        <mesh 
          ref={meshRef} 
          onClick={handlePlanetClick}
          onDoubleClick={handleSurfaceView}
        >
          <sphereGeometry args={[planetData.size, 128, 128]} />
          <AdvancedPlanetMaterial planetData={planetData} />
        </mesh>

        {/* Atmosphere */}
        {planetData.atmosphereDensity && planetData.atmosphereDensity > 0 && (
          <AdvancedAtmosphere planetData={planetData} />
        )}

        {/* Cloud layer */}
        {planetData.cloudMapUrl && (
          <CloudLayer planetData={planetData} />
        )}

        {/* Ring system */}
        {planetData.hasRings && (
          <AdvancedRingSystem planetData={planetData} />
        )}

        {/* Moons */}
        {planetData.moons && planetData.moons.length > 0 && (
          <MoonSystem moons={planetData.moons} planetSize={planetData.size} />
        )}

        {/* Planet label */}
        <Text
          position={[0, planetData.size + 1, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {planetData.name}
        </Text>
      </group>
    </group>
  );
};

// Enhanced Sun Component
const EnhancedSun: FC = () => {
  const sunData = PLANET_DATA.find(p => p.name === 'Sun')!;
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Solar surface animation
      meshRef.current.rotation.y += sunData.rotationSpeed;
      
      // Pulsating effect
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.01;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[sunData.size, 128, 128]} />
      
      {/* CORRECTED: Use meshStandardMaterial instead of meshBasicMaterial */}
      <meshStandardMaterial
        color={new THREE.Color(1, 0.8, 0.2)}
        emissive={new THREE.Color(1, 0.4, 0.1)}
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0}
      />
      
      {/* Solar corona - also fix this if it has similar issues */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform float time;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              vec3 coronaColor = vec3(1.0, 0.6, 0.2) * intensity;
              gl_FragColor = vec4(coronaColor, intensity * 0.5);
            }
          `}
          blending={THREE.AdditiveBlending}
          transparent={true}
          uniforms={{ time: { value: 0 } }}
        />
      </mesh>
    </mesh>
  );
};

// Solar Flare Component
const SolarFlares: FC = () => {
  const flareRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (flareRef.current) {
      flareRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={flareRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]}>
          <coneGeometry args={[0.5, 15, 8]} />
          <meshBasicMaterial
            color={new THREE.Color(1, 0.3, 0.1)}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Background Galaxy Component
const Galaxy: FC = () => {
  const galaxyRef = useRef<THREE.Points>(null!);
  
  const galaxyGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(10000 * 3);
    const colors = new Float32Array(10000 * 3);
    const sizes = new Float32Array(10000);

    for (let i = 0; i < 10000; i++) {
      // Spiral galaxy distribution
      const radius = Math.random() * 200 + 50;
      const angle = Math.random() * Math.PI * 2;
      const spiral = Math.sin(angle * 5) * 20;
      
      positions[i * 3] = Math.cos(angle) * (radius + spiral);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + spiral);
      
      // Color variation
      colors[i * 3] = 0.5 + Math.random() * 0.5; // R
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3; // B
      
      sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, []);

  return (
    <points ref={galaxyRef}>
      <primitive object={galaxyGeometry} />
      <pointsMaterial
        size={0.1}
        vertexColors={true}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// ----------------------------------------------------
// UI COMPONENTS
// ----------------------------------------------------

const PlanetInfoPanel: FC<{ planetData: PlanetProps | null }> = ({ planetData }) => {
  if (!planetData) return null;

  return (
    <div className="absolute top-8 left-8 z-20 p-6 rounded-xl bg-gray-900/80 backdrop-blur-md text-white max-w-md">
      <h2 className="text-2xl font-bold mb-4">{planetData.name}</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Diameter:</span>
          <span>{(planetData.size * 2).toFixed(2)} units</span>
        </div>
        <div className="flex justify-between">
          <span>Orbital Period:</span>
          <span>{planetData.orbitalPeriod} years</span>
        </div>
        <div className="flex justify-between">
          <span>Mass:</span>
          <span>{(planetData.mass! / 1.989e30).toFixed(6)} M☉</span>
        </div>
        <div className="flex justify-between">
          <span>Temperature:</span>
          <span>{planetData.temperature} K</span>
        </div>
        {planetData.discoveryYear && (
          <div className="flex justify-between">
            <span>Discovered:</span>
            <span>{planetData.discoveryYear > 0 ? planetData.discoveryYear : `${Math.abs(planetData.discoveryYear)} BCE`}</span>
          </div>
        )}
      </div>
      <p className="mt-4 text-gray-300 text-xs">{planetData.description}</p>
      
      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
          View Details
        </button>
        <button className="border border-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
          Compare
        </button>
      </div>
    </div>
  );
};

const NavigationPanel: FC = () => {
  const { resetCamera } = useCameraController();
  const [selectedPlanet, setSelectedPlanet] = useState<string>('Sun');

  return (
    <div className="absolute bottom-8 left-8 z-20 p-6 rounded-xl bg-gray-900/80 backdrop-blur-md text-white">
      <h3 className="text-lg font-semibold mb-4">Navigation</h3>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PLANET_DATA.map(planet => (
          <button
            key={planet.name}
            onClick={() => setSelectedPlanet(planet.name)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedPlanet === planet.name ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {planet.name}
          </button>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={resetCamera}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors flex-1"
        >
          Reset View
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition-colors flex-1">
          Tour Mode
        </button>
      </div>
    </div>
  );
};

const ControlPanel: FC = () => {
  const [timeScale, setTimeScale] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [graphicsQuality, setGraphicsQuality] = useState('high');

  return (
    <div className="absolute top-8 right-8 z-20 p-6 rounded-xl bg-gray-900/80 backdrop-blur-md text-white max-w-xs">
      <h3 className="text-lg font-semibold mb-4">Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Time Scale</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={timeScale}
            onChange={(e) => setTimeScale(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-400 mt-1">{timeScale}x</div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showOrbits}
              onChange={(e) => setShowOrbits(e.target.checked)}
              className="mr-2"
            />
            Show Orbits
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="mr-2"
            />
            Show Labels
          </label>
        </div>
        
        <div>
          <label className="block text-sm mb-2">Graphics Quality</label>
          <select
            value={graphicsQuality}
            onChange={(e) => setGraphicsQuality(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="ultra">Ultra</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MAIN SCENE COMPONENTS
// ----------------------------------------------------

const AdvancedSolarSystem: FC = () => {
  const sceneRef = useRef<THREE.Group>(null!);
  const spacecrafts = useMemo(() => [
    { position: [20, 5, 10] as [number, number, number], targetPlanet: 'Mars', speed: 0.5, missionType: 'orbiter' as const },
    { position: [40, -8, 25] as [number, number, number], targetPlanet: 'Jupiter', speed: 0.3, missionType: 'flyby' as const },
    { position: [60, 12, -15] as [number, number, number], targetPlanet: 'Saturn', speed: 0.2, missionType: 'orbiter' as const },
  ], []);

  return (
    <group ref={sceneRef}>
      {/* Background elements */}
      <Galaxy />
      <Stars radius={500} depth={100} count={20000} factor={8} saturation={0.5} fade speed={2} />
      
      {/* Central star */}
      <EnhancedSun />
      <SolarFlares />
      
      {/* Planets */}
      {PLANET_DATA.filter(planet => planet.name !== 'Sun').map(planet => (
        <EnhancedPlanet key={planet.name} planetData={planet} />
      ))}
      
      {/* Spacecrafts */}
      {spacecrafts.map((spacecraft, index) => (
        <Spacecraft key={index} {...spacecraft} />
      ))}
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={1000} />
    </group>
  );
};

const PostProcessingEffects: FC = () => {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom
        intensity={0.5}
        kernelSize={KernelSize.LARGE}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
      />
      <ChromaticAberration
        offset={[0.001, 0.001]}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        darkness={0.4}
        offset={0.1}
      />
    </EffectComposer>
  );
};

// ----------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------

const HomePage: FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading Cosmic Experience...</p>
          <p className="text-gray-400 mt-2">Initializing advanced simulation</p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen relative bg-black overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ 
          position: [0, 50, 80], 
          fov: 45,
          near: 0.1,
          far: 2000
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        shadows
      >
        <Suspense fallback={null}>
          <AdvancedSolarSystem />
          <PostProcessingEffects />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={500}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <PlanetInfoPanel planetData={selectedPlanet} />
        <NavigationPanel />
        <ControlPanel />
        
        {/* Main Title */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-8 text-white text-center pointer-events-none">
          <h1 className="text-6xl font-light tracking-wider mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            INTERSTELLAR EXPLORER
          </h1>
          <p className="text-lg text-gray-300">
            Advanced 3D Solar System Simulation • Real-time Physics • High-resolution Textures
          </p>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 text-white text-sm bg-black/50 rounded-t-lg pointer-events-none">
          <div className="flex space-x-6">
            <span>🛰️ 3 Active Spacecraft</span>
            <span>⭐ 8 Planets + 200+ Moons</span>
            <span>🎯 Keplerian Orbits Enabled</span>
            <span>🌌 20,000+ Stars Rendered</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;