
class PingService {
  static async ping(): Promise<string> {
    return 'pong';
  }
}

export default PingService;
