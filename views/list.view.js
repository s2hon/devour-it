module.exports = function (props){
    const {drinks} = props;
    return /*html*/`
      <h1>Lets get f@$%&* UP!</h1>
      <ul>
        ${drinks.map(drink => {
          return /*html*/`
            <li>
              <p>
                ${drink.id}. ${drink.name}
  
                <button data-drinkid="${drink.id}" class="delete">it's empty</button>
              </p>
            </li>
        `
        }).join("")}
      </ul>
  
      <h2>Lets drink more!</h2>
      <form id="create" class="button-size">
        <textarea type="text" name="drink"></textarea>
        <button type="submit">Save Drink!</button>
      </form>
  
      <h2>Update Drink</h2>
      <form id="update" class="button-size">
        <select name="id">
          ${drinks.map(drink => {
            return /*html*/`
              <option value="${drink.id}">${drink.name}</option>
            `;
          }).join("")}
        </select>
        <textarea type="text" name="drink" placeholder="drink"></textarea>
        <button type="submit">Update drink!</button>
      </form>
  
      <script type="text/javascript">
        $(".delete").on("click", function(event) {
          var id = $(this).data("drinkid");
  
          $.ajax("/api/drinks/" + id, {
            type: "DELETE"
          }).then(
            function() {
              console.log("deleted id ", id);
              location.reload();
            }
          );
        });
  
        $("#create").on("submit", function(event) {
          event.preventDefault();
  
          var newDrink = {
            burger: $("#create [name=drinks]").val().trim()
          };
  
          // Send the POST request.
          $.ajax("/api/drinks", {
            type: "POST",
            data: newDrink
          }).then(
            function() {
              console.log("added new drink");
              location.reload();
            }
          );
        });
  
        $("#update").on("submit", function(event) {
          event.preventDefault();
          var id = $("[name=id]").val().trim();
  
          var updatedDrink = {
            drink: $("#update [name=drink]").val().trim()
          };
  
          $.ajax("/api/drinks/" + id, {
            type: "PUT",
            data: updatedDrink
          }).then(
            function() {
              console.log("updated id ", id);
              location.reload();
            }
          );
        });
      </script>
  `
  }
  