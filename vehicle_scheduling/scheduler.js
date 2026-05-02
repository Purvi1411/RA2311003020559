const axios = require('axios');

// Paste your active token here
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcDE4MjBAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTgxMSwiaWF0IjoxNzc3NzAwOTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMzMwZTczMjEtM2VhYi00ZDI4LTk5NzUtMmNiYTk1ZTA5OGIyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHVydmkgcGFsIiwic3ViIjoiMTcwYzQ4YzctODM0OC00MGJmLWJmNWUtM2I3ZTQyYTQyM2EwIn0sImVtYWlsIjoicHAxODIwQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoicHVydmkgcGFsIiwicm9sbE5vIjoicmEyMzExMDAzMDIwNTU5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMTcwYzQ4YzctODM0OC00MGJmLWJmNWUtM2I3ZTQyYTQyM2EwIiwiY2xpZW50U2VjcmV0Ijoic25kRWhKaEtoUlNaeHJtcSJ9.wkWQeo0a29dscJ_E09UqsRh4rt1okQbM1pPjyxTKvsg';

// Dynamic Programming: 0/1 Knapsack Algorithm
function optimizeSchedule(vehicles, budget) {
    const n = vehicles.length;
    // DP table to store max impact for a given hour capacity
    const dp = Array(budget + 1).fill(0);
    // 2D Array to track which vehicles were selected
    const selected = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(false));

    for (let i = 1; i <= n; i++) {
        const vehicle = vehicles[i - 1];
        const duration = vehicle.Duration;
        const impact = vehicle.Impact;

        for (let w = budget; w >= duration; w--) {
            if (dp[w - duration] + impact > dp[w]) {
                dp[w] = dp[w - duration] + impact;
                selected[i][w] = true;
            }
        }
    }

    // Backtrack to find exactly which TaskIDs were chosen
    let remainingBudget = budget;
    const scheduledTasks = [];

    for (let i = n; i > 0 && remainingBudget > 0; i--) {
        if (selected[i][remainingBudget]) {
            const vehicle = vehicles[i - 1];
            scheduledTasks.push(vehicle.TaskID);
            remainingBudget -= vehicle.Duration;
        }
    }

    return {
        totalImpact: dp[budget],
        timeUsed: budget - remainingBudget,
        taskCount: scheduledTasks.length,
        tasks: scheduledTasks
    };
}

async function runVehicleScheduler() {
    const headers = { 'Authorization': `Bearer ${ACCESS_TOKEN}` };

    try {
        console.log("Fetching Depots and Vehicles from API...");
        
        // Fetch both endpoints at the same time
        const [depotsRes, vehiclesRes] = await Promise.all([
            axios.get("http://20.207.122.201/evaluation-service/depots", { headers }),
            axios.get("http://20.207.122.201/evaluation-service/vehicles", { headers })
        ]);

        const depots = depotsRes.data.depots;
        const vehicles = vehiclesRes.data.vehicles;

        console.log(`Loaded ${depots.length} Depots and ${vehicles.length} Vehicles.\n`);
        console.log("=== OPTIMIZED DAILY SCHEDULE ===");

        // Calculate the best schedule for each depot
        depots.forEach(depot => {
            const budget = depot.MechanicHours;
            const result = optimizeSchedule(vehicles, budget);

            console.log(`\nDepot ID: ${depot.ID} | Budget: ${budget} Mechanic-Hours`);
            console.log(`-> Max Impact Achieved: ${result.totalImpact}`);
            console.log(`-> Hours Used: ${result.timeUsed} / ${budget}`);
            console.log(`-> Vehicles Serviced: ${result.taskCount}`);
            
            // Show a preview of the Task IDs
            const previewTasks = result.tasks.slice(0, 3).join(', ') + (result.tasks.length > 3 ? '...' : '');
            console.log(`-> Selected TaskIDs: [ ${previewTasks} ]`);
        });

    } catch (error) {
        console.error("\nAPI Error:", error.message);
        if (error.response && error.response.status === 401) {
            console.log("Error 401: Make sure your ACCESS_TOKEN is correct and hasn't expired.");
        }
    }
}

runVehicleScheduler();