import math
import struct
import subprocess
import os

# Parameters
SAMPLE_RATE = 44100
DURATION = 42.0  # seconds
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)

# Notes frequencies (C4 as base Sa = 261.63 Hz)
Sa = 261.63
Re = 293.66
Ga = 329.63
Ma = 349.23
Pa = 392.00
Dha = 440.00
Ni = 493.88
Sa_high = 523.25
Re_high = 587.33
Ga_high = 659.25

# Shehnai Timbre: Rich double-reed harmonics
def shehnai_sample(t, freq, vibrato_depth=0.015, vibrato_rate=5.5):
    if freq <= 0:
        return 0.0
    # Add natural vibrato
    vib = 1.0 + vibrato_depth * math.sin(2 * math.pi * vibrato_rate * t)
    f = freq * vib
    phase = 2 * math.pi * f * t
    
    # Harmonics profile of double-reed instrument (shehnai)
    s = (
        0.50 * math.sin(phase) +
        0.35 * math.sin(2 * phase) +
        0.28 * math.sin(3 * phase) +
        0.22 * math.sin(4 * phase) +
        0.18 * math.sin(5 * phase) +
        0.12 * math.sin(6 * phase) +
        0.08 * math.sin(7 * phase)
    )
    # Slight reed saturation
    return math.tanh(s * 1.4) * 0.7

# Tanpura drone
def tanpura_drone(t):
    # C3 (130.81), G3 (196), C4 (261.63)
    f1 = 130.81
    f2 = 196.00
    f3 = 261.63
    
    # Slow pulsing volume envelopes for 4 strings
    p1 = (math.sin(2 * math.pi * 0.25 * t) + 1) * 0.5
    p2 = (math.sin(2 * math.pi * 0.25 * t + 1.5) + 1) * 0.5
    p3 = (math.sin(2 * math.pi * 0.25 * t + 3.0) + 1) * 0.5
    
    s = (
        p1 * (math.sin(2 * math.pi * f1 * t) + 0.4 * math.sin(4 * math.pi * f1 * t)) +
        p2 * (math.sin(2 * math.pi * f2 * t) + 0.3 * math.sin(4 * math.pi * f2 * t)) +
        p3 * (math.sin(2 * math.pi * f3 * t) + 0.3 * math.sin(4 * math.pi * f3 * t))
    )
    return s * 0.12

# Wedding Shehnai melody score: [(frequency, start_time, duration)]
melody_notes = [
    # Opening sacred Alaap
    (Sa, 0.5, 2.5),
    (Re, 3.2, 1.8),
    (Ga, 5.2, 2.0),
    (Ma, 7.4, 1.5),
    (Pa, 9.1, 3.0),
    # Rhythmic Wedding Dhun (Theme 1)
    (Pa, 12.5, 0.8),
    (Dha, 13.4, 0.8),
    (Pa, 14.3, 0.8),
    (Ma, 15.2, 0.8),
    (Ga, 16.1, 1.2),
    (Re, 17.4, 0.8),
    (Sa, 18.3, 2.2),
    # Rising celebration (Theme 2)
    (Ga, 21.0, 0.9),
    (Ma, 22.0, 0.9),
    (Pa, 23.0, 1.4),
    (Dha, 24.6, 0.9),
    (Ni, 25.6, 0.9),
    (Sa_high, 26.6, 2.5),
    # High flourish
    (Re_high, 29.3, 0.8),
    (Sa_high, 30.2, 0.8),
    (Ni, 31.1, 0.8),
    (Dha, 32.0, 0.8),
    (Pa, 32.9, 1.8),
    # Resolution / Mangal Aarti ending
    (Ma, 35.0, 0.9),
    (Ga, 36.0, 0.9),
    (Re, 37.0, 1.2),
    (Sa, 38.4, 3.2),
]

# Generate audio samples
audio_left = [0.0] * NUM_SAMPLES
audio_right = [0.0] * NUM_SAMPLES

