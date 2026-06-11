import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

connectDB();

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* CORS */
// app.use(
//   cors({
//     origin: [
//       "https://dayodaygaushalatendukheda.org",
//       "https://www.dayodaygaushalatendukheda.org",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//     ],
//   })
// ); 


app.use(
  cors({
    origin: [
      "https://dayodaygaushalatendukheda.org",
      "https://www.dayodaygaushalatendukheda.org",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

/* Health Check */
app.get("/", (req, res) => {
  res.send("Gaushala Server Running...");
});

/* Routes */
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* Error Handler */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server Running on Port 5000`);
});
