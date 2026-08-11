## Instrutions to run the project
- Running the project:
``` 
cd client
```

```
npm run dev
```

- Client URL 
```
http://localhost:5173/
```
- Server URL
```
http://localhost:3000/
```

## Making API Request
- To make API request, go to the file `API_TEST`
- Change the payload to the desired payload
```json
{
    "name": "Test ",
    "email": "test1@example.com",
    "password": "password1234"
}
```
- click on `send request` button at the top of request 

## Changes made on mongodb
- Go to mongoatlas at https://cloud.mongodb.com/v2#/org/69cff87fcfb52ba1b40dec9f/projects
- Choose the project `Project 0` -> `Browse Collections` -> Choose database `Selection`

## Testing
All test commands are run from the `client` folder.

### Unit tests (Vitest + React Testing Library)
```
npm test
```

### E2E tests (Cypress)
- Start the dev server first (`npm run dev`), then in a second terminal:
```
npm run cypress:open   # interactive, pick a browser and run portfolio.cy.js
npm run cypress:run    # headless, saves a video to cypress/videos
```
- First time only: `npx cypress install` to download the Cypress browser binary.

## Deployment
The app ships as a single web service: Express serves the built React app as static files, with an API on `/api` and `/auth`.

- Build command:
```
npm run build
```
- Start command:
```
npm start
```
- Environment variables to set on the host: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`. `PORT` is provided by the host automatically.