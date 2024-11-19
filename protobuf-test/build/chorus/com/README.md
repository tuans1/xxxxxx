# Config gRPC with om-mdm-protobuf npm

## Install package

1.  Create .npmrc file in root directory and write in below
```
//npm.pkg.github.com/:_authToken=<PAT_TOKEN>
@ocean-network-express:registry=https://npm.pkg.github.com
```
2. Run script to install package
```bash
yarn add @ocean-network-express/om-mdm-protobuf@version
```
## Config grpc server with NestJS

1. Create grpc-option file
```ts
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3000',
    package: [
      'chorus.mdm.location.v1',
      'chorus.mdm.vessel.v1',
    ],
    protoPath: [
      'om-mdm-protobuf/location/v1/location.proto',
      'om-mdm-protobuf/vessel/v1/vessel.proto',
    ],
    loader: {
      includeDirs: [
        join(
          __dirname,
          '..',
          'node_modules/@ocean-network-express',
        ),
      ],
    },
  },
};
```
2. Import grpcOption to main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  await app.listen(null);
}
bootstrap();
```

# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [chorus/com/account_request/v1/account_request.proto](#chorus_com_account_request_v1_account_request-proto)
    - [AccountRequest](#chorus-com-account_request-v1-AccountRequest)
    - [AccountRequestFilter](#chorus-com-account_request-v1-AccountRequestFilter)
    - [AccountRequestInformation](#chorus-com-account_request-v1-AccountRequestInformation)
    - [AccountRequestPagination](#chorus-com-account_request-v1-AccountRequestPagination)
    - [AccountRequestResponse](#chorus-com-account_request-v1-AccountRequestResponse)
    - [DeleteAccountRequestRequest](#chorus-com-account_request-v1-DeleteAccountRequestRequest)
    - [DeleteAccountRequestResponse](#chorus-com-account_request-v1-DeleteAccountRequestResponse)
    - [DepartmentManager](#chorus-com-account_request-v1-DepartmentManager)
    - [GetAccountRequestByRequestIdRequest](#chorus-com-account_request-v1-GetAccountRequestByRequestIdRequest)
    - [GetAccountRequestByRequestIdResponse](#chorus-com-account_request-v1-GetAccountRequestByRequestIdResponse)
    - [RoleOfAccountRequestResponse](#chorus-com-account_request-v1-RoleOfAccountRequestResponse)
    - [SaveAccountRequestInfoRequest](#chorus-com-account_request-v1-SaveAccountRequestInfoRequest)
    - [SaveAccountRequestInfoResponse](#chorus-com-account_request-v1-SaveAccountRequestInfoResponse)
    - [SearchListAccountRequest](#chorus-com-account_request-v1-SearchListAccountRequest)
    - [SearchListAccountResponse](#chorus-com-account_request-v1-SearchListAccountResponse)
    - [UpdateStatusAccountRequest](#chorus-com-account_request-v1-UpdateStatusAccountRequest)
    - [UpdateStatusAccountResponse](#chorus-com-account_request-v1-UpdateStatusAccountResponse)
  
    - [AccountRequestService](#chorus-com-account_request-v1-AccountRequestService)
  
- [chorus/com/apm_invoice/v1/apm_invoice.proto](#chorus_com_apm_invoice_v1_apm_invoice-proto)
    - [ApmInvoice](#chorus-com-apm_invoice-v1-ApmInvoice)
    - [GetApmInvoiceByIdRequest](#chorus-com-apm_invoice-v1-GetApmInvoiceByIdRequest)
    - [GetApmInvoiceByIdResponse](#chorus-com-apm_invoice-v1-GetApmInvoiceByIdResponse)
    - [GetApmInvoiceByNoRequest](#chorus-com-apm_invoice-v1-GetApmInvoiceByNoRequest)
    - [GetApmInvoiceByNoResponse](#chorus-com-apm_invoice-v1-GetApmInvoiceByNoResponse)
    - [ValidateApmInvoiceRequest](#chorus-com-apm_invoice-v1-ValidateApmInvoiceRequest)
    - [ValidateApmInvoiceResponse](#chorus-com-apm_invoice-v1-ValidateApmInvoiceResponse)
  
    - [ApmInvoiceInfoService](#chorus-com-apm_invoice-v1-ApmInvoiceInfoService)
  
- [chorus/com/base/v1/base.proto](#chorus_com_base_v1_base-proto)
    - [OrderBy](#chorus-com-base-v1-OrderBy)
    - [Pagination](#chorus-com-base-v1-Pagination)
  
    - [SortBy](#chorus-com-base-v1-SortBy)
  
- [chorus/com/csr/v1/csr.proto](#chorus_com_csr_v1_csr-proto)
    - [ApprovalCsrRequest](#chorus-com-csr-v1-ApprovalCsrRequest)
    - [ApprovalCsrResponse](#chorus-com-csr-v1-ApprovalCsrResponse)
    - [CreateCsrRequest](#chorus-com-csr-v1-CreateCsrRequest)
    - [CreateCsrResponse](#chorus-com-csr-v1-CreateCsrResponse)
    - [Csr](#chorus-com-csr-v1-Csr)
    - [GetCsrByIdRequest](#chorus-com-csr-v1-GetCsrByIdRequest)
    - [GetCsrByIdResponse](#chorus-com-csr-v1-GetCsrByIdResponse)
    - [UpdateCsrRequest](#chorus-com-csr-v1-UpdateCsrRequest)
    - [UpdateCsrResponse](#chorus-com-csr-v1-UpdateCsrResponse)
  
    - [CsrInfoService](#chorus-com-csr-v1-CsrInfoService)
  
- [chorus/com/email_sending_history/v1/email_sending_history.proto](#chorus_com_email_sending_history_v1_email_sending_history-proto)
    - [EmailSending](#chorus-com-email_sending_history-v1-EmailSending)
    - [EmailSendingHistory](#chorus-com-email_sending_history-v1-EmailSendingHistory)
    - [GetEmailHistorySendingByIdRequest](#chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdRequest)
    - [GetEmailHistorySendingByIdResponse](#chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdResponse)
    - [GetEmailSendingDetailRequest](#chorus-com-email_sending_history-v1-GetEmailSendingDetailRequest)
    - [GetEmailSendingDetailResponse](#chorus-com-email_sending_history-v1-GetEmailSendingDetailResponse)
    - [GetRecipientsStatusByHistoryIdRequest](#chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdRequest)
    - [GetRecipientsStatusByHistoryIdResponse](#chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdResponse)
    - [Pagingation](#chorus-com-email_sending_history-v1-Pagingation)
    - [Query](#chorus-com-email_sending_history-v1-Query)
    - [Recipients](#chorus-com-email_sending_history-v1-Recipients)
    - [SearchEmailSendingRequest](#chorus-com-email_sending_history-v1-SearchEmailSendingRequest)
    - [SearchEmailSendingResponse](#chorus-com-email_sending_history-v1-SearchEmailSendingResponse)
  
    - [EmailSendingHistoryService](#chorus-com-email_sending_history-v1-EmailSendingHistoryService)
  
- [chorus/com/intg_cd_dtl/v1/intg_cd_dtl.proto](#chorus_com_intg_cd_dtl_v1_intg_cd_dtl-proto)
    - [GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest](#chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest)
    - [GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse](#chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse)
    - [IntegrationCode](#chorus-com-intg_cd_dtl-v1-IntegrationCode)
    - [IntegrationCodeDetail](#chorus-com-intg_cd_dtl-v1-IntegrationCodeDetail)
  
    - [IntegrationCodeDetailInfoService](#chorus-com-intg_cd_dtl-v1-IntegrationCodeDetailInfoService)
  
- [chorus/com/menu/v1/menu.proto](#chorus_com_menu_v1_menu-proto)
    - [CreateLocalMenuRequest](#chorus-com-menu-v1-CreateLocalMenuRequest)
    - [CreateLocalMenuResponse](#chorus-com-menu-v1-CreateLocalMenuResponse)
    - [DeleteMenuByIdRequest](#chorus-com-menu-v1-DeleteMenuByIdRequest)
    - [DeleteMenuByIdResponse](#chorus-com-menu-v1-DeleteMenuByIdResponse)
    - [GetLocalMenuByProductIdRequest](#chorus-com-menu-v1-GetLocalMenuByProductIdRequest)
    - [GetLocalMenuByProductIdResponse](#chorus-com-menu-v1-GetLocalMenuByProductIdResponse)
    - [GetMegaMenuByUserIdRequest](#chorus-com-menu-v1-GetMegaMenuByUserIdRequest)
    - [GetMegaMenuByUserIdResponse](#chorus-com-menu-v1-GetMegaMenuByUserIdResponse)
    - [GetMegaMenuResponse](#chorus-com-menu-v1-GetMegaMenuResponse)
    - [GetMenuByParentIdRequest](#chorus-com-menu-v1-GetMenuByParentIdRequest)
    - [GetMenuByParentIdResponse](#chorus-com-menu-v1-GetMenuByParentIdResponse)
    - [GetMenuLevel2ByProductIdRequest](#chorus-com-menu-v1-GetMenuLevel2ByProductIdRequest)
    - [GetMenuLevel2ByProductIdResponse](#chorus-com-menu-v1-GetMenuLevel2ByProductIdResponse)
    - [GetPinMegaMenuByUserIdRequest](#chorus-com-menu-v1-GetPinMegaMenuByUserIdRequest)
    - [GetPinMegaMenuByUserIdResponse](#chorus-com-menu-v1-GetPinMegaMenuByUserIdResponse)
    - [MegaMenu](#chorus-com-menu-v1-MegaMenu)
    - [MegaMenuItem](#chorus-com-menu-v1-MegaMenuItem)
    - [MegaMenuQuery](#chorus-com-menu-v1-MegaMenuQuery)
    - [MenuItemIdResponse](#chorus-com-menu-v1-MenuItemIdResponse)
    - [ResourceAction](#chorus-com-menu-v1-ResourceAction)
    - [SearchMegaMenuByNameOrCodeRequest](#chorus-com-menu-v1-SearchMegaMenuByNameOrCodeRequest)
    - [SearchMegaMenuByNameOrCodeResponse](#chorus-com-menu-v1-SearchMegaMenuByNameOrCodeResponse)
    - [SearchMenuDetailByIdRequest](#chorus-com-menu-v1-SearchMenuDetailByIdRequest)
    - [SearchMenuDetailByIdResponse](#chorus-com-menu-v1-SearchMenuDetailByIdResponse)
    - [UpdateActivateFlagMenuRequest](#chorus-com-menu-v1-UpdateActivateFlagMenuRequest)
    - [UpdateActivateFlagMenuResponse](#chorus-com-menu-v1-UpdateActivateFlagMenuResponse)
    - [UpdateLocalMenuSequenceRequest](#chorus-com-menu-v1-UpdateLocalMenuSequenceRequest)
    - [UpdateLocalMenuSequenceResponse](#chorus-com-menu-v1-UpdateLocalMenuSequenceResponse)
    - [UpdateMenuIconPathRequest](#chorus-com-menu-v1-UpdateMenuIconPathRequest)
    - [UpdateMenuIconPathResponse](#chorus-com-menu-v1-UpdateMenuIconPathResponse)
    - [UpdateMenuSequenceRequest](#chorus-com-menu-v1-UpdateMenuSequenceRequest)
    - [UpdateMenuSequenceResponse](#chorus-com-menu-v1-UpdateMenuSequenceResponse)
    - [UpdatePinnedMegaMenuRequest](#chorus-com-menu-v1-UpdatePinnedMegaMenuRequest)
    - [UpdatePinnedMegaMenuResponse](#chorus-com-menu-v1-UpdatePinnedMegaMenuResponse)
  
    - [MegaMenuService](#chorus-com-menu-v1-MegaMenuService)
  
- [chorus/com/notification/v1/notification.proto](#chorus_com_notification_v1_notification-proto)
    - [CreateEmailNotificationRequest](#chorus-com-notification-v1-CreateEmailNotificationRequest)
    - [CreateEmailNotificationResponse](#chorus-com-notification-v1-CreateEmailNotificationResponse)
    - [CreateInAppNotificationRequest](#chorus-com-notification-v1-CreateInAppNotificationRequest)
    - [CreateInAppNotificationResponse](#chorus-com-notification-v1-CreateInAppNotificationResponse)
    - [EmailNotification](#chorus-com-notification-v1-EmailNotification)
    - [EmailNotification.DynamicTemplateDataEntry](#chorus-com-notification-v1-EmailNotification-DynamicTemplateDataEntry)
    - [InAppNotification](#chorus-com-notification-v1-InAppNotification)
    - [InAppOptions](#chorus-com-notification-v1-InAppOptions)
  
    - [NotificationService](#chorus-com-notification-v1-NotificationService)
  
- [chorus/com/policy/v1/policy.proto](#chorus_com_policy_v1_policy-proto)
    - [ColumnPolicy](#chorus-com-policy-v1-ColumnPolicy)
    - [GetListPoliciesRequest](#chorus-com-policy-v1-GetListPoliciesRequest)
    - [GetListPoliciesResponse](#chorus-com-policy-v1-GetListPoliciesResponse)
    - [GetResourceActionByUserRequest](#chorus-com-policy-v1-GetResourceActionByUserRequest)
    - [GetResourceActionByUserResponse](#chorus-com-policy-v1-GetResourceActionByUserResponse)
    - [PolicyRoleQuery](#chorus-com-policy-v1-PolicyRoleQuery)
    - [ResourceActionPolicy](#chorus-com-policy-v1-ResourceActionPolicy)
    - [SearchPoliciesRoleRequest](#chorus-com-policy-v1-SearchPoliciesRoleRequest)
    - [SearchPoliciesRoleResponse](#chorus-com-policy-v1-SearchPoliciesRoleResponse)
    - [SearchPolicyUserSetsRequest](#chorus-com-policy-v1-SearchPolicyUserSetsRequest)
    - [SearchPolicyUserSetsResponse](#chorus-com-policy-v1-SearchPolicyUserSetsResponse)
    - [UpdatePolicyRequest](#chorus-com-policy-v1-UpdatePolicyRequest)
    - [UpdatePolicyResponse](#chorus-com-policy-v1-UpdatePolicyResponse)
    - [UpdatePolicyRoleRequest](#chorus-com-policy-v1-UpdatePolicyRoleRequest)
    - [UpdatePolicyRoleResponse](#chorus-com-policy-v1-UpdatePolicyRoleResponse)
    - [UpdatePolicyUserSetRequest](#chorus-com-policy-v1-UpdatePolicyUserSetRequest)
    - [UpdatePolicyUserSetResponse](#chorus-com-policy-v1-UpdatePolicyUserSetResponse)
  
    - [PolicyService](#chorus-com-policy-v1-PolicyService)
  
- [chorus/com/product/v1/product.proto](#chorus_com_product_v1_product-proto)
    - [CreateProductRequest](#chorus-com-product-v1-CreateProductRequest)
    - [CreateProductResponse](#chorus-com-product-v1-CreateProductResponse)
    - [GetProductDetailRequest](#chorus-com-product-v1-GetProductDetailRequest)
    - [GetProductDetailResponse](#chorus-com-product-v1-GetProductDetailResponse)
    - [GetProductsByUserEmailRequest](#chorus-com-product-v1-GetProductsByUserEmailRequest)
    - [GetProductsByUserEmailResponse](#chorus-com-product-v1-GetProductsByUserEmailResponse)
    - [Product](#chorus-com-product-v1-Product)
    - [ProductQuery](#chorus-com-product-v1-ProductQuery)
    - [SearchProductRequest](#chorus-com-product-v1-SearchProductRequest)
    - [SearchProductResponse](#chorus-com-product-v1-SearchProductResponse)
    - [UpdateActivateFlagProductRequest](#chorus-com-product-v1-UpdateActivateFlagProductRequest)
    - [UpdateActivateFlagProductResponse](#chorus-com-product-v1-UpdateActivateFlagProductResponse)
    - [UpdateProductRequest](#chorus-com-product-v1-UpdateProductRequest)
    - [UpdateProductResponse](#chorus-com-product-v1-UpdateProductResponse)
  
    - [ProductService](#chorus-com-product-v1-ProductService)
  
- [chorus/com/resource/v1/resource.proto](#chorus_com_resource_v1_resource-proto)
    - [CreateResourceRequest](#chorus-com-resource-v1-CreateResourceRequest)
    - [CreateResourceResponse](#chorus-com-resource-v1-CreateResourceResponse)
    - [DeleteResourceRequest](#chorus-com-resource-v1-DeleteResourceRequest)
    - [DeleteResourceResponse](#chorus-com-resource-v1-DeleteResourceResponse)
    - [GetResourceActionsTypeScreenRequest](#chorus-com-resource-v1-GetResourceActionsTypeScreenRequest)
    - [GetResourceActionsTypeScreenResponse](#chorus-com-resource-v1-GetResourceActionsTypeScreenResponse)
    - [GetResourceDetailRequest](#chorus-com-resource-v1-GetResourceDetailRequest)
    - [GetResourceDetailResponse](#chorus-com-resource-v1-GetResourceDetailResponse)
    - [Resource](#chorus-com-resource-v1-Resource)
    - [ResourceActionCreate](#chorus-com-resource-v1-ResourceActionCreate)
    - [ResourceActionDetail](#chorus-com-resource-v1-ResourceActionDetail)
    - [ResourceActionMethod](#chorus-com-resource-v1-ResourceActionMethod)
    - [ResourceActionTypeScreen](#chorus-com-resource-v1-ResourceActionTypeScreen)
    - [ResourceAttribute](#chorus-com-resource-v1-ResourceAttribute)
    - [ResourceAttributeCreate](#chorus-com-resource-v1-ResourceAttributeCreate)
    - [ResourceAttributeDetail](#chorus-com-resource-v1-ResourceAttributeDetail)
    - [ResourceAttributeQuery](#chorus-com-resource-v1-ResourceAttributeQuery)
    - [ResourceQuery](#chorus-com-resource-v1-ResourceQuery)
    - [SearchResourceAttributesRequest](#chorus-com-resource-v1-SearchResourceAttributesRequest)
    - [SearchResourceAttributesResponse](#chorus-com-resource-v1-SearchResourceAttributesResponse)
    - [SearchResourceByNameRequest](#chorus-com-resource-v1-SearchResourceByNameRequest)
    - [SearchResourceByNameResponse](#chorus-com-resource-v1-SearchResourceByNameResponse)
    - [SetActiveFlagResourceRequest](#chorus-com-resource-v1-SetActiveFlagResourceRequest)
    - [SetActiveFlagResourceResponse](#chorus-com-resource-v1-SetActiveFlagResourceResponse)
    - [UpdateResourceRequest](#chorus-com-resource-v1-UpdateResourceRequest)
    - [UpdateResourceResponse](#chorus-com-resource-v1-UpdateResourceResponse)
  
    - [ResourceService](#chorus-com-resource-v1-ResourceService)
  
- [chorus/com/role/v1/role.proto](#chorus_com_role_v1_role-proto)
    - [CreateRoleRequest](#chorus-com-role-v1-CreateRoleRequest)
    - [CreateRoleResponse](#chorus-com-role-v1-CreateRoleResponse)
    - [DeleteRoleByRoleIdRequest](#chorus-com-role-v1-DeleteRoleByRoleIdRequest)
    - [DeleteRoleByRoleIdResponse](#chorus-com-role-v1-DeleteRoleByRoleIdResponse)
    - [GetRoleByRoleIdRequest](#chorus-com-role-v1-GetRoleByRoleIdRequest)
    - [GetRoleByRoleIdResponse](#chorus-com-role-v1-GetRoleByRoleIdResponse)
    - [Role](#chorus-com-role-v1-Role)
    - [RoleQuery](#chorus-com-role-v1-RoleQuery)
    - [SearchRoleByRoleNameRequest](#chorus-com-role-v1-SearchRoleByRoleNameRequest)
    - [SearchRoleByRoleNameResponse](#chorus-com-role-v1-SearchRoleByRoleNameResponse)
    - [UpdateRoleByRoleIdRequest](#chorus-com-role-v1-UpdateRoleByRoleIdRequest)
    - [UpdateRoleByRoleIdResponse](#chorus-com-role-v1-UpdateRoleByRoleIdResponse)
  
    - [RoleSortBy](#chorus-com-role-v1-RoleSortBy)
  
    - [RoleService](#chorus-com-role-v1-RoleService)
  
- [chorus/com/user/v1/user.proto](#chorus_com_user_v1_user-proto)
    - [CreateUserAttributeMappingRequest](#chorus-com-user-v1-CreateUserAttributeMappingRequest)
    - [CreateUserRequest](#chorus-com-user-v1-CreateUserRequest)
    - [CreateUserResponse](#chorus-com-user-v1-CreateUserResponse)
    - [DeleteUserByIdRequest](#chorus-com-user-v1-DeleteUserByIdRequest)
    - [DeleteUserByIdResponse](#chorus-com-user-v1-DeleteUserByIdResponse)
    - [GetRoleDefaultByNameRequest](#chorus-com-user-v1-GetRoleDefaultByNameRequest)
    - [GetRoleDefaultByNameResponse](#chorus-com-user-v1-GetRoleDefaultByNameResponse)
    - [GetUserDetailByEmailRequest](#chorus-com-user-v1-GetUserDetailByEmailRequest)
    - [GetUserDetailByEmailResponse](#chorus-com-user-v1-GetUserDetailByEmailResponse)
    - [GetUserDetailByIdRequest](#chorus-com-user-v1-GetUserDetailByIdRequest)
    - [GetUserDetailByIdResponse](#chorus-com-user-v1-GetUserDetailByIdResponse)
    - [GetUserItemResponse](#chorus-com-user-v1-GetUserItemResponse)
    - [RoleOfUserResponse](#chorus-com-user-v1-RoleOfUserResponse)
    - [SearchUserListByNameOrRoleIdRequest](#chorus-com-user-v1-SearchUserListByNameOrRoleIdRequest)
    - [SearchUserListByNameOrRoleIdResponse](#chorus-com-user-v1-SearchUserListByNameOrRoleIdResponse)
    - [SetFlgIsActiveUserRequest](#chorus-com-user-v1-SetFlgIsActiveUserRequest)
    - [SetFlgIsActiveUserResponse](#chorus-com-user-v1-SetFlgIsActiveUserResponse)
    - [UpdateUserDataRequest](#chorus-com-user-v1-UpdateUserDataRequest)
    - [UpdateUserRequest](#chorus-com-user-v1-UpdateUserRequest)
    - [UpdateUserResponse](#chorus-com-user-v1-UpdateUserResponse)
    - [UserAttributeMappingRequest](#chorus-com-user-v1-UserAttributeMappingRequest)
    - [UserAttributeMappingResponse](#chorus-com-user-v1-UserAttributeMappingResponse)
    - [UserFilter](#chorus-com-user-v1-UserFilter)
    - [UserPagination](#chorus-com-user-v1-UserPagination)
  
    - [UsersService](#chorus-com-user-v1-UsersService)
  
- [chorus/com/user_attribute/v1/user_attribute.proto](#chorus_com_user_attribute_v1_user_attribute-proto)
    - [CreateUserAttributeConfiguration](#chorus-com-user_attribute-v1-CreateUserAttributeConfiguration)
    - [CreateUserAttributeRequest](#chorus-com-user_attribute-v1-CreateUserAttributeRequest)
    - [CreateUserAttributeResponse](#chorus-com-user_attribute-v1-CreateUserAttributeResponse)
    - [DeleteUserAttributeRequest](#chorus-com-user_attribute-v1-DeleteUserAttributeRequest)
    - [DeleteUserAttributeResponse](#chorus-com-user_attribute-v1-DeleteUserAttributeResponse)
    - [GetUserAttributeByIdRequest](#chorus-com-user_attribute-v1-GetUserAttributeByIdRequest)
    - [GetUserAttributeByIdResponse](#chorus-com-user_attribute-v1-GetUserAttributeByIdResponse)
    - [SearchUserAttributesByNameOrTypeRequest](#chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeRequest)
    - [SearchUserAttributesByNameOrTypeResponse](#chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeResponse)
    - [UpdateUserAttributeConfiguration](#chorus-com-user_attribute-v1-UpdateUserAttributeConfiguration)
    - [UpdateUserAttributeRequest](#chorus-com-user_attribute-v1-UpdateUserAttributeRequest)
    - [UpdateUserAttributeResponse](#chorus-com-user_attribute-v1-UpdateUserAttributeResponse)
    - [UserAttribute](#chorus-com-user_attribute-v1-UserAttribute)
    - [UserAttributeConfiguration](#chorus-com-user_attribute-v1-UserAttributeConfiguration)
    - [UserAttributeFilter](#chorus-com-user_attribute-v1-UserAttributeFilter)
  
    - [UserAttributeSortBy](#chorus-com-user_attribute-v1-UserAttributeSortBy)
  
    - [UserAttributeService](#chorus-com-user_attribute-v1-UserAttributeService)
  
- [chorus/com/user_group/v1/user_group.proto](#chorus_com_user_group_v1_user_group-proto)
    - [CreateUserGroupRequest](#chorus-com-user_group-v1-CreateUserGroupRequest)
    - [CreateUserGroupResponse](#chorus-com-user_group-v1-CreateUserGroupResponse)
    - [UpdateUserGroupRequest](#chorus-com-user_group-v1-UpdateUserGroupRequest)
    - [UpdateUserGroupResponse](#chorus-com-user_group-v1-UpdateUserGroupResponse)
  
    - [UserGroupService](#chorus-com-user_group-v1-UserGroupService)
  
- [chorus/com/user_set/v1/user_set.proto](#chorus_com_user_set_v1_user_set-proto)
    - [CreateUserSetRequest](#chorus-com-user_set-v1-CreateUserSetRequest)
    - [CreateUserSetRequest.UserSetConditionCreate](#chorus-com-user_set-v1-CreateUserSetRequest-UserSetConditionCreate)
    - [CreateUserSetResponse](#chorus-com-user_set-v1-CreateUserSetResponse)
    - [DeleteUserSetRequest](#chorus-com-user_set-v1-DeleteUserSetRequest)
    - [DeleteUserSetResponse](#chorus-com-user_set-v1-DeleteUserSetResponse)
    - [GetUserSetByIdRequest](#chorus-com-user_set-v1-GetUserSetByIdRequest)
    - [GetUserSetByIdResponse](#chorus-com-user_set-v1-GetUserSetByIdResponse)
    - [MemberOfUserSet](#chorus-com-user_set-v1-MemberOfUserSet)
    - [Pagination](#chorus-com-user_set-v1-Pagination)
    - [SearchMemberListByUserSetIdQuery](#chorus-com-user_set-v1-SearchMemberListByUserSetIdQuery)
    - [SearchMemberListByUserSetIdRequest](#chorus-com-user_set-v1-SearchMemberListByUserSetIdRequest)
    - [SearchMemberListByUserSetIdResponse](#chorus-com-user_set-v1-SearchMemberListByUserSetIdResponse)
    - [SearchUserSetByNameRequest](#chorus-com-user_set-v1-SearchUserSetByNameRequest)
    - [SearchUserSetByNameResponse](#chorus-com-user_set-v1-SearchUserSetByNameResponse)
    - [UpdateUserSetRequest](#chorus-com-user_set-v1-UpdateUserSetRequest)
    - [UpdateUserSetRequest.UserSetConditionUpdate](#chorus-com-user_set-v1-UpdateUserSetRequest-UserSetConditionUpdate)
    - [UpdateUserSetResponse](#chorus-com-user_set-v1-UpdateUserSetResponse)
    - [UserSet](#chorus-com-user_set-v1-UserSet)
    - [UserSetConditionDetail](#chorus-com-user_set-v1-UserSetConditionDetail)
    - [UserSetQuery](#chorus-com-user_set-v1-UserSetQuery)
  
    - [UserSetSortBy](#chorus-com-user_set-v1-UserSetSortBy)
  
    - [UserSetService](#chorus-com-user_set-v1-UserSetService)
  
- [chorus/com/workflow_user_group/v1/workflow_user_group.proto](#chorus_com_workflow_user_group_v1_workflow_user_group-proto)
    - [BulkImportMember](#chorus-com-workflow_user_group-v1-BulkImportMember)
    - [BulkImportMembersRequest](#chorus-com-workflow_user_group-v1-BulkImportMembersRequest)
    - [BulkImportMembersResponse](#chorus-com-workflow_user_group-v1-BulkImportMembersResponse)
    - [CreateWorkflowUserGroupMemberMapping](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupMemberMapping)
    - [CreateWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupRequest)
    - [CreateWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupResponse)
    - [DeleteWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupRequest)
    - [DeleteWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupResponse)
    - [GetListUserSuggestRequest](#chorus-com-workflow_user_group-v1-GetListUserSuggestRequest)
    - [GetListUserSuggestResponse](#chorus-com-workflow_user_group-v1-GetListUserSuggestResponse)
    - [GetWorkflowUserGroupDetailRequest](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailRequest)
    - [GetWorkflowUserGroupDetailResponse](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailResponse)
    - [GetWorkflowUserGroupsByUserIdRequest](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdRequest)
    - [GetWorkflowUserGroupsByUserIdResponse](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdResponse)
    - [MemberUserGroupQuery](#chorus-com-workflow_user_group-v1-MemberUserGroupQuery)
    - [RemoveMemberWorkflowUserGroupMapping](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupMapping)
    - [RemoveMemberWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupRequest)
    - [RemoveMemberWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupResponse)
    - [SearchMemberListByNameOrEmailRequest](#chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailRequest)
    - [SearchMemberListByNameOrEmailResponse](#chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailResponse)
    - [SearchWorkflowUserGroup](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroup)
    - [SearchWorkflowUserGroupByEmailRequest](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailRequest)
    - [SearchWorkflowUserGroupByEmailResponse](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailResponse)
    - [SearchWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupRequest)
    - [SearchWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupResponse)
    - [UpdateActivateFlagRequest](#chorus-com-workflow_user_group-v1-UpdateActivateFlagRequest)
    - [UpdateActivateFlagResponse](#chorus-com-workflow_user_group-v1-UpdateActivateFlagResponse)
    - [UpdateMemberForWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupRequest)
    - [UpdateMemberForWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupResponse)
    - [UpdateRoleForMemberOfGroupRequest](#chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupRequest)
    - [UpdateRoleForMemberOfGroupResponse](#chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupResponse)
    - [UpdateWorkflowUserGroupMemberMapping](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupMemberMapping)
    - [UpdateWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupRequest)
    - [UpdateWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupResponse)
    - [UserList](#chorus-com-workflow_user_group-v1-UserList)
    - [UserListSuggest](#chorus-com-workflow_user_group-v1-UserListSuggest)
    - [WorkflowUserGroup](#chorus-com-workflow_user_group-v1-WorkflowUserGroup)
    - [WorkflowUserGroupQuery](#chorus-com-workflow_user_group-v1-WorkflowUserGroupQuery)
  
    - [WorkflowUserGroupService](#chorus-com-workflow_user_group-v1-WorkflowUserGroupService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="chorus_com_account_request_v1_account_request-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/account_request/v1/account_request.proto



<a name="chorus-com-account_request-v1-AccountRequest"></a>

### AccountRequest
The account request information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_type | [string](#string) |  | The account request type |
| status | [string](#string) |  | The account request status |
| account_type | [string](#string) |  | The account type |
| company_name | [string](#string) |  | Third party company name. Disabled by default |
| division | [string](#string) |  | The account division/offshore center |
| department | [string](#string) | optional | The account department/team |
| email | [string](#string) |  | The account One-Line email |
| user_name | [string](#string) |  | The account user name |
| country | [string](#string) |  | The account country |
| rhq | [string](#string) |  | The account RHQ |
| user_role | [string](#string) | repeated | The account chorus user role |
| city | [string](#string) |  | The account city |
| accessible_office | [string](#string) | repeated | The account accessible offices |
| remarks | [string](#string) | optional | The account remarks |
| department_manager | [string](#string) |  | The account department manager |
| bpm_auth_grp | [string](#string) |  | The account BPM authorization group |
| effective_from | [string](#string) | optional | The account effective date from |
| effective_to | [string](#string) |  | The account effective date to |
| last_updated | [string](#string) |  | The account last updated time |
| requestor | [string](#string) |  | The account requester |
| account_request_id | [string](#string) |  | The account requester id |






<a name="chorus-com-account_request-v1-AccountRequestFilter"></a>

### AccountRequestFilter
The account request Filter for Search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keyword | [string](#string) | optional | The account request keyword. |
| email | [string](#string) |  | The account request email. |






<a name="chorus-com-account_request-v1-AccountRequestInformation"></a>

### AccountRequestInformation
The account request information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) |  | The request id of account request. |
| account_request | [AccountRequestResponse](#chorus-com-account_request-v1-AccountRequestResponse) |  | The account request. |






<a name="chorus-com-account_request-v1-AccountRequestPagination"></a>

### AccountRequestPagination
The pagination for Search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page_size | [int32](#int32) |  | The account request page size. |
| page_number | [int32](#int32) |  | The account request page number. |






<a name="chorus-com-account_request-v1-AccountRequestResponse"></a>

### AccountRequestResponse
The account request information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_type | [string](#string) |  | The account request type |
| status | [string](#string) |  | The account request status |
| account_type | [string](#string) |  | The account type |
| company_name | [string](#string) |  | Third party company name. Disabled by default |
| division | [string](#string) |  | The account division/offshore center |
| department | [string](#string) | optional | The account department/team |
| email | [string](#string) |  | The account One-Line email |
| user_name | [string](#string) |  | The account user name |
| country | [string](#string) |  | The account country |
| rhq | [string](#string) |  | The account RHQ |
| user_role | [RoleOfAccountRequestResponse](#chorus-com-account_request-v1-RoleOfAccountRequestResponse) | repeated | The account chorus user role |
| city | [string](#string) |  | The account city |
| accessible_office | [string](#string) | repeated | The account accessible offices |
| remarks | [string](#string) | optional | The account remarks |
| department_manager | [DepartmentManager](#chorus-com-account_request-v1-DepartmentManager) |  | The account department manager |
| bpm_auth_grp | [string](#string) |  | The account BPM authorization group |
| effective_from | [string](#string) | optional | The account effective date from |
| effective_to | [string](#string) |  | The account effective date to |
| last_updated | [string](#string) |  | The account last updated time |
| requestor | [string](#string) |  | The account requester |
| account_request_id | [string](#string) |  | The account requester id |
| workflow_user_group_id | [string](#string) |  | The account workflow user group id |
| is_bpm_approve | [bool](#bool) |  | The flag check permission approve for BPM |
| is_dm_approve | [bool](#bool) |  | The flag check permission approve for DM |






<a name="chorus-com-account_request-v1-DeleteAccountRequestRequest"></a>

### DeleteAccountRequestRequest
Request message for `AccountRequestService.DeleteAccountRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) |  | The account request id of account request. |






