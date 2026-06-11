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

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Gaushala Server Running...");
});
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/donation", donationRoutes); 
app.use("/api/payment", paymentRoutes);

app.use("/api/gallery",galleryRoutes);
app.use("/api/upload", uploadRoutes); 
app.use("/api/blog", blogRoutes);

app.use("/api/volunteer", volunteerRoutes); 

app.use("/api/dashboard",dashboardRoutes);

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`); 
});