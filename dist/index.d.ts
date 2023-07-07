import { z } from 'zod';

declare const envVariables: z.ZodObject<{
    ALEPH_HOST: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ALEPH_HOST: string;
}, {
    ALEPH_HOST: string;
}>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {
        }
    }
}

declare namespace Aleph {
    type BaseResponse = {
        error?: string | string[];
        'session-id': string;
    };
    type BorrowerInfoResponse = {
        z303: Z303;
        z304: Z304;
        z305: Z305;
        'item-l': ItemLoan[] | undefined;
        'item-h': ItemHold[] | undefined;
    } & BaseResponse;
    type FindDocumentResponse = {
        record: {
            metadata: {
                oai_marc: {
                    fixfield: FixField[];
                    varfield: VarField[];
                };
            };
        };
    } & BaseResponse;
    type ReadItemResponse = {
        z30: Aleph.Z30;
    } & BaseResponse;
    class FixField {
        _: string;
        $: {
            id: string;
        };
    }
    type VarField = {
        $: {
            id: string;
            i1: string;
            i2: string;
        };
        subfield: SubField[];
    };
    type SubField = {
        _: string;
        $: {
            label: string;
        };
    };
    type ItemLoan = {
        z36: Z36;
        z30: Z30;
        z13: Z13;
        'current-fine': string | null;
        'due-date': string;
        'due-hour': string;
    };
    type ItemHold = {
        z37: Z37;
        z30: Z30;
        z13: Z13;
    };
    type Z13 = {
        'z13-doc-number': string;
        'z13-year': string;
        'z13-open-date': string;
        'z13-update-date': string;
        'z13-call-no-key': string;
        'z13-call-no-code': string;
        'z13-call-no': string;
        'z13-author-code': string;
        'z13-author': string;
        'z13-title-code': string;
        'z13-title': string;
        'z13-imprint-code': string;
        'z13-imprint': string;
        'z13-isbn-issn-code': string;
        'z13-isbn-issn': string;
        'z13-upd-time-stamp': string;
    };
    type Z30 = {
        'z30-doc-number': string;
        'z30-item-sequence': string;
        'z30-barcode': string;
        'z30-sub-library': string;
        'z30-material': string;
        'z30-item-status': string;
        'z30-open-date': string;
        'z30-update-date': string;
        'z30-cataloger': string;
        'z30-date-last-return': string;
        'z30-hour-last-return': string;
        'z30-ip-last-return': string;
        'z30-no-loans': string;
        'z30-alpha': string;
        'z30-collection': string;
        'z30-call-no-type': string;
        'z30-call-no': string;
        'z30-call-no-key': string;
        'z30-call-no-2-type': string;
        'z30-call-no-2': string;
        'z30-call-no-2-key': string;
        'z30-description': string;
        'z30-note-opac': string;
        'z30-note-circulation': string;
        'z30-note-internal': string;
        'z30-order-number': string;
        'z30-inventory-number': string;
        'z30-inventory-number-date': string;
        'z30-last-shelf-report-date': string;
        'z30-price': string;
        'z30-shelf-report-number': string;
        'z30-on-shelf-date': string;
        'z30-on-shelf-seq': string;
        'z30-doc-number-2': string;
        'z30-schedule-sequence-2': string;
        'z30-copy-sequence-2': string;
        'z30-vendor-code': string;
        'z30-invoice-number': string;
        'z30-line-number': string;
        'z30-pages': string;
        'z30-issue-date': string;
        'z30-expected-arrival-date': string;
        'z30-arrival-date': string;
        'z30-item-statistic': string;
        'z30-item-process-status': string;
        'z30-copy-id': string;
        'z30-hol-doc-number': string;
        'z30-temp-location': string;
        'z30-enumeration-a': string;
        'z30-enumeration-b': string;
        'z30-enumeration-c': string;
        'z30-enumeration-d': string;
        'z30-enumeration-e': string;
        'z30-enumeration-f': string;
        'z30-enumeration-g': string;
        'z30-enumeration-h': string;
        'z30-chronological-i': string;
        'z30-chronological-j': string;
        'z30-chronological-k': string;
        'z30-chronological-l': string;
        'z30-chronological-m': string;
        'z30-supp-index-o': string;
        'z30-85x-type': string;
        'z30-depository-id': string;
        'z30-linking-number': string;
        'z30-gap-indicator': string;
        'z30-maintenance-count': string;
        'z30-process-status-date': string;
        [index: string]: string;
    };
    type Z36 = {
        'z36-doc-number': string;
        'z36-item-sequence': string;
        'z36-number': string;
        'z36-material': string;
        'z36-sub-library': string;
        'z36-status': string;
        'z36-loan-date': string;
        'z36-loan-hour': string;
        'z36-effective-due-date': string;
        'z36-due-date': string;
        'z36-due-hour': string;
        'z36-returned-date': string;
        'z36-returned-hour': string;
        'z36-item-status': string;
        'z36-bor-status': string;
        'z36-letter-number': string;
        'z36-letter-date': string;
        'z36-no-renewal': string;
        'z36-note-1': string;
        'z36-note-2': string;
        'z36-loan-cataloger-name': string;
        'z36-loan-cataloger-ip': string;
        'z36-return-cataloger-name': string;
        'z36-return-cataloger-ip': string;
        'z36-renew-cataloger-name': string;
        'z36-renew-cataloger-ip': string;
        'z36-renew-mode': string;
        'z36-bor-type': string;
        'z36-note-alpha': string;
        'z36-recall-date': string;
        'z36-recall-due-date': string;
        'z36-last-renew-date': string;
        'z36-original-due-date': string;
        'z36-process-status': string;
        'z36-loan-type': string;
        'z36-proxy-id': string;
        'z36-recall-type': string;
        'z36-return-location': string;
        'z36-return-sub-location': string;
        'z36-source': string;
        'z36-delivery-time': string;
        'z36-tail-time': string;
        'z36-upd-time-stamp': string;
        'z36-loan-cataloger-ip-v6': string;
        'z36-return-cataloger-ip-v6': string;
        'z36-renew-cataloger-ip-v6': string;
    };
    type Z37 = {
        'z37-doc-number': string;
        'z37-item-sequence': string;
        'z37-sequence': string;
        'z37-id': string;
        'z37-status': string;
        'z37-expand': string;
        'z37-priority': string;
        'z37-open-date': string;
        'z37-open-hour': string;
        'z37-request-date': string;
        'z37-end-request-date': string;
        'z37-hold-date': string;
        'z37-letter-status': string;
        'z37-letter-date': string;
        'z37-alpha': string;
        'z37-author': string;
        'z37-title': string;
        'z37-pages': string;
        'z37-note-1': string;
        'z37-note-2': string;
        'z37-print-status': string;
        'z37-requester-id': string;
        'z37-cataloger-name': string;
        'z37-cataloger-ip': string;
        'z37-hold-sequence': string;
        'z37-pickup-location': string;
        'z37-send-action': string;
        'z37-end-hold-date': string;
        'z37-recall-type': string;
        'z37-rush-request': string;
        'z37-filter-sub-library': string;
        'z37-filter-item-status': string;
        'z37-filter-process-status': string;
        'z37-filter-collection': string;
        'z37-filter-copy': string;
        'z37-enumeration-a': string;
        'z37-enumeration-b': string;
        'z37-enumeration-c': string;
        'z37-chronological-i': string;
        'z37-chronological-j': string;
        'z37-chronological-k': string;
        'z37-request-type': string;
        'z37-booking-start-date': string;
        'z37-booking-start-hour': string;
        'z37-booking-end-date': string;
        'z37-booking-end-hour': string;
        'z37-booking-orig-start-time': string;
        'z37-booking-orig-end-time': string;
        'z37-release-time': string;
        'z37-delivery-time': string;
        'z37-head-time': string;
        'z37-tail-time': string;
        'z37-delivery-sub-location': string;
        'z37-return-location': string;
        'z37-return-sub-location': string;
        'z37-delivery-method': string;
        'z37-effective-start-time': string;
        'z37-effective-end-time': string;
        'z37-request-number': string;
        'z37-group-id': string;
        'z37-group-sequence': string;
        'z37-balancer-status': string;
        'z37-balancer-date': string;
        'z37-request-identifier': string;
        'z37-requester-name': string;
        'z37-upd-time-stamp': string;
        'z37-cataloger-ip-v6': string;
    };
    type Z303 = {
        'z303-id': string;
        'z303-proxy-for-id': string;
        'z303-primary-id': string;
        'z303-name-key': string;
        'z303-user-type': string;
        'z303-user-library': string;
        'z303-open-date': string;
        'z303-update-date': string;
        'z303-con-lng': string;
        'z303-alpha': string;
        'z303-name': string;
        'z303-title': string;
        'z303-delinq-1': string;
        'z303-delinq-n-1': string;
        'z303-delinq-1-update-date': string;
        'z303-delinq-1-cat-name': string;
        'z303-delinq-2': string;
        'z303-delinq-n-2': string;
        'z303-delinq-2-update-date': string;
        'z303-delinq-2-cat-name': string;
        'z303-delinq-3': string;
        'z303-delinq-n-3': string;
        'z303-delinq-3-update-date': string;
        'z303-delinq-3-cat-name': string;
        'z303-budget': string;
        'z303-profile-id': string;
        'z303-ill-library': string;
        'z303-home-library': string;
        'z303-field-1': string;
        'z303-field-2': string;
        'z303-field-3': string;
        'z303-note-1': string;
        'z303-note-2': string;
        'z303-salutation': string;
        'z303-ill-total-limit': string;
        'z303-ill-active-limit': string;
        'z303-dispatch-library': string;
        'z303-birth-date': string;
        'z303-export-consent': string;
        'z303-proxy-id-type': string;
        'z303-send-all-letters': string;
        'z303-plain-html': string;
        'z303-want-sms': string;
        'z303-plif-modification': string;
        'z303-title-req-limit': string;
        'z303-gender': string;
        'z303-birthplace': string;
        'z303-upd-time-stamp': string;
        'z303-last-name': string;
        'z303-first-name': string;
    };
    type Z304 = {
        'z304-id': string;
        'z304-sequence': string;
        'z304-address-0': string;
        'z304-address-1': string;
        'z304-address-2': string;
        'z304-address-3': string;
        'z304-address-4': string;
        'z304-zip': string;
        'z304-email-address': string;
        'z304-telephone': string;
        'z304-date-from': string;
        'z304-date-to': string;
        'z304-address-type': string;
        'z304-telephone-2': string;
        'z304-telephone-3': string;
        'z304-telephone-4': string;
        'z304-sms-number': string;
        'z304-update-date': string;
        'z304-cat-name': string;
        'z304-upd-time-stamp': string;
    };
    type Z305 = {
        'z305-id': string;
        'z305-sub-library': string;
        'z305-open-date': string;
        'z305-update-date': string;
        'z305-bor-type': string;
        'z305-bor-status': string;
        'z305-registration-date': string;
        'z305-expiry-date': string;
        'z305-note': string;
        'z305-loan-permission': string;
        'z305-photo-permission': string;
        'z305-over-permission': string;
        'z305-multi-hold': string;
        'z305-loan-check': string;
        'z305-hold-permission': string;
        'z305-renew-permission': string;
        'z305-rr-permission': string;
        'z305-ignore-late-return': string;
        'z305-last-activity-date': string;
        'z305-photo-charge': string;
        'z305-no-loan': string;
        'z305-no-hold': string;
        'z305-no-photo': string;
        'z305-no-cash': string;
        'z305-cash-limit': string;
        'z305-credit-debit': string;
        'z305-sum': string;
        'z305-delinq-1': string;
        'z305-delinq-n-1': string;
        'z305-delinq-1-update-date': string;
        'z305-delinq-1-cat-name': string;
        'z305-delinq-2': string;
        'z305-delinq-n-2': string;
        'z305-delinq-2-update-date': string;
        'z305-delinq-2-cat-name': string;
        'z305-delinq-3': string;
        'z305-delinq-n-3': string;
        'z305-delinq-3-update-date': string;
        'z305-delinq-3-cat-name': string;
        'z305-field-1': string;
        'z305-field-2': string;
        'z305-field-3': string;
        'z305-hold-on-shelf': string;
        'z305-end-block-date': string;
        'z305-booking-permission': string;
        'z305-booking-ignore-hours': string;
        'z305-rush-cat-request': string;
        'z305-upd-time-stamp': string;
    };
}

declare function borrowerInfo(borId: string, hold?: boolean, loans?: boolean): Promise<Aleph.BorrowerInfoResponse>;

declare function findDocument(docNumber: string, base?: string): Promise<Aleph.FindDocumentResponse>;

declare function find(request: string): Promise<Aleph.BaseResponse>;

declare function holdRequest(borId: string, barcode: string): Promise<Aleph.BaseResponse>;

declare function holdRequestCancel(item: Aleph.ItemHold): Promise<Aleph.BaseResponse>;

declare function itemData(docNumber: string): Promise<Aleph.BaseResponse>;

declare function present(setNumber: string, setEntry: string): Promise<Aleph.BaseResponse>;

declare function readItem(barcode: string): Promise<Aleph.ReadItemResponse>;

declare function updateItem(docNumber: string, itemSequence: string, ...data: object[] | string[]): Promise<Aleph.BaseResponse>;

export { Aleph, borrowerInfo, find, findDocument, holdRequest, holdRequestCancel, itemData, present, readItem, updateItem };
