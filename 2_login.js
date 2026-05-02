const axios = require('axios');

async function getToken() {
    try {
        const response = await axios.post("http://20.207.122.201/evaluation-service/auth", {
            "email": "pp1820@srmist.edu.in",
            "name": "Purvi Pal",
            "rollNo": "RA2311003020559",
            "accessCode": "QkbpxH",
            "clientID": "170c48c7-8348-40bf-bf5e-3b7e42a423a0",
            "clientSecret": "sndEhJhKhRSZxrmq"
        });
        
        console.log("YOUR ACCESS TOKEN IS:");
        console.log(response.data.access_token);
        
    } catch (error) {
        console.error("Auth Failed:", error.response ? error.response.data : error.message);
    }
}

getToken();