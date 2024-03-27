import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const PORT = configService.get('port') || 3002;

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  
  const config = new DocumentBuilder()
  .setTitle('')
  .setDescription('')
  .setVersion('1.0.0')
  .addTag('')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)
  
  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}
bootstrap();
