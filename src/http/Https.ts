export default interface Http {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}
