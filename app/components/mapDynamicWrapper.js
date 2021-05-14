import dynamic from 'next/dynamic'

function MapDynamicWrapper(props) {
  const Map = dynamic(
    () => import('./map'),
    { ssr: false } // Prevents server-side render because Leaflet
  )
  return <Map {...props}/>
}

export default MapDynamicWrapper