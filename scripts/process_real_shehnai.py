import wave
import math
import struct
import subprocess
import os

input_wav = "/tmp/poorvi.wav"
output_wav = "/tmp/wedding_shehnai_trim.wav"

with wave.open(input_wav, "rb") as wf:
    n_channels = wf.getnchannels()
    sampwidth = wf.getsampwidth()
    framerate = wf.getframerate()
    n_frames = wf.getnframes()
    
    # Extract 90 seconds from 5s to 95s (where the shehnai melody is lively and vibrant)
    start_sec = 5.0
    duration_sec = 90.0
    
    start_frame = int(start_sec * framerate)
    num_frames = int(duration_sec * framerate)
    
    wf.setpos(start_frame)
    raw_bytes = wf.readframes(num_frames)

# Apply gentle fade-in (1.5s) and fade-out (2.5s) for smooth looping
samples = list(struct.unpack(f"<{num_frames * n_channels}h", raw_bytes))

fade_in_samples = int(1.5 * framerate)
fade_out_samples = int(2.5 * framerate)
total_frames = num_frames

for frame_idx in range(total_frames):
    gain = 1.0
    if frame_idx < fade_in_samples:
        gain = frame_idx / fade_in_samples
    elif frame_idx > total_frames - fade_out_samples:
        gain = (total_frames - frame_idx) / fade_out_samples
    
    for ch in range(n_channels):
        idx = frame_idx * n_channels + ch
        samples[idx] = int(max(-32768, min(32767, samples[idx] * gain)))

# Write trimmed WAV
with wave.open(output_wav, "wb") as out_wf:
    out_wf.setnchannels(n_channels)
    out_wf.setsampwidth(sampwidth)
    out_wf.setframerate(framerate)
    out_wf.writeframes(struct.pack(f"<{len(samples)}h", *samples))

print(f"Trimmed WAV written to {output_wav}, size: {os.path.getsize(output_wav)} bytes")

# Convert to m4a (AAC)
subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "128000", output_wav, "public/music.m4a"], check=True)
# Also copy full audio to public/music-full.mp3 and trimmed to public/music.mp3
subprocess.run(["cp", "/tmp/poorvi_dhun.mp3", "public/music.mp3"], check=True)
subprocess.run(["cp", "/tmp/poorvi_dhun.mp3", "public/music-full.mp3"], check=True)

print("Audio processing complete!")
