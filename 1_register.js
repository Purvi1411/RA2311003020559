const axios = require('axios');

async function register() {
    try {
        const response = await axios.post("http://20.207.122.201/evaluation-service/register", {
            "email": "pp1820@srmist.edu.in",
            "name": "Purvi Pal",
            "mobileNo": "8075830794",
            "githubUsername": "Purvi1411", 
            "rollNo": "RA2311003020559",
            "accessCode": "QkbpxH" // Do NOT use "xgAsNC"
        });
        
        console.log("SUCCESS! Save these details:");
        console.log(response.data); 
        // It will print your clientID and clientSecret. Copy them!
        
    } catch (error) {
        console.error("Registration Failed:", error.response ? error.response.data : error.message);
    }
}

register();