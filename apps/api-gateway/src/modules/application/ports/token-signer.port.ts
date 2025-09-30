export abstract class TokenSignerPort {
  abstract signAccess(payload: Record<string, any>): Promise<string>;
  // abstract signRefresh?(payload: Record<string, any>): Promise<string>;
}
