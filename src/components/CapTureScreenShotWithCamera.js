import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ViewShot from 'react-native-view-shot';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CaptureIamgeWithViewShot = () => {
  const camera = useRef(null);
  const viewShotRef = useRef(null);
  const [openCam, setOpenCam] = useState(false);
  const [photoPath, setPhotoPath] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const isMounted = useRef(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [capturedTime, setCapturedTime] = useState(null);
  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (photoPath !== '' && isMounted.current) {
      handleCaptureView();
    }
  }, [photoPath]);

  const devices = useCameraDevices();
  const cameraDevice = devices.back;

  const checkLocationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (status === RESULTS.DENIED) {
        const permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (permissionStatus !== RESULTS.GRANTED) {
          console.log('Location permission denied.');
          // Handle the case where the user denies location permission
        }
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const locationPermissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (locationPermissionStatus === RESULTS.DENIED) {
        const permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (permissionStatus !== RESULTS.GRANTED) {
          console.log('Location permission denied.');
          // Handle the case where the user denies location permission
          return;
        }
      }

      const photo = await camera.current.takePhoto({
        flash: 'on',
      });
      setPhotoPath(photo.path);
      setOpenCam(!openCam);
      captureLocation();
      captureTime();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCaptureView = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setCapturedImage(uri);
      // Now you can send `capturedImage` to your backend
      // Include the captured time and current location in the request payload
    } catch (e) {
      console.log(e);
    }
  };

  const captureLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const captureTime = () => {
    setCapturedTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  };

  if (cameraDevice == null) {
    return <ActivityIndicator size="large" color="#1C6758" />;
  }
  return (
    <View style={{ flex: 1 }}>
      {openCam ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={cameraDevice}
            isActive={true}
            photo
          />
          <TouchableOpacity
            style={{
              height: 80,
              width: 80,
              position: 'absolute',
              borderRadius: 50,
              backgroundColor: 'red',
              bottom: 40,
              alignSelf: 'center',
            }}
            onPress={handleTakePhoto}
          >
            <Text>'</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {photoPath !== '' ? (
            <ViewShot
              style={{ width: Dimensions.get('screen').width, height: 300, borderWidth: 1 }}
              ref={viewShotRef}
              options={{ format: 'jpg', quality: 0.9 }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: `file://'${photoPath}`,
                }}
              />
              {currentLocation && capturedTime && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>
                    Location: {currentLocation.latitude}, {currentLocation.longitude}
                  </Text>
                  <Text style={styles.overlayText}>Time: {capturedTime}</Text>
                </View>
              )}
            </ViewShot>
          ) : null}
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setOpenCam(!openCam)}
          >
            <Text>Take photo</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CaptureIamgeWithViewShot;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width,
    height: 300,
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  overlayText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
