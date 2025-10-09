import type { HandleProps } from "@easykit/design";
import { preSign } from "@/rest/assets";

const mimeTypeRegex = /:(.*?);/;

export function fileToDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function dataURLToFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(mimeTypeRegex)?.[1];
  const str = atob(arr.at(-1) || "");
  let n = str.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = str.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export type UploadOptions = {
  name: string;
  file: File; // 文件
  type?: 0 | 1; // 0: 公开 1: 私有
  contentType?: string; // 文件类型
  data?: unknown;
  headers?: Record<string, string>;
  onProgress?: (percent: number, event: ProgressEvent) => void; // 进度回调,
  onError?: (error: string) => void; // 错误回调
  onSuccess?: (data: string) => void; // 成功回调
};

export type UploadResult = {
  success: boolean;
  data?: string;
  error?: string;
};

const ERROR_MESSAGE = "Failed to upload";

export const upload = async (options: UploadOptions) => {
  const { onProgress, file, type = 0, data, headers, onError, onSuccess } = options;
  return new Promise<UploadResult>((resolve) => {
    const allHeaders = {
      "Content-Type": options.contentType || "application/octet-stream",
      "Content-Length": file?.size?.toString() || "0",
      ...(headers || {}),
    };
    preSign({
      fileName: options.name,
      headers: allHeaders,
      type,
      ...(data || {}),
    }).then(({ success, data, message }) => {
      if (success) {
        const { signedUrl, url } = data!;
        const xhr = new XMLHttpRequest();
        if (xhr.upload) {
          xhr.upload.onprogress = (event) => {
            let percent: number | undefined;
            if (event.total > 0) {
              percent = (event.loaded / event.total) * 100;
            }
            onProgress?.(Number.parseInt(`${percent}`, 10), event);
          };
        }
        // biome-ignore lint/suspicious/noExplicitAny: error
        xhr.onerror = function error(e: any) {
          onError?.(e.message || ERROR_MESSAGE);
          resolve({
            success: false,
            error: e.message || ERROR_MESSAGE,
          });
        };
        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            onError?.(`${ERROR_MESSAGE}: ${xhr.status}`);
            return resolve({
              success: false,
              error: `${ERROR_MESSAGE}: ${xhr.status}`,
            });
          }
          onSuccess?.(url);
          resolve({
            success: true,
            data: url,
          });
        };
        xhr.open("put", signedUrl, true);
        for (const [key, value] of Object.entries(allHeaders)) {
          if (key === "Content-Length") {
            // unsafe header
            continue;
          }
          xhr.setRequestHeader(key, value);
        }
        try {
          xhr.send(file);
          // biome-ignore lint/suspicious/noExplicitAny: error
        } catch (error: any) {
          onError?.(error?.message || ERROR_MESSAGE);
          resolve({
            success: false,
            error: error?.message || ERROR_MESSAGE,
          });
        }
      } else {
        onError?.(message || ERROR_MESSAGE);
        resolve({
          success: false,
          error: message,
        });
      }
    });
  });
};

export const uploadHandle = (options: HandleProps) => {
  const { file, headers, data, onError, onSuccess, onProgress } = options;
  upload({
    name: file.name,
    file,
    data,
    headers,
    onError: (error) => {
      file.error = { message: error };
      onError?.(file);
    },
    onSuccess: (url) => {
      file.response = url;
      onSuccess?.(file);
    },
    onProgress: (percent) => {
      file.progress = percent;
      onProgress?.(file);
    },
  }).then();
};
