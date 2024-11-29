<template>
  <hrule />
  <div class="tri-column-container">
    
    <div class="column" v-for="(column, index) in columns" :key="index">
      <div class="column-content" :class="{ 'animate': true, [`delay-${index}`]: true }">
        <h3>{{ column.title }}</h3>
        <p>{{ column.text }}</p>
      </div>
      <div v-if="index < 2" class="divider"></div>
      
    </div>
    
  </div>
  <hrule />
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => ([
      {
        title: 'Column One',
        text: 'First column content goes here. Add your text to describe the first topic.'
      },
      {
        title: 'Column Two',
        text: 'Second column content goes here. Add your text to describe the second topic.'
      },
      {
        title: 'Column Three',
        text: 'Third column content goes here. Add your text to describe the third topic.'
      }
    ])
  }
})
</script>

<style scoped>
.tri-column-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 0;
  gap: 2rem;
}

.column {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
}

.column-content {
  opacity: 0;
  transform: translateY(20px);
  padding: 1rem;
}

.column-content h3 {
  margin-bottom: 1rem;
  color: var(--v-primary-base, #1976d2);
  font-size: 1.5rem;
}

.column-content p {
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
}

.divider {
  width: 1px;
  background: rgba(0, 0, 0, 0.12);
  position: absolute;
  right: -1rem;
  top: 10%;
  height: 80%;
}

/* Animation classes */
.animate {
  animation: slideUp 0.6s ease-out forwards;
}

.delay-0 {
  animation-delay: 0s;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .tri-column-container {
    flex-direction: column;
    gap: 1rem;
  }

  .divider {
    width: 80%;
    height: 1px;
    position: absolute;
    bottom: -0.5rem;
    left: 10%;
    top: auto;
    right: auto;
  }

  .column {
    padding-bottom: 1rem;
  }
}
</style>
