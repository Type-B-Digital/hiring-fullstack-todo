### Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Class-based services and controllers architecture

### Getting Started

1. Navigate to the backend directory:
   cd server
2. Install dependencies:
   npm install
3. Create a .env file with the following variables:
   PORT=8000
   MONGODB_URI=mongodb+srv://test:test@cluster0.aioene4.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0
   - I added those in config file for run this without .env file
4. Run the development server:
   npm run dev

## API Endpoints

Method Endpoint Description
GET /api/todos Get all TODO items
POST /api/todos Create a new TODO
PUT /api/todos/:id Update a TODO
PATCH /api/todos/:id/done Toggle TODO done status
DELETE /api/todos/:id Delete a TODO

## Features

- Full CRUD functionality for TODO items

- Title required, description optional

- Optimistic UI updates with RTK Query (frontend)

- Client-side form validation with user-friendly messages (frontend)

- Animated transitions on modal open/close and list updates (frontend)

- Clean, maintainable code using class-based services and controllers

- Proper HTTP status codes and error handling in API

## Assumptions & Limitations

- No user authentication or multi-user support

- MongoDB must be available either locally or via Atlas

- Frontend assumes backend API is running on localhost:8000

- Title is mandatory for TODO creation and editing
