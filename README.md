# InCallManager test

## Important
**This repository has the only purpose of demonstrating an Android unexpected behavior, detected till now only in Samsung devices.**

# The problem
On Samsung devices, use of WakeLock with `PowerManager.PROXIMITY_SCREEN_OFF_WAKE_LOCK` triggers `onHostPause` (turning off) and `onHostResume` (turning on).

# Install and test
Just clone the repo and yarn/npm it. The link is already done.

```bash
git clone https://github.com/GuiCavi/incallmanager-test.git

yarn

# or

npm i
```

To test

```bash
react-native run-android

# and

react-native log-android
```

Don't forget the `logcat` for native messages.

# The demo code
The code uses `react-native-incall-manager`. It's a simple React Component with the most important part inside `componentDidMount`. 

```js
import React, { Component } from 'react';
import {
    // ...,
    AppState,
    DeviceEventEmitter
} from 'react-native';

import ICManager from 'react-native-incall-manager';

componentDidMount() {
    AppState.addEventListener('change', (state) => {
        console.log('APP STATE = ', state);
    });

    ICManager.start({ media: 'audio' });

    DeviceEventEmitter.addListener('Proximity', (data) => {
        console.log('Proximity', data);
    });
}
```

# The output

## Samsung
From `adb logat` (Android Studio)

```bash
com.incallmanager D/AppRTCProximitySensor: Proximity sensor => NEAR state
com.incallmanager D/InCallManager: turnScreenOff(): use proximity lock.
com.incallmanager D/InCallProximityManager: acquireProximityWakeLock()
D/PowerManagerService: [api] acquire WakeLock flags=0x20 tag="InCallProximityManager" uid=10177 pid=19729 ws=null pkg=com.incallmanager
com.incallmanager D/InCallManager: --- updateAudioDeviceState: wired headset=false, BT state=UNINITIALIZED
com.incallmanager D/InCallManager: Device status: available=[EARPIECE, SPEAKER_PHONE], selected=EARPIECE, user selected=NONE
com.incallmanager D/InCallManager: --- updateAudioDeviceState done
com.incallmanager D/AppRTCProximitySensor: onSensorChanged: accuracy=3, timestamp=98995752411320, distance=0.0
com.incallmanager I/ReactNativeJS: 'Proximity', { isNear: true }
com.incallmanager D/InCallManager: onPause()
com.incallmanager I/ReactNativeJS: 'APP STATE = ', 'background'
```

From `react-native log-android`

```bash
I ReactNativeJS: Running application "incallmanager" with appParams: {"rootTag":1}. __DEV__ === true, development-level warning are ON, performance optimizations are OFF
I ReactNativeJS: 'APP STATE = ', 'active'
I ReactNativeJS: 'Proximity', { isNear: false }
I ReactNativeJS: 'Proximity', { isNear: true }
I ReactNativeJS: 'APP STATE = ', 'background'
I ReactNativeJS: 'Proximity', { isNear: false }
I ReactNativeJS: 'APP STATE = ', 'active'
```

## LG
From `adb logcat` (Android Studio)

```bash
com.incallmanager D/AppRTCProximitySensor: Proximity sensor => NEAR state
com.incallmanager D/InCallManager: turnScreenOff(): use proximity lock.
com.incallmanager D/InCallProximityManager: acquireProximityWakeLock()
D/PowerManagerServiceEx: acquireWakeLockInternal: lock=826896706, flags=0x20, tag="InCallProximityManager", ws=null, historyTag=null, uid=10162, pid=6002
com.incallmanager D/InCallManager: --- updateAudioDeviceState: wired headset=false, BT state=UNINITIALIZED
com.incallmanager D/InCallManager: Device status: available=[EARPIECE, SPEAKER_PHONE], selected=EARPIECE, user selected=NONE
com.incallmanager D/InCallManager: --- updateAudioDeviceState done
com.incallmanager D/AppRTCProximitySensor: onSensorChanged: accuracy=3, timestamp=17726884656346, distance=0.0
com.incallmanager I/ReactNativeJS: 'Proximity', { isNear: true }
```

From `react-native log-android`

```bash
I/ReactNativeJS( 6002): Running application "incallmanager" with appParams: {"rootTag":1}. __DEV__ === true, development-level warning are ON, performance optimizations are OFF
I/ReactNativeJS( 6002): 'APP STATE = ', 'active'
I/ReactNativeJS( 6002): 'Proximity', { isNear: false }
I/ReactNativeJS( 6002): 'Proximity', { isNear: true }
I/ReactNativeJS( 6002): 'Proximity', { isNear: false }
```

# Expected behavior
- Execute a method when the app goes to background, but don't execute when there is a proximity.

# What to expect with this

Well, hoping we can answer some questions:

1. Is this expected and I'm totally crazy?
1. Assuming it's an unexpected behavior, is there a way to go around it?
1. Does it have something related with [#36](https://github.com/zxcpoiu/react-native-incall-manager/issues/36) from `react-native-incall-manager`?

(others will come)

- If anyone have this problem in future, knows where to find the answer.