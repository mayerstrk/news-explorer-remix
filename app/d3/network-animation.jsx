import { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const NetworkBackground = () => {
  const ref = useRef(null)
  const [settings, setSettings] = useState({})
  const [breakpoint, setBreakpoint] = useState('')

  const adjustNodesForScreenSize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (width > 1024 && breakpoint !== 'lg') {
      setBreakpoint('lg')
      setSettings({
        nodeAmount: 300,
        chargeForce: -500,
        centerForce: 1,
        radius: Math.min(width, height) * 0.4,
        radialForce: 0.1,
        linkOpacity: 0.3,
        linkColor: '#f1f1f1',
      })
    } else if (width > 768 && width <= 1024 && breakpoint !== 'md') {
      setBreakpoint('md')
      setSettings({
        nodeAmount: 200,
        chargeForce: -500,
        centerForce: 1,
        radius: Math.min(width, height) * 0.35,
        radialForce: 0.1,
        linkOpacity: 0.3,
        linkColor: '#f1f1f1',
      })
    } else if (width <= 768 && breakpoint !== 'sm') {
      setBreakpoint('sm')
      setSettings({
        nodeAmount: 100,
        chargeForce: -300,
        centerForce: 0.5,
        radius: Math.min(width, height) * 0.3,
        radialForce: 0.2,
        linkOpacity: 0.3,
        linkColor: '#f1f1f1',
      })
    }
  }, [breakpoint])

  useEffect(() => {
    adjustNodesForScreenSize()
    window.addEventListener('resize', adjustNodesForScreenSize)
    return () => window.removeEventListener('resize', adjustNodesForScreenSize)
  }, [adjustNodesForScreenSize])

  useEffect(() => {
    if (!settings.nodeAmount) return

    const svg = d3.select(ref.current)
    const width = ref.current.clientWidth
    const height = ref.current.clientHeight
    const centerX = width / 2
    const centerY = height / 2

    function generateNodesAndLinks(nodeCount) {
      return {
        nodes: Array.from({ length: nodeCount }, (_, i) => ({
          id: i,
          x: centerX + (Math.random() - 0.5) * width * 0.8,
          y: centerY + (Math.random() - 0.5) * height * 0.8,
        })),
        links: Array.from({ length: nodeCount * 2 }, () => ({
          source: Math.floor(Math.random() * nodeCount),
          target: Math.floor(Math.random() * nodeCount),
        })),
      }
    }

    const { nodes, links } = generateNodesAndLinks(settings.nodeAmount)

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(30),
      )
      .force('charge', d3.forceManyBody().strength(settings.chargeForce))
      .force(
        'center',
        d3.forceCenter(centerX, centerY).strength(settings.centerForce),
      )
      .force(
        'radial',
        d3
          .forceRadial(settings.radius, centerX, centerY)
          .strength(settings.radialForce),
      )
      .alphaTarget(0.001)
      .alphaDecay(0.002)
      .velocityDecay(0.4)
      .on('tick', ticked)

    const link = svg
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', settings.linkColor)
      .attr('stroke-opacity', settings.linkOpacity)

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)
    }

    return () => simulation.stop()
  }, [settings])

  return (
    <div className='absolute inset-0 z-0 flex h-full w-full items-center justify-start overflow-visible'>
      <svg ref={ref} className='h-full w-full' />
    </div>
  )
}

export default NetworkBackground
