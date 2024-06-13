const _ = require('lodash');
const Boom = require('@hapi/boom');
const Moment = require('moment');
const DatabaseService = require('../database/siloamDatabase');

/*
 *  PUBLIC FUNCTION
 */
const getListDataPatient = async () => {
  try {
    const query = 'SELECT * FROM patients;';
    const result = await DatabaseService.executeQueryDatabase({ query });
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getSelectedDataPatient = async (id) => {
  try {
    const query = 'SELECT * FROM patients WHERE id_patient = ?;';
    const data = [id];
    const result = await DatabaseService.executeQueryDatabase({ query, data });
    if (_.isEmpty(result)) return Promise.reject(Boom.notFound('DATA_NOT_FOUND'));
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

const addDataPatient = async (dataObject) => {
  const { firstName, lastName, dateOfBirth, gender, phone, email, address } = dataObject;
  try {
    const id = `SIL${Moment().format('YYMMDDHHmmss')}`;
    const query =
      'INSERT INTO patients (id_patient, first_name, last_name, date_of_birth, gender, phone, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    const data = [id, firstName, lastName, dateOfBirth, gender, phone, email, address];

    await DatabaseService.executeQueryDatabase({ query, data, isUpdateData: true });

    return Promise.resolve('Success');
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateDataPatient = async (dataObject) => {
  const { id, firstName, lastName, dateOfBirth, gender, phone, email, address } = dataObject;
  try {
    const query =
      'UPDATE patients SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, phone = ?, email = ?, address = ? WHERE id_patient = ?;';
    const data = [firstName, lastName, dateOfBirth, gender, phone, email, address, id];
    await DatabaseService.executeQueryDatabase({ query, data, isUpdateData: true });

    return Promise.resolve('Success');
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteDataPatient = async (id) => {
  try {
    const query = 'DELETE FROM patients WHERE id_patient = ?;';
    const data = [id];
    await DatabaseService.executeQueryDatabase({ query, data, isUpdateData: true });

    return Promise.resolve('Success');
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getListDataPatient,
  getSelectedDataPatient,
  addDataPatient,
  updateDataPatient,
  deleteDataPatient
};
