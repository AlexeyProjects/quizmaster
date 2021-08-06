<template>
  <div id="app">
    <div class="form-wrapper">
       <form action="#" class="quiz-form"  @submit.prevent=onSubmit novalidate>
        <div 
              class="main animated" 
              v-show="STEP_COUNTER === 0">
                  <div class="main-bg"></div>
                  <div class="starter-page">
                    <h1>Узнайте стоимость <br> кухни на заказ</h1>
                    <p class="prop">Пройдите тест и получите<br/> <strong>гарантированную скидку {{ discount_summ }} ₽ </strong>  на кухню</p>
                    <button class="startBtn" type="button" @click=nextStep><img src="./assets/svg/check.svg" alt=""><span>Пройти тест</span></button>
                    <p class="prize">Награда за прохожение теста</p>
                    <offerBlock></offerBlock>
                    
                  </div>
              </div>
         <div class="sidebar animated" v-show="STEP_COUNTER > 0 && STEP_COUNTER < DATAMAIN.length + 1">
          <div class="">
            <div class="discount"><span>Ваша скидка: </span>
              <!-- <div class="discount__number">{{discount}} ₽</div> -->
              <div class="discount__number">
                <animateNumber :value="discount"></animateNumber> ₽
              </div>
              
            </div>
            <div class="catalog">
              <offerBlock></offerBlock>
            </div>
          </div>
          <consultant></consultant>
          

         </div>
         <div class="topbar animated" v-show="STEP_COUNTER > 0 && STEP_COUNTER < DATAMAIN.length + 1">
              <img src="./assets/svg/topbar.svg">
              <span class="quiz-name">Узнайте стоимость кухни на заказ</span>
          </div>
            <div class="step step9 animated" v-show="STEP_COUNTER == DATAMAIN.length+1">

              <transition  name="slide_from_left"> 
                <div v-show="STEP_COUNTER == DATAMAIN.length+1" class="final">
                 <h1 class="final-header">Осталось только узнать, как <br> нам с вами связаться</h1>
                 <p class="final_add-text">Мы подберем для вас лучшие предложения, и расскажем о них по телефону</p>
                 <div>Награда за прохожение теста</div>
                 <offerBlock></offerBlock>
               </div>
              </transition>
               
              <transition  name="slide_from_right">
                <div v-show="STEP_COUNTER == DATAMAIN.length+1" class="userData">
                 <h2 class="take-discount"> <div class="circle"></div><span>Получить скидку  {{ discount_summ }}</span></h2>
                 <label>Введите имя
                  <div class="custom_input user-name_input-box">
                     <input type="text" class="user_name_input" v-model="userName" name="user_name" placeholder="Имя">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path id="user" d="M12 0C8.51067 0 5.67188 2.8388 5.67188 6.32812C5.67188 9.81745 8.51067 12.6562 12 12.6562C15.4893 12.6562 18.3281 9.81745 18.3281 6.32812C18.3281 2.8388 15.4893 0 12 0Z" fill="#E9ECEE"/>
                     <path id="user" d="M19.8734 16.7904C18.1409 15.0313 15.8442 14.0625 13.4062 14.0625H10.5938C8.15588 14.0625 5.85909 15.0313 4.12659 16.7904C2.40258 18.5409 1.45312 20.8515 1.45312 23.2969C1.45312 23.6852 1.76794 24 2.15625 24H21.8438C22.2321 24 22.5469 23.6852 22.5469 23.2969C22.5469 20.8515 21.5974 18.5409 19.8734 16.7904Z" fill="#E9ECEE"/>
                     </svg>
                  </div>
                  </label>
                  <label>Введите номер телефона, чтобы активировать скидку
                  <div class="custom_input" :class="{invalid:($v.userPhone.$dirty && !$v.userPhone.required) || ($v.userPhone.$dirty && !$v.userPhone.alpha)}">
                    <svg v-if="($v.userPhone.$dirty && !$v.userPhone.required) || ($v.userPhone.$dirty && !$v.userPhone.alpha)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#FF6E84"/>
                      <path d="M12.7432 14.4561H11.4688L11.0879 7H13.1167L12.7432 14.4561ZM11 16.7925C11 16.4312 11.0952 16.1577 11.2856 15.9722C11.4761 15.7817 11.7471 15.6865 12.0986 15.6865C12.4453 15.6865 12.7114 15.7842 12.897 15.9795C13.0825 16.1748 13.1753 16.4458 13.1753 16.7925C13.1753 17.1392 13.0801 17.415 12.8896 17.6201C12.7041 17.8203 12.4404 17.9204 12.0986 17.9204C11.752 17.9204 11.481 17.8228 11.2856 17.6274C11.0952 17.4321 11 17.1538 11 16.7925Z" fill="white"/>
                    </svg>
                    <MaskedInput v-model="userPhone" mask="\+\7 (111) 111-1111" name="user_phone" placeholder="Введите телефон"/>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="phone" d="M22.0742 15.7533C20.6049 15.7533 19.1621 15.5234 17.7949 15.0716C17.125 14.8431 16.3014 15.0528 15.8926 15.4727L13.194 17.5098C10.0644 15.8393 8.13669 13.9121 6.48894 10.8061L8.46612 8.17781C8.97981 7.66481 9.16406 6.91544 8.94331 6.21231C8.48956 4.83794 8.25906 3.39587 8.25906 1.92587C8.25913 0.863937 7.39519 0 6.33331 0H1.92581C0.863937 0 0 0.863937 0 1.92581C0 14.0977 9.90237 24 22.0742 24C23.1361 24 24.0001 23.1361 24.0001 22.0742V17.679C24 16.6172 23.1361 15.7533 22.0742 15.7533Z" fill="#E9ECEE"/>
                    </svg>
                  </div>
                 </label>
                 <button class="startBtn" type="submit"> <img src="./assets/svg/check.svg" alt=""><span>Получить скидку</span></button>
                 <p>Нажимая кнопку ”Получить скидку” вы соглашаетесь <br> <a href="https://sv-mebel.store/policy/" style="color: #333333">с политикой конфидециальности</a></p>
               </div>
              </transition>
               
            </div>
          
          <div class="form-content" v-show="STEP_COUNTER < DATAMAIN.length+1 && STEP_COUNTER > 0">

              
              <stepBlock 
              @unblocknextstep="unblocknextstep" 
              @blocknextstep="blocknextstep" 
              v-for="(item, key, index) in DATAMAIN"
              :index="key" :data_item="item"

              >
                
              </stepBlock>
              
              

            
          </div> 
          
            <div class="step step10 animated" v-show="STEP_COUNTER == DATAMAIN.length+2">
              <h1>Спасибо за ответ </h1>
              <p>
                Скидка закреплена. Я позвоню Вам, чтобы рассказать, как правильно списать долги
              </p>
              <div class="discount"> <div class="circle"></div> <span>Вы экономите {{ discount_summ }} Р</span> </div>

              <p>Вам подарок за прохождение опроса:</p>

              <a target="_blank" href="https://sv-mebel.store/cat.pdf" download style="color: #000"><offerBlock></offerBlock></a>
              <!-- <span class="cat mailsend__text">Или отправить себе на почту:</span>
              <post-input/> -->
            </div>
            <div class="form-content__bottom animated" v-show="STEP_COUNTER < DATAMAIN.length+1 && STEP_COUNTER > 0">

              <progressCustom :progress="progress"></progressCustom>

              <div class="buttons">
                <button class="prevBtn" type="button" @click=prevStep><img src="./assets/svg/prev.svg" alt=""></button>
                <button class="nextBtn" type="button" :disabled="choosen" @click=nextStep><span>Далее</span><img src="./assets/svg/next.svg"></button>
              </div>
            </div>
          <!-- <div class="progressbar animated"  v-show="STEP_COUNTER > 0 && STEP_COUNTER < DATAMAIN.length+1">
             <ProgressBar class="progress" :size="6" :val="animatedProgress" :bar-border-radius="3" bar-color="rgba(51, 153, 204, 0.5)"
              :text="text" text-align="left" text-position="top" text-fg-color="rgba(124, 124, 124)" :font-size="15" />
              
          </div> -->
         <div class="loader" v-if="showLoader">
           <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
         </div>
       </form>
    </div>
  </div>
