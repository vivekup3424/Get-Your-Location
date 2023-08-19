// write the unit tests for locationButton.tsx here

import { fireEvent, render } from "@testing-library/react"

import LocationButton from "../src/features/locationButton.tsx"

describe("Unit tests for LocationButton functionalities", () => {
  it("should display the location on click", async () => {
    const onLocationChange = jest.fn() // mock function
    const { getByText } = render(
      <LocationButton onLocationChange={onLocationChange} />
    )

    fireEvent.click(getByText("Get my location"))

    await waitFor(() => {
      expect(onLocationChange).toHaveBeenCalledTimes(1)
    })
    expect(onLocationChange).toHaveBeenCalledWith(
      expect.stringContaining("Your country is India and city is Indore. 🎉")
    )
  })
  it("displays error message on failure", async () => {
    const onLocationChange = jest.fn()
    const { getByText } = render(
      <LocationButton onLocationChange={onLocationChange} />
    )

    global.fetch = jest.fn(() => Promise.reject("API is down"))

    fireEvent.click(getByText("Show my location"))

    await waitFor(() => expect(onLocationChange).toHaveBeenCalledTimes(1))
    expect(onLocationChange).toHaveBeenCalledWith("Error getting location")
  })
})
