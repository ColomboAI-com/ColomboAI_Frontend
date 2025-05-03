import { ROOT_URL_RECOMMENDATION_GRPC } from "@/utlils/rootURL";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
// import { ProtoGrpcType } from "@proto/generated/clientService";
import path from "path";

console.log("\n\n\nGRPC API route is being executed\n\n\n");

// Load .proto files
const PROTO_PATH = path.resolve(process.cwd(), "proto");
// console.log(PROTO_PATH);

const packageDefinition = protoLoader.loadSync(
  [
    path.join(PROTO_PATH, "posts.proto"),
    path.join(PROTO_PATH, "vibes.proto"),
    path.join(PROTO_PATH, "recommendation.proto"),
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDefinition).recommendations;

// Create gRPC clients for Posts and Vibes services
const postsClient = new proto.Posts(ROOT_URL_RECOMMENDATION_GRPC, grpc.credentials.createInsecure());

const vibesClient = new proto.Vibes(ROOT_URL_RECOMMENDATION_GRPC, grpc.credentials.createInsecure());

let index = 1;

export default function handler(req, res) {
  console.log("received grpc request");

  if (req.method === "GET") {
    const { user_id, type } = req.query; // type - posts or vibes

    const client = type === "vibes" ? vibesClient : postsClient;

    const call = client.getRecommendations({ user_id });

    const recommendations = [];

    call.on("data", (recommendation) => {
      recommendations.push(recommendation);
    });

    call.on("end", () => {
      res.status(200).json({ recommendations });
    });

    call.on("error", (error) => {
      console.error("gRPC error:", error);
      res.status(500).json({ error: "Failed to fetch recommendations" });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
