//import { environment } from 'src/environments/environment';

import { environment } from "../../../../environments/environment";

export class AppSettings {
    public static baseUrl = environment.serverUrl;
    public static assetUrl = environment.assetUrl;
    public static authenticate = AppSettings.baseUrl + 'login';
    public static navMenu = AppSettings.baseUrl + 'NavMenu';
    public static menuCategory = AppSettings.baseUrl + 'MenuCategory';
    public static menuGroup = AppSettings.baseUrl + 'MenuGroup';

    public static user = AppSettings.baseUrl + 'user';
    public static userGroup = AppSettings.baseUrl + 'UserGroup';

    public static dashboard = AppSettings.baseUrl + 'Dashboard';
    public static caseManagement = AppSettings.baseUrl + 'CaseManagement';
    public static property = AppSettings.baseUrl + 'property';
    public static booking = AppSettings.baseUrl + 'booking';
    public static utils = AppSettings.baseUrl + 'utils';

    public static masterSetup = AppSettings.baseUrl + 'MasterSetup';

    public static product = AppSettings.baseUrl + 'Product';
    public static order = AppSettings.baseUrl + 'Order';
    public static customer = AppSettings.baseUrl + 'Customer';
    public static report = AppSettings.baseUrl + 'Report';
    public static lease = AppSettings.baseUrl + 'Lease';
    public static tenant = AppSettings.baseUrl + 'Tenant';
    public static policyManage = AppSettings.baseUrl + 'PolicyManage';
    public static complianceDocument = AppSettings.baseUrl + 'ComplianceDocument';
    public static graph = AppSettings.baseUrl + 'Graph';
    public static ticket = AppSettings.baseUrl + 'Ticket';

    public static APP_TOKEN: string;
    public static URL_GETTOKEN: string = AppSettings.baseUrl + 'token';
}