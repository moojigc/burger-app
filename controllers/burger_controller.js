const express = require("express"),
    router = express.Router(),
    Burger = require("../models/Burger");

router.get("/", async (req, res) => {
    try {
        let burgers = await new Burger().menu();
    
        let fresh = burgers.filter(b => !b.devoured)
        let devoured = burgers.filter(b => b.devoured)
        return res.render("index", {
            freshBurgers: fresh,
            devouredBurgers: devoured
        });
    } catch (error) {
        console.error(error)
        return res.sendStatus(404).end();
    }
});

router.get("/api/burgers", async (req, res) => {
    try {
        let burgers = await new Burger().menu()
        return res.json(burgers)
    } catch (error) {
        console.error(error)
        return res.sendStatus(404).end();
    }
});

router.post("/api/burgers", async (req, res) => {
    let myBurger = new Burger({ name: req.body.name })
    try {
        let result = await myBurger.cook();
        if (result.insertId) 
            return res.status(200).json(result.insertId).end()
        else
            return res.sendStatus(404).end()
    } catch (error) {
        console.error(error)
        return res.sendStatus(500).end();
    }
});

router.put("/api/burger/:id", async (req, res) => {
    let myBurger = new Burger({ id: req.params.id })
    let result;
    try {
        result = myBurger.dbUpdate({ devoured: req.body.devoured })

        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    } catch (error) {
        console.error(error)
        return res.sendStatus(500).end();
    }
});

router.delete("/api/burger/:id", async (req, res) => {
    let myBurger = new Burger({ id: req.params.id })
    try {
        await myBurger.dbDelete()
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    } catch (error) {
        console.error(error)
        return res.sendStatus(500).end();
    }

})

// Export routes for server.js to use.
module.exports = router;
