// AP — Applied Programming content
// FAU Summer 2026 · Prof. Dr. Alessandro Del Vecchio
import type { Content } from './types'

export const content: Content = {
  "lectures": [
    {
      "id": 1,
      "title": "Course Introduction — Applied Programming at FAU",
      "speaker": "Daniel Fenzel, Annika Ritter",
      "concepts": [
        {
          "heading": "What Is Applied Programming?",
          "body": "Applied Programming sits at the intersection of **neuroscience**, **signal processing**, and **software engineering**. The course follows a four-pillar pipeline that mirrors any real biomedical system:\n\n| Pillar | What happens | Typical tools |\n|--------|-------------|---------------|\n| **Physiology / Signal Generation** | Biological source — motor neurons fire, muscles contract, EMG is generated | Anatomy, neurophysiology |\n| **Signal Acquisition** | Hardware interface — electrodes, ADC boards, Arduino / DFRobot sensors capture the signal | Electronics, microcontrollers |\n| **Signal Processing** | Algorithms applied in software — filtering, feature extraction, FFT, ML | Python (NumPy, SciPy), MATLAB |\n| **Systems Control** | Output — prosthetic hands, exoskeletons, rehabilitation devices respond | Robotics, closed-loop control |\n\nThe goal is to understand the **full chain** from muscle contraction to robot command — not just one stage in isolation. Every lecture maps to one or more of these four pillars."
        },
        {
          "heading": "Meet the Research Group — NsquaredLab",
          "body": "The course is delivered by [NsquaredLab](https://github.com/NsquaredLab) at FAU AIBE (Institute for Artificial Intelligence in Biomedical Engineering). The research group specialises in **Neuromuscular Physiology and Neural Interfacing** under the direction of Prof. Dr. Alessandro Del Vecchio.\n\n**PhD researchers presenting the introductory session:**\n\n- **Daniel Fenzel** — researches *motor unit decomposition across muscles*. His work focuses on the Vastus Lateralis / Vastus Medialis muscle split during leg extension, tracking which motor units are shared and which are unique to each muscle.\n- **Annika Ritter** — researches *myocontrol* (gesture decoding from wrist EMG). She develops machine-learning pipelines that decode intended hand movements from surface electrodes placed on the forearm.\n\n**State-of-the-art application:** The lab's flagship demo is ML-driven prosthetic hand control — a user with upper-limb amputation can intuitively open/close a robotic hand by contracting their forearm muscles. The same technology is relevant for patients with ALS (like Stephen Hawking) or spinal cord injury (like Christopher Reeve), where restoring voluntary movement via neural interfacing can transform quality of life."
        },
        {
          "heading": "Course Structure and Assessment",
          "body": "**Schedule:**\n- **Lectures:** Wednesdays 10:15–11:45, Seminarraum 1\n- **Exercises:** Fridays 12:15–13:45, Seminarraum 2 (no exercise on 01.05 and 05.06)\n\n**Course components:**\n\n| Component | Count | Mandatory? |\n|-----------|-------|------------|\n| Weekly exercises | 5 | ❌ Non-mandatory |\n| Group project | 1 (groups of 3) | ✅ **Mandatory** |\n| Oral exam | 1 | ✅ **Mandatory** |\n\n**Oral exam format (20 minutes total):**\n1. **10 minutes** — theoretical Q&A (any topic from lectures)\n2. **5 minutes** — project design discussion (explain your group's approach, defend design choices)\n\nThe group project contributes to the exam grade — it is not just pass/fail. Students who skip the project cannot earn a full grade. Exercises are strongly encouraged as preparation but attendance is not recorded."
        },
        {
          "heading": "Development Environment Setup",
          "body": "The course uses an entirely **open-source, reproducible Python stack**. Set up once at the start and every exercise works without further configuration.\n\n**Required tools:**\n\n| Tool | Purpose | Install |\n|------|---------|--------|\n| Git | Version control | Pre-installed on macOS/Linux; `winget install git` on Windows |\n| GitHub account | Access to the exercise repo | Free at github.com |\n| Python 3.13 | Course language | python.org |\n| `uv` | Dependency manager (fast, modern pip replacement) | `curl -sSf https://astral.sh/uv/install.sh \\| bash` |\n| IDE | Code editing | PyCharm (recommended) or VS Code |\n\n**Exercise repository:** [https://github.com/NsquaredLab/Applied-Programming-2026](https://github.com/NsquaredLab/Applied-Programming-2026)\n\nAfter cloning, run:\n```bash\nuv sync\n```\nThis reads `pyproject.toml`, resolves all dependencies, and installs them into an isolated virtual environment automatically — no `pip install`, no conda environment, no manual venv activation needed."
        },
        {
          "heading": "The Signal Processing Pipeline in Detail",
          "body": "Every biomedical signal system can be decomposed into the same four-stage view. Understanding where you are in the pipeline determines which tools and concepts apply.\n\n```\n[BIOLOGY] ──→ [ACQUISITION] ──→ [PROCESSING] ──→ [CONTROL]\n   EMG             ADC             Filtering        Prosthetic\n   EEG           Electrodes           FFT           Exoskeleton\nNeural spike      Arduino          ML model        Rehabilitation\n```\n\n**Stage 1 — Physiology:** The biological source generates a signal. For this course: alpha motor neurons fire, action potentials propagate along muscle fibres, creating the extracellular field we call EMG.\n\n**Stage 2 — Signal Acquisition:** Hardware captures the analog signal and digitises it. Electrodes detect surface potentials; an ADC (Analog-to-Digital Converter) samples the continuous voltage at discrete time points (e.g., 2000 samples per second).\n\n**Stage 3 — Signal Processing:** Python or MATLAB algorithms transform the raw digital array into useful features: band-pass filtering (20–450 Hz for EMG), FFT for frequency analysis, RMS for amplitude, ML classifiers for gesture recognition.\n\n**Stage 4 — Systems Control:** The output stage — a decoded command drives a robotic actuator, adjusts exoskeleton assistance level, or triggers a neurostimulator."
        },
        {
          "heading": "Myocontrol and Why This Course Matters",
          "body": "**Surface EMG for gesture decoding:** Placing electrodes on the forearm picks up the combined electrical activity of dozens of motor units. A trained ML classifier can decode the *intended* gesture from this pattern — even before the hand moves (or when the hand is absent, as in amputation).\n\n**[MyoGestic](https://github.com/NsquaredLab/MyoGestic)** is the n-squared lab's open-source Python framework built for exactly this purpose. It provides:\n- **Live LSL signal ingest** — reads streaming biosignals from any Lab Streaming Layer source\n- **On-disk recording** — saves sessions in Zarr format for offline analysis\n- **ML lifecycle management** — training and prediction run on separate threads so the UI stays responsive\n- **Dear ImGui widgets** — lightweight, immediate-mode GUI for real-time visualisation\n\n> MyoGestic does *not* provide DSP algorithms or ML models — the user brings their own SciPy filters and scikit-learn / PyTorch models. This modularity is by design.\n\n**Why it matters beyond prosthetics:** The same pipeline — acquire a biosignal, process it, decode intent, drive an actuator — appears in brain-computer interfaces, rehabilitation robotics, gaming peripherals, and human-robot collaboration. Mastering the full stack in this course gives you the vocabulary to work in any of these fields."
        }
      ],
      "questions": [
        {
          "id": "L1Q1",
          "text": "Which sequence correctly represents the four-pillar pipeline of the Applied Programming course?",
          "options": [
            "Signal Processing → Signal Acquisition → Physiology → Systems Control",
            "Physiology → Signal Acquisition → Signal Processing → Systems Control",
            "Signal Acquisition → Physiology → Systems Control → Signal Processing",
            "Systems Control → Signal Processing → Signal Acquisition → Physiology"
          ],
          "correct": [1],
          "explanation": "The pipeline flows from biology to technology: (1) Physiology/Signal Generation — the biological source (motor neurons, muscles) produces the signal; (2) Signal Acquisition — hardware (electrodes, ADC) captures and digitises it; (3) Signal Processing — algorithms (filtering, FFT, ML) extract meaning; (4) Systems Control — the decoded command drives an actuator (prosthetic hand, exoskeleton). Option A starts with processing, which is impossible before acquisition. Option C reverses physiology and acquisition. Option D runs the pipeline backwards.",
          "type": "single"
        },
        {
          "id": "L1Q2",
          "text": "Which component of the Applied Programming course is MANDATORY and contributes to the exam grade?",
          "options": [
            "Weekly exercise attendance",
            "Individual homework submissions",
            "The group project",
            "Lecture attendance"
          ],
          "correct": [2],
          "explanation": "The group project (groups of 3 students) is the only non-exam component that is explicitly mandatory and directly influences the exam grade — the project design is discussed in the 5-minute project segment of the oral exam. The five weekly exercises are non-mandatory, there are no individual homework submissions, and lecture attendance is not recorded. Students who skip the project cannot receive a complete grade.",
          "type": "single"
        },
        {
          "id": "L1Q3",
          "text": "What does MyoGestic provide out of the box? Select ALL that apply.",
          "options": [
            "Live LSL biosignal ingest and on-disk recording",
            "A built-in DSP filter library (bandpass, notch, Welch)",
            "ML pipeline lifecycle — training and prediction on separate threads",
            "Pre-trained gesture recognition models"
          ],
          "correct": [0, 2],
          "explanation": "MyoGestic provides the infrastructure for a real-time biosignal experiment: live LSL ingest (reads streaming data from any Lab Streaming Layer source) and on-disk recording (Zarr format), plus ML lifecycle management (training and prediction threads run concurrently so the GUI stays responsive). It deliberately does NOT provide DSP algorithms — the user brings SciPy filters — and it does NOT include pre-trained models — the user trains their own with scikit-learn or PyTorch. This modularity lets researchers plug in any algorithm without modifying the framework.",
          "type": "multiple"
        },
        {
          "id": "L1Q4",
          "text": "Which Python package manager does the Applied Programming 2026 course use for dependency management?",
          "options": [
            "pip",
            "conda",
            "poetry",
            "uv"
          ],
          "correct": [3],
          "explanation": "The course uses `uv`, a modern, fast Python package manager written in Rust. After cloning the exercise repo, `uv sync` reads `pyproject.toml`, resolves all dependencies, and creates an isolated virtual environment automatically. `pip` is the traditional package manager but lacks automatic virtual-environment management and is slower. `conda` is a separate ecosystem with its own environment format. `poetry` is a popular alternative, but the course tooling is standardised on `uv`.",
          "type": "single"
        },
        {
          "id": "L1Q5",
          "text": "The oral exam in Applied Programming is 20 minutes long. What are its two segments?",
          "options": [
            "10 min written test + 10 min oral defence",
            "15 min theoretical Q&A + 5 min project design discussion",
            "10 min theoretical Q&A + 5 min project design discussion",
            "10 min exercise review + 10 min theoretical Q&A"
          ],
          "correct": [2],
          "explanation": "The 20-minute oral exam is split into two distinct parts: (1) 10 minutes of theoretical Q&A covering any topic from the lectures, and (2) 5 minutes of project design discussion where the student explains their group project approach and defends design choices. Option B has the correct content but wrong time allocation (15+5=20 but the theory portion is 10 min, not 15). Option A introduces a 'written test' which does not exist. Option D describes exercises, which are not part of the exam format.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What are the four pillars of the Applied Programming course pipeline?",
          "back": "1. Physiology / Signal Generation — biological source (motor neurons, muscles, EMG)\n2. Signal Acquisition — hardware (electrodes, ADC, Arduino)\n3. Signal Processing — algorithms (Python/MATLAB: filtering, FFT, ML)\n4. Systems Control — output (prosthetic hands, exoskeletons, rehabilitation devices)"
        },
        {
          "front": "What is MyoGestic?",
          "back": "An open-source Python framework by NsquaredLab for real-time biosignal experiments. Provides: live LSL ingest, Zarr recording, ML lifecycle management (train/predict threads), Dear ImGui visualisation. Does NOT provide DSP or ML models — user brings their own. Repo: https://github.com/NsquaredLab/MyoGestic"
        },
        {
          "front": "What is the Applied-Programming-2026 GitHub repo used for?",
          "back": "The official exercise repository for the FAU Applied Programming course (Summer 2026). Contains all 5 exercise sessions. Clone it and run `uv sync` to install all dependencies. URL: https://github.com/NsquaredLab/Applied-Programming-2026"
        },
        {
          "front": "Assessment breakdown: what is mandatory vs optional in Applied Programming?",
          "back": "Mandatory: (1) Group project (groups of 3) — contributes to exam grade. (2) Oral exam (20 min). Optional: 5 weekly exercise sessions — non-mandatory but strongly recommended as exam preparation."
        },
        {
          "front": "Who are the two PhD researchers presenting the Applied Programming intro, and what does each research?",
          "back": "Daniel Fenzel — motor unit decomposition across muscles (Vastus Lateralis/Medialis split during leg extension). Annika Ritter — myocontrol (gesture decoding from wrist surface EMG using ML pipelines). Both are from NsquaredLab at FAU AIBE under Prof. Dr. Alessandro Del Vecchio."
        },
        {
          "front": "What does `uv sync` do?",
          "back": "Reads `pyproject.toml` in the current project, resolves all declared dependencies, and installs them into an isolated virtual environment. Equivalent to `pip install -r requirements.txt` + `python -m venv`, but fully automatic and significantly faster (written in Rust)."
        },
        {
          "front": "What does 'closed-loop experiment' mean in myocontrol?",
          "back": "The system continuously reads biosignals (EMG), decodes an intent (e.g., 'close hand'), sends a command to an actuator, and the actuator's response provides sensory feedback that influences the next muscle contraction. The signal flows in a loop: biology → acquisition → processing → control → biology. Contrast with open-loop: commands are sent without feedback from the device's state."
        }
      ]
    },
    {
      "id": 2,
      "title": "Foundations in Mechanics & Biomechanics",
      "speaker": "Prof. Dr. Alessandro Del Vecchio",
      "concepts": [
        {
          "heading": "Physical Quantities — Fundamental & Derived",
          "body": "**Fundamental quantities** (base units that cannot be expressed in terms of others):\n\n| Quantity | Unit | Note |\n|----------|------|------|\n| Length | m | |\n| Mass | kg | 1 kg_mass → 9.81 N weight on Earth |\n| Time | s | |\n| Electrical charge | C | 1 C = 6.24×10¹⁸ electrons |\n| Temperature | °C | 1/100 of the freezing–boiling range |\n| Angle | degree / radian | 1 rad = 57°; full circle = 2π rad |\n\n**Derived quantities** (combinations of fundamental units):\n- Surface: m², Volume: m³\n- Velocity (linear): m/s, Velocity (angular): deg/s or rad/s\n- Acceleration (linear): m/s², Acceleration (angular): deg/s² or rad/s²\n- **Force** [N = kg·m/s²]: Static force → equal-opposite static reaction; Dynamic force → inertial reaction = mass × acceleration\n- **Torque** [Nm]: Static torque → equal-opposite static reaction torque; Dynamic torque → inertial reaction = moment of inertia × angular acceleration"
        },
        {
          "heading": "Scalar vs Vector, Scalar Fields & Vector Fields",
          "body": "| | Scalar | Vector |\n|-|--------|--------|\n| Definition | Single numeric value | Magnitude + direction |\n| Examples | Mass [kg], Length [m], Time [s] | Velocity **v** [m/s], Acceleration **a** [m/s²], Force **F** [N] |\n\n**Scalar Field:** Maps every point in space to a single scalar value.\n- Example: temperature map of northern Italy — each point gets one °C value\n- Biomedical example: EMG potential distribution on skin over erector spinae (T11–L4) — visualised with a colour scale\n\n**Vector Field:** Maps every point in space to a magnitude AND direction.\n- Example: wind map — line thickness = magnitude, arrow = direction\n- Biomedical example: sEMG map at t=0 ms is a scalar field; successive frames (2 ms apart) together form a vector field showing MUAP propagation direction and speed (≈ 4 m/s in biceps brachii)"
        },
        {
          "heading": "Coordinate Systems — Cartesian & Polar",
          "body": "**Cartesian coordinates:**\n- 2D: P = (Px, Py)\n- 3D: P = (Px, Py, Pz)\n- Magnitude: |OP| = √(Px² + Py² + Pz²)\n\n**Polar coordinates** — better suited for rotational / circular motion analysis:\n- **ρ** = distance from origin (always positive)\n- **θ** = angle from x-axis (positive = counter-clockwise)\n- Conversion: Px = ρ·cos(θ), Py = ρ·sin(θ)\n- Full circle: 360° = 2π rad\n\n**Biomedical application:** During elbow flexion, the weight's and muscle force's points of application are more naturally described in polar coordinates — distance from the pivot (ρ) + joint angle (θ). Cartesian coordinates are insufficient for this analysis."
        },
        {
          "heading": "Vectors — Magnitude, Components & Sum",
          "body": "**Vector OA** (from origin O to point A = (Ax, Ay)):\n- **v** = (Ax, Ay)\n- |OA| = √(Ax² + Ay²)\n\n**Vector AB** (from point A to point B):\n- **v** = AB = (xb − xa, yb − ya)\n- |AB| = √(vx² + vy²)\n\n**Vector sum — Parallelogram Rule:**\n```\ns = v + w = (xv + xw, yv + yw)\n```\nThe sum of two vectors equals the diagonal of the parallelogram they form.\n\n**Biomedical example:** Pectoralis major has clavicular and sternal fibre groups. When both contract simultaneously, the net force is the parallelogram diagonal — each fibre group is one vector."
        },
        {
          "heading": "Forces and Torques",
          "body": "**Force:** A vector quantity drawn as an arrow.\n- Direction = line of action (parallel to muscle fibres)\n- Length = magnitude [N]\n\n**Torque:** The rotational effect of a force about a pivot point.\n\n**Formula:** T = F · L\n- L = **lever arm** = perpendicular distance from pivot O to the force's line of action\n- If force is not perpendicular to the bone/lever: **T = F · L · cos(φ)**\n\n**Two calculation approaches (equivalent):**\n\n*Approach 1 — lever arm:*\n- b = perpendicular distance from O to line of action = L · cos(φ)\n- T = F · b = F · L · cos(φ)\n\n*Approach 2 — decompose force:*\n- Split F into component perpendicular to lever: F₁ = F · cos(φ) → produces torque\n- Component parallel to lever: F₂ = F · sin(φ) → lever arm = 0, no torque\n- T = F₁ · L = F · L · cos(φ)\n\n**Biceps elbow torque:** T = F · l · sin(θ) where θ = angle between radius bone and biceps fibres, l = radius bone length. Torque is maximum at θ = 90° and zero at θ = 0° or 180°."
        },
        {
          "heading": "Levers, Pulleys & Equilibrium",
          "body": "**Three lever types:**\n\n| Type | Arrangement | Body example |\n|------|-------------|-------------|\n| Type I | Fulcrum between effort and resistance | Neck: condyles = fulcrum, neck extensors = effort, head weight = resistance |\n| Type II | Resistance between fulcrum and effort | Rare in the human body |\n| Type III | Effort between fulcrum and resistance | **Most human joints** — elbow: joint = fulcrum, biceps = effort (close to joint), hand + forearm weight = resistance |\n\n**Equilibrium condition:** ΣT = 0 → F_A · b_A = F_P · b_P\n- If force is angled: F_A · L_A · cos(θ_A) = F_P · L_P · cos(θ_P)\n\n**Pulleys:**\n- Fixed single pulley: changes direction of force only → F_T = F_P\n- Fixed + sliding pulley combination: F_T = F_P / 2 (mechanical advantage = 2)\n\nPulley equilibrium: ΣT = 0 → T_A = T_P → since both arms = r (radius): F_A = F_P for single fixed pulley.\n\nUsed in traction therapy devices and rehabilitation machines."
        },
        {
          "heading": "Newton's Laws & Ground Reaction Force",
          "body": "**1st Law — Inertia:**\nA body at rest or in uniform linear motion remains so unless acted upon by a net force.\n\n**2nd Law — F = ma:**\nRate of momentum change is proportional to the applied impulse.\n- m · v = F · t → differentiate → **F = m · a** (equivalently: a = F/m)\n- Larger mass → less acceleration for the same force\n\n**3rd Law — Action-Reaction:**\nEvery action has an equal and opposite reaction. This applies to inertial forces too.\n\n**Inertia:** Resistance to change in motion state. A basketball and a 10 kg ball dropped from the same height fall with identical acceleration — the 10 kg ball experiences greater gravitational force but also has proportionally greater inertia; the ratio F/m = g ≈ 9.81 m/s² is the same for both.\n\n**Ground Reaction Force (GRF):**\nBy Newton's 3rd Law, the ground exerts a force on the body equal and opposite to the force the body applies to the ground.\n- On concrete (elastic): GRF returns fully in one direction → efficient energy return\n- On sand (inelastic): GRF disperses in multiple directions → less energy returns → jumping to the same height requires greater muscle force on sand"
        }
      ],
      "questions": [
        {
          "id": "L2Q1",
          "text": "A researcher maps temperature at every point on a patient's skin. What type of mathematical object is this?",
          "options": [
            "A vector field — temperature has direction",
            "A scalar field — temperature is a single value at each point",
            "A 3D tensor — the skin is a 2D surface with depth",
            "A time series — temperature changes over time"
          ],
          "correct": [1],
          "explanation": "Temperature is a scalar quantity — a single number with no direction. Mapping a scalar value to every point in space produces a scalar field. A vector field would require both magnitude and direction at each point (e.g., wind, muscle force direction). A 3D tensor describes volumetric or multi-channel data (like an RGB image). A time series describes values over time, not over space.",
          "type": "single"
        },
        {
          "id": "L2Q2",
          "text": "The torque produced by the biceps at the elbow is T = F·l·sin(θ), where θ is the angle between the radius bone and the muscle fibres, and l is the length of the radius bone. At which angle is torque maximum?",
          "options": [
            "θ = 0° — the muscle is fully extended",
            "θ = 45° — intermediate position maximises the product",
            "θ = 90° — muscle fibres are perpendicular to the bone",
            "θ = 180° — the muscle is fully shortened"
          ],
          "correct": [2],
          "explanation": "Torque T = F·l·sin(θ) is maximised when sin(θ) = 1, which occurs at θ = 90°. At this angle, the muscle's line of action is perpendicular to the bone, so the entire force contributes to rotation with no component wasted along the bone. At θ = 0° or 180°, sin(θ) = 0 and the force passes through the pivot — no torque is produced. At 45°, sin(45°) ≈ 0.71 — significant but not maximum.",
          "type": "single"
        },
        {
          "id": "L2Q3",
          "text": "Most human joints (e.g., the elbow with biceps contraction) function as which lever type?",
          "options": [
            "Type I — fulcrum between effort and resistance",
            "Type II — resistance between fulcrum and effort",
            "Type III — effort between fulcrum and resistance",
            "Type I — resistance between effort and fulcrum"
          ],
          "correct": [2],
          "explanation": "In the elbow: the fulcrum is the elbow joint, the effort is the biceps inserting on the radius close to the joint, and the resistance is the weight of the forearm + hand at the distal end. Effort (close to fulcrum) is between the fulcrum and resistance → Type III. Type III is mechanically disadvantaged (muscle must produce more force than the load) but provides speed and range-of-motion advantages. Type I has fulcrum in the middle (e.g., the neck). Type II has resistance in the middle (rare in the human body).",
          "type": "single"
        },
        {
          "id": "L2Q4",
          "text": "Which of the following are derived physical quantities (not fundamental)? Select ALL that apply.",
          "options": [
            "Mass [kg]",
            "Force [N = kg·m/s²]",
            "Velocity [m/s]",
            "Electrical charge [C]"
          ],
          "correct": [1, 2],
          "explanation": "Fundamental quantities are the base units: length (m), mass (kg), time (s), electrical charge (C), temperature (°C), angle (deg/rad). Derived quantities are combinations: velocity = length/time [m/s]; force = mass × acceleration = mass × length/time² [kg·m/s² = N]; torque = force × length [Nm]. Mass (kg) and electrical charge (C) are fundamental — they appear in the base unit list and are not computed from other quantities.",
          "type": "multiple"
        },
        {
          "id": "L2Q5",
          "text": "A basketball and a 10 kg cannonball are dropped from the same height in a vacuum. Which statement correctly explains why they hit the ground at the same time?",
          "options": [
            "Gravity exerts the same force on all objects regardless of mass",
            "The larger gravitational force on the cannonball is exactly offset by its larger inertia — the ratio F/m = g is constant",
            "Air resistance equalises their speeds",
            "The vacuum removes gravitational differences between objects"
          ],
          "correct": [1],
          "explanation": "By Newton's 2nd Law, a = F/m. The gravitational force on the cannonball is ~10× larger (F = mg), but its mass (inertia) is also ~10× larger. The ratio F/m = g ≈ 9.81 m/s² is the same for both objects — so they accelerate identically. This is a direct consequence of 2nd and 3rd laws. Option A is wrong: gravity does exert more force on heavier objects (F = mg). Option C is irrelevant in a vacuum. Option D is not a physical principle.",
          "type": "single"
        },
        {
          "id": "L2Q6",
          "text": "In polar coordinates (ρ, θ), how do you convert to Cartesian (Px, Py)?",
          "options": [
            "Px = ρ·sin(θ),  Py = ρ·cos(θ)",
            "Px = ρ·cos(θ),  Py = ρ·sin(θ)",
            "Px = ρ/cos(θ),  Py = ρ/sin(θ)",
            "Px = θ·cos(ρ),  Py = θ·sin(ρ)"
          ],
          "correct": [1],
          "explanation": "ρ is the radial distance from the origin; θ is the angle from the positive x-axis (counter-clockwise). The horizontal component is the projection onto the x-axis: Px = ρ·cos(θ). The vertical component is the projection onto the y-axis: Py = ρ·sin(θ). Option A swaps sin and cos. Options C and D are not valid coordinate transformations — you never divide by a trigonometric function in a standard polar-to-Cartesian conversion.",
          "type": "single",
          "shuffle": false
        }
      ],
      "flashcards": [
        {
          "front": "What is a scalar field?",
          "back": "A mapping that assigns a single scalar value to every point in space. Example: temperature distribution on a patient's skin; EMG potential distribution over back muscles — visualised with a colour scale."
        },
        {
          "front": "What is a vector field?",
          "back": "A mapping that assigns a magnitude AND direction to every point in space. Example: wind map (line thickness = magnitude, arrow = direction); sEMG potential map across time frames showing MUAP propagation direction and speed (≈ 4 m/s in biceps brachii)."
        },
        {
          "front": "What is torque? Give the formula for a non-perpendicular force.",
          "back": "Torque is the rotational effect of a force about a pivot. T = F · L · cos(φ) where L = distance from pivot to force application point, φ = angle between force and perpendicular to the lever. Equivalently: T = F · (lever arm), where lever arm = L · cos(φ)."
        },
        {
          "front": "Name the three lever types and give a body example for Type I and Type III.",
          "back": "Type I: fulcrum between effort and resistance — neck (condyles=fulcrum, extensors=effort, head weight=resistance). Type II: resistance between fulcrum and effort — rare in the body. Type III: effort between fulcrum and resistance — most human joints (elbow: joint=fulcrum, biceps=effort, hand weight=resistance)."
        },
        {
          "front": "State Newton's 2nd Law and explain why a basketball and a 10 kg ball fall at the same rate.",
          "back": "F = m·a → a = F/m. A heavier object experiences more gravitational force, but also has proportionally more inertia. The ratio F/m = g ≈ 9.81 m/s² is identical for all masses — so all objects fall with the same acceleration in a vacuum."
        },
        {
          "front": "What is Ground Reaction Force (GRF) and why does jumping on sand require more effort?",
          "back": "By Newton's 3rd Law, the ground pushes back with a force equal and opposite to the body's applied force. On sand (inelastic contact), GRF disperses in multiple directions — less force is returned upward — so reaching the same jump height requires greater muscle output than on concrete."
        }
      ]
    },
    {
      "id": 3,
      "title": "Signals: Time, Frequency, and the Digital World",
      "speaker": "Prof. Dr. Alessandro Del Vecchio",
      "concepts": [
        {
          "heading": "Signals as Functions — 1D, 2D, and 3D Arrays",
          "body": "A **signal** is any quantity that depends on another variable — most often time: `y(t)`. The dimensionality of a signal describes the number of independent variables it depends on.\n\n| Dimensionality | Description | Biomedical example | NumPy shape |\n|---|---|---|---|\n| **1D** | Depends on time only | Single EMG channel `voltage(t)`, elbow angle `θ(t)` | `(T,)` |\n| **2D** | Depends on two variables (space × space, or space × time snapshot) | EMG electrode-grid frame at one instant; greyscale image | `(rows, cols)` |\n| **3D** | Depends on three variables | MUAP propagation movie (rows × cols × time); fMRI volume | `(rows, cols, T)` |\n\nIn Python, a signal is an `np.ndarray` plus **metadata**: the sampling rate `fs` [Hz] and the physical unit (mV, deg, N). Without metadata, the array is just numbers — always document what the axes represent.\n\n```python\nimport numpy as np\nfs = 2000          # 2000 samples per second\nt = np.linspace(0, 1, fs)   # 1-second time axis, shape (2000,)\nemg = np.random.randn(fs)   # placeholder 1D signal, shape (2000,)\n```"
        },
        {
          "heading": "Deterministic vs Random (Stochastic) Signals",
          "body": "**Deterministic signals** are fully predictable — described by a mathematical equation. Given the formula, you can compute the exact value at any instant.\n- Examples: pure sinusoid `A·sin(2πft)`, rectangular pulse train, evoked potential (averaged ERP)\n- Tools: closed-form analysis, exact Fourier transform\n\n**Stochastic (random) signals** cannot be predicted from a formula — only their *statistics* are consistent across trials.\n- Examples: surface EMG (algebraic sum of many asynchronous MUAPTs), EEG, thermal (Johnson) noise\n- Tools: statistical estimators — RMS, ARV, power spectral density\n- Because individual trials differ, you must *average* many trials or use parametric models\n\n**Quasi-deterministic signals** have a deterministic shape but slowly-varying parameters:\n- Examples: ECG (each beat is similar but the rate drifts), a single MUAPT during a sustained contraction\n\n> **Key insight:** sEMG is stochastic because it is the *algebraic sum* of potentially hundreds of motor unit action potential trains (MUAPTs) firing independently. No two 1-second windows of EMG look identical, even at the same force level."
        },
        {
          "heading": "The Sinusoid — Building Block of All Signals",
          "body": "Every signal studied in this course can be decomposed into a sum of sinusoids — this is the core insight behind Fourier analysis. Understanding one sinusoid therefore unlocks the entire frequency domain.\n\n**General form:**\n$$y(t) = A \\cdot \\sin(2\\pi f t + \\varphi)$$\n\n| Parameter | Symbol | Unit | Meaning |\n|-----------|--------|------|---------|\n| Amplitude | A | mV, N, … | Peak deviation from zero |\n| Frequency | f | Hz | Oscillations per second |\n| Period | T = 1/f | s | Duration of one cycle |\n| Phase | φ | rad | Time shift at t=0 |\n| Angular frequency | ω = 2πf | rad/s | Radians swept per second |\n\n**NumPy idiom** — always the same five lines:\n```python\nimport numpy as np\nA, f, phi = 1.0, 10.0, 0.0   # amplitude, frequency (Hz), phase (rad)\nfs = 2000                      # sampling rate\nt = np.linspace(0, 1, fs)     # 1-second time vector\ny = A * np.sin(2 * np.pi * f * t + phi)\n```\nIncreasing `f` compresses the waveform. Increasing `A` stretches it vertically. Changing `phi` shifts it horizontally."
        },
        {
          "heading": "Time-Domain Descriptors — Peak, ARV, and RMS",
          "body": "Three standard amplitude descriptors are used to summarise a signal's magnitude over a time window:\n\n| Descriptor | Formula | NumPy | Characteristics |\n|---|---|---|---|\n| **Peak** | max\\|x\\| | `np.max(np.abs(x))` | Sensitive to outliers and transient spikes |\n| **ARV** (Average Rectified Value) | mean\\|x\\| | `np.mean(np.abs(x))` | Proportional to force at low contraction levels; used in fatigue studies |\n| **RMS** (Root Mean Square) | √(mean(x²)) | `np.sqrt(np.mean(x**2))` | Most robust; directly relates to signal *power*; preferred for EMG amplitude |\n\n**Five lines to remember for RMS:**\n```python\nx = emg[0, :]                       # one EMG channel\nrms = np.sqrt(np.mean(x**2))        # RMS of the entire channel\nprint(f\"RMS amplitude: {rms:.4f} mV\")\n```\n\n**EMG envelope:** A slow-varying RMS computed over a sliding window (e.g., 200 ms) tracks how contraction intensity changes over time. Implemented as convolution with a moving-average kernel (covered in Lecture 3)."
        },
        {
          "heading": "Frequency Domain — Fourier Series and FFT",
          "body": "Any periodic signal can be decomposed into a sum of sinusoids at integer multiples of a fundamental frequency — this is the **Fourier series**. The **FFT** (Fast Fourier Transform) computes all coefficients simultaneously in O(N log N) operations.\n\n**Key concepts:**\n\n- **Spectrum:** A plot of amplitude (or power) vs frequency. Each spike corresponds to a sinusoidal component.\n- **Power Spectral Density (PSD):** Describes how signal power is distributed across frequencies. For sEMG, the PSD typically peaks at 50–150 Hz.\n- **Welch's method** (`scipy.signal.welch`): Divides the signal into overlapping windows, computes FFT on each, and averages the squared magnitudes. Preferred for stochastic signals because averaging reduces variance of the estimate.\n- **Mean frequency:** The centre of gravity of the PSD. For EMG, mean frequency **drops with muscle fatigue** — a useful fatigue indicator.\n\n```python\nimport numpy as np\nfrom scipy.signal import welch\n\nfs = 2000\nfreqs, psd = welch(emg_channel, fs=fs, nperseg=512)\nmean_freq = np.sum(freqs * psd) / np.sum(psd)\nprint(f\"Mean frequency: {mean_freq:.1f} Hz\")\n```"
        },
        {
          "heading": "Filtering — Low-pass, High-pass, and Band-pass",
          "body": "A **filter** selects which frequency components to keep and which to remove. The three main types:\n\n| Filter type | Keeps | Removes | Typical use for EMG |\n|---|---|---|---|\n| **Low-pass (LP)** | Low frequencies | High-frequency noise | Remove above 450 Hz |\n| **High-pass (HP)** | High frequencies | Slow drifts / DC | Remove below 20 Hz (motion artifact) |\n| **Band-pass (BP)** | A frequency band | Everything outside | 20–450 Hz — standard EMG |\n| **Notch** | All except a narrow band | One frequency (50/60 Hz) | Remove powerline interference |\n\nIn SciPy, always use `butter` + `filtfilt` for zero-phase filtering (applying forward then backward avoids phase distortion):\n\n```python\nfrom scipy.signal import butter, filtfilt\n\n# Band-pass: keep 20–450 Hz\nb, a = butter(4, [20, 450], btype='bandpass', fs=2000)\ny = filtfilt(b, a, x)   # zero-phase: applies filter twice (fwd + bwd)\n```\n\nThe order (`4`) controls how steeply the filter rolls off outside the passband. Higher order → steeper roll-off → more computationally expensive."
        },
        {
          "heading": "Analog-to-Digital Conversion — Sampling and the Nyquist Theorem",
          "body": "Before any digital processing, a continuous analog signal must be **sampled** — measured at discrete time points — to produce a digital array.\n\n**Sampling rate** `fs` [Hz] = number of samples per second.\n\n**Nyquist–Shannon theorem:** To faithfully reconstruct a signal whose highest frequency component is `B` Hz, you must sample at:\n$$f_s \\geq 2B$$\n\nFor surface EMG, content extends to ≈ 450–500 Hz → minimum `fs` = 900 Hz. Standard practice: **fs = 2000 Hz** (gives a 4× safety margin and convenient numbers).\n\n**Aliasing** occurs when `fs < 2B`: high-frequency components fold back into the spectrum at false lower frequencies, corrupting the signal irreversibly — no post-hoc filter can fix aliased data.\n\n**Quantisation:** Representing continuous amplitude as a finite integer. An N-bit ADC has 2^N levels:\n\n| Bit depth | Levels | Voltage step (at ±5 V range) |\n|---|---|---|\n| 8-bit | 256 | ~39 mV |\n| 12-bit | 4096 | ~2.4 mV |\n| **16-bit** | **65,536** | **~0.15 mV** ← typical EMG |\n\nSmaller voltage step = better amplitude resolution. EMG signals are in the µV–mV range, so 16-bit or 24-bit ADCs are standard."
        }
      ],
      "questions": [
        {
          "id": "L3Q1",
          "text": "Which NumPy expression correctly computes the RMS (Root Mean Square) of array `x`?",
          "options": [
            "np.mean(x**2)",
            "np.sqrt(np.sum(x**2))",
            "np.sqrt(np.mean(x**2))",
            "np.abs(np.mean(x))"
          ],
          "correct": [2],
          "explanation": "RMS = √(mean(x²)). In NumPy: `np.sqrt(np.mean(x**2))`. Option A omits the square root — it gives the mean square (the variance, if x is zero-mean), not the RMS. Option B takes the square root of the *sum* rather than the *mean* — this gives a result that grows with signal length, making it useless for amplitude comparison across different-length recordings. Option D computes the mean first (averaging positive and negative values, which cancel for zero-mean signals) and takes the absolute value — this is related to mean absolute value, not RMS.",
          "type": "single"
        },
        {
          "id": "L3Q2",
          "text": "An EMG signal has frequency content up to 450 Hz. What is the MINIMUM sampling rate required to avoid aliasing according to the Nyquist theorem?",
          "options": [
            "225 Hz",
            "450 Hz",
            "900 Hz",
            "1800 Hz"
          ],
          "correct": [2],
          "explanation": "The Nyquist–Shannon theorem states that to reconstruct a signal with highest frequency component B, you must sample at fs ≥ 2B. For B = 450 Hz: fs_min = 2 × 450 = 900 Hz. Option A (225 Hz) is only half the signal bandwidth — severe aliasing would occur. Option B (450 Hz) equals the signal bandwidth, not twice it — still insufficient. Option D (1800 Hz) exceeds the minimum but the question asks for the *minimum*. In practice, the standard EMG sampling rate is 2000 Hz to provide a comfortable safety margin.",
          "type": "single"
        },
        {
          "id": "L3Q3",
          "text": "Which of the following is a stochastic (random) signal?",
          "options": [
            "A pure sinusoid: y(t) = A·sin(2πft)",
            "Surface EMG recorded during a sustained hand contraction",
            "A rectangular pulse train with fixed period",
            "An evoked potential averaged over 100 trials"
          ],
          "correct": [1],
          "explanation": "Surface EMG is stochastic because it is the algebraic superposition of many independent motor unit action potential trains (MUAPTs) firing at slightly different rates and times. No two windows of EMG look the same, even at identical contraction levels — only the statistics (RMS, PSD) are consistent. A pure sinusoid is perfectly deterministic — given A, f, and φ, the waveform is fully specified. A rectangular pulse train with fixed period is also deterministic. An averaged evoked potential converges to a deterministic waveform as the number of trials increases (averaging cancels the stochastic noise).",
          "type": "single"
        },
        {
          "id": "L3Q4",
          "text": "Why is Welch's method preferred over a single FFT for estimating the power spectrum of surface EMG?",
          "options": [
            "Welch's method is faster than FFT for long signals",
            "Welch's method averages multiple overlapping windows, reducing the variance of the spectral estimate",
            "Welch's method avoids the need for zero-padding",
            "A single FFT cannot handle signals longer than 1024 samples"
          ],
          "correct": [1],
          "explanation": "Surface EMG is a stochastic signal — a single FFT of a random process produces a very noisy (high-variance) spectral estimate. Welch's method divides the signal into overlapping segments, computes the FFT magnitude squared on each, and *averages* across segments. Averaging reduces variance without reducing frequency resolution (given sufficient signal length). Option A is incorrect: Welch is *more* expensive than a single FFT because it computes many FFTs. Option C is wrong: zero-padding is still applicable and unrelated to variance. Option D is false: NumPy FFT works on arrays of any length.",
          "type": "single"
        },
        {
          "id": "L3Q5",
          "text": "A researcher wants to remove slow baseline drift (below 20 Hz) and powerline interference at 50 Hz from an EMG recording. Which filter combination is correct?",
          "options": [
            "Low-pass at 20 Hz, then notch at 50 Hz",
            "High-pass at 20 Hz, then notch at 50 Hz",
            "Notch at 50 Hz, then low-pass at 20 Hz",
            "Band-pass 50–500 Hz to remove both at once"
          ],
          "correct": [1],
          "explanation": "To remove slow drift (below 20 Hz), use a **high-pass** filter with cutoff 20 Hz — this passes everything above 20 Hz and attenuates the low-frequency drift. To remove the 50 Hz powerline interference, add a **notch** filter centred at 50 Hz. The order (HP then notch) does not change the mathematical result, but it is conventional to apply the broadband filter first. Option A incorrectly uses a low-pass at 20 Hz — that would *remove* all EMG content above 20 Hz, leaving only the drift. Option C applies a notch first (fine), then low-passes at 20 Hz — again destroying the EMG band. Option D is wrong: a band-pass starting at 50 Hz removes the very low-frequency content but not specifically the 50 Hz powerline (it would pass it), and it removes useful EMG content below 50 Hz.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Signal dimensionality: what are 1D, 2D, and 3D signals in NumPy?",
          "back": "1D — single time series, shape `(T,)`. Example: one EMG channel.\n2D — spatial snapshot or image, shape `(rows, cols)`. Example: electrode grid frame.\n3D — spatial + time, shape `(rows, cols, T)`. Example: MUAP propagation movie or fMRI volume."
        },
        {
          "front": "Deterministic vs stochastic signals — one example each and the right analysis tool.",
          "back": "Deterministic: pure sinusoid, ECG beat shape — use closed-form formulas and exact FFT.\nStochastic: surface EMG, EEG, thermal noise — use statistical estimators (RMS, ARV) and averaged spectra (Welch's method). Stochastic signals are not reproducible trial-to-trial; only their statistics are stable."
        },
        {
          "front": "Sinusoid parameters: state the formula and the meaning of A, f, T, φ, ω.",
          "back": "y(t) = A·sin(2πft + φ)\n• A — amplitude (peak value)\n• f — frequency [Hz] (cycles per second)\n• T = 1/f — period [s] (duration of one cycle)\n• φ — phase [rad] (time shift at t=0)\n• ω = 2πf — angular frequency [rad/s]"
        },
        {
          "front": "RMS formula and why it is preferred over peak for EMG amplitude.",
          "back": "RMS = √(mean(x²)) → `np.sqrt(np.mean(x**2))`. Preferred because: (1) relates directly to signal power; (2) robust to brief transient spikes that inflate the peak; (3) proportional to muscle contraction force across a wide range; (4) consistent across different signal lengths."
        },
        {
          "front": "What does ARV stand for, and when is it used?",
          "back": "ARV = Average Rectified Value = mean|x| → `np.mean(np.abs(x))`. Used as an amplitude descriptor for surface EMG at low contraction levels where it is approximately proportional to force. Less robust than RMS at high contraction levels or with noisy signals."
        },
        {
          "front": "Nyquist theorem — state it and give the EMG example.",
          "back": "To reconstruct a signal with highest frequency B, sample at fs ≥ 2B. If fs < 2B, aliasing occurs: high-frequency components fold into the spectrum as false low-frequency artefacts — irreversible.\nEMG example: EMG content up to 450 Hz → minimum fs = 900 Hz. Standard practice: 2000 Hz (4× safety margin)."
        },
        {
          "front": "Band-pass filter for EMG — typical frequency bounds and SciPy idiom.",
          "back": "Standard EMG band-pass: 20–450 Hz.\n• High-pass at 20 Hz removes slow motion artifacts.\n• Low-pass at 450 Hz removes high-frequency noise.\n```python\nfrom scipy.signal import butter, filtfilt\nb, a = butter(4, [20, 450], btype='bandpass', fs=2000)\ny = filtfilt(b, a, x)  # zero-phase\n```"
        },
        {
          "front": "What is the Welch method and why use it for stochastic signals?",
          "back": "Welch's method divides a signal into overlapping segments, computes the FFT squared magnitude on each, and averages across segments to estimate the Power Spectral Density (PSD). Used for stochastic signals (EMG, EEG) because a single FFT of a random process has very high variance — averaging across windows reduces variance without sacrificing frequency resolution. `scipy.signal.welch(x, fs=2000, nperseg=512)`."
        }
      ]
    },
    {
      "id": 4,
      "title": "Vectors, Matrices, and Convolutions",
      "speaker": "Prof. Dr. Alessandro Del Vecchio",
      "concepts": [
        {
          "heading": "Vectors — A List of Numbers",
          "body": "A **vector** is a 1D `np.ndarray` — the simplest multi-element data structure in NumPy. The same concept appears across radically different domains:\n\n| Domain | Vector contents | Example shape |\n|--------|----------------|---------------|\n| Tabular data (one patient) | `(age, height, weight, BMI)` | `(4,)` |\n| Image pixel (colour) | `(R, G, B)` | `(3,)` |\n| LLM embedding | 1536 semantic dimensions | `(1536,)` |\n| EMG feature | `(RMS, ARV, mean_freq)` per window | `(3,)` |\n\n**NumPy is natively vectorised** — all basic operations work element-wise without Python loops:\n\n```python\nimport numpy as np\nu = np.array([1.0, 2.0, 3.0])\nv = np.array([4.0, 5.0, 6.0])\n\nprint(u + v)       # [5. 7. 9.]  — element-wise addition\nprint(2.5 * u)     # [2.5 5.  7.5]  — scalar scaling\n```\n\nWriting explicit Python `for` loops over NumPy arrays is almost always slower and unnecessary — embrace vectorised operations."
        },
        {
          "heading": "Dot Product and Similarity — The Workhorse of Machine Learning",
          "body": "The **dot product** of two equal-length vectors is a single scalar:\n$$u \\cdot v = \\sum_i u_i \\cdot v_i$$\n\nIn NumPy: `np.dot(u, v)` or `u @ v` (uses a single optimised BLAS call — microseconds for vectors of length 10⁶).\n\n**Where it appears:**\n- **Artificial neuron:** `y = w · x + b` — every layer of a neural network is a dot product\n- **Search / RAG:** cosine similarity between query and document embedding = `(q · d) / (‖q‖·‖d‖)`\n- **Recommender systems:** user preference vector · item attribute vector → predicted rating\n\n**Vector length (L2 norm):** `‖v‖ = √(Σ vᵢ²)` → `np.linalg.norm(v)`\n\n**Distance between two samples:** `np.linalg.norm(a - b)` — the Euclidean distance in feature space.\n\n**Nearest-neighbour search** (powers FAISS, Chroma, pgvector):\n```python\nX = np.random.randn(1000, 128)  # 1000 stored vectors, 128 dims each\nq = np.random.randn(128)         # query vector\ndists = np.linalg.norm(X - q, axis=1)  # distance from q to every row\nidx = np.argmin(dists)                  # index of nearest neighbour\n```\nThis `axis=1` trick is the most important NumPy idiom for similarity search."
        },
        {
          "heading": "Matrices — 2D Arrays and Linear Transformations",
          "body": "A **matrix** is a 2D `np.ndarray` with shape `(rows, cols)`. Three canonical interpretations:\n\n| Use case | Shape convention | Indexing |\n|----------|-----------------|----------|\n| Dataset | `(n_samples, n_features)` | `X[i]` = sample i, `X[:, j]` = feature j |\n| Greyscale image | `(height, width)` | `img[r, c]` = pixel at row r, column c |\n| Neural-network weight layer | `(n_outputs, n_inputs)` | `W[j, :]` = weights feeding into output j |\n\n**Matrix–vector product** `A @ x`: applies the linear transformation encoded in matrix A to input vector x, producing output vector y. This is how a single neural layer computes its output:\n\n```python\nA = np.random.randn(4, 3)   # 4-output, 3-input layer\nx = np.array([1.0, 2.0, 3.0])  # input vector\ny = A @ x                   # output: shape (4,)\n```\n\nEvery deep-learning forward pass is a sequence of such matrix–vector products interspersed with non-linear activation functions. Understanding `A @ x` is understanding neural networks at the mathematical level."
        },
        {
          "heading": "Convolution — A Kernel Sliding Over a Signal",
          "body": "**Convolution** slides a small kernel (filter) h over a signal x and computes a weighted sum at each position:\n$$(x * h)[n] = \\sum_k x[k] \\cdot h[n-k]$$\n\nIn NumPy: `np.convolve(x, h)`. The kernel h defines what the convolution emphasises or suppresses.\n\n**Key applications:**\n\n1. **EMG envelope smoothing** — a moving-average kernel:\n```python\nW = 200                             # window length (samples)\nh = np.ones(W) / W                  # moving-average kernel\nenvelope = np.convolve(EMG_rect, h, mode='same')  # smooth envelope\n```\n\n2. **Spike-train firing rate** — convolving a binary spike raster with a Gaussian kernel:\n```python\nfrom scipy.ndimage import gaussian_filter1d\nspike_train = np.array([0,0,1,0,0,0,1,0,1,0,0])  # discrete spikes\nfiring_rate = gaussian_filter1d(spike_train.astype(float), sigma=5)\n```\n\nConvolution is the bridge between the discrete spike language of biology and the continuous signal language of control engineering."
        },
        {
          "heading": "Windows — Shaping the Kernel to Reduce Leakage",
          "body": "The **shape** of the convolution kernel determines what frequency content is preserved or attenuated. Two important cases:\n\n**Rectangular (boxcar) window:**\n- Abrupt edges create ringing artefacts in the frequency domain (**spectral leakage**)\n- Energy from one frequency bin bleeds into adjacent bins\n- Result: poor frequency resolution\n\n**Smooth windows (Hanning, Hamming, Gaussian):**\n- Taper to zero at both ends → no abrupt edges → dramatically less leakage\n- **Hanning window:** `scipy.signal.windows.hann(L)` — the default choice for EMG and general signal processing\n\n```python\nfrom scipy.signal import windows\nimport numpy as np\n\nL = 256\nhann = windows.hann(L)        # tapers to zero at both ends\nrect = np.ones(L)             # rectangular window\n```\n\n**Rule of thumb:** Always apply a Hanning window *before* computing an FFT; always choose a smooth kernel (Hanning or Gaussian) for firing-rate estimation from spike trains. The single extra line `x_windowed = x * hann` is the difference between a clean and a leaky spectrum."
        },
        {
          "heading": "Spike Trains and the Bridge to Motor Control",
          "body": "A **motor unit** does not fire continuously — it fires as a train of discrete spikes (action potentials). In a computer, this is represented as a binary vector where `1` marks a spike and `0` marks silence.\n\n**Raster plot:** Each row represents one motor unit; each vertical mark is a spike time. At 35% of maximum voluntary contraction (ankle dorsiflexors), you can observe 20–25 active motor units firing at 10–30 pulses per second.\n\n**Problem:** A robot joint cannot respond to a binary spike train — it needs a smooth continuous signal proportional to desired torque.\n\n**Solution — convolution with a smooth kernel:**\n\n```python\nspike_train = np.zeros(2000)         # 1 second at fs=2000 Hz\nspike_times = [150, 230, 320, 420]   # spike sample indices\nspike_train[spike_times] = 1.0\n\nh = np.hanning(100) / np.sum(np.hanning(100))   # normalised Hanning kernel\nfiring_rate = np.convolve(spike_train, h, mode='same')   # smooth continuous estimate\n```\n\nThis single convolution converts discrete neuroscience data into a continuous control signal — the core conceptual bridge of Lecture 3 (and of the whole course)."
        },
        {
          "heading": "Linear Algebra in AI — Why It All Matters",
          "body": "Every concept in this lecture — vectors, dot products, matrix products, convolution — is a primitive operation that underlies modern artificial intelligence.\n\n**2-layer MLP (Multi-Layer Perceptron) forward pass:**\n```python\nimport numpy as np\n\ndef relu(x): return np.maximum(0, x)\n\n# Layer 1: (n_hidden, n_input) weight matrix\nh = relu(W1 @ x + b1)   # hidden layer\n# Layer 2: (n_output, n_hidden) weight matrix\ny = W2 @ h + b2          # output layer\n```\n\n**Convolutional Neural Networks (CNNs):** The 2D convolution in a CNN is exactly `np.convolve` extended to 2D — the kernel slides over an image and computes weighted sums, detecting edges, textures, and shapes.\n\n**Embedding lookup:** Retrieving a word/token embedding from a model is a matrix row-selection: `embedding = E[token_id]`.\n\n**Vector databases:** Semantic search is `np.argmin(np.linalg.norm(X - q, axis=1))` at scale (with approximate nearest-neighbour indexing).\n\n**Five lines to remember from Lecture 3:** `a + b` (addition), `u @ v` (dot product), `A @ x` (matrix multiply), `np.convolve(spikes, h)` (convolution), `windows.hann(L)` (window)."
        }
      ],
      "questions": [
        {
          "id": "L4Q1",
          "text": "Which of the following CORRECTLY uses the dot product? Select ALL that apply.",
          "options": [
            "Artificial neuron output: y = w · x + b",
            "Element-wise multiplication of two feature vectors to compare them",
            "Nearest-neighbour distance via np.linalg.norm(a − b)",
            "Convolution of a spike train with a Gaussian kernel"
          ],
          "correct": [0, 2],
          "explanation": "The dot product (w · x = Σ wᵢxᵢ) appears in: (A) the artificial neuron — every neural network layer computes `y = W @ x + b`, which is a dot product per output unit. (C) the L2 norm `‖a−b‖ = sqrt((a−b)·(a−b))` is derived from the dot product and measures Euclidean distance for nearest-neighbour search. Option B describes element-wise multiplication, which produces a vector, not a scalar — it is NOT the dot product and not a standard similarity metric. Option D describes convolution (sliding weighted sum), which has a different mathematical definition (`Σ x[k]·h[n−k]`) and cannot be reduced to a simple dot product of the two full vectors.",
          "type": "multiple"
        },
        {
          "id": "L4Q2",
          "text": "A medical dataset has 500 patients, each described by 12 clinical features. What is `X.shape` in NumPy, following the standard ML convention?",
          "options": [
            "(12, 500)",
            "(500, 12)",
            "(500,)",
            "(12,)"
          ],
          "correct": [1],
          "explanation": "By convention in scikit-learn and NumPy-based ML: rows = samples, columns = features. For 500 patients × 12 features: `X.shape = (500, 12)`. `X[i]` gives the feature vector of patient i (shape `(12,)`). `X[:, j]` gives all values of feature j across all patients (shape `(500,)`). Option A reverses rows and columns — this is the transpose. Option C would be a 1D vector (one sample with 500 values). Option D would be one sample's feature vector.",
          "type": "single"
        },
        {
          "id": "L4Q3",
          "text": "Which kernel applied in `np.convolve(x, h)` produces a moving-average smoothing of a 1D signal?",
          "options": [
            "h = np.ones(W) / W",
            "h = scipy.signal.windows.hann(W)",
            "h = np.array([1, 0, -1])",
            "h = np.eye(W)[0]"
          ],
          "correct": [0],
          "explanation": "A moving-average computes the mean of W consecutive samples — equivalent to convolving with a rectangular kernel `h = np.ones(W) / W` (all weights equal to 1/W, so their sum = 1 and each output is the local mean). Option B is a Hanning window kernel — it produces a *weighted* average (more weight at the centre, tapering to zero at the edges) — this is a weighted smoother, not a pure moving average. Option C `[1, 0, -1]` is a finite-difference kernel that approximates the first derivative (edge detector) — it does not smooth. Option D `np.eye(W)[0]` is a unit impulse (1 followed by zeros) — convolving with this is the identity operation, leaving the signal unchanged.",
          "type": "single"
        },
        {
          "id": "L4Q4",
          "text": "Why is a Hanning window applied to a signal before computing an FFT?",
          "options": [
            "To increase the signal's amplitude and improve signal-to-noise ratio",
            "To reduce spectral leakage by tapering the signal to zero at the segment edges",
            "To high-pass filter the signal and remove DC offset",
            "To double the effective frequency resolution of the FFT"
          ],
          "correct": [1],
          "explanation": "Spectral leakage occurs when a signal segment is not periodic at its endpoints — the abrupt discontinuity at the edges of a rectangular window creates Gibbs-like ringing that spreads energy from one frequency bin into adjacent bins. A Hanning window tapers the signal smoothly to zero at both ends, eliminating the edge discontinuity and dramatically reducing inter-bin leakage. Option A is wrong: windowing *reduces* amplitude (the ends are suppressed) — it lowers SNR of the windowed region. Option C is wrong: windowing is a time-domain multiplication, not a high-pass filter — it does not specifically attenuate DC. Option D is wrong: windowing slightly *reduces* effective frequency resolution (the window widens the spectral peak) compared to a rectangular window of the same length.",
          "type": "single"
        },
        {
          "id": "L4Q5",
          "text": "A motor-unit spike train is a discrete binary vector (1 = spike, 0 = silence). What operation converts it into a smooth continuous firing-rate signal suitable for driving a robot joint?",
          "options": [
            "FFT — transform the spike train to the frequency domain",
            "Dot product with a reference template vector",
            "Convolution with a Gaussian or Hanning kernel",
            "Matrix multiplication with the inverse of the weight matrix"
          ],
          "correct": [2],
          "explanation": "Convolving the discrete binary spike train with a smooth kernel (Gaussian or Hanning) produces a continuous, smooth estimate of the local firing rate. At each time point, the output is the weighted sum of nearby spikes — more recent spikes contribute more (if the kernel is causal). This is the standard neuroscience technique for estimating instantaneous firing rate and the key bridge from discrete biology to continuous control. Option A (FFT) transforms to the frequency domain — useful for analysis, but the output is a complex spectrum, not a time-domain firing-rate signal. Option B (dot product) produces a single scalar — it cannot produce a time-varying signal. Option D (matrix inverse) is a linear algebra operation unrelated to spike-rate estimation.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Dot product: formula and NumPy idiom.",
          "back": "u · v = Σ uᵢ·vᵢ. NumPy: `np.dot(u, v)` or `u @ v` (preferred — one optimised BLAS call). Produces a scalar. Used in: artificial neuron (`y = w·x + b`), cosine similarity, recommendation systems."
        },
        {
          "front": "L2 norm formula and its use for nearest-neighbour distance.",
          "back": "‖v‖ = √(Σ vᵢ²) → `np.linalg.norm(v)`. Distance between two vectors a and b: `np.linalg.norm(a − b)`. Nearest neighbour in dataset X: `np.argmin(np.linalg.norm(X − q, axis=1))`. Powers FAISS, Chroma, pgvector."
        },
        {
          "front": "Matrix shape convention: (rows, cols) — what are rows and cols in a dataset?",
          "back": "Rows = samples (patients, time windows, images). Columns = features (clinical measurements, EMG channels, pixel intensities). `X.shape = (n_samples, n_features)`. Access: `X[i]` = sample i; `X[:, j]` = feature j across all samples."
        },
        {
          "front": "What does np.convolve(x, h) compute?",
          "back": "The discrete convolution (x * h)[n] = Σ x[k]·h[n−k]. Slides kernel h over signal x, computing a weighted sum at each position. Application: moving-average smoothing with `h = np.ones(W)/W`, or firing-rate estimation with a Gaussian kernel."
        },
        {
          "front": "Hanning vs rectangular window — what is spectral leakage?",
          "back": "Spectral leakage: energy from one frequency bin bleeds into adjacent bins when a signal segment has discontinuous edges (rectangular window). A Hanning window tapers to zero at both ends, eliminating edge discontinuities and greatly reducing leakage. Always apply before FFT: `x_windowed = x * np.hanning(len(x))`."
        },
        {
          "front": "Spike raster to firing rate — which operation bridges the gap?",
          "back": "Convolution with a smooth kernel (Gaussian or Hanning). The binary spike vector (1=spike, 0=silence) is convolved with a normalised Gaussian or Hanning kernel → continuous, smooth estimate of local firing rate at each time point. This converts discrete neuroscience data into a continuous engineering control signal."
        },
        {
          "front": "Five lines to remember from Lecture 3 (Vectors, Matrices, Convolutions).",
          "back": "1. `a + b` — vector addition (element-wise)\n2. `u @ v` — dot product (scalar)\n3. `A @ x` — matrix–vector product (linear transformation)\n4. `np.convolve(spikes, h)` — convolution with kernel h\n5. `scipy.signal.windows.hann(L)` — Hanning window of length L"
        }
      ]
    },
    {
      "id": 5,
      "title": "The Electromyogram — Interfacing the Neuromuscular System",
      "speaker": "Prof. Dr. Alessandro Del Vecchio, Daniel Fenzel, Annika Ritter, Atharva Pall",
      "concepts": [
        {
          "heading": "The Motor Unit — Neural Command to Muscle",
          "body": "A **motor unit** is the fundamental functional unit of motor control: one **alpha motor neuron** plus **all the muscle fibres it innervates** through neuromuscular junctions (NMJs). When the motor neuron fires, every fibre in the unit contracts simultaneously (all-or-nothing principle).\n\n**Neural pathway from brain to muscle:**\n1. Descending corticospinal tract — voluntary motor commands from motor cortex\n2. Spinal cord integration — inputs converge at the alpha motor neuron\n3. Proprioceptive feedback — muscle spindles (Group Ia/Ib) report length and tension\n4. Renshaw cell inhibition — recurrent inhibition prevents over-excitation\n5. Neuromuscular junction — action potential triggers muscle contraction\n\n**Why this matters for neural interfacing:**\n\n| Disease | What breaks | Effect |\n|---------|-------------|--------|\n| ALS (e.g., Stephen Hawking) | Alpha motor neurons die | Paralysis with intact cognition |\n| Spinal cord injury (e.g., Christopher Reeve) | Descending drive is severed | Motor neurons intact but unreachable |\n| Peripheral neuropathy | NMJ or axon damaged | Partial or full denervation |\n\nRecording and decoding the electrical signals produced by motor units is the core technical challenge this course addresses."
        },
        {
          "heading": "Motor Unit Recruitment and Rate Coding — Two Mechanisms of Force Grading",
          "body": "The nervous system has two complementary strategies for controlling muscle force:\n\n**1. Recruitment** — activate more motor units as force demand increases. Each unit has a **recruitment threshold** — the minimum descending drive needed to bring it to firing. Small units (slow, fatigue-resistant, Type I fibres) are recruited first (Henneman's Size Principle); large units (fast, fatigable, Type II fibres) are recruited last.\n\n**2. Rate coding** — increase the **discharge rate** of already-active units. Once recruited, a motor unit fires at 8–40 pulses per second (pps). Higher firing rates produce stronger contractions (summation of twitches → tetanus).\n\n**Experimental observation (ankle dorsiflexors at 35% MVC):**\n- ~20–25 active motor units\n- Discharge rates: 10–30 pps\n- Cumulative spike count (smoothed with a Hanning kernel) tracks the force profile\n\n```python\n# Convert smoothed cumulative spike count to force estimate\ncum_spikes = np.cumsum(np.convolve(spike_train, hann_kernel, mode='same'))\n```\n\nUnderstanding recruitment + rate coding is essential for interpreting EMG amplitude: a stronger EMG burst can mean more units recruited, faster firing, or both."
        },
        {
          "heading": "Historical Foundations — du Bois-Reymond and Differential Recording",
          "body": "The electrical nature of nerve and muscle has been understood since the 19th century:\n\n- **Emil du Bois-Reymond (1818–1896):** First demonstrated that nerves and muscles carry electrical currents using a galvanometer-based *multiplicator* (a sensitive electromagnetic device). He showed that injured tissue is electrically negative compared to intact tissue — the first measurement of a bioelectric signal.\n\n**Modern surface EMG — differential recording:**\n\nTwo electrodes are placed on the skin over the muscle, typically 20 mm apart along the muscle fibre direction. The amplifier measures the **voltage difference** between the two electrodes:\n\n$$V_{EMG} = V_{electrode1} - V_{electrode2}$$\n\nThis is **differential recording** — it rejects **common-mode noise**:\n- Powerline interference (50 Hz) couples equally into both electrodes (same amplitude, same phase)\n- Subtracting them cancels the interference\n- The MUAP signal is spatially localised — it appears with opposite polarity at the two electrodes → subtraction *adds* the signal components\n\n**CMRR (Common-Mode Rejection Ratio):** A measure of how well the differential amplifier rejects common-mode noise. High-quality EMG amplifiers have CMRR > 100 dB."
        },
        {
          "heading": "EMG Signal Generation — Action Potentials and the MUAP",
          "body": "When an alpha motor neuron fires, the action potential (AP) propagates along the motor axon and simultaneously into every innervated muscle fibre. Along each fibre:\n\n1. AP travels away from the **innervation zone** (NMJ) toward the **terminal zones** at both ends of the fibre\n2. Conduction velocity ≈ **3–5 m/s** (proportional to fibre diameter)\n3. The depolarisation front creates an extracellular **source-sink** current field\n4. Surface electrodes detect this field as a biphasic or triphasic waveform\n\nThis waveform — the electrical signature of one motor unit firing once — is the **Motor Unit Action Potential (MUAP)**.\n\n**From MUAP to raw EMG:**\n\n$$EMG(t) = \\sum_{k=1}^{K} \\sum_{j} MUAP_k(t - t_{k,j}) + noise$$\n\nRaw surface EMG is the **algebraic summation** of all MUAPs from all K active motor units, each firing at its own times `t_{k,j}`. Because the firing is asynchronous and the MUAPs partially overlap, the result appears as a noisy, fluctuating waveform — the characteristic 'fuzzy caterpillar' of sEMG."
        },
        {
          "heading": "Live Code Walkthrough — EMG Handshake (MATLAB and Python)",
          "body": "The `live_coding.m` and `emg_handshake.py` scripts load a 32-channel surface EMG recording of a rest-to-handshake-to-high-intensity movement sequence, convert the raw ADC integers to millivolts, and plot all 32 channels offset vertically.\n\n**MATLAB (`live_coding.m`):**\n```matlab\nclear, clc, clearvars\nload('Default_Recording_20260527_103637311222_rest_handshake_slow_to_high.mat')\n\nconversion_factor = 0.0002861;  % ADC units -> mV\nemg = emg(1:32, :) * conversion_factor;\nfs = 2000;\nt = (0:size(emg,2)-1) / fs;\n\nfigure, hold on\ndist = 1;\nfor channels = 1:size(emg,1)\n    plot(t, emg(channels,:) + dist)\n    dist = dist + 1;\nend\nxlabel('Time (ms)'); ylabel('EMG (mV)')\n```\n\n**Python equivalent (`emg_handshake.py`):**\n```python\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom scipy.io import loadmat\n\ndata = loadmat('Default_Recording_20260527_103637311222_rest_handshake_slow_to_high.mat')\nconversion_factor = 0.0002861   # ADC integers -> mV\nemg = data['emg'][:32, :] * conversion_factor  # shape (32, T)\nfs = 2000\nt = np.arange(emg.shape[1]) / fs\n\nfor ch in range(emg.shape[0]):\n    plt.plot(t, emg[ch, :] + ch + 1)\nplt.xlabel('Time (ms)'); plt.ylabel('EMG (mV)'); plt.show()\n```\n\n**Key facts:** Conversion factor `0.0002861` maps raw 16-bit ADC integers to millivolts (calibrated for the specific hardware amplifier gain). `fs = 2000 Hz`. 32 channels recorded simultaneously from a forearm electrode grid. Both repos: [Applied-Programming-2026](https://github.com/NsquaredLab/Applied-Programming-2026) · [MyoGestic](https://github.com/NsquaredLab/MyoGestic)."
        },
        {
          "heading": "EMG Envelope — Rectification and Smoothing",
          "body": "The raw EMG waveform fluctuates symmetrically around zero (positive and negative half-cycles). To extract the **amplitude envelope** — a slow-varying signal tracking how intensely the muscle is contracting — two steps are required:\n\n**Step 1 — Full-wave rectification:** Take the absolute value to flip all negative values positive.\n$$EMG_{rect}(t) = |EMG(t)|$$\n\n**Step 2 — Smoothing:** Convolve the rectified signal with a moving-average kernel to remove the rapid carrier-frequency fluctuations.\n\nThis is exactly the convolution-with-kernel operation from Lecture 3 applied to a biological signal.\n\n**MATLAB:**\n```matlab\nEMG_rect = abs(EMG(1,:));\nplot(smooth(EMG_rect, 1000))   % smooth over 1000 samples = 500 ms\n```\n\n**Python (`emg_handshake.py`, adapted):**\n```python\nEMG_rect = np.abs(emg[0, :])          # rectify channel 0\nwindow = 1000                           # 500 ms at fs=2000 Hz\nsmoothed = np.convolve(EMG_rect, np.ones(window) / window, mode='same')\nplt.plot(smoothed); plt.show()\n```\n\nThe resulting envelope follows the contraction profile: flat during rest, rising during the handshake, rising further during maximum grip. It is the basis for force estimation and gesture segmentation."
        },
        {
          "heading": "EMG Filtering Pipeline — From Raw to Clean Signal",
          "body": "Before any analysis or ML classification, raw EMG must be cleaned with a standard three-stage filter pipeline (from `emg_filtering_demo.m`):\n\n| Stage | Filter type | Cutoff / Target | Purpose |\n|-------|-------------|----------------|--------|\n| 1 | High-pass | 20 Hz | Remove slow motion artifact drift |\n| 2 | Low-pass | 450 Hz | Remove high-frequency electronic noise |\n| 1+2 | Band-pass | 20–450 Hz | Stages 1+2 combined in one filter |\n| 3 | Notch | 50 Hz | Remove European powerline interference |\n\n**Always use `filtfilt` (zero-phase):** applies the filter forward, then backward. Net result: zero phase distortion (timing relationships preserved). `lfilter` applies the filter in one direction only → phase delay that shifts peaks in time.\n\n**Python full pipeline:**\n```python\nfrom scipy.signal import butter, filtfilt, iirnotch\n\nfs = 2000\n# Stage 1+2: Band-pass 20-450 Hz\nb_bp, a_bp = butter(4, [20, 450], btype='bandpass', fs=fs)\nemg_bp = filtfilt(b_bp, a_bp, emg)\n\n# Stage 3: Notch at 50 Hz\nwo = 50 / (fs / 2)          # normalised frequency (0-1, Nyquist=1)\nb_n, a_n = iirnotch(wo, Q=30)\nemg_clean = filtfilt(b_n, a_n, emg_bp)\n```\n\n**MATLAB equivalent (from `emg_filtering_demo.m` block 8):**\n```matlab\n[b_bp, a_bp] = butter(4, [20 450]/(fs/2), 'bandpass');\n[b_n, a_n] = iirnotch(50/(fs/2), (50/(fs/2))/30);\nemg_clean = filtfilt(b_bp, a_bp, emg);\nemg_clean = filtfilt(b_n, a_n, emg_clean);\n```"
        },
        {
          "heading": "MyoGestic and the Applied Programming Ecosystem",
          "body": "[MyoGestic](https://github.com/NsquaredLab/MyoGestic) is the n-squared lab's open-source Python framework for real-time biosignal experiments. It serves as the software backbone for the gesture-decoding demonstrations in the course.\n\n**What MyoGestic provides:**\n- **Live LSL ingest** — reads streaming biosignals from any Lab Streaming Layer source (compatible with most research-grade EEG/EMG hardware)\n- **On-disk recording** — saves sessions in Zarr format for offline analysis and ML training\n- **ML pipeline lifecycle** — training and prediction run on separate threads so the GUI stays responsive\n- **Dear ImGui widgets** — lightweight, immediate-mode GUI for real-time visualisation with minimal overhead\n\n**What you must bring yourself:**\n- DSP algorithms (SciPy filters, Welch PSD)\n- ML models (scikit-learn, PyTorch, etc.)\n- Feature extraction logic\n\n> This modularity is by design: the lab's philosophy is to provide infrastructure, not algorithms, so researchers can plug in any method.\n\n**Try the in-browser playground (no install required):** [https://nsquaredlab.github.io/MyoGestic/playground/](https://nsquaredlab.github.io/MyoGestic/playground/)\n\n**Exercise repository for this course:** [https://github.com/NsquaredLab/Applied-Programming-2026](https://github.com/NsquaredLab/Applied-Programming-2026)\n\nThe exercises walk through the full pipeline: load a `.mat` file → convert ADC units → band-pass + notch filter → extract RMS envelope → train a classifier → predict gesture labels in real time via MyoGestic."
        }
      ],
      "questions": [
        {
          "id": "L5Q1",
          "text": "Which statement correctly defines a motor unit?",
          "options": [
            "A group of alpha motor neurons that collectively innervate one muscle",
            "One alpha motor neuron and all the muscle fibres it innervates",
            "A single muscle fibre and its neuromuscular junction",
            "A synapse between the spinal cord and a peripheral nerve"
          ],
          "correct": [1],
          "explanation": "A motor unit = one alpha motor neuron + all the muscle fibres it innervates via neuromuscular junctions. When the motor neuron fires, every fibre in the unit contracts simultaneously (all-or-nothing). Option A reverses the relationship — it is one neuron to many fibres, not many neurons to one muscle. Option C describes only one fibre + one NMJ — that is part of a motor unit, not the whole unit. Option D describes a synapse, not a motor unit — the NMJ is the synapse between motor neuron and muscle, not between spinal cord and peripheral nerve.",
          "type": "single"
        },
        {
          "id": "L5Q2",
          "text": "EMG signals arise from which source?",
          "options": [
            "Extracellular current fields generated by action potentials propagating along muscle fibres",
            "Motor neuron firing in the spinal cord, detected transcutaneously",
            "Brain activity from the motor cortex propagating to the skin surface",
            "Mechanical vibration of muscle fibres causing piezoelectric potentials"
          ],
          "correct": [0],
          "explanation": "Surface EMG records the extracellular voltage field produced by the depolarisation wavefront propagating along muscle fibres. When a motor neuron fires, the action potential travels along each innervated fibre from the innervation zone (NMJ) toward the fibre ends at 3–5 m/s. This moving depolarisation zone creates extracellular source-sink currents that are detectable at the skin surface as the MUAP. Option B is wrong: spinal motor neuron firing cannot be detected at the skin surface — it is too deep and too small. Option C is wrong: cortical signals require EEG, not surface EMG. Option D is wrong: EMG is electrical, not mechanical/piezoelectric.",
          "type": "single"
        },
        {
          "id": "L5Q3",
          "text": "In the live-coding demo, the line `emg = data['emg'][:32, :] * 0.0002861` is used. What does multiplying by 0.0002861 accomplish?",
          "options": [
            "Normalises the signal to the range [0, 1] for ML input",
            "Converts raw ADC integer values to millivolts (mV)",
            "Applies a digital gain-correction filter to remove amplifier noise",
            "Scales the EMG amplitude to Newtons of muscle force"
          ],
          "correct": [1],
          "explanation": "The `0.0002861` is the **conversion factor** specific to the recording hardware — it maps the raw 16-bit ADC integer values (which reflect the amplifier's internal gain and ADC range) to physically meaningful millivolt values. Without this conversion, the numbers are arbitrary integers that cannot be compared across sessions or hardware setups. Option A (normalisation to [0,1]) would require dividing by the maximum, which this constant does not do. Option C (digital filter) involves convolution/frequency-domain operations, not a scalar multiplication. Option D (scaling to Newtons) is not a linear conversion from EMG voltage — force estimation requires additional modelling.",
          "type": "single"
        },
        {
          "id": "L5Q4",
          "text": "Why should `filtfilt` be used instead of `lfilter` for EMG filtering?",
          "options": [
            "filtfilt is faster because it processes the signal in one pass",
            "filtfilt applies the filter forward and backward, producing zero phase shift and preserving timing relationships",
            "lfilter can only handle integer input, while filtfilt accepts floats",
            "filtfilt automatically selects the optimal filter order based on signal length"
          ],
          "correct": [1],
          "explanation": "`filtfilt` applies the digital filter twice: once forward in time, then once backward. The two phase shifts cancel exactly, yielding **zero net phase distortion**. This means peaks, onsets, and fine temporal features in the EMG are not shifted in time — critical when you are measuring muscle activation timing or synchronising with other signals (force, kinematics). `lfilter` applies the filter in one direction only, introducing a phase delay proportional to the filter order — a 4th-order filter at 2000 Hz introduces a delay of several milliseconds, which can corrupt synchronisation analyses. Options A, C, and D are factually incorrect: `filtfilt` is slower (two passes), both functions accept floats, and neither automatically selects filter order.",
          "type": "single"
        },
        {
          "id": "L5Q5",
          "text": "In Europe, a notch filter is applied to EMG recordings at 50 Hz. Why specifically 50 Hz?",
          "options": [
            "50 Hz is the resonant frequency of the EMG electrode-skin interface",
            "The European electrical grid operates at 50 Hz, and this frequency electromagnetically couples into electrode cables as powerline interference",
            "50 Hz is the upper boundary of slow motor unit discharge rates",
            "60 Hz interference is filtered at 50 Hz to provide a safety margin"
          ],
          "correct": [1],
          "explanation": "European (and most of Asia, Africa, Australia) electrical power distribution operates at **50 Hz**. The alternating current in mains wiring creates an oscillating electromagnetic field that induces a 50 Hz voltage in any conductor near it — including electrode cables. This appears as a sharp 50 Hz peak in the EMG power spectrum, superimposed on the biological signal. A notch filter with a high Q-factor (e.g., Q=30) removes a very narrow band centred at exactly 50 Hz while leaving surrounding EMG content intact. In North America the grid runs at 60 Hz — instruments there use a 60 Hz notch instead. Option A is wrong: electrode impedance has a broad-spectrum effect, not a sharp resonance. Option C is wrong: 50 Hz is well within the EMG band and coincidentally overlaps with some discharge rates but is not defined by them.",
          "type": "single"
        },
        {
          "id": "L5Q6",
          "text": "Select ALL mechanisms the nervous system uses to grade muscle force.",
          "options": [
            "Motor unit recruitment — activating additional motor units as force demand increases",
            "Rate coding — increasing the discharge rate of already-active motor units",
            "Fibre type switching — converting Type I to Type II fibres during high-force tasks",
            "Electrode impedance reduction — lowering skin resistance to amplify EMG"
          ],
          "correct": [0, 1],
          "explanation": "The two physiological mechanisms of force grading are: (1) **Recruitment** — the nervous system progressively activates more motor units following Henneman's Size Principle (small, slow, fatigue-resistant units first; large, fast units last). (2) **Rate coding** — increasing the firing rate of already-active units from ~8 pps (minimal) to ~40 pps (near-tetanic), which increases force via twitch summation. Option C is wrong: fibre type composition is a long-term adaptation (weeks of training), not an acute force-grading mechanism — you cannot switch fibre types in real time. Option D is wrong: electrode impedance is an instrumental measurement property, not a physiological force-grading mechanism at all.",
          "type": "multiple"
        }
      ],
      "flashcards": [
        {
          "front": "Motor unit definition — what is it?",
          "back": "One alpha motor neuron + all the muscle fibres it innervates via neuromuscular junctions. All fibres in the unit contract simultaneously when the neuron fires (all-or-nothing). The motor unit is the smallest independently controllable unit of muscle force."
        },
        {
          "front": "Two mechanisms of force grading in muscle — name and describe each.",
          "back": "1. **Recruitment** — activate more motor units as force demand rises; small (Type I, slow) units recruited first (Henneman's Size Principle).\n2. **Rate coding** — increase discharge rate of already-active units from ~8 to ~40 pps; higher rate → twitch summation → greater force.\nBoth mechanisms operate simultaneously."
        },
        {
          "front": "MUAP: what is it and how does raw surface EMG relate to it?",
          "back": "MUAP = Motor Unit Action Potential. The voltage waveform recorded at the skin surface when one motor unit fires once — produced by the propagating depolarisation along muscle fibres (velocity 3–5 m/s). Raw surface EMG = algebraic sum of all MUAPs from all active motor units firing asynchronously: EMG(t) = Σ Σ MUAP_k(t − t_{k,j}) + noise."
        },
        {
          "front": "EMG conversion factor 0.0002861 — what does it convert?",
          "back": "Maps raw 16-bit ADC integer values (from the recording hardware) to millivolts (mV). It encodes the hardware amplifier gain and ADC voltage range. Applied as: `emg_mV = emg_ADC * 0.0002861`. Without this, values are arbitrary integers with no physical meaning."
        },
        {
          "front": "Standard EMG filter pipeline — stages and SciPy idiom.",
          "back": "1. Band-pass 20–450 Hz (high-pass removes motion artifact; low-pass removes HF noise).\n2. Notch 50 Hz (removes European powerline interference).\n```python\nb_bp, a_bp = butter(4, [20, 450], btype='bandpass', fs=2000)\nemg_bp = filtfilt(b_bp, a_bp, emg)\nb_n, a_n = iirnotch(50/1000, Q=30)\nemg_clean = filtfilt(b_n, a_n, emg_bp)\n```"
        },
        {
          "front": "filtfilt vs lfilter — which to use and why?",
          "back": "`filtfilt`: applies the filter forward then backward → zero net phase shift → peaks and onsets are not shifted in time. Use for all EMG analyses where timing matters.\n`lfilter`: single forward pass → introduces phase delay (several ms for order-4 filter at 2 kHz) → distorts temporal relationships. Only acceptable for real-time (causal) processing where filtfilt is impossible."
        },
        {
          "front": "What does MyoGestic provide vs what must the user bring?",
          "back": "MyoGestic provides: live LSL biosignal ingest, Zarr on-disk recording, ML lifecycle management (train/predict threads), Dear ImGui visualisation widgets.\nUser must bring: DSP algorithms (SciPy filters), ML models (scikit-learn / PyTorch), feature extraction logic.\nRepo: https://github.com/NsquaredLab/MyoGestic"
        },
        {
          "front": "EMG envelope: two steps — what are they and why?",
          "back": "1. **Full-wave rectification** — `EMG_rect = abs(EMG)` — flips negative half-cycles to positive so they contribute to the amplitude estimate rather than cancelling positive cycles.\n2. **Smoothing** — convolve rectified signal with a moving-average or Hanning kernel (e.g., window=1000 samples = 500 ms at 2 kHz) — removes rapid carrier-frequency fluctuations to reveal the slow contraction envelope."
        }
      ]
    }
  ]
}
