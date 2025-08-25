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
        const res = await axios.get("/api/rate"); // Vite proxy handles port
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

  if (!rate) return <p>Loading latest rate...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-4 text-center border rounded shadow">
      <h2 className="text-2xl mb-4">💱 Money Exchange</h2>

      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
      >
        <option value="MMKtoTHB">ကျပ်ပေး</option>
        <option value="THBtoMMK">ဘတ်ပေး</option>
      </select>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleConvert}
      >
        Convert
      </button>

      {result && (
        <h3 className="text-xl mb-2">
          Result: {result} {direction === "MMKtoTHB" ? "THB" : "MMK"}
        </h3>
      )}

      <p>
        💹 Latest Rate: 1 THB => {rate.thbToMmk} MMK(ဘတ်ပေး), 1 THB => {rate.mmkToThb} MMK (ကျပ်ပေး)
      </p>
    </div>
  );
}

export default App;
