const connectionHandler = require("./endpoints/date_and_cantine");
const app = connectionHandler.app;
const PORT = connectionHandler.port;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


    