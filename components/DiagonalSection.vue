<template>
  <div class="diagonal-section" :class="{ 'reverse': reverse }">
    <div class="content">
      <div class="text-content">
        <slot name="text">
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </slot>
      </div>
      <div class="image-content">
        <img :src="imageUrl" :alt="imageAlt">
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Section Title'
  },
  description: {
    type: String,
    default: 'Section description goes here'
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Section image'
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.diagonal-section {
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
}

.diagonal-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  transform: skewY(-5deg);
  transform-origin: 100%;
  z-index: -1;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.text-content {
  flex: 1;
}

.image-content {
  flex: 1;
}

.image-content img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reverse .content {
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .reverse .content {
    flex-direction: column;
  }
}
</style>
