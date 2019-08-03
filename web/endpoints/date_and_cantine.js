const connectionHandler = require("./connection_handler");
const app = connectionHandler.app;
const mealsRepository = require("../../lib/repository/meals_repository");

app.get("/meals/:day/:cantine", async (req, res) => {
    let query = {
        day: req.params.day,
        cantine: req.params.cantine
    };
    let meal = await mealsRepository.find(query);
    if(meal != null)
        return res.status(200).send(meal);
    return res.status(404).send("Meal for said day and cantine not found");
});

module.exports = {
    app: app,
    port: connectionHandler.port
};