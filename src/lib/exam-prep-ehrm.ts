// src/lib/exam-prep-ehrm.ts
import { registerExamPrepExams, type ExamPrepExam } from './exam-prep'

const exams: ExamPrepExam[] = [
  {
    id: 'recommender-drill',
    title: 'Recommender Systems — Similarity & Prediction',
    scenario: `## Part A — Collaborative Filtering Prediction

Active user ā has mean rating $\\bar{r}_a = 3.6$. Three neighbours:

| Neighbour | Similarity $w(a,i)$ | Deviation $r_{i,j} - \\bar{r}_i$ |
|-----------|---------------------|-----------------------------------|
| U1        | 0.80                | +1.5                              |
| U2        | 0.40                | −2.0                              |
| U3        | −0.60               | −1.0                              |

Prediction formula: $pred(a,j) = \\bar{r}_a + g\\sum_i w(a,i)\\,(r_{i,j} - \\bar{r}_i)$, where $g = 1/\\sum_i |w(a,i)|$.

## Part B — Evaluation Metrics

A model produced the following predictions on five held-out ratings:

| Item | Predicted | Actual |
|------|-----------|--------|
| i1   | 4.0       | 3.5    |
| i2   | 2.5       | 4.0    |
| i3   | 3.0       | 3.0    |
| i4   | 5.0       | 3.5    |
| i5   | 2.0       | 3.0    |

$$\\text{MAE} = \\frac{1}{n}\\sum_i|p_i - r_i|, \\quad \\text{MSE} = \\frac{1}{n}\\sum_i(p_i - r_i)^2$$

## Part C — Cosine Similarity

Two users' rating vectors across 4 items: **A = [2, 0, 3, 1]** and **B = [1, 2, 2, 0]**.

$$sim(A,B) = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\|\\mathbf{a}\\|\\,\\|\\mathbf{b}\\|}$$`,
    tasks: [
      {
        id: 1,
        text: 'Using all three neighbours, compute the weighted deviation sum Σ w(a,i)(rᵢⱼ − r̅ᵢ).',
        unit: '',
        answer: 1.00,
        tolerance: 0.02,
        choices: [-0.20, 0.40, 1.00, 2.60],
        explanation:
          '(0.80 × 1.5) + (0.40 × −2.0) + (−0.60 × −1.0) = 1.20 − 0.80 + 0.60 = 1.00. ' +
          'U3 has negative similarity and negative deviation, so their product is positive (+0.60). ' +
          'Distractor −0.20 comes from flipping the sign of U3’s deviation; ' +
          '2.60 from treating all three products as positive (|1.20| + |0.80| + |0.60|).',
      },
      {
        id: 2,
        text: 'Compute the normalising factor g = 1 / Σ|w(a,i)| (round to 3 decimal places).',
        unit: '',
        answer: 0.556,
        tolerance: 0.02,
        choices: [0.500, 0.556, 0.833, 1.667],
        explanation:
          'g = 1 / (|0.80| + |0.40| + |−0.60|) = 1 / (0.80 + 0.40 + 0.60) = 1 / 1.80 ≈ 0.556. ' +
          'The denominator uses absolute similarity values. ' +
          'Distractor 0.833 = 1/1.20 (only U1 and U2 counted in denominator); ' +
          '1.667 = 1/0.60 (used the signed sum 0.80 + 0.40 − 0.60, ignoring absolute values).',
      },
      {
        id: 3,
        text: 'Compute the predicted rating pred(a, j) (round to 3 decimal places).',
        unit: '',
        answer: 4.156,
        tolerance: 0.02,
        choices: [3.600, 4.156, 4.433, 5.267],
        explanation:
          'pred = r̅_a + g × Σ = 3.6 + 0.556 × 1.00 = 4.156. ' +
          'Distractor 3.600 applies no correction at all; ' +
          '4.433 = 3.6 + 0.833 × 1.00 (wrong g: denominator counted only two neighbours); ' +
          '5.267 = 3.6 + 1.667 × 1.00 (g computed from signed sum 0.60 instead of absolute sum 1.80).',
      },
      {
        id: 4,
        text: 'Calculate the MAE (Mean Absolute Error) for the five predictions in Part B.',
        unit: '',
        answer: 0.90,
        tolerance: 0.02,
        choices: [0.70, 0.80, 0.90, 1.15],
        explanation:
          'Absolute errors: |4.0−3.5|=0.5, |2.5−4.0|=1.5, |3.0−3.0|=0.0, |5.0−3.5|=1.5, |2.0−3.0|=1.0. ' +
          'Sum = 4.5. MAE = 4.5 / 5 = 0.90. ' +
          'Distractor 1.15 is the MSE — a common mix-up between the two metrics.',
      },
      {
        id: 5,
        text: 'Calculate the MSE (Mean Squared Error) for the five predictions in Part B.',
        unit: '',
        answer: 1.15,
        tolerance: 0.02,
        choices: [0.90, 1.15, 1.44, 5.75],
        explanation:
          'Squared errors: 0.5²=0.25, 1.5²=2.25, 0.0²=0.00, 1.5²=2.25, 1.0²=1.00. ' +
          'Sum = 5.75. MSE = 5.75 / 5 = 1.15. ' +
          'Distractor 5.75 is the raw sum (not divided by n); ' +
          '1.44 = 5.75 / 4 (wrong denominator n−1 instead of n); ' +
          '0.90 confuses MSE with MAE.',
      },
      {
        id: 6,
        text: 'Compute the cosine similarity sim(A, B) between A = [2, 0, 3, 1] and B = [1, 2, 2, 0] (round to 3 decimal places).',
        unit: '',
        answer: 0.713,
        tolerance: 0.02,
        choices: [0.571, 0.667, 0.713, 0.889],
        explanation:
          'Dot product: 2×1 + 0×2 + 3×2 + 1×0 = 2 + 0 + 6 + 0 = 8. ' +
          '‖A‖ = √(4+0+9+1) = √14 ≈ 3.742. ‖B‖ = √(1+4+4+0) = √9 = 3. ' +
          'cos = 8 / (3.742 × 3) = 8 / 11.225 ≈ 0.713. ' +
          'Distractor 0.571 = 8/14 (divided by ‖A‖² instead of ‖A‖); ' +
          '0.667 = 8/12 (‖A‖ rounded to 4); ' +
          '0.889 = 8/9 (forgot to divide by ‖A‖).',
      },
    ],
  },
  {
    id: 'esm-network-drill',
    title: 'ESM Network Analysis — Centrality Measures',
    scenario: `## Project Team Knowledge Network

A five-member project team shares the following **undirected** expertise-sharing ties:

**A–B, A–C, A–D, B–C, D–E**

where A = Alice, B = Bob, C = Carol, D = Dave, E = Eve.

**Formulas:**

Normalised degree centrality: $DC(v) = \\deg(v) / (n-1)$

Network density: $\\text{density} = |E| / \\binom{n}{2}$

Normalised betweenness centrality:

$$BC(v) = \\frac{\\displaystyle\\sum_{s \\neq v \\neq t} \\sigma_{st}(v) / \\sigma_{st}}{(n-1)(n-2)/2}$$

where $\\sigma_{st}$ = total number of shortest paths from $s$ to $t$, and $\\sigma_{st}(v)$ = those that pass through $v$.`,
    tasks: [
      {
        id: 1,
        text: "What is Alice's normalised degree centrality DC(A) in this five-person network?",
        unit: '',
        answer: 0.75,
        tolerance: 0.02,
        choices: [0.50, 0.60, 0.75, 1.00],
        explanation:
          'Alice holds direct ties to B, C, and D → deg(A) = 3. ' +
          'DC(A) = 3 / (n−1) = 3 / 4 = 0.75. ' +
          'Distractor 0.60 = 3/5 (dividing by n instead of n−1); ' +
          '0.50 = 2/4 (under-counting Alice’s degree).',
      },
      {
        id: 2,
        text: 'What is the network density — the proportion of all possible ties that are present?',
        unit: '',
        answer: 0.50,
        tolerance: 0.02,
        choices: [0.40, 0.50, 0.60, 0.83],
        explanation:
          'Five actual edges: A–B, A–C, A–D, B–C, D–E. ' +
          'Maximum possible ties for n = 5: C(5,2) = 10. ' +
          'Density = 5 / 10 = 0.50. ' +
          'Distractor 0.40 = 4/10 (one edge missed); ' +
          '0.83 ≈ 5/6 (wrong denominator C(4,2) = 6); ' +
          '0.60 = 6/10 (phantom extra edge counted).',
      },
      {
        id: 3,
        text: "What is Alice's normalised betweenness centrality BC(A)?",
        unit: '',
        answer: 0.667,
        tolerance: 0.02,
        choices: [0.500, 0.667, 0.750, 1.000],
        explanation:
          'List all C(4,2) = 6 pairs from {B,C,D,E}: ' +
          '(B,C) — direct edge, Alice not on any shortest path (0); ' +
          '(B,D) — only path B–A–D, Alice on path (1); ' +
          '(B,E) — only path B–A–D–E, Alice on path (1); ' +
          '(C,D) — only path C–A–D, Alice on path (1); ' +
          '(C,E) — only path C–A–D–E, Alice on path (1); ' +
          '(D,E) — direct edge, Alice not needed (0). ' +
          'Raw betweenness = 4. Normalisation factor = (5−1)(5−2)/2 = 6. ' +
          'BC(A) = 4/6 ≈ 0.667. ' +
          'Distractor 0.500 = 3/6 (pair B–E overlooked); 0.750 confuses BC with DC(A).',
      },
    ],
  },
]

registerExamPrepExams('ehrm', exams)
