const axios = require('axios');

async function getNotifications() {
    const API_URL = "http://20.207.122.201/evaluation-service/notifications";
    
    // IMPORTANT: Paste your long token back in here!
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcDE4MjBAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDE2OSwiaWF0IjoxNzc3Njk5MjY5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjUyZWY3ZTgtY2RjOC00Mjg0LTg1YmEtNTM2N2VlOWVjOGRhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHVydmkgcGFsIiwic3ViIjoiMTcwYzQ4YzctODM0OC00MGJmLWJmNWUtM2I3ZTQyYTQyM2EwIn0sImVtYWlsIjoicHAxODIwQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoicHVydmkgcGFsIiwicm9sbE5vIjoicmEyMzExMDAzMDIwNTU5IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMTcwYzQ4YzctODM0OC00MGJmLWJmNWUtM2I3ZTQyYTQyM2EwIiwiY2xpZW50U2VjcmV0Ijoic25kRWhKaEtoUlNaeHJtcSJ9.Bnk3i93BPigF1qHZ22b-j8LInoBbX-qmUemjf5lM8O8'; 

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}` 
            }
        });
        
        // 1. Target the 'notifications' array specifically
        const notificationsArray = response.data.notifications;

        // 2. Define our weights
        const weights = { "Placement": 3, "Result": 2, "Event": 1 };

        // 3. Sort using the exact capitalized keys the API provided
        const sorted = notificationsArray.sort((a, b) => {
            const weightA = weights[a.Type] || 0; // Notice: a.Type instead of a.notificationType
            const weightB = weights[b.Type] || 0;

            // Sort by Weight first (Descending: 3, then 2, then 1)
            if (weightB !== weightA) return weightB - weightA;
            
            // If weights are the same, sort by Timestamp (Newest first)
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        console.log("--- RA2311003020559: Top 10 Priority Notifications ---");
        console.table(sorted.slice(0, 10));
        
    } catch (err) {
        console.error("Fetch Error:", err.message);
    }
}

getNotifications();