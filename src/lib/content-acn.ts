import type { Content } from './types'

export const content: Content = {
  lectures: [
    {
      id: 1,
      title: 'Introduction to Networks and Graph Theory',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Definition of a Graph',
          body: 'A graph $G = (V, E)$ is an abstract representation of a set of components (nodes/vertices) connected by edges. An edge is a subset of vertices $\{u, v\}$. The Cartesian product of two graphs can create a new graph pairing vertices from both, used in modular graph products for alignment.',
        },
        {
          heading: 'Graph Types: Simple, Multi, and Hypergraphs',
          body: '- **Simple Graph:** No loops (edges to the same node) or multi-edges (parallel edges).\n- **Multi-graph:** Allows loops and multi-edges.\n- **Hypergraph:** Edges (hyperedges) can connect any number of vertices, often described as a "bag of nodes" connected to another set (powerset of nodes).',
        },
        {
          heading: 'Graph Representations',
          body: '- **Adjacency Matrix:** A square matrix $A$ where $A[u, v] = 1$ if an edge exists. Directed graphs often use -1 for outgoing and 1 for incoming.\n- **Incidence Matrix:** Dimensions $M[n, e]$ mapping $n$ nodes to $e$ edges. Rows are nodes, columns are edges.\n- **Adjacency List:** A collection of unordered lists describing neighbors; highly space-efficient for sparse graphs.',
        },
        {
          heading: 'Depth-First Search (DFS)',
          body: 'DFS is a traversal algorithm that explores as far as possible along each branch before backtracking. It uses a **Stack** (LIFO) and has a time complexity of $O(\\max(m, n))$. It constructs a spanning tree or forest and is critical for identifying connected components and articulation points.',
        },
        {
          heading: 'Breadth-First Search (BFS)',
          body: 'BFS explores all nodes at the present depth level before moving to the next level. It uses a **Queue** (FIFO) to track discovered but unexplored nodes. BFS is guaranteed to find the shortest path in an unweighted graph.',
        },
      ],
      questions: [
        {
          id: 'L1Q1',
          text: 'What is the primary difference between a simple graph and a multi-graph?',
          options: [
            'A multi-graph allows loops and parallel edges, while a simple graph does not.',
            'A simple graph is directed, while a multi-graph is undirected.',
            'A multi-graph must be connected, while a simple graph can be disconnected.',
            'A simple graph is represented by an adjacency matrix, a multi-graph by a list.',
          ],
          correct: [0],
          explanation: 'A simple graph is restricted to at most one edge between any two nodes and no self-loops.',
          type: 'single',
        },
        {
          id: 'L1Q2',
          text: 'Which data structure is used by the iterative implementation of DFS?',
          options: ['Queue (FIFO)', 'Stack (LIFO)', 'Priority Queue', 'Linked List'],
          correct: [1],
          explanation: 'DFS uses a Stack to manage backtracking, following the Last-In First-Out principle.',
          type: 'single',
        },
        {
          id: 'L1Q3',
          text: 'In a directed graph adjacency matrix, how is an outgoing edge from node u often represented in the context of incidence-like logic?',
          options: ['A[u,v] = 1', 'A[u,v] = -1', 'A[v,u] = 1', 'A[u,v] = 0'],
          correct: [1],
          explanation: 'In some conventions for directed incidence/adjacency, outgoing edges are marked with -1 and incoming with 1.',
          type: 'single',
        },
        {
          id: 'L1Q4',
          text: 'What is the time complexity of DFS using an adjacency list?',
          options: ['O(n^2)', 'O(n log n)', 'O(m + n)', 'O(m * n)'],
          correct: [2],
          explanation: 'With an adjacency list, DFS visits every node and edge once, leading to linear time complexity $O(V + E)$.',
          type: 'single',
        },
        {
          id: 'L1Q5',
          text: 'Which statement is true regarding Breadth-First Search (BFS)?',
          options: [
            'It uses a stack to keep track of nodes.',
            'It explores deep branches before neighbors.',
            'It generates a spanning tree for a connected graph.',
            'It is less memory-efficient than DFS for all graphs.',
          ],
          correct: [2],
          explanation: 'BFS explores level-by-level and produces a spanning tree that represents the shortest paths from the start node.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Graph Definition',
          back: 'G = (V, E), where V is a set of nodes and E is a set of edges.',
        },
        {
          front: 'LIFO vs FIFO',
          back: 'LIFO (Last In First Out) is for Stacks (DFS); FIFO (First In First Out) is for Queues (BFS).',
        },
        {
          front: 'Adjacency Matrix',
          back: 'Square matrix representing node connections; A[u,v]=1 if edge exists.',
        },
        {
          front: 'Connected Graph',
          back: 'A graph where a path exists between any two nodes.',
        },
        {
          front: 'Spanning Tree',
          back: 'A subgraph that includes all vertices of G and is a tree.',
        },
      ],
    },
    {
      id: 2,
      title: 'Graph Traversal and Articulation Points',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Tree Traversal: Preorder and Postorder',
          body: 'Preorder traversal visits the node first, then subtrees. Postorder visits subtrees first, then the node. These orders define visit times used to solve the ancestry problem in $O(1)$.',
        },
        {
          heading: 'The Ancestry Problem',
          body: 'Given nodes $(v, w)$, $v$ is an ancestor of $w$ if and only if $pre[v] \\le pre[w]$ AND $post[v] \\ge post[w]$. This check is efficient after $O(n)$ preprocessing.',
        },
        {
          heading: 'Articulation Points (APs)',
          body: 'An articulation point is a vertex whose removal increases the number of connected components. Identifying APs is crucial for understanding network vulnerability.',
        },
        {
          heading: 'Efficient Articulation Point Detection',
          body: 'Using a DFS tree: A node $v$ (not root) is an AP if it has a child $z$ such that no back-edge exists from $z$ or its descendants to an ancestor of $v$. The root is an AP if it has $>1$ child.',
        },
        {
          heading: 'Biconnectivity and Bicoherence',
          body: '- **Biconnected:** No articulation points; survives any single node removal.\n- **Bicoherent:** Every AP is connected by two edges to each remaining component; survives specific edge failures.',
        },
      ],
      questions: [
        {
          id: 'L2Q1',
          text: "How can you determine if node 'v' is an ancestor of 'w' using traversal orders?",
          options: [
            'pre[v] <= pre[w] and post[v] >= post[w]',
            'pre[v] >= pre[w] and post[v] <= post[w]',
            'pre[v] == post[w]',
            'pre[v] < pre[w] and post[v] < post[w]',
          ],
          correct: [0],
          explanation: 'An ancestor must be visited before its descendant in preorder and after it in postorder.',
          type: 'single',
        },
        {
          id: 'L2Q2',
          text: 'Under what condition is the root of a DFS tree an articulation point?',
          options: [
            'If it has any child nodes.',
            'If it has more than one child in the DFS tree.',
            'If it has a back-edge to a leaf node.',
            'The root can never be an articulation point.',
          ],
          correct: [1],
          explanation: 'In the DFS tree, if the root has multiple children, removing it disconnects those subtrees from each other.',
          type: 'single',
        },
        {
          id: 'L2Q3',
          text: 'What does biconnectedness ensure in a cellular network?',
          options: [
            'That every node has at least two edges.',
            'Functionality even if one node is removed.',
            'That the network is a complete clique.',
            'That all paths are of length two.',
          ],
          correct: [1],
          explanation: 'Biconnected graphs lack single points of failure (APs), making them robust to node removals.',
          type: 'single',
        },
        {
          id: 'L2Q4',
          text: 'Which of the following is a transient interaction in a PPI network?',
          options: ['Ribosome complex formation', 'Haemoglobin structure', 'Protein kinase modification', 'Stable protein complex'],
          correct: [2],
          explanation: 'Kinase interactions are brief and modify targets, representing the dynamic part of the interactome.',
          type: 'single',
        },
        {
          id: 'L2Q5',
          text: 'What is the time complexity of the efficient Articulation Point algorithm?',
          options: ['O(n^3)', 'O(nm)', 'O(m + n)', 'O(log n)'],
          correct: [2],
          explanation: 'The DFS-based algorithm for APs runs in linear time $O(V + E)$.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Articulation Point',
          back: 'A vertex whose removal disconnects the graph.',
        },
        {
          front: 'Biconnected Graph',
          back: 'A graph with no articulation points.',
        },
        {
          front: 'Interactome',
          back: 'The totality of protein-protein interactions in a cell.',
        },
        {
          front: 'Back-edge',
          back: 'An edge in DFS that connects a node to an ancestor in the spanning tree.',
        },
        {
          front: 'Postorder Traversal',
          back: 'A traversal where subtrees are visited before the node itself.',
        },
      ],
    },
    {
      id: 3,
      title: 'Seminal Network Properties',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Network Size and Order',
          body: 'The **Order** of a graph is the number of nodes ($n$), while the **Size** is the number of edges ($m$). For a clique, size is maximal: $m = n(n-1)/2$.',
        },
        {
          heading: 'Diameter, Radius, and Eccentricity',
          body: '- **Eccentricity:** Longest shortest path from a node.\n- **Diameter:** Maximum eccentricity in the graph.\n- **Radius:** Minimum eccentricity.',
        },
        {
          heading: 'Havel-Hakimi Algorithm',
          body: 'A constructive algorithm to check if a degree sequence is graphical. It sorts the sequence and iteratively removes the largest degree $d_1$, decrementing the next $d_1$ elements.',
        },
        {
          heading: 'Random vs. Scale-Free Networks',
          body: '- **Erdős-Rényi (ER):** Poisson degree distribution; random connectivity.\n- **Barabási-Albert (BA):** Power-law distribution; preferential attachment creates "hubs".',
        },
        {
          heading: 'Assortativity',
          body: 'Measures the tendency of nodes to connect to others with similar attributes (e.g., degree). $r > 0$ means high-degree nodes connect to high-degree nodes.',
        },
      ],
      questions: [
        {
          id: 'L3Q1',
          text: "What is the 'Diameter' of a graph?",
          options: [
            'The shortest path between the two furthest nodes.',
            'The average length of all shortest paths.',
            'The minimum eccentricity of any node.',
            'The maximum shortest path between any two nodes in the graph.',
          ],
          correct: [3],
          explanation: 'The diameter is the largest distance between any pair of nodes in the network.',
          type: 'single',
        },
        {
          id: 'L3Q2',
          text: 'Which degree distribution is characteristic of a Scale-Free network (BA model)?',
          options: ['Poisson distribution', 'Normal distribution', 'Power-law distribution', 'Binomial distribution'],
          correct: [2],
          explanation: 'Scale-free networks are characterized by a power-law degree distribution, allowing for the emergence of hubs.',
          type: 'single',
        },
        {
          id: 'L3Q3',
          text: 'What does the Havel-Hakimi algorithm determine?',
          options: [
            'If a graph is biconnected.',
            'If two graphs are isomorphic.',
            'If a sequence of integers can form a simple graph.',
            'The shortest path between all pairs.',
          ],
          correct: [2],
          explanation: 'It checks if a degree sequence is "graphical", meaning a simple graph can be constructed from it.',
          type: 'single',
        },
        {
          id: 'L3Q4',
          text: 'If r > 0 in a network\'s assortativity, what does it imply?',
          options: [
            'High degree nodes tend to connect to low degree nodes.',
            'High degree nodes tend to connect to high degree nodes.',
            'The network is a random Erdos-Renyi graph.',
            'The network has no connected components.',
          ],
          correct: [1],
          explanation: 'Positive assortativity ($r > 0$) indicates that similar nodes prefer to connect to each other.',
          type: 'single',
        },
        {
          id: 'L3Q5',
          text: "How is 'Eccentricity' of a node defined?",
          options: [
            'The number of its neighbors.',
            'The sum of all shortest paths to it.',
            'The length of the longest shortest path from it.',
            'The number of triangles it participates in.',
          ],
          correct: [2],
          explanation: 'Eccentricity is the maximum distance from a node to any other node in the graph.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Graph Order',
          back: 'The number of nodes in the graph.',
        },
        {
          front: 'Graph Size',
          back: 'The number of edges in the graph.',
        },
        {
          front: 'Graphical Sequence',
          back: 'A degree sequence that can be realized as a simple graph.',
        },
        {
          front: 'Preferential Attachment',
          back: 'Mechanism where new nodes connect to existing nodes with high degrees.',
        },
        {
          front: 'Isomorphic Graphs',
          back: 'Graphs that are structurally identical through a node mapping.',
        },
      ],
    },
    {
      id: 4,
      title: 'Centrality Measures',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Degree and Closeness Centrality',
          body: '- **Degree:** Number of direct neighbors.\n- **Closeness:** Reciprocal of the sum of shortest paths; measures how fast information spreads from a node.',
        },
        {
          heading: 'Betweenness Centrality',
          body: 'Fraction of all-pairs shortest paths passing through a node. High betweenness nodes act as bridges or "brokers" between communities.',
        },
        {
          heading: 'Eigenvector Centrality',
          body: 'A node is central if its neighbors are central. Based on the leading eigenvalue and eigenvector of the adjacency matrix.',
        },
        {
          heading: 'PageRank',
          body: 'Iterative ranking where nodes transfer weight to out-neighbors. Includes a damping factor (typically 0.85) to handle "random surfers".',
        },
        {
          heading: 'Bellman Criterion',
          body: 'Node $u$ is on a shortest path between $s$ and $t$ if and only if $d(s, t) = d(s, u) + d(u, t)$. Used in betweenness calculations.',
        },
      ],
      questions: [
        {
          id: 'L4Q1',
          text: 'Which centrality measure uses the Bellman criterion?',
          options: ['Degree Centrality', 'Closeness Centrality', 'Betweenness Centrality', 'Eccentricity Centrality'],
          correct: [2],
          explanation: 'Betweenness centrality identifies nodes on shortest paths, which are validated by the Bellman criterion.',
          type: 'single',
        },
        {
          id: 'L4Q2',
          text: 'What does high Closeness Centrality indicate?',
          options: [
            'The node is a bridge between communities.',
            'The node can spread information quickly to all other nodes.',
            'The node has the most number of neighbors.',
            'The node is part of a large clique.',
          ],
          correct: [1],
          explanation: 'High closeness means a node is at a short average distance to all other nodes in the network.',
          type: 'single',
        },
        {
          id: 'L4Q3',
          text: 'In the PageRank algorithm, what is the purpose of the damping factor (alpha)?',
          options: [
            'To speed up convergence.',
            'To account for random jumps to any node in the network.',
            'To normalize the centrality scores to 1.',
            'To ignore nodes with zero out-degree.',
          ],
          correct: [1],
          explanation: 'The damping factor models the probability of a user jumping to a random page rather than following links.',
          type: 'single',
        },
        {
          id: 'L4Q4',
          text: 'Eigenvector centrality is based on which mathematical property of the adjacency matrix?',
          options: [
            'The determinant',
            'The trace',
            'The leading (principal) eigenvalue and its eigenvector',
            'The inverse of the matrix',
          ],
          correct: [2],
          explanation: 'Eigenvector centrality assigns scores proportional to the components of the principal eigenvector.',
          type: 'single',
        },
        {
          id: 'L4Q5',
          text: 'How is Eccentricity Centrality calculated?',
          options: [
            'C(u) = d(u)',
            'C(u) = 1 / e(u), where e(u) is the longest shortest path',
            'C(u) = sum of all path lengths',
            'C(u) = number of triangles / degree',
          ],
          correct: [1],
          explanation: 'Eccentricity centrality is the reciprocal of the eccentricity (longest shortest path).',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Betweenness Centrality',
          back: 'Measure of how often a node lies on the shortest paths between others.',
        },
        {
          front: 'Closeness Centrality',
          back: 'Reciprocal of the sum of distances to all other nodes.',
        },
        {
          front: 'Eigenvector Centrality',
          back: 'Importance of a node based on the importance of its neighbors.',
        },
        {
          front: 'Bellman Criterion',
          back: 'd(s,t) = d(s,u) + d(u,t) if u is on a shortest path from s to t.',
        },
        {
          front: 'Damping Factor (alpha)',
          back: 'Probability of following a link in PageRank (typically 0.85).',
        },
      ],
    },
    {
      id: 5,
      title: 'Network Randomization and Null Models',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'The Importance of Null Models',
          body: 'To determine if an observed property (like clustering) is significant, we compare it to a random graph (null model) that preserves some properties (like node count or degree sequence).',
        },
        {
          heading: 'Stub-Matching (Configuration Model)',
          body: 'Assigns "stubs" (half-edges) to nodes according to a desired degree sequence and pairs them randomly. \n\n```r\nstubs <- rep(seq_along(degr_seq), times = degr_seq)\nshuffled <- sample(stubs)\nedges <- matrix(shuffled, ncol = 2, byrow = TRUE)\n```',
        },
        {
          heading: 'Switch Randomization',
          body: 'Repeatedly selects pairs of edges $(A, B)$ and $(C, D)$ and swaps them to $(A, D)$ and $(C, B)$. This preserves the exact degree of every node while shuffling connectivity.',
        },
        {
          heading: 'Empirical P-values',
          body: 'Calculated by comparing the observed statistic ($S_{obs}$) to the distribution in $B$ randomized networks. $P = (count(S_{rand} \ge S_{obs}) + 1) / (B + 1)$.',
        },
        {
          heading: 'Network of Networks',
          body: 'The collection of all possible graphs with the same degree sequence forms a "meta-network" where nodes are graphs and edges are valid swaps.',
        },
      ],
      questions: [
        {
          id: 'L5Q1',
          text: 'What is the primary advantage of Switch Randomization over simple Erdos-Renyi models?',
          options: [
            'It is faster to compute.',
            'It preserves the exact degree of every node.',
            'It always results in a connected graph.',
            'It minimizes the clustering coefficient.',
          ],
          correct: [1],
          explanation: 'Switch randomization shuffles edges without changing the local degrees, providing a strict null model.',
          type: 'single',
        },
        {
          id: 'L5Q2',
          text: "What are 'stubs' in the context of network randomization?",
          options: [
            'Nodes with only one connection.',
            'Edges that connect back to the source.',
            'Half-edges associated with a node based on its degree.',
            'Self-loops in a multi-graph.',
          ],
          correct: [2],
          explanation: 'In the configuration model, degrees are represented as stubs that are paired to form full edges.',
          type: 'single',
        },
        {
          id: 'L5Q3',
          text: 'How is an empirical P-value calculated for a network property?',
          options: [
            'Using the standard Normal distribution.',
            'By counting how often random graphs show the property as extreme as the observed one.',
            'By dividing the number of edges by the number of nodes.',
            'Using the leading eigenvalue of the Laplacian.',
          ],
          correct: [1],
          explanation: 'Randomization tests generate a null distribution to see how "rare" the observed property is.',
          type: 'single',
        },
        {
          id: 'L5Q4',
          text: 'Why might a stub-matching procedure be repeated until a valid simple graph is found?',
          options: [
            'To ensure the graph is connected.',
            'To avoid self-loops and multi-edges.',
            'To increase the diameter of the graph.',
            'To ensure the degree distribution is Poisson.',
          ],
          correct: [1],
          explanation: 'Random pairing can accidentally create loops or parallel edges, which are often disallowed in simple graphs.',
          type: 'single',
        },
        {
          id: 'L5Q5',
          text: 'What does the "Network of Networks" concept represent?',
          options: [
            'The internet.',
            'The space of all possible graphs satisfying specific constraints.',
            'A hierarchical clustering of nodes.',
            'A bipartite graph of proteins and genes.',
          ],
          correct: [1],
          explanation: 'It describes the set of all equivalent graphs that can be reached via edge swaps.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Stub-Matching',
          back: 'Randomly pairing half-edges to realize a degree sequence.',
        },
        {
          front: 'Switch Randomization',
          back: 'Swapping edge endpoints to randomize connectivity while preserving degrees.',
        },
        {
          front: 'Null Model',
          back: 'A baseline random graph used for statistical comparison.',
        },
        {
          front: 'Empirical P-value formula',
          back: '(count_extreme + 1) / (total_random + 1).',
        },
        {
          front: 'Degre-Preserving',
          back: 'A randomization that keeps the degree of every node identical to the original graph.',
        },
      ],
    },
    {
      id: 6,
      title: 'Network Motifs',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Definition of a Network Motif',
          body: 'Small subgraphs (e.g., 3-node or 4-node patterns) that occur significantly more often than in randomized networks. They are the "functional building blocks" of the network.',
        },
        {
          heading: 'Z-score and Significance',
          body: 'Measures over-representation: $Z = (N_{obs} - \langle N_{rand} \rangle) / \sigma_{rand}$. High Z-scores indicate motifs; low Z-scores indicate anti-motifs.',
        },
        {
          heading: 'Coherent Feed-Forward Loop (FFL)',
          body: 'A common 3-gene motif: $X$ regulates $Y$ and $Z$, and $Y$ regulates $Z$. Functions as a persistence detector or sign-sensitive delay filter.',
        },
        {
          heading: 'Auto-Regulation',
          body: '- **Negative Auto-Regulation (NAR):** Product represses its own production; accelerates response time.\n- **Positive Auto-Regulation (PAR):** Product activates its own production; leads to bistability.',
        },
        {
          heading: 'Significance Profile (SP)',
          body: 'A normalized vector of Z-scores used to compare motif patterns across networks of different sizes and densities.',
        },
      ],
      questions: [
        {
          id: 'L6Q1',
          text: 'What is a "Network Motif"?',
          options: [
            'A node with many connections.',
            'A recurring subgraph that is statistically over-represented compared to a null model.',
            'A path that visits every node once.',
            'A cluster of nodes with high modularity.',
          ],
          correct: [1],
          explanation: 'Motifs are defined by their statistical significance relative to randomized versions of the same network.',
          type: 'single',
        },
        {
          id: 'L6Q2',
          text: 'What is the main functional benefit of Negative Auto-Regulation (NAR)?',
          options: [
            'It makes the response much slower.',
            'It provides response acceleration and stability against noise.',
            'It creates a permanent switch (bistability).',
            'It increases the diameter of the network.',
          ],
          correct: [1],
          explanation: 'NAR allows a gene to reach steady state faster and dampens fluctuations.',
          type: 'single',
        },
        {
          id: 'L6Q3',
          text: 'How is the Z-score for a motif calculated?',
          options: [
            'Z = N_obs / N_rand',
            'Z = (N_obs - Mean_rand) / StdDev_rand',
            'Z = log(N_obs)',
            'Z = count(triangles) / degree',
          ],
          correct: [1],
          explanation: 'The Z-score standardizes the observed count relative to the random distribution.',
          type: 'single',
        },
        {
          id: 'L6Q4',
          text: 'Which motif acts as a "persistence detector" or "delay" filter in gene circuits?',
          options: ['Single Input Module', 'Negative Feedback Loop', 'Feed-Forward Loop (FFL)', 'Star Topology'],
          correct: [2],
          explanation: 'The FFL can filter out short pulses of input, requiring a sustained signal to activate the target.',
          type: 'single',
        },
        {
          id: 'L6Q5',
          text: 'What does a high positive Z-score for a specific 3-node subgraph indicate?',
          options: [
            'The subgraph is an anti-motif.',
            'The subgraph is a network motif.',
            'The network is completely random.',
            'The node is an articulation point.',
          ],
          correct: [1],
          explanation: 'A high Z-score means the pattern is significantly more frequent than expected by chance.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Network Motif',
          back: 'Small subgraphs that appear more often than in random networks.',
        },
        {
          front: 'FFL',
          back: 'Feed-Forward Loop: X -> Y -> Z and X -> Z.',
        },
        {
          front: 'NAR Benefit',
          back: 'Response acceleration and noise stability.',
        },
        {
          front: 'Z-score formula',
          back: '(Observed - Mean) / StdDev.',
        },
        {
          front: 'Anti-motif',
          back: 'A subgraph that is significantly under-represented.',
        },
      ],
    },
    {
      id: 7,
      title: 'Network Clustering',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Modularity (Q)',
          body: 'Quantifies the quality of a partition: $Q = \\text{edges within} - \\text{expected edges in random model}$. $Q > 0.3$ usually indicates strong community structure.',
        },
        {
          heading: 'Spectral Clustering',
          body: 'Uses the Graph Laplacian ($L = D - A$). The eigenvector associated with the second smallest eigenvalue (Fiedler vector) is used to partition the graph.',
        },
        {
          heading: 'Hierarchical Clustering',
          body: '- **Agglomerative:** Bottom-up (start with $n$ clusters, merge iteratively).\n- **Ward\'s Method:** Merges clusters to minimize the increase in total within-cluster variance.',
        },
        {
          heading: 'QT (Quality Threshold) Clustering',
          body: 'Iteratively finds the largest possible cluster with a diameter less than a given threshold $D$. Ensures all members of a cluster are "close".',
        },
        {
          heading: 'Crisp vs. Soft Clustering',
          body: '- **Crisp:** Each node belongs to exactly one cluster.\n- **Soft/Fuzzy:** Nodes can belong to multiple clusters with membership degrees (reflecting multi-functional proteins).',
        },
      ],
      questions: [
        {
          id: 'L7Q1',
          text: 'What does the Modularity (Q) value measure?',
          options: [
            'The total number of nodes in a cluster.',
            'The density of edges within communities compared to a null model.',
            'The shortest path between two communities.',
            'The average degree of the network.',
          ],
          correct: [1],
          explanation: 'Modularity identifies if edges are concentrated within groups more than expected by chance.',
          type: 'single',
        },
        {
          id: 'L7Q2',
          text: 'In Spectral Clustering, which matrix is typically analyzed?',
          options: ['Adjacency Matrix', 'Incidence Matrix', 'Graph Laplacian', 'Correlation Matrix'],
          correct: [2],
          explanation: 'The Laplacian matrix properties (eigenvalues/vectors) reveal the connectivity structure of the graph.',
          type: 'single',
        },
        {
          id: 'L7Q3',
          text: 'Which clustering method requires pre-specifying a diameter threshold rather than the number of clusters?',
          options: ["Ward's Method", 'K-means', 'Spectral Clustering', 'QT Clustering'],
          correct: [3],
          explanation: 'QT clustering guarantees that the maximum distance within a cluster is below the threshold D.',
          type: 'single',
        },
        {
          id: 'L7Q4',
          text: "What is the 'Fiedler Vector'?",
          options: [
            'The eigenvector of the largest eigenvalue.',
            'The eigenvector corresponding to the second smallest eigenvalue of the Laplacian.',
            'A vector representing the degree distribution.',
            'The first column of the adjacency matrix.',
          ],
          correct: [1],
          explanation: 'The Fiedler vector provides an optimal linear embedding for graph partitioning.',
          type: 'single',
        },
        {
          id: 'L7Q5',
          text: 'Which hierarchical clustering linkage tends to produce "chain-like" clusters?',
          options: ['Complete Linkage', 'Average Linkage', 'Single Linkage', "Ward's Method"],
          correct: [2],
          explanation: 'Single linkage merges clusters based on the closest pair of points, often leading to long, thin structures.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Modularity Q',
          back: 'Measure of community structure quality.',
        },
        {
          front: 'Graph Laplacian',
          back: 'L = D - A.',
        },
        {
          front: 'Ward’s Method',
          back: 'Minimizes within-cluster variance during merging.',
        },
        {
          front: 'Fuzzy Clustering',
          back: 'Allows nodes to belong to multiple groups (overlapping communities).',
        },
        {
          front: 'Dendrogram',
          back: 'Tree diagram showing the nested sequence of cluster merges.',
        },
      ],
    },
    {
      id: 8,
      title: 'Gene Regulatory Network Inference',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Network Inference from Data',
          body: 'Constructing networks (e.g., GRNs) from high-throughput measurements like gene expression profiles using similarity or dependency measures.',
        },
        {
          heading: 'Mutual Information (MI)',
          body: 'A non-linear measure of dependence between random variables: $I(X; Y) = \sum P(x, y) \log[P(x, y) / (P(x)P(y))]$. Detects relationships that Correlation might miss.',
        },
        {
          heading: 'Relevance Networks',
          body: 'Connecting pairs of genes whose similarity (Correlation or MI) exceeds a threshold. Simple but can include many indirect interactions.',
        },
        {
          heading: 'ARACNE and CLR',
          body: '- **ARACNE:** Uses the Data Processing Inequality (DPI) to remove the weakest edge in every triplet, reducing indirect links.\n- **CLR:** Normalizes MI scores relative to the local background distribution to improve precision.',
        },
        {
          heading: 'Bipartite Graphs in Biology',
          body: 'Networks with two types of nodes (e.g., Transcription Factors and Target Genes) where edges only exist between different types.',
        },
      ],
      questions: [
        {
          id: 'L8Q1',
          text: 'Why is Mutual Information (MI) often preferred over Pearson Correlation for GRN inference?',
          options: [
            'It is easier to calculate.',
            'It can capture non-linear relationships between variables.',
            'It always ranges from -1 to 1.',
            'It only works for linear data.',
          ],
          correct: [1],
          explanation: 'Pearson correlation only measures linear association, whereas MI captures any statistical dependency.',
          type: 'single',
        },
        {
          id: 'L8Q2',
          text: 'What does the ARACNE algorithm use to reduce indirect interactions?',
          options: [
            'Principal Component Analysis',
            'Data Processing Inequality (DPI)',
            'The Bellman Criterion',
            'A damping factor of 0.85',
          ],
          correct: [1],
          explanation: 'DPI suggests that if $X \to Y \to Z$, then $I(X; Z)$ is less than or equal to $I(X; Y)$ and $I(Y; Z)$.',
          type: 'single',
        },
        {
          id: 'L8Q3',
          text: 'What characterizes a Bipartite Graph?',
          options: [
            'Every node has a degree of two.',
            'The nodes are divided into two sets, and edges only connect nodes from different sets.',
            'The graph contains no cycles of any length.',
            'The adjacency matrix is identity.',
          ],
          correct: [1],
          explanation: 'Bipartite graphs are used to model relationships like TF-Target or Drug-Protein interactions.',
          type: 'single',
        },
        {
          id: 'L8Q4',
          text: 'In the CLR algorithm, how are Mutual Information scores adjusted?',
          options: [
            'By taking the logarithm.',
            'By comparing them to the local background distribution (z-score-like normalization).',
            'By removing the strongest edge.',
            'By using the PageRank of the nodes.',
          ],
          correct: [1],
          explanation: 'Context Likelihood of Relatedness (CLR) accounts for the fact that some genes are promiscuous (high MI with everything).',
          type: 'single',
        },
        {
          id: 'L8Q5',
          text: 'What is a "differential network"?',
          options: [
            'A network that is changing over time.',
            'The difference in edges between two networks (e.g., healthy vs. disease).',
            'A network where nodes are derivatives.',
            'A network with only directed edges.',
          ],
          correct: [1],
          explanation: 'Differential networks highlight interactions that are specific to a condition or state.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'Mutual Information',
          back: 'Measure of statistical dependence; handles non-linearity.',
        },
        {
          front: 'DPI',
          back: 'Data Processing Inequality: used to prune indirect links.',
        },
        {
          front: 'ARACNE',
          back: 'Algorithm for GRN inference using MI and DPI.',
        },
        {
          front: 'CLR',
          back: 'Context Likelihood of Relatedness; normalizes MI scores.',
        },
        {
          front: 'Bipartite Graph',
          back: 'Graph where edges only connect nodes between two disjoint sets.',
        },
      ],
    },
    {
      id: 9,
      title: 'Network Models and Dimensionality Reduction',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'k-Nearest Neighbors (kNN) Network',
          body: 'A directed graph where each node connects to its $k$ most similar neighbors. Used to capture local structure in high-dimensional datasets like single-cell RNA-seq.',
        },
        {
          heading: 'Geometric Graphs: Gabriel and RNG',
          body: '- **Gabriel Graph:** $u, v$ connected if the disk with diameter $uv$ is empty.\n- **Relative Neighborhood Graph (RNG):** $u, v$ connected if no node $r$ is closer to both $u$ and $v$ than they are to each other.\n- **Hierarchy:** MST $\\subseteq$ RNG $\\subseteq$ Gabriel $\\subseteq$ Delaunay Triangulation.',
        },
        {
          heading: 'β-Skeleton Graphs',
          body: 'Generalizes geometric graphs using a forbidden region. $\\beta = 1$ is a Gabriel graph; $\\beta = 2$ is an RNG. Controls the sparsity and connectivity of the inferred network.',
        },
        {
          heading: 'Multidimensional Scaling (MDS)',
          body: 'Finds a low-dimensional embedding that preserves pairwise distances. Classical MDS uses eigenvalue decomposition of a double-centered distance matrix.',
        },
        {
          heading: 'IsoMap (Isometric Mapping)',
          body: 'Extends MDS to non-linear manifolds. It approximates geodesic distances using shortest paths in a kNN graph before applying MDS.',
        },
      ],
      questions: [
        {
          id: 'L9Q1',
          text: 'In a Gabriel graph, when are two points a and b considered adjacent?',
          options: [
            'If b is the single closest neighbor of a.',
            'If the closed ball with diameter ab contains no other point.',
            'If the Euclidean distance between them is less than a threshold beta.',
            'If they are part of the same k-means cluster.',
          ],
          correct: [1],
          explanation: 'The Gabriel criterion uses an empty-region check based on the segment ab as the diameter of a disk.',
          type: 'single',
        },
        {
          id: 'L9Q2',
          text: 'For which value of beta does the beta-skeleton graph match the Relative Neighborhood Graph (RNG)?',
          options: ['beta = 0.5', 'beta = 1.0', 'beta = 2.0', 'beta = 4.0'],
          correct: [2],
          explanation: 'The RNG corresponds to the intersection of two disks with radius d(u,v), which is the beta=2 skeleton.',
          type: 'single',
        },
        {
          id: 'L9Q3',
          text: 'What is the primary goal of Multidimensional Scaling (MDS)?',
          options: [
            'To find the shortest path between all nodes.',
            'To cluster objects into k groups.',
            'To embed objects in low dimensions such that distances are optimally preserved.',
            'To identify the most central node in a manifold.',
          ],
          correct: [2],
          explanation: 'MDS aims to preserve the global distance structure in a lower-dimensional space.',
          type: 'single',
        },
        {
          id: 'L9Q4',
          text: 'Which steps are part of the IsoMap algorithm?',
          options: [
            '1. kNN graph; 2. Geodesic distance (shortest paths); 3. MDS',
            '1. PCA; 2. K-means; 3. Centroid calculation',
            '1. Adjacency matrix; 2. Inversion; 3. PageRank',
            '1. Edge swap; 2. P-value; 3. Motif counting',
          ],
          correct: [0],
          explanation: 'IsoMap maps the manifold structure by first finding local neighbors and then following paths along the manifold.',
          type: 'single',
        },
        {
          id: 'L9Q5',
          text: 'Which of the following is typically a directed graph?',
          options: ['Gabriel graph', 'Relative neighborhood graph', 'k-nearest neighbors (kNN) network', 'beta-skeleton graph'],
          correct: [2],
          explanation: "kNN is directed because 'b is a neighbor of a' does not imply 'a is a neighbor of b'.",
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'kNN network',
          back: 'Directed graph where nodes connect to k most similar neighbors.',
        },
        {
          front: 'Gabriel Graph',
          back: 'Geometric graph where edge uv exists if the disk with diameter uv is empty.',
        },
        {
          front: 'Manifold',
          back: 'A space that locally resembles Euclidean space but can have complex global curvature.',
        },
        {
          front: 'IsoMap goal',
          back: 'Dimensionality reduction that preserves geodesic (along-the-manifold) distances.',
        },
        {
          front: 'Classical MDS',
          back: 'Dimensionality reduction using Eigendecomposition of centered distance matrices.',
        },
      ],
    },
    {
      id: 10,
      title: 'Network Flows',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Flow Network and Capacity',
          body: 'A flow network $G = (V, E, s, t, c)$ includes a source $s$, a sink $t$, and edge capacities $c(e) > 0$.',
        },
        {
          heading: 'st-Flow and Conservation',
          body: 'A flow $f$ must satisfy $0 \\le f(e) \\le c(e)$ and the sum of inflow must equal outflow for all nodes except $s$ and $t$.',
        },
        {
          heading: 'Augmenting Paths',
          body: 'An $s-t$ path in the **residual network** where additional flow can be pushed. The bottleneck capacity is the minimum residual capacity on the path.',
        },
        {
          heading: 'Ford-Fulkerson Algorithm',
          body: 'Finds max flow by repeatedly adding flow along augmenting paths until none remain. Improved versions use the residual graph to allow "undoing" flow on backward edges.',
        },
        {
          heading: 'Max-Flow Min-Cut Theorem',
          body: 'The maximum value of an st-flow is equal to the minimum capacity of an st-cut. A cut $(A, B)$ partitions nodes such that $s \\in A$ and $t \\in B$.',
        },
      ],
      questions: [
        {
          id: 'L10Q1',
          text: "What is the 'bottleneck capacity' of an augmenting path?",
          options: [
            'The sum of all capacities in the path.',
            'The maximum capacity among all edges.',
            'The minimum value of (c(e) - f(e)) along the path.',
            'The capacity of the first edge leaving s.',
          ],
          correct: [2],
          explanation: 'The bottleneck capacity determines the maximum increment of flow possible along that specific path.',
          type: 'single',
        },
        {
          id: 'L10Q2',
          text: "How is a 'backward edge' defined in a residual network Gf?",
          options: [
            'An edge with negative capacity.',
            'An edge created if f(e) > 0, with capacity equal to f(e).',
            'An edge that connects t to s.',
            'A loop back to the current node.',
          ],
          correct: [1],
          explanation: 'Backward edges allow the algorithm to decrease flow on an edge, essentially redirecting it.',
          type: 'single',
        },
        {
          id: 'L10Q3',
          text: 'Which condition is equivalent to flow f being a maximum flow in G?',
          options: [
            'All edges are saturated.',
            'The residual network Gf contains no augmenting paths.',
            'The source s has no outgoing edges.',
            'The value of the flow is zero.',
          ],
          correct: [1],
          explanation: 'This is the core of the Max-Flow/Min-Cut theorem.',
          type: 'single',
        },
        {
          id: 'L10Q4',
          text: 'In an st-cut (A, B), how is the capacity calculated?',
          options: [
            'Sum of all edges in the graph.',
            'Sum of capacities of edges going from A to B.',
            'Sum of capacities of edges going from B to A.',
            'Average capacity of edges incident on s.',
          ],
          correct: [1],
          explanation: 'Only edges crossing the partition from the source side (A) to the sink side (B) contribute to cut capacity.',
          type: 'single',
        },
        {
          id: 'L10Q5',
          text: 'According to weak duality, what is the relationship between flow value and cut capacity?',
          options: ['val(f) >= cap(A, B)', 'val(f) <= cap(A, B)', 'val(f) = cap(A, B) / 2', 'No fixed relationship'],
          correct: [1],
          explanation: 'The value of any flow is bounded above by the capacity of any cut.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'st-cut',
          back: 'A partition of nodes into A and B where s is in A and t is in B.',
        },
        {
          front: 'Max-Flow Min-Cut',
          back: 'The maximum st-flow value equals the minimum st-cut capacity.',
        },
        {
          front: 'Residual Network',
          back: 'Graph showing remaining capacities and possible flow redirections.',
        },
        {
          front: 'Flow Conservation',
          back: 'Sum of flow in = Sum of flow out (except for source and sink).',
        },
        {
          front: 'Augmenting Path',
          back: 'A path from source to sink with positive residual capacity.',
        },
      ],
    },
    {
      id: 11,
      title: 'Alignment of Molecular Networks',
      speaker: 'Prof. Dr. Zoran Nikoloski',
      concepts: [
        {
          heading: 'Local vs. Global Alignment',
          body: '- **LNA:** Finds small, highly conserved regions; allows many-to-many mappings.\n- **GNA:** Finds large conserved regions across species; identifies one-to-one functional orthologs.',
        },
        {
          heading: 'Network Alignment Objective',
          body: 'Identifies similarities between interactomes of different species or tissues to study evolution and functional conservation.',
        },
        {
          heading: 'The Matching Problem',
          body: 'Alignment can be cast as finding a **Maximum Bipartite Weighted Matching**, where node pairs have similarity scores (e.g., BLAST + topology).',
        },
        {
          heading: 'IsoRank Algorithm',
          body: 'A recursive algorithm where similarity $R_{ij}$ between nodes $i$ and $j$ depends on the similarity of their neighbors. $R = AR$.',
        },
        {
          heading: 'Integrating Sequence and Topology',
          body: 'Modified IsoRank: $R = \\alpha AR + (1 - \\alpha)E$, where $E$ is sequence similarity (BLAST) and $\\alpha$ controls the weight of network topology.',
        },
      ],
      questions: [
        {
          id: 'L11Q1',
          text: 'Which type of alignment typically results in one-to-one node mappings?',
          options: [
            'Local Network Alignment (LNA)',
            'Global Network Alignment (GNA)',
            'kNN Alignment',
            'Spectral Alignment',
          ],
          correct: [1],
          explanation: 'GNA aims for a global, consistent mapping between entire networks.',
          type: 'single',
        },
        {
          id: 'L11Q2',
          text: 'In the IsoRank algorithm, how is the similarity score computed?',
          options: [
            'Based only on BLAST scores.',
            'Based on the similarity of the neighbors.',
            'Using the shortest path between the two networks.',
            'By counting triangles in a modular product.',
          ],
          correct: [1],
          explanation: 'IsoRank assumes that similar nodes are connected to other similar nodes.',
          type: 'single',
        },
        {
          id: 'L11Q3',
          text: "What does the parameter 'alpha' control in IsoRank?",
          options: [
            'The number of iterations.',
            'The damping of the PageRank.',
            'The trade-off between topology and sequence similarity.',
            'The diameter of the aligned region.',
          ],
          correct: [2],
          explanation: 'Alpha balances the contribution of interaction patterns vs. protein sequence homology.',
          type: 'single',
        },
        {
          id: 'L11Q4',
          text: 'What are characteristics of Local Network Alignment (LNA)?',
          options: [
            'Finds small conserved regions; results in many-to-many mappings.',
            'Always one-to-one mapping.',
            'Requires identical degree distributions.',
            'Only works for ER graphs.',
          ],
          correct: [0],
          explanation: 'LNA captures conserved sub-modules which might appear multiple times.',
          type: 'single',
        },
        {
          id: 'L11Q5',
          text: 'How can the matching problem in IsoRank be solved efficiently?',
          options: [
            'Using k-means clustering.',
            'By casting it as a Max-Flow problem on a bipartite graph.',
            'Using the Havel-Hakimi algorithm.',
            'Using depth-first search on the power set.',
          ],
          correct: [1],
          explanation: 'Maximum bipartite weighted matching can be solved via network flow optimization.',
          type: 'single',
        },
      ],
      flashcards: [
        {
          front: 'GNA vs LNA',
          back: 'GNA is global/one-to-one; LNA is local/many-to-many.',
        },
        {
          front: 'Functional Orthologs',
          back: 'Proteins in different species that play the same functional role, often detected via GNA.',
        },
        {
          front: 'IsoRank principle',
          back: 'Recursive topological similarity combined with sequence homology.',
        },
        {
          front: 'Matching',
          back: 'A set of edges with no shared vertices.',
        },
        {
          front: 'BLAST in Alignment',
          back: 'Provides the sequence similarity component (E) for network alignment algorithms.',
        },
      ],
    },
  ],
}


