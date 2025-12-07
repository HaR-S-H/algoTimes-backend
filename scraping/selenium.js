import {Builder, By, until} from "selenium-webdriver";
async function scrape() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://thefly.com/permalinks/entry.php/id4210592/ZDGE-Zedge-introduces-AIpowered-product-innovation-team");

    // 1. Click button that shows login form
    await driver.findElement(By.id("login_label")).click();

    // 2. Wait for email field to appear
    await driver.wait(until.elementLocated(By.id("username")), 5000);

    // 3. Fill email
    await driver.findElement(By.id("username"))
        .sendKeys("kv1667099@gmail.com");

    // 4. Fill password
    await driver.findElement(By.id("password"))
        .sendKeys("GLA$88emwq8");

    // 5. Click final login button
    await driver.findElement(By.id("submit_login")).click();

    // Wait for login to complete
    await driver.sleep(2000);

    // 6. Navigate to the page you want to scrape
    await driver.get("https://thefly.com/permalinks/entry.php/id4210592/ZDGE-Zedge-introduces-AIpowered-product-innovation-team");

    // 7. Extract specific content by ID
   const element = await driver.findElement(By.css("p"));
    const text = await element.getText();

    console.log("Extracted Content:", text);

  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
}

scrape();
