/*
I assume preliminary knowledge of the Express framework and the Websockets package.

Here, I comment on simple code that dynamically connects the frontend and backend.

/*
=========================
FRONTEND
=========================
*/

//go into Javascript
<script type = "text/javascript">
//initialize server
var socket = io("http://localhost:3000");

//Intitator of everything. When user submits, this emits a socket event that the backend will catch.
//Use old Javascript methods for frontend for backwards compatibility
//Any class or ID can be substituted for the designated markup
$(".class").submit(function() {
  socket.emit("event");
  return false;
});

//This is a socket listener for an event emitted by the backend. It will change the html of the frontend as a response
socket.on("new event", function(data) {
  $(".class").html(data);
});
</script>

/*
=========================
BACKEND
=========================
*/

//Render home page
app.get("/", (req, res) => {
  res.render("index.html", {});
});

//Set up connection listener, which can hear connections (page hits)
io.on("connection", client => {

  //Initialize the data by emitting to client.
  client.emit("new event", data);

  //Listen for socket emits from above of "event" type
  client.on("event", () => {
    //Once we have heard the socket emit, we send a "new event" request to the frontend to change their HTML.
    io.emit("new event", data);
  });
});

//server is listening at designated port
server.listen(3000);
