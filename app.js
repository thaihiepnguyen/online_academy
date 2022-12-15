import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import accountRoute from "./routes/account.route.js";
import productUserRoute from "./routes/product-user.route.js";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    helpers: {
      renderStars(rating) {
        let result = "";
        for (let i = 1; i <= 5; i++) {
          let checked = rating >= i ? " checked" : "";
          result += `<span class='fa fa-star${checked}'></span>`;
        }
        return result;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", function (req, res) {
  // res.send('Hello World.');
  res.render("vwlogin/login");
});

app.use("/account", accountRoute);

//app.get('/login', function (req, res) {
//  const __dirname = dirname(fileURLToPath(import.meta.url));
//  res.sendFile(__dirname + '/views/layouts/bs4');
//})
app.use("/products", productUserRoute);

//helper
// ExpressHandlebars.registerHelper("renderStars", (rating) => {
//   let result = "";
//   for (let i = 1; i <= 5; i++) {
//     let checked = rating >= i ? " checked" : "";
//     result += `<span class='fa fa-star${checked}'></span>`;
//   }
//   return new ExpressHandlebars.SafeString(result);
// });

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce App listening at http://localhost:${PORT}`);
});
