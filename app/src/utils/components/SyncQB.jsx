import React from 'react';
import { Button } from 'reactstrap';

import { synchronizeWithQB } from '../../auth/authService';

export default function SyncQB() {
  return (
    <Button
      onClick={synchronizeWithQB}
      color="success"
      size="sm"
      outline
    >
      Sync with QuickBooks
    </Button>
  );
}
