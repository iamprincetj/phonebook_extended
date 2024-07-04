// @ts-check
// @ts-ignore
const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Phone book', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const content = await page.getByText('Phonebook')
    const addNew = await page.getByText('Add a new')
    await expect(content).toBeVisible()
    await expect(addNew).toBeVisible()
  })
})
