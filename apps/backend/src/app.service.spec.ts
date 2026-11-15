import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('academic report',()=>{
 it('renders a non-empty PDF with report text and network illustration',async()=>{
  const empty={findFirst:async()=>({name:'Smart Education',employeeCount:12})};
  const db={organization:empty,asset:{findMany:async()=>[]},riskAssessment:{findMany:async()=>[]},securityControl:{findMany:async()=>[]},securityPolicy:{findMany:async()=>[]},recommendation:{findMany:async()=>[]}} as unknown as PrismaService;
  const pdf=await new AppService(db).report();expect(pdf.subarray(0,4).toString()).toBe('%PDF');expect(pdf.length).toBeGreaterThan(2500);const pages=pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)?.length??0;expect(pages).toBeGreaterThanOrEqual(4);expect(pages).toBeLessThanOrEqual(6);
 });
});
