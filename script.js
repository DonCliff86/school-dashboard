// Data storage (simulate backend with localStorage)
    function getUsers() {
      return JSON.parse(localStorage.getItem('schoolUsers') || '[]');
    }
    function setUsers(users) {
      localStorage.setItem('schoolUsers', JSON.stringify(users));
    }
    function getReports() {
      return JSON.parse(localStorage.getItem('schoolReports') || '[]');
    }
    function setReports(reports) {
      localStorage.setItem('schoolReports', JSON.stringify(reports));
    }

    // Sidebar navigation
    document.querySelectorAll('nav a[data-section]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        const section = link.getAttribute('data-section');
        document.querySelectorAll('.dashboard-section').forEach(sec => {
          sec.classList.remove('active');
          if (sec.id === section) sec.classList.add('active');
        });
        // For keyboard accessibility, focus the first input in the section
        setTimeout(() => {
          const input = document.querySelector(`#${section} input, #${section} select`);
          if (input) input.focus();
        }, 100);
      });
    });

    // Registration handling
    const registrationForm = document.getElementById('registrationForm');
    const usersTable = document.getElementById('usersTable').querySelector('tbody');

    function renderUsers() {
      const users = getUsers();
      usersTable.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}</td>
          <td>${user.email}</td>
          <td>${new Date(user.registeredAt).toLocaleString()}</td>
        `;
        usersTable.appendChild(tr);
      });
    }
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = registrationForm.name.value.trim();
      const userType = registrationForm.userType.value;
      const email = registrationForm.email.value.trim().toLowerCase();
      if (!name || !userType || !email) return;
      let users = getUsers();
      if (users.find(u => u.email === email)) {
        alert('User with this
