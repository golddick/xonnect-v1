export interface LocationData {
  name: string
  country: string
  state?: string
  lat?: number
  lon?: number
  type: 'country' | 'state' | 'city' | 'address'
  fullAddress?: string
}

export interface LocationRestriction {
  enabled: boolean
  type: 'block' | 'allow'
  locations: LocationData[]
}

export interface LocationSearchProps {
  isOpen: boolean
  onClose: () => void
  onSelectLocations: (locations: LocationData[]) => void
  initialLocations?: LocationData[]
  restrictionType: 'block' | 'allow'
  mode?: 'restriction' | 'event-location'
  onSelectSingleLocation?: (location: LocationData) => void
  title?: string
  description?: string
}