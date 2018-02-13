const sortByTemperature = (a, b) => {
  if (parseInt(a.observation_value, 10) > parseInt(b.observation_value, 10)) {
      return -1;
  }
  if (parseInt(a.observation_value, 10) < parseInt(b.observation_value, 10)) {
    return 1;
  }
  return 0;
};

export default sortByTemperature;
