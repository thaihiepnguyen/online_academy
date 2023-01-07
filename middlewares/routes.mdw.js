import productUserRoute from "../routes/product-user.route.js";
import accountRoute from "../routes/account.route.js";
import coursesRoute from "../routes/courses.route.js";
import adminRoute from "../routes/admin.route.js";
import coursesController from "../controllers/courses.controller.js";
import coursesService from "../services/courses.service.js";

export default function (app) {
  app.get("/", async function (req, res) {
    const courses = await coursesController.findTop5Courses();

    console.log(await coursesService.findAll());
    if (courses == null) {
      res.render("home", {
        warning: `Can not find any courses`,
      });
      return;
    }

    for (let i = 0; i < courses.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < courses[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      courses[i].ratings = ratings;
    }

    res.render("home.hbs", {
      activeTagbarLayout: true,
      activeSliderLayout: true,
      courses,
    });
  });

  app.use("/account", accountRoute);
  app.use("/products", productUserRoute);
  app.use("/courses", coursesRoute);
  app.use("/admin", adminRoute);
  app.use("/details", coursesRoute);
}
