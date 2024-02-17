export const URL_API = "https://dashboard.modifwebsite.id/api";

export const convertDate = (date) => {
  const dateParts = date.split(" ");
  const datePart = dateParts[0];
  const dateSplit = datePart.split("-");
  const year = parseInt(dateSplit[0]);
  const month = parseInt(dateSplit[1]);
  const day = parseInt(dateSplit[2]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return day + " " + monthNames[month - 1] + " " + year;
};
