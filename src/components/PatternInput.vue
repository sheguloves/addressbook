<script>
  import { Input } from 'element-ui'

  let invalidInput = false

  export default {
    name: 'PatternInput',
    extends: Input,
    props: {
      pattern: String
    },
    computed: {
      patternRegExp() {
        if (this.pattern) {
          return new RegExp(this.pattern)
        } else {
          return null
        }
      }
    },
    methods: {
      handleChange(event) {
        let patternRegExp = this.patternRegExp
        let newValue = event.target.value
        if (newValue && patternRegExp && !patternRegExp.test(newValue)) {
          invalidInput = true
          this.$emit('invalid-input', newValue)
          return
        }
        invalidInput = false
        this.$emit('change', newValue)
      },
      handleBlur(event) {
        if (invalidInput) {
          return
        } else {
          this.focused = false
          this.$emit('blur', event)
          if (this.validateEvent) {
            this.dispatch('ElFormItem', 'el.form.blur', [this.value])
          }
        }
      },
    }
  }
</script>