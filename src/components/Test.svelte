<script>
  let test = false
  export function change() {
    test = true;
  }
</script>

<p>{test}</p>
{#if test}
  <slot></slot>
{/if}
