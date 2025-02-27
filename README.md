# store_manager

A web app that helps store owners manage sales and product inventory records

To run this project locally:

1. Install all packages in the root directory (use --legacy-peer-deps flag if you get a conflicting peer dependency error).
2. Install all packages in the root frontend folder.
3. Install all packages in the root backend folder.
4. Create a .env file in the root of the backend folder and create PORT and ACCESS_TOKEN_SECRET variables.
5. Set the PORT to your port number and ACCESS_TOKEN_SECRET to your secret (use the node crypto function to generate a random bytes string).
6. Change directory to the backend folder and run "npm run dev" to start the server.
7. Navigate to login.html file and use live server to start the client in vscode.
8. Navigate to the usersDb.js file for the usernames of the users.
9. Change all `http://localhost:4000` in the frontend scripts to your localhost url accordingly.
10. The password of each user is in the format: `username@role` eg johndoe's password is: `johndoe@admin`.
11. Run "npm test" to run the test.
