import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';
import { map, Observable } from 'rxjs';

export class HttpResponseIntercepter implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((response) => {
                if (response instanceof Result) {
                    if (response.isFail) {
                        context
                            .switchToHttp()
                            .getResponse()
                            .status(response.error.statusCode || 400);
                    }

                    return PresentablePresenter.presentAllPresentableFromObj(
                        response
                    );
                }

                return response;
            })
        );
    }
}
