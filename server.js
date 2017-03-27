const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'postgres://zchnevkljossds:3d31d8e87ff40a8f1ae4ef76d24893a6b7de7f2584d7c5994b67c39b7db665db@ec2-54-225-67-3.compute-1.amazonaws.com:5432/d4u4oil2mtd4f6';
router.get('/api/v1/todos', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      alert('hi');
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select id,firstname,lastname from salesforce2.contact;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
