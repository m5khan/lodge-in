import { Service } from 'typedi';
import express from 'express';
import { Provider } from '.';

@Service()
export class WebProvider implements Provider {
    
    public async bootstrap(): Promise<void> {
        console.log(process.env.PORT);
    }

    public async shutdown(): Promise<void> {

    }
    
}