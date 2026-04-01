// src/lib/exam-prep-re.ts
import { registerExamPrepExams, type ExamPrepExam } from './exam-prep'

const exams: ExamPrepExam[] = [
  {
    id: 'tutorial-3',
    title: 'Tutorial 3 – Solar PV (WS 2024/25)',
    scenario: `## Greek Island Solar PV System

A Greek island has **5,000 households**. Average household electricity consumption is **4,000 kWh/year**. The island is to be powered entirely by solar PV with battery storage.

**PV Module specs:**
- Rated power: 400 Wp
- Efficiency at STC: 20%
- Active area: 2 m²
- Temperature coefficient: −0.4 %/°C
- STC temperature: 25 °C, Operating temperature: 45 °C

**Battery specs:**
- Capacity: 10 kWh/unit
- Depth of discharge (DoD): 80%
- Round-trip efficiency: 90%

**Peak sun hours:** 5 h/day

**LCOE inputs:**
- Specific investment: €1,200/kWp
- Lifetime: 25 years
- Discount rate: 5%
- O&M: 1% of investment/year
- Annual degradation: 0.5%`,
    tasks: [
      {
        id: 1,
        text: 'Calculate the total annual electricity demand of the island [kWh/year].',
        unit: 'kWh/year',
        answer: 20000000,
        tolerance: 0.01,
        choices: [15000000, 18000000, 20000000, 25000000],
        explanation: '5,000 households × 4,000 kWh/year = 20,000,000 kWh/year.',
      },
      {
        id: 2,
        text: 'What is the PV module efficiency at the operating temperature of 45 °C?',
        unit: '%',
        answer: 18.4,
        tolerance: 0.05,
        choices: [17.8, 18.4, 19.2, 20.0],
        explanation: 'η_op = η_STC × [1 + α × (T_op − T_STC)] = 20% × [1 + (−0.004) × (45 − 25)] = 20% × 0.92 = 18.4%.',
      },
      {
        id: 3,
        text: 'How many battery units are needed to cover exactly 1 day of island-wide demand? (round up to nearest whole number)',
        unit: 'units',
        answer: 7611,
        tolerance: 0.02,
        choices: [5000, 6500, 7611, 8200],
        explanation: 'Daily demand = 20,000,000 / 365 ≈ 54,795 kWh. Usable energy per unit = 10 × 0.80 × 0.90 = 7.2 kWh. Units = ⌈54,795 / 7.2⌉ = 7,611.',
      },
      {
        id: 4,
        text: 'How many PV modules are needed to meet the daily demand in the available peak sun hours, using the operating efficiency? (round up)',
        unit: 'modules',
        answer: 29779,
        tolerance: 0.02,
        choices: [22000, 25000, 29779, 35000],
        explanation: 'Required power = daily demand / peak sun hours = (20,000,000/365) / 5 ≈ 10,959 kW. Module output at operating temp = 400 W × (18.4/20) = 368 W. Modules = ⌈10,959,000 / 368⌉ = 29,779.',
      },
      {
        id: 5,
        text: 'Calculate the Levelised Cost of Energy (LCOE) [€/kWh]. Use the annuity method for capital costs.',
        unit: '€/kWh',
        answer: 0.057,
        tolerance: 0.10,
        choices: [0.042, 0.057, 0.071, 0.089],
        explanation: 'Total capacity = 29,779 × 0.4 kWp = 11,912 kWp. Investment = 11,912 × 1,200 = €14,294,400. Annuity factor (5%, 25yr) = 0.07095. Capital cost = €1,014,600/yr. O&M = €142,944/yr. Avg annual production (0.5% degradation over 25yr ≈ 93.9% factor) ≈ 20,426,000 kWh/yr. LCOE = (1,014,600 + 142,944) / 20,426,000 ≈ €0.057/kWh.',
      },
    ],
  },
  {
    id: 'tutorial-4',
    title: 'Tutorial 4 – Wind Turbines (SS 2025)',
    scenario: `## Patagonian Wind Farm

A remote community in Patagonia has **10,000 inhabitants**. Average electricity consumption is **3 kWh/person/day**. The community is to be powered by wind turbines and any surplus electricity is used for desalination (replacing diesel generators).

**Wind turbine specs:**
- Rated power: 2 MW/turbine
- Capacity factor: 35%
- Lifetime: 20 years

**Financial parameters:**
- Specific investment: €1,500,000/MW
- Discount rate: 6%
- O&M: 2% of investment/year

**Desalination:** Surplus wind electricity replaces diesel generation at an avoided cost of **€0.15/kWh**.`,
    tasks: [
      {
        id: 1,
        text: 'Calculate the total annual electricity demand of the community [kWh/year].',
        unit: 'kWh/year',
        answer: 10950000,
        tolerance: 0.01,
        choices: [8000000, 9500000, 10950000, 12500000],
        explanation: '10,000 people × 3 kWh/day × 365 days = 10,950,000 kWh/year.',
      },
      {
        id: 2,
        text: 'What installed wind capacity [MW] is required to exactly cover the annual demand?',
        unit: 'MW',
        answer: 3.57,
        tolerance: 0.05,
        choices: [2.5, 3.57, 4.2, 5.0],
        explanation: 'Annual output per MW = 1 MW × 0.35 × 8,760 h = 3,066 MWh = 3,066,000 kWh. Required capacity = 10,950,000 / 3,066,000 ≈ 3.57 MW.',
      },
      {
        id: 3,
        text: 'How many 2 MW turbines are needed? (round up)',
        unit: 'turbines',
        answer: 2,
        tolerance: 0.01,
        choices: [1, 2, 3, 4],
        explanation: '⌈3.57 / 2⌉ = 2 turbines.',
      },
      {
        id: 4,
        text: 'Calculate the LCOE [€/kWh] for the installed wind farm (2 turbines). Use the annuity method.',
        unit: '€/kWh',
        answer: 0.052,
        tolerance: 0.08,
        choices: [0.038, 0.052, 0.067, 0.081],
        explanation: 'Installed = 4 MW. Investment = 4 × 1,500,000 = €6,000,000. Annuity factor (6%, 20yr) = 0.08718. Capital cost = €523,080/yr. O&M = €120,000/yr. Annual production = 4 × 0.35 × 8,760 = 12,264 MWh = 12,264,000 kWh. LCOE = (523,080 + 120,000) / 12,264,000 ≈ €0.052/kWh.',
      },
      {
        id: 5,
        text: 'How much is saved annually [€] by using surplus wind electricity for desalination instead of diesel?',
        unit: '€/year',
        answer: 197100,
        tolerance: 0.05,
        choices: [85000, 120000, 197100, 250000],
        explanation: 'Surplus = 12,264,000 − 10,950,000 = 1,314,000 kWh. Savings = 1,314,000 × €0.15 = €197,100/year.',
      },
      {
        id: 6,
        text: 'What is the effective LCOE [€/kWh] after accounting for the desalination revenue?',
        unit: '€/kWh',
        answer: 0.036,
        tolerance: 0.08,
        choices: [0.024, 0.036, 0.048, 0.061],
        explanation: 'Net annual cost = (523,080 + 120,000) − 197,100 = €445,980. Effective LCOE = 445,980 / 12,264,000 ≈ €0.036/kWh.',
      },
    ],
  },
]

registerExamPrepExams('re', exams)
