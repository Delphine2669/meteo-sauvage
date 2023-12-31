import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Timezone({ citySearch }) {
  const [timezoneName, setTimezoneName] = useState("");
  const [timezone, setTimezone] = useState("");
  useEffect(() => {
    async function fetchTimezone() {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${citySearch}&key=${
            import.meta.env.VITE_TIMEZONE_API_KEY
          }`
        );
        const timezoneNameResponse =
          response.data.results[0].annotations.timezone.name;
        setTimezoneName(timezoneNameResponse);
        const timezoneOffset =
          response.data.results[0].annotations.timezone.offset_string;
        // this API time isnt based on Paris time, so that we had to add the -2 for the next variable
        const hours = timezoneOffset.slice(0, -2) - 2;
        const minutes = timezoneOffset.slice(-2);
        const formattedOffset = `${hours}H${minutes}`;
        setTimezone(formattedOffset);
      } catch (error) {
        console.error(error);
      }
    }
    if (citySearch) {
      fetchTimezone();
    }
  }, [citySearch]);

  return (
    <div className="timezone ">
      <h2 className="component-title">Décalage horaire</h2>
      <h4 className="tz-h4">Région:</h4>
      <h4 className="tz-h4">{timezoneName}</h4>
      <p>décalage horaire de:</p>
      <h4 className="tz-h4">{timezone} par rapport à Paris</h4>
    </div>
  );
}
Timezone.propTypes = { citySearch: PropTypes.string.isRequired };
export default Timezone;
