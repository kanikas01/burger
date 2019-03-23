var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

// Get all burgers from DB and display them
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// Add burger to DB
router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
    res.status(200).end();
  });
});

// Update devoured state for a burger
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// Delete burger from DB
router.delete("/api/burgers/:id", function(req, res) {
  var id = req.params.id;
  burger.deleteOne(id, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
    }
  );
});

// Export routes for server.js to use.
module.exports = router;