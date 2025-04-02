import { useState, useCallback, type ChangeEvent } from 'react';
import { type Template } from 'src/models/template';

/**
 * Use table row select hook.
 * @param templates Templates to be selected.
 */
export const useTableRowSelect = (templates: readonly Template[]) => {
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleSelectAllClick = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = templates.map(n => n.templateId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [templates]);

  const handleRowClick = useCallback((id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }, [selected]);

  return {
    selected,
    handleSelectAllClick,
    handleRowClick,
  };
};
