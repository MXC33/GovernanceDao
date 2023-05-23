import fs from "fs"
import path from 'path';
import { exec } from "child_process";

const printResponse = (error, stdout, stderr) => {
  if (error)
    console.log(error.message)

  if (stderr)
    console.log(stderr)

  console.log(stdout)
}

(async () => {
  console.log("⚙️ ABI Generation started");

  const abiFiles = fs.readdirSync('./composables/Contract/Abis')
    .filter(file => path.extname(file) == '.json')

  abiFiles.forEach(file => {
    const fileURL = path.join('./composables/Contract/Abis', file)
    exec(`abi-types-generator ./${fileURL} --provider=ethers_v5 --output='./composables/Contract/Abis'`, printResponse)
  })

  return true

})()