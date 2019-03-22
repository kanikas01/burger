$(function() {
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
  
    var newBurger = {
      burger_name: $("#burger_name").val().trim()
    };
    if (!newBurger.burger_name) {
      alert("Burger name cannot be blank.");
      return;
    }
  
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    var isDevoured = $(this).data("devoured");
  
    var newDevouredState = {
      devoured: isDevoured
    };
  
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", isDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete").on("click", function(event) {
    var id = $(this).data("id");
    var deletedBurger = {
      id: id
    };
  
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
      data: deletedBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
