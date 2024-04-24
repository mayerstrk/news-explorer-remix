import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const NetworkBackground = () => {
  const ref = useRef(null)

  useEffect(() => {
    const svg = d3.select(ref.current)
    let currentChargeStrength = -200 // Default strength

    const updateChargeStrength = (width) => {
      const newStrength = -80 - (800 - Math.min(width, 800)) / 10
      currentChargeStrength = newStrength
      simulation.force('charge').strength(newStrength)
    }

    const updateDimensions = () => {
      const width = ref.current.clientWidth
      const height = ref.current.clientHeight
      const radius = Math.min(width, height)
      const centerX = width / 2
      const centerY = height / 2

      updateChargeStrength(width) // Update charge strength based on new width

      simulation
        .force('center', d3.forceCenter(centerX, centerY))
        .force('radial', d3.forceRadial(radius, centerX, centerY))
        .alpha(1)
        .restart()
    }

    const nodeAmount = 100
    const nodes = Array.from({ length: nodeAmount }, (_, i) => ({ id: i }))
    const links = Array.from({ length: nodeAmount * 3 }, () => ({
      source: Math.floor(Math.random() * nodeAmount),
      target: Math.floor(Math.random() * nodeAmount),
    }))

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(30),
      )
      .force('charge', d3.forceManyBody().strength(currentChargeStrength))
      .on('tick', ticked)

    const link = svg
      .append('g')
      .attr('stroke', '#f1f1f1')
      .attr('stroke-opacity', 0.3)
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 4)
      .attr('fill', '#1e40af')
      .attr('fill-opacity', 0.2)

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      simulation.stop()
    }
  }, [])

  return (
    <div className='absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-y-visible'>
      <svg
        ref={ref}
        className='h-1/2 w-1/2 animate-spin-slow overflow-visible'
      />
    </div>
  )
}

export default NetworkBackground
