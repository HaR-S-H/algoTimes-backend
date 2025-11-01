class Logger{
    info(message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
    error(message) {
        console.log(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
    warn(message) {
        console.log(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
    debug(message) {
        console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
}

const logger = new Logger();
export default logger;