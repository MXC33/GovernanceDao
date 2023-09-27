import fs from "fs"
import fetch from "node-fetch"
import { Headers } from 'node-fetch'
import extract from "extract-zip"
import path from 'path'

const API_TOKEN = "aq8NUYR1G6Rv03wO8iJjooXQy7SpMApK";
const headers = new Headers({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
});

const ZIP_FILE = 'hex-miniverse.zip';
const FINAL_FOLDER = 'public/s3/HexMiniverse'

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const pollJob = async (id) => {
  const jobStatus = await fetch(`https://playcanvas.com/api/jobs/${id}`, {
    headers
  })

  const jsondata = await jobStatus.json()
  const { status } = jsondata

  if (status == 'running') {
    console.log("⏱ Waiting for job to finish...")
    await timeout(1000)
    await pollJob(id)
  } else if (status == 'complete') {
    console.log("🤝 Job finished")
    const { data: { download_url: downloadUrl } } = jsondata
    await downloadFile(downloadUrl)

  }

}

const downloadFile = async (url) => {
  console.log("⏬ Downloading zip", url)
  const res = await fetch(url, {
    headers,
  })

  const fileStream = fs.createWriteStream(ZIP_FILE);

  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });

  await unzipFolder()
  fs.unlinkSync(ZIP_FILE)
  console.log("🗑 Deleted zip")

  console.log("✅ Job finished!")
  console.log("👉 Copy SCENE_PATH, CONTEXT_OPTIONS and SCRIPTS from __settings__.js to usePlayCanvas.ts")
}


const unzipFolder = async () => {
  const __dirname = path.resolve();

  const input = __dirname + '/' + ZIP_FILE;
  const output = __dirname + '/' + FINAL_FOLDER;
  console.log("⛓ Unzipping")
  await extract(input, { dir: output })
  console.log("✅ File unzipped")
}

(async () => {
  console.log("🌿 Download job started");
  // await unzipFolder()
  const downloadJob = await fetch("https://playcanvas.com/api/apps/download", {
    headers,
    method: 'POST',
    body: JSON.stringify({
      project_id: 922940,
      scenes: [1422614],
      name: "hex-miniverse",
      branch_id: "cc0a70e6-3566-4470-bced-bd0627e07c9f"//branch Name: Destroy Other Quality Entitys
    })
  })

  const job = await downloadJob.json()
  const { id } = job

  await pollJob(id)
})()