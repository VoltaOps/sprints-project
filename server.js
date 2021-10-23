const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger-spec");

const connectDB = require("./config/database");
const usersRoutes = require("./routes/users");
const favouritesRoutes = require("./routes/favourites");
const categoriesRoutes = require("./routes/categories");
const placesRoutes = require("./routes/places");
const disabilitiesRoutes = require("./routes/disabilities");
const reviewsRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cookie parser
app.use(cookieParser());

// File Uploading
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/places", placesRoutes);
app.use("/api/v1", disabilitiesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/favourites", favouritesRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit
  server.close(() => process.exit(1));
});
