# Impact of Autonomous Vehicles on Insurance Risk Pools: A Simulation Study

## Introduction
How will the introduction of autonomous vehicles affect the insurance premiums paid by human drivers? 
This is a frequent question on [r/SelfDrivingCars](https://www.reddit.com/r/SelfDrivingCars/).
The community there seems divided. Many commentators argue that rates will decline, others argue that rates will go up.
This simulation attempts to shed some light on how different factors will affect insurance premiums.

## Background
Insurance premiums are fundamentally based on risk pool characteristics. The basic premium calculation can be expressed as:
`Premium = (Total Expected Payouts + Administrative Costs) / Number of Pool Members`
(Note that "Profit" is not in that equation. That is because insurance companies do not earn a profit from the premiums paid to them.
They instead make their profits from [insurance float](https://www.npr.org/sections/money/2010/03/warren_buffett_explains_the_ge.html))

## Methodology
The simulation explores three variables:
1. Relative Crash Rate (RCR): Crash frequency of AVs compared to human-driven vehicles.
2. Relative Repair Costs (RRC): Cost differential for AV repairs versus conventional vehicles.
3. Fault Attribution Split (FAS): Distribution of claim payouts between involved parties.

### Default Parameters
- RCR: 0.10 (90% reduction in crash frequency)
- RRC: 1.20 (20% increase in repair costs).
- FAS: 0.75/0.25 split for at-fault/not-at-fault parties.

The RCR value is based on [Waymo's published research](https://waymo.com/research/do-autonomous-vehicles-outperform-latest-generation-human-driven-vehicles-25-million-miles/) which claims a "88% reduction in property damage claims, 92% in bodily injury claims".
The RRC and FAS values are largely guesses on my part. If you have any reputable sources for these, please let me know.

### Limitations
The model excludes at least two significant factors:
1. Driver Selection Bias: Differential adoption rates among driver risk categories. I.e., are good drivers more or less likely to adopt AVs than bad drivers are?
2. Geographic Distribution: Variation in deployment patterns and regional risk factors. AVs will almost certainly be adopted in Urban areas before they are adopted in Suburban or Rural areas. Crash frequency and damage differ by region. 

## Results
When AV market penetration increases from 10% to 90% the following results were observed:

**Base Case Scenario (using default parameters):**
  * Global insurance costs decrease by ~87%
  * Human driver insurance costs decrease by ~14%

**Tipping Points:**
  * Relative Repair Cost ≥ 170%: Human insurance costs begin to rise
  * Relative Crash Rate ≥ 70%: Human insurance costs begin to rise

**Fault Attribution Split Impact:**
  * As FAS approaches 50%: Larger decrease in human insurance costs
  * As FAS approaches 100%: Smaller decrease in human insurance costs
  * At 100% FAS: Counterintuitive rise in both human and AV insurance costs despite lower global costs (see Appendix for detailed breakdown)


## Appendix of full results:

### Default Values
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|11%|2%|12%|
|30%|21%|4%|22%|
|40%|32%|5%|32%|
|50%|42%|7%|43%|
|60%|54%|9%|54%|
|70%|64%|11%|64%|
|80%|75%|12%|74%|
|90%|87%|14%|85%|

### Relative Repair Cost
Simulation where the AV Relative Repair Cost ranges from 100% to 200%.

#### AV Relative Repair Cost: 100%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|11%|2%|11%|
|30%|23%|5%|22%|
|40%|33%|7%|32%|
|50%|44%|10%|43%|
|60%|56%|13%|54%|
|70%|66%|15%|64%|
|80%|77%|18%|75%|
|90%|87%|20%|85%|

#### AV Relative Repair Cost: 110%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|11%|2%|11%|
|30%|22%|5%|22%|
|40%|34%|7%|34%|
|50%|42%|8%|42%|
|60%|54%|11%|54%|
|70%|66%|13%|65%|
|80%|76%|15%|74%|
|90%|88%|17%|85%|

#### AV Relative Repair Cost: 120%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|10%|2%|10%|
|30%|19%|3%|20%|
|40%|31%|5%|31%|
|50%|41%|7%|41%|
|60%|52%|9%|53%|
|70%|65%|11%|64%|
|80%|75%|12%|74%|
|90%|87%|14%|85%|

#### AV Relative Repair Cost: 130%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|10%|1%|11%|
|30%|19%|3%|21%|
|40%|30%|4%|32%|
|50%|40%|5%|42%|
|60%|51%|7%|52%|
|70%|62%|8%|62%|
|80%|74%|9%|73%|
|90%|87%|11%|85%|

#### AV Relative Repair Cost: 140%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|10%|1%|11%|
|30%|19%|2%|22%|
|40%|28%|3%|31%|
|50%|39%|4%|42%|
|60%|51%|5%|53%|
|70%|61%|6%|63%|
|80%|73%|7%|74%|
|90%|86%|7%|85%|

#### AV Relative Repair Cost: 150%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|9%|1%|11%|
|30%|18%|1%|21%|
|40%|28%|2%|32%|
|50%|39%|2%|43%|
|60%|49%|3%|52%|
|70%|61%|4%|63%|
|80%|72%|4%|73%|
|90%|85%|5%|84%|

#### AV Relative Repair Cost: 160%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|9%|0%|10%|
|30%|17%|0%|21%|
|40%|26%|1%|31%|
|50%|38%|1%|43%|
|60%|49%|1%|53%|
|70%|58%|1%|62%|
|80%|72%|1%|74%|
|90%|85%|2%|84%|

#### AV Relative Repair Cost: 170%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|8%|-0%|10%|
|30%|17%|-0%|21%|
|40%|26%|-1%|31%|
|50%|35%|-1%|41%|
|60%|47%|-1%|52%|
|70%|60%|-1%|64%|
|80%|70%|-1%|73%|
|90%|84%|-1%|84%|

#### AV Relative Repair Cost: 180%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|9%|-1%|12%|
|30%|16%|-1%|22%|
|40%|25%|-2%|32%|
|50%|35%|-2%|42%|
|60%|46%|-3%|53%|
|70%|58%|-3%|63%|
|80%|71%|-3%|74%|
|90%|84%|-4%|84%|

#### AV Relative Repair Cost: 190%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|7%|-1%|11%|
|30%|15%|-2%|21%|
|40%|24%|-3%|31%|
|50%|33%|-3%|41%|
|60%|44%|-4%|52%|
|70%|56%|-5%|63%|
|80%|69%|-6%|73%|
|90%|83%|-7%|84%|

#### AV Relative Repair Cost: 200%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|7%|-1%|11%|
|30%|15%|-2%|21%|
|40%|24%|-4%|32%|
|50%|32%|-5%|41%|
|60%|44%|-6%|52%|
|70%|56%|-7%|63%|
|80%|70%|-9%|74%|
|90%|83%|-10%|84%|

### Relative Crash Rate
Simulation where the AV Relative Crash Rate ranges from 10% to 100%
#### AV Relative Crash Rate: 10%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|9%|2%|8%|
|30%|19%|3%|15%|
|40%|27%|4%|21%|
|50%|37%|6%|29%|
|60%|47%|8%|36%|
|70%|58%|9%|44%|
|80%|66%|10%|50%|
|90%|77%|12%|57%|

#### AV Relative Crash Rate: 20%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|7%|1%|5%|
|30%|15%|2%|9%|
|40%|23%|3%|14%|
|50%|31%|5%|19%|
|60%|39%|6%|24%|
|70%|47%|7%|28%|
|80%|56%|8%|33%|
|90%|66%|10%|38%|

#### AV Relative Crash Rate: 30%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|6%|1%|3%|
|30%|12%|2%|6%|
|40%|20%|3%|10%|
|50%|26%|4%|12%|
|60%|33%|5%|16%|
|70%|40%|5%|19%|
|80%|47%|7%|22%|
|90%|54%|7%|25%|

#### AV Relative Crash Rate: 40%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|6%|1%|2%|
|30%|10%|1%|4%|
|40%|15%|2%|6%|
|50%|21%|3%|9%|
|60%|26%|3%|11%|
|70%|32%|4%|13%|
|80%|38%|5%|15%|
|90%|44%|5%|17%|

#### AV Relative Crash Rate: 50%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|4%|0%|2%|
|30%|7%|1%|3%|
|40%|11%|1%|4%|
|50%|15%|1%|5%|
|60%|20%|2%|6%|
|70%|24%|2%|8%|
|80%|28%|2%|9%|
|90%|33%|3%|10%|

#### AV Relative Crash Rate: 60%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|2%|0%|0%|
|30%|5%|0%|1%|
|40%|8%|0%|2%|
|50%|11%|0%|2%|
|60%|13%|1%|3%|
|70%|17%|1%|4%|
|80%|20%|1%|4%|
|90%|23%|0%|5%|

#### AV Relative Crash Rate: 70%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|1%|-0%|0%|
|30%|3%|-0%|0%|
|40%|4%|-1%|0%|
|50%|6%|-1%|1%|
|60%|8%|-1%|1%|
|70%|9%|-1%|1%|
|80%|11%|-1%|1%|
|90%|13%|-1%|1%|

#### AV Relative Crash Rate: 80%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|0%|-0%|0%|
|30%|1%|-1%|-1%|
|40%|1%|-1%|-1%|
|50%|1%|-2%|-1%|
|60%|2%|-2%|-1%|
|70%|2%|-3%|-2%|
|80%|3%|-3%|-2%|
|90%|3%|-3%|-2%|

#### AV Relative Crash Rate: 90%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|-1%|-1%|-0%|
|30%|-2%|-1%|-1%|
|40%|-2%|-2%|-2%|
|50%|-3%|-3%|-2%|
|60%|-4%|-4%|-3%|
|70%|-5%|-4%|-4%|
|80%|-6%|-5%|-4%|
|90%|-6%|-6%|-5%|

#### AV Relative Crash Rate: 100%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|-2%|-1%|-1%|
|30%|-4%|-2%|-1%|
|40%|-6%|-3%|-2%|
|50%|-8%|-4%|-3%|
|60%|-10%|-5%|-4%|
|70%|-12%|-6%|-5%|
|80%|-14%|-7%|-6%|
|90%|-15%|-8%|-7%|

### Fault Attribution Split
Simulation where the At Fault Payout ranges from 50% to 100%.
#### At Fault Payout Percent: 50%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|10%|5%|11%|
|30%|20%|9%|21%|
|40%|31%|14%|33%|
|50%|41%|18%|43%|
|60%|54%|24%|55%|
|70%|64%|28%|65%|
|80%|75%|33%|76%|
|90%|87%|37%|86%|

#### At Fault Payout Percent: 60%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|9%|3%|9%|
|30%|20%|7%|21%|
|40%|31%|11%|33%|
|50%|41%|14%|42%|
|60%|54%|18%|55%|
|70%|64%|21%|65%|
|80%|75%|24%|75%|
|90%|87%|28%|86%|

#### At Fault Payout Percent: 70%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|11%|3%|11%|
|30%|20%|5%|20%|
|40%|32%|7%|34%|
|50%|41%|9%|42%|
|60%|53%|12%|54%|
|70%|63%|14%|63%|
|80%|75%|16%|74%|
|90%|86%|19%|85%|

#### At Fault Payout Percent: 80%
|AV Percent|Global Cost Reduction|HUMAN Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|10%|0%|0%|0%|
|20%|11%|1%|11%|
|30%|21%|2%|21%|
|40%|31%|4%|31%|
|50%|41%|5%|42%|
|60%|54%|6%|54%|
|70%|64%|7%|63%|
|80%|76%|8%|74%|
|90%|88%|9%|84%|

#### At Fault Payout Percent: 90%
|AV Percent|Global Cost Reduction|Global Costs|HUMAN Cost Reduction|HUMAN Cost per car|AV Cost Reduction|AV Cost per car|
:--|:--|:--|:--|:--|:--|:--|
|10%|0%|$456,715,424|0%|$99,896|0%|$10,992|
|20%|10%|$409,143,360|0%|$99,832|11%|$9,816|
|30%|22%|$355,572,960|-0%|$99,900|21%|$8,635|
|40%|31%|$314,480,256|0%|$99,653|30%|$7,670|
|50%|42%|$264,531,392|0%|$99,689|40%|$6,571|
|60%|53%|$215,183,296|0%|$99,502|50%|$5,519|
|70%|64%|$164,931,104|0%|$99,505|60%|$4,425|
|80%|75%|$112,810,072|1%|$99,130|70%|$3,349|
|90%|87%|$59,751,384|1%|$99,243|79%|$2,295|

#### At Fault Payout Percent: 100%
|AV Percent|Global Cost Reduction|Global Costs|HUMAN Cost Reduction|HUMAN Cost per car|AV Cost Reduction|AV Cost per car|
:--|:--|:--|:--|:--|:--|:--|
|10%|0%|$453,834,016|0%|$101,124|0%|$1,156|
|20%|10%|$406,638,112|-1%|$102,006|2%|$1,137|
|30%|20%|$364,114,688|-2%|$102,994|2%|$1,134|
|40%|30%|$317,246,560|-3%|$103,822|1%|$1,147|
|50%|42%|$264,661,888|-4%|$104,851|1%|$1,140|
|60%|52%|$219,041,920|-5%|$105,900|-0%|$1,158|
|70%|62%|$174,208,112|-6%|$106,879|-0%|$1,160|
|80%|76%|$109,390,288|-7%|$108,126|-1%|$1,172|
|90%|87%|$60,931,560|-8%|$109,034|-3%|$1,186|