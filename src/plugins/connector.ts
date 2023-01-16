import ConnectPlugin from "vue-web3-wallets";
import type { UserModule } from "@/types/plugin";

export const install: UserModule = (app) => {
  app.use(ConnectPlugin);
};
