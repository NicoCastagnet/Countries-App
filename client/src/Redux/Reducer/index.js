import {
  GET_COUNTRIES,
  GET_ACTIVITY,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_BY_ID,
  ORDER_NAME,
  ORDER_POPULATION,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  NEW_ACTIVITY,
  DELETE_ACTIVITY,
} from '../Actions/index';

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_NAME:
      const orderedByName =
        action.payload === 'asc'
          ? state.countries.slice().sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.countries.slice().sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: orderedByName,
      };

    case ORDER_POPULATION:
      const orderedByPopulation =
        action.payload === 'me-ma'
          ? state.countries.slice().sort((a, b) => a.population - b.population)
          : state.countries.slice().sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: orderedByPopulation,
      };

    case FILTER_CONTINENT:
      let allCountries = state.allCountries;
      let filteredContinents =
        action.payload === 'All'
          ? allCountries
          : allCountries.filter((c) => c.continent?.includes(action.payload));
      return {
        ...state,
        countries: filteredContinents,
      };

    case FILTER_ACTIVITY:
      const allCountriesAct = state.allCountries;
      const activitiesFilter =
        action.payload === 'All'
          ? allCountriesAct
          : allCountriesAct.filter(
              (c) =>
                c.activities &&
                c.activities.map((ac) => ac.name).includes(action.payload)
            );
      return {
        ...state,
        countries: activitiesFilter,
      };

    case NEW_ACTIVITY:
      return {
        ...state,
      };

    case DELETE_ACTIVITY:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}
