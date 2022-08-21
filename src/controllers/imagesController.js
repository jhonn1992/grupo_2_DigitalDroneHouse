const path = require("path");
const fs   = require("fs");
const imageController = {
     async getImageProducts(req, res) {
        const image = req.params.image
        pathImage   = path.resolve(__dirname, `../../public/img/products/${image}`);
        if (await fs.existsSync(pathImage)) {
            res.sendFile(pathImage)
        } else {
            res.json({error: "No se encuentra la imagen solicitada", status: 404});
        }

    },
    async getImageUsers(req, res) {
        const image = req.params.image
        pathImage   = path.resolve(__dirname, `../../public/img/users/${image}`);
        if (await fs.existsSync(pathImage)) {
            res.sendFile(pathImage)
        } else {
            res.json({error: "No se encuentra la imagen solicitada", status: 404});
        }

    }
}

module.exports = imageController