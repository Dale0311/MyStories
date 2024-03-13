import { fileURLToPath } from 'url';
import path from 'path';
export const currentDir = () => {
  return path.dirname(fileURLToPath(import.meta.url));
};
