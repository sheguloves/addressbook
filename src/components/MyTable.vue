<template>
  <table class="table table-bordered table-hover">
    <hierarchy-header :columns="columns" @head-check="onHeaderCheck" :all-selected="allSelected" @header-click="onHeaderClick" :order="order" :order-column="orderColumn" :sortable="isColumnSortable"></hierarchy-header>
    <table-body :columns="columns" :data-source="tableData" @data-check="onDataCheck" :selection="selection" @edit-complete="onEditComplete" @cell-dbclick="onCellDBClick" :editing-cell="editingCell" :row-class="rowClass"></table-body>
  </table>
</template>

<script>

  import _ from 'lodash'
  import HierarchyHeader from './HirerarchyHeader'
  import TableBody from './TableBody'

  const ORDER_OPTIONS = ['asc', 'desc', '']

  let originData = null
  export default {
    name: 'MyTable',
    components: {
      'hierarchy-header': HierarchyHeader,
      'table-body': TableBody,
    },
    props: {
      columns: Array,
      data: Array,
      rowClass: [String, Function]
    },
    data() {
      return {
        selection: [],
        editingCell: null,
        orderColumn: null,
        order: ''
      }
    },
    computed: {
      allSelected() {
        return this.data && this.data.length > 0 && this.selection.length === this.data.length
      },
      tableData() {
        let order = this.order
        let orderColumn = this.orderColumn
        if (this.order && orderColumn) {
          return _.orderBy(this.data, (item) => {
            return _.get(item, orderColumn.field, '')
          }, [this.order])
        } else {
          return this.data
        }
      }
    },
    watch: {
      data(val) {
        let selection = this.selection
        if (val && selection.length > 0) {
          for (let i = selection.length - 1; i >= 0; i--) {
            if (val.indexOf(selection[i]) === -1) {
              selection.splice(i, 1)
            }
          }
        }
      },
    },
    methods: {
      isColumnSortable(column) {
        return column.sortable !== false && (!column.children || column.children.length < 1)
      },
      onHeaderCheck(checked) {
        if (checked) {
          this.selection = _.slice(this.data)
        } else {
          this.selection = []
        }
        this.$emit('selection-change', this.selection)
      },
      onDataCheck({data, checked}) {
        if (checked) {
          this.selection.push(data)
        } else {
          let index = _.indexOf(this.selection, data)
          if (index > -1) {
            this.selection.splice(index, 1)
          }
        }
        this.$emit('selection-change', this.selection)
      },
      onEditComplete(data) {
        if (!_.isEqual(data, originData)) {
          this.$emit('data-change', {
            newValue: data,
            oldValue: originData
          })
        }
        originData = null
        this.editingCell = null
      },
      onCellDBClick({data, column}) {
        originData = _.cloneDeep(data)
        this.editingCell = {
          data,
          column
        }
      },
      toggleOrder(column) {
        let order = this.order
        if (this.orderColumn === column) {
          const index = ORDER_OPTIONS.indexOf(order || null)
          order = ORDER_OPTIONS[index > ORDER_OPTIONS.length - 2 ? 0 : index + 1]
        } else {
          order = ORDER_OPTIONS[0]
        }
        this.order = order
        this.orderColumn = column
      },
      onHeaderClick(column) {
        if (this.isColumnSortable(column)) {
          this.toggleOrder(column)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    table-layout: fixed;
  }

</style>
