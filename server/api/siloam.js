const Router = require('express').Router();
const ValidationHelper = require('../helpers/validationHelper');
const SiloamHelper = require('../helpers/siloamHelper');
const ResponseHandler = require('../handler/errorResponse');

const listPatient = async (request, reply) => {
  try {
    const response = await SiloamHelper.getListDataPatient();
    return reply.send(response);
  } catch (err) {
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const selectedListPatient = async (request, reply) => {
  try {
    ValidationHelper.selectedPatientValidation(request.body);

    const { id } = request.body;
    const response = await SiloamHelper.getSelectedDataPatient(id);
    return reply.send(response);
  } catch (err) {
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const updatePatient = async (request, reply) => {
  try {
    ValidationHelper.updatePatientValidation(request.body);

    const { id, firstName, lastName, dateOfBirth, gender } = request.body;
    const phone = request.body.phone || '';
    const email = request.body.email || '';
    const address = request.body.address || '';
    const response = await SiloamHelper.updateDataPatient({
      id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address
    });
    return reply.send(response);
  } catch (err) {
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const addPatient = async (request, reply) => {
  try {
    ValidationHelper.addPatientValidation(request.body);

    const { firstName, lastName, dateOfBirth, gender } = request.body;
    const phone = request.body.phone || '';
    const email = request.body.email || '';
    const address = request.body.address || '';
    const response = await SiloamHelper.addDataPatient({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email,
      address
    });
    return reply.send(response);
  } catch (err) {
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

const deletePatient = async (request, reply) => {
  try {
    ValidationHelper.deletePatientValidation(request.body);

    const { id } = request.body;
    const response = await SiloamHelper.deleteDataPatient(id);
    return reply.send(response);
  } catch (err) {
    return reply.send(ResponseHandler.errorResponse(err));
  }
};

Router.get('/v1/list-patient', listPatient);
Router.post('/v1/selected-patient', selectedListPatient);
Router.post('/v1/add-patient', addPatient);
Router.put('/v1/update-patient', updatePatient);
Router.delete('/v1/delete-patient', deletePatient);

module.exports = Router;
