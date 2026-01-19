import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CountryInfoCard from "./CountryInfoCard";

vi.mock("./WeatherInfo", () => ({
  default: ({ lat, lon }) => (
    <div data-testid="weather-info">
      {lat}, {lon}
    </div>
  ),
}));

const country = {
  name: { common: "Finland" },
  flags: {
    svg: "https://flagcdn.com/fi.svg",
    alt: "The flag of Finland has a white field with a large blue cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side.",
  },
  capital: ["Helsinki"],
  area: 338424,
  population: 5530719,
  languages: {
    fin: "Finnish",
    swe: "Swedish",
  },
  capitalInfo: { latlng: [60.17, 24.93] },
};

describe("CountryInfoCard", () => {
  it("Renders basic country information", () => {
    render(<CountryInfoCard country={country} />);

    expect(
      screen.getByRole("heading", { name: country.name.common }),
    ).toBeInTheDocument();

    const flag = screen.getByRole("img", { name: country.flags.alt });

    expect(flag).toHaveAttribute("src", country.flags.svg);

    const otherExpectations = [
      { label: "Capital:", value: country.capital[0] },
      { label: "Area:", value: country.area },
      { label: "Population:", value: country.population },
    ];

    for (const { label, value } of otherExpectations) {
      expect(screen.getByText(label).closest("p")).toHaveTextContent(value);
    }
  });

  it("Renders a list of languages", () => {
    render(<CountryInfoCard country={country} />);

    const languages = Object.values(country.languages);

    for (const language of languages) {
      expect(screen.getByText(language)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(languages.length);
  });

  it("Renders WeatherInfo when capital coordinates are available", () => {
    render(<CountryInfoCard country={country} />);

    expect(screen.getByTestId("weather-info")).toBeInTheDocument();

    const latLng = country.capitalInfo.latlng;

    expect(screen.getByText(latLng.join(", ")));
  });

  it("Does not render WeatherInfo when capital coordinates are unavailable", () => {
    const countrySansCoords = { ...country, capitalInfo: null };

    render(<CountryInfoCard country={countrySansCoords} />);

    expect(screen.queryByTestId("weather-info")).not.toBeInTheDocument();
  });
});
