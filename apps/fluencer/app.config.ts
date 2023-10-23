import { IXAppConfig } from "@ix/base/composables/useAppSetup";

export default defineAppConfig<IXAppConfig>({
  ixApp: 'fluencer',
  connectWithoutIXUser: true
})