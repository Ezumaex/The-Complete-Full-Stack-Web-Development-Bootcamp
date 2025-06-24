import express from 'express';

const app = express();
const port = 3000;

app.set("view engine", "ejs");

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDay(dateIndex){
  return dayNames[dateIndex];
}

const today = new Date().getDay();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay();

  let type = "a weekday";
  let adv = "it's time to work hard";

  if (day === 0 || day === 6) {
    type = "the weekend";
    adv = "it's time to have some fun";
  }

  res.render("index", {
    dayName: dayNames[day],
    dayType: type,
    advice: adv,
  });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});