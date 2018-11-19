import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

export const nothing: RobotStateHandler = (state: RobotState) => state;
