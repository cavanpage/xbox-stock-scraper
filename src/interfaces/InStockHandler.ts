import { WebDriver } from "selenium-webdriver";

export type InStockHandler = (driver: WebDriver) => Promise<boolean>;
