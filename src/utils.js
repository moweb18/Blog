export const URL_API = "https://dashboard.modifwebsite.id/api";

export const convertDate = (date, isThreeMonthLetters = true) => {
  const dateParts = date.split(" ");
  const datePart = dateParts[0];
  const dateSplit = datePart.split("-");
  const year = parseInt(dateSplit[0]);
  const month = parseInt(dateSplit[1]);
  const day = parseInt(dateSplit[2]);

  const monthNames = [
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

  if (isThreeMonthLetters) {
    return day + " " + monthNames[month - 1].substring(0, 3) + " " + year;
  } else {
    return day + " " + monthNames[month - 1] + " " + year;
  }
};

export const shareArticle = (socialMediaName) => {
  const text = document
    .querySelector('meta[property="og:title"]')
    .getAttribute("content");
  const image = document
    .querySelector('meta[property="og:image"]')
    .getAttribute("content");
  const currentURL = window.location.href;
  const message = `${encodeURIComponent(text)}
			%0A%0A
			${encodeURIComponent(currentURL)}`;

  if (socialMediaName == "WhatsApp") {
    window.open(
      `https://api.whatsapp.com/send?text=${message}&image=${image}`,
      "_blank",
      "width=600,height=600",
    );
  } else if (socialMediaName == "X") {
    window.open(
      `https://twitter.com/intent/tweet?text=${message}&image=${image}`,
      "_blank",
      "width=600,height=600",
    );
  } else if (socialMediaName == "LinkedIn") {
    window.open(
      `https://www.linkedin.com/shareArticle?url=${currentURL}&image=${encodeURIComponent(image)}`,
      "_blank",
      "width=600,height=600",
    );
  } else if (socialMediaName == "Telegram") {
    window.open(
      `https://telegram.me/share/url?url=${message}&image=${image}`,
      "_blank",
      "width=600,height=600",
    );
  } else if (socialMediaName == "Facebook") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentURL}&display=popup&quote=${text}&image=${image}`,
      "_blank",
      "width=600,height=600",
    );
  }
};
