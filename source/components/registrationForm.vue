<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <fieldset>
      <legend>Личные данные</legend>

      <ul>
        <li>
          <label for="surname">Фамилия:</label>
          <input type="text" name="client-surname"
                id="surname"
                :class="{invalid: ($v.surname.$dirty && !$v.surname.required)}"
                v-model.trim="$v.surname.$model"
                placeholder="Иванов">

          <span v-if="$v.surname.$dirty && !$v.surname.required">Необходимо ввести Фамилию!</span>
        </li>
        <li>
          <label for="name">Имя:</label>
          <input type="text" name="client-name"
                id="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                v-model.trim="$v.name.$model"
                placeholder="Иван">

          <span v-if="$v.name.$dirty && !$v.name.required">Необходимо ввести Имя!</span>
        </li>
        <li>
          <label for="patronymic">Отчество:</label>
          <input type="text" name="client-patronymic" id="patronymic" placeholder="Иванович">
        </li>
        <li>
          <label for="birthday">Дата рождения:</label>
          <input type="date" name="client-birthday"
                id="birthday"
                :class="{invalid: ($v.birthday.$dirty && !$v.birthday.required)}"
                v-model.trim="$v.birthday.$model">
        </li>
        <li>
          <label for="phone">Номер телефона:</label>
          <input type="tel" name="client-phone"
                id="phone"
                :class="{invalid: ($v.phone.$dirty && !$v.phone.required)}"
                v-model.trim="$v.phone.$model"
                placeholder="+7 ХХХ ХХХ ХХ ХХ">
        </li>
        <li>
          <div>
            <span>Пол:</span>

            <label for="female">Ж</label>
            <input type="radio" name="client-sex" id="female" checked>

            <label for="male">М</label>
            <input type="radio" name="client-sex" id="male">
          </div>
        </li>
        <li>
          <label for="category">Группа клиентов:</label>
          <select name="client-category"
                  id="category"
                  :class="{invalid: ($v.category.$dirty && !$v.category.required)}"
                  v-model="$v.category.$model">
            <option>VIP</option>
            <option>Проблемные</option>
            <option>ОМС</option>
          </select>
        </li>
        <li>
          <label for="doctor">Лечащий врач:</label>
          <select name="attending-doctor" id="doctor">
            <option>Иванов</option>
            <option>Захаров</option>
            <option>Чернышева</option>
          </select>
        </li>
        <li>
          <label for="message">Не отправлять СМС</label>
          <input type="checkbox" name="client-message" id="message">
        </li>
      </ul>
    </fieldset>
    
    <fieldset>
      <legend>Адрес</legend>

      <ul>
        <li>
          <label for="postcode">Индекс:</label>
          <input type="number" name="client-postcode" id="postcode">
        </li>
        <li>
          <label for="country">Страна:</label>
          <input type="text" name="client-country" id="country">
        </li>
        <li>
          <label for="region">Область:</label>
          <input type="text" name="client-region" id="region">
        </li>
        <li>
          <label for="city">Город:</label>
          <input type="text" name="client-city"
                id="city"
                :class="{invalid: ($v.city.$dirty && !$v.city.required)}"
                v-model.trim="$v.city.$model">
        </li>
        <li>
          <label for="street">Улица:</label>
          <input type="text" name="client-street" id="street">
        </li>
        <li>
          <label for="housenumber">Дом:</label>
          <input type="number" name="client-housenumber" id="housenumber">
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend>Паспорт</legend>

      <ul>
        <li>
          <label for="document">Тип документа:</label>
          <select name="client-document"
                  id="document"
                  :class="{invalid: ($v.document.$dirty && !$v.document.required)}"
                  v-model="$v.document.$model">
            <option>Паспорт</option>
            <option>Свидетельство о рождении</option>
            <option>Водительское удостоверение</option>
          </select>
        </li>
        <li>
          <label for="passportSeries">Серия:</label>
          <input type="number" name="client-passport" id="passportSeries">
        </li>
        <li>
          <label for="passportNumber">Номер:</label>
          <input type="number" name="client-passport" id="passportNumber">
        </li>
        <li>
          <label for="placeOfIssue">Кем выдан:</label>
          <input type="text" name="client-passport" id="placeOfIssue">  
        </li>
        <li>
          <label for="dateOfIssue">Дата выдачи:</label>
          <input type="date" name="client-passport"
                id="dateOfIssue"
                :class="{invalid: ($v.dateOfIssue.$dirty && !$v.dateOfIssue.required)}"
                v-model="$v.dateOfIssue.$model">
        </li>
      </ul>
    </fieldset>

    <button type="submit">Зарегистрироваться</button>
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
        category: null,
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
        maxLength: maxLength(11)
      },
      category: { 
        required
      },
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
          form.submit();
        }
      }
    }
  }
</script>


<style>
  .invalid {
    outline: 2px solid red;
  }
</style>