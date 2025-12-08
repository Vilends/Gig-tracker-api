# Gig Tracker API, using Express as a framework + MongoDB for DB

This is a basic CRUD API for tracking freelance gigs as I am a photographer and this would be highly helpful in a workflow.

This APIs are built with Express and MongoDB using Mongoose, and dotenv for environment variables and lastly morgan for HTTP request logging which turned out to be more helpful than i thought.

Each gig stores:

1. `clientName` – name of the client
2. `title` – what the gig is
3. `budget` – amount for the gig 
4. `status` – one of `pending`, `in-progress`, `completed`, `cancelled` (defaults to `pending`)
5. `isPaid` – whether the gig has been paid for
6. `dueDate` – when the gig is due
7. `notes` – any extra details

---

## Folder Structure & Thought process
This folder structure is very basic and is easy to implement for tracking gigs.
src/
  app.js          - Main Express app: connects DB, sets middleware, mounts routes
  db.js           - Database connection using Mongoose and MONGO_URI from .env
  models/
    Gig.js        - Gig schema/model definition
  routes/
    gigRoutes.js  - All /api/gigs CRUD routes

.env               - This is for the local environment variables (this is to be ignored by git)
.env.example       - Sample env file
.gitignore         - Prevents node_modules and .env from being tracked
package.json       - Dependencies and npm scripts
README.md          - Project documentation
# Gig-tracker-api
