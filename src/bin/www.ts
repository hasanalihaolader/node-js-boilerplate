import logger from "@/utils/logger";
import app from "@/app";
import dotenv from "dotenv";
dotenv.config();

const server = app.listen(process.env.APP_PORT);
logger.info('www.ts', 200, `Application running on port ${process.env.APP_PORT}`);

const onCloseSignal = () => {
	logger.info('www.ts','', "sigint received, shutting down");
	server.close(() => {
		logger.info('www.ts','', "server closed");
		process.exit();
	});
	setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
