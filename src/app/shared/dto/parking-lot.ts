import {ParkingLotButtonStyleEnum} from "../../calendar/calendar-button-toggle-group/enums/parking-lot-button-style-enum";

export interface ParkingLot {
  id: number;
  name: string;
  parkingPlaceCount: number;
  freeParkingPlaces: number;
  parkingLotButtonStyleEnum: ParkingLotButtonStyleEnum;
  isAvailable: boolean;
}
