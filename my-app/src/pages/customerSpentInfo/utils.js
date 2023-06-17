export const rewardPoints = (price) => {
  if (price > 100) {
    const amount = price - 100;
    return amount * 2 + Math.round(price / 100) * 50;
  } else if (price >= 50) {
    return 50 * 1;
  } else {
    return 0;
  }
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
