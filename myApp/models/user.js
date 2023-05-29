const pool = require('../database');

class User {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(data) {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);
    return result.rows[0];
  }

  async update(id, data) {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount;
  }
}

module.exports = new User();
