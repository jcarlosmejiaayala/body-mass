'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://bodymass:bodymass@dbh35.mongolab.com:27357/bodymass',
    options: {
      server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
      replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
    }
  }
};
