import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import clsx from 'clsx'

const NetworkBackground = () => {
  const ref = useRef(null)

  useEffect(() => {
    const svg = d3.select(ref.current)
    const updateDimensions = () => {
      const width = ref.current.clientWidth * 1.5
      const height = ref.current.clientHeight * 1.5
      const radius = Math.min(width, height) * 3
      const centerX = width / 2
      const centerY = height / 2

      simulation
        .force('center', d3.forceCenter(centerX, centerY))
        .force('radial', d3.forceRadial(radius, centerX, centerY))
        .alpha(1)
        .restart()
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
          .distance(30),
      )
      .force('charge', d3.forceManyBody().strength(-85))
      .on('tick', ticked)

    const link = svg
      .append('g')
      .attr('stroke', '#f1f1f1')
      .attr('stroke-opacity', 0.3)
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
      .attr('fill-opacity', 0.3)

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
