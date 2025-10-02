function CountryList({ countries }) {
  return (
    <ul className="w-fit list-inside list-disc rounded-sm bg-neutral-100 p-4">
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
}

export default CountryList;
