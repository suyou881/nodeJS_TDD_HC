const app = require('../index');
const syncDB = require('./sync-db');
syncDB().then(()=>{
    console.log('Sync database!');
    app.listen(5050,()=>{
        console.log('Server is running on 5050 port!');
    });
    
});

