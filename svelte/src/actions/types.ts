export interface Action<K extends string, T> {
    type: K;
    payload: T;
}
