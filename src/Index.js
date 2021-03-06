currentUserID = null
document.addEventListener("DOMContentLoaded", function() {
  const my_form = document.querySelector("#form");
  console.log(my_form);

  fetch("http://localhost:3000/users")
  .then(function(res){
    return res.json()
  })
  .then(function(users){
    // Populate the users list
    users.forEach(function(user){
      const my_ul = document.querySelector("#my_ul");
      my_li = document.createElement("li");
      my_ul.append(my_li);
      my_li.append(user.name)
      // Add the event listener for selecting a user
      my_li.addEventListener('click', () => {
        currentUserID = user.id
        clearPage()
        renderHomePage()
        renderNavBar()
      })
    })
  })
  // create a new user
  my_form.addEventListener("submit", function(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: my_form.username.value
        })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      const my_ul = document.querySelector("#my_ul");
      my_li = document.createElement("li");
      my_ul.append(my_li);
      my_li.append(user.name);
      my_li.addEventListener('click', () => {
        currentUserID = user.id
        clearPage()
        renderNavBar()
      })
      my_form.username.value = "";
    });
  });
})
