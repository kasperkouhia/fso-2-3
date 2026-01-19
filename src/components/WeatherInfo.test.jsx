import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

vi.mock("axios");

// Simulating data from call https://api.openweathermap.org/data/2.5/weather?lat=60.17&lon=24.93&units="metric" at 19/01/2026 15:30
axios.get.mockResolvedValue({
  data: {
    weather: [
      {
        description: "mist",
        icon: "50d",
      },
    ],
    main: {
      temp: -1.52,
      feels_like: -6.17,
    },
    wind: {
      speed: 4.02,
    },
  },
});

describe("WeatherInfo", () => {
  beforeEach(() => render(<WeatherInfo lat={60.17} lon={24.93} />));

  it("Renders fallback text before data has been fetched and/or loaded in", () => {
    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
  });

  it("Renders weather information after fetching data", async () => {
    const expectations = [
      { label: "Temperature:", value: "-1.52 °C" },
      { label: "Feels like:", value: "-6.17 °C" },
      { label: "Wind:", value: "4.02 m/s" },
    ];

    for (const { label, value } of expectations) {
      expect(await screen.findByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("Renders weather icon with correct src and alt", async () => {
    const icon = await screen.findByRole("img");
    const expectations = [
      { name: "src", value: "https://openweathermap.org/img/wn/50d@4x.png" },
      { name: "alt", value: "Mist" },
    ];

    for (const { name, value } of expectations) {
      expect(icon).toHaveAttribute(name, value);
    }
  });
});
