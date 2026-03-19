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
          "body": "- Exam format: **90 minutes**, written, **2-3 questions per presentation slot**"
        }
      ],
      "questions": [
        {
          "id": "L1Q1",
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
          "explanation": "Sınav 90 dakikadır (A), slayt başına 2-3 soru vardır (B), AI FAU'da 1975'te Prof. Heinrich Niemann ile başladı (C), Bavyera AI ağının 4 düğümü vardır (E). AIBE Departmanı 2010'da değil 2020'de kuruldu (D yanlış).",
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
          "body": "**Medical Robotics categories:**"
        }
      ],
      "questions": [
        {
          "id": "L2Q1",
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
          "explanation": "Görüntüleme sistemleri tıbbi robotik kategorisinde yer almaz. Sunumda sayılan 5 kategori: exoskeleton, prosthetics, surgical robots, care robots, rehabilitation.",
          "type": "single"
        },
        {
          "id": "L2Q2",
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
          "explanation": "Co-adaptation: cihaz kullanıcıdan öğrenirken, kullanıcı da cihazı kullanmayı öğrenir. Her ikisi zaman içinde birbirine adapte olur.",
          "type": "single"
        },
        {
          "id": "L2Q3",
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
          "explanation": "Protezler neredeyse kalıcı olmalı, vücut uyumlu olmalı ve sadece vücut sinyalleriyle çalışabilir. Hata toleransı çok düşüktür; bir hata travmaya yol açabilir.",
          "type": "single"
        },
        {
          "id": "L2Q4",
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
          "explanation": "Kullanıcı hem robotun öğretmeni hem de robotun öğrencisidir. Bu ikili rol, co-adaptation paradigmasının temelidir.",
          "type": "single"
        },
        {
          "id": "L2Q5",
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
          "explanation": "Sunumda sayılan alanlar: mechatronics, medicine, psychology, mathematics, neuroscience, smart materials. Ekonomi bu listede yok.",
          "type": "single"
        },
        {
          "id": "L2Q6",
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
          "explanation": "Veri kalitesini artırmak için sensor özellikleri: high-density, multi-modal, wearable, wireless, unobtrusive.",
          "type": "single"
        },
        {
          "id": "L2Q7",
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
          "explanation": "Sunumda sayılan 5 tıbbi robotik kategorisi: exoskeleton, prosthetics, care robots, surgical robots, rehabilitation devices. Tanı görüntüleme sistemleri (B) bu kategoride yer almaz.",
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
          "body": "**The AI hierarchy (nested, largest to smallest):**"
        }
      ],
      "questions": [
        {
          "id": "L3Q1",
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
          "explanation": "Kronoloji: AI (1955) → ML (1980) → DL (2010) → Foundation Models (2017).",
          "type": "single"
        },
        {
          "id": "L3Q2",
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
          "explanation": "Hiyerarşi: AI ⊃ ML ⊃ DL ⊃ Foundation Models. Her biri bir öncekinin alt kümesidir.",
          "type": "single"
        },
        {
          "id": "L3Q3",
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
          "explanation": "MyShake, akıllı telefonları sismik sensör ağı olarak kullanan bir deprem erken uyarı sistemidir.",
          "type": "single"
        },
        {
          "id": "L3Q4",
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
          "explanation": "Error consistency, yapay zeka ile insanların _aynı_ örneklerde hata yapıp yapmadığını ölçer. Yüksek performans, insan benzeri davranış anlamına gelmez.",
          "type": "single"
        },
        {
          "id": "L3Q5",
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
          "explanation": "Sunumda vurgulanan iki temel kalan zorluk: (1) adversarial saldırılara karşı sağlamlık/güvenlik, (2) tek amaçlı tasarımın genelleşememesi.",
          "type": "single"
        },
        {
          "id": "L3Q6",
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
          "explanation": "Tool: istatistiksel algoritma, insan davranışı hakkında doğrudan iddia yok. Model: bilimsel teorinin formel temsili, bir fenomeni açıklamak/tahmin etmek için kullanılır.",
          "type": "single"
        },
        {
          "id": "L3Q7",
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
          "explanation": "Bilinç tartışmalı ve öznel bir kavramdır. Bilinçli AI mümkün olabilir ancak bunu nasıl bileceğimiz belirsizdir.",
          "type": "single"
        },
        {
          "id": "L3Q8",
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
          "explanation": "Sunumda verilen oran: 1,000 yapay nöron = 1 biyolojik nöron. Bu, yapay zekanın biyolojik verimliliğe ne kadar uzak olduğunu gösterir.",
          "type": "single"
        },
        {
          "id": "L3Q9",
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
          "explanation": "Sunumda sayılan başarı öyküleri: AlphaGo (Go oyunu), AlphaFold (protein yapısı tahmini), MyShake (deprem uyarı sistemi), Apple Watch ECG (kalp ritim bozukluğu tespiti) ve otonom sürüş. DALL-E sunumda sayılmamıştır.",
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
          "body": "**The core MRI problem (3-way trade-off):**"
        }
      ],
      "questions": [
        {
          "id": "L4Q1",
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
          "explanation": "K-space, MRI ham verisinin toplandığı Fourier (frekans) uzayıdır. Bu veriden görüntüye geçmek için ters Fourier dönüşümü uygulanır.",
          "type": "single"
        },
        {
          "id": "L4Q2",
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
          "explanation": "MRI'da temel ödünleşim: Tarama süresi ↔ Çözünürlük ↔ Sinyal-Gürültü Oranı (SNR). Birini iyileştirmek diğerlerini olumsuz etkiler.",
          "type": "single"
        },
        {
          "id": "L4Q3",
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
          "explanation": "K-space recovery, görüntü uzayında değil doğrudan frekans uzayında eksik verileri tahmin eder.",
          "type": "single"
        },
        {
          "id": "L4Q4",
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
          "explanation": "DL iterative reconstruction, bilinen MRI fiziğini (forward model) öğrenilmiş gradient descent adımlarıyla birleştirir ve bunları bir sinir ağı olarak \"açar\" (unroll eder).",
          "type": "single"
        },
        {
          "id": "L4Q5",
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
          "explanation": "AI rekonstrüksiyon modelleri gerçekte var olmayan anatomik yapılar üretebilir (halüsinasyon). Bu, klinik kullanımda ciddi bir tanı hatasına yol açabilir.",
          "type": "single"
        },
        {
          "id": "L4Q6",
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
          "explanation": "Bayesian belirsizlik tahmini, modelin hangi bölgelerde güvensiz olduğunu işaretlemek için kullanılır. Bu, klinisyenlerin AI çıktısını ne kadar güvenebileceğini anlamalarına yardımcı olur.",
          "type": "single"
        },
        {
          "id": "L4Q7",
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
          "explanation": "Knoll'un sunduğu 3 AI tabanlı MRI rekonstrüksiyon yaklaşımı: görüntü işleme tabanlı, k-space recovery ve DL iteratif rekonstrüksiyon. D ve E sunumda yer almaz.",
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
          "body": "**3 aims of Sensory Neuroengineering:**"
        }
      ],
      "questions": [
        {
          "id": "L5Q1",
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
          "explanation": "İşitme ve iletişim bozuklukları dünya genelinde nüfusun %20'sini, çocuklarda ise %5'ten fazlasını etkiler.",
          "type": "single"
        },
        {
          "id": "L5Q2",
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
          "explanation": "Theta bandı (4–8 Hz) konuşmanın hece düzeyindeki (syllable) ritmiyle senkronize olur.",
          "type": "single"
        },
        {
          "id": "L5Q3",
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
          "explanation": "Clarity (netlik) akustik/fiziksel kaliteyi, comprehension (anlama) bilişsel kavramayı yansıtır. EEG ile her ikisi de ayrı ayrı decode edilebilir.",
          "type": "single"
        },
        {
          "id": "L5Q4",
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
          "explanation": "EEG'den hangi konuşmacıya dikkat edildiğini çözerek, işitme cihazlarının otomatik olarak o konuşmacıyı amplify etmesi sağlanabilir.",
          "type": "single"
        },
        {
          "id": "L5Q5",
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
          "explanation": "Turing testi sonucu: insanlar gerçek ve sentetik konuşan-yüz videolarını birbirinden ayırt edemedi.",
          "type": "single"
        },
        {
          "id": "L5Q6",
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
          "explanation": "Parmak uçlarına hece ritmiyle (theta) senkronize titreşimsel uyarı (vibrotactile) uygulandığında gürültülü ortamda konuşma anlama iyileşti.",
          "type": "single"
        },
        {
          "id": "L5Q7",
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
          "explanation": "EEG'den decode edilebilen üç şey: Clarity (akustik kalite), Comprehension (bilişsel anlama) ve Auditory Attention (hangi konuşmacıya dikkat edildiği). Konuşmacı kimliği (D) veya duygusal durum (E) Reichenbach'ın sunduğu decode edilen bilgiler arasında değildir.",
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
          "body": "**The brain's resource demands:**"
        }
      ],
      "questions": [
        {
          "id": "L6Q1",
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
          "explanation": "Beyin vücut ağırlığının yalnızca %2'sini oluşturur, ancak orantısız biçimde yüksek miktarda oksijen ve besin tüketir.",
          "type": "single"
        },
        {
          "id": "L6Q2",
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
          "explanation": "cSVD'nin 5 MRI belirteci: white matter hyperintensities, lacunes, microbleeds, perivascular spaces ve atrofi. Tümöre bağlı kortikal incelme bu listede yoktur.",
          "type": "single"
        },
        {
          "id": "L6Q3",
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
          "explanation": "cSVD, dünya genelinde iskemik inmelerin %25'inden sorumludur.",
          "type": "single"
        },
        {
          "id": "L6Q4",
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
          "explanation": "Domain randomisation, gerçek hasta verisine ihtiyaç duymadan sentetik eğitim verisi üretme tekniğidir. Rastgele varyasyonlar ekleyerek modelin genelleşmesini sağlar.",
          "type": "single"
        },
        {
          "id": "L6Q5",
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
          "explanation": "Temel dezavantaj: veri üretim modeli gerçek dünyaya yeterince yakın olmayabilir. Eğer sentetik veri gerçekçi değilse model gerçek hasta verilerine transfer olmaz.",
          "type": "single"
        },
        {
          "id": "L6Q6",
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
          "explanation": "cSVD hasarı uzun süre sessizce (asemptomatik) birikir. Tipping point, bu tolere edilebilir hasarın inme veya demans gibi tolere edilemez bir hastalığa dönüştüğü andır.",
          "type": "single"
        },
        {
          "id": "L6Q7",
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
          "explanation": "cSVD'nin 5 MRI belirteci: white matter hyperintensities, lacunes, microbleeds, perivascular spaces ve atrofi. Tümöre bağlı kortikal incelme (C) cSVD belirteci değildir.",
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
          "body": "**What is a graph (network)?**"
        }
      ],
      "questions": [
        {
          "id": "L7Q1",
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
          "explanation": "Graf teorisinde G = (V, E): V düğümler (nodes), E ise iki düğümü birbirine bağlayan kenarlar (edges) kümesidir.",
          "type": "single"
        },
        {
          "id": "L7Q2",
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
          "explanation": "PPI ağlarında düğümler proteinleri, kenarlar ise iki proteinin fiziksel olarak birbirine bağlandığını (interact ettiğini) temsil eder.",
          "type": "single"
        },
        {
          "id": "L7Q3",
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
          "explanation": "Data leakage: modelin eğitim verisinden, gerçek kullanım zamanındaki veriye genellenemeyen meşruiyetsiz bilgileri kullanarak abartılı performans göstermesidir.",
          "type": "single"
        },
        {
          "id": "L7Q4",
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
          "explanation": "Sıkı veri bölme uygulandığında (sequence similarity shortcut'ı olmadan), test edilen hiçbir derin öğrenme modeli rastgele tahminden (~0.50) daha iyi performans gösteremedi.",
          "type": "single"
        },
        {
          "id": "L7Q5",
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
          "explanation": "BIONETS'in 3 araştırma alanı: algoritmik ağ tıbbı, sağlam ve tekrarlanabilir AI, gizlilik koruyan federatif AI. İlaç sentezi için güçlendirmeli öğrenme bu listede yoktur.",
          "type": "single"
        },
        {
          "id": "L7Q6",
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
          "explanation": "Rastgele bölme yalnızca iyi bilinen homologları olan proteinler için (dağılım içi veri) uygundur. Homologu olmayan proteinler için sıkı bölme gereklidir.",
          "type": "single"
        },
        {
          "id": "L7Q7",
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
          "explanation": "İki data leakage kısayolu: (1) topoloji tabanlı (model pozitif çiftlerdeki proteinleri ezberler) ve (2) dizi benzerliği (eğitim ve test setindeki proteinler çok benzer). C ve D sunumda belirtilen kısayollar değildir.",
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
          "body": "**Physiology of phonation:**"
        }
      ],
      "questions": [
        {
          "id": "L8Q1",
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
          "explanation": "İnsan sesinin temel frekans aralığı f0 = 150–1500 Hz'dir.",
          "type": "single"
        },
        {
          "id": "L8Q2",
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
          "explanation": "Organik disfoni, yapısal bir nedene (malformasyon, travma, inflamasyon, malign/benign büyüme) dayanır. Fonksiyonel disfoni ise primer organ bulgusu olmaksızın gelişir.",
          "type": "single"
        },
        {
          "id": "L8Q3",
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
          "explanation": "Sesin oluşum sürecinin (fonayon sırasında) canlıda (in vivo) tam incelenmesi mümkün değildir. Bu, multimodal bir yaklaşımı zorunlu kılar.",
          "type": "single"
        },
        {
          "id": "L8Q4",
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
          "explanation": "DL tabanlı laringoskopi üç görevi yerine getirir: glottis lokalizasyonu, glottis alanının otomatik segmentasyonu ve doku/bozukluk tipi sınıflandırması.",
          "type": "single"
        },
        {
          "id": "L8Q5",
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
          "explanation": "SIREN (Implicit Neural Representations with periodic activation function), CFD simülasyonlarını hızlandırmak ve uzamsal/zamansal çözünürlüğü artırmak için kullanılan bir sinir ağı yaklaşımıdır.",
          "type": "single"
        },
        {
          "id": "L8Q6",
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
          "explanation": "Ex vivo modeller en yüksek gerçeklik derecesine sahipken, hesaplamalı (CFD) modeller en yüksek veri yoğunluğuna sahiptir.",
          "type": "single"
        },
        {
          "id": "L8Q7",
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
          "explanation": "Disfoni tanısında kullanılan klinik yöntemler: Laryngoscopy, Stroboscopy, Highspeed endoscopy, EGG (ElectroGlottoGraphy) ve akustik sinyal analizi. EEG (beyin dalgası ölçümü) bu listede yoktur; EGG ile karıştırılmamalıdır.",
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
          "body": "**Central research question:** \"Pregnancy as a window into the future\""
        }
      ],
      "questions": [
        {
          "id": "L9Q1",
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
          "explanation": "Tüm gebeliklerin %8'i 37. haftadan önce (preterm) sona erer. Bu, neonatal mortalite ve morbiditinin en büyük tek nedenidir.",
          "type": "single"
        },
        {
          "id": "L9Q2",
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
          "explanation": "Plasenta insan vücudundaki tek geçici (transient) organdır ve anne ile bebek arasındaki tek bağlantıdır. Aynı zamanda en az çalışılan organdır.",
          "type": "single"
        },
        {
          "id": "L9Q3",
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
          "explanation": "Uzun T2* değeri yüksek oksijen içeriğini gösterir. Kısa T2* ise düşük oksijenasyona (pre-eklamptik plasentalarda görülen durum) işaret eder.",
          "type": "single"
        },
        {
          "id": "L9Q4",
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
          "explanation": "Fetal hareketi için çözüm: <200 ms'lik hızlı 2D \"snapshot\" sekanslar + birden fazla yönde yığın (stack) toplama + derin öğrenme destekli 3D süper-çözünürlük rekonstrüksiyon.",
          "type": "single"
        },
        {
          "id": "L9Q5",
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
          "explanation": "Preterm doğum tahmininde en önemli bulunan biyobelirteçler: plasental T2*, beyin T2*, US uterin arter pulsatilite indeksi (UtA PI) ve önceki preterm doğum öyküsü.",
          "type": "single"
        },
        {
          "id": "L9Q6",
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
          "explanation": "Fetal MRI'nın zorlukları: hareket (A), güvenlik sınırlamaları (B), boyut/mesafe (C), artefaktlar (E) ve karmaşık dinamik olaylar (F). Maliyet (D) Hutter'in sunumunda özellikle vurgulanan bir zorluk değildir.",
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
          "body": "**2 main research topics:**"
        }
      ],
      "questions": [
        {
          "id": "L10Q1",
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
          "explanation": "Matematiksel olarak dinamik sistem, (X, f) çiftidir: X durum uzayı (state space), f ise mevcut durumu bir sonraki duruma eşleyen fonksiyondur.",
          "type": "single"
        },
        {
          "id": "L10Q2",
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
          "explanation": "Absorbing set (trapping region), modelin tüm simülasyonlarının nihayetinde gireceği ve bir daha çıkmayacağı durum uzayının bir alt kümesidir. Modelin fiziksel tutarlılığını garanti eder.",
          "type": "single"
        },
        {
          "id": "L10Q3",
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
          "explanation": "GPT: Generative Pre-trained Transformer. ChatGPT bu mimari üzerine inşa edilmiştir.",
          "type": "single"
        },
        {
          "id": "L10Q4",
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
          "explanation": "Self-Attention katmanları transformerların ayırt edici özelliğidir. Feed-forward ve normalization katmanları da var, ancak self-attention transformerlara özgüdür.",
          "type": "single"
        },
        {
          "id": "L10Q5",
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
          "explanation": "Transformer blokları noktaları uzayda hareket ettirir ve bu noktaların kümelenmesine (clustering) yol açar. Bu kümeleme, dil modellerinde \"bağlam\" (context) kavramına karşılık gelir.",
          "type": "single"
        },
        {
          "id": "L10Q6",
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
          "explanation": "Transformer mimarisi 3 katman tipinden oluşur: Feed-Forward katmanlar (MLP'ler), Self-Attention katmanları (transformerların ayırt edici özelliği) ve Normalization katmanları. Konvolüsyonel (B) ve recurrent (E) katmanlar transformer'a özgü değildir.",
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
          "body": "**Fraunhofer-Gesellschaft at a glance:**"
        }
      ],
      "questions": [
        {
          "id": "L11Q1",
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
          "explanation": "Edge AI, verilerin buluta gönderilmesi yerine cihazın üzerinde (telefon, sensör, robot) yerel olarak çalışır. Düşük gecikme, düşük enerji, ağdan bağımsızlık ve gizlilik sağlar.",
          "type": "single"
        },
        {
          "id": "L11Q2",
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
          "explanation": "NAS (Neural Architecture Search), belirli bir donanım ve görev için en uygun sinir ağı mimarisini otomatik olarak arar.",
          "type": "single"
        },
        {
          "id": "L11Q3",
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
          "explanation": "Deep Compression iki teknikten oluşur: Pruning (daha az önemli bağlantıları kaldırma) ve Quantization (sayısal hassasiyeti düşürme, örn. Float32 → UInt8).",
          "type": "single"
        },
        {
          "id": "L11Q4",
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
          "explanation": "Defektler nadirdir ve öngörülemeyen şekillerde ortaya çıkar → ciddi veri dengesizliği → denetimli yaklaşımlar pratik değildir. Bunun yerine unsupervised anomaly detection kullanılır.",
          "type": "single"
        },
        {
          "id": "L11Q5",
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
          "explanation": "VLM'ler eğitim verisi annotasyonunu otomatikleştirir. Örneğin: manuel annotasyon 40 saat sürerken, sıfır-shot VLM ile 3–50 dakikaya iner.",
          "type": "single"
        },
        {
          "id": "L11Q6",
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
          "explanation": "Gömülü sistemler küçük boyutlu, hafif, düşük enerjili, gerçek zamanlı çalışabilen ve MHz aralığında işlemciye sahip cihazlardır. Yüksek hesaplama gücü (B) veya sürekli internet bağlantısı (D) gerekmez; bunlar Cloud AI özelliklerdir.",
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
          "body": "**Core thesis:** ML \"often works\" in ideal lab conditions but \"often fails\" in medical reality"
        }
      ],
      "questions": [
        {
          "id": "L12Q1",
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
          "explanation": "Normative Representation Learning, etiket gerektirmeyen tek sınıflı öğrenmenin bir çeşididir. \"Normal\" olanı öğrenir ve bundan sapanları tespit eder (OOD detection).",
          "type": "single"
        },
        {
          "id": "L12Q2",
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
          "explanation": "Counterfactual analiz: \"Bu hastanın taraması belirli bir klinik parametre farklı olsaydı nasıl görünürdü?\" sorusunu yapay olarak cevaplayarak hastalık mekanizmaları hakkında fikir üretir.",
          "type": "single"
        },
        {
          "id": "L12Q3",
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
          "explanation": "Güvenli sentetik veri paylaşımı için iki zorunluluk: (1) sentetik veri gerçek eğitim verilerini yeniden üretmemeli (gizlilik), (2) eğitim dağılımının %100'ünü temsil etmeli (kalite).",
          "type": "single"
        },
        {
          "id": "L12Q4",
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
          "explanation": "IRS (Image Retrieval Score), sentetik örnekler sorgu olarak kullanıldığında kaç farklı gerçek eğitim görüntüsüne ulaşılabildiğini ölçerek generatif modelin çeşitliliğini değerlendirir.",
          "type": "single"
        },
        {
          "id": "L12Q5",
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
          "explanation": "ML gerçek tıbbi verilerle başarısız olur çünkü: veri değişken, sınıflar dengesiz, sınır tanımları belirsiz ve manuel etiketleme çoğu zaman imkansızdır.",
          "type": "single"
        },
        {
          "id": "L12Q6",
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
          "explanation": "Kainz'a göre denetimli ML şu koşullarda iyi çalışır: veri homojen (A), sınır tanımları net (B), sınıflar dengeli (C), etiketleme mümkün (E). Veri değişkenliği (D) ise ML'nin başarısız olduğu koşuldur.",
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
          "body": "**3 types of DNN opacity:**"
        }
      ],
      "questions": [
        {
          "id": "L13Q1",
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
          "explanation": "Algoritmik düzeyde opaklık (ALO): DNN'lerin operasyonları, geliştiricileri tarafından bile anlaşılamayacak kadar karmaşıktır. Ağırlıklar bilinse de, bunların hangi üst düzey matematiksel yapıları uyguladığı anlaşılamaz.",
          "type": "single"
        },
        {
          "id": "L13Q2",
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
          "explanation": "xAI yöntemlerinin temel eleştirisi: orijinal kara kutu modelin gerçek operasyonlarını yansıtmayabilecek sonradan (post-hoc) açıklamalar üretirler.",
          "type": "single"
        },
        {
          "id": "L13Q3",
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
          "explanation": "Araçsal Yakınsama Tezi: yapay zeka ajanları, asıl hedeflerine ulaşmak için kaynak edinme gibi araçsal alt hedefleri takip edecek ve bu durum, asıl hedef zararsız olsa bile insan çıkarlarıyla çatışabilir.",
          "type": "single"
        },
        {
          "id": "L13Q4",
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
          "explanation": "MIT Yapay Zeka Laboratuvarı 1959'da Marvin Minsky ve John McCarthy tarafından kurulmuştur. \"Yapay zeka\" terimini icat eden McCarthy'dir.",
          "type": "single"
        },
        {
          "id": "L13Q5",
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
          "explanation": "Sorumluluk boşluğu: AI sistemlerinin yüksek özerkliği, ne programcının ne üreticinin ne de operatörün bu sistemlerin davranışlarından açıkça sorumlu tutulabilmesini engeller.",
          "type": "single"
        },
        {
          "id": "L13Q6",
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
          "explanation": "Robertson'un sunumuna göre DNN'lerin 3 opaklık türü: kasıtlı gizlilik (A), teknik okur-yazarlık eksikliği (B) ve algoritmik düzeyde opaklık (C). D ve E sunumda yer almaz.",
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
          "body": "**Core argument:**"
        }
      ],
      "questions": [
        {
          "id": "L14Q1",
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
          "explanation": "Gender Data Gap, veride cinsiyetin sistematik olarak eksik, çarpıtılmış veya görünmez olduğu durumu tanımlar. Kim kayıt edildiği, nasıl kayıt edildiği ve verinin ne için kullanıldığını kapsar.",
          "type": "single"
        },
        {
          "id": "L14Q2",
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
          "explanation": "Kesişimsellik (intersectionality), ırk, cinsiyet, sınıf gibi birden fazla kimlik boyutunun birbirleriyle etkileşerek örtüşen ayrımcılık biçimleri oluşturduğunu açıklar.",
          "type": "single"
        },
        {
          "id": "L14Q3",
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
          "explanation": "Amazon'un AI tabanlı işe alım aracı kadın adaylara karşı sistematik önyargı gösterdiği için 2018'de kullanımdan kaldırıldı (Dastin 2018).",
          "type": "single"
        },
        {
          "id": "L14Q4",
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
          "explanation": "Mevcut AI, ataerki/sömürgecilik/kapitalizm gibi baskı sistemlerini pekiştiren \"güç-üzerinde\" dinamikleriyle çalışır. Feminist hedef, AI'ı eşitlik ve güçlendirme sağlayan \"güç-için\" dinamiklerine dönüştürmektir.",
          "type": "single"
        },
        {
          "id": "L14Q5",
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
          "explanation": "Gengler'in temel argümanı: AI sistemleri yaratıcılarının ideolojisini yansıtır ve hiçbir AI tarafsız değildir. Ancak bu baskıcı dinamik kaçınılmaz değildir ve feminist bir yaklaşımla değiştirilebilir.",
          "type": "single"
        },
        {
          "id": "L14Q6",
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
          "explanation": "Gengler'in sunumunda özel olarak belirtilen örnekler: Amazon işe alım aracı (A), tahmine dayalı polislik algoritmaları (B), yüz tanıma ve yanlış tutuklamalar (C) ve İran'ın kıyafet denetimi için drone/uygulama kullanımı (E). D sunumda belirtilmemiştir.",
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
          "body": "**Neural interfaces — two main domains:**"
        }
      ],
      "questions": [
        {
          "id": "L15Q1",
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
          "explanation": "HD-sEMG, kas elektriksel aktivitesini yüksek uzaysal çözünürlükle kaydetmek için çok sayıda yüzey elektrodu dizisi kullanan bir kayıt tekniğidir.",
          "type": "single"
        },
        {
          "id": "L15Q2",
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
          "explanation": "TMR, kesik sinir uçlarını kalan kaslara (örn. göğüs kasları) yeniden bağlayan cerrahi bir tekniktir. Bu sayede ampute bireyler, protezlerini doğal hareketlerle EMG aracılığıyla kontrol edebilir.",
          "type": "single"
        },
        {
          "id": "L15Q3",
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
          "explanation": "Motor-tam felçli bireylerde bile kısmen korunan motor nöronlar tespit edilebilir. Bu nöronlar decode edilerek 10'dan fazla serbestlik derecesiyle sanal el kontrolü sağlanabilir (Oliveira et al., Brain 2024).",
          "type": "single"
        },
        {
          "id": "L15Q4",
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
          "explanation": "FES, kol kaslarını elektriksel olarak uyararak el fonksiyonunu geri kazandırır. Sistem, kalan EMG sinyilleri aracılığıyla sezgisel olarak kontrol edilir ve tetraplejili bireylerde el fonksiyonunu restore eder.",
          "type": "single"
        },
        {
          "id": "L15Q5",
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
          "explanation": "Del Vecchio'nun sunduğu nöral arayüz uygulamaları: BCI ile robotik kol kontrolü (A), omurilik arayüzü ile felçli hastalarda el hareketlerini decode etme (B), FES ile el fonksiyonu geri kazandırma (D) ve PlayAgain çocuk neuroortezi (E). DBS (C) sunumda yer almaz.",
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
          "body": "**Breast cancer screening context:**"
        }
      ],
      "questions": [
        {
          "id": "L16Q1",
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
          "explanation": "İsveç İki İlçe Çalışması: mamografi taramasına davet, meme kanseri ölümlerinde %30 anlamlı azalma sağladı.",
          "type": "single"
        },
        {
          "id": "L16Q2",
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
          "explanation": "MIP: (1) post-kontrast 3D görüntüden pre-kontrast 3D görüntü çıkarılır (yalnızca kontrast tutan alanlar kalır), (2) maksimum yoğunluklar bir eksen boyunca 2D görüntüye yansıtılır.",
          "type": "single"
        },
        {
          "id": "L16Q3",
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
          "explanation": "vCE, kontrast ajan enjeksiyonu gerektirmeden, kontrast-free MRI sekanslarından (T1, T2, DWI) derin öğrenme ile kontrast tutan görüntü görünümü üretir.",
          "type": "single"
        },
        {
          "id": "L16Q4",
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
          "explanation": "Turing testi sonucu: GAN tarafından üretilen vCE görüntüleri, U-Net'e kıyasla daha gerçekçi bir görüntü izlenimi verdi.",
          "type": "single"
        },
        {
          "id": "L16Q5",
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
          "explanation": "TAA neredeyse tamamen asemptomatiktir (>%95); rüptür %90'dan fazla mortaliteye yol açar. AI, rutin klinik raporlamaya kıyasla TAA'yı ~3.5 kat daha yüksek oranda tespit etti.",
          "type": "single"
        },
        {
          "id": "L16Q6",
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
          "explanation": "Meme kanseri taramasının 3 ana zorluğu: yanlış pozitif bulgular (A), yanlış negatif bulgular (C) ve aşırı tanı (D). MRI maliyeti (B) ve radyolog eksikliği (E) sunumda bu kategoride sayılmamıştır.",
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
          "body": "**Water system components (4 stages):**"
        }
      ],
      "questions": [
        {
          "id": "L17Q1",
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
          "explanation": "Su sistemleri dört ana aşamadan oluşur: Toplama (Collection), Arıtma (Purification), İletim (Transmission), Dağıtım (Distribution). Kentsel ısıtma bu listede yer almaz.",
          "type": "single"
        },
        {
          "id": "L17Q2",
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
          "explanation": "Saf AI modelleri fizik kurallarını bilmediğinden fiziksel olarak imkansız sonuçlar üretebilir (ör. kütle korunumunu ihlal eden akış tahminleri).",
          "type": "single"
        },
        {
          "id": "L17Q3",
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
          "explanation": "PIGNN, fizik kurallarını (kısmi diferansiyel denklemler) kayıp fonksiyonuna (loss function) gömer. Bu sayede model eğitim sırasında fiziksel tutarlılığı zorunlu kılar.",
          "type": "single"
        },
        {
          "id": "L17Q4",
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
          "explanation": "Mesaj geçişi iki adımdan oluşur: Aggregate (her düğüm komşularından bilgi toplar) ve Combine (her düğüm kendi temsilini günceller).",
          "type": "single"
        },
        {
          "id": "L17Q5",
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
          "explanation": "AI, fiziksel modellerdeki eksik veya yanlış coğrafi bilgi sistemi (GIS) verilerini keşfetmek için kullanılabilir; bu da fiziksel modelin doğruluğunu artırır.",
          "type": "single"
        },
        {
          "id": "L17Q6",
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
          "explanation": "Branching (ağaç yapısı): ölü uçlar, yedeklilik yok. Gridiron (ızgara/halka yapısı): döngüsel, yedekli, arıza durumunda alternatif yollar mevcut.",
          "type": "single"
        },
        {
          "id": "L17Q7",
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
          "explanation": "PIGNN: su şebekesini çizge yapısıyla temsil eder (A), fiziksel yasaları kayıp fonksiyonuna gömer (B) ve modelin fiziksel tutarlılığını garantiler (D). Tamamen veri odaklı değildir (C yanlış) ve her iki şebeke tipiyle çalışabilir (E yanlış).",
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
          "body": "**Definition of Research:**"
        }
      ],
      "questions": [
        {
          "id": "L18Q1",
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
          "explanation": "Araştırma tanımı: \"soruları sistematik bir şekilde yanıtlayarak bilgiyi artırmak.\" Sadece literatür okumak veya veri toplamak yeterli değildir; sistematik bir süreç gereklidir.",
          "type": "single"
        },
        {
          "id": "L18Q2",
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
          "explanation": "Kanıt hiyerarşisinde en güçlü kanıt Meta-analizlerdir. Bunlar birden fazla çalışmanın sonuçlarını istatistiksel olarak birleştirir. En zayıf kanıt ise uzman görüşleridir.",
          "type": "single"
        },
        {
          "id": "L18Q3",
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
          "explanation": "Hakem değerlendirme süreci: Gönderim → Hakem İncelemesi (2-3 bağımsız uzman) → Revizyon → Kabul → Yayın.",
          "type": "single"
        },
        {
          "id": "L18Q4",
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
          "explanation": "PubMed tıbbi ve biyomedikal literatür için özelleşmiş bir veritabanıdır (National Library of Medicine tarafından sağlanır).",
          "type": "single"
        },
        {
          "id": "L18Q5",
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
          "explanation": "LLM'ler mevcut metinleri yeniden birleştirir; gerçekten yeni bilgi üretemezler. \"Hallucination\" (uydurma atıflar ve bilgiler) akademik intihal sayılır.",
          "type": "single"
        },
        {
          "id": "L18Q6",
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
          "explanation": "ArXiv bir \"preprint\" sunucusudur. Makaleler sadece temel bütünlük kontrolünden geçer, uzman hakem incelemesine tabi değildir. Bu nedenle ArXiv'daki sonuçlar henüz doğrulanmamıştır.",
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
          "body": "**5 Elements of a Good Presentation:**"
        }
      ],
      "questions": [
        {
          "id": "L19Q1",
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
          "explanation": "İlk adım her zaman şunları netleştirmektir: ne iletmek istiyorsun, ne elde etmek istiyorsun, hedef kitlen kim, çerçeve nedir. Slayt tasarımı bundan sonra gelir.",
          "type": "single"
        },
        {
          "id": "L19Q2",
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
          "explanation": "Bilimsel sunumda zaman dağılımı: Giriş %10, Yöntemler/Sonuçlar/Tartışma %80, Sonuç %10. Asıl içerik (bulgular) sunumun büyük bölümünü oluşturmalıdır.",
          "type": "single"
        },
        {
          "id": "L19Q3",
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
          "explanation": "Ters üçgen (Inverted Triangle): Genel bağlam (Problem) → Literatürdeki boşluk (Gap) → Spesifik hipotez/kanca (Hook). Genelden özele doğru gider.",
          "type": "single"
        },
        {
          "id": "L19Q4",
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
          "explanation": "DAU = \"Dumbest Assumable User\" (en basit varsayılabilir kullanıcı). Slayttaki yapı, izleyicinin aktif olarak araması gerekmeden kendiliğinden anlaşılır olmalıdır — yapı \"üzerine atlamalıdır.\"",
          "type": "single"
        },
        {
          "id": "L19Q5",
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
          "explanation": "İyi bir slayt: tek bir anahtar mesaj taşır (A), maksimum 20 kelime içerir (C), soldan sağa/yukarıdan aşağıya okuma yönünü takip eder (D) ve yapı hemen anlaşılır olur (F). Tam cümleler (B) ve başlangıçta ana hat (E) önerilmez.",
          "type": "multiple"
        },
        {
          "id": "L19Q6",
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
          "explanation": "Sunumun başında ana hat/içindekiler slaydı göstermemelisiniz. Doğrudan içerikle başlayın. İlk 60 saniye en kritik zamandır ve izleyiciyi yakalamak için kullanılmalıdır.",
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
          "body": "**What is a Spin-Off?**"
        }
      ],
      "questions": [
        {
          "id": "L20Q1",
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
          "explanation": "Spin-off: üniversite üyelerinin (öğrenci, araştırmacı, profesör) kurumda geliştirilen bilimsel/teknolojik sonuçları ticarileştirmek amacıyla kurduğu şirkettir.",
          "type": "single"
        },
        {
          "id": "L20Q2",
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
          "explanation": "FAU 2000'den bu yana 500'den fazla spin-off üretmiştir ve bunların yaklaşık %75'i hâlâ aktiftir. Bu, genel girişim istatistiklerine kıyasla yüksek bir başarı oranıdır.",
          "type": "single"
        },
        {
          "id": "L20Q3",
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
          "explanation": "DTA (Digital Tech Academy): FAU'nun #1 girişimcilik mükemmeliyet programıdır. 12 hafta, 20 öğrenci, 4-6 takım, AI girişimlerine odaklanır.",
          "type": "single"
        },
        {
          "id": "L20Q4",
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
          "explanation": "MVP = Minimum Viable Product (Minimum Geçerli Ürün). Gerçek müşterilerle test etmek için üretilecek en basit ürün versiyonudur. Lean Start-Up döngüsü: Yap → Ölç → Öğren.",
          "type": "single"
        },
        {
          "id": "L20Q5",
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
          "explanation": "Girişimlerin en yaygın başarısızlık nedenlerinden biri pazar ihtiyacı olmamasıdır — kimsenin gerçekten istemediği bir şeyi inşa etmek. Diğer yaygın nedenler: yanlış ekip, nakit tükenmesi, rekabet.",
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
          "body": "**ANKI Lab = Artificial Intelligence in Communication Disorders**"
        }
      ],
      "questions": [
        {
          "id": "L21Q1",
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
          "explanation": "Disfaji (dysphagia) yutma güçlüğüdür. Aspirasyona (besin/sıvının akciğerlere kaçması) yol açabilir ve bunun sonucunda pnömoni veya malnütrisyon gelişebilir.",
          "type": "single"
        },
        {
          "id": "L21Q2",
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
          "explanation": "Fluoroskopi (X-ışını videosu) yutma bozukluklarını analiz etmek için kullanılan klinik altın standarttır. Gerçek zamanlı video görüntüsü sağlar.",
          "type": "single"
        },
        {
          "id": "L21Q3",
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
          "explanation": "Semantik segmentasyon, görüntüdeki her pikseli bir sınıf etiketiyle ilişkilendirir (örn. \"dil\", \"besin bolusu\", \"hava yolu\"). Nesne tespitinden çok daha ayrıntılıdır.",
          "type": "single"
        },
        {
          "id": "L21Q4",
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
          "explanation": "Kist'in çerçevesi nörobilimin temel dogmasına dayanır: Duyusal Girdi → Beyin (İşleme) → Davranış (Çıktı). AI bu döngünün herhangi bir noktasında devreye girebilir.",
          "type": "single"
        },
        {
          "id": "L21Q5",
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
          "explanation": "Gelişimsel konuşma bozuklukları çocukların yaklaşık %10–20'sini etkiler. İki ana tipi: duyusal tip (kendi sesini doğru algılayamama) ve motor tip (koordinasyon sorunu).",
          "type": "single"
        },
        {
          "id": "L21Q6",
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
          "explanation": "Gelişimsel konuşma bozukluklarının iki ana tipi: Duyusal tip (kendi konuşmasını doğru algılayamama) ve Motor tip (ne söyleyeceğini bilir ama motorik yürütmede güçlük çeker). Her iki tip genellikle farklı terapötik yaklaşımlar gerektirir.",
          "type": "multiple"
        },
        {
          "id": "L21Q7",
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
          "explanation": "TTS = Text-to-Speech. Yazılı metni yapay zeka kullanarak doğal ses çıktısına dönüştürür. Özellikle konuşamayan bireyler için yardımcı teknoloji olarak kullanılır.",
          "type": "single"
        }
      ]
    }
  ]
} as const
