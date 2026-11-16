import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { AppService } from "./app.service";
import { AssetDto, GenericCreateDto, RiskDto, StatusDto } from "./dto";
@ApiTags("CyberGuard")
@Controller("api")
export class AppController {
  constructor(private readonly app: AppService) {}
  @Get("health") health() {
    return this.app.health();
  }
  @Get("dashboard/summary") summary() {
    return this.app.dashboard();
  }
  @Get("dashboard/risk-distribution") distribution() {
    return this.app.distribution();
  }
  @Get("dashboard/risk-trends") trends() {
    return this.app.trends();
  }
  @Get("organizations") organizations() {
    return this.app.organizations();
  }
  @Get("organizations/:id") organization(@Param("id") id: string) {
    return this.app.organization(id);
  }
  @Get("assets") assets(@Query() q: Record<string, string>) {
    return this.app.assets(q);
  }
  @Post("assets") @ApiOperation({ summary: "Актив қосу" }) createAsset(
    @Body() body: AssetDto,
  ) {
    return this.app.createAsset(body);
  }
  @Get("assets/:id") asset(@Param("id") id: string) {
    return this.app.asset(id);
  }
  @Patch("assets/:id") updateAsset(
    @Param("id") id: string,
    @Body() body: Partial<AssetDto>,
  ) {
    return this.app.updateAsset(id, body);
  }
  @Delete("assets/:id") deleteAsset(@Param("id") id: string) {
    return this.app.deleteAsset(id);
  }
  @Get("threats") threats() {
    return this.app.threats();
  }
  @Post("threats") createThreat(@Body() body: GenericCreateDto) {
    return this.app.createThreat(body);
  }
  @Get("vulnerabilities") vulnerabilities() {
    return this.app.vulnerabilities();
  }
  @Post("vulnerabilities") createVulnerability(@Body() body: GenericCreateDto) {
    return this.app.createVulnerability(body);
  }
  @Get("risks") risks() {
    return this.app.risks();
  }
  @Post("risks") createRisk(@Body() body: RiskDto) {
    return this.app.createRisk(body);
  }
  @Get("risks/:id/history") riskHistory(@Param("id") id: string) {
    return this.app.riskHistory(id);
  }
  @Get("risks/:id") risk(@Param("id") id: string) {
    return this.app.risk(id);
  }
  @Patch("risks/:id") updateRisk(
    @Param("id") id: string,
    @Body() body: RiskDto,
  ) {
    return this.app.updateRisk(id, body);
  }
  @Get("security-controls") controls() {
    return this.app.controls();
  }
  @Patch("security-controls/:id") updateControl(
    @Param("id") id: string,
    @Body() body: StatusDto,
  ) {
    return this.app.updateControl(id, body);
  }
  @Get("recommendations") recommendations() {
    return this.app.recommendations();
  }
  @Patch("recommendations/:id") updateRecommendation(
    @Param("id") id: string,
    @Body() body: StatusDto,
  ) {
    return this.app.updateRecommendation(id, body);
  }
  @Get("security-policies") policies() {
    return this.app.policies();
  }
  @Post("security-policies/:id/acknowledgements") acknowledge(
    @Param("id") id: string,
    @Body() body: { employee?: string },
  ) {
    return this.app.acknowledge(id, body);
  }
  @Get("network/topology") topology() {
    return this.app.topology();
  }
  @Get("reports/academic.pdf")
  @Header("Content-Type", "application/pdf")
  @Header(
    "Content-Disposition",
    'attachment; filename="cyberguard-academic-report.pdf"',
  )
  async report(@Res() response: Response) {
    const pdf = await this.app.report();
    response.end(pdf);
  }
}
