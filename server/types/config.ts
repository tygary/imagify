import DbConfig from "./db-config";
import JwtConfig from "./jwt-config";

type Config = {
  db: DbConfig;
  jwt: JwtConfig;
  runpod: {
    apikey: string;
  };
};

export default Config;
