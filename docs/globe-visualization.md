# Globe Visualization Guide

This document provides comprehensive implementation details for creating an interactive 3D globe visualization using React-globe.gl, representing SOSA's decentralized global network.

## 🌍 Overview

The globe visualization serves as a powerful metaphor for SOSA's distributed think tank, showing:
- Global node distribution (members/researchers)
- Active connections between nodes (collaborations)
- Data flow animations (research dissemination)
- Real-time network activity

## 🚀 Quick Start

### Installation

```bash
# For React projects
npm install react-globe.gl three

# For vanilla JavaScript
npm install globe.gl three
```

### Basic Implementation

```jsx
import Globe from 'react-globe.gl';
import { useEffect, useRef, useState } from 'react';

const GlobeVisualization = () => {
  const globeEl = useRef();
  const [nodes, setNodes] = useState([]);
  const [arcs, setArcs] = useState([]);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
    
    // Generate initial nodes
    generateNodes();
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      pointsData={nodes}
      pointColor={() => '#00D4FF'}
      pointAltitude={0.01}
      pointRadius={0.5}
      arcsData={arcs}
      arcColor={'color'}
      arcDashLength={0.4}
      arcDashGap={0.2}
      arcDashAnimateTime={2000}
    />
  );
};
```

## 🎨 Advanced Configuration

### Complete Globe Setup

```javascript
const SOSAGlobe = () => {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState([]);
  const [arcs, setArcs] = useState([]);
  const [labels, setLabels] = useState([]);
  
  // Configuration
  const CONFIG = {
    globe: {
      backgroundColor: 'rgba(0,0,0,0)',
      showAtmosphere: true,
      atmosphereColor: '#00D4FF',
      atmosphereAltitude: 0.15,
      globeColor: '#1a1a2e',
      opacity: 0.9
    },
    nodes: {
      count: 2000,
      color: '#00D4FF',
      altitude: 0.01,
      radius: 0.5,
      resolution: 4,
      highlightColor: '#00FF88'
    },
    arcs: {
      color: ['#00D4FF', '#0099CC'],
      dashLength: 0.4,
      dashGap: 0.2,
      dashAnimateTime: 2000,
      altitude: 0.15,
      stroke: 2
    },
    animation: {
      rotationSpeed: 0.5,
      connectionInterval: 3000,
      maxActiveArcs: 20
    }
  };

  // Initialize globe on mount
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Configure controls
    const globe = globeEl.current;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = CONFIG.animation.rotationSpeed;
    globe.controls().enableZoom = false;
    
    // Set point of view
    globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000);
    
    // Generate network
    generateNetwork();
    
    // Start animations
    const interval = startNetworkAnimation();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  // Generate nodes using sunflower pattern
  const generateNetwork = () => {
    const generatedNodes = generateSunflowerNodes(CONFIG.nodes.count);
    setNodes(generatedNodes);
    
    // Generate initial connections
    const initialArcs = generateRandomArcs(generatedNodes, 50);
    setArcs(initialArcs);
    
    // Add major hub labels
    const hubs = selectMajorHubs(generatedNodes, 10);
    setLabels(hubs);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, opacity: 0.4 }}>
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor={CONFIG.globe.backgroundColor}
        globeImageUrl="/path/to/earth-texture.jpg"
        showAtmosphere={CONFIG.globe.showAtmosphere}
        atmosphereColor={CONFIG.globe.atmosphereColor}
        atmosphereAltitude={CONFIG.globe.atmosphereAltitude}
        
        // Nodes
        pointsData={nodes}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={d => d.active ? CONFIG.nodes.highlightColor : CONFIG.nodes.color}
        pointAltitude={CONFIG.nodes.altitude}
        pointRadius={d => d.size || CONFIG.nodes.radius}
        pointResolution={CONFIG.nodes.resolution}
        pointsMerge={true}
        
        // Arcs
        arcsData={arcs}
        arcStartLat={d => d.startLat}
        arcStartLng={d => d.startLng}
        arcEndLat={d => d.endLat}
        arcEndLng={d => d.endLng}
        arcColor={d => CONFIG.arcs.color}
        arcDashLength={CONFIG.arcs.dashLength}
        arcDashGap={CONFIG.arcs.dashGap}
        arcDashAnimateTime={CONFIG.arcs.dashAnimateTime}
        arcAltitude={d => d.altitude || CONFIG.arcs.altitude}
        arcStroke={CONFIG.arcs.stroke}
        arcsTransitionDuration={1000}
        
        // Labels
        labelsData={labels}
        labelLat={d => d.lat}
        labelLng={d => d.lng}
        labelText={d => d.city}
        labelSize={1.5}
        labelColor={() => 'rgba(255, 255, 255, 0.8)'}
        labelResolution={2}
        labelAltitude={0.01}
        
        // Custom rendering
        customLayerData={[]}
        customThreeObject={() => new THREE.Mesh()}
        customThreeObjectUpdate={(obj, d) => {}}
      />
    </div>
  );
};
```

