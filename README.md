Todo List App with API Integration

This is a simple and user-friendly Todo List Web Application built using HTML, Bootstrap (CSS), and JavaScript (ES6). It connects to a dummy online API, allowing users to manage tasks just like in a real-world app—no backend setup needed.

Features

View a list of todos from an external API (GET request)

Add new tasks through a simple form (POST request)

Search tasks by name as you type

Filter tasks by selecting a date range (From and To)

Paginated task display (client-side pagination)

Mark tasks as completed (PUT request)

Handle API errors with friendly alerts

Show loading indicators during data fetches

Toggle between light and dark modes for a better viewing experience

Press Enter on any filter field to apply filters instantly

Technologies Used

  HTML5

  CSS with Bootstrap 5.3

  JavaScript (ES6)

  DummyJSON API

Folder Structure

  todo-app/
         index.html
         script.js (inline in HTML)
         README.md

How to Run This App

  Download or clone this project.

  Open the index.html file in your browser.

  That's it—no installation, no server, no hassle.

API Endpoints Used

  Get all todos: https://dummyjson.com/todos

  Add a todo: https://dummyjson.com/todos/add

  Update a todo: https://dummyjson.com/todos/:id

  Possible Future Enhancements

  Add the ability to delete tasks using the DELETE API

  Edit tasks inline without a separate form

  Save data locally using LocalStorage for offline access

  Improve responsiveness and mobile experience
