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

- [base/v1/base.proto](#base_v1_base-proto)
    - [Id](#chorus-flm-base-v1-Id)
    - [PaginationRequest](#chorus-flm-base-v1-PaginationRequest)
    - [PaginationResponse](#chorus-flm-base-v1-PaginationResponse)
    - [Query](#chorus-flm-base-v1-Query)
    - [Sort](#chorus-flm-base-v1-Sort)
  
    - [Sort.SortEnum](#chorus-flm-base-v1-Sort-SortEnum)
  
- [charter_request/v1/charter_request.proto](#charter_request_v1_charter_request-proto)
    - [ApiResponse](#chorus-flm-charter_request-v1-ApiResponse)
    - [Assignee](#chorus-flm-charter_request-v1-Assignee)
    - [CharterRequest](#chorus-flm-charter_request-v1-CharterRequest)
    - [CharterRequestStatus](#chorus-flm-charter_request-v1-CharterRequestStatus)
    - [CharterRequestType](#chorus-flm-charter_request-v1-CharterRequestType)
    - [GetCharterRequestDetailsRequest](#chorus-flm-charter_request-v1-GetCharterRequestDetailsRequest)
    - [GetCharterRequestDetailsResponse](#chorus-flm-charter_request-v1-GetCharterRequestDetailsResponse)
    - [GetCharterRequestListRequest](#chorus-flm-charter_request-v1-GetCharterRequestListRequest)
    - [GetCharterRequestListResponse](#chorus-flm-charter_request-v1-GetCharterRequestListResponse)
    - [GetCharterRequestStatusRequest](#chorus-flm-charter_request-v1-GetCharterRequestStatusRequest)
    - [GetCharterRequestStatusResponse](#chorus-flm-charter_request-v1-GetCharterRequestStatusResponse)
    - [GetCharterRequestTypeRequest](#chorus-flm-charter_request-v1-GetCharterRequestTypeRequest)
    - [GetCharterRequestTypeResponse](#chorus-flm-charter_request-v1-GetCharterRequestTypeResponse)
    - [Pagination](#chorus-flm-charter_request-v1-Pagination)
    - [SaveAndSubmitCharterRequestRequest](#chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestRequest)
    - [SaveAndSubmitCharterRequestResponse](#chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestResponse)
    - [SetCharterRequestAssigneeRequest](#chorus-flm-charter_request-v1-SetCharterRequestAssigneeRequest)
    - [SetCharterRequestAssigneeResponse](#chorus-flm-charter_request-v1-SetCharterRequestAssigneeResponse)
    - [TimeCharterRequestAssignees](#chorus-flm-charter_request-v1-TimeCharterRequestAssignees)
    - [WithdrawTimeCharterRequest](#chorus-flm-charter_request-v1-WithdrawTimeCharterRequest)
    - [WithdrawTimeCharterResponse](#chorus-flm-charter_request-v1-WithdrawTimeCharterResponse)
  
    - [CharterRequestService](#chorus-flm-charter_request-v1-CharterRequestService)
  
- [charter_request_document/v1/charter_request_document.proto](#charter_request_document_v1_charter_request_document-proto)
    - [CharterRequestDocument](#chorus-flm-charter_request_document-v1-CharterRequestDocument)
    - [DeleteCharterRequestDocumentsRequest](#chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsRequest)
    - [DeleteCharterRequestDocumentsResponse](#chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsResponse)
    - [GetCharterRequestDocumentsRequest](#chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsRequest)
    - [GetCharterRequestDocumentsResponse](#chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsResponse)
    - [SaveCharterRequestDocumentRequest](#chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentRequest)
    - [SaveCharterRequestDocumentResponse](#chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentResponse)
  
    - [CharterRequestDocumentService](#chorus-flm-charter_request_document-v1-CharterRequestDocumentService)
  
- [comment/v1/comment.proto](#comment_v1_comment-proto)
    - [AddCommentRequest](#chorus-flm-comment-v1-AddCommentRequest)
    - [AddCommentResponse](#chorus-flm-comment-v1-AddCommentResponse)
    - [ApiResponse](#chorus-flm-comment-v1-ApiResponse)
    - [GetMainThreadsRequest](#chorus-flm-comment-v1-GetMainThreadsRequest)
    - [GetMainThreadsResponse](#chorus-flm-comment-v1-GetMainThreadsResponse)
    - [GetThreadRepliesRequest](#chorus-flm-comment-v1-GetThreadRepliesRequest)
    - [GetThreadRepliesResponse](#chorus-flm-comment-v1-GetThreadRepliesResponse)
    - [MarkCommentsAsReadRequest](#chorus-flm-comment-v1-MarkCommentsAsReadRequest)
    - [MarkCommentsAsReadResponse](#chorus-flm-comment-v1-MarkCommentsAsReadResponse)
    - [Metadata](#chorus-flm-comment-v1-Metadata)
    - [ThreadReplies](#chorus-flm-comment-v1-ThreadReplies)
    - [ThreadResponse](#chorus-flm-comment-v1-ThreadResponse)
  
    - [CommentService](#chorus-flm-comment-v1-CommentService)
  
- [comparison_pool/v1/comparison_pool.proto](#comparison_pool_v1_comparison_pool-proto)
    - [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse)
    - [ComparisonCriteria](#chorus-flm-comparison_pool-v1-ComparisonCriteria)
    - [ComparisonCriteriaValue](#chorus-flm-comparison_pool-v1-ComparisonCriteriaValue)
    - [ComparisonData](#chorus-flm-comparison_pool-v1-ComparisonData)
    - [ComparisonPoolTab](#chorus-flm-comparison_pool-v1-ComparisonPoolTab)
    - [CreateComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-CreateComparisonPoolTabRequest)
    - [CreateComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-CreateComparisonPoolTabResponse)
    - [DeleteComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabRequest)
    - [DeleteComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabResponse)
    - [Formula](#chorus-flm-comparison_pool-v1-Formula)
    - [FormulaValue](#chorus-flm-comparison_pool-v1-FormulaValue)
    - [GetAllComparisonPoolTabsRequest](#chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsRequest)
    - [GetAllComparisonPoolTabsResponse](#chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsResponse)
    - [GetComparisonByTabIdRequest](#chorus-flm-comparison_pool-v1-GetComparisonByTabIdRequest)
    - [GetComparisonByTabIdResponse](#chorus-flm-comparison_pool-v1-GetComparisonByTabIdResponse)
    - [PhaseStatus](#chorus-flm-comparison_pool-v1-PhaseStatus)
    - [Property](#chorus-flm-comparison_pool-v1-Property)
    - [UpdateComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabRequest)
    - [UpdateComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabResponse)
    - [Vessel](#chorus-flm-comparison_pool-v1-Vessel)
    - [VesselPropertyValue](#chorus-flm-comparison_pool-v1-VesselPropertyValue)
  
    - [ComparisonPoolService](#chorus-flm-comparison_pool-v1-ComparisonPoolService)
  
- [formula/v1/formula.proto](#formula_v1_formula-proto)
    - [CreateFormulaPropertyRequest](#chorus-flm-formula-v1-CreateFormulaPropertyRequest)
    - [CreateFormulaPropertyResponse](#chorus-flm-formula-v1-CreateFormulaPropertyResponse)
    - [CreateFormulaRequest](#chorus-flm-formula-v1-CreateFormulaRequest)
    - [CreateFormulaResponse](#chorus-flm-formula-v1-CreateFormulaResponse)
    - [DeleteFormulaPropertyRequest](#chorus-flm-formula-v1-DeleteFormulaPropertyRequest)
    - [DeleteFormulaPropertyResponse](#chorus-flm-formula-v1-DeleteFormulaPropertyResponse)
    - [DeleteFormulaRequest](#chorus-flm-formula-v1-DeleteFormulaRequest)
    - [DeleteFormulaResponse](#chorus-flm-formula-v1-DeleteFormulaResponse)
    - [Formula](#chorus-flm-formula-v1-Formula)
    - [FormulaProperty](#chorus-flm-formula-v1-FormulaProperty)
    - [FormulaPropertyPayload](#chorus-flm-formula-v1-FormulaPropertyPayload)
    - [FormulaPropertyResponse](#chorus-flm-formula-v1-FormulaPropertyResponse)
    - [SearchFormulaAndPropertyRequest](#chorus-flm-formula-v1-SearchFormulaAndPropertyRequest)
    - [SearchFormulaAndPropertyResponse](#chorus-flm-formula-v1-SearchFormulaAndPropertyResponse)
    - [UpdateFormulaPropertyRequest](#chorus-flm-formula-v1-UpdateFormulaPropertyRequest)
    - [UpdateFormulaPropertyResponse](#chorus-flm-formula-v1-UpdateFormulaPropertyResponse)
    - [UpdateFormulaRequest](#chorus-flm-formula-v1-UpdateFormulaRequest)
    - [UpdateFormulaResponse](#chorus-flm-formula-v1-UpdateFormulaResponse)
  
    - [FormulaService](#chorus-flm-formula-v1-FormulaService)
  
- [hero/v1/hero.proto](#hero_v1_hero-proto)
    - [FindAllRequest](#chorus-flm-hero-v1-FindAllRequest)
    - [FindAllResponse](#chorus-flm-hero-v1-FindAllResponse)
    - [FindOneRequest](#chorus-flm-hero-v1-FindOneRequest)
    - [FindOneResponse](#chorus-flm-hero-v1-FindOneResponse)
    - [Hero](#chorus-flm-hero-v1-Hero)
  
    - [HeroService](#chorus-flm-hero-v1-HeroService)
  
- [time_charter_comparison/v1/time_charter_comparison.proto](#time_charter_comparison_v1_time_charter_comparison-proto)
    - [AddCriteriaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonRequest)
    - [AddCriteriaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonResponse)
    - [AddFormulaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonRequest)
    - [AddFormulaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonResponse)
    - [AddVesselToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonRequest)
    - [AddVesselToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonResponse)
    - [AddVesselsFromPoolToComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonRequest)
    - [AddVesselsFromPoolToComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonResponse)
    - [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse)
    - [ComparisonCriteria](#chorus-flm-time_charter_comparison-v1-ComparisonCriteria)
    - [ComparisonCriteriaValue](#chorus-flm-time_charter_comparison-v1-ComparisonCriteriaValue)
    - [Criteria](#chorus-flm-time_charter_comparison-v1-Criteria)
    - [DuplicateErrorDetail](#chorus-flm-time_charter_comparison-v1-DuplicateErrorDetail)
    - [DuplicatedVessel](#chorus-flm-time_charter_comparison-v1-DuplicatedVessel)
    - [Formula](#chorus-flm-time_charter_comparison-v1-Formula)
    - [FormulaId](#chorus-flm-time_charter_comparison-v1-FormulaId)
    - [FormulaRequest](#chorus-flm-time_charter_comparison-v1-FormulaRequest)
    - [FormulaValue](#chorus-flm-time_charter_comparison-v1-FormulaValue)
    - [GetPropertyDefaultValueRequest](#chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueRequest)
    - [GetPropertyDefaultValueResponse](#chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueResponse)
    - [GetTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonRequest)
    - [GetTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonResponse)
    - [PhaseStatus](#chorus-flm-time_charter_comparison-v1-PhaseStatus)
    - [Property](#chorus-flm-time_charter_comparison-v1-Property)
    - [PropertyResponse](#chorus-flm-time_charter_comparison-v1-PropertyResponse)
    - [PropertyValueRequest](#chorus-flm-time_charter_comparison-v1-PropertyValueRequest)
    - [PropertyValueResponse](#chorus-flm-time_charter_comparison-v1-PropertyValueResponse)
    - [RemoveCriteriaFromComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonRequest)
    - [RemoveCriteriaFromComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonResponse)
    - [RemoveFormulaFromTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonRequest)
    - [RemoveFormulaFromTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonResponse)
    - [RemoveVesselFromTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonRequest)
    - [RemoveVesselFromTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonResponse)
    - [SaveComparisonCriteriaRequest](#chorus-flm-time_charter_comparison-v1-SaveComparisonCriteriaRequest)
    - [SaveFormulaPropertyValueRequest](#chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueRequest)
    - [SaveFormulaPropertyValueResponse](#chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueResponse)
    - [SavePropertyDefaultValueRequest](#chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueRequest)
    - [SavePropertyDefaultValueResponse](#chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueResponse)
    - [TimeCharterComparisonCriteriaResponse](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonCriteriaResponse)
    - [TimeCharterComparisonVesselCriteriaRequest](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaRequest)
    - [TimeCharterComparisonVesselCriteriaResponse](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaResponse)
    - [UpdateCriteriaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonRequest)
    - [UpdateCriteriaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonResponse)
    - [Vessel](#chorus-flm-time_charter_comparison-v1-Vessel)
    - [VesselId](#chorus-flm-time_charter_comparison-v1-VesselId)
    - [VesselPropertyValue](#chorus-flm-time_charter_comparison-v1-VesselPropertyValue)
    - [VesselsFromPool](#chorus-flm-time_charter_comparison-v1-VesselsFromPool)
  
    - [TimeCharterComparisonService](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonService)
  
- [time_charter_evaluation/v1/time_charter_evaluation.proto](#time_charter_evaluation_v1_time_charter_evaluation-proto)
    - [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse)
    - [CreateEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationRequest)
    - [CreateEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationResponse)
    - [DeleteDepartment](#chorus-flm-time_charter_evaluation-v1-DeleteDepartment)
    - [EvaluationData](#chorus-flm-time_charter_evaluation-v1-EvaluationData)
    - [EvaluationDepartments](#chorus-flm-time_charter_evaluation-v1-EvaluationDepartments)
    - [EvaluationInformation](#chorus-flm-time_charter_evaluation-v1-EvaluationInformation)
    - [EvaluationStatus](#chorus-flm-time_charter_evaluation-v1-EvaluationStatus)
    - [EvaluationVessels](#chorus-flm-time_charter_evaluation-v1-EvaluationVessels)
    - [GetEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationRequest)
    - [GetEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationResponse)
    - [PhaseStatus](#chorus-flm-time_charter_evaluation-v1-PhaseStatus)
    - [RemoveDepartmentEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationRequest)
    - [RemoveDepartmentEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationResponse)
    - [RemoveVesselFromEvaluationRequest](#chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationRequest)
    - [RemoveVesselFromEvaluationResponse](#chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationResponse)
    - [SelectVesselToEvaluationRequest](#chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationRequest)
    - [SelectVesselToEvaluationResponse](#chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationResponse)
    - [UpdateEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationRequest)
    - [UpdateEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationResponse)
  
    - [TimeCharterEvaluationService](#chorus-flm-time_charter_evaluation-v1-TimeCharterEvaluationService)
  
- [user_setting/v1/user_setting.proto](#user_setting_v1_user_setting-proto)
    - [ConfigurationCode](#chorus-flm-user_setting-v1-ConfigurationCode)
    - [GetVesselSettingRequest](#chorus-flm-user_setting-v1-GetVesselSettingRequest)
    - [GetVesselSettingResponse](#chorus-flm-user_setting-v1-GetVesselSettingResponse)
    - [UpSertVesselSettingRequest](#chorus-flm-user_setting-v1-UpSertVesselSettingRequest)
    - [UpSertVesselSettingResponse](#chorus-flm-user_setting-v1-UpSertVesselSettingResponse)
  
    - [VesselSettingService](#chorus-flm-user_setting-v1-VesselSettingService)
  
- [vessel/v1/vessel.proto](#vessel_v1_vessel-proto)
    - [CreateVesselRequest](#chorus-flm-vessel-v1-CreateVesselRequest)
    - [CreateVesselResponse](#chorus-flm-vessel-v1-CreateVesselResponse)
    - [DeleteVesselByIdRequest](#chorus-flm-vessel-v1-DeleteVesselByIdRequest)
    - [DeleteVesselByIdResponse](#chorus-flm-vessel-v1-DeleteVesselByIdResponse)
    - [ExportVesselsRequest](#chorus-flm-vessel-v1-ExportVesselsRequest)
    - [ExportVesselsResponse](#chorus-flm-vessel-v1-ExportVesselsResponse)
    - [ExportedVessel](#chorus-flm-vessel-v1-ExportedVessel)
    - [FilterCondition](#chorus-flm-vessel-v1-FilterCondition)
    - [FiltersRequest](#chorus-flm-vessel-v1-FiltersRequest)
    - [FindAllVesselsForComparisonRequest](#chorus-flm-vessel-v1-FindAllVesselsForComparisonRequest)
    - [FindAllVesselsForComparisonResponse](#chorus-flm-vessel-v1-FindAllVesselsForComparisonResponse)
    - [FindAllVesselsRequest](#chorus-flm-vessel-v1-FindAllVesselsRequest)
    - [FindAllVesselsResponse](#chorus-flm-vessel-v1-FindAllVesselsResponse)
    - [FindVesselByIdRequest](#chorus-flm-vessel-v1-FindVesselByIdRequest)
    - [FindVesselByIdResponse](#chorus-flm-vessel-v1-FindVesselByIdResponse)
    - [FindVesselNameIsNotExistedRequest](#chorus-flm-vessel-v1-FindVesselNameIsNotExistedRequest)
    - [FindVesselNameIsNotExistedResponse](#chorus-flm-vessel-v1-FindVesselNameIsNotExistedResponse)
    - [ImportManyVesselRequest](#chorus-flm-vessel-v1-ImportManyVesselRequest)
    - [ImportManyVesselResponse](#chorus-flm-vessel-v1-ImportManyVesselResponse)
    - [Pagination](#chorus-flm-vessel-v1-Pagination)
    - [SortTypeRequest](#chorus-flm-vessel-v1-SortTypeRequest)
    - [UpdateVesselRequest](#chorus-flm-vessel-v1-UpdateVesselRequest)
    - [UpdateVesselResponse](#chorus-flm-vessel-v1-UpdateVesselResponse)
    - [Vessel](#chorus-flm-vessel-v1-Vessel)
    - [VesselComparison](#chorus-flm-vessel-v1-VesselComparison)
  
    - [VesselService](#chorus-flm-vessel-v1-VesselService)
  
- [vessel_document/v1/vessel_document.proto](#vessel_document_v1_vessel_document-proto)
    - [DeleteVesselDocumentsRequest](#chorus-flm-vessel_document-v1-DeleteVesselDocumentsRequest)
    - [DeleteVesselDocumentsResponse](#chorus-flm-vessel_document-v1-DeleteVesselDocumentsResponse)
    - [GetVesselDocumentsRequest](#chorus-flm-vessel_document-v1-GetVesselDocumentsRequest)
    - [GetVesselDocumentsResponse](#chorus-flm-vessel_document-v1-GetVesselDocumentsResponse)
    - [SaveVesselDocumentRequest](#chorus-flm-vessel_document-v1-SaveVesselDocumentRequest)
    - [SaveVesselDocumentResponse](#chorus-flm-vessel_document-v1-SaveVesselDocumentResponse)
    - [VesselDocument](#chorus-flm-vessel_document-v1-VesselDocument)
  
    - [VesselDocumentService](#chorus-flm-vessel_document-v1-VesselDocumentService)
  
- [vessel_history/v1/vessel_history.proto](#vessel_history_v1_vessel_history-proto)
    - [FindAllVesselHistoryRequest](#chorus-flm-vessel_history-v1-FindAllVesselHistoryRequest)
    - [FindAllVesselHistoryResponse](#chorus-flm-vessel_history-v1-FindAllVesselHistoryResponse)
    - [TableHistoryCharteringHire](#chorus-flm-vessel_history-v1-TableHistoryCharteringHire)
    - [TableHistoryCharteringHireResponse](#chorus-flm-vessel_history-v1-TableHistoryCharteringHireResponse)
    - [TableHistoryOptionDetails](#chorus-flm-vessel_history-v1-TableHistoryOptionDetails)
    - [TableHistoryOthers](#chorus-flm-vessel_history-v1-TableHistoryOthers)
    - [TableHistoryOthersResponse](#chorus-flm-vessel_history-v1-TableHistoryOthersResponse)
    - [TableHistoryOwners](#chorus-flm-vessel_history-v1-TableHistoryOwners)
    - [TableHistoryOwnersResponse](#chorus-flm-vessel_history-v1-TableHistoryOwnersResponse)
    - [TableHistoryTypeOptions](#chorus-flm-vessel_history-v1-TableHistoryTypeOptions)
    - [TableHistoryVessels](#chorus-flm-vessel_history-v1-TableHistoryVessels)
    - [TableHistoryVesselsResponse](#chorus-flm-vessel_history-v1-TableHistoryVesselsResponse)
  
    - [VesselHistoryService](#chorus-flm-vessel_history-v1-VesselHistoryService)
  
- [workflow/v1/csr.proto](#workflow_v1_csr-proto)
    - [ApprovalCsrRequest](#chorus-flm-workflow-v1-ApprovalCsrRequest)
    - [ApprovalCsrResponse](#chorus-flm-workflow-v1-ApprovalCsrResponse)
    - [CreateCsrRequest](#chorus-flm-workflow-v1-CreateCsrRequest)
    - [CreateCsrResponse](#chorus-flm-workflow-v1-CreateCsrResponse)
    - [Csr](#chorus-flm-workflow-v1-Csr)
    - [GetCsrByIdRequest](#chorus-flm-workflow-v1-GetCsrByIdRequest)
    - [GetCsrByIdResponse](#chorus-flm-workflow-v1-GetCsrByIdResponse)
    - [UpdateCsrRequest](#chorus-flm-workflow-v1-UpdateCsrRequest)
    - [UpdateCsrResponse](#chorus-flm-workflow-v1-UpdateCsrResponse)
  
    - [CsrInfoService](#chorus-flm-workflow-v1-CsrInfoService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="base_v1_base-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## base/v1/base.proto



<a name="chorus-flm-base-v1-Id"></a>

### Id
Message to represent an identifier.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The unique identifier. |






<a name="chorus-flm-base-v1-PaginationRequest"></a>

### PaginationRequest
Message to specify pagination request parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| limit | [int32](#int32) | optional | Maximum number of items to return per page. |
| page | [int32](#int32) | optional | Page number to retrieve. |






<a name="chorus-flm-base-v1-PaginationResponse"></a>

### PaginationResponse
Message to provide pagination response details.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | Current page number. |
| limit | [int32](#int32) |  | Maximum items per page. |
| total_page | [int32](#int32) |  | Total number of pages. |
| total | [int32](#int32) |  | Total number of items. |






<a name="chorus-flm-base-v1-Query"></a>

### Query
Message to define a query with various parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| select | [string](#string) | repeated | Fields to select in the query. |
| where | [string](#string) |  | Conditions to filter data. |
| order_by | [string](#string) | repeated | Fields to order the results by. |
| limit | [int32](#int32) |  | Maximum number of items to return. |
| before | [string](#string) |  | Cursor to retrieve items before a certain point. |
| after | [string](#string) |  | Cursor to retrieve items after a certain point. |






<a name="chorus-flm-base-v1-Sort"></a>

### Sort
Message to define a sorting criteria.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| field | [string](#string) |  | The name of the field to sort by. |
| order | [Sort.SortEnum](#chorus-flm-base-v1-Sort-SortEnum) |  | The sorting order (ASC or DESC). |





 


<a name="chorus-flm-base-v1-Sort-SortEnum"></a>

### Sort.SortEnum
Enumeration for specifying sorting order.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SORT_ENUM_ASC_UNSPECIFIED | 0 | Ascending order. |
| SORT_ENUM_DESC | 1 | Descending order. |


 

 

 



<a name="charter_request_v1_charter_request-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## charter_request/v1/charter_request.proto



<a name="chorus-flm-charter_request-v1-ApiResponse"></a>

### ApiResponse
api response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_error | [bool](#bool) |  | true has error else ok |
| error_message | [string](#string) |  | error message |






<a name="chorus-flm-charter_request-v1-Assignee"></a>

### Assignee
Assignee


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Assignee Id |
| name | [string](#string) | optional | Assignee Name |
| action | [string](#string) |  | Action |






<a name="chorus-flm-charter_request-v1-CharterRequest"></a>

### CharterRequest
response body for CharterRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | charter request Id |
| request_title | [string](#string) |  | charter request Title |
| charter_request_status | [int32](#int32) |  | charter request Status |
| charter_type | [int32](#int32) |  | charter Type |
| service_code | [string](#string) | optional | service code |
| port_rotation | [string](#string) |  | port rotation |
| min_loadable_teu | [int32](#int32) |  | min loadable teu |
| max_loadable_teu | [int32](#int32) |  | max loadable teu |
| delivery_port | [string](#string) |  | delivery port |
| redelivery_port | [string](#string) | optional | redelivery port |
| delivery_from_date | [string](#string) |  | delivery from date |
| delivery_to_date | [string](#string) |  | delivery to date |
| redelivery_from_date | [string](#string) | optional | redelivery from date |
| redelivery_to_date | [string](#string) | optional | redelivery to date |
| reefer_plug_amount | [int32](#int32) | optional | reefer plug amount |
| remark | [string](#string) | optional | remark |
| charter_request_sequence | [int32](#int32) |  | charter request sequence |
| create_user_id | [string](#string) |  | create user id |
| create_program_id | [string](#string) |  | create program id |
| create_date | [string](#string) |  | create date |
| update_user_id | [string](#string) |  | update user id |
| update_program_id | [string](#string) |  | update program id |
| update_date | [string](#string) |  | update date |
| edw_update_date | [string](#string) | optional | edw update date |
| deleted_at | [string](#string) | optional | deleted at |
| time_charter_assignees | [TimeCharterRequestAssignees](#chorus-flm-charter_request-v1-TimeCharterRequestAssignees) | repeated | time charter request assignees list |
| time_charter_status | [int32](#int32) | optional | 1: Completed 2: Withdraw |
| md_approval_status | [string](#string) | optional | rejected | approved | approved with condition |






<a name="chorus-flm-charter_request-v1-CharterRequestStatus"></a>

### CharterRequestStatus
Message request for &#34;GetCharterRequestStatusResponse.GetCharterRequestTypeResponse&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Status id |
| name | [string](#string) |  | Status name |






<a name="chorus-flm-charter_request-v1-CharterRequestType"></a>

### CharterRequestType
Message request for &#34;GetCharterRequestTypeResponse.GetCharterRequestStatusRequest&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Type id |
| name | [string](#string) |  | Type name |






<a name="chorus-flm-charter_request-v1-GetCharterRequestDetailsRequest"></a>

### GetCharterRequestDetailsRequest
request body for GetCharterRequestDetailsRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request_id | [string](#string) |  | charter request Id |






<a name="chorus-flm-charter_request-v1-GetCharterRequestDetailsResponse"></a>

### GetCharterRequestDetailsResponse
response body for GetCharterRequestDetailsResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request | [CharterRequest](#chorus-flm-charter_request-v1-CharterRequest) |  | charter request details response |






<a name="chorus-flm-charter_request-v1-GetCharterRequestListRequest"></a>

### GetCharterRequestListRequest
response body for GetCharterRequestListRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pagination | [Pagination](#chorus-flm-charter_request-v1-Pagination) |  | Pagination info |






<a name="chorus-flm-charter_request-v1-GetCharterRequestListResponse"></a>

### GetCharterRequestListResponse
response body for GetCharterRequestListResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request_list | [CharterRequest](#chorus-flm-charter_request-v1-CharterRequest) | repeated | charter request List |
| total | [int32](#int32) |  | total of item |






<a name="chorus-flm-charter_request-v1-GetCharterRequestStatusRequest"></a>

### GetCharterRequestStatusRequest
Message request for &#34;GetCharterRequestStatus.GetCharterRequestStatusRequest&#34;






<a name="chorus-flm-charter_request-v1-GetCharterRequestStatusResponse"></a>

### GetCharterRequestStatusResponse
Message request for &#34;GetCharterRequestStatus.GetCharterRequestTypeResponse&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request_statuses | [CharterRequestStatus](#chorus-flm-charter_request-v1-CharterRequestStatus) | repeated | list of charter request statues |






<a name="chorus-flm-charter_request-v1-GetCharterRequestTypeRequest"></a>

### GetCharterRequestTypeRequest
Message request for &#34;GetCharterRequestType.GetCharterRequestTypeRequest&#34;






<a name="chorus-flm-charter_request-v1-GetCharterRequestTypeResponse"></a>

### GetCharterRequestTypeResponse
Message request for &#34;GetCharterRequestType.GetCharterRequestTypeResponse&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request_types | [CharterRequestType](#chorus-flm-charter_request-v1-CharterRequestType) | repeated | list of charter request types |






<a name="chorus-flm-charter_request-v1-Pagination"></a>

### Pagination
Pagination info


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| current_page | [int32](#int32) |  | Current Page |
| rows_per_page | [int32](#int32) |  | Rows Per Page |






<a name="chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestRequest"></a>

### SaveAndSubmitCharterRequestRequest
Message request for &#34;SaveAndSubmitCharterRequest.SaveAndSubmitCharterRequestRequest&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) | optional | Charter request id, incase of submitted it is required |
| request_title | [string](#string) |  | Title of charter request |
| charter_request_status | [int32](#int32) |  | Status of charter request |
| charter_type | [int32](#int32) |  | Type of charter request |
| service_code | [string](#string) | optional | Service code |
| port_rotation | [string](#string) |  | Port rotation |
| min_loadable_teu | [int32](#int32) |  | TEU from |
| max_loadable_teu | [int32](#int32) |  | TEU to |
| delivery_port | [string](#string) |  | DEL Port |
| redelivery_port | [string](#string) | optional | RE-DEL Port |
| delivery_from_date | [string](#string) |  | DEL date from |
| delivery_to_date | [string](#string) |  | DEL date to |
| redelivery_from_date | [string](#string) | optional | Re-del date from |
| redelivery_to_date | [string](#string) | optional | Re-del date to |
| reefer_plug_amount | [int32](#int32) | optional | No. of reefer plug |
| remark | [string](#string) | optional | Remark |
| user_id | [string](#string) |  | create userId |
| is_submitted | [int32](#int32) |  | Check if is submitted |






<a name="chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestResponse"></a>

### SaveAndSubmitCharterRequestResponse
Message request for &#34;SaveAndSubmitCharterRequest.SaveAndSubmitCharterRequestResponse&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Charter request id |
| sequence | [int32](#int32) |  | Charter request number |
| created_date_time | [string](#string) |  | Created date time |
| updated_date_time | [string](#string) |  | Updated date time |
| request_status | [int32](#int32) |  | Status id |
| time_charter_status | [int32](#int32) | optional | 1: Completed 2: Withdraw |
| md_approval_status | [string](#string) | optional | rejected | approved | approved with condition |






<a name="chorus-flm-charter_request-v1-SetCharterRequestAssigneeRequest"></a>

### SetCharterRequestAssigneeRequest
Set Charter Request Assignee


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | Charter request Id |
| assignees | [Assignee](#chorus-flm-charter_request-v1-Assignee) | repeated | List of assignee |
| create_user_id | [string](#string) |  | create user id |
| create_user_name | [string](#string) |  | Create user name |






<a name="chorus-flm-charter_request-v1-SetCharterRequestAssigneeResponse"></a>

### SetCharterRequestAssigneeResponse
Set Charter Request Assignee


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-charter_request-v1-ApiResponse) |  | api response |






<a name="chorus-flm-charter_request-v1-TimeCharterRequestAssignees"></a>

### TimeCharterRequestAssignees
Message request for &#34;xxx.TimeCharterRequestAssignees&#34;


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| assignee_id | [string](#string) |  | assignee id |
| assignee_name | [string](#string) |  | assignee name |
| sent_email | [bool](#bool) |  | assignee email option |






<a name="chorus-flm-charter_request-v1-WithdrawTimeCharterRequest"></a>

### WithdrawTimeCharterRequest
WithdrawTimeCharterRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter id |
| user_id | [string](#string) |  | user id |






<a name="chorus-flm-charter_request-v1-WithdrawTimeCharterResponse"></a>

### WithdrawTimeCharterResponse
WithdrawTimeCharterResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Charter request id |
| updated_date_time | [string](#string) |  | Updated date time |
| request_status | [int32](#int32) |  | Status id |
| time_charter_status | [int32](#int32) | optional | 1: Completed 2: Withdraw |





 

 

 


<a name="chorus-flm-charter_request-v1-CharterRequestService"></a>

### CharterRequestService
Service for Charter Request

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCharterRequestType | [GetCharterRequestTypeRequest](#chorus-flm-charter_request-v1-GetCharterRequestTypeRequest) | [GetCharterRequestTypeResponse](#chorus-flm-charter_request-v1-GetCharterRequestTypeResponse) | Get Charter Request Type<br /><br />Operation: Get<br /><br />Request: { } Response: { [ { &#34;id&#34;:1, &#34;name&#34;:&#34;New&#34; } ] } |
| GetCharterRequestStatus | [GetCharterRequestStatusRequest](#chorus-flm-charter_request-v1-GetCharterRequestStatusRequest) | [GetCharterRequestStatusResponse](#chorus-flm-charter_request-v1-GetCharterRequestStatusResponse) | Get Charter Request Status<br /><br />Operation: Get<br /><br />Request: { } Response: { [ { &#34;id&#34;:1, &#34;name&#34;:&#34;New&#34; } ] } |
| SaveAndSubmitCharterRequest | [SaveAndSubmitCharterRequestRequest](#chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestRequest) | [SaveAndSubmitCharterRequestResponse](#chorus-flm-charter_request-v1-SaveAndSubmitCharterRequestResponse) | Save and submit charter request<br /><br />Operation: POST<br /><br />Request: { &#34;id&#34;: &#34;&#34;, &#34;request_title&#34;: &#34;&#34;, &#34;charter_request_status&#34;: 0, &#34;charter_type&#34;: 0, &#34;service_code&#34;: &#34;&#34;, &#34;port_rotation&#34;: &#34;&#34;, &#34;min_loadable_teu&#34;: 0, &#34;max_loadable_teu&#34;: 0, &#34;delivery_port&#34;: &#34;&#34;, &#34;redelivery_port&#34;: &#34;&#34;, &#34;delivery_from_date&#34;: &#34;&#34;, &#34;delivery_to_date&#34;: &#34;&#34;, &#34;redelivery_from_date&#34;: &#34;&#34;, &#34;redelivery_to_date&#34;: &#34;&#34;, &#34;reefer_plug_amount&#34;: 0, &#34;remark&#34;: &#34;&#34;, &#34;user_id&#34;: &#34;&#34;, &#34;is_submitted&#34;: 0 } Response: { &#34;id&#34; : &#34;charter request id&#34;, &#34;sequence&#34; : 1 &#34;create_date_time&#34; : &#34;2024-03-30 10:39:31&#43;07&#34; } |
| GetCharterRequestDetails | [GetCharterRequestDetailsRequest](#chorus-flm-charter_request-v1-GetCharterRequestDetailsRequest) | [GetCharterRequestDetailsResponse](#chorus-flm-charter_request-v1-GetCharterRequestDetailsResponse) | Get Charter Request Details<br /><br />Operation: POST<br /><br />Request: { &#34;charter_request_id&#34;: &#34;charter_request_id&#34; } Response: { &#34;charter_request&#34;: { &#34;id&#34; : &#34;charter request id&#34;, &#34;request_title&#34; : &#34;request title&#34;, &#34;charter_request_status&#34; : 0, &#34;charter_type&#34; : 0, &#34;service_code&#34; : &#34;&#34;, &#34;port_rotation&#34; : &#34;port rotation&#34;, &#34;min_loadable_teu&#34; : 0, &#34;max_loadable_teu&#34; : 0, &#34;delivery_port&#34; : &#34;delivery port&#34;, &#34;redelivery_port&#34; : &#34;&#34;, &#34;delivery_from_date&#34; : &#34;delivery from date&#34;, &#34;delivery_to_date&#34; : &#34;delivery to date&#34;, &#34;redelivery_from_date&#34; : &#34;&#34;, &#34;redelivery_to_date&#34; : &#34;&#34;, &#34;reefer_plug_amount&#34; : 0, &#34;remark&#34; : &#34;&#34;, &#34;charter_request_sequence&#34; : 0, &#34;create_user_id&#34; : &#34;create user id&#34;, &#34;create_program_id&#34; : &#34;create program id&#34;, &#34;create_date&#34; : &#34;create date&#34;, &#34;update_user_id&#34; : &#34;update user id&#34;, &#34;update_program_id&#34; : &#34;update program id&#34;, &#34;update_date&#34; : &#34;update date&#34;, &#34;edw_update_date&#34; : &#34;&#34;, &#34;deleted_at&#34; : &#34;&#34;, &#34;time_charter_assignees&#34; : [], &#34;time_charter_status&#34; : 0, &#34;md_approval_status&#34; : &#34;&#34; } } |
| GetCharterRequestList | [GetCharterRequestListRequest](#chorus-flm-charter_request-v1-GetCharterRequestListRequest) | [GetCharterRequestListResponse](#chorus-flm-charter_request-v1-GetCharterRequestListResponse) | Get Charter Request List<br /><br />Operation: GET<br /><br />Request: { &#34;pagination&#34;: { &#34;current_page&#34;: 1, &#34;rows_per_page&#34;: 10, } } Response: { &#34;charter_request_list&#34; : [ { &#34;id&#34; : &#34;charter request id&#34;, &#34;request_title&#34; : &#34;request title&#34;, &#34;charter_request_status&#34; : 0, &#34;charter_type&#34; : 0, &#34;service_code&#34; : &#34;&#34;, &#34;port_rotation&#34; : &#34;port rotation&#34;, &#34;min_loadable_teu&#34; : 0, &#34;max_loadable_teu&#34; : 0, &#34;delivery_port&#34; : &#34;delivery port&#34;, &#34;redelivery_port&#34; : &#34;&#34;, &#34;delivery_from_date&#34; : &#34;delivery from date&#34;, &#34;delivery_to_date&#34; : &#34;delivery to date&#34;, &#34;redelivery_from_date&#34; : &#34;&#34;, &#34;redelivery_to_date&#34; : &#34;&#34;, &#34;reefer_plug_amount&#34; : 0, &#34;remark&#34; : &#34;&#34;, &#34;charter_request_sequence&#34; : 0, &#34;create_user_id&#34; : &#34;create user id&#34;, &#34;create_program_id&#34; : &#34;create program id&#34;, &#34;create_date&#34; : &#34;create date&#34;, &#34;update_user_id&#34; : &#34;update user id&#34;, &#34;update_program_id&#34; : &#34;update program id&#34;, &#34;update_date&#34; : &#34;update date&#34;, &#34;edw_update_date&#34; : &#34;&#34;, &#34;deleted_at&#34; : &#34;&#34;, &#34;time_charter_assignees&#34; : [], &#34;time_charter_status&#34; : 0, &#34;md_approval_status&#34; : &#34;&#34; } ], &#34;total&#34; : 1 } |
| SetCharterRequestAssignee | [SetCharterRequestAssigneeRequest](#chorus-flm-charter_request-v1-SetCharterRequestAssigneeRequest) | [SetCharterRequestAssigneeResponse](#chorus-flm-charter_request-v1-SetCharterRequestAssigneeResponse) | Assign assignee to charter request Operation: POST Request: { &#34;tcId&#34;: &#34;&#34; &#34;assignees&#34;: [] &#34;create_user_id&#34;: &#34;&#34; } Response: { apiResponse: { isError: boolean, errorMessage: string } } |
| WithdrawTimeCharter | [WithdrawTimeCharterRequest](#chorus-flm-charter_request-v1-WithdrawTimeCharterRequest) | [WithdrawTimeCharterResponse](#chorus-flm-charter_request-v1-WithdrawTimeCharterResponse) | Withdraw a time charter at anytime Operation: POST Request: { &#34;tcId&#34;: &#34;&#34; } Response: { &#34;id&#34; : &#34;charter request id&#34;, &#34;updated_date_time&#34; : &#34;2024-03-30 10:39:31&#43;07&#34;, &#34;request_status&#34; :1, &#34;time_charter_status&#34;: 2 } |

 



<a name="charter_request_document_v1_charter_request_document-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## charter_request_document/v1/charter_request_document.proto



<a name="chorus-flm-charter_request_document-v1-CharterRequestDocument"></a>

### CharterRequestDocument
CharterRequest Document Entity


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Document ID |
| charter_request_id | [string](#string) |  | CharterRequest ID |
| file_name | [string](#string) |  | File name |
| file_path | [string](#string) |  | Uploaded file path to GCP |
| file_size | [int32](#int32) |  | Upload file size |
| create_date | [string](#string) |  | Created time |
| create_user_id | [string](#string) |  | Created by |






<a name="chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsRequest"></a>

### DeleteCharterRequestDocumentsRequest
DeleteCharterRequestDocumentRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | User ID |
| charter_request_id | [string](#string) |  | CharterRequest ID |
| document_id | [string](#string) | repeated | List of document IDs which are need deleting |






<a name="chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsResponse"></a>

### DeleteCharterRequestDocumentsResponse
DeleteCharterRequestDocumentResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success |






<a name="chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsRequest"></a>

### GetCharterRequestDocumentsRequest
Request message for GetCharterRequestDocuments


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charter_request_id | [string](#string) |  | CharterRequest ID |
| user_id | [string](#string) |  | User ID |
| current_page | [int32](#int32) |  | Current page |
| row_per_page | [int32](#int32) |  | Row per page |
| sort_type | [string](#string) |  | Sorting type |






<a name="chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsResponse"></a>

### GetCharterRequestDocumentsResponse
GetCharterRequestDocumentsResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [CharterRequestDocument](#chorus-flm-charter_request_document-v1-CharterRequestDocument) | repeated | List of CharterRequest documents |
| total | [int32](#int32) |  | total number of documents |






<a name="chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentRequest"></a>

### SaveCharterRequestDocumentRequest
Request message for GetCharterRequestDocument


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document_id | [string](#string) |  | Document ID |
| charter_request_id | [string](#string) |  | CharterRequest ID |
| file_name | [string](#string) |  | File name |
| file_path | [string](#string) |  | File path |
| file_size | [int32](#int32) |  | File size |
| user_id | [string](#string) |  | User Id |






<a name="chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentResponse"></a>

### SaveCharterRequestDocumentResponse
Message request for saving new CharterRequest document


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [CharterRequestDocument](#chorus-flm-charter_request_document-v1-CharterRequestDocument) |  | data of CharterRequest document |





 

 

 


<a name="chorus-flm-charter_request_document-v1-CharterRequestDocumentService"></a>

### CharterRequestDocumentService
Service for CharterRequest Document

Save CharterRequest document<br /><br />Operation: POST

Request:
{
   &#34;charter_request_id&#34;:&#34;charterRequestId&#34;,
   &#34;file_name&#34;:&#34;fileName&#34;,
   &#34;file_path&#34;:&#34;filePath&#34;,
   &#34;file_size&#34;:&#34;fileSize&#34;,
   &#34;user_id&#34;:&#34;userId&#34;    
}

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SaveCharterRequestDocument | [SaveCharterRequestDocumentRequest](#chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentRequest) | [SaveCharterRequestDocumentResponse](#chorus-flm-charter_request_document-v1-SaveCharterRequestDocumentResponse) | Response: { &#34;charter_request_id&#34;:&#34;charterRequestId&#34;, &#34;file_name&#34;:&#34;fileName&#34;, &#34;file_path&#34;:&#34;filePath&#34;, &#34;file_size&#34;:&#34;fileSize&#34;, &#34;user_id&#34;:&#34;userId&#34; } |
| GetCharterRequestDocuments | [GetCharterRequestDocumentsRequest](#chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsRequest) | [GetCharterRequestDocumentsResponse](#chorus-flm-charter_request_document-v1-GetCharterRequestDocumentsResponse) | Response: { &#34;total&#34;: number &#34;data&#34;: { &#34;charter_request_id&#34;: string, &#34;file_name&#34;: string, &#34;file_path&#34;: string, &#34;file_size&#34;: number, &#34;user_id&#34;: string } } |
| DeleteCharterRequestDocuments | [DeleteCharterRequestDocumentsRequest](#chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsRequest) | [DeleteCharterRequestDocumentsResponse](#chorus-flm-charter_request_document-v1-DeleteCharterRequestDocumentsResponse) | Response: { success: boolean } |

 



<a name="comment_v1_comment-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## comment/v1/comment.proto



<a name="chorus-flm-comment-v1-AddCommentRequest"></a>

### AddCommentRequest
Request message for `CommentService.AddComment`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| target | [string](#string) |  | Target of comment (TIME_CHARTER, VESSEL, etc.) |
| target_id | [string](#string) |  | Target ID of comment |
| sender_id | [string](#string) |  | Sender ID of comment |
| parent_comment_id | [string](#string) | optional | parent comment id, if not exist create new comment, otherwise create new reply |
| message | [string](#string) |  | The message content of the comment |
| metadata | [Metadata](#chorus-flm-comment-v1-Metadata) |  | Additional information about target |






<a name="chorus-flm-comment-v1-AddCommentResponse"></a>

### AddCommentResponse
Response message for `CommentService.AddComment`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-comment-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comment-v1-ApiResponse"></a>

### ApiResponse
API response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_error | [bool](#bool) |  | If true, there is an error |
| error_message | [string](#string) |  | Error message |






<a name="chorus-flm-comment-v1-GetMainThreadsRequest"></a>

### GetMainThreadsRequest
Request message for `CommentService.GetMainThreads`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| target | [string](#string) |  | Target of comment (TIME_CHARTER, VESSEL, etc.) |
| target_id | [string](#string) |  | Target ID of comment |
| metadata | [Metadata](#chorus-flm-comment-v1-Metadata) | optional | Additional information about target |
| with_replies | [bool](#bool) |  | If true, get replies of comment |
| page_size | [int32](#int32) |  | Number of comment to be returned in a page |
| offset | [int32](#int32) |  | Offset of comment to be returned in a page |
| user_id | [string](#string) |  | User ID of comment |






<a name="chorus-flm-comment-v1-GetMainThreadsResponse"></a>

### GetMainThreadsResponse
Response message for `CommentService.GetMainThreads`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-comment-v1-ApiResponse) |  | API response |
| data | [ThreadResponse](#chorus-flm-comment-v1-ThreadResponse) | repeated | List of main thread |






<a name="chorus-flm-comment-v1-GetThreadRepliesRequest"></a>

### GetThreadRepliesRequest
Request message for `CommentService.GetThreadReplies`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parent_comment_id | [string](#string) |  | The comment ID of the parent comment |
| page_size | [int32](#int32) |  | The number of items to return per page |
| offset | [int32](#int32) |  | The offset of the first item to return |
| user_id | [string](#string) |  | The user ID of the user who is performing the action |






<a name="chorus-flm-comment-v1-GetThreadRepliesResponse"></a>

### GetThreadRepliesResponse
Response message for `CommentService.GetThreadReplies`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-comment-v1-ApiResponse) |  | The api response object contains information about the error |
| total_replies_count | [int32](#int32) |  | The total number of replies |
| data | [ThreadReplies](#chorus-flm-comment-v1-ThreadReplies) | repeated | The list of replies |






<a name="chorus-flm-comment-v1-MarkCommentsAsReadRequest"></a>

### MarkCommentsAsReadRequest
Request message for `CommentService.AddComment`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comment_ids | [string](#string) | repeated | comment id array |
| reader_id | [string](#string) |  | reader id |






<a name="chorus-flm-comment-v1-MarkCommentsAsReadResponse"></a>

### MarkCommentsAsReadResponse
Response message for `CommentService.MarkCommentsAsRead`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-comment-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comment-v1-Metadata"></a>

### Metadata
Metadata


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [int32](#int32) | optional | Status |






<a name="chorus-flm-comment-v1-ThreadReplies"></a>

### ThreadReplies
Response message for `CommentService.GetThreadReplies`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comment_id | [string](#string) |  | The comment ID |
| message | [string](#string) |  | The message content of the comment |
| date | [string](#string) |  | The date of the comment |
| sender_id | [string](#string) |  | The user ID of the sender |
| is_read | [bool](#bool) |  | If true, the comment is marked as read |






<a name="chorus-flm-comment-v1-ThreadResponse"></a>

### ThreadResponse
Response message for `CommentService.GetThreadReplies`


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comment_id | [string](#string) |  | The comment ID |
| message | [string](#string) |  | The message content of the comment |
| total_replies_count | [int32](#int32) |  | The total number of replies for this comment |
| sender_id | [string](#string) |  | The user ID of the sender |
| date | [string](#string) |  | The date of the comment |
| is_read | [bool](#bool) |  | If true, the comment is marked as read |
| status | [int32](#int32) |  | The status of the comment |
| replies | [ThreadReplies](#chorus-flm-comment-v1-ThreadReplies) | repeated | The list of replies of the comment |





 

 

 


<a name="chorus-flm-comment-v1-CommentService"></a>

### CommentService
Service for comment module

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetMainThreads | [GetMainThreadsRequest](#chorus-flm-comment-v1-GetMainThreadsRequest) | [GetMainThreadsResponse](#chorus-flm-comment-v1-GetMainThreadsResponse) | Get threads comment Operation: GET Request: { &#34;target&#34;: &#34;string&#34;; &#34;target_id&#34;: &#34;string&#34;; &#34;metadata&#34;: &#34;object&#34;; &#34;with_replies&#34;: &#34;boolean&#34;; &#34;page_size&#34;: &#34;number&#34;; &#34;offset&#34;: &#34;number&#34;; &#34;user_id&#34;: &#34;string&#34;; } Response: { &#34;api_response&#34;: { isError: boolean, errorMessage: string } &#34;data&#34;: ThreadResponse[], } |
| GetThreadReplies | [GetThreadRepliesRequest](#chorus-flm-comment-v1-GetThreadRepliesRequest) | [GetThreadRepliesResponse](#chorus-flm-comment-v1-GetThreadRepliesResponse) | Get replies of a thread comment Operation: GET Request: { &#34;parent_comment_id&#34;: &#34;string&#34;; &#34;page_size&#34;: &#34;number&#34;; &#34;offset&#34;: &#34;number&#34;; &#34;user_id&#34;: &#34;string&#34;; } Response: { &#34;apiResponse&#34;: { isError: boolean, errorMessage: string }, &#34;data&#34;: ThreadReplies[], &#34;total_replies_count&#34;: number } |
| AddComment | [AddCommentRequest](#chorus-flm-comment-v1-AddCommentRequest) | [AddCommentResponse](#chorus-flm-comment-v1-AddCommentResponse) | Add comment Operation: POST Request: { &#34;target&#34;: &#34;TIME_CHARTER&#34;; &#34;targetId&#34;: &#34;string&#34;; &#34;parent_comment_id&#34;: &#34;string&#34;; &#34;message&#34;: &#34;string&#34;; &#34;sender_id&#34;: &#34;string&#34;; &#34;metadata&#34;: &#34;object&#34;; } Response: { &#34;apiResponse&#34;: { isError: boolean, errorMessage: string }, } |
| MarkCommentsAsRead | [MarkCommentsAsReadRequest](#chorus-flm-comment-v1-MarkCommentsAsReadRequest) | [MarkCommentsAsReadResponse](#chorus-flm-comment-v1-MarkCommentsAsReadResponse) | Mark comments as read Operation: POST Request: { &#34;comment_id&#34;: [&#34;1&#34;, &#34;2&#34;]; &#34;reader_id&#34;: &#34;string&#34;; } Response: { &#34;apiResponse&#34;: { isError: boolean, errorMessage: string }, } |

 



<a name="comparison_pool_v1_comparison_pool-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## comparison_pool/v1/comparison_pool.proto



<a name="chorus-flm-comparison_pool-v1-ApiResponse"></a>

### ApiResponse
api response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_error | [bool](#bool) |  | true has error else ok |
| error_message | [string](#string) |  | error message |






<a name="chorus-flm-comparison_pool-v1-ComparisonCriteria"></a>

### ComparisonCriteria
comparison criteria


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | criteria id |
| header_text | [string](#string) |  | header text |
| is_top | [bool](#bool) |  | True: The Criteria will be displayed on the top on criteria |






<a name="chorus-flm-comparison_pool-v1-ComparisonCriteriaValue"></a>

### ComparisonCriteriaValue
comparison criteria value


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_id | [string](#string) |  | criteria id |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | criteria value |






<a name="chorus-flm-comparison_pool-v1-ComparisonData"></a>

### ComparisonData
Comparison Data


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| vessels | [Vessel](#chorus-flm-comparison_pool-v1-Vessel) | repeated | list of vessel in comparison |
| properties | [Property](#chorus-flm-comparison_pool-v1-Property) | repeated | list of property in comparison |
| vessel_property_values | [VesselPropertyValue](#chorus-flm-comparison_pool-v1-VesselPropertyValue) | repeated | list of property value in comparison |
| comparison_criteria | [ComparisonCriteria](#chorus-flm-comparison_pool-v1-ComparisonCriteria) | repeated | list of criteria |
| comparison_criteria_values | [ComparisonCriteriaValue](#chorus-flm-comparison_pool-v1-ComparisonCriteriaValue) | repeated | list of criteria value |
| formulas | [Formula](#chorus-flm-comparison_pool-v1-Formula) | repeated | list of formula |
| formula_values | [FormulaValue](#chorus-flm-comparison_pool-v1-FormulaValue) | repeated | list of formula value |






<a name="chorus-flm-comparison_pool-v1-ComparisonPoolTab"></a>

### ComparisonPoolTab
Comparison pool tab


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | tab id |
| tab_name | [string](#string) |  | tab name |
| comparison_id | [string](#string) |  | comparison id |






<a name="chorus-flm-comparison_pool-v1-CreateComparisonPoolTabRequest"></a>

### CreateComparisonPoolTabRequest
create comparison pool tab request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_name | [string](#string) |  | name of comparison pool tab |
| create_user_id | [string](#string) |  | created user id |






<a name="chorus-flm-comparison_pool-v1-CreateComparisonPoolTabResponse"></a>

### CreateComparisonPoolTabResponse
create comparison pool tab response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | id of comparison pool tab |
| api_response | [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabRequest"></a>

### DeleteComparisonPoolTabRequest
delete comparison pool tab request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | tab id |






<a name="chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabResponse"></a>

### DeleteComparisonPoolTabResponse
delete comparison pool tab response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comparison_pool-v1-Formula"></a>

### Formula
formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | formula id |
| expression | [string](#string) |  | formula expression |
| name | [string](#string) |  | formula name |
| properties | [string](#string) | repeated | Formula property |






<a name="chorus-flm-comparison_pool-v1-FormulaValue"></a>

### FormulaValue
formula value


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | calculated value return null if any errors happen |
| is_error | [bool](#bool) |  | is value error |






<a name="chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsRequest"></a>

### GetAllComparisonPoolTabsRequest
get all comparison pool tabs request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | user id |






<a name="chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsResponse"></a>

### GetAllComparisonPoolTabsResponse
get all comparison pool tabs response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comparison_pool_tabs | [ComparisonPoolTab](#chorus-flm-comparison_pool-v1-ComparisonPoolTab) | repeated | list of comparison pool tabs |
| api_response | [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comparison_pool-v1-GetComparisonByTabIdRequest"></a>

### GetComparisonByTabIdRequest
get comparison pool tab by id request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | id of comparison pool tab |
| user_id | [string](#string) |  | user id |






<a name="chorus-flm-comparison_pool-v1-GetComparisonByTabIdResponse"></a>

### GetComparisonByTabIdResponse
get comparison pool tab by id response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comparison_data | [ComparisonData](#chorus-flm-comparison_pool-v1-ComparisonData) |  | comparison data |
| api_response | [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comparison_pool-v1-PhaseStatus"></a>

### PhaseStatus
Phase status


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| for_evaluation | [bool](#bool) |  | for_evaluation |
| for_fm_internal_approval | [bool](#bool) |  | for_fm_internal_approval |
| for_md_approval | [bool](#bool) |  | for_md_approval |






<a name="chorus-flm-comparison_pool-v1-Property"></a>

### Property
property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | property id |
| name | [string](#string) |  | property name |






<a name="chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabRequest"></a>

### UpdateComparisonPoolTabRequest
update comparison pool tab request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | id of comparison pool tab |
| tab_name | [string](#string) |  | updated tab name |
| update_user_id | [string](#string) |  | updated user id |






<a name="chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabResponse"></a>

### UpdateComparisonPoolTabResponse
update comparison pool tab response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tab_id | [string](#string) |  | id of comparison pool tab |
| api_response | [ApiResponse](#chorus-flm-comparison_pool-v1-ApiResponse) |  | api response |






<a name="chorus-flm-comparison_pool-v1-Vessel"></a>

### Vessel
vessel add to comparison


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) | optional | The vessel_code is the code of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| design | [string](#string) |  | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) | optional | The period is the period of chartering |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | gear |
| vessel_status | [string](#string) |  | vessel status |
| phase_status | [PhaseStatus](#chorus-flm-comparison_pool-v1-PhaseStatus) |  | phase status |
| is_added_to_tc | [bool](#bool) | optional | if vessel is added to TC from TC pool |






<a name="chorus-flm-comparison_pool-v1-VesselPropertyValue"></a>

### VesselPropertyValue
vessel formula response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property id |
| value | [string](#string) |  | property value |
| vessel_id | [string](#string) |  | vessel id |





 

 

 


<a name="chorus-flm-comparison_pool-v1-ComparisonPoolService"></a>

### ComparisonPoolService
Service for Comparison Pool

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateComparisonPoolTab | [CreateComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-CreateComparisonPoolTabRequest) | [CreateComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-CreateComparisonPoolTabResponse) | create a new tab

Method: GET<br /><br />Request: { tab_name: &#34;new_tab_name&#34;, create_user_id: &#34;test@one.com&#34; }<br /><br />Response: chorus.flm.

{ tab_id: &#34;1&#34;, &#34;api_response&#34;: { &#34;is_error&#34;: false, &#34;error_message&#34;: &#34;&#34; } } |
| UpdateComparisonPoolTab | [UpdateComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabRequest) | [UpdateComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-UpdateComparisonPoolTabResponse) | update comparison pool tab

Method: POST<br /><br />Request: { tab_id: &#34;1&#34;, tab_name: &#34;updated_tab_name&#34;, update_user_id: &#34;test@one.com&#34; }<br /><br />Response: { tab_id: &#34;1&#34;, &#34;api_response&#34;: { &#34;is_error&#34;: false, &#34;error_message&#34;: &#34;&#34; } } |
| GetComparisonByTabId | [GetComparisonByTabIdRequest](#chorus-flm-comparison_pool-v1-GetComparisonByTabIdRequest) | [GetComparisonByTabIdResponse](#chorus-flm-comparison_pool-v1-GetComparisonByTabIdResponse) | get a tab by id

Method: GET<br /><br />Request: { tab_id: &#34;1&#34; }<br /><br />Response: { &#34;comparison_data&#34;: { &#34;tc_comparison_id&#34;: &#34;1&#34;, &#34;vessels&#34;: [vessel], &#34;properties&#34;: [property], &#34;vessel_property_values&#34;: [VesselPropertyValue], &#34;comparison_criteria&#34;: [ComparisonCriteria], &#34;comparison_criteria_values&#34;: [ComparisonCriteriaValue], &#34;formulas&#34;: [Formula], &#34;formula_values&#34;: [FormulaValue] } &#34;api_response&#34;: { &#34;is_error&#34;: false, &#34;error_message&#34;: &#34;&#34; } } |
| GetAllComparisonPoolTabs | [GetAllComparisonPoolTabsRequest](#chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsRequest) | [GetAllComparisonPoolTabsResponse](#chorus-flm-comparison_pool-v1-GetAllComparisonPoolTabsResponse) | get all tabs

Method: GET<br /><br />Request: {}<br /><br />Response: { &#34;comparison_pool_tabs&#34;: [ComparisonPoolTab], &#34;api_response&#34;: { &#34;is_error&#34;: false, &#34;error_message&#34;: &#34;&#34; } } |
| DeleteComparisonPoolTab | [DeleteComparisonPoolTabRequest](#chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabRequest) | [DeleteComparisonPoolTabResponse](#chorus-flm-comparison_pool-v1-DeleteComparisonPoolTabResponse) | delete tab by id

Method: POST<br /><br />Request: { tab_id: &#34;1&#34; }<br /><br />Response: { &#34;api_response&#34;: { &#34;is_error&#34;: false, &#34;error_message&#34;: &#34;&#34; } } |

 



<a name="formula_v1_formula-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## formula/v1/formula.proto



<a name="chorus-flm-formula-v1-CreateFormulaPropertyRequest"></a>

### CreateFormulaPropertyRequest
Create new formula property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_name | [string](#string) |  | property name |
| create_user_id | [string](#string) |  | The create_user_id is the creator |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date |
| edw_update_date | [string](#string) |  | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-CreateFormulaPropertyResponse"></a>

### CreateFormulaPropertyResponse
Create new formula property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property name |
| property_name | [string](#string) |  | property name |
| default_flag | [bool](#bool) |  | property name |






<a name="chorus-flm-formula-v1-CreateFormulaRequest"></a>

### CreateFormulaRequest
Create new formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_name | [string](#string) |  | formula name |
| expression | [string](#string) |  | expression regular |
| create_user_id | [string](#string) |  | The create_user_id is the creator |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date |
| edw_update_date | [string](#string) |  | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-CreateFormulaResponse"></a>

### CreateFormulaResponse
create new formula response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula name |
| formula_name | [string](#string) |  | formula name |
| expression | [string](#string) |  | formula name |






<a name="chorus-flm-formula-v1-DeleteFormulaPropertyRequest"></a>

### DeleteFormulaPropertyRequest
The message request for delete Property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_ids | [string](#string) | repeated | Property id |






<a name="chorus-flm-formula-v1-DeleteFormulaPropertyResponse"></a>

### DeleteFormulaPropertyResponse
The message response for delete Property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Result of update |






<a name="chorus-flm-formula-v1-DeleteFormulaRequest"></a>

### DeleteFormulaRequest
The message request for delete formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id |






<a name="chorus-flm-formula-v1-DeleteFormulaResponse"></a>

### DeleteFormulaResponse
The message response for delete formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Result of delete |






<a name="chorus-flm-formula-v1-Formula"></a>

### Formula
Formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | id of formula |
| formula_name | [string](#string) |  | formula name |
| expression | [string](#string) |  | the expression that represent about this formula |
| express_text | [string](#string) |  | the expression text that represent about this formula |
| is_locked | [bool](#bool) |  | flag that decise if the formula can be modified or not |
| is_required | [string](#string) |  | flag is required |
| create_user_id | [string](#string) |  | The create_user_id is the creator of the formula |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date of the formula |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated the formula |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date of the formula |
| edw_update_date | [string](#string) | optional | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-FormulaProperty"></a>

### FormulaProperty
Formula Property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | id of formula property |
| property_name | [string](#string) |  | formula property name |
| default_flag | [bool](#bool) | optional | flag that decise if the formula property can be delete or not |
| vessel_source_data_column | [string](#string) |  | data indicate the source data of the property |
| create_user_id | [string](#string) |  | The create_user_id is the creator of the property |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date of the property |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated the property |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date of the property |
| edw_update_date | [string](#string) | optional | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-FormulaPropertyPayload"></a>

### FormulaPropertyPayload
update formula property payload


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property id |
| property_name | [string](#string) |  | property name |
| create_user_id | [string](#string) |  | The create_user_id is the creator |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date |
| edw_update_date | [string](#string) |  | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-FormulaPropertyResponse"></a>

### FormulaPropertyResponse
update formula property response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property id |
| property_name | [string](#string) |  | property name |
| default_flag | [bool](#bool) |  | default flag |






<a name="chorus-flm-formula-v1-SearchFormulaAndPropertyRequest"></a>

### SearchFormulaAndPropertyRequest
find all formulas and properties request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keyword | [string](#string) | optional | keyword: search by formula property name, formula name |






<a name="chorus-flm-formula-v1-SearchFormulaAndPropertyResponse"></a>

### SearchFormulaAndPropertyResponse
Find all formulas and properties response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formulas | [Formula](#chorus-flm-formula-v1-Formula) | repeated | formulas |
| formula_properties | [FormulaProperty](#chorus-flm-formula-v1-FormulaProperty) | repeated | formula properties |






<a name="chorus-flm-formula-v1-UpdateFormulaPropertyRequest"></a>

### UpdateFormulaPropertyRequest
update formula property request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| properties | [FormulaPropertyPayload](#chorus-flm-formula-v1-FormulaPropertyPayload) | repeated | array of formula property objects |






<a name="chorus-flm-formula-v1-UpdateFormulaPropertyResponse"></a>

### UpdateFormulaPropertyResponse
array of properties response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| properties | [FormulaPropertyResponse](#chorus-flm-formula-v1-FormulaPropertyResponse) | repeated | array of properties response |






<a name="chorus-flm-formula-v1-UpdateFormulaRequest"></a>

### UpdateFormulaRequest
update formula request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id which want to update |
| formula_name | [string](#string) | optional | formula name |
| expression | [string](#string) | optional | expression regular |
| create_user_id | [string](#string) |  | The create_user_id is the creator |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date |
| edw_update_date | [string](#string) |  | The edw_update_date is the edw updated date |






<a name="chorus-flm-formula-v1-UpdateFormulaResponse"></a>

### UpdateFormulaResponse
update formula response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula name |
| formula_name | [string](#string) |  | formula name |
| expression | [string](#string) |  | formula name |





 

 

 


<a name="chorus-flm-formula-v1-FormulaService"></a>

### FormulaService
Service for Formula module

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchFormulaAndProperty | [SearchFormulaAndPropertyRequest](#chorus-flm-formula-v1-SearchFormulaAndPropertyRequest) | [SearchFormulaAndPropertyResponse](#chorus-flm-formula-v1-SearchFormulaAndPropertyResponse) | Get all, search, filter<br /><br />Operation: GET<br /><br />Request: { &#34;keyword&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;formulas&#34;: Formula[], &#34;formula_properties&#34;: FormulaProperty[], } |
| CreateFormulaProperty | [CreateFormulaPropertyRequest](#chorus-flm-formula-v1-CreateFormulaPropertyRequest) | [CreateFormulaPropertyResponse](#chorus-flm-formula-v1-CreateFormulaPropertyResponse) | Create <br /><br />Operation: POST<br /><br />Request: { &#34;property_name&#34;: string &#34;create_user_id&#34;: string }<br /><br />Response: { &#34;property_id&#34;: string &#34;property_name&#34;: string &#34;default_flag&#34;: bool } |
| UpdateFormulaProperty | [UpdateFormulaPropertyRequest](#chorus-flm-formula-v1-UpdateFormulaPropertyRequest) | [UpdateFormulaPropertyResponse](#chorus-flm-formula-v1-UpdateFormulaPropertyResponse) | Update <br /><br />Operation: POST<br /><br />Request: [ { &#34;property_id&#34;: string &#34;property_name&#34;: string &#34;update_user_id&#34;: string } ]<br /><br />Response: { &#34;properties&#34;: [ { &#34;property_id&#34;: string &#34;property_name&#34;: string &#34;default_flag&#34;: bool } ] } |
| DeleteFormulaProperty | [DeleteFormulaPropertyRequest](#chorus-flm-formula-v1-DeleteFormulaPropertyRequest) | [DeleteFormulaPropertyResponse](#chorus-flm-formula-v1-DeleteFormulaPropertyResponse) | Method delete formula property by id<br /><br />Operation: DELETE<br /><br />Request: { &#34;property_id&#34;: [&#34;string&#34;, &#34;string&#34;] }<br /><br />Response: { &#34;success&#34;: true, } |
| CreateFormula | [CreateFormulaRequest](#chorus-flm-formula-v1-CreateFormulaRequest) | [CreateFormulaResponse](#chorus-flm-formula-v1-CreateFormulaResponse) | Create <br /><br />Operation: POST<br /><br />Request: { &#34;formula_name&#34;: string &#34;expression&#34;: string &#34;create_user_id&#34;: string }<br /><br />Response: { &#34;formula_id&#34;: string &#34;formula_name&#34;: string &#34;expression&#34;: string } |
| UpdateFormula | [UpdateFormulaRequest](#chorus-flm-formula-v1-UpdateFormulaRequest) | [UpdateFormulaResponse](#chorus-flm-formula-v1-UpdateFormulaResponse) | Update <br /><br />Operation: POST<br /><br />Request: { &#34;formula_id&#34;: string &#34;formula_name&#34;: string &#34;expression&#34;: string &#34;update_user_id&#34;: string }<br /><br />Response: { &#34;formula_id&#34;: string &#34;formula_name&#34;: string &#34;expression&#34;: string } |
| DeleteFormula | [DeleteFormulaRequest](#chorus-flm-formula-v1-DeleteFormulaRequest) | [DeleteFormulaResponse](#chorus-flm-formula-v1-DeleteFormulaResponse) | Method delete formula by id<br /><br />Operation: DELETE<br /><br />Request: { &#34;formula_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true, } |

 



<a name="hero_v1_hero-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## hero/v1/hero.proto



<a name="chorus-flm-hero-v1-FindAllRequest"></a>

### FindAllRequest
find all hero request






<a name="chorus-flm-hero-v1-FindAllResponse"></a>

### FindAllResponse
find all hero Response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hero | [Hero](#chorus-flm-hero-v1-Hero) | repeated | Heroes |






<a name="chorus-flm-hero-v1-FindOneRequest"></a>

### FindOneRequest
HeroId for searching Hero


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | HeroId |






<a name="chorus-flm-hero-v1-FindOneResponse"></a>

### FindOneResponse
The Hero information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | HeroId |
| name | [string](#string) |  | Hero name |






<a name="chorus-flm-hero-v1-Hero"></a>

### Hero
hero


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | HeroId |





 

 

 


<a name="chorus-flm-hero-v1-HeroService"></a>

### HeroService
Service for Hero module

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| FindOne | [FindOneRequest](#chorus-flm-hero-v1-FindOneRequest) | [FindOneResponse](#chorus-flm-hero-v1-FindOneResponse) | Get a hero<br /><br />Operation: GET<br /><br />Request: { &#34;id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;hero&#34;: { &#34;id&#34;: &#34;string&#34;, &#34;name&#34;: &#34;string&#34;, }, } |
| FindAll | [FindAllRequest](#chorus-flm-hero-v1-FindAllRequest) | [FindAllResponse](#chorus-flm-hero-v1-FindAllResponse) | Get all heroes<br /><br />Operation: GET<br /><br />Request: { }<br /><br />Response: { &#34;heroes&#34;: [ { hero :&#34;Hero&#34; } ], } |

 



<a name="time_charter_comparison_v1_time_charter_comparison-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## time_charter_comparison/v1/time_charter_comparison.proto



<a name="chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonRequest"></a>

### AddCriteriaToTimeCharterComparisonRequest
add criteria to time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| header_text | [string](#string) |  | criteria header text |
| create_user_id | [string](#string) |  | created user id |
| time_charter_comparison_vessel_criteria | [TimeCharterComparisonVesselCriteriaRequest](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaRequest) | repeated | list of vessel criteria value |






<a name="chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonResponse"></a>

### AddCriteriaToTimeCharterComparisonResponse
add criteria to time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_id | [string](#string) |  | criteria id |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonRequest"></a>

### AddFormulaToTimeCharterComparisonRequest
add formula to time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_request | [FormulaRequest](#chorus-flm-time_charter_comparison-v1-FormulaRequest) | repeated | list of formula |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| create_user_id | [string](#string) |  | create user id |






<a name="chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonResponse"></a>

### AddFormulaToTimeCharterComparisonResponse
add formula to time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonRequest"></a>

### AddVesselToTimeCharterComparisonRequest
add vessel to time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter id |
| vessel_ids | [VesselId](#chorus-flm-time_charter_comparison-v1-VesselId) | repeated | list of vessel id to add |
| create_user_id | [string](#string) |  | created user id |






<a name="chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonResponse"></a>

### AddVesselToTimeCharterComparisonResponse
add vessel to time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonRequest"></a>

### AddVesselsFromPoolToComparisonRequest
add vessel from pool to time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comparison_id | [string](#string) |  | time charter id |
| vessel_data | [VesselsFromPool](#chorus-flm-time_charter_comparison-v1-VesselsFromPool) | repeated | list of vessel id to add |
| create_user_id | [string](#string) |  | created user id |






<a name="chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonResponse"></a>

### AddVesselsFromPoolToComparisonResponse
add vessel from comparison to time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-ApiResponse"></a>

### ApiResponse
api response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_error | [bool](#bool) |  | true has error else ok |
| error_message | [string](#string) |  | error message |
| duplicate_error_detail | [DuplicateErrorDetail](#chorus-flm-time_charter_comparison-v1-DuplicateErrorDetail) | optional | duplicate error details |






<a name="chorus-flm-time_charter_comparison-v1-ComparisonCriteria"></a>

### ComparisonCriteria
comparison criteria


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | criteria id |
| header_text | [string](#string) |  | header text |
| is_top | [bool](#bool) |  | True: The Criteria will be displayed on the top on criteria |






<a name="chorus-flm-time_charter_comparison-v1-ComparisonCriteriaValue"></a>

### ComparisonCriteriaValue
comparison criteria value


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_id | [string](#string) |  | criteria id |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | criteria value |






<a name="chorus-flm-time_charter_comparison-v1-Criteria"></a>

### Criteria
criteria id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_id | [string](#string) |  | id |






<a name="chorus-flm-time_charter_comparison-v1-DuplicateErrorDetail"></a>

### DuplicateErrorDetail
message body for duplicate error details


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_ids | [string](#string) | repeated | List of duplicate criteria ids |
| is_duplicate | [bool](#bool) |  | is error duplicate occur |






<a name="chorus-flm-time_charter_comparison-v1-DuplicatedVessel"></a>

### DuplicatedVessel
Duplicated Vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| vessel_name | [string](#string) |  | vessel name |






<a name="chorus-flm-time_charter_comparison-v1-Formula"></a>

### Formula
formula


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | formula id |
| expression | [string](#string) |  | formula expression |
| name | [string](#string) |  | formula name |
| properties | [string](#string) | repeated | Formula property |






<a name="chorus-flm-time_charter_comparison-v1-FormulaId"></a>

### FormulaId
formula Id request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id |






<a name="chorus-flm-time_charter_comparison-v1-FormulaRequest"></a>

### FormulaRequest
formula request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id |






<a name="chorus-flm-time_charter_comparison-v1-FormulaValue"></a>

### FormulaValue
formula value


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| formula_id | [string](#string) |  | formula id |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | calculated value return null if any errors happen |
| is_error | [bool](#bool) |  | is value error |






<a name="chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueRequest"></a>

### GetPropertyDefaultValueRequest
Get property default value request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comparison_id | [string](#string) |  | comparison id |
| property_id | [string](#string) |  | property id |






<a name="chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueResponse"></a>

### GetPropertyDefaultValueResponse
Get property default value response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  | property default value |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonRequest"></a>

### GetTimeCharterComparisonRequest
get time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter id |
| user_id | [string](#string) |  | user id |
| phase | [int32](#int32) | optional | phase Phase: The values of time charter status include: 1: Draft 2: Ongoing 3: Evaluation 4: FM Internal Approval 5: MD Approval |






<a name="chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonResponse"></a>

### GetTimeCharterComparisonResponse
get time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| vessels | [Vessel](#chorus-flm-time_charter_comparison-v1-Vessel) | repeated | list of vessel in comparison |
| properties | [Property](#chorus-flm-time_charter_comparison-v1-Property) | repeated | list of property in comparison |
| vessel_property_values | [VesselPropertyValue](#chorus-flm-time_charter_comparison-v1-VesselPropertyValue) | repeated | list of property value in comparison |
| comparison_criteria | [ComparisonCriteria](#chorus-flm-time_charter_comparison-v1-ComparisonCriteria) | repeated | list of criteria |
| comparison_criteria_values | [ComparisonCriteriaValue](#chorus-flm-time_charter_comparison-v1-ComparisonCriteriaValue) | repeated | list of criteria value |
| formulas | [Formula](#chorus-flm-time_charter_comparison-v1-Formula) | repeated | list of formula |
| formula_values | [FormulaValue](#chorus-flm-time_charter_comparison-v1-FormulaValue) | repeated | list of formula value |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-PhaseStatus"></a>

### PhaseStatus
Phase status


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| for_evaluation | [bool](#bool) |  | for_evaluation |
| for_fm_internal_approval | [bool](#bool) |  | for_fm_internal_approval |
| for_md_approval | [bool](#bool) |  | for_md_approval |






<a name="chorus-flm-time_charter_comparison-v1-Property"></a>

### Property
property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | property id |
| name | [string](#string) |  | property name |






<a name="chorus-flm-time_charter_comparison-v1-PropertyResponse"></a>

### PropertyResponse
property response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property id |
| property_name | [string](#string) |  | property name |






<a name="chorus-flm-time_charter_comparison-v1-PropertyValueRequest"></a>

### PropertyValueRequest
property value request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | property value |
| property_id | [string](#string) |  | property id |






<a name="chorus-flm-time_charter_comparison-v1-PropertyValueResponse"></a>

### PropertyValueResponse
property value response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | property value id |
| vessel_id | [string](#string) |  | vessel id |
| value | [string](#string) |  | property value |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| property_id | [string](#string) |  | property id |
| create_user_id | [string](#string) |  | create user id |






<a name="chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonRequest"></a>

### RemoveCriteriaFromComparisonRequest
Remove Criteria FromComparison Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| criteria_ids | [Criteria](#chorus-flm-time_charter_comparison-v1-Criteria) | repeated | list of criteria id to remove |
| tc_comparison_id | [string](#string) |  | time charter comparison id |






<a name="chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonResponse"></a>

### RemoveCriteriaFromComparisonResponse
remove criteria from comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonRequest"></a>

### RemoveFormulaFromTimeCharterComparisonRequest
remove formula from time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | tc comparison id |
| formula_ids | [FormulaId](#chorus-flm-time_charter_comparison-v1-FormulaId) | repeated | formula ids |






<a name="chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonResponse"></a>

### RemoveFormulaFromTimeCharterComparisonResponse
remove formula from time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonRequest"></a>

### RemoveVesselFromTimeCharterComparisonRequest
remove vessel from time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| vessel_ids | [VesselId](#chorus-flm-time_charter_comparison-v1-VesselId) | repeated | list vessel ids |






<a name="chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonResponse"></a>

### RemoveVesselFromTimeCharterComparisonResponse
remove vessel from time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-SaveComparisonCriteriaRequest"></a>

### SaveComparisonCriteriaRequest
comparison criteria


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | criteria id |
| header_text | [string](#string) |  | criteria header text |
| time_charter_comparison_vessel_criteria | [TimeCharterComparisonVesselCriteriaRequest](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaRequest) | repeated | list of vessel criteria value |






<a name="chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueRequest"></a>

### SaveFormulaPropertyValueRequest
save formula property value request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| create_user_id | [string](#string) |  | create user id |
| property_value_requests | [PropertyValueRequest](#chorus-flm-time_charter_comparison-v1-PropertyValueRequest) | repeated | list of property value to save |






<a name="chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueResponse"></a>

### SaveFormulaPropertyValueResponse
save formula property value response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueRequest"></a>

### SavePropertyDefaultValueRequest
Property default value request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comparison_id | [string](#string) |  | comparison id |
| property_id | [string](#string) |  | property id |
| value | [double](#double) |  | value |
| create_user_id | [string](#string) |  | create user id |






<a name="chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueResponse"></a>

### SavePropertyDefaultValueResponse
Property default value response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-TimeCharterComparisonCriteriaResponse"></a>

### TimeCharterComparisonCriteriaResponse
time charter criteria


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | criteria id |
| header_text | [string](#string) |  | header text of criteria |
| time_charter_comparison_vessel_criteria | [TimeCharterComparisonVesselCriteriaResponse](#chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaResponse) | repeated | tc comparison vessel criteria response |






<a name="chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaRequest"></a>

### TimeCharterComparisonVesselCriteriaRequest
time charter comparison criteria request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| criteria_value | [string](#string) |  | criteria value |






<a name="chorus-flm-time_charter_comparison-v1-TimeCharterComparisonVesselCriteriaResponse"></a>

### TimeCharterComparisonVesselCriteriaResponse
time charter criteria response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| criteria_value | [string](#string) |  | criteria value |
| create_user_id | [string](#string) |  | created user id |
| criteria_id | [string](#string) |  | criteria id |






<a name="chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonRequest"></a>

### UpdateCriteriaToTimeCharterComparisonRequest
update criteria to time charter comparison request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_comparison_id | [string](#string) |  | time charter comparison id |
| update_user_id | [string](#string) |  | create user id |
| comparison_criteria | [SaveComparisonCriteriaRequest](#chorus-flm-time_charter_comparison-v1-SaveComparisonCriteriaRequest) | repeated | list of comparison criteria to update |






<a name="chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonResponse"></a>

### UpdateCriteriaToTimeCharterComparisonResponse
update criteria to time charter comparison response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_comparison-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_comparison-v1-Vessel"></a>

### Vessel
vessel add to comparison


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) | optional | The vessel_code is the code of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| design | [string](#string) |  | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) | optional | The period is the period of chartering |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | gear |
| vessel_status | [string](#string) |  | vessel status |
| phase_status | [PhaseStatus](#chorus-flm-time_charter_comparison-v1-PhaseStatus) |  | phase status |






<a name="chorus-flm-time_charter_comparison-v1-VesselId"></a>

### VesselId
vessel id


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | id |






<a name="chorus-flm-time_charter_comparison-v1-VesselPropertyValue"></a>

### VesselPropertyValue
vessel formula response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| property_id | [string](#string) |  | property id |
| value | [string](#string) |  | property value |
| vessel_id | [string](#string) |  | vessel id |






<a name="chorus-flm-time_charter_comparison-v1-VesselsFromPool"></a>

### VesselsFromPool
vessels from pool


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| tab_id | [string](#string) |  | pool id |





 

 

 


<a name="chorus-flm-time_charter_comparison-v1-TimeCharterComparisonService"></a>

### TimeCharterComparisonService
Service for Time Charter Comparison

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetTimeCharterComparison | [GetTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonRequest) | [GetTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-GetTimeCharterComparisonResponse) | Get time charter comparison

 Operation: GET

 Request: { &#34;tc_id&#34;:&#34;1&#34;, &#34;user_id&#34;:&#34;1&#34; }

 Response: { &#34;tc_comparison_id&#34;: &#34;1&#34;, &#34;vessels&#34; :[vessel], &#34;properties&#34;:[property] &#34;vessel_property_values&#34;:[VesselPropertyValue] &#34;comparison_criteria&#34;:[ComparisonCriteria] &#34;comparison_criteria_values&#34;:[ComparisonCriteriaValue], &#34;formulas&#34;:[Formula], &#34;formula_values&#34;:[FormulaValue], &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| AddVesselToTimeCharterComparison | [AddVesselToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonRequest) | [AddVesselToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddVesselToTimeCharterComparisonResponse) | Add vessel to comparison table<br /><br />Operation: POST<br /><br />Request: { &#34;tc_comparison_id&#34; : &#34;1&#34;, &#34;vessel_ids&#34;: [ {&#34;vessel_id&#34; :&#34;vessel1&#34;}, {&#34;vessel_id&#34; :&#34;vessel2&#34;} ], &#34;create_user_id&#34;: &#34;test@one.com&#34; }

 Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| AddVesselsFromPoolToComparison | [AddVesselsFromPoolToComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonRequest) | [AddVesselsFromPoolToComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddVesselsFromPoolToComparisonResponse) | Add vessel from comparison pool to main comparison table Operation: POST Request: { &#34;comparison_id&#34; : [uuid], &#34;vessel_data&#34;: [ {&#34;vessel_id&#34;: uuid, &#34;tab_id&#34;: uuid}, {&#34;vessel_id&#34;: uuid, &#34;tab_id&#34;: uuid}, ], &#34;create_user_id&#34;: &#34;test@one.com&#34; } Response: { &#34;api_response&#34; : { &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| RemoveVesselFromTimeCharterComparison | [RemoveVesselFromTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonRequest) | [RemoveVesselFromTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveVesselFromTimeCharterComparisonResponse) | Remove vessel from comparison 

 Operation: POST

 Request: { &#34;tc_comparison_id&#34;:&#34;1&#34; &#34;vessel_ids&#34;:[ { &#34;vessel_id&#34;:&#34;1&#34;, &#34;vessel_id&#34;:&#34;2&#34; } ] }

 Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| AddCriteriaToTimeCharterComparison | [AddCriteriaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonRequest) | [AddCriteriaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddCriteriaToTimeCharterComparisonResponse) | Add criteria

 Operation: POST

 Request: { &#34;id&#34;:&#34;1&#34;, &#34;tc_comparison_id&#34; :&#34;1&#34;, &#34;header_text&#34;:&#34;new criteria&#34;, &#34;create_user_id:&#34;test@one.com&#34;, &#34;time_charter_comparison_vessel_criteria&#34;: [TimeCharterComparisonVesselCriteriaRequest] }

 Response: { &#34;criteria_id&#34;:&#34;1&#34;, &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| UpdateCriteriaToTimeCharterComparison | [UpdateCriteriaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonRequest) | [UpdateCriteriaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-UpdateCriteriaToTimeCharterComparisonResponse) | Update criteria

 Operation: POST

 Request: { &#34;id&#34;:&#34;1&#34;, &#34;tc_comparison_id&#34; :&#34;1&#34;, &#34;update_user_id:&#34;test@one.com&#34;, &#34;comparison_criteria&#34;:[ SaveComparisonCriteriaRequest ] }

 Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| RemoveCriteriaFromComparison | [RemoveCriteriaFromComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonRequest) | [RemoveCriteriaFromComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveCriteriaFromComparisonResponse) | Remove criteria from comparison

 Operation: POST

 Request: { &#34;tc_comparison_id&#34;:&#34;1&#34;, &#34;criteria_ids&#34;:[ { &#34;criteria_id&#34;:&#34;1&#34;, &#34;criteria_id&#34;:&#34;2&#34;, } ] }

 Response: { &#34;criteria_ids&#34;:[ { &#34;criteria_id&#34;:&#34;1&#34;, &#34;criteria_id&#34;:&#34;2&#34;, } ], &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| AddFormulaToTimeCharterComparison | [AddFormulaToTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonRequest) | [AddFormulaToTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-AddFormulaToTimeCharterComparisonResponse) | Add formula

 Operation : POST

 Request: { &#34;create_user_id&#34;:&#34;1&#34;, &#34;tc_comparison_id&#34;:&#34;1&#34;, &#34;formula_request&#34;:[ { &#34;formula_id&#34;:&#34;1&#34;, &#34;vessel_id&#34;:&#34;2&#34;, &#34;tc_comparison_id&#34;:&#34;3&#34; } ] }

 Response: { &#34;tc_comparison_id&#34;:&#34;1&#34;, &#34;property_response&#34;:[ { &#34;property_id&#34;:&#34;1&#34;, &#34;property_name&#34;:&#34;name&#34;, } ] } |
| SaveFormulaPropertyValue | [SaveFormulaPropertyValueRequest](#chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueRequest) | [SaveFormulaPropertyValueResponse](#chorus-flm-time_charter_comparison-v1-SaveFormulaPropertyValueResponse) | Save formula property value

 Operation: POST

 Request: { &#34;tc_comparison_id&#34;:&#34;1&#34;, &#34;create_user_id&#34;:&#34;test@one.com&#34; , &#34;property_value_requests&#34;:[ { &#34;vessel_id&#34;:&#34;1&#34;, &#34;value&#34;:&#34;value&#34;, &#34;property_id&#34;:&#34;1&#34;, } ] }

 Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| RemoveFormulaFromTimeCharterComparison | [RemoveFormulaFromTimeCharterComparisonRequest](#chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonRequest) | [RemoveFormulaFromTimeCharterComparisonResponse](#chorus-flm-time_charter_comparison-v1-RemoveFormulaFromTimeCharterComparisonResponse) | Remove formula from time charter comparison table<br /><br />Operation: POST 

 Request: { &#34;tc_comparison_id&#34;:&#34;1&#34;, &#34;formula_ids&#34;:[formula_id] }

 Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| SavePropertyDefaultValue | [SavePropertyDefaultValueRequest](#chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueRequest) | [SavePropertyDefaultValueResponse](#chorus-flm-time_charter_comparison-v1-SavePropertyDefaultValueResponse) | Save property default value Operation: POST Request: { &#34;comparison_id&#34;: [uuid], &#34;property_id&#34;: [uuid], &#34;value&#34;: double, } Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| GetPropertyDefaultValue | [GetPropertyDefaultValueRequest](#chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueRequest) | [GetPropertyDefaultValueResponse](#chorus-flm-time_charter_comparison-v1-GetPropertyDefaultValueResponse) | Get property default value Operation: GET Request: { &#34;comparison_id&#34;: [uuid], &#34;property_id&#34;: [uuid], } Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |

 



<a name="time_charter_evaluation_v1_time_charter_evaluation-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## time_charter_evaluation/v1/time_charter_evaluation.proto



<a name="chorus-flm-time_charter_evaluation-v1-ApiResponse"></a>

### ApiResponse
api response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_error | [bool](#bool) |  | true has error else ok |
| error_message | [string](#string) |  | error message |






<a name="chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationRequest"></a>

### CreateEvaluationInformationRequest
create evaluation information request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter comparison id |
| evaluation_data | [EvaluationInformation](#chorus-flm-time_charter_evaluation-v1-EvaluationInformation) | repeated | evaluation data |
| create_user_id | [string](#string) |  | The create_user_id is the creator |






<a name="chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationResponse"></a>

### CreateEvaluationInformationResponse
update evaluation information response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_evaluation-v1-DeleteDepartment"></a>

### DeleteDepartment
message delete department


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| department_id | [string](#string) |  | department id |






<a name="chorus-flm-time_charter_evaluation-v1-EvaluationData"></a>

### EvaluationData
message evaluation data


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| evaluation_vessels | [EvaluationVessels](#chorus-flm-time_charter_evaluation-v1-EvaluationVessels) | repeated | evaluation vessels |
| evaluation_departments | [EvaluationDepartments](#chorus-flm-time_charter_evaluation-v1-EvaluationDepartments) | repeated | evaluation departments |
| evaluation_information | [EvaluationInformation](#chorus-flm-time_charter_evaluation-v1-EvaluationInformation) | repeated | evaluation information |
| evaluation_status | [EvaluationStatus](#chorus-flm-time_charter_evaluation-v1-EvaluationStatus) | repeated | evaluation status |






<a name="chorus-flm-time_charter_evaluation-v1-EvaluationDepartments"></a>

### EvaluationDepartments
message evaluation department


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | department id |
| name | [string](#string) |  | department name |
| is_new_department | [bool](#bool) |  | is new department |






<a name="chorus-flm-time_charter_evaluation-v1-EvaluationInformation"></a>

### EvaluationInformation
message evaluation information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |
| department_id | [string](#string) |  | department id |
| evaluation_status_id | [string](#string) |  | evaluation status |
| evaluation_date | [string](#string) |  | evaluation date ( yyyy-mm-dd hh:mm:ss.ms ±hhmm ) |
| remarks | [string](#string) |  | remarks |
| department_text | [string](#string) | optional | department text |






<a name="chorus-flm-time_charter_evaluation-v1-EvaluationStatus"></a>

### EvaluationStatus
message evaluation status


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | status id |
| name | [string](#string) |  | status name |






<a name="chorus-flm-time_charter_evaluation-v1-EvaluationVessels"></a>

### EvaluationVessels
message evaluation vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | vessel id |
| name | [string](#string) |  | vessel name |
| phase_status | [PhaseStatus](#chorus-flm-time_charter_evaluation-v1-PhaseStatus) |  | phase status of evaluation vessel |






<a name="chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationRequest"></a>

### GetEvaluationInformationRequest
get evaluation information request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter comparison id |






<a name="chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationResponse"></a>

### GetEvaluationInformationResponse
get evaluation information response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| evaluation_data | [EvaluationData](#chorus-flm-time_charter_evaluation-v1-EvaluationData) |  | evaluation information |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_evaluation-v1-PhaseStatus"></a>

### PhaseStatus
Phase status


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| for_evaluation | [bool](#bool) |  | for_evaluation |
| for_fm_internal_approval | [bool](#bool) |  | for_fm_internal_approval |
| for_md_approval | [bool](#bool) |  | for_md_approval |






<a name="chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationRequest"></a>

### RemoveDepartmentEvaluationInformationRequest
message remove department evaluation request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter id |
| delete_department | [DeleteDepartment](#chorus-flm-time_charter_evaluation-v1-DeleteDepartment) | repeated | deleted department list |
| user_id | [string](#string) |  | user_id |






<a name="chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationResponse"></a>

### RemoveDepartmentEvaluationInformationResponse
message remove department evaluation response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | api response |






<a name="chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationRequest"></a>

### RemoveVesselFromEvaluationRequest
Remove a vessel from evaluation request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | Time charter Id |
| phase | [int32](#int32) | optional | charter request phase:Draft:1- Ongoing:2-Evaluation:3-FM Internal Approval:4- MD Approval:5 At edit comparison page, phase is null otherwise we need to specific phase to process |
| vessel_ids | [string](#string) | repeated | List of vessel to be removed |






<a name="chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationResponse"></a>

### RemoveVesselFromEvaluationResponse
Remove a vessel from evaluation response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | response |






<a name="chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationRequest"></a>

### SelectVesselToEvaluationRequest
Select a vessel to evaluation request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | Time charter id |
| phase | [int32](#int32) | optional | charter request phase:Draft:1- Ongoing:2-Evaluation:3-FM Internal Approval:4- MD Approval:5 At edit comparison page, phase is null otherwise we need to specific phase to process |
| vessel_ids | [string](#string) | repeated | List of vessel IDS |






<a name="chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationResponse"></a>

### SelectVesselToEvaluationResponse
Select a vessel to evaluation response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | Response |






<a name="chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationRequest"></a>

### UpdateEvaluationInformationRequest
update evaluation information request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tc_id | [string](#string) |  | time charter comparison id |
| evaluation_data | [EvaluationInformation](#chorus-flm-time_charter_evaluation-v1-EvaluationInformation) | repeated | evaluation data |
| update_user_id | [string](#string) |  | The update_user_id is the creator |






<a name="chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationResponse"></a>

### UpdateEvaluationInformationResponse
update evaluation information response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| api_response | [ApiResponse](#chorus-flm-time_charter_evaluation-v1-ApiResponse) |  | api response |





 

 

 


<a name="chorus-flm-time_charter_evaluation-v1-TimeCharterEvaluationService"></a>

### TimeCharterEvaluationService
Service for Time Charter Evaluation

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetEvaluationInformation | [GetEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationRequest) | [GetEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-GetEvaluationInformationResponse) | get evaluation information |
| CreateEvaluationInformation | [CreateEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationRequest) | [CreateEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-CreateEvaluationInformationResponse) | Create evaluation data Operation: POST Request: { &#34;tc_id&#34;: string &#34;evaluation_data&#34;: array(EvaluationInformation) &#34;create_user_id&#34;: string } Response: { &#34;is_error&#34;: boolean &#34;error_message&#34;: string } |
| UpdateEvaluationInformation | [UpdateEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationRequest) | [UpdateEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-UpdateEvaluationInformationResponse) | Update evaluation data Operation: POST Request: { &#34;tc_id&#34;: string &#34;evaluation_data&#34;: array(EvaluationInformation) &#34;update_user_id&#34;: string } Response: { &#34;is_error&#34;: boolean &#34;error_message&#34;: string } |
| SelectVesselToEvaluation | [SelectVesselToEvaluationRequest](#chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationRequest) | [SelectVesselToEvaluationResponse](#chorus-flm-time_charter_evaluation-v1-SelectVesselToEvaluationResponse) | Select vessel that will be added to Evaluation phase Operation: POST Request: { &#34;tc_id&#34;:&#34;tc_id&#34;, &#34;phase&#34;:2 &#34;vessel_ids&#34; :[&#34;1&#34;,&#34;2&#34;] } Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| RemoveVesselFromEvaluation | [RemoveVesselFromEvaluationRequest](#chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationRequest) | [RemoveVesselFromEvaluationResponse](#chorus-flm-time_charter_evaluation-v1-RemoveVesselFromEvaluationResponse) | Remove vessel from Evaluation phase Operation: POST Request: { &#34;tc_id&#34;:&#34;tc_id&#34;, &#34;vessel_ids&#34; :[&#34;1&#34;,&#34;2&#34;] } Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |
| RemoveDepartmentEvaluationInformation | [RemoveDepartmentEvaluationInformationRequest](#chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationRequest) | [RemoveDepartmentEvaluationInformationResponse](#chorus-flm-time_charter_evaluation-v1-RemoveDepartmentEvaluationInformationResponse) | remove department evaluation Operation: POST Request: { &#34;tc_id&#34;:&#34;tc_id&#34;, &#34;delete_department&#34; :[{department_id:&#34;1&#34;}], &#34;user_id&#34;: &#34;a&#34; } Response: { &#34;api_response&#34; :{ &#34;is_error&#34;:false, &#34;error_message&#34;:&#34;&#34; } } |

 



<a name="user_setting_v1_user_setting-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## user_setting/v1/user_setting.proto



<a name="chorus-flm-user_setting-v1-ConfigurationCode"></a>

### ConfigurationCode
The vessel filter


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| configuration_ui_code | [string](#string) |  | The Configuration ui code |
| configuration_value | [string](#string) |  | Configuration value |






<a name="chorus-flm-user_setting-v1-GetVesselSettingRequest"></a>

### GetVesselSettingRequest
The vessel filter request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The User id |
| configuration_ui_codes | [string](#string) | repeated | The Configuration ui code |






<a name="chorus-flm-user_setting-v1-GetVesselSettingResponse"></a>

### GetVesselSettingResponse
The vessel filter response for get and upsert


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | User filter info |
| configuration_ui_codes | [string](#string) | repeated | The Configuration ui code |
| configuration_ui_values | [string](#string) |  | Configuration value |






<a name="chorus-flm-user_setting-v1-UpSertVesselSettingRequest"></a>

### UpSertVesselSettingRequest
The vessel filter request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) | optional | User id |
| configuration_ui_code | [string](#string) | optional | Configuration ui code |
| configuration_value | [string](#string) | optional | Configuration value |






<a name="chorus-flm-user_setting-v1-UpSertVesselSettingResponse"></a>

### UpSertVesselSettingResponse
The vessel filter response for get and upsert


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) | optional | User id |
| configuration_ui_code | [string](#string) | optional | Configuration ui code |
| configuration_value | [string](#string) | optional | Configuration value |





 

 

 


<a name="chorus-flm-user_setting-v1-VesselSettingService"></a>

### VesselSettingService
The vessel filter

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVesselSetting | [GetVesselSettingRequest](#chorus-flm-user_setting-v1-GetVesselSettingRequest) | [GetVesselSettingResponse](#chorus-flm-user_setting-v1-GetVesselSettingResponse) | Method get vessel filter by user<br /><br />Operation: MATCH Request:{ &#34;user_id&#34;: &#34;string&#34;, &#34;configuration_ui_codes&#34;: [&#34;FLM_VSL_01_FLTR&#34;], },<br /><br />Response: { &#34;user_id&#34;: &#34;string&#34;, &#34;configuration_ui_codes&#34;: [&#34;FLM_VSL_01_FLTR&#34;], &#34;configuration_ui_values&#34;: &#34;string&#34;, } |
| UpSertVesselSetting | [UpSertVesselSettingRequest](#chorus-flm-user_setting-v1-UpSertVesselSettingRequest) | [UpSertVesselSettingResponse](#chorus-flm-user_setting-v1-UpSertVesselSettingResponse) | Method insert or update vessel filter<br /><br />Operation: Insert or Update<br /><br />Request: { VesselSettingRequest: { &#34;user_id&#34;: &#34;string&#34;, &#34;configuration_ui_code&#34;: &#34;string&#34;, &#34;configuration_value&#34;: &#34;string&#34;, } } Response: 

VesselSettingResponse: { &#34;user_id&#34;: &#34;string&#34;, &#34;configuration_ui_code&#34;: &#34;string&#34;, &#34;configuration_value&#34;: &#34;string&#34;, } } |

 



<a name="vessel_v1_vessel-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## vessel/v1/vessel.proto



<a name="chorus-flm-vessel-v1-CreateVesselRequest"></a>

### CreateVesselRequest
Create vessel request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) |  | The vessel_code is the code of the vessel |
| imo_number | [string](#string) |  | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| owner | [string](#string) |  | The owner is the owner of the vessel |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| dead_weight | [string](#string) |  | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) |  | The loa is the length of overall of the vessel |
| design | [string](#string) |  | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) |  | The draft is the draft of the vessel |
| owner_indication | [string](#string) |  | The owner_indication is the proposal charter hire amount by owner |
| vessel_status | [string](#string) |  | The vessel status is the vessel is in water or in construction |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) |  | The channel is the channel of the vessel |
| flexible_trading | [string](#string) |  | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) |  | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) |  | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) |  | The period is the period of chartering |
| create_user_id | [string](#string) |  | The create_user_id is the creator of the vessel |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date of the vessel |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated the vessel |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date of the vessel |
| edw_update_date | [string](#string) |  | The edw_update_date is the edw updated date |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | The gear of Vessel |






<a name="chorus-flm-vessel-v1-CreateVesselResponse"></a>

### CreateVesselResponse
Create vessel response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |






<a name="chorus-flm-vessel-v1-DeleteVesselByIdRequest"></a>

### DeleteVesselByIdRequest
The message request for delete vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | vessel id |






<a name="chorus-flm-vessel-v1-DeleteVesselByIdResponse"></a>

### DeleteVesselByIdResponse
The message response for delete vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Result of update |






<a name="chorus-flm-vessel-v1-ExportVesselsRequest"></a>

### ExportVesselsRequest
Find all vessel with multi pages


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | User id |
| current_page | [int32](#int32) | optional | Current page |
| rows_per_page | [int32](#int32) | optional | Rows per page |
| filters | [string](#string) |  | List filter conditions |






<a name="chorus-flm-vessel-v1-ExportVesselsResponse"></a>

### ExportVesselsResponse
Find all vessel with multi pages


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessels | [ExportedVessel](#chorus-flm-vessel-v1-ExportedVessel) | repeated | Vessels |
| total_items | [int32](#int32) |  | Total vessel item |






<a name="chorus-flm-vessel-v1-ExportedVessel"></a>

### ExportedVessel
Exporting Vessel Records


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| vessel_status | [string](#string) |  | The vessel_status is the vessel is in water or in construction |
| design | [string](#string) |  | The design is to compare the vessel series |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| period | [string](#string) | optional | The period is the period of chartering |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| gear | [string](#string) | optional | The gear of vessel |






<a name="chorus-flm-vessel-v1-FilterCondition"></a>

### FilterCondition
Filter conditions


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| min | [float](#float) | optional | Min value of condition |
| max | [float](#float) | optional | Max value of condition |






<a name="chorus-flm-vessel-v1-FiltersRequest"></a>

### FiltersRequest
Filter vessels request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_status | [string](#string) | optional | Filter by vessel_status or not condition |
| teu | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by teu condition |
| beam | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by beam condition |
| draft | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by draft condition |
| loa | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by loa condition |
| reefer_plugs | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by reefer_plugs condition |
| foc_xx_knots | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by foc_14_knots condition |
| year_built | [FilterCondition](#chorus-flm-vessel-v1-FilterCondition) | optional | Filter by year built of the vessel |
| tab_id | [string](#string) | optional | Filter by tab ID from comparison pool |






<a name="chorus-flm-vessel-v1-FindAllVesselsForComparisonRequest"></a>

### FindAllVesselsForComparisonRequest
Find all vessels request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keyword | [string](#string) | optional | Keyword: search by IMO, Vessel name, Delivery location, Delivery timing |
| filters | [FiltersRequest](#chorus-flm-vessel-v1-FiltersRequest) | optional | List filter conditions |
| sort_by | [SortTypeRequest](#chorus-flm-vessel-v1-SortTypeRequest) | optional | Sort type condition |
| pagination | [Pagination](#chorus-flm-vessel-v1-Pagination) |  | Pagination info |
| comparison_id | [string](#string) |  | Charter Request Comparison Id |






<a name="chorus-flm-vessel-v1-FindAllVesselsForComparisonResponse"></a>

### FindAllVesselsForComparisonResponse
Find all vessels response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessels | [VesselComparison](#chorus-flm-vessel-v1-VesselComparison) | repeated | Vessels |
| total_items | [int32](#int32) |  | Total vessel item |






<a name="chorus-flm-vessel-v1-FindAllVesselsRequest"></a>

### FindAllVesselsRequest
Find all vessels request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keyword | [string](#string) | optional | Keyword: search by IMO, Vessel name, Delivery location, Delivery timing |
| filters | [FiltersRequest](#chorus-flm-vessel-v1-FiltersRequest) | optional | List filter conditions |
| pagination | [Pagination](#chorus-flm-vessel-v1-Pagination) |  | Pagination info |






<a name="chorus-flm-vessel-v1-FindAllVesselsResponse"></a>

### FindAllVesselsResponse
Find all vessels response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessels | [Vessel](#chorus-flm-vessel-v1-Vessel) | repeated | Vessels |
| total_items | [string](#string) |  | Total vessel item |






<a name="chorus-flm-vessel-v1-FindVesselByIdRequest"></a>

### FindVesselByIdRequest
Find one vessel request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Id of the vessel |






<a name="chorus-flm-vessel-v1-FindVesselByIdResponse"></a>

### FindVesselByIdResponse
Find all vessels response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel | [Vessel](#chorus-flm-vessel-v1-Vessel) |  | Vessels |






<a name="chorus-flm-vessel-v1-FindVesselNameIsNotExistedRequest"></a>

### FindVesselNameIsNotExistedRequest
Message to represent an empty request.






<a name="chorus-flm-vessel-v1-FindVesselNameIsNotExistedResponse"></a>

### FindVesselNameIsNotExistedResponse
The message that contains the vessel&#39;s name


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_name | [string](#string) |  | vessel name |






<a name="chorus-flm-vessel-v1-ImportManyVesselRequest"></a>

### ImportManyVesselRequest
Import many vessels


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessels | [CreateVesselRequest](#chorus-flm-vessel-v1-CreateVesselRequest) | repeated | List of vessels for importing |






<a name="chorus-flm-vessel-v1-ImportManyVesselResponse"></a>

### ImportManyVesselResponse
Import many vessels


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [string](#string) | repeated | The id is the id of the vessel |
| vessel_names | [string](#string) | repeated | The vessel_name is the name of the vessel |






<a name="chorus-flm-vessel-v1-Pagination"></a>

### Pagination
Pagination info


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| current_page | [int32](#int32) |  | Current Page |
| rows_per_page | [int32](#int32) |  | Rows Per Page |






<a name="chorus-flm-vessel-v1-SortTypeRequest"></a>

### SortTypeRequest
Sort type by condition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [string](#string) |  | type of sorting |






<a name="chorus-flm-vessel-v1-UpdateVesselRequest"></a>

### UpdateVesselRequest
Update vessel request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) | optional | The id is the id of the vessel |
| vessel_name | [string](#string) | optional | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) | optional | The vessel_code is the code of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) | optional | The loadable_teu is the teu of the vessel |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| year_built | [int32](#int32) | optional | The year_built is the year build of the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| design | [string](#string) | optional | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) | optional | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) | optional | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| vessel_status | [string](#string) | optional | The vessel status is the vessel is in water or in construction |
| delivery_location | [string](#string) | optional | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) | optional | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) | optional | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) | optional | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) | optional | The period is the period of chartering |
| create_user_id | [string](#string) | optional | The create_user_id is the creator of the vessel |
| create_program_id | [string](#string) | optional | The create_program_id is the created program id |
| create_date | [string](#string) | optional | The create_date is the created date of the vessel |
| update_user_id | [string](#string) | optional | The update_user_id is the user that updated the vessel |
| update_program_id | [string](#string) | optional | The update_program_id is the updated program id |
| update_date | [string](#string) | optional | The update_date is the updated date of the vessel |
| edw_update_date | [string](#string) | optional | The edw_update_date is the edw updated date |
| deleted_at | [string](#string) | optional | The edw_update_date is the edw updated date |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | The gear of vessel |






<a name="chorus-flm-vessel-v1-UpdateVesselResponse"></a>

### UpdateVesselResponse
The message that contains the update vessel response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Result of update |
| vessel_name | [string](#string) |  | vessel name |
| imo_number | [string](#string) |  | imo number |






<a name="chorus-flm-vessel-v1-Vessel"></a>

### Vessel
Vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) | optional | The vessel_code is the code of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| design | [string](#string) |  | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| vessel_status | [string](#string) |  | The vessel_status is the vessel is in water or in construction |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) | optional | The period is the period of chartering |
| create_user_id | [string](#string) |  | The create_user_id is the creator of the vessel |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date of the vessel |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated the vessel |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date of the vessel |
| edw_update_date | [string](#string) | optional | The edw_update_date is the edw updated date |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | The gear of vessel |






<a name="chorus-flm-vessel-v1-VesselComparison"></a>

### VesselComparison
Vessel Comparison


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The id is the id of the vessel |
| vessel_name | [string](#string) |  | The vessel_name is the name of the vessel |
| vessel_code | [string](#string) | optional | The vessel_code is the code of the vessel |
| imo_number | [string](#string) | optional | The imo_number is the imo number of the vessel |
| loadable_teu | [int32](#int32) |  | The loadable_teu is the teu of the vessel |
| owner | [string](#string) | optional | The owner is the owner of the vessel |
| year_built | [int32](#int32) |  | The year_built is the year build of the vessel |
| dead_weight | [string](#string) | optional | The dead_weight is the dead weight of the vessel |
| loa | [string](#string) | optional | The loa is the length of overall of the vessel |
| design | [string](#string) |  | The design is to compare the vessel series |
| reefer_plugs | [int32](#int32) |  | The reefer_plugs is the the number of Reefer Plug |
| beam | [string](#string) |  | The beam is the width of overall of the vessel |
| draft | [string](#string) | optional | The draft is the draft of the vessel |
| owner_indication | [string](#string) | optional | The owner_indication is the proposal charter hire amount by owner |
| vessel_status | [string](#string) |  | The vessel_status is the vessel is in water or in construction |
| delivery_location | [string](#string) |  | The delivery_location is the location of delivery of the vessel |
| delivery_timing | [string](#string) |  | The delivery_timing is the time of delivery of the vessel |
| channel | [string](#string) | optional | The channel is the channel of the vessel |
| flexible_trading | [string](#string) | optional | The flexible_trading is the flexible trading of the vessel |
| ex_charters | [string](#string) | optional | The ex_charters is the ex-charterer of the vessel |
| remark | [string](#string) | optional | The remark is the remark of the vessel |
| basic_teu_xx_t | [int32](#int32) |  | The basic_teu_14_t is how many TEUs we can load on the vessel |
| foc_xx_knots | [string](#string) |  | The foc_14_knots is the fuel consumption per day of the vessel |
| period | [string](#string) | optional | The period is the period of chartering |
| create_user_id | [string](#string) |  | The create_user_id is the creator of the vessel |
| create_program_id | [string](#string) |  | The create_program_id is the created program id |
| create_date | [string](#string) |  | The create_date is the created date of the vessel |
| update_user_id | [string](#string) |  | The update_user_id is the user that updated the vessel |
| update_program_id | [string](#string) |  | The update_program_id is the updated program id |
| update_date | [string](#string) |  | The update_date is the updated date of the vessel |
| edw_update_date | [string](#string) | optional | The edw_update_date is the edw updated date |
| existing_tc_rate | [string](#string) | optional | Existing time charter rate: current charter rate of the vessel |
| gear | [string](#string) | optional | The gear of vessel |
| is_in_compared | [bool](#bool) |  | Is in comparison table |
| tab_id | [string](#string) | optional | Pool tab ID |
| tab_name | [string](#string) | optional | Pool tab name |





 

 

 


<a name="chorus-flm-vessel-v1-VesselService"></a>

### VesselService
Service for Vessel module

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| FindAllVessels | [FindAllVesselsRequest](#chorus-flm-vessel-v1-FindAllVesselsRequest) | [FindAllVesselsResponse](#chorus-flm-vessel-v1-FindAllVesselsResponse) | Get all, search, filter vessels<br /><br />Operation: GET<br /><br />Request: { &#34;keyword&#34;: &#34;string&#34;, &#34;filters&#34; : { &#34;delivery_status&#34;: &#34;delivered&#34; &#34;teu&#34;: { min: 0, max: 10 }, &#34;beam&#34;: { min: 0, max: 10 }, &#34;draft&#34;: { min: 0, max: 10 }, &#34;reefer_plugs&#34; : { min: 0, max: 10 }, &#34;loa&#34;: { min: 0, max: 10 }, &#34;foc_xx_knots&#34;: { min: 0, max: 10 }, &#34;year_built&#34;: { min: 2020, max: 2022 } } }<br /><br />Response: { &#34;vessels&#34;: [ Vessel ], } |
| FindAllVesselsForComparison | [FindAllVesselsForComparisonRequest](#chorus-flm-vessel-v1-FindAllVesselsForComparisonRequest) | [FindAllVesselsForComparisonResponse](#chorus-flm-vessel-v1-FindAllVesselsForComparisonResponse) | Get all, search, filter vessels (for comparison table)<br /><br />Operation: GET<br /><br />Request: { &#34;keyword&#34;: &#34;string&#34;, &#34;filters&#34; : { &#34;vessel_status&#34;: &#34;IN_WATER&#34; &#34;teu&#34;: { min: 0, max: 10 }, &#34;beam&#34;: { min: 0, max: 10 }, &#34;draft&#34;: { min: 0, max: 10 }, &#34;reefer_plugs&#34; : { min: 0, max: 10 }, &#34;loa&#34;: { min: 0, max: 10 }, &#34;foc_xx_knots&#34;: { min: 0, max: 10 }, &#34;year_built&#34;: { min: 2020, max: 2022 } } }<br /><br />Response: { &#34;vessels&#34;: [ Vessel ], } |
| CreateVessel | [CreateVesselRequest](#chorus-flm-vessel-v1-CreateVesselRequest) | [CreateVesselResponse](#chorus-flm-vessel-v1-CreateVesselResponse) | Create new vessels<br /><br />Operation: POST<br /><br />Request: { &#34;basic_teu_xx_t&#34;: 123, &#34;beam&#34;: &#34;12.12&#34;, &#34;channel&#34;: &#34;nulla ullamco laborum Duis ad&#34;, &#34;create_program_id&#34;: &#34;ut qui quis consequat&#34;, &#34;create_user_id&#34;: &#34;nisi&#34;, &#34;dead_weight&#34;: &#34;12.12&#34;, &#34;vessel_status&#34;: &#34;IN_CONSTRUCTION&#34;, &#34;gear&#34;: &#34;Gearless&#34;, &#34;delivery_location&#34;: &#34;mollit&#34;, &#34;delivery_timing&#34;: &#34;aute amet irure exercitation consequat&#34;, &#34;design&#34;: &#34;eu cillum ex labore qui&#34;, &#34;draft&#34;: &#34;12.12&#34;, &#34;ex_charters&#34;: &#34;deserunt veniam officia&#34;, &#34;flexible_trading&#34;: &#34;eiusmod&#34;, &#34;foc_xx_knots&#34;: &#34;12.12&#34;, &#34;imo_number&#34;: &#34;1534678&#34;, &#34;loa&#34;: &#34;123.00&#34;, &#34;loadable_teu&#34;: 12345, &#34;owner&#34;: &#34;est proident elit&#34;, &#34;owner_indication&#34;: &#34;45.12&#34;, &#34;existing_tc_rate&#34;: &#34;45.12&#34;, &#34;period&#34;: &#34;ullamco&#34;, &#34;reefer_plugs&#34;: 12343, &#34;remark&#34;: &#34;sunt&#34;, &#34;update_program_id&#34;: &#34;eu dolore officia&#34;, &#34;update_user_id&#34;: &#34;non culpa consectetur voluptate eu&#34;, &#34;vessel_code&#34;: &#34;null&#34;, &#34;vessel_name&#34;: &#34;test&#34;, &#34;year_built&#34;: 2024 }<br /><br />Response: { &#34;vessel&#34;: { Vessel } } |
| ImportManyVessel | [ImportManyVesselRequest](#chorus-flm-vessel-v1-ImportManyVesselRequest) | [ImportManyVesselResponse](#chorus-flm-vessel-v1-ImportManyVesselResponse) | Import new many vessel<br /><br />Operation: POST<br /><br />Request: { vessels: [ Vessel, Vessel ] }<br /><br />Response: { ids: string[] vessel_names: string[] } |
| FindVesselById | [FindVesselByIdRequest](#chorus-flm-vessel-v1-FindVesselByIdRequest) | [FindVesselByIdResponse](#chorus-flm-vessel-v1-FindVesselByIdResponse) | Create new vessels<br /><br />Operation: POST<br /><br />Request: { &#34;vessel_id&#34;: &#34;string&#34;, }<br /><br />Response: { &#34;vessel&#34;: { Vessel } } |
| DeleteVesselById | [DeleteVesselByIdRequest](#chorus-flm-vessel-v1-DeleteVesselByIdRequest) | [DeleteVesselByIdResponse](#chorus-flm-vessel-v1-DeleteVesselByIdResponse) | Method delete vessel by id<br /><br />Operation: DELETE<br /><br />Request: { &#34;vessel_id&#34;: &#34;string&#34; }<br /><br />Response: { &#34;success&#34;: true, } |
| UpdateVessel | [UpdateVesselRequest](#chorus-flm-vessel-v1-UpdateVesselRequest) | [UpdateVesselResponse](#chorus-flm-vessel-v1-UpdateVesselResponse) | The method for update vessel<br /><br />Operation: Post<br /><br />Request: { &#34;id&#34;: &#34;a75962a2-a82f-49b0-8424-c19d8854a428&#34;, &#34;imo_number&#34;: &#34;1534678&#34;, &#34;basic_teu_xx_t&#34;: 123, &#34;beam&#34;: &#34;12.12&#34;, &#34;channel&#34;: &#34;nulla ullamco laborum Duis ad&#34;, &#34;create_program_id&#34;: &#34;ut qui quis consequat&#34;, &#34;create_user_id&#34;: &#34;nisi&#34;, &#34;dead_weight&#34;: &#34;12.12&#34;, &#34;vessel_status&#34;: &#34;IN_CONSTRUCTION&#34;, &#34;gear&#34;: &#34;Gearless&#34;, &#34;delivery_location&#34;: &#34;mollit&#34;, &#34;delivery_timing&#34;: &#34;aute amet irure exercitation consequat&#34;, &#34;design&#34;: &#34;eu cillum ex labore qui&#34;, &#34;draft&#34;: &#34;12.12&#34;, &#34;ex_charters&#34;: &#34;deserunt veniam officia&#34;, &#34;flexible_trading&#34;: &#34;eiusmod&#34;, &#34;foc_xx_knots&#34;: &#34;12.12&#34;, &#34;loa&#34;: &#34;123.00&#34;, &#34;loadable_teu&#34;: 12345, &#34;owner&#34;: &#34;est proident elit&#34;, &#34;owner_indication&#34;: &#34;45.12&#34;, &#34;&#34;existing_tc_rate&#34;: &#34;45.12&#34;, &#34;period&#34;: &#34;ullamco&#34;, &#34;reefer_plugs&#34;: 12343, &#34;remark&#34;: &#34;sunt&#34;, &#34;update_program_id&#34;: &#34;eu dolore officia&#34;, &#34;update_user_id&#34;: &#34;non culpa consectetur voluptate eu&#34;, &#34;vessel_code&#34;: &#34;null&#34;, &#34;vessel_name&#34;: &#34;test&#34;, &#34;year_built&#34;: 2024 }<br /><br />Response: { &#34;success&#34;: true } |
| FindVesselNameIsNotExisted | [FindVesselNameIsNotExistedRequest](#chorus-flm-vessel-v1-FindVesselNameIsNotExistedRequest) | [FindVesselNameIsNotExistedResponse](#chorus-flm-vessel-v1-FindVesselNameIsNotExistedResponse) | The method for get vessel name<br /><br />Operation: Get<br /><br />Request: { }<br /><br />Response: { &#34;vessel_name&#34;: &#39;abc&#34; } |
| ExportVessels | [ExportVesselsRequest](#chorus-flm-vessel-v1-ExportVesselsRequest) | [ExportVesselsResponse](#chorus-flm-vessel-v1-ExportVesselsResponse) | The method for export vessel records<br /><br />Operation: Get<br /><br />Request: { userId: &#34;string&#34;, currentPage: &#34;number&#34;, rowsPerPage: &#34;number&#34; }<br /><br />Response: { &#34;vessels&#34;: [ Vessel ], &#34;totalItems&#34;: &#34;number&#34; } |

 



<a name="vessel_document_v1_vessel_document-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## vessel_document/v1/vessel_document.proto



<a name="chorus-flm-vessel_document-v1-DeleteVesselDocumentsRequest"></a>

### DeleteVesselDocumentsRequest
DeleteVesselDocumentRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | User ID |
| vessel_id | [string](#string) |  | Vessel ID |
| document_id | [string](#string) | repeated | List of document IDs which are need deleting |






<a name="chorus-flm-vessel_document-v1-DeleteVesselDocumentsResponse"></a>

### DeleteVesselDocumentsResponse
DeleteVesselDocumentResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | success indicator |






<a name="chorus-flm-vessel_document-v1-GetVesselDocumentsRequest"></a>

### GetVesselDocumentsRequest
Request message for GetVesselDocuments


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID |
| user_id | [string](#string) |  | User ID |
| current_page | [int32](#int32) |  | Current page |
| row_per_page | [int32](#int32) |  | Row per page |
| sort_type | [string](#string) |  | Sorting type |






<a name="chorus-flm-vessel_document-v1-GetVesselDocumentsResponse"></a>

### GetVesselDocumentsResponse
GetVesselDocumentsResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [VesselDocument](#chorus-flm-vessel_document-v1-VesselDocument) | repeated | List of vessel documents |
| total | [int32](#int32) |  | Total of documents uploaded in vessel |






<a name="chorus-flm-vessel_document-v1-SaveVesselDocumentRequest"></a>

### SaveVesselDocumentRequest
Request message for GetVesselDocument


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document_id | [string](#string) |  | Document ID |
| vessel_id | [string](#string) |  | Vessel ID |
| file_name | [string](#string) |  | File name |
| file_path | [string](#string) |  | File path |
| file_size | [int32](#int32) |  | File size |
| user_id | [string](#string) |  | User Id |






<a name="chorus-flm-vessel_document-v1-SaveVesselDocumentResponse"></a>

### SaveVesselDocumentResponse
Message request for saving new vessel document


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [VesselDocument](#chorus-flm-vessel_document-v1-VesselDocument) |  | Document data of vessel |






<a name="chorus-flm-vessel_document-v1-VesselDocument"></a>

### VesselDocument
Vessel Document Entity


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Document ID |
| vessel_id | [string](#string) |  | Vessel ID |
| file_name | [string](#string) |  | File name |
| file_path | [string](#string) |  | Uploaded file path to GCP |
| file_size | [int32](#int32) |  | Upload file size |
| create_date | [string](#string) |  | Created time |
| create_user_id | [string](#string) |  | Created by |





 

 

 


<a name="chorus-flm-vessel_document-v1-VesselDocumentService"></a>

### VesselDocumentService
Service for Vessel Document

Save vessel document<br /><br />Operation: POST

Request:
{
   &#34;vessel_id&#34;:&#34;vesselId&#34;,
   &#34;file_name&#34;:&#34;fileName&#34;,
   &#34;file_path&#34;:&#34;filePath&#34;,
   &#34;file_size&#34;:&#34;fileSize&#34;,
   &#34;user_id&#34;:&#34;userId&#34;    
}

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SaveVesselDocument | [SaveVesselDocumentRequest](#chorus-flm-vessel_document-v1-SaveVesselDocumentRequest) | [SaveVesselDocumentResponse](#chorus-flm-vessel_document-v1-SaveVesselDocumentResponse) | Response: { &#34;vessel_id&#34;:&#34;vesselId&#34;, &#34;file_name&#34;:&#34;fileName&#34;, &#34;file_path&#34;:&#34;filePath&#34;, &#34;file_size&#34;:&#34;fileSize&#34;, &#34;user_id&#34;:&#34;userId&#34; } |
| GetVesselDocuments | [GetVesselDocumentsRequest](#chorus-flm-vessel_document-v1-GetVesselDocumentsRequest) | [GetVesselDocumentsResponse](#chorus-flm-vessel_document-v1-GetVesselDocumentsResponse) | Response: { &#34;total&#34;: number &#34;data&#34;: { &#34;vessel_id&#34;: string, &#34;file_name&#34;: string, &#34;file_path&#34;: string, &#34;file_size&#34;: number, &#34;user_id&#34;: string } } |
| DeleteVesselDocuments | [DeleteVesselDocumentsRequest](#chorus-flm-vessel_document-v1-DeleteVesselDocumentsRequest) | [DeleteVesselDocumentsResponse](#chorus-flm-vessel_document-v1-DeleteVesselDocumentsResponse) | Response: { success: boolean } |

 



<a name="vessel_history_v1_vessel_history-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## vessel_history/v1/vessel_history.proto



<a name="chorus-flm-vessel_history-v1-FindAllVesselHistoryRequest"></a>

### FindAllVesselHistoryRequest
Request message for GetVesselHistory


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID |
| tbl_tp_opts | [TableHistoryTypeOptions](#chorus-flm-vessel_history-v1-TableHistoryTypeOptions) |  | Table History Type Options |






<a name="chorus-flm-vessel_history-v1-FindAllVesselHistoryResponse"></a>

### FindAllVesselHistoryResponse
Response message for GetVesselHistory


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID |
| table_history_chartering_hire | [TableHistoryCharteringHireResponse](#chorus-flm-vessel_history-v1-TableHistoryCharteringHireResponse) |  | Table History Chartering Hire |
| table_history_owners | [TableHistoryOwnersResponse](#chorus-flm-vessel_history-v1-TableHistoryOwnersResponse) |  | Table History Owners |
| table_history_vessels | [TableHistoryVesselsResponse](#chorus-flm-vessel_history-v1-TableHistoryVesselsResponse) |  | Table History Vessels |
| table_history_others | [TableHistoryOthersResponse](#chorus-flm-vessel_history-v1-TableHistoryOthersResponse) |  | Table History Others |






<a name="chorus-flm-vessel_history-v1-TableHistoryCharteringHire"></a>

### TableHistoryCharteringHire
Table History Chartering Hire


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID

Vessel ID |
| owner_indication | [string](#string) |  | Owners&#39; indication

Owners&#39; indication |
| period | [string](#string) |  | Period

Period |
| create_date | [string](#string) |  | Created time

Created time |
| create_user_id | [string](#string) |  | Created by

Created by |






<a name="chorus-flm-vessel_history-v1-TableHistoryCharteringHireResponse"></a>

### TableHistoryCharteringHireResponse
Response body for Table History Of Vessel


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| total | [int32](#int32) |  | Total of records |
| data | [TableHistoryCharteringHire](#chorus-flm-vessel_history-v1-TableHistoryCharteringHire) | repeated | Record of history for Owner indiciation |






<a name="chorus-flm-vessel_history-v1-TableHistoryOptionDetails"></a>

### TableHistoryOptionDetails
Response message for GetVesselHistory


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| has_data | [bool](#bool) |  | Has Data |
| current_page | [int32](#int32) |  | Current Page |
| row_per_page | [int32](#int32) |  | Row Per Page |
| sort_type | [string](#string) | optional | Sort Type |






<a name="chorus-flm-vessel_history-v1-TableHistoryOthers"></a>

### TableHistoryOthers
Table History Others


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID

Vessel id |
| criteria_name | [string](#string) |  | Criteria Name

Criteria Name |
| criteria_old_value | [string](#string) |  | Criteria Old Value

Criteria Old Value |
| criteria_new_value | [string](#string) |  | Criteria New Value

Criteria New Value |
| create_date | [string](#string) |  | Created time

Created time |
| create_user_id | [string](#string) |  | Created by

Created by |






<a name="chorus-flm-vessel_history-v1-TableHistoryOthersResponse"></a>

### TableHistoryOthersResponse
Response body for Other table


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| total | [int32](#int32) |  | Total of records |
| data | [TableHistoryOthers](#chorus-flm-vessel_history-v1-TableHistoryOthers) | repeated | Record of history for Other table |






<a name="chorus-flm-vessel_history-v1-TableHistoryOwners"></a>

### TableHistoryOwners
Table History Owners


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID

Vessel ID |
| owner | [string](#string) |  | Owner

Owner |
| create_date | [string](#string) |  | Created time

Created time |
| create_user_id | [string](#string) |  | Created by

Created by |






<a name="chorus-flm-vessel_history-v1-TableHistoryOwnersResponse"></a>

### TableHistoryOwnersResponse
Response body for Owners table


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| total | [int32](#int32) |  | Total of records |
| data | [TableHistoryOwners](#chorus-flm-vessel_history-v1-TableHistoryOwners) | repeated | Record of history for Owner table |






<a name="chorus-flm-vessel_history-v1-TableHistoryTypeOptions"></a>

### TableHistoryTypeOptions
Response message for GetVesselHistory


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tbl_hist_chart_hire | [TableHistoryOptionDetails](#chorus-flm-vessel_history-v1-TableHistoryOptionDetails) |  | Table History Chartering Hire |
| tbl_hist_own | [TableHistoryOptionDetails](#chorus-flm-vessel_history-v1-TableHistoryOptionDetails) |  | Table History Owners |
| tbl_hist_vsl | [TableHistoryOptionDetails](#chorus-flm-vessel_history-v1-TableHistoryOptionDetails) |  | Table History Vessels |
| tbl_hist_oth | [TableHistoryOptionDetails](#chorus-flm-vessel_history-v1-TableHistoryOptionDetails) |  | Table History Others |






<a name="chorus-flm-vessel_history-v1-TableHistoryVessels"></a>

### TableHistoryVessels
Table History Vessels


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_id | [string](#string) |  | Vessel ID

Vessel ID |
| vessel_name | [string](#string) |  | Vessel Name

Vessel Name |
| owner | [string](#string) |  | Owner

Owner |
| create_date | [string](#string) |  | Created time

Created time |
| create_user_id | [string](#string) |  | Created by

Created by |






<a name="chorus-flm-vessel_history-v1-TableHistoryVesselsResponse"></a>

### TableHistoryVesselsResponse
Response body for Vessel name changes


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| total | [int32](#int32) |  | Total of records |
| data | [TableHistoryVessels](#chorus-flm-vessel_history-v1-TableHistoryVessels) | repeated | Record of history for Vessel name changes |





 

 

 


<a name="chorus-flm-vessel_history-v1-VesselHistoryService"></a>

### VesselHistoryService
Service for Vessel History

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| FindAllVesselHistory | [FindAllVesselHistoryRequest](#chorus-flm-vessel_history-v1-FindAllVesselHistoryRequest) | [FindAllVesselHistoryResponse](#chorus-flm-vessel_history-v1-FindAllVesselHistoryResponse) | Get All Vessel History Table Data<br /><br />Operation: GET<br /><br />Request: { vessel_id = &#34;string&#34;; tbl_tp_opts: { tbl_hist_chart_hire: { has_data: true, current_page: 1, row_per_page: 10, sort_type: &#34;string&#34; }, tbl_hist_own = { has_data: true, current_page: 1, row_per_page: 10, sort_type: &#34;string&#34; }, tbl_hist_vsl = { has_data: true, current_page: 1, row_per_page: 10, sort_type: &#34;string&#34; }; tbl_hist_oth = { has_data: true, current_page: 1, row_per_page: 10, sort_type: &#34;string&#34; }; }; }<br /><br />Response: { vessel_id = &#34;string&#34;; table_history_chartering_hire: { vessel_id: &#34;string&#34;, owner_indication: 0.0, period: &#34;string&#34;, create_date: &#34;string&#34;, create_user_id: &#34;string&#34; }, table_history_owners: { vessel_id: &#34;string&#34;, owner: &#34;string&#34;, create_date: &#34;string&#34;, create_user_id: &#34;string&#34; }, table_history_vessels: { vessel_id: &#34;string&#34;, vessel_name: &#34;string&#34;, owner: &#34;string&#34;, create_date: &#34;string&#34;, create_user_id: &#34;string&#34; }, table_history_others: { vessel_id: &#34;string&#34;, criteria_name: &#34;string&#34;, criteria_old_value: &#34;string&#34;, criteria_new_value: &#34;string&#34;, create_date: &#34;string&#34;, } } |

 



<a name="workflow_v1_csr-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## workflow/v1/csr.proto



<a name="chorus-flm-workflow-v1-ApprovalCsrRequest"></a>

### ApprovalCsrRequest
Request message for `CsrInfoService.ApprovalCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| approver_name | [string](#string) |  | The approver name of csr. |
| approver_email | [string](#string) |  | The approver email of csr. |
| is_approved | [bool](#bool) |  | The value of approval |
| request_id | [string](#string) |  | The request id of csr. |






<a name="chorus-flm-workflow-v1-ApprovalCsrResponse"></a>

### ApprovalCsrResponse
Response message for `CsrInfoService.ApprovalCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |






<a name="chorus-flm-workflow-v1-CreateCsrRequest"></a>

### CreateCsrRequest
Request message for `CsrInfoService.CreateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| csr | [Csr](#chorus-flm-workflow-v1-Csr) |  | The Csr information. |






<a name="chorus-flm-workflow-v1-CreateCsrResponse"></a>

### CreateCsrResponse
Response message for `CsrInfoService.CreateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |






<a name="chorus-flm-workflow-v1-Csr"></a>

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






<a name="chorus-flm-workflow-v1-GetCsrByIdRequest"></a>

### GetCsrByIdRequest
Request message for `CsrInfoService.GetCsrById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of csr. |






<a name="chorus-flm-workflow-v1-GetCsrByIdResponse"></a>

### GetCsrByIdResponse
Response message for `CsrInfoService.GetCsrById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| csr | [Csr](#chorus-flm-workflow-v1-Csr) |  | The Csr information. |






<a name="chorus-flm-workflow-v1-UpdateCsrRequest"></a>

### UpdateCsrRequest
Request message for `CsrInfoService.UpdateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_id | [string](#string) |  | The request id of csr. |
| amount | [double](#double) |  | The amount of csr. |






<a name="chorus-flm-workflow-v1-UpdateCsrResponse"></a>

### UpdateCsrResponse
Response message for `CsrInfoService.UpdateCsr`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  | The status response. |
| message | [string](#string) |  | The message response. |





 

 

 


<a name="chorus-flm-workflow-v1-CsrInfoService"></a>

### CsrInfoService
Services for csr.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCsrById | [GetCsrByIdRequest](#chorus-flm-workflow-v1-GetCsrByIdRequest) | [GetCsrByIdResponse](#chorus-flm-workflow-v1-GetCsrByIdResponse) | Get csr information by Id.<br /><br />Operation: MATCH<br /><br />Request: { &#34;request_id&#34; : &#34;11501021&#34; }<br /><br />Response: { &#34;csr&#34;: { &#34;business&#34;: &#34;CSR&#34;, &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, &#34;requestor_name&#34;: &#34;system&#34;, &#34;requestor_email&#34;: &#34;system@one-line.com&#34;, &#34;first_approver_name&#34;: &#34;approver1&#34;, &#34;first_approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;second_approver_name&#34;: &#34;approver2&#34;, &#34;second_approver_email&#34;: &#34;approver2@one-line.com&#34;, &#34;redirect_url&#34;: &#34;https://chorus-dev.one-line.com/csr/&#34;, } } |
| CreateCsr | [CreateCsrRequest](#chorus-flm-workflow-v1-CreateCsrRequest) | [CreateCsrResponse](#chorus-flm-workflow-v1-CreateCsrResponse) | Create csr information.<br /><br />Operation: CREATE<br /><br />Request: &#34;csr&#34;: { &#34;business&#34;: &#34;CSR&#34;, &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, &#34;requestor_name&#34;: &#34;system&#34;, &#34;requestor_email&#34;: &#34;system@one-line.com&#34;, &#34;first_approver_name&#34;: &#34;approver1&#34;, &#34;first_approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;second_approver_name&#34;: &#34;approver2&#34;, &#34;second_approver_email&#34;: &#34;approver2@one-line.com&#34;, &#34;redirect_url&#34;: &#34;https://chorus-dev.one-line.com/csr/&#34;, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |
| UpdateCsr | [UpdateCsrRequest](#chorus-flm-workflow-v1-UpdateCsrRequest) | [UpdateCsrResponse](#chorus-flm-workflow-v1-UpdateCsrResponse) | Update csr information.<br /><br />Operation: UPDATE<br /><br />Request: { &#34;request_id&#34;: &#34;11501021&#34;, &#34;amount&#34;: &#34;100.00&#34;, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |
| ApprovalCsr | [ApprovalCsrRequest](#chorus-flm-workflow-v1-ApprovalCsrRequest) | [ApprovalCsrResponse](#chorus-flm-workflow-v1-ApprovalCsrResponse) | Approval csr information.<br /><br />Operation: APPROVAL<br /><br />Request: { &#34;request_id&#34;: &#34;11501021&#34;, &#34;approver_name&#34;: &#34;approver1&#34;, &#34;approver_email&#34;: &#34;approver1@one-line.com&#34;, &#34;is_approved&#34;: true, }<br /><br />Response: { &#34;status&#34; : true, &#34;message&#34; : &#39;&#39; } |

 



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

