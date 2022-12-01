const express = require("express");
const {
    getElectricity,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} = require("../controllers/electricity");

const router = express.Router();

router.get("/", getElectricity);
router.get("/:id", getInvoiceById);
router.post("/", createInvoice);
router.put("/", updateInvoice);
router.delete("/:id", deleteInvoice);

module.exports = router;
