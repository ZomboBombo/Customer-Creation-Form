<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <fieldset class="registration-form__data-field data-fieldset">
      <legend class="data-fieldset__heading">Личные данные</legend>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="surname">Фамилия:</label>
          <input type="text" name="client-surname"
                id="surname"
                :class="{invalid: ($v.surname.$dirty && !$v.surname.required)}"
                v-model.trim="$v.surname.$model"
                placeholder="Иванов">

          <span v-if="$v.surname.$dirty && !$v.surname.required">Необходимо ввести Фамилию!</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="name">Имя:</label>
          <input type="text" name="client-name"
                id="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                v-model.trim="$v.name.$model"
                placeholder="Иван">

          <span v-if="$v.name.$dirty && !$v.name.required">Необходимо ввести Имя!</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="patronymic">Отчество:</label>
          <input type="text" name="client-patronymic" id="patronymic" placeholder="Иванович">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="birthday">Дата рождения:</label>
          <input type="date" name="client-birthday"
                id="birthday"
                :class="{invalid: ($v.birthday.$dirty && !$v.birthday.required)}"
                v-model.trim="$v.birthday.$model">

          <span v-if="$v.birthday.$dirty && !$v.birthday.required">Укажите, пожалуйста, дату рождения.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="phone">Номер телефона:</label>
          <input type="tel" name="client-phone"
                id="phone"
                :class="{invalid: ($v.phone.$dirty && !$v.phone.required || $v.phone.$dirty && !$v.phone.validFormat)}"
                v-model.trim="$v.phone.$model"
                placeholder="7 ХХХ ХХХ ХХ ХХ"
                maxlength="11">

          <span v-if="$v.phone.$dirty && !$v.phone.validFormat">Введённое значение не соответсвует паттерну ввода!</span>
        </li>
        <li class="list-of-data__item">
          <div>
            <span>Пол:</span>

            <label class="list-of-data__label" for="female">Ж</label>
            <input type="radio" name="client-sex" id="female" checked>

            <label class="list-of-data__label" for="male">М</label>
            <input type="radio" name="client-sex" id="male">
          </div>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="category">Группа клиентов:</label>
          <select name="client-category"
                  id="category"
                  :class="{invalid: ($v.сategories.$dirty && !$v.сategories.required)}"
                  v-model="$v.сategories.$model" multiple>

            <option v-for="option in options" :value="option">{{ option }}</option>
          </select>

          <span v-if="$v.сategories.$dirty && !$v.сategories.required">Пожалуйста, выберите категорию.</span>

          <ol>
            <li v-for="option in сategories">{{ option }}</li>
          </ol>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="doctor">Лечащий врач:</label>
          <select name="attending-doctor"
                  id="doctor"
                  v-model="$v.availableDoctors.$model">

            <option v-for="doctor in availableDoctors" :value="doctor">{{ doctor }}</option>
          </select>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="message">Не отправлять СМС</label>
          <input type="checkbox" name="client-message" id="message">
        </li>
      </ul>
    </fieldset>
    
    <fieldset class="registration-form__data-field data-fieldset">
      <legend class="data-fieldset__heading">Адрес</legend>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="postcode">Индекс:</label>
          <input type="number" name="client-postcode" id="postcode">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="country">Страна:</label>
          <input type="text" name="client-country" id="country">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="region">Область:</label>
          <input type="text" name="client-region" id="region">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="city">Город:</label>
          <input type="text" name="client-city"
                id="city"
                :class="{invalid: ($v.city.$dirty && !$v.city.required)}"
                v-model.trim="$v.city.$model">

          <span v-if="$v.city.$dirty && !$v.city.required">Укажите, пожалуйста, город, в котором проживаете.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="street">Улица:</label>
          <input type="text" name="client-street" id="street">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="housenumber">Дом:</label>
          <input type="number" name="client-housenumber" id="housenumber">
        </li>
      </ul>
    </fieldset>

    <fieldset class="registration-form__data-field data-fieldset">
      <legend class="data-fieldset__heading">Паспорт</legend>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="document">Тип документа:</label>
          <select name="client-document"
                  id="document"
                  :class="{invalid: ($v.document.$dirty && !$v.document.required)}"
                  v-model="$v.document.$model">
            <option>Паспорт</option>
            <option>Свидетельство о рождении</option>
            <option>Водительское удостоверение</option>
          </select>

          <span v-if="$v.document.$dirty && !$v.document.required">Выберите тип документа для регистрации.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="passportSeries">Серия:</label>
          <input type="number" name="client-passport" id="passportSeries">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="passportNumber">Номер:</label>
          <input type="number" name="client-passport" id="passportNumber">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="placeOfIssue">Кем выдан:</label>
          <input type="text" name="client-passport" id="placeOfIssue">  
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="dateOfIssue">Дата выдачи:</label>
          <input type="date" name="client-passport"
                id="dateOfIssue"
                :class="{invalid: ($v.dateOfIssue.$dirty && !$v.dateOfIssue.required)}"
                v-model="$v.dateOfIssue.$model">

          <span v-if="$v.dateOfIssue.$dirty && !$v.dateOfIssue.required">Необходимо указать дату выдачи документа.</span>
        </li>
      </ul>
    </fieldset>

    <button type="submit">Зарегистрироваться</button>

    <div class="modal-form">
      <p class="">ФОРМА ПРОШЛА ВАЛИДАЦИЮ!</p>
      <p class="">Клиент успешно зарегистрирован!</p>
    </div>
  </form>
</template>


<script>
  const { required, minLength, maxLength } = require('../../node_modules/vuelidate/lib/validators');

  module.exports = {
    data() {
      return {
        surname: '',
        name: '',
        birthday: null,
        phone: null,
        сategories: [],
        options: [
          'VIP',
          'Проблемные',
          'ОМС'
        ],
        availableDoctors: [
          'Иванов',
          'Захаров',
          'Чернышева'
        ],
        city: '',
        document: null,
        dateOfIssue: null
      }
    },
    validations: {
      surname: {
        required
      },
      name: {
        required
      },
      birthday: { 
        required
      },
      phone: { 
        required,
        validFormat: enteredVal => /^7[\d]+$/.test(enteredVal)
      },
      сategories: { 
        required
      },
      availableDoctors: {},
      city: { 
        required
      },
      document: { 
        required
      },
      dateOfIssue: { 
        required
      }
    },
    methods: {
      onSubmit () {
        var form = document.querySelector('.registration-form');
        form.action = 'https://echo.htmlacademy.ru'; // --- Server address
        form.method = 'POST'; // --- Send method (POST — means that the data will be sent in a "closed way")

        /*

          Validation condition
          ---
          If the Form fails validation,
          submission will not occur.

        */
        if (this.$v.$invalid) {
          this.$v.$touch();

          return;
        } else {
          var modalForm = document.querySelector('.modal-form');
          modalForm.classList.add('modal-form--valid');

          form.submit();
        }
      }
    }
  }
</script>