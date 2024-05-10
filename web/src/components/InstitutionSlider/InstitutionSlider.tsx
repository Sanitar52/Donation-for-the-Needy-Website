import React, { useState, useEffect } from 'react';

const defaultItems = [
  {
    institution: {
      id: 1,
      name: 'Default Institution 1',
      logo: 'https://i.ibb.co/2svmG06/defaultlogo.png',
    },
  },
  {
    institution: {
      id: 2,
      name: 'Default Institution 2',
      logo: 'https://i.ibb.co/2svmG06/defaultlogo.png',
    },
  },
  {
    institution: {
      id: 3,
      name: 'Default Institution 3',
      logo: 'https://i.ibb.co/2svmG06/defaultlogo.png',
    },
  },
];

function InstitutionSlider({ title = 'Recent Institutions', items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('');

  // Fallback to default items if the provided items array is empty
  const allItems = items.length === 0 ? defaultItems : items;

  const handlePrevClick = () => {
    setTransitionDirection('slide-left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setTransitionDirection('slide-right');
    setCurrentIndex((prevIndex) =>
      prevIndex === allItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const displayedItems = allItems.length
    ? Array.from({ length: Math.min(4, allItems.length) }).map(
        (_, index) => allItems[(currentIndex + index) % allItems.length]
      )
    : [];

  // Reset animation class after transition
  useEffect(() => {
    const timeout = setTimeout(() => setTransitionDirection(''), 500);
    return () => clearTimeout(timeout);
  }, [transitionDirection]);

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
              displayedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 bg-white rounded-lg p-4 shadow-md"
                >
                  <img
                    src={item.institutions.logo}
                    alt={item.institutions.name}
                    className="w-20 h-20 object-cover mb-2 rounded-full border-2 border-gray-300"
                  />
                  <h3 className="font-bold">{item.institutions.name}</h3>
                </div>
              ))
            ) : (
              <div>No recent institutions available</div>
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
  );
}

export default InstitutionSlider;
