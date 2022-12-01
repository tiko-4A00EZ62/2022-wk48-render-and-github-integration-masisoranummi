const electricity = require("../models/electricity");
const Joi = require("joi");

const getElectricity = async (req, res) => {
    try {
        const response = await electricity.findAll();
        if (response) {
            res.send(response);
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const getInvoiceById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await electricity.findById(id);
        if (response) {
            res.send(response);
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const createInvoice = async (req, res) => {
    const schema = Joi.object({
        used: Joi.number().precision(3).positive().required(),
        cost: Joi.number().precision(2).positive().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
        return;
    }
    const invoice = {
        used: req.body.used,
        cost: req.body.cost,
    };
    try {
        const response = await electricity.save(invoice);
        if (response) {
            invoice.id = response.insertId;
            res.status(201).send(invoice);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

const updateInvoice = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().positive().required(),
        used: Joi.number().precision(3).positive().required(),
        cost: Joi.number().precision(2).positive().required(),
        month: Joi.date().required(),
        created: Joi.date().timestamp(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
        return;
    }
    const invoice = {
        month: req.body.month,
        used: req.body.used,
        cost: req.body.cost,
        id: req.body.id,
    };
    try {
        const response = await electricity.updateById(invoice);
        if (response) {
            res.status(201).send(invoice);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

const deleteInvoice = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await electricity.findById(id);
        if (result.length === 0) {
            res.status(404).send("Not Found");
            return;
        }

        const response = await electricity.deleteById(id);
        if (response.affectedRows === 1) {
            res.status(200).send("City deleted");
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {
    getElectricity,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
