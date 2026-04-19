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
      ]
    }
  ]
}
