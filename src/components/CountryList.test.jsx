import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CountryList from "./CountryList";

const mockSetter = vi.fn();

const countries = [
  { name: { common: "Finland" } },
  { name: { common: "Sweden" } },
  { name: { common: "Norway" } },
];

describe("CountryList", () => {
  beforeEach(() =>
    render(<CountryList countries={countries} countrySetter={mockSetter} />),
  );

  it("Renders a list of countries", () => {
    for (const country of countries) {
      expect(screen.getByText(country.name.common)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(countries.length);
  });

  it("Calls countrySetter correctly on button press", async () => {
    const user = userEvent.setup();

    for (const country of countries) {
      const countryListItem = screen
        .getByText(country.name.common)
        .closest("li");
      const countryButton = within(countryListItem).getByRole("button");

      await user.click(countryButton);

      expect(mockSetter).toHaveBeenCalledWith(country.name.common);
    }
  });
});
