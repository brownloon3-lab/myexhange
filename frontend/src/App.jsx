import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState("MMKtoTHB");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchLatestRate = async () => {
      try {
        const res = await axios.get("/api/rate"); // Vite proxy
        if (res.data.length > 0) setRate(res.data[0]);
      } catch (err) {
        console.error("Error fetching rate:", err);
      }
    };
    fetchLatestRate();
  }, []);

  const handleConvert = () => {
    if (!rate || !amount) return;
    let converted;
    if (direction === "MMKtoTHB") converted = (amount / rate.mmkToThb).toFixed(2);
    else converted = (amount * rate.thbToMmk).toFixed(2);
    setResult(converted);
  };

  if (!rate) return <p className="text-center mt-10 text-gray-500">Loading latest rate...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">💱 Money Exchange</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="MMKtoTHB">ကျပ်ပေး ➝ ဘတ်</option>
          <option value="THBtoMMK">ဘတ်ပေး ➝ ကျပ်</option>
        </select>

        <button
          onClick={handleConvert}
          className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-5 py-3 rounded w-full mb-4"
        >
          Convert
        </button>

        {result && (
          <h3 className="text-xl font-medium mb-3 text-center text-gray-700">
            Result: {result} {direction === "MMKtoTHB" ? "THB" : "MMK"}
          </h3>
        )}

        <div className="text-center text-gray-600 text-sm">
          💹 Latest Rate:<br />
          1 THB => {rate.thbToMmk} MMK (ဘတ်ပေး),<br />
          1 MMK => {rate.mmkToThb} THB (ကျပ်ပေး)
        </div>
      </div>
    </div>
  );
}

export default App;
