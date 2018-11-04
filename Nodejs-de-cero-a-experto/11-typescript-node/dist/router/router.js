"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    resp.json({
        ok: true,
        messaeg: 'Todo bien',
        id
    });
});
exports.default = router;
