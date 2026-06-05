---
type: feat
domain: content
parent-spec: none
touched-files: [src/lib/content-ap.ts, src/lib/courses.ts]
shared-modules-touched: [src/lib/courses.ts]
trigger-tasks-touched: []
db-migration: false
rls-affecting: false
optimization-required: false
security-required: false
---

# Applied Programming — New Lectures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new lectures (ids 1, 3, 4, 5) to `src/lib/content-ap.ts`, keeping the existing lecture (id 2) unchanged, and bump the `ap` description in `src/lib/courses.ts` from "1 Lecture" to "5 Lectures".

**Architecture:** All new content is authored directly in `src/lib/content-ap.ts` as additional objects in the `lectures` array. No new files are created. The `courses.ts` change is a one-line string update. Content is synthesized from the provided lecture PDFs and live-coding files — no verbatim slide text, no PDFs committed.

**Tech Stack:** TypeScript (strict), Next.js 15 App Router, Vitest. Verify with `npm run lint && npx tsc --noEmit && npx vitest run && npm run build`.

---

## Lecture Numbering Decision

The Introduction PDF (20260415_AppliedProgramming_Introduction.pdf) is the course overview/organisation session, not a content lecture — it introduces the team, schedule, tools, and the four-pillar pipeline (Physiology / Signal Acquisition / Signal Processing / Systems Control). It maps to **id=1** as the course introduction.

The existing `content-ap.ts` lecture (Foundations in Mechanics & Biomechanics, Prof. Del Vecchio) is labelled "Lecture 1" on its title slide — it maps to **id=2** (already in the file; DO NOT touch it).

The four PDFs from the n-squared lab map as:
- `Applied_Programming_Lecture2.pdf` → id=3 — "Signals: Time, Frequency, and the Digital World" (Prof. Del Vecchio)
- `Applied_Programming_Lecture3.pdf` → id=4 — "Vectors, Matrices, and Convolutions" (Prof. Del Vecchio)
- `Applied_Programming_Lecture4.pdf` → id=5 — "The Electromyogram" (Del Vecchio, Fenzel, Ritter, Pall)

**Total after this plan: 5 lectures (ids 1–5).**

---

## File Map

| File | Change |
|------|--------|
| `src/lib/content-ap.ts` | Add 4 new lecture objects (ids 1, 3, 4, 5) to the `lectures` array |
| `src/lib/courses.ts` | Change `description: 'FAU · 1 Lecture'` → `'FAU · 5 Lectures'` |

---

## Task 1: Course Introduction (id=1)

**Source:** `~/Downloads/20260415_AppliedProgramming_Introduction.pdf` (10 pages, all visible)  
**Speaker:** `"Daniel Fenzel, Annika Ritter"` (the two PhD researchers who ran the intro session; Prof. Del Vecchio is module coordinator)

**Files:**
- Modify: `src/lib/content-ap.ts` — prepend new lecture object `{ id: 1, ... }` before the existing id=2 object

### Concepts to author (6 total)

1. **What Is Applied Programming?** — The course sits at the intersection of neuroscience, signal processing, and software engineering. Four pillars: Physiology/Signal Generation → Signal Acquisition → Signal Processing → Systems Control. The goal is to understand the full chain from muscle contraction to robot command.

2. **Meet the Research Group** — NsquaredLab at FAU AIBE (Neuromuscular Physiology and Neural Interfacing, Prof. Del Vecchio). Daniel Fenzel researches motor unit decomposition across muscles (Vastus Lateralis/Medialis split). Annika Ritter researches myocontrol (gesture decoding from wrist EMG). State-of-the-art application: ML-driven prosthetic hand control.

3. **Course Structure and Assessment** — Weekly lectures (Wednesdays 10:15–11:45, Seminarraum 1) and exercises (Fridays 12:15–13:45, Seminarraum 2, not on 01.05 and 05.06). 5 non-mandatory exercises + 1 mandatory group project (groups of 3). Oral exam 20 min: 10 min theory Q&A + 5 min project design discussion. Project counts toward exam grade.

