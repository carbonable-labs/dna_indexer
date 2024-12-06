import {
  connect,
  JetStreamClient,
  NatsConnection,
  JetStreamManager,
  StreamConfig,
} from "nats";

const DEFAULT_STREAM_CONFIG: any = {
  storage: "file", // Added for persistence
  retention: "workqueue", // Added for message handling
};

export class NatsClient {
  private nc: NatsConnection | null = null;
  private js: JetStreamClient | null = null;
  private jsm: JetStreamManager | null = null;
  private readonly streamConfig: any;

  constructor(config: any) {
    this.streamConfig = { ...DEFAULT_STREAM_CONFIG, ...config };
  }

  async connect(
    servers: string | string[] = "nats://localhost:4222"
  ): Promise<void> {
    try {
      console.log("🔌 Connecting to NATS server...");
      this.nc = await connect({
        servers: servers,
        reconnect: true,
        maxReconnectAttempts: -1,
        reconnectTimeWait: 2000,
      });
      console.log("✅ Connected to NATS server successfully");

      console.log("🚀 Initializing JetStream client...");
      this.js = this.nc.jetstream();
      console.log("✅ JetStream client initialized");

      console.log("🔧 Setting up JetStream manager...");
      this.jsm = await this.nc.jetstreamManager();
      console.log("✅ JetStream manager ready");

      // Monitor connection status
      (async () => {
        for await (const status of this.nc!.status()) {
          const emoji =
            status.type === "disconnect"
              ? "❌"
              : status.type === "reconnect"
              ? "🔄"
              : "✨";
          console.log(`${emoji} NATS Status: ${status.type}`);
        }
      })();
    } catch (err) {
      console.error("❌ Failed to connect to NATS:", err);
      throw err;
    }
  }

  async createStreamIfNotExists(): Promise<void> {
    if (!this.jsm) {
      throw new Error("JetStream manager not initialized");
    }

    try {
      console.log("🔍 Checking if stream exists...");
      try {
        const streamInfo = await this.jsm.streams.info(this.streamConfig.name);
        console.log(`✅ Stream ${this.streamConfig.name} exists:`, {
          name: streamInfo.config.name,
          subjects: streamInfo.config.subjects,
        });
      } catch {
        console.log("📝 Creating new stream...");
        await this.jsm.streams.add(this.streamConfig);
        console.log(`✅ Stream ${this.streamConfig.name} created successfully`);
      }
    } catch (err) {
      console.error("❌ Stream operation failed:", err);
      throw err;
    }
  }

  async publish(subject: string, data: any): Promise<void> {
    if (!this.js) {
      throw new Error("JetStream not initialized");
    }

    try {
      const encoded = JSON.stringify(data);
      await this.js.publish(subject, encoded);
      console.log(`📨 Published to ${subject}:`, {
        subject,
        dataSize: encoded.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      // If JetStream fails, try core NATS as fallback
      if (this.nc) {
        console.log("⚠️ JetStream publish failed, falling back to core NATS");
        this.nc.publish(subject, JSON.stringify(data));
        console.log(`📨 Published to ${subject} using core NATS`);
      } else {
        console.error("❌ Publish failed:", err);
        throw err;
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this.nc) {
      console.log("👋 Disconnecting from NATS...");
      await this.nc.drain();
      await this.nc.close();
      this.nc = null;
      this.js = null;
      this.jsm = null;
      console.log("✅ Disconnected from NATS");
    }
  }

  // Keeping your existing getter methods
  getJetStream(): JetStreamClient {
    if (!this.js) throw new Error("JetStream not initialized");
    return this.js;
  }

  getJetStreamManager(): JetStreamManager {
    if (!this.jsm) throw new Error("JetStream manager not initialized");
    return this.jsm;
  }
}
