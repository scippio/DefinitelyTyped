// Type definitions for memcached 2.2
// Project: https://github.com/3rd-Eden/memcached
// Definitions by: KentarouTakeda <https://github.com/KentarouTakeda>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

///<reference types="node" />

import events = require("events");
export = Memcached;

declare class Memcached extends events.EventEmitter {
    static config: Memcached.options;

    /**
     * Connect to a single server.
     * @param location Server location e.g. "127.0.0.1:11211"
     * @param options options
     */
    constructor(location: string, options?: Memcached.options);

    /**
     * Connect to a cluster of Memcached servers.
     * @param location Server locations e.g. ["127.0.0.1:11211","127.0.0.1:11212"]
     * @param options options
     */
    constructor(location: string[], options?: Memcached.options);

    /**
     * Connect to servers with weight.
     * @param location Server locations e.g. {"127.0.0.1:11211": 1,"127.0.0.1:11212": 2}
     * @param options options
     */
    constructor(location: {[server: string]: number}, options ?: Memcached.options);

    /**
     * Touches the given key.
     * @param key The key
     * @param lifetime After how long should the key expire measured in seconds
     * @param cb
     */
    touch(key: string, lifetime: number, cb: (this: Memcached.CommandData, err: any) => void): void;

    /**
     * Get the value for the given key.
     * @param key The key
     * @param cb
     */
    get(key: string, cb: (this: Memcached.CommandData, err: any, data: any) => void): void;

    /**
     * Get the value and the CAS id.
     * @param key The key
     * @param cb
     */
    gets(key: string, cb: (this: Memcached.CommandData, err: any, data: {[key: string]: any, cas: string}) => void): void;

    /**
     * Retrieves a bunch of values from multiple keys.
     * @param keys all the keys that needs to be fetched
     * @param cb
     */
    getMulti(keys: string[], cb: (this: undefined, err: any, data: {[key: string]: any}) => void): void;

