import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const NetworkBackground = () => {
  const ref = useRef(null)
  const [nodeAmount, setNodeAmount] = useState(null) // Will be set based on screen size

  useEffect(() => {
    // Setup function to determine screen size and adjust node amounts
    const adjustNodesForScreenSize = () => {
      const width = window.innerWidth
      if (width > 1024) {
        setNodeAmount(150) // Large screen
      } else if (width > 768) {
        setNodeAmount(100) // Medium screen
      } else {
        setNodeAmount(70) // Small screen
      }
    }

    adjustNodesForScreenSize() // Check initially on client side

    window.addEventListener('resize', adjustNodesForScreenSize)

    return () => window.removeEventListener('resize', adjustNodesForScreenSize)
  }, [])

  useEffect(() => {
    if (nodeAmount === null) {
      return // Do nothing if nodeAmount hasn't been determined yet
    }

    const svg = d3.select(ref.current)
    const { nodes, links } = generateNodesAndLinks(nodeAmount)

    // Create and update simulation
    let simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(30),
      )
      .force('charge', d3.forceManyBody().strength(-40))
      .force(
        'center',
        d3.forceCenter(
          ref.current.clientWidth / 2,
          ref.current.clientHeight / 2,
        ),
      )
      .force(
        'radial',
        d3
          .forceRadial(
            400,
            ref.current.clientWidth / 2,
            ref.current.clientHeight / 2,
          )
          .strength(0.1),
      )
      .on('tick', ticked)

    // Define and update link elements
    const link = svg
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#f1f1f1')
      .attr('stroke-opacity', 0.3)

    // Define and update node elements
    const node = svg
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 3)
      .attr('fill', '#1e40af')
      .attr('fill-opacity', 0.5)

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    }

    return () => {
      simulation.stop()
    }
  }, [nodeAmount]) // Dependency on nodeAmount ensures re-render only when node amount changes

  // Helper function to generate nodes and links
  function generateNodesAndLinks(nodeCount) {
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({ id: i }))
    const links = Array.from({ length: nodeCount * 2 }, () => ({
      source: Math.floor(Math.random() * nodeCount),
      target: Math.floor(Math.random() * nodeCount),
    }))
    return { nodes, links }
  }

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
