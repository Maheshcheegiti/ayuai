// utils/storageHelper.js
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";

export const getOrRequestDownloadUri = async () => {
  let storedUri = await SecureStore.getItemAsync("ayuai_download_uri");

  if (!storedUri) {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) throw new Error("Storage permission denied");

    storedUri = permissions.directoryUri;
    await SecureStore.setItemAsync("ayuai_download_uri", storedUri);
  }

  return storedUri;
};
