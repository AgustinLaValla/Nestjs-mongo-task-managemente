import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { SEED } from "src/config/jwt-seed.config";
import { JwtPayload } from "./interfaces/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super({ //Refers to the superclass PassportStrategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// Set how it will be retrieve the JWT from the request
            secretOrKey: SEED, // The secret that passport is gonna use to verify the signature of the token extracted
        });
    };


    ///Do validation whose result will be injected into the request of any operation that is guarded whit authorization
    async validate(payload: JwtPayload) {
        console.log(payload);
        const { email } = payload;
        const user = await this.authService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        };

        return user;
    }
};