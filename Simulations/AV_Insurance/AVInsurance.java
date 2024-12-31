// No need to change this. If you use some "small" percent like 1%, then you will just need to run for more miles and more cars to see results.
final float HUMAN_CRASH_RATE = 0.1f;

// Number is irrelevant. Just use some number above 100.
final float CAR_REPAIR_COST = 100;

// Default value of 10%. i.e., 90% reduction in crash rates compared to humans.
final float DEFAULT_AV_RELATIVE_CRASH_RATE = 0.01f;

// Default value of 120%. i.e., AVs are 20% more expensive to repair.
final float DEFAULT_AV_RELATIVE_CAR_REPAIR_COST = 1.2f;

// The At Fault driver pays this percent of the damage, the not at fault driver pays the remainder.
final float DEFAULT_AT_FAULT_PAYOUT_SPLIT = 0.75f;

final Random r = new Random();

// The higher these are, the less random the results will be from run to run, but the longer it will take.
final int TOTAL_CARS = 5000;
final int TOTAL_DRIVES = 5000;

// Pick which simulation to run.
final SimulationMode simulationMode = SimulationMode.DEFAULT;

// Prints the dollar values id true. NOTE - the dollar values are just for illustrative purposes. i.e. do they increase, or decrease as other variables change.
final boolean includeAbsoluteDollarValuesWhenPrinting = false;

enum SimulationMode {
    DEFAULT,
    FAULT_SPLIT,
    CRASH_RATE,
    REPAIR_COST;
}

record Car(
    boolean isAV,
    float crashChance,
    float repairCost,
    String poolName,
    PoolCost poolCost) {
}

record Result(
    float avPercent,
    float globalCosts,
    Map<String,Float> poolCosts,
    Map<String,Float> poolSize){
}

// Once JEP 468 is in preview, this could be removed in favor of a "with" syntax.
class PoolCost{
    public PoolCost() {
        this.lifetimeRepairCosts = 0;
    }

    float lifetimeRepairCosts;
}

void main(String[] args) {
    switch (simulationMode) {
        case FAULT_SPLIT -> atFaultPayoutSim();
        case CRASH_RATE -> relativeCrashRateSim();
        case REPAIR_COST -> relativeRepairCostSim();
        default -> {
            println("Basic simulation with default values for all parameters.");
            basicSim(DEFAULT_AV_RELATIVE_CRASH_RATE, DEFAULT_AV_RELATIVE_CAR_REPAIR_COST, DEFAULT_AT_FAULT_PAYOUT_SPLIT);
        }
    }
}


private void basicSim(float avRelativeCrashRate, float avRelativeCarRepairCost, float payoutSplit) {
    List<Result> results = new ArrayList<>();
    for (float avPercent = 0.1f; avPercent < 1.0; avPercent += 0.1f) {
        results.add(runSimulation(avRelativeCrashRate, avRelativeCarRepairCost, avPercent, payoutSplit));
    }
    printResults(results, includeAbsoluteDollarValuesWhenPrinting);
}

private void relativeRepairCostSim() {
    println("Simulation where the AV Relative Repair Cost ranges from 100% to 200%");
    for (float avRelativeCarRepairCost = 1.0f; avRelativeCarRepairCost <= 2.01f; avRelativeCarRepairCost += 0.1){
        println(String.format("\nAV Relative Repair Cost: %.0f%%", avRelativeCarRepairCost * 100));
        basicSim(DEFAULT_AV_RELATIVE_CRASH_RATE, avRelativeCarRepairCost, DEFAULT_AT_FAULT_PAYOUT_SPLIT);
    }
}

private void relativeCrashRateSim() {
    println("Simulation where the AV Relative Crash Rate ranges from 10% to 100%");
    for (float avRelativeCrashRate = 0.10f; avRelativeCrashRate <= 1.01; avRelativeCrashRate += 0.1f){
        println(String.format("\nAV Relative Crash Rate: %.0f%%", avRelativeCrashRate * 100));
        basicSim(avRelativeCrashRate, DEFAULT_AV_RELATIVE_CAR_REPAIR_COST, DEFAULT_AT_FAULT_PAYOUT_SPLIT);
    }
}

private void atFaultPayoutSim() {
    println("Simulation where the At Fault Payout ranges from 50% to 100%");
    for (float payoutSplit = 0.5f; payoutSplit <= 1.01; payoutSplit += 0.1f) {
        println(String.format("\nAt Fault Payout Percent: %.0f%%", payoutSplit * 100));
        basicSim(DEFAULT_AV_RELATIVE_CRASH_RATE, DEFAULT_AV_RELATIVE_CAR_REPAIR_COST, payoutSplit);
    }
}

