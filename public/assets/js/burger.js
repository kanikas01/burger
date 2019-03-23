// Wait until DOM is loaded to attach handlers
$(function() {
  // Add new burger
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
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  // Devour burger
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
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Delete burger
  $(".delete").on("click", function(event) {
    var id = $(this).data("id");
    var deletedBurger = {
      id: id
    };
  
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
