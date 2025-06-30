
// import React, { useRef, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Text } from '@react-three/drei';
// import * as THREE from 'three';

// export interface Globe3DProps {
//   onCountryClick: (countryData: { code: string; name: string }) => void;
// }

// export interface Country {
//   code: string;
//   name: string;
//   lat: number;
//   lng: number;
// }

// const Globe: React.FC<{ onCountryClick: Globe3DProps['onCountryClick'] }> = ({ onCountryClick }) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const [hovered, setHovered] = useState<string | null>(null);

//   // Complete country data with coordinates (latitude, longitude)
//   const countries: Country[] = [
//     { code: 'us', name: 'United States', lat: 39.8283, lng: -98.5795 },
//     { code: 'ca', name: 'Canada', lat: 56.1304, lng: -106.3468 },
//     { code: 'mx', name: 'Mexico', lat: 23.6345, lng: -102.5528 },
//     { code: 'br', name: 'Brazil', lat: -14.2350, lng: -51.9253 },
//     { code: 'ru', name: 'Russia', lat: 61.5240, lng: 105.3188 },
//     { code: 'cn', name: 'China', lat: 35.8617, lng: 104.1954 },
//     { code: 'in', name: 'India', lat: 20.5937, lng: 78.9629 },
//     { code: 'au', name: 'Australia', lat: -25.2744, lng: 133.7751 },
//     { code: 'za', name: 'South Africa', lat: -30.5595, lng: 22.9375 },
//     { code: 'eg', name: 'Egypt', lat: 26.0975, lng: 31.2357 },
//     { code: 'ng', name: 'Nigeria', lat: 9.0820, lng: 8.6753 },
//     { code: 'ke', name: 'Kenya', lat: -0.0236, lng: 37.9062 },
//     { code: 'ma', name: 'Morocco', lat: 31.7917, lng: -7.0926 },
//     { code: 'dz', name: 'Algeria', lat: 28.0339, lng: 1.6596 },
//     { code: 'ly', name: 'Libya', lat: 26.3351, lng: 17.2283 },
//     { code: 'sd', name: 'Sudan', lat: 12.8628, lng: 30.2176 },
//     { code: 'et', name: 'Ethiopia', lat: 9.1450, lng: 40.4897 },
//     { code: 'so', name: 'Somalia', lat: 5.1521, lng: 46.1996 },
//     { code: 'tz', name: 'Tanzania', lat: -6.3690, lng: 34.8888 },
//     { code: 'mz', name: 'Mozambique', lat: -18.6657, lng: 35.5296 },
//     { code: 'gb', name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
//     { code: 'fr', name: 'France', lat: 46.2276, lng: 2.2137 },
//     { code: 'de', name: 'Germany', lat: 51.1657, lng: 10.4515 },
//     { code: 'it', name: 'Italy', lat: 41.8719, lng: 12.5674 },
//     { code: 'es', name: 'Spain', lat: 40.4637, lng: -3.7492 },
//     { code: 'pt', name: 'Portugal', lat: 39.3999, lng: -8.2245 },
//     { code: 'nl', name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
//     { code: 'be', name: 'Belgium', lat: 50.5039, lng: 4.4699 },
//     { code: 'ch', name: 'Switzerland', lat: 46.8182, lng: 8.2275 },
//     { code: 'at', name: 'Austria', lat: 47.5162, lng: 14.5501 },
//     { code: 'pl', name: 'Poland', lat: 51.9194, lng: 19.1451 },
//     { code: 'cz', name: 'Czech Republic', lat: 49.8175, lng: 15.4730 },
//     { code: 'sk', name: 'Slovakia', lat: 48.6690, lng: 19.6990 },
//     { code: 'hu', name: 'Hungary', lat: 47.1625, lng: 19.5033 },
//     { code: 'ro', name: 'Romania', lat: 45.9432, lng: 24.9668 },
//     { code: 'bg', name: 'Bulgaria', lat: 42.7339, lng: 25.4858 },
//     { code: 'gr', name: 'Greece', lat: 39.0742, lng: 21.8243 },
//     { code: 'tr', name: 'Turkey', lat: 38.9637, lng: 35.2433 },
//     { code: 'ua', name: 'Ukraine', lat: 48.3794, lng: 31.1656 },
//     { code: 'by', name: 'Belarus', lat: 53.7098, lng: 27.9534 },
//     { code: 'lt', name: 'Lithuania', lat: 55.1694, lng: 23.8813 },
//     { code: 'lv', name: 'Latvia', lat: 56.8796, lng: 24.6032 },
//     { code: 'ee', name: 'Estonia', lat: 58.5953, lng: 25.0136 },
//     { code: 'fi', name: 'Finland', lat: 61.9241, lng: 25.7482 },
//     { code: 'se', name: 'Sweden', lat: 60.1282, lng: 18.6435 },
//     { code: 'no', name: 'Norway', lat: 60.4720, lng: 8.4689 },
//     { code: 'dk', name: 'Denmark', lat: 56.2639, lng: 9.5018 },
//     { code: 'is', name: 'Iceland', lat: 64.9631, lng: -19.0208 },
//     { code: 'ie', name: 'Ireland', lat: 53.4129, lng: -8.2439 },
//     { code: 'jp', name: 'Japan', lat: 36.2048, lng: 138.2529 },
//     { code: 'kr', name: 'South Korea', lat: 35.9078, lng: 127.7669 }
//   ];

//   // Convert lat/lng to 3D sphere coordinates
//   const latLngToVector3 = (lat: number, lng: number, radius: number = 2.02): THREE.Vector3 => {
//     const phi = (90 - lat) * (Math.PI / 180);
//     const theta = (lng + 180) * (Math.PI / 180);
//     return new THREE.Vector3(
//       -radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.001;
//     }
//   });

//   const handleCountryClick = (country: Country) => {
//     console.log('3D Globe country clicked:', country);
//     onCountryClick(country);
//   };

//   return (
//     <>
//       {/* Globe sphere */}
//       <mesh ref={meshRef}>
//         <sphereGeometry args={[2, 64, 64]} />
//         <meshStandardMaterial color="#1e40af" transparent opacity={0.8} />
//       </mesh>

//       {/* Country markers */}
//       {countries.map((country) => {
//         const position = latLngToVector3(country.lat, country.lng);
//         return (
//           <group key={country.code}>
//             <mesh
//               position={[position.x, position.y, position.z]}
//               onClick={() => handleCountryClick(country)}
//               onPointerOver={() => setHovered(country.code)}
//               onPointerOut={() => setHovered(null)}
//             >
//               <sphereGeometry args={[0.02, 8, 8]} />
//               <meshStandardMaterial 
//                 color={hovered === country.code ? "#ff0000" : "#ffff00"} 
//               />
//             </mesh>
//             {hovered === country.code && (
//               <Text
//                 position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}
//                 fontSize={0.1}
//                 color="white"
//                 anchorX="center"
//                 anchorY="middle"
//               >
//                 {country.name}
//               </Text>
//             )}
//           </group>
//         );
//       })}

//       {/* Lighting */}
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
      
//       {/* Camera controls */}
//       <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
//     </>
//   );
// };

// const Globe3D: React.FC<Globe3DProps> = ({ onCountryClick }) => {
//   return (
//     <div className="w-full h-[600px]">
//       <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//         <Globe onCountryClick={onCountryClick} />
//       </Canvas>
//     </div>
//   );
// };

// export default Globe3D;

