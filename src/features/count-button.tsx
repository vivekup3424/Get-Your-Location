import { useState } from "react"

export const CountButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState("")

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json") // fetching the IP address from ipify api
      const { ip } = await ipAddressResponse.json()

      const ipInfoResponse = await fetch(
        `https://ipinfo.io/${ip}?token=${process.env.IPINFO_ACCESS_TOKEN}`
      )
      const { country, city } = await ipInfoResponse.json()

      setLocation(`Your country is ${country} and city is ${city}`)
    } catch (error) {
      console.error(error)
      setLocation("Error getting location")
    }

    setIsLoading(false)
  }

  return (
    <button
      type="button"
      className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none
    plasmo-shadow-lg hover:plasmo-shadow-md
    active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-800 hover:plasmo-text-slate-900 plasmo-max-w-xs"
      onClick={handleClick}
      disabled={isLoading}>
      {isLoading ? "Loading..." : "Show my location"}
      {location && (
        <span className="plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-4 plasmo-ml-2 plasmo-text-xs plasmo-font-semibold plasmo-rounded-full">
          {location}
        </span>
      )}
    </button>
  )
}
