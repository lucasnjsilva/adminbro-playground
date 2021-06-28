import React from 'react'; // eslint-disable-line
import { BasePropertyProps } from 'admin-bro';
import { Label, Box, DropZone, DropZoneProps } from '@admin-bro/design-system';

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange } = props

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    onChange(property.name, files[0])
  }

  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
    </Box>
  );
}

export default Edit;
