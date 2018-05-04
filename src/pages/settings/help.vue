<template>
  <div class="help">
    <vx-header :showback="1" @back="back" :title="$t('settings.help')"></vx-header>
    <div class="vx-container">
      <div class="help_cont">
        <vx-cell :title="$t('settings.operationManual')" @link="$router.push({ path: '/settings/book' })"></vx-cell>
        <vx-cell :title="$t('settings.softwareVersion')" :showLink="false" :value="version"></vx-cell>
        <vx-cell :showLink="false" :title="$t('settings.versionInformation')" :value="versionInformation"></vx-cell>
        <vx-cell :showLink="false" :title="$t('settings.about')"></vx-cell>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        version: '1.0.0',
        versionInformation: 'Xi\'an NovaStar Tech Co.,Ltd. All rights reserved'
      };
    },
    methods: {
      back() {
        this.$router.push({ path: '/settings' });
      }
    }
  };
</script>

<style lang="less">
  .help {
      .help_cont {
          margin-top: 25px;
      }
      .vc-cell {
          border-top: 1px solid #4f5054; /*no*/
          &-value {
              margin-right: 20px;
              font-size: 12px; /*no*/
          }

          &:first-child {
              border-top: none;
          }
      }
  }
</style>
