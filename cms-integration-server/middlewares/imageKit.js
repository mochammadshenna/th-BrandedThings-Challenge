const { imageKitApi } = require("../apis/imageKit");
const FormData = require("form-data");

const imageKit = async (req, res, next) => {
    try {
        if (req.file) {
            console.log(req.file);
            const { originalname, buffer, mimetype, size } = req.file;
            if (mimetype.includes('image') == false) throw { name: 'File Type Error', message: 'Please upload an image file.' }
            if (size > 255000) throw { name: 'File Size Error', message: 'Max file size is 255kb.' }
            let form = new FormData();
            form.append("file", Buffer.from(buffer).toString("base64"));
            form.append("fileName", originalname);
            const response = await imageKitApi(form);
            if (response) req.body.imgUrl = response.data.url;
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { imageKit };