    /**
     * Stores a new value in Memcached.
     *
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param lifetime
     * @param cb
     */
    set(key: string, value: any, lifetime: number, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Replaces the value in memcached.
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param lifetime
     * @param cb
     */
    replace(key: string, value: any, lifetime: number, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Add the value, only if it's not in memcached already.
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param lifetime
     * @param cb
     */
    add(key: string, value: any, lifetime: number, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Add the value, only if it matches the given CAS value.
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param cas
     * @param lifetime
     * @param cb
     */
    cas(key: string, value: any, cas: string, lifetime: number, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Add the given value string to the value of an existing item.
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param cb
     */
    append(key: string, value: any, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Add the given value string to the value of an existing item.
     * @param key The key
     * @param value Either a buffer, JSON, number or string that you want to store.
     * @param cb
     */
    prepend(key: string, value: any, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Increment a given key.
     * @param key The key
     * @param amount The increment
     * @param cb
     */
    incr(key: string, amount: number, cb: (this: Memcached.CommandData, err: any, result: boolean|number) => void): void;

    /**
     * Decrement a given key.
     * @param key The key
     * @param amount The decrement
     * @param cb
     */
    decr(key: string, amount: number, cb: (this: Memcached.CommandData, err: any, result: boolean|number) => void): void;

    /**
     * Remove the key from memcached.
     * @param key The key
     * @param cb
     */
    del(key: string, cb: (this: Memcached.CommandData, err: any, result: boolean) => void): void;

    /**
     * Retrieves the version number of your server.
     * @param cb
     */
    version(cb: (err: any, version: Memcached.VersionData[]) => void): void;

    /**
     * Retrieves your stats settings.
     * @param cb
     */
    settings(cb: (err: any, settings: Memcached.StatusData[]) => void): void;

    /**
     * Retrieves stats from your memcached server.
     * @param cb
     */
    stats(cb: (err: any, stats: Memcached.StatusData[]) => void): void;

    /**
     * Retrieves stats slabs information.
     * @param cb
     */
    slabs(cb: (err: any, stats: Memcached.StatusData[]) => void): void;

    /**
     * Retrieves stats items information.
     * @param cb
     */
    items(cb: (err: any, stats: Memcached.StatusData[]) => void): void;

    /**
     * Inspect cache, see examples for a detailed explanation.
     * @param server
     * @param slabid
     * @param number
     * @param cb
     */
    cachedump(server: string, slabid: number, number: number, cb: (err: any, cachedump: Memcached.CacheDumpData|Memcached.CacheDumpData[]) => void): void;

    /**
     * Flushes the memcached server.
     * @param cb
     */
    flush(cb: (this: undefined, err: any, results: boolean[]) => void): void;

    /**
     * a issue occurred on one a server, we are going to attempt a retry next.
     */
    on(event: "issue", cb: (err: Memcached.IssueData) => void): this;

    /**
     * a server has been marked as failure or dead.
     */
    on(event: "failure", cb: (err: Memcached.IssueData) => void): this;

    /**
     * we are going to attempt to reconnect the to the failed server.
     */
    on(event: "reconnecting", cb: (err: Memcached.IssueData) => void): this;

    /**
     * successfully reconnected to the memcached server.
     */
    on(event: "reconnect", cb: (err: Memcached.IssueData) => void): this;

    /**
     * removing the server from our consistent hashing.
     */
    on( event: "remove", cb: (err: Memcached.IssueData) => void): this;

    /**
     * Closes all active memcached connections.
     */
    end(): void;
}

declare namespace Memcached {
    interface IssueData {
        server: string;
        tokens: [string, string];
        messages: string[];
        failures ?: number;
        totalFailures ?: number;
        totalReconnectsAttempted ?: number;
        totalReconnectsSuccess ?: number;
        totalReconnectsFailed ?: number;
        totalDownTime ?: number;
    }

    interface CommandData {
        start: number;
        execution: number;
        callback(...args: any[]): any;
        type: string;
        command: string;
        validate: Array<[string, (...args: any[]) => any]>;
        cas ?: string;
        redundancyEnabled ?: boolean;
        key ?: string;
        value ?: any;
        lifetime ?: number;
    }

    interface StatusData {
        server ?: string;
        [key: string]: string|boolean|number|undefined;
    }

    interface VersionData extends StatusData {
        version: string;
        major: string;
        minor: string;
        bugfix: string;
    }

    interface CacheDumpData {
        key: string;
        b: number;
        s: number;
    }

    interface options {
        /**
         * 250, the maximum key size allowed.
         */
        maxKeySize ?: number;
        /**
         * 2592000, the maximum expiration time of keys (in seconds).
         */
        maxExpiration ?: number;
        /**
         * 1048576, the maximum size of a value.
         */
        maxValue ?: number;
        /**
         * 10, the maximum size of the connection pool.
         */
        poolSize ?: number;
        /**
         * md5, the hashing algorithm used to generate the hashRing values.
         */
        algorithm ?: string;
        /**
         * 18000000, the time between reconnection attempts (in milliseconds).
         */
        reconnect ?: number;
        /**
         * 5000, the time after which Memcached sends a connection timeout (in milliseconds).
         */
        timeout ?: number;
        /**
         * 5, the number of socket allocation retries per request.
         */
        retries ?: number;
        /**
         * 5, the number of failed-attempts to a server before it is regarded as 'dead'.
         */
        failures ?: number;
        /**
         * 30000, the time between a server failure and an attempt to set it up back in service.
         */
        retry ?: number;
        /**
         * false, if true, authorizes the automatic removal of dead servers from the pool.
         */
        remove ?: boolean;
        /**
         * undefined, an array of server_locations to replace servers that fail and that are removed from the consistent hashing scheme.
         */
        failOverServers ?: string|string[];
        /**
         * true, whether to use md5 as hashing scheme when keys exceed maxKeySize.
         */
        keyCompression ?: boolean;
        /**
         * 5000, the idle timeout for the connections.
         */
        idle ?: number;
    }
}
