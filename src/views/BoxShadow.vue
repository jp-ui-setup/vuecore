<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
</script>

<template>
  <div class="spread-shadow">card-3d Shadows</div>
  <div class="card">Layered Shadows</div>
  <div class="soft-shadow">soft-shadow Shadows</div>
  <div class="card2">
    2. Inset Shadows

    <button class="button">get started</button>
  </div>

  <h1 class="title">Hover over the cards</h1>

  <div id="app" class="container">
    <CardComponent
      data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
    >
      <template v-slot:header>
        <h1>Canyons</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </CardComponent>
    <CardComponent
      data-image="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
    >
      <template v-slot:header>
        <h1>Beaches</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </CardComponent>
    <CardComponent
      data-image="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
    >
      <template v-slot:header>
        <h1>Trees</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </CardComponent>
    <CardComponent
      data-image="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop="
    >
      <template v-slot:header>
        <h1>Lakes</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </CardComponent>
  </div>
</template>

<style scoped>
.card2 {
  width: 250px;
  height: 250px;
  background-color: #ffffff;
  box-shadow:
    inset 0 2px 5px rgba(0, 0, 0, 0.1),
    inset 0 -1px 5px rgba(0, 0, 0, 0.05);
}
/* Glowing shadow effect */
.button {
  padding: 15px 30px;
  background-color: #8e44ad;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(142, 68, 173, 0.8); /* Glowing purple */
  transition: all 0.3s ease;
}

.button:hover {
  box-shadow: 0 0 30px rgba(142, 68, 173, 1); /* Intense glow on hover */
}
/* Soft and natural box shadow */
.soft-shadow {
  width: 250px;
  height: 250px;
  background-color: #2ecc71;
  box-shadow:
    rgba(255, 255, 255, 0.2) 0 0 40px 5px,
    rgba(255, 255, 255, 1) 0 0 0 1px,
    rgba(0, 0, 0, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset white 0 0 0 6px;
}
/* 3D shadow effect */
.card-3d {
  width: 250px;
  height: 250px;
  background-color: #f39c12;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    /* Upper shadow */ 0 10px 15px rgba(0, 0, 0, 0.15),
    /* Lower shadow */ 0 20px 30px rgba(0, 0, 0, 0.2); /* Deep shadow */
}
/* Shadow with spread radius */
.spread-shadow {
  width: 250px;
  height: 250px;
  background-color: #16a085;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.2); /* Spread out shadow */
}
.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
