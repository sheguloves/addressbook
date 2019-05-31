export default [{
  width: 40,
  type: 'selection'
}, {
  label: 'id',
  field: 'id',
  width: 70,
  editable: false
}, {
  label: 'name',
  field: 'name',
  width: 130,
}, {
  label: 'location',
  field: 'location'
}, {
  label: 'office',
  field: 'office',
}, {
  label: 'phone',
  field: '',
  sortable: false,
  children: [{
    label: 'office',
    field: 'officePhone',
  }, {
    label: 'cell',
    field: 'cellPhone',
    pattern: `^\\d{3}-\\d{3}-\\d{3}$`
  }]
}]