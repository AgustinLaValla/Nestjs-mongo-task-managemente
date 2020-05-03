import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SEED } from 'src/config/jwt-seed.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController, UsersController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session:false }),  //Set the authorization strategy
    JwtModule.register({
      secret: SEED,
      signOptions: { expiresIn: 3600 }
    }),
    MongooseModule.forFeatureAsync(
      [{
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'),{message: '{PATH} debe de ser único'});
          return schema;
        }
      }]
    )
  ],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule { }
