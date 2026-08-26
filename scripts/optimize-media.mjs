import { access, mkdir, rename } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const root = process.cwd();
const publicDir = join(root, "public");
const backupDir = join(root, "unused-assets-review", "original-active-media");

const images = [
  ["studio/about-hero.png", 2200],
  ["spotlight/bondurevanFactoryBG.png", 2200],
  ["spotlight/services3AAC.png", 1920],
  ["how-we-work/process-4.png", 1920],
  ["spotlight/technicalteamservices.png", 1920],
  ["spotlight/vanServices.png", 1920],
  ["spotlight/tile-installation.png", 1600],
  ["spotlight/02.png", 1920],
  ["spotlight/spotlight-img-10.png", 1920],
  ["spotlight/spotlight-img-2.png", 1920],
  ["spotlight/services2floor.png", 1920],
  ["how-we-work/process-3.png", 1920],
  ["home-media/adhesive-testing.png", 1600],
  ["home-media/adhesive-work-1.png", 1600],
  ["home-media/adhesive-work-2.png", 1600],
  ["home-media/adhesive-work-3.png", 1600],
  ["home-media/adhesive-work-4.png", 1600],
  ["home-media/adhesive-work-5.png", 1600],
  ["home-media/adhesive-work-6.png", 1600],
  ["home-media/adhesive-work-7.png", 1600],
  ["home-media/adhesive-work-8.png", 1600],
  ["home-media/material-inspection.png", 1600],
  ["home-media/site-testing.png", 1600],
  ["home-media/lab-formulation.png", 1600],
  ["about-story/site-testing.png", 1600],
  ["about-story/foundation-research.png", 1600],
  ["media/Servicesreviewsite.png", 1600],
  ["media/tilecleaner.png", 1000],
  ["media/tilefloorproduct.png", 1000],
  ["media/tileproduct.png", 1000],
  ["rd-intro/img1.jpg", 1600],
  ["rd-intro/img2.jpg", 1600],
  ["rd-intro/img3.jpg", 1600],
  ["products/bondure-base-b555-bag.png", 1024],
  ["products/bondure-base-b565-bag.png", 1024],
  ["products/bondure-base-b585-bag.png", 1024],
];

const videos = [
  ["services/mobile-technical-unit.mp4", 1600],
  ["home-media/mixingvideo.mp4", 1920],
  ["home-media/magnific_high-quality-video-genera_1lUDE0Rr4r.mp4", 960],
  ["home-media/AACBLOCKDEMO.mp4", 1920],
  ["home-media/planogel-video-background-cropped (1).mp4", 960],
  ["home-media/h40-video-background-cropped.mp4", 960],
];

async function preserveOriginal(relativePath) {
  const source = join(publicDir, relativePath);
  const backup = join(backupDir, relativePath);
  await mkdir(dirname(backup), { recursive: true });
  try {
    await access(backup);
  } catch {
    await rename(source, backup);
  }
  return { source, backup };
}

async function optimizeImage([relativePath, maxWidth]) {
  const { source, backup } = await preserveOriginal(relativePath);
  const output = source.slice(0, -extname(source).length) + ".webp";
  await sharp(backup)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(output);
  console.log(`${relativePath} -> ${relative(publicDir, output)}`);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath, args, { stdio: "inherit" });
    process.on("error", reject);
    process.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)));
  });
}

async function optimizeVideo([relativePath, maxWidth]) {
  const { source, backup } = await preserveOriginal(relativePath);
  const temporary = `${source}.optimized.mp4`;
  await runFfmpeg([
    "-y",
    "-i", backup,
    "-map", "0:v:0",
    "-an",
    "-vf", `scale='min(${maxWidth},iw)':-2`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "25",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    temporary,
  ]);
  await rename(temporary, source);
  console.log(`${relativePath} re-encoded`);
}

for (const image of images) await optimizeImage(image);
for (const video of videos) await optimizeVideo(video);
