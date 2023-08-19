import dotenv from "dotenv"
import { useState } from "react"
import { BeatLoader } from "react-spinners"

import countryCodes from "../../assets/country-codes.json"

dotenv.config()

// Define the props for the LocationButton component
interface LocationButtonProps {
  onLocationChange: (location: string) => void
}

// Define the LocationButton component
const LocationButton: React.FC<LocationButtonProps> = ({
  onLocationChange
}) => {
  // Define the isLoading state variable and setIsLoading function
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Define the handleClick function
  const handleClick = async (): Promise<void> => {
    setIsLoading(true)

    try {
      // Get the user's IP address
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json")
      const { ip } = await ipAddressResponse.json()

      // Get the user's location information based on their IP address
      const ipInfoResponse = await fetch(
        `https://ipinfo.io/${ip}?token=${
          process.env.IPINFO_ACCESS_TOKEN || "0836df2134ee04"
        }`
      )
      const { country, city } = await ipInfoResponse.json()

      // Get the country name based on the country code
      const countryName = countryCodes[country] || "Unknown"

      // Call the onLocationChange function with the user's location information
      onLocationChange(`Your country is ${countryName} and city is ${city}. 🎉`)
    } catch (error) {
      console.error(error)

      // Call the onLocationChange function with an error message
      onLocationChange("Error getting location")
    }

    setIsLoading(false)
  }

  // Render the LocationButton component
  return (
    <button
      type="button"
      className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none plasmo-shadow-lg hover:plasmo-shadow-md active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-800 hover:plasmo-text-slate-900 plasmo-max-w-xs"
      onClick={handleClick}
      disabled={isLoading}>
      {isLoading ? (
        <span className="plasmo-flex plasmo-flex-col">
          <BeatLoader color="red" size={8} className="plasmo-block" />
          <span className="plasmo-m-auto plasmo-width-auto plasmo-font-bold">
            Loading...
          </span>
        </span>
      ) : (
        "Show my location"
      )}
    </button>
  )
}

export default LocationButton
