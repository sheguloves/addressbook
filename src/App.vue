<template>
  <div id="app">
    <h2>{{ $t('pageTitle') }}</h2>
    <div class="toolbar">
      <select class="form-control" v-model="$i18n.locale">
        <option v-for="item in langs" :key="item" :value="item">{{ $t(item) }}</option>
      </select>
    </div>
    <section>
      <my-table :data="addresses" :columns="columns" @selection-change="onSelectionChange" @data-change="onDataChange" :row-class="getRowClass"></my-table>
    </section>
    <div class="footer">
      <div>
        <button type="button" class="btn btn-danger" @click="onDeleteClick" :disabled="!deletable">{{ $t('delete') }}</button>
      </div>
      <div>
        <button type="button" class="btn btn-primary" @click="showUpdateDialog = true" :disabled="!updatable">{{ $t('update') }}</button>
        <button type="button" class="btn btn-primary" @click="onAddClick">{{ $t('add') }}</button>
      </div>
    </div>
    <update-dialog v-if="showUpdateDialog" :news="newAddresses" :modifies="modifiedAddresses" @update-cancel="showUpdateDialog = false" @update-submit="onUpdateSubmit"></update-dialog>
  </div>
</template>

<script>

  import _ from 'lodash'
  import MyTable from './components/MyTable'
  import UpdateDialog from './components/UpdateDialog'
  import columns from './Column'

  const mockData = [{
    id: 10,
    name: 'Khali Zhang',
    location: 'ShangHai',
    office: 'C-103',
    officePhone: 'x55588',
    cellPhone: '654-323-332'
  }]

  const ADDRESS_TEMPLATE = {
    id: '',
    name: 'xxx',
    location: 'xxx',
    office: 'xxx',
    officePhone: 'x00000',
    cellPhone: '000-000-000'
  }

  const IDMAP = {
    10: 1
  }
  const generateId = function() {
    let i = 1
    while (IDMAP[i]) {
      i++
    }
    IDMAP[i] = 1
    return i
  }

  export default {
    name: 'App',
    components: {
      'update-dialog': UpdateDialog,
      'my-table': MyTable,
    },
    data() {
      return {
        columns: columns,
        addresses: mockData,
        selection: [],
        editingCell: null,
        modifiedAddressMap: {},
        showUpdateDialog: false,
        langs: ['en', 'zh']
      }
    },
    computed: {
      newAddresses() {
        return _.filter(this.addresses, (address) => {
          return !address.id
        })
      },
      modifiedAddresses() {
        let modifiedAddressMap = this.modifiedAddressMap
        let addressIds = _.keys(modifiedAddressMap)
        return _.reduce(addressIds, (modifies, id) => {
          let current = modifiedAddressMap[id] && modifiedAddressMap[id].current
          if (current) {
            modifies.push(current)
          }
          return modifies
        }, [])
      },
      deletable() {
        return this.selection && this.selection.length > 0
      },
      updatable() {
        return this.modifiedAddresses.length > 0 || this.newAddresses.length > 0
      },
    },
    methods: {
      onAddClick() {
        this.addresses.push(_.cloneDeep(ADDRESS_TEMPLATE))
      },
      onDeleteClick() {
        this.$confirm(this.$t('deleteConfirmMessage'), this.$t('notification'), {
          confirmButtonText: this.$t('submit'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }).then(() => {
          let addresses = this.addresses
          let modifiedAddressMap = this.modifiedAddressMap
          for (let i = addresses.length - 1; i >= 0; i--) {
            let address = addresses[i]
            if (this.selection.indexOf(address) !== -1) {
              addresses.splice(i, 1)
              if (address.id) {
                delete modifiedAddressMap[address.id]
              }
            }
          }
          this.modifiedAddressMap = {
            ...modifiedAddressMap
          }
          this.$message({
            message: this.$t('deleteSuccess'),
            type: 'success'
          })
          this.selection = []
        }).catch(() => {
        })
      },
      onSelectionChange(val) {
        this.selection = val
      },
      onDataChange({newValue, oldValue}) {
        let addressId = newValue.id
        if (addressId) {
          let modifiedAddressMap = this.modifiedAddressMap
          if (modifiedAddressMap[addressId]) {
            let modifiedAddress = modifiedAddressMap[addressId]
            if (_.isEqual(modifiedAddress.origin, newValue)) {
              delete modifiedAddressMap[addressId]
            } else {
              modifiedAddress.current = newValue
            }
          } else {
            modifiedAddressMap[addressId] = {
              origin: oldValue,
              current: newValue
            }
          }
          this.modifiedAddressMap = {
            ...modifiedAddressMap
          }
        }
      },
      onUpdateSubmit() {
        _.forEach(this.newAddresses, (item) => {
          item.id = generateId()
        })
        this.modifiedAddressMap = {}
        this.showUpdateDialog = false
        this.$message({
          message: this.$t('updateSuccess'),
          type: 'success'
        })
      },
      getRowClass(data) {
        let clazz = ''
        let dataId = data && data.id
        if (dataId) {
          let index = _.findIndex(this.modifiedAddresses, (address) => {
            return address.id === dataId
          })
          clazz = index > -1 ? 'modified' : ''
        } else {
          clazz = 'new'
        }
        return clazz
      },
    }
  }
</script>

<style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 1000px;
  margin: auto;
  font-size: 13px;
  .toolbar {
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-end;

    .form-control {
      width: 150px;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }

  .btn {
    outline: none;
  }
}

</style>
