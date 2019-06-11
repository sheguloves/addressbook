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
  placeholder: 'xxx'
}, {
  label: 'location',
  field: 'location',
  placeholder: 'xxx'
}, {
  label: 'office',
  field: 'office',
  placeholder: 'xxx'
}, {
  label: 'phone',
  field: '',
  sortable: false,
  children: [{
    label: 'office',
    field: 'officePhone',
    placeholder: 'x00000'
  }, {
    label: 'cell',
    field: 'cellPhone',
    pattern: `^\\d{3}-\\d{3}-\\d{3}$`,
    placeholder: '000-000-000'
  }]
}]