</template>

<style lang="scss">

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
  }


  .slide_from_right-enter-active {
    transition: all .3s ease;
  }
  .slide_from_right-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide_from_right-enter-to {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide_from_right-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(-100%);
    opacity: 0;
  }



  .slide_from_left-enter-active {
    transition: all .3s ease;
  }
  .slide_from_left-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide_from_left-enter-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide_from_left-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
  }



  .from-bottom-enter-active {
    transition: all .3s ease;
  }
  .from-bottom-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .from-bottom-enter-to {
    transform: translateY(200%);
    opacity: 0;
  }
  .from-bottom-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(-200%);
    opacity: 0;
  }


$color-alpha: rgba(51, 153, 204, 0.5);

html {
  font-size: 10px;
}
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
}
h2 {
 font-size: 1.8rem;
}
button,
label,
a {
  cursor: pointer;
  text-decoration: none;
}
.mailsend__text {
  margin-top: 40px;
  margin-bottom: 10px;
}
.loader {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  opacity:  unset;
  align-items: center;
  justify-content: center;
  color: #fff;
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgba(51, 153, 204) transparent transparent transparent;
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
.number_value {
  max-width: 6rem;
  border: none;
  padding-left: 1rem;
  &:focus {
    outline: none;
  }
}
.catalog,
.not_allowed {
  img {
     cursor: not-allowed;
  }
}
.ye {
  position: absolute;
  left: 12rem;
  font-size: 1.5rem;
  // font-weight: 700;
  sup {
    font-size: 1rem;
  }
}
// 
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
//validations {
.invalid {
    border: 2px solid #FF6F84 !important;
    border-radius: 3px !important;
}
.circle {
            margin-right: 1rem;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: $color-alpha;
}
.topbar {
  background: #fff;
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #D3E4EF;
  img {

  }
  span {
    margin-left: 1rem;
  }
}
.sidebar {
  width: 27%;
  height: 100%;
  float: right;
  background: #F7F7F7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1.5rem;
  z-index: 999;
     .discount {
        margin-bottom: 1rem;
        width: 22.2rem;
        display: flex;
        justify-content: space-between;

        background: linear-gradient(86.86deg, #A6DCFB -4.48%, rgba(166, 220, 251, 0) 127.12%);
        
        filter: drop-shadow(0px 4px 6px rgba(13, 23, 50, 0.1));
        border-radius: 3px;
        padding: 1.7rem 0.8rem;
        box-sizing: border-box;
        &__number {
          font-weight: 600
        }
      }
     .catalog {

      }
}
.progressbar {
  display: flex;
  vertical-align: bottom;
  bottom: 0;
  padding: 1rem;
  justify-content: space-between;
  margin: auto;
  background: #fff;
  .progress {
    width: 80%;
  }
  .buttons {
    display: flex;
  }
}
//form-wrapper settings
.form-wrapper {
  .quiz-form {
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 960px;
    height: 520px;
    border: 1px solid #D3E4EF;
    border-radius: 0.3rem;
    .form-content {

      overflow: hidden;
      width: 72%;
      height: 80%;
      &__bottom {
        border-top:  1px solid #D3E4EF;
        padding: 1rem 2rem 0rem 2rem;
        box-sizing: border-box;
        width: 73.5%;
        display: flex;
        .buttons {
          display: flex
        }
      }
    }
    .step1, .main {
      display: flex;
      flex-direction: row;
      align-items: center;
      .main-bg {
        width: 560px;
        height: 519px;
        background: url(./assets/main.jpg);
        background-size: cover;
      }
      .starter-page {
        margin-left: 3rem;
        h1 {
          font-size: 2.7rem;
          line-height: 110%;
        }
        .prop {
          font-size: 1.4rem;
        }
        .prize {
          margin-top: 5rem;
          font-size: 1.2rem;
        }
      }
    }
    .step2,
    .step3,
    .step4,
    .step5,
    .step6,
    .step7,
    .step8 {
      padding: 1rem 2rem 2rem 2rem;
    }
    .step2 {
      h2 {
        margin-top: 0;
        font-size: 1.8rem;
      }
      max-width: 70rem;
      .kitchen_type {
         margin: 0 2rem 1rem 0rem;
      }
    }
    .step4,
    .step8 {
      max-width: 65rem;
    }
    .step2,
    .step3,
    .step5,
    .step6,
    .step7 {
      h2 {
        flex-basis: 100%;
      }
      display: flex;
      flex-wrap: wrap;
      .question_item {
        flex-basis: 45%;
        margin-bottom: 1rem;
        img {
          width: 100%;
        }
      }
    }
    .step3 {
      div {
        label {
          .input_box {
          }
        }
      }
    }
    .step9 {
      height: 52rem;
      margin-left: 3rem;
      display: flex;
      justify-content: space-around;
      .final {
        // max-width: 40rem;
        margin-top: 10rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        .offerblock {
          margin-top: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0rem;
        }
        p {
          margin-top: 2rem;
          margin-bottom: 8rem;
        }
        div {
          font-size: 1.2rem;
        }
        img {
          margin-top: 1rem;
          left: 0;
        }
      }
      .userData {
        padding-top: 10rem;
        border-left: 3px solid  #E9ECEE;
        padding-left: 1.5rem;
        h2 {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          padding-bottom: 2rem;
        }
        label {
          font-size: 1.2rem;
          .custom_input {
            margin-top: 0.5rem;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: center;
            border: 2px solid #E9ECEE;
            padding: 1rem;
            max-width: 30rem;
            margin-bottom: 2rem;
            border-radius: 3px;
            img {

            }
            input {
              width: 100%;
              height: 100%;
              border: none;
              margin-left: 1rem;
              font-size: 1.5rem;
              &:focus {
                outline: none;
              }
              &::placeholder {
                font-size: 1.5rem;
              }
            }
          }
        }
        p {
          margin-top: 2rem;
          font-size: 1rem;
        }
      }
    }
    .step10 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h1 {
        margin: 0;
      }
      p {
        text-align: center;
      }
      .discount {
        margin-top: 3rem;
        font-weight: 900;
        display: flex;
        align-items: center;
      }
      .cat  {
        margin-top: 2rem;
      }
      img {
        margin-top: 2rem;
      }
    }
  }
}
//buttons
button:focus {
  outline: none;
}
.prevBtn {
     background: transparent;
     border: none;
     padding-right: 2rem;
     padding-left: 3rem;
}
.nextBtn {
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 1.3rem;
     padding: 12px;
     border: 1px solid #C0C6C9;
     border: 1px solid $color-alpha;
     background: linear-gradient(86.86deg, #A6DCFB -4.48%, rgba(166, 220, 251, 0) 127.12%);
     width: 12rem;
     &:hover {
       
       box-shadow: inset 0px 0px 10px -3px rgba(0, 0, 0, 0.05);
     }
     &:disabled {
       background:  #E9ECEE;
       border: 1px solid #E9ECEE;
     }
     span {
       padding-right: 1rem;
     }
}
.startBtn {
     display: flex;
     align-items: center;
     padding: 1.5rem 2rem;
     font-size: 1.5rem;
     border: 1px solid $color-alpha;
     background: $color-alpha;
     box-shadow: inset 0px 0px 10px -3px rgba(0, 0, 0, 0.05);
     border-radius: 3px;
     &:hover {
      
       box-shadow: inset 0px 0px 10px -3px rgba(0, 0, 0, 0.05);
       border-radius: 3px;
     }
     &:focus {
       outline: none;
     }
     &:disabled {
      background: #E9ECEE;
      box-shadow: inset 0px 0px 10px -3px rgba(0, 0, 0, 0.05);;
     }
     span {
       margin-left: 1rem;
     }
}
//checkbox-settings 
.question_item {
  width: 46%;
  display: inline-block;
  margin-right: 2rem;
  margin-bottom: 1rem;
    .question_content {
          .item_name {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {

            }
            .check_button {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              border: 1px solid #E9ECEE;
            }
          }
      }
}
.question-label .kitchen-type_input {
  display: none;
}

.question-label .kitchen-type_input+div {
  border: 2px solid #E9ECEE;
  box-sizing: border-box;
  border-radius: 3px;
}

.question-label  .kitchen-type_input:checked+div {
  border: 2px solid $color-alpha;
}
.question-label  .kitchen-type_input:checked+div .input_name_block .yellow_circle {
  width: 1.4rem;
  height: 1.4rem;
  background: radial-gradient(rgb(255, 255, 255) 20%, $color-alpha 30%);
  border: none;
  transition: 0.4s;
}
.question-label  .kitchen-type_input+div .input_name_block svg {
  transition: .4s;
  rect {
    transition: .1s;
  }

  path {
    transition: .1s;
  }
}
.question-label  .kitchen-type_input:not(:checked)+div .input_name_block svg {
  rect {
    fill: #D3E4EF;
  }
  path {
    fill:  #D3E4EF;
  }
}

.input_name_block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.yellow_circle {
  float: right;
  width: 1.2rem;
  height: 1.2rem;
  background: transparent;
  border: 2px solid #E9ECEE;
  border-radius: 50%;
  &.checkbox {
    border-radius: 0;
  }
  &:hover {
    background: radial-gradient(rgb(255, 255, 255) 20%, rgb(233, 236, 238) 30%);
    border: none;
    width: 1.4rem;
    height: 1.4rem;
    transition: 0.2s;
  }
}
.question_item:hover .yellow_circle {
 background: radial-gradient(rgb(255, 255, 255) 20%, rgb(233, 236, 238) 30%);
    border: none;
    width: 1.4rem;
    height: 1.4rem;
    transition: 0.2s;
}
input {
  color: #000;
}
input:focus+svg #phone {
    fill: #7A7A7A;
    transition: 0.3s;
}
input:focus+svg #user {
    fill: #7A7A7A;
    transition: 0.3s;
}

