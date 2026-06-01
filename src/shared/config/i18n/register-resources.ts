import { i18nInstance, languages } from './i18n';

export type FeatureResource = {
  ns: string;
  resources: Record<string, any>;
};

export function registerFeatureResources(features: readonly FeatureResource[]) {
  features.forEach(({ ns, resources }) => {
    languages.forEach((lng) => {
      if (resources[lng]) {
        i18nInstance.addResourceBundle(lng, ns, resources[lng], true, true);
      }
    });
  });
}
