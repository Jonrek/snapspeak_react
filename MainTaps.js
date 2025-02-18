import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons = {
            Recordings: 'mic',
            Images: 'image',
            PDFs: 'picture-as-pdf',
            Texts: 'text-fields',
          };
          return <Icon name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Recordings" component={RecordingsScreen} />
      <Tab.Screen name="Images" component={ImagesScreen} />
      <Tab.Screen name="PDFs" component={PDFsScreen} />
      <Tab.Screen name="Texts" component={TextsScreen} />
    </Tab.Navigator>
  );
}
