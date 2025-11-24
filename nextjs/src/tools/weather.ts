import { z } from "zod";
import { type ToolMetadata, type InferSchema } from "xmcp";

const cities = {
  "Buenos Aires": { lat: -34.6037, lon: -58.3816 },
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  Berlin: { lat: 52.52, lon: 13.405 },
  Tokyo: { lat: 35.6762, lon: 139.6503 },
  "New York": { lat: 40.7128, lon: -74.006 },
} as const;

// Define the schema for tool parameters
export const schema = {
  city: z
    .enum([
      "Buenos Aires",
      "San Francisco",
      "Berlin",
      "Tokyo",
      "New York",
    ] as const)
    .describe("The city to get weather for"),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "weather",
  description: "Get current weather information for a city",
  annotations: {
    title: "Get weather",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

// Tool implementation
export default async function weather({
  city,
}: InferSchema<typeof schema>): Promise<string> {
  const cityCoords = cities[city];
  if (!cityCoords) {
    return `City "${city}" is not supported. Supported cities are: ${Object.keys(cities).join(", ")}`;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityCoords.lat}&longitude=${cityCoords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return `Failed to fetch weather data: ${response.statusText}`;
    }

    const data = (await response.json()) as {
      current?: {
        temperature_2m?: number;
        relative_humidity_2m?: number;
        weather_code?: number;
        wind_speed_10m?: number;
      };
    };

    if (!data.current) {
      return "No weather data available";
    }

    const { temperature_2m, relative_humidity_2m, wind_speed_10m } =
      data.current;

    return `Weather for ${city}:
Temperature: ${temperature_2m ?? "N/A"}°C
Humidity: ${relative_humidity_2m ?? "N/A"}%
Wind Speed: ${wind_speed_10m ?? "N/A"} km/h`;
  } catch (error) {
    return `Error fetching weather data: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

