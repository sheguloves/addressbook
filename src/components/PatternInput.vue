<script>
  import { Input } from 'element-ui'
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
          this.$emit('invalid-input', newValue)
          return
        }
        this.$emit('change', newValue)
      },
    }
  }
</script>