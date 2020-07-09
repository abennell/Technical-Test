
    module.exports = {

        //Schema with the key/value 'city' included
        fullSchema:{
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
                },
                //Unique items will verify there are no duplicates in the response.
                uniqueItems: true,
                required: ["id", "first_name","last_name","email", "ip_address", "latitude", "longitude", "city"]
            },
        },

        //Schema without the key/value 'city'
        partialSchema:{
            items: {
                properties: { 
                    id: {type: "number"},
                    first_name: {type: "string"},
                    last_name: {type: "string"},
                    email: {type:"string"},
                    ip_address: {type:"string"},
                    latitude: {type:"number"},
                    longitude: {type:"number"},
                },
                //Unique items will verify there are no duplicates in the response.
                uniqueItems: true,
                required: ["id", "first_name","last_name","email", "ip_address", "latitude", "longitude"]
            },
        }
    }