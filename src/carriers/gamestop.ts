require('chromedriver');
import { By } from 'selenium-webdriver';
import { config } from '../config';
import { createWebDriver, log, notify, sleep } from '../utilities';

export const monitorGamestop = async() => {
    const url: string = config.gamestopUrl;
    const driver = await createWebDriver();
  
    try {           
      while(true){
          log('gamestop: checking');
          await driver.get(url);    
          const addToCartButton = await driver.findElements(By.css('.add-to-cart'));
          const isInStock = await addToCartButton[0].isEnabled();
          
          if(isInStock){
            notify('gamestop: in stock', url, true);
            log('gamestop: in stock');
          }else{
            log('gamestop: out of stock');
          }
          await sleep(30000);
      }
    }
    catch(e){
      log({'gamestop:error': e});
    } finally {
      await driver.quit();
    }
}