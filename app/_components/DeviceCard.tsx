"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdEdit } from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";
import { FaCarBattery } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { Device } from "@prisma/client";

function DeviceCard({ device }: { device: Device }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {/* LAYOUT EXAMPLE */}
        {/* <div className="flex flex-row">
          <div className="basis-2/3">
          <div className="flex flex-column">
            <div  style={{ backgroundColor: "yellow" }}>1</div>  
            <div  style={{ backgroundColor: "blue" }}>2</div>
          </div>
          
          </div>
          <div className="basis-1/3" style={{ backgroundColor: "red" }}>03</div>
        </div> */}

        <div className="flex flex-row">
          <div className=" grow">
            <div className="flex flex-column ">
              <Card.Title
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {device.name}
              </Card.Title>
              <Card.Text>
                <div className="flex items-center">
                  <RiAlarmWarningLine />
                  <div className="px-1">Armed</div>
                </div>
              </Card.Text>
              <Card.Text>
                <div className=" flex items-center">
                  <FaCarBattery />
                  <div className="px-1">{device.battery}%</div>
                </div>
              </Card.Text>
            </div>
          </div>
          <div className="grow-0 m-2 flex flex-col justify-between ">
            <div className="flex content-center ">
              {/* <div className="flex content-center " style={{ backgroundColor: "blue" }}> */}
              <button onClick={() => alert("Icon Button Clicked!")}>
                <GoGear size={26} />
              </button>
            </div>
            <div className="flex content-center ">
              {/* <div className="flex content-center "  style={{ backgroundColor: "red" }}> */}
              <button onClick={() => alert("Icon Button Clicked!")}>
                <GrMapLocation size={26} />
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DeviceCard;
