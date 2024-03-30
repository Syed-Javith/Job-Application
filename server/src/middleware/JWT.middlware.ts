import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
    private readonly logger = new Logger(JWTMiddleware.name);

    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                throw new UnauthorizedException("Token not provided");
            }
            const verify = this.jwtService.verify(token, { secret: 'MY_SECRET_KEY' });
            if (!verify) {
                throw new UnauthorizedException("Invalid token");
            }
            next();
        } catch (error) {
            this.logger.error(`JWT verification error: ${error.message}`);
            throw new UnauthorizedException("Invalid token");
        }
    }
}
