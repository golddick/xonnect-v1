"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Check, Globe, MapPin, Flag, Building, Navigation, Plus, Trash2, AlertCircle, Map } from "lucide-react"
import { LocationData, LocationSearchProps } from "@/lib/type/location"

// Free API from OpenStreetMap Nominatim
const NOMINATIM_API = "https://nominatim.openstreetmap.org/search"

export default function LocationSearchModal({
  isOpen,
  onClose,
  onSelectLocations,
  onSelectSingleLocation,
  initialLocations = [],
  restrictionType,
  mode = 'restriction',
  title,
  description,
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<LocationData[]>([])
  const [selectedLocations, setSelectedLocations] = useState<LocationData[]>(initialLocations)
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Clear state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedLocations(initialLocations)
      setSearchQuery("")
      setSearchResults([])
    }
  }, [isOpen, initialLocations])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch locations from API
  const fetchLocations = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `${NOMINATIM_API}?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=8&accept-language=en`,
        {
          headers: {
            'User-Agent': 'XonnectApp/1.0'
          }
        }
      )

      if (!response.ok) throw new Error("Failed to fetch locations")

      const data = await response.json()
      
      const processedResults: LocationData[] = data.map((item: any) => {
        const address = item.address
        let name = item.display_name.split(',')[0]
        let country = address?.country || "Unknown"
        let state = address?.state || address?.region || address?.county
        let type: LocationData['type'] = 'city'
        let fullAddress = item.display_name

        // Determine type based on address details
        if (address?.country && !state && !address.city && !address.town && !address.village && !address.road) {
          type = 'country'
          name = country
        } else if (address?.state && !address.city && !address.town && !address.village) {
          type = 'state'
          name = state || name
        } else if (address?.road || address?.house_number) {
          type = 'address'
          name = address.road || name
        }

        return {
          name,
          country,
          state,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type,
          fullAddress,
        }
      }).filter((loc: LocationData) => loc.name && loc.country)

      // Remove duplicates
      const uniqueResults = processedResults.filter((loc, index, self) =>
        index === self.findIndex((l) => 
          l.name === loc.name && 
          l.country === loc.country && 
          l.type === loc.type
        )
      )

      setSearchResults(uniqueResults)
    } catch (error) {
      console.error("Error fetching locations:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery) {
      fetchLocations(debouncedQuery)
    } else {
      setSearchResults([])
    }
  }, [debouncedQuery, fetchLocations])

  const handleSelectLocation = (location: LocationData) => {
    if (mode === 'event-location' && onSelectSingleLocation) {
      onSelectSingleLocation(location)
      onClose()
      return
    }

    if (!selectedLocations.some(loc => 
      loc.name === location.name && 
      loc.country === location.country && 
      loc.type === location.type
    )) {
      setSelectedLocations(prev => [...prev, location])
    }
    setSearchQuery("")
    setSearchResults([])
  }

  const handleRemoveLocation = (index: number) => {
    setSelectedLocations(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (mode === 'event-location' && onSelectSingleLocation && selectedLocations.length > 0) {
      onSelectSingleLocation(selectedLocations[0])
    } else {
      onSelectLocations(selectedLocations)
    }
    onClose()
  }

  const getLocationIcon = (type: LocationData['type']) => {
    switch (type) {
      case 'country':
        return <Flag className="w-4 h-4 text-red-500" />
      case 'state':
        return <MapPin className="w-4 h-4 text-green-500" />
      case 'city':
        return <Building className="w-4 h-4 text-yellow-500" />
      case 'address':
        return <Navigation className="w-4 h-4 text-foreground" />
      default:
        return <Globe className="w-4 h-4 text-gray-400" />
    }
  }

  const getLocationTypeLabel = (type: LocationData['type']) => {
    switch (type) {
      case 'country':
        return 'Country'
      case 'state':
        return 'State/Region'
      case 'city':
        return 'City'
      case 'address':
        return 'Address'
      default:
        return 'Location'
    }
  }

  const modalTitle = title || (mode === 'event-location' ? 'Select Event Location' : 'Add Location Restrictions')
  const modalDescription = description || 
    (mode === 'event-location' 
      ? 'Search and select the location for your event' 
      : restrictionType === 'block' 
        ? 'Add locations to block from viewing your stream' 
        : 'Add locations to allow viewing your stream')

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className=" border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{modalTitle}</h2>
                <p className="text-gray-400 text-sm mt-1">{modalDescription}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-foreground p-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Search Input */}
              <div className="p-6 border-b border-gray-800">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      mode === 'event-location' 
                        ? "Search for city, region, or country..." 
                        : "Search for locations to add..."
                    }
                    className="w-full bg-transparent border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    autoFocus
                  />
                  {isLoading && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-6">
                {searchQuery && searchResults.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Search Results</h3>
                    {searchResults.map((location, index) => (
                      <motion.div
                        key={`${location.name}-${location.country}-${index}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectLocation(location)}
                        className="flex items-center gap-3 p-3 rounded-xl  border border-gray-700 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 cursor-pointer transition-all group"
                      >
                        <div className="p-2 border border-border rounded-lg">
                          {getLocationIcon(location.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground truncate">{location.name}</span>
                            <span className="text-xs text-gray-300 rounded-full">
                              {getLocationTypeLabel(location.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {location.state && `${location.state}, `}{location.country}
                          </p>
                          {location.fullAddress && location.type === 'address' && (
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {location.fullAddress.split(',').slice(1, 3).join(',')}
                            </p>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-5 h-5 text-red-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && !isLoading && (
                  <div className="text-center py-8">
                    <Map className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <p className="text-gray-400">No locations found for "{searchQuery}"</p>
                    <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                  </div>
                )}

                {/* Selected Locations */}
                {selectedLocations.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-400">
                        {mode === 'event-location' ? 'Selected Location' : 'Selected Locations'} ({selectedLocations.length})
                      </h3>
                      {selectedLocations.length > 0 && mode !== 'event-location' && (
                        <button
                          type="button"
                          onClick={() => setSelectedLocations([])}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {selectedLocations.map((location, index) => (
                        <div
                          key={`selected-${index}`}
                          className={`p-3 rounded-xl border flex items-center justify-between group ${
                            mode === 'event-location'
                              ? 'bg-yellow-500/10 border-yellow-500/30'
                              : restrictionType === 'block'
                              ? 'bg-red-500/10 border-red-500/30'
                              : 'bg-green-500/10 border-green-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className=" border border-border p-2 rounded-lg">
                              {getLocationIcon(location.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{location.name}</span>
                                <span className="text-xs px-2 py-0.5 border border-border text-gray-400 rounded-full">
                                  {getLocationTypeLabel(location.type)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">
                                {location.state && `${location.state}, `}{location.country}
                              </p>
                            </div>
                          </div>
                          {mode !== 'event-location' && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLocation(index)}
                              className="text-gray-400 hover:text-red-400 p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLocations.length === 0 && !searchQuery && (
                  <div className="text-center py-8">
                    <div className="inline-flex p-4 bg-red-700 rounded-2xl mb-4">
                      <Globe className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-400">
                      {mode === 'event-location'
                        ? 'Search for a location to set your event location'
                        : 'Search for locations to add restrictions'}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Start typing to search for countries, states, or cities
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {mode === 'event-location' ? (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Selected location will be displayed on your event</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          {restrictionType === 'block' 
                            ? 'Users in these locations will be blocked' 
                            : 'Only users in these locations will be allowed'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={selectedLocations.length === 0}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        mode === 'event-location'
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-yellow-600/30 disabled:text-yellow-400/50'
                          : restrictionType === 'block'
                          ? 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-600/30 disabled:text-red-400/50'
                          : 'bg-green-600 hover:bg-green-700 text-white disabled:bg-green-600/30 disabled:text-green-400/50'
                      }`}
                    >
                      {mode === 'event-location' ? 'Select Location' : 'Add Locations'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}