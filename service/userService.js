const logger = require('../main');
const { spawn } = require('child_process');

// Run PowerShell script function
function runPowerShellScript(execParam) {
  logger.info("function runPowerShellScript: ", execParam)
  return new Promise((resolve, reject) => {
    const powershell = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', ...execParam]);

    let stdoutData = '';
    let stderrData = '';

    powershell.stdout.on('data', (data) => {
      stdoutData += data.toString();
      logger.info(`stdout: ${data}`);
    });

    powershell.stderr.on('data', (data) => {
      stderrData += data.toString();
      logger.info(`stderr: ${data}`);
    });

    powershell.on('close', (code) => {
      logger.info(`child process exited with code ${code}`);

      if (code === 0) {
        resolve({ stdout: stdoutData, stderr: stderrData, code });
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
}

module.exports = {
    runPowerShellScript
}