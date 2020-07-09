
    module.exports = {
        schema:{
            items: {
                properties: { 
                    id: {type: "number"},
                    first_name: {type: "string"},
                    last_name: {type: "string"},
                    email: {type:"string"},
                    ip_address: {type:"string"},
                    latitude: {type:"number"},
                    longitude: {type:"number"},
                    city:{type: "string"}
                }
            },
            //Unique items will verify there are no duplicates in the response.
            uniqueItems: true,
            required: ["id", "first_name","last_name","email", "ip_address", "latitude", "longitude", "city"]
        }
    }