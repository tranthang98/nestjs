
import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const isPublicPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
            context.getHandler(),
            context.getClass(),
        ]);

        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer Token ở Header request!");
        }

        //check permissions
        const targetMethod = request.method;
        const targetEndpoint = request.route.path;

        const permissions = user?.permissions ?? [];
        let isExist = permissions.find(permission =>
            permission.method === targetMethod
            &&
            permission.apiPath === targetEndpoint
        )

        if (targetEndpoint.startsWith("/api/v1/auth/")) isExist = true;
        if (!isExist && !isPublicPermission) {
            throw new ForbiddenException("Bạn không có quyền để truy cập endpoint này!")
        }

        return user;
    }
}
