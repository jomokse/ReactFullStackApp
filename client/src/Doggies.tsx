// Doggies.tsx
// This component displays a random dog image from the Dog CEO API.
// Users can fetch a new random image by clicking a button.

import { useState, useEffect } from 'react';

function Doggies() {
  // State to hold the current dog image URL
  const [imageUrl, setImageUrl] = useState('');

  // Function to fetch a random dog image from the Dog CEO API
  const fetchDogImage = async () => {
    try {
      // Fetch a random image
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setImageUrl(data.message); // Set the image URL from API response
    } catch (error) {
      // Log any errors to the console
      console.error('Error retrieving dog picture:', error);
    }
  };

  // Fetch a dog image when page opens (runs once)
  useEffect(() => {
    fetchDogImage();
  }, []);

  // Render the UI
  return (
    <div className="p-4 space-y-2">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">Pick a dog image from the Dog CEO API service:</h1>
      {/* Dog image display */}
      <img
        src={imageUrl}
        alt="Random dog"
        className="max-w-full h-auto mt-4 rounded-xl shadow-md"
      />
      {/* Button to fetch a new image */}
      <button onClick={fetchDogImage} className={"px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"}>Pick another one</button>
    </div>
  );
}

export default Doggies;
