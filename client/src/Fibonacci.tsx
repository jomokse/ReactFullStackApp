import { useState } from 'react';

function Fibonacci() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<number[]>([]);

  // Calculates Fibonacci serie.
  const calculateFibonacci = () => {
    const n = parseInt(number);
    if (isNaN(n)) {
      alert("Set a number.");
      return;
    }

    if (n < 0 || n > 99) {
      alert("The input must be between 0 and 99.");
      return;
    }

    const sequence: any[] | ((prevState: number[]) => number[]) = [];
    for (let i = 0; i < n; i++) {
      if (i === 0) sequence.push(0);
      else if (i === 1) sequence.push(1);
      else sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    setResult(sequence);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fibonacci calculator</h1>
      <div className="flex items-center space-x-2 mb-2">
        <label>Set a number: </label>
        <input
          type="number"
          value={number}
          onChange={(e) => {
            const value = e.target.value;

            // Only integers 0–99 are allowed.
            if (/^\d{0,2}$/.test(value)) {
              setNumber(value);
            }
          }}
          min="0"
          max="99"
          className="border px-3 py-1 rounded "
        />
        <button onClick={calculateFibonacci}
          className={"px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"}
        >Calculate</button>
      </div>

      {result.length > 0 && (
        <p>Output: {result.join(', ')}</p>
      )}
    </div>
  );
}

export default Fibonacci;
