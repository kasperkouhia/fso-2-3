function CountryList({ countries, countrySetter }) {
  return (
    <ul className="grid w-fit grid-cols-[max-content] gap-2 rounded-sm bg-neutral-100 p-4">
      {countries.map((country) => (
        <li
          key={country.name.common}
          className="flex items-center justify-between gap-4"
        >
          <span className="flex items-center justify-center gap-2 before:content-['-']">
            {country.name.common}
          </span>
          <button
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm text-white after:text-xs after:font-bold after:content-['_↗'] hover:cursor-pointer hover:bg-blue-700"
            type="button"
            onClick={() => countrySetter(country.name.common)}
          >
            Show
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CountryList;
