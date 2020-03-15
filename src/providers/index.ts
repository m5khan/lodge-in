export interface Provider {
    bootstrap: () => Promise<void>;
    shutdown: () => Promise<void>;
}