//range-slider settings 
.range-step {
     width:100%;
     flex-basis: 100%;
      .range-value {
        display: flex;
        align-items: center;
        border: 1px solid #E9ECEE;
        max-width: 8rem;
        padding: 1rem 0;
        justify-content: center;
        font-size: 1.3rem;
      }
      .range-values {
         input {

         }
         .min-max {
           font-size: 1.2rem;
           opacity: 0.3;
           display: flex;
           justify-content: space-between;
           .min {
             
           }
         }
      }
 }
 .step10 {
  .discount {
    margin-bottom: 5rem;
  }
 }
</style>
<style lang="css">
  .kitSize {
    background:linear-gradient(90deg, rgb(249, 206, 105) 20%, rgb(255,255,255)20%);
  }
  .kitCost {
    background:linear-gradient(90deg, rgb(249, 206, 105) 30%, rgb(255,255,255)30%);
  }
  .mySlider {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 4px;
    width: 100%;
    /* background: linear-gradient(45deg, rgb(255, 255, 255) 60%, rgb(255, 255, 255) 60%); */
    border-radius: 3px;
    border-radius: 20px;
    border: 2px solid $color-alpha;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s ease-in;
    -webkit-transition: opacity .2s ease-in;
  }

  /*hover on range slider*/

  .mySlider:hover {
    opacity: 1;
  }

  /* chrome and safari supporter */

  .mySlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    -webkit-transition: all .3s ease-in;
    transition: all .3s ease-in;
    border: 5px solid $color-alpha;
  }

  /* mozila firefox supporter */
  .mySlider::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #e74c3c;
    cursor: pointer;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    border: 2px solid #d3d3d3;
  }

  /* hover on slider thumb */

  .mySlider::-webkit-slider-thumb:hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
  }

  /* Range Value Span */
