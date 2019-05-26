<template>
  <el-table-column :label="$t(column.label)" :prop="column.field" :sortable="column.sortable !== false" :width="column.width">
    <template v-if="column.children && column.children.length > 0">
      <hierarchy-column v-for="item in column.children" :column="item" :key="item.field" @cell-dbclick="onDBClick" :editing-cell="editingCell" @cell-input-blur="onInputBlur">
      </hierarchy-column>
    </template>
    <template slot-scope="scope">
      <div @dblclick="onDBClick(scope.row, column)">
        <div v-if="isEditing(scope.row, column)">
          <pattern-input v-focus v-model="scope.row[column.field]" :pattern="column.pattern" @blur="onInputBlur(scope.row)" @invalid-input="onInvalidInput"></pattern-input>
        </div>
        <div v-else :title="getValue(scope.row, column)">
          {{ getValue(scope.row, column) }}
        </div>
      </div>
    </template>
  </el-table-column>
</template>

<script>

  import _ from 'lodash'
  import PatternInput from './PatternInput'

  export default {
    name: "HierarchyColumn",
    components: {
      'pattern-input': PatternInput,
    },
    props: {
      column: Object,
      editingCell: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          if (el.tagName === "INPUT") {
            el.focus()
          } else {
            let input = el.querySelector("input")
            if (input) {
              input.focus()
            }
          }
        }
      }
    },
    methods: {
      isEditing(data, column) {
        return this.editingCell && this.editingCell.column === column && this.editingCell.data === data
      },
      getValue(data, column) {
        return _.get(data, column.field, '')
      },
      onDBClick(data, column) {
        this.$emit('cell-dbclick', data, column)
      },
      onInputBlur(data) {
        this.$emit('cell-input-blur', data)
      },
      onInvalidInput(invalidValue) {
        this.$message.error({
          message: this.$t('invalidCellPhone', {
            phoneNumber: invalidValue
          }),
          duration: 5000
        })
      }
    }
  }
</script>