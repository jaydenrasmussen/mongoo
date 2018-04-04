# Mongoo

This module is meant to dynamically load and connect to a mongo database implementing mongoose and including any schemas from the `schema` folder.

### Methods

`init(options)` initializes the class with the config you pass in. Useful if you don't want to set environment variables for whatever reason.

```json
{
    "user": 'admin',
	"pass": 'password',
	"replicaSet": 'replica_name',
	"database": 'db_name',
	"host": 'localhost:27027'
}
```

`open [Promise]` opens a connection to the mongo database. The opened mongoose connection is stored on the `client` member and sets the status to `open`

```javascript
const db = require('mongoo');
if (db.status === 'closed') await db.open().catch(console.log);
let object = await db.client.find({ id: 1235897 });
```

`close [Promise]` closes the connection stored on the client member, if it exists.

```javascript
const db = require('mongoo');
if (db.status === 'open') await db.close().catch(console.log);
```

`getSchemas` scans the current directory for a `/schemas/` folder and adds them to the current instantiation of mongoose. Schemas should be stored as json objects with or without a .json extension

`main`

```javascript
const db = require('mongoo');
db.getSchemas();
let Dog = new db.schemas.animal({ family: 'Canidae', genus: 'Canis' });
Dog.save(err => console.log(err));
// or
db.schemas.animal.create({ family: 'Canidae', genus: 'Canis' });
```

`animal.json`

```javascript
{
    "family": String,
	"genus": String
}
```

