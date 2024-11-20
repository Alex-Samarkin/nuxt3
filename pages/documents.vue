<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <info-card title="Документация" content="Документы, регулирующие деятельность ИНТЦ ЮНИТИ ПАРК" />
      </v-col>
    </v-row>
    <hrule />
    <v-row>
      <v-col cols="12">
        <document-section title="Нормативные документы">
          <document-link document-name="Устав организации" document-path="/documents/PostPravRF1255.pdf" />
          <document-link document-name="Положение о закупках" document-path="/documents/procurement.pdf" />
        </document-section>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <document-section title="Положения и проекты">
          <document-link document-name="Устав организации" document-path="/documents/PostPravRF1255.pdf" />
          <document-link document-name="Положение о закупках" document-path="/documents/procurement.pdf" />
        </document-section>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <document-section title="Договоры и закупки">
          <document-link document-name="Устав организации" document-path="/documents/PostPravRF1255.pdf" />
          <document-link document-name="Положение о закупках" document-path="/documents/procurement.pdf" />
        </document-section>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
// About page logic can go here
</script>
