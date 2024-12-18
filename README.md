# store_manager

A web app that helps store owners manage sales and product inventory records

To run this project locally:

1. Install all packages in the root directory (use --legacy-peers flag if you get a conflicting peer dependency error)
2. Install all packages in the root frontend folder
3. Install all packages in the root backend folder
4. Create a .env file in the root of the backend folder and create PORT and ACCESS_TOKEN_SECRET variables.
5. Set the PORT to your port number and ACCESS_TOKEN_SECRET to your secret (use the node crypto function to generate a random bytes string).
6. Change directory to the backend folder and run "npm run dev".
7. Check the database in the userDb.js file for the usernames and login. The password for each user is: username@role. For example, John Doe's password is johndoe@admin.
