import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { exec } from "child_process";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runCode = async (req, res, logger) => {
  logger.info("POST /run");

  let code = req.body;

  let file_path = path.join(__dirname, `tmp-${new Date().getTime()}`);
  fs.writeFileSync(file_path, JSON.stringify(code));
  exec(`python execute.py ${file_path}`, (err, stdout, stderr) => {
    fs.unlinkSync(file_path);
    if (!err) {
      res.status(200).send({
        status: "success",
        stdout: stdout,
        stderr: stderr,
      });
    } else {
      res.status(200).send({
        status: "error",
        stdout: stdout,
        stderr: stderr,
      });
    }
  });
};

const RunController = (app, logger) => {
  app.post("/api/run", (req, res) => runCode(req, res, logger));
};

export default RunController;