</style>
<style lang="scss">
@media screen and (max-width: 920px) {

}
@media screen and (max-width: 1000px) {
    .quiz-form {
      width: 100% !important;
      height: 100% !important;
      .controllers {
        .sidebar {
          height: 100%;
        }
      }
      .form-content {
        height: 90%;
        .step1{
          height: 100%;
        }
        .step2 {

        }
        .step1 {
          flex-direction: row;
            .main-bg {
              width: 100%;
              height: 100%;
            }
        }
        .step2{
          h2 {
           margin-top: 0;
           font-size: 1.8rem;
          }
        }
      }
    }
    .form-wrapper .quiz-form .form-content__bottom {
      width: 73%;
    }
}
@media screen and (max-width: 800px) {
   form {
    height: 100%;
      overflow-y:scroll;
  }
  .form-wrapper .quiz-form .form-content {
    width: 100%;
  }
  .form-wrapper .quiz-form .form-content__bottom {
    width: 100%;
  }
    .form-wrapper {
      width: 100%;
         .quiz-form {
            .step9 {
            margin-left: 0 !important;
            display: block;
        .final {
          margin-top: 0;
          width: 100%;
          display: flex !important;
           flex-direction: column !important;
           align-items: flex-start !important;
        h1 {
          width: 100%;
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 0rem;
        }
        p {
           text-align: center;
          margin-top: 1rem;
        }
        .offerBlock {
          margin: auto;
        }
        div {
          text-align: center;
          font-size: 1.2rem;
        }
        a {
            display: flex;
            justify-content: center;
            margin: auto;
          img {
          width: 20rem;
          margin-top: 1rem;
          left: 0;
        }
        }
      }
      .userData {
        width: 100%;
        display: flex !important;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-left: none !important;
        padding-left: 0 !important;
        h2 {
          text-align: center !important;
          padding-bottom: 0;
        }
        .custom_input {
          width: 32rem;
        }
      }
    }
         }
    }
    .step10 {
      .cat {
        text-align: center;
      }
    }
   .sidebar {
     display: none !important;
   }
   .range-step{
     width: 100% !important;
   }
}
@media screen and (max-width: 740px) {
   form {
    height: 100%;
      overflow-y:scroll;
  }
  .question_item {
    flex-basis: 100% !important;
  }
   .sidebar {
     display: none !important;
   }
   .progressbar {
     min-width: 90% !important;
   }
   .step2 {
     max-height: 50rem;
     overflow-y: scroll;
   }
}
@media screen and (max-width: 576px) {
  form {
    overflow-y: scroll;
  }
   .question_item {
   img {
     width: 45rem;
   }
  }
  .user-name_input-box {
    margin-right: 1rem;
  }
  .custom_input {
      width: 28rem !important;
    }
    .quiz-form {
      .controllers {
         .progressbar {
            max-width: 80% !important;
          }
      }
      .form-content {
        .step {
         
        }
        .step1 {
            flex-direction: column;
            .starter-page {
              margin-bottom: 2rem;
              margin-left: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
        }
      }
    }
}
@media screen and (max-width: 380px) {
  form {
    height: 100%;
      overflow-y:scroll;
  }
   .user-name_input-box {
    margin-right: 1.5rem;
  }
}
@media screen and (max-width: 320px) {
  .custom_input {
     margin-right: 1rem;
  }
}
</style>
<style lang="css">
.animated {
  opacity:0; /*Элемент полностью прозрачный (невидимый)*/
  transition: 0.5s; /*Скорость перехода состояния элемента*/
  animation: show 0.5s 1; /* Указываем название анимации, её время и количество повторов*/
  animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
  animation-delay: 0.5s; /* Задержка перед началом */
}
@keyframes show{
0%{
opacity:0 ;
}
100% {
opacity:1;
}
}
</style>
<script>
//\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}

import MaskedInput from 'vue-masked-input';
import ProgressBar from 'vue-simple-progress';
import emailjs from 'emailjs-com';
import gsap from 'gsap';

import postInput from "@/componets/postInput";
import offerBlock from "@/componets/offerBlock";
import consultant from "@/componets/consultant";
import stepBlock from "@/componets/stepBlock";
import animateNumber from "@/componets/animateNumber";
import progressCustom from "@/componets/progressCustom";



import {required, helpers} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'App',
    components: {
      ProgressBar,
      MaskedInput,
      postInput,
      offerBlock,
      consultant,
      stepBlock,
      animateNumber,
      progressCustom
    },
    data: function () {

      return {
        step: 0,
        text: 'Готово: 0%',
        progress: 0,
        discount_summ: 5000,
        discount: 0,
        choosen: true,
        submitStatus: null,
        userName: null,
        userPhone: null,
        costcount: 300000,
        kitsize: 10,
        showLoader: false,
        FormData: {
          typeofKitchen: false,
          kitchenMaterial: false,
          kitchenProject: false,
          KitchenEngine: false,
          kitchenSetUp: false,
        },
        tweenedNumber: 0
      }
    },

    watch: {
      costcount: function(){
        if(this.costcount > 1000000){
          this.costcount = 1000000
        }else if(this.costcount === ''){
          let range = document.querySelector('.kitCost')
          console.log(range)
          range.style.background ='linear-gradient(90deg, rgb(249, 206, 105) 50%, rgb(255,255,255)50%)';
        }
      },
      kitsize: function() {
        if(this.kitsize > 50){
          this.kitsize = 50
        }else if(this.kitsize === ''){
            let range = document.querySelector('.kitSize')
            range.style.background ='linear-gradient(90deg, rgb(249, 206, 105) 50%, rgb(255,255,255)50%)';
        }
      },
      progress: function(newValue) {
        gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
      }
    },
    validations:{
      userPhone:{
        required,
        phoneNumber: helpers.regex('phoneNumber',/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/),
      },
    },
    computed: {
      ...mapGetters(['DATAMAIN','STEP_COUNTER']),
      partOfProgress() {
        return Math.trunc(100/this.DATAMAIN.length)
      },
      animatedProgress: function() {
        return this.tweenedNumber.toFixed(0);
      }
    },
    methods: {
      onSubmit () {
        console.log('xyu')
          if(this.$v.$invalid){
            this.$v.$touch()
            return
          }
          this.showLoader = true;
          const form = document.querySelector('.quiz-form')
          emailjs.sendForm('service_dvc5fd6', 'template_4q2ei8j', form, 'user_kxQajqpYadlmdUKWCYTaC')
            .then(() => {
                this.showLoader = false;
                this.nextStep();
            }, (error) => {
                console.log('FAILED...', error);
            })
      },
      prevStep() {
        this.unlockBtn()

        if (this.STEP_COUNTER > 0) {
          this.$store.commit('PREV_STEP')
          if (this.progress > 0) {
            this.progress -= this.partOfProgress
            this.text = "Готово" + ' ' + this.progress + ' %'
            this.discountCounter(false)
          }
        }
        else {
          return
        }
      },
      nextStep() {
        this.lockBtn()
        this.$store.commit('NEXT_STEP')
        this.step++
        if  (this.progress < 100 && this.STEP_COUNTER >= 2 ) {
          console.log(this.partOfProgress)
          this.progress += this.partOfProgress
          this.text = "Готово" + ' ' + this.progress + ' %'
          this.discountCounter(true)
        }
      },
      unlockBtn(){
         this.choosen = false
      },
      lockBtn (){
        this.choosen = true
      },
      discountCounter(bool) {
        var partDiscount = Math.round(this.discount_summ / this.DATAMAIN.length)
        console.log(partDiscount)
        if (this.discount < this.discount_summ && bool) {
          this.discount += partDiscount
        } else {
          this.discount -= 1
        }
      },
      KitchenCostRangeColor(e) {
        let range = document.querySelector('.kitCost')
              let color = 'linear-gradient(90deg, rgb(249, 206, 105)' +this.costcount/10000  + '%, rgb(255,255,255)' + this.costcount/10000  + '%)'
              range.style.background = color

              this.costcount = e.target.value.replace(/[^0-9]/g, "");
              if(this.costcount === '' || +e.target.value === 0) {
                    this.lockBtn()
              }else {
                  this.unlockBtn()
              }
      },
      KitchenSizeColor(e) {
           let range = document.querySelector('.kitSize')
           let color = 'linear-gradient(90deg, rgb(249, 206, 105)' +this.kitsize*2  + '%, rgb(255,255,255)' + this.kitsize*2  + '%)'
           range.style.background = color

           this.kitsize = e.target.value.replace(/[^0-9]/g, "");
            if(this.kitsize === '' || +e.target.value === 0) {
                  this.lockBtn()
            }else {
                this.unlockBtn()
            }
      },
      ...mapActions(["GET_CONSULTANT_DATA", "GET_DATAMAIN_DATA"]),
      unblocknextstep() {
        console.log('unblock in app')
        this.choosen = false
        this.unlockBtn
      },
      blocknextstep() {
        console.log('block in app')
        this.choosen = true
        this.lockBtn
      }
      
    },
    mounted() {
        this.GET_CONSULTANT_DATA();
        this.GET_DATAMAIN_DATA()
    }
  }
</script>
