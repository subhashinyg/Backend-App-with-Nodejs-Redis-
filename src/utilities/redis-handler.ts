// src/utilities/handler/redis-handler.ts
import { createClient, RedisClientType } from "redis";

export class RedisHandler {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            username: 'default',
            password: 'aXgFggUxztLz7AI8H762fQ6pdzYN968T',
            socket: {
                host: 'redis-16956.c73.us-east-1-2.ec2.redns.redis-cloud.com',
                port: 16956
            }
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    // Connect to Redis (call once before using)
    async connect() {
        await this.client.connect();
        console.log('✅ Redis connected');
    }

    // Get value by key
    async get(key: string): Promise<string | null> {
        try {
            console.log('calling....get')
            return await this.client.get(key);
        } catch (err) {
            console.error(`Redis GET error for key ${key}:`, err);
            return null;
        }
    }

    // Set value with optional TTL (in seconds)
    async set(key: string, value: any, ttl: number = 120): Promise<void> {
        try {
            console.log('calling set.......')
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            console.log('stringValue',stringValue)
            await this.client.setEx(key, ttl, stringValue);
        } catch (err) {
            console.error(`Redis SET error for key ${key}:`, err);
        }
    }

    // Delete key
    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error(`Redis DEL error for key ${key}:`, err);
        }
    }
}

export const redisHandler = new RedisHandler();