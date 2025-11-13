import WeatherInfo from "./WeatherInfo";

function CountryInfoCard({ country }) {
  return (
    <div className="grid w-fit grid-cols-[fit-content] gap-x-4 gap-y-2 rounded-sm bg-neutral-100 p-4">
      <h2 className="col-span-2 text-3xl font-bold">{country.name.common}</h2>
      <div>
        <figure>
          <img
            className="max-h-50 w-full drop-shadow-sm"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </figure>
      </div>
      <div>
        <p>
          <strong>Capital:</strong> {country.capital.join(", ")}
        </p>
        <p>
          <strong>Area:</strong> {country.area} km<sup>2</sup>
        </p>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
        <p>
          <strong>Languages:</strong>
        </p>
        <ul className="ml-4 list-inside list-disc">
          {Object.keys(country.languages).map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))}
        </ul>
      </div>
      {country.capital && country.capitalInfo && country.capitalInfo.latlng ? (
        <>
          <h3 className="col-span-2 text-xl font-bold">
            Weather in {country.capital[0]}
          </h3>
          <div className="col-span-2 flex gap-4">
            <WeatherInfo
              lat={country.capitalInfo.latlng[0]}
              lon={country.capitalInfo.latlng[1]}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CountryInfoCard;
