import {
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';

export const POSITION_MAP: { [key: string]: ConnectionPositionPair } = {
  top: new ConnectionPositionPair(
    { originX: 'center', originY: 'top' },
    {
      overlayX: 'center',
      overlayY: 'bottom'
    }
  ),
  topCenter: new ConnectionPositionPair(
    { originX: 'center', originY: 'top' },
    { overlayX: 'center', overlayY: 'bottom' }
  ),
  topLeft: new ConnectionPositionPair(
    { originX: 'start', originY: 'top' },
    {
      overlayX: 'start',
      overlayY: 'bottom'
    }
  ),
  topRight: new ConnectionPositionPair(
    { originX: 'end', originY: 'top' },
    { overlayX: 'end', overlayY: 'bottom' }
  ),
  right: new ConnectionPositionPair(
    { originX: 'end', originY: 'center' },
    {
      overlayX: 'start',
      overlayY: 'center'
    }
  ),
  rightTop: new ConnectionPositionPair(
    { originX: 'end', originY: 'top' },
    { overlayX: 'start', overlayY: 'top' }
  ),
  rightBottom: new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'start', overlayY: 'bottom' }
  ),
  bottom: new ConnectionPositionPair(
    { originX: 'center', originY: 'bottom' },
    {
      overlayX: 'center',
      overlayY: 'top'
    }
  ),
  bottomCenter: new ConnectionPositionPair(
    { originX: 'center', originY: 'bottom' },
    { overlayX: 'center', overlayY: 'top' }
  ),
  bottomLeft: new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'start', overlayY: 'top' }
  ),
  bottomRight: new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'top' }
  ),
  left: new ConnectionPositionPair(
    { originX: 'start', originY: 'center' },
    {
      overlayX: 'end',
      overlayY: 'center'
    }
  ),
  leftTop: new ConnectionPositionPair(
    { originX: 'start', originY: 'top' },
    { overlayX: 'end', overlayY: 'top' }
  ),
  leftBottom: new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'bottom' }
  )
};

export const DEFAULT_TOOLTIP_POSITIONS = [
  POSITION_MAP.top,
  POSITION_MAP.right,
  POSITION_MAP.bottom,
  POSITION_MAP.left
];



export function getPlacementName(position: ConnectedOverlayPositionChange): string | undefined {
  const keyList = ['originX', 'originY', 'overlayX', 'overlayY'];
  for (const placement in POSITION_MAP) {
    // @ts-ignore
    if (keyList.every(key => position.connectionPair[key] === POSITION_MAP[placement][key])) {
      return placement;
    }
  }
}
