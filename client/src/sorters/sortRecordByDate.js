const sortRecordByDate = (a, b) => {
  return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
};

export default sortRecordByDate;
