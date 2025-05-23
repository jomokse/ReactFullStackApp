import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type WeatherPoint = {
  time: string;
  temperature: number;
  weatherCode: number;
};

type DailyWeatherPoint = {
  date: string;
  tempMin: number;
  tempMax: number;
};

type City = {
  name: string;
  lat: number;
  lon: number;
};

const cities: City[] = [
  { name: "Helsinki", lat: 60.1699, lon: 24.9384 },
  { name: "Inari", lat: 68.9055, lon: 27.0176 },
  { name: "Joensuu", lat: 62.6021, lon: 29.7597 },
  { name: "Jyväskylä", lat: 62.2417, lon: 25.7495 },
  { name: "Kilpisjärvi", lat: 69.0438, lon: 20.8046 },
  { name: "Lappeenranta", lat: 61.0588, lon: 28.1877 },
  { name: "Maarianhamina", lat: 60.1015, lon: 19.9423 },
  { name: "Oulu", lat: 65.0121, lon: 25.4651 },
  { name: "Rovaniemi", lat: 66.5039, lon: 25.7294 },
  { name: "Tampere", lat: 61.4978, lon: 23.7610 },
  { name: "Turku", lat: 60.4518, lon: 22.2666 },
  { name: "Vaasa", lat: 63.0926, lon: 21.6159 },
];

const getWeatherIcon = (code: number) => {
  if ([0, 1].includes(code)) return "☀️";        // Clear
  if ([2].includes(code)) return "⛅";           // Partly cloudy
  if ([3].includes(code)) return "☁️";           // Overcast
  if ([45, 48].includes(code)) return "🌫️";      // Fog
  if ([51, 61].includes(code)) return "🌦️";      // Light rain
  if ([63, 65, 80].includes(code)) return "🌧️";  // Rain
  if ([71, 73, 75].includes(code)) return "❄️";  // Snow
  return ""; // Default
};

const Forecast = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [data, setData] = useState<WeatherPoint[] | null>(null);
  const [dailyData, setDailyData] = useState<DailyWeatherPoint[] | null>(null);
  const [forecastTitle, setForecastTitle] = useState("");

  const today = new Date();

  useEffect(() => {
    const { lat, lon } = selectedCity;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=Europe%2FHelsinki`
    )
      .then((res) => res.json())
      .then((json) => {
        const hourly = json.hourly;
        const points: WeatherPoint[] = hourly.time.slice(0, 24).map((time: string, i: number) => ({
          time: time.slice(11, 16),
          temperature: hourly.temperature_2m[i],
          weatherCode: json.hourly.weathercode[i],
        }));
        setData(points);
      });
  }, [selectedCity]);

  useEffect(() => {
    const { lat, lon } = selectedCity;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&timezone=Europe%2FHelsinki`
    )
      .then((res) => res.json())
      .then((json) => {
        const days = json.daily;

        const startDate = new Date(days.time[0]);
        const endDate = new Date(days.time[days.time.length - 1]);
        const formatDate = (date: Date) =>
          date.toLocaleDateString("fi-FI", { day: "numeric", month: "numeric" });
        setForecastTitle(`7 day forecast (${formatDate(startDate)}–${formatDate(endDate)})`);

        const points: DailyWeatherPoint[] = days.time.map((dateStr: string, i: number) => {
          const date = new Date(dateStr);
          const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });

          return {
            date: weekday,
            tempMin: days.temperature_2m_min[i],
            tempMax: days.temperature_2m_max[i],
          };
        });
        setDailyData(points);
      });
  }, [selectedCity]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Forecast {selectedCity.name}</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Select location:</label>
        <select
          className="p-2 border rounded"
          value={selectedCity.name}
          onChange={(e) =>
            setSelectedCity(cities.find((c) => c.name === e.target.value)!)
          }
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {!data ? (
        <p>Ladataan säätietoja...</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-8 mb-2">Weather today {today.getDate()}.{today.getMonth() + 1}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="°C" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p>{label}</p>
                        <p>{getWeatherIcon(data.weatherCode)} {data.temperature}°C</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      {dailyData && (
        <>
          <h3 className="text-xl font-semibold mt-8 mb-2">{forecastTitle}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit="°C" />
              <Tooltip />
              <Line type="monotone" dataKey="tempMax" stroke="#ef4444" name="Max" />
              <Line type="monotone" dataKey="tempMin" stroke="#60a5fa" name="Min" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

    </div>
  );
};

export default Forecast;
