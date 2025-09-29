import { TextInput } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
  value: string;
  onChange: (next: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation('common');
  return (
    <TextInput
      placeholder={t('searchInputPlaceholder')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
