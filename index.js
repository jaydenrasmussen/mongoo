'use strict';
const mongoose = require('mongoose');
const fs = require('fs');

class Mongoo {
    constructor(options) {
        // use the default regular ES6 Promise library
        mongoose.Promise = global.Promise;

        this.user = process.env.MONGODB_USER || '';
        this.pass = process.env.MONGODB_PASS || '';
        this.replicaSet = process.env.MONGODB_REPLICASET || '';
        this.database = process.env.MONGODB_DATABASE || '';
        this.host = process.env.MONGODB_HOST || '';
        this.status = 'closed';
    }
    init(options) {
        this.user = optsions.user || this.user;
        this.pass = optsions.pass || this.pass;
        this.replicaSet = optsions.replicaSet || this.replicaSet;
        this.database = optsions.database || this.database;
        this.host = optsions.host || this.host;
    }
    async open() {
        // if we have a replicaSet in the environment, connect with it
        if (this.replicaSet) {
            this.client = await mongoose
                .connect(
                    `mongodb://${encodeURIComponent(
                        this.user
                    )}:${encodeURIComponent(this.pass)}@${this.host}/${
                        this.database
                    }?replicaSet=${this.replicaSet}`
                )
                .catch(console.log);
            this.status = 'open';
        } else {
            this.client = await mongoose
                .connect(
                    `mongodb://${encodeURIComponent(
                        this.user
                    )}:${encodeURIComponent(this.pass)}@${this.host}/${
                        this.database
                    }`
                )
                .catch(console.log);
            this.status = 'open';
        }
    }
    async close() {
        if (this.client) await this.client.close();
    }
    getSchemas() {
        if (fs.existsSync(`${__dirname}/schemas`)) {
            let initializedSchemas = {};
            let dir = fs.readdirSync(`${__dirname}/schemas`);
            let schemas = dir.map(e => {
                let schema = e.split('.');
                return { name: schema[1], file: e };
            });
            schemas.map(
                schema =>
                    (initializedSchemas[schema.name] = mongoose.model(
                        require(`${__dirname}/schemas/${schema.file}`)
                    ))
            );
            this.schemas = initializedSchemas;
        } else return;
    }
}

module.exports = new Mongoo();
