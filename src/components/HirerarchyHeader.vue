<template>
  <thead>
    <tr v-for="(row, index) in rows" :key="index">
      <th v-for="column in row" :key="column.label" :style="{'width': column.width + 'px' || ''}" :colspan="column.colSpan" :rowspan="column.rowSpan" @click="onHeaderClick(column)">
        <input v-if="column.type === 'selection'" type="checkbox" @change="onCheck($event)" :checked="allSelected"/>
        <div v-else :class="getHeaderClass(column)">
          {{ $t(column.label) }}
          <span class="caret-wrapper" v-if="sortable ? sortable(column) : false">
            <i class="sort-caret ascending"></i>
            <i class="sort-caret descending"></i>
          </span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>

  import _ from 'lodash'
  import { convertToRows } from '../util'

  export default {
    name: "HierarchyHeader",
    props: {
      columns: Array,
      allSelected: Boolean,
      order: '',
      orderColumn: Object,
      sortable: Function
    },
    computed: {
      rows() {
        let rows = convertToRows(_.cloneDeep(this.columns))
        return rows
      }
    },
    data() {
      return {
      }
    },
    methods: {
      onHeaderClick(column) {
        this.$emit('header-click', column)
      },
      onCheck(event) {
        this.$emit("head-check", event.target.checked)
      },
      getHeaderClass(column) {
        let clazz = ''
        if (this.orderColumn && this.orderColumn.field === column.field && this.order) {
          clazz = this.order
        }
        return clazz
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table {
    thead {
      th {
        text-align: center;
        vertical-align: middle;

        .caret-wrapper {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          height: 34px;
          width: 24px;
          vertical-align: middle;
          cursor: pointer;
          overflow: initial;
          position: relative;
        }

        .sort-caret {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          position: absolute;
          left: 7px;
        }

        .sort-caret.ascending {
          border-bottom-color: #c0c4cc;
          top: 5px;
        }

        .sort-caret.descending {
          border-top-color: #c0c4cc;
          bottom: 7px;
        }
        .desc {
          .sort-caret.descending {
            border-top-color: #409eff;
          }
        }
        .asc {
          .sort-caret.ascending {
            border-bottom-color: #409eff;
          }
        }
      }

    }
  }
</style>
