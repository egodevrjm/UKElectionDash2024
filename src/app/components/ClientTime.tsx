'use client'

import React, { useState, useEffect } from 'react';

const ClientTime: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className="text-xl font-semibold dark:text-white">{time.toLocaleTimeString()}</span>;
};

export default ClientTime;