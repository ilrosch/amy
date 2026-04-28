// plugins/withUsesFeatures.js
const { withAndroidManifest } = require('@expo/config-plugins');

const FEATURES = [
  { name: 'android.hardware.camera' },
  { name: 'android.hardware.camera.autofocus' },
  { name: 'android.hardware.audio.output' },
  { name: 'android.hardware.microphone' },
];

module.exports = function withUsesFeatures(config) {
  return withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults.manifest;
    if (!manifest['uses-feature']) {
      manifest['uses-feature'] = [];
    }

    // Проверка на дубликаты (чтобы не множились при повторном prebuild)
    const existing = manifest['uses-feature'].map((f) => f.$?.['android:name']);

    FEATURES.forEach(({ name, required = true }) => {
      if (!existing.includes(name)) {
        manifest['uses-feature'].push({
          $: {
            'android:name': name,
            'android:required': String(required),
          },
        });
      }
    });

    return mod;
  });
};
