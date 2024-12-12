import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ServiceLaneResolver {
    // @Query(() => ServiceLane)
    // getServiceLaneByKeyword(
    //     @Args('input')
    //     input: GetServiceLaneByCodeInput
    // ) {
    //     return { code: input.code + Date.now(), name: 'name' + Date.now() };
    // }
    // @Query(() => [ServiceLane])
    // getServiceLaneListByCodes(
    //     @Args('input')
    //     input: GetServiceLaneListByCodesInput
    // ) {
    //     return input.codes.map((i) => ({
    //         code: i + Date.now(),
    //         name: 'name' + Date.now()
    //     }));
    // }
    // @Mutation(() => ServiceLane)
    // createServiceLane(
    //     @Args('input')
    //     input: CreateServiceLaneInput
    // ) {
    //     return { code: input.code + Date.now(), name: input.name + Date.now() };
    // }
}