4. **Development Environment Setup** — Tools required: GitHub account, Git, Python 3.13, IDE (PyCharm recommended or VS Code), `uv` for dependency management. Exercise repo: [https://github.com/NsquaredLab/Applied-Programming-2026](https://github.com/NsquaredLab/Applied-Programming-2026). Installing `uv`: `curl -sSf https://astral.sh/uv/install.sh | bash` on macOS/Linux.

5. **The Signal Processing Pipeline** — Four-stage view of any biomedical signal system: (1) Physiology — the biological source (motor neurons → muscle → EMG); (2) Signal Acquisition — hardware interface (electrodes, ADC boards, Arduino/DFRobot sensors); (3) Signal Processing — algorithms applied in Python/MATLAB (filtering, feature extraction, FFT); (4) Systems Control — the output (prosthetic hands, exoskeletons, rehabilitation devices).

6. **Myocontrol: Why This Matters** — Surface EMG electrodes on the forearm decode intended hand gestures in real time. MyoGestic ([https://github.com/NsquaredLab/MyoGestic](https://github.com/NsquaredLab/MyoGestic)) is the lab's open-source Python framework that handles live LSL signal ingest, recording, ML pipeline training, and prediction in one compact API. Patients with spinal cord injury (Christopher Reeve) or ALS (Stephen Hawking) could benefit from robust neural-interfacing software.

### Quiz question topics (5 questions)

1. **Pipeline ordering** — Which is the correct order of the AP course pipeline? (correct: Physiology → Signal Acquisition → Signal Processing → Systems Control; distractors scramble the order)
2. **Assessment structure** — Which component is MANDATORY for the course grade? (correct: Final Project; distractors: weekly exercises, attendance, individual homework)
3. **MyoGestic purpose** — What does MyoGestic provide? (correct: live LSL ingest, recording, ML lifecycle; wrong: it is NOT a DSP library — DSP must be brought by the user)
4. **Development tools** — Which package manager does the course use for Python dependencies? (correct: `uv`; distractors: pip, conda, poetry)
5. **Exam format** — The oral exam is 20 minutes. What are its two parts? (correct: 10 min theoretical Q&A + 5 min project design; distractors give wrong splits or wrong content)

### Flashcard topics (7 cards)

1. Four pillars of the AP course pipeline (front/back)
2. What is MyoGestic? (real-time biosignal GUI builder — repo link)
3. Applied-Programming-2026 GitHub repo — what is it for?
4. Assessment breakdown: mandatory vs optional components
5. Who are the two PhD researchers presenting the intro? (Fenzel: motor unit splitting; Ritter: myocontrol)
6. What does `uv sync` do? (installs Python dependencies from pyproject.toml using the uv package manager)
7. What does "closed-loop experiment" mean in myocontrol?

### Implementation steps

- [ ] **Step 1: Open `src/lib/content-ap.ts`** and locate the `"lectures": [` array opening.

- [ ] **Step 2: Insert the id=1 lecture object** immediately after `"lectures": [` and before the existing id=2 object. The object must match the `Lecture` type exactly: `{ id: 1, title: "...", speaker: "...", concepts: [...], questions: [...], flashcards: [...] }`. Use the concept outlines above to write a **rich body** in the same markdown-table style as the existing id=2 lecture — full paragraphs, code blocks for shell commands, inline links for both GitHub repos.

  Question IDs must be `"L1Q1"` through `"L1Q5"`. Type is `"single"` or `"multiple"`. `correct` is 0-indexed. Explanations must be in English.

  Flashcard `front`/`back` pairs must be concise but complete (see existing flashcards for length calibration).

- [ ] **Step 3: Run the type check** to confirm no TypeScript errors:

  ```bash
  cd /Users/onurtellioglu/Github/fauvault/.worktrees/feat-ap-new-lectures
  npx tsc --noEmit
  ```

  Expected: no output (no errors).

- [ ] **Step 4: Run lint**:

  ```bash
  npm run lint
  ```

  Expected: no errors.

- [ ] **Step 5: Commit**:

  ```bash
  git add src/lib/content-ap.ts
  git commit -m "feat: add AP lecture 1 — course introduction"
  ```

---

## Task 2: Signals — Time, Frequency, and the Digital World (id=3)

**Source:** `~/Downloads/Applied_Programming_Lecture2.pdf` (38 slides, read pages 1–10 above; the outline slide reveals all 5 acts)  
**Speaker:** `"Prof. Dr. Alessandro Del Vecchio"`  
**Running example throughout:** surface EMG (sEMG); tools: NumPy & SciPy

**Files:**
- Modify: `src/lib/content-ap.ts` — append lecture object `{ id: 3, ... }` after the id=2 object

### Concepts to author (7 total)

1. **Signals as Functions** — A signal is any quantity that depends on another — most often time: `y(t)`. 1D signals (time series): voltage(t), elbow angle(t), electrode signal(t). 2D signals (snapshots): image frames, electrode-grid frames. 3D signals (movies): MUAP propagation, fMRI. In NumPy: a signal is an `np.ndarray` plus a sampling rate and unit metadata. Shape of the array equals the dimensionality: 1D → shape `(T,)`, 2D → shape `(rows, cols)`, 3D → shape `(rows, cols, T)`.

2. **Deterministic vs Random Signals** — Deterministic: predictable, described by an equation (pure sinusoid, pulse train, evoked potential). Tools: closed-form formulas, exact spectrum. Random (stochastic): no equation — only statistics describe it (sEMG, EEG, thermal noise, algebraic sum of many MUAPTs). Tools: estimators (RMS, ARV) and averaged spectra (Welch). Quasi-deterministic: deterministic shape with slowly-varying parameters (ECG, MUAPT).

3. **The Sinusoid — Building Block of All Signals** — `y(t) = A · sin(2πft + φ)`. Parameters: A = amplitude, f = frequency [Hz], T = 1/f = period [s], φ = phase [rad], ω = 2πf [rad/s]. Every signal studied in this course can be written as a sum of sinusoids — this is the headline result of the Fourier series (Act 3). NumPy idiom: `t = np.linspace(0, 1, fs); y = A * np.sin(2 * np.pi * f * t + phi)`.

4. **Time-Domain Descriptors — Peak, ARV, RMS** — Peak: `np.max(np.abs(x))` — sensitive to outliers. ARV (Average Rectified Value): `np.mean(np.abs(x))` — proportional to force at low contraction levels. RMS (Root Mean Square): `np.sqrt(np.mean(x**2))` — the most robust amplitude descriptor; relates to signal power; **five lines to remember**: `np.sqrt(np.mean(x**2))`. The envelope is a slow-varying RMS computed over a sliding window.

5. **Frequency Domain — Fourier Series and FFT** — Any periodic signal decomposes into sinusoids at integer multiples of a fundamental frequency (Fourier series). The FFT (`np.fft.fft`) computes all coefficients at once. Power spectral density (PSD) describes power distribution across frequencies. Welch's method (`scipy.signal.welch`) averages multiple overlapping FFTs — preferred for stochastic signals like sEMG. Mean frequency: centre of gravity of the PSD — drops with muscle fatigue.

6. **Filtering — Low-pass, High-pass, Band-pass** — A filter selects frequency components to keep or reject. Low-pass (LP): keeps low frequencies, removes high-frequency noise (cutoff e.g. 450 Hz). High-pass (HP): removes slow drifts and motion artifacts (cutoff e.g. 20 Hz). Band-pass (BP): combination — standard EMG filter is 20–450 Hz. Implemented in SciPy: `scipy.signal.butter` + `scipy.signal.filtfilt` (zero-phase, forward+backward). **Key idiom**: `b, a = scipy.signal.butter(4, [20, 450], btype='bandpass', fs=2000); y = scipy.signal.filtfilt(b, a, x)`.

7. **Analog to Digital Conversion — Sampling and Nyquist** — A continuous analog signal must be sampled to produce a digital array. Sampling rate `fs` [Hz] = samples per second. Nyquist theorem: to reconstruct a signal of bandwidth B, you must sample at `fs ≥ 2B`. For EMG (content up to 500 Hz), standard fs = 2000 Hz (well above Nyquist). Aliasing occurs when `fs < 2B` — high-frequency components fold back into the spectrum as false low-frequency components. Quantisation: representing continuous amplitude as a finite integer (e.g. 16-bit ADC → 65536 levels); step size = voltage range / 2^bits.

### Quiz question topics (5 questions)

1. **RMS formula** — Which NumPy expression correctly computes the RMS of array `x`? (correct: `np.sqrt(np.mean(x**2))`; distractors: `np.mean(x**2)`, `np.sqrt(np.sum(x**2))`, `np.abs(np.mean(x))`)
2. **Nyquist theorem** — An EMG signal has content up to 450 Hz. What is the minimum sampling rate to avoid aliasing? (correct: 900 Hz; context note: standard practice uses 2000 Hz for margin; distractors: 450, 225, 1800)
3. **Deterministic vs random** — Which of the following is a stochastic signal? (correct: surface EMG; distractors: pure sinusoid, pulse train, evoked potential)
4. **Welch vs FFT** — Why is Welch's method preferred over a single FFT for sEMG? (correct: it averages multiple overlapping windows, reducing variance of the estimate; distractors give wrong reasons)
5. **Filter type selection** — A researcher wants to remove slow baseline drift (below 20 Hz) and powerline noise at 50 Hz from an EMG recording. Which filter sequence is correct? (correct: high-pass at 20 Hz then notch at 50 Hz; distractors swap order or use wrong filter types)

### Flashcard topics (8 cards)

1. Signal dimensionality: 1D vs 2D vs 3D — NumPy shapes
2. Deterministic vs stochastic signals — one example each and the right tool for each
3. Sinusoid parameters: A, f, T, φ, ω — formulas
4. RMS formula and why it is preferred over peak for EMG amplitude
5. What does ARV stand for and when is it used?
6. Nyquist theorem — state it and give the EMG example
7. Band-pass filter for EMG — typical frequency bounds and SciPy idiom
8. What is the Welch method and why use it for stochastic signals?

### Implementation steps

- [ ] **Step 1: Append the id=3 lecture object** to the `lectures` array in `src/lib/content-ap.ts`, after the closing `}` of the id=2 object. Question IDs: `"L3Q1"`–`"L3Q5"`. Explanations in English. Include code blocks in concept bodies using triple-backtick fences (same style as existing id=2 concepts).

- [ ] **Step 2: Run type check and lint**:

  ```bash
  npx tsc --noEmit && npm run lint
  ```

  Expected: no errors.

- [ ] **Step 3: Commit**:

  ```bash
  git add src/lib/content-ap.ts
  git commit -m "feat: add AP lecture 3 — signals, time, frequency, digital world"
  ```

---

## Task 3: Vectors, Matrices, and Convolutions (id=4)

**Source:** `~/Downloads/Applied_Programming_Lecture3.pdf` (37 slides; outline visible — five acts: Vectors, Matrices, Convolutions, Windows, Spike Control)  
**Speaker:** `"Prof. Dr. Alessandro Del Vecchio"`  
**Running theme:** "Lecture 2 turned a signal into an array. Lecture 3 turns the array into a control command."

**Files:**
- Modify: `src/lib/content-ap.ts` — append lecture object `{ id: 4, ... }` after the id=3 object

### Concepts to author (7 total)

1. **Vectors — A List of Numbers** — A vector is a 1D `np.ndarray`. Same data type appears in many contexts: a row of a CSV `(age, height, weight, BMI)`, an RGB pixel `(R, G, B)`, an LLM embedding (1536 numbers). Operations: element-wise addition `u + v`, scalar scaling `alpha * u`. NumPy: these are native; no loops needed.

2. **Dot Product and Similarity** — `u · v = Σ u[i] * v[i]`. NumPy: `np.dot(u, v)` or `u @ v` (one BLAS call, microseconds for length 10⁶). Shows up everywhere: every neuron `y = w · x + b`; search engines; recommender systems; RAG. Vector length (L2 norm): `||v|| = sqrt(Σ v[i]²)` → `np.linalg.norm(v)`. Distance between two samples: `np.linalg.norm(a - b)`. Nearest-neighbour search: `np.argmin(np.linalg.norm(X - q, axis=1))` — powers FAISS, Chroma, pgvector.

3. **Matrices — 2D Arrays** — Shape `(rows, cols)`. Three canonical examples: dataset `X.shape = (n_samples, n_features)`, greyscale image `img.shape = (height, width)`, neural-network weight layer `W.shape = (n_out, n_in)`. Indexing: `A[0]` = first row, `A[:, 0]` = first column. Matrix-vector product `A @ x` applies the linear transformation encoded in A to vector x — this is how a single neural layer computes its output.

4. **Convolution — A Kernel Sliding Over a Signal** — Convolution slides a small kernel (filter) over a signal and computes a weighted sum at each position: `(x * h)[n] = Σ x[k] · h[n-k]`. NumPy: `np.convolve(x, h)`. Application: smoothing an EMG envelope with a moving-average kernel `h = np.ones(W)/W`. Spike rasters: each motor-unit firing time is a 1 in a sparse binary vector; convolving with a Gaussian kernel produces a smooth firing-rate estimate.

5. **Windows — Shaping the Kernel** — The kernel shape determines what the convolution preserves. Common windows: Hanning `scipy.signal.windows.hann(L)`, Hamming, Gaussian. Rectangular (boxcar) has sharp edges → spectral leakage. Hanning tapers to zero at both ends → much less leakage. Rule: always window before FFT; always choose a smooth kernel for firing-rate estimation. `scipy.signal.windows.hann(L)` is one line of SciPy.

6. **Spike Trains and Motor Control** — A motor unit fires as a train of discrete spikes (impulses), not a continuous signal. Raster plot: each row is one motor unit, each vertical mark is a spike. To drive a robot smoothly, convolve the spike train with a Gaussian/Hanning kernel → continuous firing-rate estimate. This is the key bridge from neuroscience to engineering: discrete biology → continuous control signal. Five lines to remember: `a + b`, `u @ v`, `A @ x`, `np.convolve(spikes, h)`, `scipy.signal.windows.hann(L)`.

7. **Linear Algebra in AI — Why It Matters** — Every deep-learning forward pass is a sequence of matrix-vector products. A 2-layer MLP: `h = relu(W1 @ x + b1); y = W2 @ h + b2`. Image convolution in CNNs is the same `np.convolve` operation extended to 2D. Embedding lookup is a matrix row-selection. Vector databases search by `np.linalg.norm`. Understanding these primitives unlocks reading any AI paper.

### Quiz question topics (5 questions)

1. **Dot product application** — Which of the following CORRECTLY uses the dot product? Select ALL that apply. (correct: neuron output `y = w · x + b`; nearest-neighbour distance `||a − b||`; distractors include element-wise multiplication, convolution)
2. **Matrix shape for a dataset** — A dataset has 500 patients, each described by 12 features. What is `X.shape`? (correct: `(500, 12)`; distractors swap or use wrong values)
3. **Convolution for EMG envelope** — Which kernel produces a moving-average smoothing of a 1D signal? (correct: `np.ones(W)/W`; distractors: Gaussian with sigma=1, Hanning window, identity kernel)
4. **Window function purpose** — Why is a Hanning window applied before computing an FFT? (correct: it reduces spectral leakage by tapering the signal to zero at the edges; distractors give wrong reasons)
5. **Spike train to control signal** — A motor-unit spike train is a discrete binary vector. What operation converts it into a smooth continuous firing-rate signal suitable for robot control? (correct: convolution with a Gaussian or Hanning kernel; distractors: FFT, dot product, matrix multiplication)

### Flashcard topics (7 cards)

1. Dot product formula and NumPy idiom (`u @ v`)
2. L2 norm formula and use for nearest-neighbour distance
3. Matrix shape convention: `(rows, cols)` — what are rows/cols in a dataset?
4. What does `np.convolve(x, h)` compute?
5. Hanning vs rectangular window — what is spectral leakage?
6. Spike raster to firing rate — which operation bridges the gap?
7. Five lines to remember from Lecture 3

### Implementation steps

- [ ] **Step 1: Append the id=4 lecture object** to the `lectures` array after id=3. Question IDs: `"L4Q1"`–`"L4Q5"`. Include a worked-example code block in the dot-product concept body showing `np.linalg.norm(X - q, axis=1)` nearest-neighbour search (as shown in the slides). All explanations in English.

- [ ] **Step 2: Run type check and lint**:

  ```bash
  npx tsc --noEmit && npm run lint
  ```

  Expected: no errors.

- [ ] **Step 3: Commit**:

  ```bash
  git add src/lib/content-ap.ts
  git commit -m "feat: add AP lecture 4 — vectors, matrices, convolutions"
  ```

---

## Task 4: The Electromyogram — Interfacing the Neuromuscular System (id=5)

**Source:** `~/Downloads/Applied_Programming_Lecture4.pdf` (many slides; 10 visible — motor neuron recap + EMG fundamentals)
**Speaker:** `"Prof. Dr. Alessandro Del Vecchio, Daniel Fenzel, Annika Ritter, Atharva Pall"`
**Date shown on slides:** 20 Mai 2026
**Code source files:** `~/Downloads/live_coding.m`, `~/Downloads/emg_handshake.py`, `~/Downloads/emg_filtering_demo.m`

This lecture synthesizes everything: neuromuscular physiology + EMG hardware + signal processing pipeline + live coding. It is the most content-rich lecture and must include code walkthrough concepts drawn from the three code files.

**Files:**
- Modify: `src/lib/content-ap.ts` — append lecture object `{ id: 5, ... }` after the id=4 object

### Concepts to author (8 total)

1. **The Motor Unit — Neural Command to Muscle** — A motor unit = one alpha motor neuron + all the muscle fibres it innervates (via neuromuscular junctions). The motor neuron axon branches; each branch forms one neuromuscular junction with one muscle fibre. The spinal cord pools inputs from descending corticospinal pathways, proprioceptive feedback (spindle group Ia/Ib), and Renshaw cell inhibition to set the alpha motor neuron's firing rate. Disease breaks this pathway: ALS destroys motor neurons; spinal cord injury severs the descending drive — hence the importance of neural interfacing.

2. **Motor Unit Recruitment and Rate Coding** — Two mechanisms grade muscle force: (1) Recruitment — activate more motor units as force demand rises; each unit has a recruitment threshold. (2) Rate coding — increase the discharge rate of already-active units (pps, pulses per second). At 35% MVC ankle dorsiflexors show ~20–25 active motor units firing at 10–30 pps. The cumulative spike count (smoothed) tracks the force profile.

3. **Historical Foundations of EMG** — Emil du Bois-Reymond (1818–1896) first demonstrated electrical currents in nerves and muscle using a galvanometer-based multiplicator. Modern surface EMG uses differential amplifiers to record the voltage difference between two electrodes. Differential recording rejects common-mode noise (powerline interference appears equally at both electrodes and cancels out).

4. **EMG Signal Generation — Action Potentials and Current Fields** — When a motor neuron fires, an action potential propagates along each innervated muscle fibre from the innervation zone toward the terminal zones (conduction velocity ≈ 3–5 m/s). The depolarisation zone creates extracellular current sources and sinks. Electrodes on the skin surface detect this field as a voltage waveform — the Motor Unit Action Potential (MUAP). Raw EMG is the algebraic summation of all MUAPs from all active motor units firing asynchronously.

5. **Live Code Walkthrough — EMG Handshake (MATLAB and Python)** — The `live_coding.m` / `emg_handshake.py` scripts load a 32-channel EMG recording, apply the conversion factor, and plot all channels offset by channel index.

   MATLAB:
   ```matlab
   load('Default_Recording_20260527_103637311222_rest_handshake_slow_to_high.mat')
   conversion_factor = 0.0002861;  % ADC units -> mV
   emg = emg(1:32, :) * conversion_factor;
   fs = 2000;
   t = (0:size(emg,2)-1) / fs;
   figure, hold on
   dist = 1;
   for channels = 1:size(emg,1)
       plot(t, emg(channels,:) + dist)
       dist = dist + 1;
   end
   xlabel('Time (ms)'); ylabel('EMG (mV)')
   ```

   Python equivalent (`emg_handshake.py`):
   ```python
   from scipy.io import loadmat
   import numpy as np, matplotlib.pyplot as plt
   data = loadmat("Default_Recording_...mat")
   emg = data["emg"][:32, :] * 0.0002861   # shape (32, T)
   fs = 2000
   t = np.arange(emg.shape[1]) / fs
   for ch in range(emg.shape[0]):
       plt.plot(t, emg[ch, :] + ch + 1)
   plt.xlabel("Time (ms)"); plt.ylabel("EMG (mV)"); plt.show()
   ```

   Key facts: conversion factor 0.0002861 maps raw ADC integers to mV; fs=2000 Hz; 32 channels recorded simultaneously.

6. **EMG Envelope — Rectification and Smoothing** — To extract the amplitude envelope: (1) Full-wave rectify: `EMG_rect = abs(EMG)`. (2) Smooth using a moving-average window (window ≈ 500–1000 samples at fs=2000 Hz = 250–500 ms). This is exactly the convolution-with-kernel operation from Lecture 3 applied to a biological signal.

   MATLAB: `plot(smooth(EMG_rect, 1000))`

   Python:
   ```python
   EMG_rect = np.abs(emg[0, :])
   window = 1000
   smoothed = np.convolve(EMG_rect, np.ones(window) / window, mode="same")
   plt.plot(smoothed); plt.show()
   ```

7. **EMG Filtering Pipeline — From Raw to Clean Signal** — Standard pipeline (from `emg_filtering_demo.m`): (1) High-pass at 20 Hz — removes slow motion artifact drift. (2) Low-pass at 450 Hz — removes high-frequency noise. Combined as band-pass 20–450 Hz. (3) Notch at 50 Hz (European powerline frequency) — removes powerline interference. Always use `filtfilt` (zero-phase, forward + backward pass) to avoid phase distortion.

   Python:
   ```python
   from scipy.signal import butter, filtfilt, iirnotch
   sos_bp, g = butter(4, [20, 450], btype='bandpass', fs=2000, output='sos')
   emg_bp = filtfilt(sos_bp, g, emg)
   wo = 50 / (2000 / 2)
   b_n, a_n = iirnotch(wo, Q=30)
   emg_clean = filtfilt(b_n, a_n, emg_bp)
   ```

8. **MyoGestic and the Applied Programming Ecosystem** — [MyoGestic](https://github.com/NsquaredLab/MyoGestic) is the n-squared lab's open-source Python framework for real-time biosignal experiments. It provides: live LSL signal ingest, on-disk recording (Zarr), ML pipeline lifecycle (train/predict on separate threads), Dear ImGui widgets. It does NOT provide DSP or ML models — the user brings SciPy, scikit-learn, PyTorch. The course exercises use a simplified version of this stack. Try the in-browser playground (no install): [https://nsquaredlab.github.io/MyoGestic/playground/](https://nsquaredlab.github.io/MyoGestic/playground/). Exercise repo: [https://github.com/NsquaredLab/Applied-Programming-2026](https://github.com/NsquaredLab/Applied-Programming-2026).

### Quiz question topics (6 questions)

1. **Motor unit definition** — Which statement correctly defines a motor unit? (correct: one alpha motor neuron + all muscle fibres it innervates; distractors: a group of motor neurons, a single muscle fibre, a synapse)
2. **EMG signal origin** — EMG signals arise from: (correct: extracellular current fields generated by action potentials propagating along muscle fibres; distractors: nerve firing alone, brain signals, electrode movement)
3. **Conversion factor purpose** — In the live-coding demo, what does `* 0.0002861` do? (correct: converts raw ADC integer values to millivolts; distractors: normalises to [0,1], applies a filter, scales to Newtons)
4. **Why `filtfilt` over `lfilter`?** (correct: `filtfilt` applies the filter forward and backward, producing zero phase shift; `lfilter` introduces phase delay that distorts timing relationships in the signal)
5. **Notch filter target** — In Europe, a notch filter targets 50 Hz. Why? (correct: European powerline frequency is 50 Hz; this noise electromagnetically couples into electrode cables; distractors: 60 Hz, 100 Hz, wrong reason)
6. **Force modulation mechanisms** — Select ALL mechanisms the nervous system uses to grade muscle force. (correct: motor unit recruitment AND rate coding; distractors: muscle length change, fibre type switching, electrode impedance)

### Flashcard topics (8 cards)

1. Motor unit definition — one neuron + all the fibres it innervates
2. Two mechanisms of force grading: recruitment vs rate coding
3. MUAP: what is it and how does raw EMG relate to it?
4. EMG conversion factor 0.0002861 — what does it convert?
5. Standard EMG filter pipeline: band-pass 20–450 Hz + notch 50 Hz
6. `filtfilt` vs `lfilter` — which to use and why
7. What does MyoGestic provide vs what must the user bring?
8. EMG envelope: two steps — rectify then smooth (convolve with boxcar)

### Implementation steps

- [ ] **Step 1: Append the id=5 lecture object** to the `lectures` array after id=4. Question IDs: `"L5Q1"`–`"L5Q6"`. Include MATLAB and Python code snippets in triple-backtick fenced blocks with language identifiers (`matlab`, `python`). All text in English. Speaker: `"Prof. Dr. Alessandro Del Vecchio, Daniel Fenzel, Annika Ritter, Atharva Pall"`. Repo URLs must appear as markdown hyperlinks in the concept body.

- [ ] **Step 2: Run type check and lint**:

  ```bash
  npx tsc --noEmit && npm run lint
  ```

  Expected: no errors.

- [ ] **Step 3: Commit**:

  ```bash
  git add src/lib/content-ap.ts
  git commit -m "feat: add AP lecture 5 — the electromyogram and neuromuscular interfacing"
  ```

---

## Task 5: Update Course Description and Verify Build

**Files:**
- Modify: `src/lib/courses.ts` — one-line change to `ap.description`

### Implementation steps

- [ ] **Step 1: Edit `src/lib/courses.ts`**. Find the line inside the `ap` object:

  ```ts
  description: 'FAU · 1 Lecture',
  ```

  Change to:

  ```ts
  description: 'FAU · 5 Lectures',
  ```

- [ ] **Step 2: Run full verification**:

  ```bash
  cd /Users/onurtellioglu/Github/fauvault/.worktrees/feat-ap-new-lectures
  npm run lint && npx tsc --noEmit && npx vitest run && npm run build
  ```

  Expected:
  - `npm run lint` — no lint errors
  - `npx tsc --noEmit` — no output (no type errors)
  - `npx vitest run` — all tests pass
  - `npm run build` — successful Next.js build

  If Vitest fails, verify that: all question IDs (`L1Q1`–`L5Q6`) are unique across the full file; all `correct` arrays contain only 0-based indices into their respective `options` arrays; no trailing commas break JSON-like structure.

- [ ] **Step 3: Commit**:

  ```bash
  git add src/lib/courses.ts
  git commit -m "chore: bump AP course description to 5 Lectures"
  ```

---

## Content Policy Reminders (for the implementer)

- **English only** — ALL text in `body`, `explanation`, `front`, `back` must be in English. The existing id=2 lecture is the model.
- **No verbatim slide text** — synthesize and paraphrase; do not copy slide bullets word-for-word.
- **No PDFs or `.mat` files committed** — referenced conceptually only.
- **Repo is public** — do not include unpublished research data or personal student data.
- **Explanations must be substantive** — minimum 3 sentences explaining why the correct answer is right AND why each distractor is wrong (calibrate against existing id=2 explanations).
- **Concept bodies must be rich** — use markdown tables, code blocks, bold/italic. Target 150–350 words per body. Match the density of the existing id=2 concepts.
