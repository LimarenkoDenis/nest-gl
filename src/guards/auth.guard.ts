import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const allowed: boolean = Boolean((request.headers as any).authorization);
    if (!allowed) {
      throw new ForbiddenException('Forbidden');
    }
    return allowed;
  }
}
