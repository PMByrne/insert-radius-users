# Simple tool to insert users with salted SHA2-256 password into a postgres DB configured to work with Freeradius

## Config

- Run `npm i` to get the `pg-promise` dependency
- Create a users.json file in the root of the project and add your users to it as an array (of object, of strings, whatever you want)
- Modify the `getUsername` and `getPassword` functions to extract the correct info for a simple user in the users.json array
- Use the available environment variables to customize the postgres connection string

## Run it
Just `node index.js` from the root of the project