// DE1 — Data Engineering 1 content
// FAU Summer 2026 · Prof. Dr. David B. Blumenthal
import type { Content } from './types'

export const content: Content = {
  "lectures": [
    {
      "id": 0,
      "title": "Introduction & Basic Data Types",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "The Data Engineering Pipeline",
          "body": "**Data Engineering:** Collecting, storing, and making data usable for analysis.\n\n**Pipeline:** Extract → Load → Transform → Analyze\n\n**Tabular vs Non-Tabular:**\n\n| | Tabular | Non-Tabular |\n|--|---------|-------------|\n| Rows | Independent | Dependent |\n| Row order | Irrelevant (order-invariant) | Matters |\n| Examples | Demographics table | Time series, graph, image |"
        },
        {
          "heading": "Variable Taxonomy",
          "body": "```\nVariable\n├── Quantitative  →  numeric domain\n│   ├── Continuous   (float — BMI, height)\n│   └── Discrete     (int — age in years, child count)\n└── Categorical   →  non-numeric domain\n    ├── Nominal      (unordered — country, weather)\n    └── Ordinal      (ordered — low / med / high)\n```\n\n**Finite ⊆ all categorical + some quantitative**\n- Categorical → always finite\n- Finite → NOT always categorical (age in integer years: finite but quantitative)\n\n**Temporal:** Domain represents time points or intervals — cyclic ordering: c₁ < … < cₖ < c₁\n- Examples: day of week, month of year\n\n**Trap question:** ZIP codes look numeric but are categorical — averaging ZIP codes is meaningless."
        },
        {
          "heading": "Data Encoding — The < Operator Rule",
          "body": "**Goal:** Convert data to numeric form for ML models. Good encoding preserves the distance relationships of the original domain.\n\n**The rule:** The `<` operator in the encoding must represent the natural ordering of the domain.\n\n| Variable type | Encoding |\n|--------------|----------|\n| Continuous | `float` (BMI: 22.4) |\n| Discrete | `int` (age: 23) |\n| Ordinal | integer, order preserved: bad=0, neutral=1, good=2 ✓ |\n| Nominal | one-hot (no order to preserve) |\n| Temporal / cyclic | cyclic sin/cos |\n\n**Label / Ordinal Encoding:** Assign ordered integers to categories.\n```\nLow=0, Medium=1, High=2, Extreme=3\n```\n✓ Correct for ordinal — natural order preserved.\n✗ Wrong for nominal — creates a false implicit ordering."
        },
        {
          "heading": "One-Hot Encoding",
          "body": "Each category gets its own binary column — all categories are equidistant.\n\n```\nsunny    → [1, 0, 0]\novercast → [0, 1, 0]\nrainy    → [0, 0, 1]\n```\n\n**Why label encoding fails for nominal data (3 reasons):**\n1. **False magnitude:** Sun=6, Mon=0 → model thinks Sunday is 6× larger than Monday\n2. **False distance:** Mon↔Tue = 1, Mon↔Sun = 6 — but all days should be equidistant\n3. **False average:** (Mon + Wed) / 2 = Tue → meaningless\n\n**Problem with one-hot:** High cardinality causes column explosion.\n- Country variable: 195 countries → 195 new columns\n- Most rows: 194 zeros, 1 one → sparse matrix, memory issues"
        },
        {
          "heading": "Cyclic Encoding",
          "body": "For temporal / cyclic variables — preserves neighborhood on a unit circle.\n\n**Formula:** For K categories, the encoding of the i-th category:\n```\nx_i = cos(2π(i−1)/K)\ny_i = sin(2π(i−1)/K)\n```\n\n**Why it works:**\n- Label encoding: December=12, January=1 → |Dec−Jan| = 11 — model thinks they're far apart\n- Cyclic encoding: Both map to adjacent points on the unit circle → Euclidean distance ≈ 0.27 (same as Jan↔Feb)\n\n**1D cyclic distance:** d(cᵢ, cⱼ) = min{|i−j|, K−|i−j|} — take the shorter arc\n- Jan↔Dec: min{11, 1} = 1 ✓\n\n**Definition of good encoding:** Preserving the distance relationships of the original domain in the encoding space."
        },
        {
          "heading": "Binning",
          "body": "Continuous → Discrete transformation: f: ℝ → {1, …, K}\n\n**Equal-width binning:**\n```\nbin_width = (MAX − MIN) / K\n```\n\n**Example — BMI [15, 45], K=3:**\n- bin_width = (45−15)/3 = 10\n- Bin 1: [15, 25) — Underweight/Normal\n- Bin 2: [25, 35) — Overweight\n- Bin 3: [35, 45] — Obese\n\n**Problem:** Equal-width splits the domain evenly, not the data. If 950 of 1000 people have BMI 18–25, Bin 1 is overwhelmingly crowded.\n\n**Rounding as special-case binning:** Converting continuous age to integer years is binning with bin_width = 1."
        },
        {
          "heading": "Non-Tabular Data Types",
          "body": "**Spatial Data:** Each sample has a location — adjacent locations are dependent (adjacency dependencies).\n- Vector: points, lines, polygons\n- Raster: grid of values (satellite image, elevation map)\n\n**Images:** 2D spatial data with RGB values. Each pixel: coordinates (x, y) + values (R, G, B).\n\n| Type | Structure |\n|------|-----------|\n| Grayscale image | 2D matrix `[H × W]` |\n| RGB image | 3D tensor `[H × W × 3]` |\n| Video | 4D tensor `[T × H × W × 3]` |\n\n**Time Series:** Each sample has a timestamp; t_i < t_{i+1} order is critical.\n- Multivariate: multiple variables measured simultaneously (e.g., EMG multi-channel)\n- Strings are time series — character order carries meaning: `\"ATCG\" ≠ \"CATG\"`\n\n**Graphs:** G = (V, E). Non-tabular because edges create dependencies between nodes.\n- Undirected edge: e = {u, v} where {1,3} = {3,1}\n- Directed edge: e = (u, v) where (1,3) ≠ (3,1)\n- Self-loop: e = (u, u)"
        },
        {
          "heading": "Graph Representations: Adjacency Matrix vs List",
          "body": "**Adjacency Matrix:** N×N matrix, A[i][j] = edge weight (or 1/0 for unweighted).\n\n| Operation | Complexity |\n|-----------|------------|\n| Space | O(\\|V\\|²) |\n| Edge lookup A[i][j] | O(1) |\n| Iterate all neighbors | O(\\|V\\|) |\n\n**Adjacency List:** Store only actual neighbors per node.\n\n| Operation | Matrix | List |\n|-----------|--------|------|\n| Space | O(\\|V\\|²) | O(\\|V\\| + \\|E\\|) |\n| Edge lookup | O(1) | O(\\|V\\|) |\n| Iterate neighbors | O(\\|V\\|) | O(deg(u)) |\n\n**When to use which:**\n- **Dense graph** (\\|E\\| ≈ \\|V\\|²): Matrix — no space penalty, O(1) lookup wins\n- **Sparse graph** (\\|E\\| << \\|V\\|²): List — massive space savings\n- Biomedical graphs (protein interaction networks) are almost always sparse → adjacency list"
        },
        {
          "heading": "String Encoding",
          "body": "**Step 1 — Tokenization:** Split string into tokens, map each to an integer ID.\n```\n\"Fine Tuning is Fun\" → [\"fine\", \"tuning\", \"is\", \"fun\"] → [13490, 1992, 278, 477]\n```\nCommon algorithm: **Byte Pair Encoding (BPE)**\n\n**Step 2 — Token Embedding:** Map each token ID to a D-dimensional dense vector.\n```\n\"king\"  → [0.2,  0.8, −0.3, ...]\n\"queen\" → [0.1,  0.7, −0.4, ...]\n\"apple\" → [−0.4, 0.1,  0.9, ...]\n```\nSimilar meaning → similar vectors (close neighbors in vector space). Common algorithm: **Word2Vec**\n\n**Why not one-hot for tokens?** Vocabulary can be tens of thousands of tokens — one-hot would be enormous and sparse. Dense embedding vectors are far more efficient."
        }
      ],
      "questions": [
        {
          "id": "L0Q1",
          "text": "A dataset contains ZIP codes (e.g. 90210, 10115). How should this variable be classified?",
          "options": [
            "Quantitative — continuous, because ZIP codes are real numbers",
            "Quantitative — discrete, because ZIP codes are integers",
            "Categorical — nominal, because arithmetic on ZIP codes is meaningless",
            "Categorical — ordinal, because larger ZIP codes come from different regions"
          ],
          "correct": [2],
          "explanation": "ZIP codes are categorical nominal. Even though they look like numbers, 90210 + 10115 means nothing, and the average ZIP code is meaningless. The numeric appearance is a classic trap — if arithmetic on a variable produces nonsense, it's categorical. There is also no natural ordering between ZIP codes, ruling out ordinal.",
          "type": "single"
        },
        {
          "id": "L0Q2",
          "text": "Which statements about Finite and Categorical variables are correct? Select ALL that apply.",
          "options": [
            "Every categorical variable is finite",
            "Every finite variable is categorical",
            "Age in integer years is finite but quantitative, not categorical",
            "BMI is finite because it only takes values in a limited range"
          ],
          "correct": [0, 2],
          "explanation": "Categorical ⊆ Finite: all categorical variables have a finite domain (you can enumerate all countries or weather states). But the reverse is NOT true — age in integer years (0–120) is finite yet quantitative because arithmetic on it is meaningful (average age makes sense). BMI is continuous (real-valued), so it is NOT finite — it can take infinitely many distinct values within its range.",
          "type": "multiple"
        },
        {
          "id": "L0Q3",
          "text": "Why is label encoding wrong for nominal variables? Select ALL correct reasons.",
          "options": [
            "It implies a false magnitude — Sun=6 means Sunday is '6× larger' than Monday=0",
            "It creates unequal distances — Mon↔Tue = 1 but Mon↔Sun = 6, though all days should be equidistant",
            "It makes arithmetic averages meaningless — (Mon + Wed) / 2 = Tue",
            "It cannot handle more than 10 categories"
          ],
          "correct": [0, 1, 2],
          "explanation": "Label encoding on nominal data introduces three false relationships: (A) false magnitude — higher integers imply greater value; (B) false distance — different integer gaps imply different 'closeness' between categories; (C) false average — the midpoint of two encoded integers produces another 'category'. None of these relationships exist in nominal data. The limit of 10 categories (D) is false — label encoding can handle any number of categories.",
          "type": "multiple"
        },
        {
          "id": "L0Q4",
          "text": "A dataset has a 'Month of Birth' column (Jan–Dec). Which encoding is most appropriate?",
          "options": [
            "Label encoding (Jan=1, …, Dec=12) — integers are simple and fast",
            "One-hot encoding — months are nominal with no natural order",
            "Cyclic encoding (sin/cos) — months form a cycle where December and January are neighbors",
            "Ordinal encoding — months have a clear sequential ordering"
          ],
          "correct": [2],
          "explanation": "Month of birth is temporal and cyclic. Label encoding makes |Dec−Jan| = 11, but they are actually 1 step apart on the calendar. Ordinal encoding has the same cyclic problem. One-hot ignores the cyclic structure entirely. Cyclic encoding (sin/cos) maps months onto a unit circle so December and January are adjacent — their Euclidean distance equals that of any two consecutive months.",
          "type": "single"
        },
        {
          "id": "L0Q5",
          "text": "What is the cyclic encoding of the 3rd category (i=3) among K=12 categories?",
          "options": [
            "x = cos(2π·3/12),  y = sin(2π·3/12)",
            "x = cos(2π·2/12),  y = sin(2π·2/12)",
            "x = cos(π/3),  y = sin(π/3)",
            "Both B and C are the same and are correct"
          ],
          "correct": [3],
          "explanation": "The formula is x = cos(2π(i−1)/K), y = sin(2π(i−1)/K). For i=3, K=12: x = cos(2π·2/12) = cos(π/3) ≈ 0.5, y = sin(2π·2/12) = sin(π/3) ≈ 0.866. Options B and C are the same expression — 2π·2/12 simplifies to π/3. Option A incorrectly uses i instead of (i−1), giving the wrong position on the circle.",
          "shuffle": false,
          "type": "single"
        },
        {
          "id": "L0Q6",
          "text": "What is the equal-width bin width for BMI values in the range [15, 45] divided into K=4 bins?",
          "options": [
            "5",
            "7.5",
            "10",
            "15"
          ],
          "correct": [1],
          "explanation": "Equal-width bin width = (MAX − MIN) / K = (45 − 15) / 4 = 30 / 4 = 7.5. The four bins would be: [15, 22.5), [22.5, 30), [30, 37.5), [37.5, 45].",
          "type": "single"
        },
        {
          "id": "L0Q7",
          "text": "What is the tensor shape of a color video that is 720px tall, 1280px wide, recorded for 30 seconds at 24 fps?",
          "options": [
            "[720 × 1280 × 3]",
            "[24 × 720 × 1280]",
            "[720 × 720 × 1280 × 3]",
            "[30 × 720 × 1280 × 3]"
          ],
          "correct": [2],
          "explanation": "Video = 4D tensor [T × H × W × 3]. Total frames T = 30s × 24fps = 720. Height H = 720, Width W = 1280, Channels = 3 (RGB). Full shape: [720 × 720 × 1280 × 3]. Option D uses 30 (seconds) instead of 720 (frames). Option A is a single RGB frame. Option B omits the channel dimension.",
          "type": "single"
        },
        {
          "id": "L0Q8",
          "text": "A protein interaction network has 5,000 proteins, each interacting with only 3–5 others on average. Which representation is most space-efficient?",
          "options": [
            "Adjacency matrix — O(1) edge lookup is critical for biological analysis",
            "Adjacency list — the graph is sparse so O(|V|+|E|) space is far smaller than O(|V|²)",
            "Both representations use the same space for sparse graphs",
            "Adjacency matrix — always preferred when the graph has more than 1,000 nodes"
          ],
          "correct": [1],
          "explanation": "With 5,000 proteins and ~15,000 edges (avg 3), the adjacency matrix needs 5,000² = 25,000,000 cells — almost all zeros. The adjacency list needs O(|V| + |E|) = O(20,000) entries. This is a 1,250× space reduction. Biomedical graphs are almost always sparse — adjacency lists are the standard choice. O(1) lookup (A) is rarely worth the memory cost at this sparsity.",
          "type": "single"
        },
        {
          "id": "L0Q9",
          "text": "Which of the following correctly explain why images are non-tabular data? Select ALL that apply.",
          "options": [
            "Adjacent pixels are spatially dependent — neighboring pixels tend to have similar color values",
            "Shuffling the pixel positions would destroy the image's meaning",
            "Each pixel stores 3 values (R, G, B) rather than 1",
            "Images cannot be stored in relational databases"
          ],
          "correct": [0, 1],
          "explanation": "Non-tabular data has row (sample) dependencies. For images: (A) adjacent pixels share spatial dependencies — a pixel's color is correlated with its neighbors; (B) permuting pixel positions turns the image into meaningless noise, proving order matters. The number of values per pixel (C) is irrelevant to the tabular/non-tabular distinction. Images can be stored in databases (D) — that's false.",
          "type": "multiple"
        },
        {
          "id": "L0Q10",
          "text": "Which of the following datasets are non-tabular? Select ALL that apply.",
          "options": [
            "A table of 500 patients with columns: age, weight, height, diagnosis",
            "An EMG signal recorded at 1000 Hz over 10 seconds (10,000 timesteps × 8 channels)",
            "A road network where nodes are intersections and edges are roads with travel times",
            "A DNA sequence 'ATCGATCG'",
            "A survey where 500 respondents each answered 20 yes/no questions"
          ],
          "correct": [1, 2, 3],
          "explanation": "(B) EMG signal = multivariate time series — temporal dependencies between timesteps, order critical. (C) Road network = attributed graph — edges create dependencies between nodes. (D) DNA sequence = string treated as time series — 'ATCG' ≠ 'CATG', character order is critical. Patient demographics (A) and survey responses (E) are tabular — each row is an independent observation, shuffling rows doesn't change the dataset.",
          "type": "multiple"
        }
      ],
      "flashcards": [
        {
          "front": "Is a ZIP code quantitative or categorical?",
          "back": "Categorical — 90210 + 10115 means nothing; averaging ZIP codes is meaningless."
        },
        {
          "front": "What is the difference between nominal and ordinal variables?",
          "back": "Nominal has no order (rainy/sunny/cloudy); ordinal has order but unequal steps (bad < neutral < good)."
        },
        {
          "front": "Categorical ⊆ ?",
          "back": "Finite — but not every finite variable is categorical (age in integer years is finite but quantitative)."
        },
        {
          "front": "What is the difference between continuous and discrete variables?",
          "back": "Continuous: there is always another value between any two values (BMI: 22.4). Discrete: each value has a direct successor, no valid values in between (age in years: 23→24)."
        },
        {
          "front": "Why is temporal data a separate category?",
          "back": "It is cyclic — December and January are far apart under label encoding (|12-1|=11) but are actually neighbors. Cyclic encoding is required."
        },
        {
          "front": "In what sense must the < operator in an encoding preserve natural order?",
          "back": "When encoding ordinal data, smaller integer must mean smaller category. bad=0, neutral=1, good=2 ✓ — good=0, bad=2 is wrong."
        },
        {
          "front": "Why is label encoding wrong for nominal data?",
          "back": "It creates an implicit ordinal order. Sun=6, Mon=0 → the model thinks Sunday is '6× larger' than Monday; (Mon+Sun)/2=Thursday — meaningless."
        },
        {
          "front": "What is the problem with one-hot encoding?",
          "back": "High cardinality causes column explosion — 195 countries → 195 columns, sparse matrix, memory issues."
        },
        {
          "front": "What is the cyclic encoding formula?",
          "back": "x_i = cos(2π(i−1)/K)\ny_i = sin(2π(i−1)/K)"
        },
        {
          "front": "Why is the January↔December distance small under cyclic encoding?",
          "back": "They map to neighboring points on the unit circle. Under label encoding |1-12|=11; under cyclic encoding Euclidean distance ≈ 0.27 — the same as January↔February."
        },
        {
          "front": "What is the 1D cyclic distance formula?",
          "back": "d(c_i, c_j) = min{|i−j|, K−|i−j|} — take the shorter arc. January↔December: min{11,1} = 1."
        },
        {
          "front": "What is the definition of a \"good encoding\"?",
          "back": "Preserving the distance relationships of the original domain in the encoding space."
        },
        {
          "front": "What is the key difference between tabular and non-tabular data?",
          "back": "In tabular data, rows are independent and order-invariant (permuting rows gives the same dataset). Non-tabular data has order and dependencies between samples."
        },
        {
          "front": "Why is spatial data non-tabular?",
          "back": "Adjacent locations are dependent — \"locations yield adjacency dependencies between samples.\""
        },
        {
          "front": "What is the tensor structure of image data?",
          "back": "RGB image = 3D tensor [H × W × 3], Grayscale = 2D matrix [H × W], Video = 4D tensor [T × H × W × 3]."
        },
        {
          "front": "Why is time series data non-tabular?",
          "back": "\"Time stamps yield temporal dependencies between samples\" — the value at t=3 depends on t=2; shuffling rows destroys the temporal dependence."
        },
        {
          "front": "What are the 2 steps of string encoding?",
          "back": "1. Tokenization — split string into tokens, map each to an integer ID (BPE algorithm)\n2. Token Embedding — map each token ID to a D-dimensional dense vector (Word2Vec)"
        },
        {
          "front": "What is the definition of graph G = (V, E) and what are the edge types?",
          "back": "V = set of nodes, E = set of edges.\nUndirected: e = {u,v} — {1,3} = {3,1}\nDirected: e = (u,v) — (1,3) ≠ (3,1)\nSelf-loop: e = (u,u)"
        },
        {
          "front": "Adjacency matrix vs adjacency list — when to use which?",
          "back": "Dense graph (|E| ≈ |V|²): Matrix — O(1) lookup wins\nSparse graph (|E| << |V|²): List — O(|V|+|E|) space saves memory\nBiomedical graphs are almost always sparse → adjacency list."
        },
        {
          "front": "What is the equal-width binning formula?",
          "back": "bin_width = (MAX − MIN) / K"
        },
        {
          "front": "Should a protein interaction network use an adjacency matrix or list? Why?",
          "back": "Adjacency list — thousands of proteins but each interacts with only a few others → sparse graph."
        }
      ]
    }
    ,{
      "id": 1,
      "title": "Fundamental Database Concepts & Conceptual Modeling",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "Why Databases? The 4 Problems a DBMS Solves",
          "body": "Without a database, data is hard-coded in applications or kept in flat files — every application manages its own data, code and data are entangled.\n\n**The 4 problems a DBMS solves:**\n1. **Application programs ↔ data separation:** Data is stored independently from the code that uses it — schema changes don't require rewriting all applications.\n2. **Data usage ↔ data management separation:** Who uses the data and how it is stored are decoupled.\n3. **Declarative data access:** User says *what* they want, not *how* to retrieve it. Example: `SELECT name FROM students WHERE age > 20` — the DBMS figures out index traversal.\n4. **Multiple user views:** Different users see different views of the same data with controlled access rights (e.g. doctor sees full patient record; receptionist sees only appointment info).\n\n**DBMS:** The software system providing all these functions. Examples: PostgreSQL, MySQL, Oracle, MongoDB."
        },
        {
          "heading": "DBMS Architecture & Data Dictionary",
          "body": "```\nUsers / Programmers\n        ↓\nQueries / Application Programs\n        ↓\n[DBMS Software]\n  ├── Software to Process Queries/Programs\n  └── Software to Access Stored Data\n              ↓              ↓\n    Stored Database      Stored Database\n      Definition           (Data)\n      (Metadata)\n     = \"Data dictionary\"\n     = \"Catalogue\"\n```\n\n**Data dictionary (catalogue):** Metadata describing the database structure — which tables exist, which columns, which constraints. The DBMS consults the data dictionary before executing any query.\n\n**Database modeling process:**\n```\nIdeas → High-Level Design (ER model) → Relational DB Schema → Relational DBMS\n```"
        },
        {
          "heading": "Relational Data Model — Schema vs Instance",
          "body": "**Schema:** Specification of entities and their attributes → table headers. Rarely changes.\n\n**Instance:** Actual data entries conforming to the schema → table rows. Constantly updated.\n\n```\nSchema:    Student(studno, name, address)\n           Course(courseno, lecturer)\n\nInstance:  Student(123, Egger, Bozen)\n           Course(CS321, Nutt)\n```\n\nThe schema is the blueprint; the instance is the current state. Critical distinction for exam questions: a schema defines structure, an instance contains data."
        },
        {
          "heading": "Non-Relational Data Models (NoSQL)",
          "body": "The relational model is not suitable for everything. Three main NoSQL types:\n\n**Document Store** — stores data as JSON/BSON/XML documents. Flexible schema: different documents can have different fields. Good for hierarchical/nested data. Example: MongoDB.\n```\nUser Document\n├── Name: John\n├── Age: 30\n└── Orders: [{ID: 123, Total: 99.99}]\n```\n\n**Key-Value Store** — unique key → value pairs. Very high read/write performance. Ideal for cache and session management. Example: Redis.\n```\n\"user:1001\" → Name: Alice\n\"cart:567\"  → Items: 3\n```\n\n**Graph Database** — data as nodes (entities) and edges (relationships). Ideal for relationship-heavy data: social networks, protein interaction networks. Example: Neo4j.\n```\nUser A --Friends--> User B --Follows--> User C\n```\n\nWhen to use: relational for structured data with complex queries; NoSQL for flexibility, scale, or when relationships are the primary access pattern."
        },
        {
          "heading": "ER Model — Entity Types, Attributes & Attribute Types",
          "body": "**Entity:** A real-world object or thing. All entities of the same entity type share the same attributes.\n\n**Three attribute type dimensions:**\n\n**1. Atomic vs Composite:**\n- *Atomic (simple):* Cannot be divided further. Examples: `Age`, `Sex`.\n- *Composite:* Has sub-parts. Example: `Address` → `Street_address` (Number, Street, Apt) + City + State + Zip.\n\n**2. Stored vs Derived:**\n- *Stored:* Cannot be computed from other attributes; must be persisted. Example: `Birth_date`.\n- *Derived:* Can be computed from other data. Example: `Age` from `Birth_date`; `Number_of_employees` of COMPANY by counting related EMPLOYEE entities.\n\n**3. Single-valued vs Multivalued:**\n- *Single-valued:* One value per entity. Example: `Birth_date`, `Sex`.\n- *Multivalued:* Multiple values possible. Example: `College_degrees` of RESEARCHER (multiple degrees); `Affiliation` (multiple institutions).\n\n**Entity type vs entity set:**\n- *Entity type* = schema-level template (intension) — describes what attributes exist.\n- *Entity set* = actual collection of entities at a point in time (extension)."
        },
        {
          "heading": "Key Attributes",
          "body": "A **key attribute** uniquely identifies every entity within an entity type.\n\n**Rules:**\n1. A composite attribute can be a key if the combination is unique across all entities.\n2. A composite key must be **minimal** — no subset of it alone provides uniqueness.\n3. An entity type can have multiple distinct key attributes.\n4. Normative constraint: the key must guarantee uniqueness across the entire entity set. If it does not, the entity set is invalid.\n\n**Example:** `Matriculation_number` for STUDENT — unique per student.\n\n**Trap:** ZIP code looks numeric but is NOT a key for PERSON — multiple people share a ZIP code (not unique). Recall from Lecture 0: ZIP code is categorical nominal, and arithmetic on it is meaningless."
        },
        {
          "heading": "Relationships — Degree, Role Names & Recursive Relationships",
          "body": "**Relationship type R:** Defines an association among entity types E₁, E₂, ..., Eₙ. Each entity type *participates* in R.\n\n**Relationship instance:** One association among individual entities.\n\n**Degree** = number of participating entity types:\n\n| Degree | Name | Example |\n|--------|------|---------|\n| 2 | Binary | WORKS_FOR (EMPLOYEE ↔ DEPARTMENT) |\n| 3 | Ternary | SUPPLY (SUPPLIER ↔ PART ↔ PROJECT) |\n| n | n-ary | — |\n\n**Ternary SUPPLY:** \"Supplier S delivers part P to project J.\" Cannot be decomposed into binary relationships without losing information — the three-way combination is semantically atomic.\n\n**Role names:** Label each entity type's participation role. Required when the same entity type participates in multiple roles.\n\n**Recursive relationship:** Same entity type participates in two different roles in the same relationship. Example: SUPERVISION — EMPLOYEE participates as both 'supervisor' (role 1) and 'supervisee' (role 2)."
        },
        {
          "heading": "Cardinality Ratios & Participation Constraints",
          "body": "**Cardinality ratios for binary relationships:**\n\n| Ratio | Meaning | Example |\n|-------|---------|--------|\n| **1:1** | Each entity in E₁ associated with ≤ 1 in E₂, and vice versa | MANAGES (one manager per dept; one dept per manager) |\n| **1:N** | One entity in E₁ with N in E₂; each E₂ entity with ≤ 1 E₁ | WORKS_FOR (N employees in 1 dept) |\n| **N:1** | Reverse of 1:N | — |\n| **M:N** | Multiple in both directions | WORKS_ON (employee on N projects; project has M employees) |\n\n**Participation constraints:**\n- **Total participation:** Every entity in the type MUST appear in ≥ 1 relationship instance (existence dependency). ER notation: double line.\n- **Partial participation:** Some entities may not participate. ER notation: single line.\n\n**Min-max notation:** (min, max) per entity type — min ≥ 0, max ≥ 1, max ≥ min.\n- Total participation ↔ min ≥ 1\n- 1:N ↔ max = 1 on the '1' side\n\n**Combined constraints (structural constraints) example:**\nEMPLOYEE total-participates in WORKS_FOR with N:1 cardinality → every employee works for exactly one department."
        },
        {
          "heading": "Weak Entity Types & ER Diagram Notation",
          "body": "**Strong entity type:** Has a key attribute — can be uniquely identified on its own.\n\n**Weak entity type:** No key attribute — identified via:\n1. An **owner (strong) entity type**\n2. An **identifying relationship** (weak entity participates with total participation)\n3. A **partial key** — unique only among weak entities with the same owner\n\n**Example:** DEPENDENT (Name = partial key, weak) connected to EMPLOYEE via DEPENDENTS_OF (identifying, 1:N). Two employees can each have a dependent named \"Alice\" — \"Alice\" alone is not unique. The combination (owner employee + Name) is unique.\n\n**Important:** DRIVER_LICENSE is NOT weak despite existence dependency on PERSON — it has its own key attribute (license number).\n\n**ER Diagram notation summary:**\n\n| Concept | Symbol |\n|---------|--------|\n| Entity type | Rectangle |\n| Weak entity type | Double-border rectangle |\n| Attribute | Ellipse |\n| Key attribute | Underlined ellipse |\n| Multivalued attribute | Double-border ellipse |\n| Derived attribute | Dotted ellipse |\n| Relationship type | Diamond |\n| Identifying relationship | Double-border diamond |\n| Total participation | Double line |\n| Partial participation | Single line |"
        }
      ],
      "questions": [
        {
          "id": "L1Q1",
          "text": "A company stores employee records in separate flat files — one per department. What is the PRIMARY architectural problem a DBMS solves here?",
          "options": [
            "Flat files are always corrupted over time",
            "Application code and data are tightly coupled — changing the data structure requires updating every application",
            "Flat files cannot store more than 1000 records",
            "Flat files cannot be read by more than one user at a time"
          ],
          "correct": [1],
          "explanation": "The core problem is tight coupling between code and data. When the data structure changes (e.g., adding a column), every application reading those files must be updated. A DBMS decouples application programs from data storage — the schema can evolve without rewriting all consumers. Option D (concurrent access) is a real concern but a secondary consequence, not the primary architectural motivation for database systems.",
          "type": "single"
        },
        {
          "id": "L1Q2",
          "text": "`Student(studno, name, address)` is an example of a:",
          "options": [
            "Schema — it defines the structure (table headers), not actual data",
            "Instance — it is the actual data stored in the table",
            "Data dictionary — it is metadata about the database system",
            "Entity set — it is the current collection of student records"
          ],
          "correct": [0],
          "explanation": "`Student(studno, name, address)` specifies the entity and its attributes without containing any actual data — this is the schema (intension). An instance would be a row like `Student(123, Egger, Bozen)` — actual data conforming to the schema. The data dictionary stores schemas (it records where schemas are defined), but the schema itself is the blueprint. An entity set is the runtime collection of actual entities.",
          "type": "single"
        },
        {
          "id": "L1Q3",
          "text": "Which scenarios are valid reasons to use a NoSQL database instead of a relational one? Select ALL that apply.",
          "options": [
            "Data is relationship-heavy — traversing deep multi-hop connections (e.g., protein interaction networks)",
            "Data structure varies significantly between records — some records have fields others lack",
            "You need complex multi-table JOINs with aggregate functions (GROUP BY, HAVING)",
            "You need a high-performance key-based cache for session data"
          ],
          "correct": [0, 1, 3],
          "explanation": "Graph databases (NoSQL) excel when relationships ARE the data — traversing 3-hop connections in a protein network is inefficient with SQL JOINs (A ✓). Document stores handle flexible/variable schemas well (B ✓). Key-value stores (Redis) are the standard for high-performance caching (D ✓). Option C describes a strength of relational databases — complex aggregation queries are exactly what SQL and relational engines are optimised for.",
          "type": "multiple"
        },
        {
          "id": "L1Q4",
          "text": "An EMPLOYEE entity has a `College_degrees` attribute. Which attribute type BEST describes it?",
          "options": [
            "Atomic — a degree is a single indivisible value",
            "Derived — degrees can be computed from employment records",
            "Multivalued — an employee can hold multiple degrees simultaneously",
            "Stored vs derived is not applicable to this attribute"
          ],
          "correct": [2],
          "explanation": "Multivalued means one entity can have multiple values for the same attribute — an employee can hold a Bachelor's, Master's, and PhD at the same time. This is distinct from composite (a single value has sub-parts like institution + year + field) and derived (value computable from other stored data). Degrees are not derivable from employment records. Note: College_degrees could additionally be modeled as composite, but the key characteristic here is that there can be more than one.",
          "type": "single"
        },
        {
          "id": "L1Q5",
          "text": "Why can the ternary SUPPLY(SUPPLIER, PART, PROJECT) relationship NOT be replaced by three binary relationships?",
          "options": [
            "Ternary relationships always perform better than binary ones",
            "The three-way combination carries meaning that no binary pair can capture — you cannot distinguish which supplier delivers which part to which project using pairs alone",
            "SQL does not support binary relationships between three tables",
            "A ternary relationship requires fewer tables in the final schema"
          ],
          "correct": [1],
          "explanation": "The business fact is: \"Supplier S delivers Part P to Project J.\" Binary pairs (S-P, S-J, P-J) lose the ability to record which specific combination occurred. If supplier A supplies bolts to both project 1 and project 2, and also supplies nuts to project 1, binary relationships cannot distinguish these facts without reconstructing the ternary. The three-way combination is semantically atomic. Options A, C, D are all false.",
          "type": "single"
        },
        {
          "id": "L1Q6",
          "text": "EMPLOYEE has total participation in WORKS_FOR (EMPLOYEE ↔ DEPARTMENT, N:1). What does total participation mean here?",
          "options": [
            "Every department must have at least one employee",
            "Every employee must be assigned to exactly one department",
            "Every employee must be assigned to at least one department",
            "An employee can work for multiple departments"
          ],
          "correct": [2],
          "explanation": "Total participation means every entity in the participating type must appear in at least one relationship instance — no 'unassigned' employees are allowed. The N:1 cardinality adds the 'at most one' constraint. Together, total participation + N:1 = every employee works for exactly one department. Option B ('exactly one') is true by combining both constraints, but the total participation constraint alone only guarantees 'at least one'. Option A describes the department side, not the employee side.",
          "type": "single"
        },
        {
          "id": "L1Q7",
          "text": "DEPENDENT is a weak entity with `Name` as partial key, connected to EMPLOYEE via the DEPENDENTS_OF identifying relationship. What does 'partial key' mean?",
          "options": [
            "Name alone uniquely identifies any DEPENDENT across the entire database",
            "Name uniquely identifies a DEPENDENT only among the dependents of the same EMPLOYEE",
            "Name can be null for some dependents",
            "Name is derived from the EMPLOYEE's name"
          ],
          "correct": [1],
          "explanation": "A partial key provides uniqueness only within the scope of a single owner. Two employees can each have a dependent named 'Alice' — 'Alice' alone doesn't uniquely identify any dependent in the database. Only the combination (owner_employee, Name) is globally unique. This is why a weak entity cannot exist without its owner: the partial key + owner together form the full identifier. Option A describes a true (strong) key attribute.",
          "type": "single"
        },
        {
          "id": "L1Q8",
          "text": "Which statements about standard ER diagram notation are correct? Select ALL that apply.",
          "options": [
            "A double-border rectangle represents a weak entity type",
            "A dotted (dashed) ellipse represents a derived attribute",
            "Total participation is shown with a single line between entity type and relationship",
            "A double-border diamond represents an identifying relationship"
          ],
          "correct": [0, 1, 3],
          "explanation": "Standard ER notation: weak entity = double-border rectangle (A ✓); derived attribute = dotted ellipse (B ✓); total participation = DOUBLE line (C ✗ — single line is partial participation, double line is total); identifying relationship = double-border diamond (D ✓). The double line for total participation visually represents that every entity in the set must be 'connected' to the relationship.",
          "type": "multiple"
        }
      ],
      "flashcards": [
        {
          "front": "What are the 4 fundamental problems a DBMS solves?",
          "back": "1. Application programs ↔ data separation (schema changes don't break code).\n2. Data usage ↔ data management separation.\n3. Declarative access (user says 'what', not 'how').\n4. Multiple user views with controlled access rights."
        },
        {
          "front": "Schema vs Instance — what is the difference?",
          "back": "Schema = structure/blueprint (table headers, intension) — rarely changes.\nInstance = actual data (table rows, extension) — constantly updated.\nExample: Schema: Student(studno, name) / Instance: Student(123, Egger)"
        },
        {
          "front": "What is a weak entity type?",
          "back": "An entity type with no key attribute — cannot be uniquely identified on its own. Identified by: (1) an owner (strong) entity type, (2) an identifying relationship (total participation), (3) a partial key unique only among entities with the same owner."
        },
        {
          "front": "What are the 4 binary relationship cardinality ratios? Give one body example each.",
          "back": "1:1 — MANAGES (one manager per dept; one dept per manager).\n1:N — WORKS_FOR (N employees in 1 dept).\nN:1 — reverse of 1:N.\nM:N — WORKS_ON (employee on N projects; project has M employees)."
        },
        {
          "front": "When can a relationship attribute NOT be migrated to a participating entity?",
          "back": "In M:N relationships. The attribute belongs to the combination, not to either entity alone. Example: Hours in WORKS_ON (EMPLOYEE ↔ PROJECT) — weekly hours depend on which employee works on which project, not on the employee or project alone."
        },
        {
          "front": "What is total vs partial participation in ER modeling?",
          "back": "Total: every entity in the type MUST appear in ≥ 1 relationship instance (existence dependency). ER: double line.\nPartial: some entities may not participate. ER: single line.\nExample: EMPLOYEE total in WORKS_FOR → no unassigned employees."
        }
      ]
    }
  ]
}
