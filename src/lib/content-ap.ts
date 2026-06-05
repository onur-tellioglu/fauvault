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
    }
  ]
}
