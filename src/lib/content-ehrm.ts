import type { Content } from './types'

export const content: Content = {
  lectures: [
    {
      id: 1,
      title: 'The Digital HR Organization',
      speaker: 'Prof. Dr. Sven Laumer',
      concepts: [
        {
          heading: 'What is Human Resource Management?',
          body: 'Human Resource Management (**HRM**) is the structured provision of human resource capacity — covering both **dispositive** (planning-oriented) and **object-related** (execution-oriented) human work performance — across five mandatory dimensions:\n\n| Dimension | What it specifies |\n|-----------|-------------------|\n| **Quantity** | How many people are required |\n| **Quality** | Which qualifications and skills are needed |\n| **Time** | When the capacity must be available |\n| **Duration** | How long the capacity is required |\n| **Location** | Where the work must be performed |\n\nA definition that omits any one of these five dimensions is considered incomplete. HRM encompasses all operational, tactical, and strategic processes that serve to provide and manage motivated employees. It can be examined at the **macro level** (activities not directly tied to individuals, such as workforce planning policies) and at the **micro level** (activities that relate directly to individual employees).',
        },
        {
          heading: 'Superordinate vs Company-Specific Factors',
          body: 'HRM does not operate in isolation — the organizational environment shapes both the instruments and the effectiveness of personnel management. Environmental conditions fall into two categories:\n\n**Superordinate factors** are external, societal-level forces that apply to all organizations:\n- **Labour law and regulations** — governing employment relations, equal treatment, and health/pension obligations\n- **Labour market** — the available supply of workers and their characteristics (skills, values, attitudes)\n- **Education system** — influencing the qualifications candidates bring to the labor market\n- **Interest groups** — such as trade unions, which shape compensation and working conditions\n- **Economic cycle** — affecting organizational hiring budgets and headcount decisions\n\n**Company-specific factors** are internal or market-driven forces unique to each organization:\n- **Corporate strategy** — determines HRM priorities and budget allocation\n- **Degree of internationalization** — influences incentive design across different cultures\n- **Target market conditions** — shape the competence requirements that development programs must build\n- **Technology environment** — determines which digital skills employees need\n- **Employer image** — affects the organization\'s attractiveness to potential candidates\n\nThese two categories interact: a change in labour law (superordinate) may directly shift a company\'s retention or compensation strategy (company-specific).',
        },
        {
          heading: 'Objectives of HRM',
          body: 'The overriding aim of HRM is to align the workforce with corporate goals by securing and developing qualified, motivated personnel — sustaining the organization\'s competitiveness. This purpose is expressed through a hierarchy of objectives.\n\n**Formal objectives** define what HRM must ultimately achieve:\n\n| Formal objective type | Examples |\n|----------------------|----------|\n| **Economic objectives** | Optimal use of the human resource; increasing work performance through material and immaterial incentives; optimizing performance willingness |\n| **Social objectives** | Meeting employees\' interests and expectations; improving tangible aspects (pay) and intangible aspects (flexible hours, development opportunities) |\n\n**Tactical (factual) objectives** do not sit alongside formal objectives as a separate category. Instead, they describe **how** formal objectives are achieved. The primary tactical objective is to provide HR capacity across all five dimensions (quantity, quality, time, duration, location), ensuring that operational service creation can proceed.\n\nA common exam trap: economic objectives and social objectives are both **formal**. Tactical objectives are the operationalization layer — describing the means, not the ends.',
        },
        {
          heading: 'Processes and Activities in HRM',
          body: 'HRM activities are organized into **business processes** — sequences of related tasks in which HR data is processed. The application systems that support these processes are collectively called **Human Resources Information Systems (HRIS)**.\n\nHRM processes fall into three groups:\n\n**Processes for controlling employee provisioning** (securing the right workforce):\n- **Human Resource Planning** — demand and supply analyses to determine future headcount needs\n- **Recruiting** — selection and hiring to meet quantity, quality, time, and location requirements\n- **Employment** — allocating employees to positions that match their skills and organizational needs\n- **Development** — building qualifications through training, career planning, and work structuring\n- **Termination** — managing workforce reductions triggered by economic, technical, or organizational changes\n\n**Processes for controlling performance readiness** (motivation and behavior):\n- **Leadership** — increasing employee performance through communication and organizational instruments\n- **Compensation** — position-oriented, competence-oriented, or performance-related reward systems\n- **Assessment** — evaluating past performance and future potential against defined criteria\n\n**Cross-sectional processes** (support all other processes):\n- **Administration & Retention** — recording and providing personnel master data and statistics\n- **Controlling** — supplying quantitative and qualitative key figures (e.g. turnover rate, satisfaction scores) to support management decisions',
        },
        {
          heading: 'From HRM to e-HRM',
          body: 'The integration of IT into HRM has developed across several decades:\n\n| Era | Key development |\n|-----|----------------|\n| **1960s** | Proliferation of commercial computer hardware; early centralized computing systems |\n| **1970s** | Mainframe programs (e.g. SAP) for payroll and accounting on centralized database architecture |\n| **1980s** | Widespread application of IT to HR functions; shift from administrative to strategic role |\n| **1990s** | ERP systems integrated HR with finance, operations, and supply chain in a shared database |\n| **2000s** | Web-based systems enabled browser access; automation of transactional HR processes |\n| **2010s** | Social media, mobile apps, and cloud platforms extended digital reach |\n| **2020s** | Artificial intelligence applications in HR |\n\n**e-HRM** is defined as web-based, interactive human resource management systems that provide real-time information and enable organizations and employee end-users to access HR functions and enter or retrieve HR-related data from anywhere through a web browser.\n\nThe benefits of e-HRM extend well beyond administrative efficiency: organizations can recruit talent from geographically distributed labor markets, post vacancies globally, automatically screen applications, administer selection tests online, and conduct virtual interviews. e-HRM has become a **critical part of organizational infrastructure**, freeing HR professionals from routine tasks to focus on strategic and consultative roles.',
        },
        {
          heading: 'What is a Work System?',
          body: 'Work System Theory provides a structured lens for analyzing and redesigning how organizations perform their work. A **work system** is defined as a system in which human participants and/or machines perform work using information, technology, and other resources to produce **products and/or services** for internal or external customers.\n\nEvery work system contains six core elements:\n\n| Element | Description |\n|---------|-------------|\n| **Work Practices / Business Processes** | Activities performed within the system — information processing, decision-making, communication, coordination, and physical action |\n| **Participants** | People who carry out the work. The role of "participant" is broader than "IT user" since many activities are not IT-mediated |\n| **Information** | Both codified information (structured data in systems) and non-codified information (verbal agreements, informal conversations) used and created during work |\n| **Technologies** | Tools — from spreadsheets to enterprise software — that help participants work efficiently |\n| **Products & Services** | The physical things, information products, and services the work system produces for its customers |\n| **Customers** | Those who receive, use, or directly benefit from the system\'s outputs — including both external customers and internal customers in other departments |\n\nSurrounding the six core elements are **environment**, **infrastructure** (shared resources across work systems), and **strategies** (which must align with organizational goals). Changes anywhere — new strategy, environmental shifts, or digital innovation — propagate through the interconnected elements.',
        },
        {
          heading: 'The HR Work System',
          body: 'Applying Work System Theory to HRM yields an **HR work system** — a structured description of how HR activities are organized. A practical tool for this is the **work system snapshot**: a concise, one-page summary that maps all six core elements for either the current ("as-is") or redesigned ("to-be") state.\n\nExample snapshot for a recruiting process:\n\n| Element | Content |\n|---------|--------|\n| **Customers** | Hiring manager, applicants, HR department, top management |\n| **Products & Services** | A newly hired employee; complete candidate database record; offer or rejection letter |\n| **Work Practices** | Posting vacancies, screening CVs, conducting interviews, communicating decisions |\n| **Participants** | HR employees, staffing coordinator, business managers, other interviewers |\n| **Information** | Job requisition, CVs, interview feedback, offer and rejection letters |\n| **Technologies** | Email, e-recruiting software, enterprise network, candidate database |\n\nThe evolution of the **recruiter role** illustrates how digital transformation reshapes the HR work system over time: from a generalist using print ads and typewriters (~2000) → **E-Recruiter** (career websites, applicant tracking systems) → **Social Recruiter** (social media, employer branding) → **Mobile Recruiter** (smartphones, apps) → **Digital (Robo) Recruiter** (recommendation systems, chatbots, AI-driven pre-selection).\n\nThe key Work System Theory insight: people are **participants** first and technology users second. Digital innovation changes not just the IT, but the work practices, participant roles, and products delivered.',
        },
        {
          heading: 'Digitalization and Process Standardization',
          body: 'A central finding in e-HRM research is that digitalization and process standardization are closely linked. Studies confirm a **positive significant correlation** between these two dimensions: organizations that rigorously define, document, and monitor their HR processes tend to score higher on digital transformation.\n\n**Process-standardization score** (scale 1–7) measures six factors:\n1. Roles and rights of employees defined as part of process documentation\n2. Defined interfaces and APIs between HR processes\n3. Explicit definition and documentation of HR processes\n4. Continuous monitoring and improvement of HR processes\n5. Process results clearly defined and aligned with enterprise goals\n6. Key figures available for process costs, time, and quality\n\nEmpirical benchmarks (Weitzel et al., 2020): Top-1,000 companies average **5.0** on process standardization and **4.1** on digitalization; IT companies average **5.3** and **4.5** respectively.\n\nPractical implication: **"The greater the focus on processes and activities, the greater the digital transformation of HR."** Simply investing in technology without first standardizing the underlying processes yields limited returns. Organizations that identify, analyze, improve, and monitor their HR processes find that effective digitalization follows more naturally.',
        },
        {
          heading: 'The Digital HR Strategy: WHAT and HOW',
          body: 'A digital HR strategy defines the goals and the execution path for HR digital transformation. Research identifies two equally important dimensions that must be addressed simultaneously:\n\n**The WHAT** — the digital HR agenda (what to pursue):\n\n| Priority area | Components |\n|--------------|------------|\n| **Customer Experience of HR (CxHR)** | Agile service design; customer experience management; application and machine intelligence |\n| **Skill-based Organization of Work** | Networks and collaboration; skill management; network leadership |\n| **Workforce Analytics** | Descriptive analytics; workforce planning; predictive analytics |\n\nThe conventional "wrong" approach treats the WHAT as "buy new technology" — a heavy investment in HRIS that keeps HR teams busy with implementation rather than generating genuine business value.\n\n**The HOW** — the HR innovation capabilities required to execute the agenda:\n\n| HOW element | Traditional approach | Innovation-oriented approach |\n|-------------|---------------------|-----------------------------|\n| **Behaviors** | Compliance guardians | Cross-functional innovators |\n| **Skills** | HR and talent specialists | Design thinking and analytics |\n| **Technology Tools** | Automation drivers | Innovation anchors |\n| **KPIs** | Cost and engagement | CxHR and organization agility |\n| **Community** | HR specialists only | Like-minded digital innovators |\n\n**A balanced digital HR strategy** requires addressing both the WHAT and the HOW simultaneously. Focusing only on technology (WHAT) without building capabilities and culture (HOW) reduces digital HR to a system replacement. The integrated approach combines: setting the digital HR agenda; managing HR through a customer experience lens; maximizing HRIS returns; and building an HR innovation culture.',
        },
      ],
      questions: [
        {
          id: 'L1Q1',
          conceptIndex: 0,
          type: 'single',
          text: 'Which of the following is NOT one of the five required dimensions in a complete definition of Human Resource Management?',
          options: [
            'The required quantity of human resources',
            'The right time at which capacity must be available',
            'The budget allocated for personnel costs',
            'The respective location where work is performed',
            'The required duration for which capacity is needed',
          ],
          correct: [2],
          explanation: 'The five dimensions of the HRM definition are: quantity, quality, time, duration, and location. Budget allocation is not part of the foundational definition — it may influence HRM activities but does not appear as one of the five mandatory dimensions. A definition missing any of the five listed dimensions (quantity, quality, time, duration, location) would also be incomplete.',
        },
        {
          id: 'L1Q2',
          conceptIndex: 2,
          type: 'multiple',
          text: 'Which TWO of the following describe formal objectives of HRM?',
          options: [
            'Providing HR capacity in the required quantity and quality at the right time and location',
            'Optimal use of the resource personnel and an increase in work performance through incentives',
            'Meeting the interests and expectations of individual employees regarding pay and working conditions',
            'Standardizing HR processes through defined roles and documented workflows',
          ],
          correct: [1, 2],
          explanation: 'Formal objectives are the top-level goals of HRM, divided into economic objectives (option B: optimal personnel use, increasing performance through incentives) and social objectives (option C: meeting employee interests and improving pay and working conditions). Option A describes the primary tactical objective — the "how" that delivers formal goals. Option D describes process standardization, which is not a formal HRM objective category.',
        },
        {
          id: 'L1Q3',
          conceptIndex: 5,
          type: 'single',
          shuffle: false,
          text: 'A work system snapshot for a hiring process lists three items: (1) "staffing coordinator, HR assistants, business manager, and other interviewers"; (2) "job requisitions, CVs from applicants, interview notes, and offer/rejection letters"; (3) "a newly hired employee, a complete candidate record, and a formal offer or rejection letter". Which assignment correctly maps each item to its work system element?',
          options: [
            '(1) Participants  ·  (2) Information  ·  (3) Products & Services',
            '(1) Customers  ·  (2) Information  ·  (3) Work Practices',
            '(1) Participants  ·  (2) Technologies  ·  (3) Products & Services',
            '(1) Customers  ·  (2) Products & Services  ·  (3) Work Practices',
          ],
          correct: [0],
          explanation: 'Item (1) lists the people who carry out the work — these are Participants (not Customers, who receive the output). Item (2) lists structured and unstructured data used and created during the process — this is Information (not Technologies, which are the tools used). Item (3) lists what the work system produces for its customers — these are Products and Services. Customers in this work system would be the hiring manager, applicants, and top management.',
        },
        {
          id: 'L1Q4',
          conceptIndex: 5,
          type: 'multiple',
          text: 'Which of the following are among the six core elements of a work system according to Work System Theory? Select ALL that apply.',
          options: [
            'Participants',
            'Information',
            'Strategy',
            'Technologies',
            'Work Practices / Business Processes',
            'Products & Services',
            'Infrastructure',
          ],
          correct: [0, 1, 3, 4, 5],
          explanation: 'The six core elements of a work system are: Work Practices/Business Processes, Participants, Information, Technologies, Products & Services, and Customers. From the given options, five of the six core elements appear. Strategy and Infrastructure are part of the surrounding work system framework — they influence the system from outside but are not among the six elements that actually perform the work.',
        },
        {
          id: 'L1Q5',
          conceptIndex: 8,
          type: 'single',
          text: 'FAUBank\'s HR director launches a digital HR initiative by investing heavily in cloud-based HRIS technology but does not address HR team behaviors, skills, KPIs, or culture. Based on the digital HR strategy framework, which statement best evaluates this approach?',
          options: [
            'This is the recommended approach — modern HRIS technology is the primary driver of successful digital HR transformation.',
            'This approach addresses the WHAT but neglects the HOW, risking a transformation that amounts to little more than a system replacement.',
            'This is a balanced strategy because technology investment inevitably drives process and capability changes.',
            'Focusing on the HOW first — without any technology investment — is the correct sequence.',
          ],
          correct: [1],
          explanation: 'A successful digital HR strategy requires balancing both the WHAT (digital agenda: customer experience, skill-based work, workforce analytics) and the HOW (capabilities to execute: behaviors, skills, tools, KPIs, community). Investing only in technology addresses the WHAT superficially but ignores the HOW. This "conventional path" is described as high-risk — it reduces HR digitalization to a system replacement rather than genuine transformation that generates business value.',
        },
        {
          id: 'L1Q6',
          conceptIndex: 4,
          type: 'single',
          text: 'Which statement correctly defines e-HRM?',
          options: [
            'e-HRM refers to any electronic device used by HR departments to store employee records.',
            'e-HRM is web-based interactive HR management systems that provide real-time information, enabling organizations and end-users to access HR functions and retrieve HR data from anywhere through a web browser.',
            'e-HRM is the automation of payroll and accounting processes using mainframe programs first introduced in the 1970s.',
            'e-HRM describes digitalized job advertisement placement on internet job boards.',
          ],
          correct: [1],
          explanation: 'The precise definition of e-HRM emphasizes three key characteristics: (1) web-based and interactive, (2) real-time information availability, and (3) access from anywhere through a web browser — for both organizational administrators and individual employee end-users. Options A, C, and D all describe narrower or earlier forms of HR IT adoption that do not capture the full scope of e-HRM.',
        },
        {
          id: 'L1Q7',
          conceptIndex: 7,
          type: 'multiple',
          text: 'Which TWO conclusions are supported by research on the relationship between process standardization and digitalization in HR?',
          options: [
            'Investing in HR technology automatically raises process standardization as a side effect.',
            'There is a positive significant correlation between process standardization and digitalization — higher standardization is associated with higher digitalization scores.',
            'Organizations that rigorously define, document, and monitor their HR processes are better positioned for successful digitalization.',
            'Process standardization is only relevant in IT companies; Top-1,000 companies in other industries can digitalize without it.',
          ],
          correct: [1, 2],
          explanation: 'Research (Weitzel et al., 2020) confirms a statistically significant positive correlation between the process-standardization score and the digitalization score across both Top-1,000 and IT companies. The practical conclusion is that a strong focus on defining and improving HR processes precedes and enables effective digitalization. Option A reverses the causal relationship. Option D is incorrect — the positive correlation is observed across both sectors.',
        },
      ],
      flashcards: [
        {
          front: 'What are the five required dimensions of HRM?',
          back: 'A complete HRM definition specifies provision of capacity across:\n1. **Quantity** — how many people\n2. **Quality** — which qualifications and skills\n3. **Time** — when the capacity is needed\n4. **Duration** — how long it is required\n5. **Location** — where the work must be performed\n\nOmitting any one dimension makes the definition incomplete.',
        },
        {
          front: 'Superordinate factors in HRM — what are they?',
          back: 'External, societal-level forces that apply to all organizations:\n- **Labour law and regulations**\n- **Labour market** (supply and characteristics of workers)\n- **Education system**\n- **Interest groups** (e.g. trade unions)\n- **Economic cycle**',
        },
        {
          front: 'Company-specific factors in HRM — what are they?',
          back: 'Internal or market-driven forces unique to each organization:\n- **Corporate strategy** (sets HRM budget and priorities)\n- **Degree of internationalization**\n- **Target market conditions**\n- **Technology environment**\n- **Employer image**',
        },
        {
          front: 'What is the difference between formal and tactical objectives in HRM?',
          back: '**Formal objectives** define the ultimate goals:\n- Economic objectives (optimal use of personnel, increasing performance)\n- Social objectives (meeting employee interests, pay, flexibility)\n\n**Tactical (factual) objectives** describe *how* formal objectives are achieved — chiefly by providing HR capacity across all five dimensions. They operationalize formal goals rather than competing with them.',
        },
        {
          front: 'What is e-HRM?',
          back: '**e-HRM** = web-based interactive human resource management systems that provide real-time information and enable organizations and employee end-users to access HR functions and enter or retrieve HR-related data from anywhere through a web browser.',
        },
        {
          front: 'What is a work system?',
          back: 'A **work system** is a system in which human participants and/or machines perform work using information, technology, and other resources to produce products and/or services for internal or external customers. (Alter, 2013)\n\nKey insight: people are participants in the work system first, and technology users second.',
        },
        {
          front: 'What are the six core elements of a work system?',
          back: '1. **Work Practices / Business Processes**\n2. **Participants** — people who carry out the work\n3. **Information** — codified and non-codified data\n4. **Technologies** — tools supporting participants\n5. **Products & Services** — outputs produced\n6. **Customers** — those who receive the outputs\n\n(Environment, infrastructure, and strategies surround these six core elements.)',
        },
        {
          front: 'What is a work system snapshot?',
          back: 'A concise, one-page summary of a work system that maps all six core elements (customers, products & services, work practices, participants, information, technologies). Used to describe the current ("as-is") or redesigned ("to-be") state of a work system.',
        },
        {
          front: 'What is the process-standardization score?',
          back: 'A composite measure (scale 1–7) of how rigorously an organization has defined, documented, and monitors its HR processes. Six factors: defined roles/rights, process interfaces/APIs, documentation, continuous monitoring, enterprise goal alignment, and cost/time/quality KPIs.\n\nBenchmarks: Top-1,000 avg ≈ 5.0; IT companies avg ≈ 5.3.',
        },
        {
          front: 'What is the key finding about process standardization and HR digitalization?',
          back: 'There is a **positive significant correlation**: organizations with higher process standardization scores also score higher on digitalization. "The greater the focus on processes and activities, the greater the digital transformation of HR." (Weitzel et al., 2020)',
        },
        {
          front: 'What does the WHAT of a digital HR strategy include?',
          back: 'The **WHAT** = the digital HR agenda. Three priority areas:\n1. **Customer Experience of HR (CxHR)** — agile service design, customer experience management, AI\n2. **Skill-based Organization of Work** — networks, skill management, network leadership\n3. **Workforce Analytics** — descriptive analytics, workforce planning, predictive analytics',
        },
        {
          front: 'Why must a digital HR strategy balance WHAT and HOW?',
          back: 'The **WHAT** (technology agenda) alone is not enough — the **HOW** (HR innovation capabilities: behaviors, skills, tools, KPIs, community) must be developed simultaneously. A strategy that focuses only on technology risks reducing digital HR to a system replacement, missing the genuine transformation and business value creation opportunity.',
        },
      ],
    },
    { id: 2, title: 'Human Resources Information Systems', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 3, title: 'Workflow Management & HRM', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 4, title: 'Enterprise Social Media & Network Analysis for HRM', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 5, title: 'Social Media, Employer Branding & Gamification', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 6, title: 'People Analytics — Big Data, AI & HRM', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 7, title: 'Recommender Systems', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 8, title: 'E-Performance, E-Learning & Employee Development', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
    { id: 9, title: 'Technology Acceptance', speaker: 'Prof. Dr. Sven Laumer', concepts: [], questions: [], flashcards: [] },
  ],
}
