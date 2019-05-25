<template>
  <el-dialog id="updateDialog" :title="$t('update')" :visible="true" width="800px" append-to-body :before-close="onCancel">
    <div v-if="hasNews">
      <h4>{{ $t('news') }}</h4>
      <ul>
        <li v-for="(addr, ind) in news" :key="ind">{{ getAddressStr(addr) }}</li>
      </ul>
    </div>
    <div v-if="hasModifies">
      <h4>{{ $t('modified') }}</h4>
      <ul>
        <li v-for="addr in modifies" :key="addr.id">{{ getAddressStr(addr) }}</li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="onSubmit">{{ $t('submit') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    name: "UpdateDialog",
    props: {
      news: Array,
      modifies: Array
    },
    data() {
      return {
      }
    },
    computed: {
      hasNews() {
        return this.news && this.news.length > 0
      },
      hasModifies() {
        return this.modifies && this.modifies.length > 0
      }
    },
    methods: {
      getAddressStr(address) {
        return `Name: ${address.name}, Location: ${address.location}, Office: ${address.office}, Office Phone: ${address.officePhone}, Cell Phone: ${address.cellPhone}`
      },
      onCancel() {
        this.$emit('update-cancel')
      },
      onSubmit() {
        this.$emit('update-submit')
      }
    }
  }
</script>
<style>
  #updateDialog .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>