const axios = require("axios");
const baseURL = "http://localhost:8080/fhir";

//axios.get(`${baseURL}/Patient`);
axios
    .get(`${baseURL}/Patient/2`, {})
    .then((res) => {
        console.log(res.data);
        //console.log(res.data.total);
    })
    .catch((error) => {
        console.error(error);
    });
