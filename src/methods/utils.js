function getWeatherDesc(code) {
  switch (true) {
    case code === 0:
      return "Clear Sky";
    case code === 1:
      return "Mainly Clear";
    case code === 2:
      return "Partly Cloudy";
    case code === 3:
      return "Overcast";
    case code === 45:
      return "Fog";
    case code === 48:
      return "Depositing rime fog";
    case code === 51:
      return "Light Drizzle";
    case code === 53:
      return "Moderate Drizzle";
    case code === 55:
      return "Dense Drizzle";
    case code === 56:
      return "Light Freezing Drizzle";
    case code === 57:
      return "Dense Freezing Drizzle";
    case code === 61:
      return "Slight Rain";
    case code === 63:
      return "Moderate Rain";
    case code === 65:
      return "Heavy Rain";
    case code === 66:
      return "Freezing Light Rain";
    case code === 67:
      return "Freezing Heavy Rain";
    case code === 71:
      return "Slight Snow fall";
    case code === 73:
      return "Moderate Snow fall";
    case code === 75:
      return "Heavy Snow fall";
    case code === 77:
      return "Snow grains";
    case code === 80:
      return "Slight Rain Showers";
    case code === 81:
      return "Moderate Rain Showers";
    case code === 82:
      return "Violent Rain Showers";
    case code === 85:
      return "Light Snow Showers";
    case code === 86:
      return "Heavy Snow Showers";
    case code === 95:
      return "Thunderstorm";
    case code === 96:
      return "Thunderstorm with slight hail";
    case code === 99:
      return "Thunderstorm with heavy hail";
    default:
      return "Not Available";
  }
}

function getUid(latitude, longitude) {
  return `${latitude}-${longitude}`.replaceAll(".", "-");
}

const savedCities = JSON.parse(localStorage.getItem("savedCities"));

export { getWeatherDesc, getUid, savedCities };
