import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { UsersModule } from "./users/users.module";
import { XmcpModule } from "./xmcp/xmcp.module";

@Module({
  imports: [UsersModule, XmcpModule],
  controllers: [HealthController],
})
export class AppModule {}
