import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { AppModule } from './app.module';
async function bootstrap(){
 const app=await NestFactory.create(AppModule,{bufferLogs:true});
 app.use(helmet()); app.use(pinoHttp({level:process.env.NODE_ENV==='production'?'info':'debug',redact:['req.headers.authorization','req.headers.cookie']}));
 const origins=(process.env.CORS_ORIGINS??'http://localhost:5173').split(',').map(v=>v.trim());
 app.enableCors({origin:(origin,cb)=>{if(!origin||origins.includes(origin))cb(null,true);else cb(new Error('Origin is not allowed'));},credentials:true});
 app.setGlobalPrefix(''); app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true,forbidNonWhitelisted:true}));
 const config=new DocumentBuilder().setTitle('CyberGuard API').setDescription('Smart Education оқу мақсатындағы қолмен бағалау API').setVersion('1.0').build();
 SwaggerModule.setup('api/docs',app,SwaggerModule.createDocument(app,config));
 const host=process.env.TRUSTED_LOCAL_DEMO==='true'?'127.0.0.1':'0.0.0.0';
 await app.listen(Number(process.env.PORT)||3000,host);
}
void bootstrap();
