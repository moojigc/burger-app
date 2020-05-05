const express = require("express"),
    router = express.Router(),
    Burger = require("../models/Burger");
    
router.get("/", async (req, res) => {
    let burgers = await new Burger().menu();
    let fresh = burgers.filter(b => !b.devoured)
    let devoured = burgers.filter(b => b.devoured)

    res.render("index", {
        freshBurgers: fresh,
        devouredBurgers: devoured
    });
});

router.get("/api/burgers", async (req, res) => {
    let myBurger = new Burger();
    let data = await myBurger.menu();

    res.json(data)
});

router.post("/api/burgers", async (req, res) => {
    let myBurger = new Burger({ name: req.body.name })
    let result = await myBurger.cook()

    res.json({ id: result.insertId })
});

router.put("/api/burger/:id", async (req, res) => {
    let myBurger = new Burger({ id: req.params.id })
    let result;
    if (req.body.devoured === true) {
        result = await myBurger.devour()
    } else {
        result = await myBurger.throwUp()
    }
    console.log(myBurger);
    console.log(result);
    if (result.changedRows === 0) {
        return res.status(404).end();
    } else {
        return res.status(200).end();
    }
});

router.delete("/api/burger/:id", async (req, res) => {
    let myBurger = new Burger({ id: req.params.id })
    let result = await myBurger.dbDelete()

    if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
    } else {
        res.status(200).end();
    }
})

// Export routes for server.js to use.
module.exports = router;
