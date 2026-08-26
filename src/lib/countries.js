const PRIORITY_COUNTRY_CODES = ["IN", "DE"];

const FALLBACK_COUNTRY_CODES = [
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT",
  "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CR",
  "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI", "FR",
  "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE",
  "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MG",
  "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP",
  "NL", "NZ", "NI", "NE", "NG", "MK", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU",
  "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS",
  "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG",
  "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN", "YE", "ZM", "ZW",
];

export function getCountryFlag(code) {
  if (!code || code === "OTHER" || code.length !== 2) return "🌍";

  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((char) => 127397 + char.charCodeAt(0)),
  );
}

function getAllCountryCodes() {
  if (typeof Intl !== "undefined" && typeof Intl.supportedValuesOf === "function") {
    try {
      return Intl.supportedValuesOf("region").filter((code) => /^[A-Z]{2}$/.test(code));
    } catch {
      return FALLBACK_COUNTRY_CODES;
    }
  }

  return FALLBACK_COUNTRY_CODES;
}

export function getCountryOptions(locale = "en") {
  const language = locale === "de" ? "de" : "en";
  const displayNames = new Intl.DisplayNames([language], { type: "region" });
  const codes = getAllCountryCodes();

  const priority = PRIORITY_COUNTRY_CODES.filter((code) => codes.includes(code));
  const rest = codes
    .filter((code) => !PRIORITY_COUNTRY_CODES.includes(code))
    .sort((a, b) => (displayNames.of(a) || a).localeCompare(displayNames.of(b) || b, language));

  return [...priority, ...rest].map((code) => ({
    code,
    label: displayNames.of(code) || code,
    flag: getCountryFlag(code),
  }));
}
