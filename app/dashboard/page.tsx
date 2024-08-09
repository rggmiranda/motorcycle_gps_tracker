'use client'
import React from "react";
import DeviceCard from "../_components/DeviceCard";

const myDevice = {
   id: 1,
   alarmArmed: false,
   enableIgnition: true,
   name: 'Husqvarna Vitp 401',
   createdAt: new Date('2024-01-01T12:00:00Z'),
   updatedAt: new Date('2024-08-01T12:00:00Z'),
   userId: 'user-001',
   battery: 85,
   deviceParamsId: 101,
   user: {
     id: 'user-001',
     name: 'John Doe',
   },
   parameters: {
     id: 101,
     paramName: 'Default Parameters',
   },
   alarms: [
     { id: 1, alarmType: 'Low Battery' },
     { id: 2, alarmType: 'Overheating' },
   ],
   TagsOnDevices: [
     { id: 1, tagName: 'Critical' },
     { id: 2, tagName: 'Mobile' },
   ],
   Telemetry: [
     { id: 1, data: 'Speed: 60km/h' },
     { id: 2, data: 'Temperature: 35°C' },
   ],
 };


 
const page = () => {
  return (
      <div className="flex flex-wrap gap-3">
        <DeviceCard device={myDevice}></DeviceCard>
      </div>
  );
};

export default page;
