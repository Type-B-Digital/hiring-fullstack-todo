### Tech Stack

- React
- Redux Toolkit with RTK Query
- Tailwind CSS
- React Hook Form + Zod for form validation
- Framer Motion for animations and transitions

### Getting Started

1. Navigate to the frontend directory:
   cd client
2. Install dependencies:
   npm install
3. Run the development server:
   npm run dev
4. Open http://localhost:5173 in your browser.

How to Use

- Add a TODO:
  Enter a title (required) and optional description in the inputs at the top, then click Add. The form validates the title.

- Mark as Done:
  Click the checkbox next to a TODO to toggle its completion status.

- Edit a TODO:
  Click the Edit button on a TODO to open a popup modal. Update the title (required) and description, then save or cancel.

- Delete a TODO:
  Click the Delete button on a TODO to remove it from the list.

- User Experience:
  The app provides loading states, validation errors, and smooth animations for a polished feel.
