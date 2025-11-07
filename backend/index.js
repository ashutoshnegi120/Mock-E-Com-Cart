import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Database/Connect.js";
import Router from "./Routers/Routes.js"



const app = express();
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', Router);

const startServer = async () => {
    try {
        await ConnectDB();
        console.log("MongoDB Connected");
        // eslint-disable-next-line no-undef
        const PORT = process.env.PORT || 5000;

        const server = app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server listening on port ${PORT}`);
        });

        // Graceful Shutdown
        const gracefulShutdown = () => {
            console.log("Shutting down gracefully...");
            server.close(() => {
                console.log("Closed out remaining connections.");
                // eslint-disable-next-line no-undef
                process.exit(0);
            });

            setTimeout(() => {
                console.error("Forcing shutdown...");
                // eslint-disable-next-line no-undef
                process.exit(1);
            }, 10000);
        };

        // eslint-disable-next-line no-undef
        process.on("SIGTERM", gracefulShutdown);
        // eslint-disable-next-line no-undef
        process.on("SIGINT", gracefulShutdown);

    } catch (err) {
        console.error("❌ Failed to connect to database", err.message);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

startServer();



