import { useEffect } from 'react';
import { Haptics } from '@capacitor/haptics';

const HapticFeedback = ({ duration = 500 }) => {
  useEffect(() => {
    const triggerVibration = async () => {
      try {
        // Create a pattern of vibration bursts to simulate a stronger vibration
        await Haptics.vibrate({ duration });
        await new Promise(resolve => setTimeout(resolve, 100));
        await Haptics.vibrate({ duration: 150 });
        await new Promise(resolve => setTimeout(resolve, 100));
        await Haptics.vibrate({ duration: 150 });
        await new Promise(resolve => setTimeout(resolve, 100));
        await Haptics.vibrate({ duration: 150 });
      } catch (error) {
        console.error('Error triggering haptic feedback:', error);
      }
    };

    triggerVibration();
  }, [duration]);

  return null; // Do not return any JSX or other content
};

export default HapticFeedback;
