/**
 * Generates a 60-second placeholder soundtrack (WAV) for development/render.
 * Replace with Suno-generated MP3 per music/music-prompt.md for final polish.
 *
 * Run: node scripts/generate-soundtrack.js
 */
const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const DURATION_SEC = 60;
const NUM_SAMPLES = SAMPLE_RATE * DURATION_SEC;

const notes = [
  { freq: 261.63, start: 0, end: 15, vol: 0.08 }, // C4 piano-like
  { freq: 329.63, start: 10, end: 25, vol: 0.06 }, // E4
  { freq: 392.0, start: 20, end: 40, vol: 0.07 }, // G4 synth pad feel
  { freq: 440.0, start: 35, end: 55, vol: 0.06 }, // A4 momentum
  { freq: 523.25, start: 50, end: 60, vol: 0.05 }, // C5 resolve
];

const samples = new Float32Array(NUM_SAMPLES);

for (let i = 0; i < NUM_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  let sample = 0;

  for (const note of notes) {
    if (t >= note.start && t < note.end) {
      const env = Math.min(1, (t - note.start) / 0.5) * Math.min(1, (note.end - t) / 0.8);
      sample += Math.sin(2 * Math.PI * note.freq * t) * note.vol * env;
      sample += Math.sin(2 * Math.PI * note.freq * 2 * t) * note.vol * 0.15 * env;
    }
  }

  samples[i] = Math.max(-1, Math.min(1, sample));
}

function writeWav(filePath, floatSamples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (SAMPLE_RATE * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = floatSamples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < floatSamples.length; i++) {
    const s = Math.max(-1, Math.min(1, floatSamples[i]));
    buffer.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);
  console.log(`Wrote ${filePath} (${DURATION_SEC}s, ${SAMPLE_RATE}Hz)`);
}

const outDir = path.join(__dirname, "..", "public", "music");
writeWav(path.join(outDir, "soundtrack.wav"), samples);

// Also copy reference for mp3 path — Remotion will use wav
writeWav(path.join(outDir, "soundtrack.mp3.wav"), samples);
console.log("Note: Using soundtrack.wav in composition. Add Suno MP3 to public/music/soundtrack.mp3 when ready.");
