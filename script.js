 let todos = [];
    let filteredTodos = [];
    let currentPage = 1;
    const limit = 5;

    const showAlert = (message, type = 'danger') => {
      document.getElementById("alertContainer").innerHTML = 
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    };

    const fetchTodos = async () => {
      try {
        document.getElementById("loader").style.display = 'block';
        const res = await fetch('https://dummyjson.com/todos');
        const data = await res.json();
        todos = data.todos.map(todo => ({ ...todo, createdAt: new Date() })); // simulate createdAt
        filteredTodos = todos;
        renderTodos();
      } catch (err) {
        showAlert("Failed to load todos.");
      } finally {
        document.getElementById("loader").style.display = 'none';
      }
    };
const toggleComplete = async (id) => {
  const todo = todos.find(t => t.id === id);
  todo.completed = !todo.completed;

  try {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: todo.completed })
    });

    showAlert('Task updated.', 'success');
    renderTodos();
  } catch (err) {
    showAlert('Failed to update task.');
  }
};

    const renderTodos = () => {
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      const pageTodos = filteredTodos.slice(start, end);
      const list = document.getElementById("todoList");
      list.innerHTML = "";

      if (pageTodos.length === 0) {
        list.innerHTML = '<li class="list-group-item text-center">No tasks found.</li>';
      } else {
        pageTodos.forEach(todo => {
list.innerHTML += `
  <li class="list-group-item d-flex align-items-center">
    <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
    <span class="${todo.completed ? 'text-decoration-line-through text-muted' : ''}">${todo.todo}</span>
  </li>`;        });
      }
      renderPagination();
    };

    const renderPagination = () => {
      const pageCount = Math.ceil(filteredTodos.length / limit);
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";
      for (let i = 1; i <= pageCount; i++) {
        pagination.innerHTML += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
          </li>`;
      }
    };

    const changePage = (page) => {
      currentPage = page;
      renderTodos();
    };

    const applyFilters = () => {
      const search = document.getElementById("searchInput").value.toLowerCase();
      const from = new Date(document.getElementById("fromDate").value);
      const to = new Date(document.getElementById("toDate").value);

      filteredTodos = todos.filter(todo => {
        const taskMatch = todo.todo.toLowerCase().includes(search);
        const created = new Date(todo.createdAt);
        const dateMatch = (!isNaN(from) ? created >= from : true) && (!isNaN(to) ? created <= to : true);
        return taskMatch && dateMatch;
      });
      currentPage = 1;
      renderTodos();
    };
    ['searchInput', 'fromDate', 'toDate'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  });
});

    const addTodo = async () => {
      const input = document.getElementById("newTodo");
      const task = input.value.trim();
      if (!task) return showAlert("Task cannot be empty.");

      try {
        const res = await fetch('https://dummyjson.com/todos/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ todo: task, completed: false, userId: 1 })
        });
        const newTodo = await res.json();
        newTodo.createdAt = new Date();
        todos.unshift(newTodo);
        filteredTodos = todos;
        input.value = "";
        renderTodos();
        showAlert("Todo added successfully!", 'success');
      } catch (err) {
        showAlert("Failed to add todo.");
      }
    };

  document.getElementById("newTodo").addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  });
 document.getElementById("darkModeToggle").addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', theme);
    });
    // Initialize
    fetchTodos();