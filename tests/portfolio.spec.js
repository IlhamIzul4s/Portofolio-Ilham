import { test, expect } from '@playwright/test';
test('desktop interactions and assets', async ({page}) => {
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.setViewportSize({width:1440,height:1000}); await page.goto('/');
  await expect(page.locator('h1')).toContainText('Organized minds.');
  await page.screenshot({path:'test-results/desktop.png'});
  await expect(page.locator('audio')).toHaveJSProperty('paused',true);
  await page.getByRole('button',{name:'Toggle theme'}).click();
  await expect(page.locator('body')).toHaveClass('light');
  await page.reload(); await expect(page.locator('body')).toHaveClass('light');
  await page.getByRole('button',{name:'Toggle theme'}).click();
  await page.locator('#projects').getByRole('button',{name:'Administration',exact:true}).click();
  await expect(page.locator('#projects').getByRole('button',{name:'View Details'})).toHaveCount(2);
  await page.locator('#projects').getByRole('button',{name:'View Details'}).first().click();
  await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.locator('#projects').getByRole('button',{name:'Information Systems',exact:true}).click();
  await expect(page.locator('#projects')).toContainText('Belum ada proyek');
  await page.locator('#experience').getByRole('button',{name:'View Documentation'}).first().click();
  await expect(page.getByRole('dialog')).toContainText('Muntaz Production');
  await expect(page.getByRole('dialog')).toContainText('1 / 13 foto');
  const documentationPhoto = page.getByRole('dialog').locator('.experience-photo');
  await expect.poll(() => documentationPhoto.evaluate(img => img.complete && img.naturalWidth > 0)).toBeTruthy();
  await page.getByRole('button', { name: 'Dokumentasi berikutnya' }).click();
  await expect(page.getByRole('dialog')).toContainText('2 / 13 foto');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog')).toContainText('1 / 13 foto');
  await page.getByRole('button', { name: 'Lihat dokumentasi foto 13', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('13 / 13 foto');
  await expect.poll(() => documentationPhoto.evaluate(img => img.complete && img.naturalWidth > 0)).toBeTruthy();
  await page.getByRole('button',{name:'Tutup dialog'}).click();
  for (const company of ['MIS Panimbang', 'Panada Coffee']) {
    const card = page.getByRole('button', { name: `Lihat pengalaman di ${company}`, exact: true });
    await expect.poll(() => card.locator('img').evaluate(img => img.complete && img.naturalWidth > 0)).toBeTruthy();
    await card.click();
    await expect(page.getByRole('dialog')).toContainText('1 / 6 foto');
    await expect.poll(() => page.getByRole('dialog').locator('.experience-photo').evaluate(img => img.complete && img.naturalWidth > 0)).toBeTruthy();
    await page.getByRole('button', { name: 'Tutup dialog' }).click();
  }
  await expect(page.locator('#gallery')).toHaveCount(0);
  await expect(page.locator('a[href="#gallery"]')).toHaveCount(0);
  const software = page.locator('#skills article').filter({has:page.getByRole('heading',{name:'Software Skills',exact:true})});
  for (const name of ['Visual Studio Code','Google Antigravity','ChatGPT','Claude','CapCut','Canva','Figma']) { await expect(software.getByText(name,{exact:true})).toBeVisible(); }
  await page.getByRole('button',{name:'Buka pemutar musik'}).click();
  await page.getByRole('button',{name:'Putar musik'}).click();
  await expect(page.locator('audio')).toHaveJSProperty('paused',false);
  await expect.poll(()=>page.locator('audio').evaluate(a=>a.currentTime)).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Lagu berikutnya'}).click();
  await expect(page.locator('audio')).toHaveAttribute('src','/music/after-hours.wav');
  await expect(page.locator('audio')).toHaveJSProperty('paused',false);
  await page.getByRole('button',{name:'Jeda',exact:true}).click();
  await expect(page.locator('audio')).toHaveJSProperty('paused',true);
  const pdf=await page.request.get('/cv/CV_Ilham_Izulhaq.pdf'); expect(pdf.ok()).toBeTruthy();
  expect((await pdf.body()).subarray(0,4).toString()).toBe('%PDF');
  await expect(page.locator('#contact form')).toContainText('membuka draf');
  expect(errors).toEqual([]);
});
test('mobile navigation and overflow',async({page})=>{
  await page.setViewportSize({width:375,height:812}); await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('button',{name:'Toggle menu'}).click();
  await expect(page.getByRole('button',{name:'Toggle menu'})).toHaveAttribute('aria-expanded','true');
  await page.locator('nav').first().getByRole('link',{name:'Contact',exact:true}).click();
  await expect(page.getByRole('button',{name:'Toggle menu'})).toHaveAttribute('aria-expanded','false');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.locator('nav').first().getByRole('link',{name:'ILHAM',exact:true}).click();
  await expect(page.locator('h1')).toBeInViewport();
  await page.screenshot({path:'test-results/mobile.png'});
  for (const width of [320,768,1024]) { await page.setViewportSize({width,height:900}); expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy(); }
});




