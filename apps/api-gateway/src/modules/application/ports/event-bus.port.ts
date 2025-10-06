export abstract class EventBusPort {
  abstract publish<T>(
    topic: string,
    key: string | null,
    payload: T,
    headers?: Record<string, string>
  ): Promise<void>;
  abstract connect(): Promise<void>;
  abstract disconnect?(): Promise<void>;
}
