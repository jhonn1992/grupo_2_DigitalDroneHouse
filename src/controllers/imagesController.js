/* import { Request, Response } from "express" */
const path = require("path");
const fs = require("fs");
const imageController = {
     async getImage(req, res) {
        const type = req.params.type;
        const image = req.params.image
        pathImage = path.resolve(__dirname, `../../public/img/products/${image}`);
        if (await fs.existsSync(pathImage)) {
            res.sendFile(pathImage)
        } else {
            res.json({error: "No se encuentra la imagen solicitada", status: 404});
        }

    }
}

module.exports = imageController