# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [base/v1/base.proto](#base_v1_base-proto)
    - [Id](#chorus-spm-base-v1-Id)
    - [PaginationRequest](#chorus-spm-base-v1-PaginationRequest)
    - [PaginationResponse](#chorus-spm-base-v1-PaginationResponse)
    - [Query](#chorus-spm-base-v1-Query)
    - [Sort](#chorus-spm-base-v1-Sort)
  
    - [Sort.SortEnum](#chorus-spm-base-v1-Sort-SortEnum)
  
- [user/v1/user.proto](#user_v1_user-proto)
    - [User](#chorus-spm-user-v1-User)
    - [UserFullName](#chorus-spm-user-v1-UserFullName)
    - [UserInfo](#chorus-spm-user-v1-UserInfo)
    - [UserRequest](#chorus-spm-user-v1-UserRequest)
    - [UserResponse](#chorus-spm-user-v1-UserResponse)
    - [UsersServiceFindByIdRequest](#chorus-spm-user-v1-UsersServiceFindByIdRequest)
    - [UsersServiceFindByIdResponse](#chorus-spm-user-v1-UsersServiceFindByIdResponse)
    - [UsersServiceFindOneRequest](#chorus-spm-user-v1-UsersServiceFindOneRequest)
    - [UsersServiceFindOneResponse](#chorus-spm-user-v1-UsersServiceFindOneResponse)
  
    - [UsersService](#chorus-spm-user-v1-UsersService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="base_v1_base-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## base/v1/base.proto



<a name="chorus-spm-base-v1-Id"></a>

### Id
Message to represent an identifier.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The unique identifier. |






<a name="chorus-spm-base-v1-PaginationRequest"></a>

### PaginationRequest
Message to specify pagination request parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| limit | [int32](#int32) | optional | Maximum number of items to return per page. |
| page | [int32](#int32) | optional | Page number to retrieve. |






<a name="chorus-spm-base-v1-PaginationResponse"></a>

### PaginationResponse
Message to provide pagination response details.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| page | [int32](#int32) |  | Current page number. |
| limit | [int32](#int32) |  | Maximum items per page. |
| total_page | [int32](#int32) |  | Total number of pages. |
| total | [int32](#int32) |  | Total number of items. |






<a name="chorus-spm-base-v1-Query"></a>

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






<a name="chorus-spm-base-v1-Sort"></a>

### Sort
Message to define a sorting criteria.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| field | [string](#string) |  | The name of the field to sort by. |
| order | [Sort.SortEnum](#chorus-spm-base-v1-Sort-SortEnum) |  | The sorting order (ASC or DESC). |





 


<a name="chorus-spm-base-v1-Sort-SortEnum"></a>

### Sort.SortEnum
Enumeration for specifying sorting order.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SORT_ENUM_ASC_UNSPECIFIED | 0 | Ascending order. |
| SORT_ENUM_DESC | 1 | Descending order. |


 

 

 



<a name="user_v1_user-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## user/v1/user.proto



<a name="chorus-spm-user-v1-User"></a>

### User
Definition of the User message representing user data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the user. |
| email | [string](#string) |  | Email address of the user. |
| password | [string](#string) |  | User&#39;s password (should be securely hashed in practice). |
| role | [string](#string) |  | Role of the user in the system. |






<a name="chorus-spm-user-v1-UserFullName"></a>

### UserFullName
Message containing user&#39;s full name.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| first_name | [string](#string) |  | First name of the user. |
| last_name | [string](#string) |  | Last name of the user. |






<a name="chorus-spm-user-v1-UserInfo"></a>

### UserInfo
Message containing essential user information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the user. |
| role | [string](#string) |  | Role of the user in the system. |






<a name="chorus-spm-user-v1-UserRequest"></a>

### UserRequest
Message used for making requests related to user data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | Email address used for authentication and identification. |
| password | [string](#string) |  | User&#39;s password for authentication. |
| token | [string](#string) |  | Token used for authorization (if applicable). |
| role | [string](#string) |  | Role of the user in the system. |






<a name="chorus-spm-user-v1-UserResponse"></a>

### UserResponse
Response message containing user data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the user. |
| role | [string](#string) |  | Role of the user in the system. |
| email | [string](#string) |  | Email address of the user. |
| first_mame | [string](#string) | optional | Optional first name of the user. |
| last_name | [string](#string) | optional | Optional last name of the user. |






<a name="chorus-spm-user-v1-UsersServiceFindByIdRequest"></a>

### UsersServiceFindByIdRequest
UsersServiceFindByIdRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | id chorus.spm.base.v1.Id id = 1; |






<a name="chorus-spm-user-v1-UsersServiceFindByIdResponse"></a>

### UsersServiceFindByIdResponse
UsersServiceFindByIdResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the user. |
| email | [string](#string) |  | Email address of the user. |
| password | [string](#string) |  | User&#39;s password (should be securely hashed in practice). |
| role | [string](#string) |  | Role of the user in the system. |






<a name="chorus-spm-user-v1-UsersServiceFindOneRequest"></a>

### UsersServiceFindOneRequest
Message used for carrying user payload (email and password) in requests.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email | [string](#string) |  | Email address used for authentication. |
| password | [string](#string) |  | User&#39;s password for authentication. |






<a name="chorus-spm-user-v1-UsersServiceFindOneResponse"></a>

### UsersServiceFindOneResponse
UsersServiceFindOneResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Unique identifier for the user. |
| email | [string](#string) |  | Email address of the user. |
| password | [string](#string) |  | User&#39;s password (should be securely hashed in practice). |
| role | [string](#string) |  | Role of the user in the system. |





 

 

 


<a name="chorus-spm-user-v1-UsersService"></a>

### UsersService
Service definition for user-related operations.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| FindById | [UsersServiceFindByIdRequest](#chorus-spm-user-v1-UsersServiceFindByIdRequest) | [UsersServiceFindByIdResponse](#chorus-spm-user-v1-UsersServiceFindByIdResponse) | RPC method to find a user by their unique ID. |
| FindOne | [UsersServiceFindOneRequest](#chorus-spm-user-v1-UsersServiceFindOneRequest) | [UsersServiceFindOneResponse](#chorus-spm-user-v1-UsersServiceFindOneResponse) | RPC method to find a user by a user payload (email and password). |

 



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

