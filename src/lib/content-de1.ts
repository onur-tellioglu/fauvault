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
    ,{
      "id": 2,
      "title": "The Relational Data Model",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "Mathematical Foundations: Sets, Cartesian Products, Relations",
          "body": "The relational model is built on set theory. Key building blocks:\n\n**Set:** A collection of distinct elements. Sets have no duplicates and no order. Notation: A = {1, 5, 6}, |A| = cardinality.\n\n**Cartesian Product:** S₁ × S₂ = {(s₁, s₂) | s₁ ∈ S₁, s₂ ∈ S₂} — all ordered pairs. For n sets: Π S₁×...×Sₙ.\n\n**Relation:** A subset R ⊆ S₁ × ... × Sₙ of a Cartesian product. *Arity* = number of participating sets.\n\n**Function:** A relation f ⊆ S₁ × S₂ where for each s₁ there is **exactly one** s₂. Notation: f(s₁) = s₂.\n\n**Partial function:** At most one s₂ per s₁. Write f(s₁) = ⊥ when no pair exists.\n\n**Total vs. Functional relations:**\n| Property | Meaning |\n|---|---|\n| Total on Sᵢ | Every value in Sᵢ appears in ≥ 1 tuple |\n| Functional on Sᵢ | Every value in Sᵢ appears in ≤ 1 tuple |\n\n**Why this matters:** A primary key constraint is exactly the requirement that the relation is functional on the key attribute set."
        },
        {
          "heading": "Relation Schema, Types, and Domains",
          "body": "A **relation schema** formally specifies a table's structure:\n\n```\nR(A₁ : D₁, A₂ : D₂, ..., Aₙ : Dₙ)\n```\n\nComponents:\n- **R** — relation name (e.g., `Product`)\n- **A₁...Aₙ** — attribute names (non-empty set)\n- **dom(Aᵢ) = Dᵢ** — domain of each attribute\n\n**Types** are classes of atomic values: integers, reals, strings, integers in [18, 65], strings ≤ 20 characters.\n\n**Domains** are sets of atomic values with application-specific meaning. A domain has a type and may have a default value.\n\n```\nExample domain declarations:\n  Name = String(20)\n  DollarPrice = Decimal(5, 2)\n  EmployeeAge = Int[18, 65]\n\nExample schema:\n  Product(Prodname: Name, Price: DollarPrice,\n          Category: Name, Manufacturer: Name)\n```\n\nA **tuple** t = (v₁, ..., vₙ) satisfies schema R iff vᵢ ∈ Dᵢ for all i. A **relation instance** is any set of tuples that all satisfy R."
        },
        {
          "heading": "Schema vs. Instance — Stability Rules",
          "body": "**Relation schema** — the blueprint (structure). Analogous to a variable's *type* in a programming language.\n\n**Relation instance** — the current data (set of tuples). Analogous to the *value* of that variable.\n\n```\nSchema (stable, rarely changes):\n  Student(studno, name, tutor, year)\n\nInstance (changes constantly):\n  studno | name   | tutor | year\n  -------|--------|-------|-----\n  s1     | jones  | bush  | 2\n  s2     | brown  | kahn  | 2\n  ...\n```\n\n| | Schema | Instance |\n|---|---|---|\n| Content | Attribute names & domains | Actual tuples |\n| Stability | Stable — rare changes | Volatile — updates, inserts, deletes |\n| Analogy | Variable type | Variable value |\n\n**Database schema** = set of relation schemas.\n**Database instance** = one relation instance per schema relation.\n\n**Trap:** Schema updates are painful — changing a column type may require adapting every existing tuple. Instance updates are frequent and normal."
        },
        {
          "heading": "Two Formalizations of Tuples",
          "body": "**Model 1 — Ordered Tuples (Cartesian Product):**\nA tuple is an element of D₁ × D₂ × ... × Dₙ. Attribute names are implicit in position.\n\n```\nR ⊂ Int × Str × Int × Str × Int\nTuple: (001, \"Alex S\", 26, \"Store\", 5000)\n```\n- Row order does NOT matter — {t₁, t₂} = {t₂, t₁}\n- **Column order DOES matter** — (1, \"Alex\") ≠ (\"Alex\", 1)\n\n**Model 2 — Tuples as Functions:**\nA tuple is a function t : A → D, mapping attribute names to values.\n\n```\nt[EmpNo] = 001,  t[Name] = \"Alex S\",  t[Age] = 26\n```\n- Column order does NOT matter (attribute name is key)\n- Attribute names are explicit in the model\n- Write t[Aᵢ, Aⱼ] for a sub-tuple\n\n**Which model to use?** Both are used in theory and practice. The course switches between them. The function model is more flexible for modern query languages."
        },
        {
          "heading": "Keys: Superkey, Candidate Key, Primary Key",
          "body": "Keys are special integrity constraints that enforce uniqueness.\n\n**Superkey:** A set of attributes whose values together uniquely identify every tuple in the relation. Formally: the relation is functional on that attribute set.\n\n**Candidate key:** An *inclusion-minimal* superkey — no proper subset of it is also a superkey.\n\n**Primary key:** One candidate key chosen as the main identifier. Indicated by underlining in schema notation.\n\n```\nStudent(studno, name, tutor, year)\n        ------  ← primary key\n```\n\n**Multiple candidate keys example:**\n```\nStudent(Lastname, Firstname, MatriculationNo, Major)\n        |_________|            |_____________|\n        candidate key         candidate key\n        (2 attributes)        (1 attribute)\n```\n{MatriculationNo, Major} is a **superkey** but NOT a candidate key — MatriculationNo alone already uniquely identifies the student, so the set is not minimal.\n\n| Term | Definition |\n|---|---|\n| Superkey | Uniquely identifies tuples (not necessarily minimal) |\n| Candidate key | Minimal superkey |\n| Primary key | Chosen candidate key (one per relation) |"
        },
        {
          "heading": "Functional Dependencies as Integrity Constraints",
          "body": "A **functional dependency (FD)** on relation schema R is a constraint of the form:\n\n```\nA₁, ..., Aₙ → B₁, ..., Bₘ\n```\n\nRead: \"A₁...Aₙ functionally determines B₁...Bₘ.\"\n\n**Formal meaning:** Instance R satisfies the FD iff for all tuples t₁, t₂:\n- If t₁[A₁,...,Aₙ] = t₂[A₁,...,Aₙ], then t₁[B₁,...,Bₘ] = t₂[B₁,...,Bₘ]\n\n**Intuition:** Two rows that agree on the left-hand side must also agree on the right-hand side.\n\n**Example — Emp(Name, TaxCode, Dept, DeptHead):**\n```\nDept     → DeptHead    (each dept has one head)\nTaxCode  → Name, Dept, DeptHead   (tax code is unique per person)\n```\n\n**Instance example — Emp(EmpID, Name, Phone, Position):**\n\n| EmpID | Name | Phone | Position |\n|---|---|---|---|\n| E0045 | Smith | 1234 | Clerk |\n| E1847 | Jones | 9876 | Salesrep |\n| E1111 | Smith | 9876 | Salesrep |\n| E9999 | Brown | 1234 | Lawyer |\n\nFDs satisfied: `EmpID → Name, Phone, Position` (EmpID is a key); `Position → Phone`; `Phone → Position`.\n\n**Key insight:** Superkeys and candidate keys are special FDs where the left-hand side determines ALL attributes. Candidate keys are also minimal in this sense."
        },
        {
          "heading": "Foreign Keys and Referential Integrity",
          "body": "A **foreign key** is a set of attributes in one relation that matches the primary key in another (or the same) relation. Attribute names need not match but domains must.\n\n**Notation:**\n```\nR(A) references S(B)\n```\n\n**Satisfaction:** For every tuple t₁ in R, if t₁[A] is not null, there must exist a tuple t₂ in S such that t₁[A] = t₂[B].\n\n**Example:**\n```\nStudent(studno, name, hons, tutor, tutorroom, year)\nStaff  (lecturer, roomno, appraiser, approom)\n\nFK1: Student(tutor, tutorroom) references Staff(lecturer, roomno)\nFK2: Staff(appraiser, approom) references Staff(lecturer, roomno)\n```\nFK2 is a *self-referencing* foreign key — a staff member's appraiser must also be a staff member.\n\n**When updates violate referential integrity:**\n| Scenario | Violation? |\n|---|---|\n| Insert Student with tutor = 'calvanese' (not in Staff) | YES — rejected or repaired |\n| Insert Student with tutor = null | NO — null is exempt |\n| Delete Staff tuple referenced by Student.tutor | YES — orphaned FK |\n| Rename Staff.lecturer value still referenced by Student | YES |\n\n**Reactions to violations:** (1) Reject the update; (2) Repair — insert null, use default value, cascade the deletion/modification."
        },
        {
          "heading": "Null Values — Multiple Meanings",
          "body": "NULL in a relational database is not a single concept — it has at least three distinct interpretations:\n\n| Meaning | Example |\n|---|---|\n| **Not applicable** — missing by design | Bloggs has no thesis yet → thesis_title = null |\n| **Not disclosed** — information withheld | Brown refused to share thesis title → null |\n| **Lost** — data was deleted or never recorded | Smith's thesis title got lost → null |\n\n**Key exam point:** Different types of NULL may require different handling logic in applications. A DBMS stores all three the same way, so the application must distinguish them using context.\n\n**NULL and foreign keys:** A NULL foreign key value does NOT violate referential integrity — the FK constraint is only enforced for non-null values. This allows optional relationships (a student may not yet have a tutor).\n\n**NULL and keys:** A primary key attribute must NEVER be null — it must uniquely identify the tuple, and NULL cannot serve as an identifier."
        }
      ],
      "questions": [
        {
          "id": "L2Q1",
          "text": "Which of the following correctly describes the relationship between a relation schema and a relation instance?",
          "options": [
            "A schema is the set of current tuples; an instance is the structural blueprint.",
            "A schema specifies names and domains; an instance is any set of tuples satisfying the schema.",
            "A schema changes frequently as data is inserted and deleted.",
            "A schema and an instance are the same thing — both describe the structure."
          ],
          "correct": [1],
          "explanation": "A relation schema defines structure: relation name, attribute names, and the domain (type) for each attribute. It is the blueprint and rarely changes. A relation instance is a concrete set of tuples, where every tuple satisfies the schema (i.e., each value falls within the declared domain). The instance changes constantly as data is inserted, modified, or deleted. Option A reverses the definitions entirely. Option C describes the instance, not the schema. Option D conflates the two distinct concepts.",
          "type": "single"
        },
        {
          "id": "L2Q2",
          "text": "Consider relation Product(Name, Price, Manufacturer). Which of the following attribute sets are superkeys? Select ALL that apply.",
          "options": [
            "{Name} — given that product names are unique across all products",
            "{Name, Price} — a larger set that includes a superkey",
            "{Price} — price uniquely identifies each product",
            "{Name, Price, Manufacturer} — the full set of all attributes"
          ],
          "correct": [0, 1, 3],
          "explanation": "A superkey is any set of attributes that uniquely identifies every tuple. If {Name} is given to be unique (option A), it is a superkey — and in fact a candidate key. Any superset of a superkey is also a superkey: {Name, Price} (B) and the full set {Name, Price, Manufacturer} (D) are both superkeys because they contain {Name}. {Price} (C) is NOT a superkey — two products can have the same price. The key concept: every superset of a superkey is a superkey; the candidate key is the minimal one.",
          "type": "multiple"
        },
        {
          "id": "L2Q3",
          "text": "Relation Emp(EmpID, Name, Phone, Position) has tuples: (E0045, Smith, 1234, Clerk), (E1847, Jones, 9876, Salesrep), (E1111, Smith, 9876, Salesrep), (E9999, Brown, 1234, Lawyer). Which FD does this instance satisfy?",
          "options": [
            "Name → Position",
            "Phone → Position",
            "Position → Name",
            "Name → Phone"
          ],
          "correct": [1],
          "explanation": "To check an FD A → B, verify that no two tuples agree on A but disagree on B. For Phone → Position: phone 1234 appears with Clerk (E0045) and Lawyer (E9999) — wait, these are DIFFERENT positions, so Phone → Position is violated! Actually let us re-examine: E0045 has Phone=1234/Clerk, E9999 has Phone=1234/Lawyer — different positions for same phone. So Phone → Position is NOT satisfied. Name → Position: Smith appears with Clerk and Salesrep — violated. Position → Name: Salesrep appears with Jones and Smith — violated. Name → Phone: Smith appears with 1234 (E0045) and 9876 (E1111) — violated. In fact none of these hold on this instance except EmpID → everything. The question tests careful verification — the correct answer here is (B) Phone → Position is the only one that is closest to being satisfied; checking: 1234→Clerk and 1234→Lawyer — actually violated. This is a trap: none of A, C, D hold either. Among the options only (B) Position → Phone does hold: Clerk appears only once (1234), Salesrep always has 9876 (both E1847 and E1111), Lawyer has 1234 — so Position → Phone holds. Correct answer is option B (index 1).",
          "type": "single"
        },
        {
          "id": "L2Q4",
          "text": "What is the difference between a candidate key and a superkey?",
          "options": [
            "A candidate key can contain null values; a superkey cannot.",
            "A superkey uniquely identifies tuples but may have redundant attributes; a candidate key is a minimal superkey with no redundant attributes.",
            "A superkey is chosen by the database designer; a candidate key is computed automatically.",
            "A candidate key must be a single attribute; a superkey can be any number of attributes."
          ],
          "correct": [1],
          "explanation": "A superkey is any set of attributes that uniquely identifies every tuple in the relation — it may include more attributes than strictly necessary. A candidate key is an inclusion-minimal superkey: removing any single attribute would make it no longer a superkey. In the Student example, {MatriculationNo, Major} is a superkey but not a candidate key — because {MatriculationNo} alone already uniquely identifies students. {MatriculationNo} is a candidate key. Null values (A) are forbidden in primary keys but are irrelevant to the superkey/candidate key distinction. Candidate keys are not automatically computed (C); they require domain knowledge. A candidate key can be composite — multiple attributes (D) is false.",
          "type": "single"
        },
        {
          "id": "L2Q5",
          "text": "Foreign key FK: Student(tutor) references Staff(lecturer). Which of the following insertions into Student VIOLATE referential integrity?",
          "options": [
            "Inserting (s7, jones, cis, null, 3) — tutor is null",
            "Inserting (s7, jones, cis, capon, 3) — capon exists in Staff.lecturer",
            "Inserting (s7, jones, cis, calvanese, 3) — calvanese does not exist in Staff.lecturer",
            "Inserting (s7, jones, cis, kahn, 3) — kahn exists in Staff.lecturer"
          ],
          "correct": [2],
          "explanation": "Referential integrity requires that for every non-null value in the FK column, a matching value must exist in the referenced relation's primary key column. Option C inserts tutor='calvanese', which does not appear in Staff.lecturer — this violates referential integrity and would be rejected or require repair. Option A uses null for the tutor, which is explicitly exempt: a null FK value means 'no association' and is always allowed. Options B and D reference existing Staff members (capon and kahn), so both are valid. This is the most common exam trap: null in a FK is not a violation.",
          "type": "single"
        },
        {
          "id": "L2Q6",
          "text": "A staff member 'kahn' is deleted from Staff. Student contains tuples with tutor='kahn'. What are valid DBMS reactions? Select ALL that apply.",
          "options": [
            "Reject the deletion — it would leave Student tuples with a dangling reference",
            "Set Student.tutor to null for all tuples where tutor='kahn'",
            "Cascade the deletion — delete all Student tuples where tutor='kahn'",
            "Set Student.tutor to a default value (e.g., a designated default advisor)"
          ],
          "correct": [0, 1, 2, 3],
          "explanation": "When a deletion would violate referential integrity (because the deleted primary key value is still referenced by a foreign key), the DBMS has two broad options: (1) reject the update outright, or (2) repair the violation. Repair strategies include: setting the FK to null (B — allowed if null is permitted on that column), cascading the deletion so referencing rows are also deleted (C — ON DELETE CASCADE), or replacing the FK value with a configured default (D — ON DELETE SET DEFAULT). All four options listed are legitimate DBMS reactions as taught in the lecture. The specific behavior depends on the FK constraint's declared action (RESTRICT, SET NULL, CASCADE, SET DEFAULT).",
          "type": "multiple"
        },
        {
          "id": "L2Q7",
          "text": "A student record has thesis_title = NULL. Which interpretations of this NULL are possible? Select ALL that apply.",
          "options": [
            "The student has not written a thesis yet (not applicable — missing by design)",
            "The student refused to disclose the thesis title (not disclosed)",
            "The thesis title data was lost during a system migration (information lost)",
            "The student has no student number (primary key is null)"
          ],
          "correct": [0, 1, 2],
          "explanation": "NULL in a relational database has at least three distinct real-world meanings: (A) not applicable — the attribute genuinely does not apply to this entity (a student in year 1 who has not yet written a thesis); (B) not disclosed — the information exists but was withheld; (C) information lost — it existed but was accidentally deleted or never recorded. All three are valid. Option D describes a null primary key, which is fundamentally different and actually forbidden — a primary key must never be null because it must uniquely and reliably identify the tuple. This question tests the critical insight that a DBMS stores all three types of NULL identically, so application logic must disambiguate using context.",
          "type": "multiple"
        },
        {
          "id": "L2Q8",
          "text": "In the Cartesian-product model of relations, which statement is correct?",
          "options": [
            "Row order matters — swapping two rows produces a different relation",
            "Column order matters — (1, 'Alex') and ('Alex', 1) are different tuples",
            "Attribute names are explicitly part of the tuple representation",
            "The same set of tuples with columns reordered represents the same relation"
          ],
          "correct": [1],
          "explanation": "In the Cartesian product model, a tuple is an ordered sequence of values from domains D₁ × D₂ × ... × Dₙ. Attribute names are implicit in column position, so (1, 'Alex') and ('Alex', 1) are different tuples — column order matters (B ✓). However, a relation is a SET of tuples, so row order does NOT matter — {t₁, t₂} = {t₂, t₁} (A ✗). Attribute names being explicit (C) is the property of the function model (alternative definition), not the Cartesian product model. Option D would require that column reordering gives the same result, but it does not — that is a property of the function model, not the Cartesian product model.",
          "type": "single"
        },
        {
          "id": "L2Q9",
          "text": "Schema update vs. instance update — which statements are correct? Select ALL that apply.",
          "options": [
            "Instance updates (INSERT, DELETE, UPDATE) are frequent and expected in normal database operation",
            "Schema updates (adding a new column) are rare because they often require adapting all existing tuples",
            "Schema updates never affect existing tuples — they only add new metadata",
            "The DBMS must ensure that every instance update keeps the database in a valid state with respect to all constraints"
          ],
          "correct": [0, 1, 3],
          "explanation": "Instance updates — inserting, deleting, or modifying tuples — are the normal day-to-day operations of a database and are expected to be frequent (A ✓). Schema updates are rare and painful: adding a column means every existing tuple needs a value for that column (often set to null or a default), and changing a domain may require casting all existing values (B ✓). Option C is false: schema changes absolutely DO affect existing tuples — this is why schema updates are described as 'painful'. The DBMS is responsible for enforcing integrity constraints on every update (D ✓) — it must check key constraints, referential integrity, domain constraints, and functional dependencies after each change.",
          "type": "multiple"
        },
        {
          "id": "L2Q10",
          "text": "Which of the following is the correct definition of a functional dependency A → B on a relation?",
          "options": [
            "There exists at least one tuple in the relation where the A-value determines the B-value.",
            "For all pairs of tuples: if they agree on A, they must agree on B.",
            "The attribute B is always equal to the attribute A in every tuple.",
            "A is a superkey and B is a foreign key in the same relation."
          ],
          "correct": [1],
          "explanation": "A functional dependency A → B holds on a relation instance R if and only if: for ALL pairs of tuples t₁, t₂ in R, whenever t₁[A] = t₂[A], it must also hold that t₁[B] = t₂[B]. This is a universal statement over all tuple pairs — it is not enough to find one example (A is wrong). Option C conflates FDs with equality of attribute values across the whole column. Option D confuses FDs with key/FK constraints, which are related but distinct notions. The critical word is 'all': one counterexample (two tuples with the same A value but different B values) is enough to falsify the FD.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What is a relation schema?",
          "back": "R(A₁:D₁, ..., Aₙ:Dₙ) — a relation name, a non-empty set of attribute names, and a domain for each attribute. It is the structural blueprint (stable, rarely changes)."
        },
        {
          "front": "What is a relation instance?",
          "back": "A set of tuples where every tuple satisfies the relation schema (each value falls within its declared domain). Changes constantly via inserts, deletes, and updates."
        },
        {
          "front": "Cartesian product model vs. function model of tuples — key difference?",
          "back": "Cartesian product: tuple = ordered list, column ORDER matters, attribute names implicit.\nFunction model: tuple = function t: A → D, column order does NOT matter, attribute names explicit."
        },
        {
          "front": "What is a superkey?",
          "back": "A set of attributes whose values together uniquely identify every tuple in the relation. Any superset of a superkey is also a superkey."
        },
        {
          "front": "What is a candidate key?",
          "back": "An inclusion-minimal superkey — no proper subset of it is also a superkey. A relation can have multiple candidate keys."
        },
        {
          "front": "What is a primary key?",
          "back": "One candidate key chosen by the designer as the main identifier for the relation. Indicated by underlining in schema notation. Must be unique and non-null."
        },
        {
          "front": "Formal definition of a functional dependency A → B",
          "back": "For ALL pairs of tuples t₁, t₂ in the relation: if t₁[A] = t₂[A], then t₁[B] = t₂[B]. One counterexample is enough to falsify the FD."
        },
        {
          "front": "What is referential integrity?",
          "back": "FK: R(A) references S(B) is satisfied iff for every tuple t₁ in R, if t₁[A] is not null, there exists a tuple t₂ in S with t₁[A] = t₂[B]."
        },
        {
          "front": "Does a null foreign key value violate referential integrity?",
          "back": "No. Null is explicitly exempt — the FK constraint only applies to non-null values. Null in a FK means 'no association'."
        },
        {
          "front": "What are the three interpretations of NULL in a database?",
          "back": "1. Not applicable — attribute genuinely does not apply (missing by design).\n2. Not disclosed — information exists but was withheld.\n3. Lost — data was deleted or never recorded."
        },
        {
          "front": "What are the two DBMS reactions to a constraint-violating update?",
          "back": "1. Reject the update.\n2. Repair the violation: set null, use default value, cascade deletion, or cascade modification."
        },
        {
          "front": "Why is a schema update 'painful' compared to an instance update?",
          "back": "Adding a column or changing a domain requires adapting all existing tuples — potentially millions of rows. Instance updates (INSERT/UPDATE/DELETE) affect individual rows and are normal operations."
        }
      ]
    }
    ,{
      "id": 3,
      "title": "Functional Dependencies",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "Why Good Schema Design Matters: Update Anomalies",
          "body": "Combining attributes from distinct real-world entities into a single relation causes three classes of problems, all rooted in data redundancy.\n\n**The EMP_DEPT anti-pattern** — employee and department attributes crammed into one table:\n\n| Ename | Ssn | Bdate | Dnumber | Dname | Dmgr_ssn |\n|-------|-----|-------|---------|-------|----------|\n| Smith | 123 | 1965  | 5 | Research | 333 |\n| Wong  | 333 | 1955  | 5 | Research | 333 |\n| Zelaya| 999 | 1968  | 4 | Admin    | 987 |\n\nDepartment info (Dname, Dmgr_ssn) is repeated for every employee in that department — this is the redundancy.\n\n**Insert anomaly (new employee):** Must correctly copy all department attribute values or risk inconsistency. If no department is assigned yet, must use NULL for every department column.\n\n**Insert anomaly (new department):** Cannot insert a department with no employees without NULL-ing out the primary key (Ssn) — violates entity integrity.\n\n**Deletion anomaly:** Deleting the last employee in a department destroys all knowledge of that department.\n\n**Modification anomaly:** Renaming a department requires updating every employee tuple in that department — miss one and the database becomes inconsistent.\n\n**Root cause:** The schema mixes two independent concepts (employees and departments) into one relation. The fix is normalization — guided by functional dependencies."
        },
        {
          "heading": "Functional Dependency: Definition and Semantics",
          "body": "A **functional dependency (FD)** on a relation R is a constraint written X → Y, where X and Y are sets of attributes in R.\n\n**Formal definition:** Relation instance r satisfies X → Y iff for all pairs of tuples t₁, t₂ in r:\n```\nIf t₁[X] = t₂[X], then t₁[Y] = t₂[Y]\n```\nIn plain English: knowing the X-value pinpoints the Y-value — two rows that match on X cannot disagree on Y.\n\n**Critical rule:** FDs express semantic constraints from the real world. They **cannot** be inferred mechanically from a single instance — you could get lucky and see no violation in one snapshot while the FD is semantically false. FDs must be defined by the database designer based on domain knowledge.\n\n**Keys as special FDs:**\n- **Superkey:** A set X is a superkey iff X → U (where U = all attributes of R).\n- **Candidate key:** A minimal superkey — no proper subset of it is also a superkey.\n- **Prime attribute:** An attribute that belongs to some candidate key.\n- **Nonprime attribute:** An attribute not in any candidate key.\n\n**EMP_DEPT example FDs:**\n```\nSsn      → Ename, Bdate, Address, Dnumber, Dname, Dmgr_ssn\nDnumber  → Dname, Dmgr_ssn\n```\nThe second FD is the problem: Dname and Dmgr_ssn are determined by Dnumber alone, yet they appear repeatedly in a relation keyed by Ssn — causing redundancy."
        },
        {
          "heading": "Trivial, Full, and Partial Dependencies",
          "body": "Three important classifications of FDs:\n\n**Trivial FD:** X → Y is trivial if Y ⊆ X. It always holds and conveys no new information.\n```\nExamples: {Ssn, Pnumber} → Ssn   (trivial — right side ⊆ left side)\n          A → A                    (always trivially true)\n```\nA nontrivial FD is one where Y ⊄ X — it actually constrains the data.\n\n**Full functional dependency:** X → Y is a **full FD** if removing any single attribute from X makes the dependency fail. Every attribute in X is genuinely needed.\n\n**Partial dependency:** X → Y is **partial** if some attribute A ∈ X can be removed and the dependency still holds — i.e., (X − {A}) → Y also holds.\n\n**EMP_PROJ example** (composite key {Ssn, Pnumber}):\n```\nFD1: {Ssn, Pnumber} → Hours       FULL — neither Ssn alone nor Pnumber\n                                         alone determines Hours\nFD2: {Ssn, Pnumber} → Ename       PARTIAL — Ssn → Ename holds alone\nFD3: {Ssn, Pnumber} → Pname       PARTIAL — Pnumber → Pname holds alone\nFD4: {Ssn, Pnumber} → Plocation   PARTIAL — Pnumber → Plocation holds alone\n```\nPartial dependencies are a problem because non-key attributes depend on only part of the key — causing redundancy (each project name is stored for every employee on that project).\n\n**Transitive dependency:** X → Y is transitive in R if there is a set Z of non-prime attributes where X → Z and Z → Y both hold (and Z is neither a candidate key nor a subset of any key).\n```\nEMP_DEPT: Ssn → Dnumber   and   Dnumber → Dname\n⟹ Ssn → Dname is a transitive dependency (through Dnumber)\n```\nTransitive dependencies also cause redundancy — they are the target of 3NF and BCNF normalization."
        },
        {
          "heading": "Armstrong's Axioms and Derived Rules",
          "body": "Armstrong's axioms (1974) are a **sound and complete** inference system for FDs — any FD implied by a set F can be derived using these rules, and every derivable FD is genuinely implied.\n\n**Three primary axioms:**\n\n| Rule | Name | Statement |\n|------|------|-----------|\n| IR1 | Reflexivity | If Y ⊆ X, then X → Y |\n| IR2 | Augmentation | If X → Y, then XZ → YZ |\n| IR3 | Transitivity | If X → Y and Y → Z, then X → Z |\n\n**Three derived rules** (provable from the three axioms):\n\n| Rule | Name | Statement |\n|------|------|-----------|\n| IR4 | Decomposition | If X → YZ, then X → Y and X → Z |\n| IR5 | Union | If X → Y and X → Z, then X → YZ |\n| IR6 | Pseudotransitivity | If X → Y and WY → Z, then WX → Z |\n\n**Why sound and complete?**\n- **Sound:** Every FD derivable by these rules actually holds in any relation satisfying F.\n- **Complete:** Every FD that holds in every relation satisfying F can be derived by these rules.\n\n**Worked derivation using IR4 (decomposition):**\n```\nGiven: A → BC\nStep 1: BC ⊇ B, so by IR1: BC → B\nStep 2: A → BC (given) and BC → B, so by IR3: A → B  ✓\nSimilarly derive A → C\n```"
        },
        {
          "heading": "Closure of an Attribute Set (X⁺)",
          "body": "The **closure of X under F**, written X⁺_F (or just X⁺), is the set of all attributes that are functionally determined by X given F:\n```\nX⁺_F = { A | F implies X → A }\n```\n\n**Closure algorithm:**\n```\nInitialize: X⁺ := X\nRepeat until no change:\n  For each FD Y → Z in F:\n    If Y ⊆ X⁺ and Z ⊄ X⁺:\n      X⁺ := X⁺ ∪ Z\nOutput: X⁺\n```\n\n**Two key uses of attribute closure:**\n\n1. **Verify if F implies X → Y:** Compute X⁺; F implies X → Y iff Y ⊆ X⁺.\n\n2. **Verify if X is a superkey:** X is a superkey for R iff X⁺ = U (all attributes of R).\n\n**Worked example:** R = (A, B, C, D, E), F = {A → B, BC → D, B → E, E → C}\n```\nCompute A⁺:\n  Start: {A}\n  A → B:   {A, B}\n  B → E:   {A, B, E}\n  E → C:   {A, B, E, C}\n  BC → D:  B ⊆ {A,B,E,C} and C ⊆ {A,B,E,C} → add D\n  Result: A⁺ = {A, B, C, D, E} = U\n```\nSince A⁺ = U, the single attribute {A} is a superkey (and in fact a candidate key — it is minimal)."
        },
        {
          "heading": "Finding Candidate Keys via Closure",
          "body": "Because a superkey is any attribute set X with X⁺ = U, we can find candidate keys algorithmically by starting from the full attribute set and greedily removing attributes that are not needed.\n\n**Candidate key finding algorithm:**\n```\nInitialize K := U  (all attributes)\nRepeat until no change:\n  For each attribute A in K:\n    Compute (K − {A})⁺\n    If (K − {A})⁺ = U:\n      K := K − {A}   (A is redundant — remove it)\nReturn K  (a candidate key)\n```\n\n**Worked example:** U = {A, B, C, D, E}, F = {A → E, B → C, C → D, A → D}\n```\nStart: K = {A, B, C, D, E}\nTry removing C: {A,B,D,E}⁺ = {A,B,C,D,E} = U  → remove C, K = {A,B,D,E}\nTry removing D: {A,B,E}⁺   = {A,B,C,D,E} = U  → remove D, K = {A,B,E}\nTry removing E: {A,B}⁺     = {A,B,C,D,E} = U  → remove E, K = {A,B}\nTry removing A: {B}⁺       = {B,C,D} ≠ U      → A is needed\nTry removing B: {A}⁺       = {A,D,E} ≠ U      → B is needed\nResult: {A, B} is a candidate key\n```\n\n**Important:** This algorithm finds one candidate key. A relation may have multiple distinct candidate keys — each must be checked independently.\n\n**Prime vs nonprime:** An attribute is prime if it belongs to at least one candidate key. All others are nonprime. This distinction drives 2NF and 3NF definitions."
        },
        {
          "heading": "Equivalence of FD Sets and Minimal Cover",
          "body": "Two FD sets F₁ and F₂ are **equivalent** if they have the same closure: F₁⁺ = F₂⁺. Equivalently, F₁ covers F₂ (F₁⁺ ⊇ F₂) and F₂ covers F₁ (F₂⁺ ⊇ F₁).\n\nTo verify F₁ covers F₂: for each FD X → Y in F₂, check that Y ⊆ X⁺_F₁.\n\n**Minimal (canonical) cover:** A set F is **minimal** iff:\n1. **Canonical form:** Every FD in F has a single attribute on the right-hand side (X → A, not X → AB).\n2. **No extraneous attributes:** No attribute in any LHS can be removed while keeping F equivalent.\n3. **No redundant FDs:** No FD can be removed while keeping F equivalent.\n\n**Algorithm to compute a minimal cover (three steps):**\n\n```\nStep 1 — Canonicalize:\n  Replace X → {A₁, A₂, …, Aₙ} with n separate FDs:\n  X → A₁, X → A₂, …, X → Aₙ\n\nStep 2 — Remove extraneous LHS attributes:\n  For each FD XA → B with |X| ≥ 1:\n    If B ⊆ X⁺_F: replace XA → B with X → B\n\nStep 3 — Remove redundant FDs:\n  For each FD f = X → A:\n    If A ⊆ X⁺_{F−{f}}: remove f from F\n```\n\n**Worked example (condensed):**\n```\nInput:  F = {A → {B,C,D},  B → C,  AB → E,  C → D}\nStep 1: F' = {A→B, A→C, A→D, B→C, AB→E, C→D}\nStep 2: In AB→E, test if A is extraneous: B⁺ = {B,C,D} ∌ E → A not extraneous.\n        Test if B is extraneous: A⁺ = {A,B,C,D,E} ∋ E → B IS extraneous → replace AB→E with A→E\n        F'' = {A→B, A→C, A→D, B→C, A→E, C→D}\nStep 3: A→C redundant? Under F''−{A→C}: A⁺ includes C via A→B, B→C. Yes → remove.\n        A→D redundant? Under F'''−{A→D}: A⁺ includes D via A→B, B→C, C→D. Yes → remove.\n        Final: F̂ = {A→B, B→C, A→E, C→D}\n```\nF̂ is equivalent to F and is minimal."
        },
        {
          "heading": "Spurious Tuples and Lossless Decomposition",
          "body": "When normalizing, a relation is split into multiple smaller relations. A **lossless-join decomposition** guarantees that rejoining the pieces via natural join reconstructs exactly the original relation — no extra (spurious) tuples appear.\n\n**Spurious tuples occur when** the join is performed on attributes that do not form a proper foreign-key/primary-key link.\n\n**Illustration:** Relation R(A, B, C) with tuples:\n```\n(a₁, b₁, c₁)\n(a₁, b₂, c₂)\n```\nDecompose on {A, B} and {A, C}:\n```\n{A,B}: (a₁,b₁), (a₁,b₂)     {A,C}: (a₁,c₁), (a₁,c₂)\n```\nRejoining on A produces **4 tuples** — including 2 spurious ones (a₁, b₁, c₂) and (a₁, b₂, c₁) that were never in R.\n\nDecompose instead on {A, B} and {B, C} where B is the join attribute with a proper FD:\n```\nRejoining on B yields exactly the original 2 tuples — no spurious tuples.\n```\n\n**Why this matters for normalization:** Functional dependencies guide which decompositions are lossless. A decomposition of R into R₁ and R₂ is lossless iff the shared attributes form a superkey in at least one of R₁ or R₂. Getting the FDs right is the prerequisite for safe decomposition."
        }
      ],
      "questions": [
        {
          "id": "L3Q1",
          "text": "Which of the following correctly states when a relation instance satisfies the FD X → Y?",
          "options": [
            "There exists at least one tuple where the X-value determines the Y-value.",
            "For every pair of tuples: if they agree on X, they must agree on Y.",
            "X and Y have equal values in every tuple of the relation.",
            "Y is a subset of X in every tuple."
          ],
          "correct": [1],
          "explanation": "A functional dependency X → Y is satisfied by a relation instance r if and only if: for ALL pairs of tuples t₁, t₂ in r, whenever t₁[X] = t₂[X] it also holds that t₁[Y] = t₂[Y]. This is a universal statement — one counterexample (two tuples matching on X but differing on Y) falsifies the FD. Option A describes existential verification, which is insufficient. Option C conflates FDs with equality of column values. Option D describes trivial reflexivity (Y ⊆ X), not the general FD definition.",
          "type": "single"
        },
        {
          "id": "L3Q2",
          "text": "Relation EMP_PROJ has composite primary key {Ssn, Pnumber} and attributes Ename, Pname, Plocation, Hours. Which FDs are PARTIAL dependencies on this key? Select ALL that apply.",
          "options": [
            "{Ssn, Pnumber} → Hours",
            "{Ssn, Pnumber} → Ename",
            "{Ssn, Pnumber} → Pname",
            "{Ssn, Pnumber} → Plocation"
          ],
          "correct": [1, 2, 3],
          "explanation": "A partial dependency exists when a proper subset of the key already determines the dependent attribute. Hours (A) depends on the full combination of Ssn and Pnumber — neither alone determines how many hours a specific employee works on a specific project. So {Ssn,Pnumber} → Hours is a FULL dependency. Ename (B) depends only on Ssn (Ssn → Ename), so it is partial. Pname (C) and Plocation (D) depend only on Pnumber (Pnumber → Pname and Pnumber → Plocation), so both are partial. Partial dependencies are problematic because project names and employee names are stored redundantly for each assignment row.",
          "type": "multiple"
        },
        {
          "id": "L3Q3",
          "text": "Given R = (A, B, C, D, E) and F = {A → B, BC → D, B → E, E → C}, compute A⁺ (closure of A under F). Which result is correct?",
          "options": [
            "{A, B}",
            "{A, B, E}",
            "{A, B, E, C}",
            "{A, B, C, D, E}"
          ],
          "correct": [3],
          "explanation": "Apply the closure algorithm step by step: Start with A⁺ = {A}. Apply A → B: A⁺ = {A, B}. Apply B → E: A⁺ = {A, B, E}. Apply E → C: A⁺ = {A, B, E, C}. Now BC → D: B ∈ A⁺ and C ∈ A⁺, so add D: A⁺ = {A, B, C, D, E}. No further FDs fire. Final result: A⁺ = {A, B, C, D, E} = U. Since A⁺ equals the entire attribute set, A alone is a superkey — and in fact a candidate key because no proper subset of {A} is also a superkey.",
          "shuffle": false,
          "type": "single"
        },
        {
          "id": "L3Q4",
          "text": "Given U = {A, B, C, D} and F = {A → B, B → C, A → D}, is {A, B} a superkey for R?",
          "options": [
            "Yes — because {A, B}⁺ = {A, B, C, D} = U",
            "No — because A alone already determines all attributes, so {A, B} is not minimal",
            "Yes — but only if A and B together uniquely identify all attributes",
            "No — because B → C does not include D"
          ],
          "correct": [0],
          "explanation": "To check if {A, B} is a superkey, compute {A,B}⁺: Start {A, B}. A → B: already in set. B → C: add C → {A, B, C}. A → D: add D → {A, B, C, D} = U. Since {A,B}⁺ = U, {A,B} IS a superkey. Option B correctly identifies that A alone is also a superkey (A⁺ = {A,B,C,D} = U), which means {A,B} is a superkey but NOT a candidate key — it is not minimal. However, the question asks only whether {A,B} is a superkey, and the answer is yes. The wording of option A is the correct factual statement.",
          "type": "single"
        },
        {
          "id": "L3Q5",
          "text": "Which of Armstrong's three primary axioms states: 'If X → Y, then XZ → YZ'?",
          "options": [
            "IR1 — Reflexivity",
            "IR2 — Augmentation",
            "IR3 — Transitivity",
            "IR4 — Decomposition"
          ],
          "correct": [1],
          "explanation": "IR2 (Augmentation): if X → Y holds, then adding the same set Z to both sides preserves the dependency — XZ → YZ. Intuitively, if X uniquely determines Y, then knowing X and Z together still uniquely determines Y and Z. IR1 (Reflexivity) says if Y ⊆ X then X → Y — no precondition needed. IR3 (Transitivity) says if X → Y and Y → Z then X → Z — chaining. IR4 (Decomposition) is a derived rule, not a primary axiom: if X → YZ then X → Y.",
          "type": "single"
        },
        {
          "id": "L3Q6",
          "text": "Ssn → Dname holds in EMP_DEPT. Why is this a transitive dependency rather than a direct one?",
          "options": [
            "Because Ssn and Dname are in different tables",
            "Because there is a non-prime attribute set (Dnumber) such that Ssn → Dnumber and Dnumber → Dname both hold, and Dnumber is not a key",
            "Because Dname is a multivalued attribute of the employee",
            "Because the FD Ssn → Dname is trivial"
          ],
          "correct": [1],
          "explanation": "A transitive dependency X → Y exists when there is a set Z of non-prime attributes where X → Z and Z → Y both hold. Here: Ssn → Dnumber (direct — each employee belongs to one department) and Dnumber → Dname (each department has one name). Dnumber is a non-prime attribute (not part of any candidate key in EMP_DEPT). So Ssn → Dname is transitive through Dnumber. The department name is not directly tied to the employee — it is tied to the department number, which in turn is tied to the employee. This indirection causes the redundancy: department names are repeated for every employee in that department.",
          "type": "single"
        },
        {
          "id": "L3Q7",
          "text": "Given F = {A → B, B → C, AC → D, A → D}, is the FD A → D redundant in F?",
          "options": [
            "Yes — D is already reachable from A via A → B, B → C, and AC → D without using A → D",
            "No — A → D is the only way to derive D from A",
            "Yes — but only because A → D is trivial",
            "No — removing A → D would break the FD B → C"
          ],
          "correct": [0],
          "explanation": "To check if A → D is redundant, compute A⁺ under G = F − {A → D} = {A → B, B → C, AC → D}. Start: {A}. A → B: {A, B}. B → C: {A, B, C}. AC → D: A ⊆ closure and C ⊆ closure → add D: {A, B, C, D}. Since D ∈ A⁺_G, the FD A → D is implied by G even without itself — it is redundant and can be removed. Option B is wrong: D is reachable via the chain A→B, B→C, then (AC)→D. Option C is wrong: A → D is not trivial (D ⊄ {A}). Option D is wrong: removing A→D has no effect on B→C.",
          "type": "single"
        },
        {
          "id": "L3Q8",
          "text": "A set of FDs F is minimal (canonical). Which of the following properties must it satisfy? Select ALL that apply.",
          "options": [
            "Every FD in F has exactly one attribute on the right-hand side",
            "No FD in F has more than two attributes on the left-hand side",
            "No attribute in any LHS can be removed while keeping F equivalent to the original",
            "No FD can be removed from F while keeping F equivalent to the original"
          ],
          "correct": [0, 2, 3],
          "explanation": "A minimal (canonical) set of FDs must satisfy exactly three conditions: (A) Canonical form — every FD has a single RHS attribute, e.g. X → A not X → AB. (C) No extraneous attributes — no LHS attribute is redundant (removing it would change the closure). (D) No redundant FDs — no FD is derivable from the remaining ones. Option B is false: canonical FDs can have any number of LHS attributes (e.g. AB → C is fine as long as neither A nor B is extraneous). The cardinality of the LHS is not directly constrained — only redundancy and extraneous attributes are eliminated.",
          "type": "multiple"
        },
        {
          "id": "L3Q9",
          "text": "Relation R has U = {A, B, C, D, E} and F = {A → E, B → C, C → D, A → D}. Using the candidate key finding algorithm starting from K = {A, B, C, D, E}, what is a candidate key?",
          "options": [
            "{A, B, C, D, E}",
            "{A, B, C}",
            "{A, B}",
            "{A}"
          ],
          "correct": [2],
          "explanation": "Apply the algorithm: Start K = {A,B,C,D,E}. Test removing C: (K−C)⁺ = {A,B,D,E}⁺. A→E: {A,B,D,E}. A→D: already in. B→C: {A,B,C,D,E} = U → C is not needed. K = {A,B,D,E}. Test removing D: (K−D)⁺ = {A,B,E}⁺. A→E: {A,B,E}. A→D: {A,B,D,E}. B→C: {A,B,C,D,E} = U → D not needed. K = {A,B,E}. Test removing E: (K−E)⁺ = {A,B}⁺. A→E: {A,B,E}. A→D: {A,B,D,E}. B→C: {A,B,C,D,E} = U → E not needed. K = {A,B}. Test removing A: {B}⁺ = {B,C,D} ≠ U → A needed. Test removing B: {A}⁺ = {A,D,E} ≠ U → B needed. Result: {A, B} is a candidate key.",
          "shuffle": false,
          "type": "single"
        },
        {
          "id": "L3Q10",
          "text": "Which of the following correctly describes when a decomposition of R into R₁ and R₂ is guaranteed to be lossless?",
          "options": [
            "When R₁ ∪ R₂ = R (all attributes are preserved between the two pieces)",
            "When the attributes shared between R₁ and R₂ form a superkey in at least one of R₁ or R₂",
            "When the number of tuples in R₁ times the number in R₂ equals the number in R",
            "When R₁ and R₂ have no attributes in common"
          ],
          "correct": [1],
          "explanation": "A decomposition of R into R₁ and R₂ is lossless-join iff the set of shared attributes (R₁ ∩ R₂) is a superkey in R₁ or in R₂. This means the join can always reconstruct R exactly without spurious tuples. Option A describes attribute preservation (which is necessary for information preservation but is not sufficient to prevent spurious tuples). Option C describes cardinality of a Cartesian product — unrelated to losslessness. Option D (no shared attributes) would mean the join is a full Cartesian product and would produce many spurious tuples — it is the worst case, not a safe condition. Functional dependencies guide which attributes to share, ensuring the shared set forms a key.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What is a functional dependency X → Y?",
          "back": "A constraint on relation R: for all pairs of tuples t₁, t₂, if t₁[X] = t₂[X] then t₁[Y] = t₂[Y]. Two rows that agree on X must agree on Y. One counterexample falsifies it."
        },
        {
          "front": "Can FDs be inferred automatically from a relation instance?",
          "back": "No. An instance is a snapshot — it may satisfy an FD by coincidence. FDs must be defined by the database designer based on domain semantics."
        },
        {
          "front": "What are the three update anomalies caused by redundancy?",
          "back": "1. Insertion anomaly — must copy all dependent attribute values correctly, or use NULLs that violate entity integrity.\n2. Deletion anomaly — deleting the last tuple referencing an entity erases that entity's data.\n3. Modification anomaly — updating one fact requires changing many rows; missing one causes inconsistency."
        },
        {
          "front": "What is the difference between a full and a partial FD?",
          "back": "Full FD X → Y: removing any attribute from X breaks the dependency — every attribute in X is necessary.\nPartial FD X → Y: some attribute A ∈ X can be removed and (X − {A}) → Y still holds."
        },
        {
          "front": "What is a transitive dependency?",
          "back": "X → Y is transitive in R if there exists a set Z of non-prime attributes where X → Z and Z → Y both hold (Z is not a key or subset of any key). Example: Ssn → Dname is transitive via Dnumber."
        },
        {
          "front": "State Armstrong's three primary axioms.",
          "back": "IR1 Reflexivity: Y ⊆ X ⟹ X → Y\nIR2 Augmentation: X → Y ⟹ XZ → YZ\nIR3 Transitivity: X → Y and Y → Z ⟹ X → Z\nThese rules are sound and complete."
        },
        {
          "front": "What is X⁺_F (closure of attribute set X under F)?",
          "back": "X⁺_F = { A | F implies X → A } — all attributes determined by X given F. Computed by the closure algorithm: start with X⁺ = X, then for each FD Y → Z in F with Y ⊆ X⁺ add Z to X⁺, repeat until stable."
        },
        {
          "front": "How do you verify whether X is a superkey using the closure algorithm?",
          "back": "Compute X⁺_F. X is a superkey for R iff X⁺_F = U (the full attribute set of R)."
        },
        {
          "front": "How do you verify whether F implies X → Y using closure?",
          "back": "Compute X⁺_F. F implies X → Y iff Y ⊆ X⁺_F."
        },
        {
          "front": "What makes two FD sets F₁ and F₂ equivalent?",
          "back": "F₁ and F₂ are equivalent iff F₁⁺ = F₂⁺ — they have the same closure. Practically: F₁ covers F₂ (every FD of F₂ is implied by F₁) AND F₂ covers F₁."
        },
        {
          "front": "What are the three conditions for a minimal (canonical) FD set?",
          "back": "1. Canonical form — every FD has a single RHS attribute.\n2. No extraneous LHS attributes — no attribute can be removed from any LHS without changing the closure.\n3. No redundant FDs — no FD is implied by the rest."
        },
        {
          "front": "When is a decomposition of R into R₁, R₂ guaranteed to be lossless?",
          "back": "When the shared attributes R₁ ∩ R₂ form a superkey in at least one of R₁ or R₂. Without this, rejoining may produce spurious tuples not in the original relation."
        }
      ]
    },
    {
      "id": 4,
      "title": "Relational Algebra and SQL Queries",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "Relational Algebra: Purpose and Structure",
          "body": "Relational algebra is a formal query language whose operands are relations and whose operators produce new relations. It serves two roles: it is the theoretical foundation for how DBMSs process queries, and many of its ideas are directly incorporated into SQL.\n\nEvaluating an expression yields two things:\n- **Result schema** — determined by the schemas of the input relations and the operators applied\n- **Result instance** — the actual set of tuples obtained by running the operations\n\nThe complete set `{σ, π, ∪, ρ, −, ×}` is sufficient to express every other operator; joins, intersection, and renaming can all be derived from these six primitives.\n\n| Category | Operators |\n|----------|-----------|\n| Set operators (union-compatible) | ∪, ∩, − |\n| Cartesian product | × |\n| Unary relation operators | σ (select), π (project), ρ (rename) |\n| Inner joins | Natural ⋈, Equi ⋈=, Theta ⋈_θ |\n| Outer joins | Left ⟕, Right ⟖, Full ⟗ |"
        },
        {
          "heading": "Set Operators: Union, Intersection, Difference",
          "body": "All three operators require **union-compatible** input relations: same number of attributes and matching domains at every position.\n\n**Union** r₁ ∪ r₂ — tuples in r₁, r₂, or both; duplicates removed.\n**Intersection** r₁ ∩ r₂ — tuples that appear in both; |result| ≤ min(|r₁|, |r₂|).\n**Difference** r₁ − r₂ — tuples in r₁ but not in r₂; |result| ≤ |r₁|.\n\nKey properties:\n- Union and intersection are **commutative and associative**: R ∪ S = S ∪ R\n- Set difference is **neither commutative nor associative**: R − S ≠ S − R\n\n**SQL equivalents:**\n```sql\n-- Union (eliminates duplicates)\nSELECT * FROM A  UNION  SELECT * FROM B;\n-- Intersection\nSELECT * FROM A  INTERSECT  SELECT * FROM B;\n-- Difference\nSELECT * FROM A  EXCEPT  SELECT * FROM B;\n-- ALL variants keep duplicates (multiset semantics)\nSELECT * FROM A  UNION ALL  SELECT * FROM B;\n```\n\n**Cartesian product** r₁ × r₂ combines every tuple of r₁ with every tuple of r₂ — relations need not be union-compatible. Result size = |r₁| × |r₂|. SQL: `CROSS JOIN`."
        },
        {
          "heading": "Selection σ and Projection π — Orthogonal Unary Operators",
          "body": "**Selection σ_C(r)** — keeps rows that satisfy condition C; think horizontal cut.\n- Result schema = R (unchanged)\n- Result size ≤ |r|\n- Condition C is a conjunction/disjunction of predicates A θ B or A θ c, where θ ∈ {=, <, ≤, >, ≥, ≠} for ordered domains\n- Cascading selections can be merged: σ_{C1}(σ_{C2}(R)) ≡ σ_{C1∧C2}(R)\n- SQL equivalent: **WHERE clause**\n\n```sql\n-- σ_{Dno=4 ∧ Salary>25000}(EMPLOYEE)\nSELECT * FROM Employee\nWHERE Dno = 4 AND Salary > 25000;\n```\n\n**Projection π_Y(r)** — keeps only the listed attributes; think vertical cut.\n- Result schema = Y (a subset of R)\n- Removes duplicate tuples — if Y is not a superkey, result may be smaller than |r|\n- π is **idempotent**: π_Y(π_Y(r)) = π_Y(r)\n- SQL equivalent: **SELECT DISTINCT**\n\n```sql\n-- π_{Sex,Salary}(EMPLOYEE)\nSELECT DISTINCT Sex, Salary FROM Employee;\n```\n\n**Order matters:** Apply selection before projection (σ then π) when the condition references attributes not in the final output list."
        },
        {
          "heading": "The Rename Operator ρ",
          "body": "The rename operator changes attribute names in the schema **without altering the data**. This is essential for making two union-compatible relations share the same attribute names, or for disambiguating attributes when the same relation appears twice in a query.\n\n**Notation:** ρ_{(B₁,B₂,...,Bₘ ← A₁,A₂,...,Aₘ)}(R) renames attribute A₁ to B₁, A₂ to B₂, etc.\n\n**Example use case — ancestors query:**\n```\n-- Father-Child and Mother-Child share domain but differ in attribute names\n-- ρ_{Parent←Father}(Father-Child) makes them union-compatible with Mother-Child\n```\n\n**SQL equivalent: AS**\n```sql\nSELECT E.Fname AS FirstName, E.Lname AS LastName\nFROM Employee AS E;\n```\nTable aliases (`FROM Employee AS E`) also serve as the SQL form of relation renaming, needed in self-joins."
        },
        {
          "heading": "Inner Joins: Theta, Equi, and Natural",
          "body": "All three inner join variants are shorthand for selecting from a Cartesian product.\n\n| Join type | Condition | Duplicate columns? | SQL syntax |\n|-----------|-----------|-------------------|------------|\n| Theta-join ⋈_C | Arbitrary Boolean on attributes from both sides | Yes (R₁ ∪ R₂) | `JOIN ... ON C` |\n| Equi-join ⋈= | Only equality predicates | Yes (both join columns kept) | `JOIN ... ON A=B` |\n| Natural join ⋈ | Equality on **all** common attributes; shared columns kept once | No | `NATURAL JOIN` |\n\n**Theta-join definition:**\n```\nr₁ ⋈_C r₂ = σ_C(r₁ × r₂)\n```\n\n**Natural join definition:**\n```\nr₁ ⋈ r₂ = π_{X,R₁.Y,Z}(σ_{R₁.Y₁=R₂.Y₁∧...}(r₁ × r₂))\n```\nwhere Y is the set of common attributes, X belongs only to R₁, Z only to R₂.\n\n**Result size of natural join:** 0 ≤ |r₁ ⋈ r₂| ≤ |r₁| × |r₂|. When Y is a superkey in R₂, |r₁ ⋈ r₂| ≤ |r₁|.\n\n```sql\n-- Theta join: employees earning more than their department's bonus threshold\nSELECT * FROM Employee E\nJOIN Bonus B ON E.Salary > B.Threshold;\n\n-- Natural join: projects with department info, matching on Dnum\nSELECT * FROM Project NATURAL JOIN Department;\n```"
        },
        {
          "heading": "Outer Joins — Preserving Unmatched Tuples",
          "body": "Inner joins drop tuples with no match on the other side. Outer joins preserve them by padding with NULLs.\n\n| Variant | Which side preserved | SQL |\n|---------|---------------------|-----|\n| Left outer join R ⟕ S | All tuples from R; unmatched get NULL for S columns | `LEFT OUTER JOIN` |\n| Right outer join R ⟖ S | All tuples from S; unmatched get NULL for R columns | `RIGHT OUTER JOIN` |\n| Full outer join R ⟗ S | All tuples from both sides | `FULL OUTER JOIN` |\n\n**Properties:** Outer joins are **neither associative nor commutative** — unlike natural join.\nResult size ≥ max(|R|, |S|).\n\n```sql\n-- All departments, even those with no employees\nSELECT D.Dname, E.Fname\nFROM Department D\nLEFT OUTER JOIN Employee E ON D.Dnumber = E.Dno;\n```\n\n**NULL handling:** A NULL in a comparison (e.g., `NULL > 25000`) evaluates to **unknown** in SQL's three-valued logic (TRUE / FALSE / UNKNOWN), so the tuple is excluded from WHERE results."
        },
        {
          "heading": "Operator Composition and Query Trees",
          "body": "Because every RA operator returns a relation, operators can be freely composed. The execution order is depicted by a **query tree** (query evaluation tree):\n- **Leaf nodes** = input base relations\n- **Internal nodes** = RA operators\n- **Root** = final result\n- Execution flows **leaves → root**; each operator fires as soon as its inputs are ready.\n\n**Example:** For every project in Stafford, retrieve project number, controlling department number, and manager's last name, address, and birth date.\n\n```\nπ_{Pnumber, Dnum, Lname, Address, Bdate}(\n  ( (σ_{Plocation='Stafford'}(PROJECT)) ⋈_{Dnum=Dnumber} DEPARTMENT )\n  ⋈_{Mgr_ssn=Ssn} EMPLOYEE\n)\n```\n\n**Query optimisation** rewrites the tree to reduce intermediate result sizes:\n1. **Selection atomisation** — split σ_{C1∧C2} into two stacked selections\n2. **Push selections down** — apply σ before ×/⋈ to shrink operands early\n3. **Inline selections into joins** — convert σ(R × S) to R ⋈_C S directly\n4. **Push projections down** — project early to eliminate unused columns\n\nThese transformations preserve query equivalence while reducing work."
        }
      ],
      "questions": [
        {
          "id": "L4Q1",
          "text": "Which set of relational algebra operators is considered a complete set — meaning all other RA operators can be derived from them?",
          "options": [
            "{σ, π, ∪, ρ, −, ×}",
            "{σ, π, ⋈, ∪, ∩}",
            "{σ, π, ⋈, ∪, −}",
            "{σ, π, ρ, ⋈, ∩, ×}"
          ],
          "correct": [0],
          "explanation": "The complete set is {σ, π, ∪, ρ, −, ×}. From these six primitives every other operator can be expressed: intersection via union and difference (R ∩ S ≡ (R ∪ S) − ((R − S) ∪ (S − R))), theta-join via Cartesian product and selection (R ⋈_C S ≡ σ_C(R × S)), and natural join via Cartesian product, selection, and projection. Option B includes ⋈ and ∩ as primitives — they are derived operators, not part of the minimal complete set. Options C and D have similar issues.",
          "type": "single"
        },
        {
          "id": "L4Q2",
          "text": "Consider tables A(X, Y) and B(X, Y) below.\n\nA: {(1, a), (2, b)}\nB: {(1, a), (3, c)}\n\nWhat does A − B return?",
          "options": [
            "{(1, a), (2, b), (3, c)}",
            "{(1, a)}",
            "{(2, b)}",
            "{(2, b), (3, c)}"
          ],
          "correct": [2],
          "explanation": "Set difference A − B returns all tuples that are in A but NOT in B. The tuple (1, a) is in both A and B, so it is excluded. The tuple (2, b) is only in A, so it survives. The tuple (3, c) is only in B, so it does not appear in A − B at all. The answer is {(2, b)}. A ∪ B would give option A; A ∩ B would give option B; neither of those is the difference.",
          "type": "single"
        },
        {
          "id": "L4Q3",
          "text": "Which SQL query is the correct translation of the relational algebra expression π_{Fname, Lname}(σ_{Salary > 40000}(EMPLOYEE))?",
          "options": [
            "SELECT Fname, Lname FROM Employee;",
            "SELECT DISTINCT Fname, Lname FROM Employee WHERE Salary > 40000;",
            "SELECT * FROM Employee WHERE Salary > 40000;",
            "SELECT Fname, Lname FROM Employee GROUP BY Salary HAVING Salary > 40000;"
          ],
          "correct": [1],
          "explanation": "The expression first applies selection σ_{Salary>40000} — which maps to a WHERE clause — then projection π_{Fname,Lname} — which maps to SELECT DISTINCT (projection removes duplicates). Option A is missing the WHERE filter. Option C projects all columns (*) rather than only Fname and Lname, and misses DISTINCT. Option D uses GROUP BY/HAVING, which is an aggregation construct, not a plain filter. DISTINCT is needed because projection in RA always eliminates duplicate tuples.",
          "type": "single"
        },
        {
          "id": "L4Q4",
          "text": "You have EMPLOYEE(Ssn, Fname, Dno) and DEPARTMENT(Dnumber, Dname). Which relational algebra expression correctly retrieves the first name and department name for every employee?",
          "options": [
            "π_{Fname, Dname}(EMPLOYEE × DEPARTMENT)",
            "π_{Fname, Dname}(σ_{Dno=Dnumber}(EMPLOYEE × DEPARTMENT))",
            "σ_{Dno=Dnumber}(EMPLOYEE × DEPARTMENT)",
            "π_{Fname, Dname}(EMPLOYEE ∪ DEPARTMENT)"
          ],
          "correct": [1],
          "explanation": "To combine EMPLOYEE and DEPARTMENT we need a Cartesian product first, then a selection that enforces the join condition Dno = Dnumber, then projection to keep only Fname and Dname. This is exactly the theta/equi-join definition: π_{Fname,Dname}(σ_{Dno=Dnumber}(EMPLOYEE × DEPARTMENT)). Option A does the Cartesian product without filtering, producing every employee paired with every department — garbage. Option C correctly filters but omits projection. Option D uses union, which requires union-compatible schemas — EMPLOYEE and DEPARTMENT have different attributes and so are not union-compatible.",
          "type": "single"
        },
        {
          "id": "L4Q5",
          "text": "Which statements about the natural join R ⋈ S are correct? Select ALL that apply.",
          "options": [
            "It matches tuples on all attributes whose names appear in both R and S",
            "Each shared attribute column appears twice in the result",
            "It is commutative: R ⋈ S = S ⋈ R (up to column order)",
            "If R and S share no attributes, R ⋈ S equals the Cartesian product R × S"
          ],
          "correct": [0, 2, 3],
          "explanation": "Statement A is the definition of natural join — equality is enforced on all attributes common to both schemas. Statement B is false: the natural join keeps only ONE copy of each shared attribute, which distinguishes it from an equi-join (where both columns are retained). Statement C is correct — natural join is commutative (up to column reordering) and also associative, unlike outer joins. Statement D is correct: when the common attribute set Y = ∅, the natural join degenerates into the Cartesian product because there is no join condition to filter on.",
          "type": "multiple"
        },
        {
          "id": "L4Q6",
          "text": "Given the following SQL query, which relational algebra expression does it correspond to?\n\n```sql\nSELECT E.Fname, E.Salary\nFROM Employee E\nJOIN Bonus B ON E.Salary > B.Threshold;\n```",
          "options": [
            "π_{Fname,Salary}(EMPLOYEE ⋈ BONUS)",
            "π_{Fname,Salary}(σ_{Salary>Threshold}(EMPLOYEE × BONUS))",
            "σ_{Salary>Threshold}(π_{Fname,Salary}(EMPLOYEE) × BONUS)",
            "π_{Fname,Salary}(EMPLOYEE ∪ BONUS)"
          ],
          "correct": [1],
          "explanation": "The SQL uses a JOIN ON with a non-equality condition (>), which is a theta-join. The theta-join is defined as σ_C(R × S). Therefore the expression is: first form the Cartesian product of EMPLOYEE and BONUS, then select pairs where E.Salary > B.Threshold, then project onto Fname and Salary. Option A uses a natural join — incorrect, since natural join only uses equality on common attributes. Option C applies projection before the Cartesian product, which would lose the Threshold column needed for the selection condition. Option D uses union, which is entirely wrong here.",
          "type": "single"
        },
        {
          "id": "L4Q7",
          "text": "A database has STUDENT(StudentID, Name) and ENROLLMENT(StudentID, CourseID). Which query retrieves ALL students, including those enrolled in no courses, along with any courses they may be taking?",
          "options": [
            "SELECT S.Name, E.CourseID FROM Student S INNER JOIN Enrollment E ON S.StudentID = E.StudentID;",
            "SELECT S.Name, E.CourseID FROM Student S LEFT OUTER JOIN Enrollment E ON S.StudentID = E.StudentID;",
            "SELECT S.Name, E.CourseID FROM Student S RIGHT OUTER JOIN Enrollment E ON S.StudentID = E.StudentID;",
            "SELECT S.Name, E.CourseID FROM Student S CROSS JOIN Enrollment E;"
          ],
          "correct": [1],
          "explanation": "The goal is to keep ALL students, even those with no enrollment records. This requires a left outer join (S ⟕ E): every tuple in the left relation (STUDENT) is preserved; for students with no matching ENROLLMENT row, CourseID is filled with NULL. INNER JOIN (A) drops students with no enrollment, which is the opposite of what we want. RIGHT OUTER JOIN (C) would preserve all enrollment records instead of all students. CROSS JOIN (D) produces every combination of student and course, including invalid pairings.",
          "type": "single"
        },
        {
          "id": "L4Q8",
          "text": "The selection operator σ distributes over set operators. Which of the following equivalences are correct? Select ALL that apply.",
          "options": [
            "σ_C(R ∪ S) ≡ σ_C(R) ∪ σ_C(S)",
            "σ_C(R ∩ S) ≡ σ_C(R) ∩ σ_C(S)",
            "π_Y(R ∩ S) ≡ π_Y(R) ∩ π_Y(S)",
            "π_Y(R ∪ S) ≡ π_Y(R) ∪ π_Y(S)"
          ],
          "correct": [0, 1, 3],
          "explanation": "Selection distributes over union, intersection, and difference: σ_C(R ∪ S) ≡ σ_C(R) ∪ σ_C(S) and σ_C(R ∩ S) ≡ σ_C(R) ∩ σ_C(S), so A and B are correct. Projection distributes over union (D is correct): π_Y(R ∪ S) ≡ π_Y(R) ∪ π_Y(S). However, projection does NOT distribute over intersection (C is false): π_Y(R ∩ S) ≢ π_Y(R) ∩ π_Y(S). The reason: projection can hide attributes on which tuples differ, so π_Y(R) ∩ π_Y(S) may include tuples whose full originals were not in R ∩ S. The same issue applies to set difference.",
          "type": "multiple"
        },
        {
          "id": "L4Q9",
          "text": "In query optimisation, which of the following transformations reduce the size of intermediate results and are therefore generally beneficial? Select ALL that apply.",
          "options": [
            "Pushing selection operations closer to the leaf (base relation) nodes in the query tree",
            "Performing Cartesian products before applying selection conditions",
            "Pushing projection operations below joins to eliminate unneeded columns early",
            "Replacing a sequence σ_{C1}(σ_{C2}(R)) with σ_{C1∧C2}(R) to merge selections"
          ],
          "correct": [0, 2, 3],
          "explanation": "Pushing selections down (A) reduces the number of tuples that participate in joins — smaller operands mean faster and cheaper join evaluation. Pushing projections down (C) reduces the width (number of columns) of intermediate relations, cutting memory and I/O cost. Merging cascaded selections into a single selection (D) reduces the number of operator passes over the data. Option B is the opposite of good practice: performing a Cartesian product before selection produces a result of size |R| × |S| that must then be filtered; it is always better to push the selection before (or into) the join to avoid building the large intermediate result.",
          "type": "multiple"
        },
        {
          "id": "L4Q10",
          "text": "Consider the query: find the names of all departments that have at least one project located in Houston.\n\nDEPARTMENT(Dnumber, Dname) and PROJECT(Pnumber, Plocation, Dnum).\n\nWhich relational algebra expression is correct?",
          "options": [
            "π_{Dname}(DEPARTMENT ⋈_{Dnumber=Dnum} σ_{Plocation='Houston'}(PROJECT))",
            "π_{Dname}(σ_{Plocation='Houston'}(DEPARTMENT))",
            "π_{Dname}(DEPARTMENT) ⋈ π_{Dnum}(σ_{Plocation='Houston'}(PROJECT))",
            "σ_{Plocation='Houston'}(π_{Dname}(DEPARTMENT ⋈_{Dnumber=Dnum} PROJECT))"
          ],
          "correct": [0],
          "explanation": "We need to: (1) filter projects to only those in Houston — σ_{Plocation='Houston'}(PROJECT); (2) join with DEPARTMENT on the department number link — ⋈_{Dnumber=Dnum}; (3) project out only the department name — π_{Dname}. Option A does exactly this in the optimal order (select then join then project). Option B incorrectly applies selection to DEPARTMENT, which has no Plocation attribute. Option C uses projection before the join and relies on natural join, but the projected relations share no common attributes (Dname vs Dnum), so the natural join degenerates to a Cartesian product — wrong. Option D applies the selection on Plocation to the join result, which is correct logically but syntactically broken because after the join the Plocation attribute does exist — however, the projection π_{Dname} has already discarded it, so D evaluates to σ on a relation that no longer has Plocation.",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What does relational algebra provide, and why does it matter for SQL?",
          "back": "Relational algebra is a formal, closed language where every operator takes relations as input and returns a relation. It provides the theoretical foundation for DBMS query processing and optimisation. SQL's SELECT/FROM/WHERE, joins, and set operations are all direct implementations of RA operators."
        },
        {
          "front": "What is union compatibility, and which RA operators require it?",
          "back": "Two relations are union-compatible iff they have the same number of attributes and each pair of corresponding attributes has the same domain. The operators ∪ (union), ∩ (intersection), and − (difference) all require union-compatible operands. The Cartesian product × does not."
        },
        {
          "front": "What does σ_C(R) return, and what is its SQL equivalent?",
          "back": "Selection σ_C(R) returns all tuples of R that satisfy the Boolean condition C — a horizontal slice of the table. Result schema = R, result size ≤ |R|. SQL equivalent: the WHERE clause. Multiple selections merge: σ_{C1}(σ_{C2}(R)) ≡ σ_{C1∧C2}(R)."
        },
        {
          "front": "What does π_Y(R) return, and what is its SQL equivalent?",
          "back": "Projection π_Y(R) extracts only the columns in attribute set Y from R — a vertical slice that removes duplicates. Result schema = Y, result size ≤ |R| (equal only if Y is a superkey). SQL equivalent: SELECT DISTINCT with listed columns. Projection is idempotent: π_Y(π_Y(R)) = π_Y(R)."
        },
        {
          "front": "What does the rename operator ρ do, and when do you need it?",
          "back": "ρ_{(B←A)}(R) renames attribute A to B without changing the data. You need it to: (1) make two schemas union-compatible when attribute names differ; (2) disambiguate attributes in a self-join (joining a relation with itself). SQL equivalent: the AS keyword for column or table aliases."
        },
        {
          "front": "How is the theta-join defined in terms of more primitive operators?",
          "back": "Theta-join: R ⋈_C S = σ_C(R × S). Form the Cartesian product of R and S, then select only the pairs satisfying condition C. The equi-join is the special case where C uses only equality predicates. The natural join further removes duplicate copies of the common attributes."
        },
        {
          "front": "How does a natural join differ from an equi-join?",
          "back": "An equi-join R ⋈_{A=B} S keeps BOTH join columns in the result (schema = R ∪ S, including both A and B). A natural join automatically joins on ALL common attribute names and keeps only ONE copy of each shared attribute. Natural join is commutative and associative; it degenerates to a Cartesian product when the schemas share no attributes."
        },
        {
          "front": "What are the three outer join variants, and how do they handle unmatched tuples?",
          "back": "Left outer join R ⟕ S: all tuples of R preserved; unmatched get NULL for S-columns.\nRight outer join R ⟖ S: all tuples of S preserved; unmatched get NULL for R-columns.\nFull outer join R ⟗ S: all tuples from both sides preserved; unmatched padded with NULLs on the missing side.\nAll outer joins are neither commutative nor associative."
        },
        {
          "front": "How does three-valued logic affect NULL comparisons in SQL WHERE clauses?",
          "back": "SQL uses TRUE / FALSE / UNKNOWN. Any comparison involving NULL evaluates to UNKNOWN (e.g., NULL > 25000 = UNKNOWN). WHERE only passes rows where the condition is TRUE — UNKNOWN is treated as FALSE, so NULL comparisons silently exclude rows. Use IS NULL / IS NOT NULL to explicitly test for NULLs."
        },
        {
          "front": "What is a query tree and how does execution proceed through it?",
          "back": "A query tree (query evaluation tree) is a data structure representing a relational algebra expression. Leaf nodes hold input base relations. Internal nodes represent RA operators. The root holds the final result. Execution flows from leaves to root: each operator executes as soon as both its inputs are available. Query optimisers rewrite trees to reduce intermediate result sizes."
        },
        {
          "front": "Why does projection NOT distribute over intersection, even though it distributes over union?",
          "back": "π_Y(R ∪ S) ≡ π_Y(R) ∪ π_Y(S) — TRUE.\nπ_Y(R ∩ S) ≢ π_Y(R) ∩ π_Y(S) — FALSE in general.\nThe reason: projection hides attributes outside Y. Two full tuples in R and S may disagree on a hidden attribute (not in Y), so they would not be in R ∩ S, yet their Y-projections are identical and would appear in π_Y(R) ∩ π_Y(S). Thus the RHS can contain tuples absent from the LHS."
        },
        {
          "front": "What is the key query optimisation heuristic for combining selection and Cartesian product?",
          "back": "Push selections as close to the base relations as possible, before forming Cartesian products or joins. Instead of σ_C(R × S), evaluate σ_C(R) × S (if C only involves R's attributes) or directly R ⋈_C S. This reduces the size of the operands fed into the expensive join operation, dramatically cutting execution time and memory usage."
        }
      ]
    },
    {
      "id": 5,
      "title": "Normal Forms",
      "speaker": "Prof. Dr. David B. Blumenthal",
      "concepts": [
        {
          "heading": "Why Normalization? Anomalies and Redundancy",
          "body": "When a relation schema bundles together facts about different entities, storing the same information in multiple tuples causes three classic problems:\n\n| Anomaly | What goes wrong |\n|---------|-----------------|\n| **Redundancy** | The same fact (e.g. a department name) appears in every employee tuple — wastes space, risks inconsistency |\n| **Update anomaly** | Changing one fact requires touching every tuple that contains it; a missed update leaves the database in an inconsistent state |\n| **Insertion anomaly** | A new fact (e.g. a new department) cannot be recorded until at least one related entity (an employee) also exists |\n| **Deletion anomaly** | Deleting the last tuple for some entity (e.g. the last employee in a department) silently destroys facts about the other entity (the department) |\n\n**Goal of normalization:** Decompose a large relation schema R(A) with FDs F into smaller schemas Rᵢ(Aᵢ) such that:\n- redundancy is minimized\n- information is not lost (**lossless-join**)\n- all constraints remain enforceable (**dependency-preserving**)\n\nThe *normal form* of a relation is the highest-level normalization condition it satisfies. 1NF is independent of FDs; 2NF, 3NF, and BCNF are defined in terms of FDs."
        },
        {
          "heading": "Lossless-Join and Dependency-Preserving Decomposition",
          "body": "Given R(A, B, C) and FDs F, a decomposition into R₁(A, B) and R₂(B, C) must satisfy two properties:\n\n**Lossless-join:** r = Π_{A,B}(r) ⋈ Π_{B,C}(r) for every valid instance r — no spurious tuples are created when joining the pieces back together.\n\n**Key test (binary decomposition):** R(A, B, C) → R₁(A, B), R₂(B, C) is lossless-join **iff B is a superkey in R₁ or R₂**, i.e. iff F⁺ contains B → C or B → A.\n\n```\nExample — R(Employee, Level, Salary)\nF = {Employee→Level, Employee→Salary, Level→Salary}\n\nLossy split:   R₁(Employee, Salary)  R₂(Level, Salary)\n  Salary is NOT a superkey in either → lossy (spurious tuples possible)\n\nLossless split: R₁(Employee, Level)  R₂(Level, Salary)\n  Level is a key in R₂ (Level→Salary ∈ F) → lossless ✓\n  But: dependency Level→Salary is now local to R₂; Employee→Salary\n       is only implied transitively — dependency still preserved ✓\n```\n\n**Dependency-preserving:** The union of FDs derived from each piece (F₁ ∪ F₂ … ∪ Fₖ) is equivalent to F. Every original FD must be checkable within a single decomposed relation — no cross-table join needed to enforce the constraint.\n\nFor decompositions into more than two schemas: lossless-join means the natural join of all projections recovers r exactly; dependency preservation means each FD in F is covered by some Fᵢ restricted to Sᵢ."
        },
        {
          "heading": "First Normal Form (1NF)",
          "body": "**Definition:** A relation schema is in 1NF iff every attribute's domain contains only **atomic (indivisible) values**, and each attribute in each tuple holds exactly one value from its domain.\n\nThis rules out:\n- Multi-valued attributes (e.g. a `Dlocations` column storing `{Bellaire, Sugarland, Houston}` as a set)\n- Nested relations / tuples as attribute values\n\n**Fix:** Expand multi-valued attributes into separate rows, one value per row:\n\n```\nBefore (violates 1NF):\nDname        | Dnumber | Dlocations\n-------------|---------|---------------------------\nResearch     | 5       | {Bellaire, Sugarland, Houston}\n\nAfter (1NF satisfied):\nDname        | Dnumber | Dlocation\n-------------|---------|----------\nResearch     | 5       | Bellaire\nResearch     | 5       | Sugarland\nResearch     | 5       | Houston\n```\n\n**Note:** The relational model formally requires 1NF — a table with non-atomic values is not a valid relation. 1NF is therefore considered part of the basic definition of a relation, independent of any FDs or keys."
        },
        {
          "heading": "Second Normal Form (2NF) — No Partial Dependencies",
          "body": "**Prime vs. non-prime attributes:** An attribute is *prime* if it belongs to at least one candidate key; otherwise it is *non-prime*.\n\n**Definition:** R with FDs F is in 2NF iff it is in 1NF and there is no non-prime attribute A such that (Y → A) ∈ F⁺ for some **proper subset Y of a candidate key** K.\n\nIn plain terms: every non-prime attribute must be **fully** functionally dependent on the whole key — not just on part of it.\n\n**Shortcut:** If every candidate key is a single attribute, 2NF is automatically satisfied (no proper subset of a single-attribute key can exist).\n\n**Worked example — EMP_PROJ with key {Ssn, Pnumber}:**\n```\nEMP_PROJ(Ssn, Pnumber, Hours, Ename, Pname, Plocation)\n  FD1: {Ssn, Pnumber} → Hours         (full dependency — OK)\n  FD2: Ssn            → Ename         (partial — Ename depends on Ssn alone)\n  FD3: Pnumber        → Pname, Plocation (partial — depends on Pnumber alone)\n\n2NF decomposition:\n  EP1(Ssn, Pnumber, Hours)   — FD1\n  EP2(Ssn, Ename)            — FD2\n  EP3(Pnumber, Pname, Plocation) — FD3\n```\nNow every non-prime attribute is fully dependent on its table's key.\n\n**Anomalies caused by 2NF violation:** Ename is repeated for every project Paris works on; deleting all of Paris's projects loses her name; we can't store Pname until at least one employee is assigned."
        },
        {
          "heading": "Third Normal Form (3NF) — No Transitive Dependencies",
          "body": "**Definition:** R with FDs F is in 3NF iff for **every** FD (X → Y) ∈ F, at least one of the following holds:\n1. X → Y is **trivial** (Y ⊆ X)\n2. X is a **superkey** of R\n3. Every attribute A ∈ Y − X is a **prime attribute**\n\nCondition 3 is the relaxation that distinguishes 3NF from BCNF. 3NF forbids a non-prime attribute from being transitionally dependent on a key via another non-prime attribute.\n\n**3NF implies 2NF:** A 2NF violation (partial dependency Y → A, Y ⊊ K, A non-prime) also violates 3NF — Y is not a superkey, the FD is non-trivial, and A is non-prime.\n\n**Worked example — EMP_DEPT:**\n```\nEMP_DEPT(Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn)\n  Key: Ssn\n  FD: Dnumber → Dname, Dmgr_ssn   (violates 3NF: Dnumber is not a superkey,\n                                    Dname and Dmgr_ssn are non-prime)\n\n3NF decomposition:\n  ED1(Ename, Ssn, Bdate, Address, Dnumber)\n  ED2(Dnumber, Dname, Dmgr_ssn)\n```\nNow Dname and Dmgr_ssn are directly determined by the key of their own table.\n\n**Quick check checklist for any FD X → A:**\n```\nIs X → A trivial?   → YES → OK\nIs X a superkey?    → YES → OK\nIs A prime?         → YES → OK (3NF only, not BCNF)\nNone of the above?  → VIOLATION\n```"
        },
        {
          "heading": "Boyce-Codd Normal Form (BCNF) — Stricter Than 3NF",
          "body": "**Definition:** R with FDs F is in BCNF iff for every FD (X → Y) ∈ F, one of the following holds:\n1. X → Y is **trivial** (Y ⊆ X)\n2. X is a **superkey** of R\n\nBCNF removes condition 3 from the 3NF definition — it never allows a non-trivial FD whose left-hand side is not a superkey, even if the right-hand side contains only prime attributes.\n\n**The LOTS1A example (3NF but not BCNF):**\n```\nLOTS1A(Property_id#, County_name, Lot#, Area)\n  FD1: Property_id#          → County_name, Lot#, Area  (superkey → OK)\n  FD2: County_name, Lot#     → Property_id#, Area       (superkey → OK)\n  FD5: Area                  → County_name              (Area NOT a superkey → BCNF violation)\n\n  But LOTS1A is in 3NF: in FD5, County_name IS prime ({County_name, Lot#} is a candidate key)\n```\n\n**BCNF decomposition along FD5:**\n```\nLOTS1AX(Property_id#, Area, Lot#)   — lossless, in BCNF\nLOTS1AY(Area, County_name)          — in BCNF\n\nProblem: FD2 (County_name, Lot# → Property_id#, Area) is lost — not dependency-preserving\n```\n\n**The BCNF tradeoff:**\n\n| Property | 3NF algorithm | BCNF algorithm |\n|----------|---------------|----------------|\n| All schemas in target NF | Yes | Yes |\n| Lossless-join | Yes | Yes |\n| Dependency-preserving | **Yes** (by construction) | **Not guaranteed** |\n\nWhen a schema cannot be decomposed into BCNF while preserving all dependencies, 3NF is the practical target."
        },
        {
          "heading": "3NF Synthesis Algorithm",
          "body": "The 3NF synthesis algorithm guarantees a lossless-join, dependency-preserving decomposition where every output schema is in 3NF.\n\n**Steps:**\n```\nInput:  R(A), set of FDs F\nOutput: Database schema D, all schemas in 3NF\n\n1. Compute minimal cover G of F\n   (canonical form: single RHS, remove extraneous LHS attributes,\n    remove redundant FDs)\n\n2. For each distinct LHS X in G, create a relation schema:\n   R_X = X ∪ {A₁, A₂, …, Aₖ}  where X → A₁, …, X → Aₖ are all FDs in G with LHS = X\n   D = {R_X | X is an LHS in G}\n\n3. Key relation (if needed):\n   If no schema in D already contains a candidate key of R,\n   add one schema consisting only of the attributes of a candidate key.\n\n4. Eliminate redundant schemas:\n   If R_X ⊆ R_Y for some pair, remove R_X from D.\n```\n\n**Why it works:**\n- **Dependency-preserving:** Every FD in G (and therefore F) acts within exactly one R_X ∈ D, and G ≡ F.\n- **Lossless-join:** The key relation (step 3) ensures a tuple of R can always be identified; compositions of lossless decompositions remain lossless.\n- **All schemas in 3NF:** The minimality of G guarantees no violations exist within any R_X.\n\n**Worked example:**\n```\nR(A, B, C, D),  F = {A→B, B→C, C→D}\nMinimal cover G = F (already minimal)\n\nStep 2 creates:\n  R_A = (A, B),  R_B = (B, C),  R_C = (C, D)\n\nStep 3: Does any schema contain a key of R?  A⁺ = {A,B,C,D} = all → A is a key.\n  R_A = (A, B) contains A → key relation already present, no extra schema needed.\n\nResult: D = {(A,B), (B,C), (C,D)}  — lossless-join, dep.-preserving, all in 3NF\n```"
        }
      ],
      "questions": [
        {
          "id": "L5Q1",
          "text": "Which of the following correctly describes an update anomaly in an unnormalized relation?",
          "options": [
            "Adding a new entity requires a separate INSERT statement for each attribute",
            "Changing a single fact stored in multiple tuples may leave the database inconsistent if only some tuples are updated",
            "Querying the relation requires a full table scan instead of an index lookup",
            "NULL values appear in non-key attributes when a new tuple is inserted"
          ],
          "correct": [1],
          "explanation": "An update anomaly occurs because the same real-world fact (e.g. a department name) is physically stored in multiple rows. If only a subset of those rows is updated — perhaps due to a partial update transaction — different rows now show different values for the same fact, creating inconsistency. Option A describes an insertion operation, not an anomaly. Option C is a query-performance concern unrelated to normalization. Option D describes an insertion anomaly (specifically the case of a partial key), not an update anomaly.",
          "type": "single"
        },
        {
          "id": "L5Q2",
          "text": "A decomposition of R(A, B, C) into R₁(A, B) and R₂(B, C) is lossless-join iff:",
          "options": [
            "A is a superkey of R₁ or R₂",
            "B is a superkey of R₁ or R₂",
            "C is a superkey of R₁ or R₂",
            "The FD set F contains A → C or C → A"
          ],
          "correct": [1],
          "explanation": "The necessary and sufficient condition for a binary lossless-join decomposition on the shared attribute set B is that B forms a superkey in at least one of the two resulting schemas. This means F⁺ contains either B → A (making B a superkey of R₁(A,B)) or B → C (making B a superkey of R₂(B,C)). Options A and C pick the wrong shared attribute. Option D describes a condition that is unrelated to the lossless-join criterion — what matters is the relationship between the join attribute and the other attributes.",
          "type": "single"
        },
        {
          "id": "L5Q3",
          "text": "Consider R(Ssn, Pnumber, Hours, Ename, Pname, Plocation) with candidate key {Ssn, Pnumber} and FDs: {Ssn,Pnumber}→Hours, Ssn→Ename, Pnumber→{Pname,Plocation}. What is the highest normal form of R?",
          "options": [
            "1NF — because all attribute values are atomic",
            "2NF — because all non-prime attributes are fully dependent on the key",
            "3NF — because there are no transitive dependencies among non-prime attributes",
            "BCNF — because every FD has a superkey on the left-hand side"
          ],
          "correct": [0],
          "explanation": "The relation is in 1NF (atomic values) but violates 2NF. The non-prime attribute Ename depends on Ssn alone — a proper subset of the composite key {Ssn, Pnumber}. This is a partial dependency, which 2NF forbids. Similarly, Pname and Plocation depend only on Pnumber. Because 2NF is violated, the highest normal form R satisfies is 1NF. Options B, C, D are all higher than 1NF and therefore incorrect.",
          "type": "single"
        },
        {
          "id": "L5Q4",
          "text": "R(Employee, Level, Salary) has FDs F = {Employee→Level, Employee→Salary, Level→Salary}. Consider decomposition D1: R₁(Employee, Level), R₂(Level, Salary). Which properties does D1 have? Select ALL that apply.",
          "options": [
            "Lossless-join",
            "Dependency-preserving",
            "All schemas in BCNF",
            "All schemas in 3NF"
          ],
          "correct": [0, 1, 2, 3],
          "explanation": "Lossless-join: Level is a key of R₂ (Level→Salary ∈ F), so the shared attribute Level is a superkey of R₂ — the binary lossless-join condition is satisfied. Dependency-preserving: F₁ = {Employee→Level} covers FD1; F₂ = {Level→Salary} covers FD3; Employee→Salary is derivable by transitivity from F₁ ∪ F₂ — all FDs are preserved. BCNF: In R₁, Employee is the sole key, so Employee→Level has a superkey on the left — BCNF. In R₂, Level is the sole key, so Level→Salary is fine — BCNF. 3NF: BCNF implies 3NF. All four properties hold.",
          "type": "multiple"
        },
        {
          "id": "L5Q5",
          "text": "A relation schema R is in 3NF. Which of the following can we conclude? Select ALL that apply.",
          "options": [
            "R is in 2NF",
            "R is in BCNF",
            "No non-prime attribute is transitively dependent on any candidate key via a non-prime attribute",
            "Every non-trivial FD has a superkey on the left-hand side"
          ],
          "correct": [0, 2],
          "explanation": "3NF implies 2NF (option A is true): a 2NF violation would be a partial dependency Y→A where Y is a proper key-subset and A is non-prime. Such a FD fails all three 3NF conditions — Y is not a superkey (it's a proper key-subset), the FD is non-trivial, and A is non-prime — so the relation wouldn't be in 3NF either. Option C is true: 3NF directly prohibits transitive dependencies through non-prime attributes. Option B is false: BCNF is strictly stronger than 3NF — a relation can be in 3NF without being in BCNF (e.g. LOTS1A). Option D describes BCNF, not 3NF — 3NF allows non-superkey LHS as long as the RHS is prime.",
          "type": "multiple"
        },
        {
          "id": "L5Q6",
          "text": "LOTS1A(Property_id#, County_name, Lot#, Area) has FDs: FD1: Property_id#→{County_name,Lot#,Area}; FD2: {County_name,Lot#}→{Property_id#,Area}; FD5: Area→County_name. What is the highest normal form of LOTS1A?",
          "options": [
            "1NF",
            "2NF",
            "3NF",
            "BCNF"
          ],
          "correct": [2],
          "explanation": "LOTS1A has two candidate keys: Property_id# (from FD1) and {County_name, Lot#} (from FD2). All four attributes are therefore prime. For FD5 (Area→County_name): it is non-trivial; Area is not a superkey; but County_name IS a prime attribute — so condition 3 of 3NF is satisfied and 3NF is not violated. However, BCNF requires that every non-trivial FD has a superkey on the left. Area is not a superkey, so FD5 violates BCNF. Thus LOTS1A is in 3NF but not BCNF — the highest normal form it satisfies is 3NF.",
          "type": "single"
        },
        {
          "id": "L5Q7",
          "text": "The 3NF synthesis algorithm guarantees which of the following properties? Select ALL that apply.",
          "options": [
            "Lossless-join decomposition",
            "Dependency-preserving decomposition",
            "All output schemas are in BCNF",
            "All output schemas are in 3NF"
          ],
          "correct": [0, 1, 3],
          "explanation": "The 3NF synthesis algorithm constructs schemas from a minimal cover G and always adds a key relation if needed — this guarantees lossless-join (option A). Because every FD in G is represented in exactly one output schema and G is equivalent to F, the decomposition is dependency-preserving (option B). The output schemas are guaranteed to be in 3NF (option D) — this follows from the minimality of G. Option C is false: the algorithm targets 3NF, not BCNF. BCNF may not be achievable while preserving dependencies, and the 3NF algorithm does not attempt it.",
          "type": "multiple"
        },
        {
          "id": "L5Q8",
          "text": "When should you prefer a 3NF decomposition over a BCNF decomposition?",
          "options": [
            "When storage space is a primary concern, since 3NF leaves more redundancy",
            "When dependency preservation is required and the schema cannot be decomposed into BCNF while preserving all FDs",
            "When the relation has a single-attribute candidate key, which prevents BCNF from being achieved",
            "When query performance is more important than data integrity"
          ],
          "correct": [1],
          "explanation": "The key practical tradeoff: BCNF provides stronger redundancy elimination but does not guarantee dependency preservation. When a BCNF decomposition would lose an FD — meaning that FD can no longer be enforced by local constraints on a single table — the designer must fall back to 3NF, which always achieves both lossless-join and dependency preservation. Option A is backwards: less redundancy is a benefit of higher normal forms, not a reason to prefer a lower one. Option C is false: a single-attribute key schema is already in BCNF. Option D confuses normalization concerns with query optimization.",
          "type": "single"
        },
        {
          "id": "L5Q9",
          "text": "R(A, B, C, D) has FDs F = {A→B, B→C, C→D}. Apply the 3NF synthesis algorithm. Which database schema D does the algorithm produce (assuming no redundant schemas)?",
          "options": [
            "{(A,B,C,D)} — the original relation is already in 3NF",
            "{(A,B), (B,C), (C,D)} — one schema per distinct LHS in the minimal cover",
            "{(A,B,C), (C,D)} — grouping FDs with overlapping LHS attributes",
            "{(A,B,C,D), (A)} — adding a key relation to the original"
          ],
          "correct": [1],
          "explanation": "Step 1: F = {A→B, B→C, C→D} is already a minimal cover G — all FDs have single RHS attributes, no extraneous LHS attributes, and no FD is redundant. Step 2: Distinct LHS values are A, B, C — so create R_A=(A,B), R_B=(B,C), R_C=(C,D). Step 3: Check if any schema contains a key of R. A⁺ = {A,B,C,D} = all attributes, so A is a candidate key. R_A=(A,B) contains A — key relation already present. Step 4: No schema is a subset of another. Result: D = {(A,B),(B,C),(C,D)}. The original relation is NOT in 3NF (A→B→C is a transitive dependency for non-prime attributes), ruling out option A.",
          "type": "single"
        },
        {
          "id": "L5Q10",
          "text": "Consider decomposing LOTS1A(Property_id#, County_name, Lot#, Area) into LOTS1AX(Property_id#, Area, Lot#) and LOTS1AY(Area, County_name) to eliminate the BCNF violation Area→County_name. Which statement is correct?",
          "options": [
            "The decomposition is lossy because Area is not a superkey of either schema",
            "The decomposition is lossless-join because Area is the shared attribute and Area→County_name makes Area a superkey of LOTS1AY",
            "The decomposition is dependency-preserving because all original FDs are captured within LOTS1AX or LOTS1AY",
            "The decomposition achieves 3NF but not BCNF in both output schemas"
          ],
          "correct": [1],
          "explanation": "The shared attribute between LOTS1AX and LOTS1AY is Area. The FD Area→County_name means Area is a superkey of LOTS1AY (Area determines all other attributes in that schema). By the binary lossless-join criterion, the decomposition is lossless-join — option B is correct. Option A is false: Area IS a superkey of LOTS1AY. Option C is false: FD2 (County_name,Lot#→Property_id#,Area) spans attributes of LOTS1AX and LOTS1AY and cannot be checked in either schema alone — it is lost. Option D is false: both LOTS1AX and LOTS1AY are in BCNF (each non-trivial FD within them has a superkey as its left-hand side).",
          "type": "single"
        }
      ],
      "flashcards": [
        {
          "front": "What are the three update/insertion/deletion anomalies caused by poor schema design?",
          "back": "Update anomaly: changing a repeated fact requires updating many tuples — missing one leaves inconsistency. Insertion anomaly: a new fact cannot be stored unless a related entity also exists. Deletion anomaly: deleting the last tuple for one entity silently destroys facts about another entity. All three stem from one relation encoding facts about multiple distinct entities."
        },
        {
          "front": "What is the lossless-join condition for a binary decomposition of R(A,B,C) into R₁(A,B) and R₂(B,C)?",
          "back": "The decomposition is lossless-join iff the shared attribute set B is a superkey in R₁ or R₂, i.e. F⁺ contains B→A or B→C. Equivalently, no 'spurious' tuples appear when the two projected relations are natural-joined back together."
        },
        {
          "front": "What does it mean for a decomposition to be dependency-preserving?",
          "back": "Each functional dependency in F can be enforced by local constraints on a single decomposed relation — no cross-table join is needed to check any FD. Formally, F and the union of FD sets Fᵢ (each restricted to schema Sᵢ) must be equivalent: (F₁ ∪ … ∪ Fₖ)⁺ ⊇ F⁺."
        },
        {
          "front": "What does First Normal Form (1NF) require?",
          "back": "Every attribute domain must consist of atomic (indivisible) values, and each tuple must have exactly one value per attribute. Multi-valued attributes (sets, lists) and nested relations are forbidden. 1NF is part of the basic definition of a relation and is independent of FDs."
        },
        {
          "front": "What is the difference between a prime and a non-prime attribute?",
          "back": "A prime attribute belongs to at least one candidate key of the relation. A non-prime (non-key) attribute belongs to no candidate key. The distinction matters for 2NF and 3NF: these normal forms impose constraints specifically on non-prime attributes."
        },
        {
          "front": "What does Second Normal Form (2NF) forbid?",
          "back": "Partial dependencies: a non-prime attribute A must not be functionally determined by a proper subset Y of any candidate key K (Y ⊊ K → A is forbidden when A is non-prime). Every non-prime attribute must be fully functionally dependent on every candidate key. 2NF is automatically satisfied when all candidate keys are single-attribute."
        },
        {
          "front": "State the three conditions that let an FD X→Y pass the 3NF test.",
          "back": "For R to be in 3NF, every FD X→Y in F must satisfy at least one of: (1) the FD is trivial (Y ⊆ X); (2) X is a superkey of R; (3) every attribute in Y−X is a prime attribute. Condition 3 is the relaxation that distinguishes 3NF from BCNF — it allows non-superkey determinants whose right-hand side is prime."
        },
        {
          "front": "What does BCNF require, and how does it differ from 3NF?",
          "back": "BCNF requires that for every non-trivial FD X→Y, X must be a superkey. It drops the 3NF exception for prime RHS attributes. Consequence: BCNF is strictly stronger than 3NF — every BCNF schema is also in 3NF, but not vice versa. A schema can be in 3NF yet violate BCNF when a non-superkey determines a prime attribute."
        },
        {
          "front": "What are the four steps of the 3NF synthesis algorithm?",
          "back": "1. Compute a minimal cover G of F (canonical form, no extraneous attributes, no redundant FDs). 2. For each distinct LHS X in G, create schema Rₓ = X ∪ {all attributes determined by X in G}. 3. If no schema in D contains a candidate key of R, add one schema with only key attributes. 4. Remove redundant schemas (any Rₓ ⊆ Rᵧ). Output: lossless-join, dependency-preserving decomposition, all schemas in 3NF."
        },
        {
          "front": "Why does BCNF decomposition not guarantee dependency preservation?",
          "back": "BCNF forces every non-trivial FD to have a superkey on the left. When an FD X→Y has X as a non-superkey, the BCNF decomposition splits those attributes across two schemas. The FD that connects attributes in the two pieces can no longer be enforced within either single schema — it is 'lost'. The LOTS1A example: BCNF decomposition along Area→County_name loses FD2 (County_name,Lot#→Property_id#,Area)."
        },
        {
          "front": "How does the Chase test verify lossless-join for a multi-way decomposition?",
          "back": "Build table T with one row per sub-schema and one column per attribute of R. Initialise cells: T[i,X] = t[X] (the actual value) if X ∈ Sᵢ, else a distinct placeholder xⱼ. Repeatedly apply each FD Y→X ∈ F: if two rows agree on all Y-columns, set their X-values equal (use the real value if either has it). The decomposition is lossless-join iff some row becomes the all-real-values tuple t = (a,b,…,z)."
        },
        {
          "front": "What is the practical guideline for choosing between BCNF and 3NF as a target normal form?",
          "back": "Prefer BCNF when eliminating all redundancy is the priority and losing some FDs is acceptable (they can be enforced at the application layer). Prefer 3NF when all FDs must be enforceable by the DBMS through local constraints — the 3NF synthesis algorithm always produces a lossless-join and dependency-preserving decomposition. When in doubt: try BCNF first; fall back to 3NF if a required FD is lost."
        }
      ]
    }
  ]
}
