"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// Model component that will be used inside the Canvas
function Model({ isMobile, isHovered }: { isMobile: boolean; isHovered: boolean }) {
  const group = useRef<THREE.Group>(null)
  const [error, setError] = useState(false)

  // Try to load the model, but handle errors gracefully
  const { scene, errors } = useGLTF("/3d/fb_logo_placeholder.glb", undefined, undefined, (error) => {
    console.error("Error loading 3D model:", error)
    setError(true)
  })

  // Create a fallback cube if there's an error loading the model
  useEffect(() => {
    if (error && group.current) {
      // Clear any existing content
      group.current.clear()

      // Create a simple cube as fallback
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3B82F6"),
        metalness: 0.4,
        roughness: 0.5,
        emissive: new THREE.Color("#1D4ED8"),
        emissiveIntensity: 0.2,
      })
      const cube = new THREE.Mesh(geometry, material)
      group.current.add(cube)
    }
  }, [error])

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useRef<THREE.Group>()

  useEffect(() => {
    if (!error && !clonedScene.current && scene) {
      try {
        clonedScene.current = scene.clone()

        // Apply materials and optimizations
        clonedScene.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Create a new material with better performance settings
            const newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#3B82F6"), // Primary blue color
              metalness: 0.4,
              roughness: 0.5,
              emissive: new THREE.Color("#1D4ED8"),
              emissiveIntensity: 0.2,
            })

            child.material = newMaterial
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // Add the cloned scene to our group
        if (group.current) {
          group.current.clear()
          group.current.add(clonedScene.current)
        }
      } catch (e) {
        console.error("Error processing 3D model:", e)
        setError(true)
      }
    }
  }, [scene, error])

  // Animation
  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05

      // Rotation animation
      if (isHovered) {
        // Faster rotation when hovered
        group.current.rotation.y += 0.02
      } else {
        // Slow continuous rotation
        group.current.rotation.y += 0.005
      }
    }
  })

  return (
    <group ref={group} dispose={null} scale={isMobile ? 1.5 : 2}>
      {/* The content will be added by the useEffect hooks */}
    </group>
  )
}

export default function Logo3D({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div
      className={`w-12 h-12 md:w-14 md:h-14 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows
        dpr={[1, 2]} // Responsive pixel ratio
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Model isMobile={isMobile} isHovered={isHovered} />
      </Canvas>
    </div>
  )
}

