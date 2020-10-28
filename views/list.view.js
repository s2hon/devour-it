module.exports = function (props){
    const {burgers} = props;
    return /*html*/`
      <h1>Lets eat some burger!</h1>
      <ul>
        ${burgers.map(burger => {
          return /*html*/`
            <li>
              <p>
                ${burger.id}. ${burger.name}
  
                <button data-burgerid="${burger.id}" class="delete">Delete Burger!</button>
              </p>
            </li>
        `
        }).join("")}
      </ul>
  
      <h2>Lets eat more burgers!</h2>
      <form id="create" class="button-size">
        <textarea type="text" name="burger"></textarea>
        <button type="submit">Save Burger!</button>
      </form>
  
      <h2>Update Burger</h2>
      <form id="update" class="button-size">
        <select name="id">
          ${burgers.map(burger => {
            return /*html*/`
              <option value="${burger.id}">${burger.name}</option>
            `;
          }).join("")}
        </select>
        <textarea type="text" name="burger" placeholder="burger"></textarea>
        <button type="submit">Update Burger!</button>
      </form>
  
      <script type="text/javascript">
        $(".delete").on("click", function(event) {
          var id = $(this).data("burgerid");
  
          $.ajax("/api/burgers/" + id, {
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
  
          var newBurger = {
            burger: $("#create [name=burger]").val().trim()
          };
  
          // Send the POST request.
          $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
          }).then(
            function() {
              console.log("created new burger");
              location.reload();
            }
          );
        });
  
        $("#update").on("submit", function(event) {
          event.preventDefault();
          var id = $("[name=id]").val().trim();
  
          var updatedBurger = {
            burger: $("#update [name=burger]").val().trim()
          };
  
          $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: updatedBurger
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
  