### Node Generation Algorithms

#### Sunflower Pattern (Even Distribution)

```javascript
function generateSunflowerNodes(count) {
  const nodes = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    const lat = Math.asin(y) * 180 / Math.PI;
    const lng = (theta * 180 / Math.PI) % 360 - 180;
    
    nodes.push({
      id: `node-${i}`,
      lat,
      lng,
      size: Math.random() * 0.5 + 0.3,
      active: false,
      connections: 0
    });
  }
  
  return nodes;
}
```

#### Population-Based Distribution

```javascript
function generatePopulationBasedNodes(count) {
  // Major cities with weights
  const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060, weight: 10 },
    { name: 'London', lat: 51.5074, lng: -0.1278, weight: 9 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, weight: 10 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, weight: 8 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, weight: 7 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708, weight: 7 },
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333, weight: 8 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, weight: 9 },
    { name: 'Beijing', lat: 39.9042, lng: 116.4074, weight: 9 },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050, weight: 7 }
  ];
  
  const nodes = [];
  const nodesPerCity = Math.floor(count / cities.length);
  
  cities.forEach(city => {
    // Generate cluster around each city
    for (let i = 0; i < nodesPerCity * (city.weight / 10); i++) {
      const spread = 5; // degrees
      const lat = city.lat + (Math.random() - 0.5) * spread;
      const lng = city.lng + (Math.random() - 0.5) * spread;
      
      nodes.push({
        id: `${city.name}-${i}`,
        lat,
        lng,
        city: city.name,
        size: Math.random() * 0.5 + 0.3,
        active: false
      });
    }
  });
  
  return nodes;
}
```

### Arc Generation and Animation

```javascript
function generateRandomArcs(nodes, count) {
  const arcs = [];
  
  for (let i = 0; i < count; i++) {
    const startNode = nodes[Math.floor(Math.random() * nodes.length)];
    const endNode = nodes[Math.floor(Math.random() * nodes.length)];
    
    if (startNode.id !== endNode.id) {
      arcs.push({
        id: `arc-${i}`,
        startLat: startNode.lat,
        startLng: startNode.lng,
        endLat: endNode.lat,
        endLng: endNode.lng,
        color: i % 2 === 0 ? '#00D4FF' : '#0099CC',
        altitude: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  return arcs;
}

function startNetworkAnimation() {
  return setInterval(() => {
    setArcs(currentArcs => {
      // Remove some old arcs
      const activeArcs = currentArcs.slice(0, -5);
      
      // Add new random arcs
      const newArcs = generateRandomArcs(nodes, 5);
      
      return [...activeArcs, ...newArcs].slice(-CONFIG.animation.maxActiveArcs);
    });
    
    // Randomly activate nodes
    setNodes(currentNodes => 
      currentNodes.map(node => ({
        ...node,
        active: Math.random() < 0.1
      }))
    );
  }, CONFIG.animation.connectionInterval);
}
```

### Custom Shaders and Effects

