# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [chorus/fcm/agreement/office/v1/office.proto](#chorus_fcm_agreement_office_v1_office-proto)
    - [GetOfficeByCodeRequest](#chorus-fcm-agreement-office-v1-GetOfficeByCodeRequest)
    - [GetOfficeByCodeResponse](#chorus-fcm-agreement-office-v1-GetOfficeByCodeResponse)
    - [GetOfficesRequest](#chorus-fcm-agreement-office-v1-GetOfficesRequest)
    - [GetOfficesResponse](#chorus-fcm-agreement-office-v1-GetOfficesResponse)
  
- [chorus/fcm/agreement/service/v1/office.proto](#chorus_fcm_agreement_service_v1_office-proto)
    - [OfficeService](#chorus-fcm-agreement-service-v1-OfficeService)
  
- [chorus/fcm/agreement/service/v1/upload.proto](#chorus_fcm_agreement_service_v1_upload-proto)
    - [UploadService](#chorus-fcm-agreement-service-v1-UploadService)
  
- [chorus/fcm/agreement/upload/v1/upload.proto](#chorus_fcm_agreement_upload_v1_upload-proto)
    - [GetUploadFileByAgreementIdRequest](#chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdRequest)
    - [GetUploadFileByAgreementIdResponse](#chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdResponse)
    - [GetUploadFileByIdRequest](#chorus-fcm-agreement-upload-v1-GetUploadFileByIdRequest)
    - [GetUploadFileByIdResponse](#chorus-fcm-agreement-upload-v1-GetUploadFileByIdResponse)
    - [RequestUpload](#chorus-fcm-agreement-upload-v1-RequestUpload)
    - [SaveUploadFileRequest](#chorus-fcm-agreement-upload-v1-SaveUploadFileRequest)
    - [SaveUploadFileResponse](#chorus-fcm-agreement-upload-v1-SaveUploadFileResponse)
  
- [chorus/fcm/base/office/v1/office.proto](#chorus_fcm_base_office_v1_office-proto)
    - [OfficeModel](#chorus-fcm-base-office-v1-OfficeModel)
  
- [chorus/fcm/base/paging/v1/paging.proto](#chorus_fcm_base_paging_v1_paging-proto)
    - [PagingModel](#chorus-fcm-base-paging-v1-PagingModel)
  
- [chorus/fcm/base/upload/v1/upload.proto](#chorus_fcm_base_upload_v1_upload-proto)
    - [UploadFile](#chorus-fcm-base-upload-v1-UploadFile)
  
- [Scalar Value Types](#scalar-value-types)



<a name="chorus_fcm_agreement_office_v1_office-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/agreement/office/v1/office.proto



<a name="chorus-fcm-agreement-office-v1-GetOfficeByCodeRequest"></a>

### GetOfficeByCodeRequest
Request message for `OfficeService.GetOfficeByCode`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_code | [string](#string) |  | The office_code is office code |






<a name="chorus-fcm-agreement-office-v1-GetOfficeByCodeResponse"></a>

### GetOfficeByCodeResponse
Response message for `OfficeService.GetOfficeByCode`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office | [chorus.fcm.base.office.v1.OfficeModel](#chorus-fcm-base-office-v1-OfficeModel) |  | The office information |






<a name="chorus-fcm-agreement-office-v1-GetOfficesRequest"></a>

### GetOfficesRequest
Request message for `OfficeService.GetOffices`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | the page is current page |
| limit | [int32](#int32) |  | the limit is maximum items per request |
| keyword | [string](#string) | optional | the keyword is simple text |






<a name="chorus-fcm-agreement-office-v1-GetOfficesResponse"></a>

### GetOfficesResponse
Response message for `OfficeService.GetOffices`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offices | [chorus.fcm.base.office.v1.OfficeModel](#chorus-fcm-base-office-v1-OfficeModel) | repeated | The office information list |
| paging | [chorus.fcm.base.paging.v1.PagingModel](#chorus-fcm-base-paging-v1-PagingModel) |  | The paging information of office list |





 

 

 

 



<a name="chorus_fcm_agreement_service_v1_office-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/agreement/service/v1/office.proto


 

 

 


<a name="chorus-fcm-agreement-service-v1-OfficeService"></a>

### OfficeService
Office Service

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetOffices | [.chorus.fcm.agreement.office.v1.GetOfficesRequest](#chorus-fcm-agreement-office-v1-GetOfficesRequest) | [.chorus.fcm.agreement.office.v1.GetOfficesResponse](#chorus-fcm-agreement-office-v1-GetOfficesResponse) |  Get Offices Request: { page: 1, limit: 1, keyword: &#34;my keyword&#34; }<br /><br />Response: { &#34;offices&#34;: [ { officeCode: &#34;NSABB&#34;, name: &#34;ONE (Ocean Network Express) Line (India) Private L&#34;, rhqId: 10 } ] } |
| GetOfficeByCode | [.chorus.fcm.agreement.office.v1.GetOfficeByCodeRequest](#chorus-fcm-agreement-office-v1-GetOfficeByCodeRequest) | [.chorus.fcm.agreement.office.v1.GetOfficeByCodeResponse](#chorus-fcm-agreement-office-v1-GetOfficeByCodeResponse) |  Get Office Request: { officeCode: &#34;NSABB&#34; }<br /><br />Response: { &#34;office&#34;: { officeCode: &#34;NSABB&#34;, name: &#34;ONE (Ocean Network Express) Line (India) Private L&#34;, rhqId: 10 } } |

 



<a name="chorus_fcm_agreement_service_v1_upload-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/agreement/service/v1/upload.proto


 

 

 


<a name="chorus-fcm-agreement-service-v1-UploadService"></a>

### UploadService
Upload Service

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SaveUploadFile | [.chorus.fcm.agreement.upload.v1.SaveUploadFileRequest](#chorus-fcm-agreement-upload-v1-SaveUploadFileRequest) | [.chorus.fcm.agreement.upload.v1.SaveUploadFileResponse](#chorus-fcm-agreement-upload-v1-SaveUploadFileResponse) |  Save upload file Request: { &#34;uploads&#34;: [ { objectName: &#34;objectName&#34;, fileName: &#34;fileName&#34;, fileType: &#34;fileType&#34;, fileUrl: &#34;fileUrl&#34;, } ] }<br /><br />Response: { &#34;uploads&#34;: [ { id: 0, objectName: &#34;objectName&#34;, fileName: &#34;fileName&#34;, fileType: &#34;fileType&#34;, fileUrl: &#34;fileUrl&#34;, } ] } |
| GetUploadFileById | [.chorus.fcm.agreement.upload.v1.GetUploadFileByIdRequest](#chorus-fcm-agreement-upload-v1-GetUploadFileByIdRequest) | [.chorus.fcm.agreement.upload.v1.GetUploadFileByIdResponse](#chorus-fcm-agreement-upload-v1-GetUploadFileByIdResponse) |  Get upload file by id Request: { &#34;id&#34;: 10 }<br /><br />Response: { &#34;upload&#34;: { id: 10, objectName: &#34;&#34;, fileName: &#34;&#34;, fileType: &#34;&#34;, fileUrl: &#34;&#34;, } } |
| GetUploadFileByAgreementId | [.chorus.fcm.agreement.upload.v1.GetUploadFileByAgreementIdRequest](#chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdRequest) | [.chorus.fcm.agreement.upload.v1.GetUploadFileByAgreementIdResponse](#chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdResponse) |  Get upload file by id Request: { &#34;agreementId&#34;: &#34;a72d2c8b-de1b-48c8-bb1e-6ab46b3b3488&#34; }<br /><br />Response: { &#34;uploads&#34;: [ { id: &#34;id&#34;, objectName: &#34;objectName&#34;, fileName: &#34;fileName&#34;, fileType: &#34;fileType&#34;, fileUrl: &#34;fileUrl&#34;, } ] } |

 



<a name="chorus_fcm_agreement_upload_v1_upload-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/agreement/upload/v1/upload.proto



<a name="chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdRequest"></a>

### GetUploadFileByAgreementIdRequest
Request message for `UploadService.GetUploadFileByAgreementId`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| agreement_id | [string](#string) |  | The upload information list |






<a name="chorus-fcm-agreement-upload-v1-GetUploadFileByAgreementIdResponse"></a>

### GetUploadFileByAgreementIdResponse
Response message for `UploadService.GetUploadFileByAgreementId`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uploads | [chorus.fcm.base.upload.v1.UploadFile](#chorus-fcm-base-upload-v1-UploadFile) | repeated | The upload information list |






<a name="chorus-fcm-agreement-upload-v1-GetUploadFileByIdRequest"></a>

### GetUploadFileByIdRequest
Request message for `UploadService.GetUploadFileById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The upload information list |






<a name="chorus-fcm-agreement-upload-v1-GetUploadFileByIdResponse"></a>

### GetUploadFileByIdResponse
Response message for `UploadService.GetUploadFileById`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| upload | [chorus.fcm.base.upload.v1.UploadFile](#chorus-fcm-base-upload-v1-UploadFile) |  | The upload information list |






<a name="chorus-fcm-agreement-upload-v1-RequestUpload"></a>

### RequestUpload
Upload information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| object_name | [string](#string) |  | The object_name is generate name |
| file_name | [string](#string) |  | The file_name is original name |
| file_type | [string](#string) |  | The file_type is mime type |
| file_url | [string](#string) |  | The file_url is path on Storage |






<a name="chorus-fcm-agreement-upload-v1-SaveUploadFileRequest"></a>

### SaveUploadFileRequest
Request message for `UploadService.SaveUploadFile`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uploads | [RequestUpload](#chorus-fcm-agreement-upload-v1-RequestUpload) | repeated | The upload information list |






<a name="chorus-fcm-agreement-upload-v1-SaveUploadFileResponse"></a>

### SaveUploadFileResponse
Response message for `UploadService.SaveUploadFile`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| uploads | [chorus.fcm.base.upload.v1.UploadFile](#chorus-fcm-base-upload-v1-UploadFile) | repeated | The upload information list |





 

 

 

 



<a name="chorus_fcm_base_office_v1_office-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/base/office/v1/office.proto



<a name="chorus-fcm-base-office-v1-OfficeModel"></a>

### OfficeModel
Office Information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_code | [string](#string) |  | The office_code is office code |
| name | [string](#string) |  | The name is a office name |
| parent_office_code | [string](#string) |  | The parent_office_code is a office parent |
| office_type | [string](#string) |  | The office_type is a office type |





 

 

 

 



<a name="chorus_fcm_base_paging_v1_paging-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/base/paging/v1/paging.proto



<a name="chorus-fcm-base-paging-v1-PagingModel"></a>

### PagingModel
Paing Information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| item_count | [int32](#int32) |  | The item_count is item count |
| total_items | [int32](#int32) | optional | The total_items is total item |
| items_per_page | [int32](#int32) |  | The items_per_page is items per page |
| total_pages | [int32](#int32) | optional | The total_pages is total page |
| current_page | [int32](#int32) |  | The current_page is current page |





 

 

 

 



<a name="chorus_fcm_base_upload_v1_upload-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/fcm/base/upload/v1/upload.proto



<a name="chorus-fcm-base-upload-v1-UploadFile"></a>

### UploadFile
Upload File Information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The object_name is generate name |
| object_name | [string](#string) |  | The object_name is generate name |
| file_name | [string](#string) |  | The file_name is original name |
| file_type | [string](#string) |  | The file_type is mime type |
| file_url | [string](#string) |  | The file_url is path on Storage |
| active | [bool](#bool) |  | The active is active of document |





 

 

 

 



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

