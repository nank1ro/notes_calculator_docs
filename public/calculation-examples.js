const copyResetTimers = new WeakMap()
const copyOriginalLabels = new WeakMap()

document.addEventListener('click', async (event) => {
  const button = event.target.closest?.('[data-copy-text]')
  if (!button) return

  if (!copyOriginalLabels.has(button)) copyOriginalLabels.set(button, button.textContent)
  const originalLabel = copyOriginalLabels.get(button)
  const pendingReset = copyResetTimers.get(button)
  if (pendingReset) window.clearTimeout(pendingReset)

  try {
    await navigator.clipboard.writeText(button.dataset.copyText)
    button.textContent = 'Copied'
    button.setAttribute('aria-label', 'Calculation inputs copied')
  } catch {
    button.textContent = 'Select inputs to copy'
    button.setAttribute('aria-label', 'Select calculation inputs to copy')
  }

  const resetTimer = window.setTimeout(() => {
    button.textContent = originalLabel
    button.setAttribute('aria-label', 'Copy calculation inputs')
    copyResetTimers.delete(button)
  }, 1600)
  copyResetTimers.set(button, resetTimer)
})
