const Joi = require('joi');
const Boom = require('@hapi/boom');

const selectedPatientValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addPatientValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().required().valid('MALE', 'FEMALE'),
    phone: Joi.string()
      .optional()
      .allow('')
      .pattern(/^(08)\d{8,12}$/),
    email: Joi.string().email().optional().allow(''),
    address: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updatePatientValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().required().valid('MALE', 'FEMALE'),
    phone: Joi.string()
      .optional()
      .allow('')
      .pattern(/^(08)\d{8,12}$/),
    email: Joi.string().email().optional().allow(''),
    address: Joi.string().optional().allow('')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const deletePatientValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  selectedPatientValidation,
  addPatientValidation,
  updatePatientValidation,
  deletePatientValidation
};
