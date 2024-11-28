const util = {
  filePath: '',
  generateParam: (paramConfig) => {
    let cmdArray = []

    // PS1檔案路徑
    cmdArray.unshift(util.filePath)

    for (const [key, value] of Object.entries(paramConfig)) {
      switch (key) {
        // 延遲
        case 'delay':
          cmdArray.push(`-Delay ${value}`)
          break

        case 'enter':
          if (value) {
            cmdArray.push(`-Enter `)
          }

          break

        case 'raw':
          if (value) {
            cmdArray.push(`-Raw `)
          }

          break

        default:
          break
      }
    }
    return cmdArray
  }
}

export default util
