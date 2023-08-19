import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import { LocationButton } from "~features/locationButton"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const [location, setLocation] = useState("")
const PlasmoOverlay = () => {
  return (
    <div className="plasmo-z-50 plasmo-flex plasmo-fixed plasmo-top-32 plasmo-right-8">
      <div className="plasmo-text-white plasmo-font-semibold plasmo-mb-2">
        {location}
      </div>
      <LocationButton onLocationChange={setLocation} />
    </div>
  )
}

export default PlasmoOverlay