<a name="chorus-com-account_request-v1-DeleteAccountRequestResponse"></a>

### DeleteAccountRequestResponse
Response message for `AccountRequestService.DeleteAccountRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [string](#string) |  | The status of the deletion operation. |






<a name="chorus-com-account_request-v1-DepartmentManager"></a>

### DepartmentManager
the department manager information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | the user id of user |
| user_name | [string](#string) |  | the user name of user |
| user_email | [string](#string) |  | the user email of user |






<a name="chorus-com-account_request-v1-GetAccountRequestByRequestIdRequest"></a>

### GetAccountRequestByRequestIdRequest
Request message for `AccountRequestService.GetAccountRequestByRequestId`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of account request. |






<a name="chorus-com-account_request-v1-GetAccountRequestByRequestIdResponse"></a>

### GetAccountRequestByRequestIdResponse
Response message for `AccountRequestService.GetAccountRequestByRequestId`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_information | [AccountRequestInformation](#chorus-com-account_request-v1-AccountRequestInformation) |  | The account request information. |






<a name="chorus-com-account_request-v1-RoleOfAccountRequestResponse"></a>

### RoleOfAccountRequestResponse
The user response message definition for role.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | The role ID. |
| role_name | [string](#string) |  | The role name. |
| product_code | [string](#string) |  | The product code. |






<a name="chorus-com-account_request-v1-SaveAccountRequestInfoRequest"></a>

### SaveAccountRequestInfoRequest
Request message for `AccountRequestService.SaveAccountRequestInfoRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) | optional | The account request ID |
| account_request_type | [string](#string) |  | The account request type |
| status | [string](#string) |  | The account request status |
| account_type | [string](#string) |  | The account type |
| company_name | [string](#string) |  | Third party company name. Disabled by default |
| division | [string](#string) |  | The account division/offshore center |
| department | [string](#string) | optional | The account department/team |
| email | [string](#string) |  | The account One-Line email |
| user_name | [string](#string) |  | The account user name |
| country | [string](#string) |  | The account country |
| rhq | [string](#string) |  | The account RHQ |
| user_role | [string](#string) | repeated | The account chorus user role |
| city | [string](#string) |  | The account city |
| accessible_office | [string](#string) | repeated | The account accessible offices |
| remarks | [string](#string) | optional | The account remarks |
| department_manager | [string](#string) |  | The account department manager |
| bpm_auth_grp | [string](#string) |  | The account BPM authorization group |
| effective_from | [string](#string) | optional | The account effective date from |
| effective_to | [string](#string) | optional | The account effective date to |
| requestor | [string](#string) |  | The account requester |
| executor | [string](#string) |  | The account request executor |
| workflow_user_group_id | [string](#string) | optional | The workflow user group id |






<a name="chorus-com-account_request-v1-SaveAccountRequestInfoResponse"></a>

### SaveAccountRequestInfoResponse
Response message for `AccountRequestService.SaveAccountRequestInfoResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) | optional | The account request ID |
| account_request_type | [string](#string) |  | The account request type |
| status | [string](#string) |  | The account request status |
| account_type | [string](#string) |  | The account type |
| company_name | [string](#string) |  | Third party company name. Disabled by default |
| division | [string](#string) |  | The account division/offshore center |
| department | [string](#string) | optional | The account department/team |
| email | [string](#string) |  | The account One-Line email |
| user_name | [string](#string) |  | The account user name |
| country | [string](#string) |  | The account country |
| rhq | [string](#string) |  | The account RHQ |
| user_role | [string](#string) | repeated | The account chorus user role |
| city | [string](#string) |  | The account city |
| accessible_office | [string](#string) | repeated | The account accessible offices |
| remarks | [string](#string) | optional | The account remarks |
| department_manager | [string](#string) |  | The account department manager |
| bpm_auth_grp | [string](#string) |  | The account BPM authorization group |
| effective_from | [string](#string) | optional | The account effective date from |
| effective_to | [string](#string) | optional | The account effective date to |
| requestor | [string](#string) |  | The account requester |
| last_updated | [string](#string) |  | The account last updated time |
| executor | [string](#string) |  | The account request executor |
| department_manager_name | [string](#string) |  | The department manager name |
| department_manager_email | [string](#string) |  | The department manager email |
| bpm_group_name | [string](#string) | optional | The bmp group name |
| bpm_group_email | [string](#string) | optional | The bmp group email |
| bpm_group_email_list | [string](#string) | optional | The bmp group email list |
| workflow_id | [string](#string) | optional | The workflow id |






<a name="chorus-com-account_request-v1-SearchListAccountRequest"></a>

### SearchListAccountRequest
Request message for `AccountRequestService.SearchListAccount`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [AccountRequestFilter](#chorus-com-account_request-v1-AccountRequestFilter) | optional | The account request filter. |
| pagination | [AccountRequestPagination](#chorus-com-account_request-v1-AccountRequestPagination) | optional | The account request pagination. |






<a name="chorus-com-account_request-v1-SearchListAccountResponse"></a>

### SearchListAccountResponse
Response message for `AccountRequestService.SearchListAccount`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [AccountRequestResponse](#chorus-com-account_request-v1-AccountRequestResponse) |  | The account request information. |
| total | [int32](#int32) |  | The user total. |






<a name="chorus-com-account_request-v1-UpdateStatusAccountRequest"></a>

### UpdateStatusAccountRequest
Request message for `AccountRequestService.UpdateStatusAccountRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) |  | The account request id of account request. |
| status | [string](#string) |  | The status of account request. |
| remarks | [string](#string) | optional | The remarks of account request. |
| excutor | [string](#string) | optional | The excutor |






<a name="chorus-com-account_request-v1-UpdateStatusAccountResponse"></a>

### UpdateStatusAccountResponse
Response message for `AccountRequestService.UpdateStatusAccountRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_request_id | [string](#string) | optional | The account request ID |
| account_request_type | [string](#string) |  | The account request type |
| status | [string](#string) |  | The account request status |
| account_type | [string](#string) |  | The account type |
| company_name | [string](#string) |  | Third party company name. Disabled by default |
| division | [string](#string) |  | The account division/offshore center |
| department | [string](#string) | optional | The account department/team |
| email | [string](#string) |  | The account One-Line email |
| user_name | [string](#string) |  | The account user name |
| country | [string](#string) |  | The account country |
| rhq | [string](#string) |  | The account RHQ |
| user_role | [string](#string) | repeated | The account chorus user role |
| city | [string](#string) |  | The account city |
| accessible_office | [string](#string) | repeated | The account accessible offices |
| remarks | [string](#string) | optional | The account remarks |
| department_manager | [string](#string) |  | The account department manager |
| bpm_auth_grp | [string](#string) |  | The account BPM authorization group |
| effective_from | [string](#string) | optional | The account effective date from |
| effective_to | [string](#string) | optional | The account effective date to |
| requestor | [string](#string) |  | The account requester |
| last_updated | [string](#string) |  | The account last updated time |
| executor | [string](#string) |  | The account request executor |
| department_manager_name | [string](#string) |  | The department manager name |
| department_manager_email | [string](#string) |  | The department manager email |
| workflow_id | [string](#string) | optional | The workflow id |
| bpm_group_name | [string](#string) | optional | The bmp group name |
| bpm_group_email | [string](#string) | optional | The bmp group email |
| bpm_group_email_list | [string](#string) | optional | The bmp group email list |





 

 

 


<a name="chorus-com-account_request-v1-AccountRequestService"></a>

### AccountRequestService
Services for account request.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetAccountRequestByRequestId | [GetAccountRequestByRequestIdRequest](#chorus-com-account_request-v1-GetAccountRequestByRequestIdRequest) | [GetAccountRequestByRequestIdResponse](#chorus-com-account_request-v1-GetAccountRequestByRequestIdResponse) stream | Get account request information by request id.<br /><br />Operation: MATCH<br /><br />Request: { &#34;request_id&#34; : &#34;CHORUS202404220000001&#34; }<br /><br />Response: { &#34;account_request_information&#34;: { &#34;request_id&#34;: &#34;0018ht&#34;, &#34;account_request_type&#34;: &#34;0018ht&#34;, &#34;status&#34;: &#34;01/08/2023&#34;, &#34;account_type&#34;: 26727, &#34;company_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;division&#34;: &#34;system@one-line.com&#34;, &#34;department&#34; : &#34;department&#34;, &#34;email&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;user_name&#34; : &#34;user_name&#34;, &#34;country&#34; : &#34;VN&#34;, &#34;rhq&#34; : &#34;&#34;, &#34;user_role&#34; : [ { &#34;role_id&#34;: &#34;string&#34;, &#34;role_name&#34;: &#34;string&#34; &#34;product_code&#34;: &#34;string&#34; } ], &#34;city&#34; : &#34;HCM&#34;, &#34;accessible_office&#34; : [&#34;HCM&#34;, &#34;HN&#34;], &#34;remarks&#34; : &#34;test&#34;, &#34;department_manager&#34; : &#34;manager_one_line_email@one-line.mail&#34;, &#34;bpm_auth_grp&#34; : &#34;GroupA&#34;, &#34;effective_from&#34; : &#34;01/08/2023&#34;, &#34;effective_to&#34; : &#34;01/08/2024&#34;, &#34;last_updated&#34; : &#34;01/07/2023&#34;, &#34;requestor&#34; : &#34;one_line_email@one-line.mail&#34;, } } ... |
| SaveAccountRequestInfo | [SaveAccountRequestInfoRequest](#chorus-com-account_request-v1-SaveAccountRequestInfoRequest) | [SaveAccountRequestInfoResponse](#chorus-com-account_request-v1-SaveAccountRequestInfoResponse) | The method for creating account request<br /><br />Operation: CREATE<br /><br />Request: {

 &#34;account_request_type&#34;: &#34;0018ht&#34;, &#34;status&#34;: &#34;01/08/2023&#34;, &#34;account_type&#34;: 26727, &#34;company_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;division&#34;: &#34;system@one-line.com&#34;, &#34;department&#34; : &#34;department&#34;, &#34;email&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;user_name&#34; : &#34;user_name&#34;, &#34;country&#34; : &#34;VN&#34;, &#34;rhq&#34; : &#34;&#34;, &#34;user_role&#34; : [&#34;ROLE_1&#34;], &#34;city&#34; : &#34;HCM&#34;, &#34;accessible_office&#34; : [&#34;HCM&#34;, &#34;HN&#34;], &#34;remarks&#34; : &#34;test&#34;, &#34;department_manager&#34; : &#34;manager_one_line_email@one-line.mail&#34;, &#34;bpm_auth_grp&#34; : &#34;GroupA&#34;, &#34;effective_from&#34; : &#34;01/08/2023&#34;, &#34;effective_to&#34; : &#34;01/08/2024&#34;, &#34;last_updated&#34; : &#34;01/07/2023&#34;, &#34;requestor&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;executor&#34; : &#34;one_line_email@one-line.mail&#34;,

}<br /><br />Response: { &#34;account_request_id&#34;: &#34;CHORUS202404220000001&#34;, &#34;account_request_type&#34;: &#34;0018ht&#34;, &#34;status&#34;: &#34;01/08/2023&#34;, &#34;account_type&#34;: 26727, &#34;company_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;division&#34;: &#34;system@one-line.com&#34;, &#34;department&#34; : &#34;department&#34;, &#34;email&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;user_name&#34; : &#34;user_name&#34;, &#34;country&#34; : &#34;VN&#34;, &#34;rhq&#34; : &#34;&#34;, &#34;user_role&#34; : [&#34;ROLE_1&#34;], &#34;city&#34; : &#34;HCM&#34;, &#34;accessible_office&#34; : [&#34;HCM&#34;, &#34;HN&#34;], &#34;remarks&#34; : &#34;test&#34;, &#34;department_manager&#34; : &#34;manager_one_line_email@one-line.mail&#34;, &#34;bpm_auth_grp&#34; : &#34;GroupA&#34;, &#34;effective_from&#34; : &#34;01/08/2023&#34;, &#34;effective_to&#34; : &#34;01/08/2024&#34;, &#34;last_updated&#34; : &#34;01/07/2023&#34;, &#34;requestor&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;executor&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;is_dm_approve&#34;: false, &#34;is_bpm_approve&#34;: false,

} ... |
| SearchListAccount | [SearchListAccountRequest](#chorus-com-account_request-v1-SearchListAccountRequest) | [SearchListAccountResponse](#chorus-com-account_request-v1-SearchListAccountResponse) stream | The method for search account request list<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;keyword&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34; }, &#34;pagination&#34;: { &#34;page_size&#34;: 0, &#34;page_number&#34;: 0 } }<br /><br />Response: { &#34;data&#34;: { &#34;account_request_type&#34;: &#34;0018ht&#34;, &#34;status&#34;: &#34;01/08/2023&#34;, &#34;account_type&#34;: 26727, &#34;company_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;division&#34;: &#34;system@one-line.com&#34;, &#34;department&#34; : &#34;department&#34;, &#34;email&#34; : &#34;one_line_email@one-line.mail&#34;, &#34;user_name&#34; : &#34;user_name&#34;, &#34;country&#34; : &#34;VN&#34;, &#34;rhq&#34; : &#34;&#34;, &#34;user_role&#34; : &#34;ROLE_1&#34;, &#34;city&#34; : &#34;HCM&#34;, &#34;accessible_office&#34; : [&#34;HCM&#34;, &#34;HN&#34;], &#34;remarks&#34; : &#34;test&#34;, &#34;department_manager&#34; : &#34;manager_one_line_email@one-line.mail&#34;, &#34;bpm_auth_grp&#34; : &#34;GroupA&#34;, &#34;effective_from&#34; : &#34;01/08/2023&#34;, &#34;effective_to&#34; : &#34;01/08/2024&#34;, &#34;last_updated&#34; : &#34;01/07/2023&#34;, &#34;requestor&#34; : &#34;one_line_email@one-line.mail&#34;, }, &#34;total&#34;: 1 } |
| DeleteAccountRequest | [DeleteAccountRequestRequest](#chorus-com-account_request-v1-DeleteAccountRequestRequest) | [DeleteAccountRequestResponse](#chorus-com-account_request-v1-DeleteAccountRequestResponse) | New method for deleting an account request |
| UpdateStatusAccount | [UpdateStatusAccountRequest](#chorus-com-account_request-v1-UpdateStatusAccountRequest) | [UpdateStatusAccountResponse](#chorus-com-account_request-v1-UpdateStatusAccountResponse) | The method for search account request list<br /><br />Operation: DELETE<br /><br />Request: { &#34;account_request_id&#34;: &#34;1&#34;, &#34;status&#34;: &#34;APR&#34;, &#34;remarks&#34;: &#34;Change status to APR&#34;, &#34;excutor&#34;:&#34;test@gmail.com&#34;, }<br /><br />Response: { &#34;success&#34;: true } |

 



<a name="chorus_com_apm_invoice_v1_apm_invoice-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/apm_invoice/v1/apm_invoice.proto



<a name="chorus-com-apm_invoice-v1-ApmInvoice"></a>

### ApmInvoice
The apm invoice information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| invoice_no | [string](#string) |  | The number of apm invoice. |
| invoice_date | [string](#string) |  | The date of apm invoice. |
| total_amount | [double](#double) |  | The total amount of apm invoice. |
| supplier_name | [string](#string) |  | The supplier name of apm invoice. |
| supplier_email | [string](#string) |  | The supplier email of apm invoice. |
| request_id | [string](#string) |  | The request id of apm invoice. |






<a name="chorus-com-apm_invoice-v1-GetApmInvoiceByIdRequest"></a>

### GetApmInvoiceByIdRequest
Request message for `ApmInvoiceInfoService.GetApmInvoiceById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of apm invoice. |






<a name="chorus-com-apm_invoice-v1-GetApmInvoiceByIdResponse"></a>

### GetApmInvoiceByIdResponse
Response message for `ApmInvoiceInfoService.GetApmInvoiceById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| apm_invoice | [ApmInvoice](#chorus-com-apm_invoice-v1-ApmInvoice) |  | The apm invoice information. |






<a name="chorus-com-apm_invoice-v1-GetApmInvoiceByNoRequest"></a>

### GetApmInvoiceByNoRequest
Request message for `ApmInvoiceInfoService.GetApmInvoiceByNo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| invoice_no | [string](#string) |  | The number of apm invoice. |






<a name="chorus-com-apm_invoice-v1-GetApmInvoiceByNoResponse"></a>

### GetApmInvoiceByNoResponse
Response message for `ApmInvoiceInfoService.GetApmInvoiceByNo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| apm_invoice | [ApmInvoice](#chorus-com-apm_invoice-v1-ApmInvoice) |  | The apm invoice information. |






<a name="chorus-com-apm_invoice-v1-ValidateApmInvoiceRequest"></a>

### ValidateApmInvoiceRequest
Request message for `ApmInvoiceInfoService.ValidateApmInvoice`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| invoice_no | [string](#string) |  | The number of apm validation. |
| validation_result | [bool](#bool) |  | The result of validation. |
| failed_reason | [string](#string) |  | The result of validation. |
| validator_name | [string](#string) |  | The validator name of validation. |
| validator_email | [string](#string) |  | The validator email of validation. |
| request_id | [string](#string) |  | The request id of apm invoice. |






<a name="chorus-com-apm_invoice-v1-ValidateApmInvoiceResponse"></a>

### ValidateApmInvoiceResponse
Response message for `ApmInvoiceInfoService.ValidateApmInvoice`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |





 

 

 


<a name="chorus-com-apm_invoice-v1-ApmInvoiceInfoService"></a>

### ApmInvoiceInfoService
Services for apm invoice.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetApmInvoiceByNo | [GetApmInvoiceByNoRequest](#chorus-com-apm_invoice-v1-GetApmInvoiceByNoRequest) | [GetApmInvoiceByNoResponse](#chorus-com-apm_invoice-v1-GetApmInvoiceByNoResponse) | Get apm invoice information by number.<br /><br />Operation: MATCH<br /><br />Request: { &#34;invoice_no&#34; : &#34;0018ht&#34; }<br /><br />Response: { &#34;apm_invoice&#34;: { &#34;invoice_no&#34;: &#34;0018ht&#34;, &#34;invoice_date&#34;: &#34;01/08/2023&#34;, &#34;total_amount&#34;: 26727, &#34;supplier_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;supplier_email&#34;: &#34;system@one-line.com&#34;, &#34;request_id&#34; : &#34;be46004e-0bdb-4c32-ae30-378cdae82203&#34; } } |
| GetApmInvoiceById | [GetApmInvoiceByIdRequest](#chorus-com-apm_invoice-v1-GetApmInvoiceByIdRequest) | [GetApmInvoiceByIdResponse](#chorus-com-apm_invoice-v1-GetApmInvoiceByIdResponse) | Get apm invoice information by request id.<br /><br />Operation: MATCH<br /><br />Request: { &#34;request_id&#34; : &#34;be46004e-0bdb-4c32-ae30-378cdae82203&#34; }<br /><br />Response: { &#34;apm_invoice&#34;: { &#34;invoice_no&#34;: &#34;0018ht&#34;, &#34;invoice_date&#34;: &#34;01/08/2023&#34;, &#34;total_amount&#34;: 26727, &#34;supplier_name&#34;: &#34;magenta singapore terminal pte. ltd.&#34;, &#34;supplier_email&#34;: &#34;system@one-line.com&#34;, &#34;request_id&#34; : &#34;be46004e-0bdb-4c32-ae30-378cdae82203&#34; } } |
| ValidateApmInvoice | [ValidateApmInvoiceRequest](#chorus-com-apm_invoice-v1-ValidateApmInvoiceRequest) | [ValidateApmInvoiceResponse](#chorus-com-apm_invoice-v1-ValidateApmInvoiceResponse) | Create csr information.<br /><br />Operation: VALIDATION<br /><br />Request: { &#34;invoice_no&#34; : &#34;0018ht&#34;, &#34;validation_result&#34; : true, &#34;failed_reason&#34; : &#34;&#34;, &#34;validator_name&#34; : &#34;system&#34;, &#34;validator_email&#34; : &#34;system@one-line.com&#34;, &#34;request_id&#34; : &#34;be46004e-0bdb-4c32-ae30-378cdae82203&#34; }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |

 



<a name="chorus_com_base_v1_base-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/base/v1/base.proto



<a name="chorus-com-base-v1-OrderBy"></a>

### OrderBy
OderBy Field


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| field_name | [string](#string) |  | The field name |
| sort_by | [SortBy](#chorus-com-base-v1-SortBy) |  | The order direction |






<a name="chorus-com-base-v1-Pagination"></a>

### Pagination
Pagination


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page_number | [int32](#int32) |  | The page number |
| page_size | [int32](#int32) |  | The page size |





 


<a name="chorus-com-base-v1-SortBy"></a>

### SortBy
Order Direction

| Name | Number | Description |
| ---- | ------ | ----------- |
| SORT_BY_UNSPECIFIED | 0 | unspecified |
| SORT_BY_ASC | 1 | Ascending |
| SORT_BY_DESC | 2 | Descending |


 

 

 



<a name="chorus_com_csr_v1_csr-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/csr/v1/csr.proto



<a name="chorus-com-csr-v1-ApprovalCsrRequest"></a>

### ApprovalCsrRequest
Request message for `CsrInfoService.ApprovalCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| approver_name | [string](#string) |  | The approver name of csr. |
| approver_email | [string](#string) |  | The approver email of csr. |
| is_approved | [bool](#bool) |  | The value of approval |
| request_id | [string](#string) |  | The request id of csr. |






<a name="chorus-com-csr-v1-ApprovalCsrResponse"></a>

### ApprovalCsrResponse
Response message for `CsrInfoService.ApprovalCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |






<a name="chorus-com-csr-v1-CreateCsrRequest"></a>

### CreateCsrRequest
Request message for `CsrInfoService.CreateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| csr | [Csr](#chorus-com-csr-v1-Csr) |  | The Csr information. |






<a name="chorus-com-csr-v1-CreateCsrResponse"></a>

### CreateCsrResponse
Response message for `CsrInfoService.CreateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |






<a name="chorus-com-csr-v1-Csr"></a>

### Csr
The Csr information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| business | [string](#string) |  | The business name of csr: CSR, SPM ... |
| request_id | [string](#string) |  | The request id of csr. |
| amount | [double](#double) |  | The amount of csr. |
| requestor_name | [string](#string) |  | The requestor name of csr. |
| requestor_email | [string](#string) |  | The requestor email of csr. |
| first_approver_name | [string](#string) |  | The first approver name of csr. |
| first_approver_email | [string](#string) |  | The first approver email of csr. |
| second_approver_name | [string](#string) |  | The second approver name of csr. |
| second_approver_email | [string](#string) |  | The second approver email of csr. |
| redirect_url | [string](#string) |  | The redirect url of csr. |






<a name="chorus-com-csr-v1-GetCsrByIdRequest"></a>

### GetCsrByIdRequest
Request message for `CsrInfoService.GetCsrById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of csr. |






<a name="chorus-com-csr-v1-GetCsrByIdResponse"></a>

### GetCsrByIdResponse
Response message for `CsrInfoService.GetCsrById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| csr | [Csr](#chorus-com-csr-v1-Csr) |  | The Csr information. |






<a name="chorus-com-csr-v1-UpdateCsrRequest"></a>

### UpdateCsrRequest
Request message for `CsrInfoService.UpdateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of csr. |
| amount | [double](#double) |  | The amount of csr. |






<a name="chorus-com-csr-v1-UpdateCsrResponse"></a>

### UpdateCsrResponse
Response message for `CsrInfoService.UpdateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |





 

 

 


<a name="chorus-com-csr-v1-CsrInfoService"></a>

### CsrInfoService
Services for csr.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCsrById | [GetCsrByIdRequest](#chorus-com-csr-v1-GetCsrByIdRequest) | [GetCsrByIdResponse](#chorus-com-csr-v1-GetCsrByIdResponse) | Get csr information by Id.<br /><br />Operation: MATCH<br /><br />Request: { &#34;request_id&#34; : &#34;11501021&#34; }<br /><br />Response: { &#34;csr&#34;: { &#34;business&#34;: &#34;CSR&#34;, &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, &#34;requestor_name&#34;: &#34;system&#34;, &#34;requestor_email&#34;: &#34;system@one-line.com&#34;, &#34;first_approver_name&#34;: &#34;approver1&#34;, &#34;first_approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;second_approver_name&#34;: &#34;approver2&#34;, &#34;second_approver_email&#34;: &#34;approver2@one-line.com&#34;, &#34;redirect_url&#34;: &#34;https://chorus-dev.one-line.com/csr/&#34;, } } |
| CreateCsr | [CreateCsrRequest](#chorus-com-csr-v1-CreateCsrRequest) | [CreateCsrResponse](#chorus-com-csr-v1-CreateCsrResponse) | Create csr information.<br /><br />Operation: CREATE<br /><br />Request: &#34;csr&#34;: { &#34;business&#34;: &#34;CSR&#34;, &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, &#34;requestor_name&#34;: &#34;system&#34;, &#34;requestor_email&#34;: &#34;system@one-line.com&#34;, &#34;first_approver_name&#34;: &#34;approver1&#34;, &#34;first_approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;second_approver_name&#34;: &#34;approver2&#34;, &#34;second_approver_email&#34;: &#34;approver2@one-line.com&#34;, &#34;redirect_url&#34;: &#34;https://chorus-dev.one-line.com/csr/&#34;, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |
| UpdateCsr | [UpdateCsrRequest](#chorus-com-csr-v1-UpdateCsrRequest) | [UpdateCsrResponse](#chorus-com-csr-v1-UpdateCsrResponse) | Update csr information.<br /><br />Operation: UPDATE<br /><br />Request: { &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |
| ApprovalCsr | [ApprovalCsrRequest](#chorus-com-csr-v1-ApprovalCsrRequest) | [ApprovalCsrResponse](#chorus-com-csr-v1-ApprovalCsrResponse) | Approval csr information.<br /><br />Operation: APPROVAL<br /><br />Request: { &#34;request_id&#34;: &#34;11501021&#34;, &#34;approver_name&#34;: &#34;approver1&#34;, &#34;approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;is_approved&#34;: true, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |

 



<a name="chorus_com_email_sending_history_v1_email_sending_history-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/email_sending_history/v1/email_sending_history.proto



<a name="chorus-com-email_sending_history-v1-EmailSending"></a>

### EmailSending
The email sending history service definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The ID of the email sending history. |
| product_code | [string](#string) |  | The product code of the email sending history. |
| subject | [string](#string) |  | The subject of the email sending history. |
| message | [string](#string) |  | The message of the email sending history. |
| recipients | [string](#string) |  | The recipients of the email sending history. |
| status | [string](#string) |  | The status of the email sending history. |
| created_date | [string](#string) |  | The created_at of the email sending history. |
| files | [string](#string) | repeated | The files of the email sending history. |
| template_id | [string](#string) |  | The template id of the email sending history. |
| bcc | [string](#string) |  | The BCC of the email sending history. |
| cc | [string](#string) |  | The CC of the email sending history. |






<a name="chorus-com-email_sending_history-v1-EmailSendingHistory"></a>

### EmailSendingHistory
The request message containing the email sending history.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The ID of the email sending history. |
| status | [string](#string) |  | The status of the email sending history. |
| created_date | [string](#string) |  | The created date of the email sending history. |
| error_message | [string](#string) |  | The error message of the email sending history. |
| message_id | [string](#string) |  | The message id of the email sending history. |
| updated_date | [string](#string) |  | The updated date of the email sending history. |






<a name="chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdRequest"></a>

### GetEmailHistorySendingByIdRequest
The request message containing the query for search email sending history.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The ID of the email sending history. |






<a name="chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdResponse"></a>

### GetEmailHistorySendingByIdResponse
The response message containing the email sending history.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [EmailSendingHistory](#chorus-com-email_sending_history-v1-EmailSendingHistory) |  | The email sending history. |






<a name="chorus-com-email_sending_history-v1-GetEmailSendingDetailRequest"></a>

### GetEmailSendingDetailRequest
The request message get email sending detail.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| notification_message_id | [string](#string) |  | Notification message ID |






<a name="chorus-com-email_sending_history-v1-GetEmailSendingDetailResponse"></a>

### GetEmailSendingDetailResponse
The response message get email sending detail.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [EmailSending](#chorus-com-email_sending_history-v1-EmailSending) |  | The email sending. |






<a name="chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdRequest"></a>

### GetRecipientsStatusByHistoryIdRequest
The request message get recipients status by history id.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| notification_history_id | [string](#string) |  | The ID of the email sending history. |
| pagingation | [Pagingation](#chorus-com-email_sending_history-v1-Pagingation) |  | The pagingation for the get result. |






<a name="chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdResponse"></a>

### GetRecipientsStatusByHistoryIdResponse
The response message containing the status of the recipients.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Recipients](#chorus-com-email_sending_history-v1-Recipients) |  | The email sending history. |






<a name="chorus-com-email_sending_history-v1-Pagingation"></a>

### Pagingation
Pagination for the search result.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| limit | [int32](#int32) |  | limit of the search result. |
| next_cursor | [string](#string) |  | next_cursor of the search result. |






<a name="chorus-com-email_sending_history-v1-Query"></a>

### Query
The request message containing the query for search email sending history.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_code | [string](#string) |  | The product_code to search email sending history. |
| subject | [string](#string) |  | The subject to search email sending history. |
| message | [string](#string) |  | The message to search email sending history. |
| recipients | [string](#string) |  | The recipients to search email sending history. |
| status | [string](#string) |  | The status to search email sending history. |
| from_date | [string](#string) |  | The from created date to search email sending history. |
| to_date | [string](#string) |  | The to created date to search email sending history. |
| bcc | [string](#string) |  | The BCC to search email sending history. |
| cc | [string](#string) |  | The CC to search email sending history. |






<a name="chorus-com-email_sending_history-v1-Recipients"></a>

### Recipients
The message contain status the recipients.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id of recipients. |
| email | [string](#string) |  | The email of recipients. |
| status | [string](#string) |  | The status of recipients. |
| description | [string](#string) |  | The description of recipients. |
| created_date | [string](#string) |  | The created date of recipients. |
| updated_date | [string](#string) |  | The updated date of recipients. |






<a name="chorus-com-email_sending_history-v1-SearchEmailSendingRequest"></a>

### SearchEmailSendingRequest
The request message containing the query for search email sending.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [Query](#chorus-com-email_sending_history-v1-Query) |  | The query for search email sending. |
| pagingation | [Pagingation](#chorus-com-email_sending_history-v1-Pagingation) |  | The pagingation for the search result. |






<a name="chorus-com-email_sending_history-v1-SearchEmailSendingResponse"></a>

### SearchEmailSendingResponse
The response message containing the email sending history.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [EmailSending](#chorus-com-email_sending_history-v1-EmailSending) |  | The email sending. |





 

 

 


<a name="chorus-com-email_sending_history-v1-EmailSendingHistoryService"></a>

### EmailSendingHistoryService
service definition

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchEmailSending | [SearchEmailSendingRequest](#chorus-com-email_sending_history-v1-SearchEmailSendingRequest) | [SearchEmailSendingResponse](#chorus-com-email_sending_history-v1-SearchEmailSendingResponse) stream | Search email sending history.<br /><br />Operation: MATCH<br /><br />Request: { &#34;query&#34;: { &#34;product_code&#34;: &#34;product_code&#34;, &#34;subject&#34;: &#34;subject&#34;, &#34;message&#34;: &#34;message&#34;, &#34;recipients&#34;: &#34;recipients&#34;, &#34;status&#34;: &#34;status&#34;, &#34;from_date&#34;: &#34;from_date&#34;, &#34;to_date&#34;: &#34;to_date&#34;, &#34;bcc&#34;: &#34;bcc&#34;, &#34;cc&#34;: &#34;cc&#34;,

 }, &#34;pagingation&#34;: { &#34;limit&#34;: 10, &#34;next_cursor&#34;: &#34;next_cursor&#34; } }<br /><br />Response: { &#34;data&#34;: { &#34;id&#34;: &#34;id&#34;, &#34;product_code&#34;: &#34;product_code&#34;, &#34;subject&#34;: &#34;subject&#34;, &#34;message&#34;: &#34;message&#34;, &#34;recipients&#34;: &#34;recipients&#34;, &#34;status&#34;: &#34;status&#34;, &#34;created_at&#34;: &#34;created_at&#34;, &#34;template_id&#34;: &#34;template_id&#34;, } } |
| GetEmailHistorySendingById | [GetEmailHistorySendingByIdRequest](#chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdRequest) | [GetEmailHistorySendingByIdResponse](#chorus-com-email_sending_history-v1-GetEmailHistorySendingByIdResponse) stream | Get email sending history by ID.<br /><br />Operation: GET<br /><br />Request: { &#34;id&#34;: &#34;id&#34; }<br /><br />Response: { &#34;data&#34;: { &#34;id&#34;: &#34;id&#34;, &#34;status&#34;: &#34;status&#34;, &#34;created_at&#34;: &#34;created_at&#34;, &#34;error_message&#34;: &#34;error_message&#34;, } } |
| GetRecipientsStatusByHistoryId | [GetRecipientsStatusByHistoryIdRequest](#chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdRequest) | [GetRecipientsStatusByHistoryIdResponse](#chorus-com-email_sending_history-v1-GetRecipientsStatusByHistoryIdResponse) stream | Get recipients status by history id.<br /><br />Operation: GET<br /><br />Request: { &#34;notification_history_id&#34;: &#34;notification_history_id&#34;, &#34;pagingation&#34;: { &#34;limit&#34;: 10, &#34;next_cursor&#34;: &#34;next_cursor&#34; } }<br /><br />Response: { &#34;data&#34;: { &#34;id&#34;: &#34;email&#34;: &#34;email&#34;, &#34;status&#34;: &#34;status&#34;, &#34;description&#34;: &#34;description&#34;, &#34;message_id&#34;: &#34;&#34;, &#34;updated_date&#34;: &#34;&#34;, } } |
| GetEmailSendingDetail | [GetEmailSendingDetailRequest](#chorus-com-email_sending_history-v1-GetEmailSendingDetailRequest) | [GetEmailSendingDetailResponse](#chorus-com-email_sending_history-v1-GetEmailSendingDetailResponse) | Get email sending detail by notification message id.<br /><br />Operation: MATCH<br /><br />Request: { &#34;notification_message_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;data&#34;: { &#34;id&#34;: &#34;id&#34;, &#34;product_code&#34;: &#34;product_code&#34;, &#34;subject&#34;: &#34;subject&#34;, &#34;message&#34;: &#34;message&#34;, &#34;recipients&#34;: &#34;recipients&#34;, &#34;status&#34;: &#34;status&#34;, &#34;files&#34;: [&#34;file1&#34;,&#34;file2&#34;], &#34;created_at&#34;: &#34;created_at&#34;, &#34;template_id&#34;: &#34;template_id&#34;, } } |

 



<a name="chorus_com_intg_cd_dtl_v1_intg_cd_dtl-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/intg_cd_dtl/v1/intg_cd_dtl.proto



<a name="chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest"></a>

### GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest
Request message for `IntegrationCodeDetailInfoService.GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContent`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| integration_code_list | [IntegrationCode](#chorus-com-intg_cd_dtl-v1-IntegrationCode) | repeated | The integration code list. |






<a name="chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse"></a>

### GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse
Response message for `IntegrationCodeDetailInfoService.GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContent`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| integration_code_detail | [IntegrationCodeDetail](#chorus-com-intg_cd_dtl-v1-IntegrationCodeDetail) |  | The integration code information. |






<a name="chorus-com-intg_cd_dtl-v1-IntegrationCode"></a>

### IntegrationCode
The integration code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| integration_code_id | [string](#string) |  | The integration code id. |
| integration_code_value_content | [string](#string) |  | The integration code value content. |






<a name="chorus-com-intg_cd_dtl-v1-IntegrationCodeDetail"></a>

### IntegrationCodeDetail
The integration code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| integration_code_id | [string](#string) |  | The integration_code_id is the integration code id. intg_cd_id in OPUS. |
| integration_code_value_content | [string](#string) |  | The integration_code_value_content is the integration code value content. intg_cd_val_ctnt in OPUS. |
| integration_code_value_display_description | [string](#string) |  | The integration_code_value_display_description is the integration code value display description. intg_cd_val_dp_desc in OPUS. |
| integration_code_value_display_sequence | [int32](#int32) |  | The requestor name of integration code value display sequence. intg_cd_val_dp_seq in OPUS. |





 

 

 


<a name="chorus-com-intg_cd_dtl-v1-IntegrationCodeDetailInfoService"></a>

### IntegrationCodeDetailInfoService
Services for integration code information detail.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContent | [GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest](#chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentRequest) | [GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse](#chorus-com-intg_cd_dtl-v1-GetIntegrationCodeDetailsByIntegrationCodeIdAndIntegrationCodeValueContentResponse) stream | Get integration code detail information by the integration code id and integration code value content.<br /><br />Operation: MATCH<br /><br />Request: &#34;integration_code_list&#34;: [ { &#34;integration_code_id&#34;: &#34;CD00033&#34; &#34;integration_code_value_content&#34;: &#34;MON&#34; } ]<br /><br />Response: { &#34;integration_code_detail&#34;: { &#34;integration_code_id&#34;: &#34;CD00033&#34;, &#34;integration_code_value_content&#34;: &#34;MON&#34;, &#34;integration_code_value_display_description&#34;: &#34;Per 30 Days&#34;, &#34;integration_code_value_display_sequence&#34;: 3, } } ... |

 



<a name="chorus_com_menu_v1_menu-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/menu/v1/menu.proto



<a name="chorus-com-menu-v1-CreateLocalMenuRequest"></a>

### CreateLocalMenuRequest
The message that contains the create local menu request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| parent_id | [string](#string) |  | Parent ID |
| resource | [ResourceAction](#chorus-com-menu-v1-ResourceAction) | repeated | resource |
| menu_name | [string](#string) | optional | Menu name |
| is_active | [bool](#bool) |  | Active |






<a name="chorus-com-menu-v1-CreateLocalMenuResponse"></a>

### CreateLocalMenuResponse
The message that contains the create local menu response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu | [MenuItemIdResponse](#chorus-com-menu-v1-MenuItemIdResponse) |  | menu |






<a name="chorus-com-menu-v1-DeleteMenuByIdRequest"></a>

### DeleteMenuByIdRequest
The message request for delete menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu ID |






<a name="chorus-com-menu-v1-DeleteMenuByIdResponse"></a>

### DeleteMenuByIdResponse
The message response for delete menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | Result of update |






<a name="chorus-com-menu-v1-GetLocalMenuByProductIdRequest"></a>

### GetLocalMenuByProductIdRequest
The message request for get local menu by productId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | product id |






<a name="chorus-com-menu-v1-GetLocalMenuByProductIdResponse"></a>

### GetLocalMenuByProductIdResponse
The message response for get local menu by productId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| parent_id | [string](#string) |  | parent id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| menu_uri | [string](#string) |  | menu uri |






<a name="chorus-com-menu-v1-GetMegaMenuByUserIdRequest"></a>

### GetMegaMenuByUserIdRequest
The request for get mega menu by user id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user id |






<a name="chorus-com-menu-v1-GetMegaMenuByUserIdResponse"></a>

### GetMegaMenuByUserIdResponse
The response for get mega menu by user id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mega_menu | [MegaMenu](#chorus-com-menu-v1-MegaMenu) |  | mega menu infor |






<a name="chorus-com-menu-v1-GetMegaMenuResponse"></a>

### GetMegaMenuResponse
The response for get all mega menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mega_menu | [MegaMenuItem](#chorus-com-menu-v1-MegaMenuItem) |  | mega menu infor |






<a name="chorus-com-menu-v1-GetMenuByParentIdRequest"></a>

### GetMenuByParentIdRequest
The message request for get menu by parentId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parent_id | [string](#string) |  | parent id |
| is_active | [bool](#bool) | optional | is_active |
| is_get_menu_uri | [bool](#bool) | optional | is_get_menu_uri |






<a name="chorus-com-menu-v1-GetMenuByParentIdResponse"></a>

### GetMenuByParentIdResponse
The message response for get menu by parentId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| parent_id | [string](#string) |  | parent id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| menu_uri | [string](#string) |  | menu uri |
| is_active | [bool](#bool) |  | is active |






<a name="chorus-com-menu-v1-GetMenuLevel2ByProductIdRequest"></a>

### GetMenuLevel2ByProductIdRequest
The message request for get menu level2 by productId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | product id |
| is_active | [bool](#bool) | optional | is_active |






<a name="chorus-com-menu-v1-GetMenuLevel2ByProductIdResponse"></a>

### GetMenuLevel2ByProductIdResponse
The message response for get menu level2 by productId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| parent_id | [string](#string) |  | parent id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| menu_uri | [string](#string) |  | menu uri |
| is_active | [bool](#bool) |  | is active |






<a name="chorus-com-menu-v1-GetPinMegaMenuByUserIdRequest"></a>

### GetPinMegaMenuByUserIdRequest
The request for get pin mega menu by user id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user id |






<a name="chorus-com-menu-v1-GetPinMegaMenuByUserIdResponse"></a>

### GetPinMegaMenuByUserIdResponse
The response for get pin mega menu by user id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mega_menu | [MegaMenuItem](#chorus-com-menu-v1-MegaMenuItem) |  | mega menu infor |






<a name="chorus-com-menu-v1-MegaMenu"></a>

### MegaMenu
The message for the mega menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| is_pinned | [bool](#bool) |  | is pinned |
| prefix_uri | [string](#string) |  | prefix uri |
| is_active | [bool](#bool) |  | is active |
| product_code | [string](#string) |  | product code |






<a name="chorus-com-menu-v1-MegaMenuItem"></a>

### MegaMenuItem
The message for the mega menu item


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| prefix_uri | [string](#string) |  | prefix uri |
| is_active | [bool](#bool) |  | is active |
| product_code | [string](#string) |  | product code |






<a name="chorus-com-menu-v1-MegaMenuQuery"></a>

### MegaMenuQuery
The message for mega menu query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mega_menu_name | [string](#string) | optional | mega menu name |
| mega_menu_code | [string](#string) | optional | mega menu code |






<a name="chorus-com-menu-v1-MenuItemIdResponse"></a>

### MenuItemIdResponse
The user response for search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | The menu ID. |






<a name="chorus-com-menu-v1-ResourceAction"></a>

### ResourceAction
The message ResourceAction


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_id | [string](#string) |  | Resource Action ID |
| resource_name | [string](#string) |  | Resource Name |






<a name="chorus-com-menu-v1-SearchMegaMenuByNameOrCodeRequest"></a>

### SearchMegaMenuByNameOrCodeRequest
The message for search role request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [MegaMenuQuery](#chorus-com-menu-v1-MegaMenuQuery) | optional | query |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-menu-v1-SearchMegaMenuByNameOrCodeResponse"></a>

### SearchMegaMenuByNameOrCodeResponse
The message for search role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [MegaMenu](#chorus-com-menu-v1-MegaMenu) |  | data |
| total | [int32](#int32) |  | total |






<a name="chorus-com-menu-v1-SearchMenuDetailByIdRequest"></a>

### SearchMenuDetailByIdRequest
The message for search menu uri


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) | optional | query |






<a name="chorus-com-menu-v1-SearchMenuDetailByIdResponse"></a>

### SearchMenuDetailByIdResponse
The message for search role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu id |
| parent_id | [string](#string) |  | parent id |
| product_id | [string](#string) |  | product id |
| menu_name | [string](#string) |  | menu name |
| menu_icon_file_id | [string](#string) |  | menu icon file id |
| menu_sequence | [int32](#int32) |  | menu sequence |
| menu_uri | [string](#string) |  | menu uri |
| is_active | [bool](#bool) |  | is active |






<a name="chorus-com-menu-v1-UpdateActivateFlagMenuRequest"></a>

### UpdateActivateFlagMenuRequest
The message request for set activate flag menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu ID |
| is_active | [bool](#bool) |  | Active or not |






<a name="chorus-com-menu-v1-UpdateActivateFlagMenuResponse"></a>

### UpdateActivateFlagMenuResponse
The message response for set activate flag menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | Result of update |






<a name="chorus-com-menu-v1-UpdateLocalMenuSequenceRequest"></a>

### UpdateLocalMenuSequenceRequest
The message request for update local menu sequence


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parent_id | [string](#string) |  | The parent id |
| menu_id | [string](#string) |  | The menu id |
| menu_sequence | [int32](#int32) |  | The sequence |






<a name="chorus-com-menu-v1-UpdateLocalMenuSequenceResponse"></a>

### UpdateLocalMenuSequenceResponse
The message response for update local menu sequence


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | The result of update menu sequence |






<a name="chorus-com-menu-v1-UpdateMenuIconPathRequest"></a>

### UpdateMenuIconPathRequest
The message request update menu icon file id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | menu ID |
| menu_icon_path | [string](#string) |  | menu icon file id |






<a name="chorus-com-menu-v1-UpdateMenuIconPathResponse"></a>

### UpdateMenuIconPathResponse
The message response update menu icon file id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | Result of update |






<a name="chorus-com-menu-v1-UpdateMenuSequenceRequest"></a>

### UpdateMenuSequenceRequest
The message request for update menu sequence


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| menu_id | [string](#string) |  | The menu id |
| menu_sequence | [int32](#int32) |  | The sequence |






<a name="chorus-com-menu-v1-UpdateMenuSequenceResponse"></a>

### UpdateMenuSequenceResponse
The message response for update menu sequence


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | The result of update menu sequence |






<a name="chorus-com-menu-v1-UpdatePinnedMegaMenuRequest"></a>

### UpdatePinnedMegaMenuRequest
The request for update pinned mega menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user id |
| menu_id | [string](#string) |  | menu id |
| is_pinned | [bool](#bool) |  | is pinned |






<a name="chorus-com-menu-v1-UpdatePinnedMegaMenuResponse"></a>

### UpdatePinnedMegaMenuResponse
The response for update pinned mega menu


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | result of update |
| is_pinned | [bool](#bool) |  | status of pinned after update |





 

 

 


<a name="chorus-com-menu-v1-MegaMenuService"></a>

### MegaMenuService
The service for mega menu

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetMegaMenuByUserId | [GetMegaMenuByUserIdRequest](#chorus-com-menu-v1-GetMegaMenuByUserIdRequest) | [GetMegaMenuByUserIdResponse](#chorus-com-menu-v1-GetMegaMenuByUserIdResponse) stream | Method get mega menu by user id<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;mega_menu&#34;: { &#34;menu_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;is_pinned&#34;: true, &#34;prefix_uri&#34;: &#34;string&#34; } } |
| GetMegaMenu | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetMegaMenuResponse](#chorus-com-menu-v1-GetMegaMenuResponse) stream | Method get all list of mega menu<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;mega_menu&#34;: { &#34;menu_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;is_active&#34;: true, &#34;product_code&#34;: &#34;string&#34; &#34;prefix_uri&#34;: &#34;string&#34; } } |
| GetPinMegaMenuByUserId | [GetPinMegaMenuByUserIdRequest](#chorus-com-menu-v1-GetPinMegaMenuByUserIdRequest) | [GetPinMegaMenuByUserIdResponse](#chorus-com-menu-v1-GetPinMegaMenuByUserIdResponse) stream | Method get pin mega menu by user id<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;mega_menu&#34;: { &#34;menu_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;is_active&#34;: true, &#34;product_code&#34;: &#34;string&#34; &#34;prefix_uri&#34;: &#34;string&#34; } } |
| GetLocalMenuByProductId | [GetLocalMenuByProductIdRequest](#chorus-com-menu-v1-GetLocalMenuByProductIdRequest) | [GetLocalMenuByProductIdResponse](#chorus-com-menu-v1-GetLocalMenuByProductIdResponse) stream | Method get local menu by product id<br /><br />Operation: MATCH<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;menu_id&#34;: &#34;string&#34;, &#34;parent_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;menu_uri&#34;: &#34;string&#34; } |
| GetMenuByParentId | [GetMenuByParentIdRequest](#chorus-com-menu-v1-GetMenuByParentIdRequest) | [GetMenuByParentIdResponse](#chorus-com-menu-v1-GetMenuByParentIdResponse) stream | Method get menu by parent id<br /><br />Operation: MATCH<br /><br />Request: { &#34;parent_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;menu_id&#34;: &#34;string&#34;, &#34;parent_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;menu_uri&#34;: &#34;string&#34; } |
| GetMenuLevel2ByProductId | [GetMenuLevel2ByProductIdRequest](#chorus-com-menu-v1-GetMenuLevel2ByProductIdRequest) | [GetMenuLevel2ByProductIdResponse](#chorus-com-menu-v1-GetMenuLevel2ByProductIdResponse) stream | Method get menu level2 by product id<br /><br />Operation: MATCH<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;menu_id&#34;: &#34;string&#34;, &#34;parent_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;menu_uri&#34;: &#34;string&#34; } |
| UpdatePinnedMegaMenu | [UpdatePinnedMegaMenuRequest](#chorus-com-menu-v1-UpdatePinnedMegaMenuRequest) | [UpdatePinnedMegaMenuResponse](#chorus-com-menu-v1-UpdatePinnedMegaMenuResponse) | Method update pinned mega menu<br /><br />Operation: UPDATE<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34;, &#34;menu_id&#34;: &#34;string&#34;, &#34;is_pinned&#34;: true }<br /><br />Response: { &#34;success&#34;: true, &#34;is_pinned&#34;: true } |
| SearchMegaMenuByNameOrCode | [SearchMegaMenuByNameOrCodeRequest](#chorus-com-menu-v1-SearchMegaMenuByNameOrCodeRequest) | [SearchMegaMenuByNameOrCodeResponse](#chorus-com-menu-v1-SearchMegaMenuByNameOrCodeResponse) stream | Method search mega menu by menu name or menu code<br /><br />Operation: MATCH<br /><br />Request: { &#34;query&#34;: { &#34;mega_menu_name&#34;: &#34;string&#34;, &#34;mega_menu_code&#34;: &#34;string&#34;, }, &#34;pagination&#34;: { &#34;page&#34;: 0, &#34;page_size&#34;: 0 } } /Response: { &#34;data&#34;: { &#34;menu_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;prefix_uri&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;product_code&#34;: &#34;string&#34; }, &#34;total&#34;: 1 } |
| UpdateMenuSequence | [UpdateMenuSequenceRequest](#chorus-com-menu-v1-UpdateMenuSequenceRequest) | [UpdateMenuSequenceResponse](#chorus-com-menu-v1-UpdateMenuSequenceResponse) | Method update menu sequence<br /><br />Operation: UPDATE<br /><br />Request: { &#34;menu_sequence&#34;: 1, &#34;menu_id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;success&#34;: true, } |
| UpdateLocalMenuSequence | [UpdateLocalMenuSequenceRequest](#chorus-com-menu-v1-UpdateLocalMenuSequenceRequest) | [UpdateLocalMenuSequenceResponse](#chorus-com-menu-v1-UpdateLocalMenuSequenceResponse) | Method update local menu sequence<br /><br />Operation: UPDATE<br /><br />Request: { &#34;parent_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 1, &#34;menu_id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;success&#34;: true, } |
| UpdateActivateFlagMenu | [UpdateActivateFlagMenuRequest](#chorus-com-menu-v1-UpdateActivateFlagMenuRequest) | [UpdateActivateFlagMenuResponse](#chorus-com-menu-v1-UpdateActivateFlagMenuResponse) | Method update menu active flag<br /><br />Operation: UPDATE<br /><br />Request: { &#34;is_active&#34;: true, &#34;menu_id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;success&#34;: true, } |
| UpdateMenuIconPath | [UpdateMenuIconPathRequest](#chorus-com-menu-v1-UpdateMenuIconPathRequest) | [UpdateMenuIconPathResponse](#chorus-com-menu-v1-UpdateMenuIconPathResponse) | Method update menu icon path<br /><br />Operation: UPDATE<br /><br />Request: { &#34;menu_id&#34;: &#34;string&#34;, &#34;menu_icon_path&#34;: &#34;string&#34;, } |
| DeleteMenuById | [DeleteMenuByIdRequest](#chorus-com-menu-v1-DeleteMenuByIdRequest) | [DeleteMenuByIdResponse](#chorus-com-menu-v1-DeleteMenuByIdResponse) | Method delete menu by id<br /><br />Operation: DELETE<br /><br />Request: { &#34;menu_id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;success&#34;: true, } |
| CreateLocalMenu | [CreateLocalMenuRequest](#chorus-com-menu-v1-CreateLocalMenuRequest) | [CreateLocalMenuResponse](#chorus-com-menu-v1-CreateLocalMenuResponse) stream | The method for create local menu<br /><br />Operation: Create<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34;, &#34;parent_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;resource&#34;: [{ resource_action_id: &#34;string&#34;, resource_name: &#34;string&#34; }, ], }<br /><br />Response: { [ &#34;menu_id&#34;: &#34;string&#34;, ] } |
| SearchMenuDetailById | [SearchMenuDetailByIdRequest](#chorus-com-menu-v1-SearchMenuDetailByIdRequest) | [SearchMenuDetailByIdResponse](#chorus-com-menu-v1-SearchMenuDetailByIdResponse) stream | Method search menu detail by menu id<br /><br />Operation: MATCH<br /><br />Request: { &#34;menu_id&#34;: &#34;menuIdEx&#34; } Response: { &#34;menu_id&#34;: &#34;string&#34;, &#34;parent_id&#34;: &#34;string&#34;, &#34;product_id&#34;: &#34;string&#34;, &#34;menu_name&#34;: &#34;string&#34;, &#34;menu_icon_file_id&#34;: &#34;string&#34;, &#34;menu_sequence&#34;: 0, &#34;menu_uri&#34;: &#34;string&#34; } |

 



<a name="chorus_com_notification_v1_notification-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/notification/v1/notification.proto



<a name="chorus-com-notification-v1-CreateEmailNotificationRequest"></a>

### CreateEmailNotificationRequest
The request for the create email notification.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| notification | [EmailNotification](#chorus-com-notification-v1-EmailNotification) |  | The notification to create. |






<a name="chorus-com-notification-v1-CreateEmailNotificationResponse"></a>

### CreateEmailNotificationResponse
The response for the create email notification request.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status of the create. |
| message | [string](#string) |  | The message of the response. |






<a name="chorus-com-notification-v1-CreateInAppNotificationRequest"></a>

### CreateInAppNotificationRequest
The request for the create notification.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| notification | [InAppNotification](#chorus-com-notification-v1-InAppNotification) |  | The notification to create. |






<a name="chorus-com-notification-v1-CreateInAppNotificationResponse"></a>

### CreateInAppNotificationResponse
The response for the create notification request.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status of the create. |
| message | [string](#string) |  | The message of the response. |






<a name="chorus-com-notification-v1-EmailNotification"></a>

### EmailNotification
The email notification message definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product | [string](#string) |  | The product code |
| recipients | [string](#string) | repeated | The email of the recipients. |
| subject | [string](#string) |  | The subject of the email. |
| content | [string](#string) |  | The content of the email. |
| template_id | [string](#string) |  | The templete of the email. |
| dynamic_template_data | [EmailNotification.DynamicTemplateDataEntry](#chorus-com-notification-v1-EmailNotification-DynamicTemplateDataEntry) | repeated | The dynamic template data. |
| files | [string](#string) | repeated | The files to attach to the email. |
| notification_message_id | [string](#string) | optional | The options for the email. |






<a name="chorus-com-notification-v1-EmailNotification-DynamicTemplateDataEntry"></a>

### EmailNotification.DynamicTemplateDataEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="chorus-com-notification-v1-InAppNotification"></a>

### InAppNotification
The In App notification message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product | [string](#string) |  | The product code |
| recipients | [string](#string) | repeated | The email of the recipients. |
| title | [string](#string) |  | The title of the notification. |
| message | [string](#string) |  | The message the notification. |
| options | [InAppOptions](#chorus-com-notification-v1-InAppOptions) |  | Options for the notification. |






<a name="chorus-com-notification-v1-InAppOptions"></a>

### InAppOptions
The options for the in app notification.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| link | [string](#string) |  | The link to the notification. |





 

 

 


<a name="chorus-com-notification-v1-NotificationService"></a>

### NotificationService
The notification service definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateInAppNotification | [CreateInAppNotificationRequest](#chorus-com-notification-v1-CreateInAppNotificationRequest) | [CreateInAppNotificationResponse](#chorus-com-notification-v1-CreateInAppNotificationResponse) | Create a in app notification.<br /><br />Operation: CREATE<br /><br />Request: { &#34;notification&#34;: { &#34;product&#34;: &#34;product_code&#34;, &#34;recipients&#34;: [&#34;email1&#34;, &#34;email2&#34;], &#34;title&#34;: &#34;Notification Title&#34;, &#34;message&#34;: &#34;Notification Message&#34;, &#34;options&#34;: { &#34;link&#34;: &#34;https://example.com&#34; } } }<br /><br />Response: { &#34;status&#34;: true, &#34;message&#34;: &#34;Notification created successfully&#34; } |
| CreateEmailNotification | [CreateEmailNotificationRequest](#chorus-com-notification-v1-CreateEmailNotificationRequest) | [CreateEmailNotificationResponse](#chorus-com-notification-v1-CreateEmailNotificationResponse) | create a email notification.<br /><br />Operation: CREATE<br /><br />Request: { &#34;notification&#34;: { &#34;product&#34;: &#34;product_code&#34;, &#34;recipients&#34;: [&#34;email1&#34;, &#34;email2&#34;], &#34;subject&#34;: &#34;Email Subject&#34;, &#34;content&#34;: &#34;Email Content&#34;, &#34;template_id&#34;: &#34;template_id&#34;, &#34;dynamic_template_data&#34;: { &#34;key1&#34;: &#34;value1&#34;, &#34;key2&#34;: &#34;value2&#34; }, &#34;files&#34;: [&#34;file1&#34;, &#34;file2&#34;], &#34;notification_message_id&#34;: &#34;notification_message_id&#34; } }<br /><br />Response: { &#34;status&#34;: true, &#34;message&#34;: &#34;Notification created successfully&#34; } |

 



<a name="chorus_com_policy_v1_policy-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/policy/v1/policy.proto



<a name="chorus-com-policy-v1-ColumnPolicy"></a>

### ColumnPolicy
The column policy


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| column_id | [string](#string) |  | The column id |
| column_name | [string](#string) |  | The column name |
| sub_group | [string](#string) |  | The sub group |
| resource_actions | [ResourceActionPolicy](#chorus-com-policy-v1-ResourceActionPolicy) | repeated | The resource actions |






<a name="chorus-com-policy-v1-GetListPoliciesRequest"></a>

### GetListPoliciesRequest
The policy list Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |






<a name="chorus-com-policy-v1-GetListPoliciesResponse"></a>

### GetListPoliciesResponse
The policy list response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| group_name | [string](#string) |  | The group name |
| super_group | [string](#string) |  | The super group |
| columns | [ColumnPolicy](#chorus-com-policy-v1-ColumnPolicy) | repeated | The columns |






<a name="chorus-com-policy-v1-GetResourceActionByUserRequest"></a>

### GetResourceActionByUserRequest
The request message for get resource action by user


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user id |






<a name="chorus-com-policy-v1-GetResourceActionByUserResponse"></a>

### GetResourceActionByUserResponse
The response message for get resource action by user


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_name | [string](#string) |  | The resource action name |
| method | [string](#string) |  | the resource method |
| uri | [string](#string) |  | The resource uri |






<a name="chorus-com-policy-v1-PolicyRoleQuery"></a>

### PolicyRoleQuery
The message for query policy role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| role_name | [string](#string) | optional | Role Name |






<a name="chorus-com-policy-v1-ResourceActionPolicy"></a>

### ResourceActionPolicy
The resource action policy


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_id | [string](#string) |  | The resource action id |
| resource_action_name | [string](#string) |  | The resource action name |
| checked | [bool](#bool) |  | The checked value |






<a name="chorus-com-policy-v1-SearchPoliciesRoleRequest"></a>

### SearchPoliciesRoleRequest
The search policy role list Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [PolicyRoleQuery](#chorus-com-policy-v1-PolicyRoleQuery) |  | Query |






<a name="chorus-com-policy-v1-SearchPoliciesRoleResponse"></a>

### SearchPoliciesRoleResponse
The search policy role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| group_name | [string](#string) |  | The group name |
| columns | [ColumnPolicy](#chorus-com-policy-v1-ColumnPolicy) | repeated | The columns |






<a name="chorus-com-policy-v1-SearchPolicyUserSetsRequest"></a>

### SearchPolicyUserSetsRequest
The users set policy list Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| user_set_name | [string](#string) |  | user set name |






<a name="chorus-com-policy-v1-SearchPolicyUserSetsResponse"></a>

### SearchPolicyUserSetsResponse
The policy users set list response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| group_name | [string](#string) |  | The group name |
| columns | [ColumnPolicy](#chorus-com-policy-v1-ColumnPolicy) | repeated | The columns |






<a name="chorus-com-policy-v1-UpdatePolicyRequest"></a>

### UpdatePolicyRequest
The request message for update policy


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| group_type | [string](#string) |  | The group type |
| resource_action_id | [string](#string) |  | The resource action id |
| checked | [bool](#bool) |  | The checked value |






<a name="chorus-com-policy-v1-UpdatePolicyResponse"></a>

### UpdatePolicyResponse
The response message for update policy


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The success flag |






<a name="chorus-com-policy-v1-UpdatePolicyRoleRequest"></a>

### UpdatePolicyRoleRequest
The request message for update policy role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| resource_action_id | [string](#string) |  | The resource action id |
| checked | [bool](#bool) |  | The checked value |






<a name="chorus-com-policy-v1-UpdatePolicyRoleResponse"></a>

### UpdatePolicyRoleResponse
The response message for update check uncheck policy role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The success flag |






<a name="chorus-com-policy-v1-UpdatePolicyUserSetRequest"></a>

### UpdatePolicyUserSetRequest
The request message for update policy


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group id |
| resource_action_id | [string](#string) |  | The resource action id |
| checked | [bool](#bool) |  | The checked value |






<a name="chorus-com-policy-v1-UpdatePolicyUserSetResponse"></a>

### UpdatePolicyUserSetResponse
The response message for update policy user set


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The success flag |





 

 

 


<a name="chorus-com-policy-v1-PolicyService"></a>

### PolicyService
The policy service

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| UpdatePolicy | [UpdatePolicyRequest](#chorus-com-policy-v1-UpdatePolicyRequest) | [UpdatePolicyResponse](#chorus-com-policy-v1-UpdatePolicyResponse) | The method for update policy<br /><br />Operation: UPDATE<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;group_type&#34;: &#34;string&#34;, &#34;resource_action_id&#34;: &#34;string&#34;, &#34;checked&#34;: true }<br /><br />Response: { &#34;success&#34;: true } |
| GetListPolicies | [GetListPoliciesRequest](#chorus-com-policy-v1-GetListPoliciesRequest) | [GetListPoliciesResponse](#chorus-com-policy-v1-GetListPoliciesResponse) stream | The method for get list policies<br /><br />Operation: GET ALL<br /><br />Request: { product_id: &#34;product_id&#34; }<br /><br />Response: { &#34;group_id&#34;: &#34;string&#34;, &#34;group_name&#34;: &#34;string&#34;, &#34;super_group&#34;: &#34;string&#34;, &#34;columns&#34;: [ { &#34;column_id&#34;: &#34;string&#34;, &#34;column_name&#34;: &#34;string&#34;, &#34;sub_group&#34;: &#34;string&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_id&#34;: &#34;string&#34;, &#34;resource_action_name&#34;: &#34;string&#34;, &#34;checked&#34;: true } ] } ] } |
| GetResourceActionByUser | [GetResourceActionByUserRequest](#chorus-com-policy-v1-GetResourceActionByUserRequest) | [GetResourceActionByUserResponse](#chorus-com-policy-v1-GetResourceActionByUserResponse) stream | The method for get resource action by user<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;resource_action_name&#34;: &#34;string&#34;, &#34;method&#34;: &#34;string&#34;, &#34;uri&#34;: &#34;string&#34; } |
| SearchPolicyUserSets | [SearchPolicyUserSetsRequest](#chorus-com-policy-v1-SearchPolicyUserSetsRequest) | [SearchPolicyUserSetsResponse](#chorus-com-policy-v1-SearchPolicyUserSetsResponse) stream | The method for get list policy user set<br /><br />Operation: MATCH<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34; &#34;name&#34;: &#34;string&#34; }<br /><br />Response: { &#34;group_id&#34;: &#34;string&#34;, &#34;columns&#34;: [ { &#34;column_id&#34;: &#34;string&#34;, &#34;column_name&#34;: &#34;string&#34;, &#34;sub_group&#34;: &#34;string&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_id&#34;: &#34;string&#34;, &#34;resource_action_name&#34;: &#34;string&#34;, &#34;checked&#34;: true } ] } ] } |
| UpdatePolicyUserSet | [UpdatePolicyUserSetRequest](#chorus-com-policy-v1-UpdatePolicyUserSetRequest) | [UpdatePolicyUserSetResponse](#chorus-com-policy-v1-UpdatePolicyUserSetResponse) | The method for update policy user set<br /><br />Operation: UPDATE<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;resource_action_id&#34;: &#34;string&#34;, &#34;checked&#34;: true }<br /><br />Response: { &#34;success&#34;: true } |
| UpdatePolicyRole | [UpdatePolicyRoleRequest](#chorus-com-policy-v1-UpdatePolicyRoleRequest) | [UpdatePolicyRoleResponse](#chorus-com-policy-v1-UpdatePolicyRoleResponse) | The method for update policy for role<br /><br />Operation: UPDATE<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;resource_action_id&#34;: &#34;string&#34;, &#34;checked&#34;: true }<br /><br />Response: { &#34;success&#34;: true } |
| SearchPoliciesRole | [SearchPoliciesRoleRequest](#chorus-com-policy-v1-SearchPoliciesRoleRequest) | [SearchPoliciesRoleResponse](#chorus-com-policy-v1-SearchPoliciesRoleResponse) stream | The method for search policies role <br /><br />Operation: GET ALL<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34;, &#34;role_name&#34;: &#34;string&#34; }<br /><br />Response: { &#34;group_id&#34;: &#34;string&#34;, &#34;group_name&#34;: &#34;string&#34;, &#34;columns&#34;: [ { &#34;column_id&#34;: &#34;string&#34;, &#34;column_name&#34;: &#34;string&#34;, &#34;sub_group&#34;: &#34;string&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_id&#34;: &#34;string&#34;, &#34;resource_action_name&#34;: &#34;string&#34;, &#34;checked&#34;: true } ] } ] } |

 



<a name="chorus_com_product_v1_product-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/product/v1/product.proto



<a name="chorus-com-product-v1-CreateProductRequest"></a>

### CreateProductRequest
The message that contains the create product request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_name | [string](#string) |  | Product Name |
| is_active | [bool](#bool) |  | Active or not |
| description | [string](#string) |  | Description |
| product_code | [string](#string) |  | Product Code |






<a name="chorus-com-product-v1-CreateProductResponse"></a>

### CreateProductResponse
The message that contains the create product response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |






<a name="chorus-com-product-v1-GetProductDetailRequest"></a>

### GetProductDetailRequest
The message request for get product detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |






<a name="chorus-com-product-v1-GetProductDetailResponse"></a>

### GetProductDetailResponse
The message response for get product detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Product](#chorus-com-product-v1-Product) |  | Product |






<a name="chorus-com-product-v1-GetProductsByUserEmailRequest"></a>

### GetProductsByUserEmailRequest
The message request for get product by user email


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | User email |






<a name="chorus-com-product-v1-GetProductsByUserEmailResponse"></a>

### GetProductsByUserEmailResponse
The message response for get product by user email


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product | [Product](#chorus-com-product-v1-Product) |  | Product list |






<a name="chorus-com-product-v1-Product"></a>

### Product
The message that contains the product information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| product_name | [string](#string) |  | Product Name |
| is_active | [bool](#bool) |  | Active or not |
| description | [string](#string) |  | Description |
| product_code | [string](#string) |  | Product Code |






<a name="chorus-com-product-v1-ProductQuery"></a>

### ProductQuery
The message for query product


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_name | [string](#string) | optional | Product Name |
| is_active | [bool](#bool) | optional | is active |
| product_code | [string](#string) | optional | Product Code |






<a name="chorus-com-product-v1-SearchProductRequest"></a>

### SearchProductRequest
The message request for search product


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [ProductQuery](#chorus-com-product-v1-ProductQuery) | optional | Query |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-product-v1-SearchProductResponse"></a>

### SearchProductResponse
The message response for search product


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Product](#chorus-com-product-v1-Product) |  | Product list |
| total | [int32](#int32) |  | total |






<a name="chorus-com-product-v1-UpdateActivateFlagProductRequest"></a>

### UpdateActivateFlagProductRequest
The message request for set activate flag product


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| is_active | [bool](#bool) |  | Active or not |






<a name="chorus-com-product-v1-UpdateActivateFlagProductResponse"></a>

### UpdateActivateFlagProductResponse
The message response for set activate flag product


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | Result of update |






<a name="chorus-com-product-v1-UpdateProductRequest"></a>

### UpdateProductRequest
The message that contains the update product request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | Product ID |
| product_name | [string](#string) |  | Product Name |
| is_active | [bool](#bool) |  | Active or not |
| description | [string](#string) |  | Description |
| product_code | [string](#string) |  | Product Code |






<a name="chorus-com-product-v1-UpdateProductResponse"></a>

### UpdateProductResponse
The message that contains the update product response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | Result of update |





 

 

 


<a name="chorus-com-product-v1-ProductService"></a>

### ProductService
The service for product

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateProduct | [CreateProductRequest](#chorus-com-product-v1-CreateProductRequest) | [CreateProductResponse](#chorus-com-product-v1-CreateProductResponse) | The method for create product<br /><br />Operation: Create<br /><br />Request: { &#34;product_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;product_id&#34;: &#34;string&#34; } |
| SearchProduct | [SearchProductRequest](#chorus-com-product-v1-SearchProductRequest) | [SearchProductResponse](#chorus-com-product-v1-SearchProductResponse) stream | The method for search product<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;product_name&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, }, &#34;pagination&#34;: { &#34;page&#34;: 0, &#34;page_size&#34;: 0 } }<br /><br />Response: { &#34;data&#34;: { &#34;product_id&#34;: &#34;string&#34;, &#34;product_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, }, &#34;total&#34;: 0 } |
| GetProductDetail | [GetProductDetailRequest](#chorus-com-product-v1-GetProductDetailRequest) | [GetProductDetailResponse](#chorus-com-product-v1-GetProductDetailResponse) | The method for get product detail<br /><br />Operation: MATCH<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;data&#34;: { &#34;product_id&#34;: &#34;string&#34;, &#34;product_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, } } |
| UpdateProduct | [UpdateProductRequest](#chorus-com-product-v1-UpdateProductRequest) | [UpdateProductResponse](#chorus-com-product-v1-UpdateProductResponse) | The method for update product<br /><br />Operation: Update<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34;, &#34;product_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;result&#34;: true } |
| UpdateActivateFlagProduct | [UpdateActivateFlagProductRequest](#chorus-com-product-v1-UpdateActivateFlagProductRequest) | [UpdateActivateFlagProductResponse](#chorus-com-product-v1-UpdateActivateFlagProductResponse) | The method for set activate flag product<br /><br />Operation: Update<br /><br />Request: { &#34;product_id&#34;: &#34;string&#34;, &#34;is_active&#34;: true }<br /><br />Response: { &#34;result&#34;: true } |
| GetProductsByUserEmail | [GetProductsByUserEmailRequest](#chorus-com-product-v1-GetProductsByUserEmailRequest) | [GetProductsByUserEmailResponse](#chorus-com-product-v1-GetProductsByUserEmailResponse) stream | The method for get product by user email<br /><br />Operation: MATCH<br /><br />Request: { email: string }<br /><br />Response: { &#34;data&#34;: { &#34;product_id&#34;: &#34;string&#34;, &#34;product_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, }, &#34;total&#34;: 0 } |

 



<a name="chorus_com_resource_v1_resource-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/resource/v1/resource.proto



<a name="chorus-com-resource-v1-CreateResourceRequest"></a>

### CreateResourceRequest
The message request for create resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_name | [string](#string) |  | The resource name |
| description | [string](#string) |  | The resource description |
| resource_actions | [ResourceActionCreate](#chorus-com-resource-v1-ResourceActionCreate) | repeated | The resource action |
| resource_attributes | [ResourceAttributeCreate](#chorus-com-resource-v1-ResourceAttributeCreate) | repeated | The resource attribute |
| product_id | [string](#string) |  | The product id |
| is_active | [bool](#bool) |  | The is_active flag |






<a name="chorus-com-resource-v1-CreateResourceResponse"></a>

### CreateResourceResponse
The message response for create resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| resource_name | [string](#string) |  | The resource name |






<a name="chorus-com-resource-v1-DeleteResourceRequest"></a>

### DeleteResourceRequest
The message request for delete resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |






<a name="chorus-com-resource-v1-DeleteResourceResponse"></a>

### DeleteResourceResponse
The message response for delete resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | The result of delete resource |






<a name="chorus-com-resource-v1-GetResourceActionsTypeScreenRequest"></a>

### GetResourceActionsTypeScreenRequest
The message request for get resource action type screen


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| product_id | [string](#string) |  | The product id |






<a name="chorus-com-resource-v1-GetResourceActionsTypeScreenResponse"></a>

### GetResourceActionsTypeScreenResponse
The message response for get resource action type screen


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action | [ResourceActionTypeScreen](#chorus-com-resource-v1-ResourceActionTypeScreen) |  | The result of get resource action type screen |






<a name="chorus-com-resource-v1-GetResourceDetailRequest"></a>

### GetResourceDetailRequest
The message request for get resource detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |






<a name="chorus-com-resource-v1-GetResourceDetailResponse"></a>

### GetResourceDetailResponse
The message response for get resource detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| resource_name | [string](#string) |  | The resource name |
| description | [string](#string) |  | The resource description |
| is_active | [bool](#bool) |  | The is_active flag |
| resource_actions | [ResourceActionDetail](#chorus-com-resource-v1-ResourceActionDetail) | repeated | The resource action |
| resource_attributes | [ResourceAttributeDetail](#chorus-com-resource-v1-ResourceAttributeDetail) | repeated | The resource attribute |
| product_id | [string](#string) |  | The product id |






<a name="chorus-com-resource-v1-Resource"></a>

### Resource
The message for the resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| resource_name | [string](#string) |  | The resource name |
| attributes | [string](#string) |  | The resource atributes |
| actions | [string](#string) |  | The resource actions |
| product_id | [string](#string) |  | The product id |
| product_name | [string](#string) |  | The product name |
| is_active | [bool](#bool) |  | The is_active flag |






<a name="chorus-com-resource-v1-ResourceActionCreate"></a>

### ResourceActionCreate
The message for the resource action


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_name | [string](#string) |  | The resource action name |
| resource_action_type | [string](#string) |  | The resource action type |
| method | [string](#string) | repeated | The method action |
| uri | [string](#string) |  | The resource action uri |
| description | [string](#string) |  | The resource action description |






<a name="chorus-com-resource-v1-ResourceActionDetail"></a>

### ResourceActionDetail
The message response for get resource action detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_id | [string](#string) |  | The resource id |
| resource_action_name | [string](#string) |  | The resource action name |
| method | [string](#string) | optional | The method action |
| uri | [string](#string) |  | The resource action uri |
| description | [string](#string) |  | The resource action description |
| resource_action_methods | [ResourceActionMethod](#chorus-com-resource-v1-ResourceActionMethod) | repeated | The resource action method |
| resource_action_type | [string](#string) |  | The resource action type |






<a name="chorus-com-resource-v1-ResourceActionMethod"></a>

### ResourceActionMethod
The message for the resource action method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_action_method_id | [string](#string) |  | The resource action method id |
| resource_action_id | [string](#string) |  | The resource action id |
| resource_action_method_seq | [int32](#int32) |  | The resource action method seq |
| method | [string](#string) |  | The action method |






<a name="chorus-com-resource-v1-ResourceActionTypeScreen"></a>

### ResourceActionTypeScreen
The message for resource action type screen


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_name | [string](#string) |  | The resource name |
| resource_action_id | [string](#string) |  | The resource action id |
| uri | [string](#string) |  | The resource action uri |






<a name="chorus-com-resource-v1-ResourceAttribute"></a>

### ResourceAttribute
The message for the resource attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| resource_attribute_id | [string](#string) |  | The resource attribute id |
| resource_attribute_name | [string](#string) |  | The resource attribute name |






<a name="chorus-com-resource-v1-ResourceAttributeCreate"></a>

### ResourceAttributeCreate
The message for the resource attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_attribute_name | [string](#string) |  | The resource attribute name |
| resource_attribute_type | [string](#string) |  | The resource attribute type |






<a name="chorus-com-resource-v1-ResourceAttributeDetail"></a>

### ResourceAttributeDetail
The message response for get resource attribute detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_attribute_id | [string](#string) |  | The resource attribute id |
| resource_attribute_name | [string](#string) |  | The resource attribute name |
| resource_attribute_type | [string](#string) |  | The resource attribute type |






<a name="chorus-com-resource-v1-ResourceAttributeQuery"></a>

### ResourceAttributeQuery
The message request for query search resource attributes


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_attribute_name | [string](#string) | optional | The resource attribute name |






<a name="chorus-com-resource-v1-ResourceQuery"></a>

### ResourceQuery
The message for query resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_name | [string](#string) | optional | The resource name |
| product_id | [string](#string) | optional | The product id |






<a name="chorus-com-resource-v1-SearchResourceAttributesRequest"></a>

### SearchResourceAttributesRequest
The message request for search resource attributes


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [ResourceAttributeQuery](#chorus-com-resource-v1-ResourceAttributeQuery) | optional | Query |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-resource-v1-SearchResourceAttributesResponse"></a>

### SearchResourceAttributesResponse
The message response for search resource attributes


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [ResourceAttribute](#chorus-com-resource-v1-ResourceAttribute) |  | data |
| total | [int32](#int32) |  | total |






<a name="chorus-com-resource-v1-SearchResourceByNameRequest"></a>

### SearchResourceByNameRequest
The message request for search resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [ResourceQuery](#chorus-com-resource-v1-ResourceQuery) | optional | Query |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-resource-v1-SearchResourceByNameResponse"></a>

### SearchResourceByNameResponse
The message response for search resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Resource](#chorus-com-resource-v1-Resource) |  | data |
| total | [int32](#int32) |  | total |






<a name="chorus-com-resource-v1-SetActiveFlagResourceRequest"></a>

### SetActiveFlagResourceRequest
The message request for set active flag resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| is_active | [bool](#bool) |  | The is_active flag |






<a name="chorus-com-resource-v1-SetActiveFlagResourceResponse"></a>

### SetActiveFlagResourceResponse
The message response for set active flag resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | The result of set active flag resource |






<a name="chorus-com-resource-v1-UpdateResourceRequest"></a>

### UpdateResourceRequest
The message request for update resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| resource_id | [string](#string) |  | The resource id |
| resource_name | [string](#string) |  | The resource name |
| description | [string](#string) |  | The resource description |
| resource_actions | [ResourceActionDetail](#chorus-com-resource-v1-ResourceActionDetail) | repeated | The resource action |
| resource_attributes | [ResourceAttributeDetail](#chorus-com-resource-v1-ResourceAttributeDetail) | repeated | The resource attribute |
| product_id | [string](#string) |  | The product id |
| is_active | [bool](#bool) |  | The is_active flag |






<a name="chorus-com-resource-v1-UpdateResourceResponse"></a>

### UpdateResourceResponse
The message response for update resource


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| result | [bool](#bool) |  | The result of update resource |





 

 

 


<a name="chorus-com-resource-v1-ResourceService"></a>

### ResourceService
The service for resource

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateResource | [CreateResourceRequest](#chorus-com-resource-v1-CreateResourceRequest) | [CreateResourceResponse](#chorus-com-resource-v1-CreateResourceResponse) | The method for create resource<br /><br />Operation: CREATE<br /><br />Request: { &#34;resource_name&#34;: &#34;resource_name&#34;, &#34;description&#34;: &#34;description&#34;, &#34;product_id&#34;: &#34;product_id&#34;, &#34;is_active&#34;: &#34;is_active&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_name&#34;: &#34;resource_action_name&#34;, &#34;method&#34;: &#34;method&#34;, //get,post,put,patch,delete &#34;uri&#34;: &#34;uri&#34;, &#34;description&#34;: &#34;description&#34; } ], &#34;resource_attributes&#34;: [ { &#34;resource_attribute_name&#34;: &#34;resource_attribute_name&#34;, &#34;resource_attribute_type&#34;: &#34;resource_attribute_type&#34; //string,number,array,boolean } ] }<br /><br />Response: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;resource_name&#34;: &#34;resource_name&#34; } |
| SearchResourceByName | [SearchResourceByNameRequest](#chorus-com-resource-v1-SearchResourceByNameRequest) | [SearchResourceByNameResponse](#chorus-com-resource-v1-SearchResourceByNameResponse) stream | The method for search resource<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;resource_name&#34;: &#34;resource_name&#34; }, &#34;pagination&#34;: { &#34;page_number&#34;: 1, &#34;page_size&#34;: 10 } }<br /><br />Response: { &#34;data&#34;: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;resource_name&#34;: &#34;resource_name&#34;, &#34;attributes&#34;: &#34;attributes&#34;, &#34;actions&#34; : &#34;actions&#34;, &#34;product_id&#34;: &#34;product_id&#34;, &#34;product_name&#34;: &#34;product_name&#34;, &#34;is_active&#34;: &#34;is_active&#34; }, &#34;total&#34;: 1 } |
| SearchResourceAttributes | [SearchResourceAttributesRequest](#chorus-com-resource-v1-SearchResourceAttributesRequest) | [SearchResourceAttributesResponse](#chorus-com-resource-v1-SearchResourceAttributesResponse) stream | The method for search resource attributes<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;resource_attribute_name&#34;: &#34;resource_attribute_name&#34; }, &#34;pagination&#34;: { &#34;page_number&#34;: 1, &#34;page_size&#34;: 10 } }<br /><br />Response: { &#34;data&#34;: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;resource_attribute_id&#34;: &#34;resource_attribute_id&#34;, &#34;resource_attribute_name&#34;: &#34;resource_attribute_name&#34; }, &#34;total&#34;: 1 } |
| GetResourceDetail | [GetResourceDetailRequest](#chorus-com-resource-v1-GetResourceDetailRequest) | [GetResourceDetailResponse](#chorus-com-resource-v1-GetResourceDetailResponse) | The method for get resource detail<br /><br />Operation: GET<br /><br />Request: { &#34;resource_id&#34;: &#34;resource_id&#34; }<br /><br />Response: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;resource_name&#34;: &#34;resource_name&#34;, &#34;description&#34;: &#34;description&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_id&#34;: &#34;resource_action_id&#34;, &#34;resource_action_name&#34;: &#34;resource_action_name&#34;, &#34;method&#34;: &#34;method&#34;, &#34;uri&#34;: &#34;uri&#34;, &#34;description&#34;: &#34;description&#34; } ], &#34;resource_attributes&#34;: [ { &#34;resource_attribute_id&#34;: &#34;resource_attribute_id&#34;, &#34;resource_attribute_name&#34;: &#34;resource_attribute_name&#34;, &#34;resource_attribute_type&#34;: &#34;resource_attribute_type&#34; } ] } |
| UpdateResource | [UpdateResourceRequest](#chorus-com-resource-v1-UpdateResourceRequest) | [UpdateResourceResponse](#chorus-com-resource-v1-UpdateResourceResponse) | The method for update resource<br /><br />Operation: UPDATE<br /><br />Request: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;resource_name&#34;: &#34;resource_name&#34;, &#34;description&#34;: &#34;description&#34;, &#34;product_id&#34;: &#34;product_id&#34;, &#34;is_active&#34;: &#34;is_active&#34;, &#34;resource_actions&#34;: [ { &#34;resource_action_id&#34;: &#34;resource_action_id&#34;, &#34;resource_action_name&#34;: &#34;resource_action_name&#34;, &#34;method&#34;: &#34;method&#34;, &#34;uri&#34;: &#34;uri&#34;, &#34;description&#34;: &#34;description&#34; } ], &#34;resource_attributes&#34;: [ { &#34;resource_attribute_id&#34;: &#34;resource_attribute_id&#34;, &#34;resource_attribute_name&#34;: &#34;resource_attribute_name&#34;, &#34;resource_attribute_type&#34;: &#34;resource_attribute_type&#34; } ] }<br /><br />Response: { &#34;result&#34;: true } |
| DeleteResource | [DeleteResourceRequest](#chorus-com-resource-v1-DeleteResourceRequest) | [DeleteResourceResponse](#chorus-com-resource-v1-DeleteResourceResponse) | The method for delete resource<br /><br />Operation: DELETE<br /><br />Request: { &#34;resource_id&#34;: &#34;resource_id&#34; }<br /><br />Response: { &#34;result&#34;: true } |
| GetResourceActionsTypeScreen | [GetResourceActionsTypeScreenRequest](#chorus-com-resource-v1-GetResourceActionsTypeScreenRequest) | [GetResourceActionsTypeScreenResponse](#chorus-com-resource-v1-GetResourceActionsTypeScreenResponse) stream | }<br /><br />Response: { resource_action: { resource_name = &#34;resource_name&#34;, resource_action_id = &#34;resource_action_id&#34;, uri = &#34;uri&#34;, } } |
| SetActiveFlagResource | [SetActiveFlagResourceRequest](#chorus-com-resource-v1-SetActiveFlagResourceRequest) | [SetActiveFlagResourceResponse](#chorus-com-resource-v1-SetActiveFlagResourceResponse) | The method for set Active Flag Resource<br /><br />Operation: UPDATE<br /><br />Request: { &#34;resource_id&#34;: &#34;resource_id&#34;, &#34;is_active&#34;: &#34;is_active&#34; }<br /><br />Response: { &#34;result&#34;: true } |

 



<a name="chorus_com_role_v1_role-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/role/v1/role.proto



<a name="chorus-com-role-v1-CreateRoleRequest"></a>

### CreateRoleRequest
The message request for create role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_name | [string](#string) |  | The role name |
| description | [string](#string) |  | The role description |
| product_id | [string](#string) |  | Product id |






<a name="chorus-com-role-v1-CreateRoleResponse"></a>

### CreateRoleResponse
The message response for create role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role | [Role](#chorus-com-role-v1-Role) |  | The role |






<a name="chorus-com-role-v1-DeleteRoleByRoleIdRequest"></a>

### DeleteRoleByRoleIdRequest
The message for delete role request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | role id |






<a name="chorus-com-role-v1-DeleteRoleByRoleIdResponse"></a>

### DeleteRoleByRoleIdResponse
The message for delete role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success |






<a name="chorus-com-role-v1-GetRoleByRoleIdRequest"></a>

### GetRoleByRoleIdRequest
The message for get role request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | role id |






<a name="chorus-com-role-v1-GetRoleByRoleIdResponse"></a>

### GetRoleByRoleIdResponse
The message for get role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role | [Role](#chorus-com-role-v1-Role) |  | role |






<a name="chorus-com-role-v1-Role"></a>

### Role
The message for role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | The role id |
| role_name | [string](#string) |  | The role name |
| description | [string](#string) |  | The role description |
| product_name | [string](#string) | optional | Product Name |
| product_id | [string](#string) | optional | Product id |
| product_code | [string](#string) | optional | Product Code |






<a name="chorus-com-role-v1-RoleQuery"></a>

### RoleQuery
The message for role query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_name | [string](#string) | optional | role name |
| product_ids | [string](#string) | repeated | product ids |
| exclude_role_ids | [string](#string) | repeated | exclude role ids |






<a name="chorus-com-role-v1-SearchRoleByRoleNameRequest"></a>

### SearchRoleByRoleNameRequest
The message for search role request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [RoleQuery](#chorus-com-role-v1-RoleQuery) | optional | query |
| sort_by | [RoleSortBy](#chorus-com-role-v1-RoleSortBy) | optional | sort by |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-role-v1-SearchRoleByRoleNameResponse"></a>

### SearchRoleByRoleNameResponse
The message for search role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Role](#chorus-com-role-v1-Role) |  | data |
| total | [int32](#int32) |  | total |






<a name="chorus-com-role-v1-UpdateRoleByRoleIdRequest"></a>

### UpdateRoleByRoleIdRequest
The message for update role request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | role id |
| role_name | [string](#string) |  | role name |
| description | [string](#string) |  | description |
| product_id | [string](#string) |  | product id |






<a name="chorus-com-role-v1-UpdateRoleByRoleIdResponse"></a>

### UpdateRoleByRoleIdResponse
The message for update role response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success |





 


<a name="chorus-com-role-v1-RoleSortBy"></a>

### RoleSortBy
The enum for sort by

| Name | Number | Description |
| ---- | ------ | ----------- |
| ROLE_SORT_BY_UNSPECIFIED | 0 | unspecified |
| ROLE_SORT_BY_NEWEST_FIRST | 1 | Sort by newest first |
| ROLE_SORT_BY_OLDEST_FIRST | 2 | Sort by oldest first |


 

 


<a name="chorus-com-role-v1-RoleService"></a>

### RoleService
The service for role

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateRole | [CreateRoleRequest](#chorus-com-role-v1-CreateRoleRequest) | [CreateRoleResponse](#chorus-com-role-v1-CreateRoleResponse) | The method for create role<br /><br />Operation: CREATE<br /><br />Request: { &#34;role_name&#34;: &#34;admin&#34;, &#34;description&#34;: &#34;admin&#34; }<br /><br />Response: { &#34;role&#34;: { &#34;role_id&#34;: &#34;1&#34;, &#34;role_name&#34;: &#34;admin&#34;, &#34;description&#34;: &#34;admin&#34; } } |
| SearchRoleByRoleName | [SearchRoleByRoleNameRequest](#chorus-com-role-v1-SearchRoleByRoleNameRequest) | [SearchRoleByRoleNameResponse](#chorus-com-role-v1-SearchRoleByRoleNameResponse) stream | The method for search role by role name<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;role_name&#34;: &#34;admin&#34; }, &#34;sort_by&#34;: 1, &#34;pagination&#34;: { &#34;page_number&#34;: 1, &#34;page_size&#34;: 10 } }<br /><br />Response: { &#34;data&#34;: { &#34;role_id&#34;: &#34;1&#34;, &#34;role_name&#34;: &#34;admin&#34;, &#34;description&#34;: &#34;admin&#34; }, &#34;total&#34;: 1 } |
| GetRoleByRoleId | [GetRoleByRoleIdRequest](#chorus-com-role-v1-GetRoleByRoleIdRequest) | [GetRoleByRoleIdResponse](#chorus-com-role-v1-GetRoleByRoleIdResponse) | The method for get role by role id<br /><br />Operation: MATCH<br /><br />Request: { &#34;role_id&#34;: &#34;1&#34; }<br /><br />Response: { &#34;role&#34;: { &#34;role_id&#34;: &#34;1&#34;, &#34;role_name&#34;: &#34;admin&#34;, &#34;description&#34;: &#34;admin&#34; } } |
| UpdateRoleByRoleId | [UpdateRoleByRoleIdRequest](#chorus-com-role-v1-UpdateRoleByRoleIdRequest) | [UpdateRoleByRoleIdResponse](#chorus-com-role-v1-UpdateRoleByRoleIdResponse) | The method for update role by role id<br /><br />Operation: UPDATE<br /><br />Request: { &#34;role_id&#34;: &#34;1&#34;, &#34;role_name&#34;: &#34;admin&#34;, &#34;description&#34;: &#34;admin&#34; }<br /><br />Response: { &#34;success&#34;: true } |
| DeleteRoleByRoleId | [DeleteRoleByRoleIdRequest](#chorus-com-role-v1-DeleteRoleByRoleIdRequest) | [DeleteRoleByRoleIdResponse](#chorus-com-role-v1-DeleteRoleByRoleIdResponse) | The method for delete role by role id<br /><br />Operation: DELETE<br /><br />Request: { &#34;role_id&#34;: &#34;1&#34; }<br /><br />Response: { &#34;success&#34;: true } |

 



<a name="chorus_com_user_v1_user-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/user/v1/user.proto



<a name="chorus-com-user-v1-CreateUserAttributeMappingRequest"></a>

### CreateUserAttributeMappingRequest
The user request for creating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute ID. |
| value | [string](#string) |  | The user attribute value. |






<a name="chorus-com-user-v1-CreateUserRequest"></a>

### CreateUserRequest
The user request for creating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | The user email. |
| first_name | [string](#string) |  | The user first name. |
| last_name | [string](#string) |  | The user last name. |
| role_ids | [string](#string) | repeated | The user roles. |
| user_attributes | [UserAttributeMappingRequest](#chorus-com-user-v1-UserAttributeMappingRequest) | repeated | The user attributes. |
| is_active | [bool](#bool) |  | The active user. |






<a name="chorus-com-user-v1-CreateUserResponse"></a>

### CreateUserResponse
The user response for creating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user ID. |
| email | [string](#string) |  | The user email. |
| first_name | [string](#string) |  | The user first name. |
| last_name | [string](#string) |  | The user last name. |






<a name="chorus-com-user-v1-DeleteUserByIdRequest"></a>

### DeleteUserByIdRequest
The user request by ID message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The user ID. |






<a name="chorus-com-user-v1-DeleteUserByIdResponse"></a>

### DeleteUserByIdResponse
The user response for deleting


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of deleting user |






<a name="chorus-com-user-v1-GetRoleDefaultByNameRequest"></a>

### GetRoleDefaultByNameRequest
The request for get role default


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_name | [string](#string) |  | The role name of default role |
| product_code | [string](#string) |  | The product code of default role |






<a name="chorus-com-user-v1-GetRoleDefaultByNameResponse"></a>

### GetRoleDefaultByNameResponse
The user response for get default role


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_name | [string](#string) |  | The role name of default role |
| product_code | [string](#string) |  | The product code of default role |
| role_id | [string](#string) |  | The role id of default role |






<a name="chorus-com-user-v1-GetUserDetailByEmailRequest"></a>

### GetUserDetailByEmailRequest
The user request by email message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | The user email. |






<a name="chorus-com-user-v1-GetUserDetailByEmailResponse"></a>

### GetUserDetailByEmailResponse
The user detail response message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user ID. |
| email | [string](#string) |  | The user email. |
| first_name | [string](#string) |  | The user first name. |
| last_name | [string](#string) |  | The user last name. |






<a name="chorus-com-user-v1-GetUserDetailByIdRequest"></a>

### GetUserDetailByIdRequest
The user request by ID message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The user ID. |






<a name="chorus-com-user-v1-GetUserDetailByIdResponse"></a>

### GetUserDetailByIdResponse
The user detail response message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user ID. |
| email | [string](#string) |  | The user email. |
| first_name | [string](#string) |  | The user first name. |
| last_name | [string](#string) |  | The user last name. |
| roles | [RoleOfUserResponse](#chorus-com-user-v1-RoleOfUserResponse) | repeated | The user roles. |
| user_attributes | [UserAttributeMappingResponse](#chorus-com-user-v1-UserAttributeMappingResponse) | repeated | The user attributes. |
| is_active | [bool](#bool) |  | the active |






<a name="chorus-com-user-v1-GetUserItemResponse"></a>

### GetUserItemResponse
The user response for search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user ID. |
| email | [string](#string) |  | The user email. |
| full_name | [string](#string) |  | The user full name. |
| roles | [string](#string) |  | The user roles. |
| is_active | [bool](#bool) |  | The flg is_active |
| activation_date | [string](#string) | optional | the activatin date |
| expiry_date | [string](#string) | optional | the expriry date |
| account_type | [string](#string) | optional | the account type |
| company_name | [string](#string) | optional | the 3rd party company |
| department_manager | [string](#string) | optional | the department manager |
| department | [string](#string) | optional | the department team |
| division | [string](#string) | optional | the division/offshore |
| system_admmin | [string](#string) | optional | the system admin |
| rhq | [string](#string) | optional | the rhq |
| country | [string](#string) | optional | the country |
| city | [string](#string) | optional | the city |
| accessible_office | [string](#string) | optional | the accessible office |
| last_updated_user | [string](#string) | optional | the last update user |
| last_updated_on | [string](#string) | optional | the last update on |






<a name="chorus-com-user-v1-RoleOfUserResponse"></a>

### RoleOfUserResponse
The user response message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role_id | [string](#string) |  | The role ID. |
| role_name | [string](#string) |  | The role name. |
| product_code | [string](#string) |  | The product code |






<a name="chorus-com-user-v1-SearchUserListByNameOrRoleIdRequest"></a>

### SearchUserListByNameOrRoleIdRequest
The user request for search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [UserFilter](#chorus-com-user-v1-UserFilter) | optional | The user filter. |
| pagination | [UserPagination](#chorus-com-user-v1-UserPagination) | optional | The user pagination. |






<a name="chorus-com-user-v1-SearchUserListByNameOrRoleIdResponse"></a>

### SearchUserListByNameOrRoleIdResponse
The user response for search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [GetUserItemResponse](#chorus-com-user-v1-GetUserItemResponse) |  | The user data. |
| total | [int32](#int32) |  | The user total. |






<a name="chorus-com-user-v1-SetFlgIsActiveUserRequest"></a>

### SetFlgIsActiveUserRequest
The user request for update flg is_active request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The user ID. |
| is_active | [bool](#bool) |  | The flg is_active |






<a name="chorus-com-user-v1-SetFlgIsActiveUserResponse"></a>

### SetFlgIsActiveUserResponse
The user response for updating flg is_active


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of updating flg is_active |






<a name="chorus-com-user-v1-UpdateUserDataRequest"></a>

### UpdateUserDataRequest
The user request for updating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | The user email. |
| first_name | [string](#string) |  | The user first name. |
| last_name | [string](#string) |  | The user last name. |
| role_ids | [string](#string) | repeated | The user roles. |
| user_attributes | [UserAttributeMappingRequest](#chorus-com-user-v1-UserAttributeMappingRequest) | repeated | The user attributes. |
| is_active | [bool](#bool) |  | The active user. |






<a name="chorus-com-user-v1-UpdateUserRequest"></a>

### UpdateUserRequest
The user request for updating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user ID. |
| payload | [UpdateUserDataRequest](#chorus-com-user-v1-UpdateUserDataRequest) |  | The user payload. |






<a name="chorus-com-user-v1-UpdateUserResponse"></a>

### UpdateUserResponse
The user response for updating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of updating user |






<a name="chorus-com-user-v1-UserAttributeMappingRequest"></a>

### UserAttributeMappingRequest
The user request for creating


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mapping_id | [string](#string) | optional | The mapping ID. |
| user_attribute_id | [string](#string) |  | The user attribute ID. |
| value | [string](#string) |  | The user attribute ampping value. |






<a name="chorus-com-user-v1-UserAttributeMappingResponse"></a>

### UserAttributeMappingResponse
The user attribute mapping response message definition.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mapping_id | [string](#string) |  | The mapping ID. |
| user_attribute_id | [string](#string) |  | The user attribute ID. |
| value | [string](#string) |  | The user attribute value. |






<a name="chorus-com-user-v1-UserFilter"></a>

### UserFilter
The user Filter for Search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keyword | [string](#string) | optional | The user keyword. |
| role_id | [string](#string) | optional | The user role ID. |






<a name="chorus-com-user-v1-UserPagination"></a>

### UserPagination
The user pagination for Search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page_size | [int32](#int32) |  | The user page size. |
| page_number | [int32](#int32) |  | The user page number. |





 

 

 


<a name="chorus-com-user-v1-UsersService"></a>

### UsersService
The user service definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchUserListByNameOrRoleId | [SearchUserListByNameOrRoleIdRequest](#chorus-com-user-v1-SearchUserListByNameOrRoleIdRequest) | [SearchUserListByNameOrRoleIdResponse](#chorus-com-user-v1-SearchUserListByNameOrRoleIdResponse) stream | The method for search user list by name or role id<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;keyword&#34;: &#34;string&#34;, &#34;role_id&#34;: &#34;string&#34; }, &#34;pagination&#34;: { &#34;page_size&#34;: 0, &#34;page_number&#34;: 0 } }<br /><br />Response: { &#34;data&#34;: { &#34;user_id&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, &#34;full_name&#34;: &#34;string&#34;, &#34;roles&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;activation_date&#34;: &#34;string&#34;, &#34;expiry_date&#34;: &#34;string&#34;, &#34;account_type&#34;: &#34;string&#34;, &#34;company_name&#34;: &#34;string&#34;, &#34;department_manager&#34;: &#34;string&#34;, &#34;department&#34;: &#34;string&#34;, &#34;division&#34;: &#34;string&#34;, &#34;system_admmin&#34;: &#34;string&#34;, &#34;rhq&#34;: &#34;string&#34;, &#34;country&#34;: &#34;string&#34;, &#34;city&#34;: &#34;string&#34;, &#34;accessible_office&#34;: &#34;string&#34;, &#34;last_updated_user&#34;: &#34;string&#34;, &#34;last_updated_on&#34;: &#34;string&#34; }, &#34;total&#34;: 0 } |
| GetUserDetailById | [GetUserDetailByIdRequest](#chorus-com-user-v1-GetUserDetailByIdRequest) | [GetUserDetailByIdResponse](#chorus-com-user-v1-GetUserDetailByIdResponse) | Get user detail by ID<br /><br />Request: { &#34;id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;user_id&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, &#34;first_name&#34;: &#34;string&#34;, &#34;last_name&#34;: &#34;string&#34;, &#34;roles&#34;: [ { &#34;role_id&#34;: &#34;string&#34;, &#34;role_name&#34;: &#34;string&#34; } ], &#34;user_attributes&#34;: [ { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;value&#34;: &#34;string&#34; } ] } |
| GetUserDetailByEmail | [GetUserDetailByEmailRequest](#chorus-com-user-v1-GetUserDetailByEmailRequest) | [GetUserDetailByEmailResponse](#chorus-com-user-v1-GetUserDetailByEmailResponse) | Get user detail by Email<br /><br />Request: { &#34;email&#34;: &#34;string&#34; }<br /><br />Response: { &#34;user_id&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, &#34;first_name&#34;: &#34;string&#34;, &#34;last_name&#34;: &#34;string&#34;, } |
| CreateUser | [CreateUserRequest](#chorus-com-user-v1-CreateUserRequest) | [CreateUserResponse](#chorus-com-user-v1-CreateUserResponse) | Create user<br /><br />Request: { &#34;email&#34;: &#34;string&#34;, &#34;first_name&#34;: &#34;string&#34;, &#34;last_name&#34;: &#34;string&#34;, &#34;role_ids&#34;: [ &#34;string&#34; ], &#34;user_attributes&#34;: [ { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;value&#34;: &#34;string&#34; } ] }<br /><br />Response: { &#34;user_id&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, &#34;first_name&#34;: &#34;string&#34;, &#34;last_name&#34;: &#34;string&#34; } |
| UpdateUser | [UpdateUserRequest](#chorus-com-user-v1-UpdateUserRequest) | [UpdateUserResponse](#chorus-com-user-v1-UpdateUserResponse) | Update user by ID<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34;, &#34;payload&#34;: { &#34;email&#34;: &#34;string&#34;, &#34;first_name&#34;: &#34;string&#34;, &#34;last_name&#34;: &#34;string&#34;, &#34;role_ids&#34;: [ &#34;string&#34; ], &#34;user_attributes&#34;: [ { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;value&#34;: &#34;string&#34; } ] } }<br /><br />Response: { &#34;success&#34;: true } |
| SetFlgIsActiveUser | [SetFlgIsActiveUserRequest](#chorus-com-user-v1-SetFlgIsActiveUserRequest) | [SetFlgIsActiveUserResponse](#chorus-com-user-v1-SetFlgIsActiveUserResponse) | Update flg is_active by userId<br /><br />Request: { &#34;id&#34;: &#34;string&#34;, &#34;is_active&#34;: true }<br /><br />Response: { &#34;success&#34;: true } |
| DeleteUserById | [DeleteUserByIdRequest](#chorus-com-user-v1-DeleteUserByIdRequest) | [DeleteUserByIdResponse](#chorus-com-user-v1-DeleteUserByIdResponse) | Delete user by ID<br /><br />Request: { &#34;id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true } |
| GetRoleDefaultByName | [GetRoleDefaultByNameRequest](#chorus-com-user-v1-GetRoleDefaultByNameRequest) | [GetRoleDefaultByNameResponse](#chorus-com-user-v1-GetRoleDefaultByNameResponse) | Get default role by name<br /><br />Request: { &#34;role_name&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34; }<br /><br />Response: { &#34;role_name&#34;: &#34;string&#34;, &#34;product_code&#34;: &#34;string&#34;, &#34;role_id&#34;: &#34;string&#34; } |

 



<a name="chorus_com_user_attribute_v1_user_attribute-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/user_attribute/v1/user_attribute.proto



<a name="chorus-com-user_attribute-v1-CreateUserAttributeConfiguration"></a>

### CreateUserAttributeConfiguration
Structure for create user attribute configurations


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | name of user attribute configuration |
| value | [string](#string) |  | value of user attribute configuration |






<a name="chorus-com-user_attribute-v1-CreateUserAttributeRequest"></a>

### CreateUserAttributeRequest
The request for creating user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_name | [string](#string) |  | The user attribute name |
| user_attribute_type | [string](#string) |  | The user attribute type |
| user_attribute_description | [string](#string) |  | The user attribute description |
| is_multi_selected | [bool](#bool) |  | The user attribute multi select |
| input_type | [string](#string) |  | The user attribute input type |
| configurations | [CreateUserAttributeConfiguration](#chorus-com-user_attribute-v1-CreateUserAttributeConfiguration) | repeated | The user attribute configurations |






<a name="chorus-com-user_attribute-v1-CreateUserAttributeResponse"></a>

### CreateUserAttributeResponse
The response for creating user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserAttribute](#chorus-com-user_attribute-v1-UserAttribute) |  | The user attribute information |






<a name="chorus-com-user_attribute-v1-DeleteUserAttributeRequest"></a>

### DeleteUserAttributeRequest
The request for deleting user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute id |






<a name="chorus-com-user_attribute-v1-DeleteUserAttributeResponse"></a>

### DeleteUserAttributeResponse
The response for deleting user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of deleting user attribute |






<a name="chorus-com-user_attribute-v1-GetUserAttributeByIdRequest"></a>

### GetUserAttributeByIdRequest
The request for getting user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute id |






<a name="chorus-com-user_attribute-v1-GetUserAttributeByIdResponse"></a>

### GetUserAttributeByIdResponse
The response for getting user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserAttribute](#chorus-com-user_attribute-v1-UserAttribute) |  | The user attribute information |






<a name="chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeRequest"></a>

### SearchUserAttributesByNameOrTypeRequest
The request for getting user attributes list


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [UserAttributeFilter](#chorus-com-user_attribute-v1-UserAttributeFilter) | optional | The user attribute filter |
| sort_by | [UserAttributeSortBy](#chorus-com-user_attribute-v1-UserAttributeSortBy) | optional | Sort by |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | The pagination of the user attribute |






<a name="chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeResponse"></a>

### SearchUserAttributesByNameOrTypeResponse
The response for getting user attributes list


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserAttribute](#chorus-com-user_attribute-v1-UserAttribute) |  | The user attribute information |
| total | [int32](#int32) |  | The total count of user attributes |






<a name="chorus-com-user_attribute-v1-UpdateUserAttributeConfiguration"></a>

### UpdateUserAttributeConfiguration
Structure for update user attribute configurations


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_config_id | [string](#string) | optional | id of user attribute configuration |
| name | [string](#string) |  | name of user attribute configuration |
| value | [string](#string) |  | value of user attribute configuration |






<a name="chorus-com-user_attribute-v1-UpdateUserAttributeRequest"></a>

### UpdateUserAttributeRequest
The request for updating user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute id |
| user_attribute_name | [string](#string) |  | The user attribute name |
| user_attribute_type | [string](#string) |  | The user attribute type |
| user_attribute_description | [string](#string) |  | The user attribute description |
| is_multi_selected | [bool](#bool) |  | The user attribute multi select |
| input_type | [string](#string) |  | The user attribute input type |
| configurations | [UpdateUserAttributeConfiguration](#chorus-com-user_attribute-v1-UpdateUserAttributeConfiguration) | repeated | The user attribute configurations |






<a name="chorus-com-user_attribute-v1-UpdateUserAttributeResponse"></a>

### UpdateUserAttributeResponse
The response for updating user attribute


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of updating user attribute |






<a name="chorus-com-user_attribute-v1-UserAttribute"></a>

### UserAttribute
The user attribute informations


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute id |
| user_attribute_name | [string](#string) |  | The user attribute name |
| user_attribute_type | [string](#string) |  | The user attribute type |
| user_attribute_description | [string](#string) |  | The user attribute description |
| is_multi_selected | [bool](#bool) |  | The user attribute multi select |
| configurations | [UserAttributeConfiguration](#chorus-com-user_attribute-v1-UserAttributeConfiguration) | repeated | The user attribute configurations |
| by_system | [bool](#bool) |  | The user attribute by system flag |






<a name="chorus-com-user_attribute-v1-UserAttributeConfiguration"></a>

### UserAttributeConfiguration
The user attribute configuration informations


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | user_attribute_id of attribute configuration |
| input_type | [string](#string) |  | input type of user attribute configuration |
| name | [string](#string) |  | name of user attribute configuration |
| value | [string](#string) |  | value of user attribute configuration |






<a name="chorus-com-user_attribute-v1-UserAttributeFilter"></a>

### UserAttributeFilter
The filter for searching user attributes by user attribute name or user attribute type


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_name | [string](#string) |  | The user attribute name |
| user_attribute_type | [string](#string) |  | The user attribute type |
| by_system | [bool](#bool) | optional | The bySystem flag |





 


<a name="chorus-com-user_attribute-v1-UserAttributeSortBy"></a>

### UserAttributeSortBy
The enum for sort Users

| Name | Number | Description |
| ---- | ------ | ----------- |
| USER_ATTRIBUTE_SORT_BY_UNSPECIFIED | 0 | unspecified default value |
| USER_ATTRIBUTE_SORT_BY_NEWEST_FIRST | 1 | Sort by newest_first |
| USER_ATTRIBUTE_SORT_BY_OLDEST_FIRST | 2 | Sort by oldest_first |
| USER_ATTRIBUTE_SORT_BY_ATTRIBUTE_NAME_ASC | 3 | Sort by attribute_name_asc |
| USER_ATTRIBUTE_SORT_BY_ATTRIBUTE_NAME_DESC | 4 | Sort by attribute_name_desc |


 

 


<a name="chorus-com-user_attribute-v1-UserAttributeService"></a>

### UserAttributeService
The service that implements the user attribute service definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchUserAttributesByNameOrType | [SearchUserAttributesByNameOrTypeRequest](#chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeRequest) | [SearchUserAttributesByNameOrTypeResponse](#chorus-com-user_attribute-v1-SearchUserAttributesByNameOrTypeResponse) stream | The method for search user attributes by user attribute name or user attribute type<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;user_attribute_name&#34;: &#34;Office&#34;, &#34;user_attribute_type&#34;: &#34;list&#34;, &#34;by_system&#34;: true }, &#34;sort_by&#34;: &#34;USER_ATTRIBUTE_SORT_BY_UNSPECIFIED&#34;, &#34;pagination&#34;: { &#34;page_number&#34;: 1, &#34;page_size&#34;: 10 } }<br /><br />Response: { &#34;data&#34;: { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; }, &#34;total&#34;: 1 } |
| GetUserAttributeById | [GetUserAttributeByIdRequest](#chorus-com-user_attribute-v1-GetUserAttributeByIdRequest) | [GetUserAttributeByIdResponse](#chorus-com-user_attribute-v1-GetUserAttributeByIdResponse) | The method for getting user attribute by id<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_attribute_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;user_attribute&#34;: { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; } } |
| CreateUserAttribute | [CreateUserAttributeRequest](#chorus-com-user_attribute-v1-CreateUserAttributeRequest) | [CreateUserAttributeResponse](#chorus-com-user_attribute-v1-CreateUserAttributeResponse) | The method for creating user attribute<br /><br />Operation: CREATE<br /><br />Request: { &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; }<br /><br />Response: { &#34;user_attribute&#34;: { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; } } |
| UpdateUserAttribute | [UpdateUserAttributeRequest](#chorus-com-user_attribute-v1-UpdateUserAttributeRequest) | [UpdateUserAttributeResponse](#chorus-com-user_attribute-v1-UpdateUserAttributeResponse) | The method for updating user attribute<br /><br />Operation: UPDATE<br /><br />Request: { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; }<br /><br />Response: { &#34;user_attribute&#34;: { &#34;user_attribute_id&#34;: &#34;string&#34;, &#34;user_attribute_name&#34;: &#34;string&#34;, &#34;user_attribute_type&#34;: &#34;string&#34;, &#34;user_attribute_description&#34;: &#34;string&#34; } } |
| DeleteUserAttribute | [DeleteUserAttributeRequest](#chorus-com-user_attribute-v1-DeleteUserAttributeRequest) | [DeleteUserAttributeResponse](#chorus-com-user_attribute-v1-DeleteUserAttributeResponse) | The method for deleting user attribute<br /><br />Operation: DELETE<br /><br />Request: { &#34;user_attribute_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true } |

 



<a name="chorus_com_user_group_v1_user_group-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/user_group/v1/user_group.proto



<a name="chorus-com-user_group-v1-CreateUserGroupRequest"></a>

### CreateUserGroupRequest
The request for creating a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_group_name | [string](#string) |  | Name of the user group. |
| description | [string](#string) |  | Description of the user group. |
| is_active | [bool](#bool) |  | Status of the user group(true/false) |






<a name="chorus-com-user_group-v1-CreateUserGroupResponse"></a>

### CreateUserGroupResponse
The response create a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_group_id | [string](#string) |  | Id of the user group. |
| user_group_name | [string](#string) |  | Name of the user group. |
| description | [string](#string) |  | Description of the user group. |
| is_active | [bool](#bool) |  | Status of the user group (true/false). |






<a name="chorus-com-user_group-v1-UpdateUserGroupRequest"></a>

### UpdateUserGroupRequest
The request for update a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_group_id | [string](#string) |  | Identifier of the user group to update. |
| user_group_name | [string](#string) |  | New name for the user group. |
| description | [string](#string) |  | New description for the user group. |
| is_active | [bool](#bool) |  | Status for the user group(true/false) |






<a name="chorus-com-user_group-v1-UpdateUserGroupResponse"></a>

### UpdateUserGroupResponse
The response update a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_group_id | [string](#string) |  | Id of the user group. |
| user_group_name | [string](#string) |  | Name of the user group. |
| description | [string](#string) |  | Description of the user group. |
| is_active | [bool](#bool) |  | Status of the user group (true/false). |





 

 

 


<a name="chorus-com-user_group-v1-UserGroupService"></a>

### UserGroupService
The service definition for user group.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateUserGroup | [CreateUserGroupRequest](#chorus-com-user_group-v1-CreateUserGroupRequest) | [CreateUserGroupResponse](#chorus-com-user_group-v1-CreateUserGroupResponse) | Create a user group. |
| UpdateUserGroup | [UpdateUserGroupRequest](#chorus-com-user_group-v1-UpdateUserGroupRequest) | [UpdateUserGroupResponse](#chorus-com-user_group-v1-UpdateUserGroupResponse) | Update an user group |

 



<a name="chorus_com_user_set_v1_user_set-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/user_set/v1/user_set.proto



<a name="chorus-com-user_set-v1-CreateUserSetRequest"></a>

### CreateUserSetRequest
The create user set request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_name | [string](#string) |  | The user set name |
| user_set_key | [string](#string) |  | The user set key |
| description | [string](#string) |  | The user set description |
| conditions | [CreateUserSetRequest.UserSetConditionCreate](#chorus-com-user_set-v1-CreateUserSetRequest-UserSetConditionCreate) | repeated | The user set conditions |






<a name="chorus-com-user_set-v1-CreateUserSetRequest-UserSetConditionCreate"></a>

### CreateUserSetRequest.UserSetConditionCreate
The user set condition for created


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_attribute_id | [string](#string) |  | The user attribute id |
| condition | [string](#string) |  | The condition |
| value | [string](#string) |  | The value |






<a name="chorus-com-user_set-v1-CreateUserSetResponse"></a>

### CreateUserSetResponse
The create user set response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |






<a name="chorus-com-user_set-v1-DeleteUserSetRequest"></a>

### DeleteUserSetRequest
The delete user set request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |






<a name="chorus-com-user_set-v1-DeleteUserSetResponse"></a>

### DeleteUserSetResponse
The delete user set response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of delete user set |






<a name="chorus-com-user_set-v1-GetUserSetByIdRequest"></a>

### GetUserSetByIdRequest
The get user set by id request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |






<a name="chorus-com-user_set-v1-GetUserSetByIdResponse"></a>

### GetUserSetByIdResponse
The get user set by id response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserSet](#chorus-com-user_set-v1-UserSet) |  | The user set data |
| conditions | [UserSetConditionDetail](#chorus-com-user_set-v1-UserSetConditionDetail) | repeated | The user set condition detail |






<a name="chorus-com-user_set-v1-MemberOfUserSet"></a>

### MemberOfUserSet
The member of user set


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | the user_id |
| user_name | [string](#string) |  | the user_name |
| user_email | [string](#string) |  | the user_email |






<a name="chorus-com-user_set-v1-Pagination"></a>

### Pagination
The paging message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page_number | [int32](#int32) |  | The page number |
| page_size | [int32](#int32) |  | The page size |






<a name="chorus-com-user_set-v1-SearchMemberListByUserSetIdQuery"></a>

### SearchMemberListByUserSetIdQuery
The search member list by user set id query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |
| keyword | [string](#string) |  | The keyword for search user name or email |






<a name="chorus-com-user_set-v1-SearchMemberListByUserSetIdRequest"></a>

### SearchMemberListByUserSetIdRequest
The search member list by user set id request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [SearchMemberListByUserSetIdQuery](#chorus-com-user_set-v1-SearchMemberListByUserSetIdQuery) |  | The user set query |
| order_by | [chorus.com.base.v1.OrderBy](#chorus-com-base-v1-OrderBy) | repeated | Order by field |
| pagination | [Pagination](#chorus-com-user_set-v1-Pagination) | optional | Pagination |






<a name="chorus-com-user_set-v1-SearchMemberListByUserSetIdResponse"></a>

### SearchMemberListByUserSetIdResponse
The search member list by user set id response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [MemberOfUserSet](#chorus-com-user_set-v1-MemberOfUserSet) |  | The user set data |
| total | [int32](#int32) |  | The total number of user set |






<a name="chorus-com-user_set-v1-SearchUserSetByNameRequest"></a>

### SearchUserSetByNameRequest
The Search user set by name request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [UserSetQuery](#chorus-com-user_set-v1-UserSetQuery) | optional | The user set query |
| sort_by | [UserSetSortBy](#chorus-com-user_set-v1-UserSetSortBy) | optional | Sort by field |
| pagination | [Pagination](#chorus-com-user_set-v1-Pagination) | optional | Pagination |






<a name="chorus-com-user_set-v1-SearchUserSetByNameResponse"></a>

### SearchUserSetByNameResponse
The Search user set by name response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserSet](#chorus-com-user_set-v1-UserSet) |  | The user set data |
| total | [int32](#int32) |  | The total number of user set |






<a name="chorus-com-user_set-v1-UpdateUserSetRequest"></a>

### UpdateUserSetRequest
The update user set request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |
| user_set_name | [string](#string) |  | The user set name |
| user_set_key | [string](#string) |  | The user set key |
| description | [string](#string) |  | The user set description |
| conditions | [UpdateUserSetRequest.UserSetConditionUpdate](#chorus-com-user_set-v1-UpdateUserSetRequest-UserSetConditionUpdate) | repeated | The user set conditions |






<a name="chorus-com-user_set-v1-UpdateUserSetRequest-UserSetConditionUpdate"></a>

### UpdateUserSetRequest.UserSetConditionUpdate
The user set condition for updated


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_condition_id | [string](#string) |  | The user set condition id |
| user_attribute_id | [string](#string) |  | The user attribute id |
| condition | [string](#string) |  | The condition |
| value | [string](#string) |  | The value |






<a name="chorus-com-user_set-v1-UpdateUserSetResponse"></a>

### UpdateUserSetResponse
The update user set response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | The result of update user set |






<a name="chorus-com-user_set-v1-UserSet"></a>

### UserSet
The user set informations


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_id | [string](#string) |  | The user set id |
| user_set_name | [string](#string) |  | The user set name |
| user_set_key | [string](#string) |  | The user set key |
| description | [string](#string) |  | The user set description |
| total_member | [int32](#int32) |  | Total member user |






<a name="chorus-com-user_set-v1-UserSetConditionDetail"></a>

### UserSetConditionDetail
The user set condition detail


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_condition_id | [string](#string) |  | The user set condition id |
| user_attribute_id | [string](#string) |  | The user attribute id |
| user_attribute_name | [string](#string) |  | The user attribute name |
| condition | [string](#string) |  | The condition |
| value | [string](#string) |  | The value |






<a name="chorus-com-user_set-v1-UserSetQuery"></a>

### UserSetQuery
The user set query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_set_name | [string](#string) |  | The user set name |





 


<a name="chorus-com-user_set-v1-UserSetSortBy"></a>

### UserSetSortBy
The user set sort by

| Name | Number | Description |
| ---- | ------ | ----------- |
| USER_SET_SORT_BY_UNSPECIFIED | 0 | unspecified |
| USER_SET_SORT_BY_NEWEST_FIRST | 1 | Sort by newest first |
| USER_SET_SORT_BY_OLDEST_FIRST | 2 | Sort by oldest first |


 

 


<a name="chorus-com-user_set-v1-UserSetService"></a>

### UserSetService
The service that implements the user set service definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchUserSetByName | [SearchUserSetByNameRequest](#chorus-com-user_set-v1-SearchUserSetByNameRequest) | [SearchUserSetByNameResponse](#chorus-com-user_set-v1-SearchUserSetByNameResponse) stream | The method to search user set by name<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;user_set_name&#34;: &#34;user set name&#34; }, &#34;sort_by&#34;: &#34;USER_SET_SORT_BY_NEWEST_FIRST&#34;, &#34;pagination&#34;: { &#34;page_size&#34;: 10, &#34;page_number&#34;: 1 } }<br /><br />Response: { &#34;data&#34;: [ { &#34;user_set_id&#34;: &#34;user set id&#34;, &#34;user_set_name&#34;: &#34;user set name&#34;, &#34;user_set_key&#34;: &#34;user set key&#34;, &#34;description&#34;: &#34;description&#34; } ], &#34;total&#34;: 1 } |
| SearchMemberListByUserSetId | [SearchMemberListByUserSetIdRequest](#chorus-com-user_set-v1-SearchMemberListByUserSetIdRequest) | [SearchMemberListByUserSetIdResponse](#chorus-com-user_set-v1-SearchMemberListByUserSetIdResponse) stream | The method to search member list by user set id<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;user_set_id&#34;: &#34;user set id&#34;, &#34;user_name&#34;: &#34;user name&#34;, &#34;user_email&#34;: &#34;user email&#34; }, &#34;pagination&#34;: { &#34;page_size&#34;: 10, &#34;page_number&#34;: 1 } }<br /><br />Response: { &#34;data&#34;: [ { &#34;user_id&#34;: &#34;user id&#34;, &#34;user_name&#34;: &#34;user name&#34;, &#34;user_email&#34;: &#34;user email&#34; } ], &#34;total&#34;: 1 } |
| GetUserSetById | [GetUserSetByIdRequest](#chorus-com-user_set-v1-GetUserSetByIdRequest) | [GetUserSetByIdResponse](#chorus-com-user_set-v1-GetUserSetByIdResponse) | The method for get user set by id<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_set_id&#34;: &#34;user set id&#34; }<br /><br />Response: { &#34;data&#34;: { &#34;user_set_id&#34;: &#34;user set id&#34;, &#34;user_set_name&#34;: &#34;user set name&#34;, &#34;user_set_key&#34;: &#34;user set key&#34;, &#34;description&#34;: &#34;description&#34; }, &#34;conditions&#34;: [ { &#34;user_set_condition_id&#34;: &#34;user set condition id&#34;, &#34;user_attribute_id&#34;: &#34;user attribute id&#34;, &#34;user_attribute_name&#34;: &#34;user attribute name&#34;, &#34;condition&#34;: &#34;condition&#34;, &#34;value&#34;: &#34;value&#34; } ] } |
| CreateUserSet | [CreateUserSetRequest](#chorus-com-user_set-v1-CreateUserSetRequest) | [CreateUserSetResponse](#chorus-com-user_set-v1-CreateUserSetResponse) | The method for create user set<br /><br />Operation: CREATE<br /><br />Request: { &#34;user_set_name&#34;: &#34;user set name&#34;, &#34;user_set_key&#34;: &#34;user set key&#34;, &#34;description&#34;: &#34;description&#34;, &#34;conditions&#34;: [ { &#34;user_attribute_id&#34;: &#34;user attribute id&#34;, &#34;condition&#34;: &#34;condition&#34;, &#34;value&#34;: &#34;value&#34; } ] }<br /><br />Response: { &#34;user_set_id&#34;: &#34;user set id&#34; } |
| UpdateUserSet | [UpdateUserSetRequest](#chorus-com-user_set-v1-UpdateUserSetRequest) | [UpdateUserSetResponse](#chorus-com-user_set-v1-UpdateUserSetResponse) | The method for update user set<br /><br />Operation: UPDATE<br /><br />Request: { &#34;user_set_id&#34;: &#34;user set id&#34;, &#34;user_set_name&#34;: &#34;user set name&#34;, &#34;user_set_key&#34;: &#34;user set key&#34;, &#34;description&#34;: &#34;description&#34;, &#34;conditions&#34;: [ { &#34;user_set_condition_id&#34;: &#34;user set condition id&#34;, &#34;user_attribute_id&#34;: &#34;user attribute id&#34;, &#34;condition&#34;: &#34;condition&#34;, &#34;value&#34;: &#34;value&#34; } ] }<br /><br />Response: { &#34;success&#34;: true } |
| DeleteUserSet | [DeleteUserSetRequest](#chorus-com-user_set-v1-DeleteUserSetRequest) | [DeleteUserSetResponse](#chorus-com-user_set-v1-DeleteUserSetResponse) | The method for delete user set<br /><br />Operation: DELETE<br /><br />Request: { &#34;user_set_id&#34;: &#34;user set id&#34; }<br /><br />Response: { &#34;success&#34;: true } |

 



<a name="chorus_com_workflow_user_group_v1_workflow_user_group-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/com/workflow_user_group/v1/workflow_user_group.proto



<a name="chorus-com-workflow_user_group-v1-BulkImportMember"></a>

### BulkImportMember
Represents a member for bulk import


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | Email of the user |
| role | [string](#string) | optional | Role of the user in the workflow group (MANAGER or MEMBER) |






<a name="chorus-com-workflow_user_group-v1-BulkImportMembersRequest"></a>

### BulkImportMembersRequest
Request for bulk importing members


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | The group ID to which the members will be added |
| members | [BulkImportMember](#chorus-com-workflow_user_group-v1-BulkImportMember) | repeated | The list of members to be added |






<a name="chorus-com-workflow_user_group-v1-BulkImportMembersResponse"></a>

### BulkImportMembersResponse
Response for bulk importing members


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Success flag indicating whether the import was successful |
| message | [string](#string) |  | Optional message for additional information |






<a name="chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupMemberMapping"></a>

### CreateWorkflowUserGroupMemberMapping
Represents a member mapping for creating a user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| member_id | [string](#string) |  | Member ID belong to workflow user group |
| workflow_user_group_role | [string](#string) |  | role of member work flow user group |






<a name="chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupRequest"></a>

### CreateWorkflowUserGroupRequest
The request for creating a workflow user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the workflow user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group(true/false) |
| members | [CreateWorkflowUserGroupMemberMapping](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupMemberMapping) | repeated | Members belong to workflow user group |






<a name="chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupResponse"></a>

### CreateWorkflowUserGroupResponse
The response create a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group (true/false). |






<a name="chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupRequest"></a>

### DeleteWorkflowUserGroupRequest
DeleteWorkflowUserGroupRequest is the request to delete a workflow user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | group_id is the unique identifier for the group |






<a name="chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupResponse"></a>

### DeleteWorkflowUserGroupResponse
DeleteWorkflowUserGroupResponse is the response to delete a workflow user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success is true if the group was deleted successfully |






<a name="chorus-com-workflow_user_group-v1-GetListUserSuggestRequest"></a>

### GetListUserSuggestRequest
The request get suggest member


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key_word | [string](#string) |  | the user name or email for search |
| group_id | [string](#string) | optional | The group id of suggest member |
| limit | [int32](#int32) | optional | The limit of suggest member |
| is_active | [bool](#bool) | optional | The is active user |






<a name="chorus-com-workflow_user_group-v1-GetListUserSuggestResponse"></a>

### GetListUserSuggestResponse
The response get suggest member


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserListSuggest](#chorus-com-workflow_user_group-v1-UserListSuggest) |  | The list data of suggest member |






<a name="chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailRequest"></a>

### GetWorkflowUserGroupDetailRequest
The request for get detail a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | group Id |






<a name="chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailResponse"></a>

### GetWorkflowUserGroupDetailResponse
The response get detail a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the workflow user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group (true/false). |






<a name="chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdRequest"></a>

### GetWorkflowUserGroupsByUserIdRequest
Request for get group by userId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user id |






<a name="chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdResponse"></a>

### GetWorkflowUserGroupsByUserIdResponse
Response for get group by userId


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| workflow_user_group_id | [string](#string) |  | The workflow user group id |
| workflow_user_group_role_name | [string](#string) |  | The workflow user group role name |






<a name="chorus-com-workflow_user_group-v1-MemberUserGroupQuery"></a>

### MemberUserGroupQuery
MemberUserGroupQuery for seach member


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | the group_id of member |
| key_word | [string](#string) |  | the first name or last name or email for search |






<a name="chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupMapping"></a>

### RemoveMemberWorkflowUserGroupMapping
Represents a member mapping for remove a user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| member_id | [string](#string) |  | Member ID belong to workflow user group |






<a name="chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupRequest"></a>

### RemoveMemberWorkflowUserGroupRequest
The remove workflow user group request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| members | [RemoveMemberWorkflowUserGroupMapping](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupMapping) | repeated | Members belong to workflow user group |






<a name="chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupResponse"></a>

### RemoveMemberWorkflowUserGroupResponse
RemoveWorkflowUserGroupMemberResponse is the response to remove member of workflow user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success is true if the group was deleted successfully |






<a name="chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailRequest"></a>

### SearchMemberListByNameOrEmailRequest
The Search user set by name or email request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [MemberUserGroupQuery](#chorus-com-workflow_user_group-v1-MemberUserGroupQuery) | optional | The user member query |
| order_by | [chorus.com.base.v1.OrderBy](#chorus-com-base-v1-OrderBy) | repeated | Order by field |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | Pagination |






<a name="chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailResponse"></a>

### SearchMemberListByNameOrEmailResponse
The Search user set by name or email response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [UserList](#chorus-com-workflow_user_group-v1-UserList) |  | The list data of search member |
| total | [int32](#int32) |  | The total number of user group member |






<a name="chorus-com-workflow_user_group-v1-SearchWorkflowUserGroup"></a>

### SearchWorkflowUserGroup
The search workflow user group type response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| workflow_user_group_role | [string](#string) |  | Role of the workflow user group. |






<a name="chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailRequest"></a>

### SearchWorkflowUserGroupByEmailRequest
The search workflow user group by email request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | email of user |






<a name="chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailResponse"></a>

### SearchWorkflowUserGroupByEmailResponse
The search workflow user group by email response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [SearchWorkflowUserGroup](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroup) |  | The list data of workflow user group |






<a name="chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupRequest"></a>

### SearchWorkflowUserGroupRequest
SearchWorkflowUserGroupRequest is the request to get list workflow user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [WorkflowUserGroupQuery](#chorus-com-workflow_user_group-v1-WorkflowUserGroupQuery) | optional | query |
| pagination | [chorus.com.base.v1.Pagination](#chorus-com-base-v1-Pagination) | optional | pagination |






<a name="chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupResponse"></a>

### SearchWorkflowUserGroupResponse
SearchWorkflowUserGroupResponse is the response to get list workflow user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_group | [WorkflowUserGroup](#chorus-com-workflow_user_group-v1-WorkflowUserGroup) |  | user_group is the workflow user group |
| total | [int32](#int32) |  | total is the total number of workflow user group |






<a name="chorus-com-workflow_user_group-v1-UpdateActivateFlagRequest"></a>

### UpdateActivateFlagRequest
UpdateActivateFlagRequest is the request to update the activate flag


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | group_id is the unique identifier for the group |
| status | [string](#string) |  | status is the status of the group |






<a name="chorus-com-workflow_user_group-v1-UpdateActivateFlagResponse"></a>

### UpdateActivateFlagResponse
UpdateActivateFlagResponse is the response to update the activate flag


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success is true if the group was updated successfully |






<a name="chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupRequest"></a>

### UpdateMemberForWorkflowUserGroupRequest
The request for update member for user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Identifier of the workflow user group to update. |
| members | [UpdateWorkflowUserGroupMemberMapping](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupMemberMapping) | repeated | Members belong to workflow user group |






<a name="chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupResponse"></a>

### UpdateMemberForWorkflowUserGroupResponse
The response update a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the workflow user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group (true/false). |






<a name="chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupRequest"></a>

### UpdateRoleForMemberOfGroupRequest
The request for update role for member of group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Identifier of the workflow user group to update. |
| member_id | [string](#string) |  | Member ID belong to workflow user group |
| workflow_user_group_role | [string](#string) |  | role of member work flow user group |






<a name="chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupResponse"></a>

### UpdateRoleForMemberOfGroupResponse
The response update role for member of group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the workflow user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group (true/false). |






<a name="chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupMemberMapping"></a>

### UpdateWorkflowUserGroupMemberMapping
Represents a member mapping for updating a user group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mapping_id | [string](#string) | optional | Mapping ID of workflow user group with user |
| member_id | [string](#string) |  | Member ID belong to workflow user group |
| is_deleted | [bool](#bool) | optional | Add flg to remove member of workflow user group |
| workflow_user_group_role | [string](#string) |  | role of member work flow user group |






<a name="chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupRequest"></a>

### UpdateWorkflowUserGroupRequest
The request for update a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Identifier of the workflow user group to update. |
| group_name | [string](#string) |  | New name for the user group. |
| description | [string](#string) |  | New description for the workflow user group. |
| is_active | [bool](#bool) |  | Status for the workflow user group(true/false) |
| members | [UpdateWorkflowUserGroupMemberMapping](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupMemberMapping) | repeated | Members belong to workflow user group |






<a name="chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupResponse"></a>

### UpdateWorkflowUserGroupResponse
The response update a user group.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | Id of the workflow user group. |
| group_name | [string](#string) |  | Name of the workflow user group. |
| description | [string](#string) |  | Description of the workflow user group. |
| is_active | [bool](#bool) |  | Status of the workflow user group (true/false). |






<a name="chorus-com-workflow_user_group-v1-UserList"></a>

### UserList
UserSuggestList represents a group of users that can be assigned to a workflow


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user_id of user |
| user_name | [string](#string) |  | user_name of user |
| email | [string](#string) |  | email of user |
| workflow_user_group_role | [string](#string) | optional | workflow user group mapping role |






<a name="chorus-com-workflow_user_group-v1-UserListSuggest"></a>

### UserListSuggest
UserSuggestList represents a group of users that can be assigned to a workflow


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user_id of user |
| user_name | [string](#string) |  | user_name of user |
| email | [string](#string) |  | email of user |
| disabled | [bool](#bool) |  | flag check exist user |






<a name="chorus-com-workflow_user_group-v1-WorkflowUserGroup"></a>

### WorkflowUserGroup
WorkflowUserGroup represents a group of users that can be assigned to a workflow


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | [string](#string) |  | group_id is the unique identifier for the group |
| group_name | [string](#string) |  | group_name is the name of the group |
| description | [string](#string) |  | description is a description of the group |
| status | [string](#string) |  | status is the status of the group |






<a name="chorus-com-workflow_user_group-v1-WorkflowUserGroupQuery"></a>

### WorkflowUserGroupQuery
WorkflowUserGroupQuery is used to filter the search results


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_name | [string](#string) |  | group_id is the unique identifier for the group |
| status | [string](#string) |  | group_name is the name of the group |





 

 

 


<a name="chorus-com-workflow_user_group-v1-WorkflowUserGroupService"></a>

### WorkflowUserGroupService
WorkflowUserGroupService is the service to manage workflow user group

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchWorkflowUserGroup | [SearchWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupRequest) | [SearchWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupResponse) stream | The method to search workflow user group<br /><br />Operation: LIKE<br /><br />Request: { &#34;query&#34;: { &#34;group_name&#34;: &#34;string&#34;, &#34;status&#34;: &#34;string&#34; }, &#34;pagination&#34;: { &#34;page&#34;: 1, &#34;per_page&#34;: 10 } }<br /><br />Response: { &#34;user_group&#34;: { &#34;group_id&#34;: &#34;string&#34;, &#34;group_name&#34;: &#34;string&#34;, &#34;description&#34;: &#34;string&#34;, &#34;status&#34;: &#34;string&#34; } } |
| UpdateActivateFlag | [UpdateActivateFlagRequest](#chorus-com-workflow_user_group-v1-UpdateActivateFlagRequest) | [UpdateActivateFlagResponse](#chorus-com-workflow_user_group-v1-UpdateActivateFlagResponse) | The method to update the activate flag<br /><br />Operation: UPDATE<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;status&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true } |
| DeleteWorkflowUserGroup | [DeleteWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupRequest) | [DeleteWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-DeleteWorkflowUserGroupResponse) | The method to delete workflow user group<br /><br />Operation: DELETE<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true } |
| CreateWorkflowUserGroup | [CreateWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupRequest) | [CreateWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-CreateWorkflowUserGroupResponse) | Create a workflow user group. |
| UpdateWorkflowUserGroup | [UpdateWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupRequest) | [UpdateWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-UpdateWorkflowUserGroupResponse) | Update an workflow user group |
| UpdateRoleForMemberOfGroup | [UpdateRoleForMemberOfGroupRequest](#chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupRequest) | [UpdateRoleForMemberOfGroupResponse](#chorus-com-workflow_user_group-v1-UpdateRoleForMemberOfGroupResponse) | Update role for user of group |
| UpdateMemberForWorkflowUserGroup | [UpdateMemberForWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupRequest) | [UpdateMemberForWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-UpdateMemberForWorkflowUserGroupResponse) | Update member for workflow user group |
| GetWorkflowUserGroupDetail | [GetWorkflowUserGroupDetailRequest](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailRequest) | [GetWorkflowUserGroupDetailResponse](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupDetailResponse) | The method for workflow user group detail<br /><br />Operation: MATCH<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;data&#34;: { &#34;group_id&#34;: &#34;string&#34;, &#34;group_name&#34;: &#34;string&#34;, &#34;is_active&#34;: true, &#34;description&#34;: &#34;string&#34;, } } |
| GetListUserSuggest | [GetListUserSuggestRequest](#chorus-com-workflow_user_group-v1-GetListUserSuggestRequest) | [GetListUserSuggestResponse](#chorus-com-workflow_user_group-v1-GetListUserSuggestResponse) stream | The method for get all data of user<br /><br />Operation: MATCH

empty input Request: { &#34;group_id&#34;:&#34;string&#34;, &#34;key_word&#34;:&#34;string&#34; }<br /><br />Response: { &#34;data&#34;: [{ &#34;user_id&#34;: &#34;string&#34;, &#34;user_name&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, }] } |
| SearchMemberListByNameOrEmail | [SearchMemberListByNameOrEmailRequest](#chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailRequest) | [SearchMemberListByNameOrEmailResponse](#chorus-com-workflow_user_group-v1-SearchMemberListByNameOrEmailResponse) stream | The method for search member of the work flow user group<br /><br />Operation: MATCH<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;key_word&#34;:&#34;string&#34; }<br /><br />Response: { &#34;data&#34;: [{ &#34;user_id&#34;: &#34;string&#34;, &#34;user_name&#34;: &#34;string&#34;, &#34;email&#34;: &#34;string&#34;, }] } |
| SearchWorkflowUserGroupByEmail | [SearchWorkflowUserGroupByEmailRequest](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailRequest) | [SearchWorkflowUserGroupByEmailResponse](#chorus-com-workflow_user_group-v1-SearchWorkflowUserGroupByEmailResponse) stream | The method for search workflow user group of the user email<br /><br />Operation: MATCH<br /><br />Request: { &#34;email&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;data&#34;: [{ &#34;group_id&#34;: &#34;string&#34;, &#34;group_name&#34;: &#34;string&#34;, }] } |
| RemoveMemberWorkflowUserGroup | [RemoveMemberWorkflowUserGroupRequest](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupRequest) | [RemoveMemberWorkflowUserGroupResponse](#chorus-com-workflow_user_group-v1-RemoveMemberWorkflowUserGroupResponse) | The method for remove member workflow user group<br /><br />Operation: MATCH<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;members&#34;: &#34;array&#34; }<br /><br />Response: { &#34;success&#34;: true } |
| BulkImportMembers | [BulkImportMembersRequest](#chorus-com-workflow_user_group-v1-BulkImportMembersRequest) | [BulkImportMembersResponse](#chorus-com-workflow_user_group-v1-BulkImportMembersResponse) | Bulk import members into a workflow user group<br /><br />Operation: IMPORT<br /><br />Request: { &#34;group_id&#34;: &#34;string&#34;, &#34;members&#34;: [ { &#34;email&#34;: &#34;string&#34;, &#34;role&#34;: &#34;MANAGER&#34; or &#34;MEMBER&#34; } ] }<br /><br />Response: { &#34;success&#34;: true, &#34;message&#34;: &#34;Bulk import completed successfully&#34; } |
| GetWorkflowUserGroupsByUserId | [GetWorkflowUserGroupsByUserIdRequest](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdRequest) | [GetWorkflowUserGroupsByUserIdResponse](#chorus-com-workflow_user_group-v1-GetWorkflowUserGroupsByUserIdResponse) stream | Get workflow user groups by user id<br /><br />Operation: MATCH<br /><br />Request: { &#34;user_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;workflow_user_group_id&#34;: &#34;string&#34;, &#34;workflow_user_group_role_name&#34;: &#34;string&#34; } ... |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

