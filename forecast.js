import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  // Handle loading state
  if (!data || !data.list) {
    return <div>Loading...</div>;
  }

  const { list } = data;  // Destructuring list from data
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {list.slice(0, 7).map((item, idx) => {
          const { weather, main, clouds, wind } = item;
          const { icon, description } = weather[0];
          const { temp_min, temp_max, feels_like, pressure, humidity, sea_level } = main;

          return (
            <AccordionItem key={item.dt}>
              <AccordionItemHeading>
                <AccordionItemButton 
                  aria-label={`Forecast for ${forecastDays[idx]}`} 
                  aria-expanded="false" // Update dynamically if required
                >
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${icon}.png`}
                      onError={(e) => e.target.src = 'icons/default-icon.png'} // Handle missing icon
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">{description}</label>
                    <label className="min-max">{Math.round(temp_min)}°C / {Math.round(temp_max)}°C</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure</label>
                    <label>{pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds</label>
                    <label>{clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed</label>
                    <label>{wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level</label>
                    <label>{sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like</label>
                    <label>{Math.round(feels_like)}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

// PropTypes for type safety
Forecast.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
        main: PropTypes.shape({
          temp_min: PropTypes.number.isRequired,
          temp_max: PropTypes.number.isRequired,
          feels_like: PropTypes.number.isRequired,
          pressure: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
          sea_level: PropTypes.number.isRequired,
        }).isRequired,
        clouds: PropTypes.shape({
          all: PropTypes.number.isRequired,
        }).isRequired,
        wind: PropTypes.shape({
          speed: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default React.memo(Forecast);  // Optimize performance by memoizing the component
