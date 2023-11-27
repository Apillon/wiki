<template>
  <div class="code-div">
    <slot></slot>
    <button class="copyButton" @click="copyText">Copy URL</button>
  </div>
</template>

<script>
export default {
  methods: {
    copyText() {
      // Get the text content of the slot
      let slotText = '';
      this.$slots.default().forEach(vnode => {
        if (vnode.children) { slotText += vnode.children; }
      });
      const methodTypes = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
      methodTypes.forEach((t) => slotText = slotText.replace(t, ''))
      // Copy the text to the clipboard
      navigator.clipboard.writeText(slotText.trim()).then(() => {
        // Get the button and update its text
        const button = this.$el.querySelector('.copyButton');
        const originalText = button.innerText;
        button.innerText = 'URL copied!';

        // After 1 second, revert the button text back to original
        setTimeout(() => { button.innerText = originalText; }, 1000);
      }).catch(err => {
        console.error('Error in copying text: ', err);
      });
    }
  }
}
</script>
<style scoped>
  .code-div {
    font-size: 1.15rem;
    font-weight: 300;
    line-height: 1.25;
    overflow-wrap: break-word;
    background: #121415;
    padding: 15px;
    border: 1px solid rgb(87, 85, 85);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyButton {
    background-color: var(--c-brand);
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 15px;
    padding: 8px 15px;
  }
</style>
