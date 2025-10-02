function CountryInfoCard({ country }) {
  return (
    <div className="grid w-fit grid-cols-[fit-content] gap-4 rounded-sm bg-neutral-100 p-4">
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
          <strong>Capital:</strong> {country.capital}
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
    </div>
  );
}

export default CountryInfoCard;
