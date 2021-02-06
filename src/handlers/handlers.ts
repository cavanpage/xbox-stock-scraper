import { By, WebDriver } from "selenium-webdriver";
import { InStockHandler } from "../interfaces";

export const targetHandler: InStockHandler = async(driver: WebDriver): Promise<boolean> => {
    const soldOutBlocks = await driver.findElements(By.css("div[data-test='soldOutBlock']"));
    return soldOutBlocks.length == 0;
}

export const bestBuyHandler: InStockHandler = async(driver: WebDriver): Promise<boolean> => {
    const addToCartButton = await driver.findElements(By.css(".add-to-cart-button"));
    return await addToCartButton[0].isEnabled();
}

export const gamestopHandler: InStockHandler = async(driver: WebDriver): Promise<boolean> => {
    const addToCartButton = await driver.findElements(By.css(".add-to-cart"));
    return await addToCartButton[0].isEnabled();
}

export const neweggHandler: InStockHandler = async(driver: WebDriver): Promise<boolean> => {
    const stockTags = await driver.findElements(
        By.css(".product-inventory > strong")
      );
    const statusText: string = await stockTags[0].getText();
    return statusText.indexOf("OUT OF STOCK") === -1;
}

export const walmartHandler: InStockHandler = async(driver: WebDriver): Promise<boolean> => {
    const bTags = await driver.findElements(By.css("b"));
    const statusText: string = await bTags[1].getText();
    return statusText.indexOf("out of stock") === -1;
}