```javascript
// Pulsing nodes effect
const PulsingNode = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.3
      );
    }
  });
  
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#00D4FF" />
    </mesh>
  );
};

// Custom shader for glowing effect
const glowShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color('#00D4FF') }
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float time;
    varying vec3 vNormal;
    
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(color, 1.0) * intensity * (1.0 + sin(time) * 0.5);
    }
  `
};
```

## 🎯 Performance Optimization

### Level of Detail (LOD)

```javascript
const OptimizedGlobe = () => {
  const [quality, setQuality] = useState('high');
  
  useEffect(() => {
    // Detect device capabilities
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency < 4;
    
    if (isMobile || isLowEnd) {
      setQuality('low');
    } else if (navigator.hardwareConcurrency < 8) {
      setQuality('medium');
    }
  }, []);
  
  const getNodeCount = () => {
    switch (quality) {
      case 'low': return 500;
      case 'medium': return 1000;
      case 'high': return 2000;
      default: return 1000;
    }
  };
  
  const getArcCount = () => {
    switch (quality) {
      case 'low': return 10;
      case 'medium': return 20;
      case 'high': return 50;
      default: return 20;
    }
  };
  
  return (
    <Globe
      pointsData={generateSunflowerNodes(getNodeCount())}
      arcsData={generateRandomArcs(nodes, getArcCount())}
      rendererConfig={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: quality === 'low' ? 'low-power' : 'high-performance'
      }}
    />
  );
};
```

### Geometry Instancing

```javascript
// Use instanced mesh for better performance
const InstancedNodes = ({ count = 10000 }) => {
  const mesh = useRef();
  
  useEffect(() => {
    const temp = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      temp.position.setFromSphericalCoords(100, phi, theta);
      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);
  
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color="#00D4FF" />
    </instancedMesh>
  );
};
```

## 🎮 Interactivity

### Mouse Interactions

```javascript
const InteractiveGlobe = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const handleNodeHover = useCallback(node => {
    setHoveredNode(node);
    document.body.style.cursor = node ? 'pointer' : 'auto';
  }, []);
  
  const handleNodeClick = useCallback(node => {
    if (node) {
      setSelectedNode(node);
      // Show node details
      showNodeDetails(node);
      
      // Highlight connections
      highlightNodeConnections(node);
    }
  }, []);
  
  return (
    <>
      <Globe
        pointsData={nodes}
        pointColor={node => 
          node === hoveredNode ? '#00FF88' : 
          node === selectedNode ? '#FF00FF' : 
          '#00D4FF'
        }
        pointRadius={node => 
          node === hoveredNode ? 0.8 : 0.5
        }
        onPointHover={handleNodeHover}
        onPointClick={handleNodeClick}
      />
      
      {selectedNode && (
        <NodeDetails 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
        />
      )}
    </>
  );
};
```

### Camera Controls

```javascript
const CameraController = ({ globeRef }) => {
  const flyToLocation = (lat, lng, altitude = 1.5) => {
    globeRef.current.pointOfView({
      lat,
      lng,
      altitude
    }, 2000); // 2 second transition
  };
  
  const tours = [
    { name: 'North America', lat: 40, lng: -100 },
    { name: 'Europe', lat: 50, lng: 10 },
    { name: 'Asia', lat: 30, lng: 100 },
    { name: 'Global View', lat: 0, lng: 0, altitude: 2.5 }
  ];
  
  return (
    <div className="camera-controls">
      {tours.map(tour => (
        <button
          key={tour.name}
          onClick={() => flyToLocation(tour.lat, tour.lng, tour.altitude)}
        >
          {tour.name}
        </button>
      ))}
    </div>
  );
};
```

## 🎨 Styling Integration

### CSS-in-JS Integration

```javascript
const StyledGlobeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: ${props => props.opacity || 0.4};
  pointer-events: ${props => props.interactive ? 'auto' : 'none'};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(10, 10, 10, 0.4) 100%
    );
    pointer-events: none;
  }
`;
```

### Responsive Behavior

```javascript
const ResponsiveGlobe = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Globe
      width={isMobile ? window.innerWidth : undefined}
      height={isMobile ? window.innerHeight * 0.5 : undefined}
      pointsData={generateSunflowerNodes(isMobile ? 500 : 2000)}
      enablePointerInteraction={!isMobile}
      rendererConfig={{
        devicePixelRatio: isMobile ? 1 : 2
      }}
    />
  );
};
```

## 📊 Real-time Data Integration

### WebSocket Connection

```javascript
const RealtimeGlobe = () => {
  const [liveNodes, setLiveNodes] = useState([]);
  const [liveArcs, setLiveArcs] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.sosa.live/network');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'node_joined':
          setLiveNodes(prev => [...prev, data.node]);
          break;
          
        case 'connection_made':
          setLiveArcs(prev => [...prev, data.arc]);
          setTimeout(() => {
            setLiveArcs(prev => prev.filter(a => a.id !== data.arc.id));
          }, 5000);
          break;
          
        case 'activity_pulse':
          pulseNode(data.nodeId);
          break;
      }
    };
    
    return () => ws.close();
  }, []);
  
  return <Globe pointsData={liveNodes} arcsData={liveArcs} />;
};
```

## 🛠️ Troubleshooting

### Common Issues

1. **Black screen / Globe not rendering**
   ```javascript
   // Check WebGL support
   if (!WEBGL.isWebGLAvailable()) {
     const warning = WEBGL.getWebGLErrorMessage();
     document.getElementById('container').appendChild(warning);
   }
   ```

2. **Performance issues**
   - Reduce node count
   - Disable antialiasing
   - Use simpler geometries
   - Implement frustum culling

3. **Mobile touch not working**
   ```javascript
   // Enable touch controls
   globeEl.current.controls().enablePan = true;
   globeEl.current.controls().enableRotate = true;
   globeEl.current.controls().touches = {
     ONE: THREE.TOUCH.ROTATE,
     TWO: THREE.TOUCH.DOLLY_PAN
   };
   ```

## 📋 Implementation Checklist

- [ ] Install dependencies (react-globe.gl, three)
- [ ] Create basic globe component
- [ ] Generate node distribution
- [ ] Add arc animations
- [ ] Implement auto-rotation
- [ ] Style with opacity and positioning
- [ ] Add performance optimizations
- [ ] Test on mobile devices
- [ ] Add interactivity (optional)
- [ ] Connect to real-time data (optional)