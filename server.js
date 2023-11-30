import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 1234;

app.use(cors());
app.get("/api", () => {
  console.log("frontend is connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
