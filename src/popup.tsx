import { useState } from "react"

import { CountButton } from "~features/count-button"

import "~style.css"

function IndexPopup() {
  const [location, setLocation] = useState("")

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-32 plasmo-w-40 plasmo-bg-blue-500">
      <div className="plasmo-p-2 plasmo-text-white plasmo-font-semibold plasmo-mb-2 plasmo-justify-center plasmo-overflow-hidden plasmo-text-center">
        {location}
      </div>
      <CountButton onLocationChange={setLocation} />
    </div>
  )
}

export default IndexPopup
