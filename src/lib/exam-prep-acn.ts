// src/lib/exam-prep-acn.ts
import { registerExamPrepExams, type ExamPrepExam } from './exam-prep'

const exams: ExamPrepExam[] = [
  {
    id: 'graph-theory-foundations',
    title: 'Graph Theory & Distances (WS 2023/24)',
    scenario: `## Analysis of a Protein Interaction Network

You are given a small undirected PPI network with nodes {A, B, C, D, E} and the following adjacency list:
- **A:** {B, C}
- **B:** {A, C, D}
- **C:** {A, B}
- **D:** {B, E}
- **E:** {D}

Assume all edges are unweighted.`,
    tasks: [
      {
        id: 1,
        text: 'What is the "Order" (n) and "Size" (m) of this graph?',
        unit: 'n,m',
        answer: 55, // Representing as 5 and 5
        tolerance: 0,
        choices: [44, 55, 56, 65],
        explanation: 'Nodes (V) = {A, B, C, D, E} -> n=5. Edges (E) = {(A,B), (A,C), (B,C), (B,D), (D,E)} -> m=5. Answer is 5, 5.',
      },
      {
        id: 2,
        text: 'Calculate the eccentricity of node "B".',
        unit: 'steps',
        answer: 2,
        tolerance: 0,
        choices: [1, 2, 3, 4],
        explanation: 'Shortest paths from B: B-A(1), B-C(1), B-D(1), B-D-E(2). The longest of these is 2.',
      },
      {
        id: 3,
        text: 'What is the "Diameter" of this entire graph?',
        unit: 'steps',
        answer: 3,
        tolerance: 0,
        choices: [2, 3, 4, 5],
        explanation: 'Check distances from E: E-D(1), E-D-B(2), E-D-B-A(3), E-D-B-C(3). Max shortest path is 3. Thus, Diameter = 3.',
      },
      {
        id: 4,
        text: 'Calculate the Degree Centrality of node "B".',
        unit: 'neighbors',
        answer: 3,
        tolerance: 0,
        choices: [1, 2, 3, 4],
        explanation: 'Node B is connected to A, C, and D. Degree = 3.',
      },
    ],
  },
  {
    id: 'havel-hakimi-practice',
    title: 'Graphical Sequences & Havel-Hakimi',
    scenario: `## Verifying Degree Sequences

You are reviewing several degree sequences to see if they can form simple biological graphs (no self-loops, no multi-edges).

Sequence S1: [4, 3, 3, 2, 2]
Sequence S2: [3, 3, 3, 1]`,
    tasks: [
      {
        id: 1,
        text: 'Applying one step of Havel-Hakimi to S1 [4, 3, 3, 2, 2], what is the resulting sequence?',
        unit: 'sequence',
        answer: 2211, // Representing [2, 2, 1, 1]
        tolerance: 0,
        choices: [3322, 2211, 3221, 2222],
        explanation: 'Remove 4, decrement next 4: (3-1, 3-1, 2-1, 2-1) = [2, 2, 1, 1].',
      },
      {
        id: 2,
        text: 'Is S1 [4, 3, 3, 2, 2] graphical?',
        unit: '1=Yes, 0=No',
        answer: 1,
        tolerance: 0,
        choices: [0, 1, 0, 0],
        explanation: 'Following [2, 2, 1, 1]: Remove 2, decrement next 2 -> [1, 0, 1] -> Sort -> [1, 1, 0]. Remove 1, decrement next 1 -> [0, 0]. All zeros reached. Yes.',
      },
      {
        id: 3,
        text: 'Is S2 [3, 3, 3, 1] graphical?',
        unit: '1=Yes, 0=No',
        answer: 0,
        tolerance: 0,
        choices: [0, 1, 1, 1],
        explanation: 'Sum of degrees = 3+3+3+1 = 10 (even, okay). HH: Remove 3, decrement next 3 -> [2, 2, 0]. Remove 2, decrement next 2 -> [1, -1]. Negative value reached. No.',
      },
    ],
  },
  {
    id: 'centrality-and-motifs',
    title: 'Advanced Centrality & Motifs',
    scenario: `## Signaling Cascade Analysis

In a directed gene regulatory network, node X regulates Y and Z, and Y regulates Z.
This forms a Feed-Forward Loop (FFL).

Assume an edge exists from Source (S) to X.`,
    tasks: [
      {
        id: 1,
        text: 'If the FFL is "Coherent", and X and Y both use AND-logic to activate Z, how does Z respond to a short pulse from S?',
        unit: '1=Responds, 0=Filters',
        answer: 0,
        tolerance: 0,
        choices: [1, 0, 1, 1],
        explanation: 'Coherent FFLs with AND-logic act as "persistence detectors". Short pulses are filtered out because Y doesn\'t have time to accumulate enough to activate the AND-gate at Z.',
      },
      {
        id: 2,
        text: 'Calculate the empirical P-value for a motif that appeared 15 times in the real network, but in 1000 randomizations, it appeared 15 or more times only in 4 cases.',
        unit: 'P',
        answer: 0.005,
        tolerance: 0.001,
        choices: [0.004, 0.005, 0.015, 0.050],
        explanation: 'P = (count + 1) / (B + 1) = (4 + 1) / (1000 + 1) = 5 / 1001 ≈ 0.005.',
      },
    ],
  },
  {
    id: 'laplacian-and-matrices',
    title: 'Laplacian & Adjacency Matrix Properties',
    scenario: `## Mathematical Graph Analysis

Consider a connected undirected graph G. The adjacency matrix is A and the Laplacian is L.`,
    tasks: [
      {
        id: 1,
        text: 'If A^3 (entry 1,2) is equal to 4, what does this value represent?',
        unit: 'walks',
        answer: 4,
        tolerance: 0,
        choices: [2, 3, 4, 8],
        explanation: 'The (i,j) entry of A^k gives the exact number of walks of length k from node i to node j.',
      },
      {
        id: 2,
        text: 'What is the smallest eigenvalue of the Laplacian matrix L for any connected graph?',
        unit: 'value',
        answer: 0,
        tolerance: 0,
        choices: [-1, 0, 1, 2],
        explanation: 'The Laplacian matrix L = D - A always has 0 as its smallest eigenvalue, with the constant vector as its eigenvector.',
      },
      {
        id: 3,
        text: 'In a graph with 3 connected components, what is the multiplicity of the eigenvalue 0 in the Laplacian matrix?',
        unit: 'multiplicity',
        answer: 3,
        tolerance: 0,
        choices: [1, 2, 3, 4],
        explanation: 'The number of zero eigenvalues of the Laplacian matrix corresponds exactly to the number of connected components in the graph.',
      },
    ],
  },
  {
    id: 'network-alignment-isorank',
    title: 'Network Alignment & IsoRank Tracing',
    scenario: `## Aligning Interactomes

You are aligning two small PPI networks from Species 1 (nodes A, B) and Species 2 (nodes 1, 2).
- **Species 1 Edge:** (A, B)
- **Species 2 Edge:** (1, 2)
- **Sequence Similarity (E matrix):**
  - E(A,1) = 0.8, E(A,2) = 0.2
  - E(B,1) = 0.1, E(B,2) = 0.9

Use the IsoRank equation: R = αAR + (1-α)E.
Assume α = 0.5. For the topological support (AR), node similarity R(A,1) receives support from neighbors R(B,2).`,
    tasks: [
      {
        id: 1,
        text: 'Calculate the similarity R(A,1) after one iteration. (Topological term A(A,B)*A(1,2)*R(B,2)_initial. Assume initial R values equal E values).',
        unit: 'R_score',
        answer: 0.85,
        tolerance: 0.01,
        choices: [0.45, 0.80, 0.85, 0.95],
        explanation: 'R(A,1) = α * [A(A,B)*A(1,2)*R(B,2)] + (1-α) * E(A,1). R(A,1) = 0.5 * [1 * 1 * 0.9] + 0.5 * 0.8 = 0.45 + 0.4 = 0.85.',
      },
      {
        id: 2,
        text: 'If α was set to 1.0, what would happen to the influence of sequence similarity (BLAST scores)?',
        unit: '1=Ignored, 0=Dominate',
        answer: 1,
        tolerance: 0,
        choices: [0, 1, 1, 1],
        explanation: 'At α = 1.0, the (1-α)E term becomes zero, meaning the algorithm ignores sequences and relies purely on network topology.',
      },
    ],
  },
  {
    id: 'flow-optimization-metabolic',
    title: 'Max-Flow & Ford-Fulkerson Tracing',
    scenario: `## Metabolic Flux Analysis

Source (S) -> Enzyme A (cap: 10) -> Enzyme B (cap: 5) -> Sink (T).
Additionally, there is a bypass: S -> Enzyme C (cap: 4) -> Sink (T).`,
    tasks: [
      {
        id: 1,
        text: 'What is the maximum flow from S to T in this pathway?',
        unit: 'flux',
        answer: 9,
        tolerance: 0,
        choices: [5, 9, 14, 19],
        explanation: 'Path 1 (S-A-B-T) is limited by bottleneck Enzyme B (5). Path 2 (S-C-T) has capacity 4. Total Max Flow = 5 + 4 = 9.',
      },
      {
        id: 2,
        text: 'Identify the Minimum Cut capacity.',
        unit: 'value',
        answer: 9,
        tolerance: 0,
        choices: [5, 9, 10, 14],
        explanation: 'By the Max-Flow Min-Cut theorem, the capacity of the minimum cut is always equal to the maximum flow.',
      },
      {
        id: 3,
        text: 'If we increase Enzyme A capacity to 20, what is the new Max Flow?',
        unit: 'flux',
        answer: 9,
        tolerance: 0,
        choices: [9, 14, 20, 24],
        explanation: 'Even if A increases, Path 1 is still limited by Enzyme B (5). The total flow remains 5 + 4 = 9.',
      },
    ],
  },
  {
    id: 'spectral-partitioning-deep',
    title: 'Spectral Clustering & Fiedler Vector',
    scenario: `## Community Detection in Protein Complexes

You have a graph with two cliques {1,2,3} and {4,5,6} connected by a single bridge edge (3,4).
The Fiedler vector (v2) of the Laplacian is calculated.`,
    tasks: [
      {
        id: 1,
        text: 'What will be the signs of the components in the Fiedler vector for nodes {1,2,3} compared to {4,5,6}?',
        unit: '1=Opposite, 0=Same',
        answer: 1,
        tolerance: 0,
        choices: [0, 1, 0, 0],
        explanation: 'The Fiedler vector partitions nodes into two communities based on their sign (positive vs negative). Nodes in the same community will have the same sign, while nodes in different communities will have opposite signs.',
      },
      {
        id: 2,
        text: 'Which eigenvalue of the Laplacian is the "Algebraic Connectivity"?',
        unit: 'rank',
        answer: 2,
        tolerance: 0,
        choices: [1, 2, 3, 4],
        explanation: 'The second smallest eigenvalue (λ2) is called the algebraic connectivity. It is > 0 if and only if the graph is connected.',
      },
    ],
  },
]

registerExamPrepExams('acn', exams)
