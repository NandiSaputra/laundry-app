import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const icon = {
  index: (props) => <Ionicons name="home" size={24} color="black" {...props} />,
  customers: (props) => (
    <Ionicons name="people-circle-outline" size={24} color="black" {...props} />
  ),
  product: (props) => (
    <Ionicons name="bag-handle-outline" size={24} color="black" {...props} />
  ),
};
const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        //animate text tabbar
        const scale = useSharedValue(0);
        useEffect(() => {
          scale.value = withSpring(
            typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
          );
        }, [scale, isFocused]);
        const animatedTextStyle = useAnimatedStyle(() => {
          const opacity = interpolate(scale.value, [0, 1], [1, 0]);
          return {
            opacity,
          };
        });
        const animatedIconStyle = useAnimatedStyle(() => {
          const sclaeValue = interpolate(scale.value, [0, 1], [1, 1.3]);
          const top = interpolate(scale.value, [0, 1], [0, 10]);
          return {
            transform: [{ scale: sclaeValue }],
            top,
          };
        });

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Animated.View style={[animatedIconStyle]}>
              {icon[route.name] &&
                icon[route.name]({ color: isFocused ? "#e6e6fa" : "#e6e6fa" })}
            </Animated.View>

            <Animated.Text
              style={[
                { color: isFocused ? "#e6e6fa" : "#e6e6fa" },
                animatedTextStyle,
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 50,
    alignItems: "center",
    backgroundColor: "#4169e1",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 20,
  },
});
