const axios = require("axios");

let privateKey = `${process.env.YOUR_PRIVATE_API_KEY}:`;
let buffedPrivateKey = Buffer.from(privateKey).toString("base64");

const imagekitInstance = axios.create({
    baseURL: "https://upload.imagekit.io/api/v1/",
    headers: { Authorization: "Basic " + buffedPrivateKey },
});

const imageKitApi = (form) => {
    return imagekitInstance({
        method: "post",
        url: "files/upload",
        data: form,
        headers: {
            ...form.getHeaders(),
        },
    });
};

module.exports = { imageKitApi };
