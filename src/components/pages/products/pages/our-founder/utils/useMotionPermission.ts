import { useCallback, useState } from "react";

type MotionPermissionState = "unsupported" | "idle" | "granted" | "denied";

interface DeviceOrientationEventWithPermission {
  requestPermission?: () => Promise<"granted" | "denied">;
}

/**
 * iOS 13+ requires an explicit, gesture-triggered permission request
 * before `deviceorientation` events fire at all. Everywhere else the
 * events are simply available (or the device has no sensor, in which
 * case listening is a harmless no-op). This hook exposes a single
 * `request()` you can wire to a tap/click, and a `state` you can use to
 * show or hide that control — so devices without gyroscope support (or
 * users who decline) always fall back to the pointer/mouse interaction
 * instead of a broken feature.
 */
export const useMotionPermission = () => {
  const [state, setState] = useState<MotionPermissionState>(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      return "unsupported";
    }
    const needsPermission =
      typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission)
        .requestPermission === "function";
    return needsPermission ? "idle" : "granted";
  });

  const request = useCallback(async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setState("unsupported");
      return;
    }

    const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;

    if (typeof DOE.requestPermission !== "function") {
      setState("granted");
      return;
    }

    try {
      const result = await DOE.requestPermission();
      setState(result === "granted" ? "granted" : "denied");
    } catch {
      setState("denied");
    }
  }, []);

  return { state, request };
};
