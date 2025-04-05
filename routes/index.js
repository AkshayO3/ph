import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";
import bidRoutes from "./bidRoutes.js";

export default function(app) {
    app.use("/auth",authRoutes)
    app.use("/jobs",jobRoutes)
    app.use("/bids",bidRoutes)
}