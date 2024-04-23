import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import clsx from 'clsx'

const NetworkBackground = () => {
  const ref = useRef(null)
  const svgRef = useRef(null) // Create a ref for the SVG element

  useEffect(() => {
    const svg = d3.select(ref.current)
    svgRef.current = svg // Store the svg D3 selection in a ref

    function resize() {
      const width = ref.current.clientWidth
      const height = ref.current.clientHeight

      // Update the center force
      simulation.force('center', d3.forceCenter(width, height / 2))
      simulation.alpha(0.5).restart() // Reheat and restart the simulation
    }

    const nodes = Array.from({ length: 100 }, (_, i) => ({ id: i }))
    const links = Array.from({ length: 300 }, () => ({
      source: Math.floor(Math.random() * 100),
      target: Math.floor(Math.random() * 100),
    }))

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(50),
      )
      .force('charge', d3.forceManyBody().strength(-50))
      .force(
        'center',
        d3.forceCenter(ref.current.clientWidth, ref.current.clientHeight / 2),
      )
      .force('collision', d3.forceCollide().radius(12))

    const link = svg
      .append('g')
      .attr('stroke', '#f1f1f1')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 4)
      .attr('fill', '#1e40af')
      .attr('fill-opacity', 0.5)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    })

    // Add resize listener
    window.addEventListener('resize', resize)

    return () => {
      simulation.stop()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <svg
      ref={ref}
      className={clsx('absolute inset-0 z-0 h-full w-full animate-pulse-slow')}
    />
  )
}
export default NetworkBackground
