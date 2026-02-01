
/**
 * Fetches the user's geolocation using multiple fallback APIs.
 * Strategies:
 * 1. Try ipapi.co (Standard)
 * 2. Try ipwho.is (CORS friendly)
 * 3. Try freeipapi.com
 * 4. Try ipinfo.io (Reliable fallback)
 * 
 * @returns {Promise<{lat: number, long: number, source: string}>}
 */
export const getLocation = async () => {
  const fetchWithTimeout = async (url, timeout = 3000) => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    try {
      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(id)
      return response
    } catch (error) {
      clearTimeout(id)
      throw error
    }
  }

  const apis = [
    {
      name: 'ipapi.co',
      url: 'https://ipapi.co/json/',
      parse: (data) => ({ lat: data.latitude, long: data.longitude })
    },
    {
      name: 'ipwho.is',
      url: 'https://ipwho.is/',
      parse: (data) => ({ lat: data.latitude, long: data.longitude })
    },
    {
      name: 'freeipapi.com',
      url: 'https://freeipapi.com/api/json',
      parse: (data) => ({ lat: data.latitude, long: data.longitude })
    },
    {
      name: 'ipinfo.io',
      url: 'https://ipinfo.io/json',
      parse: (data) => {
        if (!data.loc) return { lat: null, long: null }
        const [lat, long] = data.loc.split(',')
        return { lat: parseFloat(lat), long: parseFloat(long) }
      }
    }
  ]

  const errors = []

  for (const api of apis) {
    try {
      // console.log(`[Location] Trying ${api.name}...`)
      const res = await fetchWithTimeout(api.url, 4000)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      
      const data = await res.json()
      const { lat, long } = api.parse(data)
      
      if (lat !== undefined && long !== undefined && !isNaN(lat) && !isNaN(long)) {
         return { lat, long, source: api.name }
      } else {
         throw new Error(`Invalid data format from ${api.name}`)
      }
    } catch (err) {
      console.warn(`[Location] Failed ${api.name}:`, err.message)
      errors.push({ name: api.name, error: err.message })
    }
  }

  throw new Error(`All location APIs failed: ${JSON.stringify(errors)}`)
}
