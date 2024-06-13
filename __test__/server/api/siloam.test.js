const _ = require('lodash');
const Request = require('supertest');
const MySQL = require('mysql2');
const SiloamPlugin = require('../../../server/api/siloam');
const TestServer = require('../index');

const MockPatients = require('../../../__fixtures__/database/patients.json');

let server;
let payload;

describe('Siloam', () => {
  beforeAll(() => {
    server = TestServer.createTestServer('/api/siloam', SiloamPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  /*
   * EXPERIMENT
   */
  describe('Get List Patient', () => {
    test('it should return status response 200: Get all list patient', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (query === 'SELECT * FROM patients;') {
              resolve([MockPatients]);
            }
          })
      );

      await Request(server)
        .get('/api/siloam/v1/list-patient')
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
        });
    });

    test('it should return status response 500: Something went wrong with database', async () => {
      MySQL.executeMock.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Something went wrong'));
          })
      );

      await Request(server).get('/api/siloam/v1/list-patient').expect(500);
    });
  });

  describe('Get Selected Patient', () => {
    beforeEach(() => {
      payload = {
        id: 'ABC123'
      };
    });
    test('it should return status response 200: Get selected patient', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (query === 'SELECT * FROM patients WHERE id_patient = ?;') {
              resolve([MockPatients]);
            }
          })
      );

      await Request(server)
        .post('/api/siloam/v1/selected-patient')
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
        });
    });

    test('it should return status response 400: Missing Payload', async () => {
      await Request(server).post('/api/siloam/v1/selected-patient').expect(400);
    });

    test('it should return status response 404: Data patient not found', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (query === 'SELECT * FROM patients WHERE id_patient = ?;') {
              resolve([]);
            }
          })
      );

      await Request(server)
        .post('/api/siloam/v1/selected-patient')
        .send(payload)
        .expect(404)
        .then((res) => {
          expect(res.body.data.message).toEqual('DATA_NOT_FOUND');
        });
    });

    test('it should return status response 500: Something went wrong with database', async () => {
      MySQL.executeMock.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Something went wrong'));
          })
      );

      await Request(server).post('/api/siloam/v1/selected-patient').send(payload).expect(500);
    });
  });

  describe('Add Patient', () => {
    beforeEach(() => {
      payload = {
        firstName: 'Tester',
        lastName: 'Testing',
        dateOfBirth: '1983-05-11',
        gender: 'MALE',
        phone: '081209876543',
        email: 'tester@tester.com',
        address: 'Jakarta'
      };
    });

    test('it should return status response 200: Successfully update data patient', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (
              query ===
              'INSERT INTO patients (id_patient, first_name, last_name, date_of_birth, gender, phone, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
            ) {
              resolve('Success');
            }
          })
      );

      await Request(server)
        .post('/api/siloam/v1/add-patient')
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
        });
    });

    test('it should return status response 400: Missing Payload', async () => {
      await Request(server).post('/api/siloam/v1/add-patient').expect(400);
    });

    test('it should return status response 500: Something went wrong with database', async () => {
      MySQL.executeMock.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Something went wrong'));
          })
      );

      await Request(server).post('/api/siloam/v1/add-patient').send(payload).expect(500);
    });
  });

  describe('Update Patient', () => {
    beforeEach(() => {
      payload = {
        id: 'ABC123',
        firstName: 'Tester',
        lastName: 'Testing',
        dateOfBirth: '1983-05-11',
        gender: 'MALE',
        phone: '081209876543',
        email: 'tester@tester.com',
        address: 'Jakarta'
      };
    });

    test('it should return status response 200: Successfully update data patient', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (
              query ===
              'UPDATE patients SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, phone = ?, email = ?, address = ? WHERE id_patient = ?;'
            ) {
              resolve('Success');
            }
          })
      );

      await Request(server)
        .put('/api/siloam/v1/update-patient')
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
        });
    });

    test('it should return status response 400: Missing Payload', async () => {
      await Request(server).put('/api/siloam/v1/update-patient').expect(400);
    });

    test('it should return status response 500: Something went wrong with database', async () => {
      MySQL.executeMock.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Something went wrong'));
          })
      );

      await Request(server).put('/api/siloam/v1/update-patient').send(payload).expect(500);
    });
  });

  describe('Delete Patient', () => {
    beforeEach(() => {
      payload = {
        id: 'ABC123'
      };
    });

    test('it should return status response 200: Successfully delete data patient', async () => {
      MySQL.executeMock.mockImplementation(
        (query) =>
          new Promise((resolve) => {
            if (query === 'DELETE FROM patients WHERE id_patient = ?;') {
              resolve('Success');
            }
          })
      );

      await Request(server)
        .delete('/api/siloam/v1/delete-patient')
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body.data)).toBeTruthy();
        });
    });

    test('it should return status response 400: Missing payload', async () => {
      await Request(server).delete('/api/siloam/v1/delete-patient').expect(400);
    });

    test('it should return status response 500: Something went wrong with database', async () => {
      MySQL.executeMock.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Something went wrong'));
          })
      );

      await Request(server).delete('/api/siloam/v1/delete-patient').send(payload).expect(500);
    });
  });
});
