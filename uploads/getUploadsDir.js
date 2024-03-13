import { fileURLToPath } from 'url';
import path from 'path';
export const getUploadsDir = () => {
  return path.dirname(fileURLToPath(import.meta.url));
};
