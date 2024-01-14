const app = require("../app");

const {bootstrap} = require("../bootstrap/index");

const PORT = 5000;

bootstrap().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Listening PORT ${PORT}`)
    })
})