import React, { useState } from 'react';
import RangeDatePicker from '../../components/common/RangeDatePicker';
import UserManagementList from '../../components/userManagement/UserManagementList';

export default function UserManagement() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div>
      <UserManagementList />
      <RangeDatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}
