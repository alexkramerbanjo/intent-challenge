# Alex's Intent Challenge

I built this to the specifications I recieved from Intent's code challenge. It's a bit quirky
in how it stores shopping cart data as text, but works fine and passes test specs. Ordinarily,
I'd have opted to have data stored in individual columns and sent back and forth with json.

# Setup

The frontend of this project is just HTML/CSS/JS, so no front end compiling is necessary.
The backend is written for Node.js and uses the express framework, postgres, and an ORM called Sequelize.

You'll need to install Node and postgres. Before running the project, make sure postgres is running, and then run the bash commands "createdb intent" & "createdb intent-test" to create the necessary databases locally. Then you can run 'npm install', 'npm test' and 'npm start'. You can see the front end by going to https://localhost:8080/.
