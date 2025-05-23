import { useState, useEffect } from 'react';

function Doggies() {
  const [imageUrl, setImageUrl] = useState('');

  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setImageUrl(data.message);
    } catch (error) {
      console.error('Virhe haettaessa koirakuvaa:', error);
    }
  };

  useEffect(() => {
    fetchDogImage(); // lataa kuva sivun avautuessa
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold mb-4">Pick a dog image from the Dog CEO API service:</h1>
      <img
        src={imageUrl}
        alt="Random dog"
        className="max-w-full h-auto mt-4 rounded-xl shadow-md"
      />
      <button onClick={fetchDogImage} className={"px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"}>Pick another one</button>
    </div>
  );
}

export default Doggies;
