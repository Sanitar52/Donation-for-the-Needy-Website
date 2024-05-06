// web/src/components/RecentDonationSlider/RecentDonationSlider.js
import React, { useState, useEffect } from 'react'

function RecentDonationSlider({ title = 'Recent 5 Donations', items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState('')

  const handlePrevClick = () => {
    setTransitionDirection('slide-left')
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const handleNextClick = () => {
    setTransitionDirection('slide-right')
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const displayedItems = items.length
    ? Array.from({ length: Math.min(4, items.length) }).map(
        (_, index) => items[(currentIndex + index) % items.length]
      )
    : []

  // Reset animation class after transition
  useEffect(() => {
    const timeout = setTimeout(() => setTransitionDirection(''), 500)
    return () => clearTimeout(timeout)
  }, [transitionDirection])

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevClick}
          className="text-sm rounded-full bg-gray-300 hover:bg-gray-400"
        >
          &lt;
        </button>
        <div className="overflow-hidden flex-1 mx-2">
          <div
            className={`flex justify-between space-x-4 transition-all duration-500 ${transitionDirection}`}
          >
            {displayedItems.length ? (
              displayedItems.map((donation, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 bg-white rounded-lg p-4 shadow-md"
                >
                  <img
                    src={donation.institution.logo}
                    alt={donation.institution.name}
                    className="w-20 h-20 object-cover mb-2 rounded-full border-2 border-gray-300"
                  />
                  <h3 className="font-bold">{donation.institution.name}</h3>
                  <p className="text-sm font-semibold">{`Donated by: ${donation.user.name}`}</p>
                  <p className="font-semibold">{`Amount: TL${donation.amount.toFixed(
                    2
                  )}`}</p>
                </div>
              ))
            ) : (
              <div>No recent donations available</div>
            )}
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="text-xl p-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default RecentDonationSlider
