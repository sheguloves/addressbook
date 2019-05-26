<template>
  <div id="app">
    <h2>{{ $t('pageTitle') }}</h2>
    <el-row class="row">
      <el-select v-model="$i18n.locale">
        <el-option v-for="item in langs" :key="item" :label="$t(item)" :value="item">
        </el-option>
      </el-select>
    </el-row>
    <section>
      <el-table :data="addresses" @selection-change="onSelectionChange" :row-class-name="getRowClass">
        <el-table-column type="selection" width="55"></el-table-column>
        <hierarchy-column v-for="column in columns" :key="column.field" :column="column" :editing-cell="editingCell" @cell-dbclick="onCellDBclick" @cell-input-blur="onCellInputBlur"></hierarchy-column>
      </el-table>
    </section>
    <div class="footer">
      <div>
        <el-button type="danger" @click="onDeleteClick" :disabled="!deletable">{{ $t('delete') }}</el-button>
      </div>
      <div>
        <el-button type="primary" @click="showUpdateDialog = true" :disabled="!updatable">{{ $t('update') }}</el-button>
        <el-button type="primary" @click="onAddClick">{{ $t('add') }}</el-button>
      </div>
    </div>
    <update-dialog v-if="showUpdateDialog" :news="newAddresses" :modifies="modifiedAddresses" @update-cancel="showUpdateDialog = false" @update-submit="onUpdateSubmit"></update-dialog>
  </div>
</template>

<script>

  import _ from 'lodash'
  import HierarchyColumn from './components/HierarchyColumn'
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
      'hierarchy-column': HierarchyColumn,
      'update-dialog': UpdateDialog,
    },
    data() {
      return {
        columns: columns,
        addresses: mockData,
        selection: [],
        editingCell: null,
        editingAddressMap: {},
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
        let editingAddressMap = this.editingAddressMap
        let addressIds = _.keys(editingAddressMap)
        return _.reduce(addressIds, (modifies, id) => {
          let current = editingAddressMap[id] && editingAddressMap[id].current
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
          let editingAddressMap = this.editingAddressMap
          for (let i = addresses.length - 1; i >= 0; i--) {
            let address = addresses[i]
            if (this.selection.indexOf(address) !== -1) {
              addresses.splice(i, 1)
              if (address.id) {
                delete editingAddressMap[address.id]
              }
            }
          }
          this.editingAddressMap = {
            ...editingAddressMap
          }
          this.$message({
            message: this.$t('deleteSuccess'),
            type: 'success'
          })
        }).catch(() => {
        })
      },
      onSelectionChange(val) {
        this.selection = val
      },
      onCellDBclick(address, column) {
        if (column.editable !== false) {
          let editingCell = {
            data: address,
            column: column
          }
          let addressId = address.id
          if (addressId) {
            this.editingAddressMap[addressId] = this.editingAddressMap[addressId] || {
              origin: _.cloneDeep(address)
            }
          }
          this.editingCell = editingCell
        }
      },
      onCellInputBlur(modifiedAddress) {
        let addressId = modifiedAddress.id
        if (addressId) {
          let editingAddressMap = this.editingAddressMap
          let editingAddress = editingAddressMap[addressId]
          if (_.isEqual(editingAddress.origin, modifiedAddress)) {
            delete editingAddressMap[addressId]
          } else {
            editingAddress.current = modifiedAddress
          }
          this.editingAddressMap = {
            ...editingAddressMap
          }
        }
        this.editingCell = null
      },
      getRowClass({row}) {
        let clazz = ''
        let addressId = row && row.id
        if (addressId) {
          let editingAddress = this.editingAddressMap[addressId]
          clazz = editingAddress && editingAddress.current && !_.isEqual(editingAddress.origin, editingAddress.current) ? 'modified' : ''
        } else {
          clazz = 'new'
        }
        return clazz
      },
      onUpdateSubmit() {
        _.forEach(this.newAddresses, (item) => {
          item.id = generateId()
        })
        this.editingAddressMap = {}
        this.showUpdateDialog = false
        this.$message({
          message: this.$t('updateSuccess'),
          type: 'success'
        })
      }
    }
  }
</script>

<style>
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
}

#app .row {
  padding: 10px 10px;
  text-align: right;
}
#app .footer {
   display: flex;
   justify-content: space-between;
   padding-top: 20px;

}

#app .modified {
  color: #e96900;
}

#app .new {
  color: #42b983;
}

#app .el-table .cell,
#app .el-table .cell > div {
  height: 100%;
  width: 100%;
  line-height: 36px;
}

#app .el-table--small {
  font-size: 13px;
}

#app .el-table--small td {
  padding: 0;
  height: 36px;
}

#app .el-input.el-input--small {
  margin: 0 -10px;
  width: calc(100% + 20px);
}

#app .el-input .el-input__inner {
  padding: 0 8px;
}
</style>
