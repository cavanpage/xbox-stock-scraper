import { ICarrerConfig } from "./ICarrierConfig";
import { InStockHandler } from "./InStockHandler";

export interface IMonitorConfig extends ICarrerConfig{
    name: string;
    inStockHandler: InStockHandler;
};
