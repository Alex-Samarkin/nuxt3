<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <info-card
          title="Добро пожаловать в ИНТЦ ЮНИТИ ПАРК"
          content="Инновационный научно-технологический центр для развития передовых технологий"
        />
      </v-col>
    </v-row>
    <hrule />
    <v-row>
      <v-col cols="12">
        <info-card
          title="О нас"
          content="ИНТЦ ЮНИТИ ПАРК - это современная площадка для реализации инновационных проектов и развития технологического предпринимательства"
        />
      </v-col>
    </v-row>
    <hrule />
    <v-row>
      <v-col cols="12">
        <image-card
          title="Миссия"
          content="Создание экосистемы для эффективного взаимодействия науки, образования и бизнеса. Мы стремимся к развитию инновационных технологий и поддержке технологического предпринимательства."
          image="/images/mission.webp"
        />
      </v-col>
    </v-row>
    <hrule />
    <v-row>
      <v-col cols="12">
        <image-card
          title="Наши цели"
          content="Развитие передовых технологий, поддержка инновационных проектов и создание благоприятных условий для технологического предпринимательства в регионе."
          image="/images/goals.webp"
          :image-right="true"
        />
      </v-col>
    </v-row>
    <hrule />
    <v-row>
      <v-col cols="12">
        <yandex-map />  
      </v-col>
      
    </v-row>
    
  </v-container>
</template>

<script setup>
// Home page logic can go here
</script>
