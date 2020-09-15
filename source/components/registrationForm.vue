<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <fieldset class="registration-form__data-field data-fieldset data-fieldset--personal-data">
      <div class="data-fieldset__heading-wrapper">
        <legend class="data-fieldset__heading">Личные данные</legend>
      </div>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="surname">Фамилия:</label>
          <input type="text" name="client-surname"
                id="surname"
                class="list-of-data__input"
                :class="{invalid: ($v.surname.$dirty && !$v.surname.required)}"
                v-model.trim="$v.surname.$model"
                placeholder="Иванов">

          <span class="list-of-data__invalid-feedback" v-if="$v.surname.$dirty && !$v.surname.required">Необходимо ввести Фамилию!</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="name">Имя:</label>
          <input type="text" name="client-name"
                id="name"
                class="list-of-data__input"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                v-model.trim="$v.name.$model"
                placeholder="Иван">

          <span class="list-of-data__invalid-feedback" v-if="$v.name.$dirty && !$v.name.required">Необходимо ввести Имя!</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="patronymic">Отчество:</label>
          <input type="text" name="client-patronymic" id="patronymic" class="list-of-data__input" placeholder="Иванович">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="birthday">Дата рождения:</label>
          <input type="date" name="client-birthday"
                id="birthday"
                class="list-of-data__input"
                :class="{invalid: ($v.birthday.$dirty && !$v.birthday.required)}"
                v-model.trim="$v.birthday.$model">

          <span class="list-of-data__invalid-feedback" v-if="$v.birthday.$dirty && !$v.birthday.required">Укажите, пожалуйста, дату рождения.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="phone">Номер телефона:</label>
          <input type="tel" name="client-phone"
                id="phone"
                class="list-of-data__input"
                :class="{invalid: ($v.phone.$dirty && !$v.phone.required || $v.phone.$dirty && !$v.phone.validFormat)}"
                v-model.trim="$v.phone.$model"
                placeholder="7 (999) 123-45-67"
                minLength="11" maxlength="17">

          <span class="list-of-data__invalid-feedback" v-if="$v.phone.$dirty && !$v.phone.validFormat">Введённое значение не соответствует паттерну ввода!</span>
        </li>
        <li class="list-of-data__item list-of-data__item--gender">
          <p class="list-of-data__label list-of-data__label--gender">Пол:</p>

          <div class="list-of-data__gender-wrapper">
            <input type="radio" name="client-gender" id="female" class="list-of-data__input list-of-data__input--gender" checked>
            <label class="list-of-data__gender-name" for="female">Ж</label>

            <input type="radio" name="client-gender" id="male" class="list-of-data__input list-of-data__input--gender">
            <label class="list-of-data__gender-name" for="male">М</label>
          </div>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="category">Группа клиентов:</label>
          <select name="client-category"
                  id="category"
                  :class="{invalid: ($v.сategories.$dirty && !$v.сategories.required)}"
                  v-model="$v.сategories.$model" multiple>

            <option v-for="category in availableCategories" :value="category">{{ category }}</option>
          </select>

          <span class="list-of-data__invalid-feedback" v-if="$v.сategories.$dirty && !$v.сategories.required">Пожалуйста, выберите категорию.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="doctor">Лечащий врач:</label>
          <select name="attending-doctor"
                  id="doctor"
                  v-model="$v.availableDoctors.$model">

            <option v-for="doctor in availableDoctors" :value="doctor">{{ doctor }}</option>
          </select>
        </li>
        <li class="list-of-data__item list-of-data__item--message">
          <label class="list-of-data__label" for="message">Не отправлять СМС</label>
          <input type="checkbox" name="client-message" id="message" class="list-of-data__input list-of-data__input--message" checked>
        </li>
      </ul>
    </fieldset>
    
    <fieldset class="registration-form__data-field data-fieldset data-fieldset--address">
      <div class="data-fieldset__heading-wrapper">
        <legend class="data-fieldset__heading">Адрес</legend>
      </div>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="postcode">Индекс:</label>
          <input type="number" name="client-postcode" id="postcode" class="list-of-data__input" placeholder="012345" minlength="0" maxlength="6">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="country">Страна:</label>
          <input type="text" name="client-country" id="country" class="list-of-data__input" placeholder="Россия">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="region">Область:</label>
          <input type="text" name="client-region" id="region" class="list-of-data__input" placeholder="Ленинградская">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="city">Город:</label>
          <input type="text" name="client-city"
                id="city"
                class="list-of-data__input"
                :class="{invalid: ($v.city.$dirty && !$v.city.required)}"
                v-model.trim="$v.city.$model"
                placeholder="Санкт-Петербург">

          <span class="list-of-data__invalid-feedback" v-if="$v.city.$dirty && !$v.city.required">Укажите, пожалуйста, город, в котором проживаете.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="street">Улица:</label>
          <input type="text" name="client-street" id="street" class="list-of-data__input" placeholder="Введите название улицы...">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="housenumber">Дом:</label>
          <input type="number" name="client-housenumber" id="housenumber" class="list-of-data__input" placeholder="Введите номер дома...">
        </li>
      </ul>
    </fieldset>

    <fieldset class="registration-form__data-field data-fieldset data-fieldset--document">
      <div class="data-fieldset__heading-wrapper">
        <legend class="data-fieldset__heading">Паспорт</legend>
      </div>

      <ul class="data-fieldset__data-list list-of-data">
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="document">Тип документа:</label>
          <select name="client-document"
                  id="document"
                  :class="{invalid: ($v.availableDocuments.$dirty && !$v.availableDocuments.required)}"
                  v-model="$v.availableDocuments.$model">

            <option v-for="identityDoc in availableDocuments" :value="identityDoc">{{ identityDoc }}</option>
          </select>

          <span class="list-of-data__invalid-feedback" v-if="$v.availableDocuments.$dirty && !$v.availableDocuments.required">Выберите тип документа для регистрации.</span>
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="passportSeries">Серия:</label>
          <input type="number" name="client-passport" id="passportSeries" class="list-of-data__input" placeholder="01 23" minlength="0" maxlength="5">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="passportNumber">Номер:</label>
          <input type="number" name="client-passport" id="passportNumber" class="list-of-data__input" placeholder="012345" minlength="0" maxlength="6">
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="placeOfIssue">Кем выдан:</label>
          <input type="text" name="client-passport" id="placeOfIssue" class="list-of-data__input" placeholder="Полное название государственной организации, выдавшей документ">  
        </li>
        <li class="list-of-data__item">
          <label class="list-of-data__label" for="dateOfIssue">Дата выдачи:</label>
          <input type="date" name="client-passport"
                id="dateOfIssue"
                class="list-of-data__input"
                :class="{invalid: ($v.dateOfIssue.$dirty && !$v.dateOfIssue.required)}"
                v-model="$v.dateOfIssue.$model">

          <span class="list-of-data__invalid-feedback" v-if="$v.dateOfIssue.$dirty && !$v.dateOfIssue.required">Необходимо указать дату выдачи документа.</span>
        </li>
      </ul>
    </fieldset>

    <button type="submit" class="registration-form__submit-button">Зарегистрироваться</button>


    <div class="modal modal--overlay"></div>
    <div class="modal modal--valid-feedback">
      <p class="modal__valid-feedback-message">Регистрация прошла успешно!</p>

      <div class="modal__close-button-wrapper">
        <button type="button" class="modal__close-button"
                aria-label="Закрыть модальное окно"
                @click.prevent="onModalClose"></button>
      </div>
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
        availableCategories: [
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
        availableDocuments: [
          'Паспорт',
          'Свидетельство о рождении',
          'Водительское удостоверение'
        ],
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
        validFormat: enteredVal => {
          var phoneRegExp = /^7[\s]*[^\w]*[0-9]{3}[\s]*[^\w]*[0-9]{3}[\s]*[^\w]*[0-9]{2}[\s]*[^\w]*[0-9]{2}[\s]*[^\w]*$/;
          
          return phoneRegExp.test(enteredVal);
        }
      },
      сategories: { 
        required
      },
      availableDoctors: {},
      city: { 
        required
      },
      availableDocuments: { 
        required
      },
      dateOfIssue: { 
        required
      }
    },
    methods: {
      onSubmit () {
        var form = document.querySelector('.registration-form');
        form.action = ''; // --- Server address
        form.method = 'post'; // --- Send method (POST — means that the data will be sent in a "closed way")

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
          var modals = document.querySelectorAll('.modal');
          modals.forEach(element => {
            element.classList.add('modal--show');
          });

          form.reset();

          /*
          _______________________________________________

            This form can be submitted to some address,
            but the test assignment does'nt provide a
            form submission.
          _______________________________________________

          form.submit();

          */
        }
      },
      onModalClose () {
        var modals = document.querySelectorAll('.modal');
        modals.forEach(element => {
          element.classList.remove('modal--show');
        });
      }
    }
  }
</script>