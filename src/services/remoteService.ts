import https from 'https';
import { Service } from 'typedi';

/**
* Remote service provide https requests call to make requests to remote servers
*/
@Service()
export class RemoteService {
    
    get(url: string): Promise<any> {
        return new Promise((resolve, rejects)=> {
            https.get(url, (res: any) => {
                const { statusCode } = res;
                const contentType:string = res.headers['content-type'] as string;
                let error: Error|null = null;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
                }
                if (error) {
                    console.error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return;
                }
                
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk: any) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData: any = JSON.parse(rawData);
                        console.log(parsedData);
                        resolve(parsedData);
                    } catch (e) {
                        console.error(e.message);
                        rejects(e);
                    }
                });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
                rejects(e);
            });
        });
        
    }
    
}