const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    
    const locator = await page.getByText('log into application')
    const username = await page.getByText('username')
    const usernameTextbox = await page.getByRole('textbox', { name: /username/i })
    const password = await page.getByText('password')
    const passwordTextbox = await page.getByRole('textbox', { name: /password/i })
    const button = await page.getByRole('button', { name: 'login' })
    
    await expect(locator).toBeVisible()
    await expect(username).toBeVisible()
    await expect(usernameTextbox).toBeVisible()
    await expect(password).toBeVisible()
    await expect(passwordTextbox).toBeVisible()
    await expect(button).toBeVisible()
  })
})

describe('Login', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name : "Test User",
                username : "testUser",
                password : "test2024"
            }
          })
        await page.goto('http://localhost:5173')
      })
    test('succeeds with correct credentials', async ({ page }) => {

        await page.getByRole('textbox').first().fill('testUser')
        await page.getByRole('textbox').last().fill('test2024')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {

        await page.getByRole('textbox').first().fill('nuell')
        await page.getByRole('textbox').last().fill('testtt')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })


describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name : "Test User",
                username : "testUser",
                password : "test2024"
            }
          })
        await page.goto('http://localhost:5173')

        await page.getByRole('textbox').first().fill('testUser')
        await page.getByRole('textbox').last().fill('test2024')
        await page.getByRole('button', { name: 'login' }).click()

        await page.getByRole('button', { name: 'create new blog' }).click()

    })

    test('a new blog can be created', async ({ page }) => {

        await page.getByTestId('title').fill('A test blog')
        await page.getByTestId('author').fill('Emmanuel Ikwunna')
        await page.getByTestId('url').fill('test.com')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('A test blog Emmanuel Ikwunna')).toBeVisible()

    })

    test('the blog can be liked.', async ({ page }) => {

        await page.getByTestId('title').fill('Like test blog')
        await page.getByTestId('author').fill('Emmanuel Ikwunna')
        await page.getByTestId('url').fill('like.com')

        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the blog can be deleted by the creator', async ({ page }) => {

        await page.getByTestId('title').fill('Delete test blog')
        await page.getByTestId('author').fill('Emmanuel Ikwunna')
        await page.getByTestId('url').fill('delete.com')
        await page.getByRole('button', { name: 'create' }).click()
    
        await page.getByRole('button', { name: 'show' }).click()

        page.on('dialog', async dialog => {
            await dialog.accept()
        });
        await page.getByRole('button', { name: 'remove' }).click()
    
        await expect(page.getByText('Delete test blog Emmanuel Ikwunna')).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {

        await page.getByTestId('title').fill('Delete button visibility test blog')
        await page.getByTestId('author').fill('Emmanuel Ikwunna')
        await page.getByTestId('url').fill('visibility.com')
        await page.getByRole('button', { name: 'create' }).click()
    
        await page.getByRole('button', { name: 'logout' }).click()
    
        await request.post('http://localhost:3003/api/users', {
            data: {
                name : "New User",
                username : "newUser",
                password : "newpassword"
            }
        })
    
        await page.getByRole('textbox').first().fill('newUser')
        await page.getByRole('textbox').last().fill('newpassword')
        await page.getByRole('button', { name: 'login' }).click()
    
        await page.getByRole('button', { name: 'show' }).click()
    
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })


    test('blogs are ordered according to the likes', async ({ page }) => {

        await page.getByTestId('title').fill('Blog 1')
        await page.getByTestId('author').fill('Author 1')
        await page.getByTestId('url').fill('blog1.com')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'show' }).click() 
        await page.getByRole('button', { name: 'like' }).nth(0).click() 
    
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('Blog 2')
        await page.getByTestId('author').fill('Author 2')
        await page.getByTestId('url').fill('blog2.com')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'like' }).nth(1).click() 
        await page.getByRole('button', { name: 'like' }).nth(1).click()
        
        await page.waitForTimeout(1000)

        const blogElements = await page.getByTestId('blog').all()
        const blogTitles = await Promise.all(blogElements.map(async blog => await blog.textContent()))
    
        expect(blogTitles[0]).toContain('Blog 2')
        expect(blogTitles[1]).toContain('Blog 1')
    })
      
})