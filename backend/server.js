import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import seedHospitalData from "./src/utils/seedHospitalData.js";
import seedAdmin from "./src/utils/seedAdmin.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(seedAdmin)
  .then(seedHospitalData)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SHREE Ortho & Multispeciality Hospital API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  });
