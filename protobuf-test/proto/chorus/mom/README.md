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

- [agreement/v1/agreement.proto](#agreement_v1_agreement-proto)
    - [AgmtResponse](#chorus-mom-agreement-v1-AgmtResponse)
    - [Agreement](#chorus-mom-agreement-v1-Agreement)
    - [AgreementServiceCreateRequest](#chorus-mom-agreement-v1-AgreementServiceCreateRequest)
    - [AgreementServiceCreateResponse](#chorus-mom-agreement-v1-AgreementServiceCreateResponse)
    - [AgreementServiceFindOneRequest](#chorus-mom-agreement-v1-AgreementServiceFindOneRequest)
    - [AgreementServiceFindOneResponse](#chorus-mom-agreement-v1-AgreementServiceFindOneResponse)
    - [AgreementServiceFindRequest](#chorus-mom-agreement-v1-AgreementServiceFindRequest)
    - [AgreementServiceFindResponse](#chorus-mom-agreement-v1-AgreementServiceFindResponse)
    - [Country](#chorus-mom-agreement-v1-Country)
    - [CountryResponse](#chorus-mom-agreement-v1-CountryResponse)
    - [Error](#chorus-mom-agreement-v1-Error)
    - [FieldError](#chorus-mom-agreement-v1-FieldError)
    - [ListAgmtResponse](#chorus-mom-agreement-v1-ListAgmtResponse)
    - [PaginationRequest](#chorus-mom-agreement-v1-PaginationRequest)
    - [PaginationResponse](#chorus-mom-agreement-v1-PaginationResponse)
    - [Port](#chorus-mom-agreement-v1-Port)
    - [PortResponse](#chorus-mom-agreement-v1-PortResponse)
    - [TerminalResponse](#chorus-mom-agreement-v1-TerminalResponse)
    - [VendorResponse](#chorus-mom-agreement-v1-VendorResponse)
  
    - [AgreementService](#chorus-mom-agreement-v1-AgreementService)
  
- [cost_code/v1/cost_code.proto](#cost_code_v1_cost_code-proto)
    - [CostCode](#chorus-mom-cost_code-v1-CostCode)
    - [CostCodesServiceFindResponse](#chorus-mom-cost_code-v1-CostCodesServiceFindResponse)
    - [Error](#chorus-mom-cost_code-v1-Error)
    - [FieldError](#chorus-mom-cost_code-v1-FieldError)
  
    - [CostCodesService](#chorus-mom-cost_code-v1-CostCodesService)
  
- [data_source/v1/data_source.proto](#data_source_v1_data_source-proto)
    - [DataSource](#chorus-mom-data_source-v1-DataSource)
    - [DataSourcesFindResponse](#chorus-mom-data_source-v1-DataSourcesFindResponse)
    - [Error](#chorus-mom-data_source-v1-Error)
    - [FieldError](#chorus-mom-data_source-v1-FieldError)
  
    - [DataSourceService](#chorus-mom-data_source-v1-DataSourceService)
  
- [measure_unit/v1/measure_unit.proto](#measure_unit_v1_measure_unit-proto)
    - [Error](#chorus-mom-measure_unit-v1-Error)
    - [FieldError](#chorus-mom-measure_unit-v1-FieldError)
    - [MeasureUnit](#chorus-mom-measure_unit-v1-MeasureUnit)
    - [MeasureUnitsFindResponse](#chorus-mom-measure_unit-v1-MeasureUnitsFindResponse)
  
    - [MeasureUnitService](#chorus-mom-measure_unit-v1-MeasureUnitService)
  
- [tariff_object_item/v1/tariff_object_item.proto](#tariff_object_item_v1_tariff_object_item-proto)
    - [DataSource](#chorus-mom-tariff_object_item-v1-DataSource)
    - [Error](#chorus-mom-tariff_object_item-v1-Error)
    - [FieldError](#chorus-mom-tariff_object_item-v1-FieldError)
    - [MeasureUnit](#chorus-mom-tariff_object_item-v1-MeasureUnit)
    - [PaginationRequest](#chorus-mom-tariff_object_item-v1-PaginationRequest)
    - [PaginationResponse](#chorus-mom-tariff_object_item-v1-PaginationResponse)
    - [SortRequest](#chorus-mom-tariff_object_item-v1-SortRequest)
    - [TariffObjectItem](#chorus-mom-tariff_object_item-v1-TariffObjectItem)
    - [TariffObjectItemServiceFindRequest](#chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindRequest)
    - [TariffObjectItemServiceFindResponse](#chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindResponse)
    - [TariffObjectItemsFilter](#chorus-mom-tariff_object_item-v1-TariffObjectItemsFilter)
    - [ValueType](#chorus-mom-tariff_object_item-v1-ValueType)
  
    - [TariffObjectItemService](#chorus-mom-tariff_object_item-v1-TariffObjectItemService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="agreement_v1_agreement-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## agreement/v1/agreement.proto



<a name="chorus-mom-agreement-v1-AgmtResponse"></a>

### AgmtResponse
Response containing details of a single agreement.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| agmt_number | [string](#string) |  | Agreement number. |
| countries | [CountryResponse](#chorus-mom-agreement-v1-CountryResponse) | repeated | List of countries associated with the agreement. |
| ports | [PortResponse](#chorus-mom-agreement-v1-PortResponse) | repeated | List of ports associated with the agreement. |
| terminals | [TerminalResponse](#chorus-mom-agreement-v1-TerminalResponse) | repeated | List of terminals associated with the agreement. |
| effective_from | [string](#string) |  | Start date of the agreement. |
| effective_to | [string](#string) |  | End date of the agreement. |
| vendor | [VendorResponse](#chorus-mom-agreement-v1-VendorResponse) |  | Vendor information. |
| type | [string](#string) |  | Type |
| status | [string](#string) |  | Status |





<a name="chorus-mom-agreement-v1-Agreement"></a>

### Agreement
Message representing an agreement.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [string](#string) |  | The current status of the agreement. |
| agreement_number | [string](#string) |  | The unique number identifying the agreement. |






<a name="chorus-mom-agreement-v1-AgreementServiceCreateRequest"></a>

### AgreementServiceCreateRequest
Request message for the &#39;Create&#39; method of AgreementService.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [string](#string) |  | The type of agreement being created. |
| effective_from | [string](#string) |  | The start date when the agreement becomes effective. |
| effective_to | [string](#string) |  | The end date when the agreement expires. |
| vendor_code | [int32](#int32) |  | The code representing the vendor related to this agreement. |
| countries | [Country](#chorus-mom-agreement-v1-Country) | repeated | A list of countries involved in the agreement, each with its own ports. |






<a name="chorus-mom-agreement-v1-AgreementServiceCreateResponse"></a>

### AgreementServiceCreateResponse
Response message for the &#39;Create&#39; method of AgreementService.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [Agreement](#chorus-mom-agreement-v1-Agreement) |  | The agreement data returned in the response. |
| error | [Error](#chorus-mom-agreement-v1-Error) | optional | The error information if an error occurred during creation. |






<a name="chorus-mom-agreement-v1-AgreementServiceFindOneRequest"></a>

### AgreementServiceFindOneRequest
Request to find a specific agreement by its number.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| agmt_number | [string](#string) |  | The agreement number to search for. |






<a name="chorus-mom-agreement-v1-AgreementServiceFindOneResponse"></a>

### AgreementServiceFindOneResponse
Response containing details of a single agreement and any error that may occur.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [AgmtResponse](#chorus-mom-agreement-v1-AgmtResponse) | optional | The agreement data. |
| error | [Error](#chorus-mom-agreement-v1-Error) | optional | Error information, if an error occurs. |






<a name="chorus-mom-agreement-v1-AgreementServiceFindRequest"></a>

### AgreementServiceFindRequest
Request to retrieve a list of agreements with pagination.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pagination | [PaginationRequest](#chorus-mom-agreement-v1-PaginationRequest) | optional | Pagination details for the request. |






<a name="chorus-mom-agreement-v1-AgreementServiceFindResponse"></a>

### AgreementServiceFindResponse
Response containing a list of agreements along with pagination details and errors (if any).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [ListAgmtResponse](#chorus-mom-agreement-v1-ListAgmtResponse) | repeated | List of agreements. |
| pagination | [PaginationResponse](#chorus-mom-agreement-v1-PaginationResponse) |  | Pagination details for the response. |
| error | [Error](#chorus-mom-agreement-v1-Error) | optional | Error information, if an error occurs. |






<a name="chorus-mom-agreement-v1-Country"></a>

### Country
Message representing a country.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | The code representing the country. |
| ports | [Port](#chorus-mom-agreement-v1-Port) | repeated | A list of ports located in this country. |






<a name="chorus-mom-agreement-v1-CountryResponse"></a>

### CountryResponse
Country information for agreements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code | [string](#string) |  | Code of the country. |
| country_name | [string](#string) |  | Name of the country. |






<a name="chorus-mom-agreement-v1-Error"></a>

### Error
Message representing an error that occurred.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [int32](#int32) |  | Error code representing the type of error. |
| message | [string](#string) |  | Human-readable message describing the error. |
| details | [FieldError](#chorus-mom-agreement-v1-FieldError) | repeated | List of field-specific errors related to the overall error. |






<a name="chorus-mom-agreement-v1-FieldError"></a>

### FieldError
Message representing a specific field error.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Code representing the specific field error. |
| field_name | [string](#string) |  | Name of the field that has an error. |
| message | [string](#string) |  | Message describing the field-specific error. |






<a name="chorus-mom-agreement-v1-ListAgmtResponse"></a>

### ListAgmtResponse
Represents a single agreement entry in the list of agreements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| agmt_number | [string](#string) |  | The unique agreement number. |






<a name="chorus-mom-agreement-v1-PaginationRequest"></a>

### PaginationRequest
Pagination request to specify page number and size.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | The current page number. |
| limit | [int32](#int32) |  | The number of items per page. |






<a name="chorus-mom-agreement-v1-PaginationResponse"></a>

### PaginationResponse
Pagination response with details about total items, pages, and current page.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | Current page. |
| limit | [int32](#int32) |  | Limit of each page. |
| total_page | [int32](#int32) |  | Total pages. |
| total | [int32](#int32) |  | Total number of items. |






<a name="chorus-mom-agreement-v1-Port"></a>

### Port
Message representing a port.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | The code representing the port. |
| terminal_codes | [string](#string) | repeated | A list of terminal codes within this port. |






<a name="chorus-mom-agreement-v1-PortResponse"></a>

### PortResponse
Port information for agreements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| port_code | [string](#string) |  | Code of the port. |
| port_name | [string](#string) |  | Name of the port. |
| country_code | [string](#string) |  | Country code of the port. |






<a name="chorus-mom-agreement-v1-TerminalResponse"></a>

### TerminalResponse
Terminal information for agreements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| terminal_code | [string](#string) |  | Code of the terminal. |
| terminal_name | [string](#string) |  | Name of the terminal. |
| port_code | [string](#string) |  | Code of the port. |






<a name="chorus-mom-agreement-v1-VendorResponse"></a>

### VendorResponse
Vendor information for agreements.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_code | [string](#string) |  | Code of the vendor. |
| vendor_name | [string](#string) |  | Name of the vendor. |
| country_code | [string](#string) |  | Country code of the vendor. |





 

 

 


<a name="chorus-mom-agreement-v1-AgreementService"></a>

### AgreementService
Service definition for managing agreements.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Find | [AgreementServiceFindRequest](#chorus-mom-agreement-v1-AgreementServiceFindRequest) | [AgreementServiceFindResponse](#chorus-mom-agreement-v1-AgreementServiceFindResponse) | RPC to find a list of agreements, returns FindAgmtsResponse. |
| FindOne | [AgreementServiceFindOneRequest](#chorus-mom-agreement-v1-AgreementServiceFindOneRequest) | [AgreementServiceFindOneResponse](#chorus-mom-agreement-v1-AgreementServiceFindOneResponse) | RPC to find a single agreement by agreement number, returns FindAgmtResponse. |
| Create | [AgreementServiceCreateRequest](#chorus-mom-agreement-v1-AgreementServiceCreateRequest) | [AgreementServiceCreateResponse](#chorus-mom-agreement-v1-AgreementServiceCreateResponse) | RPC method to create a new agreement. |

 



<a name="cost_code_v1_cost_code-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cost_code/v1/cost_code.proto



<a name="chorus-mom-cost_code-v1-CostCode"></a>

### CostCode
CostCode message representing a cost code entry


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Unique code of the cost item |
| name | [string](#string) |  | Name or description of the cost item |






<a name="chorus-mom-cost_code-v1-CostCodesServiceFindResponse"></a>

### CostCodesServiceFindResponse
Response message for finding cost codes, containing a list of cost codes and potential errors


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [CostCode](#chorus-mom-cost_code-v1-CostCode) | repeated | List of cost codes |
| error | [Error](#chorus-mom-cost_code-v1-Error) | optional | Error information, if an error occurs |






<a name="chorus-mom-cost_code-v1-Error"></a>

### Error
Message representing an error that occurred.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [int32](#int32) |  | Error code representing the type of error. |
| message | [string](#string) |  | Human-readable message describing the error. |
| details | [FieldError](#chorus-mom-cost_code-v1-FieldError) | repeated | List of field-specific errors related to the overall error. |






<a name="chorus-mom-cost_code-v1-FieldError"></a>

### FieldError
Message representing a specific field error.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Code representing the specific field error. |
| field_name | [string](#string) |  | Name of the field that has an error. |
| message | [string](#string) |  | Message describing the field-specific error. |





 

 

 


<a name="chorus-mom-cost_code-v1-CostCodesService"></a>

### CostCodesService
Service definition for the CostCodes query

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Find | [.google.protobuf.Empty](#google-protobuf-Empty) | [CostCodesServiceFindResponse](#chorus-mom-cost_code-v1-CostCodesServiceFindResponse) | RPC to retrieve a list of cost codes, returns FindCostCodesResponse |

 



<a name="data_source_v1_data_source-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## data_source/v1/data_source.proto



<a name="chorus-mom-data_source-v1-DataSource"></a>

### DataSource
Message representing a data source.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the data source. |
| name | [string](#string) |  | Name of the data source. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |






<a name="chorus-mom-data_source-v1-DataSourcesFindResponse"></a>

### DataSourcesFindResponse
Message representing a type of value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [DataSource](#chorus-mom-data_source-v1-DataSource) | repeated |  |
| error | [Error](#chorus-mom-data_source-v1-Error) | optional |  |






<a name="chorus-mom-data_source-v1-Error"></a>

### Error
Message representing an error that occurred.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [int32](#int32) |  | Error code representing the type of error. |
| message | [string](#string) |  | Human-readable message describing the error. |
| details | [FieldError](#chorus-mom-data_source-v1-FieldError) | repeated | List of field-specific errors related to the overall error. |






<a name="chorus-mom-data_source-v1-FieldError"></a>

### FieldError
Message representing a specific field error.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Code representing the specific field error. |
| field_name | [string](#string) |  | Name of the field that has an error. |
| message | [string](#string) |  | Message describing the field-specific error. |





 

 

 


<a name="chorus-mom-data_source-v1-DataSourceService"></a>

### DataSourceService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Find | [.google.protobuf.Empty](#google-protobuf-Empty) | [DataSourcesFindResponse](#chorus-mom-data_source-v1-DataSourcesFindResponse) |  |

 



<a name="measure_unit_v1_measure_unit-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## measure_unit/v1/measure_unit.proto
Define the syntax version to be used for this protocol buffer file.


<a name="chorus-mom-measure_unit-v1-Error"></a>

### Error
Message representing an error that occurred.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [int32](#int32) |  | Error code representing the type of error. |
| message | [string](#string) |  | Human-readable message describing the error. |
| details | [FieldError](#chorus-mom-measure_unit-v1-FieldError) | repeated | List of field-specific errors related to the overall error. |






<a name="chorus-mom-measure_unit-v1-FieldError"></a>

### FieldError
Message representing a specific field error.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Code representing the specific field error. |
| field_name | [string](#string) |  | Name of the field that has an error. |
| message | [string](#string) |  | Message describing the field-specific error. |






<a name="chorus-mom-measure_unit-v1-MeasureUnit"></a>

### MeasureUnit
Message representing a unit of measure.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the measure unit. |
| name | [string](#string) |  | Name of the measure unit. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |






<a name="chorus-mom-measure_unit-v1-MeasureUnitsFindResponse"></a>

### MeasureUnitsFindResponse
Message representing a type of value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [MeasureUnit](#chorus-mom-measure_unit-v1-MeasureUnit) | repeated |  |
| error | [Error](#chorus-mom-measure_unit-v1-Error) | optional |  |





 

 

 


<a name="chorus-mom-measure_unit-v1-MeasureUnitService"></a>

### MeasureUnitService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Find | [.google.protobuf.Empty](#google-protobuf-Empty) | [MeasureUnitsFindResponse](#chorus-mom-measure_unit-v1-MeasureUnitsFindResponse) |  |

 



<a name="tariff_object_item_v1_tariff_object_item-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## tariff_object_item/v1/tariff_object_item.proto
Define the syntax version to be used for this protocol buffer file.


<a name="chorus-mom-tariff_object_item-v1-DataSource"></a>

### DataSource
Message representing a data source.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the data source. |
| name | [string](#string) |  | Name of the data source. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |






<a name="chorus-mom-tariff_object_item-v1-Error"></a>

### Error
Message representing an error that occurred.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [int32](#int32) |  | Error code representing the type of error. |
| message | [string](#string) |  | Human-readable message describing the error. |
| details | [FieldError](#chorus-mom-tariff_object_item-v1-FieldError) | repeated | List of field-specific errors related to the overall error. |






<a name="chorus-mom-tariff_object_item-v1-FieldError"></a>

### FieldError
Message representing a specific field error.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | Code representing the specific field error. |
| field_name | [string](#string) |  | Name of the field that has an error. |
| message | [string](#string) |  | Message describing the field-specific error. |






<a name="chorus-mom-tariff_object_item-v1-MeasureUnit"></a>

### MeasureUnit
Message representing a unit of measure.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the measure unit. |
| name | [string](#string) |  | Name of the measure unit. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |






<a name="chorus-mom-tariff_object_item-v1-PaginationRequest"></a>

### PaginationRequest
Message used for pagination request parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) | optional | Page number to retrieve (optional). |
| limit | [int32](#int32) | optional | Maximum number of items to return per page (optional). |






<a name="chorus-mom-tariff_object_item-v1-PaginationResponse"></a>

### PaginationResponse
Message representing pagination details in the response.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | Current page number. |
| limit | [int32](#int32) |  | Maximum number of items per page. |
| total_page | [int32](#int32) |  | Total number of pages available. |
| total | [int32](#int32) |  | Total number of items available. |






<a name="chorus-mom-tariff_object_item-v1-SortRequest"></a>

### SortRequest
Message used to specify sorting parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| field | [string](#string) |  | Field by which the results should be sorted. |
| order | [string](#string) |  | Order of sorting (e.g., asc or desc). |






<a name="chorus-mom-tariff_object_item-v1-TariffObjectItem"></a>

### TariffObjectItem
Message representing an item in a tariff object.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the tariff object item. |
| name | [string](#string) |  | Name of the tariff object item. |
| type | [string](#string) |  | Type of the tariff object item. |
| is_vessel_direction_required | [string](#string) | optional | Indicates if vessel direction is required. |
| description | [string](#string) |  | Description of the tariff object item. |
| data_source_location_as_is | [string](#string) |  | Current location of the data source. |
| target_system_as_is | [string](#string) |  | Current target system. |
| target_system_to_be | [string](#string) |  | Future target system. |
| remarks | [string](#string) |  | Additional remarks about the tariff object item. |
| data_sources | [DataSource](#chorus-mom-tariff_object_item-v1-DataSource) | repeated | List of data source associated with the tariff object item. |
| measure_units | [MeasureUnit](#chorus-mom-tariff_object_item-v1-MeasureUnit) | repeated | List of measure units associated with the tariff object item. |
| value_types | [ValueType](#chorus-mom-tariff_object_item-v1-ValueType) | repeated | List of value types associated with the tariff object item. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |






<a name="chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindRequest"></a>

### TariffObjectItemServiceFindRequest
Message used to request tariff object items with optional filters, sorting, and pagination.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filters | [TariffObjectItemsFilter](#chorus-mom-tariff_object_item-v1-TariffObjectItemsFilter) | optional | Optional filters to apply when finding tariff object items. |
| sorts | [SortRequest](#chorus-mom-tariff_object_item-v1-SortRequest) | repeated | List of sorting requests to apply. |
| pagination | [PaginationRequest](#chorus-mom-tariff_object_item-v1-PaginationRequest) | optional | Optional pagination details for the response. |






<a name="chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindResponse"></a>

### TariffObjectItemServiceFindResponse
Message representing the response for finding tariff object items.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | [TariffObjectItem](#chorus-mom-tariff_object_item-v1-TariffObjectItem) | repeated | Optional tariff object item data returned from the request. |
| pagination | [PaginationResponse](#chorus-mom-tariff_object_item-v1-PaginationResponse) |  | pagination details for the response. |
| error | [Error](#chorus-mom-tariff_object_item-v1-Error) | optional | Optional error information if the request failed. |






<a name="chorus-mom-tariff_object_item-v1-TariffObjectItemsFilter"></a>

### TariffObjectItemsFilter
Message used to filter tariff object items.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [string](#string) | optional | Optional filter to specify the type of tariff object items to retrieve. |
| search | [string](#string) | optional |  |
| measure_units | [int32](#int32) | repeated |  |
| data_sources | [int32](#int32) | repeated |  |
| is_vessel_direction_required | [string](#string) | repeated |  |






<a name="chorus-mom-tariff_object_item-v1-ValueType"></a>

### ValueType
Message representing a type of value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int32](#int32) |  | Unique identifier for the value type. |
| name | [string](#string) |  | Name of the value type. |
| created_at | [string](#string) |  | The timestamp when the entity was created, represented as Unix time in seconds or milliseconds. |
| created_by | [string](#string) |  | The user or system that created the entity. |
| updated_at | [string](#string) |  | The timestamp when the entity was last updated, represented as Unix time in seconds or milliseconds. |
| updated_by | [string](#string) |  | The user or system that last updated the entity. |
| deleted_at | [string](#string) | optional | The timestamp when the entity was deleted, represented as Unix time in seconds or milliseconds. This field might be null or zero if the entity is not deleted. |
| deleted_by | [string](#string) | optional | The user or system that deleted the entity. |





 

 

 


<a name="chorus-mom-tariff_object_item-v1-TariffObjectItemService"></a>

### TariffObjectItemService
Service for handling tariff object item operations.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Find | [TariffObjectItemServiceFindRequest](#chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindRequest) | [TariffObjectItemServiceFindResponse](#chorus-mom-tariff_object_item-v1-TariffObjectItemServiceFindResponse) | RPC method to find tariff object items based on request parameters. |

 



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

