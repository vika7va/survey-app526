const tableBody = document.querySelector('#answersTable tbody');
const exportBtn = document.getElementById('exportBtn');

async function loadAnswers() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key') || '';

    const res = await fetch(`/api/answers?key=${encodeURIComponent(key)}`);
    if (res.status === 401) {
      document.body.innerHTML = '<h2>Доступ заборонено</h2>';
      return;
    }
    const data = await res.json();

    tableBody.innerHTML = '';
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(item.timestamp).toLocaleString()}</td>
        <td>${item.answers.q1 || ''}</td>
        <td>${item.answers.q2 || ''}</td>
        <td>${item.answers.q3 || ''}</td>
        <td>${item.answers.q4 || ''}</td>
        <td>${item.answers.q5 || ''}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    tableBody.innerHTML = '<tr><td colspan="6">Помилка завантаження даних</td></tr>';
  }
}

exportBtn.addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key') || '';
  window.location.href = `/api/export-csv?key=${encodeURIComponent(key)}`;
});

loadAnswers();