<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <info-card 
          title="Резиденты ИНТЦ" 
          content="Инновационные компании и организации, развивающие передовые технологии в ИНТЦ ЮНИТИ ПАРК" 
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <csv-table
          title="Резиденты ИНТЦ"
          csv-path="/data/residents.csv"
          fixed-header
          table-height="700px"
        />
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Статистика резидентов</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Общее количество резидентов: 20</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Действующие резиденты: 15</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Новые резиденты: 5</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Направления деятельности</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Информационные технологии</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Биотехнологии</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Энергетика</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Промышленные технологии</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <csv-table
          title="Проекты резидентов ИНТЦ"
          csv-path="/data/projects.csv"
          fixed-header
          table-height="700px"
        />
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup>
// Projects page logic
</script>
