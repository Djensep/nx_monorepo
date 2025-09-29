export class PasswordHash {
  private constructor(private readonly value: string) {}
  static fromHashed(hash: string): PasswordHash {
    if (!hash || hash.length < 20) throw new Error('Invalid password hash');
    return new PasswordHash(hash);
  }
  unwrap(): string {
    return this.value;
  }
}
