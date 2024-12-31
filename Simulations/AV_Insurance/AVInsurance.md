# Impact of Autonomous Vehicles on Insurance Risk Pools: A Simulation Study

## TLDR
This simulation suggest that as self driving vehicles become common, insurance costs will likely go down for everyone, including human drivers.

## Introduction
How will the introduction of autonomous vehicles affect the insurance premiums paid by human drivers? 
This is a frequent question on [r/SelfDrivingCars](https://www.reddit.com/r/SelfDrivingCars/).
The community there seems divided. Many commentators argue that rates will decline, others argue that rates will go up.
This simulation attempts to shed some light on how different factors will affect insurance premiums.

## Background
Insurance premiums are pretty straightforward - they're based on the total expected payouts and administrative costs, divided by the number of people in the insurance pool.
`Premium = (Total Expected Payouts + Administrative Costs) / Number of Pool Members`

Note that "Profit" is not in that equation. Insurance companies actually make their profits by investing the premiums, not from the premiums themselves - this is called [insurance float](https://www.npr.org/sections/money/2010/03/warren_buffett_explains_the_ge.html)


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
The simulation excludes at least four significant factors:

**Driver Adoption Bias:**
Differential adoption rates among driver risk categories. 
I.e., are good drivers more or less likely to adopt AVs than bad drivers are?
This simulation makes no distinction between good and bad human drivers, or the rate at which they adopt AVs.
If good drivers adopt AVs at a faster rate than bad drivers, that should put upwards pressure on human insurance premiums.
If bad drivers adopt AVs at a faster rate than good drivers, that should put downwards pressure on human insurance premiums.

**Geographic Distribution:** Variation in deployment patterns and regional risk factors.
AVs will almost certainly be adopted in Urban areas before they are adopted in Suburban or Rural areas.
Rural driver's insurance is unlikely to be affected by Urban adoption of AVs.
Crash frequency and damage differ by region. 
[See this for more details](https://www.iihs.org/topics/fatality-statistics/detail/urban-rural-comparison) on how Urban and Rural areas differ.


**Legislative and Regulatory changes to insurance minimums:** Many states have insurance minimums as [low as 25/50/25](https://www.insure.com/car-insurance/minimum-coverage-levels.html).
In a world where driving becomes safer, it is possible that authorities will **increase** insurance minimums.
Increasing minimums would increase the cost of insurance.
Currently authorities have to ballance two competing goals:
1. Making insurance affordable enough so that 90+% of drivers can afford it.
2. Making insurance comprehensive enough so that it covers the costs of most accidents.

25/50/25 should be read as:
* Up to $25,000 per injured person's medical expenses.
* Up to $50,000 total medical expenses per crash.
* up to %25,000 total property damage per crash.

It should be clear that minimums of 25/50/25 are laughable low in 2025 given the cost of medical care and the cost of a new cars.


**Defensive Driving:** Sometimes, but not always, it takes two to tango.
When this simulation determines that a car is going to cause a crash, there is noting the "victim's" car can do to avoid the crash.
This simulation uses just a single variable for crash rate. 
A more comprehensive simulation might have two variable, one for percent chance to cause a crash, and one for percent chance to avoid a crash.

## Results
When AV market penetration increases from 1% to 90% the following results were observed:

**Base Case Scenario (using default parameters):**
  * Global insurance costs decrease by ~78%
  * Human driver insurance costs decrease by ~13%

**Tipping Points:**
  * If Relative Repair Cost ≥ 160%: Human insurance costs begin to rise as AV adoption increases
  * If Relative Crash Rate ≥ 70%: Human insurance costs begin to rise as AV adoption increases

**Fault Attribution Split Impact:**
  * As FAS approaches 50%: Larger decrease in human insurance costs
  * As FAS approaches 100%: Smaller decrease in human insurance costs
  * At 100% FAS: Counterintuitive rise in both human and AV insurance costs despite lower global costs (see Appendix for detailed breakdown)


## Appendix of full results:

### Default Values

Basic simulation with default values for all parameters.
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|1%|6%|
|20%|16%|3%|13%|
|30%|25%|4%|20%|
|40%|33%|6%|26%|
|50%|42%|7%|33%|
|60%|49%|9%|39%|
|70%|60%|10%|47%|
|80%|69%|12%|53%|
|90%|78%|13%|59%|

### Simulation where the AV Relative Repair Cost ranges from 100% to 200%

#### AV Relative Repair Cost: 100%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|8%|2%|6%|
|20%|18%|5%|13%|
|30%|27%|7%|20%|
|40%|35%|9%|26%|
|50%|44%|11%|34%|
|60%|53%|13%|41%|
|70%|63%|16%|48%|
|80%|73%|18%|56%|
|90%|81%|20%|62%|

#### AV Relative Repair Cost: 110%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|2%|6%|
|20%|16%|4%|13%|
|30%|25%|6%|19%|
|40%|34%|7%|26%|
|50%|43%|9%|33%|
|60%|52%|11%|40%|
|70%|61%|13%|47%|
|80%|71%|15%|54%|
|90%|80%|17%|61%|

#### AV Relative Repair Cost: 120%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|8%|1%|7%|
|20%|16%|3%|14%|
|30%|25%|4%|20%|
|40%|33%|6%|27%|
|50%|42%|7%|33%|
|60%|50%|9%|40%|
|70%|59%|10%|46%|
|80%|69%|11%|53%|
|90%|79%|13%|60%|

#### AV Relative Repair Cost: 130%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|1%|6%|
|20%|15%|2%|12%|
|30%|22%|3%|19%|
|40%|29%|4%|24%|
|50%|39%|5%|31%|
|60%|49%|6%|39%|
|70%|57%|8%|45%|
|80%|67%|9%|52%|
|90%|77%|10%|58%|

#### AV Relative Repair Cost: 140%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|6%|1%|6%|
|20%|13%|1%|12%|
|30%|22%|2%|19%|
|40%|30%|3%|25%|
|50%|38%|3%|32%|
|60%|47%|4%|38%|
|70%|57%|5%|45%|
|80%|67%|5%|52%|
|90%|76%|6%|58%|

#### AV Relative Repair Cost: 150%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|6%|0%|5%|
|20%|12%|1%|11%|
|30%|21%|1%|19%|
|40%|28%|1%|25%|
|50%|37%|2%|31%|
|60%|47%|2%|38%|
|70%|56%|2%|44%|
|80%|64%|3%|50%|
|90%|75%|3%|57%|

#### AV Relative Repair Cost: 160%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|6%|-0%|6%|
|20%|12%|0%|12%|
|30%|19%|-0%|17%|
|40%|27%|-0%|24%|
|50%|35%|-0%|31%|
|60%|43%|-0%|36%|
|70%|54%|-0%|43%|
|80%|62%|-0%|49%|
|90%|72%|-1%|55%|

#### AV Relative Repair Cost: 170%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|5%|-0%|6%|
|20%|12%|-1%|13%|
|30%|17%|-1%|18%|
|40%|25%|-2%|24%|
|50%|33%|-2%|31%|
|60%|42%|-3%|37%|
|70%|51%|-3%|42%|
|80%|61%|-4%|49%|
|90%|72%|-4%|55%|

#### AV Relative Repair Cost: 180%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|4%|-1%|5%|
|20%|10%|-2%|11%|
|30%|17%|-2%|17%|
|40%|24%|-3%|24%|
|50%|31%|-4%|29%|
|60%|40%|-5%|35%|
|70%|50%|-6%|42%|
|80%|59%|-7%|47%|
|90%|70%|-8%|54%|

#### AV Relative Repair Cost: 190%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|4%|-1%|6%|
|20%|10%|-2%|12%|
|30%|15%|-3%|18%|
|40%|21%|-5%|23%|
|50%|30%|-6%|30%|
|60%|38%|-7%|35%|
|70%|48%|-8%|42%|
|80%|58%|-10%|48%|
|90%|70%|-11%|54%|

#### AV Relative Repair Cost: 200%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|4%|-1%|5%|
|20%|9%|-3%|10%|
|30%|15%|-5%|17%|
|40%|21%|-6%|22%|
|50%|29%|-8%|28%|
|60%|37%|-10%|34%|
|70%|46%|-11%|40%|
|80%|56%|-13%|46%|
|90%|67%|-14%|52%|

### Simulation where the AV Relative Crash Rate ranges from 10% to 100%

#### AV Relative Crash Rate: 10%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|1%|7%|
|20%|16%|3%|14%|
|30%|25%|5%|21%|
|40%|33%|6%|27%|
|50%|41%|7%|33%|
|60%|50%|9%|40%|
|70%|60%|10%|47%|
|80%|70%|12%|54%|
|90%|78%|13%|60%|

#### AV Relative Crash Rate: 20%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|6%|1%|5%|
|20%|13%|2%|9%|
|30%|22%|4%|15%|
|40%|28%|5%|19%|
|50%|35%|6%|23%|
|60%|44%|7%|28%|
|70%|52%|8%|32%|
|80%|59%|9%|37%|
|90%|67%|11%|41%|

#### AV Relative Crash Rate: 30%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|5%|1%|2%|
|20%|11%|2%|5%|
|30%|17%|3%|9%|
|40%|23%|4%|12%|
|50%|30%|5%|15%|
|60%|37%|6%|18%|
|70%|44%|7%|21%|
|80%|50%|8%|24%|
|90%|56%|8%|27%|

#### AV Relative Crash Rate: 40%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|4%|1%|2%|
|20%|8%|1%|4%|
|30%|13%|2%|6%|
|40%|19%|3%|8%|
|50%|24%|3%|10%|
|60%|29%|4%|12%|
|70%|36%|4%|14%|
|80%|40%|5%|16%|
|90%|46%|6%|19%|

#### AV Relative Crash Rate: 50%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|3%|0%|2%|
|20%|7%|1%|3%|
|30%|11%|1%|4%|
|40%|15%|2%|6%|
|50%|18%|2%|7%|
|60%|22%|2%|8%|
|70%|26%|2%|9%|
|80%|31%|3%|10%|
|90%|35%|3%|12%|

#### AV Relative Crash Rate: 60%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|2%|0%|1%|
|20%|5%|0%|1%|
|30%|7%|0%|2%|
|40%|10%|0%|3%|
|50%|13%|0%|3%|
|60%|16%|1%|4%|
|70%|19%|1%|5%|
|80%|22%|1%|5%|
|90%|25%|1%|6%|

#### AV Relative Crash Rate: 70%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|1%|-0%|-0%|
|20%|3%|-0%|-0%|
|30%|4%|-0%|-0%|
|40%|6%|-1%|0%|
|50%|7%|-1%|0%|
|60%|9%|-1%|0%|
|70%|10%|-1%|1%|
|80%|12%|-1%|1%|
|90%|14%|-2%|1%|

#### AV Relative Crash Rate: 80%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|0%|-0%|-1%|
|20%|1%|-1%|-1%|
|30%|1%|-1%|-1%|
|40%|1%|-2%|-2%|
|50%|2%|-2%|-2%|
|60%|2%|-3%|-2%|
|70%|2%|-3%|-2%|
|80%|3%|-3%|-3%|
|90%|3%|-4%|-3%|

#### AV Relative Crash Rate: 90%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|-1%|-1%|-0%|
|20%|-2%|-1%|-1%|
|30%|-2%|-2%|-1%|
|40%|-3%|-3%|-2%|
|50%|-4%|-4%|-3%|
|60%|-5%|-4%|-3%|
|70%|-6%|-5%|-4%|
|80%|-6%|-6%|-5%|
|90%|-7%|-6%|-5%|

#### AV Relative Crash Rate: 100%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|-2%|-1%|-0%|
|20%|-4%|-2%|-1%|
|30%|-6%|-3%|-2%|
|40%|-8%|-4%|-3%|
|50%|-10%|-5%|-4%|
|60%|-12%|-6%|-5%|
|70%|-14%|-7%|-6%|
|80%|-16%|-8%|-7%|
|90%|-18%|-9%|-8%|

### Simulation where the At Fault Payout ranges from 50% to 100%

#### At Fault Payout Percent: 50%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|8%|4%|8%|
|20%|16%|8%|16%|
|30%|24%|12%|24%|
|40%|32%|15%|31%|
|50%|41%|19%|40%|
|60%|51%|24%|48%|
|70%|59%|27%|56%|
|80%|68%|31%|64%|
|90%|78%|35%|72%|

#### At Fault Payout Percent: 60%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|3%|7%|
|20%|16%|6%|15%|
|30%|24%|9%|23%|
|40%|32%|11%|29%|
|50%|42%|15%|39%|
|60%|50%|17%|45%|
|70%|60%|21%|54%|
|80%|68%|23%|60%|
|90%|78%|26%|68%|

#### At Fault Payout Percent: 70%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|8%|2%|8%|
|20%|15%|4%|14%|
|30%|23%|6%|21%|
|40%|33%|8%|29%|
|50%|41%|10%|36%|
|60%|51%|12%|43%|
|70%|59%|14%|49%|
|80%|69%|16%|57%|
|90%|78%|17%|64%|

#### At Fault Payout Percent: 80%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|
:--|:--|:--|:--|
|1%|0%|0%|0%|
|10%|7%|1%|6%|
|20%|15%|2%|12%|
|30%|24%|3%|18%|
|40%|32%|4%|24%|
|50%|41%|5%|31%|
|60%|51%|6%|37%|
|70%|59%|7%|43%|
|80%|69%|8%|49%|
|90%|79%|9%|55%|

#### At Fault Payout Percent: 90%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|Global Costs|Human Costs per car|AV Costs per car|
:--|:--|:--|:--|:--|:--|:--|
|1%|0%|0%|0%|$496,795,200|$100,073|$20,714|
|10%|7%|0%|4%|$459,851,168|$99,918|$19,959|
|20%|16%|-0%|8%|$417,946,976|$100,083|$19,154|
|30%|24%|-0%|12%|$376,638,400|$100,091|$18,256|
|40%|34%|0%|17%|$329,429,472|$99,981|$17,186|
|50%|41%|0%|20%|$292,881,440|$99,949|$16,469|
|60%|51%|-0%|25%|$243,859,824|$100,195|$15,506|
|70%|59%|0%|29%|$202,102,512|$99,728|$14,663|
|80%|69%|-0%|33%|$155,424,704|$100,206|$13,783|
|90%|78%|-0%|38%|$108,766,504|$100,199|$12,921|

#### At Fault Payout Percent: 100%
|AV Percent|Global Cost Reduction|Human Cost Reduction|AV Cost Reduction|Global Costs|Human Costs per car|AV Costs per car|
:--|:--|:--|:--|:--|:--|:--|
|1%|0%|0%|0%|$495,987,392|$100,106|$11,029|
|10%|7%|-1%|-1%|$459,797,728|$100,955|$11,176|
|20%|16%|-2%|-1%|$415,445,824|$102,204|$11,181|
|30%|24%|-3%|-2%|$378,528,640|$102,809|$11,305|
|40%|34%|-4%|-4%|$329,674,336|$104,124|$11,432|
|50%|42%|-5%|-5%|$289,592,736|$104,991|$11,556|
|60%|50%|-6%|-6%|$246,105,888|$105,870|$11,675|
|70%|59%|-7%|-6%|$202,515,552|$106,901|$11,666|
|80%|69%|-8%|-7%|$152,093,776|$108,242|$11,782|
|90%|78%|-8%|-8%|$106,655,824|$108,397|$11,893|