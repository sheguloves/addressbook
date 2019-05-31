<template>
  <tbody class="my-tbody">
    <tr v-for="(item, ind) in dataSource" :key="ind" :class="getRowClass(item)">
      <td v-for="column in dataColumns" :key="column.field + column.label" @dblclick="onDBClick(item, column)">
        <input v-if="column.type === 'selection'" type="checkbox" @change="onCheck(item, $event)" :checked="selection.indexOf(item) > -1"/>
        <div v-else-if="isEditing(item, column)" class="input-container">
          <pattern-input :class="{'error': invalidValue}" ref="input" v-focus v-model="item[column.field]" :pattern="column.pattern" @change="onChange(item)" @invalid-input="onInvalidInput"></pattern-input>
        </div>
        <div v-else class="cell">
          {{ getValue(item, column) }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>

  import _ from 'lodash'
  import { getAllDataColumns } from '../util'
  import PatternInput from './PatternInput'

  export default {
    name: "TableBody",
    components: {
      'pattern-input': PatternInput
    },
    props: {
      columns: Array,
      dataSource: Array,
      editingCell: Object,
      selection: {
        type: Array,
        default: function() {
          return []
        }
      },
      rowClass: [String, Function]
    },
    data() {
      return {
        editingData: null,
        editingColumn: null,
        invalidValue: false
      }
    },
    computed: {
      dataColumns() {
        return getAllDataColumns(this.columns)
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
      getRowClass(data) {
        let rowClass = this.rowClass
        if (typeof rowClass === 'string') {
          return rowClass
        } else if (typeof rowClass === 'function') {
          return rowClass.call(null, data)
        }
      },
      onCheck(data, event) {
        this.$emit('data-check', {
          data: data,
          checked: event.target.checked
        })
      },
      getValue(data, column) {
        return _.get(data, column.field)
      },
      onDBClick(data, column) {
        if (this.invalidValue) {
          return
        }
        this.$emit('cell-dbclick', {
          data,
          column
        })
      },
      isEditing(data, column) {
        return this.editingCell && this.editingCell.column === column && this.editingCell.data === data
      },
      onChange(data) {
        this.invalidValue = false
        this.$emit('edit-complete', data)
      },
      onInvalidInput(invalidValue) {
        this.$message.error({
          message: this.$t('invalidCellPhone', {
            phoneNumber: invalidValue
          }),
          duration: 5000
        })
        this.invalidValue = true
        this.$refs.input[0].focus()
      }
    }
  }
</script>
<style lang="scss">
  tbody.my-tbody {
    tr {
      &.modified {
        color: #e96900;
      }
      &.new {
        color: #42b983;
      }

      td {
        .input-container {
          margin: -7px 0;
          .error {
            border: red;
            input.el-input__inner {
              border-color: red;
            }
            input.el-input__inner:focus {
              border-color: red;
            }
          }
        }
        .cell {
          word-break: break-all;
        }
      }
    }
  }
</style>
