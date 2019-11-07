import { NativeModules, PermissionsAndroid } from "react-native";

var RNImmediatePhoneCall = {
  immediatePhoneCall: function(number) {
    return PermissionsAndroid.check("android.permission.CALL_PHONE")
      .then(granted => {
        if (granted) {
          return Promise.resolve();
        }
        return PermissionsAndroid.request("android.permission.CALL_PHONE").then(
          result => {
            if (result === "granted") {
              return Promise.resolve();
            } else {
              return Promise.reject("Permission denied");
            }
          }
        );
      })
      .then(() => {
        return NativeModules.RNImmediatePhoneCall.immediatePhoneCall(number);
      });
  }
};

export default RNImmediatePhoneCall;