# 1. Add Tanpura drone
for i in range(NUM_SAMPLES):
    t = i / SAMPLE_RATE
    drone = tanpura_drone(t)
    audio_left[i] += drone * 0.9
    audio_right[i] += drone * 1.1

# 2. Add Shehnai melody with smooth attack/decay envelope
for freq, start, dur in melody_notes:
    start_sample = int(start * SAMPLE_RATE)
    dur_samples = int(dur * SAMPLE_RATE)
    end_sample = min(NUM_SAMPLES, start_sample + dur_samples)
    
    for i in range(start_sample, end_sample):
        t = (i - start_sample) / SAMPLE_RATE
        # Envelope: Attack 0.12s, Release 0.20s
        attack = min(1.0, t / 0.12)
        release = min(1.0, (dur - t) / 0.20) if t > dur - 0.20 else 1.0
        env = attack * release
        
        # Shehnai sound
        sh = shehnai_sample(t, freq) * env * 0.45
        
        # Soft stereo panning
        audio_left[i] += sh * 0.95
        audio_right[i] += sh * 1.05

# 3. Add auspicious temple chime/bell on downbeats
bell_times = [0.5, 4.0, 8.0, 12.5, 16.5, 21.0, 26.6, 31.0, 35.0, 38.4]
bell_freq = 1174.66 # D6 bell chime
for b_time in bell_times:
    b_start = int(b_time * SAMPLE_RATE)
    b_len = int(1.8 * SAMPLE_RATE)
    for j in range(b_len):
        idx = b_start + j
        if idx >= NUM_SAMPLES:
            break
        bt = j / SAMPLE_RATE
        # Bell exponential decay
        bell_env = math.exp(-3.5 * bt)
        bell = (math.sin(2 * math.pi * bell_freq * bt) + 0.4 * math.sin(2 * math.pi * (bell_freq * 2.76) * bt)) * bell_env * 0.12
        audio_left[idx] += bell * 1.1
        audio_right[idx] += bell * 0.9

# Normalize audio to prevent clipping
max_amp = max(max(abs(x) for x in audio_left), max(abs(y) for y in audio_right))
if max_amp > 0:
    gain = 0.88 / max_amp
    audio_left = [x * gain for x in audio_left]
    audio_right = [y * gain for y in audio_right]

# Write WAV file
wav_path = "/tmp/wedding_shehnai.wav"
with open(wav_path, "wb") as f:
    num_channels = 2
    sample_width = 2 # 16-bit
    byte_rate = SAMPLE_RATE * num_channels * sample_width
    block_align = num_channels * sample_width
    data_size = NUM_SAMPLES * num_channels * sample_width
    
    # RIFF header
    f.write(b"RIFF")
    f.write(struct.pack("<I", 36 + data_size))
    f.write(b"WAVE")
    
    # fmt chunk
    f.write(b"fmt ")
    f.write(struct.pack("<I", 16)) # Subchunk1Size
    f.write(struct.pack("<H", 1))  # AudioFormat (PCM)
    f.write(struct.pack("<H", num_channels))
    f.write(struct.pack("<I", SAMPLE_RATE))
    f.write(struct.pack("<I", byte_rate))
    f.write(struct.pack("<H", block_align))
    f.write(struct.pack("<H", 16)) # BitsPerSample
    
    # data chunk
    f.write(b"data")
    f.write(struct.pack("<I", data_size))
    
    # Samples
    for l, r in zip(audio_left, audio_right):
        il = int(max(-32768, min(32767, l * 32767)))
        ir = int(max(-32768, min(32767, r * 32767)))
        f.write(struct.pack("<hh", il, ir))

print(f"Generated WAV at {wav_path}, size: {os.path.getsize(wav_path)} bytes")

# Convert to MP3 using afconvert
mp3_out = "public/music.mp3"
os.makedirs("public", exist_ok=True)
cmd = ["afconvert", "-f", "MPG3", "-d", ".mp3", wav_path, mp3_out]
subprocess.run(cmd, check=True)
print(f"Successfully created MP3 at {mp3_out}, size: {os.path.getsize(mp3_out)} bytes")
