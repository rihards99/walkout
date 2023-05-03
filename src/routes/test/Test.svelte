<script>
  export let testProp = "";
</script>

<div>
  SOMETHING <span class="testClass">{testProp}</span>
</div>

<style>
  .testClass {
    color: red;
  }
</style>