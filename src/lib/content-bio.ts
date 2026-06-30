// BIO — Introduction to Molecular Biology content
// FAU Summer 2026 · PD Dr. Dr. Katja Kobow
// Exam scope = Katja's core lectures only. Dr. Paraskevi Chasani's paper
// presentations (Evo2, Basic ML/DL, RNA 3D, AlphaFold 3, Sainsc) are excluded.
// Sugars (6-1) was an AI-narrated video lecture (no PDF) — slides recovered
// from the video frames and included below.
import type { Content } from './types'

export const content: Content = {
  "lectures": [
    {
      "id": 1,
      "title": "Introduction to Molecular Biology: Universal Features of Cells",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "What Molecular Biology Studies & The Three Domains of Life",
          "body": "**Molecular biology** studies how molecules interact with one another in living organisms to perform the functions of life.\n\nLife started **~3.5 billion years ago**. All life is organized into **three major domains** (based on genome comparisons):\n\n| Domain | Nucleus? | Cell type | Examples |\n|---|---|---|---|\n| **Bacteria** (Eubacteria) | No | Prokaryote | E. coli, Salmonella, Cyanobacteria |\n| **Archaea** | No | Prokaryote | Asgard archaea |\n| **Eukaryota** | Yes | Eukaryote | Animals, plants, fungi |\n\n- **Prokaryotes = NO nucleus**; **Eukaryotes = HAVE a nucleus** (the defining distinction).\n- Two key **endosymbiosis** events shaped eukaryotes: **mitochondrial symbiosis** and **chloroplast symbiosis**.\n- Insects dominate known species diversity (~1.05 million of ~2.15 million total)."
        },
        {
          "heading": "The Cell — Minimal Self-Reproducing Unit of Life",
          "body": "The **cell** is the minimal self-reproducing unit of life.\n\n```\nEUKARYOTIC CELL              PROKARYOTIC CELL\n- Nucleus (DNA enclosed)     - NO nucleus (DNA free in cytoplasm)\n- Mitochondria               - Capsule (outer)\n- Golgi complex              - Cell wall\n- Endoplasmic reticulum      - Ribosomes\n- Lysosomes                  - Plasma membrane\n- Ribosomes                  - Cytoplasm\n- Plasma membrane            \n```\n\n- **Eukaryotic cells:** animals, plants, fungi — have membrane-bound organelles.\n- **Prokaryotic cells:** archaea, bacteria — DNA sits free in cytoplasm; often have a capsule + cell wall.\n- **Shared structures:** ribosomes, plasma membrane, cytoplasm, DNA."
        },
        {
          "heading": "Universal Features #1–2: DNA Structure & Templated Polymerization",
          "body": "**Feature #1 — Double-stranded DNA:** long, unbranched, paired polymer that **stores hereditary information**. Always built from the same **four nucleotide monomers: A, T, C, G**. DNA transferred between cells across species is successfully read, interpreted, and copied (universal code).\n\n**Nucleobases:**\n\n| Class | Bases |\n|---|---|\n| **Purines** | **A**denine, **G**uanine |\n| **Pyrimidines** | **T**hymine, **C**ytosine |\n\nBase pairing: **A–T** and **G–C**, held by **hydrogen bonds**; a **sugar–phosphate backbone** runs antiparallel (5'→3').\n\n**Feature #2 — Templated polymerization:** new strands are built by reading an existing **template strand** and adding complementary **nucleotide monomers**. Each strand of the parent double helix serves as a template → two daughter helices, each = one old (template) + one **new strand**."
        },
        {
          "heading": "Universal Feature #3: Transcription (DNA → RNA)",
          "body": "**All cells transcribe parts of their DNA into RNA** — essential to gene expression.\n\n**RNA Polymerase** carries out transcription in 3 steps:\n\n```\n1. INITIATION   -> RNA Pol binds the PROMOTER\n2. ELONGATION   -> RNA synthesized 5'->3', complementary to template\n3. TERMINATION  -> RNA Pol releases at the TERMINATION SITE\n```\n\nKey facts:\n- Transcribed **RNA is single-stranded**.\n- RNA is **complementary** to the DNA template.\n- RNA uses a 4-letter code **A, U, C, G** — **U (uracil) replaces T (thymine)**."
        },
        {
          "heading": "The Central Dogma & Universal Feature #4: Translation",
          "body": "**Central dogma:** information flows\n\n```\nDNA --transcription--> mRNA --translation--> PROTEIN\n```\n\n**Feature #4 — RNA is translated into protein.** All cells do it the same way, using the same amino acids.\n\n- mRNA is read in **codons** (groups of **3 nucleotides**); each codon specifies one amino acid (e.g., UAC→Tyr, UCA→Ser, GGU→Gly).\n- Translation occurs on the **ribosome**, assembled from a **large subunit + small subunit** → complete ribosome.\n\n**Four levels of protein structure:**\n\n| Level | Description |\n|---|---|\n| **Primary** | Linear sequence of amino acids (polypeptide chain) |\n| **Secondary** | Local folds: **α-helix**, **β-pleated sheet** |\n| **Tertiary** | Overall 3D fold of one chain |\n| **Quaternary** | Assembly of multiple subunits |"
        },
        {
          "heading": "Universal Feature #5–6: Proteins as Catalysts, Protein Diversity & Genes",
          "body": "**Feature #5 — Proteins act as catalysts (enzymes).** An enzyme binds substrate at its **active site**, forming an **enzyme–substrate complex**; bonds break/form, product is released, and the enzyme is **unchanged** (reusable). Enzymes **lower the activation energy** of a reaction (lower energy barrier than the no-catalyst path), without altering ΔG.\n\n**Protein diversity (functional classes):** enzymatic, storage (e.g., ovalbumin), hormonal (e.g., thyroid hormone), motor (actin/myosin), defensive (antibodies), transport (ion channels), receptor, structural (collagen).\n\n**Feature #6 — Proteins are encoded by genes.** A **gene** = a segment of DNA encoding protein/RNA molecules and functions. Genes have:\n- **Start/End** (= punctuation in a text)\n- **Regulatory features** deciding when a gene is read (promoter, enhancers/silencers)\n- **Coding (exons)** and **non-coding (introns)** parts; the **ORF (Open Reading Frame)** holds exons + introns. Prokaryotes organize genes into **operons** with a shared promoter + operator."
        },
        {
          "heading": "Universal Features #7–8: Energy & Metabolism",
          "body": "**Feature #7 — Life requires a continual input of free energy.** **#8 — All cells function as biochemical factories:** food in → building blocks + energy → waste out, using the cell's collection of catalysts.\n\n**Cellular respiration of glucose:**\n\n| Pathway | Reaction | ATP yield |\n|---|---|---|\n| **Aerobic** | Glucose + O₂ → CO₂ + H₂O | **30 or more ATP** |\n| **Anaerobic** | Glucose → Lactate | **2 ATP** |\n\nPathway map:\n```\nGlucose -> GLYCOLYSIS (+ATP, NADH)\n           |-> Pyruvate -> Acetyl-CoA -> TCA CYCLE (NADH, FADH2, CO2, ATP)\n           |                                  |\n           |                                  v\n           |-> Fermentation -> Lactate    ELECTRON TRANSFER (+O2) -> H2O + many ATP\n```\nAerobic respiration extracts far more ATP per glucose than anaerobic fermentation."
        },
        {
          "heading": "Universal Features #9–10: Membranes & Motion",
          "body": "**Feature #9 — Cells are enclosed by membranes.** Plasma membranes are:\n- Made of **lipids** that are **amphiphilic** (hydrophilic head + hydrophobic tail)\n- Arranged as **bilayers** that encapsulate aqueous cavities (cell, organelle, vesicle)\n- **Selectively permeable** to nutrients and waste\n\n**Transport across membranes:**\n\n| Type | Energy | Examples |\n|---|---|---|\n| **Passive** | None | Simple diffusion, facilitated diffusion (via transporters) |\n| **Active** | **ATP** | Primary active transport (pumps, ATP→ADP+Pi) |\n| **Bulk** | ATP | Endocytosis / Exocytosis |\n\n**Feature #10 — Motion is lotion (two kinds):**\n- **Motor-protein transport (ATP-dependent)** along microtubules: **Kinesin** = anterograde toward (+)-end; **Dynein/Dynactin** = retrograde toward (–)-end.\n- **Brownian motion (ATP-independent, entropy-driven):** random movement of microscopic particles in a fluid, caused by constant collisions of surrounding fluid molecules."
        },
        {
          "heading": "AI Meets Biomedicine — ML/DL & a Real Diagnostic Example",
          "body": "The course bridges molecular biology with **AI / machine learning** in biomedicine.\n\n**Three ML paradigms:**\n\n| Paradigm | Learns by |\n|---|---|\n| **Supervised** | Comparing predicted vs. actual values (labeled data, loss L(y_pred, y_true)) |\n| **Unsupervised** | No labels (clustering, embedding) |\n| **Reinforcement** | An agent interacting with an environment |\n\n**Key DL architectures:** **CNN** (local features / shift-invariant filters), **RNN** (temporal data), **Transformer** (sequential, attention), **Autoencoder/VAE** (low-dimensional embedding), **GNN** (graph dependencies, message passing), **GAN** (generate samples; train generator + discriminator).\n\n**Real-world case (epilepsy):** brain malformations causing drug-resistant epilepsy classified by **DNA methylation signatures** (Jabari, Kobow et al. 2022). **Epigenetics background:** cytosine (**C**) → **5-methylcytosine (5mC)** via DNMT3A/DNMT3B (*de novo*) and DNMT1 (maintenance); reversed by **TET** (active demethylation). DL classifier reached **balanced accuracy 0.94, PPV 0.98, sensitivity 0.98**, far outperforming human inter-rater agreement (~40%→70%). **Confounders** include age (methylation changes with age) and brain region."
        }
      ],
      "questions": [
        {
          "id": "L1Q1",
          "conceptIndex": 0,
          "text": "What is the single defining feature that distinguishes eukaryotic cells from prokaryotic cells?",
          "options": [
            "Presence of ribosomes",
            "Presence of a membrane-bound nucleus",
            "Presence of a plasma membrane",
            "Presence of DNA"
          ],
          "correct": [
            1
          ],
          "explanation": "The nucleus is the defining distinction: eukaryotes have a membrane-bound nucleus, prokaryotes (bacteria + archaea) do not. Ribosomes, a plasma membrane, and DNA are present in BOTH cell types, so they cannot distinguish them.",
          "type": "single"
        },
        {
          "id": "L1Q2",
          "conceptIndex": 3,
          "text": "Which statements about transcription are correct? (Select all that apply.)",
          "options": [
            "The transcribed RNA is single-stranded",
            "RNA uses uracil (U) in place of thymine (T)",
            "RNA polymerase begins at the promoter and stops at the termination site",
            "Transcription produces a protein directly from DNA",
            "RNA is complementary to the DNA template"
          ],
          "correct": [
            0,
            1,
            2,
            4
          ],
          "explanation": "RNA is single-stranded, complementary to the template, uses A/U/C/G (U replaces T), and RNA polymerase runs initiation→elongation→termination from promoter to termination site. Option 4 is wrong: transcription yields RNA, not protein — protein requires the subsequent translation step.",
          "type": "multiple"
        },
        {
          "id": "L1Q3",
          "conceptIndex": 4,
          "text": "In the central dogma, an mRNA is read in groups of three nucleotides. What is each such group called, and what does it specify?",
          "options": [
            "A gene, specifying an entire protein",
            "A codon, specifying one amino acid",
            "An exon, specifying one nucleotide",
            "An operon, specifying one ribosome"
          ],
          "correct": [
            1
          ],
          "explanation": "mRNA is read in codons — triplets of nucleotides — and each codon specifies a single amino acid during translation. A gene encodes a whole product, an exon is a coding DNA segment, and an operon is a prokaryotic gene cluster; none are the triplet reading unit.",
          "type": "single"
        },
        {
          "id": "L1Q4",
          "conceptIndex": 5,
          "text": "How does an enzyme accelerate a chemical reaction?",
          "options": [
            "By increasing the free-energy difference (ΔG) between substrate and product",
            "By lowering the activation energy barrier of the reaction",
            "By being permanently consumed in the reaction",
            "By raising the energy of the products"
          ],
          "correct": [
            1
          ],
          "explanation": "Enzymes lower the activation energy (the energy barrier) so the reaction proceeds faster, as shown by the lower peak in the energy diagram. They are NOT consumed (the enzyme is released unchanged), and they do not change ΔG — only the path to it.",
          "type": "single"
        },
        {
          "id": "L1Q5",
          "conceptIndex": 6,
          "text": "Comparing aerobic and anaerobic respiration of one glucose molecule, which is true?",
          "options": [
            "Anaerobic respiration yields more ATP than aerobic",
            "Aerobic respiration yields 30 or more ATP; anaerobic yields about 2 ATP",
            "Both yield the same amount of ATP",
            "Aerobic respiration produces lactate as its end product"
          ],
          "correct": [
            1
          ],
          "explanation": "Aerobic respiration (Glucose + O₂ → CO₂ + H₂O) yields 30+ ATP, while anaerobic respiration (Glucose → Lactate) yields only ~2 ATP. Lactate is the product of the anaerobic/fermentation route, not the aerobic route.",
          "type": "single"
        },
        {
          "id": "L1Q6",
          "conceptIndex": 2,
          "text": "Which base pairings and classifications are correct for DNA? (Select all that apply.)",
          "options": [
            "Adenine pairs with Thymine",
            "Guanine pairs with Cytosine",
            "Adenine and Guanine are purines",
            "Thymine and Cytosine are purines",
            "Adenine pairs with Guanine"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "DNA pairs A–T and G–C. Purines are Adenine and Guanine; pyrimidines are Thymine and Cytosine. Option 3 wrongly calls T and C purines (they are pyrimidines), and option 4 invents an A–G pair, which does not occur.",
          "type": "multiple"
        },
        {
          "id": "L1Q7",
          "conceptIndex": 7,
          "text": "Regarding motor-protein transport along microtubules, which protein moves cargo toward the (+)-end (anterograde, e.g., toward the synaptic terminal)?",
          "options": [
            "Dynein",
            "Dynactin",
            "Kinesin",
            "RNA polymerase"
          ],
          "correct": [
            2
          ],
          "explanation": "Kinesin drives anterograde transport toward the microtubule (+)-end. Dynein (with dynactin) drives retrograde transport toward the (–)-end. RNA polymerase is unrelated — it transcribes DNA.",
          "type": "single"
        },
        {
          "id": "L1Q8",
          "conceptIndex": 7,
          "text": "A student claims Brownian motion is an ATP-powered, motor-protein-driven process. Why is this wrong?",
          "options": [
            "Brownian motion is ATP-independent and entropy-driven, caused by random collisions of surrounding fluid molecules",
            "Brownian motion requires kinesin and dynein",
            "Brownian motion only occurs in solids",
            "Brownian motion is the same as active transport"
          ],
          "correct": [
            0
          ],
          "explanation": "Brownian motion is ATP-independent and entropy-driven — random movement of microscopic particles caused by constant collisions of surrounding fluid molecules. It needs no motor proteins (those drive the separate ATP-dependent transport) and is not active transport.",
          "type": "single"
        },
        {
          "id": "L1Q9",
          "conceptIndex": 7,
          "text": "Which properties describe the plasma membrane as presented in the lecture? (Select all that apply.)",
          "options": [
            "Made of amphiphilic lipids with a hydrophilic head and hydrophobic tail",
            "Arranged as a bilayer enclosing aqueous cavities",
            "Completely impermeable to all molecules",
            "Selectively permeable to nutrients and waste"
          ],
          "correct": [
            0,
            1,
            3
          ],
          "explanation": "Membranes are amphiphilic lipid bilayers (hydrophilic head, hydrophobic tail) that enclose aqueous cavities and are selectively permeable to nutrients and waste. They are NOT completely impermeable — selective transport (passive and active) is a core function.",
          "type": "multiple"
        },
        {
          "id": "L1Q10",
          "conceptIndex": 8,
          "text": "In the molecular disease-classification example, what molecular signature did the deep-learning classifier use to distinguish epilepsy-associated brain lesions, and which paradigm trained the CNN?",
          "options": [
            "RNA codon usage; reinforcement learning",
            "DNA methylation signatures; supervised learning",
            "Protein quaternary structure; unsupervised learning",
            "Lipid composition; supervised learning"
          ],
          "correct": [
            1
          ],
          "explanation": "The classifier used DNA methylation signatures (epigenetics: C → 5mC), and the CNN was trained by supervised learning on labeled lesion images, reaching balanced accuracy 0.94. The other options name molecular features and paradigms not used in this example.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What does molecular biology study?",
          "back": "How molecules interact with one another in living organisms to perform the functions of life."
        },
        {
          "front": "Name the three domains of life and which have a nucleus.",
          "back": "Bacteria, Archaea (both prokaryotic, NO nucleus), and Eukaryota (eukaryotic, HAS a nucleus)."
        },
        {
          "front": "List the four DNA nucleobases and classify them as purines or pyrimidines.",
          "back": "Purines: Adenine (A), Guanine (G). Pyrimidines: Thymine (T), Cytosine (C). Pairing: A–T, G–C."
        },
        {
          "front": "How does RNA differ from DNA in its base alphabet?",
          "back": "RNA is single-stranded and uses A, U, C, G — uracil (U) replaces thymine (T)."
        },
        {
          "front": "State the central dogma of molecular biology.",
          "back": "DNA → (transcription) → mRNA → (translation) → Protein. mRNA is read in codons (3 nucleotides = 1 amino acid)."
        },
        {
          "front": "What are the four levels of protein structure?",
          "back": "Primary (amino acid sequence), Secondary (α-helix, β-pleated sheet), Tertiary (3D fold of one chain), Quaternary (assembly of multiple subunits)."
        },
        {
          "front": "How does an enzyme speed up a reaction, and is it consumed?",
          "back": "It lowers the activation energy barrier (does not change ΔG). The enzyme is released unchanged and reused — not consumed."
        },
        {
          "front": "ATP yield: aerobic vs. anaerobic respiration of glucose.",
          "back": "Aerobic (Glucose + O₂ → CO₂ + H₂O): 30 or more ATP. Anaerobic (Glucose → Lactate): ~2 ATP."
        },
        {
          "front": "Kinesin vs. Dynein: direction of microtubule transport.",
          "back": "Kinesin → anterograde, toward (+)-end. Dynein (+ dynactin) → retrograde, toward (–)-end. Both ATP-dependent."
        },
        {
          "front": "What is 5mC and which enzymes make/remove it?",
          "back": "5-methylcytosine — an epigenetic mark. Made by DNMT3A/3B (de novo) and DNMT1 (maintenance); actively removed by TET. Read by MECP2/MBDs."
        }
      ]
    },
    {
      "id": 2,
      "title": "DNA: Structure, Packaging & Replication",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "DNA Building Blocks: Nucleotides",
          "body": "DNA is a **double-stranded helix** of two **antiparallel** and **complementary** strands. The repeating subunit is the **nucleotide**.\n\n**Hierarchy of components:**\n```\nBASE + SUGAR          = NUCLEOSIDE\nBASE + SUGAR + PHOSPHATE = NUCLEOTIDE\n```\n\n| Part | Detail |\n|------|--------|\n| **Sugar** | Pentose (5-carbon). DNA = β-D-2-**deoxyribose** (H at 2'); RNA = β-D-**ribose** (OH at 2') |\n| **Phosphate** | Forms the sugar–phosphate **backbone**, gives extra stability |\n| **Base** | A, T, C, G (DNA); A, U, C, G (RNA) |\n\nThe sugar carbons are numbered 1'–5'. The single difference between ribose and deoxyribose is the **2'-OH (ribose) vs 2'-H (deoxyribose)** — this is literally \"the D in DNA.\""
        },
        {
          "heading": "The Bases: Purines vs Pyrimidines",
          "body": "Bases are **nitrogen-containing ring compounds**, classed as purines or pyrimidines.\n\n| Class | Rings | Bases |\n|-------|-------|-------|\n| **Purine** | Two fused rings (bigger) | **A**denine, **G**uanine |\n| **Pyrimidine** | Single ring (smaller) | **C**ytosine, **T**hymine, **U**racil |\n\nMemory aid: **Pur**ines = **A**, **G** (\"**Pure As Gold**\"); pyrimidines are the rest.\n\n- **Thymine (T)** has a CH₃ (methyl) group; **Uracil (U)** does not. T is found in DNA, U in RNA.\n- Nucleoside names: adenine→adenosine (A), guanine→guanosine (G), cytosine→cytidine (C), uracil→uridine (U), thymine→thymidine (T)."
        },
        {
          "heading": "Base Pairing & Hydrogen Bonds",
          "body": "Complementary base pairing holds the two strands together via **hydrogen bonds**.\n\n```\nA = T   (2 hydrogen bonds)\nG ≡ C   (3 hydrogen bonds)\n```\n\nKey rules:\n- A **purine always pairs with a pyrimidine** → keeps helix width constant (~1 nm).\n- **G–C pairs are stronger** (3 H-bonds) than A–T pairs (2 H-bonds) → GC-rich DNA is more thermally stable / harder to denature.\n- Strands are **antiparallel**: one runs 5'→3', the complementary one 3'→5'.\n\nTrap: it is the **hydrogen bonds between bases** that hold the two strands together — NOT covalent bonds. The covalent phosphodiester bonds run *along* each backbone."
        },
        {
          "heading": "Nucleotides Beyond DNA",
          "body": "Nucleotides have many roles besides being DNA building blocks:\n\n1. **Energy carriers** — as nucleoside di-/triphosphates they carry chemical energy in easily hydrolyzed **phosphoanhydride bonds**. Example: **ATP**.\n2. **Components of coenzymes** — combine with other groups. Example: **Coenzyme A (CoA)**.\n3. **Intracellular signaling molecules**. Example: **cyclic AMP (cAMP)**.\n\nThe high-energy bonds in ATP are specifically the **phosphoanhydride bonds** between phosphate groups."
        },
        {
          "heading": "DNA Packaging: Chromatin & Nucleosomes",
          "body": "Human DNA (total length ~14 billion km across the body) must fit into a nucleus only **~5–6 µm** in diameter. This is solved by hierarchical folding.\n\n```\n2 nm    DNA double helix\n  ↓ wrap on histones\n11 nm   \"beads on a string\" (nucleosomes)\n  ↓ zigzag\n30 nm   chromatin fiber of associated nucleosomes\n  ↓ loop\n700 nm  chromatin folded into loops\n  ↓ condense\n1400 nm entire mitotic chromosome\n```\nNet result: the DNA is packaged **~10,000-fold shorter** than its fully extended length.\n\n**Nucleosome** = DNA wrapped around a histone octamer of **H2A, H2B, H3, H4** (two of each). Each histone has an **N-terminal tail** + a **histone fold** domain. The tails are sites of modification (e.g., H3K9me3, H3K27me3)."
        },
        {
          "heading": "Euchromatin vs Heterochromatin",
          "body": "| Feature | Euchromatin | Heterochromatin |\n|---------|-------------|-----------------|\n| State | Open, active | Closed, inactive |\n| Fraction | ~20% | ~80% |\n| Genes | Accessible promoters, enhancers, active/weakly transcribed genes | Quiescent / repressed |\n\n**Heterochromatin subtypes:**\n- **Facultative** (~20%) — regulated, developmentally repressed genes; marked by **H3K27me3 or H3K9me3**.\n- **Constitutive** (~20%) — permanent; centromeres, telomeres, satellites/repeats; marked by **H3K9me3**.\n\n**Chromosome territories:** interphase chromosomes occupy defined (though variable) non-random radial positions — some internal, some peripheral. Bringing genome regions into proximity affects gene activity and can cause **translocations**."
        },
        {
          "heading": "Chromosome Structure & Replication Sites",
          "body": "A chromosome has a **short arm** and **long arm** separated by the **centromere**, plus **karyobands** and **chromatids**.\n\n**Three specialized DNA sites are needed to copy a chromosome:**\n\n| Site | Function |\n|------|----------|\n| **Origin of replication** | Specific site where replication begins |\n| **Centromere** | Attachment point; the **kinetochore** forms here to bind the mitotic spindle |\n| **Telomeres** | Protect chromosome ends |\n\n**Telomeres** consist of the repeat **5'-TTAGGG-3'**. They **shorten with each cell division**.\n- **Healthy cells:** telomeres shorten → cell division stops → **senescence** / cell death.\n- **Cancer cells:** telomere length is **maintained** → unlimited growth → malignant tumor (no cell death).\n\n**Philadelphia chromosome:** translocation between chromosomes **9 and 22** → **chronic myelogenous leukemia (CML)**."
        },
        {
          "heading": "DNA Replication Machinery & Steps",
          "body": "Replication chemistry: an **incoming nucleoside triphosphate** pairs with the template base; DNA polymerase forms the covalent bond and releases **pyrophosphate**. Chain grows strictly **5'→3'**.\n\n**Phases:**\n1. **Initiation** — initiator proteins recognize replication **origins**; **helicase** unwinds the helix, forming replication bubbles.\n2. **Elongation** — **primase** lays down **RNA primers**; **DNA polymerase** extends 5'→3', **continuously on the leading strand**, **discontinuously on the lagging strand** (**Okazaki fragments**).\n3. **Termination** — forks meet; RNA primers removed and gaps filled; **DNA ligase** joins Okazaki fragments.\n4. **Proofreading** by DNA polymerase.\n\n| Enzyme | Role |\n|--------|------|\n| Helicase | Unwinds the double helix |\n| Primase | Makes RNA primers |\n| DNA polymerase | Adds nucleotides 5'→3'; proofreads |\n| DNA ligase | Seals Okazaki fragments |\n| **Topoisomerase** | Relieves torsional stress (\"winding problem\") via transient single-strand breaks |"
        },
        {
          "heading": "DNA Damage, Repair & Cell-Cycle Control",
          "body": "DNA primary structure decays via **spontaneous oxidative damage**, **hydrolytic attack**, and **methylation**. Replication errors change codons (e.g., a point change can swap Ser→Leu → a missense **gene variant**).\n\n**DNA repair (Nobel Prize Chemistry 2015):**\n| Pathway | Discoverer | Function |\n|---------|-----------|----------|\n| **Base excision repair** | Tomas Lindahl | Removes damaged bases (e.g., C→uracil) |\n| **Nucleotide excision repair** | Aziz Sancar | Repairs UV / mutagen damage (e.g., thymine dimers) |\n| **Mismatch repair** | Paul Modrich | Fixes replication errors; lowers error rate ~1000-fold |\n\n**Cell cycle:** G1 → S (synthesis) → G2 → M (mitosis); G0 = quiescent. **Mitosis** order: Prophase → Metaphase → Anaphase → Telophase (+ cytokinesis).\n\n**Checkpoints:**\n- **G1/S** — checks organelles, growth factors, ATP.\n- **G2/M** — checks completely replicated genome, cell volume, **DNA damage**.\n- **M (spindle)/G1** — checks chromatids properly attached to spindle / equal chromosome distribution.\n\nGenome facts: human genome ~**3,100 × 10⁶ bp**, ~**20,000 genes**, but only **~1% is protein-coding**; ~50% is repeated sequences (LINEs, SINEs, transposons)."
        }
      ],
      "questions": [
        {
          "id": "L2Q1",
          "conceptIndex": 2,
          "text": "Which statement about complementary base pairing in DNA is correct?",
          "options": [
            "A pairs with T via 3 hydrogen bonds; G pairs with C via 2",
            "A pairs with T via 2 hydrogen bonds; G pairs with C via 3",
            "A pairs with G; T pairs with C",
            "All base pairs use the same number (3) of hydrogen bonds"
          ],
          "correct": [
            1
          ],
          "explanation": "A=T uses 2 hydrogen bonds and G≡C uses 3 hydrogen bonds. Purines pair with pyrimidines (A-T, G-C), so A-G and T-C pairings are wrong, and the bond counts differ between the two pairs.",
          "type": "single"
        },
        {
          "id": "L2Q2",
          "conceptIndex": 0,
          "text": "What is the single chemical difference between the sugar in DNA and the sugar in RNA?",
          "options": [
            "RNA uses a 6-carbon sugar, DNA a 5-carbon sugar",
            "DNA's deoxyribose has H at the 2' position; RNA's ribose has OH at 2'",
            "DNA's sugar has an extra phosphate",
            "RNA lacks the 5' carbon entirely"
          ],
          "correct": [
            1
          ],
          "explanation": "Both are pentoses (5-carbon). The defining difference is the 2' position: ribose has 2'-OH, deoxyribose has 2'-H. This is 'the D in DNA' (deoxy = missing oxygen at 2').",
          "type": "single"
        },
        {
          "id": "L2Q3",
          "conceptIndex": 1,
          "text": "Which bases are purines? (Select all that apply.)",
          "options": [
            "Adenine",
            "Cytosine",
            "Guanine",
            "Thymine",
            "Uracil"
          ],
          "correct": [
            0,
            2
          ],
          "explanation": "Purines have two fused rings: Adenine and Guanine ('Pure As Gold'). Cytosine, thymine, and uracil are single-ring pyrimidines.",
          "type": "multiple"
        },
        {
          "id": "L2Q4",
          "conceptIndex": 4,
          "text": "In the order of DNA packaging, which sequence is correct?",
          "options": [
            "30 nm fiber → beads-on-a-string → mitotic chromosome → loops",
            "DNA double helix → beads-on-a-string → 30 nm chromatin fiber → looped/condensed chromosome",
            "Mitotic chromosome → 30 nm fiber → DNA helix → nucleosomes",
            "Nucleosomes → DNA helix → loops → 30 nm fiber"
          ],
          "correct": [
            1
          ],
          "explanation": "Packaging goes from the 2 nm double helix → 11 nm 'beads on a string' (nucleosomes) → 30 nm chromatin fiber → 700 nm looped fiber → ~1400 nm condensed mitotic chromosome, ~10,000-fold compaction.",
          "type": "single"
        },
        {
          "id": "L2Q5",
          "conceptIndex": 4,
          "text": "Which proteins make up the histone octamer core of a nucleosome?",
          "options": [
            "H1, H2, H3, H4",
            "H2A, H2B, H3, H4 (two of each)",
            "H2A, H2B, H2C, H2D",
            "Helicase, primase, ligase, polymerase"
          ],
          "correct": [
            1
          ],
          "explanation": "The nucleosome core is an octamer of two copies each of H2A, H2B, H3, and H4. H1 is a linker histone, not part of the core octamer. The enzymes listed are replication proteins, not histones.",
          "type": "single"
        },
        {
          "id": "L2Q6",
          "conceptIndex": 6,
          "text": "Why do cancer cells avoid replicative senescence while healthy cells eventually stop dividing?",
          "options": [
            "Cancer cells have shorter telomeres from the start",
            "In cancer cells telomere length is maintained, whereas in healthy cells telomeres shorten with each division",
            "Healthy cells lack centromeres",
            "Cancer cells skip the S phase"
          ],
          "correct": [
            1
          ],
          "explanation": "In healthy cells telomeres shorten with each division until division stops (senescence) and cells die. Cancer cells maintain telomere length, allowing unlimited proliferation. The other options contradict the slides.",
          "type": "single"
        },
        {
          "id": "L2Q7",
          "conceptIndex": 7,
          "text": "Which enzyme relieves the torsional stress (the 'winding problem') ahead of the replication fork by creating transient single-strand breaks?",
          "options": [
            "Helicase",
            "Primase",
            "Topoisomerase",
            "DNA ligase"
          ],
          "correct": [
            2
          ],
          "explanation": "Topoisomerase introduces a transient single-strand break allowing free rotation around the phosphodiester bond, then reseals it, relieving torsional stress. Helicase unwinds (and actually creates the stress), primase makes primers, ligase seals Okazaki fragments.",
          "type": "single"
        },
        {
          "id": "L2Q8",
          "conceptIndex": 7,
          "text": "Select the TRUE statements about the leading vs lagging strand during replication.",
          "options": [
            "The leading strand is synthesized continuously",
            "The lagging strand is synthesized discontinuously as Okazaki fragments",
            "DNA polymerase synthesizes both strands in the 3'→5' direction",
            "RNA primers made by primase provide starting points",
            "DNA ligase joins the Okazaki fragments"
          ],
          "correct": [
            0,
            1,
            3,
            4
          ],
          "explanation": "Leading strand = continuous; lagging strand = discontinuous Okazaki fragments primed by RNA primers (primase) and joined by ligase. DNA polymerase ALWAYS synthesizes 5'→3', not 3'→5', so that option is false.",
          "type": "multiple"
        },
        {
          "id": "L2Q9",
          "conceptIndex": 8,
          "text": "Match the 2015 Nobel-Prize repair mechanisms: which pairing is correct?",
          "options": [
            "Paul Modrich – nucleotide excision repair of UV damage",
            "Aziz Sancar – mismatch repair lowering error rate 1000-fold",
            "Tomas Lindahl – base excision repair preventing DNA decay",
            "Tomas Lindahl – repair of thymine dimers from UV light"
          ],
          "correct": [
            2
          ],
          "explanation": "Tomas Lindahl elucidated base excision repair (e.g., removing uracil from cytosine deamination). Aziz Sancar = nucleotide excision repair (UV damage); Paul Modrich = mismatch repair (~1000-fold error reduction). The other options swap these.",
          "type": "single"
        },
        {
          "id": "L2Q10",
          "conceptIndex": 6,
          "text": "The Philadelphia chromosome, which causes chronic myelogenous leukemia, results from a translocation between which two chromosomes?",
          "options": [
            "Chromosomes 9 and 22",
            "Chromosomes 13 and 21",
            "Chromosomes 9 and 21",
            "Chromosomes X and 22"
          ],
          "correct": [
            0
          ],
          "explanation": "The Philadelphia chromosome arises from a translocation between chromosomes 9 and 22 (producing 9q+ and 22q-), leading to chronic myelogenous leukemia.",
          "type": "single"
        },
        {
          "id": "L2Q11",
          "conceptIndex": 8,
          "text": "Approximately how much of the human genome is protein-coding?",
          "options": [
            "About 50%",
            "About 25%",
            "About 1%",
            "About 80%"
          ],
          "correct": [
            2
          ],
          "explanation": "Only ~1% of the human genome is protein-coding. The rest includes introns, regulatory regions, and ~50% repeated sequences (LINEs, SINEs, transposons, etc.).",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What three components make up a nucleotide?",
          "back": "A base + a (deoxy)ribose sugar + a phosphate group. (Base + sugar alone = a nucleoside.)"
        },
        {
          "front": "How many hydrogen bonds in A–T vs G–C base pairs?",
          "back": "A=T has 2 hydrogen bonds; G≡C has 3 hydrogen bonds (so GC-rich DNA is more stable)."
        },
        {
          "front": "Purines vs pyrimidines — which bases and how many rings?",
          "back": "Purines (two fused rings) = Adenine, Guanine. Pyrimidines (single ring) = Cytosine, Thymine, Uracil."
        },
        {
          "front": "What distinguishes deoxyribose (DNA) from ribose (RNA)?",
          "back": "Deoxyribose has H at the 2' carbon; ribose has OH at 2'. ('The D in DNA' = deoxy.)"
        },
        {
          "front": "What is a nucleosome made of?",
          "back": "DNA wrapped around a histone octamer: two copies each of H2A, H2B, H3, and H4. Each histone has an N-terminal tail + histone fold."
        },
        {
          "front": "Three specialized sites needed to copy a chromosome?",
          "back": "Origin of replication (start site), centromere (spindle attachment via kinetochore), and telomeres (protect ends)."
        },
        {
          "front": "What is the human telomere repeat sequence, and what happens to it?",
          "back": "5'-TTAGGG-3'. Telomeres shorten with each cell division; in healthy cells this triggers senescence, while cancer cells maintain telomere length."
        },
        {
          "front": "Roles of helicase, primase, DNA polymerase, and ligase in replication.",
          "back": "Helicase unwinds the helix; primase makes RNA primers; DNA polymerase adds nucleotides 5'→3' and proofreads; ligase joins Okazaki fragments on the lagging strand."
        },
        {
          "front": "Name the three DNA repair pathways and their 2015 Nobel laureates.",
          "back": "Base excision repair (Tomas Lindahl), Nucleotide excision repair (Aziz Sancar), Mismatch repair (Paul Modrich, ~1000-fold error reduction)."
        },
        {
          "front": "The three main cell-cycle checkpoints and what they check.",
          "back": "G1/S (organelles, growth factors, ATP), G2/M (complete replication, cell volume, DNA damage), M/G1 spindle checkpoint (proper chromatid attachment / equal chromosome distribution)."
        }
      ]
    },
    {
      "id": 3,
      "title": "RNA: Structure, Transcription & Function",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "RNA vs DNA — Core Differences",
          "body": "RNA is a **linear polymer** like DNA but differs in key ways. The central dogma: **DNA → (transcription) → RNA → (translation) → Protein**, information flows one direction.\n\n| Feature | DNA | RNA |\n|---|---|---|\n| Sugar | **Deoxyribose** | **Ribose** (2'-OH) |\n| Strandedness | ds, α-helix | ss; secondary/tertiary structures |\n| Bases | A, T, G, C | A, **U**, G, C |\n| Stability | More stable | Less stable (prone to hydrolysis) |\n| Location (euk.) | Mostly nucleus | Mainly cytoplasm (translation) |\n| Reading frame | NO | YES |\n| Synthesis enzyme | DNA polymerase | RNA polymerase |\n| Replication | Self-replicating | Synthesized from DNA (transcription) |\n\nKey: **Thymine (DNA) is replaced by Uracil (U) in RNA**. RNA functions: ~3–5% mRNA, **80–90% rRNA**, plus tRNA and regulatory RNAs."
        },
        {
          "heading": "RNA Folding & Types of RNA",
          "body": "Because RNA is single-stranded, it folds into **complex secondary and tertiary structures** using both **conventional (Watson-Crick)** and **nonconventional base pairs**, plus regions of unpaired bases.\n\n**Gene content:** the human genome has **~20,000 protein-coding genes** and **~25,000 pure RNA-coding (non-coding) genes** — thousands of genes produce ncRNA as their final product.\n\n**Major RNA types:**\n- **mRNA** — coding, carries genetic message\n- **tRNA** — adaptor, delivers amino acids\n- **rRNA** — structural/catalytic core of ribosome (~80% of cellular RNA)\n- **miRNA** — gene silencing\n- **siRNA** — gene silencing\n- **snoRNA** — small nucleolar, rRNA modification\n- **snRNA** — small nuclear, splicing (spliceosome)\n- **lncRNA** — long non-coding regulatory RNA"
        },
        {
          "heading": "Eukaryotic Transcription — Three Phases",
          "body": "Transcription occurs in the **nucleus**; mature RNA is exported through nucleopores to the cytoplasm.\n\n```\nINITIATION   → ELONGATION   → TERMINATION\n```\n\n**Initiation:** Pol II recruited to a gene **promoter**; DNA is **melted** to expose the **template strand**; first few nucleotides of RNA synthesized.\n\n**Elongation:** a full-length **RNA–DNA hybrid (~8–9 bp)** forms; Pol II proceeds to extend the transcript.\n\n**Termination:** Pol II ceases synthesis, becomes termination-prone; **both Pol II and the nascent RNA are released** from the template.\n\nRNA Pol active site uses **Mg²⁺**; ribonucleoside triphosphates enter via an uptake channel. Genes can be read with **different efficiencies** — a highly transcribed gene yields many RNA copies (and much protein) vs. a weakly transcribed one."
        },
        {
          "heading": "The Three Eukaryotic RNA Polymerases",
          "body": "Eukaryotes have **3 distinct RNA polymerases** (a key exam fact):\n\n| Polymerase | Genes transcribed |\n|---|---|\n| **RNA Pol I** | 5.8S, 18S, and 28S **rRNA** genes |\n| **RNA Pol II** | **All protein-coding genes**, plus snoRNA, miRNA, siRNA, lncRNA, and most snRNA genes |\n| **RNA Pol III** | **tRNA** genes, 5S rRNA genes, some snRNA, other small RNAs |\n\nrRNAs named by **S (sedimentation) values** — larger S = larger rRNA.\n\n**DNA Pol vs RNA Pol functional comparison:**\n| | DNA Pol | RNA Pol |\n|---|---|---|\n| Substrate | dNTPs | NTPs |\n| Primer | **Required** | **De novo (no primer)** |\n| Proofreading | 3'→5' exonuclease | Limited (backtracking, no exonuclease) |\n| Error rate | ~1 / 10⁷ | ~1 / 10⁴ |"
        },
        {
          "heading": "The Winding Problem & Topoisomerases",
          "body": "As RNA Pol translocates, **torsional stress** builds in the DNA: **positive supercoiling ahead**, **negative supercoiling behind** the complex. If unresolved → **inhibits transcription and damages DNA**.\n\n**Topoisomerases relieve tension:**\n\n| | Topoisomerase I | Topoisomerase II |\n|---|---|---|\n| Cut | **Single-strand break** | **Double-strand break** |\n| Mechanism | Rotation around intact strand | Passes one helix through another |\n| ATP | **No (ATP-independent)** | **Yes (ATP-dependent)** |\n| Note | — | Relieves **positive supercoils ahead** of RNA Pol |\n\nMnemonic: **Topo I = 1 strand, no ATP; Topo II = 2 strands, needs ATP.**"
        },
        {
          "heading": "Transcription Initiation: GTFs, Mediator, Chromatin Remodeling",
          "body": "Pol II initiation requires many **General Transcription Factors (GTFs):**\n\n| GTF | Role |\n|---|---|\n| **TFIID** | Recognizes **TATA box**; made of **TBP + 11 TAFs** |\n| TFIIB | Recognizes BRE; positions Pol at start site |\n| TFIIA | Stabilizes TFIID binding (not all promoters) |\n| TFIIF | Stabilizes Pol–TFIIB; attracts TFIIE/H |\n| TFIIE | Attracts and regulates TFIIH |\n| **TFIIH** | Unwinds DNA; **phosphorylates Ser5 of the Pol II CTD** (uses ATP→ADP); releases Pol from promoter |\n\n**Mediator complex** = molecular **bridge** between transcription factors and Pol II.\n**Chromatin remodeling complexes** = use **ATP** to reposition/evict nucleosomes, making DNA accessible.\n**Promoter elements:** TATA, INR (initiator), DPE, BRE; plus distal **enhancers**, **silencers**, **insulators**, UAS."
        },
        {
          "heading": "RNA Processing: Capping, Poly-A Tail, Splicing",
          "body": "Eukaryotic pre-mRNA undergoes processing in the nucleus before export:\n\n**5'-cap:** a **7-methylguanosine (m7G)** linked via a **5'-to-5' triphosphate bridge** marks the 5' end; lets the cell distinguish mRNA from other RNAs.\n\n**3'-poly-A tail:** ~**150–250 adenines** added; signals an intact, export/translation-ready mRNA.\n\n**Splicing** removes **introns**, joins **exons**. Sequences required: 5' splice site **GU**, branch-point **A**, polypyrimidine tract, 3' splice site **AG** (GU...AG rule).\n- Mechanism: branch-point **2'-OH** attacks the 5' splice site → **lariat** intermediate → exons ligated, intron released as lariat.\n- **Alternative splicing affects ~95% of genes**, generating tissue-specific **isoforms** (e.g., α-tropomyosin).\n\n**Bacteria differ:** mRNA is **polycistronic** (one mRNA → multiple proteins), no introns/cap/processing."
        },
        {
          "heading": "Ribozymes & RNA Catalysis",
          "body": "**Nobel Prize in Chemistry 1989** to **Sidney Altman** and **Thomas R. Cech** for the catalytic properties of RNA.\n- **Enzyme** = protein with catalytic activity.\n- **Ribozyme** = RNA with catalytic activity.\n\n| Process | Ribozyme? | Detail |\n|---|---|---|\n| Transcription | **NO** | Done entirely by RNA Pol (a protein) |\n| Splicing (spliceosome) | **Yes** | snRNAs (**U2, U6**) catalyze splicing |\n| Self-splicing introns | **Yes** | Group I & II introns — autocatalytic, no protein |\n| Translation (ribosome) | **Yes** | **Peptidyl transferase = rRNA** (23S/28S) |\n| tRNA processing (RNase P) | **Yes** | RNA moiety cleaves pre-tRNA |\n\n**Ribosome** = ~60% RNA / 40% protein; the spliceosome's snRNAs ensure splicing **sequence specificity**."
        },
        {
          "heading": "Reverse Transcription & Regulatory RNAs",
          "body": "**Reverse transcription** = synthesizing **DNA from an RNA template** (challenges the one-way central dogma):\n- **Viral RNA** reverse-transcribed → integrated into host genome.\n- **Retrotransposition** — RNA intermediate copied to DNA, inserted elsewhere (\"jumping genes\").\n- **Telomerase (TERT)** uses RNA as a template to extend chromosome ends.\n\n**miRNA** silences genes by binding mRNA **3'UTR** → **block translation** or **degrade mRNA** (one-to-many, many-to-one).\n\n**lncRNAs** (>**200 nt**): transcribed by Pol II, capped/spliced/polyadenylated like mRNA. Functions: **Scaffold** (recruit proteins), **Decoy** (compete), **Guide** (direct TFs to loci), **Enhancer**. Roles: cell identity, **X-inactivation**.\n\n**RNA world hypothesis** (Crick, 1968): life began with RNA — RNA as both genetic carrier and catalyst. We moved to DNA because the **2'-OH of ribose causes spontaneous autocleavage**, and **cytosine→uracil deamination** would corrupt the genetic code/proofreading. Applications: **CRISPR/Cas** (guide RNA; Nobel 2020 Charpentier & Doudna) and **mRNA vaccines** (pseudouridine-modified mRNA; Nobel 2023 Karikó & Weissman)."
        }
      ],
      "questions": [
        {
          "id": "L3Q1",
          "conceptIndex": 0,
          "text": "Which feature distinguishes RNA from DNA?",
          "options": [
            "RNA contains ribose and uracil; DNA contains deoxyribose and thymine",
            "DNA contains ribose; RNA contains deoxyribose",
            "RNA uses thymine while DNA uses uracil",
            "DNA is single-stranded while RNA is always double-stranded"
          ],
          "correct": [
            0
          ],
          "explanation": "RNA has ribose (with a reactive 2'-OH) and uses uracil; DNA has deoxyribose and uses thymine. Option 1 reverses the sugars. Option 2 swaps the bases. Option 3 is wrong: DNA is typically double-stranded and RNA single-stranded.",
          "type": "single"
        },
        {
          "id": "L3Q2",
          "conceptIndex": 3,
          "text": "Match the eukaryotic RNA polymerase to its products. Which statements are correct?",
          "options": [
            "RNA Pol II transcribes all protein-coding genes plus miRNA and lncRNA genes",
            "RNA Pol I transcribes the 5.8S, 18S, and 28S rRNA genes",
            "RNA Pol III transcribes tRNA genes and 5S rRNA",
            "RNA Pol I transcribes all protein-coding genes",
            "RNA Pol II transcribes tRNA genes"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Pol II = protein-coding genes + miRNA/siRNA/lncRNA/most snRNA. Pol I = 5.8S/18S/28S rRNA. Pol III = tRNA, 5S rRNA, some snRNA. Option 4 is wrong (Pol II, not Pol I, does protein-coding). Option 5 is wrong (tRNA is Pol III).",
          "type": "multiple"
        },
        {
          "id": "L3Q3",
          "conceptIndex": 3,
          "text": "A student claims RNA polymerase needs a primer just like DNA polymerase. Why is this incorrect?",
          "options": [
            "RNA polymerase initiates synthesis de novo, without a primer",
            "RNA polymerase has 3'→5' exonuclease proofreading instead of a primer",
            "DNA polymerase also works without a primer",
            "RNA polymerase uses dNTPs as primers"
          ],
          "correct": [
            0
          ],
          "explanation": "RNA Pol can start RNA synthesis de novo (no primer), unlike DNA Pol which requires a primer. Option 2 is false — RNA Pol lacks an exonuclease domain (only limited backtracking). Option 3 is false. Option 4 is nonsense.",
          "type": "single"
        },
        {
          "id": "L3Q4",
          "conceptIndex": 4,
          "text": "Regarding topoisomerases relieving transcription torsional stress, which are TRUE?",
          "options": [
            "Topoisomerase I makes single-strand breaks and is ATP-independent",
            "Topoisomerase II makes double-strand breaks and requires ATP",
            "Positive supercoiling builds up ahead of the moving polymerase",
            "Topoisomerase I requires ATP to cut both strands",
            "Negative supercoiling builds up ahead of the polymerase"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Topo I: single-strand break, no ATP. Topo II: double-strand break, needs ATP. The translocating polymerase generates positive supercoils ahead and negative behind. Option 4 is wrong (Topo I is ATP-independent, single-strand). Option 5 reverses the supercoiling sign.",
          "type": "multiple"
        },
        {
          "id": "L3Q5",
          "conceptIndex": 7,
          "text": "Which process is NOT catalyzed by a ribozyme (RNA), but instead entirely by a protein enzyme?",
          "options": [
            "Transcription (RNA synthesis)",
            "Peptide bond formation in the ribosome",
            "Pre-mRNA splicing by the spliceosome",
            "Pre-tRNA cleavage by RNase P"
          ],
          "correct": [
            0
          ],
          "explanation": "Transcription is carried out by RNA polymerase, a protein enzyme — no ribozyme involved. The ribosome's peptidyl transferase is rRNA, splicing uses snRNAs (U2/U6), and RNase P's RNA moiety cleaves pre-tRNA — all ribozyme activities.",
          "type": "single"
        },
        {
          "id": "L3Q6",
          "conceptIndex": 2,
          "text": "What is the correct order and outcome of the three phases of eukaryotic transcription?",
          "options": [
            "Initiation (DNA melted, Pol recruited) → Elongation (RNA-DNA hybrid extended) → Termination (Pol and RNA released)",
            "Elongation → Initiation → Termination",
            "Initiation → Termination → Elongation",
            "Termination → Elongation → Initiation"
          ],
          "correct": [
            0
          ],
          "explanation": "Initiation melts DNA and recruits Pol II to the promoter; elongation forms and extends the ~8-9 bp RNA-DNA hybrid; termination releases both Pol II and the nascent RNA. The other orderings are scrambled.",
          "type": "single"
        },
        {
          "id": "L3Q7",
          "conceptIndex": 6,
          "text": "Which statements about eukaryotic mRNA processing are correct?",
          "options": [
            "The 5' cap is a 7-methylguanosine joined by a 5'-to-5' triphosphate bridge",
            "The poly-A tail adds ~150-250 adenines to the 3' end",
            "Splicing removes exons and keeps introns",
            "Alternative splicing affects roughly 95% of genes and creates isoforms",
            "The branch-point 2'-OH attacks the 5' splice site forming a lariat"
          ],
          "correct": [
            0,
            1,
            3,
            4
          ],
          "explanation": "Correct: m7G 5' cap via 5'-to-5' bridge; ~150-250 A poly-A tail; ~95% alternative splicing producing isoforms; lariat formed by branch-point 2'-OH attack. Option 3 is reversed — splicing removes INTRONS and joins EXONS.",
          "type": "multiple"
        },
        {
          "id": "L3Q8",
          "conceptIndex": 8,
          "text": "How do microRNAs (miRNAs) silence gene expression?",
          "options": [
            "By binding mRNA (e.g. 3'UTR) to block translation or trigger mRNA degradation",
            "By cutting genomic DNA at the promoter",
            "By adding a poly-A tail to repress the mRNA",
            "By reverse-transcribing the mRNA into DNA"
          ],
          "correct": [
            0
          ],
          "explanation": "miRNAs base-pair with target mRNA and either block translation or promote mRNA degradation (one-to-many, many-to-one). They do not cut genomic DNA, polyadenylate, or reverse-transcribe.",
          "type": "single"
        },
        {
          "id": "L3Q9",
          "conceptIndex": 8,
          "text": "Which were the discoveries behind the RNA-related Nobel Prizes mentioned in the lecture?",
          "options": [
            "1989 Chemistry: Altman & Cech for catalytic RNA (ribozymes)",
            "2020 Chemistry: Charpentier & Doudna for CRISPR/Cas genome editing",
            "2023 Medicine: Karikó & Weissman for mRNA vaccine technology",
            "1989 Chemistry: Watson & Crick for the DNA double helix"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "The deck cites the 1989 ribozyme prize (Altman & Cech), the 2020 CRISPR/Cas prize (Charpentier & Doudna), and the 2023 mRNA-vaccine prize (Karikó & Weissman). Option 4 is wrong — Watson & Crick won in 1962 (Medicine) and that is not what this slide states.",
          "type": "multiple"
        },
        {
          "id": "L3Q10",
          "conceptIndex": 8,
          "text": "According to the lecture, why did life likely move away from RNA toward DNA as genetic material?",
          "options": [
            "The reactive 2'-OH of ribose causes spontaneous autocleavage of RNA",
            "Cytosine can deaminate to uracil, and proofreading would be hijacked if C and U are both in the code",
            "RNA cannot form any base pairs",
            "DNA is less stable than RNA"
          ],
          "correct": [
            0,
            1
          ],
          "explanation": "DNA is favored because RNA's 2'-OH makes it prone to autocleavage/degradation, and because C→U deamination would corrupt the code (with U as a normal RNA base, proofreading can't distinguish it). Option 3 is false (RNA base-pairs readily). Option 4 is reversed — DNA is more stable.",
          "type": "multiple"
        }
      ],
      "flashcards": [
        {
          "front": "Which base replaces thymine in RNA, and what sugar does RNA use?",
          "back": "Uracil (U) replaces thymine; RNA uses ribose (which has a reactive 2'-OH), DNA uses deoxyribose."
        },
        {
          "front": "Name the three eukaryotic RNA polymerases and their main products.",
          "back": "Pol I → rRNA (5.8S, 18S, 28S); Pol II → all protein-coding genes + miRNA/siRNA/lncRNA/most snRNA; Pol III → tRNA, 5S rRNA, some snRNA."
        },
        {
          "front": "What torsional stress does a moving RNA polymerase create, and which enzymes relieve it?",
          "back": "Positive supercoils ahead, negative behind. Topoisomerase I (single-strand break, no ATP) and Topoisomerase II (double-strand break, ATP-dependent) relieve it."
        },
        {
          "front": "What are the two key proofreading/primer differences between DNA Pol and RNA Pol?",
          "back": "DNA Pol needs a primer and has 3'→5' exonuclease proofreading (error ~1/10⁷). RNA Pol initiates de novo (no primer), only limited backtracking proofreading (error ~1/10⁴)."
        },
        {
          "front": "Describe the 5' cap and 3' poly-A tail of eukaryotic mRNA.",
          "back": "5' cap = 7-methylguanosine (m7G) via a 5'-to-5' triphosphate bridge, marks mRNA. Poly-A tail = ~150-250 adenines at the 3' end, signals intact, export-ready mRNA."
        },
        {
          "front": "What is a ribozyme? Give three examples.",
          "back": "A ribozyme is catalytic RNA. Examples: ribosome peptidyl transferase (rRNA), spliceosome snRNAs (U2/U6), self-splicing Group I/II introns, RNase P. (Discovered by Altman & Cech, Nobel 1989.)"
        },
        {
          "front": "What sequences mark intron boundaries, and what intermediate forms during splicing?",
          "back": "5' splice site GU, a branch-point A, polypyrimidine tract, and 3' splice site AG. The branch-point 2'-OH attacks the 5' site, forming a lariat; exons are ligated and the intron leaves as a lariat."
        },
        {
          "front": "Which transcription factor recognizes the TATA box, and which phosphorylates the Pol II CTD?",
          "back": "TFIID (= TBP + 11 TAFs) recognizes the TATA box. TFIIH unwinds DNA and phosphorylates Ser5 of the Pol II C-terminal domain (CTD), releasing Pol from the promoter."
        },
        {
          "front": "How do miRNAs silence genes?",
          "back": "They bind target mRNA (often the 3'UTR), either blocking translation or triggering mRNA degradation."
        },
        {
          "front": "State the RNA world hypothesis and why DNA replaced RNA as genetic material.",
          "back": "RNA world (Crick 1968): life began with RNA acting as both genetic carrier and catalyst. DNA took over because RNA's 2'-OH causes spontaneous autocleavage, and C→U deamination would corrupt the code if U were a normal base."
        }
      ]
    },
    {
      "id": 4,
      "title": "Proteins: Structure, Function & Regulation",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "Central Dogma & Its Exceptions",
          "body": "**Classical central dogma:** information flows in one direction:\n\n```\nDNA --(transcription)--> RNA --(translation)--> Protein\n```\n\nThe slides stress the dogma is **obsolete** — information flow is more complex:\n- **Reverse transcription:** RNA -> DNA (e.g. retroviruses).\n- **DNA self-replication** (the DNA->DNA loop).\n- **RNA that is never translated** but still functional: **scaffold RNA**, **ribozymes** (catalytic RNA), and **regulatory ncRNAs**.\n\n**Codons** are read in groups of 3 nucleotides on the mRNA (5'->3'); each codon specifies one amino acid in the growing polypeptide (e.g. UAC=Tyr, UCA=Ser, GGU=Gly)."
        },
        {
          "heading": "Translation: tRNA, the Ribosome & the Genetic Code",
          "body": "**Translation** = RNA is read into protein, **catalyzed by the ribosome**, using **amino acids (AA)** as building blocks. Three phases:\n\n| Phase | What happens |\n|-------|--------------|\n| **1. Initiation** | Aminoacyl-tRNA + small (40S) subunit bind mRNA; large (60S) subunit joins -> initiation complex |\n| **2. Elongation** | tRNAs deliver AAs; peptide bonds form; ribosome moves 5'->3' |\n| **3. Termination** | Stop codon reached; polypeptide released |\n\n**Genetic code:** 20 amino acids encoded by **61 sense codons + 3 stop codons = 64**. **AUG = Met = start codon.** Stop codons: **UAA, UAG, UGA.**\n\n**Redundancy / degeneracy:** most AAs are encoded by more than one codon. **tRNAs carry the amino acid** at the 3' attachment site and read the mRNA via the **anticodon**; tRNA folds into a cloverleaf (2D) / L-shape (3D) stabilized by intramolecular base pairing."
        },
        {
          "heading": "tRNA Biogenesis, Wobble & Isoacceptors",
          "body": "**tRNA maturation:** pre-tRNA is transcribed by **RNA polymerase III**, then processed:\n- **RNase P** trims the 5' end; **RNase Z** trims the 3' end.\n- **Splicing:** intron removal by the **TSEN complex**, exon ligation by the **RTCB complex**.\n- Mature tRNA is then **aminoacylated (\"charged\")** by **aminoacyl-tRNA synthetases**.\n\n**Wobble hypothesis:** the **third codon position** (3' base of codon / 5' base of anticodon) tolerates non-standard pairing, so one tRNA can read several codons.\n\n**Isoacceptor tRNAs:** different tRNA genes whose products are charged with the **same amino acid** (e.g. multiple Arg-tRNAs reading CGC, CGU, AGA).\n\n**Inosine (I)** pairing: adenosine is deaminated to **inosine**, which can pair with **A, C, or U** — broadening decoding capacity.\n\n**tRNA availability dictates protein synthesis:** the pool/abundance of charged tRNAs influences translation efficiency and output."
        },
        {
          "heading": "Amino Acids & the Peptide Bond (Primary Structure)",
          "body": "**General AA structure:** a central **α-carbon** bonded to:\n- an **amino group (–NH₂)**\n- a **carboxyl group (–COOH)**\n- a **hydrogen (H)**\n- a variable **side chain (R)** — one of 20.\n\nAt **pH 7**, both amino and carboxyl groups are **ionized** (zwitterion: ⁺H₃N–CHR–COO⁻).\n\n**Peptide bond formation:** the carboxyl of AA1 condenses with the amino group of AA2, releasing **water (condensation/dehydration)**. The chain runs **N-terminus -> C-terminus**.\n\n**20 amino acids; 9 are essential** (must be taken up with food), the rest are **non-essential** (the body can build them).\n\n```\n   H   O        H   O\n   |   ||       |   ||\nH2N-Cα-C--N-----Cα-C-OH   + H2O\n   |       |    |\n   R1      H    R2\n        peptide bond\n```"
        },
        {
          "heading": "Side-Chain Chemistry: Polar vs Non-Polar",
          "body": "Amino acids are grouped by side-chain properties — key for predicting where they sit in a folded protein.\n\n| Class | Examples | Property |\n|-------|----------|----------|\n| **Acidic (negative)** | Asp (D), Glu (E) | polar, hydrophilic |\n| **Basic (positive)** | Arg (R), Lys (K), His (H) | polar, hydrophilic |\n| **Uncharged polar** | Asn (N), Gln (Q), Ser (S), Thr (T), Tyr (Y) | polar, hydrophilic |\n| **Nonpolar** | Ala, Gly, Val, Leu, Ile, Pro, Phe, Met, Trp, Cys | **hydrophobic** |\n\n**Rule of thumb:** polar AAs are **hydrophilic** (face water/surface); nonpolar AAs are **hydrophobic** (bury in the protein core). Other chart categories: aliphatic, aromatic, hydroxylic, sulfur-containing (Cys, Met), amidic (Asn, Gln)."
        },
        {
          "heading": "Hierarchy of Protein Structure & Folding Forces",
          "body": "**Four levels of structure:**\n\n| Level | Definition |\n|-------|-----------|\n| **Primary** | linear AA sequence of the polypeptide chain |\n| **Secondary** | local folds: **α-helix** and **β-sheet**, stabilized by **H-bonds** of the backbone |\n| **Tertiary** | overall 3D fold of one chain; built from **domains** (modular units, e.g. SH2, SH3, kinase) |\n| **Quaternary** | multiple subunits assemble (homo-/heteromultimers), e.g. **hemoglobin** (4 subunits + heme/Fe) |\n\n**α-helix:** rise of **0.54 nm** per turn; common in channels, transporters, filaments.\n**β-sheet:** rigid; strands run **parallel or antiparallel**; spacing ~0.7 nm.\n\n**Peptide bond is planar** -> no free rotation; only the **φ (phi)** and **ψ (psi)** angles around the Cα rotate (steric limits).\n\n**Folding forces (weak, noncovalent — strong together):** **hydrogen bonds**, **electrostatic attractions** (e.g. Glu⁻···Lys⁺), and **van der Waals attractions** (e.g. between Val/Ala methyl groups)."
        },
        {
          "heading": "Folding Quality Control: Chaperones, Proteasome, Autophagy",
          "body": "**Chaperones** (proteins themselves) assist folding: a newly synthesized **unfolded** chain may aggregate or fold slowly on its own; the chaperone binds it and helps it reach the **folded** state, then releases it for use.\n\n**Two main degradation pathways:**\n\n| System | Target | Mechanism |\n|--------|--------|-----------|\n| **Ubiquitin–Proteasome** | specific, individual proteins (the cell's *precision editor*) | **E1 -> E2 -> E3** cascade adds a **polyubiquitin** chain (ATP-dependent); tagged protein fed into the **proteasome** and chopped up; Ub recycled |\n| **Autophagy** | bulk components, organelles, under stress (the *recycling crew*) | phagophore -> autophagosome -> fuses with **lysosome** -> autolysosome -> degradation & recycling |\n\n**Misfolding diseases:** **Alzheimer's** — neurofibrillary tangles (**p-Tau**) + plaques (**β-amyloid**); **Parkinson's** — degeneration of dopaminergic neurons in the **substantia nigra** with **α-synuclein** deposits."
        },
        {
          "heading": "Protein Function: Binding, Enzymes & Cofactors",
          "body": "**All proteins bind other molecules** via a **binding site** that uses **noncovalent bonds** complementary to the **ligand** — specificity comes from the folded shape and side-chain chemistry.\n\n**Functional classes:** enzymatic, storage (e.g. ovalbumin), hormonal, motor (actin/myosin), defensive (antibodies), transport (ion channels), receptor, structural (collagen).\n\n**Antibodies** illustrate diversity/specificity: **Y-shaped, two identical antigen-binding sites** (heavy + light chain). Diversity sources: **V-D-J recombination**, **junctional flexibility**, **somatic hypermutation**, **heavy/light chain pairing**, **class switching**.\n\n**Enzymes** end in **-ase** and **lower activation energy** (don't change equilibrium) — speeding reactions by orders of magnitude. Classes: hydrolases, nucleases, proteases, synthases, ligases, isomerases, polymerases, kinases (add phosphate), phosphatases (remove phosphate), oxido-reductases, ATPases, GTPases.\n\n**Cofactors:** many **vitamin derivatives** are essential coenzymes — e.g. B₁->thiamine pyrophosphate, B₂->FAD, B₃->NAD(P)H, B₅->Coenzyme A, B₆->pyridoxal phosphate, B₇->biotin, B₉->tetrahydrofolate, B₁₂->cobalamin."
        },
        {
          "heading": "Regulation of Protein/Enzyme Activity & PTMs",
          "body": "Activity is controlled at multiple levels:\n\n- **Gene expression** (ON/OFF) — control how much protein is made.\n- **Feedback loops:** an end product (Z) inhibits an upstream enzyme (B) -> **negative regulation**.\n- **Allosteric regulation:** molecule **X** binds away from the active site, shifting the enzyme between **active <-> inactive** conformations (allosteric **activation** = positive; allosteric **inhibition** = negative).\n- **Phosphorylation (reversible switch):** **kinase adds** a phosphate (from ATP, usually onto Ser/Thr/Tyr), **phosphatase removes** it. Can turn activity **ON or OFF**.\n\n**Consequences of phosphorylation:** (1) major **conformational change**; (2) the phosphate creates a **docking site** recognized by other proteins (e.g. **SH2 domain**); (3) **masks** a binding site, disrupting protein–protein interactions. Example signaling cascade: **MAP kinase** (MAPKKK->MAPKK->MAPK) driving growth/proliferation.\n\n**Post-translational modifications (PTMs)** = \"sticky notes with functional instructions.\" For PTMs: **type, position, combination, and timing all matter.**\n\n| PTM | Function |\n|-----|----------|\n| Phosphate (Ser/Thr/Tyr) | drives assembly into complexes |\n| Methyl on Lys | histone marks / chromatin regions |\n| Acetyl on Lys | activates genes (histones) |\n| Palmityl on Cys | membrane association |\n| O-GlcNAc (Ser/Thr) | glucose homeostasis |\n| Ubiquitin on Lys | mono = vesicle transport; poly = degradation |\n\n**Ubiquitin** = a **76-amino-acid polypeptide**. Epigenetic readout (same genome, different output): DNA methylation (CpG, silencing), histone code (H3K4me3 = active, H3K27me3 = repressed), chromatin remodeling, non-coding RNA (miRNAs ~22 nt)."
        }
      ],
      "questions": [
        {
          "id": "L4Q1",
          "conceptIndex": 1,
          "text": "How many codons specify amino acids, and how many are stop codons in the standard genetic code?",
          "options": [
            "64 sense codons, 0 stop codons",
            "61 sense codons + 3 stop codons",
            "60 sense codons + 4 stop codons",
            "20 sense codons + 3 stop codons"
          ],
          "correct": [
            1
          ],
          "explanation": "There are 64 possible codons total: 61 encode amino acids (sense codons) and 3 are stop codons (UAA, UAG, UGA). The '20' in distractors refers to amino acids, not codons — a classic mix-up. AUG (Met) doubles as the start codon.",
          "type": "single"
        },
        {
          "id": "L4Q2",
          "conceptIndex": 0,
          "text": "Which statements about the 'central dogma is obsolete' slide are correct?",
          "options": [
            "Reverse transcription can convert RNA back into DNA",
            "Some RNAs are never translated but act as ribozymes or regulatory ncRNAs",
            "Information can only ever flow DNA -> RNA -> protein",
            "DNA can act as a template to replicate itself"
          ],
          "correct": [
            0,
            1,
            3
          ],
          "explanation": "The slide explicitly adds reverse transcription (RNA->DNA), DNA self-replication, and functional non-translated RNAs (scaffold, ribozyme, regulatory ncRNA). The statement that flow is strictly one-directional is precisely the obsolete view being corrected.",
          "type": "multiple"
        },
        {
          "id": "L4Q3",
          "conceptIndex": 2,
          "text": "What is the role of the wobble position and inosine in translation?",
          "options": [
            "They force one codon to be read by exactly one tRNA",
            "Wobble at the 3rd codon position lets a single tRNA read several codons",
            "Inosine (from deaminated adenosine) can pair with A, C, or U",
            "Inosine pairs only with cytosine, exactly like guanine"
          ],
          "correct": [
            1,
            2
          ],
          "explanation": "Wobble relaxes base-pairing rules at the third codon position so one tRNA decodes multiple codons. Inosine, formed by deamination of adenosine, pairs flexibly with A, C, or U — it does NOT pair exclusively with C, and wobble is the opposite of one-codon-one-tRNA.",
          "type": "multiple"
        },
        {
          "id": "L4Q4",
          "conceptIndex": 3,
          "text": "At physiological pH (~7), the amino and carboxyl groups of a free amino acid are:",
          "options": [
            "Both uncharged",
            "Both ionized (zwitterion: +H3N– and –COO–)",
            "Only the carboxyl group is ionized",
            "Joined by a peptide bond to form water"
          ],
          "correct": [
            1
          ],
          "explanation": "The slide states that at pH 7 both the amino and carboxyl groups are ionized, giving the zwitterion +H3N–CHR–COO–. Peptide bond formation is a separate condensation reaction between two amino acids, not a property of a single AA's charge state.",
          "type": "single"
        },
        {
          "id": "L4Q5",
          "conceptIndex": 5,
          "text": "Which forces stabilize protein folding according to the 'forces behind protein folding' slide?",
          "options": [
            "Hydrogen bonds",
            "Electrostatic attractions",
            "van der Waals attractions",
            "Covalent peptide bonds between distant residues"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "The slide highlights three weak NONcovalent interactions — hydrogen bonds, electrostatic attractions, and van der Waals attractions — which are individually weak but collectively strong. Covalent peptide bonds form the backbone (primary structure), not the folding-stabilizing noncovalent network shown.",
          "type": "multiple"
        },
        {
          "id": "L4Q6",
          "conceptIndex": 6,
          "text": "Which correctly pairs a degradation system with its described role?",
          "options": [
            "Ubiquitin–proteasome = bulk recycling of whole organelles",
            "Ubiquitin–proteasome = selective, targeted removal of individual proteins (precision editor)",
            "Autophagy = selective tagging of single proteins with a phosphate",
            "Autophagy = bulk degradation/recycling, especially under stress, via the lysosome"
          ],
          "correct": [
            1,
            3
          ],
          "explanation": "The proteasome system is the 'precision editor' that removes specific polyubiquitin-tagged proteins. Autophagy is the bulk 'recycling crew' that engulfs components and fuses with the lysosome, important under stress. The two roles are swapped in the wrong options, and autophagy does not use phosphate tagging.",
          "type": "multiple"
        },
        {
          "id": "L4Q7",
          "conceptIndex": 8,
          "text": "A protein kinase and a protein phosphatase do which of the following?",
          "options": [
            "Kinase removes phosphate; phosphatase adds it",
            "Kinase adds phosphate (from ATP); phosphatase removes it",
            "Both add phosphate but to different residues",
            "Both permanently lock the protein in the ON state"
          ],
          "correct": [
            1
          ],
          "explanation": "Kinases transfer a phosphate group from ATP onto the protein (often Ser/Thr/Tyr); phosphatases hydrolytically remove it. This makes phosphorylation a reversible switch — it can turn activity ON or OFF, not a permanent lock. The first option reverses the two enzymes.",
          "type": "single"
        },
        {
          "id": "L4Q8",
          "conceptIndex": 7,
          "text": "Enzymes accelerate reactions by:",
          "options": [
            "Lowering the activation energy of the reaction",
            "Shifting the reaction equilibrium toward products",
            "Being consumed stoichiometrically in the reaction",
            "Raising the energy of the substrate transition state"
          ],
          "correct": [
            0
          ],
          "explanation": "Enzymes lower the activation energy (the ES transition-state barrier in the energy diagram), dramatically speeding reactions. They do NOT change the equilibrium/ΔG, are not consumed, and they lower — not raise — the transition-state barrier. The catalyzed path simply has a smaller hump.",
          "type": "single"
        },
        {
          "id": "L4Q9",
          "conceptIndex": 8,
          "text": "Which describes allosteric regulation as shown in the slides?",
          "options": [
            "A regulatory molecule binds at the active site and is converted to product",
            "A molecule X binds away from the active site and shifts the enzyme between active and inactive states",
            "Allosteric activation increases the active fraction; allosteric inhibition decreases it",
            "It requires covalent attachment of ubiquitin"
          ],
          "correct": [
            1,
            2
          ],
          "explanation": "Allosteric regulation works through a molecule (X) binding at a site distinct from the active site, changing the enzyme's conformation. Positive regulation raises the active fraction (e.g. 10%->100%), negative lowers it (100%->10%). It is noncovalent — unlike ubiquitination — and the regulator is not turned into product.",
          "type": "multiple"
        },
        {
          "id": "L4Q10",
          "conceptIndex": 1,
          "text": "Regarding the genetic code and protein synthesis, which statement is FALSE?",
          "options": [
            "The same amino acid can be encoded by more than one codon (redundancy)",
            "Isoacceptor tRNAs are charged with the same amino acid",
            "Each amino acid is encoded by exactly one unique codon",
            "The availability of charged tRNAs influences protein synthesis"
          ],
          "correct": [
            2
          ],
          "explanation": "The code is degenerate/redundant — most amino acids have several codons, and isoacceptor tRNAs carry the same AA for different codons. The claim of exactly one codon per amino acid is therefore false. tRNA availability does modulate translation output, as the slides emphasize.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Start codon and the three stop codons?",
          "back": "Start = AUG (Met). Stop codons = UAA, UAG, UGA. 61 sense codons + 3 stop = 64 total."
        },
        {
          "front": "Which enzymes trim the ends of pre-tRNA, and which polymerase transcribes it?",
          "back": "Transcribed by RNA polymerase III. RNase P trims the 5' end; RNase Z trims the 3' end. Splicing: introns removed by TSEN, exons ligated by RTCB. Then charged by aminoacyl-tRNA synthetases."
        },
        {
          "front": "What is the wobble hypothesis?",
          "back": "The third codon position (5' anticodon base) tolerates non-standard pairing, so a single tRNA can read multiple codons. Inosine there can pair with A, C, or U."
        },
        {
          "front": "How is a peptide bond formed?",
          "back": "Condensation (dehydration): the carboxyl group of one amino acid joins the amino group of the next, releasing water. Chain runs N-terminus -> C-terminus."
        },
        {
          "front": "Polar vs non-polar amino acids — where do they sit in a folded protein?",
          "back": "Polar (acidic, basic, uncharged-polar) = hydrophilic, face water/surface. Non-polar = hydrophobic, bury in the protein core."
        },
        {
          "front": "Name the four levels of protein structure.",
          "back": "Primary (AA sequence) -> Secondary (α-helix, β-sheet via backbone H-bonds) -> Tertiary (3D fold of one chain, built from domains) -> Quaternary (assembly of multiple subunits, e.g. hemoglobin)."
        },
        {
          "front": "Three noncovalent forces that drive protein folding?",
          "back": "Hydrogen bonds, electrostatic attractions (e.g. Glu⁻···Lys⁺), and van der Waals attractions. Individually weak, collectively strong."
        },
        {
          "front": "Ubiquitin–proteasome vs autophagy?",
          "back": "Ubiquitin–proteasome: selective removal of individual proteins tagged by a polyubiquitin chain via E1->E2->E3 (precision editor). Autophagy: bulk degradation/recycling via lysosome fusion, especially under stress."
        },
        {
          "front": "What do kinases and phosphatases do, and the 3 consequences of phosphorylation?",
          "back": "Kinase adds phosphate (from ATP, on Ser/Thr/Tyr); phosphatase removes it. Consequences: (1) conformational change, (2) creates a docking site (e.g. SH2 domain), (3) masks a binding site disrupting protein-protein interactions."
        },
        {
          "front": "What is ubiquitin and its two signaling outcomes?",
          "back": "Ubiquitin = a 76-amino-acid polypeptide. Monoubiquitin (on Lys) regulates vesicle transport of membrane proteins; a polyubiquitin chain targets the protein for proteasomal degradation."
        }
      ]
    },
    {
      "id": 5,
      "title": "Lipids: Structure, Membranes & Function",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "Biological Roles & Categories of Lipids",
          "body": "Lipids serve many jobs in the cell:\n- **Energy storage** — triglycerides store energy; fatty acids are metabolized as an **energy source**.\n- **Signaling** — **steroid hormones** act as intracellular messengers.\n- **Structure** — **phospholipids, sphingolipids, and cholesterol** are the structural components of biological (semipermeable) membranes.\n- **Vitamin transport** — carriers for the **fat-soluble vitamins A, D, E, K**.\n- **Cushioning/insulation** for organs; **waxes** form protective coatings (plants, ears).\n\n**Classification hierarchy:**\n```\nLIPIDS\n├── Fatty Acids\n│   ├── Triglycerides\n│   ├── Phosphoglycerides (phospholipids)\n│   ├── Waxes\n│   └── Sphingolipids\n│        ├── Sphingomyelins\n│        └── Glycolipids → Cerebrosides, Gangliosides\n└── Steroids\n```"
        },
        {
          "heading": "Saturated vs. Unsaturated Fatty Acids",
          "body": "Defined by **C=C double bonds** in the hydrocarbon chain.\n\n| Type | Double bonds | Shape | State at room T | Origin |\n|------|-------------|-------|-----------------|--------|\n| **Saturated** | none | straight | **solid** | natural |\n| **Mono-unsaturated** | one | slight bend | liquid-ish | natural |\n| **Polyunsaturated** | multiple (>1) | bent | liquid | natural |\n\n**Cis vs. trans** (both unsaturated):\n- **Cis** — H atoms on the *same side* → introduces a **kink/bent configuration**. Natural; **liquid** at room temp.\n- **Trans** — H atoms on *opposite sides* → chain stays nearly straight. **Artificial** (industrially produced).\n\nThe **cis kink** is the key reason unsaturated fats pack loosely and stay fluid/liquid, while straight saturated chains pack tightly and solidify."
        },
        {
          "heading": "Common Fatty Acids & the C:D Notation",
          "body": "Notation **C(x):y** = x carbons : y double bonds. Omega-n = position of the first double bond counted from the methyl (ω) end.\n\n| Fatty acid | Notation | Type | Omega |\n|-----------|----------|------|-------|\n| **Stearic** | C18:0 | saturated | — |\n| **Palmitoleic** | C16:1 cis-9 | mono-unsat | ω-7 |\n| **Oleic** | C18:1 cis-9 | mono-unsat | ω-9 |\n| **α-Linolenic** | C18:3 cis-9,12,15 | polyunsat | **ω-3** |\n| **γ-Linolenic** | C18:3 cis-6,9,12 | polyunsat | **ω-6** |\n\n**Key exam fact:** **Omega-3 and omega-6 are essential fatty acids** — the body *cannot* synthesize them and must obtain them from the diet."
        },
        {
          "heading": "Triglycerides & Phosphoglycerides",
          "body": "**Triglycerides** = **glycerol + 3 fatty acids** (via ester bonds).\n- The **most common type of fat** in the body; circulate in blood; **stored in fat cells** for later energy use.\n- High triglyceride levels raise risk of **heart disease and stroke**.\n\n**Phosphoglycerides (phospholipids):** glycerol backbone + **2 fatty acid tails** + **phosphate + head group**.\n```\n[CHOLINE]   ← polar head group\n   |\n[PHOSPHATE] ← hydrophilic\n   |\n[GLYCEROL]\n  /    \\\ntail1  tail2  ← nonpolar hydrophobic tails\n```\n- Average tail length: **14–24 carbon atoms**.\n- **Amphipathic** (polar head + nonpolar tails).\n- Differences in **length and saturation** of the FA tails influence how molecules pack → controls **membrane fluidity**."
        },
        {
          "heading": "Membrane Phospholipids & the Lipid Bilayer",
          "body": "Main membrane phospholipids in animal cells: **glycerophospholipids** and **sphingolipids**.\n\n**Glycerophospholipids** (by head group):\n- **Phosphatidylethanolamine** (PE)\n- **Phosphatidylserine** (PS) — net negative charge\n- **Phosphatidylcholine** (PC) — **most abundant** in mammalian membranes\n\n**Sphingolipids:** **sphingomyelin** and **sphingosine** (built on a sphingosine backbone, not glycerol).\n\n**Self-assembly in water** (driven by hydrophobic effect):\n- **Cone-shaped** molecules → **micelles** (single layer, tails inward).\n- **Cylinder-shaped** molecules → **lipid bilayer**.\n- Bilayer closing into a **sealed compartment/vesicle** is **energetically favorable** because it shields hydrophobic tails from water (exposed planar edges are unfavorable).\n\n**Fluidity rule:** increased chain **length** and **unsaturated (cis) side chains increase fluidity**."
        },
        {
          "heading": "Membrane Dynamics & Lipid Asymmetry",
          "body": "Phospholipids move within a bilayer in several ways:\n- **Lateral diffusion** — fast, within the same leaflet.\n- **Flexion** and **rotation** — common.\n- **Flip-flop** (transverse, leaflet-to-leaflet) — **rarely occurs** (energetically costly; requires enzymes).\n\n**Lipid asymmetry:** the two leaflets have different lipid compositions.\n- Negatively charged lipids (e.g., **phosphatidylserine**) are normally on the **cytosolic** side.\n- Glycolipids/sugars face the **extracellular** side.\n- Asymmetry **supports protein binding** and helps **distinguish live from dead cells** (PS exposure on the outer leaflet is a death signal)."
        },
        {
          "heading": "Sterols: Cholesterol & Membrane Fluidity",
          "body": "**Cholesterol** structure:\n- **Four fused carbon rings** (rigid planar steroid ring) + a **polar –OH head group** + a short **nonpolar hydrocarbon tail**.\n- It is the **basis for all steroid hormones** (e.g., testosterone, estrogen).\n\n**Cholesterol is a fluidity buffer** — it dampens temperature effects:\n\n| Temperature | Without cholesterol | With cholesterol |\n|-------------|--------------------|--------------------|\n| **High T** | too fluid | **increased rigidity** |\n| **Low T** | too rigid | **increased fluidity** |\n\n**Derivatives** (from cholesterol): cholic acid (bile), pregnenolone → progesterone, cortisol, aldosterone, testosterone → estradiol; and via 7-dehydrocholesterol + UV → **cholecalciferol (vitamin D3)**.\n\n**Steroid hormone signaling:** lipophilic hormones cross the membrane → bind an intracellular **receptor protein** → the **steroid-receptor complex** enters the nucleus → binds DNA → drives **mRNA transcription → protein synthesis**."
        },
        {
          "heading": "Glycolipids & the Glycocalyx",
          "body": "**Glycolipids** = sugar-containing lipids; ~**5% of outer-membrane lipids**; sugar groups always face the **extracellular** side.\n- **Protective** against lytic enzymes.\n- Charged glycolipids (**gangliosides**, carry sialic acid/NANA) contribute to **membrane potential**.\n- Essential in **cell adhesion** — can be bound by **lectins**.\n- Examples: **galactocerebroside** (one sugar), **GM1 ganglioside** (branched sugar + NANA).\n\n**Glycocalyx** = carbohydrate layer on the cell surface from sugar residues of **transmembrane glycoproteins, adsorbed glycoproteins, glycolipids, and proteoglycans**. Function: **protection against mechanical and chemical damage**."
        },
        {
          "heading": "Fluid Mosaic Model, Rafts & Membrane Confinement",
          "body": "**Fluid mosaic model:** the membrane is a **flexible, dynamic mosaic** of molecules (mainly **phospholipids and proteins**) embedded in a lipid bilayer — both **fluid and functional**, allowing molecular movement and communication across the cell boundary.\n\n**Lipid rafts:** temporary, specialized **membrane microdomains** that organize proteins. Proteins can be (A) self-assembled into large aggregates (e.g., bacteriorhodopsin in the purple membrane of *Halobacterium salinarum*), (B) tethered to extracellular macromolecules, (C) tethered to intracellular structures, or (D) bound to proteins on another cell (**intercellular junctions**).\n\n**Corralling:** the **cortical cytoskeleton** divides the membrane into domains (~100 nm). Proteins diffuse freely *within* a corral but rarely hop between corrals → restricts long-range diffusion.\n\n**Other lipid-based molecules:** **prostaglandins** (inflammation), **bile salts** e.g. cholic acid (aid digestion), **fat-soluble vitamins A, D, E, K**."
        }
      ],
      "questions": [
        {
          "id": "L5Q1",
          "conceptIndex": 1,
          "text": "Why are cis-unsaturated fatty acids typically liquid at room temperature while saturated fatty acids are solid?",
          "options": [
            "The cis double bond introduces a kink that prevents tight packing of chains",
            "Saturated chains carry a net negative charge that stabilizes a solid lattice",
            "Cis fatty acids are always much shorter than saturated ones",
            "Trans double bonds in cis fats lower the melting point"
          ],
          "correct": [
            0
          ],
          "explanation": "A cis double bond creates a bend/kink in the chain, so molecules pack loosely and stay fluid. Straight saturated chains pack tightly and solidify. Charge and chain length are not the cause, and cis fats by definition do not contain trans bonds.",
          "type": "single"
        },
        {
          "id": "L5Q2",
          "conceptIndex": 2,
          "text": "Which fatty acids are described as ESSENTIAL because the body cannot make them?",
          "options": [
            "Omega-3 fatty acids (e.g., α-linolenic acid)",
            "Omega-6 fatty acids (e.g., γ-linolenic acid)",
            "Stearic acid",
            "Oleic acid"
          ],
          "correct": [
            0,
            1
          ],
          "explanation": "The slides state omega-3 and omega-6 are essential fatty acids that the body cannot synthesize. Stearic acid (saturated) and oleic acid (omega-9 mono-unsaturated) can be made by the body.",
          "type": "multiple"
        },
        {
          "id": "L5Q3",
          "conceptIndex": 3,
          "text": "A triglyceride is composed of:",
          "options": [
            "Glycerol plus three fatty acids",
            "Glycerol, two fatty acids, and a phosphate head group",
            "Sphingosine plus a sugar",
            "Four fused carbon rings with a hydroxyl group"
          ],
          "correct": [
            0
          ],
          "explanation": "A triglyceride = glycerol + three fatty acids. Two fatty acids + phosphate + head group describes a phosphoglyceride. Sphingosine + sugar is a glycolipid, and four fused rings + OH is cholesterol.",
          "type": "single"
        },
        {
          "id": "L5Q4",
          "conceptIndex": 6,
          "text": "How does cholesterol affect membrane fluidity at HIGH temperature?",
          "options": [
            "It increases rigidity, preventing the membrane from becoming too fluid",
            "It increases fluidity, preventing the membrane from becoming too rigid",
            "It has no effect at high temperature",
            "It causes the bilayer to convert into a micelle"
          ],
          "correct": [
            0
          ],
          "explanation": "Cholesterol is a fluidity buffer: at high temperature it restrains phospholipid movement and increases rigidity. At LOW temperature it does the opposite (increases fluidity). It does not convert bilayers to micelles.",
          "type": "single"
        },
        {
          "id": "L5Q5",
          "conceptIndex": 5,
          "text": "Which statements about phospholipid movement in a bilayer are correct?",
          "options": [
            "Lateral diffusion within a leaflet occurs readily",
            "Flip-flop (transverse movement between leaflets) rarely occurs",
            "Flip-flop is the fastest and most common motion",
            "Rotation and flexion occur"
          ],
          "correct": [
            0,
            1,
            3
          ],
          "explanation": "Lateral diffusion, rotation, and flexion are common. Flip-flop between leaflets is energetically costly and rarely occurs, so the claim that it is fastest/most common is false.",
          "type": "multiple"
        },
        {
          "id": "L5Q6",
          "conceptIndex": 4,
          "text": "Which phospholipid is the MOST abundant in mammalian cell membranes?",
          "options": [
            "Phosphatidylcholine",
            "Phosphatidylserine",
            "Phosphatidylethanolamine",
            "Sphingomyelin"
          ],
          "correct": [
            0
          ],
          "explanation": "The slides label phosphatidylcholine as the most abundant in mammalian membranes. PS and PE are present but less abundant; sphingomyelin is a sphingolipid, not the most abundant.",
          "type": "single"
        },
        {
          "id": "L5Q7",
          "conceptIndex": 2,
          "text": "What does the notation C18:3 cis-9,12,15 (α-linolenic acid) tell you?",
          "options": [
            "18 carbons and 3 cis double bonds",
            "18 carbons and a single double bond at position 3",
            "3 carbons and 18 double bonds",
            "A saturated 18-carbon fatty acid"
          ],
          "correct": [
            0
          ],
          "explanation": "In C(x):y notation, x = number of carbons and y = number of double bonds. So C18:3 = 18 carbons, 3 double bonds (here all cis, at positions 9, 12, 15). It is polyunsaturated, not saturated.",
          "type": "single"
        },
        {
          "id": "L5Q8",
          "conceptIndex": 4,
          "text": "Why is the formation of a sealed vesicle from a planar bilayer energetically favorable?",
          "options": [
            "It shields the hydrophobic tails from water by eliminating exposed edges",
            "It exposes more hydrophobic tails to the aqueous environment",
            "It increases the surface contact between tails and water",
            "It requires ATP hydrolysis to remain stable"
          ],
          "correct": [
            0
          ],
          "explanation": "A planar bilayer exposes hydrophobic tails to water at its edges (unfavorable). Closing into a sealed compartment hides those tails from water, which is energetically favorable. It is driven by the hydrophobic effect, not ATP.",
          "type": "single"
        },
        {
          "id": "L5Q9",
          "conceptIndex": 6,
          "text": "Which features correctly describe cholesterol's structure?",
          "options": [
            "Four fused carbon rings (rigid planar ring system)",
            "A polar hydroxyl (-OH) head group",
            "A short nonpolar hydrocarbon tail",
            "A phosphate head group with two long fatty acid tails"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Cholesterol has four fused rings, a polar -OH head, and a short nonpolar tail. A phosphate head with two fatty acid tails describes a phosphoglyceride, not cholesterol.",
          "type": "multiple"
        },
        {
          "id": "L5Q10",
          "conceptIndex": 5,
          "text": "What is the functional significance of lipid asymmetry between the two membrane leaflets?",
          "options": [
            "It supports protein binding and helps distinguish live from dead cells",
            "It makes flip-flop the dominant form of lipid movement",
            "It eliminates the need for membrane proteins",
            "It converts the bilayer into a saturated, rigid sheet"
          ],
          "correct": [
            0
          ],
          "explanation": "Lipid asymmetry (e.g., phosphatidylserine kept on the cytosolic side) supports protein binding and serves as a live/dead signal when PS flips to the outer leaflet. It does not promote flip-flop, remove proteins, or rigidify the membrane.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Two main reasons lipids matter structurally and as signals?",
          "back": "Structural: phospholipids, sphingolipids & cholesterol build semipermeable membranes. Signaling: steroid hormones act as intracellular messengers. (Also: energy storage as triglycerides, fat-soluble vitamin A/D/E/K transport.)"
        },
        {
          "front": "Cis vs. trans unsaturated fatty acids?",
          "back": "Cis = H atoms on the same side → kink/bent, natural, liquid at room temp. Trans = H atoms on opposite sides → nearly straight, artificial."
        },
        {
          "front": "What does C18:1 cis-9 (oleic acid) mean? Its omega class?",
          "back": "18 carbons, 1 cis double bond at position 9. Mono-unsaturated, omega-9."
        },
        {
          "front": "Which fatty acids are essential (cannot be synthesized)?",
          "back": "Omega-3 (e.g., α-linolenic, C18:3) and omega-6 (e.g., γ-linolenic, C18:3) fatty acids."
        },
        {
          "front": "Composition of a triglyceride vs. a phosphoglyceride?",
          "back": "Triglyceride = glycerol + 3 fatty acids. Phosphoglyceride = glycerol + 2 fatty acid tails + phosphate + polar head group (amphipathic). Phospholipid tail length avg 14–24 carbons."
        },
        {
          "front": "Cone-shaped vs. cylinder-shaped lipids in water?",
          "back": "Cone-shaped → micelles (single layer, tails inward). Cylinder-shaped → lipid bilayer."
        },
        {
          "front": "How does cholesterol buffer membrane fluidity?",
          "back": "High temp: increases rigidity (stops being too fluid). Low temp: increases fluidity (stops being too rigid). Structure: 4 fused rings + polar -OH head + short nonpolar tail."
        },
        {
          "front": "Which phospholipid movement rarely occurs and why?",
          "back": "Flip-flop (transverse movement between leaflets) — energetically costly; requires enzymes. Lateral diffusion, rotation, and flexion are common."
        },
        {
          "front": "Most abundant phospholipid in mammalian membranes?",
          "back": "Phosphatidylcholine (a glycerophospholipid)."
        },
        {
          "front": "What is the fluid mosaic model?",
          "back": "Membrane = flexible, dynamic mosaic of phospholipids and proteins in a lipid bilayer; both fluid and functional, allowing molecule movement and communication across the cell boundary. Diffusion is confined by cytoskeletal corralling and organized by lipid rafts."
        }
      ]
    },
    {
      "id": 6,
      "title": "The Cell and Its Organelles",
      "speaker": "Katja",
      "concepts": [
        {
          "heading": "Prokaryotic vs. Eukaryotic Cells",
          "body": "**Prokaryotic (bacterial) cell** — no nucleus, no membrane-bound organelles. DNA sits free in the cytoplasm as the **nucleoid**; extra small circular DNA = **plasmids**. Key features: **capsule** (outermost), **cell wall**, **plasma membrane**, **ribosomes**, **pili** (attachment/conjugation) and **flagellum** (motility).\n\n**Eukaryotic cell** — true membrane-bound **nucleus** plus many membrane-bound organelles.\n\n| Feature | Animal cell | Plant cell |\n|---|---|---|\n| Cell wall | absent | **present** |\n| Chloroplast / Amyloplast | absent | **present** |\n| Large central vacuole | small/none | **present** |\n| Centrosome / Lysosome | present | typically absent |\n| Mitochondria, ER, Golgi, nucleus | present | present |\n\nEukaryotic cells **specialize** for optimized function (red blood cells, neurons, intestinal cells, white blood cells, sperm, ovum, bone cells)."
        },
        {
          "heading": "The Nucleus & Nuclear Envelope",
          "body": "Houses the cell's **genetic material (DNA)** and is the site of **replication and transcription**.\n\n- **Chromatin** = DNA wrapped around **histones**, suspended in the gel-like **nucleoplasm**.\n- **Nucleolus** = site of **ribosome (subunit) synthesis** — see dedicated concept.\n- **Nuclear envelope** = **two** membrane layers (outer + inner); the outer membrane is **continuous with the ER**.\n- **Nuclear lamina** = inner protein meshwork giving shape/support.\n- **Nuclear pores** = guarded by the **nuclear (pore) core complex**; control what enters/exits the nucleus.\n\n```\n  cytoplasm\n ┌─ outer membrane ── continuous with ER\n │  (perinuclear space)\n └─ inner membrane ── lined by NUCLEAR LAMINA\n        nucleoplasm: chromatin + nucleolus\n   ⇅ traffic only through NUCLEAR PORES\n```"
        },
        {
          "heading": "Nucleolus & Ribosome Biogenesis",
          "body": "The **nucleolus** is the cell's ribosome factory.\n\n- Primary function: **rRNA transcription, rRNA processing, and ribosome subunit assembly (40S and 60S)**.\n- **RNA Pol I** transcribes the **47S rDNA repeat** → **47S pre-rRNA** → processed into **18S, 5.8S, 28S** rRNAs. **RNA Pol III** makes the **5S** rRNA.\n- Combined with **ribosomal proteins** → assembled subunits are **exported** to the cytoplasm, where **60S + 40S** join on mRNA to form functional ribosomes.\n- Also performs **RNA modification/maturation** (involving the **spliceosome** and **telomerase**) and participates in the **stress response**.\n\n```\n47S rDNA →(Pol I)→ 47S pre-rRNA → [18S | 5.8S | 28S]\n          + 5S (Pol III) + ribosomal proteins\n          → 40S + 60S subunits → EXPORT → ribosome\n```"
        },
        {
          "heading": "Nuclear Lamina & Chromatin Organization",
          "body": "**Nuclear lamina** — protein meshwork lining the inner nuclear envelope; scaffold of **lamins** + lamin-associated proteins. Functions: maintains **nuclear shape/integrity**, **anchors chromatin**, and influences **gene expression, DNA replication** and other nuclear functions. It binds specific DNA regions called **lamina-associated domains (LADs)**, which are mostly **repressed/inactive** chromatin (marked by **H3K27me3**), while internal chromatin is mostly active.\n\n**Hierarchical chromatin organization** (small → large):\n\n```\nDNA → Nucleosomes → Loops/Clusters → TAD/chromatin domain\n     → Compartment → Chromosome territory\n```\n\n**Aberrant chromatin organization** (e.g. in disease/MOGHE) alters TAD structure and chromatin density, changing **gene regulation/expression**. Diseased nuclei appear denser/condensed on EM vs. control."
        },
        {
          "heading": "The Eukaryotic Cell Cycle",
          "body": "Four phases: **G1, S, G2, M**. G1+S+G2 together = **interphase**.\n\n| Phase | Event | Approx. duration |\n|---|---|---|\n| G1 | growth, environment check | (interphase) |\n| **S** | **DNA replication** | (interphase) |\n| G2 | growth, prep for division | (interphase) |\n| **M** | **mitosis + cytokinesis** | **~1 h** |\n\nInterphase ≈ **23 h**, M phase ≈ **1 h** (total ~24 h example).\n\n**M phase** = **mitosis** (nuclear division) + **cytokinesis** (cytoplasmic division). Sub-stages: prophase → prometaphase → metaphase → anaphase (A & B) → telophase."
        },
        {
          "heading": "Mitotic Spindle & Chromosome Segregation",
          "body": "The **mitotic spindle** is a **bipolar array of microtubules** built from two **centrosomes** (spindle poles). It physically separates **sister chromatids**.\n\nThree microtubule classes:\n\n| Type | Attaches to | Role |\n|---|---|---|\n| **Kinetochore MTs** | **kinetochore** on chromosome | pull chromatids to poles |\n| **Non-kinetochore (interpolar) MTs** | overlap at center | push poles apart |\n| **Astral MTs** | cell cortex | position the spindle |\n\nThe **kinetochore** is the protein structure on the centromere where kinetochore microtubules attach. **Motor proteins** generate the forces. Microtubule **+ ends** point away from the centrosome toward chromosomes/cortex."
        },
        {
          "heading": "Cell Cycle Regulation: Cyclins, CDKs & Checkpoints",
          "body": "Cell cycle is driven by **Cyclin-dependent kinases (CDKs)** activated by **cyclins** — a **highly conserved** mechanism.\n\n- **Cyclins** rise and fall through the cycle; each CDK needs its cyclin partner: **G1/S-Cdk**, **S-Cdk**, **M-Cdk**.\n- **APC/C** (anaphase-promoting complex) triggers the **metaphase→anaphase** transition and degrades M-cyclin.\n- **Checkpoints** verify conditions before proceeding: *Is the environment favorable?* (START/G1), *Is all DNA replicated?* (**G2/M**), *Are all chromosomes attached to the spindle?* (**metaphase→anaphase**).\n\n**Nobel Prize 2001 (Physiology/Medicine)** — \"key regulators of the cell cycle\":\n\n| Laureate | Discovery |\n|---|---|\n| **Leland Hartwell** | **CDC genes**; introduced the **checkpoint** concept |\n| **Paul Nurse** | identified **CDKs** as key regulators |\n| **Tim Hunt** | discovered **cyclins** (~10 human cyclins known) |"
        },
        {
          "heading": "Endoplasmic Reticulum & Ca²⁺ Signaling",
          "body": "The **ER** is a network of membranes extending from the **nuclear envelope**; it is **absent in red blood cells and spermatozoa** and is the **major Ca²⁺ store** for cellular signaling.\n\n| | Rough ER (RER) | Smooth ER (SER) |\n|---|---|---|\n| Ribosomes | **yes** (studded) | no |\n| Function | **protein synthesis & folding** | **lipid/FA synthesis** (phospholipids, cholesterol/steroids) |\n\n**Ca²⁺ homeostasis:** cytosolic Ca²⁺ is kept very low (**~100 nM**) vs. high inside ER stores (**~1000 nM**). Hormone → receptor → **Gq** → **PLC** cleaves **PIP₂** → **IP₃ + DAG**. **IP₃** binds the **IP₃R** on the ER → Ca²⁺ release. Different PLC isoforms are activated by different inputs (PLC-β by Gq, PLC-γ by tyrosine kinase, PLC-ε by Ras, PLC-ζ in sperm). Ca²⁺ signals drive proliferation, secretion, metabolism, transcription and contraction."
        },
        {
          "heading": "Golgi Apparatus, Vesicle Transport & Autophagy",
          "body": "**Golgi apparatus** — modification and trafficking hub. Takes up **vesicles from the ER**, then organizes/modifies/packages/tags cargo (**glycosylation**). Has **polarity**: **cis face** (receiving, near ER) → stack of **3–8 cisternae** → **trans face** (shipping). Cargo is sent to other parts of the cell or **exported by exocytosis**; the Golgi also **produces lysosomes** (lytic enzymes for protein clearance).\n\n**Endo- & exocytosis:** constant flow IN (endocytic vesicle → early → late endosome → lysosome) and OUT (ER → ER-Golgi intermediate compartment → Golgi → secretory/exocytic vesicle → plasma membrane).\n\n**Autophagy** — bulk degradation/recycling under stress (\"recycling and clean-up crew\"):\n\n```\n1 Phagophore → 2 Autophagosome → 3 fuse with Lysosome\n → 4 Autolysosome → 5 Degradation & recycling\n```\n\n**Glycosylation defect example:** loss of **SLC35A2** (UDP-galactose transporter) → **abnormal glycosylation** → **MOGHE**, brain malformation, **myelination defect**, and epilepsy."
        },
        {
          "heading": "Mitochondria: Structure & Energy Production",
          "body": "**Functions:** energy production (ATP), Ca²⁺ homeostasis & metabolic regulation, iron metabolism, **mitochondrial apoptosis**, ammonia detox in liver, and **heat production in brown fat**.\n\n**Structure:** outer membrane, **inner membrane folded into cristae**, and the **matrix**.\n\n**Aerobic respiration:** Glucose + O₂ → CO₂ + H₂O + **30 or more ATP**.\n**Anaerobic (fermentation):** Glucose → Lactate + **2 ATP** only.\n\n```\nGlycolysis (cytosol) → Pyruvate → Acetyl-CoA\n   → TCA / Krebs cycle (matrix)\n   → Electron transport chain (inner membrane / cristae)\n```\n\n**TCA cycle products per glucose:** 2 ATP, **8 NADH**, 2 FADH₂, 6 CO₂. The **ETC** (complexes I–IV) pumps **H⁺** into the intermembrane space; **ATP synthase** uses the proton gradient to make ATP; O₂ is the final electron acceptor forming H₂O."
        },
        {
          "heading": "Mitochondrial DNA, Maternal Inheritance & Heteroplasmy",
          "body": "**Endosymbiotic theory:** mitochondria (and chloroplasts) have a **separate evolutionary origin**, derived from the **circular genomes of bacteria**.\n\n**mtDNA facts:**\n- **Circular** molecule, **~16.5 kilobases**.\n- Encodes **13 proteins (oxPhos), 22 tRNAs, and 2 rRNAs**.\n- Operates **independently** of nuclear DNA.\n- **Replication is continuous and uncoupled from the cell cycle** — unlike nuclear DNA (which replicates exactly once before division), mtDNA turns over continuously even in **non-dividing cells**.\n- **Mainly maternally inherited**.\n\n**Heteroplasmy** = presence of **two or more different versions of mtDNA** (normal + mutant) within one cell/tissue/individual. Through clonal replication + random segregation, mutant load can increase, decrease, or stay the same. A disease phenotype appears only once mutant mtDNA passes a **threshold** (homoplasmy = all one type)."
        },
        {
          "heading": "Chloroplast, Photosynthesis & Comparison to Mitochondria",
          "body": "**Chloroplast** (plants/algae) converts **light → chemical energy** via **photosynthesis**; also synthesizes FA, membrane lipids, starch, hormones. Has a **double membrane** (evidence for endosymbiosis) and **contains its own DNA**.\n\n**Structure:** **stroma** (carbon-fixing enzymes, light-independent reaction), **thylakoid** (chlorophyll, light-dependent reactions), **granum** (stack of thylakoids increasing SA:Vol), **lamella** (connects grana).\n\n**Two stages:** **Light reactions** (split H₂O → O₂; make **ATP + NADPH**) → **Calvin cycle** (fix CO₂ via RuBP → 3-PG → G3P → starch/sugars).\n\n| | **Chloroplast** | **Mitochondrion** |\n|---|---|---|\n| Function | Photosynthesis | Cellular respiration |\n| Energy | Light → glucose | Glucose → ATP |\n| Found in | Plants & algae | Almost all eukaryotes |\n| Reactants | CO₂, H₂O, sunlight | Glucose, O₂ |\n| Products | Glucose, O₂ | ATP, CO₂, H₂O |\n| Main process | Light reactions & Calvin cycle | Krebs cycle & ETC |"
        }
      ],
      "questions": [
        {
          "id": "L6Q1",
          "conceptIndex": 0,
          "text": "Which structure carries the bacterial chromosome in a prokaryotic cell?",
          "options": [
            "A membrane-bound nucleus",
            "The nucleoid (DNA free in the cytoplasm)",
            "A plasmid",
            "The nucleolus"
          ],
          "correct": [
            1
          ],
          "explanation": "Prokaryotes lack a true nucleus; their main chromosome sits free in the cytoplasm as the nucleoid. Plasmids are small extra circular DNA molecules, not the main chromosome. A membrane-bound nucleus and nucleolus are eukaryotic features.",
          "type": "single"
        },
        {
          "id": "L6Q2",
          "conceptIndex": 2,
          "text": "What is the primary function of the nucleolus?",
          "options": [
            "DNA replication",
            "rRNA transcription, processing, and ribosome subunit assembly (40S/60S)",
            "Lipid synthesis",
            "ATP production"
          ],
          "correct": [
            1
          ],
          "explanation": "The nucleolus is the ribosome factory: RNA Pol I transcribes rDNA into pre-rRNA, which is processed and assembled with ribosomal proteins into 40S and 60S subunits. DNA replication occurs in the nucleoplasm, lipid synthesis in the smooth ER, and ATP production in mitochondria.",
          "type": "single"
        },
        {
          "id": "L6Q3",
          "conceptIndex": 10,
          "text": "Which statements about mitochondrial DNA (mtDNA) are correct? (Select all that apply.)",
          "options": [
            "It is a circular molecule about 16.5 kilobases long",
            "It encodes 13 proteins, 22 tRNAs, and 2 rRNAs",
            "It replicates exactly once per cell cycle, like nuclear DNA",
            "It is mainly inherited maternally",
            "It supports the endosymbiotic theory"
          ],
          "correct": [
            0,
            1,
            3,
            4
          ],
          "explanation": "mtDNA is circular (~16.5 kb), encodes 13 oxPhos proteins, 22 tRNAs and 2 rRNAs, is maternally inherited, and its bacterial-like circular genome supports endosymbiotic theory. The trap is the third option: unlike nuclear DNA, mtDNA replication is continuous and UNcoupled from the cell cycle, turning over even in non-dividing cells.",
          "type": "multiple"
        },
        {
          "id": "L6Q4",
          "conceptIndex": 7,
          "text": "A student says 'rough ER makes lipids and smooth ER makes proteins.' What is the correct assignment?",
          "options": [
            "Rough ER → protein synthesis/folding; Smooth ER → lipid and FA synthesis",
            "Both make only proteins",
            "Rough ER → lipids; Smooth ER → proteins",
            "Both make only lipids"
          ],
          "correct": [
            0
          ],
          "explanation": "This is the classic reversed-roles trap. Rough ER is studded with ribosomes and handles protein synthesis and folding; smooth ER lacks ribosomes and synthesizes fatty acids and lipids (phospholipids, cholesterol/steroids).",
          "type": "single"
        },
        {
          "id": "L6Q5",
          "conceptIndex": 5,
          "text": "During mitosis, which microtubules attach directly to chromosomes to pull sister chromatids toward the poles?",
          "options": [
            "Astral microtubules",
            "Kinetochore microtubules",
            "Non-kinetochore (interpolar) microtubules",
            "Nuclear lamina filaments"
          ],
          "correct": [
            1
          ],
          "explanation": "Kinetochore microtubules attach to the kinetochore on each chromosome and pull sister chromatids apart. Astral microtubules anchor to the cortex to position the spindle; non-kinetochore (interpolar) microtubules overlap centrally to push poles apart; the nuclear lamina is not a spindle component.",
          "type": "single"
        },
        {
          "id": "L6Q6",
          "conceptIndex": 6,
          "text": "Match the Nobel Prize 2001 laureates to their contributions. Which pairings are correct? (Select all that apply.)",
          "options": [
            "Leland Hartwell — discovered CDC genes and the 'checkpoint' concept",
            "Paul Nurse — identified CDKs as key cell-cycle regulators",
            "Tim Hunt — discovered cyclins",
            "Tim Hunt — discovered the APC/C complex"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Hartwell found CDC genes and coined 'checkpoint'; Nurse identified CDKs; Hunt discovered cyclins. The last option is wrong — Hunt is credited with cyclins, not APC/C.",
          "type": "multiple"
        },
        {
          "id": "L6Q7",
          "conceptIndex": 9,
          "text": "Approximately how much ATP is produced by aerobic respiration of one glucose versus anaerobic fermentation?",
          "options": [
            "Aerobic ~2 ATP; anaerobic ~30+ ATP",
            "Aerobic ~30 or more ATP; anaerobic ~2 ATP",
            "Both produce ~2 ATP",
            "Both produce ~30 ATP"
          ],
          "correct": [
            1
          ],
          "explanation": "Aerobic respiration (glucose + O₂ → CO₂ + H₂O) yields 30 or more ATP, while anaerobic fermentation (glucose → lactate) yields only ~2 ATP. The first option reverses the values.",
          "type": "single"
        },
        {
          "id": "L6Q8",
          "conceptIndex": 7,
          "text": "In ER-mediated calcium signaling, what is the immediate trigger that opens the IP₃ receptor to release Ca²⁺ from the ER store?",
          "options": [
            "DAG binding the IP₃R",
            "IP₃ generated by PLC cleaving PIP₂",
            "Direct ATP hydrolysis at the IP₃R",
            "Glucose entering the cytosol"
          ],
          "correct": [
            1
          ],
          "explanation": "PLC cleaves PIP₂ into IP₃ and DAG; IP₃ binds the IP₃ receptor (IP₃R) on the ER membrane to release stored Ca²⁺. DAG instead activates protein kinase C and stays at the membrane; the IP₃R is ligand-gated, not directly ATP- or glucose-driven.",
          "type": "single"
        },
        {
          "id": "L6Q9",
          "conceptIndex": 10,
          "text": "What does mitochondrial heteroplasmy describe?",
          "options": [
            "The presence of two or more different versions of mtDNA within the same cell/tissue/individual",
            "Mitochondria that lack any DNA",
            "A mitochondrion with two outer membranes",
            "Loss of all mutant mtDNA from a cell"
          ],
          "correct": [
            0
          ],
          "explanation": "Heteroplasmy means a mix of mtDNA variants (e.g. wild-type + mutant) coexisting in one cell, tissue, or individual. A disease phenotype appears only once mutant mtDNA exceeds a threshold. The other options misdescribe mtDNA content or structure.",
          "type": "single"
        },
        {
          "id": "L6Q10",
          "conceptIndex": 1,
          "text": "Which features correctly characterize the nuclear envelope and pores? (Select all that apply.)",
          "options": [
            "It consists of two membrane layers (outer and inner)",
            "The outer membrane is continuous with the ER",
            "Nuclear pores are guarded by the nuclear (pore) core complex",
            "The inner surface is lined by the nuclear lamina",
            "It is a single membrane with no connection to other organelles"
          ],
          "correct": [
            0,
            1,
            2,
            3
          ],
          "explanation": "The nuclear envelope is a double membrane; its outer membrane is continuous with the ER; transport occurs through nuclear pores guarded by the nuclear pore core complex; and the inner surface is lined by the nuclear lamina. The last option is false — it is a double membrane connected to the ER.",
          "type": "multiple"
        }
      ],
      "flashcards": [
        {
          "front": "Nucleoid vs. plasmid in a bacterial cell",
          "back": "Nucleoid = region holding the main bacterial chromosome (DNA free in cytoplasm, no membrane). Plasmid = small separate circular DNA carrying extra genes."
        },
        {
          "front": "What is chromatin?",
          "back": "DNA wrapped around histones, stored in the gel-like nucleoplasm. Organizes hierarchically: nucleosomes → loops → TADs → compartments → chromosome territories."
        },
        {
          "front": "Which RNA polymerases build rRNA in the nucleolus?",
          "back": "RNA Pol I transcribes the 47S pre-rRNA (→ 18S, 5.8S, 28S); RNA Pol III makes the 5S rRNA. Combined with ribosomal proteins → 40S and 60S subunits."
        },
        {
          "front": "Four phases of the eukaryotic cell cycle (and where DNA replicates)",
          "back": "G1, S, G2, M. DNA replicates in S phase. G1+S+G2 = interphase (~23 h); M phase = mitosis + cytokinesis (~1 h)."
        },
        {
          "front": "Cyclins, CDKs and the three cell-cycle checkpoint questions",
          "back": "CDKs (activated by cyclins) drive the cycle. Checkpoints: 'Is the environment favorable?' (START), 'Is all DNA replicated?' (G2/M), 'Are all chromosomes attached to the spindle?' (metaphase→anaphase). APC/C triggers anaphase."
        },
        {
          "front": "Rough ER vs. Smooth ER function",
          "back": "Rough ER (ribosome-studded) → protein synthesis and folding. Smooth ER → fatty acid and lipid synthesis (phospholipids, cholesterol/steroids). ER is also the major Ca²⁺ store."
        },
        {
          "front": "Golgi apparatus: polarity and main job",
          "back": "Modification & trafficking hub. Cis face receives ER vesicles → modifies/glycosylates across 3–8 cisternae → trans face ships cargo (exocytosis). Also produces lysosomes."
        },
        {
          "front": "ATP yield: aerobic respiration vs. anaerobic fermentation",
          "back": "Aerobic (glucose + O₂ → CO₂ + H₂O): 30 or more ATP. Anaerobic fermentation (glucose → lactate): only ~2 ATP."
        },
        {
          "front": "TCA cycle products per glucose",
          "back": "2 ATP, 8 NADH, 2 FADH₂, 6 CO₂. NADH/FADH₂ feed the electron transport chain on the inner membrane for oxidative phosphorylation."
        },
        {
          "front": "Endosymbiotic theory — key evidence",
          "back": "Mitochondria and chloroplasts have a separate bacterial origin: each has a double membrane and its own circular DNA. mtDNA is ~16.5 kb, encodes 13 proteins, 22 tRNAs, 2 rRNAs, and is maternally inherited."
        }
      ]
    },
    {
      "id": 7,
      "title": "Sugars: Monosaccharides, Glycosidic Bonds & Polysaccharides",
      "speaker": "Katja Kobow",
      "concepts": [
        {
          "heading": "What Are Sugars? Mono-, Di- and Polysaccharides",
          "body": "Sugars (carbohydrates) are organic molecules that serve as both **building blocks** and an **energy source** in cells. They are organized by size:\n\n| Class | Definition | Examples |\n|---|---|---|\n| **Monosaccharide** | Single sugar unit (the basic unit) | Glucose, fructose, galactose, ribose |\n| **Disaccharide** | Two monosaccharides linked | Maltose, sucrose, lactose |\n| **Polysaccharide** | Many units linked into chains | Glycogen, starch, cellulose |\n\n**Monosaccharides** are the basic units. They follow the general formula **(CH₂O)ₙ**, where *n* can be 3, 5, 6, 7 or 8. Each unit has several **hydroxyl (–OH) groups**.\n\nKey size names from the slides:\n- **Hexose** = 6 carbons (e.g. glucose, fructose, galactose)\n- **Pentose** = 5 carbons (e.g. ribose, deoxyribose)\n\nDistribution-of-molecules slide: in a cell, sugar is the **subunit** whose **macromolecule** is the polysaccharide — just as amino acids build proteins and nucleotides build nucleic acids. Polysaccharide makes up ~2% of a bacterial cell's dry chemicals."
        },
        {
          "heading": "Monosaccharide Structure: Aldose vs. Ketose, Linear vs. Ring",
          "body": "Monosaccharides are classified two ways at once: by the **position of the carbonyl group** and by the **number of carbons**.\n\n**Aldose vs. Ketose** (carbonyl position — a classic exam trap):\n- **Aldose** = the carbonyl is an **aldehyde** at the END of the chain (C1). Examples: glyceraldehyde (triose), ribose (pentose), **glucose** (hexose).\n- **Ketose** = the carbonyl is a **ketone** in the MIDDLE of the chain (usually C2). Examples: dihydroxyacetone (triose), ribulose (pentose), **fructose** (hexose).\n\n```ascii\nALDOSE (glucose)        KETOSE (fructose)\n   H   O                   CH2OH\n    \\ //                     |\n   1 C       <- aldehyde    C=O   <- ketone at C2\n     |          at C1        |\n   H-C-OH                  HO-C-H\n     ...                     ...\n```\n\n**Carbon count:** Triose (3C), Pentose (5C), Hexose (6C).\n\n**Important:** every carbon atom is **numbered** (C1, C2, C3…). The numbering matters for naming bonds and stereoisomers later."
        },
        {
          "heading": "Ring Formation & Fischer vs. Haworth Projections",
          "body": "In aqueous solution, the **aldehyde or ketone group** of a sugar reacts with a **hydroxyl group of the same molecule**, closing the molecule into a **ring** (an intramolecular reaction forming a hemiacetal/hemiketal).\n\n- **Glucose** (aldose, hexose) → six-membered ring = **pyranose**. The ring product β-D-glucopyranose is the **hemiacetal** of D-glucose.\n- **Fructose** (ketose, hexose) → five-membered ring = **furanose**. The ring product α-D-fructofuranose is the **hemiketal** of D-fructose.\n- **Ribose** (pentose) → five-membered (furanose) ring.\n\n**Two ways to draw a sugar:**\n- **Fischer projection** = the open, vertical-chain drawing. Convention: the **most oxidized carbon (carbonyl) is at the top**, the carbon chain is vertical.\n- **Haworth projection** = the ring drawing. Rule for converting: groups on the **left side** of the Fischer projection face **upwards** on the ring, and groups on the **right side** face **downwards**.\n\nRemember: \"up on the ring / down on the ring\" tracks where each –OH ends up after closure."
        },
        {
          "heading": "Stereoisomerism: Enantiomers, Epimers & Anomers",
          "body": "Many monosaccharides differ only in the **spatial arrangement of atoms** — they are **isomers**. For example, glucose, galactose and mannose all share the formula **C₆H₁₂O₆** but differ in the arrangement of groups around one or two carbon atoms. These small differences cause only minor chemical changes, but are **recognized by enzymes and other proteins**, so they have **major biological effects**.\n\n| Type | Definition | Example |\n|---|---|---|\n| **Enantiomers** | ALL chiral centers inverted (mirror images) | D-glucose vs. L-glucose |\n| **Epimers** | ONE chiral center inverted | D-glucose vs. D-mannose (at C2) |\n| **Anomers** | Differ at the anomeric carbon (C1) | α-D-glucose vs. β-D-glucose |\n\n**Trap:** an epimer differs at **one (non-anomeric) center**; an anomer is the special case differing specifically at the **anomeric carbon (C1)**. Galactose is the **C4 epimer** of glucose; mannose is the **C2 epimer**.\n\n**D vs. L** configuration is determined by the position of the –OH on the highest-numbered chiral carbon; the two are non-superimposable mirror images (illustrated as left/right hands)."
        },
        {
          "heading": "Anomers: α vs. β (the Anomeric Carbon)",
          "body": "When a sugar cyclizes, a **new chiral center is created at C1** (the former carbonyl carbon) — the **anomeric carbon**. The –OH on this carbon can point two ways, giving two **anomers**:\n\n- **β-anomer**: the anomeric –OH and the CH₂OH (reference) group are on the **SAME side** (–OH points up in Haworth).\n- **α-anomer**: the anomeric –OH is on the **OPPOSITE side** (points down in Haworth).\n\nFrom the slide: \"It's the **beta-anomer** when CH₂OH and OH are on the same side.\"\n\n```ascii\nβ-D-glucopyranose: OH (C1) points UP  (same side as CH2OH)\nα-D-glucopyranose: OH (C1) points DOWN (opposite side)\n```\n\n**Crucial point:** the two anomers interconvert (mutarotation) **only while the sugar is free**. \"As soon as one sugar is linked to another, the α or β form is **frozen**\" — the glycosidic bond locks in the anomeric configuration. This is why polysaccharide linkages are specifically α-1,4, β-1,4, etc."
        },
        {
          "heading": "Glycosidic Bonds & Disaccharides",
          "body": "Two monosaccharides join by a **glycosidic bond**, formed in a **condensation (dehydration) reaction** that releases **one molecule of water (H₂O)**. The bond forms between the anomeric carbon of one sugar and a hydroxyl of the next.\n\n**Three common disaccharides (must memorize the building blocks):**\n\n| Disaccharide | Made from |\n|---|---|\n| **Maltose** | glucose + glucose |\n| **Lactose** | galactose + glucose |\n| **Sucrose** | glucose + fructose |\n\nThe slide's example builds **sucrose** from **α-glucose + β-fructose**, releasing H₂O.\n\n```ascii\nglucose  +  fructose  --(condensation)-->  sucrose  +  H2O\n```\n\n**Exam trap:** don't confuse the building blocks — lactose (milk sugar) contains **galactose**, not two glucoses; sucrose (table sugar) contains **fructose**."
        },
        {
          "heading": "Polysaccharides: Storage vs. Structural",
          "body": "Polysaccharides are long chains of monosaccharides joined by glycosidic bonds. Two functional categories:\n\n| Function | Polysaccharides |\n|---|---|\n| **Storage** | starch, glycogen |\n| **Structural** | cellulose, chitin |\n\nProperties from the slide:\n- Can be **branched or linear**.\n- Can be **complex (non-repetitive)**.\n- Glycosidic bond formation costs **energy** (energy from a nucleoside triphosphate drives synthesis); hydrolysis breaks them back down.\n\n**Glycogen** (animal storage) is highly **branched**:\n- **α-1,4-glycosidic bonds** form the linear backbone (chains of glucose).\n- **α-1,6-glycosidic bonds** create the **branch points** — branching results from these different α-1,6 bonds.\n\n```ascii\n...glc-α1,4-glc-α1,4-glc-α1,4-glc...   <- linear chain\n              |α1,6                     <- branch point\n            glc-α1,4-glc...\n```\n\n**Cellulose** (plant structural) is built from a **chain of glucose molecules** that pack into **cellulose microfibrils** in the plant **cell wall**; formula **(C₆H₁₀O₅)ₙ**. (Note: the same glucose monomer, but the linkage geometry differs from storage polysaccharides, which is why cellulose is rigid and indigestible to us.)"
        },
        {
          "heading": "Sugars on Cell Surfaces & in Communication (Glycosylation)",
          "body": "Sugars are not only fuel and structure — surface sugars (glycans on glycoproteins/glycolipids) mediate **cell communication and recognition**:\n\n- **Pathogen recognition:** surface sugar chains are docking sites recognized by **viruses** and **bacteria**.\n- **Modulation of immune response:** **immune cells** read surface glycans to distinguish self from non-self.\n\n**Blood groups (ABO)** are a concrete example of sugar-determined identity. Each erythrocyte surface carries a glycan whose **terminal sugar** defines the blood type:\n\n| Group | Terminal sugar added |\n|---|---|\n| **O** | base chain only (fucose + galactose + GlcNAc) — no extra terminal sugar |\n| **A** | **N-acetylgalactosamine** added |\n| **B** | **galactose** added |\n| **AB** | both A and B terminal sugars present |\n\nBuilding-block sugars in the legend: **galactose, N-acetylglucosamine (GlcNAc), N-acetylgalactosamine (GalNAc), fucose**. A single different terminal sugar changes immune recognition — illustrating how protein/enzyme recognition of tiny sugar differences has major biological effects."
        },
        {
          "heading": "Sugars in Complex Biomolecules: Ribose vs. Deoxyribose (DNA vs. RNA)",
          "body": "Pentose sugars form the backbone of nucleic acids. Each nucleotide = **sugar + phosphate + nucleobase**.\n\n| | DNA (deoxyribonucleic acid) | RNA (ribonucleic acid) |\n|---|---|---|\n| **Sugar** | **deoxyribose** (no –OH at C2) | **ribose** (–OH at C2) |\n| **Backbone** | sugar + phosphate | sugar + phosphate |\n| **Strands** | double-stranded | single-stranded |\n| **Unique base** | **thymine** | **uracil** |\n| **Shared bases** | adenine, guanine, cytosine | adenine, guanine, cytosine |\n\nThe defining chemical difference is at the **2′ carbon**: ribose has a hydroxyl there, deoxyribose has only hydrogen (\"deoxy\" = one less oxygen). This single missing oxygen makes DNA more chemically stable than RNA.\n\n```ascii\nRibose (RNA):       2'C has -OH\nDeoxyribose (DNA):  2'C has -H   (no oxygen)\n```\n\nThis ties sugars back to the cell's central molecules: the same chemistry of pentose rings underlies the genetic material."
        }
      ],
      "questions": [
        {
          "id": "L7Q1",
          "conceptIndex": 1,
          "text": "Which monosaccharide is a KETOSE rather than an aldose?",
          "options": [
            "Glucose",
            "Galactose",
            "Fructose",
            "Ribose"
          ],
          "correct": [
            2
          ],
          "explanation": "Fructose carries its carbonyl as a ketone at C2, making it a ketose. Glucose, galactose and ribose are aldoses — their carbonyl is an aldehyde at C1 (the end of the chain). This aldose/ketose distinction is a classic trap.",
          "type": "single"
        },
        {
          "id": "L7Q2",
          "conceptIndex": 0,
          "text": "What is the general chemical formula of a monosaccharide, and what does n represent?",
          "options": [
            "(CH₂O)ₙ, where n can be 3, 5, 6, 7 or 8 (number of carbons)",
            "(C₆H₁₂O₆)ₙ, where n is the number of rings",
            "(CHO)ₙ, where n is the number of hydroxyl groups",
            "(C₆H₁₀O₅)ₙ, where n is the number of monomers"
          ],
          "correct": [
            0
          ],
          "explanation": "The slide gives the monosaccharide general formula as (CH₂O)ₙ with n = 3, 5, 6, 7 or 8 carbons. (C₆H₁₀O₅)ₙ is the formula for cellulose (a polysaccharide), and C₆H₁₂O₆ is one specific hexose, not the general form.",
          "type": "single"
        },
        {
          "id": "L7Q3",
          "conceptIndex": 3,
          "text": "Match the stereoisomer relationships correctly. Select ALL true statements.",
          "options": [
            "Enantiomers have ALL chiral centers inverted (e.g. D-glucose vs L-glucose)",
            "Epimers differ at exactly ONE chiral center (e.g. D-glucose vs D-mannose at C2)",
            "Anomers differ at the anomeric carbon C1 (e.g. α-D-glucose vs β-D-glucose)",
            "Epimers and anomers are the same thing"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Enantiomers = all chiral centers inverted (mirror images); epimers = one chiral center inverted; anomers = differ specifically at the anomeric carbon C1. The last option is false: an anomer is a special case differing at C1, whereas a general epimer differs at any single non-anomeric center.",
          "type": "multiple"
        },
        {
          "id": "L7Q4",
          "conceptIndex": 4,
          "text": "In the Haworth ring drawing, a glucose molecule is the β-anomer when…",
          "options": [
            "the C1 –OH and the CH₂OH group are on the SAME side",
            "the C1 –OH and the CH₂OH group are on OPPOSITE sides",
            "the ring is five-membered instead of six-membered",
            "all hydroxyl groups point downward"
          ],
          "correct": [
            0
          ],
          "explanation": "The slide states it is the beta-anomer when CH₂OH and the anomeric OH are on the same side. The α-anomer has them on opposite sides. Ring size (furanose vs pyranose) is a separate property unrelated to α/β.",
          "type": "single"
        },
        {
          "id": "L7Q5",
          "conceptIndex": 5,
          "text": "Which disaccharide is correctly paired with its monosaccharide building blocks?",
          "options": [
            "Maltose = galactose + glucose",
            "Lactose = glucose + fructose",
            "Sucrose = glucose + fructose",
            "Sucrose = glucose + glucose"
          ],
          "correct": [
            2
          ],
          "explanation": "Sucrose = glucose + fructose. Maltose = glucose + glucose; lactose = galactose + glucose. Mixing these up (especially putting galactose in maltose or fructose in lactose) is a common exam error.",
          "type": "single"
        },
        {
          "id": "L7Q6",
          "conceptIndex": 5,
          "text": "How is a glycosidic bond formed between two monosaccharides?",
          "options": [
            "By a condensation (dehydration) reaction that releases one H₂O",
            "By a hydrolysis reaction that consumes one H₂O",
            "By addition of a phosphate group",
            "By oxidation of the anomeric carbon"
          ],
          "correct": [
            0
          ],
          "explanation": "A glycosidic bond forms by condensation/dehydration, releasing one molecule of water (shown as the +H₂O leaving when α-glucose and β-fructose join into sucrose). Hydrolysis is the reverse reaction that breaks the bond.",
          "type": "single"
        },
        {
          "id": "L7Q7",
          "conceptIndex": 6,
          "text": "In glycogen, which glycosidic bonds form the linear backbone versus the branch points?",
          "options": [
            "α-1,4 bonds form the linear chain; α-1,6 bonds form the branch points",
            "α-1,6 bonds form the linear chain; α-1,4 bonds form the branch points",
            "β-1,4 bonds form the linear chain; β-1,6 bonds form the branch points",
            "Both backbone and branches use β-1,4 bonds"
          ],
          "correct": [
            0
          ],
          "explanation": "Per the glycogen slide, α-1,4-glycosidic bonds build the linear glucose chain and α-1,6-glycosidic bonds create the branch points. β-1,4 linkages are associated with cellulose, not glycogen.",
          "type": "single"
        },
        {
          "id": "L7Q8",
          "conceptIndex": 6,
          "text": "Select ALL polysaccharides that the lecture classifies as STRUCTURAL (rather than storage).",
          "options": [
            "Cellulose",
            "Glycogen",
            "Chitin",
            "Starch"
          ],
          "correct": [
            0,
            2
          ],
          "explanation": "The slide groups cellulose and chitin as structural polysaccharides, while starch and glycogen are storage polysaccharides. Cellulose forms plant cell-wall microfibrils; chitin is also structural.",
          "type": "multiple"
        },
        {
          "id": "L7Q9",
          "conceptIndex": 8,
          "text": "What is the key chemical difference between the sugar in DNA and the sugar in RNA?",
          "options": [
            "DNA uses deoxyribose (no –OH at the 2′ carbon); RNA uses ribose (–OH at 2′)",
            "DNA uses ribose; RNA uses deoxyribose",
            "DNA uses a hexose; RNA uses a pentose",
            "DNA uses galactose; RNA uses glucose"
          ],
          "correct": [
            0
          ],
          "explanation": "DNA's sugar is deoxyribose, which lacks the hydroxyl at the 2′ carbon (one less oxygen), while RNA's sugar is ribose with a 2′ –OH. Both are pentoses. The thymine/uracil base difference is separate from the sugar difference.",
          "type": "single"
        },
        {
          "id": "L7Q10",
          "conceptIndex": 3,
          "text": "Glucose, galactose and mannose all share the formula C₆H₁₂O₆ yet behave differently in the body. Why do these small structural differences matter biologically?",
          "options": [
            "They are recognized by enzymes and other proteins, producing major biological effects",
            "They give the sugars completely different chemical formulas",
            "They change whether the sugar is an aldose or a ketose",
            "They prevent the sugars from forming rings"
          ],
          "correct": [
            0
          ],
          "explanation": "The slide states these isomers cause only minor chemical changes but are recognized by enzymes and proteins, so they have major biological effects (e.g. determining blood type via a single terminal sugar). They keep the same formula and the same aldose nature, and all still cyclize.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Aldose vs. ketose — what distinguishes them, and give a hexose example of each.",
          "back": "Aldose = carbonyl is an aldehyde at C1 (end of chain), e.g. glucose. Ketose = carbonyl is a ketone, usually at C2 (middle), e.g. fructose."
        },
        {
          "front": "General formula of a monosaccharide and what 'hexose' and 'pentose' mean.",
          "back": "(CH₂O)ₙ with n = 3, 5, 6, 7 or 8. Hexose = 6 carbons (glucose, fructose, galactose); pentose = 5 carbons (ribose, deoxyribose)."
        },
        {
          "front": "Enantiomer vs. epimer vs. anomer.",
          "back": "Enantiomer = ALL chiral centers inverted, mirror images (D- vs L-glucose). Epimer = ONE chiral center inverted (glucose vs mannose at C2). Anomer = differs at the anomeric carbon C1 (α- vs β-D-glucose)."
        },
        {
          "front": "When is a cyclic glucose the β-anomer vs the α-anomer?",
          "back": "β-anomer: the C1 –OH and CH₂OH are on the SAME side (OH points up in Haworth). α-anomer: they are on OPPOSITE sides (OH points down)."
        },
        {
          "front": "How does ring formation happen, and what ring sizes do glucose vs fructose form?",
          "back": "In water the aldehyde/ketone reacts with an –OH of the same molecule, closing a ring (hemiacetal/hemiketal). Glucose → 6-membered pyranose; fructose and ribose → 5-membered furanose."
        },
        {
          "front": "Fischer-to-Haworth conversion rule.",
          "back": "Groups on the LEFT side of the Fischer projection face UPWARD on the Haworth ring; groups on the RIGHT side face DOWNWARD. (Fischer: carbonyl at top, chain vertical.)"
        },
        {
          "front": "Building blocks of maltose, lactose, and sucrose. How is the bond formed?",
          "back": "Maltose = glucose + glucose; lactose = galactose + glucose; sucrose = glucose + fructose. All joined by a glycosidic bond via condensation, releasing one H₂O."
        },
        {
          "front": "Glycogen linkages: backbone vs. branch points.",
          "back": "α-1,4-glycosidic bonds form the linear glucose chain; α-1,6-glycosidic bonds create the branch points."
        },
        {
          "front": "Storage vs. structural polysaccharides.",
          "back": "Storage: starch, glycogen. Structural: cellulose, chitin. Cellulose [(C₆H₁₀O₅)ₙ] forms plant cell-wall microfibrils from chains of glucose."
        },
        {
          "front": "Sugar difference between DNA and RNA, and how blood groups use sugars.",
          "back": "DNA = deoxyribose (no 2′ –OH); RNA = ribose (2′ –OH). Blood groups: terminal surface sugar defines type — A adds N-acetylgalactosamine, B adds galactose, AB has both, O has neither."
        }
      ]
    },
    {
      "id": 8,
      "title": "Genomics: Genome Sequencing, Genetic Variation & AI Interpretation",
      "speaker": "Katja Kobow",
      "concepts": [
        {
          "heading": "Genomics vs. Genetics & a Short History of Sequencing",
          "body": "**Genomics** and **genetics** are related but distinct fields:\n\n| Field | Studies | Focus |\n|---|---|---|\n| **Genomics** | The **entire genome** — the full set of DNA, including all genes *and* noncoding sequences | How this information influences **biology, health, and disease** |\n| **Genetics** | **Individual genes** and how **hereditary traits** pass from one generation to the next | The **function, variation, and inheritance** of *specific* genes |\n\n**From micro to macro:** the body is organized across scales. The *visible* levels run brain → grey/white matter → cells → nucleus with chromatin. These are produced from *invisible* molecular **building blocks** following the central dogma: **DNA → RNA (transcription) → Protein (translation)**.\n\n**Short history of sequencing (key milestones):**\n- **1980** — Nobel Prize for DNA sequencing (Berg, Gilbert, Sanger)\n- **2001** — **Human Genome Project completed** (Sanger sequencing)\n- **2005** — **NGS** (next-generation / massively parallel sequencing); cost dropped from the ~**2.7 billion USD** Human Genome Project toward **under 1,000 USD per genome**\n- **2014** — 3rd-generation **long-read sequencing** (Nanopore)\n- **2021** — Nobel Prize for **CRISPR/Cas** (Charpentier, Doudna)"
        },
        {
          "heading": "From Reads to Reference: Genome Assembly & Reference Genomes",
          "body": "**Genome assembly** reconstructs a genome from sequencing reads:\n- Reads are resolved into **nucleotide bases** (A, T, G, C — plus *ambiguous* base calls).\n- Reads are **randomly distributed** across the target DNA.\n- Reads represent an **oversampling** of the target, so individual reads **repeatedly overlap** (higher *coverage* = better quality).\n- Genome **assemblers calculate overlaps** between reads and (usually) represent them as a **graph/network**, then **\"walk\" the graph** to determine the original sequence.\n\nA **reference genome** is a *digital, annotated representation* of the complete set of DNA sequences of a species — a **standard template** for comparing and interpreting individual genomes.\n- It is **NOT** the genome of a single individual; it is a **composite**.\n- It acts as a **scaffold** for aligning reads, identifying genetic variants, and annotating genes.\n\n| Reference | Year | Note |\n|---|---|---|\n| **GRCh38** | 2013 | Most widely used human reference; assembled by the **Genome Reference Consortium** |\n| **T2T** | 2022 | First **telomere-to-telomere** complete human genome; fills gaps in GRCh38 |\n\n**Limitations of (linear) reference genomes:**\n\n| Limitation | Impact |\n|---|---|\n| **Lack of diversity** | GRCh38 is based mostly on individuals of **European ancestry** → may bias variant detection/interpretation |\n| **Structural gaps** | Centromeres, telomeres, segmental duplications were incomplete/missing until T2T |\n| **Non-representativeness** | A single linear reference cannot reflect population-wide variation or structural diversity |\n| **Annotation lag** | Gene models and regulatory-element annotations can be incomplete or inaccurate |\n| **Somatic/mosaic variation ignored** | References represent **germline** DNA and miss context-specific variation (e.g. cancer genomes, brain mosaicism) |"
        },
        {
          "heading": "Genetic Variation: HGVS Nomenclature, SNP Consequences & Splice Variants",
          "body": "Variants are described with **HGVS nomenclature** using three coordinate systems:\n\n| Code | Refers to | Example |\n|---|---|---|\n| **g.** | **Genomic** DNA coordinate | g. chr13:32340128G>A (GRCh38/hg38) |\n| **c.** | **Coding / complementary DNA** | c.5353C>T |\n| **p.** | **Protein** | p.Ser1785Leu |\n\nThe example above is a **missense** change: a wild-type **Ser** becomes **Leu**.\n\n**Consequences of single-nucleotide variants (SNPs):**\n\n| Type | Example | Consequence |\n|---|---|---|\n| **Missense** | G→A | Single amino-acid change |\n| **Nonsense** | CAA→TAA | **Premature stop** codon |\n| **Frameshift** | insertion (+A) | Wrong sequence, with or without a premature stop |\n| **Regulatory-region** | promoter hit | **No mRNA → no protein** |\n\n**Splice variants (interpreted with SpliceAI):** e.g. **c.275-1G>T** affects the **last base of intron 2**, immediately upstream of *SLC35A2* exon 3. It alters the **canonical acceptor splice site (invariant AG)** → likely **exon skipping or aberrant splicing**. The protein effect **cannot be precisely predicted** without transcript-level splicing analysis (likely a frameshift or exon skipping). SpliceAI is an **AI application** for splice-variant interpretation."
        },
        {
          "heading": "Common vs. Rare Variants: GWAS, Penetrance & Detection Methods",
          "body": "**Common variants — GWAS (Genome-Wide Association Study):**\n- Collect a trait (e.g. height) plus genetic data across many individuals.\n- Run **single-variant association tests** for candidate variants (e.g. rs123) — here *A* alleles increase height on average, $P = 5 \\times 10^{-10}$.\n- A significant variant **may not be causal** — it can be a measured **proxy** in linkage with the true causal variant (e.g. rs123 tags rs456).\n- GWAS use **evenly spaced proxies** across the genome; a **Manhattan plot** shows whether $-\\log_{10}(P)$ passes the **genome-wide significance threshold**.\n- Follow-up: **fine-mapping, functional work, meta-analysis** to identify causal variants and their function.\n\n**Penetrance vs. allele frequency** (how variants relate to disease):\n\n| Category | Penetrance | Allele frequency |\n|---|---|---|\n| **Mendelian disease** | High | Rare |\n| Highly unusual for common disease | High | Common |\n| Hard to identify genetically | Low / modest | Rare |\n| **Most variants found by GWA studies** | Low / modest | Common |\n\nLow-frequency variants with **intermediate penetrance** sit between these corners.\n\n**Detection methods scale with how much of the genome is read:**\n\n| Method | Bases covered |\n|---|---|\n| **Targeted sequencing** | ~1 to hundreds of genes |\n| **GWAS SNP arrays** | ~1 million bases detected (~10–60 million imputed from haplotypes) |\n| **Exome sequencing** | ~30 million bases (coding exons) |\n| **Genome sequencing** | ~3 billion bases (whole genome) |"
        },
        {
          "heading": "Structural Variants, Chromosomal Instability, Mosaicism & Inheritance",
          "body": "**Structural variants & copy-number variants (CNVs)** are larger than SNPs. Six types from the slide:\n**deletion, tandem duplication, interspersed duplication, insertion, translocation, inversion.**\n\n**Numerical vs. structural chromosomal instability:**\n\n| Numerical (whole-chromosome) | Structural (within/between chromosomes) |\n|---|---|\n| Small-scale **gains** → **trisomy** | **Deletions** |\n| Small-scale **losses** → **monosomy** | **Amplifications** |\n| Large-scale gains → extra set (**polyploidy**) | **Inversions** and **translocations** |\n\n**Mosaicism — germline vs. somatic origin:**\n- **Germline** mutations are **inherited** and present in **all cells**.\n- **Somatic** mutations are **acquired** and present in **only some cells** → **mosaicism**.\n- Timing during development matters: from the zygote, ~**50–100 founder progenitors** seed the brain. An **early** mTOR mutation gives a **high mosaic fraction (~50%) → hemimegalencephaly**; a **late** mutation gives a **low fraction (~10%) → focal cortical dysplasia (FCD)**. CNVs (e.g. a chr1 gain) can drive epilepsy-associated brain lesions.\n\n**Inheritance terminology & patterns:**\n\n| Axis | Options |\n|---|---|\n| **Chromosomal location** | **Autosomal** (chr 1–22) vs **gonosomal** (X or Y) |\n| **Expression pattern** | **Dominant** (one copy is enough) vs **recessive** (two copies needed) |\n| **Origin of mutation** | **Germline** (inherited, all cells) vs **somatic** (acquired, some cells) |\n\nClassic Mendelian patterns: **autosomal dominant, autosomal recessive, X-linked dominant, X-linked recessive**."
        },
        {
          "heading": "AI in Genomics & the Non-Coding Genome",
          "body": "**Interpreting the other ~99% of the genome (the non-coding part):** beyond coding exons lies **non-coding regulatory sequence** — **chromatin state, histone marks, and transcription-factor binding** that control target genes. AI learns this **regulatory code** with **deep-learning sequence models**.\n\n**AI to predict variant effects:** deep-learning models trained on genome-wide chromatin profiles (**ENCODE, Roadmap Epigenomics, CLIP**) output **allele-specific regulatory predictions** (RBP binding, histone modification, TF binding). A second **pathogenicity model**, trained on curated disease regulatory mutations, then predicts **variant pathogenicity** (e.g. higher disease-impact scores in autism probands vs. siblings).\n\n**Systems-level interpretation — functional module discovery** identifies groups of genes **tightly connected in a molecular network** likely to share biological processes (co-expressed, co-regulated, converging on similar functions). It can implicate a **gene of unknown function** by its module membership.\n\n**Selected AI applications in genomics:**\n\n| Task | Example |\n|---|---|\n| **Variant calling** | **DeepVariant** (Google) |\n| **Genome annotation** | **Evo2** (promoters, enhancers, splice sites) |\n| **Pathogenicity prediction** | **SpliceAI, AlphaFold** |\n| **Phenotype matching** | **Face2Gene** (matches facial gestalt to genetic disorders) |\n| **Multi-omics integration** | combining genomics, transcriptomics, epigenomics |\n\n**Multi-omics cascade:** **genomics (DNA) → transcriptomics (mRNA) → proteomics (protein) → metabolomics (metabolites) → phenotypic change.**\n\n**Summary:** genomics is a **data-rich, AI-relevant** field; sequencing is now **fast and cheap**, so **AI is essential for extracting meaning** — which also raises **ethical and societal questions** (e.g. *\"Would you sequence your own genome?\"*)."
        }
      ],
      "questions": [
        {
          "id": "L8Q1",
          "conceptIndex": 0,
          "text": "How does genomics differ from genetics?",
          "options": [
            "Genomics studies the entire genome (all genes and noncoding DNA); genetics studies individual genes and how hereditary traits are inherited",
            "Genomics studies only single genes; genetics studies the whole genome",
            "Genomics studies proteins, while genetics studies RNA",
            "They are two different names for exactly the same field"
          ],
          "correct": [
            0
          ],
          "explanation": "Genomics is the study of the entire genome — the full set of DNA including all genes and noncoding sequences — and how it influences biology, health, and disease. Genetics focuses on individual genes and the function, variation, and inheritance of specific genes. Option 1 reverses the two; the others are simply wrong.",
          "type": "single"
        },
        {
          "id": "L8Q2",
          "conceptIndex": 0,
          "text": "Select ALL correct statements about the history of DNA sequencing.",
          "options": [
            "The Human Genome Project was completed in 2001 using Sanger sequencing",
            "NGS (massively parallel sequencing, ~2005) dropped the cost from the ~2.7 billion USD Human Genome Project toward under 1,000 USD per genome",
            "Nanopore long-read sequencing is the 3rd-generation technology (2014)",
            "The 2021 Nobel Prize for CRISPR/Cas was awarded to Berg, Gilbert, and Sanger"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "The HGP finished in 2001 with Sanger sequencing; NGS (~2005) collapsed cost from ~2.7 billion USD toward under 1,000 USD per genome; Nanopore is the 3rd-generation long-read method (2014). Option 3 is false: the 2021 CRISPR/Cas Nobel went to Charpentier and Doudna — Berg, Gilbert, and Sanger won the 1980 DNA-sequencing Nobel.",
          "type": "multiple"
        },
        {
          "id": "L8Q3",
          "conceptIndex": 1,
          "text": "Which statement best describes a reference genome?",
          "options": [
            "A digital, annotated composite of a species' DNA that serves as a standard template and scaffold — not the genome of one single individual",
            "The complete genome of one specific named individual",
            "A list of only the disease-causing variants found in a population",
            "The RNA sequence of all expressed genes in a cell"
          ],
          "correct": [
            0
          ],
          "explanation": "A reference genome is a digital, annotated representation of a species' complete DNA, used as a standard template and scaffold for aligning reads, calling variants, and annotating genes. It is explicitly a composite, not a single individual's genome (option 1), and it is neither a variant list nor an RNA catalogue.",
          "type": "single"
        },
        {
          "id": "L8Q4",
          "conceptIndex": 1,
          "text": "Select ALL true limitations of standard (linear) reference genomes such as GRCh38.",
          "options": [
            "Lack of diversity — GRCh38 is based mostly on individuals of European ancestry, which can bias variant interpretation",
            "Structural gaps (centromeres, telomeres, segmental duplications) were incomplete until the T2T assembly",
            "They represent germline DNA and miss somatic/mosaic variation (e.g. cancer, brain mosaicism)",
            "GRCh38 is the fully complete, gap-free genome of a single individual"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Listed limitations include ancestry bias (lack of diversity), structural gaps filled only by T2T in 2022, and the fact that references capture germline DNA and miss somatic/mosaic variation. Option 3 is false: GRCh38 is a composite (not one individual) and contained gaps until T2T.",
          "type": "multiple"
        },
        {
          "id": "L8Q5",
          "conceptIndex": 2,
          "text": "In HGVS nomenclature, what do the g-, c-, and p- prefixes denote?",
          "options": [
            "g- = genomic DNA coordinate, c- = coding/complementary DNA, p- = protein",
            "g- = gene, c- = chromosome, p- = phenotype",
            "g- = germline, c- = clonal, p- = polymorphism",
            "g- = guanine, c- = cytosine, p- = purine"
          ],
          "correct": [
            0
          ],
          "explanation": "HGVS uses g. for the genomic coordinate (e.g. chr13:32340128G>A), c. for the coding/complementary-DNA position (e.g. c.5353C>T), and p. for the protein change (e.g. p.Ser1785Leu). The other options are invented expansions.",
          "type": "single"
        },
        {
          "id": "L8Q6",
          "conceptIndex": 2,
          "text": "A single-base change turns the codon CAA into the stop codon TAA. What is this mutation and its consequence?",
          "options": [
            "Nonsense mutation → introduces a premature stop codon",
            "Missense mutation → a single amino-acid substitution",
            "Frameshift mutation → shifts the reading frame",
            "Regulatory mutation → prevents mRNA production"
          ],
          "correct": [
            0
          ],
          "explanation": "Converting an amino-acid codon into a stop codon (CAA→TAA) is a nonsense mutation, which truncates the protein with a premature stop. A missense change swaps one amino acid (e.g. G→A), a frameshift arises from insertions/deletions such as +A, and a regulatory-region mutation can abolish mRNA (no mRNA → no protein).",
          "type": "single"
        },
        {
          "id": "L8Q7",
          "conceptIndex": 3,
          "text": "In a GWAS, a variant (rs123) passes genome-wide significance for height. Why might it still not be the causal variant?",
          "options": [
            "It may be a measured proxy in linkage with the true causal variant (e.g. rs456), so fine-mapping and functional work are needed",
            "GWAS can never detect any real associations",
            "A significant variant is always guaranteed to be the direct cause",
            "Height is not a heritable trait"
          ],
          "correct": [
            0
          ],
          "explanation": "GWAS test evenly spaced markers, so a significant SNP (rs123) is often just a proxy tagging the real causal variant (rs456) through linkage. Follow-up fine-mapping, functional work, and meta-analysis are needed to pinpoint causality. The other options contradict how GWAS works.",
          "type": "single"
        },
        {
          "id": "L8Q8",
          "conceptIndex": 3,
          "text": "On the penetrance vs. allele-frequency map, where do classic Mendelian diseases fall?",
          "options": [
            "High penetrance and rare allele frequency",
            "Low penetrance and common allele frequency",
            "Low penetrance and rare allele frequency",
            "High penetrance and common allele frequency"
          ],
          "correct": [
            0
          ],
          "explanation": "Mendelian diseases sit in the high-penetrance, rare-frequency corner. Low-penetrance/common variants are 'most variants identified by GWA studies'; low-penetrance/rare variants are 'hard to identify genetically'; high-penetrance/common is 'highly unusual for common diseases'.",
          "type": "single"
        },
        {
          "id": "L8Q9",
          "conceptIndex": 4,
          "text": "Select ALL aberrations classified as NUMERICAL chromosomal changes (rather than structural).",
          "options": [
            "Trisomy (small-scale gain)",
            "Monosomy (small-scale loss)",
            "Polyploidy (an extra whole chromosome set)",
            "Translocation"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "Numerical instability changes chromosome counts: trisomy (gain), monosomy (loss), and polyploidy (extra set). Translocation is a structural change (rearrangement between chromosomes), alongside deletions, amplifications, and inversions.",
          "type": "multiple"
        },
        {
          "id": "L8Q10",
          "conceptIndex": 5,
          "text": "Which AI tool is correctly matched to its genomics task?",
          "options": [
            "DeepVariant → variant calling",
            "SpliceAI → multi-omics integration",
            "Evo2 → variant calling",
            "AlphaFold → genome assembly"
          ],
          "correct": [
            0
          ],
          "explanation": "DeepVariant (Google) is used for variant calling. SpliceAI is for pathogenicity/splice prediction (not multi-omics), Evo2 is for genome annotation (promoters, enhancers, splice sites), and AlphaFold is a pathogenicity/protein-structure tool, not a genome assembler.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "Genomics vs. genetics — define each.",
          "back": "Genomics = study of the entire genome (all genes + noncoding DNA) and how it shapes biology, health, and disease. Genetics = study of individual genes and the function, variation, and inheritance of specific genes."
        },
        {
          "front": "Key milestones in sequencing history (1980 → 2021).",
          "back": "1980 Nobel for DNA sequencing (Berg, Gilbert, Sanger); 2001 Human Genome Project completed (Sanger); 2005 NGS / massively parallel sequencing; 2014 3rd-generation long-read (Nanopore); 2021 Nobel for CRISPR/Cas (Charpentier, Doudna)."
        },
        {
          "front": "How much did NGS cut sequencing cost?",
          "back": "From the ~2.7 billion USD Human Genome Project toward under 1,000 USD per genome (massively parallel / next-generation sequencing, ~2005)."
        },
        {
          "front": "Core principles of genome assembly.",
          "back": "Reads are resolved into bases (ATGC + ambiguous calls), randomly distributed, and oversample the target so they repeatedly overlap (higher coverage = better quality). Assemblers compute overlaps, build a graph/network, then 'walk' it to recover the original sequence."
        },
        {
          "front": "What is a reference genome — and what is it NOT?",
          "back": "A digital, annotated representation of a species' complete DNA — a standard template and scaffold for aligning reads, calling variants, and annotating genes. It is a composite, NOT the genome of a single individual."
        },
        {
          "front": "GRCh38 vs. T2T.",
          "back": "GRCh38 (2013): most widely used human reference, assembled by the Genome Reference Consortium. T2T (2022): first telomere-to-telomere complete human genome; fills gaps in GRCh38."
        },
        {
          "front": "Limitations of linear reference genomes.",
          "back": "Lack of diversity (European-ancestry bias); structural gaps (centromeres/telomeres/segmental duplications) until T2T; non-representativeness of a single linear sequence; annotation lag; and ignoring somatic/mosaic variation (germline-only)."
        },
        {
          "front": "HGVS codes: g., c., p.",
          "back": "g. = genomic DNA coordinate (e.g. chr13:32340128G>A); c. = coding/complementary DNA (e.g. c.5353C>T); p. = protein change (e.g. p.Ser1785Leu = Ser→Leu missense)."
        },
        {
          "front": "Consequences of single-nucleotide variants (SNPs).",
          "back": "Missense = one amino-acid change (G→A); nonsense = premature stop (CAA→TAA); frameshift = wrong sequence with/without premature stop (+A); regulatory-region mutation = no mRNA → no protein."
        },
        {
          "front": "Splice variants and SpliceAI.",
          "back": "Example c.275-1G>T hits the last base of intron 2 (upstream of SLC35A2 exon 3), disrupting the canonical acceptor splice site (invariant AG) → exon skipping / aberrant splicing. SpliceAI is an AI tool that predicts such splice effects."
        },
        {
          "front": "What is a GWAS and how is significance shown?",
          "back": "Genome-Wide Association Study: tests evenly spaced variants for association with a trait. A Manhattan plot shows whether -log10(P) passes the genome-wide significance threshold. A hit may be a proxy in linkage with the true causal variant — needs fine-mapping / functional work / meta-analysis."
        },
        {
          "front": "Penetrance vs. allele-frequency framework.",
          "back": "High penetrance + rare = Mendelian disease; high penetrance + common = highly unusual for common disease; low penetrance + rare = hard to identify genetically; low penetrance + common = most variants found by GWAS; intermediate penetrance + low frequency sits between."
        },
        {
          "front": "Detection methods by genome coverage.",
          "back": "Targeted sequencing: ~1 to hundreds of genes; GWAS SNP arrays: ~1 million bases (10–60 million imputed from haplotypes); exome sequencing: ~30 million bases (coding); genome sequencing: ~3 billion bases (whole genome)."
        },
        {
          "front": "Structural variants/CNVs and numerical vs. structural instability.",
          "back": "SV/CNV types: deletion, tandem duplication, interspersed duplication, insertion, translocation, inversion. Numerical instability = trisomy/monosomy/polyploidy (whole-chromosome counts); structural = deletions, amplifications, inversions, translocations (rearrangements)."
        },
        {
          "front": "Mosaicism: germline vs. somatic (and brain example).",
          "back": "Germline = inherited, present in all cells; somatic = acquired, present in only some cells (mosaicism). From the zygote, ~50–100 founder progenitors seed the brain. Early mTOR mutation → high mosaic fraction (~50%) → hemimegalencephaly; late mutation → low fraction (~10%) → focal cortical dysplasia (FCD)."
        },
        {
          "front": "Inheritance terminology + AI applications in genomics.",
          "back": "Inheritance axes: autosomal (chr 1-22) vs gonosomal (X/Y); dominant (one copy) vs recessive (two copies); germline vs somatic. AI in genomics: DeepVariant (variant calling), Evo2 (annotation), SpliceAI/AlphaFold (pathogenicity), Face2Gene (phenotype gestalt matching), multi-omics integration (genomics→transcriptomics→proteomics→metabolomics→phenotype)."
        }
      ]
    },
    {
      "id": 9,
      "title": "Transcriptomics: From Gene Expression to Single-Cell & Spatial RNA-Seq",
      "speaker": "Katja Kobow",
      "concepts": [
        {
          "heading": "The Transcriptome & Gene Expression",
          "body": "**Transcriptomics** = the study of the **complete collection of all RNA transcripts in an organism** (the *transcriptome*). The central goal is to **quantify gene expression levels**.\n\n**The central dogma & RNA's fates:** information flows **DNA → (transcription) → RNA → (translation) → Protein**. DNA can also self-replicate, and **reverse transcription** runs the arrow backward (RNA → DNA). Crucially, **not all RNA is translated** — RNA can instead act as a **scaffold**, a **ribozyme**, or **regulatory non-coding RNA (ncRNA)**.\n\n**Gene content of the human genome:**\n- **~20,000 protein-coding genes**\n- **~25,000 pure RNA-coding (non-coding) genes**\n\nSo thousands of human genes produce **ncRNA as their ultimate product** (gene → RNA, with no protein).\n\n**Genes are expressed with different efficiencies.** How much product a gene yields depends on three things:\n- **Efficiency of transcription**\n- **Stability of the mRNA**\n- **Efficiency of translation**\n\nA highly expressed gene produces many RNA copies (and much protein); a weakly expressed gene produces few. Transcriptomics measures these differences across genes, tissues, and conditions."
        },
        {
          "heading": "Alternative Splicing, Poison Exons & Nonsense-Mediated Decay",
          "body": "**Alternative splicing** lets one gene produce multiple mRNA **isoforms** by joining different combinations of exons, combined with alternative **3′ cleavage/polyadenylation**. This generates **tissue-specific transcripts** — e.g., the **α-tropomyosin** gene yields distinct striated-muscle, smooth-muscle, fibroblast, and brain mRNAs.\n\n**Dravet syndrome & the 'poison' exon (SCN1A):**\n- **Exon 20N** is a cryptic, **evolutionarily conserved 'poison' exon** lying inside **intron 20**; normally it **should be excised**.\n- The Dravet-patient pathogenic variant **SCN1A:c.3969+2451G>C** causes **aberrant inclusion of exon 20N**.\n- Inclusion creates a **frame shift + premature stop codon in exon 21**.\n- That premature stop triggers **nonsense-mediated mRNA decay (NMD)**.\n\n**Nonsense-mediated mRNA decay (NMD):**\n- A **quality-control mechanism** found in **all eukaryotes** (evolutionarily conserved).\n- **Degrades mRNAs containing premature termination codons (PTCs)**, preventing production of truncated, potentially harmful proteins before they can be translated.\n- Mechanism involves **removal of the 5′ cap**, the **exon junction complex (EJC)**, and the **Up-frameshift proteins UPF1, UPF2, UPF3**. If the EJC is **displaced by the ribosome → no NMD**; if an EJC is **retained downstream of a stop → NMD induced** (with UPF1 phosphorylation).\n- **NMD escape** occurs if: the **PTC is in the last exon**, or the **PTC is <50 bp from an exon boundary**."
        },
        {
          "heading": "Measuring the Transcriptome: Reverse Transcription, Microarrays & RNA-Seq",
          "body": "To read RNA, it is usually first converted to **cDNA** by **reverse transcription**.\n\n**Recipe for reverse transcription (RT):**\n| Ingredient | Role |\n|---|---|\n| **Reverse transcriptase** | An **RNA-dependent DNA polymerase** |\n| **dNTPs** | Building blocks |\n| **Primers** | **sequence-specific**, **oligo-dT** (anneals to the poly-A tail), OR **random hexamer** |\n| **RNase H** | Degrades the RNA strand of the RNA–DNA hybrid |\n| **DNA polymerase** | DNA-dependent; synthesizes the complementary 2nd strand → **double-stranded cDNA** |\n\n**Two technologies to study the transcriptome:**\n| | Microarray | RNA-Sequencing |\n|---|---|---|\n| Principle | Nucleic-acid **probes affixed to a surface** | **NGS-based**, high-throughput |\n| Coverage | Quantifies a set of **predetermined sequences** — captures **only what we already know** | In theory, **unbiased** |\n\n**Bulk tissue analysis** workflow: **Sample → RNA extraction → library prep → sequencing → alignment → quantification**. Data types: **raw reads, TPM/FPKM, DEG**.\n- **Strengths:** cost-effective; robust for **homogeneous tissues / cell lines**.\n- **Limitation:** it **averages across all cell populations** (e.g., transcriptome profiling of liver vs. brain tissue)."
        },
        {
          "heading": "Resolution Matters: Heterogeneity, Single-Cell & Spatial Transcriptomics",
          "body": "**Tissue is heterogeneous** — it contains many cell types in different proportions and cellular **states** (active/inactive, mature/immature, quiescent/active). The human brain alone holds **excitatory neurons, inhibitory interneurons, astrocytes, microglia, oligodendrocytes, and OPCs** (~2 × 86 billion cells; ~500 kcal/day). Because bulk RNA-seq gives only an **average**, **resolution matters**:\n\n| Method | Resolution |\n|---|---|\n| **Bulk RNA-seq** | One averaged profile per sample |\n| **Single-nucleus / single-cell RNA-seq** | Per-cell profiles |\n| **Spatial transcriptomics** | Expression **with spatial location** |\n\n**Single-cell RNA-Seq (scRNA-Seq)** — *Nature* **Method of the Year 2013**:\n- Cells/nuclei + barcoded **beads** are co-encapsulated in **oil droplets** → **barcoding → library prep → sequencing**.\n- Cells are grouped by **putative cell clustering** (e.g., **UMAP**); **marker genes** (differential gene expression across clusters) annotate each cluster.\n- **Pseudotime / lineage inference** orders cells along a trajectory (**0 → 1**) from a manually selected starting cell.\n- **CellChat** infers **cell–cell communication** from ligand–receptor expression (law of mass action).\n- **Limitations of scRNA-Seq:** **loss of tissue architecture, batch effects, data sparsity**.\n\n**Spatially resolved transcriptomics** — **Method of the Year 2020**: e.g., the **Visium** slide with **~5,000 barcoded spots**, each capturing transcripts via a **spatial barcode + UMI + poly(dT)**, preserving histological location (e.g., SNAP25 in gray-matter neurons, MBP in white matter)."
        },
        {
          "heading": "Downstream Analysis: Differential Expression, WGCNA & Gene Ontology",
          "body": "After quantification, **differential gene expression (DGE)** traditionally identifies **individual genes that change between conditions**, visualized in **volcano plots** (−log10 p-value vs log2 fold change). But to 'see the forest from the trees,' we move to **gene networks**.\n\n**WGCNA (Weighted Gene Co-expression Network Analysis)** uses **graph theory** (nodes, edges, edge weights, hubs, modules) to find **tissue-specific, co-expressed gene modules**. Relationships are defined by **correlation between every pair of genes** (e.g., **Spearman, Kendall, Blomqvist**, averaged into a single weight).\n\n| WGCNA Step | Purpose |\n|---|---|\n| **Correlation matrix** | Identify co-expressed genes |\n| **Soft threshold** | Build a **scale-free network** |\n| **Module detection** | Find co-expression clusters |\n| **Module–trait analysis** | Link biology to phenotype |\n| **Hub genes** | Predict regulators & potential **drug targets** |\n\n**Functional interpretation:** **Gene Ontology (GO)** is a standardized, **species-independent hierarchical** database (broad parent terms → specific child terms, increasing granularity) that answers *which cellular processes are active vs dormant*. Reference resources: **GTEx, Reactome, KEGG**. Example application: WGCNA in a mouse model of focal epilepsy links color-coded modules (e.g., MEred, MEbrown) to traits like epilepsy vs sham and to processes such as synapse organization and gliogenesis."
        },
        {
          "heading": "Machine Learning in Transcriptomics & FAIR Data Sharing",
          "body": "**Why machine learning in transcriptomics?** Transcriptomic datasets — especially single-cell and spatial — are:\n- **High-dimensional** (thousands of genes)\n- **Noisy**\n- **Heterogeneous** (many cell types, states, and transitions)\n\nML is well-suited to **extract patterns**, **predict labels** (e.g., cell types), and **reveal hidden gene programs/modules**. **Common challenges:** **reference bias and overfitting**, plus **ambiguous or novel cell types not present in the training data**.\n\n**Data sharing & the FAIR principles** — data should be:\n- **F**indable — persistent identifier (e.g., DOI) + metadata\n- **A**ccessible — open where possible; otherwise metadata + access info\n- **I**nteroperable — open/non-proprietary file formats\n- **R**eusable — annotated metadata, clear methods, version control\n\n**Repositories:** GEO, ArrayExpress, Human Cell Atlas, scBaseCount, Tahoe-100M, Bioconductor, GitHub, Zenodo. Many transcriptomics studies appear as **preprints (e.g., bioRxiv) before peer review**, so results must be **critically assessed**. **Ethics:** consent, re-identifiability, inclusion."
        }
      ],
      "questions": [
        {
          "id": "L9Q1",
          "conceptIndex": 0,
          "text": "What does the transcriptome refer to, and roughly how many genes does the human genome contain?",
          "options": [
            "The complete collection of all RNA transcripts in an organism; ~20,000 protein-coding and ~25,000 pure RNA-coding genes",
            "The complete set of proteins in a cell; ~20,000 genes total",
            "All DNA in an organism; ~3 billion genes",
            "Only the mRNA that codes for protein; ~45,000 protein-coding genes"
          ],
          "correct": [
            0
          ],
          "explanation": "The transcriptome is the complete collection of all RNA transcripts in an organism. The slides give ~20,000 protein-coding genes plus ~25,000 pure RNA-coding (non-coding) genes. The transcriptome is RNA (not protein or total DNA), and thousands of genes make ncRNA as their final product, so it is not limited to protein-coding mRNA.",
          "type": "single"
        },
        {
          "id": "L9Q2",
          "conceptIndex": 1,
          "text": "In the Dravet-syndrome example, what is the consequence of aberrant inclusion of the SCN1A 'poison' exon 20N?",
          "options": [
            "A frame shift and premature stop codon in exon 21, triggering nonsense-mediated mRNA decay",
            "Increased production of functional SCN1A channel protein",
            "Deletion of exon 21 and a longer, gain-of-function channel",
            "Silencing of transcription at the SCN1A promoter"
          ],
          "correct": [
            0
          ],
          "explanation": "Exon 20N normally sits in intron 20 and should be excised. The variant SCN1A:c.3969+2451G>C causes its aberrant inclusion, producing a frame shift and a premature stop codon in exon 21, which triggers nonsense-mediated mRNA decay. It does not increase functional protein, delete exon 21, or silence the promoter.",
          "type": "single"
        },
        {
          "id": "L9Q3",
          "conceptIndex": 1,
          "text": "Which statements about nonsense-mediated mRNA decay (NMD) are correct? (Select all that apply.)",
          "options": [
            "It degrades mRNAs containing premature termination codons (PTCs)",
            "It is a quality-control mechanism conserved in all eukaryotes",
            "An mRNA escapes NMD if the PTC is in the last exon or lies <50 bp from an exon boundary",
            "It boosts translation of truncated proteins"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "NMD is an evolutionarily conserved eukaryotic quality-control pathway that degrades PTC-containing mRNAs (via 5′-cap removal, the EJC, and UPF1/2/3). Escape occurs when the PTC is in the last exon or <50 bp from an exon boundary. The last option is wrong: NMD prevents, not promotes, production of truncated proteins.",
          "type": "multiple"
        },
        {
          "id": "L9Q4",
          "conceptIndex": 2,
          "text": "What enzymatic activity does reverse transcriptase have?",
          "options": [
            "RNA-dependent DNA polymerase (synthesizes DNA from an RNA template)",
            "DNA-dependent RNA polymerase",
            "RNA-dependent RNA polymerase",
            "A protease that degrades RNA"
          ],
          "correct": [
            0
          ],
          "explanation": "The RT recipe defines reverse transcriptase as an RNA-dependent DNA polymerase: it reads an RNA template and synthesizes cDNA. A DNA-dependent RNA polymerase performs transcription; an RNA-dependent RNA polymerase copies RNA into RNA; and RNA degradation is the job of RNase H, not reverse transcriptase.",
          "type": "single"
        },
        {
          "id": "L9Q5",
          "conceptIndex": 2,
          "text": "Which of the following are valid primer options or components for reverse transcription, as given in the 'recipe for RT'? (Select all that apply.)",
          "options": [
            "Oligo-dT primers (anneal to the poly-A tail)",
            "Random hexamer primers",
            "Sequence-specific primers",
            "RNA polymerase added to generate the primers de novo"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "The RT recipe lists three primer choices: sequence-specific, oligo-dT (binds the poly-A tail), or random hexamer (alongside dNTPs, RNase H, and DNA polymerase). RNA polymerase is not part of the reverse-transcription recipe, and RT does not generate its primers de novo.",
          "type": "multiple"
        },
        {
          "id": "L9Q6",
          "conceptIndex": 2,
          "text": "How do microarrays differ from RNA-sequencing for studying the transcriptome?",
          "options": [
            "Microarrays quantify a set of predetermined sequences (only what we already know), whereas RNA-seq is NGS-based and, in theory, unbiased",
            "Microarrays are NGS-based and unbiased; RNA-seq only detects known sequences",
            "Both can only detect predetermined sequences",
            "RNA-seq cannot quantify expression levels"
          ],
          "correct": [
            0
          ],
          "explanation": "Microarrays use probes affixed to a surface and so quantify only a predetermined set of sequences (capturing only what we already know). RNA-seq is NGS-based, high-throughput, and in theory unbiased, able to detect novel transcripts. The other options reverse or misstate these properties.",
          "type": "single"
        },
        {
          "id": "L9Q7",
          "conceptIndex": 3,
          "text": "Which pairing of method and 'Method of the Year' recognition is correct?",
          "options": [
            "Single-cell RNA-Seq = Method of the Year 2013; spatially resolved transcriptomics = Method of the Year 2020",
            "Single-cell RNA-Seq = 2020; spatially resolved transcriptomics = 2013",
            "Bulk RNA-seq = 2013; microarrays = 2020",
            "Both single-cell and spatial transcriptomics = 2013"
          ],
          "correct": [
            0
          ],
          "explanation": "The slides label single-cell RNA-Seq as Method of the Year 2013 and spatially resolved transcriptomics as Method of the Year 2020. The other pairings swap the years or assign them to the wrong methods.",
          "type": "single"
        },
        {
          "id": "L9Q8",
          "conceptIndex": 3,
          "text": "Which of the following are stated limitations of single-cell RNA-Seq? (Select all that apply.)",
          "options": [
            "Loss of tissue architecture",
            "Batch effects",
            "Data sparsity",
            "Inability to distinguish different cell types"
          ],
          "correct": [
            0,
            1,
            2
          ],
          "explanation": "The lecture lists loss of tissue architecture, batch effects, and data sparsity as the limitations of scRNA-Seq. Distinguishing cell types is actually a strength of scRNA-Seq (cells are grouped by clustering and marker genes), so the last option is false.",
          "type": "multiple"
        },
        {
          "id": "L9Q9",
          "conceptIndex": 4,
          "text": "In WGCNA, what is the purpose of the 'soft threshold' step, and how are gene relationships defined?",
          "options": [
            "The soft threshold builds a scale-free network; gene relationships are defined by correlation (e.g., Spearman, Kendall, Blomqvist) between each pair of genes",
            "The soft threshold removes all low-expression genes; relationships are defined by physical DNA proximity",
            "The soft threshold detects modules; relationships are based on protein-protein binding assays",
            "The soft threshold links modules to traits; relationships are assigned randomly"
          ],
          "correct": [
            0
          ],
          "explanation": "Per the WGCNA step table, the soft threshold is used to build a scale-free network, and relationships between genes are defined by correlation measures (Spearman, Kendall, Blomqvist, averaged into a weight) across all gene pairs. Module detection (not soft threshold) finds clusters, and module-trait analysis (not soft threshold) links modules to phenotype.",
          "type": "single"
        },
        {
          "id": "L9Q10",
          "conceptIndex": 5,
          "text": "According to the lecture, which statement about machine learning in transcriptomics is correct?",
          "options": [
            "Transcriptomic data are high-dimensional, noisy, and heterogeneous; ML can extract patterns and predict cell types but faces reference bias, overfitting, and novel cell types absent from training data",
            "Transcriptomic data are low-dimensional and clean, so ML is rarely needed",
            "ML eliminates all batch effects and never overfits",
            "ML can be applied only to bulk RNA-seq, not single-cell data"
          ],
          "correct": [
            0
          ],
          "explanation": "The slides describe transcriptomic data (especially single-cell and spatial) as high-dimensional, noisy, and heterogeneous; ML extracts patterns, predicts labels such as cell types, and reveals gene modules, while facing reference bias, overfitting, and ambiguous/novel cell types not in the training data. The other options contradict these points.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What is the transcriptome, and what is the goal of transcriptomics?",
          "back": "The transcriptome is the complete collection of all RNA transcripts in an organism. Transcriptomics aims to quantify gene expression levels."
        },
        {
          "front": "How many protein-coding vs RNA-coding genes does the human genome have?",
          "back": "~20,000 protein-coding genes and ~25,000 pure RNA-coding (non-coding) genes. Thousands of genes make ncRNA as their final product."
        },
        {
          "front": "Besides translation, what can RNA do (central dogma)?",
          "back": "DNA→transcription→RNA→translation→Protein, but not all RNA is translated. RNA can act as a scaffold, a ribozyme, or regulatory ncRNA. Reverse transcription also runs RNA→DNA."
        },
        {
          "front": "Three factors that set how strongly a gene is expressed?",
          "back": "Efficiency of transcription, stability of the mRNA, and efficiency of translation."
        },
        {
          "front": "What does alternative splicing achieve? Give an example.",
          "back": "It produces multiple mRNA isoforms from one gene (plus alternative 3′ cleavage/polyadenylation), generating tissue-specific transcripts. Example: the α-tropomyosin gene → striated-muscle, smooth-muscle, fibroblast, and brain mRNAs."
        },
        {
          "front": "What is the SCN1A 'poison' exon 20N and its effect in Dravet syndrome?",
          "back": "A cryptic, conserved exon inside intron 20 that should be excised. The variant SCN1A:c.3969+2451G>C causes aberrant inclusion → frame shift + premature stop in exon 21 → nonsense-mediated mRNA decay."
        },
        {
          "front": "What is NMD, what does it degrade, and which proteins are involved?",
          "back": "Nonsense-mediated mRNA decay: a quality-control pathway (in all eukaryotes) that degrades mRNAs with premature termination codons (PTCs) via 5′-cap removal and the exon junction complex, using UPF1, UPF2, and UPF3."
        },
        {
          "front": "When does an mRNA escape NMD?",
          "back": "If the PTC is in the last exon, or the PTC is <50 bp from an exon boundary."
        },
        {
          "front": "What is reverse transcriptase, and what's in the RT recipe?",
          "back": "An RNA-dependent DNA polymerase. RT recipe: reverse transcriptase, dNTPs, primers, RNase H, and DNA polymerase, producing double-stranded cDNA."
        },
        {
          "front": "What three primer types can be used for reverse transcription?",
          "back": "Sequence-specific primers, oligo-dT primers (anneal to the poly-A tail), or random hexamers. RNase H then degrades the RNA of the RNA–DNA hybrid."
        },
        {
          "front": "Microarray vs RNA-Seq for studying the transcriptome?",
          "back": "Microarray: probes on a surface that quantify predetermined sequences — captures only what we already know. RNA-Seq: NGS-based, high-throughput, and in theory unbiased."
        },
        {
          "front": "Bulk RNA-seq workflow, data types, and key limitation?",
          "back": "Sample → RNA extraction → library prep → sequencing → alignment → quantification. Data types: raw reads, TPM/FPKM, DEG. Cost-effective and robust for homogeneous tissues, but it averages across cell populations."
        },
        {
          "front": "What is scRNA-Seq, when was it Method of the Year, and how are cells grouped?",
          "back": "Single-cell RNA-Seq: cells/nuclei + barcoded beads in oil droplets → barcoding → library prep → sequencing. Method of the Year 2013. Cells are grouped by clustering (e.g., UMAP) and annotated with marker genes."
        },
        {
          "front": "Three limitations of scRNA-Seq?",
          "back": "Loss of tissue architecture, batch effects, and data sparsity."
        },
        {
          "front": "What is spatial transcriptomics, and when was it Method of the Year?",
          "back": "Method of the Year 2020. It measures gene expression with spatial location, e.g., the Visium slide with ~5,000 barcoded spots, each using a spatial barcode + UMI + poly(dT) to preserve histological context."
        },
        {
          "front": "What are the WGCNA steps and their purposes?",
          "back": "Correlation matrix (identify co-expressed genes) → soft threshold (build a scale-free network) → module detection (find clusters) → module-trait analysis (link biology to phenotype) → hub genes (predict regulators / drug targets). Correlations use Spearman, Kendall, Blomqvist."
        }
      ]
    }
  ]
}
