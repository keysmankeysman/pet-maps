<script setup>
import { ref } from 'vue'

defineProps(['currentCity', 'tooltipX', 'tooltipY'])
defineEmits(['closeTooltip', 'handleAddShop'])

let dialogReport = ref (false)
let dialogPark = ref (false)
let selectedPark = ref (null)

let indexStaff = ref(null)

const showStaff = (i, isActive) => {
  if (!isActive) return
  if (i === this.indexStaff || i.active === false) {
    indexStaff.value = null
  } else {
    indexStaff.value = i
  }
}

</script>


<template>
  <div
    class="tooltip"
    :style="{ top: tooltipX + 'px', left: tooltipY + 'px' }"
  >
    <div v-if="currentCity.shops.length">
      <div
        class="tooltip-wrp"
        :style="{
          borderBottom:
            index + 1 === currentCity.shops.length
              ? '0px'
              : '1px solid rgba(10, 11, 46, 0.1)',
        }"
        v-for="(shop, index) in currentCity.shops"
        :key="`city-${shop.id}`"
      >
        <div class="tooltip-header">
          <b>{{ shop.name }}</b> <br />
          <i>г. {{ currentCity.name }},{{ shop.address }}</i>
        </div>

        <div class="tooltip-center">

          <div class="tooltip-center__count">
            <span
              class="tooltip__active-representative"
              @click="showStaff(index, shop.active)"
              :class="{
                nonRepresentative:
                  shop.activeRepresentativeCount == 0 || shop.active == false,
              }"
            >
              сотрудники:
              {{
                shop.active == false
                  ? (shop.activeRepresentativeCount = 0)
                  : shop.activeRepresentativeCount
              }}</span
            >
            <span> требуется: {{ shop.necessaryRepresentativeCount }}</span>
            <div
              class="tooltip-center__count--circle"
              :style="{ background: shop.fill }"
            ></div>
          </div>

          <div
            class="tooltip__representative-list"
            v-if="indexStaff == index"
          >
            <div
              class="tooltip__representative-item"
              v-for="(man, i) in shop.representatives"
              :key="`man-${man.id}`"
            >
              <div v-if="man.active">
                {{ i + 1 }}. {{ man.lastName }} {{ man.firstName }}
                {{ man.middleName }} <br />
                тел: {{ man.phone }}
              </div>
            </div>
          </div>
          <div>
            <v-btn
              color="primary"
              class="ma-2"
              dark
              @click="
                () => {
                  dialogPark = true;
                  selectedPark = home.productTypes;
                }
              "
            >
              Парк
            </v-btn>

            <v-btn
              color="primary"
              class="ma-2"
              dark
              @click="
                () => {
                  dialogReport = true;
                }
              "
            >
              Отчет
            </v-btn>

            <v-dialog v-model="dialogReport" max-width="1200px">
              <v-card style="height: 700px">
                <v-card-title>
                  <span>Отчет</span>
                </v-card-title>

                <v-card-text>
                  <iframe
                    :src="home.link"
                    width="1100"
                    height="560"
                    align="left"
                    frameborder="0"
                  >
                    Ваш браузер не поддерживает плавающие фреймы!
                  </iframe>

                  <v-btn
                    color="primary"
                    class="modal__btn"
                    text
                    @click="dialogReport = false"
                  >
                    Закрыть
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </div>

        <img
          src="../images/close-tooltip.svg"
          class="tooltip__close"
          @click="$emit('closeTooltip')"
        />
      </div>
    </div>
    <div v-else>
      Необходимо добавить<br />
      магазин
      <img
        src="../images/close-tooltip.svg"
        class="tooltip__close"
        @click="$emit('closeTooltip')"
      />
      <v-btn
        color="primary"
        class="modal__btn"
        text
        @click="$emit('handleAddShop')"
      >
        Добавить
      </v-btn>
    </div>
    <!-- <park-dialog
      v-model="dialogPark"
      :listData="selectedPark"
      @close="dialogPark = false"
    ></park-dialog> -->
  </div>
</template>


<style>
.hover {
  opacity: 0.8;
}

.circle {
  /* box-shadow: 0px 5px 10px 2px rgba(34, 80, 41, 0.2); */
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3));
  /* filter: drop-shadow(5px 5px 15px #26263A); */
  transition: filter 0.3s;
}

.circle:hover {
  /* box-shadow: 0px 5px 10px 2px rgba(34, 80, 41, 0.2); */
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5));
  /* filter: drop-shadow(5px 5px 15px #26263A); */
}

.block {
  width: 250px;
  height: 250px;
  background: #eee;
}

.svg-group {
  transition: opacity 0.3s;
}

.pins__cities title {
  color: red;
}

.tooltip {
  width: auto;
  height: auto;
  background: #fff;
  border-radius: 12px;
  position: absolute;
  top: 15px;
  left: 20px;
  border: 1px solid #eee;
  padding: 16px 12px 12px 12px;
  font-size: 16px;
  max-width: 350px;
  min-width: 250px;
  max-height: 330px;
  overflow: auto;
}

.tooltip::-webkit-scrollbar {
  width: 10px;
  border-radius: 4px;
  background-color: #f9f9fd;
}

.tooltip::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #999999;
}

.tooltip::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.tooltip-wrp {
  border-bottom: 1px solid rgba(10, 11, 46, 0.1);
  margin-bottom: 12px;
}

.tooltip-header {
  margin-bottom: 10px;
  /* border-top: 1px solid rgba(10, 11, 46, 0.1); */
  /* border-bottom: 1px solid rgba(10, 11, 46, 0.1); */
}

.tooltip-center {
  /* padding-bottom: 8px; */
}

.tooltip-center__products {
  margin-bottom: 8px;
}

.custom-circle {
  width: 12px;
  height: 12px;
  background: green;
  position: absolute;
  border-radius: 100%;
  top: 15px;
  left: 20px;
}

.tooltip__close {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 100%;
}

.tooltip__representative-list {
  /* padding-top: 6px; */
  /* width: auto;
    height: auto;
    background: #fff;
    border-radius: 12px;
    position: absolute;
    top: -10px;
    left: 182px;
    border: 1px solid #eee;
    padding: 8px 26px 8px 8px;
    font-size: 16px; */
}

.tooltip-center__count {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.tooltip__representative-item {
  margin-bottom: 8px;
}

.tooltip__active-representative {
  color: #004b94;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 8px;
}

.tooltip-center__link-and-sector {
  margin-bottom: 8px;
}

.tooltip-center__link-and-sector--link {
  color: #004b94;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 8px;
}

.nonRepresentative {
  color: #a0a0a0;
}

.modal__btn {
  margin-left: auto;
}

.container-map {
  padding: 16px;
}

.v-tab {
  color: black !important;
}

.v-tab .v-tab--active {
  color: white !important;
}

</style>
