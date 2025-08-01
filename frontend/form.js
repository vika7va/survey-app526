const form = document.getElementById('surveyForm');
const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progress = document.getElementById('progress');
const message = document.getElementById('message');

let currentStep = 0;
const totalSteps = steps.length;

function showStep(n) {
  steps.forEach((step, i) => {
    step.classList.toggle('hidden', i !== n);
  });

  prevBtn.disabled = n === 0;
  nextBtn.classList.toggle('hidden', n === totalSteps - 1);
  submitBtn.classList.toggle('hidden', n !== totalSteps - 1);

  progress.textContent = `Питання ${n + 1} з ${totalSteps}`;
}

function validateStep() {
  const inputs = steps[currentStep].querySelectorAll('input');
  for (const input of inputs) {
    if (!input.checkValidity()) {
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener('click', () => {
  if (!validateStep()) {
    alert('Будь ласка, заповніть поле');
    return;
  }
  currentStep++;
  showStep(currentStep);
});

prevBtn.addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateStep()) {
    alert('Будь ласка, заповніть поле');
    return;
  }

  const formData = new FormData(form);
  const answers = {};
  for (const [key, value] of formData.entries()) {
    answers[key] = value;
  }

  try {
    const res = await fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const data = await res.json();

    if (data.success) {
      message.textContent = 'Дякуємо за вашу відповідь!';
      form.reset();
      currentStep = 0;
      showStep(currentStep);
      prevBtn.disabled = true;
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    } else {
      message.textContent = 'Сталася помилка, спробуйте ще раз.';
    }
  } catch {
    message.textContent = 'Помилка мережі, спробуйте пізніше.';
  }
});

showStep(currentStep);