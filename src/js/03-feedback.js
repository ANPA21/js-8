import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[name=email]'),
  textarea: document.querySelector('.feedback-form textarea[name=message]'),
};
let formData = {};
const FORM_STATE = 'feedback-form-state';

onPageLoad();

refs.form.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(FORM_STATE, JSON.stringify(formData));
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  if (refs.textarea.value === '' || refs.email.value === '') {
    return alert('Все поля должны быть заполнены');
  }
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(FORM_STATE);
  formData = {};
}

function onPageLoad() {
  const savedData = localStorage.getItem(FORM_STATE);

  if (savedData) {
    formData = JSON.parse(savedData);

    if (formData.message !== undefined) {
      refs.textarea.value = formData.message;
    }

    if (formData.email !== undefined) {
      refs.email.value = formData.email;
    }
  }
}
