<template>
  <div class="postInput">
  <form class="wrapper" @submit.prevent=sendForm() v-if="!isSent">
    <input type="text" class="wrapper_input" name="user_post" placeholder="your-email@mail.ru">
    <button class="wrapper_button">Отправить</button>

    <div class="loader" v-if="showLoader">
      <div class="lds-ring_2"><div></div><div></div><div></div><div></div></div>
    </div>
  </form>
  <div v-if="isSent">
    <img class="sent__check" src="../assets/svg/cat_check.svg" alt="done">
    <p class="sent__text">Каталог отправлен на вашу почту</p>

  </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
export default {
name: "input",
  data () {
    return {
      showLoader: false,
      isSent: false,
    }
  },
  methods: {
    sendForm() {
      const form = document.querySelector('.wrapper');
      this.showLoader = true;
      emailjs.sendForm('service_dvc5fd6', 'template_3nv17w3', form, 'user_kxQajqpYadlmdUKWCYTaC')
          .then(() => {
            this.showLoader = false;
            this.isSent = true;

          }, (error) => {
            console.log('FAILED...', error);
          })
    }
  }
}
</script>
<style lang="scss">

.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  color: #fff;
  .lds-ring_2 {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring_2 div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 8px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
<style scoped lang="scss">
.postInput {
  width: 100%;
}

.sent__text {
  font-size: 18px;
}
.sent__check {
  display: block;
  margin: auto;

}
  .wrapper {

    position: relative;
    font-family: "Roboto", sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #C5CACE;
    border-radius: 3px;
    font-size: 16px;
    width: 80%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    &_input {
      border: none;
      padding: 15px;
      font-size: 16px;
      &:focus {
        outline: none;
      }
      &::placeholder {
        font-size: 16px;
      }

    }
    &_button {
      position: absolute;
      right: -1px;
      top: -1px;
      background: #F9CE69;
      border: none;
      padding: 15px;
      height: 103%;
    }
  }
</style>