import { Service } from 'typedi';
import express from 'express';
import { Provider } from '.';

@Service()
class WebProvider implements Provider {
    
    async bootstrap(): Promise<void> {

    }

    async shutdown(): Promise<void> {

    }
    
}