const request = require('supertest');
const app = require('../index');

describe('Tasks API', () => {
  it('GET /tasks should return array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks should add a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: "Nueva tarea" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe("Nueva tarea");
  });
});
