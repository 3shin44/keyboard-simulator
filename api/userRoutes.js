// 基礎環境設置
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('../main')

// 初始化, 終身PORT號9527
const app = express()
const port = 9527
app.use(bodyParser.json())
app.use(cors())

// 引入Service
const service = require("../service/userService")

// API ROUTES
// 取得版號 (package.json)
app.get('/version', (req, res) => {
  logger.info('API: version');
  const { version } = require("../package.json")
  res.json({ version })
})

// 執行PS script
app.post('/runScript', async (req, res) => {
  logger.info("/runScript req.body: ", req.body);
  try {
    const result = await service.runPowerShellScript(req.body);
    res.json(result);
  } catch (error) {
    logger.info('Error in /runScript:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
