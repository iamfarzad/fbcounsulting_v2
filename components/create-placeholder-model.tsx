"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CreatePlaceholderModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create a simple scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(200, 200)
    containerRef.current.appendChild(renderer.domElement)

    // Create a simple cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.4,
      roughness: 0.5,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.2,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 3

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="hidden"></div>
}

