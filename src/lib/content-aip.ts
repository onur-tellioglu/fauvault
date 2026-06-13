// AUTO-GENERATED — run: npm run generate-content
import type { Content } from './types'
export const content: Content = {
  "lectures": [
    {
      "id": 1,
      "title": "Introduction",
      "speaker": "Castellini",
      "concepts": [
        {
          "heading": "Key Facts to Memorize",
          "body": "- Exam format: **90 minutes**, written, **2-3 questions per presentation slot**\n- Lecturer: **Prof. Dr. Claudio Castellini** (AIROB Lab, AIBE Department, FAU)\n- AI at FAU started: **1975** (Prof. Heinrich Niemann, pattern recognition & ML)\n- AIBE Department founded: **2020**\n- Bavarian AI network has **4 nodes**: Health, Intelligent Robotics, Data Science, Mobility"
        }
      ],
      "questions": [
        {
          "id": "L1Q1",
          "conceptIndex": 0,
          "text": "Which of the following facts about the AI Perspectives course and FAU AI are correct? Select ALL that apply.",
          "options": [
            "The exam lasts 90 minutes",
            "There are approximately 2–3 questions per presentation slot",
            "AI at FAU started in 1975 with Prof. Heinrich Niemann",
            "The AIBE Department was founded in 2010",
            "The Bavarian AI network has 4 nodes: Health, Intelligent Robotics, Data Science, Mobility"
          ],
          "correct": [
            0,
            1,
            2,
            4
          ],
          "explanation": "The exam is 90 minutes (A), there are 2–3 questions per slot (B), AI at FAU started in 1975 with Prof. Heinrich Niemann (C), the Bavarian AI network has 4 nodes (E). The AIBE Department was founded in 2020, not 2010 (D is wrong).",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 2,
      "title": "Medical Robotics: Connecting Man and Machine",
      "speaker": "Castellini",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Medical Robotics categories:**\n\n- Exoskeletons (walking support)\n- Prosthetics (replacement limbs)\n- Surgical robots\n- Care robots\n- Rehabilitation devices\n\n**Medical Robotics = unusual combination of:**\nmechatronics + medicine + psychology + mathematics + neuroscience + smart materials\n\n**Why prosthetics is uniquely challenging:**\n\n- Must be nearly permanent\n- Must be totally body-compatible\n- Can only work using body signals (e.g., EMG)\n- An error can lead to trauma/accident → **reliability is the main issue**\n\n**Co-adaptation (core concept):**\n\n- The device learns from the user _while_ the user learns to use the device\n- Both sides adapt to each other simultaneously\n- Applies to all medical robots:\n  - Surgical robots → adapt to surgeon's style\n  - Walking exoskeletons → adapt to patient's desires\n  - Rehabilitation devices → adapt to patient's improving condition\n  - Prostheses → learn to understand amputee's signals\n\n**Brain plasticity in prosthetics:**\n\n- The brain's ability to (re-)learn is exploited\n- User is not just a customer — they are a **teacher** for the robot AND a **learner** taught by the robot\n\n**Improving data quality (3 directions):**\n\n1. Bring the user in from the start (user as data source)\n2. Improve sensors: high-density, multi-modal, wearable/wireless/unobtrusive\n3. Improve interaction: interactive ML + interactive human learning"
        }
      ],
      "questions": [
        {
          "id": "L2Q1",
          "conceptIndex": 0,
          "text": "Which of the following is NOT listed as a category of medical robotics?",
          "options": [
            "Exoskeletons",
            "Care robots",
            "Diagnostic imaging systems",
            "Surgical robots"
          ],
          "correct": [
            2
          ],
          "explanation": "Diagnostic imaging systems are not listed as a medical robotics category. The 5 categories from the lecture: exoskeletons, prosthetics, surgical robots, care robots, and rehabilitation devices.",
          "type": "single"
        },
        {
          "id": "L2Q2",
          "conceptIndex": 0,
          "text": "In the context of medical robotics, what does \"co-adaptation\" mean?",
          "options": [
            "Two robots working together on the same patient",
            "The device and user simultaneously adapting to each other over time",
            "A surgeon adapting their technique to a new operating room",
            "The process of calibrating a prosthetic limb before first use"
          ],
          "correct": [
            1
          ],
          "explanation": "Co-adaptation means the device learns from the user while the user learns to use the device. Both sides adapt to each other over time.",
          "type": "single"
        },
        {
          "id": "L2Q3",
          "conceptIndex": 0,
          "text": "According to Castellini, what is the MAIN challenge specific to prosthetics compared to other medical robots?",
          "options": [
            "High computational requirements",
            "Lack of sensors",
            "Reliability, because errors can lead to trauma and accidents",
            "The prosthesis cannot be connected to the nervous system"
          ],
          "correct": [
            2
          ],
          "explanation": "Prosthetics must be nearly permanent, fully body-compatible, and can only work with body signals. Error tolerance is extremely low; a single mistake can cause trauma.",
          "type": "single"
        },
        {
          "id": "L2Q4",
          "conceptIndex": 0,
          "text": "Which of the following best describes the role of the user in Castellini's view of prosthetics development?",
          "options": [
            "A passive recipient of technology",
            "Primarily a test subject for clinical trials",
            "Both a teacher for the medical robot and a learner taught by it",
            "Responsible for programming the device's AI"
          ],
          "correct": [
            2
          ],
          "explanation": "The user is both a teacher for the robot and a learner taught by it. This dual role is the foundation of the co-adaptation paradigm.",
          "type": "single"
        },
        {
          "id": "L2Q5",
          "conceptIndex": 0,
          "text": "Medical robotics is described as \"an unusual combination.\" Which field is NOT explicitly mentioned as part of this combination?",
          "options": [
            "Psychology",
            "Neuroscience",
            "Economics",
            "Smart materials"
          ],
          "correct": [
            2
          ],
          "explanation": "The fields listed in the lecture: mechatronics, medicine, psychology, mathematics, neuroscience, and smart materials. Economics is not on this list.",
          "type": "single"
        },
        {
          "id": "L2Q6",
          "conceptIndex": 0,
          "text": "What type of sensors does Castellini emphasize for improving data quality in medical robotics?",
          "options": [
            "Implantable, high-power, stationary sensors",
            "High-density, multi-modal, wearable, wireless, and unobtrusive sensors",
            "Single-channel EEG sensors",
            "Camera-based computer vision systems only"
          ],
          "correct": [
            1
          ],
          "explanation": "Sensor properties emphasized for improving data quality: high-density, multi-modal, wearable, wireless, and unobtrusive.",
          "type": "single"
        },
        {
          "id": "L2Q7",
          "conceptIndex": 0,
          "text": "Which of the following are listed as categories of medical robotics? Select ALL that apply.",
          "options": [
            "Exoskeletons",
            "Diagnostic imaging systems",
            "Prosthetics",
            "Care robots",
            "Surgical robots",
            "Rehabilitation devices"
          ],
          "correct": [
            0,
            2,
            3,
            4,
            5
          ],
          "explanation": "The 5 medical robotics categories listed: exoskeletons, prosthetics, care robots, surgical robots, and rehabilitation devices. Diagnostic imaging systems (B) are not in this category.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 3,
      "title": "Demystifying AI",
      "speaker": "Zanca",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**The AI hierarchy (nested, largest to smallest):**\n\n```\nArtificial Intelligence (1955) ⊃ Machine Learning (1980) ⊃ Deep Learning (2010) ⊃ Foundation Models (2017)\n```\n\n- **AI (1955):** Imitate intelligent behaviour in computers\n- **ML (1980):** AI by learning and predicting from data\n- **DL (2010):** ML using deep neural networks\n- **Foundation Models (2017):** Generative AI based on pretrained transformers\n\n**Are LLMs intelligent? → No, not really**\n\n- High performance ≠ human-like behaviour\n- LLMs fail on adversarial inputs trivial for humans (e.g., unusual 3D viewpoints)\n- \"Error consistency\" measures whether AI and humans fail on the _same_ examples — DNNs and humans fail differently\n\n**Tool vs. Model distinction:**\n\n- **Tool:** Statistical algorithm, no claim about human behaviour (e.g., DNN for image classification)\n- **Model:** Formal representation of a scientific theory, used to explain/predict a phenomenon\n\n**Remaining challenges of current AI:**\n\n1. **Robustness and Safety** — vulnerable to adversarial attacks\n2. **Non-Generalizable Single-Purpose Design** — models trained for one task can't transfer\n\n**AI Success Stories (specific examples):**\n| System | Purpose |\n|--------|---------|\n| AlphaGo | Mastering the game of Go |\n| AlphaFold | Predicting protein 3D structures |\n| MyShake | Earthquake early warning system (smartphone network) |\n| Apple Watch ECG | Detecting atrial fibrillation & left ventricular ejection fraction |\n| Autonomous driving | Perception & path planning (e.g., Waymo) |\n\n**What AI needs: Data & Compute**\n\n- ChatGPT's success driven by growth in both data and compute\n- Europe is falling behind the US and China in AI capacity\n\n**Consciousness in AI:**\n\n- No consensus on what consciousness is — subjective and hard to measure\n- Key distinction: **intelligence ≠ consciousness**\n- Main theories: Global Workspace Theory (GWT), Integrated Information Theory (IIT), Higher-Order Theories, Panpsychism\n- Expert camps: Skeptical / Optimistic / Pragmatic / Ethical (\"better safe than sorry\")\n- Efficiency gap: **1,000 artificial neurons** needed to simulate a **single biological neuron**"
        }
      ],
      "questions": [
        {
          "id": "L3Q1",
          "conceptIndex": 0,
          "text": "In what year did the concept of \"Foundation Models\" (Generative AI based on pretrained transformers) emerge?",
          "options": [
            "1980",
            "2010",
            "2017",
            "2022"
          ],
          "correct": [
            2
          ],
          "explanation": "Timeline: AI (1955) → ML (1980) → DL (2010) → Foundation Models (2017).",
          "type": "single"
        },
        {
          "id": "L3Q2",
          "conceptIndex": 0,
          "text": "Which of the following correctly represents the relationship between AI, Machine Learning, and Deep Learning?",
          "options": [
            "They are three completely separate and unrelated fields",
            "Deep Learning is a subset of Machine Learning, which is a subset of AI",
            "Machine Learning is a broader field that contains AI",
            "Foundation Models are a subset of Deep Learning"
          ],
          "correct": [
            1
          ],
          "explanation": "Hierarchy: AI ⊃ ML ⊃ DL ⊃ Foundation Models. Each is a subset of the one above.",
          "type": "single"
        },
        {
          "id": "L3Q3",
          "conceptIndex": 0,
          "text": "Which AI system was specifically designed as an earthquake early warning system using smartphones?",
          "options": [
            "AlphaFold",
            "AlphaGo",
            "MyShake",
            "Wayformer"
          ],
          "correct": [
            2
          ],
          "explanation": "MyShake is an earthquake early warning system that uses smartphones as a seismic sensor network.",
          "type": "single"
        },
        {
          "id": "L3Q4",
          "conceptIndex": 0,
          "text": "What is \"Error Consistency\" in the context of comparing DNNs and humans?",
          "options": [
            "The percentage of errors a DNN makes on a test set",
            "A measure of whether AI and humans fail on the same examples",
            "The consistency of a model's output across multiple runs",
            "The rate at which a model's errors decrease during training"
          ],
          "correct": [
            1
          ],
          "explanation": "Error consistency measures whether AI and humans fail on the same examples. High performance does not mean human-like behavior.",
          "type": "single"
        },
        {
          "id": "L3Q5",
          "conceptIndex": 0,
          "text": "According to Zanca, what are the two main remaining challenges of current AI systems?",
          "options": [
            "Speed and memory usage",
            "Robustness/safety and non-generalizable single-purpose design",
            "Lack of data and lack of compute",
            "Ethical issues and regulatory barriers"
          ],
          "correct": [
            1
          ],
          "explanation": "The two main remaining challenges highlighted: (1) robustness/safety against adversarial attacks, (2) non-generalizable single-purpose design.",
          "type": "single"
        },
        {
          "id": "L3Q6",
          "conceptIndex": 0,
          "text": "What is the key distinction between a \"Tool\" and a \"Model\" in the context of AI systems?",
          "options": [
            "A tool is faster; a model is more accurate",
            "A tool makes no theoretical claim about human behaviour; a model formally represents a scientific theory",
            "A tool requires more data; a model requires less",
            "A tool is open-source; a model is proprietary"
          ],
          "correct": [
            1
          ],
          "explanation": "Tool: a statistical algorithm with no direct claim about human behavior. Model: a formal representation of a scientific theory used to explain/predict a phenomenon.",
          "type": "single"
        },
        {
          "id": "L3Q7",
          "conceptIndex": 0,
          "text": "Which statement about AI and consciousness is most consistent with Zanca's presentation?",
          "options": [
            "LLMs are definitively conscious because they produce human-like text",
            "Consciousness and intelligence are the same thing",
            "Consciousness is complex and controversial; conscious AI is theoretically possible but we may never know for sure",
            "The Integrated Information Theory has proven that current AI is not conscious"
          ],
          "correct": [
            2
          ],
          "explanation": "Consciousness is a controversial and subjective concept. Conscious AI may be possible but we cannot know for certain how to verify it.",
          "type": "single"
        },
        {
          "id": "L3Q8",
          "conceptIndex": 0,
          "text": "Approximately how many artificial neurons are needed to simulate a single biological neuron?",
          "options": [
            "10",
            "100",
            "1,000",
            "1,000,000"
          ],
          "correct": [
            2
          ],
          "explanation": "The ratio given in the lecture: 1,000 artificial neurons = 1 biological neuron. This shows how far artificial AI is from biological efficiency.",
          "type": "single"
        },
        {
          "id": "L3Q9",
          "conceptIndex": 0,
          "text": "Which of the following are listed as specific AI success stories in Zanca's lecture? Select ALL that apply.",
          "options": [
            "AlphaGo — mastering the game of Go",
            "DALL-E — image generation from text",
            "AlphaFold — predicting protein 3D structures",
            "MyShake — earthquake early warning via smartphone network",
            "Apple Watch ECG — detecting atrial fibrillation and cardiac conditions"
          ],
          "correct": [
            0,
            2,
            3,
            4
          ],
          "explanation": "AI success stories listed: AlphaGo (Go game), AlphaFold (protein structure prediction), MyShake (earthquake warning system), Apple Watch ECG (arrhythmia detection), and autonomous driving. DALL-E was not mentioned in this lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 4,
      "title": "AI in MR Image Formation",
      "speaker": "Knoll",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**The core MRI problem (3-way trade-off):**\n\n- Scan time ↔ Resolution ↔ SNR (Signal-to-Noise Ratio)\n- Long scan times → patient discomfort, motion artefacts, high cost\n\n**MRI data acquisition — k-space:**\n\n- Raw MRI data is acquired in **Fourier (k-) space**, not image space\n- Fully sampled k-space → clean image; undersampled k-space → artefacts\n- Scan acceleration = collecting fewer k-space lines (e.g., R=4 means 4× fewer measurements)\n\n**3 approaches to AI-based MRI reconstruction:**\n\n1. **Image processing based** — treat reconstruction as a denoising/post-processing problem\n2. **k-space recovery** — directly recover missing data in the frequency domain\n3. **DL iterative reconstruction** — unroll physics-based gradient descent steps into a neural network (learns T gradient descent steps end-to-end)\n\n**DL iterative reconstruction (most important approach):**\n\n- Physics (known MRI forward model) + Learning combined\n- \"Unrolled iterations mapped on neural network\"\n- Key paper: Hammernik MRM 2018\n- Result: Reconstruction network outperforms image processing (denoising) network in SSIM\n\n**fastMRI dataset (open benchmark):**\n\n- Created by NYU + Facebook Research\n- Contains: Knee (1398 cases), Brain (7002 cases), Prostate (312 cases), Breast (300 cases)\n- ~9,000 visitors/year, 961 TB downloaded/year\n\n**Key challenges & limitations of AI MRI reconstruction:**\n\n- **Hallucinations** — AI can generate anatomical structures that aren't there (dangerous in clinical setting)\n- **Out-of-domain generalization** — model trained on one scanner may fail on another\n- **Bayesian Uncertainty Estimation** — used to flag uncertain reconstructions"
        }
      ],
      "questions": [
        {
          "id": "L4Q1",
          "conceptIndex": 0,
          "text": "In MRI acquisition, what does \"k-space\" refer to?",
          "options": [
            "The physical space inside the MRI scanner",
            "The Fourier (frequency) domain where raw MRI data is collected",
            "A measure of image resolution",
            "The software used for image reconstruction"
          ],
          "correct": [
            1
          ],
          "explanation": "K-space is the Fourier (frequency) domain where raw MRI data is collected. An inverse Fourier transform is applied to convert k-space data into an image.",
          "type": "single"
        },
        {
          "id": "L4Q2",
          "conceptIndex": 0,
          "text": "What is the fundamental 3-way trade-off in MRI scanning?",
          "options": [
            "Cost, accuracy, and safety",
            "Scan time, resolution, and SNR",
            "Field strength, patient age, and scan duration",
            "Motion, contrast, and coil sensitivity"
          ],
          "correct": [
            1
          ],
          "explanation": "The fundamental MRI trade-off: Scan time ↔ Resolution ↔ Signal-to-Noise Ratio (SNR). Improving one negatively affects the others.",
          "type": "single"
        },
        {
          "id": "L4Q3",
          "conceptIndex": 0,
          "text": "Which AI-based MRI reconstruction approach works by recovering missing data directly in the frequency domain?",
          "options": [
            "Image processing based",
            "DL iterative reconstruction",
            "k-space recovery",
            "Bayesian estimation"
          ],
          "correct": [
            2
          ],
          "explanation": "K-space recovery estimates missing data directly in the frequency domain, not in image space.",
          "type": "single"
        },
        {
          "id": "L4Q4",
          "conceptIndex": 0,
          "text": "In DL iterative MRI reconstruction, what is the key innovation compared to image processing approaches?",
          "options": [
            "It uses only convolutional filters with no physics",
            "It combines known MRI physics with learned gradient descent steps in an unrolled neural network",
            "It requires fully sampled k-space data as input",
            "It replaces the MRI scanner hardware entirely"
          ],
          "correct": [
            1
          ],
          "explanation": "DL iterative reconstruction combines known MRI physics (forward model) with learned gradient descent steps and \"unrolls\" them as a neural network.",
          "type": "single"
        },
        {
          "id": "L4Q5",
          "conceptIndex": 0,
          "text": "What is a major safety concern specifically highlighted regarding AI MRI reconstruction?",
          "options": [
            "The models are too slow for clinical use",
            "AI models can \"hallucinate\" anatomical structures that do not actually exist",
            "The images are always lower quality than conventional methods",
            "AI reconstruction requires too much k-space data"
          ],
          "correct": [
            1
          ],
          "explanation": "AI reconstruction models can generate anatomical structures that do not actually exist (hallucination). This can cause serious diagnostic errors in clinical use.",
          "type": "single"
        },
        {
          "id": "L4Q6",
          "conceptIndex": 0,
          "text": "What is the primary purpose of \"Bayesian Uncertainty Estimation\" in the context of AI MRI reconstruction?",
          "options": [
            "To speed up the reconstruction process",
            "To flag regions where the AI reconstruction is uncertain or unreliable",
            "To replace the need for reference images",
            "To reduce the size of the fastMRI dataset"
          ],
          "correct": [
            1
          ],
          "explanation": "Bayesian uncertainty estimation flags regions where the model's reconstruction is uncertain. This helps clinicians understand how much to trust the AI output.",
          "type": "single"
        },
        {
          "id": "L4Q7",
          "conceptIndex": 0,
          "text": "Which of the following are AI-based MRI reconstruction approaches described by Knoll? Select ALL that apply.",
          "options": [
            "Image processing based (treat reconstruction as a denoising/post-processing problem)",
            "k-space recovery (directly recover missing data in the frequency domain)",
            "DL iterative reconstruction (unrolled physics-based gradient descent in a neural network)",
            "Bayesian sparse reconstruction (purely statistical, no physics)",
            "Template matching (compare to a database of normal scans)"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Knoll's 3 AI-based MRI reconstruction approaches: image processing based, k-space recovery, and DL iterative reconstruction. D and E are not in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 5,
      "title": "Decoding the Neural Processing of Speech",
      "speaker": "Reichenbach",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**3 aims of Sensory Neuroengineering:**\n\n1. Understand the neurobiology of (multi-)sensing\n2. Diagnose impairments in sensory processing\n3. Restore sensory impairments\n\n**Hearing & communication disorders:**\n\n- Affect **20% of people worldwide**, more than **5% in children**\n- Progress with age → major problem in aging society\n- Types: sensorineural hearing loss, hidden hearing loss, auditory processing disorder (APD), language disorders (e.g., after stroke)\n\n**Building blocks of speech (timescales):**\n| Unit | Duration |\n|------|----------|\n| Phoneme | ~20 ms |\n| Syllable | 50–100 ms |\n| Word | 200–300 ms |\n\n**Brain oscillations & speech synchronization:**\n\n- The brain synchronizes (entrains) to the rhythm of speech\n- Measured via **EEG** (oscillatory brain activity)\n- Key bands: delta (1–4 Hz), theta (4–8 Hz), alpha (8–12 Hz)\n- Theta band → entrains to speech **envelope** (syllable-level rhythm)\n- Attentional modulation found in **delta** but NOT in theta band\n\n**Two models for decoding speech from EEG:**\n\n- **Forward model:** predict EEG from acoustic stimulus\n- **Backward model:** reconstruct speech features from EEG\n\n**What can be decoded from brain activity:**\n\n- **Clarity** (acoustic quality of speech)\n- **Comprehension** (cognitive understanding)\n- **Auditory attention** — which speaker a person is attending to (real-time)\n\n**Auditory Attention Decoding — the vision:**\n\n- Hearing aids + cochlear implants struggle in noisy environments (\"cocktail party problem\")\n- EEG can decode _which_ speaker the user is attending to\n- This enables **neurofeedback-driven hearing instruments** that amplify the attended speaker\n\n**GAN for audiovisual speech:**\n\n- A Generative Adversarial Network (GAN) generates realistic talking-face video from speech + a still image\n- Turing test result: humans **cannot differentiate** between real and synthetic videos\n- Synthetic videos improve **speech-in-noise comprehension** (but not as much as natural videos)\n\n**Vibrotactile stimulation:**\n\n- Pulses delivered to **fingertips** at the rhythm of syllables (theta rhythm)\n- Enhances speech comprehension in noise\n- EEG confirms the brain's multisensory integration of tactile + auditory signals\n\n**Summary (from slides):**\n\n- Brain waves synchronize to speech rhythms\n- Speech comprehension AND attention can be decoded from this synchronization\n- Visual and tactile signals can enhance speech comprehension in noise"
        }
      ],
      "questions": [
        {
          "id": "L5Q1",
          "conceptIndex": 0,
          "text": "What percentage of people worldwide are affected by hearing and communication disorders?",
          "options": [
            "5%",
            "10%",
            "20%",
            "35%"
          ],
          "correct": [
            2
          ],
          "explanation": "Hearing and communication disorders affect 20% of the world's population and more than 5% of children.",
          "type": "single"
        },
        {
          "id": "L5Q2",
          "conceptIndex": 0,
          "text": "Which EEG frequency band does the brain primarily use to synchronize with the syllable-level rhythm of speech?",
          "options": [
            "Delta (1–4 Hz)",
            "Theta (4–8 Hz)",
            "Alpha (8–12 Hz)",
            "Gamma (30–100 Hz)"
          ],
          "correct": [
            1
          ],
          "explanation": "The theta band (4–8 Hz) synchronizes with the syllable-level rhythm of speech.",
          "type": "single"
        },
        {
          "id": "L5Q3",
          "conceptIndex": 0,
          "text": "In Reichenbach's framework, what is the difference between decoding \"clarity\" and \"comprehension\" from EEG?",
          "options": [
            "Clarity refers to the volume, comprehension refers to the language",
            "Clarity reflects acoustic/physical quality of speech; comprehension reflects cognitive understanding",
            "They are identical measures captured by different electrodes",
            "Clarity is decoded using theta band; comprehension uses delta band only"
          ],
          "correct": [
            1
          ],
          "explanation": "Clarity reflects acoustic/physical quality; comprehension reflects cognitive understanding. Both can be decoded separately from EEG.",
          "type": "single"
        },
        {
          "id": "L5Q4",
          "conceptIndex": 0,
          "text": "What is the ultimate clinical application of \"auditory attention decoding\" from EEG?",
          "options": [
            "Replacing cochlear implants entirely with brain implants",
            "Enabling hearing instruments that automatically amplify the speaker the user is mentally attending to",
            "Diagnosing hearing loss without audiometry",
            "Training patients to control their brain oscillations voluntarily"
          ],
          "correct": [
            1
          ],
          "explanation": "By decoding which speaker the listener is attending to from EEG, hearing aids can automatically amplify that speaker.",
          "type": "single"
        },
        {
          "id": "L5Q5",
          "conceptIndex": 0,
          "text": "A GAN (Generative Adversarial Network) was used by Reichenbach's group to generate talking-face videos. What was a key finding from the Turing test conducted on these videos?",
          "options": [
            "Participants easily identified the synthetic videos",
            "Humans could not differentiate between real and synthetic talking-face videos",
            "The synthetic videos reduced speech comprehension in noise",
            "The GAN required 10 minutes of video training data per speaker"
          ],
          "correct": [
            1
          ],
          "explanation": "Turing test result: humans could not distinguish between real and synthetic talking-face videos.",
          "type": "single"
        },
        {
          "id": "L5Q6",
          "conceptIndex": 0,
          "text": "Which sensory modality, beyond hearing and vision, was shown to enhance speech-in-noise comprehension in Reichenbach's research?",
          "options": [
            "Olfaction (smell)",
            "Proprioception",
            "Vibrotactile stimulation (touch, delivered to fingertips)",
            "Vestibular stimulation"
          ],
          "correct": [
            2
          ],
          "explanation": "Applying vibrotactile stimulation synchronized with syllable rhythm (theta) to fingertips improved speech comprehension in noisy environments.",
          "type": "single"
        },
        {
          "id": "L5Q7",
          "conceptIndex": 0,
          "text": "According to Reichenbach, which of the following can be decoded from EEG brain activity? Select ALL that apply.",
          "options": [
            "Clarity — acoustic/physical quality of the speech signal",
            "Comprehension — cognitive understanding of the speech content",
            "Auditory attention — which specific speaker the listener is attending to",
            "Speaker identity — who is the person speaking",
            "Emotional state — whether the listener is happy or sad"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Three things decodable from EEG: Clarity (acoustic quality), Comprehension (cognitive understanding), and Auditory Attention (which speaker is attended to). Speaker identity (D) and emotional state (E) are not among the decoded signals in Reichenbach's lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 6,
      "title": "Cerebrovascular Imaging & Research",
      "speaker": "Bernal",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**The brain's resource demands:**\n\n- Only **2% of body weight** but consumes a **disproportionately high share** of O2 and nutrients\n- Requires a continuous supply of blood (via arteries); waste removed via veins\n- Blood circulation serves **two roles**: (A) Delivery of O2/nutrients, (B) Clearance of waste (amyloid, tau, CO2)\n\n**Cerebral Small Vessel Disease (cSVD):**\n\n- = damage to small blood vessels in the brain\n- **5 MRI markers of cSVD:**\n  1. White matter hyperintensities\n  2. Lacunes\n  3. Microbleeds\n  4. Perivascular spaces\n  5. Atrophy\n- **Prevalence:** affects **90% of subjects in late life**, 20–50% in midlife\n- **Clinical impact:**\n  - Present in **50% of dementia cases** (incl. Alzheimer's)\n  - Primary contributor to **vascular dementia** (2nd most common dementia)\n  - Behind **80% of intracerebral haemorrhages** in late life\n  - Cause of **25% of ischaemic strokes** worldwide\n\n**Key concept: asymptomatic → tipping point → symptomatic**\n\n- cSVD damage accumulates silently (tolerable) until a tipping point → stroke or dementia (intolerable)\n- Goal: detect and intervene _before_ the tipping point\n\n**CIR Lab research focus (2 pillars):**\n\n1. **Quantification** — AI-powered tools to describe cSVD quantitatively\n2. **Modelling** — disentangle cSVD complexity; phenotyping, staging, clinical implications\n\n**Supervised vs. Unsupervised Learning (Bernal's AI intro):**\n\n- **Supervised:** find a function that maps input features → labels (e.g., classify animal species)\n- **Unsupervised:** find groups based on similarities in input features, with no labels\n\n**Domain Randomisation (key specific project):**\n\n- Problem: not enough real patient data + not enough variability → model doesn't generalize\n- Solution: **simulate your own training data** with random variations\n- Particularly useful when **shapes are somewhat consistent across subjects** (e.g., brain lesions)\n- **Advantages:** no need for real patient data or manual annotations; train with many varied images\n- **Disadvantage:** the data generation model must be realistic enough — if it's too far from real-world data, the trained model won't transfer"
        }
      ],
      "questions": [
        {
          "id": "L6Q1",
          "conceptIndex": 0,
          "text": "What proportion of body weight does the brain account for, despite its extremely high resource demands?",
          "options": [
            "5%",
            "10%",
            "2%",
            "20%"
          ],
          "correct": [
            2
          ],
          "explanation": "The brain makes up only 2% of body weight but consumes a disproportionately high amount of oxygen and nutrients.",
          "type": "single"
        },
        {
          "id": "L6Q2",
          "conceptIndex": 0,
          "text": "Which of the following is NOT listed as an MRI marker of cerebral small vessel disease (cSVD)?",
          "options": [
            "Microbleeds",
            "Lacunes",
            "Cortical thinning due to tumour growth",
            "Perivascular spaces"
          ],
          "correct": [
            2
          ],
          "explanation": "The 5 MRI markers of cSVD: white matter hyperintensities, lacunes, microbleeds, perivascular spaces, and atrophy. Tumor-related cortical thinning is not in this list.",
          "type": "single"
        },
        {
          "id": "L6Q3",
          "conceptIndex": 0,
          "text": "According to Bernal, what percentage of ischaemic strokes worldwide is caused by cSVD?",
          "options": [
            "5%",
            "10%",
            "25%",
            "50%"
          ],
          "correct": [
            2
          ],
          "explanation": "cSVD is responsible for 25% of ischemic strokes worldwide.",
          "type": "single"
        },
        {
          "id": "L6Q4",
          "conceptIndex": 0,
          "text": "What is \"domain randomisation\" in the context of medical AI?",
          "options": [
            "Randomly splitting patients into training and test groups",
            "Generating synthetic training data with randomised variations to improve model generalisability",
            "Applying random image filters to augment existing MRI scans",
            "Training a model on data from multiple MRI scanner vendors simultaneously"
          ],
          "correct": [
            1
          ],
          "explanation": "Domain randomisation is a technique for generating synthetic training data without needing real patient data. Random variations are added to help the model generalize.",
          "type": "single"
        },
        {
          "id": "L6Q5",
          "conceptIndex": 0,
          "text": "What is the main DISADVANTAGE of using domain randomisation for training medical AI models?",
          "options": [
            "It requires too much real patient data",
            "It is computationally too expensive for most hospitals",
            "The data generation model may not be realistic enough to transfer to real-world cases",
            "It only works for 3D volumetric data"
          ],
          "correct": [
            2
          ],
          "explanation": "The main disadvantage: the data generation model may not be close enough to reality. If synthetic data is not realistic, the model will not transfer to real patient data.",
          "type": "single"
        },
        {
          "id": "L6Q6",
          "conceptIndex": 0,
          "text": "What does the \"tipping point\" concept in Bernal's cSVD framework represent?",
          "options": [
            "The moment a patient is diagnosed with diabetes",
            "The point at which silent (asymptomatic) brain damage crosses into clinically detectable disease such as stroke or dementia",
            "The threshold at which MRI scanning becomes necessary",
            "The age at which cSVD risk begins to increase"
          ],
          "correct": [
            1
          ],
          "explanation": "cSVD damage accumulates silently (asymptomatically) over a long time. The tipping point is when this tolerable damage transitions into an intolerable condition such as stroke or dementia.",
          "type": "single"
        },
        {
          "id": "L6Q7",
          "conceptIndex": 0,
          "text": "Which of the following are listed as MRI markers of cerebral small vessel disease (cSVD)? Select ALL that apply.",
          "options": [
            "White matter hyperintensities",
            "Lacunes",
            "Cortical thinning from tumour growth",
            "Microbleeds",
            "Perivascular spaces",
            "Atrophy"
          ],
          "correct": [
            0,
            1,
            3,
            4,
            5
          ],
          "explanation": "The 5 MRI markers of cSVD: white matter hyperintensities, lacunes, microbleeds, perivascular spaces, and atrophy. Tumor-related cortical thinning (C) is not a cSVD marker.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 7,
      "title": "AI for 'Omics' Data",
      "speaker": "Blumenthal",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**What is a graph (network)?**\n\n- Mathematical object G = (V, E): V = nodes, E ⊆ V×V = edges\n- Attributes can be stored at both nodes and edges\n- Excellent for data where **information is encoded in connections**\n\n**Biomedical graph examples:**\n\n- Protein-Protein Interaction (PPI) networks — nodes = proteins, edges = physical binding\n- Gene regulatory networks\n- Disease-disease networks\n\n**BIONETS Lab — 3 research areas:**\n\n1. **Algorithmic network medicine** — mine omics data for molecular disease mechanisms\n2. **Robust and reproducible AI** — algorithms/standards for robust biomedical AI\n3. **Privacy-preserving federated biomedical AI** — decentralized AI for cross-institutional studies on sensitive data\n\n**The core problem with PPI prediction benchmarks:**\n\n- Many published deep learning results are inflated due to **data leakage**\n- Naive random data splitting introduces 2 types of \"shortcuts\":\n  - **Shortcut 1 (topology-based):** model memorizes which proteins appear only in positive pairs in training → predicts \"interaction\" for all their test pairs regardless of partner\n  - **Shortcut 2 (sequence similarity):** proteins in training and test sets are too similar → model exploits similarity instead of learning true interaction rules\n\n**Data leakage (definition from Blumenthal):**\n\n> \"Performance scores for an ML-based predictor f are inflated due to data leakage if f uses illegitimate information to achieve the reported scores, that is, information in the training data that generalizes to the test data but not to the inference-time data.\"\n\n**Two intended use cases → different evaluation protocols needed:**\n| Use case | Appropriate split | Result |\n|----------|------------------|--------|\n| Proteins WITH well-characterized homologs (in-distribution) | Random splitting is fine | Deep learning works |\n| Proteins WITHOUT well-characterized homologs (out-of-distribution) | Hard split required | **No tested DL model outperforms random guessing** |\n\n**Key insight:** High accuracy scores in the literature were often due to shortcuts, not genuine learning. When hard splits are used, models drop to ~random (0.50) performance.\n\n**Solution (DataSAIL):** Algorithm for leakage-reduced data splitting + guidelines to avoid data leakage in biological ML."
        }
      ],
      "questions": [
        {
          "id": "L7Q1",
          "conceptIndex": 0,
          "text": "In graph theory, what does the notation G = (V, E) represent?",
          "options": [
            "A machine learning model with V variables and E epochs",
            "A network with V nodes and E edges connecting pairs of nodes",
            "A dataset with V vectors and E evaluations",
            "A brain scan with V voxels and E electrodes"
          ],
          "correct": [
            1
          ],
          "explanation": "In graph theory, G = (V, E): V is the set of nodes (vertices) and E is the set of edges connecting pairs of nodes.",
          "type": "single"
        },
        {
          "id": "L7Q2",
          "conceptIndex": 0,
          "text": "In Protein-Protein Interaction (PPI) networks, what do the nodes and edges represent?",
          "options": [
            "Nodes = genes, Edges = mutations",
            "Nodes = proteins, Edges = physical binding between two proteins",
            "Nodes = patients, Edges = shared diseases",
            "Nodes = drugs, Edges = metabolic pathways"
          ],
          "correct": [
            1
          ],
          "explanation": "In PPI networks, nodes represent proteins and edges represent physical interactions (binding) between two proteins.",
          "type": "single"
        },
        {
          "id": "L7Q3",
          "conceptIndex": 0,
          "text": "What is \"data leakage\" in the context of ML model evaluation according to Blumenthal?",
          "options": [
            "When training data is accidentally deleted from the server",
            "When a model uses illegitimate information from training data that does not generalize to real inference-time data, inflating performance scores",
            "When patient data is shared without consent",
            "When a model overfits to the validation set"
          ],
          "correct": [
            1
          ],
          "explanation": "Data leakage: when a model uses illegitimate information from training data that it would not have access to at test time, resulting in inflated performance estimates.",
          "type": "single"
        },
        {
          "id": "L7Q4",
          "conceptIndex": 0,
          "text": "When Blumenthal's group applied \"hard splits\" (without sequence similarity shortcuts) to PPI prediction benchmarks, what was the key finding?",
          "options": [
            "Deep learning models achieved even higher accuracy than with random splits",
            "No tested deep learning model outperformed random guessing (~0.50 accuracy)",
            "Only graph-based models maintained their performance",
            "The models needed at least 10× more training data to compensate"
          ],
          "correct": [
            1
          ],
          "explanation": "When strict data splitting was applied (without the sequence similarity shortcut), none of the tested deep learning models outperformed random prediction (~0.50).",
          "type": "single"
        },
        {
          "id": "L7Q5",
          "conceptIndex": 0,
          "text": "Which of the following is NOT one of Blumenthal's BIONETS Lab research areas?",
          "options": [
            "Algorithmic network medicine",
            "Privacy-preserving federated biomedical AI",
            "Deep reinforcement learning for drug synthesis",
            "Robust and reproducible AI"
          ],
          "correct": [
            2
          ],
          "explanation": "BIONETS' 3 research areas: algorithmic network medicine, robust and reproducible AI, and privacy-preserving federated AI. Reinforcement learning for drug synthesis is not in this list.",
          "type": "single"
        },
        {
          "id": "L7Q6",
          "conceptIndex": 0,
          "text": "For which use case is \"random data splitting\" an appropriate evaluation protocol in PPI prediction?",
          "options": [
            "Predicting interactions between proteins with no known homologs",
            "Predicting interactions between proteins with well-characterized homologs (in-distribution data)",
            "All PPI prediction tasks regardless of protein type",
            "Only when the dataset has fewer than 1,000 protein pairs"
          ],
          "correct": [
            1
          ],
          "explanation": "Random splitting is only appropriate for proteins with well-known homologs (in-distribution data). Strict splitting is required for proteins without known homologs.",
          "type": "single"
        },
        {
          "id": "L7Q7",
          "conceptIndex": 0,
          "text": "Which of the following correctly describe the TWO data leakage shortcuts found in naive PPI prediction benchmark evaluation? Select ALL that apply.",
          "options": [
            "Topology-based shortcut: the model memorizes which proteins appear only in positive pairs in training and predicts interaction for all their test pairs",
            "Sequence similarity shortcut: proteins in training and test sets are too similar, so the model exploits similarity instead of learning true interaction rules",
            "Label noise shortcut: some interaction labels in the database are incorrect",
            "Class imbalance shortcut: there are far more negative than positive interaction pairs"
          ],
          "correct": [
            0,
            1
          ],
          "explanation": "Two data leakage shortcuts: (1) topology-based (the model memorizes proteins in positive pairs) and (2) sequence similarity (training and test set proteins are too similar). C and D are not the shortcuts identified in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 8,
      "title": "Multimodal Analysis of Human Phonation",
      "speaker": "Kniesburges",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Physiology of phonation:**\n\n- **Vocal folds** = primary sound generator; ventricular folds are passive\n- Larynx serves two functions: (1) **swallowing** (3-step valve), (2) **speech/singing**\n- Fundamental frequency of voice: **f0 = 150–1500 Hz**\n- Physics of phonation = **Fluid-Structure-Acoustic Interaction (FSAI)**\n\n**Dysphonia = voice disorder:**\n\n- Symptoms: hoarseness, decreased load capacity, incomplete glottis closure, asymmetric oscillations\n- **Organic Dysphonia** (structural cause): malformation, trauma, inflammation, malignant/benign growth (e.g., polyp, squamous cell carcinoma)\n- **Functional Dysphonia** (no primary organ findings): over/incorrect loading, multiple combined causes\n\n**Clinical diagnostics of dysphonia (multimodal):**\n\n- 2D visualization: Laryngoscopy, Stroboscopy, Highspeed endoscopy\n- Acoustic signal analysis: Voice field measurement, irregularity parameters\n- Self + expert evaluation\n- ElectroGlottoGraphy (EGG)\n- **Key limitation:** in vivo examination of sound generation during phonation is NOT completely possible\n\n**Deep learning in laryngoscopy (3 tasks):**\n\n1. **Localization** of the glottis and vocal folds\n2. **Automatic segmentation** of the glottis area\n3. **Classification** of tissue type, organic disorder, etc.\n\n- BAGLES benchmark: 7 hospitals (EU + US), 640 records, 5 cameras, 59,250 images with segmentation\n\n**3 types of larynx models:**\n| Model Type | Degree of Reality | AI Support | Data Density |\n|-----------|-------------------|------------|--------------|\n| Ex vivo | Highest | Some | Medium |\n| Synthetic (silicone) | Medium | Medium | Medium |\n| Computational (CFD) | Lowest | Highest | Highest |\n\n**AI-supported CFD simulations:**\n\n- Classical CFD = extremely slow: 140 cores, 10h per cycle → 100h for 10 cycles\n- Solution: **SIREN** (Implicit Neural Representations with periodic activation functions)\n- SIREN enables: (1) increase spatial resolution, (2) increase temporal resolution, (3) future prediction of flow fields\n\n**Take-home message:** AI in biomedical science goes far beyond MRI/CT postprocessing."
        }
      ],
      "questions": [
        {
          "id": "L8Q1",
          "conceptIndex": 0,
          "text": "What is the fundamental frequency range of the human voice during phonation?",
          "options": [
            "10–100 Hz",
            "150–1500 Hz",
            "2000–8000 Hz",
            "50–200 Hz"
          ],
          "correct": [
            1
          ],
          "explanation": "The fundamental frequency range of the human voice is f0 = 150–1500 Hz.",
          "type": "single"
        },
        {
          "id": "L8Q2",
          "conceptIndex": 0,
          "text": "Which of the following best describes \"Organic Dysphonia\"?",
          "options": [
            "A voice disorder caused by incorrect vocal technique with no structural damage",
            "A voice disorder caused by structural causes such as inflammation, trauma, or tumour growth",
            "A voice disorder exclusively caused by psychological stress",
            "A temporary voice disorder caused by dehydration"
          ],
          "correct": [
            1
          ],
          "explanation": "Organic dysphonia has a structural cause (malformation, trauma, inflammation, malignant/benign growth). Functional dysphonia develops without a primary organic finding.",
          "type": "single"
        },
        {
          "id": "L8Q3",
          "conceptIndex": 0,
          "text": "What is the key limitation of clinical phonation diagnostics mentioned by Kniesburges?",
          "options": [
            "Laryngoscopes are too large to fit in the human throat",
            "In vivo examination of the sound generation process during phonation is not completely possible",
            "EEG cannot measure vocal fold vibrations",
            "Current AI cannot segment glottis images in real time"
          ],
          "correct": [
            1
          ],
          "explanation": "It is not possible to fully study the sound production process (during phonation) in vivo. This necessitates a multimodal approach.",
          "type": "single"
        },
        {
          "id": "L8Q4",
          "conceptIndex": 0,
          "text": "What are the three main tasks that deep learning performs in laryngoscopy?",
          "options": [
            "Recording, filtering, and playback",
            "Localization of the glottis, automatic segmentation of the glottis area, and classification of tissue/disorder type",
            "Patient identification, diagnosis coding, and treatment planning",
            "Frame extraction, compression, and storage"
          ],
          "correct": [
            1
          ],
          "explanation": "DL-based laryngoscopy performs three tasks: glottis localization, automatic glottis area segmentation, and tissue/disorder type classification.",
          "type": "single"
        },
        {
          "id": "L8Q5",
          "conceptIndex": 0,
          "text": "What is \"SIREN\" in the context of AI-supported CFD simulations of the larynx?",
          "options": [
            "A clinical alarm system for detecting vocal fold pathologies",
            "Implicit Neural Representations with periodic activation functions, used to accelerate and enhance CFD simulations",
            "A segmentation network for high-speed videoendoscopy",
            "A speech recognition system trained on phonation data"
          ],
          "correct": [
            1
          ],
          "explanation": "SIREN (Implicit Neural Representations with periodic activation function) is a neural network approach used to accelerate CFD simulations and improve spatial/temporal resolution.",
          "type": "single"
        },
        {
          "id": "L8Q6",
          "conceptIndex": 0,
          "text": "Comparing the three larynx model types, which has the HIGHEST degree of reality but the LOWEST data density?",
          "options": [
            "Computational (CFD) models",
            "Synthetic silicone models",
            "Ex vivo models",
            "All three have equal reality"
          ],
          "correct": [
            2
          ],
          "explanation": "Ex vivo models have the highest degree of realism, while computational (CFD) models have the highest data density.",
          "type": "single"
        },
        {
          "id": "L8Q7",
          "conceptIndex": 0,
          "text": "Which of the following are listed as clinical diagnostic methods for dysphonia (voice disorders)? Select ALL that apply.",
          "options": [
            "Laryngoscopy",
            "Stroboscopy",
            "Highspeed endoscopy",
            "ElectroGlottoGraphy (EGG)",
            "EEG (Electroencephalography)",
            "Acoustic signal analysis (voice field measurement, irregularity parameters)"
          ],
          "correct": [
            0,
            1,
            2,
            3,
            5
          ],
          "explanation": "Clinical methods used in dysphonia diagnosis: Laryngoscopy, Stroboscopy, Highspeed endoscopy, EGG (ElectroGlottoGraphy), and acoustic signal analysis. EEG (brainwave measurement) is not in this list; it should not be confused with EGG.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 9,
      "title": "Smart Medical Imaging / Fetal & Placental MRI",
      "speaker": "Hutter",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Central research question:** \"Pregnancy as a window into the future\"\n\n- Why do **8% of all pregnancies** end before the 37th week (preterm birth)?\n- Preterm birth = **single biggest cause** of neonatal mortality and morbidity; costs 3.4 billion £\n- Pre-eclampsia = **leading cause of maternal death** in the world; gives mother 8× increased cardiovascular risk\n- Preterm birth → high risk of lifelong neurodevelopmental & motoric disability\n\n**The placenta:**\n\n- Only connection between mother and baby\n- Least studied organ — also the **only transient organ** in the human body\n- Functions: O2/nutrient delivery (high O2 content via spiral arteries), waste clearance\n- In pre-eclampsia: damaged villous trees + non-remodelled spiral arteries\n\n**sMRT Lab — 4 research focuses:**\n\n1. Bespoke imaging guided by clinical questions\n2. Sensor control & real-time AI\n3. Dedicated analysis & individualized prediction\n4. Translation & prospective clinical studies\n\n**T2\\* mapping for placental oxygenation:**\n\n- Oxygenated vs. deoxygenated haemoglobin have different T2\\* relaxation times\n- Acquisition at multiple echo times (TE) → monoexponential fitting\n- Long T2* → high O2 content; Short T2* → low O2 content\n- Pre-eclamptic placentas show significantly lower T2\\* values\n\n**Key imaging challenges in pregnancy:**\n\n- Motion (fetal movement, contractions)\n- Size/distance\n- Safety limitations for in-utero imaging\n- Artifacts\n- Complex dynamic events\n\n**Motion correction in fetal MRI:**\n\n- \"Snapshot\" 2D sequences (<200 ms) freeze motion in individual slices\n- Multiple stacks acquired in several directions\n- **3D reconstruction using Super-Resolution + Deep Learning**\n\n**Preterm birth prediction model:**\n\n- Combines: placental T2*, brain T2*, US UtA PI value, previous preterm birth history\n- Processing time reduced from several hours to **10 minutes** (with AI)\n- Achieves R² > 0.7, RMSE < 2 weeks gestational age"
        }
      ],
      "questions": [
        {
          "id": "L9Q1",
          "conceptIndex": 0,
          "text": "According to Hutter, what percentage of all pregnancies end before the 37th week?",
          "options": [
            "2%",
            "5%",
            "8%",
            "15%"
          ],
          "correct": [
            2
          ],
          "explanation": "8% of all pregnancies end before 37 weeks (preterm). This is the single largest cause of neonatal mortality and morbidity.",
          "type": "single"
        },
        {
          "id": "L9Q2",
          "conceptIndex": 0,
          "text": "What is unique about the placenta as an organ?",
          "options": [
            "It is the only organ that produces hormones",
            "It is the only organ that can regenerate after damage",
            "It is the only transient organ in the human body and the only connection between mother and baby",
            "It is the smallest organ in the human body"
          ],
          "correct": [
            2
          ],
          "explanation": "The placenta is the only transient organ in the human body and the only connection between mother and baby. It is also the least studied organ.",
          "type": "single"
        },
        {
          "id": "L9Q3",
          "conceptIndex": 0,
          "text": "In T2* mapping of the placenta, what does a LONG T2* value indicate?",
          "options": [
            "Low oxygen content",
            "High oxygen content",
            "High iron concentration",
            "Fetal distress"
          ],
          "correct": [
            1
          ],
          "explanation": "A long T2* value indicates high oxygen content. A short T2* indicates low oxygenation (as seen in pre-eclamptic placentas).",
          "type": "single"
        },
        {
          "id": "L9Q4",
          "conceptIndex": 0,
          "text": "What is the main strategy used to correct for fetal motion in MRI?",
          "options": [
            "Sedating the fetus before scanning",
            "Acquiring a single long 3D sequence and averaging",
            "Using fast 2D \"snapshot\" sequences plus acquiring multiple stacks in different directions, then applying 3D super-resolution reconstruction with deep learning",
            "Using ultrasound simultaneously to predict fetal position"
          ],
          "correct": [
            2
          ],
          "explanation": "Solution for fetal motion: fast 2D \"snapshot\" sequences of <200 ms + multi-directional stack acquisition + deep learning-based 3D super-resolution reconstruction.",
          "type": "single"
        },
        {
          "id": "L9Q5",
          "conceptIndex": 0,
          "text": "Which combination of biomarkers was identified as most important for preterm birth prediction in Hutter's model?",
          "options": [
            "Maternal age, weight, and blood pressure",
            "Placental T2*, brain T2*, ultrasound uterine artery pulsatility index (UtA PI), and previous preterm birth",
            "Fetal heart rate, amniotic fluid volume, and cervical length",
            "Placental size, maternal cortisol levels, and fetal weight"
          ],
          "correct": [
            1
          ],
          "explanation": "The most important biomarkers for predicting preterm birth: placental T2*, brain T2*, US uterine artery pulsatility index (UtA PI), and previous preterm birth history.",
          "type": "single"
        },
        {
          "id": "L9Q6",
          "conceptIndex": 0,
          "text": "Which of the following are listed as key imaging challenges specific to fetal and placental MRI? Select ALL that apply.",
          "options": [
            "Motion (fetal movement and uterine contractions)",
            "Safety limitations for in-utero imaging",
            "Size and distance of the target organ",
            "Very high cost of MRI compared to ultrasound",
            "Artifacts",
            "Complex dynamic events during pregnancy"
          ],
          "correct": [
            0,
            1,
            2,
            4,
            5
          ],
          "explanation": "Fetal MRI challenges: motion (A), safety constraints (B), size/distance (C), artefacts (E), and complex dynamic events (F). Cost (D) is not specifically highlighted as a challenge in Hutter's lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 10,
      "title": "Mathematics & Machine Learning",
      "speaker": "Fantuzzi",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**2 main research topics:**\n\n1. **Learning mathematical models for dynamics from data**\n2. **Mathematical analysis of Transformers**\n\n**Dynamical system (formal definition):**\n\n- A pair (X, f) where X is a **vector space** (state space) and f: X → X is a **function**\n- State space X = all possible states the system can be in\n- Function f = maps current state to **next state**\n- Problem: learning from noisy data alone → predictions must NOT escape to infinity\n\n**Absorbing sets / Trapping regions:**\n\n- A subset of the state space that every model simulation will **eventually enter and never leave**\n- Fantuzzi's lab learns polynomial velocity vectors with **guaranteed absorbing sets**\n- Ensures physical plausibility of learned dynamical models\n\n**Transformers — mathematical view:**\n\n- GPT = **G**enerative **P**re-trained **T**ransformer\n- A transformer is a **function** mapping finite subsets of ℝᵈ → finite subsets of ℝᵈ\n- Built by composing 3 types of layers:\n  1. **Feed-Forward layers** (multi-layer perceptrons)\n  2. **Self-Attention layers** — the key feature of transformers\n  3. **Normalization layers**\n- Parameters learned during **training process**\n\n**How transformers work geometrically:**\n\n- Transformer blocks \"**move points in space**\"\n- Tokens **cluster together** as they pass through layers\n- Clustering = \"**context**\" in language models (words with similar meaning cluster)"
        }
      ],
      "questions": [
        {
          "id": "L10Q1",
          "conceptIndex": 0,
          "text": "In mathematics, what does a \"dynamical system\" consist of?",
          "options": [
            "A database and a query function",
            "A vector space (state space) and a function mapping current state to next state",
            "A neural network and its loss function",
            "A time series and its Fourier transform"
          ],
          "correct": [
            1
          ],
          "explanation": "Mathematically, a dynamical system is the pair (X, f): X is the state space and f is the function mapping the current state to the next state.",
          "type": "single"
        },
        {
          "id": "L10Q2",
          "conceptIndex": 0,
          "text": "What is an \"absorbing set\" (trapping region) in the context of learned dynamical models?",
          "options": [
            "A region of the state space where the model ignores noisy data",
            "A subset of the state space that every model simulation eventually enters and never leaves",
            "A mathematical technique for compressing neural network weights",
            "A boundary condition applied during model training"
          ],
          "correct": [
            1
          ],
          "explanation": "An absorbing set (trapping region) is a subset of state space that all simulations will eventually enter and never leave. It guarantees the physical plausibility of the model.",
          "type": "single"
        },
        {
          "id": "L10Q3",
          "conceptIndex": 0,
          "text": "What does \"GPT\" stand for in the context of large language models?",
          "options": [
            "General Purpose Technology",
            "Generative Pre-trained Transformer",
            "Graph-based Probabilistic Training",
            "Gaussian Process Transformer"
          ],
          "correct": [
            1
          ],
          "explanation": "GPT: Generative Pre-trained Transformer. ChatGPT is built on this architecture.",
          "type": "single"
        },
        {
          "id": "L10Q4",
          "conceptIndex": 0,
          "text": "Which layer type is described as \"the key feature of transformers\"?",
          "options": [
            "Normalization layers",
            "Convolutional layers",
            "Self-Attention layers",
            "Recurrent layers"
          ],
          "correct": [
            2
          ],
          "explanation": "Self-Attention layers are the distinguishing feature of transformers. Feed-forward and normalization layers are also present, but self-attention is unique to transformers.",
          "type": "single"
        },
        {
          "id": "L10Q5",
          "conceptIndex": 0,
          "text": "According to Fantuzzi's mathematical analysis, what does the geometric behavior of transformer blocks correspond to in language models?",
          "options": [
            "Gradient descent in parameter space",
            "Tokens clustering together, which corresponds to \"context\" in language",
            "Random walks of word embeddings",
            "Dimensionality reduction of the vocabulary"
          ],
          "correct": [
            1
          ],
          "explanation": "Transformer blocks move points in space and cause them to cluster. This clustering corresponds to the concept of \"context\" in language models.",
          "type": "single"
        },
        {
          "id": "L10Q6",
          "conceptIndex": 0,
          "text": "Which of the following are the three building block layer types of a Transformer architecture? Select ALL that apply.",
          "options": [
            "Feed-Forward layers (multi-layer perceptrons)",
            "Convolutional layers",
            "Self-Attention layers",
            "Normalization layers",
            "Recurrent layers (LSTM/GRU)"
          ],
          "correct": [
            0,
            2,
            3
          ],
          "explanation": "A transformer architecture consists of 3 layer types: Feed-Forward layers (MLPs), Self-Attention layers (the distinguishing feature of transformers), and Normalization layers. Convolutional (B) and recurrent (E) layers are not specific to transformers.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 11,
      "title": "Developing Edge AI Solutions",
      "speaker": "Plinge / Fraunhofer IIS",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Fraunhofer-Gesellschaft at a glance:**\n\n- Application-oriented research for economy and industry\n- **30,000+** employees, **76** institutes, **3.0 billion €** financial volume\n- Over 70% from industrial/public-funded research, ~30% basic federal funding\n\n**AI hierarchy at Fraunhofer IIS (from smallest to largest):**\n\n```\nTiny ML → Edge ML → Efficient ML → ML → AI\n```\n\n**Edge AI vs. Cloud AI comparison:**\n| | Cloud AI | Edge AI |\n|--|----------|---------|\n| Energy | High | Low |\n| Latency | High | Low (real-time) |\n| Privacy | Data sent to cloud | Local, maximum privacy |\n| Network | Required | Independent |\n| Size | Large, centralized | Small, retrofittable |\n\n**4 advantages of Edge AI (#fast, #energy-efficient, #private, #tiny):**\n\n1. Processing on energy-efficient sensor nodes\n2. Lowest latency = fast response\n3. Private data stays on device\n4. Fits microcontrollers, reuses existing hardware\n\n**Edge AI Fast Track — 4 steps (pipeline):**\n\n1. **Data** — annotation with VLM (Visual Language Models) + SAM (Segment Anything Model)\n2. **Choose model** — type selected by expert; architecture found by **NAS** (Neural Architecture Search); parameters by **AutoML**\n3. **Compress** — \"Deep Compression\": **Pruning** (remove less important weights) + **Quantization** (lower numerical precision)\n4. **Deploy** — integration + quality assurance in the field\n\n**Model compression techniques:**\n\n- **Pruning:** removes less important neurons/connections\n- **Quantization:** uses lower numerical precision (e.g., Float32 → UInt8)\n- Example: MicroYolo compressed from **8 MB → 0.8 MB** via pruning + quantization\n\n**Unsupervised Anomaly Detection:**\n\n- Defects are rare and appear in unforeseen ways → severe data imbalance → supervised approaches impractical\n- Training: learn a model of \"normality\" from **only non-defective samples**\n- Inference: any significant deviation from normality → flagged as anomalous\n\n**TinyML application clusters:**\n\n- Industrial IoT (condition monitoring, predictive maintenance)\n- Environment (earthquake detection)\n- Healthcare (fitness tracker, health monitor)\n- Agriculture (animal & plant monitoring)\n\n**Embedded system characteristics for Edge AI** (exam example question topic!):\n\n- **Small size** ✓\n- **Low weight** ✓\n- **Low energy requirement** ✓\n- **Real-time capability** ✓\n- **MHz range processor** ✓ (not GHz like desktop CPUs)\n- Does NOT require continuous internet connection ✓\n- Does NOT have high computing power (by design)"
        }
      ],
      "questions": [
        {
          "id": "L11Q1",
          "conceptIndex": 0,
          "text": "What does \"Edge AI\" mean compared to \"Cloud AI\"?",
          "options": [
            "AI running exclusively on high-performance servers in data centres",
            "AI that runs locally on devices (phones, sensors, robots) with low latency, low energy, and without requiring a network connection",
            "AI that operates only on the edge of the internet, requiring specialized infrastructure",
            "AI using only edge detection algorithms in computer vision"
          ],
          "correct": [
            1
          ],
          "explanation": "Edge AI runs locally on the device (phone, sensor, robot) instead of sending data to the cloud. It provides low latency, low energy, network independence, and privacy.",
          "type": "single"
        },
        {
          "id": "L11Q2",
          "conceptIndex": 0,
          "text": "In the Fraunhofer IIS Edge AI fast track, what is \"NAS\" used for?",
          "options": [
            "Network Access Security for IoT devices",
            "Neural Architecture Search — automatically finding the optimal model architecture",
            "Noise Augmentation Strategy for training data",
            "Normalized Activation Scaling for quantization"
          ],
          "correct": [
            1
          ],
          "explanation": "NAS (Neural Architecture Search) automatically searches for the optimal neural network architecture for a specific hardware and task.",
          "type": "single"
        },
        {
          "id": "L11Q3",
          "conceptIndex": 0,
          "text": "What are the two main techniques used in \"Deep Compression\" of AI models?",
          "options": [
            "Distillation and transfer learning",
            "Pruning and Quantization",
            "Dropout and batch normalization",
            "Pooling and padding"
          ],
          "correct": [
            1
          ],
          "explanation": "Deep Compression consists of two techniques: Pruning (removing less important connections) and Quantization (reducing numerical precision, e.g., Float32 → UInt8).",
          "type": "single"
        },
        {
          "id": "L11Q4",
          "conceptIndex": 0,
          "text": "Why is supervised learning impractical for industrial anomaly detection?",
          "options": [
            "Industrial cameras cannot capture defects with sufficient resolution",
            "Defects are rare and appear in unforeseen ways, causing severe class imbalance making it impossible to collect enough defective examples",
            "Supervised models are too slow to run on edge hardware",
            "Industrial data cannot be annotated by human experts"
          ],
          "correct": [
            1
          ],
          "explanation": "Defects are rare and appear unpredictably → severe class imbalance → supervised approaches are impractical. Instead, unsupervised anomaly detection is used.",
          "type": "single"
        },
        {
          "id": "L11Q5",
          "conceptIndex": 0,
          "text": "What is the role of Visual Language Models (VLMs) in the Fraunhofer IIS Edge AI pipeline?",
          "options": [
            "They replace the need for any training data",
            "They automatically annotate training data, dramatically reducing manual labelling effort",
            "They run on the edge device to make real-time predictions",
            "They compress the final model before deployment"
          ],
          "correct": [
            1
          ],
          "explanation": "VLMs automate training data annotation. For example, manual annotation takes 40 hours, while zero-shot VLM reduces it to 3–50 minutes.",
          "type": "single"
        },
        {
          "id": "L11Q6",
          "conceptIndex": 0,
          "text": "Which of the following are typical characteristics of an embedded system used for Edge AI? Select ALL that apply.",
          "options": [
            "Small size",
            "High computing power (GHz-class processors)",
            "Low weight",
            "Requires continuous internet connection",
            "Low energy requirement",
            "Real-time capability"
          ],
          "correct": [
            0,
            2,
            4,
            5
          ],
          "explanation": "Embedded systems are small, lightweight, low-power, capable of real-time operation, and have processors in the MHz range. High computational power (B) and constant internet connectivity (D) are Cloud AI properties, not embedded.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 12,
      "title": "Beyond Supervised Machine Learning",
      "speaker": "Kainz",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Core thesis:** ML \"often works\" in ideal lab conditions but \"often fails\" in medical reality\n\n- ML works best when: data is uniform, classes balanced, boundaries defined, labelling possible\n- ML fails when: data varies, classes imbalanced, boundaries undefined, labelling impossible\n- Example failure: 50% of congenital heart disease missed in antenatal ultrasound; 10% false positive rate after a single mammography\n\n**\"Unknown unknowns\" problem (Rumsfeld quote):**\n\n- Supervised ML only knows what it has seen\n- Key challenge: detecting things the model was never trained on (out-of-distribution / OOD)\n\n**Normative Representation Learning:**\n\n- A variant of **unsupervised single-class learning**\n- Focus on **density estimation** and **out-of-distribution (OOD) detection**\n- Learn what is \"normal\" → anything deviating significantly = anomaly\n- Useful when labelling is impossible or rare events need detection\n\n**Dense representation models:**\n\n- Encode data into **dense, continuous, low-dimensional vector spaces**\n- Allow interpolation between complex samples (→ counterfactual generation)\n- Allow detection of low-support areas (→ OOD detection)\n- Built with: GANs, VAEs, diffusion models, transformers\n\n**Counterfactual analysis:**\n\n> \"How would the scan of this patient look like if some clinical parameter would be different?\"\n\n**Safe data sharing:**\n\n- Synthetic data must NOT reproduce any training sample (privacy)\n- Synthetic data must faithfully represent 100% of training distribution (quality)\n- Metric: **IRS (Image Retrieval Score)** — measures diversity of generated images\n\n**Foundation models debate:**\n\n- One large foundation model that knows everything vs. many specialized expert models vs. both\n- Current challenge: hallucinations and factual inconsistencies in generative models\n- Solution explored: **Bayesian Decoding Game** (Generator + Verifier game to improve consistency)\n\n**Open challenges in Germany:**\n\n- Retrospective access to patient data almost impossible due to regulatory hurdles\n- State-of-the-art healthcare AI requires **hundreds of thousands** of patient cases\n- Most initiatives (NAKO, UK Biobank) involve healthy participants only\n- Positive: Bavarian Health Cloud will soon enable secure large-scale data use"
        }
      ],
      "questions": [
        {
          "id": "L12Q1",
          "conceptIndex": 0,
          "text": "What is \"Normative Representation Learning\" according to Kainz?",
          "options": [
            "A supervised learning method that classifies images into predefined categories",
            "A variant of unsupervised single-class learning focused on density estimation and out-of-distribution detection",
            "A transfer learning approach that adapts pre-trained models to medical images",
            "A reinforcement learning method for robot-assisted surgery"
          ],
          "correct": [
            1
          ],
          "explanation": "Normative Representation Learning is a form of one-class learning without labels. It learns what is \"normal\" and detects deviations from it (OOD detection).",
          "type": "single"
        },
        {
          "id": "L12Q2",
          "conceptIndex": 0,
          "text": "What does \"counterfactual analysis\" mean in the context of Kainz's medical imaging research?",
          "options": [
            "Comparing AI predictions to expert radiologist diagnoses",
            "Generating a synthetic image of how a patient's scan would look if a clinical parameter were different",
            "Analysing the cause-and-effect relationship between drugs and imaging outcomes",
            "Retroactively correcting errors in medical image datasets"
          ],
          "correct": [
            1
          ],
          "explanation": "Counterfactual analysis answers: \"What would this patient's scan look like if a specific clinical parameter were different?\" — generating insights about disease mechanisms synthetically.",
          "type": "single"
        },
        {
          "id": "L12Q3",
          "conceptIndex": 0,
          "text": "According to Kainz, what are the two requirements for safe synthetic medical data sharing?",
          "options": [
            "Data must be high-resolution and must include diverse ethnicities",
            "Synthetic data must not reproduce any training sample AND must faithfully represent 100% of the training data distribution",
            "Data must be approved by a hospital ethics board and anonymized",
            "Data must be generated by at least two independent models"
          ],
          "correct": [
            1
          ],
          "explanation": "Two requirements for safe synthetic data sharing: (1) synthetic data must not reproduce real training data (privacy), (2) it must represent 100% of the training distribution (quality).",
          "type": "single"
        },
        {
          "id": "L12Q4",
          "conceptIndex": 0,
          "text": "What does the IRS (Image Retrieval Score) measure?",
          "options": [
            "The image quality of reconstructed MRI scans",
            "The diversity of a generative model by measuring how many real training images can be retrieved using synthetic samples as queries",
            "The speed of an AI model when running image search tasks",
            "The accuracy of a model on a held-out test set of medical images"
          ],
          "correct": [
            1
          ],
          "explanation": "IRS (Image Retrieval Score) evaluates the diversity of a generative model by measuring how many distinct real training images can be retrieved using synthetic samples as queries.",
          "type": "single"
        },
        {
          "id": "L12Q5",
          "conceptIndex": 0,
          "text": "What data characteristics does supervised ML typically FAIL on, according to Kainz?",
          "options": [
            "Uniform data with balanced classes and clearly defined boundaries",
            "Varying data, imbalanced classes, undefined class boundaries, and cases where manual labelling is impossible",
            "Large datasets with many training epochs",
            "Datasets with more than 10 output classes"
          ],
          "correct": [
            1
          ],
          "explanation": "ML fails with real medical data because: data is variable, classes are imbalanced, boundary definitions are ambiguous, and manual labeling is often impossible.",
          "type": "single"
        },
        {
          "id": "L12Q6",
          "conceptIndex": 0,
          "text": "According to Kainz, which conditions describe when supervised ML typically WORKS well? Select ALL that apply.",
          "options": [
            "Data is uniform and consistent across sources",
            "Class boundaries are clearly defined",
            "Classes are balanced",
            "Data varies greatly across patients and scanners",
            "Manual labelling is feasible"
          ],
          "correct": [
            0,
            1,
            2,
            4
          ],
          "explanation": "According to Kainz, supervised ML works well when: data is homogeneous (A), boundary definitions are clear (B), classes are balanced (C), and labeling is feasible (E). Data variability (D) is the condition under which ML fails.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 13,
      "title": "Philosophy of AI: Ethical & Epistemological Issues",
      "speaker": "Robertson",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**3 types of DNN opacity:**\n\n1. **Intentional secrecy** — deliberate non-disclosure by companies (Burrell 2016)\n2. **Technical illiteracy** — users/stakeholders lack the expertise to understand (Burrell 2016)\n3. **Algorithmic-level opacity (ALO)** — the operations of DNNs are **inscrutable even to their own developers** due to sheer complexity\n\n**Algorithmic-level opacity (most important):**\n\n- Developers can inspect weights and bias parameters\n- But they CANNOT explain HOW the model maps inputs to outputs\n- They do not grasp \"which higher-level mathematical structures and processes these parameters implement\" (Zednik & Boelson 2022)\n\n**xAI (Explainable AI) — the controversy:**\n\n- Methods like LIME (surrogate models, saliency maps) are proposed as solutions to opacity\n- **Key criticism:** xAI provides **post-hoc explanations** — they may NOT faithfully represent the original black box model\n- Counter-argument: human experts also give post-hoc explanations of intuitive judgements (Zerilli et al. 2019) → \"biological double standard\"\n\n**Responsibility gaps:**\n\n- \"The highly autonomous behavior of AI systems, for which neither the programmer, the manufacturer, nor the operator seems to be responsible\" (Königs 2022)\n- AI decisions → unclear who is liable → \"problem of many hands\"\n\n**Instrumental Convergence Thesis:**\n\n- Agents (artificial or otherwise) will seek to fulfil **instrumental goals** (resource acquisition, power-seeking) to fulfil larger-scale goals\n- Even if an AI's top goal is benign, it may conflict with human interests through instrumental goals\n- Classic example: **Bostrom's paperclip maximizer** — a superintelligence manufacturing paperclips could convert all matter on Earth into paperclip manufacturing facilities\n\n**Trustworthy AI:**\n\n- EU AI Act and UNESCO advocate for \"trustworthy AI\"\n- Philosophical question: are AI systems appropriate **objects of trust**? Or just objects of **reliability**?\n- Trust (unlike reliability) can be **betrayed** — can AI systems enter such an interpersonal relation?\n\n**LLMs as cognitive agents? Two camps:**\n\n- **Observational support (Cappelen & Dever 2025):** We use intentional terms (believes, knows, acts) to describe LLMs → evidence they have minds\n- **Skeptical:** LLMs hallucinate in ways incompatible with genuine understanding (unlike human mistakes)\n\n**MIT AI Lab context:**\n\n- Co-founded in 1959 by **Marvin Minsky** and **John McCarthy** (originator of the term \"artificial intelligence\")"
        }
      ],
      "questions": [
        {
          "id": "L13Q1",
          "conceptIndex": 0,
          "text": "Which type of DNN opacity refers to the fact that even developers cannot explain how their model maps inputs to outputs?",
          "options": [
            "Intentional secrecy",
            "Technical illiteracy",
            "Algorithmic-level opacity",
            "Procedural opacity"
          ],
          "correct": [
            2
          ],
          "explanation": "Algorithmic-Level Opacity (ALO): DNN operations are too complex to be understood even by their developers. Even if the weights are known, the high-level mathematical structures they implement cannot be understood.",
          "type": "single"
        },
        {
          "id": "L13Q2",
          "conceptIndex": 0,
          "text": "What is the main philosophical criticism of Explainable AI (xAI) methods such as LIME?",
          "options": [
            "They are computationally too expensive for real-time use",
            "They provide post-hoc explanations that may not faithfully represent the actual operations of the original black box model",
            "They can only explain image classifiers, not language models",
            "They require access to the model's training data"
          ],
          "correct": [
            1
          ],
          "explanation": "The main criticism of xAI methods: they produce post-hoc explanations that may not reflect the true operations of the original black-box model.",
          "type": "single"
        },
        {
          "id": "L13Q3",
          "conceptIndex": 0,
          "text": "What does the \"Instrumental Convergence Thesis\" claim?",
          "options": [
            "All AI systems will eventually converge on the same architecture",
            "AI agents will pursue instrumental sub-goals like resource acquisition even if these conflict with human interests, in order to achieve their primary objectives",
            "Instrumental music helps AI models train faster",
            "All sufficiently powerful AI systems will become aligned with human values"
          ],
          "correct": [
            1
          ],
          "explanation": "Instrumental Convergence Thesis: AI agents will pursue instrumental sub-goals (like resource acquisition) to achieve their primary goals, which may conflict with human interests even if the primary goal is harmless.",
          "type": "single"
        },
        {
          "id": "L13Q4",
          "conceptIndex": 0,
          "text": "Who co-founded the MIT Artificial Intelligence Laboratory in 1959 and originated the term \"artificial intelligence\"?",
          "options": [
            "Alan Turing and Claude Shannon",
            "Marvin Minsky and John McCarthy",
            "Geoffrey Hinton and Yann LeCun",
            "Norbert Wiener and Vannevar Bush"
          ],
          "correct": [
            1
          ],
          "explanation": "MIT Artificial Intelligence Laboratory was founded in 1959 by Marvin Minsky and John McCarthy. McCarthy is credited with coining the term \"artificial intelligence.\"",
          "type": "single"
        },
        {
          "id": "L13Q5",
          "conceptIndex": 0,
          "text": "What is a \"responsibility gap\" in the context of AI?",
          "options": [
            "A gap in an AI model's knowledge about legal responsibilities",
            "A situation where the autonomous behaviour of AI systems means that no single party — programmer, manufacturer, or operator — can be held clearly responsible for its actions",
            "The difference between what an AI is programmed to do and what it actually does",
            "A regulatory gap where AI is not covered by existing laws"
          ],
          "correct": [
            1
          ],
          "explanation": "The accountability gap: the high autonomy of AI systems makes it impossible to clearly hold any single party — programmer, manufacturer, or operator — accountable for their behavior.",
          "type": "single"
        },
        {
          "id": "L13Q6",
          "conceptIndex": 0,
          "text": "Which of the following are the three types of DNN opacity described by Robertson? Select ALL that apply.",
          "options": [
            "Intentional secrecy — deliberate non-disclosure by companies (Burrell 2016)",
            "Technical illiteracy — users and stakeholders lack the expertise to understand",
            "Algorithmic-level opacity — even developers cannot explain how the model maps inputs to outputs",
            "Regulatory opacity — laws do not require AI systems to be transparent",
            "Emergent opacity — models acquire unintended capabilities their creators did not foresee"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Robertson's 3 types of DNN opacity: intentional concealment (A), technical illiteracy (B), and algorithmic-level opacity (C). D and E are not in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 14,
      "title": "From Oppression to Empowerment: Regulating AI",
      "speaker": "Gengler",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Core argument:**\n\n- \"No AI system is ever neutral\" (Floridi 2023; Wajcman 2010)\n- AI amplifies existing inequities (Toyama 2011)\n- AI is reinforcing oppression, negatively affecting marginalized people while the already privileged benefit most\n\n**3 research pillars (transformation potentials):**\n\n1. **Regulating AI** — e.g., EU AI Act implementation\n2. **Governing AI** — responsible AI governance strategies\n3. **Reimagining AI** — feminist-informed redesign\n\n**Gender Data Gap:**\n\n- Systematic gaps, distortion, or **invisibility of gender in data** — who is recorded, how data is recorded, what data is used for\n- Can have negative impacts on women (e.g., medical devices calibrated on male bodies)\n\n**The socio-technical entanglement:**\n\n- AI outcomes (predictions, recommendations, generations) reflect and reinforce societal bias\n- AI and societal systems are \"entangled\" — the world as it IS ≠ the world as it SHOULD be\n- Data reflects existing world → model inherits existing biases → perpetuates them\n\n**Power-over vs. Power-to:**\n\n- Current AI operates via **'power-over'** dynamics (interlocking systems of oppression: patriarchy, colonialism, capitalism)\n- Goal: transform AI toward **'power-to'** dynamics (equity, democracy, sovereignty)\n\n**Key concepts from intersectional feminism:**\n\n- **Intersectionality** (Crenshaw 1989): multiple identity dimensions (race, gender, class) interact to create overlapping discrimination\n- **Matrix of domination** (Collins 2000): structural, hegemonic, disciplinary, and interpersonal domains of power\n- LLMs reflect the ideology of their creators (Buyl et al. 2024)\n\n**Real-world examples of oppressive AI:**\n\n- Amazon's AI recruiting tool was **scrapped** because it showed bias against women (Dastin 2018)\n- Predictive policing algorithms remain racially biased regardless of input data\n- Facial recognition systems have wrongly caused arrests due to misidentification\n- Iran using drones and phone apps to monitor dress code for women\n\n**Practical implications (5 target groups):**\n\n1. Regulators: don't relinquish AI regulation; design mandatory diversity requirements\n2. Organizational leadership: practice responsible AI governance; aim beyond mere compliance\n3. Development teams: practice reflexivity; implement feminist reflexes\n4. Users/civil society: use AI for feminist purposes; adopt fair AI prompting strategies\n5. Researchers: make positionality explicit; recognize knowledge is produced from situated standpoints"
        }
      ],
      "questions": [
        {
          "id": "L14Q1",
          "conceptIndex": 0,
          "text": "What is the \"Gender Data Gap\" according to Gengler?",
          "options": [
            "The salary gap between men and women working in the AI industry",
            "Systematic gaps, distortions, or invisibility of gender in data — who is recorded, how, and for what purpose",
            "The underrepresentation of women as users of AI tools",
            "The difference in AI capabilities between male and female researchers"
          ],
          "correct": [
            1
          ],
          "explanation": "Gender Data Gap describes the situation where gender is systematically absent, distorted, or invisible in data. It covers who is recorded, how they are recorded, and what the data is used for.",
          "type": "single"
        },
        {
          "id": "L14Q2",
          "conceptIndex": 0,
          "text": "According to Gengler, what does the concept of \"intersectionality\" (Crenshaw 1989) refer to?",
          "options": [
            "The technical process of combining multiple AI models",
            "The way multiple identity dimensions (race, gender, class) interact to create overlapping and compounding forms of discrimination",
            "Cross-platform compatibility of AI systems",
            "The intersection of regulation and innovation in AI policy"
          ],
          "correct": [
            1
          ],
          "explanation": "Intersectionality explains how multiple dimensions of identity (race, gender, class) interact with each other to create overlapping forms of discrimination.",
          "type": "single"
        },
        {
          "id": "L14Q3",
          "conceptIndex": 0,
          "text": "Which real-world example illustrates AI bias against women in corporate hiring?",
          "options": [
            "Google's image recognition system misidentifying people",
            "Amazon scrapped its AI recruiting tool because it systematically showed bias against women",
            "LinkedIn's algorithm prioritizing male candidates for engineering jobs",
            "A university admissions AI that discriminated against female applicants"
          ],
          "correct": [
            1
          ],
          "explanation": "Amazon's AI-based recruitment tool was taken out of service in 2018 because it showed systematic bias against female candidates (Dastin 2018).",
          "type": "single"
        },
        {
          "id": "L14Q4",
          "conceptIndex": 0,
          "text": "What is the core distinction Gengler draws between \"power-over\" and \"power-to\" in AI?",
          "options": [
            "Power-over refers to computational power; power-to refers to renewable energy",
            "Power-over describes current AI as reinforcing oppressive hierarchies; power-to describes a feminist vision of AI that enables equity and empowerment",
            "Power-over is about cloud computing; power-to is about edge AI",
            "Power-over refers to government regulation; power-to refers to user control"
          ],
          "correct": [
            1
          ],
          "explanation": "Current AI operates with \"power-over\" dynamics that reinforce oppressive systems like patriarchy/colonialism/capitalism. The feminist goal is to transform AI into \"power-for\" dynamics that provide equity and empowerment.",
          "type": "single"
        },
        {
          "id": "L14Q5",
          "conceptIndex": 0,
          "text": "Which statement is most consistent with Gengler's central argument?",
          "options": [
            "AI is inherently neutral and can be easily fixed with better data",
            "AI systems always reflect the ideology of their creators and no AI system is ever neutral — but this oppressive dynamic is not inevitable and can be changed",
            "AI regulation is the only solution needed to address bias in AI",
            "Gender bias in AI is primarily a technical problem that can be solved with larger datasets"
          ],
          "correct": [
            1
          ],
          "explanation": "Gengler's key argument: AI systems reflect the ideology of their creators and no AI is neutral. However, this oppressive dynamic is not inevitable and can be changed through a feminist approach.",
          "type": "single"
        },
        {
          "id": "L14Q6",
          "conceptIndex": 0,
          "text": "Which of the following are real-world examples of oppressive or biased AI that Gengler specifically mentions? Select ALL that apply.",
          "options": [
            "Amazon's AI recruiting tool was scrapped because it systematically showed bias against women",
            "Predictive policing algorithms remain racially biased regardless of input data",
            "Facial recognition systems have caused wrongful arrests due to misidentification",
            "A language translation system that performs poorly on low-resource languages",
            "Iran using drones and phone apps to monitor women's compliance with dress code"
          ],
          "correct": [
            0,
            1,
            2,
            4
          ],
          "explanation": "Examples specifically mentioned in Gengler's lecture: Amazon recruitment tool (A), predictive policing algorithms (B), facial recognition and wrongful arrests (C), and Iran's use of drones/apps for dress code enforcement (E). D is not mentioned in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 15,
      "title": "Neural Interfaces: Medical Applications and Industry",
      "speaker": "Del Vecchio",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Neural interfaces — two main domains:**\n\n1. **Medical applications:** neurorehabilitation, motor augmentation, neural control of movement\n2. **Movement neuroscience:** biosignal processing, neurophysiology, neural models + AI\n\n**Key signal: EMG (Electromyography)**\n\n- Records electrical activity produced by skeletal muscles\n- **HD-sEMG** (High-Density surface EMG) — array of many electrodes, provides fine-grained spatial resolution\n- Used via electrode sleeves on the forearm\n\n**What a neural interface enables:**\n\n- Neuroprosthetic control for tetraplegia (e.g., controlling a robotic arm via BCI)\n- Simultaneous control of multiple functions of a bionic hand prosthesis\n- Decoding attempted hand movements in paralyzed patients\n- Control of >20 degrees of freedom of the human hand in real time\n\n**Targeted Muscle Reinnervation (TMR):**\n\n- Surgical technique: amputated nerve endings are rerouted to remaining chest/forearm muscles\n- Enables amputees to control a prosthetic hand via EMG through habitual movements\n\n**Spinal Cord Injury (SCI) — key findings:**\n\n- Even in motor-complete paralysis, **spared motor neurons** can be detected and decoded\n- A **direct spinal cord–computer interface** enabled paralyzed patients to control a virtual hand with >10 degrees of freedom (Oliveira et al., Brain 2024)\n\n**Functional Electrical Stimulation (FES):**\n\n- Electrically stimulating forearm muscles to restore hand function\n- Controlled intuitively via remaining EMG signals (from contra- or ipsilateral side)\n- Restores hand function in tetraplegics\n\n**PlayAgain:** pediatric neuroorthosis to restore grasping in children with a paralyzed hand\n\n- Exploits the brain's high neuroplasticity during childhood\n\n**ML/AI role in neural interfaces:**\n\n- CNN maps HD-sEMG signals → high-dimensional latent space → hand kinematics (MLP)\n- Real-time decoding within neuromuscular delays (~10-15 ms)"
        }
      ],
      "questions": [
        {
          "id": "L15Q1",
          "conceptIndex": 0,
          "text": "What is \"High-Density surface EMG\" (HD-sEMG)?",
          "options": [
            "An EMG recording with high electrical voltage",
            "An array of many surface electrodes providing fine-grained spatial resolution of muscle electrical activity",
            "An implanted deep electrode for recording single motor neuron activity",
            "A technique for amplifying EMG signals in noisy environments"
          ],
          "correct": [
            1
          ],
          "explanation": "HD-sEMG is a recording technique that uses an array of many surface electrodes to capture muscle electrical activity with high spatial resolution.",
          "type": "single"
        },
        {
          "id": "L15Q2",
          "conceptIndex": 0,
          "text": "What is \"Targeted Muscle Reinnervation\" (TMR)?",
          "options": [
            "A rehabilitation technique that uses electrical stimulation to retrain muscles",
            "A surgical technique where amputated nerve endings are rerouted to remaining muscles, enabling prosthetic control via EMG",
            "A method for growing new nerve tissue in the laboratory",
            "A deep learning algorithm for predicting muscle fatigue"
          ],
          "correct": [
            1
          ],
          "explanation": "TMR is a surgical technique that reattaches severed nerve ends to residual muscles (e.g., chest muscles), allowing amputees to control their prosthetics through natural movements via EMG.",
          "type": "single"
        },
        {
          "id": "L15Q3",
          "conceptIndex": 0,
          "text": "What was the key finding from Del Vecchio's spinal cord–computer interface research in paralyzed patients?",
          "options": [
            "That complete spinal cord injury always results in zero motor neuron activity",
            "That even in motor-complete paralysis, spared motor neurons can be detected and used to control a virtual hand with over 10 degrees of freedom",
            "That EMG signals are too noisy to be decoded in real time in SCI patients",
            "That cortical brain signals are required for any neuroprosthetic control"
          ],
          "correct": [
            1
          ],
          "explanation": "Even in motor-complete paralysis, partially preserved motor neurons can be detected. These can be decoded to provide virtual hand control with more than 10 degrees of freedom (Oliveira et al., Brain 2024).",
          "type": "single"
        },
        {
          "id": "L15Q4",
          "conceptIndex": 0,
          "text": "What is \"Functional Electrical Stimulation\" (FES) in the context of neural interfaces?",
          "options": [
            "A non-invasive brain stimulation technique for treating depression",
            "Electrical stimulation of forearm muscles to restore hand function, controlled via remaining EMG signals",
            "A method for electrically testing the function of neural implants before surgery",
            "A type of deep brain stimulation for Parkinson's disease"
          ],
          "correct": [
            1
          ],
          "explanation": "FES electrically stimulates arm muscles to restore hand function. The system is controlled intuitively via residual EMG signals and restores hand function in tetraplegic individuals.",
          "type": "single"
        },
        {
          "id": "L15Q5",
          "conceptIndex": 0,
          "text": "Which of the following are neural interface applications specifically described by Del Vecchio? Select ALL that apply.",
          "options": [
            "Neuroprosthetic control of a robotic arm for tetraplegic patients via BCI",
            "Decoding attempted hand movements in paralyzed patients via a spinal cord–computer interface",
            "Deep brain stimulation (DBS) for treating Parkinson's disease",
            "Functional Electrical Stimulation (FES) to restore hand function in tetraplegics",
            "PlayAgain pediatric neuroorthosis to restore grasping in children with a paralyzed hand"
          ],
          "correct": [
            0,
            1,
            3,
            4
          ],
          "explanation": "Neural interface applications presented by Del Vecchio: robotic arm control via BCI (A), decoding hand movements in paralyzed patients via spinal cord interface (B), restoring hand function via FES (D), and PlayAgain pediatric neuroorthosis (E). DBS (C) is not in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 16,
      "title": "Deep Learning in Breast MRI",
      "speaker": "Kapsner",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Breast cancer screening context:**\n\n- Most common cancer in women\n- X-ray mammography: screening every 2 years for women aged 50–75\n- Mammography screening → **-30% decrease** in breast cancer mortality (Swedish Two-County Trial)\n\n**3 main challenges in breast cancer screening:**\n\n1. **False-positive findings** → unnecessary biopsies\n2. **False-negative findings** → missed cancers (\"interval cancer\")\n3. **Over-diagnosis** → over-treatment\n\n**Why add MRI to screening?**\n\n- MRI has much higher cancer detection rate (CDR/1000: 16.5 with MRI vs. 5–6 with mammography alone)\n- But MRI limitations: high cost, long duration, requires contrast agents, limited availability\n\n**EUSOBI Recommendations 2024:**\n\n- Regular mammography remains the **mainstay** of breast cancer screening\n- High-risk women + extremely dense breast tissue → use MRI\n- Women should **actively participate** in personalized screening decisions\n\n**4 DL applications in breast MRI (Kapsner's 4 topics):**\n\n1. **Quality Assurance** — automated artifact detection in MRI-derived MIPs\n2. **Virtual Contrast Enhancement (vCE)** — generate contrast-enhanced appearance from contrast-free MRI\n3. **Lesion Detection** — AI-powered CAD system for breast DWI MRI\n4. **Additional/Incidental Findings** — detect pathologies outside region of interest (e.g., aortic aneurysm)\n\n**Maximum Intensity Projection (MIP):**\n\n- Step 1: subtract pre-contrast from post-contrast 3D image → only contrast-enriched areas remain\n- Step 2: project maximum intensities along one axis → 2D overview image\n- 66.9% of MIPs have artifacts → DL achieves ~86-94% AUROC in artifact detection\n\n**Virtual Contrast Enhancement (vCE):**\n\n- Goal: predict contrast enhancement from **contrast-free MRI** sequences (T1, T2, DWI)\n- Avoids risks of contrast agents: allergic reactions, kidney failure, environmental contamination\n- GAN produces more realistic-looking vCE images than U-Net (confirmed by Turing test)\n\n**Thoracic Aortic Aneurysm (incidental finding):**\n\n- \"Silent killer\": >95% asymptomatic; rupture → >90% mortality\n- AI detected aneurysms at **~3.5× higher rate** than routine clinical reporting\n- Women have +40% probability to die from thoracic aortic aneurysm vs. men"
        }
      ],
      "questions": [
        {
          "id": "L16Q1",
          "conceptIndex": 0,
          "text": "According to the Swedish Two-County Trial, what is the impact of mammography screening on breast cancer mortality?",
          "options": [
            "No statistically significant effect",
            "A 10% decrease in mortality",
            "A 30% decrease in breast cancer-specific mortality",
            "A 50% decrease in mortality"
          ],
          "correct": [
            2
          ],
          "explanation": "Swedish Two-County Study: invitation to mammography screening produced a significant 30% reduction in breast cancer mortality.",
          "type": "single"
        },
        {
          "id": "L16Q2",
          "conceptIndex": 0,
          "text": "What is a \"Maximum Intensity Projection\" (MIP) in breast MRI?",
          "options": [
            "A measure of the maximum pixel intensity in a raw MRI scan",
            "A 2D image created by subtracting pre-contrast from post-contrast 3D images and then projecting maximum intensities along one axis",
            "A type of MRI sequence that maximizes spatial resolution",
            "A radiologist's assessment score for lesion severity"
          ],
          "correct": [
            1
          ],
          "explanation": "MIP: (1) subtract the pre-contrast 3D image from the post-contrast 3D image (only contrast-enhancing areas remain), (2) project maximum intensities onto a 2D image along one axis.",
          "type": "single"
        },
        {
          "id": "L16Q3",
          "conceptIndex": 0,
          "text": "What is \"Virtual Contrast Enhancement\" (vCE) in the context of breast MRI?",
          "options": [
            "A technique for digitally enhancing the brightness of existing contrast-enhanced scans",
            "Using deep learning to generate contrast-enhanced MRI appearance from contrast-free input sequences, eliminating the need for contrast agent administration",
            "A software tool for adjusting the color balance of MRI images",
            "An AI system that predicts which patients will respond to contrast agents"
          ],
          "correct": [
            1
          ],
          "explanation": "vCE generates contrast-enhancing image appearance from contrast-free MRI sequences (T1, T2, DWI) using deep learning, without requiring contrast agent injection.",
          "type": "single"
        },
        {
          "id": "L16Q4",
          "conceptIndex": 0,
          "text": "Which model type produced more realistic virtual contrast enhancement images in Kapsner's Turing test?",
          "options": [
            "U-Net",
            "ResNet",
            "GAN (Generative Adversarial Network)",
            "Vision Transformer (ViT)"
          ],
          "correct": [
            2
          ],
          "explanation": "Turing test result: GAN-generated vCE images gave a more realistic impression compared to U-Net images.",
          "type": "single"
        },
        {
          "id": "L16Q5",
          "conceptIndex": 0,
          "text": "What makes thoracic aortic aneurysm (TAA) a particularly important \"incidental finding\" to detect in breast MRI scans?",
          "options": [
            "It is extremely common, affecting over 30% of the population",
            "It is almost always symptomatic, making early detection straightforward",
            "It is mostly asymptomatic (>95%), rupture is fatal (>90% mortality), and AI detected it at ~3.5× the rate of routine clinical reporting",
            "It is easy to treat once detected, so screening has a very high cost-benefit ratio"
          ],
          "correct": [
            2
          ],
          "explanation": "TAA is almost entirely asymptomatic (>95%); rupture leads to >90% mortality. AI detected TAA approximately 3.5 times more frequently than routine clinical reporting.",
          "type": "single"
        },
        {
          "id": "L16Q6",
          "conceptIndex": 0,
          "text": "Which of the following are listed as the three main challenges in breast cancer screening? Select ALL that apply.",
          "options": [
            "False-positive findings (leading to unnecessary biopsies)",
            "High cost of MRI equipment compared to mammography",
            "False-negative findings (missed cancers, \"interval cancer\")",
            "Over-diagnosis (leading to over-treatment)",
            "Shortage of trained radiologists"
          ],
          "correct": [
            0,
            2,
            3
          ],
          "explanation": "The 3 main challenges of breast cancer screening: false positives (A), false negatives (C), and overdiagnosis (D). MRI cost (B) and radiologist shortage (E) are not listed in this category in the lecture.",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 17,
      "title": "AI for Thermohydraulic Models",
      "speaker": "Tolba",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Water system components (4 stages):**\n\n1. Collection\n2. Purification\n3. Transmission\n4. Distribution\n\n**Network topology types:**\n\n- **Branching network** — tree structure, dead ends (no redundancy)\n- **Gridiron network** — looped/ring structure (redundancy, more resilient)\n\n**Monitoring devices in WDN:**\n\n- Flow and pressure sensors\n- Water quality sensors\n- Noise loggers (for leak detection)\n- Smart meters (consumption measurement)\n\n**Pure AI models — limitations:**\n\n- Can produce **non-physically correct** results (violate conservation laws)\n- Sensitive to noise\n- \"Black box\" — hard to debug\n- Cannot guarantee physical plausibility\n\n**Pure Physical models — limitations:**\n\n- Equations are approximations\n- Sensitive to **missing or wrong GIS data**\n- Assume constant material properties\n- Difficult to update in real time\n\n**Hybrid approach — 2 strategies:**\n\n1. **Physics for AI (PINN/PIGNN):** embed physics equations into the neural network's **loss function** → model is constrained to follow physical laws during training\n2. **AI for Physics:** use AI to discover missing GIS data, predict discrepancies between model and measurement, or estimate physical properties (e.g., temperature)\n\n**Physics Informed Graph Neural Networks (PIGNN):**\n\n- Water networks modelled as **graphs**: pipes = edges, junctions/nodes = nodes\n- **Message Passing (2 steps):**\n  - **Aggregate:** each node collects information from neighbouring nodes\n  - **Combine:** each node updates its own representation using aggregated info\n- **Architecture:** Encoder → Processor → Decoder\n- Physics constraints (PDE loss) embedded in training loss → ensures physical consistency"
        }
      ],
      "questions": [
        {
          "id": "L17Q1",
          "conceptIndex": 0,
          "text": "Which of the following is NOT a primary component of a water distribution system?",
          "options": [
            "Collection",
            "Purification",
            "Urban Heating",
            "Distribution"
          ],
          "correct": [
            2
          ],
          "explanation": "Water systems consist of four main phases: Collection, Purification, Transmission, and Distribution. Urban heating is not in this list.",
          "type": "single"
        },
        {
          "id": "L17Q2",
          "conceptIndex": 0,
          "text": "What is a major limitation of using \"Pure AI Models\" for thermohydraulic simulation?",
          "options": [
            "They are too simple to implement",
            "They can produce results that are non-physically correct (violating conservation laws)",
            "They require zero noise in the data",
            "They cannot be used for leak detection"
          ],
          "correct": [
            1
          ],
          "explanation": "Pure AI models do not know physical laws and can produce physically impossible results (e.g., flow predictions that violate mass conservation).",
          "type": "single"
        },
        {
          "id": "L17Q3",
          "conceptIndex": 0,
          "text": "How does a Physics Informed Graph Neural Network (PIGNN) incorporate physical laws?",
          "options": [
            "By replacing all neural network layers with hard-coded physics equations",
            "By embedding conservation equations (PDE loss) into the neural network's loss function",
            "By using only GIS data for predictions",
            "By ignoring node-to-node message passing"
          ],
          "correct": [
            1
          ],
          "explanation": "PIGNN embeds physical laws (partial differential equations) into the loss function. This forces the model to comply with physical consistency during training.",
          "type": "single"
        },
        {
          "id": "L17Q4",
          "conceptIndex": 0,
          "text": "In a Graph Neural Network, what are the two steps of \"Message Passing\"?",
          "options": [
            "Encode and Decode",
            "Aggregate and Combine",
            "Pressure and Velocity",
            "GIS and SCADA"
          ],
          "correct": [
            1
          ],
          "explanation": "Message passing consists of two steps: Aggregate (each node gathers information from its neighbors) and Combine (each node updates its own representation).",
          "type": "single"
        },
        {
          "id": "L17Q5",
          "conceptIndex": 0,
          "text": "Which application of AI is specifically mentioned to improve \"Pure Physical Models\" of water networks?",
          "options": [
            "Increasing water pressure in pipes",
            "Discovering missing or incorrect GIS data",
            "Manually adjusting valves",
            "Measuring pipe material weight"
          ],
          "correct": [
            1
          ],
          "explanation": "AI can be used to detect missing or incorrect GIS data in physical models, thereby improving the accuracy of the physical model.",
          "type": "single"
        },
        {
          "id": "L17Q6",
          "conceptIndex": 0,
          "text": "What is the difference between a \"Branching\" and a \"Gridiron\" water network?",
          "options": [
            "Branching uses metal pipes; Gridiron uses plastic",
            "Branching has a tree structure with dead ends and no redundancy; Gridiron is looped/ring-based with redundancy",
            "Branching is used in rural areas; Gridiron only in cities",
            "Branching supports higher pressures; Gridiron is for low-pressure systems"
          ],
          "correct": [
            1
          ],
          "explanation": "Branching (tree structure): dead ends, no redundancy. Gridiron (grid/ring structure): cyclic, redundant, with alternative paths available in case of failure.",
          "type": "single"
        },
        {
          "id": "L17Q7",
          "conceptIndex": 0,
          "text": "Which of the following correctly describe the Physics-Informed Graph Neural Network (PIGNN) approach? Select ALL that apply.",
          "options": [
            "Uses graph structure to represent water network topology (pipes = edges, junctions = nodes)",
            "Embeds physical laws (partial differential equations) into the loss function during training",
            "Requires no domain knowledge — purely data-driven",
            "Ensures the model's predictions respect physical conservation laws",
            "Only works for branching (tree) networks, not gridiron (looped) networks"
          ],
          "correct": [
            0,
            1,
            3
          ],
          "explanation": "PIGNN: represents the water network as a graph structure (A), embeds physical laws into the loss function (B), and guarantees the model's physical consistency (D). It is not purely data-driven (C is wrong) and can work with both network types (E is wrong).",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 18,
      "title": "Research Methods",
      "speaker": "Lennartz",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**Definition of Research:**\n\n> \"Answering questions in a systematic way to increase knowledge\"\n\n**7-Step Research Process:**\n\n1. Define the research question\n2. Background research (literature review)\n3. Formulate hypothesis\n4. Design the study (methods)\n5. Collect data\n6. Analyze data\n7. Draw conclusions → communicate results\n\n**Peer Review Process:**\n\n```\nSubmission → Peer Review (2–3 experts) → Revision → Acceptance → Publication\n```\n\n- Reviewers are independent experts in the field\n- Authors revise based on feedback\n- Goal: quality control, validation, credibility\n\n**Academic Paper Structure:**\n\n| Section | Purpose |\n|---------|---------|\n| Abstract | Summary of the whole paper |\n| Introduction | Background, motivation, research gap |\n| Methods | How the study was conducted |\n| Results | What was found |\n| Discussion | What it means, limitations |\n| Conclusion | Main takeaways |\n| References | Cited sources |\n\n**Literature Databases:**\n\n- **Google Scholar** — broad, general search across all fields\n- **Scopus** — citation tracking, metrics\n- **Web of Science** — impact factors, journal rankings\n- **PubMed** — medical and biomedical literature\n\n**Evidence Hierarchy Pyramid (bottom = weakest → top = strongest):**\n\n```\n        Metaanalyses        ← strongest\n      Systematic Reviews\n     Traditional Reviews\n    Individual Studies\n  Expert Opinions           ← weakest\n```\n\n**LLMs in Research — Limitations:**\n\n- LLMs cannot generate genuinely new knowledge (they recombine existing text)\n- **Hallucinations = plagiarism** — fabricated citations/facts are unacceptable in research\n- **ArXiv:** preprint server — NO peer review, only minimal screening for completeness\n  - Fast dissemination but no quality guarantee"
        }
      ],
      "questions": [
        {
          "id": "L18Q1",
          "conceptIndex": 0,
          "text": "What is the correct definition of \"research\" according to Lennartz?",
          "options": [
            "Reading and summarizing existing scientific papers",
            "Answering questions in a systematic way to increase knowledge",
            "Creating new technologies based on intuition",
            "Collecting data from sensors and storing it in databases"
          ],
          "correct": [
            1
          ],
          "explanation": "Research definition: \"increasing knowledge by systematically answering questions.\" Simply reading literature or collecting data is not enough; a systematic process is required.",
          "type": "single"
        },
        {
          "id": "L18Q2",
          "conceptIndex": 0,
          "text": "In the evidence hierarchy pyramid, which type of evidence is considered the STRONGEST?",
          "options": [
            "Expert opinions",
            "Individual studies",
            "Traditional reviews",
            "Meta-analyses"
          ],
          "correct": [
            3
          ],
          "explanation": "At the top of the evidence hierarchy are Meta-analyses. They statistically combine the results of multiple studies. The weakest evidence is expert opinion.",
          "type": "single"
        },
        {
          "id": "L18Q3",
          "conceptIndex": 0,
          "text": "What is the correct order of the peer review process?",
          "options": [
            "Publication → Peer Review → Submission → Acceptance",
            "Submission → Peer Review → Revision → Acceptance → Publication",
            "Hypothesis → Data Collection → Peer Review → Publication",
            "Peer Review → Submission → Revision → Publication"
          ],
          "correct": [
            1
          ],
          "explanation": "Peer review process: Submission → Peer Review (2-3 independent experts) → Revision → Acceptance → Publication.",
          "type": "single"
        },
        {
          "id": "L18Q4",
          "conceptIndex": 0,
          "text": "Which literature database is BEST suited for finding medical and biomedical publications?",
          "options": [
            "Google Scholar",
            "Scopus",
            "PubMed",
            "Web of Science"
          ],
          "correct": [
            2
          ],
          "explanation": "PubMed is a specialized database for medical and biomedical literature (provided by the National Library of Medicine).",
          "type": "single"
        },
        {
          "id": "L18Q5",
          "conceptIndex": 0,
          "text": "Why is using LLMs (like ChatGPT) to write research papers problematic?",
          "options": [
            "LLMs are too slow to write academic text",
            "LLMs can only write in English",
            "LLMs cannot generate new knowledge, and hallucinated (fabricated) content constitutes plagiarism",
            "LLMs require internet access that most universities block"
          ],
          "correct": [
            2
          ],
          "explanation": "LLMs recombine existing text; they cannot generate truly new knowledge. \"Hallucination\" (fabricated citations and information) counts as academic plagiarism.",
          "type": "single"
        },
        {
          "id": "L18Q6",
          "conceptIndex": 0,
          "text": "What distinguishes ArXiv from a peer-reviewed journal?",
          "options": [
            "ArXiv only publishes mathematics papers",
            "ArXiv papers go through a rigorous peer review by experts in the field",
            "ArXiv is a preprint server with no peer review, only minimal screening for completeness",
            "ArXiv requires a publication fee that most researchers cannot afford"
          ],
          "correct": [
            2
          ],
          "explanation": "ArXiv is a \"preprint\" server. Papers only undergo basic integrity checks, not expert peer review. Therefore, results on ArXiv have not yet been validated.",
          "type": "single"
        }
      ]
    },
    {
      "id": 19,
      "title": "Presentation Methods",
      "speaker": "Lennartz",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**5 Elements of a Good Presentation:**\n\n1. **Key message** — one clear takeaway\n2. **Comprehensive structure/storyline** — logical flow\n3. **Good preparation & technical setup** — be ready\n4. **Consistent and appealing slide design** — visual coherence\n5. **Appealing presentation style** — loud, positioned well, engaging\n\n**First Step — Before building slides, answer:**\n\n- What information do you want to communicate?\n- What do you want to achieve?\n- Who is your audience?\n- What is the frame?\n\n**3 Types of Presentations:**\n\n| Type | Purpose |\n|------|---------|\n| Scientific Presentation | Report research findings (paper structure) |\n| Pitch | Sell an idea/product (USP, appeal to investors) |\n| Lecture Slides | Knowledge transfer (dense, for looking things up) |\n\n**Presentation Structure — Time Proportions:**\n\n- Introduction: **10%**\n- Methods + Results + Discussion: **80%**\n- Conclusion: **10%**\n\n**How to Start a Presentation:**\n\n- Start with **content** (NOT an outline slide)\n- **First 60 seconds are the most important**\n- Do NOT repeat what the person who introduced you said\n- No outline at the beginning!\n\n**Introduction — Inverted Triangle (Problem → Gap → Hook):**\n\n```\n    Problem (broad context)\n       ↓\n    Gap (what is missing in the literature)\n       ↓\n    Hook (your hypothesis/solution)\n```\n\n**Structure Templates by Goal:**\n\n| Goal | Structure |\n|------|-----------|\n| Pitch an idea | Big change → Chances & risks → Solution |\n| Describe a problem | Problem → Implications → Solution approaches |\n| Present a solution | Problem → Solution → Implementation |\n\n**5 Steps to Build a Presentation:**\n\n1. Write down cornerstones (e.g., research questions)\n2. Add required elements (literature, methods, results…)\n3. Think of a story / red thread to connect\n4. Sketch slides\n5. Make them pretty / fine touch\n\n**Slide Design Principles (3 rules):**\n\n| Principle | Meaning |\n|-----------|---------|\n| **Form follows Content** | Design supports the key message |\n| **Think Inside the Box** | Group connected messages in boxes for clarity |\n| **Expect the DAU\\*** | \\*Dumbest Assumable User — structure must be obvious, must \"leap out\" |\n\n**Reading direction:** Information perceived from **top left → bottom right**\n\n**Layout Rules:**\n\n- Max **20 words per slide** (exceptions: 30)\n- **NO full sentences** → keywords only\n- Line breaks reduce readability\n- Max **2 minutes per slide**\n- Practice and speak free (not read from slides)\n- Be consistent: background, colors, fonts, margins, icon style\n\n**Typography:**\n\n- Simple font: Arial or FAUSans\n- Min size: **16pt**, preferred: **18pt**, headers: **24pt**\n- **Bold** preferred for highlighting (over italic or underline)\n- Avoid all-caps words\n\n**Colors:**\n\n- Max **3 colors per slide** (excluding black, grey, white)\n- Must work in black & white / greyscale\n- Color blind friendly (vary lightness and saturation)\n- Consistent meaning for colors across all slides\n\n**Transitions & Animations:**\n\n- Transitions (between slides): keep simple → **None, Morph, or Fade**\n- Animations (within slides): use to guide audience, **use carefully**\n\n**AI-generated images — risks:**\n\n- May look realistic but contain weird/wrongly spelled details\n- Always check carefully before using"
        }
      ],
      "questions": [
        {
          "id": "L19Q1",
          "conceptIndex": 0,
          "text": "What is the FIRST step when preparing any presentation according to Lennartz?",
          "options": [
            "Design slides with consistent colors and fonts",
            "Write a bullet-point outline as the first slide",
            "Define what information you want to communicate, your goal, audience, and frame",
            "Create a title slide with your name and institution"
          ],
          "correct": [
            2
          ],
          "explanation": "The first step is always to clarify: what you want to communicate, what you want to achieve, who your target audience is, and what the framing is. Slide design comes after.",
          "type": "single"
        },
        {
          "id": "L19Q2",
          "conceptIndex": 0,
          "text": "According to the lecture, how should a scientific presentation be structured in terms of time allocation?",
          "options": [
            "Introduction 30%, Methods 30%, Results 30%, Conclusion 10%",
            "Introduction 10%, Methods/Results/Discussion 80%, Conclusion 10%",
            "Introduction 50%, Results 40%, Conclusion 10%",
            "Equal distribution across all sections"
          ],
          "correct": [
            1
          ],
          "explanation": "Time distribution in a scientific talk: Introduction 10%, Methods/Results/Discussion 80%, Conclusion 10%. The core content (findings) should occupy the majority of the talk.",
          "type": "single"
        },
        {
          "id": "L19Q3",
          "conceptIndex": 0,
          "text": "What does the \"Inverted Triangle\" structure in a presentation introduction represent?",
          "options": [
            "Going from specific details to broad generalizations",
            "Going from general context → knowledge gap → specific hypothesis/hook",
            "Starting with conclusions and working backward to the method",
            "A technique to reduce the number of slides in the introduction"
          ],
          "correct": [
            1
          ],
          "explanation": "Inverted Triangle: General context (Problem) → Gap in literature (Gap) → Specific hypothesis/hook (Hook). Goes from general to specific.",
          "type": "single"
        },
        {
          "id": "L19Q4",
          "conceptIndex": 0,
          "text": "What does \"DAU\" stand for in the context of slide design?",
          "options": [
            "Data Analysis Unit",
            "Dynamic Alignment Utility",
            "Dumbest Assumable User",
            "Design and Usability"
          ],
          "correct": [
            2
          ],
          "explanation": "DAU = \"Dumbest Assumable User.\" The structure on a slide should be self-evident without requiring the audience to actively search for it — the structure should \"jump out.\"",
          "type": "single"
        },
        {
          "id": "L19Q5",
          "conceptIndex": 0,
          "text": "Which of the following are characteristics of a GOOD slide according to the Presentation Methods lecture? Select ALL that apply.",
          "options": [
            "Every slide has one key message",
            "Uses full sentences to explain every point in detail",
            "Maximum 20 words (exceptions: 30)",
            "Reading direction follows top left to bottom right",
            "Includes an outline at the beginning",
            "Structure must be obvious without the audience having to search for it"
          ],
          "correct": [
            0,
            2,
            3,
            5
          ],
          "explanation": "A good slide: carries a single key message (A), contains a maximum of 20 words (C), follows left-to-right/top-to-bottom reading order (D), and its structure is immediately understandable (F). Full sentences (B) and an outline at the start (E) are not recommended.",
          "type": "multiple"
        },
        {
          "id": "L19Q6",
          "conceptIndex": 0,
          "text": "According to Lennartz, what should you NEVER do at the beginning of a presentation?",
          "options": [
            "Show a title slide",
            "Start with a provocative question",
            "Show an outline/agenda slide",
            "Introduce yourself"
          ],
          "correct": [
            2
          ],
          "explanation": "You should NOT show an outline/table of contents slide at the start. Start directly with content. The first 60 seconds are the most critical and should be used to capture the audience.",
          "type": "single"
        }
      ]
    },
    {
      "id": 20,
      "title": "Entrepreneurship & AI Start-ups: Digital Tech Academy",
      "speaker": "Hamadi",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**What is a Spin-Off?**\n\n- A company founded by members (students, researchers, professors) of a university or research institution\n- Commercializes scientific results or technology developed at the institution\n\n**FAU Spin-Off Facts:**\n\n- **500+** spin-offs since 2000\n- **~75%** still active → high success rate compared to general start-up statistics\n- FAU supports spin-offs through the **Spin-Off Service** office\n\n**DTA — Digital Tech Academy:**\n\n- FAU's **#1 Entrepreneurship Excellence Program**\n- Duration: **12 weeks** (Business Design Process)\n- Participants: **20 students** in **4–6 teams**\n- Focus: **AI start-ups** and digital technology ventures\n- Students go through the full cycle: idea → validation → business model → pitch\n\n**AI Start-Up Examples from FAU:**\n\n- **Evolonic** — deep learning for communication/language technology\n- **Oculai** — AI-based construction site monitoring\n\n**Why Start-Ups Fail (common reasons):**\n\n- Wrong team / founder conflict\n- No market need (building something nobody wants)\n- Ran out of cash\n- Outcompeted\n- Pricing / cost issues\n\n**Business Model Canvas (key entrepreneurship tool):**\n\n9 building blocks: Customer Segments, Value Proposition, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure\n\n**MVP — Minimum Viable Product:**\n\n- Simplest version of a product to test with real customers\n- Validate assumptions before building the full product\n- Lean Start-Up approach: Build → Measure → Learn loop"
        }
      ],
      "questions": [
        {
          "id": "L20Q1",
          "conceptIndex": 0,
          "text": "What is a \"spin-off\" company in the context of a university?",
          "options": [
            "A subsidiary company created when a large corporation splits into two",
            "A company founded by university members to commercialize scientific/technological results from that institution",
            "A consulting firm hired by a university to help commercialize patents",
            "A student organization that organizes start-up competitions"
          ],
          "correct": [
            1
          ],
          "explanation": "Spin-off: a company founded by university members (students, researchers, professors) to commercialize scientific/technological results developed at the institution.",
          "type": "single"
        },
        {
          "id": "L20Q2",
          "conceptIndex": 0,
          "text": "How many spin-offs has FAU produced since 2000, and what is their approximate success rate?",
          "options": [
            "100+ spin-offs, ~50% still active",
            "500+ spin-offs, ~75% still active",
            "1000+ spin-offs, ~90% still active",
            "200+ spin-offs, ~60% still active"
          ],
          "correct": [
            1
          ],
          "explanation": "FAU has produced over 500 spin-offs since 2000, approximately 75% of which are still active. This is a high success rate compared to general entrepreneurship statistics.",
          "type": "single"
        },
        {
          "id": "L20Q3",
          "conceptIndex": 0,
          "text": "What is the DTA (Digital Tech Academy) at FAU?",
          "options": [
            "A research institute for digital transformation and AI",
            "A 12-week entrepreneurship excellence program for 20 students working in 4–6 AI start-up teams",
            "A certification program for digital marketing",
            "A collaboration between FAU and Munich Technical University for tech transfer"
          ],
          "correct": [
            1
          ],
          "explanation": "DTA (Digital Tech Academy): FAU's #1 entrepreneurship excellence program. 12 weeks, 20 students, 4-6 teams, focused on AI ventures.",
          "type": "single"
        },
        {
          "id": "L20Q4",
          "conceptIndex": 0,
          "text": "What does \"MVP\" stand for in the context of start-up methodology?",
          "options": [
            "Most Valuable Product",
            "Minimum Viable Product",
            "Maximum Value Proposition",
            "Multi-Vendor Platform"
          ],
          "correct": [
            1
          ],
          "explanation": "MVP = Minimum Viable Product. The simplest product version to test with real customers. Lean Start-Up cycle: Build → Measure → Learn.",
          "type": "single"
        },
        {
          "id": "L20Q5",
          "conceptIndex": 0,
          "text": "Which of the following is listed as a common reason why start-ups fail?",
          "options": [
            "Having too many investors",
            "Building a product with too many features",
            "No market need — building something that nobody actually wants",
            "Having too experienced a founding team"
          ],
          "correct": [
            2
          ],
          "explanation": "One of the most common startup failure reasons is the absence of market need — building something nobody actually wants. Other common reasons: wrong team, cash depletion, competition.",
          "type": "single"
        }
      ]
    },
    {
      "id": 21,
      "title": "AI in Communication Disorders / Resource-Efficient AI",
      "speaker": "Kist",
      "concepts": [
        {
          "heading": "Key Concepts to Memorize",
          "body": "**ANKI Lab = Artificial Intelligence in Communication Disorders**\n\n- Applies AI to disorders affecting communication (speech, swallowing)\n\n**Central Dogma of Neuroscience / Kist's Framework:**\n\n```\nSensory Input → Brain (Processing) → Behavior (Output)\n```\n\n- AI can intervene at any stage: sensing, processing, or behavior analysis\n\n**Dysphagia (Swallowing Disorder):**\n\n- **Dysphagia** = difficulty swallowing (Greek: dys = difficult, phagein = to eat)\n- Can lead to **aspiration** (food/liquid enters lungs) → pneumonia, malnutrition\n- Analyzed using **fluoroscopy** (X-ray video) — the clinical gold standard\n- AI challenge: automatic, objective analysis of swallowing from video\n\n**Key AI Technique — Semantic Segmentation:**\n\n- **Semantic segmentation** = pixel-by-pixel classification of an image\n- Every pixel is assigned a class label (e.g., \"tongue\", \"food bolus\", \"airway\")\n- More detailed than object detection (which only gives bounding boxes)\n\n**Markerless Tracking:**\n\n- Track structures (e.g., tongue, hyoid bone) in video WITHOUT physical markers\n- Method: compute **velocity fields** → integrate over time → **displacement fields**\n- Enables tracking anatomical movement without surgical markers or radiation markers\n\n**Diffeomorphic Image Registration:**\n\n- A method to align (register) two images\n- **Diffeomorphic** = smooth, invertible transformation (no tearing or folding of tissue)\n- Preserves anatomical topology\n\n**Developmental Speech Disorders:**\n\n- Affect **10–20% of children**\n- Two main types:\n  - **Sensory type:** Cannot hear/perceive their own speech correctly (auditory feedback problem)\n  - **Motor type:** Knows what to say but has difficulty with execution (motor coordination problem)\n\n**Phoneme — Definition:**\n\n- **Phoneme** = the smallest unit of sound in a language that distinguishes meaning\n- Example: /p/ vs /b/ in \"pat\" vs \"bat\"\n\n**TTS — Text-to-Speech:**\n\n```\nText → AI Model → Audio output\n```\n\n- AI generates natural-sounding speech from written text\n- Application: assistive technology for people who cannot speak\n\n**Embedded AI (Resource-Efficient AI):**\n\n- Running AI models directly on the device (not sending data to the cloud)\n- **Constraints:** limited memory, limited compute, limited energy (battery-powered devices)\n- Same concept as Edge AI / TinyML\n- Key trade-off: model accuracy vs. model size/energy cost"
        }
      ],
      "questions": [
        {
          "id": "L21Q1",
          "conceptIndex": 0,
          "text": "What is \"dysphagia\" and why is it clinically important?",
          "options": [
            "A neurological disorder causing memory loss",
            "A disorder affecting balance and coordination",
            "Difficulty swallowing, which can lead to aspiration (food entering lungs), pneumonia, and malnutrition",
            "A speech disorder caused by damage to the larynx"
          ],
          "correct": [
            2
          ],
          "explanation": "Dysphagia is difficulty swallowing. It can lead to aspiration (food/liquid entering the lungs) and consequently pneumonia or malnutrition.",
          "type": "single"
        },
        {
          "id": "L21Q2",
          "conceptIndex": 0,
          "text": "What imaging technique is the clinical gold standard for analyzing swallowing disorders?",
          "options": [
            "MRI (Magnetic Resonance Imaging)",
            "CT scan (Computed Tomography)",
            "Fluoroscopy (X-ray video)",
            "Ultrasound"
          ],
          "correct": [
            2
          ],
          "explanation": "Fluoroscopy (X-ray video) is the clinical gold standard for analyzing swallowing disorders. It provides real-time video imaging.",
          "type": "single"
        },
        {
          "id": "L21Q3",
          "conceptIndex": 0,
          "text": "What is \"semantic segmentation\" in computer vision?",
          "options": [
            "Classifying an entire image into a single category",
            "Drawing bounding boxes around detected objects",
            "Assigning a class label to every individual pixel in an image",
            "Detecting edges between regions of different colors"
          ],
          "correct": [
            2
          ],
          "explanation": "Semantic segmentation assigns a class label to every pixel in an image (e.g., \"tongue,\" \"food bolus,\" \"airway\"). It is much more detailed than object detection.",
          "type": "single"
        },
        {
          "id": "L21Q4",
          "conceptIndex": 0,
          "text": "According to Kist's framework, what is the \"central dogma\" applied to AI in communication disorders?",
          "options": [
            "Data → Model → Prediction",
            "Sensory Input → Brain → Behavior",
            "Input → Processing → Output",
            "Signal → Feature Extraction → Classification"
          ],
          "correct": [
            1
          ],
          "explanation": "Kist's framework is based on the fundamental dogma of neuroscience: Sensory Input → Brain (Processing) → Behavior (Output). AI can intervene at any point in this loop.",
          "type": "single"
        },
        {
          "id": "L21Q5",
          "conceptIndex": 0,
          "text": "Developmental speech disorders affect approximately what percentage of children?",
          "options": [
            "1–2%",
            "5–8%",
            "10–20%",
            "30–40%"
          ],
          "correct": [
            2
          ],
          "explanation": "Developmental speech disorders affect approximately 10–20% of children. The two main types: sensory type (inability to correctly perceive one's own speech) and motor type (coordination problem).",
          "type": "single"
        },
        {
          "id": "L21Q6",
          "conceptIndex": 0,
          "text": "Which of the following correctly describe the TWO main types of developmental speech disorders? Select ALL that apply.",
          "options": [
            "Sensory type: the child cannot correctly perceive their own speech (auditory feedback problem)",
            "Cognitive type: the child has reduced intelligence affecting language acquisition",
            "Motor type: the child knows what to say but has difficulty with motor execution",
            "Structural type: physical abnormality of the mouth or throat",
            "Both types often require different therapeutic approaches"
          ],
          "correct": [
            0,
            2,
            4
          ],
          "explanation": "The two main types of developmental speech disorders: Sensory type (difficulty accurately perceiving one's own speech) and Motor type (knows what to say but has difficulty with motor execution). Both types typically require different therapeutic approaches.",
          "type": "multiple"
        },
        {
          "id": "L21Q7",
          "conceptIndex": 0,
          "text": "What does \"TTS\" stand for and what does it do?",
          "options": [
            "Training and Testing System — used to evaluate AI model performance",
            "Text-to-Speech — converts written text into natural-sounding audio using AI",
            "Transfer and Transform Signals — preprocessing pipeline for biosignals",
            "Temporal-Spectral Transformation — frequency analysis method"
          ],
          "correct": [
            1
          ],
          "explanation": "TTS = Text-to-Speech. Converts written text to natural speech output using AI. Used particularly as assistive technology for individuals who cannot speak.",
          "type": "single"
        }
      ]
    }
  ]
} as const
