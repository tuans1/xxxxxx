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

- [chorus/mdm/account/v1/account.proto](#chorus_mdm_account_v1_account-proto)
    - [Account](#chorus-mdm-account-v1-Account)
    - [AccountCode](#chorus-mdm-account-v1-AccountCode)
    - [GetAccountsByCodesRequest](#chorus-mdm-account-v1-GetAccountsByCodesRequest)
    - [GetAccountsByCodesResponse](#chorus-mdm-account-v1-GetAccountsByCodesResponse)
    - [SearchAccountsByNameRequest](#chorus-mdm-account-v1-SearchAccountsByNameRequest)
    - [SearchAccountsByNameResponse](#chorus-mdm-account-v1-SearchAccountsByNameResponse)
  
    - [AccountInfoService](#chorus-mdm-account-v1-AccountInfoService)
  
- [chorus/mdm/activity/v1/activity.proto](#chorus_mdm_activity_v1_activity-proto)
    - [Activity](#chorus-mdm-activity-v1-Activity)
    - [ActivityCode](#chorus-mdm-activity-v1-ActivityCode)
    - [GetActivitiesByCodesRequest](#chorus-mdm-activity-v1-GetActivitiesByCodesRequest)
    - [GetActivitiesByCodesResponse](#chorus-mdm-activity-v1-GetActivitiesByCodesResponse)
  
    - [ActivityInfoService](#chorus-mdm-activity-v1-ActivityInfoService)
  
- [chorus/mdm/base/v1/base.proto](#chorus_mdm_base_v1_base-proto)
    - [Option](#chorus-mdm-base-v1-Option)
    - [OrderBy](#chorus-mdm-base-v1-OrderBy)
    - [Pagination](#chorus-mdm-base-v1-Pagination)
  
    - [SortBy](#chorus-mdm-base-v1-SortBy)
  
- [chorus/mdm/carrier/v1/carrier.proto](#chorus_mdm_carrier_v1_carrier-proto)
    - [Carrier](#chorus-mdm-carrier-v1-Carrier)
    - [CarrierCode](#chorus-mdm-carrier-v1-CarrierCode)
    - [GetCarriersByCarrierCodesRequest](#chorus-mdm-carrier-v1-GetCarriersByCarrierCodesRequest)
    - [GetCarriersByCarrierCodesResponse](#chorus-mdm-carrier-v1-GetCarriersByCarrierCodesResponse)
    - [SearchCarriersByCarrierNameRequest](#chorus-mdm-carrier-v1-SearchCarriersByCarrierNameRequest)
    - [SearchCarriersByCarrierNameResponse](#chorus-mdm-carrier-v1-SearchCarriersByCarrierNameResponse)
  
    - [CarrierInfoService](#chorus-mdm-carrier-v1-CarrierInfoService)
  
- [chorus/mdm/charge/v1/charge.proto](#chorus_mdm_charge_v1_charge-proto)
    - [Charge](#chorus-mdm-charge-v1-Charge)
    - [ChargeCode](#chorus-mdm-charge-v1-ChargeCode)
    - [GetChargesByChargeCodesRequest](#chorus-mdm-charge-v1-GetChargesByChargeCodesRequest)
    - [GetChargesByChargeCodesResponse](#chorus-mdm-charge-v1-GetChargesByChargeCodesResponse)
    - [SearchChargesByNameRequest](#chorus-mdm-charge-v1-SearchChargesByNameRequest)
    - [SearchChargesByNameResponse](#chorus-mdm-charge-v1-SearchChargesByNameResponse)
  
    - [ChargeInfoService](#chorus-mdm-charge-v1-ChargeInfoService)
  
- [chorus/mdm/commodity/v1/commodity.proto](#chorus_mdm_commodity_v1_commodity-proto)
    - [Commodity](#chorus-mdm-commodity-v1-Commodity)
    - [CommodityCode](#chorus-mdm-commodity-v1-CommodityCode)
    - [GetCommoditiesByCodesRequest](#chorus-mdm-commodity-v1-GetCommoditiesByCodesRequest)
    - [GetCommoditiesByCodesResponse](#chorus-mdm-commodity-v1-GetCommoditiesByCodesResponse)
    - [SearchCommoditiesByNameRequest](#chorus-mdm-commodity-v1-SearchCommoditiesByNameRequest)
    - [SearchCommoditiesByNameResponse](#chorus-mdm-commodity-v1-SearchCommoditiesByNameResponse)
  
    - [CommodityInfoService](#chorus-mdm-commodity-v1-CommodityInfoService)
  
- [chorus/mdm/container_size/v1/container_size.proto](#chorus_mdm_container_size_v1_container_size-proto)
    - [ContainerSize](#chorus-mdm-container_size-v1-ContainerSize)
    - [GetContainerSizesResponse](#chorus-mdm-container_size-v1-GetContainerSizesResponse)
  
    - [ContainerSizeInfoService](#chorus-mdm-container_size-v1-ContainerSizeInfoService)
  
- [chorus/mdm/container_type_size/v1/container_type_size.proto](#chorus_mdm_container_type_size_v1_container_type_size-proto)
    - [ContainerTypeSize](#chorus-mdm-container_type_size-v1-ContainerTypeSize)
    - [GetContainerTypeSizesResponse](#chorus-mdm-container_type_size-v1-GetContainerTypeSizesResponse)
  
    - [ContainerTypeSizeInfoService](#chorus-mdm-container_type_size-v1-ContainerTypeSizeInfoService)
  
- [chorus/mdm/container_type/v1/container_type.proto](#chorus_mdm_container_type_v1_container_type-proto)
    - [ContainerType](#chorus-mdm-container_type-v1-ContainerType)
    - [GetContainerTypesResponse](#chorus-mdm-container_type-v1-GetContainerTypesResponse)
  
    - [ContainerTypeInfoService](#chorus-mdm-container_type-v1-ContainerTypeInfoService)
  
- [chorus/mdm/container_vendor_classification/v1/container_vendor_classification.proto](#chorus_mdm_container_vendor_classification_v1_container_vendor_classification-proto)
    - [ContainerVendorClassification](#chorus-mdm-container_vendor_classification-v1-ContainerVendorClassification)
    - [GetContainerVendorClassificationsBySequencesRequest](#chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesRequest)
    - [GetContainerVendorClassificationsBySequencesResponse](#chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesResponse)
    - [VendorSequence](#chorus-mdm-container_vendor_classification-v1-VendorSequence)
  
    - [ContainerVendorClassificationInfoService](#chorus-mdm-container_vendor_classification-v1-ContainerVendorClassificationInfoService)
  
- [chorus/mdm/continent/v1/continent.proto](#chorus_mdm_continent_v1_continent-proto)
    - [Continent](#chorus-mdm-continent-v1-Continent)
    - [ContinentCode](#chorus-mdm-continent-v1-ContinentCode)
    - [GetContinentsByCodesRequest](#chorus-mdm-continent-v1-GetContinentsByCodesRequest)
    - [GetContinentsByCodesResponse](#chorus-mdm-continent-v1-GetContinentsByCodesResponse)
    - [GetContinentsResponse](#chorus-mdm-continent-v1-GetContinentsResponse)
    - [SearchContinentsByNameRequest](#chorus-mdm-continent-v1-SearchContinentsByNameRequest)
    - [SearchContinentsByNameResponse](#chorus-mdm-continent-v1-SearchContinentsByNameResponse)
  
    - [ContinentInfoService](#chorus-mdm-continent-v1-ContinentInfoService)
  
- [chorus/mdm/country/v1/country.proto](#chorus_mdm_country_v1_country-proto)
    - [Country](#chorus-mdm-country-v1-Country)
    - [CountryCode](#chorus-mdm-country-v1-CountryCode)
    - [GetCountriesByCodesRequest](#chorus-mdm-country-v1-GetCountriesByCodesRequest)
    - [GetCountriesByCodesResponse](#chorus-mdm-country-v1-GetCountriesByCodesResponse)
    - [GetCountriesResponse](#chorus-mdm-country-v1-GetCountriesResponse)
    - [SearchCountriesByNameRequest](#chorus-mdm-country-v1-SearchCountriesByNameRequest)
    - [SearchCountriesByNameResponse](#chorus-mdm-country-v1-SearchCountriesByNameResponse)
  
    - [CountryInfoService](#chorus-mdm-country-v1-CountryInfoService)
  
- [chorus/mdm/credit_customer_contract/v1/credit_customer_contract.proto](#chorus_mdm_credit_customer_contract_v1_credit_customer_contract-proto)
    - [CreditCustomerContract](#chorus-mdm-credit_customer_contract-v1-CreditCustomerContract)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_contract-v1-CustomerCountryCodeAndSequence)
    - [GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest)
    - [GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse)
  
    - [CreditCustomerContractInfoService](#chorus-mdm-credit_customer_contract-v1-CreditCustomerContractInfoService)
  
- [chorus/mdm/credit_customer_relation/v1/credit_customer_relation.proto](#chorus_mdm_credit_customer_relation_v1_credit_customer_relation-proto)
    - [CreditCustomerRelation](#chorus-mdm-credit_customer_relation-v1-CreditCustomerRelation)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_relation-v1-CustomerCountryCodeAndSequence)
    - [GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest)
    - [GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse)
  
    - [CreditCustomerRelationInfoService](#chorus-mdm-credit_customer_relation-v1-CreditCustomerRelationInfoService)
  
- [chorus/mdm/credit_customer_term/v1/credit_customer_term.proto](#chorus_mdm_credit_customer_term_v1_credit_customer_term-proto)
    - [CreditCustomerTerm](#chorus-mdm-credit_customer_term-v1-CreditCustomerTerm)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_term-v1-CustomerCountryCodeAndSequence)
    - [GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest)
    - [GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse)
  
    - [CreditCustomerTermInfoService](#chorus-mdm-credit_customer_term-v1-CreditCustomerTermInfoService)
  
- [chorus/mdm/credit_customer/v1/credit_customer.proto](#chorus_mdm_credit_customer_v1_credit_customer-proto)
    - [CreditCustomer](#chorus-mdm-credit_customer-v1-CreditCustomer)
    - [CreditCustomerCode](#chorus-mdm-credit_customer-v1-CreditCustomerCode)
    - [GetCreditCustomersByCreditCustomerCodesRequest](#chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesRequest)
    - [GetCreditCustomersByCreditCustomerCodesResponse](#chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesResponse)
    - [SearchCreditCustomersByMultipleFieldsRequest](#chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsRequest)
    - [SearchCreditCustomersByMultipleFieldsResponse](#chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsResponse)
  
    - [CreditCustomerInfoService](#chorus-mdm-credit_customer-v1-CreditCustomerInfoService)
  
- [chorus/mdm/currency/v1/currency.proto](#chorus_mdm_currency_v1_currency-proto)
    - [Currency](#chorus-mdm-currency-v1-Currency)
    - [CurrencyCode](#chorus-mdm-currency-v1-CurrencyCode)
    - [GetCurrenciesByCodesRequest](#chorus-mdm-currency-v1-GetCurrenciesByCodesRequest)
    - [GetCurrenciesByCodesResponse](#chorus-mdm-currency-v1-GetCurrenciesByCodesResponse)
    - [GetCurrenciesResponse](#chorus-mdm-currency-v1-GetCurrenciesResponse)
    - [SearchCurrenciesByNameRequest](#chorus-mdm-currency-v1-SearchCurrenciesByNameRequest)
    - [SearchCurrenciesByNameResponse](#chorus-mdm-currency-v1-SearchCurrenciesByNameResponse)
  
    - [CurrencyInfoService](#chorus-mdm-currency-v1-CurrencyInfoService)
  
- [chorus/mdm/customer_address/v1/customer_address.proto](#chorus_mdm_customer_address_v1_customer_address-proto)
    - [CustomerAddress](#chorus-mdm-customer_address-v1-CustomerAddress)
    - [CustomerAddressCode](#chorus-mdm-customer_address-v1-CustomerAddressCode)
    - [GetCustomerAddressesByCustomerAddressCodesRequest](#chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesRequest)
    - [GetCustomerAddressesByCustomerAddressCodesResponse](#chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesResponse)
    - [SearchCustomerAddressesByBusinessEntityNameRequest](#chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameRequest)
    - [SearchCustomerAddressesByBusinessEntityNameResponse](#chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameResponse)
  
    - [CustomerAddressInfoService](#chorus-mdm-customer_address-v1-CustomerAddressInfoService)
  
- [chorus/mdm/customer_contact_point/v1/customer_contact_point.proto](#chorus_mdm_customer_contact_point_v1_customer_contact_point-proto)
    - [CustomerContactPoint](#chorus-mdm-customer_contact_point-v1-CustomerContactPoint)
    - [CustomerContactPointCodeAndSequence](#chorus-mdm-customer_contact_point-v1-CustomerContactPointCodeAndSequence)
    - [GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest)
    - [GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse)
    - [SearchCustomerContactPointsByCustomerEmailRequest](#chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailRequest)
    - [SearchCustomerContactPointsByCustomerEmailResponse](#chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailResponse)
  
    - [CustomerContactPointInfoService](#chorus-mdm-customer_contact_point-v1-CustomerContactPointInfoService)
  
- [chorus/mdm/customer_fmc_loa_esignature/v1/customer_fmc_loa_esignature.proto](#chorus_mdm_customer_fmc_loa_esignature_v1_customer_fmc_loa_esignature-proto)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-customer_fmc_loa_esignature-v1-CustomerCountryCodeAndSequence)
    - [CustomerFmcLoaEsignature](#chorus-mdm-customer_fmc_loa_esignature-v1-CustomerFmcLoaEsignature)
    - [GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest)
    - [GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse)
  
    - [CustomerFmcLoaEsignatureInfoService](#chorus-mdm-customer_fmc_loa_esignature-v1-CustomerFmcLoaEsignatureInfoService)
  
- [chorus/mdm/customer_fmc_loa/v1/customer_fmc_loa.proto](#chorus_mdm_customer_fmc_loa_v1_customer_fmc_loa-proto)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-customer_fmc_loa-v1-CustomerCountryCodeAndSequence)
    - [CustomerFmcLoa](#chorus-mdm-customer_fmc_loa-v1-CustomerFmcLoa)
    - [GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest)
    - [GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse)
  
    - [CustomerFmcLoaInfoService](#chorus-mdm-customer_fmc_loa-v1-CustomerFmcLoaInfoService)
  
- [chorus/mdm/customer_india_information/v1/customer_india_information.proto](#chorus_mdm_customer_india_information_v1_customer_india_information-proto)
    - [CustomerCountryCodeAndSequence](#chorus-mdm-customer_india_information-v1-CustomerCountryCodeAndSequence)
    - [CustomerIndiaInformation](#chorus-mdm-customer_india_information-v1-CustomerIndiaInformation)
    - [GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest)
    - [GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse)
  
    - [CustomerIndiaInformationInfoService](#chorus-mdm-customer_india_information-v1-CustomerIndiaInformationInfoService)
  
- [chorus/mdm/customer_performance_group/v1/customer_performance_group.proto](#chorus_mdm_customer_performance_group_v1_customer_performance_group-proto)
    - [CustomerGroupId](#chorus-mdm-customer_performance_group-v1-CustomerGroupId)
    - [CustomerPerformanceGroup](#chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroup)
    - [GetCustomerPerformanceGroupsByCustomerGroupIdsRequest](#chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsRequest)
    - [GetCustomerPerformanceGroupsByCustomerGroupIdsResponse](#chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsResponse)
    - [SearchCustomerPerformanceGroupsByCustomerGroupNameRequest](#chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameRequest)
    - [SearchCustomerPerformanceGroupsByCustomerGroupNameResponse](#chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameResponse)
  
    - [CustomerPerformanceGroupInfoService](#chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroupInfoService)
  
- [chorus/mdm/customer/v1/customer.proto](#chorus_mdm_customer_v1_customer-proto)
    - [CountryCodeAndSequence](#chorus-mdm-customer-v1-CountryCodeAndSequence)
    - [Customer](#chorus-mdm-customer-v1-Customer)
    - [CustomerCountryCodeAndCustomerSequenceData](#chorus-mdm-customer-v1-CustomerCountryCodeAndCustomerSequenceData)
    - [CustomerSearchPopup](#chorus-mdm-customer-v1-CustomerSearchPopup)
    - [GetCustomersByCountryCodesAndSequencesRequest](#chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesRequest)
    - [GetCustomersByCountryCodesAndSequencesResponse](#chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesResponse)
    - [SearchCustomersByLegalEnglishNameRequest](#chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameRequest)
    - [SearchCustomersByLegalEnglishNameResponse](#chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameResponse)
    - [SearchCustomersByMultipleFieldsRequest](#chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsRequest)
    - [SearchCustomersByMultipleFieldsResponse](#chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsResponse)
  
    - [CustomerInfoService](#chorus-mdm-customer-v1-CustomerInfoService)
  
- [chorus/mdm/data_change_history/v1/data_change_history.proto](#chorus_mdm_data_change_history_v1_data_change_history-proto)
    - [DataChangeHistory](#chorus-mdm-data_change_history-v1-DataChangeHistory)
    - [GetDataChangeHistoryByTableNamesRequest](#chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesRequest)
    - [GetDataChangeHistoryByTableNamesResponse](#chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesResponse)
    - [TableName](#chorus-mdm-data_change_history-v1-TableName)
  
    - [DataChangeHistoryInfoService](#chorus-mdm-data_change_history-v1-DataChangeHistoryInfoService)
  
- [chorus/mdm/data_process/v1/data_process.proto](#chorus_mdm_data_process_v1_data_process-proto)
    - [DataProcess](#chorus-mdm-data_process-v1-DataProcess)
    - [SearchByRequestNoRequest](#chorus-mdm-data_process-v1-SearchByRequestNoRequest)
    - [SearchByRequestNoResponse](#chorus-mdm-data_process-v1-SearchByRequestNoResponse)
  
    - [DataProcessService](#chorus-mdm-data_process-v1-DataProcessService)
  
- [chorus/mdm/daylight_saving_time/v1/daylight_saving_time.proto](#chorus_mdm_daylight_saving_time_v1_daylight_saving_time-proto)
    - [DaylightSavingTime](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTime)
    - [DaylightSavingTimeCountryCode](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTimeCountryCode)
    - [GetDaylightSavingTimesByCodesRequest](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesRequest)
    - [GetDaylightSavingTimesByCodesResponse](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesResponse)
    - [GetDaylightSavingTimesByInfoRequest](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoRequest)
    - [GetDaylightSavingTimesByInfoResponse](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoResponse)
  
    - [DaylightSavingTimeInfoService](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTimeInfoService)
  
- [chorus/mdm/detail_revenue_lane/v1/detail_revenue_lane.proto](#chorus_mdm_detail_revenue_lane_v1_detail_revenue_lane-proto)
    - [DetailRevenueLane](#chorus-mdm-detail_revenue_lane-v1-DetailRevenueLane)
    - [DetailRevenueLaneMultipleFields](#chorus-mdm-detail_revenue_lane-v1-DetailRevenueLaneMultipleFields)
    - [GetDetailRevenueLanesByMultipleFieldsRequest](#chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsRequest)
    - [GetDetailRevenueLanesByMultipleFieldsResponse](#chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsResponse)
  
    - [DetailRevenueLaneInfoService](#chorus-mdm-detail_revenue_lane-v1-DetailRevenueLaneInfoService)
  
- [chorus/mdm/equipment_organization_chart/v1/equipment_organization_chart.proto](#chorus_mdm_equipment_organization_chart_v1_equipment_organization_chart-proto)
    - [EquipmentOrganizationChart](#chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChart)
    - [GetEquipmentOrganizationChartsByRccCodesRequest](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesRequest)
    - [GetEquipmentOrganizationChartsByRccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesResponse)
    - [GetEquipmentOrganizationChartsBySccCodesRequest](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesRequest)
    - [GetEquipmentOrganizationChartsBySccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesResponse)
    - [GetRccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetRccCodesResponse)
    - [RccCode](#chorus-mdm-equipment_organization_chart-v1-RccCode)
    - [SccCode](#chorus-mdm-equipment_organization_chart-v1-SccCode)
  
    - [EquipmentOrganizationChartInfoService](#chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChartInfoService)
  
- [chorus/mdm/location/v1/location.proto](#chorus_mdm_location_v1_location-proto)
    - [GetLocationsByCodesRequest](#chorus-mdm-location-v1-GetLocationsByCodesRequest)
    - [GetLocationsByCodesResponse](#chorus-mdm-location-v1-GetLocationsByCodesResponse)
    - [Location](#chorus-mdm-location-v1-Location)
    - [LocationCode](#chorus-mdm-location-v1-LocationCode)
    - [LocationSearch](#chorus-mdm-location-v1-LocationSearch)
    - [SccCode](#chorus-mdm-location-v1-SccCode)
    - [SccCodeData](#chorus-mdm-location-v1-SccCodeData)
    - [SearchLocationsByMultipleFieldsRequest](#chorus-mdm-location-v1-SearchLocationsByMultipleFieldsRequest)
    - [SearchLocationsByMultipleFieldsResponse](#chorus-mdm-location-v1-SearchLocationsByMultipleFieldsResponse)
    - [SearchLocationsByNameRequest](#chorus-mdm-location-v1-SearchLocationsByNameRequest)
    - [SearchLocationsByNameResponse](#chorus-mdm-location-v1-SearchLocationsByNameResponse)
  
    - [LocationInfoService](#chorus-mdm-location-v1-LocationInfoService)
  
- [chorus/mdm/movement_status/v1/movement_status.proto](#chorus_mdm_movement_status_v1_movement_status-proto)
    - [GetMovementStatusesByCodesRequest](#chorus-mdm-movement_status-v1-GetMovementStatusesByCodesRequest)
    - [GetMovementStatusesByCodesResponse](#chorus-mdm-movement_status-v1-GetMovementStatusesByCodesResponse)
    - [MovementStatus](#chorus-mdm-movement_status-v1-MovementStatus)
    - [MovementStatusCode](#chorus-mdm-movement_status-v1-MovementStatusCode)
  
    - [MovementStatusInfoService](#chorus-mdm-movement_status-v1-MovementStatusInfoService)
  
- [chorus/mdm/organization/v1/organization.proto](#chorus_mdm_organization_v1_organization-proto)
    - [GetOrganizationsByCodesRequest](#chorus-mdm-organization-v1-GetOrganizationsByCodesRequest)
    - [GetOrganizationsByCodesResponse](#chorus-mdm-organization-v1-GetOrganizationsByCodesResponse)
    - [GetOrganizationsResponse](#chorus-mdm-organization-v1-GetOrganizationsResponse)
    - [OfficeCode](#chorus-mdm-organization-v1-OfficeCode)
    - [Organization](#chorus-mdm-organization-v1-Organization)
    - [SearchOrganizationsByOfficeEnglishNameRequest](#chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameRequest)
    - [SearchOrganizationsByOfficeEnglishNameResponse](#chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameResponse)
  
    - [OrganizationInfoService](#chorus-mdm-organization-v1-OrganizationInfoService)
  
- [chorus/mdm/package_type/v1/package_type.proto](#chorus_mdm_package_type_v1_package_type-proto)
    - [GetPackageTypesByCodesRequest](#chorus-mdm-package_type-v1-GetPackageTypesByCodesRequest)
    - [GetPackageTypesByCodesResponse](#chorus-mdm-package_type-v1-GetPackageTypesByCodesResponse)
    - [PackageCode](#chorus-mdm-package_type-v1-PackageCode)
    - [PackageType](#chorus-mdm-package_type-v1-PackageType)
    - [SearchPackageTypesByNameRequest](#chorus-mdm-package_type-v1-SearchPackageTypesByNameRequest)
    - [SearchPackageTypesByNameResponse](#chorus-mdm-package_type-v1-SearchPackageTypesByNameResponse)
  
    - [PackageTypeInfoService](#chorus-mdm-package_type-v1-PackageTypeInfoService)
  
- [chorus/mdm/partner/v1/partner.proto](#chorus_mdm_partner_v1_partner-proto)
    - [GetVendorContactPointsByVendorSequencesRequest](#chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesRequest)
    - [GetVendorContactPointsByVendorSequencesResponse](#chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesResponse)
    - [VendorCode](#chorus-mdm-partner-v1-VendorCode)
    - [VendorContactPoint](#chorus-mdm-partner-v1-VendorContactPoint)
  
    - [VendorContactPointInfoService](#chorus-mdm-partner-v1-VendorContactPointInfoService)
  
- [chorus/mdm/region/v1/region.proto](#chorus_mdm_region_v1_region-proto)
    - [GetRegionsByCodesRequest](#chorus-mdm-region-v1-GetRegionsByCodesRequest)
    - [GetRegionsByCodesResponse](#chorus-mdm-region-v1-GetRegionsByCodesResponse)
    - [GetRegionsResponse](#chorus-mdm-region-v1-GetRegionsResponse)
    - [Region](#chorus-mdm-region-v1-Region)
    - [RegionCode](#chorus-mdm-region-v1-RegionCode)
    - [SearchRegionsByNameRequest](#chorus-mdm-region-v1-SearchRegionsByNameRequest)
    - [SearchRegionsByNameResponse](#chorus-mdm-region-v1-SearchRegionsByNameResponse)
  
    - [RegionInfoService](#chorus-mdm-region-v1-RegionInfoService)
  
- [chorus/mdm/representative_charge/v1/representative_charge.proto](#chorus_mdm_representative_charge_v1_representative_charge-proto)
    - [GetRepresentativeChargesResponse](#chorus-mdm-representative_charge-v1-GetRepresentativeChargesResponse)
    - [RepresentativeCharge](#chorus-mdm-representative_charge-v1-RepresentativeCharge)
  
    - [RepresentativeChargeInfoService](#chorus-mdm-representative_charge-v1-RepresentativeChargeInfoService)
  
- [chorus/mdm/representative_commodity/v1/representative_commodity.proto](#chorus_mdm_representative_commodity_v1_representative_commodity-proto)
    - [GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest](#chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest)
    - [GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse](#chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse)
    - [RepresentativeCommodity](#chorus-mdm-representative_commodity-v1-RepresentativeCommodity)
    - [RepresentativeCommodityCode](#chorus-mdm-representative_commodity-v1-RepresentativeCommodityCode)
    - [SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest](#chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest)
    - [SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse](#chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse)
  
    - [RepresentativeCommodityInfoService](#chorus-mdm-representative_commodity-v1-RepresentativeCommodityInfoService)
  
- [chorus/mdm/revenue_lane/v1/revenue_lane.proto](#chorus_mdm_revenue_lane_v1_revenue_lane-proto)
    - [GetRevenueLanesByCodesRequest](#chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesRequest)
    - [GetRevenueLanesByCodesResponse](#chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesResponse)
    - [RevenueLane](#chorus-mdm-revenue_lane-v1-RevenueLane)
    - [RevenueLaneCode](#chorus-mdm-revenue_lane-v1-RevenueLaneCode)
  
    - [RevenueLaneInfoService](#chorus-mdm-revenue_lane-v1-RevenueLaneInfoService)
  
- [chorus/mdm/sales_representative/v1/sales_representative.proto](#chorus_mdm_sales_representative_v1_sales_representative-proto)
    - [GetSalesRepresentativesByCodesRequest](#chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesRequest)
    - [GetSalesRepresentativesByCodesResponse](#chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesResponse)
    - [SalesRepresentative](#chorus-mdm-sales_representative-v1-SalesRepresentative)
    - [SalesRepresentativeCode](#chorus-mdm-sales_representative-v1-SalesRepresentativeCode)
    - [SearchSalesRepresentativesByNameRequest](#chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameRequest)
    - [SearchSalesRepresentativesByNameResponse](#chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameResponse)
  
    - [SalesRepresentativeInfoService](#chorus-mdm-sales_representative-v1-SalesRepresentativeInfoService)
  
- [chorus/mdm/service_scope_lane/v1/service_scope_lane.proto](#chorus_mdm_service_scope_lane_v1_service_scope_lane-proto)
    - [GetServiceScopeLanesByServiceScopeCodesRequest](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesRequest)
    - [GetServiceScopeLanesByServiceScopeCodesResponse](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesResponse)
    - [GetServiceScopeLanesByVesselServiceLaneCodesRequest](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesRequest)
    - [GetServiceScopeLanesByVesselServiceLaneCodesResponse](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesResponse)
    - [ServiceScopeCode](#chorus-mdm-service_scope_lane-v1-ServiceScopeCode)
    - [ServiceScopeLane](#chorus-mdm-service_scope_lane-v1-ServiceScopeLane)
    - [VesselServiceLaneCode](#chorus-mdm-service_scope_lane-v1-VesselServiceLaneCode)
  
    - [ServiceScopeLaneInfoService](#chorus-mdm-service_scope_lane-v1-ServiceScopeLaneInfoService)
  
- [chorus/mdm/service_scope_limit_port/v1/service_scope_limit_port.proto](#chorus_mdm_service_scope_limit_port_v1_service_scope_limit_port-proto)
    - [GetServiceScopeLimitPortsByServiceScopeCodesRequest](#chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesRequest)
    - [GetServiceScopeLimitPortsByServiceScopeCodesResponse](#chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesResponse)
    - [ServiceScopeCode](#chorus-mdm-service_scope_limit_port-v1-ServiceScopeCode)
    - [ServiceScopeLimitPort](#chorus-mdm-service_scope_limit_port-v1-ServiceScopeLimitPort)
  
    - [ServiceScopeLimitPortInfoService](#chorus-mdm-service_scope_limit_port-v1-ServiceScopeLimitPortInfoService)
  
- [chorus/mdm/service_scope_limit/v1/service_scope_limit.proto](#chorus_mdm_service_scope_limit_v1_service_scope_limit-proto)
    - [GetServiceScopeLimitsByServiceScopeCodesRequest](#chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesRequest)
    - [GetServiceScopeLimitsByServiceScopeCodesResponse](#chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesResponse)
    - [ServiceScopeCode](#chorus-mdm-service_scope_limit-v1-ServiceScopeCode)
    - [ServiceScopeLimit](#chorus-mdm-service_scope_limit-v1-ServiceScopeLimit)
  
    - [ServiceScopeLimitInfoService](#chorus-mdm-service_scope_limit-v1-ServiceScopeLimitInfoService)
  
- [chorus/mdm/service_scope/v1/service_scope.proto](#chorus_mdm_service_scope_v1_service_scope-proto)
    - [GetServiceScopesByCodesRequest](#chorus-mdm-service_scope-v1-GetServiceScopesByCodesRequest)
    - [GetServiceScopesByCodesResponse](#chorus-mdm-service_scope-v1-GetServiceScopesByCodesResponse)
    - [GetServiceScopesResponse](#chorus-mdm-service_scope-v1-GetServiceScopesResponse)
    - [SearchServiceScopesByNameRequest](#chorus-mdm-service_scope-v1-SearchServiceScopesByNameRequest)
    - [SearchServiceScopesByNameResponse](#chorus-mdm-service_scope-v1-SearchServiceScopesByNameResponse)
    - [ServiceScope](#chorus-mdm-service_scope-v1-ServiceScope)
    - [ServiceScopeCode](#chorus-mdm-service_scope-v1-ServiceScopeCode)
  
    - [ServiceScopeInfoService](#chorus-mdm-service_scope-v1-ServiceScopeInfoService)
  
- [chorus/mdm/state/v1/state.proto](#chorus_mdm_state_v1_state-proto)
    - [GetStatesByCodesRequest](#chorus-mdm-state-v1-GetStatesByCodesRequest)
    - [GetStatesByCodesResponse](#chorus-mdm-state-v1-GetStatesByCodesResponse)
    - [SearchStatesByNameRequest](#chorus-mdm-state-v1-SearchStatesByNameRequest)
    - [SearchStatesByNameResponse](#chorus-mdm-state-v1-SearchStatesByNameResponse)
    - [State](#chorus-mdm-state-v1-State)
    - [StateCode](#chorus-mdm-state-v1-StateCode)
  
    - [StateInfoService](#chorus-mdm-state-v1-StateInfoService)
  
- [chorus/mdm/subcontinent/v1/subcontinent.proto](#chorus_mdm_subcontinent_v1_subcontinent-proto)
    - [GetSubcontinentsByCodesRequest](#chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesRequest)
    - [GetSubcontinentsByCodesResponse](#chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesResponse)
    - [GetSubcontinentsResponse](#chorus-mdm-subcontinent-v1-GetSubcontinentsResponse)
    - [SearchSubcontinentsByNameRequest](#chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameRequest)
    - [SearchSubcontinentsByNameResponse](#chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameResponse)
    - [Subcontinent](#chorus-mdm-subcontinent-v1-Subcontinent)
    - [SubcontinentCode](#chorus-mdm-subcontinent-v1-SubcontinentCode)
  
    - [SubcontinentInfoService](#chorus-mdm-subcontinent-v1-SubcontinentInfoService)
  
- [chorus/mdm/sub_trade/v1/sub_trade.proto](#chorus_mdm_sub_trade_v1_sub_trade-proto)
    - [GetSubTradesBySubTradeCodesRequest](#chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesRequest)
    - [GetSubTradesBySubTradeCodesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesResponse)
    - [GetSubTradesByTradeCodesRequest](#chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesRequest)
    - [GetSubTradesByTradeCodesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesResponse)
    - [GetSubTradesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesResponse)
    - [SubTrade](#chorus-mdm-sub_trade-v1-SubTrade)
    - [SubTradeCode](#chorus-mdm-sub_trade-v1-SubTradeCode)
    - [TradeCode](#chorus-mdm-sub_trade-v1-TradeCode)
  
    - [SubTradeInfoService](#chorus-mdm-sub_trade-v1-SubTradeInfoService)
  
- [chorus/mdm/time_conversion/v1/time_conversion.proto](#chorus_mdm_time_conversion_v1_time_conversion-proto)
    - [GetTimeByLocationInfoRequest](#chorus-mdm-time_conversion-v1-GetTimeByLocationInfoRequest)
    - [GetTimeByLocationInfoResponse](#chorus-mdm-time_conversion-v1-GetTimeByLocationInfoResponse)
    - [GetTimeByOfficeInfoRequest](#chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoRequest)
    - [GetTimeByOfficeInfoResponse](#chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoResponse)
  
    - [TimeConversionService](#chorus-mdm-time_conversion-v1-TimeConversionService)
  
- [chorus/mdm/trade/v1/trade.proto](#chorus_mdm_trade_v1_trade-proto)
    - [GetTradesByCodesRequest](#chorus-mdm-trade-v1-GetTradesByCodesRequest)
    - [GetTradesByCodesResponse](#chorus-mdm-trade-v1-GetTradesByCodesResponse)
    - [GetTradesByNameRequest](#chorus-mdm-trade-v1-GetTradesByNameRequest)
    - [GetTradesByNameResponse](#chorus-mdm-trade-v1-GetTradesByNameResponse)
    - [GetTradesResponse](#chorus-mdm-trade-v1-GetTradesResponse)
    - [Trade](#chorus-mdm-trade-v1-Trade)
    - [TradeCode](#chorus-mdm-trade-v1-TradeCode)
  
    - [TradeInfoService](#chorus-mdm-trade-v1-TradeInfoService)
  
- [chorus/mdm/user_authentication/v1/user_authentication.proto](#chorus_mdm_user_authentication_v1_user_authentication-proto)
    - [SearchUserAuthenticationsByMultipleFieldsRequest](#chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsRequest)
    - [SearchUserAuthenticationsByMultipleFieldsResponse](#chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsResponse)
    - [UserAuthentication](#chorus-mdm-user_authentication-v1-UserAuthentication)
  
    - [UserAuthenticationInfoService](#chorus-mdm-user_authentication-v1-UserAuthenticationInfoService)
  
- [chorus/mdm/vendor_contact_point/v1/vendor_contact_point.proto](#chorus_mdm_vendor_contact_point_v1_vendor_contact_point-proto)
    - [GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest](#chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest)
    - [GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse](#chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse)
    - [VendorContactPoint](#chorus-mdm-vendor_contact_point-v1-VendorContactPoint)
    - [VendorSequenceAndPrimaryCheckFlag](#chorus-mdm-vendor_contact_point-v1-VendorSequenceAndPrimaryCheckFlag)
  
    - [VendorContactPointInfoService](#chorus-mdm-vendor_contact_point-v1-VendorContactPointInfoService)
  
- [chorus/mdm/vendor_india_information/v1/vendor_india_information.proto](#chorus_mdm_vendor_india_information_v1_vendor_india_information-proto)
    - [GetVendorIndiaInformationBySequencesRequest](#chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesRequest)
    - [GetVendorIndiaInformationBySequencesResponse](#chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesResponse)
    - [VendorIndiaInformation](#chorus-mdm-vendor_india_information-v1-VendorIndiaInformation)
    - [VendorSequence](#chorus-mdm-vendor_india_information-v1-VendorSequence)
  
    - [VendorIndiaInformationInfoService](#chorus-mdm-vendor_india_information-v1-VendorIndiaInformationInfoService)
  
- [chorus/mdm/vendor/v1/vendor.proto](#chorus_mdm_vendor_v1_vendor-proto)
    - [CountryCodeAndSequence](#chorus-mdm-vendor-v1-CountryCodeAndSequence)
    - [GetVendorsByCountryCodesAndSequencesRequest](#chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesRequest)
    - [GetVendorsByCountryCodesAndSequencesResponse](#chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesResponse)
    - [SearchVendorsBySequenceOrLegalEnglishNameRequest](#chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameRequest)
    - [SearchVendorsBySequenceOrLegalEnglishNameResponse](#chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameResponse)
    - [Vendor](#chorus-mdm-vendor-v1-Vendor)
  
    - [VendorInfoService](#chorus-mdm-vendor-v1-VendorInfoService)
  
- [chorus/mdm/vessel_container/v1/vessel_container.proto](#chorus_mdm_vessel_container_v1_vessel_container-proto)
    - [GetVesselContainersByVesselCodesRequest](#chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesRequest)
    - [GetVesselContainersByVesselCodesResponse](#chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesResponse)
    - [SearchVesselContainersByMultipleFieldsRequest](#chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsRequest)
    - [SearchVesselContainersByMultipleFieldsResponse](#chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsResponse)
    - [SearchVesselContainersByVesselEnglishNameRequest](#chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameRequest)
    - [SearchVesselContainersByVesselEnglishNameResponse](#chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameResponse)
    - [VesselCode](#chorus-mdm-vessel_container-v1-VesselCode)
    - [VesselContainer](#chorus-mdm-vessel_container-v1-VesselContainer)
    - [VesselContainerMultipleSearch](#chorus-mdm-vessel_container-v1-VesselContainerMultipleSearch)
  
    - [VesselContainerInfoService](#chorus-mdm-vessel_container-v1-VesselContainerInfoService)
  
- [chorus/mdm/vessel_service_lane_additional/v1/vessel_service_lane_additional.proto](#chorus_mdm_vessel_service_lane_additional_v1_vessel_service_lane_additional-proto)
    - [GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest](#chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest)
    - [GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse](#chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse)
    - [VesselServiceLaneAdditional](#chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneAdditional)
    - [VesselServiceLaneCode](#chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneCode)
  
    - [VesselServiceLaneAdditionalInfoService](#chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneAdditionalInfoService)
  
- [chorus/mdm/vessel_service_lane/v1/vessel_service_lane.proto](#chorus_mdm_vessel_service_lane_v1_vessel_service_lane-proto)
    - [GetVesselServiceLanesByCodesRequest](#chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesRequest)
    - [GetVesselServiceLanesByCodesResponse](#chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesResponse)
    - [SearchVesselServiceLanesByMultipleFieldsRequest](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsRequest)
    - [SearchVesselServiceLanesByMultipleFieldsResponse](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsResponse)
    - [SearchVesselServiceLanesByNameRequest](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameRequest)
    - [SearchVesselServiceLanesByNameResponse](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameResponse)
    - [VesselServiceLane](#chorus-mdm-vessel_service_lane-v1-VesselServiceLane)
    - [VesselServiceLaneCode](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneCode)
    - [VesselServiceLaneDirection](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneDirection)
    - [VesselServiceLaneInfo](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneInfo)
  
    - [VesselServiceLaneInfoService](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneInfoService)
  
- [chorus/mdm/vessel/v1/vessel.proto](#chorus_mdm_vessel_v1_vessel-proto)
    - [GetVesselsByCodesRequest](#chorus-mdm-vessel-v1-GetVesselsByCodesRequest)
    - [GetVesselsByCodesResponse](#chorus-mdm-vessel-v1-GetVesselsByCodesResponse)
    - [SearchVesselsByEnglishNameRequest](#chorus-mdm-vessel-v1-SearchVesselsByEnglishNameRequest)
    - [SearchVesselsByEnglishNameResponse](#chorus-mdm-vessel-v1-SearchVesselsByEnglishNameResponse)
    - [Vessel](#chorus-mdm-vessel-v1-Vessel)
    - [VesselCode](#chorus-mdm-vessel-v1-VesselCode)
  
    - [VesselInfoService](#chorus-mdm-vessel-v1-VesselInfoService)
  
- [chorus/mdm/yard/v1/yard.proto](#chorus_mdm_yard_v1_yard-proto)
    - [GetYardsByCodesRequest](#chorus-mdm-yard-v1-GetYardsByCodesRequest)
    - [GetYardsByCodesResponse](#chorus-mdm-yard-v1-GetYardsByCodesResponse)
    - [SearchYardByMultipleFieldsRequest](#chorus-mdm-yard-v1-SearchYardByMultipleFieldsRequest)
    - [SearchYardByMultipleFieldsResponse](#chorus-mdm-yard-v1-SearchYardByMultipleFieldsResponse)
    - [SearchYardsByNameRequest](#chorus-mdm-yard-v1-SearchYardsByNameRequest)
    - [SearchYardsByNameResponse](#chorus-mdm-yard-v1-SearchYardsByNameResponse)
    - [Yard](#chorus-mdm-yard-v1-Yard)
    - [YardCode](#chorus-mdm-yard-v1-YardCode)
    - [YardSearchPopup](#chorus-mdm-yard-v1-YardSearchPopup)
  
    - [YardInfoService](#chorus-mdm-yard-v1-YardInfoService)
  
- [chorus/mdm/zone_detail/v1/zone_detail.proto](#chorus_mdm_zone_detail_v1_zone_detail-proto)
    - [GetZoneDetailsByZoneCodesRequest](#chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesRequest)
    - [GetZoneDetailsByZoneCodesResponse](#chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesResponse)
    - [ZoneDetail](#chorus-mdm-zone_detail-v1-ZoneDetail)
    - [ZoneDetailCode](#chorus-mdm-zone_detail-v1-ZoneDetailCode)
  
    - [ZoneDetailInfoService](#chorus-mdm-zone_detail-v1-ZoneDetailInfoService)
  
- [chorus/mdm/zone/v1/zone.proto](#chorus_mdm_zone_v1_zone-proto)
    - [GetZonesByCodesRequest](#chorus-mdm-zone-v1-GetZonesByCodesRequest)
    - [GetZonesByCodesResponse](#chorus-mdm-zone-v1-GetZonesByCodesResponse)
    - [SearchZoneByMultipleFieldsRequest](#chorus-mdm-zone-v1-SearchZoneByMultipleFieldsRequest)
    - [SearchZoneByMultipleFieldsResponse](#chorus-mdm-zone-v1-SearchZoneByMultipleFieldsResponse)
    - [SearchZonesByNameRequest](#chorus-mdm-zone-v1-SearchZonesByNameRequest)
    - [SearchZonesByNameResponse](#chorus-mdm-zone-v1-SearchZonesByNameResponse)
    - [Zone](#chorus-mdm-zone-v1-Zone)
    - [ZoneCode](#chorus-mdm-zone-v1-ZoneCode)
    - [ZoneSearchPopup](#chorus-mdm-zone-v1-ZoneSearchPopup)
  
    - [ZoneInfoService](#chorus-mdm-zone-v1-ZoneInfoService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="chorus_mdm_account_v1_account-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/account/v1/account.proto



<a name="chorus-mdm-account-v1-Account"></a>

### Account
The account information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_code | [string](#string) |  | The account_code is the code of the account. acct_cd in OPUS. |
| account_english_name | [string](#string) |  | The account_english_name is the english name of the account. acct_eng_cd in OPUS. |






<a name="chorus-mdm-account-v1-AccountCode"></a>

### AccountCode
The account code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_code | [string](#string) |  | The code of the account. |






<a name="chorus-mdm-account-v1-GetAccountsByCodesRequest"></a>

### GetAccountsByCodesRequest
Request message for `AccountInfoService.GetAccountsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_code_list | [AccountCode](#chorus-mdm-account-v1-AccountCode) | repeated | The account code list. |






<a name="chorus-mdm-account-v1-GetAccountsByCodesResponse"></a>

### GetAccountsByCodesResponse
Response message for `AccountInfoService.GetAccountsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account | [Account](#chorus-mdm-account-v1-Account) |  | The account information. |






<a name="chorus-mdm-account-v1-SearchAccountsByNameRequest"></a>

### SearchAccountsByNameRequest
Request message for `AccountInfoService.SearchAccountsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account_english_name | [string](#string) |  | The account name. |






<a name="chorus-mdm-account-v1-SearchAccountsByNameResponse"></a>

### SearchAccountsByNameResponse
Response message for `AccountInfoService.SearchAccountsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account | [Account](#chorus-mdm-account-v1-Account) |  | The account information. |





 

 

 


<a name="chorus-mdm-account-v1-AccountInfoService"></a>

### AccountInfoService
Services for account.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetAccountsByCodes | [GetAccountsByCodesRequest](#chorus-mdm-account-v1-GetAccountsByCodesRequest) | [GetAccountsByCodesResponse](#chorus-mdm-account-v1-GetAccountsByCodesResponse) stream | Get list of accounts by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;account_code_list&#34;: [ { &#34;account_code&#34;: &#34;11501021&#34; } ] }<br /><br />Response: { &#34;account&#34;: { &#34;account_code&#34;: &#34;11501021&#34;, &#34;account_english_name&#34;: &#34;PREPAYMENTS-EXPENSE FOR CANAL TRANSIT FOR ACCRUAL&#34; } } ... |
| SearchAccountsByName | [SearchAccountsByNameRequest](#chorus-mdm-account-v1-SearchAccountsByNameRequest) | [SearchAccountsByNameResponse](#chorus-mdm-account-v1-SearchAccountsByNameResponse) stream | Search list of accounts by names.<br /><br />Operation: LIKE<br /><br />Request: { &#34;account_english_name&#34;: &#34;PAY&#34; }<br /><br />Response: { &#34;account&#34;: { &#34;account_code&#34;: &#34;11501021&#34;, &#34;account_english_name&#34;: &#34;PREPAYMENTS-EXPENSE FOR CANAL TRANSIT FOR ACCRUAL&#34; } } ... |

 



<a name="chorus_mdm_activity_v1_activity-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/activity/v1/activity.proto



<a name="chorus-mdm-activity-v1-Activity"></a>

### Activity
The activity information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| activity_code | [string](#string) |  | The activity_code is the code of Activity. act_cd in OPUS |
| activity_name | [string](#string) |  | The activity_name is the name of Activity. act_nm in OPUS |
| activity_desc | [string](#string) |  | The activity description. act_desc in OPUS |
| activity_type_code | [string](#string) |  | The type_code of activity. act_tp_cd in OPUS |
| full_empty_code | [string](#string) |  | The full empty code of activity. full_mty_cd in OPUS |
| bound_vessel_schedule_seq_code | [string](#string) |  | The bound vessel schedule sequence code. bnb_vskd_seq_cd in OPUS |
| node_type_code | [string](#string) |  | The node type code. nod_tp_cd in OPUS |
| activity_operation_type_code | [string](#string) |  | The activity operation type code. act_op_tp_cd in OPUS |
| transport_mode_code | [string](#string) |  | The transport mode code. trsp_mod_cd in OPUS |
| origin_destination_code | [string](#string) |  | The origin destination code. org_dest_cd in OPUS |
| active_flag | [string](#string) |  | The active flag. act_flg in OPUS |
| activity_status_mapping_code | [string](#string) |  | The activity status mapping code. act_sts_mapg_cd in OPUS |
| activity_standard_edi_status_code | [string](#string) |  | The activity standard edi status code. act_stnd_edi_sts_cd in OPUS |
| basic_visibility_flg | [string](#string) |  | The basic visibility flag. bzc_vis_flg in OPUS |
| customer_visibility_flg | [string](#string) |  | The customer visibility flag. cust_vis_flg in OPUS |
| activity_receive_type_code | [string](#string) |  | The activity receive type code. act_rcv_tp_cd in OPUS |
| cop_scheduling_logic_number | [string](#string) |  | The cop scheduling logic number. cop_skd_lgc_no in OPUS |
| cop_scheduling_logic_type_code | [string](#string) |  | The cop scheduling logic type code. cop_skd_lgc_tp_cd in OPUS |
| update_available_flag | [string](#string) |  | The update available flag. upd_aval_flg in OPUS |
| delete_flag | [string](#string) |  | The delete flag. delt_flg in OPUS |
| eai_event_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The eai event date. eai_evnt_dt in OPUS |
| vendor_event_tolerance_hours | [double](#double) |  | The vendor event tolerance hours. vndr_ev_tol_hrs in OPUS |
| vendor_event_service_category_code | [string](#string) |  | The vendor event service category code. vndr_ev_svc_cate_cd in OPUS |
| eai_interface_id | [string](#string) |  | The eai interface id. eai_if_id in OPUS |
| edw_update_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The edw update date. edw_upd_dt in OPUS |






<a name="chorus-mdm-activity-v1-ActivityCode"></a>

### ActivityCode
The activity code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| activity_code | [string](#string) |  | The code of the Activity |






<a name="chorus-mdm-activity-v1-GetActivitiesByCodesRequest"></a>

### GetActivitiesByCodesRequest
Request message for `ActivityInfoService.GetActivitiesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| activity_code_list | [ActivityCode](#chorus-mdm-activity-v1-ActivityCode) | repeated | The ActivityCode list |






<a name="chorus-mdm-activity-v1-GetActivitiesByCodesResponse"></a>

### GetActivitiesByCodesResponse
Response message for `ActivityInfoService.GetActivitiesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| activity | [Activity](#chorus-mdm-activity-v1-Activity) |  | The Activity information |





 

 

 


<a name="chorus-mdm-activity-v1-ActivityInfoService"></a>

### ActivityInfoService
The service that implements the ActivityInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetActivitiesByCodes | [GetActivitiesByCodesRequest](#chorus-mdm-activity-v1-GetActivitiesByCodesRequest) | [GetActivitiesByCodesResponse](#chorus-mdm-activity-v1-GetActivitiesByCodesResponse) stream | Get all list of activities by codes<br /><br />Operation: MATCH<br /><br />Request: { &#34;activity_code_list&#34;: [ { &#34;activity_code&#34;: &#34;EFE&#34; } ] }<br /><br />Response: { &#34;activity&#34;: { &#34;activity_code&#34;: &#34;EFE&#34;, &#34;activity_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, &#34;activity_desc&#34;: &#34;&#34;, &#34;activity_type_code&#34;: &#34;SCH&#34;, &#34;full_empty_code&#34;: &#34;F&#34;, &#34;bound_vessel_schedule_seq_code&#34;: &#34;1&#34;, &#34;node_type_code&#34;: &#34;P&#34;, &#34;activity_operation_type_code&#34;: &#34;SCH&#34;, &#34;transport_mode_code&#34;: &#34;SEA&#34;, &#34;origin_destination_code&#34;: &#34;EFE&#34;, &#34;active_flag&#34;: &#34;Y&#34;, &#34;activity_status_mapping_code&#34;: &#34;SCH&#34;, &#34;activity_standard_edi_status_code&#34;: &#34;SCH&#34;, &#34;basic_visibility_flg&#34;: &#34;Y&#34;, &#34;customer_visibility_flg&#34;: &#34;Y&#34;, &#34;activity_receive_type_code&#34;: &#34;SCH&#34;, &#34;cop_scheduling_logic_number&#34;: &#34;1&#34;, &#34;cop_scheduling_logic_type_code&#34;: &#34;SCH&#34;, &#34;update_available_flag&#34;: &#34;Y&#34;, &#34;delete_flag&#34;: &#34;N&#34;, &#34;eai_event_date&#34;: { &#34;seconds&#34;: 1577836800, &#34;nanos&#34;: 0 }, &#34;vendor_event_tolerance_hours&#34;: 0, &#34;vendor_event_service_category_code&#34;: &#34;SCH&#34;, &#34;eai_interface_id&#34;: &#34;SCH&#34;, &#34;edw_update_date&#34;: { &#34;seconds&#34;: 1577836800, &#34;nanos&#34;: 0 } } } ... |

 



<a name="chorus_mdm_base_v1_base-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/base/v1/base.proto



<a name="chorus-mdm-base-v1-Option"></a>

### Option
Condition search


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| start_with | [bool](#bool) |  |  |






<a name="chorus-mdm-base-v1-OrderBy"></a>

### OrderBy
OderBy Field


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| field_name | [string](#string) |  | The field name |
| sort_by | [SortBy](#chorus-mdm-base-v1-SortBy) |  | The order direction |






<a name="chorus-mdm-base-v1-Pagination"></a>

### Pagination
Pagination info


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offset | [int32](#int32) |  | The offset of the list; |
| limit | [int32](#int32) |  | The limit number of records of the list; |





 


<a name="chorus-mdm-base-v1-SortBy"></a>

### SortBy
Order Direction

| Name | Number | Description |
| ---- | ------ | ----------- |
| SORT_BY_UNSPECIFIED | 0 | unspecified |
| SORT_BY_ASC | 1 | Ascending |
| SORT_BY_DESC | 2 | Descending |


 

 

 



<a name="chorus_mdm_carrier_v1_carrier-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/carrier/v1/carrier.proto



<a name="chorus-mdm-carrier-v1-Carrier"></a>

### Carrier
The carrier information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier_code | [string](#string) |  | The carrier_code is the code of the carrier. crr_cd in OPUS. |
| carrier_name | [string](#string) |  | The carrier_name is the name of the carrier. crr_nm in OPUS. |






<a name="chorus-mdm-carrier-v1-CarrierCode"></a>

### CarrierCode
The carrier information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier_code | [string](#string) |  | The carrier_code is the code of the carrier. |






<a name="chorus-mdm-carrier-v1-GetCarriersByCarrierCodesRequest"></a>

### GetCarriersByCarrierCodesRequest
Request message for `CarrierInfoService.GetCarriersByCarrierCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier_code_list | [CarrierCode](#chorus-mdm-carrier-v1-CarrierCode) | repeated | The carrier code list. |






<a name="chorus-mdm-carrier-v1-GetCarriersByCarrierCodesResponse"></a>

### GetCarriersByCarrierCodesResponse
Response message for `CarrierInfoService.GetCarriersByCarrierCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier | [Carrier](#chorus-mdm-carrier-v1-Carrier) |  | The carrier information. |






<a name="chorus-mdm-carrier-v1-SearchCarriersByCarrierNameRequest"></a>

### SearchCarriersByCarrierNameRequest
Request message for `CarrierInfoService.SearchCarriersByCarrierNameRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier_name | [string](#string) |  | The carrier search code. |






<a name="chorus-mdm-carrier-v1-SearchCarriersByCarrierNameResponse"></a>

### SearchCarriersByCarrierNameResponse
Response message for `CarrierInfoService.SearchCarriersByCarrierNameResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| carrier | [Carrier](#chorus-mdm-carrier-v1-Carrier) |  | The carrier information. |





 

 

 


<a name="chorus-mdm-carrier-v1-CarrierInfoService"></a>

### CarrierInfoService
Services for carrier.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCarriersByCarrierCodes | [GetCarriersByCarrierCodesRequest](#chorus-mdm-carrier-v1-GetCarriersByCarrierCodesRequest) | [GetCarriersByCarrierCodesResponse](#chorus-mdm-carrier-v1-GetCarriersByCarrierCodesResponse) stream | Get list of carriers by carrier codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;carrier_code_list&#34;: [ { &#34;carrier_code&#34;: &#34;OPD&#34; } ] }<br /><br />Response: { &#34;carrier&#34;: { &#34;carrier_code&#34;: &#34;OPD&#34;, &#34;carrier_name&#34;: OPDR } } ... |
| SearchCarriersByCarrierName | [SearchCarriersByCarrierNameRequest](#chorus-mdm-carrier-v1-SearchCarriersByCarrierNameRequest) | [SearchCarriersByCarrierNameResponse](#chorus-mdm-carrier-v1-SearchCarriersByCarrierNameResponse) stream | Search list of carriers by carrier name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;carrier_name&#34;: &#34;OPD&#34; }<br /><br />Response: { &#34;carrier&#34;: { &#34;carrier_code&#34;: &#34;OPD&#34;, &#34;carrier_name&#34;: OPDR } } ... |

 



<a name="chorus_mdm_charge_v1_charge-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/charge/v1/charge.proto



<a name="chorus-mdm-charge-v1-Charge"></a>

### Charge
The charge information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge_code | [string](#string) |  | The charge_code is the charge code of the charge. chg_cd in OPUS. |
| charge_name | [string](#string) |  | The charge_name is the charge name of the charge. chg_nm in OPUS. |
| representative_charge_code | [string](#string) |  | The representative_charge_code is the representative charge code of the charge. rep_chg_cd in OPUS. |






<a name="chorus-mdm-charge-v1-ChargeCode"></a>

### ChargeCode
The charge code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge_code | [string](#string) |  | The charge_code is the charge code of the charge. |






<a name="chorus-mdm-charge-v1-GetChargesByChargeCodesRequest"></a>

### GetChargesByChargeCodesRequest
Request message for `ChargeInfoService.GetChargesByChargeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge_code_list | [ChargeCode](#chorus-mdm-charge-v1-ChargeCode) | repeated | The charge code list. |






<a name="chorus-mdm-charge-v1-GetChargesByChargeCodesResponse"></a>

### GetChargesByChargeCodesResponse
Response message for `ChargeInfoService.GetChargesByChargeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge | [Charge](#chorus-mdm-charge-v1-Charge) |  | The charge information. |






<a name="chorus-mdm-charge-v1-SearchChargesByNameRequest"></a>

### SearchChargesByNameRequest
Request message for `ChargeInfoService.SearchChargesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge_name | [string](#string) |  | The charge name of charge. |






<a name="chorus-mdm-charge-v1-SearchChargesByNameResponse"></a>

### SearchChargesByNameResponse
Response message for `ChargeInfoService.SearchChargesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| charge | [Charge](#chorus-mdm-charge-v1-Charge) |  | The charge information. |





 

 

 


<a name="chorus-mdm-charge-v1-ChargeInfoService"></a>

### ChargeInfoService
Services for charge.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetChargesByChargeCodes | [GetChargesByChargeCodesRequest](#chorus-mdm-charge-v1-GetChargesByChargeCodesRequest) | [GetChargesByChargeCodesResponse](#chorus-mdm-charge-v1-GetChargesByChargeCodesResponse) stream | Get list of charge by charge codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;charge_code_list&#34;: [ { &#34;charge_code&#34;: &#34;FGP&#34; } ] }<br /><br />Response: { &#34;charge&#34;: { &#34;charge_code&#34;: &#34;FGP&#34;, &#34;charge_name&#34;: &#34;FOOD GRADE PREMIUM&#34;, &#34;representative_charge_code&#34;: &#34;OTH&#34; } } ... |
| SearchChargesByName | [SearchChargesByNameRequest](#chorus-mdm-charge-v1-SearchChargesByNameRequest) | [SearchChargesByNameResponse](#chorus-mdm-charge-v1-SearchChargesByNameResponse) stream | Search list of charge by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;charge_name&#34;: &#34;FOOD GRADE PREMIUM&#34; }<br /><br />Response: { &#34;charge&#34;: { &#34;charge_code&#34;: &#34;FGP&#34;, &#34;charge_name&#34;: &#34;FOOD GRADE PREMIUM&#34;, &#34;representative_charge_code&#34;: &#34;OTH&#34; } } ... |

 



<a name="chorus_mdm_commodity_v1_commodity-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/commodity/v1/commodity.proto



<a name="chorus-mdm-commodity-v1-Commodity"></a>

### Commodity
The commodity information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity_code | [string](#string) |  | The commodity_code is the code of Commodity. cmdt_cd in OPUS |
| commodity_name | [string](#string) |  | The commodity_name is the name of Commodity. cmdt_nm in OPUS |
| commodity_representative_code | [string](#string) |  | The commodity_representative_code is the code of representative Commodity. rep_cmdt_cd in OPUS |






<a name="chorus-mdm-commodity-v1-CommodityCode"></a>

### CommodityCode
The commodity code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity_code | [string](#string) |  | The code of the commodity. |






<a name="chorus-mdm-commodity-v1-GetCommoditiesByCodesRequest"></a>

### GetCommoditiesByCodesRequest
Request message for `CommodityInfoService.GetCommoditiesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity_code_list | [CommodityCode](#chorus-mdm-commodity-v1-CommodityCode) | repeated | The commodity code list |






<a name="chorus-mdm-commodity-v1-GetCommoditiesByCodesResponse"></a>

### GetCommoditiesByCodesResponse
Response message for `CommodityInfoService.GetCommoditiesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity | [Commodity](#chorus-mdm-commodity-v1-Commodity) |  | The commodity information |






<a name="chorus-mdm-commodity-v1-SearchCommoditiesByNameRequest"></a>

### SearchCommoditiesByNameRequest
Request message for `CommodityInfoService.SearchCommoditiesByNameRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity_name | [string](#string) |  | The commodity name information |






<a name="chorus-mdm-commodity-v1-SearchCommoditiesByNameResponse"></a>

### SearchCommoditiesByNameResponse
Response message for `CommodityInfoService.SearchCommoditiesByNameResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| commodity | [Commodity](#chorus-mdm-commodity-v1-Commodity) |  | The commodity information |





 

 

 


<a name="chorus-mdm-commodity-v1-CommodityInfoService"></a>

### CommodityInfoService
The service that implements the CommodityInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCommoditiesByCodes | [GetCommoditiesByCodesRequest](#chorus-mdm-commodity-v1-GetCommoditiesByCodesRequest) | [GetCommoditiesByCodesResponse](#chorus-mdm-commodity-v1-GetCommoditiesByCodesResponse) stream | Get list of commodities by codes<br /><br />Operation: MATCH<br /><br />Request: { &#34;commodity_code_list&#34;: [ { &#34;commodity_code&#34;: &#34;040411&#34; } { &#34;commodity_code&#34;: &#34;121210&#34; } ] }<br /><br />Response: { &#34;commodity&#34;: { &#34;commodity_code&#34;: &#34;121210&#34;, &#34;commodity_name&#34;: &#34;LOCUST (CARBO) BEANS, INCL. LOCUST BEAN SEEDS&#34;, &#34;commodity_representative_code&#34;: &#34;1212&#34; } } ... |
| SearchCommoditiesByName | [SearchCommoditiesByNameRequest](#chorus-mdm-commodity-v1-SearchCommoditiesByNameRequest) | [SearchCommoditiesByNameResponse](#chorus-mdm-commodity-v1-SearchCommoditiesByNameResponse) stream | Search list of commodities by name<br /><br />Operation: LIKE<br /><br />Request: { &#34;commodity_name&#34;: &#34;EXPLOSIVES&#34; }<br /><br />Response: { &#34;commodity&#34;: { &#34;commodity_code&#34;: &#34;360200&#34;, &#34;commodity_name&#34;: &#34;DYNAMITE &amp; HIGH EXPLOSIVES, NOS CLASS 1&#34;, &#34;commodity_representative_code&#34;: &#34;3602&#34; } } ... |

 



<a name="chorus_mdm_container_size_v1_container_size-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/container_size/v1/container_size.proto



<a name="chorus-mdm-container_size-v1-ContainerSize"></a>

### ContainerSize
The container size information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_size_code | [string](#string) |  | The container_size_code is the code size of the container. cntr_sz_cd in OPUS. |
| container_size_description | [string](#string) |  | The container_size_description is the size description of the container. cntr_sz_desc in OPUS. |
| container_size_teu_capacity | [float](#float) |  | The container_size_teu_capacity is the teu capacity of the container. cntr_sz_teu_capa in OPUS. |






<a name="chorus-mdm-container_size-v1-GetContainerSizesResponse"></a>

### GetContainerSizesResponse
Response message for `ContainerSizeInfoService.GetContainerSizes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_size | [ContainerSize](#chorus-mdm-container_size-v1-ContainerSize) |  | The container size information. |





 

 

 


<a name="chorus-mdm-container_size-v1-ContainerSizeInfoService"></a>

### ContainerSizeInfoService
Services for container size.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContainerSizes | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetContainerSizesResponse](#chorus-mdm-container_size-v1-GetContainerSizesResponse) stream | Get all list of container sizes.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;container_size&#34;: { &#34;container_size_code&#34;: &#34;X&#34;, &#34;container_size_description&#34;: &#34;53FT HIGH CUBIC CONTAINER&#34;, &#34;container_size_teu_capacity&#34;: 2 } } ... |

 



<a name="chorus_mdm_container_type_size_v1_container_type_size-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/container_type_size/v1/container_type_size.proto



<a name="chorus-mdm-container_type_size-v1-ContainerTypeSize"></a>

### ContainerTypeSize
The container type size information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_type_size_code | [string](#string) |  | The container_type_size_code is the code of the container type size. cntr_tpsz_cd in OPUS. |
| container_type_size_psa_code | [string](#string) |  | The container_type_size_iso_code is the psa code of the container type size. cntr_tpsz_psa_cd in OPUS. |
| container_type_size_iso_code | [string](#string) |  | The container_type_size_iso_code is the iso code of the container type size. cntr_tpsz_iso_cd in OPUS. |
| modified_container_type_size_code | [string](#string) |  | The modified_container_type_size_code is the modified code of the container type size. modi_cntr_tpsz_cd in OPUS. |
| container_type_size_remark | [string](#string) |  | The container_type_size_remark is the remark of the container type size. cntr_tpsz_rmk in OPUS. |
| container_size_code | [string](#string) |  | The container_size_code is the container size code of the container type size. cntr_sz_cd in OPUS. |
| container_type_code | [string](#string) |  | The container_type_code is the container type code of the container type size. cntr_tp_cd in OPUS. |






<a name="chorus-mdm-container_type_size-v1-GetContainerTypeSizesResponse"></a>

### GetContainerTypeSizesResponse
Response message for `ContainerTypeSizeInfoService.GetContainerTypeSize`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_type_size | [ContainerTypeSize](#chorus-mdm-container_type_size-v1-ContainerTypeSize) |  | The container type size information. |





 

 

 


<a name="chorus-mdm-container_type_size-v1-ContainerTypeSizeInfoService"></a>

### ContainerTypeSizeInfoService
Services for container type size.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContainerTypeSizes | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetContainerTypeSizesResponse](#chorus-mdm-container_type_size-v1-GetContainerTypeSizesResponse) stream | Get all list of container type sizes.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;container_type_size&#34;: { &#34;container_type_size_code&#34;: &#34;D3&#34;, &#34;container_type_size_psa_code&#34;: &#34;&#34;, &#34;container_type_size_iso_code&#34;: &#34;25G0&#34;, &#34;modified_container_type_size_code&#34;: &#34;20HQ&#34;, &#34;container_type_size_remark&#34;: &#34;Only for partners&#34;, &#34;container_size_code&#34;: &#34;3&#34;, &#34;container_type_code&#34;: &#34;D&#34; } } ... |

 



<a name="chorus_mdm_container_type_v1_container_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/container_type/v1/container_type.proto



<a name="chorus-mdm-container_type-v1-ContainerType"></a>

### ContainerType
The container type information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_type_code | [string](#string) |  | The container_type_code is the code of the container type. cntr_tp_cd in OPUS. |
| container_type_description | [string](#string) |  | The container_type_description is the description of the container type. cntr_tp_desc in OPUS. |






<a name="chorus-mdm-container_type-v1-GetContainerTypesResponse"></a>

### GetContainerTypesResponse
Response message for `ContainerTypeInfoService.GetContainerTypes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_type | [ContainerType](#chorus-mdm-container_type-v1-ContainerType) |  | The container type information. |





 

 

 


<a name="chorus-mdm-container_type-v1-ContainerTypeInfoService"></a>

### ContainerTypeInfoService
Services for container type.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContainerTypes | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetContainerTypesResponse](#chorus-mdm-container_type-v1-GetContainerTypesResponse) stream | Get all list of container types.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;container_type&#34;: { &#34;container_type_code&#34;: &#34;E&#34;, &#34;container_type_description&#34;: &#34;PLATFORM CONTAINER&#34; } } ... |

 



<a name="chorus_mdm_container_vendor_classification_v1_container_vendor_classification-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/container_vendor_classification/v1/container_vendor_classification.proto



<a name="chorus-mdm-container_vendor_classification-v1-ContainerVendorClassification"></a>

### ContainerVendorClassification
The container vendor classification information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the vendor sequence of the container vendor classification. vndr_seq in OPUS. |
| vendor_cost_code | [string](#string) |  | The vendor_cost_code is the vendor cost code of the container vendor classification. vndr_cost_cd in OPUS. |
| container_vendor_service_code | [string](#string) |  | The container_vendor_service_code is the container vendor service code of the container vendor classification. cntr_vndr_svc_cd in OPUS. |






<a name="chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesRequest"></a>

### GetContainerVendorClassificationsBySequencesRequest
Request message for `ContainerVendorClassificationInfoService.GetContainerVendorClassificationsBySequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence_list | [VendorSequence](#chorus-mdm-container_vendor_classification-v1-VendorSequence) | repeated | The vendor sequence list. |






<a name="chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesResponse"></a>

### GetContainerVendorClassificationsBySequencesResponse
Response message for `ContainerVendorClassificationInfoService.GetContainerVendorClassificationsBySequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| container_vendor_classification | [ContainerVendorClassification](#chorus-mdm-container_vendor_classification-v1-ContainerVendorClassification) |  | The container vendor classification information. |






<a name="chorus-mdm-container_vendor_classification-v1-VendorSequence"></a>

### VendorSequence
The container vendor classification sequence information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the sequence of the container vendor classification information. |





 

 

 


<a name="chorus-mdm-container_vendor_classification-v1-ContainerVendorClassificationInfoService"></a>

### ContainerVendorClassificationInfoService
Services for container vendor classification information.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContainerVendorClassificationsBySequences | [GetContainerVendorClassificationsBySequencesRequest](#chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesRequest) | [GetContainerVendorClassificationsBySequencesResponse](#chorus-mdm-container_vendor_classification-v1-GetContainerVendorClassificationsBySequencesResponse) stream | Get list of container vendor classification by sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vendor_sequence_list&#34;: [ { &#34;vendor_sequence&#34;: 141085, } ] }<br /><br />Response: { &#34;container_vendor_classification&#34;: { &#34;vendor_sequence&#34;: 141085, &#34;vendor_cost_code&#34;: &#34;EQ&#34;, &#34;container_vendor_service_code&#34;: &#34;LSR&#34;, } } ... |

 



<a name="chorus_mdm_continent_v1_continent-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/continent/v1/continent.proto



<a name="chorus-mdm-continent-v1-Continent"></a>

### Continent
The continent information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent_code | [string](#string) |  | The continent_code is the code of the continent. conti_cd in OPUS. |
| continent_name | [string](#string) |  | The continent_name is the name of the continent. conti_nm in OPUS. |






<a name="chorus-mdm-continent-v1-ContinentCode"></a>

### ContinentCode
The continent code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent_code | [string](#string) |  | The code of the continent. |






<a name="chorus-mdm-continent-v1-GetContinentsByCodesRequest"></a>

### GetContinentsByCodesRequest
Request message for `ContinentInfoService.GetContinentsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent_code_list | [ContinentCode](#chorus-mdm-continent-v1-ContinentCode) | repeated | The continent code list. |






<a name="chorus-mdm-continent-v1-GetContinentsByCodesResponse"></a>

### GetContinentsByCodesResponse
Response message for `ContinentInfoService.GetContinentsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent | [Continent](#chorus-mdm-continent-v1-Continent) |  | The continent information |






<a name="chorus-mdm-continent-v1-GetContinentsResponse"></a>

### GetContinentsResponse
Response message for `ContinentInfoService.GetContinents`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent | [Continent](#chorus-mdm-continent-v1-Continent) |  | The continent information. |






<a name="chorus-mdm-continent-v1-SearchContinentsByNameRequest"></a>

### SearchContinentsByNameRequest
Request message for `ContinentInfoService.SearchContinentsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent_name | [string](#string) |  | The name of the continent |






<a name="chorus-mdm-continent-v1-SearchContinentsByNameResponse"></a>

### SearchContinentsByNameResponse
Response message for `ContinentInfoService.SearchContinentsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| continent | [Continent](#chorus-mdm-continent-v1-Continent) |  | The continent information. |





 

 

 


<a name="chorus-mdm-continent-v1-ContinentInfoService"></a>

### ContinentInfoService
Services for continent.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContinents | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetContinentsResponse](#chorus-mdm-continent-v1-GetContinentsResponse) stream | Get all list of continents.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;continent&#34;: { &#34;continent_code&#34;: &#34;X&#34;, &#34;continent_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34; } } ... |
| GetContinentsByCodes | [GetContinentsByCodesRequest](#chorus-mdm-continent-v1-GetContinentsByCodesRequest) | [GetContinentsByCodesResponse](#chorus-mdm-continent-v1-GetContinentsByCodesResponse) stream | Get list of continents by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;continent_code_list&#34;: [ { &#34;continent_code&#34;: &#34;X&#34; } ] }<br /><br />Response: { &#34;continent&#34;: { &#34;continent_code&#34;: &#34;X&#34;, &#34;continent_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34; } } ... |
| SearchContinentsByName | [SearchContinentsByNameRequest](#chorus-mdm-continent-v1-SearchContinentsByNameRequest) | [SearchContinentsByNameResponse](#chorus-mdm-continent-v1-SearchContinentsByNameResponse) stream | Search list of continents by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;continent_name&#34;: &#34;DUM&#34; }<br /><br />Response: { &#34;continent&#34;: { &#34;continent_code&#34;: &#34;X&#34;, &#34;continent_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34; } } ... |

 



<a name="chorus_mdm_country_v1_country-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/country/v1/country.proto



<a name="chorus-mdm-country-v1-Country"></a>

### Country
The country information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code | [string](#string) |  | The country_code is the code of the country. cnt_cd in OPUS. |
| country_name | [string](#string) |  | The country_name is the name of the country. cnt_nm in OPUS. |






<a name="chorus-mdm-country-v1-CountryCode"></a>

### CountryCode
The country code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code | [string](#string) |  | The code of the country. |






<a name="chorus-mdm-country-v1-GetCountriesByCodesRequest"></a>

### GetCountriesByCodesRequest
Request message for `CountryInfoService.GetCountriesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code_list | [CountryCode](#chorus-mdm-country-v1-CountryCode) | repeated | The country code list. |






<a name="chorus-mdm-country-v1-GetCountriesByCodesResponse"></a>

### GetCountriesByCodesResponse
Response message for `CountryInfoService.GetCountriesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country | [Country](#chorus-mdm-country-v1-Country) |  | The country information. |






<a name="chorus-mdm-country-v1-GetCountriesResponse"></a>

### GetCountriesResponse
Response message for `CountryInfoService.GetCountries`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country | [Country](#chorus-mdm-country-v1-Country) |  | The country information. |






<a name="chorus-mdm-country-v1-SearchCountriesByNameRequest"></a>

### SearchCountriesByNameRequest
Request message for `CountryInfoService.SearchCountriesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_name | [string](#string) |  | The name of the country. |






<a name="chorus-mdm-country-v1-SearchCountriesByNameResponse"></a>

### SearchCountriesByNameResponse
Response message for `CountryInfoService.SearchCountriesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country | [Country](#chorus-mdm-country-v1-Country) |  | The country information. |





 

 

 


<a name="chorus-mdm-country-v1-CountryInfoService"></a>

### CountryInfoService
Services for country.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCountries | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetCountriesResponse](#chorus-mdm-country-v1-GetCountriesResponse) stream | Get all list of countries.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;country&#34;: { &#34;country_code&#34;: &#34;YE&#34;, &#34;country_name&#34;: &#34;YEMEN&#34; } } ... |
| GetCountriesByCodes | [GetCountriesByCodesRequest](#chorus-mdm-country-v1-GetCountriesByCodesRequest) | [GetCountriesByCodesResponse](#chorus-mdm-country-v1-GetCountriesByCodesResponse) stream | Get list of countries by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;country_code_list&#34;: [ { &#34;country_code&#34;: &#34;YE&#34; } ] }<br /><br />Response: { &#34;country&#34;: { &#34;country_code&#34;: &#34;YE&#34;, &#34;country_name&#34;: &#34;YEMEN&#34; } } ... |
| SearchCountriesByName | [SearchCountriesByNameRequest](#chorus-mdm-country-v1-SearchCountriesByNameRequest) | [SearchCountriesByNameResponse](#chorus-mdm-country-v1-SearchCountriesByNameResponse) stream | Search list of countries by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;country_name&#34;: &#34;YEM&#34; }<br /><br />Response: { &#34;country&#34;: { &#34;country_code&#34;: &#34;YE&#34;, &#34;country_name&#34;: &#34;YEMEN&#34; } } ... |

 



<a name="chorus_mdm_credit_customer_contract_v1_credit_customer_contract-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/credit_customer_contract/v1/credit_customer_contract.proto



<a name="chorus-mdm-credit_customer_contract-v1-CreditCustomerContract"></a>

### CreditCustomerContract
The credit customer contract information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the customer country code of the credit customer contract. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the credit customer contract. cust_seq in OPUS |
| customer_agreement_number | [string](#string) |  | The customer_agreement_number is the customer agreement number of the credit customer contract. cust_agmt_no in OPUS |
| customer_contract_sequence | [int32](#int32) |  | The customer_contract_sequence is the customer contract sequence of the credit customer contract. cust_ctrt_seq in OPUS |
| contract_number | [string](#string) |  | The contract_number is the contract number of the credit customer contract. ctrt_no in OPUS |






<a name="chorus-mdm-credit_customer_contract-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer country code of the credit customer contract. |
| customer_sequence | [int32](#int32) |  | The customer sequence of the credit customer contract. |






<a name="chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest"></a>

### GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest
Request message for `CreditCustomerContractInfoService.GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_contract-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse"></a>

### GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse
Response message for `CreditCustomerContractInfoService.GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer_contract | [CreditCustomerContract](#chorus-mdm-credit_customer_contract-v1-CreditCustomerContract) |  | The credit customer contract information. |





 

 

 


<a name="chorus-mdm-credit_customer_contract-v1-CreditCustomerContractInfoService"></a>

### CreditCustomerContractInfoService
Services for credit customer contract.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCreditCustomerContractsByCustomerCountryCodesAndSequences | [GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesRequest) | [GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_contract-v1-GetCreditCustomerContractsByCustomerCountryCodesAndSequencesResponse) stream | Get list of credit customer contract by customer country codes and customer sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;AU&#34; &#34;customer_sequence&#34;: &#34;101647&#34; } ], }<br /><br />Response: { &#34;credit_customer_contract&#34;: { &#34;customer_country_code&#34;: &#34;AU&#34;, &#34;customer_sequence&#34;: &#34;101647&#34;, &#34;customer_agreement_number&#34;: &#34;AU/AU000159&#34;, &#34;customer_contract_sequence&#34;: &#34;25&#34;, &#34;contract_number&#34;: &#34;SHAN00147A&#34;, } } ... |

 



<a name="chorus_mdm_credit_customer_relation_v1_credit_customer_relation-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/credit_customer_relation/v1/credit_customer_relation.proto



<a name="chorus-mdm-credit_customer_relation-v1-CreditCustomerRelation"></a>

### CreditCustomerRelation
The credit customer relation information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the customer country code of the credit customer relation. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the credit customer relation. cust_seq in OPUS |
| customer_agreement_number | [string](#string) |  | The customer_agreement_number is the customer agreement number of the credit customer relation. cust_agmt_no in OPUS |
| customer_relation_sequence | [int32](#int32) |  | The customer_relation_sequence is the customer relation sequence of the credit customer relation. cust_rlt_seq in OPUS |
| child_customer_country_code | [string](#string) |  | The child_customer_country_code is the child customer country code of the credit customer relation. chd_cust_cnt_cd in OPUS |
| child_customer_sequence | [int32](#int32) |  | The child_customer_sequence is the child customer sequence of the credit customer relation. chd_cust_seq in OPUS |






<a name="chorus-mdm-credit_customer_relation-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer country code of the credit customer relation. |
| customer_sequence | [int32](#int32) |  | The customer sequence of the credit customer relation. |






<a name="chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest"></a>

### GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest
Request message for `CreditCustomerRelationInfoService.GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_relation-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse"></a>

### GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse
Response message for `CreditCustomerRelationInfoService.GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer_relation | [CreditCustomerRelation](#chorus-mdm-credit_customer_relation-v1-CreditCustomerRelation) |  | The credit customer relation information. |





 

 

 


<a name="chorus-mdm-credit_customer_relation-v1-CreditCustomerRelationInfoService"></a>

### CreditCustomerRelationInfoService
Services for credit customer relation.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCreditCustomerRelationsByCustomerCountryCodesAndSequences | [GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesRequest) | [GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_relation-v1-GetCreditCustomerRelationsByCustomerCountryCodesAndSequencesResponse) stream | Get list of credit customer relation by customer country codes and customer sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;BE&#34; &#34;customer_sequence&#34;: &#34;100849&#34; } ], }<br /><br />Response: { &#34;credit_customer_relation&#34;: { &#34;customer_country_code&#34;: &#34;BE&#34;, &#34;customer_sequence&#34;: &#34;100849&#34;, &#34;customer_agreement_number&#34;: &#34;BE/BE100849&#34;, &#34;customer_relation_sequence&#34;: &#34;199&#34;, &#34;child_customer_country_code&#34;: &#34;BE&#34;, &#34;child_customer_sequence&#34;: &#34;100002&#34;, } } ... |

 



<a name="chorus_mdm_credit_customer_term_v1_credit_customer_term-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/credit_customer_term/v1/credit_customer_term.proto



<a name="chorus-mdm-credit_customer_term-v1-CreditCustomerTerm"></a>

### CreditCustomerTerm
The credit customer term information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the credit customer term. cust_cnt_cd in OPUS. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the credit customer term. cust_seq in OPUS. |
| customer_agreement_number | [string](#string) |  | The customer_agreement_number is the customer agreement number sequence of the credit customer term. cust_agmt_no in OPUS. |
| credit_currency_code | [string](#string) |  | The credit_currency_code is the credit currency code of the credit customer term. cr_curr_cd in OPUS. |
| credit_amount | [int32](#int32) |  | The credit_amount is the credit amount of the customer. cr_amt in OPUS. |






<a name="chorus-mdm-credit_customer_term-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer. |






<a name="chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest"></a>

### GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest
Request message for `CreditCustomerTermInfoService.GetCreditCustomerTermsByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-credit_customer_term-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse"></a>

### GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse
Response message for `CreditCustomerTermInfoService.GetCreditCustomerTermsByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer_term | [CreditCustomerTerm](#chorus-mdm-credit_customer_term-v1-CreditCustomerTerm) |  | The credit customer terms information. |





 

 

 


<a name="chorus-mdm-credit_customer_term-v1-CreditCustomerTermInfoService"></a>

### CreditCustomerTermInfoService
Services for credit terms of credit customers.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCreditCustomerTermsByCustomerCountryCodesAndSequences | [GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesRequest) | [GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-credit_customer_term-v1-GetCreditCustomerTermsByCustomerCountryCodesAndSequencesResponse) stream | Get list of credit customer terms by customer country codes and customer sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;BE&#34; &#34;customer_sequence&#34;: 100504 } ] }<br /><br />Response: { &#34;credit_customer_term&#34;: { &#34;customer_country_code&#34;: &#34;BE&#34;, &#34;customer_sequence&#34;: 100504, &#34;customer_agreement_number&#34;: &#34;BE/BE100504&#34;, &#34;credit_currency_code&#34;: &#34;USD&#34;, &#34;credit_amount&#34;: 150 } } ... |

 



<a name="chorus_mdm_credit_customer_v1_credit_customer-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/credit_customer/v1/credit_customer.proto



<a name="chorus-mdm-credit_customer-v1-CreditCustomer"></a>

### CreditCustomer
The credit customer information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the customer country code. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence. cust_seq in OPUS |
| credit_flag | [string](#string) |  | The credit_flag is the credit flag. cr_flg in OPUS |
| actual_customer_country_code | [string](#string) |  | The actual_customer_country_code is the actual customer country code. act_cust_cnt_cd in OPUS |
| actual_customer_sequence | [int32](#int32) |  | The actual_customer_sequence is the actual customer sequence. act_cust_seq in OPUS |






<a name="chorus-mdm-credit_customer-v1-CreditCustomerCode"></a>

### CreditCustomerCode
The credit customer code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the customer country code. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence. cust_seq in OPUS |
| credit_flag | [string](#string) |  | The credit_flag is the credit flag. cr_flg in OPUS |






<a name="chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesRequest"></a>

### GetCreditCustomersByCreditCustomerCodesRequest
Request message for `CreditCustomerInfoService.GetCreditCustomersByCreditCustomerCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer_code_list | [CreditCustomerCode](#chorus-mdm-credit_customer-v1-CreditCustomerCode) | repeated | The credit customer code list |






<a name="chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesResponse"></a>

### GetCreditCustomersByCreditCustomerCodesResponse
Response message for `CreditCustomerInfoService.GetCreditCustomersByCreditCustomerCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer | [CreditCustomer](#chorus-mdm-credit_customer-v1-CreditCustomer) |  | The credit customer information |






<a name="chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsRequest"></a>

### SearchCreditCustomersByMultipleFieldsRequest
Request message for `CreditCustomerInfoService.SearchCreditCustomersByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) | optional | The customer_country_code is the customer country code. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) | optional | The customer_sequence is the customer sequence. cust_seq in OPUS |
| credit_flag | [string](#string) | optional | The credit_flag is the credit flag. cr_flg in OPUS |






<a name="chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsResponse"></a>

### SearchCreditCustomersByMultipleFieldsResponse
Response message for `CreditCustomerInfoService.SearchCreditCustomersByMultipleFieldsResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| credit_customer | [CreditCustomer](#chorus-mdm-credit_customer-v1-CreditCustomer) |  | The credit customer information |





 

 

 


<a name="chorus-mdm-credit_customer-v1-CreditCustomerInfoService"></a>

### CreditCustomerInfoService
The service that implements the CreditCustomerInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCreditCustomersByCreditCustomerCodes | [GetCreditCustomersByCreditCustomerCodesRequest](#chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesRequest) | [GetCreditCustomersByCreditCustomerCodesResponse](#chorus-mdm-credit_customer-v1-GetCreditCustomersByCreditCustomerCodesResponse) stream | Get list of credit customers by customer country codes and sequences and credit flags.<br /><br />Operation: MATCH<br /><br />Request: { &#34;credit_customer_code_list&#34;: [ { &#34;customer_country_code&#34;: &#34;NL&#34;, &#34;customer_sequence&#34;: 104241, &#34;credit_flag&#34;: &#34;Y&#34; } ] }<br /><br />Response: { &#34;credit_customer&#34;: { &#34;customer_country_code&#34;: &#34;NL&#34;, &#34;customer_sequence&#34;: 104241, &#34;credit_flag&#34;: &#34;Y&#34;, &#34;actual_customer_country_code&#34;: &#34;NL&#34;, &#34;actual_customer_sequence&#34;: 102242, } } ... |
| SearchCreditCustomersByMultipleFields | [SearchCreditCustomersByMultipleFieldsRequest](#chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsRequest) | [SearchCreditCustomersByMultipleFieldsResponse](#chorus-mdm-credit_customer-v1-SearchCreditCustomersByMultipleFieldsResponse) stream | Search list of yard by multiple fields.<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;customer_country_code&#34;: &#34;NL&#34;, &#34;customer_sequence&#34;: 104241, &#34;credit_flag&#34;: &#34;Y&#34; }<br /><br />Response: { &#34;credit_customer&#34;: { &#34;customer_country_code&#34;: &#34;NL&#34;, &#34;customer_sequence&#34;: 104241, &#34;credit_flag&#34;: &#34;Y&#34;, &#34;actual_customer_country_code&#34;: &#34;NL&#34;, &#34;actual_customer_sequence&#34;: 102242, } } ... |

 



<a name="chorus_mdm_currency_v1_currency-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/currency/v1/currency.proto



<a name="chorus-mdm-currency-v1-Currency"></a>

### Currency
The currency information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency_code | [string](#string) |  | The currency_code is the code of the currency. curr_cd in OPUS. |
| currency_name | [string](#string) |  | The currency_name is the name of the currency. curr_nm in OPUS. |
| currency_description | [string](#string) |  | The currency_description is the description of the currency. curr_desc in OPUS. |
| country_code | [string](#string) |  | The country_code is the country code of the currency. cnt_cd in OPUS. |
| display_precision_count | [int32](#int32) |  | The display_precision_count is the display precision count of the currency. dp_prcs_knt in OPUS. |
| extend_precision_count | [int32](#int32) |  | The extend_precision_count is the extend precision count of the currency. xtd_prcs_knt in OPUS. |






<a name="chorus-mdm-currency-v1-CurrencyCode"></a>

### CurrencyCode
The currency code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency_code | [string](#string) |  | The code of the currency. |






<a name="chorus-mdm-currency-v1-GetCurrenciesByCodesRequest"></a>

### GetCurrenciesByCodesRequest
Request message for `CurrencyInfoService.GetCurrenciesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency_code_list | [CurrencyCode](#chorus-mdm-currency-v1-CurrencyCode) | repeated | The currency code list. |






<a name="chorus-mdm-currency-v1-GetCurrenciesByCodesResponse"></a>

### GetCurrenciesByCodesResponse
Response message for `CurrencyInfoService.GetCurrenciesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency | [Currency](#chorus-mdm-currency-v1-Currency) |  | The currency information. |






<a name="chorus-mdm-currency-v1-GetCurrenciesResponse"></a>

### GetCurrenciesResponse
Response message for `CurrencyInfoService.GetCurrencies`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency | [Currency](#chorus-mdm-currency-v1-Currency) |  | The currency information. |






<a name="chorus-mdm-currency-v1-SearchCurrenciesByNameRequest"></a>

### SearchCurrenciesByNameRequest
Request message for `CurrencyInfoService.SearchCurrenciesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency_name | [string](#string) |  | The name of the currency. |






<a name="chorus-mdm-currency-v1-SearchCurrenciesByNameResponse"></a>

### SearchCurrenciesByNameResponse
Response message for `CurrencyInfoService.SearchCurrenciesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| currency | [Currency](#chorus-mdm-currency-v1-Currency) |  | The currency information. |





 

 

 


<a name="chorus-mdm-currency-v1-CurrencyInfoService"></a>

### CurrencyInfoService
Services for currency.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCurrencies | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetCurrenciesResponse](#chorus-mdm-currency-v1-GetCurrenciesResponse) stream | Get all list of currencies.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;currency&#34;: { &#34;currency_code&#34;: &#34;AOA&#34;, &#34;currency_name&#34;: &#34;KWANZA&#34;, &#34;currency_description&#34;: &#34;Angolanische Kwanza&#34;, &#34;country_code&#34;: &#34;AO&#34;, &#34;display_precision_count&#34;: &#34;2&#34;, &#34;extend_precision_count&#34;: &#34;5&#34; } } ... |
| GetCurrenciesByCodes | [GetCurrenciesByCodesRequest](#chorus-mdm-currency-v1-GetCurrenciesByCodesRequest) | [GetCurrenciesByCodesResponse](#chorus-mdm-currency-v1-GetCurrenciesByCodesResponse) stream | Get list of currencies by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;currency_code_list&#34;: [ { &#34;currency_code&#34;: &#34;AOA&#34; } ] }<br /><br />Response: { &#34;currency&#34;: { &#34;currency_code&#34;: &#34;AOA&#34;, &#34;currency_name&#34;: &#34;KWANZA&#34;, &#34;currency_description&#34;: &#34;Angolanische Kwanza&#34;, &#34;country_code&#34;: &#34;AO&#34;, &#34;display_precision_count&#34;: &#34;2&#34;, &#34;extend_precision_count&#34;: &#34;5&#34; } } |
| SearchCurrenciesByName | [SearchCurrenciesByNameRequest](#chorus-mdm-currency-v1-SearchCurrenciesByNameRequest) | [SearchCurrenciesByNameResponse](#chorus-mdm-currency-v1-SearchCurrenciesByNameResponse) stream | Search list of currencies by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;currency_name&#34;: &#34;KWA&#34; }<br /><br />Response: { &#34;currency&#34;: { &#34;currency_code&#34;: &#34;AOA&#34;, &#34;currency_name&#34;: &#34;KWANZA&#34;, &#34;currency_description&#34;: &#34;Angolanische Kwanza&#34;, &#34;country_code&#34;: &#34;AO&#34;, &#34;display_precision_count&#34;: &#34;2&#34;, &#34;extend_precision_count&#34;: &#34;5&#34; } } ... |

 



<a name="chorus_mdm_customer_address_v1_customer_address-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_address/v1/customer_address.proto



<a name="chorus-mdm-customer_address-v1-CustomerAddress"></a>

### CustomerAddress
The customer address information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of Customer. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the sequence of Customer. cust_seq in OPUS |
| business_entity_name | [string](#string) |  | The business_entity_name is the business entity name of Customer. bzet_nm in OPUS |
| business_entity_address | [string](#string) |  | The business_entity_address is the business entity address of Customer. bzet_addr in OPUS |
| state_code | [string](#string) |  | The state_code is the state code of Customer. ste_cd in OPUS |
| zip_code | [string](#string) |  | The zip_code is the zip code of Customer. zip_cd in OPUS |






<a name="chorus-mdm-customer_address-v1-CustomerAddressCode"></a>

### CustomerAddressCode
The customer address code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer country code |
| customer_sequence | [int32](#int32) |  | The customer sequence |
| primary_check_flag | [string](#string) |  | The primary check flag |






<a name="chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesRequest"></a>

### GetCustomerAddressesByCustomerAddressCodesRequest
Request message for `CustomerAddressInfoService.GetCustomerAddressesByCustomerAddressCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_address_code_list | [CustomerAddressCode](#chorus-mdm-customer_address-v1-CustomerAddressCode) | repeated | The customer address code list |






<a name="chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesResponse"></a>

### GetCustomerAddressesByCustomerAddressCodesResponse
Response message for `CustomerAddressInfoService.GetCustomerAddressesByCustomerAddressCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_address | [CustomerAddress](#chorus-mdm-customer_address-v1-CustomerAddress) |  | The customer address information |






<a name="chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameRequest"></a>

### SearchCustomerAddressesByBusinessEntityNameRequest
Request message for `CustomerAddressInfoService.SearchCustomerAddressesByBusinessEntityName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| business_entity_name | [string](#string) |  | The customer business entity name information |






<a name="chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameResponse"></a>

### SearchCustomerAddressesByBusinessEntityNameResponse
Response message for `CustomerAddressInfoService.SearchCustomerAddressesByBusinessEntityName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_address | [CustomerAddress](#chorus-mdm-customer_address-v1-CustomerAddress) |  | The customer address information |





 

 

 


<a name="chorus-mdm-customer_address-v1-CustomerAddressInfoService"></a>

### CustomerAddressInfoService
The service that implements the CustomerAddressInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerAddressesByCustomerAddressCodes | [GetCustomerAddressesByCustomerAddressCodesRequest](#chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesRequest) | [GetCustomerAddressesByCustomerAddressCodesResponse](#chorus-mdm-customer_address-v1-GetCustomerAddressesByCustomerAddressCodesResponse) stream | Get list of customer addresses by customer country codes and sequences and primary check flags.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_address_code_list&#34;: [ { &#34;customer_country_code&#34;: &#34;KR&#34;, &#34;customer_sequence&#34;: &#34;514567&#34;, &#34;primary_check_flag&#34;: &#34;Y&#34; } ] }<br /><br />Response: { &#34;customer_address&#34;: { &#34;customer_country_code&#34;: &#34;KR&#34;, &#34;customer_sequence&#34;: &#34;514567&#34;, &#34;business_entity_name&#34;: &#34;NEXUS SEA &amp; AIR CO.,LTD&#34;, &#34;business_entity_address&#34;: &#34;17, 141BEONGIL, DAECHEONG-RO, JUNG-GU, BUSAN KOREA&#34;, &#34;state_code&#34;: &#34;&#34;, &#34;zip_code&#34;: &#34;&#34; } } ... |
| SearchCustomerAddressesByBusinessEntityName | [SearchCustomerAddressesByBusinessEntityNameRequest](#chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameRequest) | [SearchCustomerAddressesByBusinessEntityNameResponse](#chorus-mdm-customer_address-v1-SearchCustomerAddressesByBusinessEntityNameResponse) stream | Search list of customer addresses by business entity name<br /><br />Operation: LIKE<br /><br />Request: { &#34;business_entity_name&#34;: &#34;NEXUS SEA &amp; AIR&#34; }<br /><br />Response: { &#34;customer_address&#34;: { &#34;customer_country_code&#34;: &#34;KR&#34;, &#34;customer_sequence&#34;: &#34;514567&#34;, &#34;business_entity_name&#34;: &#34;NEXUS SEA &amp; AIR CO.,LTD&#34;, &#34;business_entity_address&#34;: &#34;17, 141BEONGIL, DAECHEONG-RO, JUNG-GU, BUSAN KOREA&#34;, &#34;state_code&#34;: &#34;&#34;, &#34;zip_code&#34;: &#34;&#34; } } ... |

 



<a name="chorus_mdm_customer_contact_point_v1_customer_contact_point-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_contact_point/v1/customer_contact_point.proto



<a name="chorus-mdm-customer_contact_point-v1-CustomerContactPoint"></a>

### CustomerContactPoint
The customer contact point information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer. cust_cnt_cd in OPUS. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer. cust_seq in OPUS. |
| customer_contact_point_sequence | [int32](#int32) |  | The customer_contact_point_sequence is the customer contact point sequence of the customer. cust_cntc_pnt_seq in OPUS. |
| customer_email | [string](#string) |  | The customer_email is the customer email of the customer. cust_eml in OPUS. |
| international_fax_number | [string](#string) |  | The international_fax_number is the international fax number of the customer. intl_fax_no in OPUS. |
| phone_number | [string](#string) |  | The phone_number is the phone number of the customer. phn_no in OPUS. |
| international_phone_number | [string](#string) |  | The international_phone_number is the international phone number of the customer. intl_phn_no in OPUS. |
| fax_number | [string](#string) |  | The fax_number is the fax number of the customer. fax_no in OPUS. |






<a name="chorus-mdm-customer_contact_point-v1-CustomerContactPointCodeAndSequence"></a>

### CustomerContactPointCodeAndSequence
The customer contact point information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer. |






<a name="chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest"></a>

### GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest
Request message for `CustomerContactPointInfoService.GetCustomerContactPointsByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_code_and_sequence_list | [CustomerContactPointCodeAndSequence](#chorus-mdm-customer_contact_point-v1-CustomerContactPointCodeAndSequence) | repeated | The customer code list. |






<a name="chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse"></a>

### GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse
Response message for `CustomerContactPointInfoService.GetCustomerContactPointsByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_contact_point | [CustomerContactPoint](#chorus-mdm-customer_contact_point-v1-CustomerContactPoint) |  | The customer contact point information. |






<a name="chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailRequest"></a>

### SearchCustomerContactPointsByCustomerEmailRequest
Request message for `CustomerContactPointInfoService.SearchCustomerContactPointsByCustomerEmail`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_email | [string](#string) |  | The customer search code. |






<a name="chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailResponse"></a>

### SearchCustomerContactPointsByCustomerEmailResponse
Response message for `CustomerContactPointInfoService.SearchCustomerContactPointsByCustomerEmail`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_contact_point | [CustomerContactPoint](#chorus-mdm-customer_contact_point-v1-CustomerContactPoint) |  | The customer contact point information. |





 

 

 


<a name="chorus-mdm-customer_contact_point-v1-CustomerContactPointInfoService"></a>

### CustomerContactPointInfoService
Services for customer contact point.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerContactPointsByCustomerCountryCodesAndSequences | [GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesRequest) | [GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_contact_point-v1-GetCustomerContactPointsByCustomerCountryCodesAndSequencesResponse) stream | Get list of customer contact points by customer country codes and customer sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;AU&#34; &#34;customer_sequence&#34;: 101303 } ] }<br /><br />Response: { &#34;customer_contact_point&#34;: { &#34;customer_country_code&#34;: &#34;AU&#34;, &#34;customer_sequence&#34;: 202258, &#34;customer_contact_point_sequence&#34;: 1, &#34;customer_email&#34;: &#34;&#34;, &#34;international_phone_number&#34;: &#34;61&#34;, &#34;phone_number&#34;: &#34;3-99338488&#34;, &#34;international_fax_number&#34;: &#34;61&#34;, &#34;fax_number&#34;: &#34;3-99338499&#34; } } ... |
| SearchCustomerContactPointsByCustomerEmail | [SearchCustomerContactPointsByCustomerEmailRequest](#chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailRequest) | [SearchCustomerContactPointsByCustomerEmailResponse](#chorus-mdm-customer_contact_point-v1-SearchCustomerContactPointsByCustomerEmailResponse) stream | Search list of customer contact points by customer email.<br /><br />Operation: LIKE<br /><br />Request: { &#34;customer_email&#34;: &#34;lydie.caillaud&#34; }<br /><br />Response: { &#34;customer_contact_point&#34;: { &#34;customer_country_code&#34;: &#34;AU&#34;, &#34;customer_sequence&#34;: 202274, &#34;customer_contact_point_sequence&#34;: 1, &#34;customer_email&#34;: &#34;lydie.caillaud@intramar.com.au&#34;, &#34;international_phone_number&#34;: &#34;&#34;, &#34;phone_number&#34;: &#34;&#34;, &#34;international_fax_number&#34;: &#34;&#34;, &#34;fax_number&#34;: &#34;&#34; } } ... |

 



<a name="chorus_mdm_customer_fmc_loa_esignature_v1_customer_fmc_loa_esignature-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_fmc_loa_esignature/v1/customer_fmc_loa_esignature.proto



<a name="chorus-mdm-customer_fmc_loa_esignature-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer. |






<a name="chorus-mdm-customer_fmc_loa_esignature-v1-CustomerFmcLoaEsignature"></a>

### CustomerFmcLoaEsignature
The customer FMC LOA E-Signature information (mdm_cust_fmc_loa_esig).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer. cust_cnt_cd in OPUS. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer. cust_seq in OPUS. |
| loa_sequence | [int32](#int32) |  | The loa_sequence is the LOA sequence of the customer. loa_seq in OPUS. |
| esignature_user_id | [string](#string) |  | The esignature_user_id is the E-Signature user ID of the customer. esig_usr_id in OPUS. |






<a name="chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest"></a>

### GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest
Request message for `CustomerFmcLoaEsignatureInfoService.GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-customer_fmc_loa_esignature-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse"></a>

### GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse
Response message for `CustomerFmcLoaEsignatureInfoService.GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_fmc_loa_esignature | [CustomerFmcLoaEsignature](#chorus-mdm-customer_fmc_loa_esignature-v1-CustomerFmcLoaEsignature) |  | The customer FMC LOA E-Signature information. |





 

 

 


<a name="chorus-mdm-customer_fmc_loa_esignature-v1-CustomerFmcLoaEsignatureInfoService"></a>

### CustomerFmcLoaEsignatureInfoService
Services for customer FMC LOA E-Signature information.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequences | [GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesRequest) | [GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_fmc_loa_esignature-v1-GetCustomerFmcLoaEsignatureByCustomerCountryCodesAndSequencesResponse) stream | Get list of customer FMC LOA E-Signature information by customer country codes and sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;AU&#34; &#34;customer_sequence&#34;: 101303 } ] }<br /><br />Response: { &#34;customer_fmc_loa_esignature&#34;: { &#34;customer_country_code&#34;: &#34;AU&#34;, &#34;customer_sequence&#34;: 202258, &#34;loa_sequence&#34;: 1, &#34;esignature_user_id&#34;: &#34;GCLATL2820C&#34; } } ... |

 



<a name="chorus_mdm_customer_fmc_loa_v1_customer_fmc_loa-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_fmc_loa/v1/customer_fmc_loa.proto



<a name="chorus-mdm-customer_fmc_loa-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer country code of the customer FMC LOA. |
| customer_sequence | [int32](#int32) |  | The customer sequence of the customer FMC LOA. |






<a name="chorus-mdm-customer_fmc_loa-v1-CustomerFmcLoa"></a>

### CustomerFmcLoa
The customer federal maritime commission and logistics operator agreement information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the customer country code of the customer FMC LOA. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the customer sequence of the customer FMC LOA. cust_seq in OPUS |
| agent_customer_country_code | [string](#string) |  | The agent_customer_country_code is the agent customer country code of the customer FMC LOA. agn_cust_cnt_cd in OPUS |
| agent_customer_sequence | [int32](#int32) |  | The agent_customer_sequence is the agent customer sequence of the customer FMC LOA. agn_cust_seq in OPUS |
| loa_sequence | [int32](#int32) |  | The loa_sequence is the LOA sequence of the customer FMC LOA. loa_seq in OPUS |
| loa_type_code | [string](#string) |  | The loa_type_code is the LOA type code of the customer FMC LOA. loa_tp_cd in OPUS |






<a name="chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest"></a>

### GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest
Request message for `CustomerFmcLoaInfoService.GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-customer_fmc_loa-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse"></a>

### GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse
Response message for `CustomerFmcLoaInfoService.GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_fmc_loa | [CustomerFmcLoa](#chorus-mdm-customer_fmc_loa-v1-CustomerFmcLoa) |  | The customer FMC LOA information. |





 

 

 


<a name="chorus-mdm-customer_fmc_loa-v1-CustomerFmcLoaInfoService"></a>

### CustomerFmcLoaInfoService
Services for customer federal maritime commission and logistics operator agreement.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerFmcLoaByCustomerCountryCodesAndSequences | [GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesRequest) | [GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_fmc_loa-v1-GetCustomerFmcLoaByCustomerCountryCodesAndSequencesResponse) stream | Get list of customer FMC LOA by customer country codes and customer sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;VN&#34;, &#34;customer_sequence&#34;: 511136 } ] }<br /><br />Response: { &#34;customer_fmc_loa&#34;: { &#34;customer_country_code&#34;: &#34;VN&#34;, &#34;customer_sequence&#34;: &#34;511136&#34;, &#34;agent_customer_country_code&#34;: &#34;VN&#34;, &#34;agent_customer_sequence&#34;: &#34;511136&#34;, &#34;loa_sequence&#34;: &#34;1&#34;, &#34;loa_type_code&#34;: &#34;P&#34;, } } ... |

 



<a name="chorus_mdm_customer_india_information_v1_customer_india_information-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_india_information/v1/customer_india_information.proto



<a name="chorus-mdm-customer_india_information-v1-CustomerCountryCodeAndSequence"></a>

### CustomerCountryCodeAndSequence
The customer country code and sequence.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer india information. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the sequence of the customer india information. |






<a name="chorus-mdm-customer_india_information-v1-CustomerIndiaInformation"></a>

### CustomerIndiaInformation
The customer india information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of the customer india information. cust_cnt_cd in OPUS. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the sequence of the customer india information. cust_seq in OPUS. |
| india_gst_number | [string](#string) |  | The india_gst_number is the india gst number of the customer india information. india_gst_no in OPUS. |
| sez_flag | [string](#string) |  | The sez_flag is the sez flag of the customer india information. sez_flg in OPUS. |






<a name="chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest"></a>

### GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest
Request message for `CustomerIndiaInformationInfoService.GetCustomerIndiaInformationByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_sequence_list | [CustomerCountryCodeAndSequence](#chorus-mdm-customer_india_information-v1-CustomerCountryCodeAndSequence) | repeated | The customer country code and sequence list. |






<a name="chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse"></a>

### GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse
Response message for `CustomerIndiaInformationInfoService.GetCustomerIndiaInformationByCustomerCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_india_information | [CustomerIndiaInformation](#chorus-mdm-customer_india_information-v1-CustomerIndiaInformation) |  | The customer india information. |





 

 

 


<a name="chorus-mdm-customer_india_information-v1-CustomerIndiaInformationInfoService"></a>

### CustomerIndiaInformationInfoService
Services for customer india information.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerIndiaInformationByCustomerCountryCodesAndSequences | [GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest](#chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesRequest) | [GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse](#chorus-mdm-customer_india_information-v1-GetCustomerIndiaInformationByCustomerCountryCodesAndSequencesResponse) stream | Get list of customer india information by country codes and sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;IN&#34;, &#34;customer_sequence&#34;: 500007 }, ] }<br /><br />Response: { &#34;customer_india_information&#34;: { &#34;customer_country_code&#34;: &#34;IN&#34;, &#34;customer_sequence&#34;: 500007, &#34;india_gst_number&#34;: &#34;27&#34;, &#34;sez_flag&#34;: &#34;N&#34;, } } ... |

 



<a name="chorus_mdm_customer_performance_group_v1_customer_performance_group-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer_performance_group/v1/customer_performance_group.proto



<a name="chorus-mdm-customer_performance_group-v1-CustomerGroupId"></a>

### CustomerGroupId
The customer group id information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_group_id | [string](#string) |  | The customer group id of customer performance group |






<a name="chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroup"></a>

### CustomerPerformanceGroup
The Customer performance group information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_group_id | [string](#string) |  | The customer group id is the customer group id of the customer performance group. cust_grp_id in OPUS. |
| customer_group_name | [string](#string) |  | The customer group name is the customer group name of the customer performance group. cust_grp_nm in OPUS. |
| office_code | [string](#string) |  | The office code is the office code of the customer performance group. ofc_cd in OPUS. |
| sales_representative_code | [string](#string) |  | The sales_representative_code is the sales representative code of the customer performance group. srep_cd in OPUS. |






<a name="chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsRequest"></a>

### GetCustomerPerformanceGroupsByCustomerGroupIdsRequest
Request message for `CustomerPerformanceGroupInfoService.GetCustomerPerformanceGroupsByCustomerGroupIds`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_group_id_list | [CustomerGroupId](#chorus-mdm-customer_performance_group-v1-CustomerGroupId) | repeated | The customer group code list. |






<a name="chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsResponse"></a>

### GetCustomerPerformanceGroupsByCustomerGroupIdsResponse
Response message for `CustomerPerformanceGroupInfoService.GetCustomerPerformanceGroupsByCustomerGroupIds`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_performance_group | [CustomerPerformanceGroup](#chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroup) |  | The customer performance group information. |






<a name="chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameRequest"></a>

### SearchCustomerPerformanceGroupsByCustomerGroupNameRequest
Request message for `CustomerPerformanceGroupInfoService.SearchCustomerPerformanceGroupsByCustomerGroupName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_group_name | [string](#string) |  | The customer group name. |






<a name="chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameResponse"></a>

### SearchCustomerPerformanceGroupsByCustomerGroupNameResponse
Response message for `CustomerPerformanceGroupInfoService.SearchCustomerPerformanceGroupsByCustomerGroupName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_performance_group | [CustomerPerformanceGroup](#chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroup) |  | The customer performance group information. |





 

 

 


<a name="chorus-mdm-customer_performance_group-v1-CustomerPerformanceGroupInfoService"></a>

### CustomerPerformanceGroupInfoService
Services for customer performance group.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomerPerformanceGroupsByCustomerGroupIds | [GetCustomerPerformanceGroupsByCustomerGroupIdsRequest](#chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsRequest) | [GetCustomerPerformanceGroupsByCustomerGroupIdsResponse](#chorus-mdm-customer_performance_group-v1-GetCustomerPerformanceGroupsByCustomerGroupIdsResponse) stream | Get list of customer performance groups by customer group id list.<br /><br />Operation: MATCH<br /><br />Request: { &#34;customer_group_id_list&#34;: [ { &#34;customer_group_id&#34;: &#34;G-US125401&#34; } ] }<br /><br />Response: { &#34;customer_performance_group&#34;: { &#34;customer_group_id&#34;: &#34;G-US125401&#34;, &#34;customer_group_name&#34;: &#34;TLR TOTAL LOGISTICS RESOURCE&#34;, &#34;office_code&#34;: &#34;SEABB&#34;, &#34;sales_representative_code&#34;: &#34;US083&#34; } } ... |
| SearchCustomerPerformanceGroupsByCustomerGroupName | [SearchCustomerPerformanceGroupsByCustomerGroupNameRequest](#chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameRequest) | [SearchCustomerPerformanceGroupsByCustomerGroupNameResponse](#chorus-mdm-customer_performance_group-v1-SearchCustomerPerformanceGroupsByCustomerGroupNameResponse) stream | Search list of customer performance groups by customer group name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;customer_group_name&#34;: &#34;TOTAL&#34; }<br /><br />Response: { &#34;customer_performance_group&#34;: { &#34;customer_group_id&#34;: &#34;G-US125401&#34;, &#34;customer_group_name&#34;: &#34;TLR TOTAL LOGISTICS RESOURCE&#34;, &#34;office_code&#34;: &#34;SEABB&#34;, &#34;sales_representative_code&#34;: &#34;US083&#34; } } ... |

 



<a name="chorus_mdm_customer_v1_customer-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/customer/v1/customer.proto



<a name="chorus-mdm-customer-v1-CountryCodeAndSequence"></a>

### CountryCodeAndSequence
The customer code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer country code |
| customer_sequence | [int32](#int32) |  | The customer sequence |






<a name="chorus-mdm-customer-v1-Customer"></a>

### Customer
The customer information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is the country code of Customer. cust_cnt_cd in OPUS |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the sequence of Customer. cust_seq in OPUS |
| customer_legal_english_name | [string](#string) |  | The customer_legal_english_name is the legal English name of Customer. cust_lgl_eng_nm in OPUS |
| office_code | [string](#string) |  | The office_code is the office code of Customer. ofc_cd in OPUS |
| location_code | [string](#string) |  | The location_code of Customer. loc_cd in OPUS |
| container_customer_type_code | [string](#string) |  | The container_customer_type_code is the container customer type code of Customer. cntr_cust_tp_cd in OPUS |






<a name="chorus-mdm-customer-v1-CustomerCountryCodeAndCustomerSequenceData"></a>

### CustomerCountryCodeAndCustomerSequenceData
The customer country code and customer sequence information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code_and_customer_sequence_list | [CountryCodeAndSequence](#chorus-mdm-customer-v1-CountryCodeAndSequence) | repeated | The customer code list |






<a name="chorus-mdm-customer-v1-CustomerSearchPopup"></a>

### CustomerSearchPopup
The customer search information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_country_code | [string](#string) |  | The customer_country_code is customer country code of the customer. cust_cnt_cd in OPUS. |
| customer_sequence | [int32](#int32) |  | The customer_sequence is the sequence of the customer .cust_seq in OPUS. |
| modified_customer_code2 | [string](#string) |  | The modified_customer_code2 is the modified customer code 2 of the customer. modi_cust_cd2 in OPUS. |
| customer_local_language_name | [string](#string) |  | The customer_local_language_name is the customer_local_language_name of the customer. cust_locl_lang_nm in OPUS. |
| sales_delete_effective_date | [string](#string) |  | The sales_delete_effective_date is the sales delete effective date of the customer. sls_delt_eff_dt in OPUS. |
| office_code | [string](#string) |  | The office_code is the office code of the customer. ofc_cd in OPUS. |
| customer_register_number | [string](#string) |  | The customer_register_number is the customer register number of the customer. cust_rgst_no in OPUS. |
| location_code | [string](#string) |  | The location_code is the location code of the customer. loc_cd in OPUS. |
| container_customer_type_code | [string](#string) |  | The container_customer_type_code is the container customer type code of the customer. cntr_cust_tp_cd in OPUS. |
| customer_group_id | [string](#string) |  | The customer_group_id is the customer group id of the customer. cust_grp_id in OPUS. |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the vendor sequence of the customer. vndr_seq in OPUS. |
| customer_legal_english_name | [string](#string) |  | The customer_legal_english_name is the legal English name of Customer. cust_lgl_eng_nm in OPUS |






<a name="chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesRequest"></a>

### GetCustomersByCountryCodesAndSequencesRequest
Request message for `CustomerInfoService.GetCustomersByCountryCodesAndSequencesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code_and_sequence_list | [CountryCodeAndSequence](#chorus-mdm-customer-v1-CountryCodeAndSequence) | repeated | The customer code list |






<a name="chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesResponse"></a>

### GetCustomersByCountryCodesAndSequencesResponse
Response message for `CustomerInfoService.GetCustomersByCountryCodesAndSequencesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer | [Customer](#chorus-mdm-customer-v1-Customer) |  | The customer information |






<a name="chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameRequest"></a>

### SearchCustomersByLegalEnglishNameRequest
Request message for `CustomerInfoService.SearchCustomersByLegalEnglishNameRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| search_string | [string](#string) |  | The customer legal English name information |






<a name="chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameResponse"></a>

### SearchCustomersByLegalEnglishNameResponse
Response message for `CustomerInfoService.SearchCustomersByLegalEnglishNameResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer | [Customer](#chorus-mdm-customer-v1-Customer) |  | The customer information |






<a name="chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsRequest"></a>

### SearchCustomersByMultipleFieldsRequest
Request message for `CustomerInfoService.SearchCustomersByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer_code | [string](#string) | optional | The customer_code is customer code of the customer. Concatenate cust_cnt_cd and cust_seq in OPUS. |
| customer_name | [string](#string) | optional | The customer_name is either cust_lgl_eng_nm or cust_locl_lang_nm in OPUS. |
| office_code | [string](#string) | optional | The office_code is the office code of the customer. ofc_cd in OPUS. |
| location_code | [string](#string) | optional | The location_code is the location code of the customer. loc_cd in OPUS. |
| customer_register_number | [string](#string) | optional | The customer_register_number is the customer register number of the customer. cust_rgst_no in OPUS. |
| named_customer_flag | [string](#string) |  | The named_customer_flag is the named customer flag of the customer. nmd_cust_flg in OPUS. |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | The pagination info. |
| order_by | [chorus.mdm.base.v1.OrderBy](#chorus-mdm-base-v1-OrderBy) | repeated | The order by list |
| is_sales_deleted | [bool](#bool) |  | The status of sales effective date. |
| check_for_customer_legal_english_name_only | [bool](#bool) | optional | The check logic for customer_name should apply for only cust_lgl_eng_nm if true, both cust_lgl_eng_nm or cust_locl_lang_nm if false. |
| customer_country_code_and_customer_sequence_data | [CustomerCountryCodeAndCustomerSequenceData](#chorus-mdm-customer-v1-CustomerCountryCodeAndCustomerSequenceData) | optional | customer country code and customer sequence data. |






<a name="chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsResponse"></a>

### SearchCustomersByMultipleFieldsResponse
Response message for `CustomerInfoService.SearchCustomersByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| customer | [CustomerSearchPopup](#chorus-mdm-customer-v1-CustomerSearchPopup) |  | The customer information. |





 

 

 


<a name="chorus-mdm-customer-v1-CustomerInfoService"></a>

### CustomerInfoService
The service that implements the CustomerInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetCustomersByCountryCodesAndSequences | [GetCustomersByCountryCodesAndSequencesRequest](#chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesRequest) | [GetCustomersByCountryCodesAndSequencesResponse](#chorus-mdm-customer-v1-GetCustomersByCountryCodesAndSequencesResponse) stream | Get list of customers by country codes and sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;country_code_and_sequence_list&#34;: [ { &#34;customer_country_code&#34;: &#34;JP&#34;, &#34;customer_sequence&#34;: &#34;210679&#34; } { &#34;customer_country_code&#34;: &#34;JPP&#34;, &#34;customer_sequence&#34;: &#34;&#34; } ] }<br /><br />Response: { &#34;customer&#34;: { &#34;customer_country_code&#34;: &#34;JP&#34;, &#34;customer_sequence&#34;: &#34;210679&#34;, &#34;customer_legal_english_name&#34;: &#34;YAMATO TRADING CORP.,&#34;, &#34;office_code&#34;: &#34;TYOBB&#34;, &#34;location_code&#34;: &#34;JPKSB&#34;, &#34;container_customer_type_code&#34;: &#34;N&#34; } } ... |
| SearchCustomersByLegalEnglishName | [SearchCustomersByLegalEnglishNameRequest](#chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameRequest) | [SearchCustomersByLegalEnglishNameResponse](#chorus-mdm-customer-v1-SearchCustomersByLegalEnglishNameResponse) stream | Search list of customers by legal English name<br /><br />Operation: LIKE<br /><br />Request: { &#34;search_string&#34;: &#34;YAMATO&#34; }<br /><br />Response: { &#34;customer&#34;: { &#34;customer_country_code&#34;: &#34;JP&#34;, &#34;customer_sequence&#34;: &#34;210679&#34;, &#34;customer_legal_english_name&#34;: &#34;YAMATO TRADING CORP.,&#34;, &#34;office_code&#34;: &#34;TYOBB&#34;, &#34;location_code&#34;: &#34;JPKSB&#34;, &#34;container_customer_type_code&#34;: &#34;N&#34; } } ... |
| SearchCustomersByMultipleFields | [SearchCustomersByMultipleFieldsRequest](#chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsRequest) | [SearchCustomersByMultipleFieldsResponse](#chorus-mdm-customer-v1-SearchCustomersByMultipleFieldsResponse) stream | Search list of customers by by multiple fields<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;customer_code&#34; : &#34;JP210679&#34;, &#34;customer_name&#34; : &#34;YAMATO TRADING CORP&#34;, &#34;office_code&#34; : &#34;TYOBB&#34;, &#34;location_code&#34; : &#34;AR&#34;, &#34;customer_register_number&#34; : &#34;DE304310599&#34;, &#34;named_customer_flag&#34; : &#34;N&#34;, &#34;is_sales_deleted&#34; : true, &#34;pagination&#34; : { offset : 0, limit : 10, }, }<br /><br />Response: { &#34;customer&#34;: { &#34;customer_country_code&#34;: &#34;JP&#34;, &#34;customer_sequence&#34;: 210679, &#34;modified_customer_code2&#34;: &#34;YAMATO TRADING CORP.,&#34;, &#34;customer_local_language_name&#34;: &#34;TYOBB&#34;, &#34;office_code&#34;: &#34;JPKSB&#34;, &#34;customer_register_number&#34;: &#34;DE304310599&#34;, &#34;location_code&#34;: &#34;JPKSB&#34;, &#34;container_customer_type_code&#34;: &#34;B&#34;, &#34;customer_group_id&#34;: &#34;G-DE105150&#34;, &#34;vendor_sequence&#34;: 100411, &#34;customer_legal_english_name&#34;: &#39;YAMATO TRADING CORP.,&#39;, } } ... |

 



<a name="chorus_mdm_data_change_history_v1_data_change_history-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/data_change_history/v1/data_change_history.proto



<a name="chorus-mdm-data_change_history-v1-DataChangeHistory"></a>

### DataChangeHistory
The data change history information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| change_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The change_date is the change date of the data change history. cng_dt in OPUS |
| table_name | [string](#string) |  | The table_name is the table name of the data change history. tbl_nm in OPUS |
| column_name | [string](#string) |  | The column_name is the column name of the data change history. col_nm in OPUS |
| change_sequence | [int32](#int32) |  | The change_sequence is the change sequence of the data change history. cng_seq in OPUS |
| first_key_column_name | [string](#string) |  | The first_key_column_name is the first key column name of the data change history. n1st_key_col_nm in OPUS |
| second_key_column_name | [string](#string) |  | The second_key_column_name is the second key column name of the data change history. n2nd_key_col_nm in OPUS |
| third_key_column_name | [string](#string) |  | The third_key_column_name is the third key column name of the data change history. n3rd_key_col_nm in OPUS |
| fourth_key_column_name | [string](#string) |  | The fourth_key_column_name is the fourth key column name of the data change history. n4th_key_col_nm in OPUS |
| fifth_key_column_name | [string](#string) |  | The fifth_key_column_name is the fifth key column name of the data change history. n5th_key_col_nm in OPUS |
| previous_content | [string](#string) |  | The previous_content is the previous content of the data change history. pre_ctnt in OPUS |
| after_content | [string](#string) |  | The after_content is the after content of the data change history. aft_ctnt in OPUS |






<a name="chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesRequest"></a>

### GetDataChangeHistoryByTableNamesRequest
Request message for `DataChangeHistoryService.GetDataChangeHistoryByTableNamesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| table_name_list | [TableName](#chorus-mdm-data_change_history-v1-TableName) | repeated | The table name list. |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | The pagination info. |






<a name="chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesResponse"></a>

### GetDataChangeHistoryByTableNamesResponse
Response message for `DataChangeHistoryService.GetDataChangeHistoryByTableNames`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_change_history | [DataChangeHistory](#chorus-mdm-data_change_history-v1-DataChangeHistory) |  | The data change history information. |






<a name="chorus-mdm-data_change_history-v1-TableName"></a>

### TableName
The table name information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| table_name | [string](#string) |  | The table name of the data change history. |





 

 

 


<a name="chorus-mdm-data_change_history-v1-DataChangeHistoryInfoService"></a>

### DataChangeHistoryInfoService
Services for data change history.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetDataChangeHistoryByTableNames | [GetDataChangeHistoryByTableNamesRequest](#chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesRequest) | [GetDataChangeHistoryByTableNamesResponse](#chorus-mdm-data_change_history-v1-GetDataChangeHistoryByTableNamesResponse) stream | Get list of data change history by table names.<br /><br />Operation: MATCH<br /><br />Request: { &#34;table_name_list&#34;: [ { &#34;table_name&#34;: &#34;MDM_CUSTOMER&#34; }, { &#34;table_name&#34;: &#34;MDM_EXAMPLE&#34; } ], &#34;pagination&#34; : { offset : 0, limit : 10, }, }<br /><br />Response: { &#34;data_change_history&#34;: { &#34;change_date&#34;: { &#34;seconds&#34;: &#34;1567417581&#34;, &#34;nanos&#34;: 0 }, &#34;table_name&#34;: &#34;MDM_CUSTOMER&#34;, &#34;column_name&#34;: &#34;OFC_CD&#34;, &#34;change_sequence&#34;: &#34;424&#34;, &#34;first_key_column_name&#34;: &#34;MX&#34;, &#34;second_key_column_name&#34;: &#34;301494&#34;, &#34;third_key_column_name&#34;: null, &#34;fourth_key_column_name&#34;: null, &#34;fifth_key_column_name&#34;: null, &#34;previous_content&#34;: &#34;MEXHQ&#34;, &#34;after_content&#34;: &#34;SAOHQ&#34; } } ... |

 



<a name="chorus_mdm_data_process_v1_data_process-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/data_process/v1/data_process.proto



<a name="chorus-mdm-data_process-v1-DataProcess"></a>

### DataProcess
The Data Request/Approval/Reject Status.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_no | [string](#string) |  | The request no. of the data process. |
| master_data_subject_code | [string](#string) |  | The master data subject code. |
| request_user_id | [string](#string) |  | The request user id. |
| request_office_code | [string](#string) |  | The request office code |
| approval_user_id | [string](#string) |  | The approval user id. |
| process_type_code | [string](#string) |  | The process type code. |
| reject_remark | [string](#string) |  | The reject remark. |
| approval_remark | [string](#string) |  | The approval remark. |
| delete_flag | [string](#string) |  | The delete flag. |






<a name="chorus-mdm-data_process-v1-SearchByRequestNoRequest"></a>

### SearchByRequestNoRequest
Request message for `DataProcessService.SearchByRequestNo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request_no | [string](#string) |  | The Request no. |






<a name="chorus-mdm-data_process-v1-SearchByRequestNoResponse"></a>

### SearchByRequestNoResponse
Response message for `DataProcessService.SearchByRequestNo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_process | [DataProcess](#chorus-mdm-data_process-v1-DataProcess) |  | The data process. |





 

 

 


<a name="chorus-mdm-data_process-v1-DataProcessService"></a>

### DataProcessService
Services for data process.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchByRequestNo | [SearchByRequestNoRequest](#chorus-mdm-data_process-v1-SearchByRequestNoRequest) | [SearchByRequestNoResponse](#chorus-mdm-data_process-v1-SearchByRequestNoResponse) stream | Search data process by request no.<br /><br />Operation: LIKE<br /><br />Request: { &#34;request_no&#34;: &#34;20210101000001&#34; }<br /><br />Response: { &#34;data_process&#34;: { &#34;request_no&#34;: &#34;20210101000001&#34;, &#34;master_data_subject_code&#34;: &#34;MDSC001&#34;, &#34;request_user_id&#34;: &#34;USER001&#34;, &#34;request_office_code&#34;: &#34;OFFICE001&#34;, &#34;approval_user_id&#34;: &#34;USER002&#34;, &#34;process_type_code&#34;: &#34;PTC001&#34;, &#34;reject_remark&#34;: &#34;Reject Remark&#34;, &#34;approval_remark&#34;: &#34;Approval Remark&#34;, &#34;delete_flag&#34;: &#34;N&#34; } } ... |

 



<a name="chorus_mdm_daylight_saving_time_v1_daylight_saving_time-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/daylight_saving_time/v1/daylight_saving_time.proto



<a name="chorus-mdm-daylight_saving_time-v1-DaylightSavingTime"></a>

### DaylightSavingTime
The daylight saving time information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time_id | [string](#string) |  | The daylight_saving_time_id is the id of the daylight saving time. dst_id in OPUS. |
| daylight_saving_time_country_code | [string](#string) |  | The daylight_saving_time_country_code is the country code of the daylight saving time. dst_cnt_cd in OPUS. |
| daylight_saving_time_not_apply_state_code | [string](#string) |  | The daylight_saving_time_not_apply_state_code is the not apply state code of the daylight saving time. dst_not_aply_ste_cd in OPUS. |
| daylight_saving_time_year | [string](#string) |  | The daylight_saving_time_year is the year of the daylight saving time. dst_yr in OPUS. |
| daylight_saving_time_minutes | [string](#string) |  | The daylight_saving_time_minutes is the minutes of the daylight saving time. dst_mnts in OPUS. |
| start_daylight_saving_time_date | [string](#string) |  | The start_daylight_saving_time_date is the start date of the daylight saving time. st_dst_dt in OPUS. |
| end_daylight_saving_time_date | [string](#string) |  | The end_daylight_saving_time_date is the end date of the daylight saving time. end_dst_dt in OPUS. |
| start_daylight_saving_time_hour_minute | [string](#string) |  | The start_daylight_saving_time_hour_minute is the start hour minute of the daylight saving time. st_dst_hrmnt in OPUS. |
| end_daylight_saving_time_hour_minute | [string](#string) |  | The end_daylight_saving_time_hour_minute is the end hour minute of the daylight saving time. end_dst_hrmnt in OPUS. |






<a name="chorus-mdm-daylight_saving_time-v1-DaylightSavingTimeCountryCode"></a>

### DaylightSavingTimeCountryCode
The daylight saving time country code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time_contry_code | [string](#string) |  | The country code of the daylight saving time. |
| daylight_saving_time_year | [string](#string) | optional | The year of the daylight saving time. |






<a name="chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesRequest"></a>

### GetDaylightSavingTimesByCodesRequest
Request message for `DaylightSavingTimeInfoService.GetDaylightSavingTimesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time_contry_code_list | [DaylightSavingTimeCountryCode](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTimeCountryCode) | repeated | The daylight saving time country code list. |






<a name="chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesResponse"></a>

### GetDaylightSavingTimesByCodesResponse
Response message for `DaylightSavingTimeInfoService.GetDaylightSavingTimesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time | [DaylightSavingTime](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTime) |  | The daylight saving time information. |






<a name="chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoRequest"></a>

### GetDaylightSavingTimesByInfoRequest
Request message for `DaylightSavingTimeInfoService.GetDaylightSavingTimesByInfo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time_country_code | [string](#string) |  | The country code of the daylight saving time. |
| daylight_saving_time_not_apply_state_code | [string](#string) |  | The not apply state code of the daylight saving time. |
| start_daylight_saving_time_date | [string](#string) |  | The start date of the daylight saving time. |
| end_daylight_saving_time_date | [string](#string) |  | The end date of the daylight saving time. |
| start_daylight_saving_time_hour_minute | [string](#string) |  | The start hour minute of the daylight saving time. |
| end_daylight_saving_time_hour_minute | [string](#string) |  | The end hour minute of the daylight saving time. |






<a name="chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoResponse"></a>

### GetDaylightSavingTimesByInfoResponse
Response message for `DaylightSavingTimeInfoService.GetDaylightSavingTimesByInfo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| daylight_saving_time | [DaylightSavingTime](#chorus-mdm-daylight_saving_time-v1-DaylightSavingTime) |  | The daylight saving time information. |





 

 

 


<a name="chorus-mdm-daylight_saving_time-v1-DaylightSavingTimeInfoService"></a>

### DaylightSavingTimeInfoService
Services for daylight saving time.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetDaylightSavingTimesByCodes | [GetDaylightSavingTimesByCodesRequest](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesRequest) | [GetDaylightSavingTimesByCodesResponse](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByCodesResponse) stream | Get list of daylight saving times by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;daylight_saving_time_contry_code_list&#34;: [ { &#34;daylight_saving_time_year&#34;: &#34;2019&#34;, &#34;daylight_saving_time_contry_code&#34;: &#34;BG&#34; }, { &#34;daylight_saving_time_contry_code&#34;: &#34;CZ&#34; } ] }<br /><br />Response: { &#34;daylight_saving_time&#34;: { &#34;daylight_saving_time_id&#34;: &#34;19BG01&#34;, &#34;daylight_saving_time_country_code&#34;: &#34;BG&#34;, &#34;daylight_saving_time_not_apply_state_code&#34;: &#34;&#34;, &#34;daylight_saving_time_year&#34;: &#34;2019&#34;, &#34;daylight_saving_time_minutes&#34;: &#34;60&#34;, &#34;start_daylight_saving_time_date&#34;: &#34;20190331&#34;, &#34;end_daylight_saving_time_date&#34;: &#34;20191027&#34;, &#34;start_daylight_saving_time_hour_minute&#34;: &#34;0100&#34;, &#34;end_daylight_saving_time_hour_minute&#34;: &#34;0200&#34; } } ... |
| GetDaylightSavingTimesByInfo | [GetDaylightSavingTimesByInfoRequest](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoRequest) | [GetDaylightSavingTimesByInfoResponse](#chorus-mdm-daylight_saving_time-v1-GetDaylightSavingTimesByInfoResponse) stream | Get list of daylight saving times by info.<br /><br />Operation: MATCH<br /><br />Request: { &#34;daylight_saving_time_country_code&#34;: &#34;BG&#34;, &#34;daylight_saving_time_not_apply_state_code&#34;: &#34;&#34;, &#34;end_daylight_saving_time_date&#34;: &#34;20191027&#34;, &#34;end_daylight_saving_time_hour_minute&#34;: &#34;0100&#34;, &#34;start_daylight_saving_time_date&#34;: &#34;20190331&#34;, &#34;start_daylight_saving_time_hour_minute&#34;: &#34;0200&#34; }<br /><br />Response: { &#34;daylight_saving_time&#34;: { &#34;daylight_saving_time_id&#34;: &#34;19BG01&#34;, &#34;daylight_saving_time_country_code&#34;: &#34;BG&#34;, &#34;daylight_saving_time_not_apply_state_code&#34;: &#34;&#34;, &#34;daylight_saving_time_year&#34;: &#34;2019&#34;, &#34;daylight_saving_time_minutes&#34;: &#34;60&#34;, &#34;start_daylight_saving_time_date&#34;: &#34;20190331&#34;, &#34;end_daylight_saving_time_date&#34;: &#34;20191027&#34;, &#34;start_daylight_saving_time_hour_minute&#34;: &#34;0100&#34;, &#34;end_daylight_saving_time_hour_minute&#34;: &#34;0200&#34; } } ... |

 



<a name="chorus_mdm_detail_revenue_lane_v1_detail_revenue_lane-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/detail_revenue_lane/v1/detail_revenue_lane.proto



<a name="chorus-mdm-detail_revenue_lane-v1-DetailRevenueLane"></a>

### DetailRevenueLane
The detail revenue lane information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane_code | [string](#string) |  | The revenue_lane_code is the revenue lane code of the detail revenue lane. rlane_cd in OPUS. |
| vessel_service_lane_direction_code | [string](#string) |  | The vessel_service_lane_direction_code is the vessel service lane direction code of the detail revenue lane. vsl_slan_dir_cd in OPUS. |
| interport_ocean_code | [string](#string) |  | The interport_ocean_code is the interport/ocean code of the detail revenue lane. ioc_cd in OPUS. |
| from_continent_code | [string](#string) |  | The from_continent_code is the from continent code of the detail revenue lane. fm_conti_cd in OPUS. |
| to_continent_code | [string](#string) |  | The to_continent_code is the to continent code of the detail revenue lane. to_conti_cd in OPUS. |
| trade_code | [string](#string) |  | The trade_code is the trade code of the detail revenue lane. trd_cd in OPUS. |
| sub_trade_code | [string](#string) |  | The sub_trade_code is the sub trade code of the detail revenue lane. sub_trd_cd in OPUS. |






<a name="chorus-mdm-detail_revenue_lane-v1-DetailRevenueLaneMultipleFields"></a>

### DetailRevenueLaneMultipleFields
The detail revenue lane multiple fields information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane_code | [string](#string) |  | The revenue_lane_code is the revenue lane code of the detail revenue lane. rlane_cd in OPUS. |
| vessel_service_lane_direction_code | [string](#string) |  | The vessel_service_lane_direction_code is the vessel service lane direction code of the detail revenue lane. vsl_slan_dir_cd in OPUS. |
| from_continent_code | [string](#string) |  | The from_continent_code is the from continent code of the detail revenue lane. fm_conti_cd in OPUS. |
| to_continent_code | [string](#string) |  | The to_continent_code is the to continent code of the detail revenue lane. to_conti_cd in OPUS. |






<a name="chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsRequest"></a>

### GetDetailRevenueLanesByMultipleFieldsRequest
Request message for `DetailRevenueLaneInfoService.GetDetailRevenueLanesByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| detail_revenue_lane_multiple_fields_list | [DetailRevenueLaneMultipleFields](#chorus-mdm-detail_revenue_lane-v1-DetailRevenueLaneMultipleFields) | repeated | The detail revenue lane multiple fields list |






<a name="chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsResponse"></a>

### GetDetailRevenueLanesByMultipleFieldsResponse
Response message for `DetailRevenueLaneInfoService.GetDetailRevenueLanesByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| detail_revenue_lane | [DetailRevenueLane](#chorus-mdm-detail_revenue_lane-v1-DetailRevenueLane) |  | The detail revenue lane information. |





 

 

 


<a name="chorus-mdm-detail_revenue_lane-v1-DetailRevenueLaneInfoService"></a>

### DetailRevenueLaneInfoService
Services for detail revenue lane.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetDetailRevenueLanesByMultipleFields | [GetDetailRevenueLanesByMultipleFieldsRequest](#chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsRequest) | [GetDetailRevenueLanesByMultipleFieldsResponse](#chorus-mdm-detail_revenue_lane-v1-GetDetailRevenueLanesByMultipleFieldsResponse) stream | Get list of detail revenue lanes by detail revenue lane multiple fields.<br /><br />Operation: MATCH<br /><br />Request: { &#34;detail_revenue_lane_multiple_fields_list&#34;: [ { &#34;revenue_lane_code&#34;: &#34;RBCCO&#34; &#34;vessel_service_lane_direction_code&#34;: &#34;E&#34; &#34;from_continent_code&#34;: &#34;A&#34; &#34;to_continent_code&#34;: &#34;E&#34; } ] }<br /><br />Response: { &#34;detail_revenue_lane&#34;: { &#34;revenue_lane_code&#34;: &#34;RBCCO&#34; &#34;vessel_service_lane_direction_code&#34;: &#34;E&#34; &#34;interport_ocean_code&#34;: &#34;I&#34; &#34;from_continent_code&#34;: &#34;A&#34; &#34;to_continent_code&#34;: &#34;E&#34; &#34;trade_code&#34;: &#34;EAT&#34; &#34;sub_trade_code&#34;: &#34;EA&#34; } } ... |

 



<a name="chorus_mdm_equipment_organization_chart_v1_equipment_organization_chart-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/equipment_organization_chart/v1/equipment_organization_chart.proto



<a name="chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChart"></a>

### EquipmentOrganizationChart
The Equipment Organization Chart record information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scc_code | [string](#string) |  | The scc_code is the scc code of Equipment Organization Chart. scc_cd in OPUS |
| ecc_code | [string](#string) |  | The ecc_code is the ecc code of Equipment Organization Chart. ecc_cd in OPUS |
| lcc_code | [string](#string) |  | The lcc_code is the lcc code of Equipment Organization Chart. lcc_cd in OPUS |
| rcc_code | [string](#string) |  | The rcc_code is the rcc code of Equipment Organization Chart. rcc_cd in OPUS |






<a name="chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesRequest"></a>

### GetEquipmentOrganizationChartsByRccCodesRequest
Request message for `EquipmentOrganizationChartInfoService.GetEquipmentOrganizationChartsByRccCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rcc_code_list | [RccCode](#chorus-mdm-equipment_organization_chart-v1-RccCode) | repeated | The Equipment Organization Chart rcc code list |






<a name="chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesResponse"></a>

### GetEquipmentOrganizationChartsByRccCodesResponse
Response message for `EquipmentOrganizationChartInfoService.GetEquipmentOrganizationChartsByRccCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| equipment_organization_chart | [EquipmentOrganizationChart](#chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChart) |  | The Equipment Organization Chart information |






<a name="chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesRequest"></a>

### GetEquipmentOrganizationChartsBySccCodesRequest
Request message for `EquipmentOrganizationChartInfoService.GetEquipmentOrganizationChartsBySccCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scc_code_list | [SccCode](#chorus-mdm-equipment_organization_chart-v1-SccCode) | repeated | The Equipment Organization Chart scc code list |






<a name="chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesResponse"></a>

### GetEquipmentOrganizationChartsBySccCodesResponse
Response message for `EquipmentOrganizationChartInfoService.GetEquipmentOrganizationChartsBySccCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| equipment_organization_chart | [EquipmentOrganizationChart](#chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChart) |  | The Equipment Organization Chart information |






<a name="chorus-mdm-equipment_organization_chart-v1-GetRccCodesResponse"></a>

### GetRccCodesResponse
Response message for `EquipmentOrganizationChartInfoService.GetAllRccCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rcc_code | [string](#string) |  | The rcc code |






<a name="chorus-mdm-equipment_organization_chart-v1-RccCode"></a>

### RccCode
The rcc code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rcc_code | [string](#string) |  | The rcc code |






<a name="chorus-mdm-equipment_organization_chart-v1-SccCode"></a>

### SccCode
The scc code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scc_code | [string](#string) |  | The scc code |





 

 

 


<a name="chorus-mdm-equipment_organization_chart-v1-EquipmentOrganizationChartInfoService"></a>

### EquipmentOrganizationChartInfoService
The service that implements the EquipmentOrganizationChartInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetEquipmentOrganizationChartsBySccCodes | [GetEquipmentOrganizationChartsBySccCodesRequest](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesRequest) | [GetEquipmentOrganizationChartsBySccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsBySccCodesResponse) stream | Get the list of Equipment Organization Charts by scc codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;scc_code_list&#34;: [ { &#34;scc_code&#34; : &#34;BRPTV&#34; } ] }<br /><br />Response: { &#34;equipment_organization_chart&#34;: { &#34;scc_code&#34;: &#34;BRPTV&#34;, &#34;ecc_code&#34;: &#34;BRPTV&#34;, &#34;lcc_code&#34;: &#34;BRMAO&#34;, &#34;rcc_code&#34;: &#34;PAMIT&#34; } } / ... |
| GetEquipmentOrganizationChartsByRccCodes | [GetEquipmentOrganizationChartsByRccCodesRequest](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesRequest) | [GetEquipmentOrganizationChartsByRccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetEquipmentOrganizationChartsByRccCodesResponse) stream | Get the list of Equipment Organization Charts by rcc codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;rcc_code_list&#34;: [ { &#34;rcc_code&#34; : &#34;TYOBB&#34; } ] }<br /><br />Response: { &#34;equipment_organization_chart&#34;: { &#34;scc_code&#34;: &#34;BRPTV&#34;, &#34;ecc_code&#34;: &#34;BRPTV&#34;, &#34;lcc_code&#34;: &#34;BRMAO&#34;, &#34;rcc_code&#34;: &#34;PAMIT&#34; } } ... |
| GetRccCodes | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetRccCodesResponse](#chorus-mdm-equipment_organization_chart-v1-GetRccCodesResponse) stream | Get the list of all scc codes.<br /><br />Operation: MATCH<br /><br />Response: { &#34;scc_code&#34;: &#34;BRPTV&#34; } ... |

 



<a name="chorus_mdm_location_v1_location-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/location/v1/location.proto



<a name="chorus-mdm-location-v1-GetLocationsByCodesRequest"></a>

### GetLocationsByCodesRequest
Request message for `LocationInfoService.GetLocationsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_code_list | [LocationCode](#chorus-mdm-location-v1-LocationCode) | repeated | The location code list. |






<a name="chorus-mdm-location-v1-GetLocationsByCodesResponse"></a>

### GetLocationsByCodesResponse
Response message for `LocationInfoService.GetLocationsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#chorus-mdm-location-v1-Location) |  | The location information. |






<a name="chorus-mdm-location-v1-Location"></a>

### Location
The location information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_code | [string](#string) |  | The location_code is the code of the location. loc_cd in OPUS. |
| location_name | [string](#string) |  | The location_name is the name of the location. loc_nm in OPUS. |
| country_code | [string](#string) |  | The country_code is the country code of the location. cnt_cd in OPUS. |
| state_code | [string](#string) |  | The state_code is the state code of the location. ste_cd in OPUS. |
| gmt_hours | [int32](#int32) |  | The gmt_hours is the GMT hours of the location. gmt_hrs in OPUS. |
| continent_code | [string](#string) |  | The continent_code is the continent code of the location. conti_cd in OPUS. |
| delete_flag | [string](#string) |  | The delete flag. delt_flg in OPUS |
| region_code | [string](#string) |  | The region_code is the region code of the location. rgn_cd in OPUS. |






<a name="chorus-mdm-location-v1-LocationCode"></a>

### LocationCode
The location code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_code | [string](#string) |  | The code of the location. |






<a name="chorus-mdm-location-v1-LocationSearch"></a>

### LocationSearch
The location search information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_code | [string](#string) |  | The location_code is the code of the location. loc_cd in OPUS. |
| location_name | [string](#string) |  | The location_name is the name of the location. loc_nm in OPUS. |
| region_code | [string](#string) |  | The region_code is the region code of the location. rgn_cd in OPUS. |
| state_code | [string](#string) |  | The state_code is the state code of the location. ste_cd in OPUS. |
| un_location_indicator_code | [string](#string) |  | The un_location_indicator_code is the un location indicator code of the location. un_loc_ind_cd in OPUS. |
| scc_code | [string](#string) |  | The scc_code is the scc code of the location. scc_cd in OPUS. |
| ecc_code | [string](#string) |  | The ecc_code is the ecc code of the location. ecc_cd in OPUS. |
| lcc_code | [string](#string) |  | The lcc_code is the lcc code of the location. lcc_cd in OPUS. |
| rcc_code | [string](#string) |  | The rcc_code is the rcc code of the location. rcc_cd in OPUS. |
| sales_office_code | [string](#string) |  | The sales_office_code is the sales office code of the location. sls_ofc_cd in OPUS. |
| finance_control_office_code | [string](#string) |  | The finance_control_office_code is the finance control office code of the location. finc_ctrl_ofc_cd in OPUS. |
| equipment_control_office_code | [string](#string) |  | The equipment_control_office_code is the equipment control office code of the location. eq_ctrl_ofc_cd in OPUS. |
| country_code | [string](#string) |  | The country_code is the country code of the location. cnt_cd in OPUS. |
| un_location_code | [string](#string) |  | The un_location_code is the un location code of the location. un_loc_cd in OPUS. |
| hub_location_code | [string](#string) |  | The hub_location_code is the hub location code of the location. hub_loc_cd in OPUS. |
| total_row_count | [int32](#int32) |  | The total_row_count total records of the search request. |






<a name="chorus-mdm-location-v1-SccCode"></a>

### SccCode
The scc code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scc_code | [string](#string) |  | The scc code |






<a name="chorus-mdm-location-v1-SccCodeData"></a>

### SccCodeData
The scc code field information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| scc_code_list | [SccCode](#chorus-mdm-location-v1-SccCode) | repeated | The scc code |






<a name="chorus-mdm-location-v1-SearchLocationsByMultipleFieldsRequest"></a>

### SearchLocationsByMultipleFieldsRequest
Request message for `LocationInfoService.SearchLocationsByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_code | [string](#string) | optional | The code of the location. |
| location_name | [string](#string) | optional | The name of the location. |
| scc_code_data | [SccCodeData](#chorus-mdm-location-v1-SccCodeData) | optional | The scc code list. |
| sales_office_code | [string](#string) | optional | The sales office code of the location. |
| finance_control_office_code | [string](#string) | optional | The finance control office code of the location. |
| equipment_control_office_code | [string](#string) | optional | The equipment control office code of the location. |
| un_location_indicator_code | [string](#string) | optional | The un location indicator code of the location. |
| state_code | [string](#string) | optional | The state_code is the state code of the location. |
| country_code | [string](#string) | optional | The country_code is the country code of the location. |
| delt_flg | [string](#string) | optional | The delete flag |
| call_port_flag | [string](#string) | optional | The call port flag |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | The pagination info. |
| order_by | [chorus.mdm.base.v1.OrderBy](#chorus-mdm-base-v1-OrderBy) | repeated | The order by list |






<a name="chorus-mdm-location-v1-SearchLocationsByMultipleFieldsResponse"></a>

### SearchLocationsByMultipleFieldsResponse
Response message for `LocationInfoService.SearchLocationsByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [LocationSearch](#chorus-mdm-location-v1-LocationSearch) |  | The location information. |






<a name="chorus-mdm-location-v1-SearchLocationsByNameRequest"></a>

### SearchLocationsByNameRequest
Request message for `LocationInfoService.SearchLocationsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location_name | [string](#string) |  | The name of the location. |






<a name="chorus-mdm-location-v1-SearchLocationsByNameResponse"></a>

### SearchLocationsByNameResponse
Response message for `LocationInfoService.SearchLocationsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [Location](#chorus-mdm-location-v1-Location) |  | The location information. |





 

 

 


<a name="chorus-mdm-location-v1-LocationInfoService"></a>

### LocationInfoService
Services for location.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetLocationsByCodes | [GetLocationsByCodesRequest](#chorus-mdm-location-v1-GetLocationsByCodesRequest) | [GetLocationsByCodesResponse](#chorus-mdm-location-v1-GetLocationsByCodesResponse) stream | Get list of locations by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;location_code_list&#34;: [ { &#34;location_code&#34;: &#34;DEGCI&#34; } ] }<br /><br />Response: { &#34;location&#34;: { &#34;location_code&#34;: &#34;DEGCI&#34;, &#34;location_name&#34;: &#34;GEMMERICH&#34;, &#34;country_code&#34;: &#34;DE&#34;, &#34;state_code&#34;: &#34;&#34;, &#34;gmt_hours&#34;: 120, &#34;continent_code&#34;: &#34;E&#34;, &#34;region_code&#34;: &#34;DEU&#34;, &#34;delete_flag&#34;: &#34;N&#34;, } } ... |
| SearchLocationsByName | [SearchLocationsByNameRequest](#chorus-mdm-location-v1-SearchLocationsByNameRequest) | [SearchLocationsByNameResponse](#chorus-mdm-location-v1-SearchLocationsByNameResponse) stream | Search list of locations by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;location_name&#34;: &#34;GEM&#34; }<br /><br />Response: { &#34;location&#34;: { &#34;location_code&#34;: &#34;DEGCI&#34;, &#34;location_name&#34;: &#34;GEMMERICH&#34;, &#34;country_code&#34;: &#34;DE&#34;, &#34;state_code&#34;: &#34;&#34;, &#34;gmt_hours&#34;: 120, &#34;continent_code&#34;: &#34;E&#34;, &#34;region_code&#34;: &#34;DEU&#34;, &#34;delete_flag&#34;: &#34;N&#34;, } } ... |
| SearchLocationsByMultipleFields | [SearchLocationsByMultipleFieldsRequest](#chorus-mdm-location-v1-SearchLocationsByMultipleFieldsRequest) | [SearchLocationsByMultipleFieldsResponse](#chorus-mdm-location-v1-SearchLocationsByMultipleFieldsResponse) stream | Search list of locations by multiple fields.<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;location_code&#34; : &#34;DEGCI&#34;, &#34;location_name&#34; : &#34;&#34;, &#34;scc_code_data&#34;: { &#34;scc_code_list&#34;:[ {&#34;scc_code&#34;: &#34;GEMMERICH&#34;}, {&#34;scc_code&#34;: &#34;DESKO&#34;} ] }, &#34;sales_office_code&#34; : &#34;&#34;, &#34;finance_control_office_code&#34; : &#34;&#34;, &#34;equipment_control_office_code&#34; : &#34;&#34;, &#34;un_location_indicator_code&#34; : &#34;&#34;, &#34;state_code&#34; : &#34;&#34;, &#34;country_code&#34; : &#34;&#34;, &#34;delt_flg&#34;: &#34;N&#34;, &#34;call_port_flag&#34;: &#34;N&#34;, &#34;pagination&#34; : { offset : 0, limit : 10, }, }<br /><br />Response: { &#34;location&#34;: { &#34;location_code&#34;: &#34;CLCHO&#34;, &#34;location_name&#34;: &#34;CHONCHI&#34;, &#34;region_code&#34;: &#34;CHL&#34;, &#34;state_code&#34;: &#34;LL&#34;, &#34;un_location_indicator_code&#34;: &#34;GEMMERICH&#34;, &#34;scc_code&#34;: &#34;CLLQN&#34;, &#34;sales_office_code&#34;: &#34;SCLBB&#34;, &#34;equipment_control_office_code&#34;: &#34;GEMMERICH&#34;, &#34;finance_control_office_code&#34;: &#34;SCLBB&#34;, &#34;country_code&#34;: &#34;CL&#34;, &#34;un_location_code&#34;: &#34;CLCHO&#34;, &#34;hub_location_code&#34;: 120, &#34;ecc_code&#34;: &#34;CLLQN&#34;, &#34;lcc_code&#34;: &#34;CLSCL&#34;, &#34;rcc_code&#34;: &#34;CLSCL&#34;, &#34;row_index&#34;: 0, &#34;total_row_count&#34;: 12, } } ... |

 



<a name="chorus_mdm_movement_status_v1_movement_status-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/movement_status/v1/movement_status.proto



<a name="chorus-mdm-movement_status-v1-GetMovementStatusesByCodesRequest"></a>

### GetMovementStatusesByCodesRequest
Request message for `MovementStatusInfoService.GetMovementStatusesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| movement_status_code_list | [MovementStatusCode](#chorus-mdm-movement_status-v1-MovementStatusCode) | repeated | The MovementStatusCode list |






<a name="chorus-mdm-movement_status-v1-GetMovementStatusesByCodesResponse"></a>

### GetMovementStatusesByCodesResponse
Response message for `MovementStatusInfoService.GetMovementStatusesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| movement_status | [MovementStatus](#chorus-mdm-movement_status-v1-MovementStatus) |  | The MovementStatus information |






<a name="chorus-mdm-movement_status-v1-MovementStatus"></a>

### MovementStatus
The movement status information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| movement_status_code | [string](#string) |  | The movement_status_code is the code of Movement Status. mvmt_sts_cd in OPUS |
| movement_status_name | [string](#string) |  | The movement_status_name is the name of Movement Status. mvmt_sts_nm in OPUS |






<a name="chorus-mdm-movement_status-v1-MovementStatusCode"></a>

### MovementStatusCode
The movement status code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| movement_status_code | [string](#string) |  | The code of the movement status |





 

 

 


<a name="chorus-mdm-movement_status-v1-MovementStatusInfoService"></a>

### MovementStatusInfoService
The service that implements the MovementStatusInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetMovementStatusesByCodes | [GetMovementStatusesByCodesRequest](#chorus-mdm-movement_status-v1-GetMovementStatusesByCodesRequest) | [GetMovementStatusesByCodesResponse](#chorus-mdm-movement_status-v1-GetMovementStatusesByCodesResponse) stream | Get all list of movement statuses by codes<br /><br />Operation: MATCH<br /><br />Request: { &#34;movement_status_code_list&#34;: [ { &#34;movement_status_code&#34;: &#34;EFE&#34; } ] }<br /><br />Response: { &#34;movement_status&#34;: { &#34;movement_status_code&#34;: &#34;EFE&#34;, &#34;movement_status_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, } } ... |

 



<a name="chorus_mdm_organization_v1_organization-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/organization/v1/organization.proto



<a name="chorus-mdm-organization-v1-GetOrganizationsByCodesRequest"></a>

### GetOrganizationsByCodesRequest
Request message for `OrganizationInfoService.GetOrganizationsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_code_list | [OfficeCode](#chorus-mdm-organization-v1-OfficeCode) | repeated | The office code list. |






<a name="chorus-mdm-organization-v1-GetOrganizationsByCodesResponse"></a>

### GetOrganizationsByCodesResponse
Response message for `OrganizationInfoService.GetOrganizationsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| organization | [Organization](#chorus-mdm-organization-v1-Organization) |  | The organization information. |






<a name="chorus-mdm-organization-v1-GetOrganizationsResponse"></a>

### GetOrganizationsResponse
Response message for `OrganizationInfoService.GetOrganizations`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| organization | [Organization](#chorus-mdm-organization-v1-Organization) |  | The organization information. |






<a name="chorus-mdm-organization-v1-OfficeCode"></a>

### OfficeCode
The office code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_code | [string](#string) |  | The code of the office. |






<a name="chorus-mdm-organization-v1-Organization"></a>

### Organization
The country organization.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_code | [string](#string) |  | The office_code is the office code of the organization. ofc_cd in OPUS. |
| location_code | [string](#string) |  | The location_code is the location code of the organization. loc_cd in OPUS. |
| office_english_name | [string](#string) |  | The office_english_name is the office english name of the organization. ofc_eng_nm in OPUS. |
| office_local_name | [string](#string) |  | The office_local_name is the office local name of the organization. ofc_locl_nm in OPUS. |
| office_address | [string](#string) |  | The office_address is the office address of the organization. ofc_addr in OPUS. |






<a name="chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameRequest"></a>

### SearchOrganizationsByOfficeEnglishNameRequest
Request message for `OrganizationInfoService.SearchOrganizationsByOfficeEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| office_english_name | [string](#string) |  | The office english name of organization |






<a name="chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameResponse"></a>

### SearchOrganizationsByOfficeEnglishNameResponse
Response message for `OrganizationInfoService.SearchOrganizationsByOfficeEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| organization | [Organization](#chorus-mdm-organization-v1-Organization) |  | The Organization infomation |





 

 

 


<a name="chorus-mdm-organization-v1-OrganizationInfoService"></a>

### OrganizationInfoService
Services for organization

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetOrganizations | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetOrganizationsResponse](#chorus-mdm-organization-v1-GetOrganizationsResponse) stream | Get all list of organizations.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;organization&#34;: { &#34;office_code&#34;: &#34;RECBA&#34;, &#34;location_code&#34;: &#34;BRREC&#34;, &#34;office_english_name&#34;: &#34;WILSON SONS AGENCIA MARITIMA, RECIFE&#34;, &#34;office_local_name&#34;: &#34;&#34;, &#34;office_address&#34;: &#34;Rua Agenor Lopes, 25 sala 1002 - Ed. Emp. Itamarati&#34; } } ... |
| GetOrganizationsByCodes | [GetOrganizationsByCodesRequest](#chorus-mdm-organization-v1-GetOrganizationsByCodesRequest) | [GetOrganizationsByCodesResponse](#chorus-mdm-organization-v1-GetOrganizationsByCodesResponse) stream | Get list of organizations by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;office_code_list&#34;: [ { &#34;office_code&#34;: &#34;RECBA&#34; } ] }<br /><br />Response: { &#34;organization&#34;: { &#34;office_code&#34;: &#34;RECBA&#34;, &#34;location_code&#34;: &#34;BRREC&#34;, &#34;office_english_name&#34;: &#34;WILSON SONS AGENCIA MARITIMA, RECIFE&#34;, &#34;office_local_name&#34;: &#34;&#34;, &#34;office_address&#34;: &#34;Rua Agenor Lopes, 25 sala 1002 - Ed. Emp. Itamarati&#34; } } ... |
| SearchOrganizationsByOfficeEnglishName | [SearchOrganizationsByOfficeEnglishNameRequest](#chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameRequest) | [SearchOrganizationsByOfficeEnglishNameResponse](#chorus-mdm-organization-v1-SearchOrganizationsByOfficeEnglishNameResponse) stream | Search organizations by office english name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;office_english_name&#34; : &#34;WILSON SONS AGENCIA MARITIMA, RECIFE&#34; }<br /><br />Response: { &#34;organization&#34;: { &#34;office_code&#34;: &#34;RECBA&#34;, &#34;location_code&#34;: &#34;BRREC&#34;, &#34;office_english_name&#34;: &#34;WILSON SONS AGENCIA MARITIMA, RECIFE&#34;, &#34;office_local_name&#34;: &#34;&#34;, &#34;office_address&#34;: &#34;Rua Agenor Lopes, 25 sala 1002 - Ed. Emp. Itamarati&#34; } } ... |

 



<a name="chorus_mdm_package_type_v1_package_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/package_type/v1/package_type.proto



<a name="chorus-mdm-package_type-v1-GetPackageTypesByCodesRequest"></a>

### GetPackageTypesByCodesRequest
Request message for `PackageTypeInfoService.GetPackageTypseByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_code_list | [PackageCode](#chorus-mdm-package_type-v1-PackageCode) | repeated | The package code list. |






<a name="chorus-mdm-package_type-v1-GetPackageTypesByCodesResponse"></a>

### GetPackageTypesByCodesResponse
Response message for `PackageTypeInfoService.GetPackageTypesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_type | [PackageType](#chorus-mdm-package_type-v1-PackageType) |  | The Package Type information. |






<a name="chorus-mdm-package_type-v1-PackageCode"></a>

### PackageCode
The package code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_code | [string](#string) |  | The code of the package type. |






<a name="chorus-mdm-package_type-v1-PackageType"></a>

### PackageType
The package type.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_code | [string](#string) |  | The package code is the package code of the package type. pck_cd in OPUS. |
| package_name | [string](#string) |  | The package_name is the package name of the package type. pck_nm in OPUS. |






<a name="chorus-mdm-package_type-v1-SearchPackageTypesByNameRequest"></a>

### SearchPackageTypesByNameRequest
Request message for `PackageTypeInfoService.SearchPackageTypesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_name | [string](#string) |  | The package name. |






<a name="chorus-mdm-package_type-v1-SearchPackageTypesByNameResponse"></a>

### SearchPackageTypesByNameResponse
Response message for `PackageTypeInfoService.SearchPackageTypesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| package_type | [PackageType](#chorus-mdm-package_type-v1-PackageType) |  | The Package Type information. |





 

 

 


<a name="chorus-mdm-package_type-v1-PackageTypeInfoService"></a>

### PackageTypeInfoService
Services for organization

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetPackageTypesByCodes | [GetPackageTypesByCodesRequest](#chorus-mdm-package_type-v1-GetPackageTypesByCodesRequest) | [GetPackageTypesByCodesResponse](#chorus-mdm-package_type-v1-GetPackageTypesByCodesResponse) stream | Get list of packages type by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;package_code_list&#34;: [ { &#34;package_code&#34;: &#34;AT&#34; } ] }<br /><br />Response: { &#34;package_type&#34;: { &#34;package_code&#34;: &#34;AT&#34;, &#34;package_name&#34;: &#34;ATOMIZER&#34;, } } ... |
| SearchPackageTypesByName | [SearchPackageTypesByNameRequest](#chorus-mdm-package_type-v1-SearchPackageTypesByNameRequest) | [SearchPackageTypesByNameResponse](#chorus-mdm-package_type-v1-SearchPackageTypesByNameResponse) stream | Search list of packages type by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;package_name&#34;: &#34;ATOMIZER&#34; }<br /><br />Response: { &#34;package_type&#34;: { &#34;package_code&#34;: &#34;AT&#34;, &#34;package_name&#34;: &#34;ATOMIZER&#34;, } } ... |

 



<a name="chorus_mdm_partner_v1_partner-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/partner/v1/partner.proto



<a name="chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesRequest"></a>

### GetVendorContactPointsByVendorSequencesRequest
(Deprecated)
Request message for `VendorContactPointInfoService.GetVendorContactPointsByVendorSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_code_list | [VendorCode](#chorus-mdm-partner-v1-VendorCode) | repeated | The vendor code list. |






<a name="chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesResponse"></a>

### GetVendorContactPointsByVendorSequencesResponse
(Deprecated)
Response message for `VendorContactPointInfoService.GetVendorContactPointsByVendorSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_contact_point | [VendorContactPoint](#chorus-mdm-partner-v1-VendorContactPoint) |  | The vendor contact point information. |






<a name="chorus-mdm-partner-v1-VendorCode"></a>

### VendorCode
The vendor code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor sequence of the vendor code. |






<a name="chorus-mdm-partner-v1-VendorContactPoint"></a>

### VendorContactPoint
The vendor contact point information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the vendor sequence of the vendor. vndr_seq in OPUS. |
| vendor_contact_point_sequence | [int32](#int32) |  | The vendor_contact_point_sequence is the vendor contact point sequence of the vendor. vndr_cntc_pnt_seq in OPUS. |
| primary_check_flag | [string](#string) |  | The primary_check_flag is the primary check flag of the vendor. prmry_ckh_flg in OPUS. |
| international_phone_number | [string](#string) |  | The international_phone_number is the international phone number of the vendor. intl_phn_no in OPUS. |
| phone_number | [string](#string) |  | The phone_number is the phone number of the vendor. phn_no in OPUS. |
| international_fax_number | [string](#string) |  | The international_fax_number is the international fax number of the vendor. intl_fax_no in OPUS. |
| fax_number | [string](#string) |  | The fax_number is the fax number of the vendor. fax_no in OPUS. |
| vendor_email | [string](#string) |  | The vendor_email is the vendor email of the vendor. vndr_eml in OPUS. |





 

 

 


<a name="chorus-mdm-partner-v1-VendorContactPointInfoService"></a>

### VendorContactPointInfoService
Services for vendor contact point.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVendorContactPointsByVendorSequences | [GetVendorContactPointsByVendorSequencesRequest](#chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesRequest) | [GetVendorContactPointsByVendorSequencesResponse](#chorus-mdm-partner-v1-GetVendorContactPointsByVendorSequencesResponse) stream | (Deprecated) Get list of vendor contact points by vendor sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vendor_code_list&#34;: [ { &#34;vendor_sequence&#34;: 101303 } ] }<br /><br />Response: { &#34;vendor_contact_point&#34;: { &#34;vendor_sequence&#34;: 101303, &#34;vendor_contact_point_sequence&#34;: 1 &#34;primary_check_flag&#34;: &#34;Y&#34; &#34;international_phone_number&#34;: &#34;82&#34; &#34;phone_number&#34;: &#34;51-4690475&#34; &#34;international_fax_number&#34;: &#34;PREPAYMENTS-EXPENSE FOR CANAL TRANSIT FOR ACCRUAL&#34; &#34;fax_number&#34;: &#34;51-4698030&#34; &#34;vendor_email&#34;: &#34;&#34; } } ... |

 



<a name="chorus_mdm_region_v1_region-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/region/v1/region.proto



<a name="chorus-mdm-region-v1-GetRegionsByCodesRequest"></a>

### GetRegionsByCodesRequest
Request message for `RegionInfoService.GetRegionsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region_code_list | [RegionCode](#chorus-mdm-region-v1-RegionCode) | repeated | The region code list. |






<a name="chorus-mdm-region-v1-GetRegionsByCodesResponse"></a>

### GetRegionsByCodesResponse
Response message for `RegionInfoService.GetRegionsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region | [Region](#chorus-mdm-region-v1-Region) |  | The region information |






<a name="chorus-mdm-region-v1-GetRegionsResponse"></a>

### GetRegionsResponse
Response message for `RegionInfoService.GetRegions`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region | [Region](#chorus-mdm-region-v1-Region) |  | The region information. |






<a name="chorus-mdm-region-v1-Region"></a>

### Region
The region information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region_code | [string](#string) |  | The region_code is the code of the region. rgn_cd in OPUS. |
| region_name | [string](#string) |  | The region_name is the name of the region. rgn_nm in OPUS. |
| country_code | [string](#string) |  | The country_code is the code of the country in this region. cnt_cd in OPUS. |






<a name="chorus-mdm-region-v1-RegionCode"></a>

### RegionCode
The region code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region_code | [string](#string) |  | The code of the region. |






<a name="chorus-mdm-region-v1-SearchRegionsByNameRequest"></a>

### SearchRegionsByNameRequest
Request message for `RegionInfoService.SearchRegionsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region_name | [string](#string) |  | The name of the region |






<a name="chorus-mdm-region-v1-SearchRegionsByNameResponse"></a>

### SearchRegionsByNameResponse
Response message for `RegionInfoService.SearchRegionsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| region | [Region](#chorus-mdm-region-v1-Region) |  | The region information. |





 

 

 


<a name="chorus-mdm-region-v1-RegionInfoService"></a>

### RegionInfoService
Services for region.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetRegions | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetRegionsResponse](#chorus-mdm-region-v1-GetRegionsResponse) stream | Get all list of regions.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;region&#34;: { &#34;region_code&#34;: &#34;X&#34;, &#34;region_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34;, &#34;country_code&#34;: &#34;VN&#34; } } ... |
| GetRegionsByCodes | [GetRegionsByCodesRequest](#chorus-mdm-region-v1-GetRegionsByCodesRequest) | [GetRegionsByCodesResponse](#chorus-mdm-region-v1-GetRegionsByCodesResponse) stream | Get list of regions by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;region_code_list&#34;: [ { &#34;region_code&#34;: &#34;X&#34; } ] }<br /><br />Response: { &#34;region&#34;: { &#34;region_code&#34;: &#34;X&#34;, &#34;region_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34;, &#34;country_code&#34;: &#34;VN&#34; } } ... |
| SearchRegionsByName | [SearchRegionsByNameRequest](#chorus-mdm-region-v1-SearchRegionsByNameRequest) | [SearchRegionsByNameResponse](#chorus-mdm-region-v1-SearchRegionsByNameResponse) stream | Search list of regions by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;region_name&#34;: &#34;DUM&#34; }<br /><br />Response: { &#34;region&#34;: { &#34;region_code&#34;: &#34;X&#34;, &#34;region_name&#34;: &#34;DUMMY CODE FOR EXTRA COUNTRY&#34;, &#34;country_code&#34;: &#34;VN&#34; } } ... |

 



<a name="chorus_mdm_representative_charge_v1_representative_charge-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/representative_charge/v1/representative_charge.proto



<a name="chorus-mdm-representative_charge-v1-GetRepresentativeChargesResponse"></a>

### GetRepresentativeChargesResponse
Response message for `RepresentativeChargeInfoService.GetRepresentativeCharges`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_charge | [RepresentativeCharge](#chorus-mdm-representative_charge-v1-RepresentativeCharge) |  | The representative charge information. |






<a name="chorus-mdm-representative_charge-v1-RepresentativeCharge"></a>

### RepresentativeCharge
The representative charge information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_charge_code | [string](#string) |  | The representative_charge_code is the code of the representative charge. rep_chg_cd in OPUS. |
| representative_charge_name | [string](#string) |  | The representative_charge_name is the name of the representative charge. rep_chg_nm in OPUS. |





 

 

 


<a name="chorus-mdm-representative_charge-v1-RepresentativeChargeInfoService"></a>

### RepresentativeChargeInfoService
Services for representative charge.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetRepresentativeCharges | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetRepresentativeChargesResponse](#chorus-mdm-representative_charge-v1-GetRepresentativeChargesResponse) stream | Fetch all representative charge records.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;representative_charge&#34;: { &#34;representative_charge_code&#34;: &#34;OFT&#34;, &#34;representative_charge_name&#34;: &#34;OCEAN FREIGHT&#34; } } |

 



<a name="chorus_mdm_representative_commodity_v1_representative_commodity-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/representative_commodity/v1/representative_commodity.proto



<a name="chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest"></a>

### GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest
Request message for `RepresentativeCommodityInfoService.GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity_code_list | [RepresentativeCommodityCode](#chorus-mdm-representative_commodity-v1-RepresentativeCommodityCode) | repeated | The representative commodity list. |






<a name="chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse"></a>

### GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse
Response message for `RepresentativeCommodityInfoService.GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity | [RepresentativeCommodity](#chorus-mdm-representative_commodity-v1-RepresentativeCommodity) |  | The representative commodity information. |






<a name="chorus-mdm-representative_commodity-v1-RepresentativeCommodity"></a>

### RepresentativeCommodity
The representative commodity information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity_code | [string](#string) |  | The representative_commodity_code is the representative commodity code of the representative commodity. rep_cmdt_cd in OPUS. |
| representative_commodity_name | [string](#string) |  | The representative_commodity_name is the representative commodity name of the representative commodity. rep_cmdt_nm in OPUS. |
| group_commodity_code | [string](#string) |  | The group_commodity_code is the group commodity code of the representative commodity. grp_cmdt_cd in OPUS. |






<a name="chorus-mdm-representative_commodity-v1-RepresentativeCommodityCode"></a>

### RepresentativeCommodityCode
The representative commodity code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity_code | [string](#string) |  | The representative commodity code of the representative commodity. |






<a name="chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest"></a>

### SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest
Request message for `RepresentativeCommodityInfoService.SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity_name | [string](#string) |  | The representative commodity name of the representative commodity. |






<a name="chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse"></a>

### SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse
Response message for `RepresentativeCommodityInfoService.SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| representative_commodity | [RepresentativeCommodity](#chorus-mdm-representative_commodity-v1-RepresentativeCommodity) |  | The representative commodity information. |





 

 

 


<a name="chorus-mdm-representative_commodity-v1-RepresentativeCommodityInfoService"></a>

### RepresentativeCommodityInfoService
Services for representative commodity.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetRepresentativeCommoditiesByRepresentativeCommodityCodes | [GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest](#chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesRequest) | [GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse](#chorus-mdm-representative_commodity-v1-GetRepresentativeCommoditiesByRepresentativeCommodityCodesResponse) stream | Get list of representative commodity by representative commodity codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;representative_commodity_code_list&#34;: [ { &#34;representative_commodity_code&#34;: &#34;2938&#34;, } ] }<br /><br />Response: { &#34;representative_commodity&#34;: { &#34;representative_commodity_code&#34;: &#34;2938&#34;, &#34;representative_commodity_name&#34;: &#34;GLYCOSIDE&#43;SALT,ETHER,ESTER,DERIVATIVE&#34;, &#34;group_commodity_code&#34;: null, } } ... |
| SearchRepresentativeCommoditiesByRepresentativeCommodityName | [SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest](#chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameRequest) | [SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse](#chorus-mdm-representative_commodity-v1-SearchRepresentativeCommoditiesByRepresentativeCommodityNameResponse) stream | Get list of representative commodity by representative commodity name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;representative_commodity_name&#34;: &#34;ARABINOSE&#34; }<br /><br />Response: { &#34;representative_commodity&#34;: { &#34;representative_commodity_code&#34;: &#34;2940&#34;, &#34;representative_commodity_name&#34;: &#34;ARABINOSE&#34;, &#34;group_commodity_code&#34;: null, } } ... |

 



<a name="chorus_mdm_revenue_lane_v1_revenue_lane-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/revenue_lane/v1/revenue_lane.proto



<a name="chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesRequest"></a>

### GetRevenueLanesByCodesRequest
Request message for `RevenueLaneInfoService.GetRevenueLanesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane_code_list | [RevenueLaneCode](#chorus-mdm-revenue_lane-v1-RevenueLaneCode) | repeated | The RevenueLaneCode list |






<a name="chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesResponse"></a>

### GetRevenueLanesByCodesResponse
Response message for `RevenueLaneInfoService.GetRevenueLanesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane | [RevenueLane](#chorus-mdm-revenue_lane-v1-RevenueLane) |  | The RevenueLane information |






<a name="chorus-mdm-revenue_lane-v1-RevenueLane"></a>

### RevenueLane
The revenue lane information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane_code | [string](#string) |  | The revenue_lane_code is the code of Revenue Lane. rlane_cd in OPUS |
| revenue_lane_name | [string](#string) |  | The revenue_lane_name is the name of Revenue Lane. rlane_nm in OPUS |






<a name="chorus-mdm-revenue_lane-v1-RevenueLaneCode"></a>

### RevenueLaneCode
The revenue lane code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| revenue_lane_code | [string](#string) |  | The code of the revenue lane |





 

 

 


<a name="chorus-mdm-revenue_lane-v1-RevenueLaneInfoService"></a>

### RevenueLaneInfoService
The service that implements the RevenueLaneInfoService definition.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetRevenueLanesByCodes | [GetRevenueLanesByCodesRequest](#chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesRequest) | [GetRevenueLanesByCodesResponse](#chorus-mdm-revenue_lane-v1-GetRevenueLanesByCodesResponse) stream | Get all list of revenue lanes by codes<br /><br />Operation: MATCH<br /><br />Request: { &#34;revenue_lane_code_list&#34;: [ { &#34;revenue_lane_code&#34;: &#34;EFE&#34; } ] }<br /><br />Response: { &#34;revenue_lane&#34;: { &#34;revenue_lane_code&#34;: &#34;EFE&#34;, &#34;revenue_lane_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, } } ... |

 



<a name="chorus_mdm_sales_representative_v1_sales_representative-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/sales_representative/v1/sales_representative.proto



<a name="chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesRequest"></a>

### GetSalesRepresentativesByCodesRequest
Request message for `OrganizationInfoService.GetSalesRepresentativesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative_code_list | [SalesRepresentativeCode](#chorus-mdm-sales_representative-v1-SalesRepresentativeCode) | repeated | The sales representative code list. |






<a name="chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesResponse"></a>

### GetSalesRepresentativesByCodesResponse
Response message for `OrganizationInfoService.GetSalesRepresentativesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative | [SalesRepresentative](#chorus-mdm-sales_representative-v1-SalesRepresentative) |  | The sales representative information. |






<a name="chorus-mdm-sales_representative-v1-SalesRepresentative"></a>

### SalesRepresentative
The SalesRepresentative base message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative_code | [string](#string) |  | The sales_representative_code is the code of the sales representative srep_cd in OPUS. |
| sales_representative_name | [string](#string) |  | The sales_representative_name is the code of the sales representative srep_nm in OPUS. |
| office_code | [string](#string) |  | The office_code is the code of the sales representative ofc_cd in OPUS. |






<a name="chorus-mdm-sales_representative-v1-SalesRepresentativeCode"></a>

### SalesRepresentativeCode
The sales representative code information


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative_code | [string](#string) |  | The code of sales representative |






<a name="chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameRequest"></a>

### SearchSalesRepresentativesByNameRequest
Request message for `SalesRepresentativeInfoService.SearchSalesRepresentativesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative_name | [string](#string) |  | The sales representative name . |






<a name="chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameResponse"></a>

### SearchSalesRepresentativesByNameResponse
Response message for `SalesRepresentativeInfoService.SearchSalesRepresentativesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sales_representative | [SalesRepresentative](#chorus-mdm-sales_representative-v1-SalesRepresentative) |  | The sales representative information. |





 

 

 


<a name="chorus-mdm-sales_representative-v1-SalesRepresentativeInfoService"></a>

### SalesRepresentativeInfoService
Services for sales representative

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetSalesRepresentativesByCodes | [GetSalesRepresentativesByCodesRequest](#chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesRequest) | [GetSalesRepresentativesByCodesResponse](#chorus-mdm-sales_representative-v1-GetSalesRepresentativesByCodesResponse) stream | Get list of sales representatives by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;sales_representative_code_list&#34;: [ { &#34;sales_representative_code&#34;: &#34;TW028&#34; } ] }<br /><br />Response: { &#34;sales_representative&#34;: { &#34;sales_representative_code&#34;: &#34;TW028&#34;, &#34;sales_representative_name&#34;: &#34;MURPHY LIN&#34;, &#34;office_code&#34;: &#34;TXGBB&#34; } } ... |
| SearchSalesRepresentativesByName | [SearchSalesRepresentativesByNameRequest](#chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameRequest) | [SearchSalesRepresentativesByNameResponse](#chorus-mdm-sales_representative-v1-SearchSalesRepresentativesByNameResponse) stream | Search list of sales representatives by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;sales_representative_name&#34;: &#34;MURPHY&#34; }<br /><br />Response: { &#34;sales_representative&#34;: { &#34;sales_representative_code&#34;: &#34;TW028&#34;, &#34;sales_representative_name&#34;: &#34;MURPHY LIN&#34;, &#34;office_code&#34;: &#34;TXGBB&#34; } } ... |

 



<a name="chorus_mdm_service_scope_lane_v1_service_scope_lane-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/service_scope_lane/v1/service_scope_lane.proto



<a name="chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesRequest"></a>

### GetServiceScopeLanesByServiceScopeCodesRequest
Request message for `ServiceScopeLaneInfoService.GetServiceScopeLanesByServiceScopeCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code_list | [ServiceScopeCode](#chorus-mdm-service_scope_lane-v1-ServiceScopeCode) | repeated | The sevivce scope code list. |






<a name="chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesResponse"></a>

### GetServiceScopeLanesByServiceScopeCodesResponse
Response message for `ServiceScopeLaneInfoService.GetServiceScopeLanesByServiceScopeCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_lane | [ServiceScopeLane](#chorus-mdm-service_scope_lane-v1-ServiceScopeLane) |  | The service scope lane information. |






<a name="chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesRequest"></a>

### GetServiceScopeLanesByVesselServiceLaneCodesRequest
Request message for `ServiceScopeLaneInfoService.GetServiceScopeLanesByVesselServiceLaneCodesRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code_list | [VesselServiceLaneCode](#chorus-mdm-service_scope_lane-v1-VesselServiceLaneCode) | repeated | The vessel service lane code list. |






<a name="chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesResponse"></a>

### GetServiceScopeLanesByVesselServiceLaneCodesResponse
Response message for `ServiceScopeLaneInfoService.GetServiceScopeLanesByVesselServiceLaneCodesResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_lane | [ServiceScopeLane](#chorus-mdm-service_scope_lane-v1-ServiceScopeLane) |  | The service scope lane information. |






<a name="chorus-mdm-service_scope_lane-v1-ServiceScopeCode"></a>

### ServiceScopeCode
The sevivce scope code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The sevivce scope code of the service scope lane. |






<a name="chorus-mdm-service_scope_lane-v1-ServiceScopeLane"></a>

### ServiceScopeLane
The service scope lane information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service_scope_code is the sevivce scope code of the service scope lane. svc_scp_cd in OPUS. |
| vessel_service_lane_code | [string](#string) |  | The vessel_service_lane_code is the vessel service lane code of the service scope lane. vsl_slan_cd in OPUS. |
| service_scope_lane_sequence | [int32](#int32) |  | The service_scope_lane_sequence is the service scope lane sequence of the service scope lane. svc_scp_lane_seq in OPUS. |






<a name="chorus-mdm-service_scope_lane-v1-VesselServiceLaneCode"></a>

### VesselServiceLaneCode
The vessel service lane code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The vessel service lane code of the service scope lane. |





 

 

 


<a name="chorus-mdm-service_scope_lane-v1-ServiceScopeLaneInfoService"></a>

### ServiceScopeLaneInfoService
Services for service scope lane.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetServiceScopeLanesByServiceScopeCodes | [GetServiceScopeLanesByServiceScopeCodesRequest](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesRequest) | [GetServiceScopeLanesByServiceScopeCodesResponse](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByServiceScopeCodesResponse) stream | Get list of service scope lane by sevivce scope codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;service_scope_code_list&#34;: [ { &#34;service_scope_code&#34;: &#34;EFE&#34;, } ] }<br /><br />Response: { &#34;service_scope_lane&#34;: { &#34;service_scope_code&#34;: &#34;EFE&#34;, &#34;vessel_service_lane_code&#34;: &#34;AEF&#34;, &#34;service_scope_lane_sequence&#34;: 51, } } ... |
| GetServiceScopeLanesByVesselServiceLaneCodes | [GetServiceScopeLanesByVesselServiceLaneCodesRequest](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesRequest) | [GetServiceScopeLanesByVesselServiceLaneCodesResponse](#chorus-mdm-service_scope_lane-v1-GetServiceScopeLanesByVesselServiceLaneCodesResponse) stream | Get list of service scope lane by vessel service lane codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vessel_service_lane_code_list&#34;: [ { &#34;vessel_service_lane_code&#34;: &#34;AEF&#34;, } ] }<br /><br />Response: { &#34;service_scope_lane&#34;: { &#34;service_scope_code&#34;: &#34;EFE&#34;, &#34;vessel_service_lane_code&#34;: &#34;AEF&#34;, &#34;service_scope_lane_sequence&#34;: 51, } } ... |

 



<a name="chorus_mdm_service_scope_limit_port_v1_service_scope_limit_port-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/service_scope_limit_port/v1/service_scope_limit_port.proto



<a name="chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesRequest"></a>

### GetServiceScopeLimitPortsByServiceScopeCodesRequest
Request message for `ServiceScopeLimitPortInfoService.GetServiceScopeLimitPortsByServiceScopeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code_list | [ServiceScopeCode](#chorus-mdm-service_scope_limit_port-v1-ServiceScopeCode) | repeated | The list of service scope codes to search for (SVC_SCP_CD). |






<a name="chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesResponse"></a>

### GetServiceScopeLimitPortsByServiceScopeCodesResponse
Response message for `ServiceScopeLimitPortInfoService.GetServiceScopeLimitPortsByServiceScopeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_limit_port | [ServiceScopeLimitPort](#chorus-mdm-service_scope_limit_port-v1-ServiceScopeLimitPort) |  | The service scope limit port information. |






<a name="chorus-mdm-service_scope_limit_port-v1-ServiceScopeCode"></a>

### ServiceScopeCode
The service scope code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service_scope_code is the code of the service scope. svc_scp_cd in OPUS. |






<a name="chorus-mdm-service_scope_limit_port-v1-ServiceScopeLimitPort"></a>

### ServiceScopeLimitPort
The service scope limit port information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service_scope_code is the service scope code of the service scope limit port. svc_scp_cd in OPUS. |
| route_via_port_code | [string](#string) |  | The route_via_port_code is the route via port code of the service scope limit port. rout_via_port_cd in OPUS. |
| port_application_division_code | [string](#string) |  | The port_application_division_code is application division code of the service scope limit port. port_appl_div_cd in OPUS. |
| via_port_option_code | [string](#string) |  | The via_port_option_code is the via port option code of the service scope limit port. via_port_opt_cd in OPUS. |





 

 

 


<a name="chorus-mdm-service_scope_limit_port-v1-ServiceScopeLimitPortInfoService"></a>

### ServiceScopeLimitPortInfoService
Services for service scope limit port.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetServiceScopeLimitPortsByServiceScopeCodes | [GetServiceScopeLimitPortsByServiceScopeCodesRequest](#chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesRequest) | [GetServiceScopeLimitPortsByServiceScopeCodesResponse](#chorus-mdm-service_scope_limit_port-v1-GetServiceScopeLimitPortsByServiceScopeCodesResponse) stream | Get a list of service scope limit port records by multiple service scope codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;service_scope_code_list&#34;: [ { &#34;service_scope_code&#34;: &#34;TPW&#34; } ] }<br /><br />Response: { &#34;service_scope_limit_port_list&#34;: { &#34;service_scope_code&#34;: &#34;TPW&#34;, &#34;route_via_port_code&#34;: &#34;MXIRP&#34;, &#34;port_application_division_code&#34;: &#34;E&#34;, &#34;via_port_option_code&#34;: &#34;L&#34; } } |

 



<a name="chorus_mdm_service_scope_limit_v1_service_scope_limit-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/service_scope_limit/v1/service_scope_limit.proto



<a name="chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesRequest"></a>

### GetServiceScopeLimitsByServiceScopeCodesRequest
Request message for `ServiceScopeLimitInfoService.GetServiceScopeLimitsByServiceScopeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code_list | [ServiceScopeCode](#chorus-mdm-service_scope_limit-v1-ServiceScopeCode) | repeated | The service scope code list. |






<a name="chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesResponse"></a>

### GetServiceScopeLimitsByServiceScopeCodesResponse
Response message for `ServiceScopeLimitInfoService.GetServiceScopeLimitsByServiceScopeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_limit | [ServiceScopeLimit](#chorus-mdm-service_scope_limit-v1-ServiceScopeLimit) |  | The service scope limit information. |






<a name="chorus-mdm-service_scope_limit-v1-ServiceScopeCode"></a>

### ServiceScopeCode
The service scope code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service scope code of the service scope limit. |






<a name="chorus-mdm-service_scope_limit-v1-ServiceScopeLimit"></a>

### ServiceScopeLimit
The service scope limit information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service_scope_code is the service scope code of the service scope limit. svc_scp_cd in OPUS. |
| region_code | [string](#string) |  | The region_code is the region code of the service scope limit. rgn_cd in OPUS. |
| origin_destination_code | [string](#string) |  | The origin_destination_code is the origin destination code of the service scope limit. org_dest_cd in OPUS. |
| service_scope_indicator_flag | [string](#string) |  | The service_scope_indicator_flag is the service scope indicator flag of the service scope limit. svc_scp_ind_flg in OPUS. |





 

 

 


<a name="chorus-mdm-service_scope_limit-v1-ServiceScopeLimitInfoService"></a>

### ServiceScopeLimitInfoService
Services for service scope limit.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetServiceScopeLimitsByServiceScopeCodes | [GetServiceScopeLimitsByServiceScopeCodesRequest](#chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesRequest) | [GetServiceScopeLimitsByServiceScopeCodesResponse](#chorus-mdm-service_scope_limit-v1-GetServiceScopeLimitsByServiceScopeCodesResponse) stream | Get list of service scope limits by service scope code list.<br /><br />Operation: MATCH<br /><br />Request: { &#34;service_scope_code_list&#34;: [ { &#34;service_scope_code&#34;: &#34;IEA&#34; } ] }<br /><br />Response: { &#34;service_scope_limit&#34;: { &#34;service_scope_code&#34;: &#34;IEA&#34;, &#34;region_code&#34;: &#34;SYR&#34;, &#34;origin_destination_code&#34;: &#34;D&#34;, &#34;service_scope_indicator_flag&#34;: &#34;Y&#34; } } ... |

 



<a name="chorus_mdm_service_scope_v1_service_scope-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/service_scope/v1/service_scope.proto



<a name="chorus-mdm-service_scope-v1-GetServiceScopesByCodesRequest"></a>

### GetServiceScopesByCodesRequest
Request message for `ServiceScopeInfoService.GetServiceScopesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code_list | [ServiceScopeCode](#chorus-mdm-service_scope-v1-ServiceScopeCode) | repeated | The service scope code list. |






<a name="chorus-mdm-service_scope-v1-GetServiceScopesByCodesResponse"></a>

### GetServiceScopesByCodesResponse
Response message for `ServiceScopeInfoService.GetServiceScopesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope | [ServiceScope](#chorus-mdm-service_scope-v1-ServiceScope) |  | The service scope information. |






<a name="chorus-mdm-service_scope-v1-GetServiceScopesResponse"></a>

### GetServiceScopesResponse
Response message for `ServiceScopeInfoService.GetServiceScopes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope | [ServiceScope](#chorus-mdm-service_scope-v1-ServiceScope) |  | The service scope information. |






<a name="chorus-mdm-service_scope-v1-SearchServiceScopesByNameRequest"></a>

### SearchServiceScopesByNameRequest
Request message for `ServiceScopeInfoService.SearchServiceScopesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_name | [string](#string) |  | The service scope name. |






<a name="chorus-mdm-service_scope-v1-SearchServiceScopesByNameResponse"></a>

### SearchServiceScopesByNameResponse
Response message for `ServiceScopeInfoService.SearchServiceScopesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope | [ServiceScope](#chorus-mdm-service_scope-v1-ServiceScope) |  | The service scope information. |






<a name="chorus-mdm-service_scope-v1-ServiceScope"></a>

### ServiceScope
The service scope information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The service_scope_code is the code of the service scope. svc_scp_cd in OPUS. |
| service_scope_name | [string](#string) |  | The service_scope_name is the name of the service scope. svc_scp_nm in OPUS. |
| dominant_flag | [string](#string) |  | the dominant_flag is a dominant flag of the service scope. dmnt_flg in OPUS. |






<a name="chorus-mdm-service_scope-v1-ServiceScopeCode"></a>

### ServiceScopeCode
The service scope code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_scope_code | [string](#string) |  | The code of the Service Scope. |





 

 

 


<a name="chorus-mdm-service_scope-v1-ServiceScopeInfoService"></a>

### ServiceScopeInfoService
Services for service scope.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetServiceScopes | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetServiceScopesResponse](#chorus-mdm-service_scope-v1-GetServiceScopesResponse) stream | Get all list of service scopes.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;service_scope&#34;: { &#34;service_scope_code&#34;: &#34;EFE&#34;, &#34;service_scope_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, &#34;dominant_flag&#34;: &#34;N&#34;, } } ... |
| GetServiceScopesByCodes | [GetServiceScopesByCodesRequest](#chorus-mdm-service_scope-v1-GetServiceScopesByCodesRequest) | [GetServiceScopesByCodesResponse](#chorus-mdm-service_scope-v1-GetServiceScopesByCodesResponse) stream | Get list of service scopes by codes<br /><br />Operation: MATCH<br /><br />Request: { &#34;service_scope_code_list&#34;: [ { &#34;service_scope_code&#34;: &#34;EFE&#34; } ] }<br /><br />Response: { &#34;service_scope&#34;: { &#34;service_scope_code&#34;: &#34;EFE&#34;, &#34;service_scope_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, &#34;dominant_flag&#34;: &#34;N&#34;, } } ... |
| SearchServiceScopesByName | [SearchServiceScopesByNameRequest](#chorus-mdm-service_scope-v1-SearchServiceScopesByNameRequest) | [SearchServiceScopesByNameResponse](#chorus-mdm-service_scope-v1-SearchServiceScopesByNameResponse) stream | Search list of service scopes by name<br /><br />Operation: LIKE<br /><br />Request: { &#34;service_scope_name&#34;: &#34;EAST AFRICA&#34; }<br /><br />Response: { &#34;service_scope&#34;: { &#34;service_scope_code&#34;: &#34;EFE&#34;, &#34;service_scope_name&#34;: &#34;EAST AFRICA - ASIA (EB)&#34;, &#34;dominant_flag&#34;: &#34;N&#34;, } } ... |

 



<a name="chorus_mdm_state_v1_state-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/state/v1/state.proto



<a name="chorus-mdm-state-v1-GetStatesByCodesRequest"></a>

### GetStatesByCodesRequest
Request message for `StateInfoService.GetStatesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_code_list | [StateCode](#chorus-mdm-state-v1-StateCode) | repeated | The state code list. |






<a name="chorus-mdm-state-v1-GetStatesByCodesResponse"></a>

### GetStatesByCodesResponse
Response message for `StateInfoService.GetStatesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [State](#chorus-mdm-state-v1-State) |  | The state information. |






<a name="chorus-mdm-state-v1-SearchStatesByNameRequest"></a>

### SearchStatesByNameRequest
Request message for `StateInfoService.SearchStatesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_name | [string](#string) |  | The name of the state. |






<a name="chorus-mdm-state-v1-SearchStatesByNameResponse"></a>

### SearchStatesByNameResponse
Response message for `StateInfoService.SearchStatesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [State](#chorus-mdm-state-v1-State) |  | The state information. |






<a name="chorus-mdm-state-v1-State"></a>

### State
The state information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_code | [string](#string) |  | The state_code is the code of the state. ste_cd in OPUS. |
| state_name | [string](#string) |  | The state_name is the name of the state. ste_nm in OPUS. |
| country_code | [string](#string) |  | The country_code is the country code of the state. cnt_cd in OPUS. |






<a name="chorus-mdm-state-v1-StateCode"></a>

### StateCode
The state code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_code | [string](#string) |  | The code of the state. |





 

 

 


<a name="chorus-mdm-state-v1-StateInfoService"></a>

### StateInfoService
Services for state.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetStatesByCodes | [GetStatesByCodesRequest](#chorus-mdm-state-v1-GetStatesByCodesRequest) | [GetStatesByCodesResponse](#chorus-mdm-state-v1-GetStatesByCodesResponse) stream | Get list of states by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;state_code_list&#34;: [ { &#34;state_code&#34;: &#34;SGC&#34; } ] }<br /><br />Response: { &#34;state&#34;: { &#34;state_code&#34;: &#34;SGC&#34;, &#34;state_name&#34;: &#34;SOUTH GLOUCESTERSHIRE&#34;, &#34;country_code&#34;: &#34;GB&#34; } } ... |
| SearchStatesByName | [SearchStatesByNameRequest](#chorus-mdm-state-v1-SearchStatesByNameRequest) | [SearchStatesByNameResponse](#chorus-mdm-state-v1-SearchStatesByNameResponse) stream | Search list of states by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;state_name&#34;: &#34;SOUTH&#34; }<br /><br />Response: { &#34;state&#34;: { &#34;state_code&#34;: &#34;SD&#34;, &#34;state_name&#34;: &#34;SOUTH DAKOTA&#34;, &#34;country_code&#34;: &#34;US&#34; } } ... |

 



<a name="chorus_mdm_subcontinent_v1_subcontinent-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/subcontinent/v1/subcontinent.proto



<a name="chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesRequest"></a>

### GetSubcontinentsByCodesRequest
Request message for `SubcontinentInfoService.GetSubcontinentsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent_code_list | [SubcontinentCode](#chorus-mdm-subcontinent-v1-SubcontinentCode) | repeated | The subcontinent code list. |






<a name="chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesResponse"></a>

### GetSubcontinentsByCodesResponse
Response message for `SubcontinentInfoService.GetSubcontinentsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent | [Subcontinent](#chorus-mdm-subcontinent-v1-Subcontinent) |  | The subcontinent information |






<a name="chorus-mdm-subcontinent-v1-GetSubcontinentsResponse"></a>

### GetSubcontinentsResponse
Response message for `SubcontinentInfoService.GetSubcontinents`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent | [Subcontinent](#chorus-mdm-subcontinent-v1-Subcontinent) |  | The subcontinent information. |






<a name="chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameRequest"></a>

### SearchSubcontinentsByNameRequest
Request message for `SubcontinentInfoService.SearchSubcontinentsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent_name | [string](#string) |  | The name of the subcontinent |






<a name="chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameResponse"></a>

### SearchSubcontinentsByNameResponse
Response message for `SubcontinentInfoService.SearchSubcontinentsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent | [Subcontinent](#chorus-mdm-subcontinent-v1-Subcontinent) |  | The subcontinent information. |






<a name="chorus-mdm-subcontinent-v1-Subcontinent"></a>

### Subcontinent
The subcontinent information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent_code | [string](#string) |  | The subcontinent_code is the code of the subcontinent. sconti_cd in OPUS. |
| subcontinent_name | [string](#string) |  | The subcontinent_name is the name of the subcontinent. sconti_nm in OPUS. |
| continent_code | [string](#string) |  | The continent_code is the continent code of the subcontinent. conti_cd in OPUS. |






<a name="chorus-mdm-subcontinent-v1-SubcontinentCode"></a>

### SubcontinentCode
The subcontinent code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subcontinent_code | [string](#string) |  | The code of the subcontinent. |





 

 

 


<a name="chorus-mdm-subcontinent-v1-SubcontinentInfoService"></a>

### SubcontinentInfoService
Services for subcontinent.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetSubcontinents | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetSubcontinentsResponse](#chorus-mdm-subcontinent-v1-GetSubcontinentsResponse) stream | Get all list of subcontinents.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;subcontinent&#34;: { &#34;subcontinent_code&#34;: &#34;AE&#34;, &#34;subcontinent_name&#34;: &#34;SOUTH EAST ASIA&#34;, &#34;continent_code&#34;: &#34;A&#34; } } ... |
| GetSubcontinentsByCodes | [GetSubcontinentsByCodesRequest](#chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesRequest) | [GetSubcontinentsByCodesResponse](#chorus-mdm-subcontinent-v1-GetSubcontinentsByCodesResponse) stream | Get list of subcontinents by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;subcontinent_code_list&#34;: [ { &#34;subcontinent_code&#34;: &#34;AE&#34; } ] }<br /><br />Response: { &#34;subcontinent&#34;: { &#34;subcontinent_code&#34;: &#34;AE&#34;, &#34;subcontinent_name&#34;: &#34;SOUTH EAST ASIA&#34;, &#34;continent_code&#34;: &#34;A&#34; } } ... |
| SearchSubcontinentsByName | [SearchSubcontinentsByNameRequest](#chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameRequest) | [SearchSubcontinentsByNameResponse](#chorus-mdm-subcontinent-v1-SearchSubcontinentsByNameResponse) stream | Search list of subcontinents by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;subcontinent_name&#34;: &#34;SOUTH&#34; }<br /><br />Response: { &#34;subcontinent&#34;: { &#34;subcontinent_code&#34;: &#34;AE&#34;, &#34;subcontinent_name&#34;: &#34;SOUTH EAST ASIA&#34;, &#34;continent_code&#34;: &#34;A&#34; } } ... |

 



<a name="chorus_mdm_sub_trade_v1_sub_trade-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/sub_trade/v1/sub_trade.proto



<a name="chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesRequest"></a>

### GetSubTradesBySubTradeCodesRequest
Request message for `SubTradeInfoService.GetSubTradesBySubTradeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade_code_list | [SubTradeCode](#chorus-mdm-sub_trade-v1-SubTradeCode) | repeated | The sub trade code list. |






<a name="chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesResponse"></a>

### GetSubTradesBySubTradeCodesResponse
Response message for `SubTradeInfoService.GetSubTradesBySubTradeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade | [SubTrade](#chorus-mdm-sub_trade-v1-SubTrade) |  | The sub trade information. |






<a name="chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesRequest"></a>

### GetSubTradesByTradeCodesRequest
Request message for `SubTradeInfoService.GetSubTradesByTradeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_code_list | [TradeCode](#chorus-mdm-sub_trade-v1-TradeCode) | repeated | The trade code list. |






<a name="chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesResponse"></a>

### GetSubTradesByTradeCodesResponse
Response message for `SubTradeInfoService.GetSubTradesByTradeCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade | [SubTrade](#chorus-mdm-sub_trade-v1-SubTrade) |  | The sub trade information. |






<a name="chorus-mdm-sub_trade-v1-GetSubTradesResponse"></a>

### GetSubTradesResponse
Response message for `SubTradeInfoService.GetSubTrades`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade | [SubTrade](#chorus-mdm-sub_trade-v1-SubTrade) |  | The sub trade information. |






<a name="chorus-mdm-sub_trade-v1-SubTrade"></a>

### SubTrade
The sub trade information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade_code | [string](#string) |  | The sub_trade_code is the sub trade code of the sub trade. sub_trd_cd in OPUS. |
| sub_trade_name | [string](#string) |  | The sub_trade_name is the sub trade name of the sub trade. sub_trd_nm in OPUS. |
| trade_code | [string](#string) |  | The trade_code is the trade code of the sub trade. trd_cd in OPUS. |






<a name="chorus-mdm-sub_trade-v1-SubTradeCode"></a>

### SubTradeCode
The sub trade code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sub_trade_code | [string](#string) |  | The sub trade code of the sub trade. |






<a name="chorus-mdm-sub_trade-v1-TradeCode"></a>

### TradeCode
The trade code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_code | [string](#string) |  | The trade code of the sub trade. |





 

 

 


<a name="chorus-mdm-sub_trade-v1-SubTradeInfoService"></a>

### SubTradeInfoService
Services for sub trade.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetSubTrades | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetSubTradesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesResponse) stream | Get all list of sub trades.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;sub_trade&#34;: { &#34;sub_trade_code&#34;: &#34;NE&#34;, &#34;sub_trade_name&#34;: &#34;ASIA NORTH EUROPE SUB TRADE&#34;, &#34;trade_code&#34;: &#34;NET&#34; } } ... |
| GetSubTradesBySubTradeCodes | [GetSubTradesBySubTradeCodesRequest](#chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesRequest) | [GetSubTradesBySubTradeCodesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesBySubTradeCodesResponse) stream | Get list of sub trades by sub trade codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;sub_trade_code_list&#34;: [ { &#34;sub_trade_code&#34;: &#34;NE&#34; } ] }<br /><br />Response: { &#34;sub_trade&#34;: { &#34;sub_trade_code&#34;: &#34;NE&#34;, &#34;sub_trade_name&#34;: &#34;ASIA NORTH EUROPE SUB TRADE&#34;, &#34;trade_code&#34;: &#34;NET&#34; } } ... |
| GetSubTradesByTradeCodes | [GetSubTradesByTradeCodesRequest](#chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesRequest) | [GetSubTradesByTradeCodesResponse](#chorus-mdm-sub_trade-v1-GetSubTradesByTradeCodesResponse) stream | Get list of sub trades by trade codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;trade_code_list&#34;: [ { &#34;trade_code&#34;: &#34;NET&#34; } ] }<br /><br />Response: { &#34;sub_trade&#34;: { &#34;sub_trade_code&#34;: &#34;NE&#34;, &#34;sub_trade_name&#34;: &#34;ASIA NORTH EUROPE SUB TRADE&#34;, &#34;trade_code&#34;: &#34;NET&#34; } } ... |

 



<a name="chorus_mdm_time_conversion_v1_time_conversion-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/time_conversion/v1/time_conversion.proto



<a name="chorus-mdm-time_conversion-v1-GetTimeByLocationInfoRequest"></a>

### GetTimeByLocationInfoRequest
Request message for `TimeConversionService.GetTimeByLocationInfo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| from_location_code | [string](#string) |  | The input location code. |
| from_location_time | [string](#string) |  | The input location time. |
| to_location_code | [string](#string) |  | The target location code. |






<a name="chorus-mdm-time_conversion-v1-GetTimeByLocationInfoResponse"></a>

### GetTimeByLocationInfoResponse
Response message for `TimeConversionService.GetTimeByLocationInfo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| converted_time | [string](#string) |  | The converted time. |






<a name="chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoRequest"></a>

### GetTimeByOfficeInfoRequest
Request message for `TimeConversionService.GetTimeByOfficeInfo`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| from_office_code | [string](#string) |  | The input office code. |
| from_office_time | [string](#string) |  | The input office time. |
| to_office_code | [string](#string) |  | The target office code. |






<a name="chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoResponse"></a>

### GetTimeByOfficeInfoResponse
Response message for `TimeConversionService.GetTimeByOfficeInfoResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| converted_time | [string](#string) |  | The converted time. |





 

 

 


<a name="chorus-mdm-time_conversion-v1-TimeConversionService"></a>

### TimeConversionService
Services for timer conversion.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetTimeByLocationInfo | [GetTimeByLocationInfoRequest](#chorus-mdm-time_conversion-v1-GetTimeByLocationInfoRequest) | [GetTimeByLocationInfoResponse](#chorus-mdm-time_conversion-v1-GetTimeByLocationInfoResponse) stream | Get time conversion by location info.<br /><br />Operation: CONVERT_TIME<br /><br />Request: { &#34;from_location_code&#34;: &#34;GMT&#34;, &#34;from_location_time&#34;: &#34;15 Mar 2024 11:16 AM&#34;, &#34;to_location_code&#34;: &#34;KRPUS&#34;, }<br /><br />Response: { &#34;converted_time&#34;: &#34;15 Mar 2024 20:16:00&#34;, } |
| GetTimeByOfficeInfo | [GetTimeByOfficeInfoRequest](#chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoRequest) | [GetTimeByOfficeInfoResponse](#chorus-mdm-time_conversion-v1-GetTimeByOfficeInfoResponse) stream | Get time conversion by office info.<br /><br />Operation: CONVERT_TIME<br /><br />Request: { &#34;from_office_code&#34;: &#34;GMT&#34;, &#34;from_office_time&#34;: &#34;15 Mar 2024 11:16 AM&#34;, &#34;to_office_code&#34;: &#34;FREBB&#34;, }<br /><br />Response: { &#34;converted_time&#34;: &#34;15 Mar 2024 20:16:00&#34;, } |

 



<a name="chorus_mdm_trade_v1_trade-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/trade/v1/trade.proto



<a name="chorus-mdm-trade-v1-GetTradesByCodesRequest"></a>

### GetTradesByCodesRequest
Request message for `TradeInfoService.GetTradesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_code_list | [TradeCode](#chorus-mdm-trade-v1-TradeCode) | repeated | The trade code list. |






<a name="chorus-mdm-trade-v1-GetTradesByCodesResponse"></a>

### GetTradesByCodesResponse
Response message for `TradeInfoService.GetTradesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade | [Trade](#chorus-mdm-trade-v1-Trade) |  | The trade information. |






<a name="chorus-mdm-trade-v1-GetTradesByNameRequest"></a>

### GetTradesByNameRequest
Request message for `TradeService.GetTradesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_name | [string](#string) |  | The TradeName. |






<a name="chorus-mdm-trade-v1-GetTradesByNameResponse"></a>

### GetTradesByNameResponse
Response message for `TradeService.GetTradesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade | [Trade](#chorus-mdm-trade-v1-Trade) |  | The trade. |






<a name="chorus-mdm-trade-v1-GetTradesResponse"></a>

### GetTradesResponse
Response message for `TradeInfoService.GetTrades`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade | [Trade](#chorus-mdm-trade-v1-Trade) |  | The trade information. |






<a name="chorus-mdm-trade-v1-Trade"></a>

### Trade
The trade information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_code | [string](#string) |  | The trade_code is the code of the trade. trd_cd in OPUS. |
| trade_name | [string](#string) |  | The trade_name is the name of the trade. trd_nm in OPUS. |






<a name="chorus-mdm-trade-v1-TradeCode"></a>

### TradeCode
The trade code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| trade_code | [string](#string) |  | The code of the trade. |





 

 

 


<a name="chorus-mdm-trade-v1-TradeInfoService"></a>

### TradeInfoService
Services for trade.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetTrades | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetTradesResponse](#chorus-mdm-trade-v1-GetTradesResponse) stream | Get all list of trades.<br /><br />Operation: ALL<br /><br />Request: None<br /><br />Response: { &#34;trade&#34;: { &#34;trade_code&#34;: &#34;NET&#34;, &#34;trade_name&#34;: &#34;ASIA NORTH EUROPE TRADE&#34; } } ... |
| GetTradesByCodes | [GetTradesByCodesRequest](#chorus-mdm-trade-v1-GetTradesByCodesRequest) | [GetTradesByCodesResponse](#chorus-mdm-trade-v1-GetTradesByCodesResponse) stream | Get list of trades by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;trade_code_list&#34;: [ { &#34;trade_code&#34;: &#34;NET&#34; } ] }<br /><br />Response: { &#34;trade&#34;: { &#34;trade_code&#34;: &#34;NET&#34;, &#34;trade_name&#34;: &#34;ASIA NORTH EUROPE TRADE&#34; } } ... |
| GetTradesByName | [GetTradesByNameRequest](#chorus-mdm-trade-v1-GetTradesByNameRequest) | [GetTradesByNameResponse](#chorus-mdm-trade-v1-GetTradesByNameResponse) stream | Get trades by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;trade_name&#34;: &#34;COMMON FEEDER TRADE&#34; }<br /><br />Response: { &#34;trade&#34;: { &#34;trade_code&#34;: &#34;COM&#34;, &#34;trade_name&#34;: &#34;COMMON FEEDER TRADE&#34;, } } ... |

 



<a name="chorus_mdm_user_authentication_v1_user_authentication-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/user_authentication/v1/user_authentication.proto



<a name="chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsRequest"></a>

### SearchUserAuthenticationsByMultipleFieldsRequest
Request message for `UserAuthenticationInfoService.SearchUserAuthenticationsByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) | optional | The user_id is the id of the user. usr_id in OPUS. |
| master_data_subject_code | [string](#string) | optional | The master_data_subject_code is the master data subject code of the user authentication. mst_dat_subj_cd in OPUS. |
| office_code | [string](#string) | optional | The office_code is the office code of the account. ofc_cd in OPUS. |






<a name="chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsResponse"></a>

### SearchUserAuthenticationsByMultipleFieldsResponse
Response message for `UserAuthenticationInfoService.SearchUserAuthenticationsByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_authentication | [UserAuthentication](#chorus-mdm-user_authentication-v1-UserAuthentication) |  | The user authentication information. |






<a name="chorus-mdm-user_authentication-v1-UserAuthentication"></a>

### UserAuthentication
The user authentication information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user_id | [string](#string) |  | The user_id is the id of the user. usr_id in OPUS. |
| master_data_subject_code | [string](#string) |  | The master_data_subject_code is the master data subject code of the user authentication. mst_dat_subj_cd in OPUS. |
| office_code | [string](#string) |  | The office_code is the office code of the user authentication. ofc_cd in OPUS. |
| authority_type_code | [string](#string) |  | The authority_type_code is the authority type code of the user authentication. auth_tp_cd in OPUS. |
| program_id | [string](#string) |  | The program_id is the program id of the user authentication. pgm_id in OPUS. |
| create_user_id | [string](#string) |  | The create_user_id is the create user id of the user authentication. cre_usr_id in OPUS. |
| create_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The create_date is the create date of the user authentication. cre_dt in OPUS. |
| update_user_id | [string](#string) |  | The update_user_id is the update user id of the user authentication. upd_usr_id in OPUS. |
| update_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The update_date is the update date of the user authentication. upd_dt in OPUS. |
| edw_update_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The edw_update_date is the edw update date of the user authentication. edw_udp_dt in OPUS. |





 

 

 


<a name="chorus-mdm-user_authentication-v1-UserAuthenticationInfoService"></a>

### UserAuthenticationInfoService
Services for user authentication.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SearchUserAuthenticationsByMultipleFields | [SearchUserAuthenticationsByMultipleFieldsRequest](#chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsRequest) | [SearchUserAuthenticationsByMultipleFieldsResponse](#chorus-mdm-user_authentication-v1-SearchUserAuthenticationsByMultipleFieldsResponse) stream | Get list of user authentication by multiple fields.<br /><br />Operation: LIKE for user_id &amp; MATCH for master_data_subject_code and office_code<br /><br />Request: { &#34;user_id&#34;: &#34;brett.freese@one-line.com&#34;, &#34;master_data_subject_code&#34;: &#34;&#34;, &#34;office_code&#34;: &#34;&#34;, }<br /><br />Response: { &#34;user_authentication&#34;: { &#34;user_id&#34;: &#34;11501021&#34;, &#34;master_data_subject_code&#34;: &#34;CUST&#34;, &#34;office_code&#34;: &#34;CPTBB&#34;, &#34;authority_type_code&#34;: &#34;R&#34;, &#34;program_id&#34;: &#34;BCM_CCD_0052&#34;, &#34;create_user_id&#34;: &#34;maria.godinho@one-line.com&#34;, &#34;create_date&#34;: { &#34;seconds&#34;: &#34;1567417581&#34;, &#34;nanos&#34;: 0 }, &#34;update_user_id&#34;: &#34;maria.godinho@one-line.com&#34;, &#34;update_date&#34;: { &#34;seconds&#34;: &#34;1567417581&#34;, &#34;nanos&#34;: 0 }, &#34;edw_update_date&#34;: { &#34;seconds&#34;: &#34;1646906817&#34;, &#34;nanos&#34;: 0 } } } ... |

 



<a name="chorus_mdm_vendor_contact_point_v1_vendor_contact_point-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vendor_contact_point/v1/vendor_contact_point.proto



<a name="chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest"></a>

### GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest
Request message for `VendorContactPointInfoService.GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence_and_primary_check_flag_list | [VendorSequenceAndPrimaryCheckFlag](#chorus-mdm-vendor_contact_point-v1-VendorSequenceAndPrimaryCheckFlag) | repeated | The vendor sequence and primary check flag list. |






<a name="chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse"></a>

### GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse
Response message for `VendorContactPointInfoService.GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_contact_point | [VendorContactPoint](#chorus-mdm-vendor_contact_point-v1-VendorContactPoint) |  | The vendor contact point information. |






<a name="chorus-mdm-vendor_contact_point-v1-VendorContactPoint"></a>

### VendorContactPoint
The vendor contact point information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the vendor sequence of the vendor. vndr_seq in OPUS. |
| vendor_contact_point_sequence | [int32](#int32) |  | The vendor_contact_point_sequence is the vendor sequence of the vendor contact point. vndr_cntc_pnt_seq in OPUS. |
| primary_check_flag | [string](#string) |  | The primary_check_flag is the primary check flag of the vendor contact point. prmry_chk_flg in OPUS. |
| international_phone_number | [string](#string) |  | The international_phone_number is the international phone number of the vendor contact point. intl_phn_no in OPUS. |
| phone_number | [string](#string) |  | The phone_number is the phone number of the vendor contact point. phn_no in OPUS. |
| international_fax_number | [string](#string) |  | The international_fax_number is the international fax number of the vendor contact point. intl_fax_no in OPUS. |
| fax_number | [string](#string) |  | The fax_number is the fax number of the vendor contact point. fax_no in OPUS. |
| vendor_email | [string](#string) |  | The vendor_email is the vendor email of the vendor contact point. vndr_eml in OPUS. |






<a name="chorus-mdm-vendor_contact_point-v1-VendorSequenceAndPrimaryCheckFlag"></a>

### VendorSequenceAndPrimaryCheckFlag
The vendor sequence and primary check flag.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor sequence of the vendor contact point. |
| primary_check_flag | [string](#string) |  | The primary check flag of the vendor contact point. |





 

 

 


<a name="chorus-mdm-vendor_contact_point-v1-VendorContactPointInfoService"></a>

### VendorContactPointInfoService
Services for vendor contact point.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlags | [GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest](#chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsRequest) | [GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse](#chorus-mdm-vendor_contact_point-v1-GetVendorContactPointsByVendorSequencesAndPrimaryCheckFlagsResponse) stream | Get list of vendor contact points by vendor sequences and primary check flags.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vendor_sequence_and_primary_check_flag_list&#34;: [ { &#34;vendor_sequence&#34;: 100245, &#34;primary_check_flag&#34;: &#39;Y&#39; } ], }<br /><br />Response: { &#34;vendor_contact_point&#34;: { &#34;vendor_sequence&#34;: 100245, &#34;vendor_contact_point_sequence&#34;: 1 &#34;primary_check_flag&#34;: &#34;Y&#34; &#34;international_phone_number&#34;: &#34;33&#34; &#34;phone_number&#34;: &#34;4-91114190&#34; &#34;international_fax_number&#34;: &#34;33&#34; &#34;fax_number&#34;: &#34;4-96157651&#34; &#34;vendor_email&#34;: &#34;logist-fos@arnal.fr&#34; } } ... |

 



<a name="chorus_mdm_vendor_india_information_v1_vendor_india_information-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vendor_india_information/v1/vendor_india_information.proto



<a name="chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesRequest"></a>

### GetVendorIndiaInformationBySequencesRequest
Request message for `VendorIndiaInfoService.GetVendorIndiaInformationBySequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence_list | [VendorSequence](#chorus-mdm-vendor_india_information-v1-VendorSequence) | repeated | The vendor sequence list |






<a name="chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesResponse"></a>

### GetVendorIndiaInformationBySequencesResponse
Response message for `VendorInfoService.GetVendorIndiaInformationBySequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_india_information | [VendorIndiaInformation](#chorus-mdm-vendor_india_information-v1-VendorIndiaInformation) |  | The vendor india information. |






<a name="chorus-mdm-vendor_india_information-v1-VendorIndiaInformation"></a>

### VendorIndiaInformation
The vendor india information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the sequence of the vendor india information. vndr_seq in OPUS. |
| vendor_gst_number | [string](#string) |  | The vendor_gst_number is the vendor gst number of the vendor india information. vndr_gst_no in OPUS. |
| service_accounting_code | [string](#string) |  | The service_accounting_code is the service accounting code of the vendor india information. service_accounting_code in OPUS. |
| india_gst_number | [string](#string) |  | The india_gst_number is the india gst number of the vendor india information. india_gst_no in OPUS. |






<a name="chorus-mdm-vendor_india_information-v1-VendorSequence"></a>

### VendorSequence
The vendor india sequence information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the sequence of the vendor india information. |





 

 

 


<a name="chorus-mdm-vendor_india_information-v1-VendorIndiaInformationInfoService"></a>

### VendorIndiaInformationInfoService
Services for vendor india information.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVendorIndiaInformationBySequences | [GetVendorIndiaInformationBySequencesRequest](#chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesRequest) | [GetVendorIndiaInformationBySequencesResponse](#chorus-mdm-vendor_india_information-v1-GetVendorIndiaInformationBySequencesResponse) stream | Get list of vendors india information by sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vendor_sequence_list&#34;: [ { &#34;vendor_sequence&#34;: 117893, } ] }<br /><br />Response: { &#34;vendor_india_information&#34;: { &#34;vendor_sequence&#34;: 117893, &#34;vendor_gst_number&#34;: &#34;03BGEPS8138Q1ZQ&#34;, &#34;service_accounting_code&#34;: &#34;998729&#34;, &#34;india_gst_number&#34;: &#34;03AACCO6217A1Z5&#34;, } } ... |

 



<a name="chorus_mdm_vendor_v1_vendor-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vendor/v1/vendor.proto



<a name="chorus-mdm-vendor-v1-CountryCodeAndSequence"></a>

### CountryCodeAndSequence
The vendor code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_country_code | [string](#string) |  | The vendor_country_code is the country code of the vendor. |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the sequence of the vendor. |






<a name="chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesRequest"></a>

### GetVendorsByCountryCodesAndSequencesRequest
Request message for `VendorInfoService.GetVendorsByCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code_and_sequence_list | [CountryCodeAndSequence](#chorus-mdm-vendor-v1-CountryCodeAndSequence) | repeated | The country code and vendor sequence list |






<a name="chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesResponse"></a>

### GetVendorsByCountryCodesAndSequencesResponse
Response message for `VendorInfoService.GetVendorsByCountryCodesAndSequences`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor | [Vendor](#chorus-mdm-vendor-v1-Vendor) |  | The vendor information. |






<a name="chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameRequest"></a>

### SearchVendorsBySequenceOrLegalEnglishNameRequest
Request message for `VendorInfoService.SearchVendorsBySequenceOrLegalEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| search_string | [string](#string) |  | The vendor_sequence or legal_english_name. |






<a name="chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameResponse"></a>

### SearchVendorsBySequenceOrLegalEnglishNameResponse
Response message for `VendorInfoService.SearchVendorsBySequenceOrLegalEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor | [Vendor](#chorus-mdm-vendor-v1-Vendor) |  | The vendor information. |






<a name="chorus-mdm-vendor-v1-Vendor"></a>

### Vendor
The vendor information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vendor_country_code | [string](#string) |  | The vendor_country_code is the country code of the vendor. vndr_cnt_cd in OPUS. |
| vendor_sequence | [int32](#int32) |  | The vendor_sequence is the sequence of the vendor. vndr_seq in OPUS. |
| vendor_legal_english_name | [string](#string) |  | The vendor_legal_english_name is the legal english name of the vendor. vndr_lgl_eng_nm in OPUS. |
| office_code | [string](#string) |  | The office_code is the office code of the vendor. ofc_cd in OPUS. |
| location_code | [string](#string) |  | The location_code is the location code of the vendor. loc_cd in OPUS. |





 

 

 


<a name="chorus-mdm-vendor-v1-VendorInfoService"></a>

### VendorInfoService
Services for vendor.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVendorsByCountryCodesAndSequences | [GetVendorsByCountryCodesAndSequencesRequest](#chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesRequest) | [GetVendorsByCountryCodesAndSequencesResponse](#chorus-mdm-vendor-v1-GetVendorsByCountryCodesAndSequencesResponse) stream | Get list of vendors by country codes and sequences.<br /><br />Operation: MATCH<br /><br />Request: { &#34;country_code_and_sequence_list&#34;: [ { &#34;vendor_sequence&#34;: 111841, &#34;vendor_country_code&#34;: &#34;US&#34; }, { &#34;vendor_sequence&#34;: 111461, &#34;vendor_country_code&#34;: &#34;US&#34; } ] }<br /><br />Response: { &#34;vendor&#34;: { &#34;vendor_country_code&#34;: &#34;US&#34;, &#34;vendor_sequence&#34;: 111461, &#34;vendor_legal_english_name&#34;: &#34;AUTHENTIC TRANSPORT, INC.&#34;, &#34;office_code&#34;: &#34;NYCBB&#34;, &#34;location_code&#34;: &#34;USMEM&#34; } } ... |
| SearchVendorsBySequenceOrLegalEnglishName | [SearchVendorsBySequenceOrLegalEnglishNameRequest](#chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameRequest) | [SearchVendorsBySequenceOrLegalEnglishNameResponse](#chorus-mdm-vendor-v1-SearchVendorsBySequenceOrLegalEnglishNameResponse) stream | Get list of vendors by sequence or vendor legal english name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;search_string&#34;: &#34;14012&#34; }<br /><br />Response: { &#34;vendor&#34;: { &#34;vendor_country_code&#34;: &#34;DE&#34;, &#34;vendor_sequence&#34;: 140127, &#34;vendor_legal_english_name&#34;: &#34;EUROGATE CONTAINER TERMINAL HAMBURG GMBH&#34;, &#34;office_code&#34;: &#34;HAMBB&#34;, &#34;location_code&#34;: &#34;DEHAM&#34; } } ... |

 



<a name="chorus_mdm_vessel_container_v1_vessel_container-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vessel_container/v1/vessel_container.proto



<a name="chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesRequest"></a>

### GetVesselContainersByVesselCodesRequest
Request message for `VesselContainerInfoService.GetVesselContainersByVesselCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code_list | [VesselCode](#chorus-mdm-vessel_container-v1-VesselCode) | repeated | The vessel container code list |






<a name="chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesResponse"></a>

### GetVesselContainersByVesselCodesResponse
Response message for `VesselContainerInfoService.GetVesselContainersByVesselCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_container | [VesselContainer](#chorus-mdm-vessel_container-v1-VesselContainer) |  | The vessel container information. |






<a name="chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsRequest"></a>

### SearchVesselContainersByMultipleFieldsRequest
Request message for `VesselContainerInfoService.SearchVesselContainersByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | The code of the vessel container. |
| vessel_english_name | [string](#string) |  | The english name of the vessel container. |
| options | [chorus.mdm.base.v1.Option](#chorus-mdm-base-v1-Option) |  | The condition of like search. |






<a name="chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsResponse"></a>

### SearchVesselContainersByMultipleFieldsResponse
Response message for `VesselContainerInfoService.SearchVesselContainersByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_container | [VesselContainerMultipleSearch](#chorus-mdm-vessel_container-v1-VesselContainerMultipleSearch) |  | The vessel container information. |






<a name="chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameRequest"></a>

### SearchVesselContainersByVesselEnglishNameRequest
Request message for `VesselContainerInfoService.SearchVesselContainersByVesselEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_english_name | [string](#string) |  | The english name of the vessel container. |






<a name="chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameResponse"></a>

### SearchVesselContainersByVesselEnglishNameResponse
Response message for `VesselContainerInfoService.SearchVesselContainersByVesselEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_container | [VesselContainer](#chorus-mdm-vessel_container-v1-VesselContainer) |  | The vessel container information. |






<a name="chorus-mdm-vessel_container-v1-VesselCode"></a>

### VesselCode
The vessel container code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | The code of the vessel container. |






<a name="chorus-mdm-vessel_container-v1-VesselContainer"></a>

### VesselContainer
The vessel container information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | vessel_code is the code of the vessel container. vsl_cd in OPUS. |
| vessel_english_name | [string](#string) |  | vessel_english_name is the english name of the vessel container. vsl_eng_nm in OPUS. |
| carrier_code | [string](#string) |  | carrier_code is the carrier code of the vessel container. crr_cd in OPUS. |






<a name="chorus-mdm-vessel_container-v1-VesselContainerMultipleSearch"></a>

### VesselContainerMultipleSearch
The vessel container information for multiple search.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | vessel_code is the code of the vessel container. vsl_cd in OPUS. |
| vessel_english_name | [string](#string) |  | vessel_english_name is the english name of the vessel container. vsl_eng_nm in OPUS. |





 

 

 


<a name="chorus-mdm-vessel_container-v1-VesselContainerInfoService"></a>

### VesselContainerInfoService
Services for vessel container.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVesselContainersByVesselCodes | [GetVesselContainersByVesselCodesRequest](#chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesRequest) | [GetVesselContainersByVesselCodesResponse](#chorus-mdm-vessel_container-v1-GetVesselContainersByVesselCodesResponse) stream | Get list of vessel containers by vessel codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vessel_code_list&#34;: [ { &#34;vessel_code&#34;: &#34;GTGT&#34; } ] }<br /><br />Response: { &#34;vessel_container&#34;: { &#34;vessel_code&#34;: &#34;GTGT&#34; &#34;vessel_english_name&#34;: &#34;GSL TIANJIN&#34; &#34;carrier_code&#34;: &#34;YML&#34; } } ... |
| SearchVesselContainersByVesselEnglishName | [SearchVesselContainersByVesselEnglishNameRequest](#chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameRequest) | [SearchVesselContainersByVesselEnglishNameResponse](#chorus-mdm-vessel_container-v1-SearchVesselContainersByVesselEnglishNameResponse) stream | Get list of vessel containers by english name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;vessel_english_name&#34;: &#34;GSL&#34; }<br /><br />Response: { &#34;vessel_container&#34;: { &#34;vessel_code&#34;: &#34;YRST&#34; &#34;vessel_english_name&#34;: &#34;GSL SYROS&#34; &#34;carrier_code&#34;: &#34;YML&#34; } } ... |
| SearchVesselContainersByMultipleFields | [SearchVesselContainersByMultipleFieldsRequest](#chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsRequest) | [SearchVesselContainersByMultipleFieldsResponse](#chorus-mdm-vessel_container-v1-SearchVesselContainersByMultipleFieldsResponse) stream | Get list of vessel containers by multiple search.<br /><br />Operation: LIKE<br /><br />Request: { &#34;vessel_code&#34;: &#34;GT&#34; &#34;vessel_english_name&#34;: &#34;GS&#34; &#34;options&#34;: { &#34;start_with&#34;: true } }<br /><br />Response: { &#34;vessel_container&#34;: { &#34;vessel_code&#34;: &#34;YRST&#34; &#34;vessel_english_name&#34;: &#34;GSL SYROS&#34; &#34;carrier_code&#34;: &#34;YML&#34; } } ... |

 



<a name="chorus_mdm_vessel_service_lane_additional_v1_vessel_service_lane_additional-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vessel_service_lane_additional/v1/vessel_service_lane_additional.proto



<a name="chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest"></a>

### GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest
Request message for `VesselServiceLaneAdditionalInfoService.GetVesselServiceLaneAdditionalByVesselServiceLaneCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code_list | [VesselServiceLaneCode](#chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneCode) | repeated | The vessel service lane code. |






<a name="chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse"></a>

### GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse
Response message for `VesselServiceLaneAdditionalInfoService.GetVesselServiceLaneAdditionalByVesselServiceLaneCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_additional | [VesselServiceLaneAdditional](#chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneAdditional) |  | The vessel service lane additional information. |






<a name="chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneAdditional"></a>

### VesselServiceLaneAdditional
The vessel service lane additional information. (MDM_VSL_SVC_LANE_ADD)


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The vessel_service_lane_code is the code of vessel service lane additional. vsl_slan_cd in OPUS. |
| vessel_service_lane_kind_content | [string](#string) |  | The vessel service lane kind content is the kind content of the vessel service lane additional. vsl_slan_knd_ctnt in OPUS. |
| trade_name | [string](#string) |  | The trade name is the trade name of vessel service lane additional. trd_nm in OPUS |






<a name="chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneCode"></a>

### VesselServiceLaneCode
The vessel service lane additional search condition by vessel service lane code.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The vessel_service_lane_code of the vessel service lane additional. |





 

 

 


<a name="chorus-mdm-vessel_service_lane_additional-v1-VesselServiceLaneAdditionalInfoService"></a>

### VesselServiceLaneAdditionalInfoService
Services for vessel service lane additional.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVesselServiceLaneAdditionalByVesselServiceLaneCodes | [GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest](#chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesRequest) | [GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse](#chorus-mdm-vessel_service_lane_additional-v1-GetVesselServiceLaneAdditionalByVesselServiceLaneCodesResponse) stream | Get list of vessel service lane additional by vessel service lane code.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vessel_service_lane_code_list&#34;: [ { &#34;vessel_service_lane_code&#34;: &#34;AGX&#34; } ] }<br /><br />Response: { &#34;vessel_service_lane_additional&#34;: { &#34;vessel_service_lane_code&#34;: &#34;AGX&#34;, &#34;vessel_service_lane_kind_content&#34;: &#34;THEA&#34;, &#34;trade_name&#34;: &#34;INTRA &amp; OTHERS&#34; } } ... |

 



<a name="chorus_mdm_vessel_service_lane_v1_vessel_service_lane-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vessel_service_lane/v1/vessel_service_lane.proto



<a name="chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesRequest"></a>

### GetVesselServiceLanesByCodesRequest
Request message for `VesselServiceLaneInfoService.GetVesselServiceLanesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code_list | [VesselServiceLaneCode](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneCode) | repeated | The vessel service lane code list. |






<a name="chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesResponse"></a>

### GetVesselServiceLanesByCodesResponse
Response message for `VesselServiceLaneInfoService.GetVesselServiceLanesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane | [VesselServiceLane](#chorus-mdm-vessel_service_lane-v1-VesselServiceLane) |  | The vessel service lane information. |
| vessel_service_lane_direction | [VesselServiceLaneDirection](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneDirection) | repeated | The vessel service lane direction information. |






<a name="chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsRequest"></a>

### SearchVesselServiceLanesByMultipleFieldsRequest
Request message for `VesselServiceLaneInfoService.SearchVesselServiceLanesByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) | optional | The code of the vessel service lane. |
| vessel_service_lane_name | [string](#string) | optional | The name of the vessel service lane. |
| vessel_service_type_code | [string](#string) | optional | The code of the vessel service lane type. |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | The pagination info. |
| order_by | [chorus.mdm.base.v1.OrderBy](#chorus-mdm-base-v1-OrderBy) | repeated | The order by list |






<a name="chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsResponse"></a>

### SearchVesselServiceLanesByMultipleFieldsResponse
Response message for `VesselServiceLaneInfoService.SearchVesselServiceLanesByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_info | [VesselServiceLaneInfo](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneInfo) |  | The vessel service lane information. |






<a name="chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameRequest"></a>

### SearchVesselServiceLanesByNameRequest
Request message for `VesselServiceLaneInfoService.SearchVesselServiceLanesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_name | [string](#string) |  | The vessel service lane name. |






<a name="chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameResponse"></a>

### SearchVesselServiceLanesByNameResponse
Response message for `VesselServiceLaneInfoService.SearchVesselServiceLanesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane | [VesselServiceLane](#chorus-mdm-vessel_service_lane-v1-VesselServiceLane) |  | The vessel service lane information. |
| vessel_service_lane_direction | [VesselServiceLaneDirection](#chorus-mdm-vessel_service_lane-v1-VesselServiceLaneDirection) | repeated | The vessel service lane direction information. |






<a name="chorus-mdm-vessel_service_lane-v1-VesselServiceLane"></a>

### VesselServiceLane
The vessel service lane information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The vessel_service_lane_code is the code of the vessel service lane. vsl_slan_cd in OPUS. |
| vessel_service_lane_name | [string](#string) |  | The vessel_service_lane_name is the name of the vessel service lane. vsl_slan_nm in OPUS. |
| vessel_service_type_code | [string](#string) |  | The vessel_service_type_code is the type code of the vessel service lane. vsl_svc_tp_cd in OPUS. |






<a name="chorus-mdm-vessel_service_lane-v1-VesselServiceLaneCode"></a>

### VesselServiceLaneCode
The vessel service lane code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The code of the vessel service lane. |






<a name="chorus-mdm-vessel_service_lane-v1-VesselServiceLaneDirection"></a>

### VesselServiceLaneDirection
The vessel service lane direction information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The vessel_service_lane_code is the code of the vessel service lane. vsl_slan_cd in OPUS. |
| vessel_service_lane_direction_code | [string](#string) |  | The vessel_service_lane_direction_code is the code of the vessel service lane direction. vsl_slan_dir_cd in OPUS. |
| vessel_service_lane_direction_sequence | [int32](#int32) |  | The vessel_service_lane_direction_sequence is the sequence of the vessel service lane direction. vsl_slan_dir_seq in OPUS. |






<a name="chorus-mdm-vessel_service_lane-v1-VesselServiceLaneInfo"></a>

### VesselServiceLaneInfo
The vessel service lane code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_service_lane_code | [string](#string) |  | The code of the vessel service lane. vsl_slan_cd in OPUS. |
| vessel_service_lane_name | [string](#string) |  | The name of the vessel service lane. vsl_slan_nm in OPUS. |
| vessel_service_type_code | [string](#string) |  | The code of the vessel service lane type. vsl_svc_tp_cd in OPUS. |
| integration_code_value_display_description | [string](#string) |  | The integration_code_value_display_description is the integration code value display description. intg_cd_val_dp_desc in OPUS. |
| total_row_count | [int32](#int32) |  | The total_row_count total records of the search request. |





 

 

 


<a name="chorus-mdm-vessel_service_lane-v1-VesselServiceLaneInfoService"></a>

### VesselServiceLaneInfoService
Services for vessel service lane.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVesselServiceLanesByCodes | [GetVesselServiceLanesByCodesRequest](#chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesRequest) | [GetVesselServiceLanesByCodesResponse](#chorus-mdm-vessel_service_lane-v1-GetVesselServiceLanesByCodesResponse) stream | Get list of vessel service lanes by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vessel_service_lane_code_list&#34;: [ { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34; } ] }<br /><br />Response: { &#34;vessel_service_lane_direction&#34;: [ { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_direction_code&#34;: &#34;N&#34;, &#34;vessel_service_lane_direction_sequence&#34;: 1 }, { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_direction_code&#34;: &#34;S&#34;, &#34;vessel_service_lane_direction_sequence&#34;: 2 } ], &#34;vessel_service_lane&#34;: { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_name&#34;: &#34;HO CHI MINH - HAIPHONG&#34;, &#34;vessel_service_type_code&#34;: &#34;C&#34; } } ... |
| SearchVesselServiceLanesByName | [SearchVesselServiceLanesByNameRequest](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameRequest) | [SearchVesselServiceLanesByNameResponse](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByNameResponse) stream | Get list of vessel service lanes by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;vessel_service_lane_name&#34;: &#34;HO CHI MINH&#34; }<br /><br />Response: { &#34;vessel_service_lane_direction&#34;: [ { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_direction_code&#34;: &#34;N&#34;, &#34;vessel_service_lane_direction_sequence&#34;: 1 }, { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_direction_code&#34;: &#34;S&#34;, &#34;vessel_service_lane_direction_sequence&#34;: 2 } ], &#34;vessel_service_lane&#34;: { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_name&#34;: &#34;HO CHI MINH - HAIPHONG&#34;, &#34;vessel_service_type_code&#34;: &#34;C&#34; } } ... |
| SearchVesselServiceLanesByMultipleFields | [SearchVesselServiceLanesByMultipleFieldsRequest](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsRequest) | [SearchVesselServiceLanesByMultipleFieldsResponse](#chorus-mdm-vessel_service_lane-v1-SearchVesselServiceLanesByMultipleFieldsResponse) stream | Search list of vessel service lanes by multiple fields.<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;vessel_service_lane_code&#34; : &#34;9VV&#34;, &#34;vessel_service_lane_name&#34; : &#34;HO CHI MINH - HAIPHONG&#34;, &#34;vessel_service_type_code&#34; : &#34;O&#34;, &#34;pagination&#34; : { offset : 0, limit : 10, }, }<br /><br />Response: { &#34;vessel_service_lane_info&#34;: { &#34;vessel_service_lane_code&#34;: &#34;9VV&#34;, &#34;vessel_service_lane_name&#34;: &#34;HO CHI MINH - HAIPHONG&#34;, &#34;vessel_service_type_code&#34;: &#34;O&#34;, &#34;integration_code_value_display_description&#34;: &#34;ONE&#34;, &#34;totalRowCount&#34;: 1 } } ... |

 



<a name="chorus_mdm_vessel_v1_vessel-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/vessel/v1/vessel.proto



<a name="chorus-mdm-vessel-v1-GetVesselsByCodesRequest"></a>

### GetVesselsByCodesRequest
(Deprecated)
Request message for `VesselInfoService.GetVesselsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code_list | [VesselCode](#chorus-mdm-vessel-v1-VesselCode) | repeated | The vessel code list |






<a name="chorus-mdm-vessel-v1-GetVesselsByCodesResponse"></a>

### GetVesselsByCodesResponse
(Deprecated)
Response message for `VesselInfoService.GetVesselsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel | [Vessel](#chorus-mdm-vessel-v1-Vessel) |  | The vessel information. |






<a name="chorus-mdm-vessel-v1-SearchVesselsByEnglishNameRequest"></a>

### SearchVesselsByEnglishNameRequest
(Deprecated)
Request message for `VesselInfoService.SearchVesselsByEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_english_name | [string](#string) |  | The english name of the vessel. |






<a name="chorus-mdm-vessel-v1-SearchVesselsByEnglishNameResponse"></a>

### SearchVesselsByEnglishNameResponse
(Deprecated)
Response message for `VesselInfoService.SearchVesselsByEnglishName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel | [Vessel](#chorus-mdm-vessel-v1-Vessel) |  | The vessel information. |






<a name="chorus-mdm-vessel-v1-Vessel"></a>

### Vessel
The vessel information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | vessel_code is the code of the vessel. vsl_cd in OPUS. |
| vessel_english_name | [string](#string) |  | vessel_english_name is the english name of the vessel. vsl_eng_nm in OPUS. |






<a name="chorus-mdm-vessel-v1-VesselCode"></a>

### VesselCode
The vessel code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| vessel_code | [string](#string) |  | The code of the vessel. |





 

 

 


<a name="chorus-mdm-vessel-v1-VesselInfoService"></a>

### VesselInfoService
Services for vessel.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetVesselsByCodes | [GetVesselsByCodesRequest](#chorus-mdm-vessel-v1-GetVesselsByCodesRequest) | [GetVesselsByCodesResponse](#chorus-mdm-vessel-v1-GetVesselsByCodesResponse) stream | (Deprecated) Get list of vessels by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;vessel_code_list&#34;: [ { &#34;vessel_code&#34;: &#34;GTGT&#34; } ] }<br /><br />Response: { &#34;vessel&#34;: { &#34;vessel_code&#34;: &#34;GTGT&#34; &#34;vessel_english_name&#34;: &#34;GSL TIANJIN&#34; } } ... |
| SearchVesselsByEnglishName | [SearchVesselsByEnglishNameRequest](#chorus-mdm-vessel-v1-SearchVesselsByEnglishNameRequest) | [SearchVesselsByEnglishNameResponse](#chorus-mdm-vessel-v1-SearchVesselsByEnglishNameResponse) stream | (Deprecated) Get list of vessels by english name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;vessel_english_name&#34;: &#34;GSL&#34; }<br /><br />Response: { &#34;vessel&#34;: { &#34;vessel_code&#34;: &#34;YRST&#34; &#34;vessel_english_name&#34;: &#34;GSL SYROS&#34; } } ... |

 



<a name="chorus_mdm_yard_v1_yard-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/yard/v1/yard.proto



<a name="chorus-mdm-yard-v1-GetYardsByCodesRequest"></a>

### GetYardsByCodesRequest
Request message for `YardInfoService.GetYardsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard_code_list | [YardCode](#chorus-mdm-yard-v1-YardCode) | repeated | The yard code list |






<a name="chorus-mdm-yard-v1-GetYardsByCodesResponse"></a>

### GetYardsByCodesResponse
Response message for `YardInfoService.GetYardsByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard | [Yard](#chorus-mdm-yard-v1-Yard) |  | The yard information. |






<a name="chorus-mdm-yard-v1-SearchYardByMultipleFieldsRequest"></a>

### SearchYardByMultipleFieldsRequest
Request message for `YardInfoService.SearchYardByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard_code | [string](#string) | optional | The code of the yard. |
| yard_name | [string](#string) | optional | The name of the yard. |
| location_code | [string](#string) | optional | The location code of yard. |
| office_code | [string](#string) | optional | The office code of yard. |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | The pagination. |
| order_by | [chorus.mdm.base.v1.OrderBy](#chorus-mdm-base-v1-OrderBy) | repeated | The order by list. |
| location_codes | [string](#string) | repeated | The list of location code. |
| yard_facility_type_marine_terminal_flag | [string](#string) | optional | The facility type marine terminal flag. |






<a name="chorus-mdm-yard-v1-SearchYardByMultipleFieldsResponse"></a>

### SearchYardByMultipleFieldsResponse
Response message for `YardInfoService.SearchYardByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard | [YardSearchPopup](#chorus-mdm-yard-v1-YardSearchPopup) |  | Response model for `YardInfoService.SearchYardByMultipleFields`. |






<a name="chorus-mdm-yard-v1-SearchYardsByNameRequest"></a>

### SearchYardsByNameRequest
Request message for `YardInfoService.SearchYardsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard_name | [string](#string) |  | The name of the yard. |






<a name="chorus-mdm-yard-v1-SearchYardsByNameResponse"></a>

### SearchYardsByNameResponse
Response message for `YardInfoService.SearchYardsByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard | [Yard](#chorus-mdm-yard-v1-Yard) |  | The yard information. |






<a name="chorus-mdm-yard-v1-Yard"></a>

### Yard
The yard information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard_code | [string](#string) |  | The yard_code is the code of the yard. yd_cd in OPUS. |
| yard_name | [string](#string) |  | The yard_name is the name of the yard. yd_nm in OPUS. |
| location_code | [string](#string) |  | The location_code is the location code of the yard. loc_cd in OPUS. |
| yard_address | [string](#string) |  | The yard_address is the address of the yard. yd_addr in OPUS. |
| phone_number | [string](#string) |  | The phone_number is the phone number of the yard. phn_no in OPUS. |
| fax_number | [string](#string) |  | The fax_number is the fax number of the yard. fax_no in OPUS. |
| yard_customs_number | [string](#string) |  | The yard_customs_number is the customs number of the yard. yd_cstms_no in OPUS. |
| yard_email | [string](#string) |  | The yard_email is the email of the yard. yd_eml in OPUS. |
| yard_facility_type_marine_terminal_flag | [string](#string) |  | The yard_facility_type_marine_terminal_flag is the facility type marine terminal flag of the yard. yd_fcty_tp_mrn_tml_flg in OPUS. |
| yard_facility_type_cy_flag | [string](#string) |  | The yard_facility_type_cy_flag is the facility type cy flag of the yard. yd_fcty_tp_cy_flg in OPUS. |
| yard_facility_type_cfs_flag | [string](#string) |  | The yard_facility_type_cfs_flag is the facility type cfs flag of the yard. yd_fcty_tp_cfs_flg in OPUS. |
| yard_facility_type_rail_ramp_flag | [string](#string) |  | The yard_facility_type_rail_ramp_flag is the facility type rail ramp flag of the yard. yd_fcty_tp_rail_rmp_flg in OPUS. |
| yard_facility_type_barge_ramp_flag | [string](#string) |  | The yard_facility_type_barge_ramp_flag is the facility type barge ramp flag of the yard. yd_fcty_tp_brg_rmp_flg in OPUS. |
| yard_facility_type_pseudo_yard_flag | [string](#string) |  | The yard_facility_type_pseudo_yard_flag is the facility type pseudo yard flag of the yard. yd_fcty_tp_psdo_yd_flg in OPUS. |






<a name="chorus-mdm-yard-v1-YardCode"></a>

### YardCode
The yard code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| yard_code | [string](#string) |  | The code of the yard. |






<a name="chorus-mdm-yard-v1-YardSearchPopup"></a>

### YardSearchPopup
Wrap Yard entity from search multiple


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sequence | [int32](#int32) |  | The sequence of yard. |
| yard_code | [string](#string) |  | The yard_code is the code of the yard. yd_cd in OPUS. |
| yard_name | [string](#string) |  | The yard_name is the name of the yard. yd_nm in OPUS. |
| office_code | [string](#string) |  | The ofc_cd is the office code of the yard. ofc_cd in OPUS. |
| loc_cd | [string](#string) |  | The loc_cd is the location code of the yard. loc_cd in OPUS. |
| yd_fcty_tp_mrn_tml_flg | [string](#string) |  | The yd_fcty_tp_mrn_tml_flg is the facility type marine terminal flag of the yard. yd_fcty_tp_mrn_tml_flg in OPUS. |
| yd_fcty_tp_cy_flg | [string](#string) |  | The yd_fcty_tp_cy_flg is the facility type cy flag of the yard. yd_fcty_tp_cy_flg in OPUS. |
| yd_fcty_tp_cfs_flg | [string](#string) |  | The yd_fcty_tp_cfs_flg is the facility type cfs flag of the yard. yd_fcty_tp_cfs_flg in OPUS. |
| yd_fcty_tp_rail_rmp_flg | [string](#string) |  | The yd_fcty_tp_rail_rmp_flg is the facility type rail ramp flag of the yard. yd_fcty_tp_rail_rmp_flg in OPUS. |
| yd_fcty_tp_psdo_yd_flg | [string](#string) |  | The yd_fcty_tp_psdo_yd_flg is the facility type pseudo yard flag of the yard. yd_fcty_tp_psdo_yd_flg in OPUS. |
| yd_cstms_no | [string](#string) |  | The yd_cstms_no is the customs number of the yard. yd_cstms_no in OPUS. |
| yd_bic_fcty_cd | [string](#string) |  | The yd_bic_fcty_cd is the BIC facility code of the yard. yd_bic_fcty_cd in OPUS. |
| yd_smdg_tml_cd | [string](#string) |  | The yd_smdg_tml_cd is the SMDG terminal code of the yard. yd_smdg_tml_cd in OPUS. |





 

 

 


<a name="chorus-mdm-yard-v1-YardInfoService"></a>

### YardInfoService
Services for yard

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetYardsByCodes | [GetYardsByCodesRequest](#chorus-mdm-yard-v1-GetYardsByCodesRequest) | [GetYardsByCodesResponse](#chorus-mdm-yard-v1-GetYardsByCodesResponse) stream | Get list of yards by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;yard_code_list&#34;: [ { &#34;yard_code&#34;: &#34;USSAT31&#34; } ] }<br /><br />Response: { &#34;yard&#34;: { &#34;yard_code&#34;: &#34;USSAT31&#34;, &#34;yard_name&#34;: &#34;WWINNERS (DEPOT) - SAN ANTONIO&#34;, &#34;location_code&#34;: &#34;USSAT&#34;, &#34;yard_address&#34;: &#34;3611 SPEEDWAY RUN,, VON ORMY, TX&#34;, &#34;phone_number&#34;: &#34;210-227-3901&#34;, &#34;fax_number&#34;: &#34;1&#34;, &#34;yard_customs_number&#34;: &#34;V307&#34;, &#34;yard_email&#34;: &#34;DISPATCH.SAN.ANTONIO@WWROWLAND.COM&#34;, &#34;yard_facility_type_marine_terminal_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_cy_flag&#34;: &#34;Y&#34;, &#34;yard_facility_type_cfs_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_rail_ramp_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_barge_ramp_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_pseudo_yard_flag&#34;: &#34;N&#34; } } |
| SearchYardsByName | [SearchYardsByNameRequest](#chorus-mdm-yard-v1-SearchYardsByNameRequest) | [SearchYardsByNameResponse](#chorus-mdm-yard-v1-SearchYardsByNameResponse) stream | Search list of yards by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;yard_name&#34;: &#34;WWINNERS&#34; }<br /><br />Response: { &#34;yard&#34;: { &#34;yard_code&#34;: &#34;USSAT31&#34;, &#34;yard_name&#34;: &#34;WWINNERS (DEPOT) - SAN ANTONIO&#34;, &#34;location_code&#34;: &#34;USSAT&#34;, &#34;yard_address&#34;: &#34;3611 SPEEDWAY RUN,, VON ORMY, TX&#34;, &#34;phone_number&#34;: &#34;210-227-3901&#34;, &#34;fax_number&#34;: &#34;1&#34;, &#34;yard_customs_number&#34;: &#34;V307&#34;, &#34;yard_email&#34;: &#34;DISPATCH.SAN.ANTONIO@WWROWLAND.COM&#34;, &#34;yard_facility_type_marine_terminal_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_cy_flag&#34;: &#34;Y&#34;, &#34;yard_facility_type_cfs_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_rail_ramp_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_barge_ramp_flag&#34;: &#34;N&#34;, &#34;yard_facility_type_pseudo_yard_flag&#34;: &#34;N&#34; } } ... |
| SearchYardByMultipleFields | [SearchYardByMultipleFieldsRequest](#chorus-mdm-yard-v1-SearchYardByMultipleFieldsRequest) | [SearchYardByMultipleFieldsResponse](#chorus-mdm-yard-v1-SearchYardByMultipleFieldsResponse) stream | Search list of yard by multiple fields.<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;yard_code&#34;: &#34;AE&#34;, &#34;yard_name&#34;: &#34;RE-USE YARD&#34;, &#34;location_code&#34;: &#34;AEAUH&#34;, &#34;office_code&#34;: &#34;AUHBA&#34;, &#34;location_codes&#34;: [&#34;AEAUH&#34;], &#34;yard_facility_type_marine_terminal_flag&#34;: &#34;N&#34;, &#34;pagination&#34;: { &#34;limit&#34;: 50, &#34;offset&#34;: 0, }, }<br /><br />Response: { &#34;yard&#34;: { &#34;sequence&#34;: 1, &#34;yard_code&#34;: &#34;AEAUH90&#34;, &#34;yard_name&#34;: &#34;RE-USE YARD RE-USE YARD&#34;, &#34;office_code&#34;: &#34;AUHBA&#34;, &#34;loc_cd&#34;:&#34;AEAUH&#34;, &#34;yd_fcty_tp_mrn_tml_flg&#34;: &#34;N&#34;, &#34;yd_fcty_tp_cy_flg&#34;: &#34;N&#34;, &#34;yd_fcty_tp_cfs_flg&#34;: &#34;N&#34;, &#34;yd_fcty_tp_rail_rmp_flg&#34;: &#34;N&#34;, &#34;yd_fcty_tp_psdo_yd_flg&#34;: &#34;Y&#34;, &#34;yd_cstms_no&#34;: null, &#34;yd_bic_fcty_cd&#34;: null, &#34;yd_smdg_tml_cd&#34;: null } } ... |

 



<a name="chorus_mdm_zone_detail_v1_zone_detail-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/zone_detail/v1/zone_detail.proto



<a name="chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesRequest"></a>

### GetZoneDetailsByZoneCodesRequest
Request message for `ZoneDetailInfoService.GetZoneDetailsByZoneCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code_list | [ZoneDetailCode](#chorus-mdm-zone_detail-v1-ZoneDetailCode) | repeated | The zone code list. |






<a name="chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesResponse"></a>

### GetZoneDetailsByZoneCodesResponse
Response message for `ZoneDetailInfoService.GetZoneDetailsByZoneCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_detail | [ZoneDetail](#chorus-mdm-zone_detail-v1-ZoneDetail) |  | The zone detail information. |






<a name="chorus-mdm-zone_detail-v1-ZoneDetail"></a>

### ZoneDetail
The zone detail information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code | [string](#string) |  | The zone_code is the zone code of the zone detail. zn_cd in OPUS. |
| zone_sequence | [int32](#int32) |  | The zone_sequence is the zone sequence of the zone detail. zn_seq in OPUS. |
| zip_code | [string](#string) |  | The zip_code is the zip code of the zone detail. zip_cd in OPUS. |






<a name="chorus-mdm-zone_detail-v1-ZoneDetailCode"></a>

### ZoneDetailCode
The zone detail code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code | [string](#string) |  | The zone_code is the zone code of the zone detail. |





 

 

 


<a name="chorus-mdm-zone_detail-v1-ZoneDetailInfoService"></a>

### ZoneDetailInfoService
Services for zone detail.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetZoneDetailsByZoneCodes | [GetZoneDetailsByZoneCodesRequest](#chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesRequest) | [GetZoneDetailsByZoneCodesResponse](#chorus-mdm-zone_detail-v1-GetZoneDetailsByZoneCodesResponse) stream | Get list of zone detail by zone codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;zone_code_list&#34;: [ { &#34;zone_code&#34;: &#34;ATVIEZ1&#34; } ] }<br /><br />Response: { &#34;zone_detail&#34;: { &#34;zone_code&#34;: &#34;ATVIEZ1&#34;, &#34;zone_sequence&#34;: 12, &#34;zip_code&#34;: &#34;A-1010&#34; } } ... |

 



<a name="chorus_mdm_zone_v1_zone-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## chorus/mdm/zone/v1/zone.proto



<a name="chorus-mdm-zone-v1-GetZonesByCodesRequest"></a>

### GetZonesByCodesRequest
Request message for `ZoneInfoService.GetZonesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code_list | [ZoneCode](#chorus-mdm-zone-v1-ZoneCode) | repeated | The zone code list. |






<a name="chorus-mdm-zone-v1-GetZonesByCodesResponse"></a>

### GetZonesByCodesResponse
Response message for `ZoneInfoService.GetZonesByCodes`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone | [Zone](#chorus-mdm-zone-v1-Zone) |  | The zone information. |






<a name="chorus-mdm-zone-v1-SearchZoneByMultipleFieldsRequest"></a>

### SearchZoneByMultipleFieldsRequest
Request message for `ZoneInfoService.SearchZoneByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code | [string](#string) | optional | The code of the zone. |
| zone_name | [string](#string) | optional | The name of the zone. |
| location_code | [string](#string) | optional | The location code of the zone. |
| pagination | [chorus.mdm.base.v1.Pagination](#chorus-mdm-base-v1-Pagination) |  | Pagination |
| order_by | [chorus.mdm.base.v1.OrderBy](#chorus-mdm-base-v1-OrderBy) | repeated | The order by list |
| location_codes | [string](#string) | repeated | The list of location code |






<a name="chorus-mdm-zone-v1-SearchZoneByMultipleFieldsResponse"></a>

### SearchZoneByMultipleFieldsResponse
Response message for `ZoneInfoService.SearchZoneByMultipleFields`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone | [ZoneSearchPopup](#chorus-mdm-zone-v1-ZoneSearchPopup) |  | The sequence of yard. |






<a name="chorus-mdm-zone-v1-SearchZonesByNameRequest"></a>

### SearchZonesByNameRequest
Request message for `ZoneInfoService.SearchZonesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_name | [string](#string) |  | The name of the zone. |






<a name="chorus-mdm-zone-v1-SearchZonesByNameResponse"></a>

### SearchZonesByNameResponse
Response message for `ZoneInfoService.SearchZonesByName`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone | [Zone](#chorus-mdm-zone-v1-Zone) |  | The zone information. |






<a name="chorus-mdm-zone-v1-Zone"></a>

### Zone
The zone information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code | [string](#string) |  | The zone_code is the code of the zone. zn_cd in OPUS. |
| zone_name | [string](#string) |  | The zone_name is the name of the zone. zn_nm in OPUS. |
| location_code | [string](#string) |  | The location_code is the location code of the zone. loc_cd in OPUS. |






<a name="chorus-mdm-zone-v1-ZoneCode"></a>

### ZoneCode
The zone code information.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zone_code | [string](#string) |  | The code of the zone. |






<a name="chorus-mdm-zone-v1-ZoneSearchPopup"></a>

### ZoneSearchPopup
Wrap Zone entity from search multiple


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sequence | [int32](#int32) |  | The sequence of yard. |
| zone_code | [string](#string) |  | The zone_code is the code of the zone. zn_cd in OPUS. |
| zone_name | [string](#string) |  | The zone_name is the name of the zone. zn_nm in OPUS. |
| loc_cd | [string](#string) |  | LOC_CD in OPUS. |
| rep_yd_cd | [string](#string) |  | REP_YD_CD in OPUS; |





 

 

 


<a name="chorus-mdm-zone-v1-ZoneInfoService"></a>

### ZoneInfoService
Services for zone.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetZonesByCodes | [GetZonesByCodesRequest](#chorus-mdm-zone-v1-GetZonesByCodesRequest) | [GetZonesByCodesResponse](#chorus-mdm-zone-v1-GetZonesByCodesResponse) stream | Get list of zones by codes.<br /><br />Operation: MATCH<br /><br />Request: { &#34;zone_code_list&#34;: [ { &#34;zone_code&#34;: &#34;AULELZ1&#34; } ] }<br /><br />Response: { &#34;zone&#34;: { &#34;zone_code&#34;: &#34;AULELZ1&#34;, &#34;zone_name&#34;: &#34;LAKE EVELLA, NT&#34;, &#34;location_code&#34;: &#34;AULEL&#34; } } |
| SearchZonesByName | [SearchZonesByNameRequest](#chorus-mdm-zone-v1-SearchZonesByNameRequest) | [SearchZonesByNameResponse](#chorus-mdm-zone-v1-SearchZonesByNameResponse) stream | Search list of zones by name.<br /><br />Operation: LIKE<br /><br />Request: { &#34;zone_name&#34;: &#34;LAKE E&#34; }<br /><br />Response: { &#34;zone&#34;: { &#34;zone_code&#34;: &#34;CALKRZ1&#34;, &#34;zone_name&#34;: &#34;LAKE ERROCK, BC&#34;, &#34;location_code&#34;: &#34;CALKR&#34; } } ... |
| SearchZoneByMultipleFields | [SearchZoneByMultipleFieldsRequest](#chorus-mdm-zone-v1-SearchZoneByMultipleFieldsRequest) | [SearchZoneByMultipleFieldsResponse](#chorus-mdm-zone-v1-SearchZoneByMultipleFieldsResponse) stream | Search list of yard by multiple fields.<br /><br />Operation: LIKE &amp; MATCH<br /><br />Request: { &#34;zone_code&#34;: &#34;AULELZ1&#34;, &#34;zone_name&#34;: &#34;LAKE EVELLA, NT&#34;, &#34;location_code&#34;: &#34;AULEL&#34;, &#34;pagination&#34;: { &#34;limit&#34;: 50, &#34;offset&#34;: 0, }, }<br /><br />Response: { &#34;zone&#34;: { &#34;sequence&#34;: 1, &#34;zone_code&#34;: &#34;AULELZ1&#34;, &#34;zone_name&#34;: &#34;LAKE EVELLA, NT&#34;&#34;, &#34;rep_yd_cd&#34;: null, &#34;loc_cd&#34;: &#34;AULEL&#34; } } |

 



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

