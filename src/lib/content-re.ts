// RENE — Renewable Energies content
// FAU WS 2025/26 · Exam: April 10, 2026
import type { Content } from './types'

export const content: Content = {
  "lectures": [
    {
      "id": 1,
      "title": "Energy and Climate Change",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Key Energy Equations",
          "body": "**Potential energy:** W = m · g · h\n\n**Thermal energy (heating a fluid):** Q = ρ · cₚ · V · ΔT\n- cₚ,water = 4.2 kJ/(kg·K)\n- ρ_water = 1000 kg/m³\n\n**Energy content of a fuel:** E = m · H_LHV\n- H_LHV = Lower Heating Value [MJ/kg or kWh/kg]\n\n**Thermal power plant efficiency:** η_el = P_el / (ṁ_fuel · H_LHV)\n\n**Unit conversions to memorize:**\n- 1 kWh = 3.6 MJ\n- 1 TOE = 11.63 MWh\n- 1 TWh = 10⁹ kWh"
        },
        {
          "heading": "Greenhouse Effect — Key Numbers",
          "body": "**Natural greenhouse effect:** +33 K\n- Without it: Earth surface = −18°C instead of +15°C\n- Main gases: H₂O (+20K natural), CO₂ (+8.6K natural), CH₄, N₂O\n\n**Anthropogenic (man-made) warming so far:** +1.2 K\n- CO₂: +1.01 K anthropogenic contribution\n- CH₄: +0.28 K\n- N₂O: +0.02 K\n\n**CO₂ emissions per capita (2020):**\n- USA: 13.5 t/person\n- Germany: 7.1 t/person\n- China: 7.3 t/person\n- India: 1.7 t/person\n\n**Paris Agreement (2015) — 3 key goals:**\n1. Limit global warming to **1.5°C** (max 2°C) above pre-industrial levels\n2. Reach **net-zero** greenhouse gas emissions by 2050\n3. National contributions (NDCs) reviewed every 5 years"
        },
        {
          "heading": "Reaction Enthalpy (Bond Enthalpies)",
          "body": "Energy is **absorbed** when bonds are **broken**.\nEnergy is **released** when bonds are **formed**.\n\n**Standard reaction enthalpy:** ΔH_R = Σ(bonds broken) − Σ(bonds formed)\n\n**Example — hydrogen combustion:**\nH₂ + ½O₂ → H₂O\n- Bonds broken: H-H (432 kJ) + ½·O=O (247 kJ) = 679 kJ\n- Bonds formed: 2×H-O (2×460 = 920 kJ)\n- ΔH_R = 679 − 920 = **−241 kJ/mol** (exothermic, energy released)\n\nAlso on formula sheet: ΔH_R = Σᵢ νᵢ · Hᵢ⁰"
        }
      ],
      "questions": [
        {
          "id": "P1Q1",
          "conceptIndex": 1,
          "text": "By what temperature does the NATURAL greenhouse gas effect increase the mean temperature of the Earth's atmosphere?",
          "options": [
            "0 K — there is no natural effect",
            "1.2 K",
            "33 K",
            "5 K"
          ],
          "correct": [2],
          "explanation": "The natural greenhouse effect raises Earth's surface temperature by +33 K. Without it, Earth would be −18°C instead of the current +15°C average. The 1.2 K figure is the anthropogenic (man-made) warming accumulated so far.",
          "type": "single"
        },
        {
          "id": "P1Q2",
          "conceptIndex": 1,
          "text": "Match the CO₂ emissions per capita (year 2020). Select ALL countries that emit MORE than 7 t CO₂ per person per year.",
          "options": [
            "USA (~13.5 t/person)",
            "Germany (~7.1 t/person)",
            "China (~7.3 t/person)",
            "India (~1.7 t/person)"
          ],
          "correct": [0, 1, 2],
          "explanation": "USA: 13.5 t, Germany: 7.1 t, China: 7.3 t — all above 7 t/person. India at 1.7 t/person is far below. Note that Germany and China are close, while the USA is nearly double.",
          "type": "multiple"
        },
        {
          "id": "P1Q3",
          "conceptIndex": 1,
          "text": "Which of the following are key goals of the Paris Agreement (2015)? Select ALL that apply.",
          "options": [
            "Limit global warming to 1.5°C above pre-industrial levels",
            "Reach net-zero CO₂ emissions by 2030",
            "Reach net-zero greenhouse gas emissions by 2050",
            "Establish binding carbon taxes on all signatory nations",
            "Review national contributions (NDCs) every 5 years"
          ],
          "correct": [0, 2, 4],
          "explanation": "The Paris Agreement goals: (A) 1.5°C limit — correct. (C) net-zero by 2050 — correct. (E) 5-year NDC review cycle — correct. The 2030 date (B) is wrong — net-zero target is 2050. Carbon taxes (D) were NOT mandated by the Paris Agreement; it left implementation to individual nations.",
          "type": "multiple"
        },
        {
          "id": "P1Q4",
          "conceptIndex": 0,
          "text": "A water storage tank has height 2 m and diameter 1 m, heated from 40°C to 90°C. Which formula correctly gives its stored thermal energy?",
          "options": [
            "Q = ρ · cₚ · V · ΔT, where V = π·(0.5)²·2 and ΔT = 50 K",
            "Q = m · H_LHV, where m is the mass of water",
            "Q = ρ · cₚ · A · ΔT, where A is the base area",
            "Q = ½ · m · v²"
          ],
          "correct": [0],
          "explanation": "Correct formula: Q = ρ · cₚ · V · ΔT. Volume V = π·r²·h = π·(0.5)²·2 ≈ 1.57 m³. ΔT = 90−40 = 50 K. Q = 1000 · 4200 · 1.57 · 50 ≈ 329.7 MJ ≈ 91.6 kWh. H_LHV is for fuels, not water heating.",
          "type": "single"
        },
        {
          "id": "P1Q5",
          "conceptIndex": 2,
          "text": "When hydrogen (H₂) reacts with oxygen (½ O₂) to form water, what happens to the energy?",
          "options": [
            "Energy is absorbed — the reaction is endothermic",
            "Energy is released — the reaction is exothermic",
            "No energy change occurs",
            "Energy is released only if the reaction happens above 100°C"
          ],
          "correct": [1],
          "explanation": "H₂ combustion is strongly exothermic. Bonds broken: H-H (432 kJ) + ½·O=O (~247 kJ) = 679 kJ. Bonds formed: 2·H-O (920 kJ). ΔH_R = 679 − 920 = −241 kJ/mol. Negative ΔH = energy released. This is why hydrogen is a good fuel.",
          "type": "single"
        }
      ]
    },
    {
      "id": 2,
      "title": "Germany's Energiewende",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "The EEG and Germany's Renewable Growth",
          "body": "**EEG (Erneuerbare-Energien-Gesetz)** = Renewable Energy Sources Act\n\n**What it does:** Guarantees fixed feed-in tariffs for renewable energy producers for 20 years → removes revenue risk → drives massive investment in solar and wind.\n\n**Germany's 2023 electricity generation mix:**\n- ~60% renewables (first time majority)\n- **Wind (onshore + offshore):** largest single source (~36%)\n- Solar PV: ~12%\n- Hydro: ~4%\n- Biomass: ~9%\n- Remaining: natural gas, coal, nuclear (last plants shut down April 2023)\n\n**2024:** ~62% renewable share in power sector"
        },
        {
          "heading": "Dunkelflaute and the 2022 Price Spike",
          "body": "**Dunkelflaute** (\"dark doldrums\"): extended periods of simultaneously low wind AND low solar irradiance — worst case for renewable energy systems. Typically occurs in winter (anticyclone weather). Can last days to 2+ weeks.\n\nSolutions to overcome Dunkelflaute:\n- Seasonal storage (hydrogen, Power-to-Gas)\n- Pumped hydro storage\n- International grid interconnection\n- Biomass/dispatchable backup\n- Demand-side management\n\n**Why electricity prices spiked in 2022:**\n- Russia–Ukraine war → disrupted Russian gas supplies to Europe\n- Gas prices skyrocketed\n- **Merit order effect:** The most expensive power plant still needed to meet demand sets the price for ALL electricity\n- Gas plants set the marginal price → entire market price rose dramatically"
        },
        {
          "heading": "Merit Order Principle",
          "body": "**Merit order:** Power plants are dispatched from cheapest to most expensive marginal cost. The **last (most expensive) plant needed** to meet demand sets the **price for ALL electricity** sold in that hour.\n\n**Stack order (typically cheapest to most expensive):**\n1. Nuclear / run-of-river hydro (very low marginal cost)\n2. Wind and solar (near-zero marginal cost)\n3. Coal\n4. Gas\n5. Oil peakers\n\n**Key implication for renewables:**\n- Wind/solar push expensive plants off the merit order → **lower average electricity prices**\n- When gas is expensive (2022), gas sets the price → everyone pays the gas price even for wind-generated electricity"
        }
      ],
      "questions": [
        {
          "id": "P2Q1",
          "conceptIndex": 0,
          "text": "What is the primary mechanism by which the EEG drove renewable energy growth in Germany?",
          "options": [
            "It provided direct subsidies paid to renewable plant operators from tax revenue",
            "It guaranteed fixed feed-in tariffs for 20 years, removing revenue uncertainty for investors",
            "It mandated that utilities must generate 50% of electricity from renewables by 2010",
            "It banned new fossil fuel power plants from 2000 onwards"
          ],
          "correct": [1],
          "explanation": "The EEG's key mechanism was guaranteed fixed feed-in tariffs for 20 years. Solar and wind investors knew exactly what price they would receive for every kWh produced — eliminating revenue risk and enabling financing. This triggered massive buildout of renewables in Germany.",
          "type": "single"
        },
        {
          "id": "P2Q2",
          "conceptIndex": 0,
          "text": "Which renewable energy technology had the highest share in Germany's public net electricity generation in 2023?",
          "options": [
            "Solar PV",
            "Biomass",
            "Wind energy (onshore + offshore combined)",
            "Hydro power"
          ],
          "correct": [2],
          "explanation": "Wind energy (onshore + offshore combined) had the largest share in Germany's 2023 electricity mix at approximately 36% of total generation. Solar PV was second at ~12%, biomass ~9%, and hydro ~4%.",
          "type": "single"
        },
        {
          "id": "P2Q3",
          "conceptIndex": 1,
          "text": "What is 'Dunkelflaute' and why is it critical for renewable energy systems? Select ALL correct statements.",
          "options": [
            "A period of simultaneously low wind speed AND low solar irradiance",
            "A German term for the seasonal decline in electricity demand in summer",
            "It can last days to weeks in winter during anticyclone weather conditions",
            "It is a problem only for systems that rely exclusively on solar energy",
            "It represents the most challenging scenario for 100% renewable electricity systems"
          ],
          "correct": [0, 2, 4],
          "explanation": "Dunkelflaute = 'dark doldrums' — low wind AND low solar simultaneously (A). It occurs in winter anticyclone conditions and can last 2+ weeks (C). It is the hardest scenario for 100% RE systems because both main variable sources fail at once (E). It affects both wind and solar systems, not just solar (D is wrong). It is NOT about summer demand (B is wrong).",
          "type": "multiple"
        },
        {
          "id": "P2Q4",
          "conceptIndex": 1,
          "text": "Why did wholesale electricity prices in Germany rise sharply in 2022 even though wind and solar were generating at near-zero cost?",
          "options": [
            "There was a major grid outage that reduced available capacity",
            "Nuclear plants were shut down, removing cheap baseload",
            "The Russia-Ukraine war disrupted gas supplies, causing gas prices to spike — and gas plants set the market price for all electricity via the merit order",
            "New carbon taxes doubled the cost of all fossil fuel generation"
          ],
          "correct": [2],
          "explanation": "The 2022 crisis: Russia-Ukraine war → gas supply cuts → gas prices skyrocketed. In the merit order, gas plants set the marginal price when they are the last plant dispatched. This price applies to ALL electricity sold, including cheap wind and solar. So even though renewables were cheap, everyone paid the gas price.",
          "type": "single"
        },
        {
          "id": "P2Q5",
          "conceptIndex": 2,
          "text": "According to the merit order principle, which power plant sets the electricity price in a given hour?",
          "options": [
            "The cheapest plant (e.g., nuclear) — to minimize consumer costs",
            "The average cost of all plants running that hour",
            "The most expensive plant that is still needed to meet demand",
            "Wind and solar, because they are increasingly the dominant source"
          ],
          "correct": [2],
          "explanation": "The merit order dispatches plants from cheapest to most expensive. The LAST (most expensive) plant still needed to cover demand sets the clearing price for all electricity sold in that period — including electricity from cheaper plants. This is why wind and solar lower average electricity prices — they push expensive plants further up the stack.",
          "type": "single"
        }
      ]
    },
    {
      "id": 3,
      "title": "Energy Economics (LCOE / LCOH)",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "LCOE — Levelized Cost of Electricity",
          "body": "**LCOE = s [ct/kWh] = sᵢ + s_fuel + s_o**\n\n**1. Capital-related costs:**\nsᵢ = a · K_I / (P_el · z)\n\n**2. Annuity factor:**\na = p·(1+p)ⁿ / ((1+p)ⁿ − 1)\n- p = interest rate (e.g., 0.07 for 7%)\n- n = lifetime in years\n- Higher n → lower a (capital spread over more years)\n\n**3. Fuel cost:**\ns_fuel = K_f / (η_el · H_u)\n- K_f = fuel price [€/kg]\n- H_u = lower heating value [kWh/kg or MJ/kg]\n\n**4. O&M costs:**\ns_o = (K_personnel + K_service + K_insurance) / (P_el · z)\n\n**Key variable: z = full load hours [h/year]**\n- Higher z → lower LCOE (fixed costs spread over more kWh)\n- Wind onshore Germany: ~1,800 h/year\n- Wind offshore: ~3,500 h/year\n- Solar Germany: ~1,000 h/year\n- Hydro: ~4,000 h/year"
        },
        {
          "heading": "LCOH and CHP Economics",
          "body": "**LCOH = w [ct/kWh] = wᵢ + w_fuel + w_o**\n\nwᵢ = a · K_I / (Q̇_fuel · z)\n\nw_fuel = K_fuel / (ṁ_fuel · H_u)\n\n**CHP (Combined Heat and Power) — heat cost with electricity credit:**\nw = wᵢ + w_v + w_s − σ · s_E\n\nwhere:\n- σ = electricity coefficient = P_el / Q̇_N\n- s_E = electricity sales price [ct/kWh]\n- The term −σ · s_E is the credit from selling electricity → reduces effective heat cost\n\n**CHP advantage:** Total efficiency 80–90% vs ~40% for electricity-only plants"
        },
        {
          "heading": "Step-by-Step LCOE Calculation",
          "body": "**Always follow this order:**\n\n1. Calculate annuity: a = p·(1+p)ⁿ / ((1+p)ⁿ − 1)\n2. Calculate capital cost: sᵢ = a · K_I / (P_el · z)\n   - z in hours/year, P_el in kW, K_I in €\n   - Result in €/kWh → ×100 to get ct/kWh\n3. Calculate fuel cost: s_fuel = K_f / (η_el · H_u)\n4. Add O&M: s_o = annual O&M / (P_el · z)\n5. Sum: s = sᵢ + s_fuel + s_o\n\n**Common mistake:** Mixing up H_LHV units (MJ/kg vs kWh/kg). Always check unit consistency."
        }
      ],
      "questions": [
        {
          "id": "P3Q1",
          "conceptIndex": 0,
          "text": "What does LCOE represent?",
          "options": [
            "The average cost per kWh over a plant's lifetime including capital, fuel, and O&M",
            "The minimum electricity price in a given market",
            "The CO₂ emissions per kWh of a power plant",
            "The cost of building new grid infrastructure"
          ],
          "correct": [0],
          "explanation": "LCOE = Levelized Cost of Electricity — the average cost per kWh over the plant's entire lifetime, including capital (investment) costs, fuel costs, and operation & maintenance. It allows fair comparison between very different technologies (solar vs coal vs wind).",
          "type": "single"
        },
        {
          "id": "P3Q2",
          "conceptIndex": 2,
          "text": "A wind turbine: P_el = 2 MW, K_I = €3,000,000, n = 20 years, p = 5%, z = 2,000 h/year. Which correctly calculates the capital cost component sᵢ?",
          "options": [
            "First compute annuity a = 0.05·(1.05)²⁰/((1.05)²⁰−1), then sᵢ = a · 3,000,000 / (2,000 kW · 2,000 h)",
            "sᵢ = K_I / (n · P_el · z) — divide investment by total lifetime energy",
            "sᵢ = K_I / z — investment per full load hour",
            "Use a = 1/n = 0.05, then multiply by K_I / (P_el · z)"
          ],
          "correct": [0],
          "explanation": "Correct: (1) compute annuity a = p·(1+p)ⁿ/((1+p)ⁿ−1). For p=0.05, n=20: a ≈ 0.0802. (2) sᵢ = a · K_I / (P_el · z) = 0.0802 · 3,000,000 / (2,000 · 2,000) = 0.060 €/kWh = 6.0 ct/kWh. Simply using 1/n as annuity ignores the time value of money.",
          "type": "single"
        },
        {
          "id": "P3Q3",
          "conceptIndex": 0,
          "text": "How does increasing full load hours z affect the LCOE? Select ALL correct statements.",
          "options": [
            "Higher z reduces the capital cost component sᵢ (same investment, more kWh produced)",
            "Higher z increases the fuel cost component for wind and solar",
            "Higher z reduces the O&M cost per kWh",
            "For wind/solar with no fuel cost, higher z reduces total LCOE proportionally"
          ],
          "correct": [0, 2, 3],
          "explanation": "Full load hours z is in the denominator of both sᵢ = a·K_I/(P_el·z) and s_o. More hours = same fixed costs spread over more kWh = lower cost per kWh (A, C). Wind/solar have no fuel cost, so doubling z roughly halves LCOE (D). Wind/solar have zero fuel cost — higher z does NOT increase it (B is wrong).",
          "type": "multiple"
        },
        {
          "id": "P3Q4",
          "conceptIndex": 1,
          "text": "In a CHP plant heat cost: w = wᵢ + w_v + w_s − σ · s_E. What does '−σ · s_E' represent?",
          "options": [
            "The additional fuel cost when generating electricity simultaneously",
            "The electricity revenue credit, which reduces the effective heat production cost",
            "The efficiency penalty of combining heat and power generation",
            "The CO₂ emission cost subtracted from heat revenues"
          ],
          "correct": [1],
          "explanation": "σ = P_el/Q̇_N (electricity coefficient). s_E is the electricity price. The term σ·s_E = electricity revenue per unit of heat. Subtracting it means heat becomes cheaper because the plant also earns from selling electricity. This is the economic advantage of CHP over separate heat-only boilers.",
          "type": "single"
        },
        {
          "id": "P3Q5",
          "conceptIndex": 0,
          "text": "Which correctly describes the annuity factor 'a'?",
          "options": [
            "a = 1/n — the fraction of investment recovered each year without interest",
            "a = p·(1+p)ⁿ / ((1+p)ⁿ − 1) — converts a lump-sum investment into equal annual payments accounting for interest",
            "a = K_I / (P_el · z) — the capital cost per unit of energy",
            "a = p · n — total interest paid over the lifetime"
          ],
          "correct": [1],
          "explanation": "Annuity factor a = p·(1+p)ⁿ/((1+p)ⁿ−1) converts present investment K_I into equivalent annual payments at interest rate p over n years. For p=7%, n=20: a≈0.0944 (9.44%/year). As n→∞, a→p. Using 1/n ignores interest — only correct if p=0.",
          "type": "single"
        }
      ]
    },
    {
      "id": 4,
      "title": "Renewable Heating and Cooling",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Heat Pumps — COP Calculations",
          "body": "**Heat pumps move heat — they don't generate it. COP > 1 always.**\n\n**COP_heat_pump = Q̇_output / P_el**\n\n**Theoretical maximum (Carnot):** COP_Carnot = T_out / (T_out − T_in)\n⚠️ **TEMPERATURES MUST BE IN KELVIN**\n\n**Real heat pump:** COP_real = g · T_out / (T_out − T_in)\n- Quality grade g = 0.50–0.60\n\n**Example:** Source = 10°C (283 K), sink = 45°C (318 K), g = 0.55:\nCOP_real = 0.55 · 318 / (318 − 283) = 0.55 · 9.09 ≈ **5.0**\n→ 1 kWh electricity → 5 kWh heat!\n\n**Ground-source beats air-source in winter:**\n- Ground: T_in ≈ 10°C year-round → high COP\n- Air-source: T_in = −10°C in winter → much lower COP\n\n**Carnot efficiency (heat engines):**\nη_Carnot = 1 − T_cold / T_hot (T in Kelvin)"
        },
        {
          "heading": "Solar Thermal Collectors",
          "body": "**Flat-plate collector efficiency:**\nη_K = η₀ − c₁·(t_m − t_u)/E − c₂·(t_m − t_u)²/E\n\nwhere:\n- η₀ = optical efficiency at zero temperature difference\n- c₁, c₂ = heat loss coefficients\n- t_m = mean fluid temperature [°C]\n- t_u = ambient temperature [°C]\n- E = solar irradiance [W/m²]\n\n**Key insight:** Efficiency DECREASES with temperature difference\n→ Hot-water systems (60°C) are less efficient than floor heating (30°C)\n\n**Flat plate vs evacuated tube:**\n- Flat plate: cheaper, good for low ΔT (summer hot water)\n- Evacuated tube: lower c₁ (vacuum eliminates convection) → better at large ΔT → preferred for winter heating\n\n**Useful heat output:** Q̇_u = η_K · A_collector · E"
        },
        {
          "heading": "Combustion Systems and Cooling Degree Days",
          "body": "**Combustion system efficiency:**\nη_comb = Q̇_u / Q̇_fuel = Q̇_u / (ṁ_fuel · H_LHV)\n\n**Flue gas losses:** Q̇_exhaust = ṁ_fg · c_p,fg · t_fg\n\n**Useful heat balance:** Q̇_u ≈ Q̇_fuel − Q̇_exhaust\n\n**Cooling Degree Days (CDD):**\nCDD = Σᵢ max(0, (t_max + t_min)/2 − 18°C)\n- Warmer climate = more CDD = more cooling energy\n\n**District heating:** Most economical combined with CHP — uses waste heat from power generation."
        }
      ],
      "questions": [
        {
          "id": "P4Q1",
          "conceptIndex": 0,
          "text": "A heat pump extracts heat from the ground (10°C) and delivers it to a floor heating system (45°C). Quality grade g = 0.55. What is the real COP?",
          "options": [
            "COP ≈ 2.0",
            "COP ≈ 5.0",
            "COP ≈ 9.1 (Carnot limit, not real)",
            "COP ≈ 1.55"
          ],
          "correct": [1],
          "explanation": "Convert to Kelvin: T_out = 318 K, T_in = 283 K. COP_real = g · T_out/(T_out−T_in) = 0.55 · 318/35 = 0.55 · 9.09 ≈ 5.0. The Carnot limit would be 9.09, but real systems achieve 50–60% of that. This means 1 kWh electricity produces 5 kWh of heat.",
          "type": "single"
        },
        {
          "id": "P4Q2",
          "conceptIndex": 0,
          "text": "Why does a ground-source heat pump achieve higher COP than an air-source heat pump in winter? Select ALL correct statements.",
          "options": [
            "Ground maintains ~10°C year-round, giving a smaller temperature lift",
            "Air-source heat pumps use lower-quality compressors",
            "Air temperature can drop to −10°C, greatly increasing (T_out − T_in) and reducing COP",
            "COP_Carnot = T_out/(T_out−T_in) — smaller temperature difference means higher COP"
          ],
          "correct": [0, 2, 3],
          "explanation": "The key is temperature difference: smaller = higher COP. Ground stays ~10°C (A). In winter, air may be −10°C, making lift 55K vs 35K for ground — much lower air-source COP (C). The Carnot formula directly shows this relationship (D). Compressor quality is not the fundamental reason (B is wrong).",
          "type": "multiple"
        },
        {
          "id": "P4Q3",
          "conceptIndex": 1,
          "text": "How does increasing (t_m − t_u) affect solar thermal collector efficiency?",
          "options": [
            "Efficiency increases — hotter collectors produce more useful heat",
            "Efficiency decreases — greater temperature difference increases heat losses to the environment",
            "Efficiency is independent of temperature difference",
            "Efficiency first increases then decreases (bell-curve)"
          ],
          "correct": [1],
          "explanation": "From η_K = η₀ − c₁·(t_m−t_u)/E − c₂·(t_m−t_u)²/E: both loss terms increase with (t_m−t_u). As collector temperature rises above ambient, radiative and convective losses increase, reducing net useful output. This is why high-temperature applications need evacuated tube collectors with lower c₁.",
          "type": "single"
        },
        {
          "id": "P4Q4",
          "conceptIndex": 0,
          "text": "A steam power plant operates between 550°C and 40°C. What is its Carnot efficiency?",
          "options": [
            "η = 1 − 40/550 = 92.7% (wrong: must use Kelvin)",
            "η = 1 − 313/823 ≈ 62%",
            "η = 313/823 ≈ 38%",
            "η = 1 − 550/313 — negative result, clearly wrong"
          ],
          "correct": [1],
          "explanation": "T_cold = 40+273 = 313 K, T_hot = 550+273 = 823 K. η_Carnot = 1 − 313/823 ≈ 1 − 0.38 = 62%. Common mistake: using °C directly gives wrong 92.7%. Real power plants achieve only 40–45% due to irreversibilities.",
          "type": "single"
        }
      ]
    },
    {
      "id": 5,
      "title": "Wind Energy",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Wind Power Formulas",
          "body": "**Wind power:** P_w = ½ · ṁ · v² = ½ · ρ · A · v³\n\n**Turbine power:** P_t = c_p · P_w = c_p · ½ · ρ · (πD²/4) · v³\n\n**Betz limit: c_p,max = 16/27 ≈ 0.593**\n- Theoretical maximum for ANY turbine\n- Real turbines: c_p ≈ 0.35–0.45\n\n**⚡ Power scales with v³:**\n- Double wind speed → 2³ = **8× more power**\n- 10% more wind speed → 1.1³ ≈ 33% more power\n\n**Air density:** ρ_air ≈ 1.225 kg/m³ at sea level\n\n**Full load hours:** h = W_annual [MWh] / P_rated [MW]\n- Onshore Germany: ~1,800 h/year\n- Offshore Germany: ~3,500 h/year"
        },
        {
          "heading": "Logarithmic Wind Speed Profile",
          "body": "Wind speed increases with height due to surface friction.\n\n**v(h) = v_R · ln(h/z₀) / ln(h_R/z₀)**\n\n- h = hub height [m]\n- h_R = reference height (often 10 m)\n- z₀ = roughness length [m]\n- v_R = wind speed at reference height\n\n**Roughness length z₀:**\n| Terrain | z₀ [m] |\n|---------|--------|\n| Open sea | 0.0002 |\n| Flat, open | 0.03 |\n| Agricultural | 0.1 |\n| Forests | 0.5 |\n| City centers | 1–2 |\n\nHigher z₀ = wind speed increases more steeply with height → taller towers are more beneficial in rough terrain."
        },
        {
          "heading": "Betz Theory and Weibull Distribution",
          "body": "**Why Betz limit = 16/27?**\nIf ALL kinetic energy were extracted, wind stops → no airflow → zero power.\nOptimal extraction: downstream velocity = 1/3 of upstream → c_p = 16/27 ≈ 0.593\n\n**Weibull distribution** — wind speed frequency:\nf(v) = (k/c) · (v/c)^(k−1) · exp(−(v/c)^k)\n- k = shape parameter (~2 for wind = Rayleigh distribution)\n- c = scale parameter (related to mean wind speed)\n\n**Tip speed ratio:** λ = u / v_W\n- u = blade tip speed [m/s]\n- Modern turbines: λ ≈ 6–8 for max efficiency"
        }
      ],
      "questions": [
        {
          "id": "P5Q1",
          "conceptIndex": 2,
          "text": "What is the Betz limit?",
          "options": [
            "c_p = 0.45 — the typical efficiency of modern wind turbines",
            "c_p = 16/27 ≈ 0.593 — the theoretical maximum fraction of wind power any turbine can extract",
            "c_p = 1.0 — perfect conversion of all wind kinetic energy",
            "c_p = 0.35 — the minimum efficiency required for economic viability"
          ],
          "correct": [1],
          "explanation": "The Betz limit (1919): no wind turbine can extract more than 16/27 ≈ 59.3% of wind kinetic energy. This arises because complete extraction would stop the wind, preventing further airflow. Real turbines: c_p ≈ 0.35–0.45 (below Betz limit due to friction, wake effects).",
          "type": "single"
        },
        {
          "id": "P5Q2",
          "conceptIndex": 0,
          "text": "A site has average wind speed 6 m/s. A second site has 9 m/s. By what factor does available wind power increase?",
          "options": [
            "1.5× (linear scaling with velocity)",
            "2.25× (velocity squared)",
            "3.375× (velocity cubed: (9/6)³ = 1.5³)",
            "6.75× (velocity to the 4th power)"
          ],
          "correct": [2],
          "explanation": "Wind power P_w ∝ v³. Ratio = (9/6)³ = 1.5³ = 3.375. Going from 6 to 9 m/s gives 3.375× more available power — even though wind speed only increased 50%. The cubic relationship is why wind resource measurements are so critical.",
          "type": "single"
        },
        {
          "id": "P5Q3",
          "conceptIndex": 1,
          "text": "A site has v = 7 m/s at 50 m height, z₀ = 0.1 m. Wind speed at 100 m hub height is approximately:",
          "options": [
            "v(100) = 7 · (100/50) = 14 m/s — linear scaling",
            "v(100) = 7 · ln(1000)/ln(500) ≈ 7.78 m/s — logarithmic profile",
            "v(100) = 7 · √(100/50) = 9.9 m/s — square root law",
            "v(100) = 7 · (100/50)^0.2 = 7.98 m/s — power law"
          ],
          "correct": [1],
          "explanation": "v(h) = v_R · ln(h/z₀)/ln(h_R/z₀). With h=100m, h_R=50m, z₀=0.1m: v(100) = 7 · ln(100/0.1)/ln(50/0.1) = 7 · ln(1000)/ln(500) = 7 · 6.908/6.215 ≈ 7.78 m/s. Power increase ≈ (7.78/7)³ ≈ 37% more power just by doubling hub height.",
          "type": "single"
        },
        {
          "id": "P5Q4",
          "conceptIndex": 1,
          "text": "Select ALL correct statements about roughness length z₀.",
          "options": [
            "z₀ is larger for rougher terrain (forests, cities) than smooth terrain (sea, flat plains)",
            "Larger z₀ means more benefit from taller towers — wind speed increases more steeply with height",
            "Open sea has z₀ ≈ 0.0002 m",
            "Agricultural terrain has z₀ ≈ 0.1 m — intermediate value"
          ],
          "correct": [0, 1, 2, 3],
          "explanation": "All are correct. z₀ represents surface roughness: larger for rough surfaces (forests z₀≈0.5m, cities z₀≈1-2m) vs smooth (sea z₀≈0.0002m). In rough terrain, the log profile changes more steeply with height, making tall towers more beneficial. Agricultural z₀≈0.1m is intermediate.",
          "type": "multiple"
        },
        {
          "id": "P5Q5",
          "conceptIndex": 0,
          "text": "A 3 MW wind turbine generates 5,400 MWh per year. How many full load hours does it operate?",
          "options": [
            "h = 5,400 / 3 = 1,800 full load hours/year",
            "h = 3 / 5,400 = 0.00056 (this is capacity factor, not hours)",
            "h = 5,400 · 3 = 16,200 hours (impossible — only 8,760 h/year)",
            "h = 8,760 − 1,800 = 6,960 hours of downtime"
          ],
          "correct": [0],
          "explanation": "Full load hours h = W_annual [MWh] / P_rated [MW] = 5,400 / 3 = 1,800 h/year. Capacity factor = 1,800/8,760 ≈ 20.5%, typical for onshore wind in Germany. Offshore typically 3,500–4,000 full load hours (40–46% capacity factor).",
          "type": "single"
        }
      ]
    },
    {
      "id": 6,
      "title": "Solar Energy (PV + Thermal)",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Solar Radiation Fundamentals",
          "body": "**Solar constant:** E₀ = 1368 W/m² (outside atmosphere)\n\n**Beer-Lambert law — atmospheric attenuation:**\nI = I₀ · e^(−τ · AM)\n- AM = 1/cos(θ_z), θ_z = zenith angle\n\n**Air Mass values:**\n- AM 0: above atmosphere (space)\n- AM 1: sun directly overhead\n- AM 1.5: θ_z ≈ 48.2° — **standard test condition (STC) for solar cells**\n\n**At STC:** I = 1000 W/m², T_cell = 25°C, AM = 1.5\n\n**Germany annual irradiance:** ~1,000–1,100 kWh/m²/year\n- Summer: ~5–6 kWh/m²/day\n- Winter: ~0.5–2 kWh/m²/day"
        },
        {
          "heading": "Photovoltaic (PV) — Key Concepts",
          "body": "**I-V characteristic:**\nI = I_SC − I_s · (exp(U/(n·U_T)) − 1)\n\n**Key points:**\n- I_SC = short-circuit current (V=0, max current)\n- U_OC = open-circuit voltage (I=0, max voltage)\n- MPP = Maximum Power Point: I_mpp · U_mpp is maximum\n- Fill Factor = P_MPP / (I_SC · U_OC)\n\n**PV efficiency:** η_mpp = P_el,mpp / (A_PV · E₀)\n\n**Temperature coefficients (CRITICAL):**\n- Higher temperature → LESS power\n- P_new = P_STC · {1 + (power_coeff% · ΔT)}\n- Typical Si: −0.4%/K\n- Example: ΔT = +40K → P_new = P_STC · (1 − 0.004·40) = 0.84·P_STC (16% loss!)\n\n**STC vs NOCT:**\n- STC: 1000 W/m², 25°C — idealized lab\n- NOCT: 800 W/m², 20°C ambient — more realistic, higher cell temperature → lower efficiency"
        },
        {
          "heading": "CSP and Optical Efficiency",
          "body": "**Optical efficiency of concentrating collector:**\nη_opt = η_cleanliness · ρ · γ · τ · α\n- ρ = mirror reflectivity\n- γ = intercept factor\n- τ = glass transmissivity\n- α = absorber absorptivity\n\n**Radiative heat losses:**\nQ̇_rad = ε · σ · (T_abs⁴ − T_amb⁴)\nσ = 5.67×10⁻⁸ W/m²K⁴\n\n**Annual PV energy:**\nE_annual = (w₁·η_NOCT + w₂·η_STC) · E_annual,irradiance · Area\n- w₁, w₂ = time-weighted fractions"
        }
      ],
      "questions": [
        {
          "id": "P6Q1",
          "conceptIndex": 0,
          "text": "What is the Solar Constant and its value?",
          "options": [
            "Maximum PV efficiency: ~33% (Shockley-Queisser limit)",
            "Solar irradiance at Earth's surface on a clear day: 1000 W/m²",
            "Total solar irradiance at Earth's orbital distance, outside the atmosphere: E₀ ≈ 1368 W/m²",
            "Annual solar energy per m² in Germany: ~1100 kWh/m²"
          ],
          "correct": [2],
          "explanation": "The Solar Constant E₀ = 1368 W/m² is the irradiance at Earth's mean orbital distance, perpendicular to sun rays, OUTSIDE the atmosphere. After Beer-Lambert attenuation through the atmosphere (AM 1.5), it is reduced to ~1000 W/m² at STC.",
          "type": "single"
        },
        {
          "id": "P6Q2",
          "conceptIndex": 1,
          "text": "A PV module has P_STC = 400 W at 25°C. Temperature coefficient = −0.4%/K. On a hot day, cell temperature = 65°C. Output power ≈ ?",
          "options": [
            "400 W — temperature has no effect on silicon PV",
            "416 W — higher temperature improves absorption",
            "336 W — P_new = 400 · (1 − 0.004 · 40) = 400 · 0.84",
            "160 W — efficiency halves at high temperature"
          ],
          "correct": [2],
          "explanation": "ΔT = 65 − 25 = 40 K. P_new = P_STC · {1 + (−0.004 · 40)} = 400 · 0.84 = 336 W. A 16% power loss just from heat! This is why real PV output in summer is often below nameplate STC rating. Higher temperature REDUCES silicon PV output.",
          "type": "single"
        },
        {
          "id": "P6Q3",
          "conceptIndex": 0,
          "text": "What does 'AM 1.5' mean and why is it the standard test condition for solar cells?",
          "options": [
            "The atmosphere is 1.5× thicker than at sea level — for high-altitude measurements",
            "Sunlight travels through 1.5× the atmosphere's vertical thickness (zenith ≈ 48°), representing typical mid-latitude conditions",
            "1.5% of sunlight is absorbed by the atmosphere",
            "Solar irradiance is 1.5 kW/m² on a very clear day"
          ],
          "correct": [1],
          "explanation": "AM = 1/cos(θ_z). AM 1.5 → θ_z = arccos(1/1.5) ≈ 48.2°. Light travels through 1.5× the vertical atmospheric thickness, experiencing realistic attenuation for temperate mid-latitudes (Europe, USA). This makes it the global standard for rating solar cell efficiency at STC.",
          "type": "single"
        },
        {
          "id": "P6Q4",
          "conceptIndex": 1,
          "text": "Select ALL correct statements about the PV I-V characteristic.",
          "options": [
            "At I_SC, voltage = 0 and current is at maximum",
            "At U_OC, current = 0 and voltage is at maximum",
            "MPP is where P = I·V is maximized — NOT at I_SC or U_OC",
            "Fill Factor = P_MPP / (I_SC · U_OC) — values close to 1 indicate high-quality cell",
            "Higher cell temperature increases U_OC, improving efficiency"
          ],
          "correct": [0, 1, 2, 3],
          "explanation": "I_SC: V=0, max current (A) ✓. U_OC: I=0, max voltage (B) ✓. MPP is between these extremes where P=I·V is maximum (C) ✓. Fill Factor near 1 = rectangular I-V curve = high quality (D) ✓. Option E is WRONG: higher temperature DECREASES U_OC and efficiency. Negative temperature coefficient is the key property of silicon PV.",
          "type": "multiple"
        },
        {
          "id": "P6Q5",
          "conceptIndex": 2,
          "text": "Why does a flat-plate solar collector become less efficient than an evacuated tube collector at high operating temperatures?",
          "options": [
            "Flat-plate collectors use lower-quality glass that breaks down at high temperature",
            "Flat-plate collectors have higher heat loss coefficients (c₁, c₂) — vacuum in evacuated tubes eliminates convective losses, maintaining efficiency at large ΔT",
            "Evacuated tube collectors concentrate sunlight, giving more input power",
            "Flat-plate collectors only work with direct radiation"
          ],
          "correct": [1],
          "explanation": "Both use η = η₀ − c₁·(ΔT/E) − c₂·(ΔT²/E). Flat-plate collectors have higher loss coefficients because air between cover and absorber conducts heat away. Evacuated tube collectors remove this air — eliminating convective losses → much lower c₁ → efficiency drops less steeply with temperature. Essential for high-temperature applications (>60°C).",
          "type": "single"
        }
      ]
    },
    {
      "id": 7,
      "title": "Hydro Power",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Hydro Power Formulas",
          "body": "**Main power equation:**\nP_turbine = η_s · ṁ_water · g · h_useful\n           = η_s · q̇_water · ρ_water · g · h_useful\n\n- η_s = hydraulic efficiency (85–92%)\n- q̇_water = volumetric flow rate [m³/s]\n- ρ_water = 1000 kg/m³\n- g = 9.81 m/s²\n\n**Flow rate:** q̇ = v · A\n**Mass flow:** ṁ = ρ · q̇\n\n**Useful head:**\nh_useful = (h_u − h_l) + (p_u − p_l)/(ρ·g) + (v_u² − v_l²)/(2·g)\n\n**Example:** q̇ = 100 m³/s, h = 50 m, η = 0.88:\nP = 0.88 · 100 · 1000 · 9.81 · 50 = **43.2 MW**"
        },
        {
          "heading": "Turbine Types",
          "body": "| Turbine | Head | Flow | Principle |\n|---------|------|------|-----------|\n| **Pelton** | Very high (>300m) | Low | Impulse — water jets |\n| **Francis** | Medium (40–600m) | Medium | Mixed flow |\n| **Kaplan** | Low (<40m) | Very high | Axial propeller |\n\n**Pumped Storage Hydro:**\n- Store excess electricity by pumping water uphill\n- Generate when demand peaks\n- Round-trip efficiency: ~75–85%\n- **>90% of global grid-scale storage capacity**\n- Critical for balancing variable renewables\n\n**Capacity factor of hydro:** ~40–60% (controllable, but limited by river levels)"
        },
        {
          "heading": "Hydro Resource and Environment",
          "body": "**Global hydro:** ~16% of global electricity\n- Norway: ~95% electricity from hydro\n- Brazil, Canada, China: major hydro nations\n\n**Run-of-river:** No reservoir, continuous generation from river flow. Low environmental impact, but seasonal variation.\n\n**Storage hydro:** Large reservoir, fully dispatchable. High environmental impact.\n\n**Environmental concerns:**\n- Fish migration disruption\n- Sediment trapping behind dam\n- Methane from tropical reservoirs\n- Community displacement\n\n**Small hydro (<10 MW):** Viable for rural electrification with minimal environmental impact."
        }
      ],
      "questions": [
        {
          "id": "P7Q1",
          "conceptIndex": 0,
          "text": "A hydropower plant: q̇ = 50 m³/s, h_useful = 30 m, η_s = 85%. What is the output power?",
          "options": [
            "P = 0.85 · 50 · 1000 · 9.81 · 30 ≈ 12.5 MW",
            "P = 50 · 30 · 0.85 = 1,275 kW",
            "P = 0.85 · 50 · 30 = 1,275 W",
            "P = 50 · 9.81 · 30 = 14,715 kW (without efficiency)"
          ],
          "correct": [0],
          "explanation": "P = η_s · q̇ · ρ · g · h = 0.85 · 50 · 1000 · 9.81 · 30 = 0.85 · 14,715,000 W ≈ 12.5 MW. Always include: flow [m³/s] · density 1000 kg/m³ · gravity 9.81 m/s² · head [m] · efficiency. Option D gives gross power before efficiency losses.",
          "type": "single"
        },
        {
          "id": "P7Q2",
          "conceptIndex": 1,
          "text": "Which turbine type is best suited for a site with very high head (500 m) and low flow rate?",
          "options": [
            "Kaplan turbine — designed for low head, high flow",
            "Francis turbine — universal, works for all heads",
            "Pelton turbine — impulse turbine ideal for very high head, low flow",
            "Archimedes screw — optimal for high-head applications"
          ],
          "correct": [2],
          "explanation": "Pelton turbines are impulse turbines — water jets strike curved buckets. Optimized for very high head (>300m) with low flow rates. Kaplan is for low head + high flow (large rivers). Francis covers medium range. Archimedes screws are for ultra-low head small-scale applications.",
          "type": "single"
        },
        {
          "id": "P7Q3",
          "conceptIndex": 1,
          "text": "Select ALL correct statements about pumped storage hydropower.",
          "options": [
            "It is currently the largest form of grid-scale electrical energy storage globally (>90% of installed capacity)",
            "It pumps water uphill when electricity is cheap/surplus, generates when demand is high",
            "Round-trip efficiency is typically 75–85%",
            "It creates electricity from nothing — no energy is lost in the cycle",
            "It plays a key role in balancing variable wind and solar generation"
          ],
          "correct": [0, 1, 2, 4],
          "explanation": "Pumped storage represents >90% of global installed grid storage (A). It stores energy by pumping uphill when surplus electricity is available (B). Round-trip efficiency ~75-85% — energy IS lost (so D is wrong). It is critical for buffering variable renewables (E). As solar/wind grow, pumped storage becomes even more important.",
          "type": "multiple"
        },
        {
          "id": "P7Q4",
          "conceptIndex": 0,
          "text": "What does the 'useful head' h_useful account for in hydro power calculations?",
          "options": [
            "Only the geometric elevation difference between upstream and downstream",
            "Elevation difference minus friction losses in the penstock",
            "Elevation difference PLUS pressure difference PLUS kinetic energy difference — all forms of hydraulic energy",
            "Volume of water divided by cross-sectional area of the penstock"
          ],
          "correct": [2],
          "explanation": "h_useful = (h_u − h_l) + (p_u − p_l)/(ρg) + (v_u² − v_l²)/(2g). It accounts for all hydraulic energy: (1) elevation (dominant for most plants), (2) pressure difference (relevant for pressure pipelines), (3) kinetic energy difference (usually small). The full Bernoulli-based formula ensures all available energy is captured.",
          "type": "single"
        }
      ]
    },
    {
      "id": 8,
      "title": "Bioenergy",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Bioenergy Fundamentals and CHP Efficiency",
          "body": "**Heat input from fuel:** Q̇_in = ṁ_fuel · H_LHV\n\n**Electrical efficiency:** η_el = P_el / Q̇_in\n\n**CHP total efficiency:**\nη_tot = (P_el + Q̇_useful) / (ṁ_fuel · H_LHV)\n- Typical CHP: **80–90%** total efficiency\n- Electricity-only: ~30–40%\n\n**Steam cycle:**\n- Boiler: Q̇_in = η_b · ṁ_steam · (h₄ − h₁)\n- Turbine: P_el = ṁ_steam · (h₄ − h₅)\n\n**Moisture content:**\n- u = w/(1−w)   (moisture from water content)\n- Wet wood (50% water) ≈ HALF heating value of dry wood\n\n**Typical H_LHV values:**\n| Fuel | H_LHV |\n|------|-------|\n| Natural gas | ~50 MJ/kg |\n| Diesel/oil | ~42 MJ/kg |\n| Dry wood | ~18 MJ/kg |\n| Wet wood (50%) | ~9 MJ/kg |\n| Biogas (55% CH₄) | ~20 MJ/m³ |"
        },
        {
          "heading": "Biomass Conversion and Carbon Neutrality",
          "body": "**Thermal conversion:**\n- Combustion → steam → CHP\n- Gasification → syngas → engine/turbine\n- Pyrolysis → bio-oil, biochar\n\n**Biological conversion:**\n- Anaerobic digestion → biogas (60–70% CH₄)\n- Fermentation → bioethanol\n- Transesterification → biodiesel (FAME)\n\n**Carbon neutrality condition:**\n1. Sustainable forestry — regrowth absorbs combustion CO₂\n2. Short rotation — carbon cycle closes in years, not centuries\n3. No excessive land-use change\n\n**Sustainability concerns:**\n- 1st generation biofuels compete with food → ethical issues\n- 2nd generation: waste, straw, wood residues — no food competition\n\n**Germany:** Biomass is largest source of renewable HEAT, ~9% of electricity"
        }
      ],
      "questions": [
        {
          "id": "P8Q1",
          "conceptIndex": 1,
          "text": "Under what conditions can biomass combustion be considered carbon-neutral?",
          "options": [
            "Always — because plants absorb CO₂ from the atmosphere while growing",
            "Only if sustainable forestry or agriculture ensures regrowth absorbs the same CO₂ that combustion releases over the same timescale",
            "Never — any combustion releases CO₂ which contributes to climate change",
            "Only if carbon capture and storage (CCS) is added to the combustion plant"
          ],
          "correct": [1],
          "explanation": "Biomass carbon-neutrality requires a closed carbon cycle: CO₂ released by combustion must be re-absorbed by new plant growth over the same timescale. This requires sustainable forestry (replanting harvested trees) or agricultural residues. Burning old-growth forests is NOT carbon-neutral — the cycle doesn't close for centuries. Land-use change can also trigger large CO₂ releases from soil.",
          "type": "single"
        },
        {
          "id": "P8Q2",
          "conceptIndex": 0,
          "text": "A biomass CHP plant burns 10 kg/s of dry wood (H_LHV = 18 MJ/kg), generates 18 MW of electricity, and delivers 54 MW of useful heat. What is its total efficiency?",
          "options": [
            "η_el = 18 / (10·18) = 10% — only electricity",
            "η_tot = (18 + 54) / (10 · 18) = 72/180 = 40%",
            "η_tot = (18,000 + 54,000) kW / (10 · 18,000 kW) = 72,000/180,000 = 40%",
            "η_tot = 54/180 = 30% — only counting heat"
          ],
          "correct": [2],
          "explanation": "η_tot = (P_el + Q̇_useful) / (ṁ_fuel · H_LHV). ṁ · H_LHV = 10 · 18,000 = 180,000 kW. η_tot = (18,000 + 54,000)/180,000 = 72,000/180,000 = 40%. In reality, well-designed biomass CHP achieves 80–90%. The electrical efficiency alone = 18/180 = 10% — CHP's value is that the remaining 30% heat is captured instead of wasted.",
          "type": "single"
        },
        {
          "id": "P8Q3",
          "conceptIndex": 0,
          "text": "How does moisture content affect the usable energy of wood fuel?",
          "options": [
            "No effect — chemical bonds contain the same energy regardless of moisture",
            "Moisture reduces effective heating value: energy is wasted evaporating water, and wet mass includes non-energy water weight",
            "Moisture slightly increases heating value by facilitating combustion",
            "Moisture only matters for transportation costs, not energy content"
          ],
          "correct": [1],
          "explanation": "Wet biomass has lower effective H_LHV: (1) combustion energy is consumed evaporating water (latent heat ~2.4 MJ/kg), and (2) fuel mass includes non-combustible water. Wood at 50% moisture ≈ half the effective heating value of bone-dry wood. This is why pellets (<10% moisture) have consistent, high energy density.",
          "type": "single"
        },
        {
          "id": "P8Q4",
          "conceptIndex": 1,
          "text": "Select ALL correct statements about anaerobic digestion of biomass.",
          "options": [
            "Anaerobic digestion produces biogas containing mainly CH₄ (60–70%) and CO₂",
            "The process requires oxygen — it is an aerobic combustion process",
            "Biogas can be used in CHP engines or upgraded to biomethane for the gas grid",
            "The digestate (solid residue) is a valuable fertilizer",
            "The process works well at temperatures below freezing"
          ],
          "correct": [0, 2, 3],
          "explanation": "Anaerobic means NO oxygen (B is wrong). Produces biogas: ~60-70% CH₄ + 30-40% CO₂ (A) ✓. Biogas can run CHP or be upgraded to biomethane (C) ✓. Nutrient-rich digestate used as fertilizer (D) ✓. The process needs mesophilic (35°C) or thermophilic (55°C) temperatures — below freezing stops bacterial activity (E is wrong).",
          "type": "multiple"
        }
      ]
    },
    {
      "id": 9,
      "title": "Geothermal Energy",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Geothermal Resource Fundamentals",
          "body": "**Geothermal gradient:** ~30°C per km depth (continental crust average)\n- High-potential regions: Iceland, Italy, Turkey, western USA (~70–100°C/km)\n- Germany: ~30°C/km\n\n**Temperature at depth:**\nT(depth) ≈ T_surface + gradient · depth\n\nExample: 3 km deep in Germany:\nT ≈ 10°C + 30°C/km · 3 km = **100°C**\n→ Good for district heating, not electricity\n\n**Minimum temperature for electricity generation:** ~150°C\n(ORC possible at >80°C, but Carnot efficiency too low below 150°C)\n\n**Key advantage over wind/solar:**\n- **Baseload:** Available 24/7, capacity factor **>80%**\n- Not weather-dependent\n- Fully dispatchable"
        },
        {
          "heading": "Types of Geothermal Systems",
          "body": "**1. Shallow geothermal (0–400m):**\n- Ground source heat pumps (GSHP)\n- Ground T ≈ 10–15°C constant\n- Space heating/cooling\n\n**2. Hydrothermal (deep, >1km):**\n- Natural hot water/steam in permeable rock\n- Direct use: district heating (60–100°C)\n- Electricity: >150°C needed\n- Regions: Iceland, Italy, Turkey, New Zealand, USA\n\n**3. Enhanced Geothermal Systems (EGS) / Hot Dry Rock:**\n- Drill into hot rock (no natural water needed)\n- Inject water → hydraulically fracture rock → extract steam\n- Potential: huge (hot rock exists everywhere at depth)\n- Main challenge: **induced seismicity** (minor earthquakes)\n- Status: mostly demonstration projects\n\n**Germany:** Limited electricity potential, but good for district heating in Bavaria and Upper Rhine Graben"
        }
      ],
      "questions": [
        {
          "id": "P9Q1",
          "conceptIndex": 0,
          "text": "Typical geothermal gradient in continental crust is ~30°C/km. Expected temperature at 4 km depth in Germany (surface T = 10°C)?",
          "options": [
            "Gradient ~3°C/km → T(4km) = 22°C",
            "T(4km) = 10 + 30·4 = 130°C",
            "T(4km) = 30·4 = 120°C (forgot surface temperature)",
            "Gradient ~100°C/km → T(4km) = 410°C"
          ],
          "correct": [1],
          "explanation": "T = T_surface + gradient · depth = 10 + 30·4 = 130°C. At 130°C, this is just below the economic threshold for electricity generation (~150°C). To reach electricity-grade temperatures in Germany, you'd typically need 5–6 km depth.",
          "type": "single"
        },
        {
          "id": "P9Q2",
          "conceptIndex": 1,
          "text": "What is Enhanced Geothermal System (EGS) and its main challenge?",
          "options": [
            "EGS extracts heat from natural hot springs — challenge is finding water reservoirs",
            "EGS injects water into hot dry rock, fractures it hydraulically, extracts steam — main challenge is induced seismicity",
            "EGS uses advanced drilling to reach 10+ km depth — challenge is drilling cost",
            "EGS combines geothermal with solar — challenge is integrating two sources"
          ],
          "correct": [1],
          "explanation": "EGS: (1) drill into hot dry rock (no natural water), (2) inject water at high pressure, (3) hydraulically fracture rock creating permeable pathways, (4) extract hot water/steam through second well. Main challenge: induced seismicity — hydraulic fracturing can cause minor earthquakes alarming local communities (as happened in Basel, Switzerland, and Staufen, Germany).",
          "type": "single"
        },
        {
          "id": "P9Q3",
          "conceptIndex": 0,
          "text": "Select ALL correct statements about geothermal energy's advantages over wind and solar.",
          "options": [
            "Geothermal provides baseload power — available 24/7 with capacity factors >80%",
            "Geothermal is weather-independent",
            "Geothermal can be built anywhere at similar cost — the resource is universal",
            "Geothermal is fully dispatchable — output can be controlled to match demand"
          ],
          "correct": [0, 1, 3],
          "explanation": "Geothermal: firm baseload power, capacity factors >80% vs ~20-25% for solar/wind (A) ✓. Weather-independent (B) ✓. Dispatchable — output can be adjusted (D) ✓. However, it is NOT available everywhere at similar cost (C is wrong) — hot rock is shallow in some regions (Iceland, Italy) but very deep in others, requiring expensive drilling.",
          "type": "multiple"
        },
        {
          "id": "P9Q4",
          "conceptIndex": 0,
          "text": "What minimum reservoir temperature is needed for economical geothermal electricity generation?",
          "options": [
            "40°C — ground-source heat pump temperature",
            "80°C — minimum for Organic Rankine Cycle",
            "~150°C — practical minimum for economical electricity generation",
            "300°C — required for all steam turbines"
          ],
          "correct": [2],
          "explanation": "While ORC can work from ~80°C, Carnot efficiency is very low: η = 1−353/473 ≈ 25%. For economical electricity generation, ~150°C is the practical minimum. Above ~180°C, flash steam systems become viable. Most of Germany's resources are below 150°C, limiting geothermal to district heating.",
          "type": "single"
        }
      ]
    },
    {
      "id": 10,
      "title": "Energy Storage and Renewable Fuels",
      "speaker": "Karl / Sanyal",
      "concepts": [
        {
          "heading": "Energy Storage — Key Metrics",
          "body": "**Power-to-Power efficiency:**\nη_P2P = W_out / W_in = ∫P_out dt / ∫P_in dt\n\n**State of Charge:** SOC = C / C_max [%]\n\n**Storage technologies:**\n| Technology | η_P2P | Timescale | Key feature |\n|-----------|-------|-----------|-------------|\n| Li-ion battery | ~90% | Hours | EVs, short-term grid |\n| Pumped hydro | ~80% | Hours–days | >90% of global storage |\n| Compressed air | ~60% | Hours | Site-dependent |\n| Hydrogen (P2G2P) | ~35–45% | **Seasonal** | Low round-trip, but high energy density |\n| Thermal storage | ~95% | Hours | Simple, cheap |\n\n**Seasonal storage challenge:**\nBatteries/pumped hydro: efficient for daily/weekly.\nFor seasonal (summer → winter): only hydrogen/P2G has sufficient capacity."
        },
        {
          "heading": "Hydrogen and Fuel Cells",
          "body": "**Electrolysis:** H₂O → H₂ + ½O₂\n- Efficiency: ~65–80%\n\n**Fuel cell:** H₂ + ½O₂ → H₂O + electricity\n- Efficiency: ~50–60%\n\n**Round-trip (P2G2P):** ~35–45%\n\n**Nernst voltage:**\nU = U⁰ − (R·T)/(z·F) · ln(∏ aᵢ^νᵢ)\n- Standard H₂/O₂ fuel cell: U⁰ = **1.23 V** at 25°C\n- R = 8.314 J/(mol·K)\n- F = 96,485 C/mol\n- z = 2 electrons for H₂/O₂\n\n**Gibbs enthalpy:** ΔG_R = −z · F · U\n\n**Why low round-trip?**\nElectrolysis (~70%) × fuel cell (~55%) ≈ 38%\nVs Li-ion: ~90%"
        },
        {
          "heading": "Power-to-X and Sector Coupling",
          "body": "**Power-to-X:** Convert surplus renewable electricity into storable fuels\n\n**Pathways:**\n- **P2G:** Electricity → H₂ (or CH₄ via methanation)\n- **P2L:** H₂ + CO₂ → e-fuels (e-kerosene, e-diesel)\n- **P2H:** Surplus electricity → heat\n- **P2Chemicals:** H₂ → ammonia, methanol\n\n**Use cases:**\n- Aviation and shipping (e-fuels — hard to electrify directly)\n- Industrial high-temperature heat\n- Seasonal storage of summer solar surplus\n- Decarbonizing chemical industry (green H₂ for ammonia, steel)\n\n**Sector coupling:** Connecting electricity, heat, gas, and transport through P2X → higher renewable utilization, enables seasonal storage, decarbonizes hard-to-electrify sectors"
        }
      ],
      "questions": [
        {
          "id": "P10Q1",
          "conceptIndex": 0,
          "text": "A battery is charged with 100 kWh and delivers 90 kWh when discharged. What is the Power-to-Power (round-trip) efficiency?",
          "options": [
            "η_P2P = 90/100 = 90%",
            "η_P2P = 100/90 = 111% — impossible",
            "η_P2P = (100−90)/100 = 10% — this is the loss fraction",
            "η_P2P = 90·100 = 9000 — dimensionally wrong"
          ],
          "correct": [0],
          "explanation": "η_P2P = W_out / W_in = 90/100 = 90%. Typical for lithium-ion (85–95%). Compare to hydrogen (P2G2P): 100 kWh in → ~70 kWh H₂ → ~38 kWh electricity out → η_P2P ≈ 38%. Li-ion is far more efficient for short-term storage; hydrogen wins only for long-duration/seasonal storage due to its high energy density.",
          "type": "single"
        },
        {
          "id": "P10Q2",
          "conceptIndex": 1,
          "text": "Why is hydrogen (P2G2P) round-trip efficiency much lower than Li-ion batteries? Select ALL correct statements.",
          "options": [
            "Electrolysis efficiency is ~65–80% — not all electricity converts to H₂ chemical energy",
            "Fuel cell efficiency is ~50–60% — H₂ chemical energy is not fully recovered as electricity",
            "Total round-trip: ~65–80% × 50–60% ≈ 35–45%",
            "Hydrogen storage itself is lossless — all losses occur in conversion steps"
          ],
          "correct": [0, 1, 2, 3],
          "explanation": "Electrolysis: ~65-80% (A). Fuel cell: ~50-60% (B). Combined: ~35-45% (C). Pressurized H₂ storage has minimal losses — losses occur in electrochemical conversion (D). Despite low efficiency, hydrogen's very high energy density and months-long storage capability make it uniquely suitable for seasonal storage — where batteries cannot economically scale.",
          "type": "multiple"
        },
        {
          "id": "P10Q3",
          "conceptIndex": 1,
          "text": "The standard equilibrium (Nernst) voltage of a hydrogen-oxygen fuel cell at 25°C is approximately:",
          "options": [
            "0.7 V — typical operating voltage under load",
            "1.23 V — the thermodynamic equilibrium voltage",
            "3.7 V — standard Li-ion cell voltage",
            "48 V — a typical fuel cell stack voltage"
          ],
          "correct": [1],
          "explanation": "Standard equilibrium voltage for H₂/O₂: U⁰ = 1.23 V at 25°C, 1 atm. From ΔG_R = −z·F·U: ΔG = −237 kJ/mol for H₂O formation, z=2, F=96,485 C/mol → U⁰ = 237,000/(2·96,485) ≈ 1.23 V. Under load, operating voltage drops to ~0.6–0.7 V due to polarization losses — hence the ~50-60% efficiency.",
          "type": "single"
        },
        {
          "id": "P10Q4",
          "conceptIndex": 2,
          "text": "What is 'sector coupling' and why is it important for the energy transition?",
          "options": [
            "Connecting electricity grids between different countries via interconnectors",
            "Linking electricity, heat, gas, and transport sectors through Power-to-X — enabling surplus renewable electricity to be stored and used across all sectors",
            "Coupling solar and wind plants to operate together for stable output",
            "Combining nuclear and renewable power plants in the same grid zone"
          ],
          "correct": [1],
          "explanation": "Sector coupling connects the electricity sector to heat, gas/hydrogen, and mobility through P2X technologies. Surplus solar/wind electricity → heat (P2H), hydrogen (P2G), or e-fuels (P2L) for other sectors. Benefits: (1) avoids curtailment of renewables, (2) enables seasonal storage, (3) decarbonizes hard-to-electrify sectors (aviation, shipping, industrial processes).",
          "type": "single"
        },
        {
          "id": "P10Q5",
          "conceptIndex": 0,
          "text": "A battery has C_max = 200 Ah at 48 V. Currently 75 Ah remains. What is the State of Charge (SOC)?",
          "options": [
            "SOC = 75/200 = 37.5%",
            "SOC = (200−75)/200 = 62.5% — this is the discharged fraction",
            "SOC = 75·48 = 3,600 Wh — this is stored energy, not SOC",
            "SOC = 200/75 = 267% — impossible"
          ],
          "correct": [0],
          "explanation": "SOC = C/C_max = 75/200 = 37.5%. Can also express in kWh: stored = 75·48 = 3,600 Wh = 3.6 kWh; max = 200·48 = 9,600 Wh; SOC = 3.6/9.6 = 37.5% ✓. In practice, batteries operate within a safe SOC window (e.g., 20–80%) to extend cycle life — so usable capacity is less than C_max.",
          "type": "single"
        }
      ]
    }
  ]
}