private Result runSimulation(float avRelativeCrashRate, float avRelativeCarRepairCost, float percentOfCarsThatAreAV, float payoutSplit) {
    List<Car> cars = new ArrayList<>();

    // Build the cars
    for (int x = 0; x < TOTAL_CARS; x++) {
        cars.add(buildCar(avRelativeCrashRate, avRelativeCarRepairCost, percentOfCarsThatAreAV));
    }

    // Drive the cars
    for (int x = 0; x < TOTAL_DRIVES; x++) {
        for (Car c : cars) {
            car(payoutSplit, c, cars);
        }
    }

    Map<String,Float> poolCount = new HashMap<>();
    Map<String,Float> costs = new HashMap<>();


    float globalCosts = 0;
    for (Car c : cars) {
        poolCount.put(c.poolName, poolCount.getOrDefault(c.poolName, 0.0f) + 1);
        costs.put(c.poolName, costs.getOrDefault(c.poolName, 0.0f) + c.poolCost.lifetimeRepairCosts);
        globalCosts += c.poolCost.lifetimeRepairCosts;
    }

    return new Result(percentOfCarsThatAreAV, globalCosts, costs, poolCount);
}

private Car buildCar(float avRelativeCrashRate, float avRelativeCarRepairCost, float percentOfCarsThatAreAV) {
    if (r.nextFloat() < percentOfCarsThatAreAV) {
        // Build AV
        return new Car(true, HUMAN_CRASH_RATE * avRelativeCrashRate, (int)(CAR_REPAIR_COST * avRelativeCarRepairCost), "AV", new PoolCost());
    }

    return new Car(false, HUMAN_CRASH_RATE, CAR_REPAIR_COST, "HUMAN", new PoolCost());
}

private void car(float payoutSplit, Car car, List<Car> cars) {
    if (r.nextFloat() > car.crashChance) {
        return;
    }

    Car otherCar = cars.get(r.nextInt(cars.size()));
    car.poolCost.lifetimeRepairCosts += (car.repairCost + otherCar.repairCost) * payoutSplit;
    otherCar.poolCost.lifetimeRepairCosts += (car.repairCost + otherCar.repairCost) * (1 - payoutSplit);
}

// Outputs in MarkDown Table Format
private void printResults(List<Result> results, boolean includeAbsoluteDollarValues) {
    var pools = new ArrayList<>(results.get(0).poolCosts.keySet());

    var startResult = results.get(0);

    var header = new StringBuilder("|AV Percent|Global Cost Reduction|");
    if (includeAbsoluteDollarValues){
        header.append("Global Costs|");
    }

    pools.forEach(s -> {
        header.append(s).append(" Cost Reduction|");
        if (includeAbsoluteDollarValues){
            header.append(s).append(" Cost per car|");
        }
    });

    var alignmentRow = new StringBuilder(":--|:--|");
    pools.forEach(s -> alignmentRow.append(":--|"));
    if (includeAbsoluteDollarValues){
        alignmentRow.append(":--|");
        pools.forEach(s -> alignmentRow.append(":--|"));
    }
    

    println(header.toString());
    println(alignmentRow.toString());
    

    results.forEach(result -> {
        StringBuilder line = new StringBuilder("|");

        line.append(formatPercentage(result.avPercent)).append("|");
        line.append(formatPercentage(calculateChange(result.globalCosts, startResult.globalCosts))).append("|");

        if (includeAbsoluteDollarValues){
            line.append(formatCurrency(result.globalCosts)).append("|");
        }

        for (String poolName : pools){
            var poolCost = result.poolCosts.get(poolName);
            var poolCostStart = startResult.poolCosts.get(poolName);
            var poolSize = result.poolSize.get(poolName);
            var poolSizeStart = startResult.poolSize.get(poolName);

            line.append(formatPercentage(calculateChange((poolCost / poolSize), (poolCostStart / poolSizeStart)))).append("|");
            if (includeAbsoluteDollarValues){
                line.append(formatCurrency(poolCost / poolSize)).append("|");
            }
        }
        println(line.toString());
    });
}

private float calculateChange(float current, float start) {
    return (1 - current / start);
}

private String formatCurrency(float value) {
    return String.format("$%,.0f", value);
}

// 0.05f => "5%"
private String formatPercentage(float value) {
    return String.format("%.0f%%", value * 100);
}