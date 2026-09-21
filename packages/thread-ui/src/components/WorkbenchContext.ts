import { createContext } from 'react';

// Presentation only; embedded thread surfaces keep their existing activity groups.
export const WorkbenchContext = createContext(false);
