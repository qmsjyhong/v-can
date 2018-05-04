<template>
  <div class="book">
    <vx-header :showback="1" @back="back" :title="$t('settings.operationManual')"></vx-header>
    <div class="vx-container">
      操作手册
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      back() {
        this.$router.push({ path: '/settings/help' });
      }
    }
  };
</script>
